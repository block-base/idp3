import base64url from "base64url";
import { randomBytes } from "crypto";
import { decodeJwt, decodeProtectedHeader, importJWK, jwtVerify } from "jose";
import { JSONPath } from "jsonpath-plus";

import { PresentationDefinition, PresentationSubmission, VerifiableCredential, VPToken } from "../types";

export const verifyVerifiableCredential = async (vc: string | VerifiableCredential) => {
  if (typeof vc === "string") {
    const { kid } = decodeProtectedHeader(vc);
    if (!kid) {
      throw new Error("kid is undefined");
    }
    const data = await fetch(`https://dev.uniresolver.io/1.0/identifiers/${kid}`).then((res) => res.json());
    const jwk = await importJWK(data.didDocument.verificationMethod[0].publicKeyJwk);
    await jwtVerify(vc, jwk);
  }
  if (typeof vc === "object") {
    // TODO: verify json ld
    if (vc.proof.type === "Ed25519Signature2018") {
      //
    }
  }
  return true;
};

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
export const verifyVpToken = async (vpToken: string, presentationSubmission: PresentationSubmission) => {
  if (presentationSubmission.descriptor_map.format === "jwt_vp_json") {
    const { kid } = decodeProtectedHeader(vpToken);
    if (!kid) {
      throw new Error("kid is undefined");
    }
    const data = await fetch(`https://dev.uniresolver.io/1.0/identifiers/${kid}`).then((res) => res.json());
    const jwk = await importJWK(data.didDocument.verificationMethod[0].publicKeyJwk);
    await jwtVerify(vpToken, jwk);
  } else if (presentationSubmission.descriptor_map.format === "ldp_vp") {
    // TODO: Verify VP Token
    throw new Error("Not implemented");
  }

  // Get Credential
  const decodedVPToken = decodeJwt(vpToken) as VPToken;
  const holderDID = decodedVPToken.iss;

  console.log("debug: " + presentationSubmission.definition_id);

  let delegatableCheckFlag = false;

  presentationSubmission.descriptor_map.path_nested.forEach((path) => {
    const vc = JSONPath({ path: path.path, json: decodedVPToken })[0];
    // TODO: verify vc
    // verifyVerifiableCredential(vc);
    if (
      vc.credentialSubject.id !== holderDID ||
      (vc.type.includes("IdP3DelegatedCredential") && vc.credentialSubject.id === holderDID)
    ) {
      delegatableCheckFlag = !delegatableCheckFlag;
      console.log("found delegate:" + delegatableCheckFlag);
    }
  });

  if (delegatableCheckFlag) {
    throw new Error("Need delegate credential");
  }
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
