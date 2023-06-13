import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const gitcoinPassportApiKey = process.env.GITCOIN_PASSPORT_API_KEY;
  if (!gitcoinPassportApiKey) {
    throw new Error("gitcoinPassportApiKey not defined");
  }
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  if (typeof address !== "string") {
    throw new Error("address is invalid");
  }
  const { items } = await fetch(
    `https://api.scorer.gitcoin.co/registry/stamps/${address}?limit=1000&include_metadata=false`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-Key": gitcoinPassportApiKey,
      },
    }
  ).then((response) => response.json());
  return NextResponse.json(items, { status: 200 });
}
