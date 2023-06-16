import * as ionjs from "@decentralized-identity/ion-sdk";
import { JWK } from "jose";
import moment from "moment";

export interface KeyPair {
  publicJwk: JWK;
  privateJwk: JWK;
}

export interface SiopOptions {
  aud: string;
  nonce: string;
}

export interface VPOptions {
  vcs: any[];
  aud: string;
  nonce?: string;
}

export interface DescriptorMap {
  id: string;
  format: string;
  path: string;
  path_nested: {
    format: string;
    path: string;
  }[];
}

const DID_ION_KEY_ID = "signingKey";
const SIOP_VALIDITY_IN_MINUTES = 30;

export class Signer {
  did: string | undefined = undefined;

  recoveryKey: ionjs.JwkEs256k | undefined = undefined;
  updateKey: ionjs.JwkEs256k | undefined = undefined;

  privateKeyJwk: ionjs.JwkEs256k | undefined = undefined;
  publicKeyJwk: ionjs.JwkEs256k | undefined = undefined;

  init = async (publicKeyJwk: ionjs.JwkEs256k, privateKeyJwk: ionjs.JwkEs256k): Promise<void> => {
    this.privateKeyJwk = privateKeyJwk;
    this.publicKeyJwk = publicKeyJwk;

    this.recoveryKey = publicKeyJwk;
    this.updateKey = this.recoveryKey;

    const document: ionjs.IonDocumentModel = {
      publicKeys: [
        {
          id: `signingKey`,
          type: "EcdsaSecp256k1VerificationKey2019",
          publicKeyJwk: this.publicKeyJwk,
          purposes: [ionjs.IonPublicKeyPurpose.Authentication],
        },
      ],
    };

    this.did = await ionjs.IonDid.createLongFormDid({
      recoveryKey: this.recoveryKey,
      updateKey: this.updateKey,
      document,
    });
  };

  siop = async (options: SiopOptions): Promise<string> => {
    if (!this.privateKeyJwk) throw new Error("privateJwk is not initialized");
    if (!this.did) throw new Error("did is not initialized");
    const signer = ionjs.LocalSigner.create(this.privateKeyJwk);
    return await signer.sign(
      {
        typ: "JWT",
        alg: "ES256K",
        kid: `${this.did}#${DID_ION_KEY_ID}`,
      },
      {
        iat: moment().unix(),
        exp: moment().add(SIOP_VALIDITY_IN_MINUTES, "minutes").unix(),
        sub: this.did,
        iss: this.did,
        ...options,
      }
    );
  };

  createVP = async (options: VPOptions, format: "ldp_vp" | "jwt_vp_json") => {
    if (!this.privateKeyJwk) throw new Error("privateJwk is not initialized");
    if (!this.did) throw new Error("did is not initialized");
    const signer = ionjs.LocalSigner.create(this.privateKeyJwk);
    const descriptorMap: DescriptorMap = {
      id: "ID card with constraints",
      format,
      path: "$",
      path_nested: [],
    };

    options.vcs.forEach((vc, index) => {
      if (typeof vc === "string") {
        descriptorMap.path_nested.push({
          format: "jwt_vc_json",
          path: `$.verifiableCredential[${index}]`,
        });
      } else {
        descriptorMap.path_nested.push({
          format: "ldp_vc",
          path: `$.verifiableCredential[${index}]`,
        });
      }
    });

    if (format === "jwt_vp_json") {
      const vp = await signer.sign(
        {
          typ: "JWT",
          alg: "ES256K",
          kid: `${this.did}#${DID_ION_KEY_ID}`,
        },
        {
          iat: moment().unix(),
          exp: moment().add(SIOP_VALIDITY_IN_MINUTES, "minutes").unix(),
          vp: {
            "@context": ["https://www.w3.org/2018/credentials/v1"],
            type: ["VerifiablePresentation"],
            verifiableCredential: options.vcs,
          },
          iss: this.did,
          aud: options.aud,
          nonce: options.nonce,
        }
      );
      return { vp, descriptorMap };
    } else if (format === "ldp_vp") {
      // TODO: sign
      // create json-ld verifiable presentation
      const vp = "";
      return { vp, descriptorMap };
    } else {
      throw new Error("format is invalid");
    }
  };
}
