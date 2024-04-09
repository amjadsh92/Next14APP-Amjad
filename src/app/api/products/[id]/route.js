import { NextResponse } from "next/server";
import pool from "../../../../lib/mysql";


export async function DELETE(request, {params}) {

    try { 
        
        const id = params.id
        const db = await pool.getConnection();
        if (db) console.log("It is connected")
        else console.log("not connected")
        const query = `DELETE from products1 Where id = ${id}`
        const [results] = await db.execute(query)
        console.log(results)
        db.release()
       
    return NextResponse.json(results)
} catch (error) {
    return NextResponse.json({
        error: error
    }, { status: 500 })
}
}
  
