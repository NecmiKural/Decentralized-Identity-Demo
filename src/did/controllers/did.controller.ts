import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DIDService } from '../services/did.service';
import { IssueCredentialDto } from '../dto/did.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('did')
export class DIDController {
  constructor(private readonly didService: DIDService) {}

  @Get(':didId')
  getDid(@Param('didId') didId: string) {
    const did = this.didService.getDID(didId);

    if (!did) {
      return { error: 'DID not found' };
    }

    // Remove sensitive information before sending
    const { controller, ...publicDid } = did;

    return publicDid;
  }

  @UseGuards(JwtAuthGuard)
  @Post('credentials')
  issueCredential(@Req() req: Request, @Body() dto: IssueCredentialDto) {
    const user = req.user as { userId: string; didId: string };
    const { subjectDid, claims } = dto;

    const credential = this.didService.issueCredential(
      user.didId,
      subjectDid,
      claims,
    );

    if (!credential) {
      return { error: 'Failed to issue credential' };
    }

    return credential;
  }

  @Get('credentials/:credentialId/verify')
  verifyCredential(@Param('credentialId') credentialId: string) {
    const isValid = this.didService.verifyCredential(credentialId);

    return { isValid };
  }
}
