import { Request, Response } from "express";
import { sendMessage, InvalidPhoneNumberError } from "../services/twilio.service";

export async function sendSmsHandler(req: Request, res: Response) {
  try {
    const msg = req.body.msg;
    const phone = req.body.phone;

    // Validate input
    if (!msg || typeof msg !== 'string')
      return sendBadRequest(
        res,
        "Invalid Parameters",
        `'msg' parameter is required`
      );
    if (!phone || typeof msg !== 'string')
      return sendBadRequest(
        res,
        "Invalid Parameters",
        `'phone' parameter is required`
      );

    try {
      await sendMessage(msg, phone);
      return res.sendStatus(200);
    } catch (error) {
      if (error.name === "InvalidPhoneNumberError") {
        return sendBadRequest(
          res,
          "Invalid Parameters",
          `'phone' is an invalid number`
        );
    }
      else throw error;
    }
  } catch (error) {
    console.log("ERROR in sendSmsHandler");
    console.error(error);
    return res
      .status(500)
      .json({ title: "Failed to send message", status: 500 });
  }
}

function sendBadRequest(res: Response, title: string, detail?: string) {
  //TODO: move this function elsewhere
  return res.status(400).json({
    title,
    detail,
    status: 400,
  });
}
