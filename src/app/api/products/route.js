
import { NextResponse } from "next/server";
import pool from "../../../lib/mysql";

export async function GET() {
    try {
        const db = await pool.getConnection()
        if (db) console.log("It is connected")
        else console.log("not connected")
        const query = 'SELECT * FROM products'
        const [rows] = await db.execute(query)
        db.release()
        
    return NextResponse.json(rows)
} catch (error) {
    return NextResponse.json({
        error: error
    }, { status: 500 })
}
}