import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { sendSms } from "./sendSms";

export function SendSmsForm() {
  const [msg, setMsg] = useState('')
  const [phone, setPhone] = useState('')

  const handleOnSubmit = evt => {
    evt.preventDefault()
    sendSms(msg, phone)
  }

  return (
    <Form className="send-sms-form" onSubmit={handleOnSubmit}>
      <Form.TextArea label="Message" placeholder="Welcome a new user" onChange={evt => setMsg(evt.target.value)} />
      <Form.Field>
        <label>Phone</label>
        <input placeholder="+15558675310" onChange={evt => setPhone(evt.target.value)} />
      </Form.Field>

      <Button type="submit">Submit</Button>
    </Form>
  );
}
