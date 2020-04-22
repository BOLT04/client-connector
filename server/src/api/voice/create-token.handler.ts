import { Request, Response } from "express";
import { generateToken } from "../../services/twilio.service";

/**
 * Generates a JWT token for the client to authenticate with the Twilio library.
 */
export async function createTokenHandler(req: Request, res: Response) {
  try {
    const token = generateToken();
    return res.json({ token });
  } catch (error) {
    console.log("ERROR in createTokenHandler");
    console.error(error);
    return res
      .status(500)
      .json({ title: "Failed to create a token", status: 500 });
  }
}
