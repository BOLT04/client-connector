import { Request, Response } from "express";
import { verifyPhoneNumber } from "../services/twilio.service";

export async function verifyPhoneNumberHandler(req: Request, res: Response) {
  try {
    const phoneNumber = req.params.number;

    // Validate input
    if (!phoneNumber) return res.sendStatus(400);

    const isValid = await verifyPhoneNumber(phoneNumber);
    return res.json({ isValid });
  } catch (error) {
    console.log("ERROR in verifyPhoneNumberHandler");
    console.error(error);
    return res
      .status(500)
      .json({ title: "Faifafsfled to verify number", status: 500 });
  }
}
