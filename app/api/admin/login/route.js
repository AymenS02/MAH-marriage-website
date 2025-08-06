import { NextResponse } from "next/server";

export async function POST(req) {
  const { password } = await req.json();

  // The real password — stored only on the server
  const CORRECT_PASSWORD = process.env.ADMIN_PASSWORD; 

  if (password === CORRECT_PASSWORD) {
    // Set an HTTP-only cookie to remember login
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_auth", "true", {
      httpOnly: true, // Can't be accessed by JS
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });
    return res;
  }

  return NextResponse.json({ success: false, message: "Invalid password" }, { status: 401 });
}
