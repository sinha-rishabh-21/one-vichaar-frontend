import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = req.headers
    .get("cookie")
    ?.split("; ")
    .find((c) => c.startsWith("token="))
    ?.split("=")[1];

  return NextResponse.json({ token: token || null });
}
