import { Navbar, Nav, Button, ButtonGroup } from "react-bootstrap";

export const Header = () => {
  return (
    <header className="mx-3 border-top-0 border-dark shadow mb-5 bg-body">
      <Navbar
        expand="lg"
        bg="light"
        variant="light"
        className="vw-75 d-flex justify-content-between"
      >
        <div>
          <Navbar.Brand href="/" className="d-flex align-items-center fs-2">
            <img
              src="/images/taskmate.webp"
              width="80"
              height="80"
              className="d-inline-block align-top me-4"
              alt="Brand Name logo"
            />{" "}
            Taskmate
          </Navbar.Brand>
        </div>
        <Nav className="">
          <Nav.Item as="div">
            <ButtonGroup className="themeSelector">
              <Button variant="light" className="active-theme">
                light
              </Button>
              <Button variant="info">medium</Button>
              <Button variant="dark">dark</Button>
              <Button variant="danger">gOne</Button>
              <Button variant="warning">gTwo</Button>
              <Button variant="success">gThree</Button>
            </ButtonGroup>
          </Nav.Item>
        </Nav>
      </Navbar>
    </header>
  );
};
