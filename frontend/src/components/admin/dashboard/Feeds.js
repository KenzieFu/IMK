import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";

const FeedData = [
  {
    title: "Buku Fisika XII dipinjam",
    icon: "bi bi-book",
    color: "primary",
    date: "6 minute ago",
  },
  {
    title: "Buku Kimia XII dipinjam",
    icon: "bi bi-book",
    color: "info",
    date: "6 minute ago",
  },
  {
    title: "Buku Biologi XII dipinjam",
    icon: "bi bi-book",
    color: "danger",
    date: "6 minute ago",
  },
  {
    title: "Buku Matematika XII dipinjam",
    icon: "bi bi-book",
    color: "success",
    date: "6 minute ago",
  },
  {
    title: "Buku Fisika XII dipinjam",
    icon: "bi bi-book",
    color: "dark",
    date: "6 minute ago",
  },
  {
    title: "Buku Fisika XII dipinjam",
    icon: "bi bi-book",
    color: "warning",
    date: "6 minute ago",
  },
];

const Feeds = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Notifikasi</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          What's new? 
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {FeedData.map((feed, index) => (
            <ListGroupItem
              key={index}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color={feed.color}
              >
                <i className={feed.icon}></i>
              </Button>
              {feed.title}
              <small className="ms-auto text-muted text-small">
                {feed.date}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
