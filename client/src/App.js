import React from "react";
import { Container, Header, Icon } from "semantic-ui-react";
import { SendSmsForm } from "./sms/SendSmsForm";
import { VoiceCallForm } from "./voice/VoiceCallForm";

function App() {
  return (
    <div className="App">
      <Container>
        <Header as="h2" icon>
          <Icon name="envelope" color='orange' />
          Send a SMS
          <Header.Subheader>
            Send a welcome message to a client, a promo code with a discount on this month's orders or just offer your support.
          </Header.Subheader>
        </Header>
        <SendSmsForm />

        <Header as="h2" icon>
          <Icon name="phone" color='green' />
          Make a Phone Call
          <Header.Subheader>
            Start a conversation with a user and keep in touch with your
            clients.
          </Header.Subheader>
        </Header>
        <VoiceCallForm />
      </Container>
    </div>
  );
}

export default App;
