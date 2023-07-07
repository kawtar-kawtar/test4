import React, {Component} from "react";
import {Button, Card, FormControl, InputGroup, Table} from "react-bootstrap";
import {faFastBackward, faFastForward, faStepBackward, faStepForward, faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";

export default class DirecteurInscription extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users : [],
            currentPage : 1,
            usersPerPage : 5
        };
    }


    componentDidMount() {
        this.findAllRandomUsers();
    }



    findAllRandomUsers(){
        axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
            .then(responce => responce.data)
            .then((data) =>{
                this.setState({users : data});
                }
            );
    }



    changePage = event =>{
        this.setState({
            [event.target.name]:  parseInt(event.target.value)
        });
    };



    firstPage = ()=>{
        if(this.state.currentPage > 1){
            this.setState({
                currentPage : 1
            });
        }
    };


    prevPage = ()=>{
        if(this.state.currentPage > 1){
            this.setState({
                currentPage : this.state.currentPage - 1
            });
        }
    };



    nextPage = ()=>{
        if(this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)){
            this.setState({
                currentPage : this.state.currentPage + 1
            });
        }
    };



    lastPage = ()=>{
        if(this.state.currentPage < Math.ceil(this.state.users.length / this.state.usersPerPage)){
            this.setState({
                currentPage : Math.ceil(this.state.users.length / this.state.usersPerPage)
            });
        }
    };


    render() {


        const {users, currentPage, usersPerPage} = this.state;
        const lastIndex = currentPage * usersPerPage;
        const firstIndex = lastIndex - usersPerPage;
        const currentUsers = users.slice(firstIndex, lastIndex);
        const totalPages = users.length / usersPerPage;

        const pageNumCss = {
            width : "45px",
            border: "1px solid #17A2B8",
            color : "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        }

        return(
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faUsers}/>
                        &nbsp; Les Inscriptions
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Email</th>
                                <th>Adresse</th>
                                <th>Created</th>
                                <th>Balance</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                users.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="8">Aucunne personne.</td>
                                    </tr> :
                                    currentUsers.map(
                                        (user, index) =>(
                                            <tr key={index}>
                                                <td>{user.first}</td>
                                                <td>{user.last}</td>
                                                <td>{user.email}</td>
                                                <td>{user.address}</td>
                                                <td>{user.created}</td>
                                                <td>{user.balance}</td>
                                            </tr>
                                        )
                                    )
                            }
                            </tbody>
                        </Table>
                    </Card.Body>

                    <Card.Footer>
                        <div style={{"float":"left"}}>
                            Page {currentPage} sur {totalPages}
                        </div>

                        <div style={{"float":"right"}}>
                            <InputGroup size="sm">

                                    <Button type="button" variant="outline-info"
                                            disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}
                                    >
                                        <FontAwesomeIcon icon={faFastBackward}/>{'  '}
                                        Premiére
                                    </Button>

                                    <Button type="button" variant="outline-info"
                                            disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}
                                    >
                                        <FontAwesomeIcon icon={faStepBackward}/>{'  '}
                                        Précédent
                                    </Button>




                                    <FormControl style={pageNumCss} className={"bg-dark"}
                                                 name="currentPage"
                                                 value={currentPage}
                                                 onChange={this.changePage}
                                    />






                                    <Button type="button" variant="outline-info"
                                            disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}
                                    >
                                        Suivant {'  '}
                                        <FontAwesomeIcon icon={faStepForward}/>
                                    </Button>

                                    <Button type="button" variant="outline-info"
                                            disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}
                                    >
                                        Dérniére {'  '}
                                        <FontAwesomeIcon icon={faFastForward}/>
                                    </Button>

                            </InputGroup>
                        </div>
                    </Card.Footer>
                </Card>
            </div>

        );
    }
}