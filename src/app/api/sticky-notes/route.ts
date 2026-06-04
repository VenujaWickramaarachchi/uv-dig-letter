import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET /api/sticky-notes
export async function GET() {
  try {
    // Sort pinned notes to the top, then newest notes first
    const notes = await query(
      "SELECT id, name, message, created_at, is_pinned, hearts, roses, smiles, sparks FROM sticky_notes ORDER BY is_pinned DESC, created_at DESC"
    );
    return NextResponse.json(notes);
  } catch (err) {
    console.error("GET /api/sticky-notes error:", err);
    return NextResponse.json(
      { error: "Failed to fetch sticky notes from database." },
      { status: 500 }
    );
  }
}

// POST /api/sticky-notes
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    // Validation checks
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }
    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }
    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message cannot exceed 500 characters." },
        { status: 400 }
      );
    }

    // Insert note into MySQL
    const sql = `
      INSERT INTO sticky_notes (name, message, is_pinned, hearts, roses, smiles, sparks)
      VALUES (?, ?, 0, 0, 0, 0, 0)
    `;
    const result: any = await query(sql, [name.trim(), message.trim()]);

    const newNote = {
      id: result.insertId,
      name: name.trim(),
      message: message.trim(),
      created_at: new Date().toISOString(),
      is_pinned: 0,
      hearts: 0,
      roses: 0,
      smiles: 0,
      sparks: 0,
    };

    return NextResponse.json(newNote, { status: 201 });
  } catch (err) {
    console.error("POST /api/sticky-notes error:", err);
    return NextResponse.json(
      { error: "Failed to create sticky note in database." },
      { status: 500 }
    );
  }
}
