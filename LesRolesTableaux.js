import React, {Component} from "react";
import {Button, ButtonGroup, Card, Table} from "react-bootstrap";
import {faEdit, faList, faPlusSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import MyToast from "./MyToast";
import {Link} from "react-router-dom";

class LesRolesTableaux extends Component{


    constructor(props) {
        super(props);
        this.state={
            roles : []
        };
    }

    componentDidMount() {
        this.findAllRoles();
    };


    findAllRoles(){
        axios.get("http://localhost:8080/api/role")
            .then(response =>response.data)
            .then((data) => {
                this.setState({roles : data});
            })
    }

    deleteRole = (roleId) =>{
        axios.delete("http://localhost:8080/api/role/" + roleId)
            .then(response => {
                if (response.data != null){
                    this.setState({"show":true})
                    setTimeout(()=>this.setState({"show":false}), 3000)
                    this.setState({
                        roles : this.state.roles.filter(role => role.id !== roleId)
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
                   <MyToast show ={this.state.show} message={"Role est supprimer avec succès."} type={"danger"}/>
               </div>

               <Card className={"border border-dark bg-dark text-white"}>
                   <Card.Header>
                       <FontAwesomeIcon icon={faList}/>
                       &nbsp; Les Roles
                   </Card.Header>

                   <Card.Body>
                       <Table bordered hover striped variant="dark">
                           <thead>
                           <tr>
                               <th>Id</th>
                               <th>Libelle</th>
                               <th>Opération</th>
                           </tr>
                           </thead>

                           <tbody>
                           {
                               this.state.roles.length === 0 ?
                                   <tr align="center">
                                       <td colSpan="9">Aucun role.</td>
                                   </tr>:
                                   this.state.roles.map(
                                       (role) => (
                                           <tr key={role.id}>
                                               <td>
                                                   {role.id}
                                               </td>
                                               <td>
                                                   {role.libelle}
                                               </td>
                                               <td>
                                                   <ButtonGroup>
                                                       <Link to={`/edit/${role.id}`} className="btn btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>&nbsp;
                                                       <Button variant="outline-danger" onClick={this.deleteRole.bind(this, role.id)}><FontAwesomeIcon icon={faTrash}/></Button>
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
                       <Link to={'/Role'}>
                           <Button size="sm" variant="info" type="button">
                               <FontAwesomeIcon icon={faPlusSquare}/>
                               &nbsp;
                              Ajouter Roles
                           </Button>
                       </Link>
                   </Card.Footer>
               </Card>
           </div>
       );
    }
}
export default LesRolesTableaux;
