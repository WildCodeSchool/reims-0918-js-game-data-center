import React from "react";
import { Card, CardImg, CardBody, CardTitle } from "reactstrap";

const changeCoverSide = (cover) => {
  const urlToArray = cover.split("/");
  return urlToArray;
}

const GameThumbnail = ({ name, cover }) => (
  <div>
    <Card>
      <CardImg src={cover.url} alt="Card image cap" />
      changeCoverSide(cover.url)
      <CardBody>
        <CardTitle>{name}</CardTitle>
      </CardBody>
    </Card>
  </div>
);

export default GameThumbnail;
