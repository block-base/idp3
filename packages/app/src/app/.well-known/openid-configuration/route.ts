import { NextResponse } from "next/server";

import openidConfiguration from "../../../config/openid-configuration.json";

export async function GET() {
  return NextResponse.json(openidConfiguration, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
  });
}
