import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

class NavigationBar extends React.Component {
render() {
    return(
        <Navbar bg="dark" variant="dark">
            <Link to={"Directeur"} className="navbar-brand">
                <img src="https://www.onda.ma/extension/onda_design/design/onda_design/images/logo.png" width="100" height="75"alt="brand"/>
                ONDA
            </Link>

            <Nav className="mr-auto">
                <Link to={"Directeur"} className="nav-link">Home</Link>
                <Link to={"inscriptions"} className="nav-link">Inscriptions</Link>
                <Link to={"incidents"} className="nav-link">Incidents</Link>
                <Link to={"TRoles"} className="nav-link">Roles</Link>
                <Link to={"TSites"} className="nav-link">Sites</Link>
            </Nav>
        </Navbar>
    );
}
}
export default NavigationBar;