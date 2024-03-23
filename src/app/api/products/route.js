import { NextResponse } from "next/server";
import pool from "../../../lib/mysql";

export async function GET() {
  try {
    const db = await pool.getConnection();
    const query = "SELECT * FROM products";
    const [rows] = await db.execute(query);
    db.release();return NextResponse.json(rows);
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
    const query = `INSERT INTO products (name, description) VALUES ('${name}', '${description}')`;
    const [results] = await db.execute(query);
    db.release();
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
