import { Test, TestingModule } from '@nestjs/testing';
import { DIDService } from '../src/did/services/did.service';

describe('DIDService', () => {
  let service: DIDService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DIDService],
    }).compile();

    service = module.get<DIDService>(DIDService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a DID', () => {
    const userId = 'test-user';
    const did = service.createDID(userId);

    expect(did).toBeDefined();
    expect(did.id).toContain('did:example:');
    expect(did.controller).toBe(userId);
  });

  it('should issue and verify credentials', () => {
    // Create DIDs
    const issuerDid = service.createDID('issuer-user');
    const subjectDid = service.createDID('subject-user');

    // Issue a credential
    const claims = { name: 'Test User', email: 'test@example.com' };
    const credential = service.issueCredential(
      issuerDid.id,
      subjectDid.id,
      claims,
    );

    expect(credential).toBeDefined();
    expect(credential.credentialSubject.name).toBe('Test User');

    // Verify the credential
    const isValid = service.verifyCredential(credential.id);
    expect(isValid).toBe(true);
  });
});
