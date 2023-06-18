export interface Proof {
  jws: string;
  type: string;
  created: string;
  proofPurpose: string;
  verificationMethod: string;
}

export interface CredentialSubject {
  "@context": string[];
  hash: string;
  id: string;
  provider: string;
}

export interface Credential {
  platform?: string;
  "@context": string[];
  credentialSubject: CredentialSubject;
  expirationDate: string;
  issuanceDate: string;
  issuer: string;
  proof: Proof;
  type: string[];
}
