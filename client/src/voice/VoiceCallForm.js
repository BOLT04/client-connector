import React, { useState } from "react";
import { Button, Form, Label } from "semantic-ui-react";
import { PhoneInput } from "../components/PhoneInput";
import './VoiceCallForm.css'

export function VoiceCallForm() {
  const MAX_PHONE_LENGTH = 13;
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(null);

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    //startCall(phone);
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <Form.Field width={4}>
        <label>Phone</label>
        <div className="phone-input-wrapper">
          <PhoneInput value={phone} onChange={handlePhoneChange} />
          <Button className="phone-icon" primary icon="phone" type="submit" disabled={phoneError} />
        </div>

        {phoneError && (
          <Label pointing prompt>
            {phoneError}
          </Label>
        )}
      </Form.Field>
    </Form>
  );

  function handlePhoneChange(value) {
    if (value.length > MAX_PHONE_LENGTH)
      return setPhoneError(`The phone number can't be longer than 9 digits`);

    setPhoneError(null);
    setPhone(value);
  }
}
