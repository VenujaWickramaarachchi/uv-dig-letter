import { NextResponse } from "next/server";
import { query } from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PATCH /api/sticky-notes/[id]
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { reactionType, is_pinned } = body;

    // 1. Handle Reaction Count increments
    if (reactionType) {
      const allowedReactions = ["hearts", "roses", "smiles", "sparks"];
      if (!allowedReactions.includes(reactionType)) {
        return NextResponse.json(
          { error: "Invalid reaction type." },
          { status: 400 }
        );
      }

      await query(
        `UPDATE sticky_notes SET ${reactionType} = ${reactionType} + 1 WHERE id = ?`,
        [id]
      );
      
      return NextResponse.json({ success: true });
    }

    // 2. Handle Pinned Status (Admin Only)
    if (typeof is_pinned !== "undefined") {
      const adminPasswordHeader = request.headers.get("x-admin-password");
      if (!adminPasswordHeader || adminPasswordHeader !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
      }

      await query(
        "UPDATE sticky_notes SET is_pinned = ? WHERE id = ?",
        [is_pinned ? 1 : 0, id]
      );

      return NextResponse.json({ success: true, is_pinned: is_pinned ? 1 : 0 });
    }

    return NextResponse.json({ error: "Missing parameters." }, { status: 400 });
  } catch (err) {
    console.error("PATCH /api/sticky-notes/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to update sticky note." },
      { status: 500 }
    );
  }
}

// DELETE /api/sticky-notes/[id] (Admin Only)
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    // Verify admin credentials
    const adminPasswordHeader = request.headers.get("x-admin-password");
    if (!adminPasswordHeader || adminPasswordHeader !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized admin request." }, { status: 401 });
    }

    await query("DELETE FROM sticky_notes WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/sticky-notes/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to delete sticky note from database." },
      { status: 500 }
    );
  }
}
