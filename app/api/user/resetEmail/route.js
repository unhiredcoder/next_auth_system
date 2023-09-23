import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "code2pdf11@gmail.com",
    pass: "nmsonggmdyuiuvwt",
  }
});

export const POST = async (NextRequest) => {
  try {
    const body = await NextRequest.json();
    const { email, generatedOtp } = body; // Extract the 'email' property from 'values'
    if (email && generatedOtp) {
      const mailOptions = {
        from: "code2pdf11@gmail.com",
        to: email,
        subject: "Password Reset OTP",
        html: `<body style="background-color: #fafbfc;">
      <div style="vertical-align: middle; width: 100%; text-align: center;">
          <img src="https://i.ibb.co/9Gbn3Cg/aaass-removebg-preview.png" alt="Arengu Logo" style="display: block; margin: 0 auto; padding: 0px; width: 30%;">
  </div>
  <div style="background-color: #fff; padding-bottom: 20px; padding-top: 20px;">
      <div style="vertical-align: middle; width: 100%; text-align: center;">
          <p style="font-size: 16px; font-family: 'Open Sans', Helvetica, Arial, sans-serif; padding-left: 25px; padding-right: 25px;">Hello,</p>
          <p style="font-size: 16px; font-family: 'Open Sans', Helvetica, Arial, sans-serif; padding-left: 25px; padding-right: 25px;">Please use the verification code below:</p>
          <p style="font-size: 24px; font-weight: bold; font-family: 'Open Sans', Helvetica, Arial, sans-serif;padding: 20px 0; background-color: #20c997; padding-left: 25px; padding-right: 25px;">${generatedOtp}</p>
          <p style="font-size: 16px; font-family: 'Open Sans', Helvetica, Arial, sans-serif; padding-left: 25px; padding-right: 16px;">If you didn't request this, you can ignore this email or let us know.</p>
          <p style="font-size: 16px; font-family: 'Open Sans', Helvetica, Arial, sans-serif; padding-left: 25px; padding-right: 25px;">Thanks! <br />Adi's team</p>
      </div>
  </div>
</body>`
      };
      await transporter.sendMail(mailOptions);
    }

    return new NextResponse("OTP sent successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};