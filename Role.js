import React, {Component} from "react";
import {Card, Form, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlusSquare, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import MyToast from "./MyToast";

class Role extends Component{

    constructor(props) {
        super(props);
        this.state=this.initialState;
        this.state.show=false;
        this.ajouterRole = this.ajouterRole.bind(this);
        this.rolechange = this.rolechange.bind(this);
    };

    initialState = {
        id:'',
        libelle:''
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        //const {id} = useParams();
       // const roleId = this.state.match.params.id;
        /*const searchParams = new URLSearchParams(window.location.search);
        const roleId = searchParams.get('id');*/
        const url = window.location.pathname;
        const roleId = url.split('/').pop();
        if (roleId) {
            axios.get(`http://localhost:8080/api/role/${roleId}`)
                .then(response => {
                    if (response.data != null) {
                        this.setState({
                            libelle: response.data.libelle
                        });
                    }
                })
                .catch(error => {
                    console.error("Error - " + error);
                });
        }
    };




    ajouterRole = event =>{
        event.preventDefault();

        const role ={
            libelle: this.state.libelle
        };

        axios.post("http://localhost:8080/api/role",role)
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

    rolechange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render(){
        const {libelle}= this.state;
        return(
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                   <MyToast show={this.state.show} message={" Role est ajouter avec succès."} type={"success"}/>
                </div>


                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header className={"bg-dark text-primary"}>
                        <FontAwesomeIcon icon={faPlusSquare}/>
                        &nbsp;
                        Ajouter Role
                    </Card.Header>

                    <Form onSubmit={this.ajouterRole}>
                        <Card.Body>
                            <Form.Group controlId="formGridlibelle" className={"bg-dark text-primary"}>
                                <Form.Label>Libelle</Form.Label>
                                <Form.Control required
                                              type="text" name="libelle" autoComplete="off"
                                              value={libelle} onChange={this.rolechange}
                                              className={"bg-dark text-white"}
                                              placeholder="Entrer Libelle" />
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

                            <Link to={'/TRoles'}>
                                <Button size="sm" variant="info" type="button">
                                    <FontAwesomeIcon icon={faList}/>
                                    &nbsp;
                                    Tableau des Roles
                                </Button>
                            </Link>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>

        );
    }
}
export default Role;