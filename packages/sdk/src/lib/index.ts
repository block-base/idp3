import base64url from "base64url";
import { randomBytes } from "crypto";
import { decodeProtectedHeader, importJWK, jwtVerify } from "jose";

import { PresentationDefinition } from "../types";

export const verifyIdToken = async (idToken: string) => {
  const { kid } = decodeProtectedHeader(idToken);
  if (!kid) {
    throw new Error("kid is undefined");
  }
  const data = await fetch(`https://dev.uniresolver.io/1.0/identifiers/${kid}`).then((res) => res.json());
  const jwk = await importJWK(data.didDocument.verificationMethod[0].publicKeyJwk);
  await jwtVerify(idToken, jwk);
  return true;
};

// TODO: implement
export const verifyVpToken = async (vpToken: string) => {
  return true;
};

export const createNonce = () => {
  const nonce = base64url.encode(randomBytes(8));
  return nonce;
};

export const createAuthorizationUri = async (
  oidConfigUri: string,
  callBackUri: string,
  presentationDefinition: PresentationDefinition,
  nonce: string
) => {
  const oidConfig = await fetch(oidConfigUri).then((res) => res.json());
  const url = new URL(oidConfig.authorization_endpoint);
  url.searchParams.append("response_type", "id_token vp_token");
  url.searchParams.append("scope", "openid");
  url.searchParams.append("id_token_type", "subject_signed");
  url.searchParams.append("response_mode", "post");
  url.searchParams.append("client_id", callBackUri);
  url.searchParams.append("redirect_uri", callBackUri);
  url.searchParams.append("presentation_definition", JSON.stringify(presentationDefinition));
  url.searchParams.append("nonce", nonce);
  return url.toString();
};
