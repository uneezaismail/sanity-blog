// import { revalidateTag } from "next/cache";
// import { type NextRequest, NextResponse } from "next/server";
// import { parseBody } from "next-sanity/webhook";

// export async function POST(req: NextRequest) {
//   try {
//     const { body, isValidSignature } = await parseBody<any>(
//       req,
//       process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET
//     );

//     if (!isValidSignature) {
//       return new Response("Invalid Signature", { status: 401 });
//     }

//     if (!body?._type) {
//       return new Response("Bad Request: Missing _type", { status: 400 });
//     }

//     // Revalidate the content type (_type)
//     revalidateTag(body._type);

//     // Dynamically revalidate tags for each updated field
//     Object.entries(body).forEach(([key, value]) => {
//       if (value) {
//         revalidateTag(`${body._type}:${key}:${value}`);
//       }
//     });

//     console.log("Revalidated tags:", {
//       type: body._type,
//       fields: body,
//     });

//     return NextResponse.json({
//       status: 200,
//       revalidated: true,
//       now: Date.now(),
//       revalidatedTags: {
//         type: body._type,
//         fields: body,
//       },
//     });
//   } catch (error: any) {
//     console.error(error);
//     return new Response(error.message || "Internal Server Error", { status: 500 });
//   }
// }





import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | undefined;
    }>(req, process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET);

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    revalidateTag(body._type);
    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error: any) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}



