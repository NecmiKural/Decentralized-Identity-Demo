import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CryptoUtil } from '../../shared/utils/crypto.util';
import { DID, VerifiableCredential } from '../types/did.types';

@Injectable()
export class DIDService {
  private dids: Map<string, DID> = new Map();
  private credentials: Map<string, VerifiableCredential> = new Map();
  private privateKeys: Map<string, string> = new Map();

  createDID(userId: string): DID {
    const { publicKey, privateKey } = CryptoUtil.generateKeyPair();

    const did: DID = {
      id: `did:example:${uuidv4()}`,
      publicKey,
      controller: userId,
      created: new Date(),
      updated: new Date(),
    };

    this.dids.set(did.id, did);
    this.privateKeys.set(did.id, privateKey);

    return did;
  }

  getDID(didId: string): DID | undefined {
    return this.dids.get(didId);
  }

  issueCredential(
    issuerDid: string,
    subjectDid: string,
    claims: Record<string, any>,
  ): VerifiableCredential | null {
    const issuer = this.dids.get(issuerDid);
    const subject = this.dids.get(subjectDid);
    const privateKey = this.privateKeys.get(issuerDid);

    if (!issuer || !subject || !privateKey) {
      return null;
    }

    const credentialData = {
      id: `vc:${uuidv4()}`,
      type: ['VerifiableCredential', 'IdentityCredential'],
      issuer: issuerDid,
      issuanceDate: new Date(),
      expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      credentialSubject: {
        id: subjectDid,
        ...claims,
      },
    };

    const signature = CryptoUtil.signData(credentialData, privateKey);

    const credential: VerifiableCredential = {
      ...credentialData,
      proof: {
        type: 'RsaSignature2018',
        created: new Date(),
        verificationMethod: `${issuerDid}#keys-1`,
        signature,
      },
    };

    this.credentials.set(credential.id, credential);
    return credential;
  }

  verifyCredential(credentialId: string): boolean {
    const credential = this.credentials.get(credentialId);
    if (!credential) return false;

    const issuer = this.dids.get(credential.issuer);
    if (!issuer) return false;

    if (
      credential.expirationDate &&
      new Date() > new Date(credential.expirationDate)
    ) {
      return false;
    }

    const { proof, ...credentialData } = credential;

    return CryptoUtil.verifySignature(
      credentialData,
      proof.signature,
      issuer.publicKey,
    );
  }
}
