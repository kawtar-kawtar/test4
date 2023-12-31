import React from "react";
import {Col, Container, Navbar} from "react-bootstrap";

class Footer extends React.Component{
    render() {
        let fullYear = new Date().getFullYear();

        return(
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div>
                            {fullYear}-{fullYear+1}, Office National Des Aéroports, Gestion des incidents.
                        </div>
                    </Col>
                </Container>
            </Navbar>
        );
    }
}
export default Footer;