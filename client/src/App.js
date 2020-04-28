import React from "react";
import { Container, Header, Icon, Image } from "semantic-ui-react";
import { SendSmsForm } from "./sms/SendSmsForm";
import logo from './logo.png'
import { Footer } from "./Footer";
import './App.css'

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <Header as="h2">
          <Image src={logo} size='small' />
          Client Connector
        </Header>
      </header>

      <Container>
        <Header as="h2" icon>
          <Icon name="envelope" color='orange' />
          Send a SMS
          <Header.Subheader>
            Send a welcome message to a client, a promo code with a discount on this month's orders or just offer your support.
          </Header.Subheader>
        </Header>
        <SendSmsForm />
      </Container>
     
      <Footer />
    </div>
  );
}
