import React, { useState } from "react";
import { Button, Form, Label } from "semantic-ui-react";
import { PhoneInput } from "../components/PhoneInput";
import './VoiceCallForm.css'
import { startCall, endCall } from "../twilio";

export function VoiceCallForm() {
  const MAX_PHONE_LENGTH = 13;
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(null);
  const [isInCall, setIsInCall] = useState(false);

  const handleStartCall = _ => {
    if (phone.length === 0) return
    
    startCall(phone)
    setIsInCall(true)
  };

  const handleEndCall = _ => {
    endCall()
    setIsInCall(false)
  };

  return (
    <Form>
      <Form.Field width={4}>
        <label>Phone</label>
        <div className="phone-input-wrapper">
          <PhoneInput value={phone} onChange={handlePhoneChange} />
          <Button className="phone-icon" primary icon="phone" disabled={phoneError} onClick={handleStartCall} />
          
          {isInCall && <Button className="phone-icon hangup" negative icon="phone" onClick={handleEndCall} />}
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
