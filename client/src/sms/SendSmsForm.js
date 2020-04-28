import React, { useState } from "react";
import { Button, Form, Label } from "semantic-ui-react";
import { sendSms } from "./sendSms";
import { PhoneInput } from "../components/PhoneInput";

export function SendSmsForm() {
  const MAX_PHONE_LENGTH = 13;
  const [msg, setMsg] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(null);

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    sendSms(msg, phone);
  };

  return (
    <Form className="send-sms-form" onSubmit={handleOnSubmit}>
      <Form.TextArea
        label="Message"
        placeholder="Welcome a new user"
        onChange={(evt) => setMsg(evt.target.value)}
      />
      <Form.Field>
        <label>Phone</label>
        <PhoneInput value={phone} onChange={handlePhoneChange} />

        {phoneError && (
          <Label pointing prompt>
            {phoneError}
          </Label>
        )}
      </Form.Field>

      <Button type="submit" primary disabled={phoneError}>Submit</Button>
    </Form>
  );

  function handlePhoneChange(value) {
    if (value.length > MAX_PHONE_LENGTH)
      return setPhoneError(`The phone number can't be longer than 9 digits`);

    setPhoneError(null);
    setPhone(value);
  }
}
