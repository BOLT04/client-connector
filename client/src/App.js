import React from 'react';
import { Container } from 'semantic-ui-react'
import { SendSmsForm } from './sms/SendSmsForm';

function App() {
  return (
    <div className="App">
       <Container>
        <SendSmsForm />
       </Container>
    </div>
  );
}

export default App;
