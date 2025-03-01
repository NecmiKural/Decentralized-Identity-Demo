export interface DID {
  id: string;
  publicKey: string;
  controller: string;
  created: Date;
  updated: Date;
}

export interface VerifiableCredential {
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: Date;
  expirationDate?: Date;
  credentialSubject: {
    id: string;
    [key: string]: any;
  };
  proof: {
    type: string;
    created: Date;
    verificationMethod: string;
    signature: string;
  };
}
