import { Container, Nav, Navbar } from "react-bootstrap";

export default function NavbarComponent() {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>Create Product</Navbar.Brand>
        <Nav>
          <Nav.Item>Account</Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

