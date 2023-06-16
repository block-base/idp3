import { JwkEs256k } from "@decentralized-identity/ion-sdk";

export interface SigningKey {
  publicKey: JwkEs256k;
  privateKey: JwkEs256k;
}
