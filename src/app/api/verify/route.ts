import { NextResponse } from "next/server"

let responseCount = 1

export async function POST(request: Request) {
  try {
    const { recaptcha } = await request.json()

    if (recaptcha) {
      responseCount = 1
      // const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`
      const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=6LcxEFgrAAAAAEDw1BqJkAVLhv0kS_WiVXmCEqQ3&response=${recaptcha}`

      const captchaResponse = await fetch(verificationUrl, {
        method: "POST"
      })
      const captchaData = await captchaResponse.json()
      console.log(captchaData)
      if (!captchaData.success) {
        return NextResponse.json({ message: "YOU A ROBOT!" }, { status: 401 })
      } else {
        return NextResponse.json({ message: "OK" }, { status: 200 })
      }
    } else if (responseCount >= 5) {
      responseCount = 1
      return NextResponse.json(
        { message: "Please verify that you are not a robot" },
        { status: 429 }
      )
    } else {
      responseCount++
      return NextResponse.json({ message: "OK" }, { status: 200 })
    }
  } catch (error) {
    responseCount = 1
    console.error("Login error:", error)
  }
}

export async function GET() {
  return NextResponse.json({
    message: "GET WORKED!"
  })
}
