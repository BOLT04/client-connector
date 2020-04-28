import React from "react";
import { Segment } from "semantic-ui-react";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <Segment inverted>
        Favicon done by&nbsp;
        <a
          href="https://www.flaticon.com/br/autores/alfredo-hernandez"
          title="Alfredo Hernandez"
        >
          Alfredo Hernandez
        </a>
        &nbsp;
        from
        &nbsp;
        <a href="https://www.flaticon.com/br/" title="Flaticon">
          www.flaticon.com
        </a>
      </Segment>
    </footer>
  );
}
