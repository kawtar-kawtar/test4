import React from "react";
import {Card, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlusSquare} from "@fortawesome/free-solid-svg-icons";

class DirecteurIncidents extends React.Component{
    render() {
        return(
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faList}/>
                    &nbsp; Les Incidents
                </Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date Début</th>
                            <th>Date Fin</th>
                            <th>Description</th>
                            <th>Ville</th>
                            <th>Etat</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Utilisateur qui a réglé</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr align="center">
                            <td colSpan="9">Aucunne incidents.</td>
                        </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}
export default DirecteurIncidents;