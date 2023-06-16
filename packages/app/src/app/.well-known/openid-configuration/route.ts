import { NextResponse } from "next/server";

import OIDConfig from "../../../config/oid-config.json";

export async function GET() {
  const config = OIDConfig;
  return NextResponse.json(config, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
  });
}
