import { verifyIdToken, verifyVpToken } from "@idp3/sdk";
import cache from "memory-cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  request.nextUrl.searchParams.get("nonce");
  const nonce = request.nextUrl.searchParams.get("nonce");
  console.log("nonce", nonce);
  const session = cache.get(nonce);
  console.log("session", session);
  if (!session) {
    return NextResponse.json(
      { verifier: false },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
      }
    );
  }
  const { idToken, vpToken } = session;
  return NextResponse.json(
    { verifier: true, idToken, vpToken },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    }
  );
}

export async function POST(request: NextRequest) {
  const bodyText = await request.text();
  const params = new URLSearchParams(bodyText);

  const nonce = params.get("nonce");
  console.log("nonce", nonce);

  const idToken = params.get("id_token");
  const vpToken = params.get("vp_token");

  console.log("idToken", idToken);
  if (typeof idToken !== "string") {
    throw new Error("idToken type is invalid");
  } else {
    const isIdTokenVerified = await verifyIdToken(idToken);
    console.log("isIdTokenVerified", isIdTokenVerified);
    if (!isIdTokenVerified) {
      throw new Error("idToken is invalid");
    }
  }

  console.log("vpToken", vpToken);
  if (typeof vpToken !== "string") {
    throw new Error("vpToken type is invalid");
  } else {
    const isVpTokenVerified = await verifyVpToken(vpToken);
    console.log("isVpTokenVerified", isVpTokenVerified);
    if (!isVpTokenVerified) {
      throw new Error("vpToken is invalid");
    }
  }

  cache.put(nonce, { idToken, vpToken });

  return NextResponse.json(
    { verified: true, idToken },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
    }
  );
}
