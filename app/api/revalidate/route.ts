import type { NextRequest } from "next/server";

import { hookSecret } from "@/sanity/lib/sanity.api";

import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | undefined;
    }>(req, hookSecret);

    // Check if signature is valid
    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    // Validate body
    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    // Revalidate Cache Tag
    revalidateTag(body._type);
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("An unknown error occurred", { status: 500 });
  }
}
