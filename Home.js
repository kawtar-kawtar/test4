import React from "react";
import {Card} from "react-bootstrap";

class Home extends React.Component{
    render() {
        return(
            <Card className="bg-dark text-white">
                <Card.Header>Hello, world!</Card.Header>
                <Card.Body>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </Card.Body>
            </Card>
        );
    }
}
export default Home;