export type PresentationDefinition = any;

export interface VerifiableCredential {
  "@context": string[];
  id: string;
  type: string[];
  issuer: string;
  issuanceDate: string;
  credentialSubject: Record<string, unknown>;
  proof?: any;
}

export interface VerifiablePresentation {
  "@context": string[];
  id: string;
  type: string[];
  verifiableCredential: VerifiableCredential[];
  proof?: any;
}

export interface VPToken {
  iat: number;
  exp: number;
  iss: string;
  aud: string;
  nonce?: string;
  vp?: VerifiablePresentation;
}

export interface PresentationSubmission {
  definition_id: string;
  id: string;
  descriptor_map: {
    id: string;
    format: "jwt_vp_json" | "ldp_vp";
    path: string;
    path_nested: [
      {
        format: string;
        path: string;
      }
    ];
  };
}
