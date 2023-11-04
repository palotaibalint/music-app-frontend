import React from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import SongModel from "../../models/SongModel";

type Props = {
  song: SongModel;
};

function ReviewSong({ song }: Props) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <Card style={{ width: "28rem" }}>
            <Card.Img variant="top" src={song.img} />
            <Card.Body>
              <Card.Title>{song.title}</Card.Title>
              <Card.Text>{song.artist}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-6">
          <Card style={{ width: "18rem" }}>
            <Card.Header>Details</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Album: {song.album}</ListGroup.Item>
              <ListGroup.Item>Duration: {song.duration}</ListGroup.Item>
              <ListGroup.Item>Times viewed: {song.clicks}</ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ReviewSong;
