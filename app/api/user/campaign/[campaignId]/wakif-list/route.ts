import { getWakifListTransaction } from "@/data/wakif";
import { NextResponse } from "next/server";

interface IParams {
  campaignId?: string;
}

export async function GET(req: Request, { params }: { params: Promise<IParams> }) {
  const { campaignId } = await params;
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const cursor = searchParams.get('cursor');
  const limit = searchParams.get('limit');

  if (!campaignId || isNaN(+campaignId)) {
    return new NextResponse('Invalid input', { status: 400 });
  }

  try {
    const parsedCursor = cursor || '';
    const parsedLimit = limit && !isNaN(+limit) ? parseInt(limit, 10) : 9;

    const wakifList = await getWakifListTransaction(+campaignId, {
      cursor: parsedCursor,
      limit: parsedLimit,
    });

    return NextResponse.json(wakifList, {
      status: 200
    })
  } catch (error: any) {
    console.log('GET WAKIF LIST ERROR: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}