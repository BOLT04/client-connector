import { Request, Response } from "express";
import { sendMessage } from "../services/twilio.service";

export async function sendSmsHandler(req: Request, res: Response) {
  try {
    const msg = req.body.msg;
    const phone = req.body.phone;

    // Validate input
    if (!msg) {
      return res
        .status(400)
        .json({
          title: "Invalid Parameters",
          detail: `'msg' parameter is required`,
          status: 400,
        });
    }
    if (!phone) {
      return res
        .status(400)
        .json({
          title: "Invalid Parameters",
          detail: `'phone' parameter is required`,
          status: 400,
        });
    }

    await sendMessage(msg, phone);

    return res.sendStatus(200);
  } catch (error) {
    console.log("ERROR in sendSmsHandler");
    console.error(error);
    return res
      .status(500)
      .json({ title: "Failed to send message", status: 500 });
  }
}
