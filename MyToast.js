import React,{Component} from "react";
import {Toast, ToastBody, ToastHeader} from "react-bootstrap";

class MyToast extends Component{
    render() {

        const toastCss = {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: "1",
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        }

        return(
            <div style={this.props.show ? toastCss : null}>
                <Toast
                    className={`border text-white ${this.props.type === "danger" ? "border-danger bg-danger" : "border-success bg-success"}`}
                    show={this.props.show}
                >

                    <ToastHeader className={`text-white ${this.props.type === "danger" ? "bg-danger" : "bg-success"}`} closeButton={false}>
                        <strong className={"mr-auto"}>
                            succès
                        </strong>
                    </ToastHeader>

                    <ToastBody>
                        {this.props.message}
                    </ToastBody>
                </Toast>
            </div>
        );
    }
}
export default MyToast;