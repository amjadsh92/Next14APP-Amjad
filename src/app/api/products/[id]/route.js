import { NextResponse } from "next/server";
import pool from "../../../../lib/mysql";


export async function DELETE(request, {params}) {

    try { 
        const id = params.id
        const query = `DELETE from products Where id = ${id}`
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
  
