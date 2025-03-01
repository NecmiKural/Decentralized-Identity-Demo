import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { DIDService } from '../../did/services/did.service';

@Injectable()
export class AuthService {
  private users: Map<string, User> = new Map();

  constructor(
    private jwtService: JwtService,
    private didService: DIDService,
  ) {}

  async register(
    username: string,
    password: string,
  ): Promise<{ userId: string; didId: string }> {
    const userId = `user-${Date.now()}`;

    // would hash the password
    const user = new User();
    user.id = userId;
    user.username = username;
    user.password = password;

    // Store the user
    this.users.set(userId, user);

    // Create a DID for the user
    const did = this.didService.createDID(userId);

    // Update user with DID
    user.didId = did.id;
    this.users.set(userId, user);

    return { userId, didId: did.id };
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = Array.from(this.users.values()).find(
      (u) => u.username === username && u.password === password,
    );

    if (!user) {
      return null;
    }

    return user;
  }

  async login(user: User) {
    const payload = { userId: user.id, didId: user.didId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
