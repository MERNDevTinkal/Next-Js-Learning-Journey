import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

interface EmailParams {
  email: string;
  emailType: string;
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailParams) => {
  try {

    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "verify") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 30 * 60 * 1000,  //30 minutes
      });
    } else if (emailType === "reset") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 30 * 60 * 1000, // 30 minutes
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f6dffccc92954b",
        pass: "896a7d0917be8e",
      },
    });

    const mailOptions = {
      from: "tinkal@tinkal.ai",
      to: email,
      subject: emailType === "verify" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "verify" ? "verify your email" : "reset your password"
      } or copy and paste the link in your browser.
       <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
       <br>Note: This Link is valid for 30 minutes only.
       </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error sending email: ${error.message}`);
    }
    throw new Error("Unknown error occurred while sending email");
  }
};
