import { Request, Response } from "express";
import { connectCall, createCall } from "../../services/twilio.service";

export async function connectCallHandler(req: Request, res: Response) {
  try {
    console.debug('Entered connectCallHandler', req.body)
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      console.error(
        "ERROR: No phoneNumber parameter was provided in connectCallHandler"
      );
      return res.sendStatus(400); // TODO: improve error response
    }
    const rsp = connectCall(phoneNumber);
    res.send(rsp);
    console.debug('Exiting connectCallHandler')
  } catch (error) {
    console.log("ERROR in connectCallHandler");
    console.error(error);
    return res
      .status(500)
      .json({ title: "Failed to connect a call", status: 500 });
  }
}


export async function createCallHandler(req: Request, res: Response) {
  try {
    console.debug('Entered createCallHandler', req.body)
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      console.error(
        "ERROR: No phoneNumber parameter was provided in createCallHandler"
      );
      return res.sendStatus(400);
    }

    await createCall(phoneNumber)
    res.sendStatus(200);
    console.debug('Exiting createCallHandler')
  } catch (error) {
    console.log("ERROR in createCallHandler");
    console.error(error);
    return res
      .status(500)
      .json({ title: "Failed to create a call", status: 500 });
  }
}