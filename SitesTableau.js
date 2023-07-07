import React, {Component} from "react";
import {Button, ButtonGroup, Card, Table} from "react-bootstrap";
import {faEdit, faList, faPlusSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import MyToast from "./MyToast";
import {Link} from "react-router-dom";

class SitesTableau extends Component{


    constructor(props) {
        super(props);
        this.state={
            sites : []
        };
    }

    componentDidMount() {
        this.findAllSites();
    };


    findAllSites(){
        axios.get("http://localhost:8080/api/site")
            .then(response =>response.data)
            .then((data) => {
                this.setState({sites : data});
            })
    }

    deleteSite = (siteId) =>{
        axios.delete("http://localhost:8080/api/site/" + siteId)
            .then(response => {
                if (response.data != null){
                    this.setState({"show":true})
                    setTimeout(()=>this.setState({"show":false}), 3000)
                    this.setState({
                        sites : this.state.sites.filter(site => site.id !== siteId)
                    });
                }
                else {
                    this.setState({"show":false})
                }
            });
    };



    render(){
        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show ={this.state.show} message={"Site est supprimer avec succès."} type={"danger"}/>
                </div>

                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faList}/>
                        &nbsp; Les Sites
                    </Card.Header>

                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Ville</th>
                                <th>Opération</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                this.state.sites.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="9">Aucun site.</td>
                                    </tr>:
                                    this.state.sites.map(
                                        (site) => (
                                            <tr key={site.id}>
                                                <td>
                                                    {site.id}
                                                </td>
                                                <td>
                                                    {site.ville}
                                                </td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Link to={`/edit/${site.id}`} className="btn btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>&nbsp;
                                                        <Button variant="outline-danger" onClick={this.deleteSite.bind(this, site.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                                                    </ButtonGroup>
                                                </td>
                                            </tr>
                                        )
                                    )
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Link to={'/Site'}>
                            <Button size="sm" variant="info" type="button">
                                <FontAwesomeIcon icon={faPlusSquare}/>
                                &nbsp;
                                Ajouter Sites
                            </Button>
                        </Link>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}
export default SitesTableau;
