import { NextResponse } from "next/server";

import openidConfiguration from "../../../config/openid-configuration.json";

export async function GET() {
  openidConfiguration.authorization_endpoint = `${process.env.NEXT_PUBLIC_APP_URL}/authorize`;
  openidConfiguration.issuer = `${process.env.NEXT_PUBLIC_APP_URL}`;
  return NextResponse.json(openidConfiguration, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
  });
}
