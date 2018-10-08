import React from "react";
import {
  InputGroup,
  Container,
  Row,
  Col,
  InputGroupAddon,
  Input,
  Button
} from "reactstrap";

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <InputGroup>
          <Input
            type="username"
            name="addUserName"
            id="idUserName"
            placeholder="Write your username here !"
          />
          <InputGroupAddon addonType="prepend">
            <Button>Accept</Button>
          </InputGroupAddon>
        </InputGroup>
        <br />
      </div>
    );
  }
}