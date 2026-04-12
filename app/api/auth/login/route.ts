import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ error: '이메일과 비밀번호를 입력해주세요.' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) {
    return NextResponse.json({ error: '이메일 또는 비밀번호가 틀렸습니다.' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return NextResponse.json({ error: '이메일 또는 비밀번호가 틀렸습니다.' }, { status: 401 })
  }

  return NextResponse.json({ success: true, userId: user.id, name: user.name })
}