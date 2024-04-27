import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Route, Routes, Link } from "react-router-dom";
import MlbLines from "../views/MLB";

function Navigation() {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            PlaceTheBet
          </Navbar.Brand>
          <Navbar.Brand as={Link} to="/mlb">
            MLB
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/mlb" element={<MlbLines />} />
      </Routes>
    </>
  );
}

export default Navigation;
