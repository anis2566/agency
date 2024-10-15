import { NextRequest, NextResponse } from "next/server";
import { ServiceStatus } from "@prisma/client";

import { db } from "@/lib/prisma";
import { getServiceDataInclude, ServicePage } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor") || undefined;
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");

    const pageSize = 8;

    const services = await db.service.findMany({
      where: {
        ...(search && {
          name: { contains: search, mode: "insensitive" },
        }),
        ...(category && {
          category: {
            name: category,
          },
        }),
        status: ServiceStatus.Published
      },
      include: getServiceDataInclude(),
      orderBy: {
        createdAt: sort === "asc" ? "asc" : "desc",
      },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor =
      services.length > pageSize ? services[pageSize].id : null;

    const data: ServicePage = {
      services: services,
      nextCursor,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
