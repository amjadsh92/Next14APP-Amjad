import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();

  const result = await prisma.product.create({
    data: data,
  });
  return NextResponse.json(result);
}

export async function GET() {
  const allproducts = await prisma.product.findMany();
  return NextResponse.json(allproducts);
}
