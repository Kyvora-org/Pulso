import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ username: string }> }
) {
    try {
        const { username } = await params;
        const cleanUsername = decodeURIComponent(username || "").replace(/^@/, "");
        const followers = await prisma.follow.findMany({
            where: {
                following: {
                    username: { equals: cleanUsername, mode: "insensitive" }
                }
            },
            include: {
                follower: {
                    include: {
                        badges: {
                            include: {
                                badge: true
                            }
                        }
                    }
                }
            }
        });

        const users = followers.map(f => f.follower);
        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching followers:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
