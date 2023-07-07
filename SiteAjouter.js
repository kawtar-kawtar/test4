import React, {Component} from "react";
import {Card, Form, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlusSquare, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import axios from "axios";
import MyToast from "./MyToast";

class SiteAjouter extends Component{

    constructor(props) {
        super(props);
        this.state=this.initialState;
        this.state.show=false;
        this.ajouterSite = this.ajouterSite.bind(this);
        this.sitechange = this.sitechange.bind(this);
    };

    initialState = {
        id:'',
        ville:''
    };

    ajouterSite = event =>{
        event.preventDefault();

        const site ={
            ville: this.state.ville
        };

        axios.post("http://localhost:8080/api/site",site)
            .then(response => {
                if (response.data != null){
                    this.setState({"show":true})
                    setTimeout(()=>this.setState({"show":false}), 3000)
                }
                else {
                    this.setState({"show":false})
                }
            });
        this.setState(this.initialState);

    };

    sitechange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render(){
        const {ville}= this.state;
        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={" Site est ajouter avec succès."} type={"success"}/>
                </div>


                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header className={"bg-dark text-primary"}>
                        <FontAwesomeIcon icon={faPlusSquare}/>
                        &nbsp;
                        Ajouter Site
                    </Card.Header>

                    <Form onSubmit={this.ajouterSite}>
                        <Card.Body>
                            <Form.Group controlId="formGridville" className={"bg-dark text-primary"}>
                                <Form.Label>Ville</Form.Label>
                                <Form.Control required
                                              type="text" name="ville" autoComplete="off"
                                              value={ville} onChange={this.sitechange}
                                              className={"bg-dark text-white"}
                                              placeholder="Entrer ville" />
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="primary" type="submit">
                                <FontAwesomeIcon icon={faSave}/>
                                &nbsp;
                                Ajouter
                            </Button>{'   '}

                            <Button size="sm" variant="secondary" type="reset">
                                <FontAwesomeIcon icon={faUndo}/>
                                &nbsp;
                                réinitialiser
                            </Button>{'   '}

                            <Link to={'/TSites'}>
                                <Button size="sm" variant="info" type="button">
                                    <FontAwesomeIcon icon={faList}/>
                                    &nbsp;
                                    Tableau des Sites
                                </Button>
                            </Link>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>

        );
    }
}
export default SiteAjouter;