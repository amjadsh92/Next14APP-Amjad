import { NextResponse } from "next/server";
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


export async function DELETE(request, {params}) {

    const id =  params.id
    console.log("id=", id)
    if (!id) {
      return NextResponse.error("Missing 'id' parameter");
    }
  
   const deletePost = await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    }) 
  
    return NextResponse.json({success:1,"message":"Delete success"});
}
  