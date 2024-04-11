import { NextResponse } from "next/server";
import pool from "../../../lib/mysql";

export async function GET() {
  try {
    const db = await pool.getConnection();
    const query = "SELECT * FROM products1";
    const [rows] = await db.execute(query);
    console.log("[rows]", [rows]);
    db.release();
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const db = await pool.getConnection();
    const { name, description } = data;
    let query = `INSERT INTO products1 (name, description) VALUES ('${name}', '${description}')`;
    db.execute(query);
    query = "SELECT * FROM products1";
    const results = await db.execute(query);
    db.release();
    return NextResponse.json(results[0]);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
