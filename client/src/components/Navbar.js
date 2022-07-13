import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { Heading, HStack } from "@chakra-ui/react";

import Auth from "../utils/auth";

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* <Flex backgroundColor={'black'} as="nav" p={6} justifyContent="space-between" alignItems="center"> */}
      <Navbar
        className="Navbar sticky-top"
        bg="dark"
        variant="dark"
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <Heading color={"#ffffff8c"} as="h1" size="3xl">
              LYMC
            </Heading>
          </Navbar.Brand>
          <HStack fontSize="1xl" spacing={6}>
            <Navbar.Toggle aria-controls="navbar" />
            <Navbar.Collapse id="navbar">
              <Nav className="ml-auto">
                <Nav.Link className="link" as={Link} to="/">
                  Search the MCU
                </Nav.Link>
                {Auth.loggedIn() ? (
                  <>
                    <Nav.Link className="link" as={Link} to="/saved">
                      Saved Characters
                    </Nav.Link>

                    <Nav.Link className="link" onClick={Auth.logout}>
                      Logout
                    </Nav.Link>
                  </>
                ) : (
                  <Nav.Link className="link" onClick={() => setShowModal(true)}>
                    Login/Sign Up
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </HStack>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignupForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
