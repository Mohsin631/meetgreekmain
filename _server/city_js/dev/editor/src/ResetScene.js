import React, { Component } from "react";
import ReactDOM from "react-dom";

class ResetScene extends Component {
    constructor({ scene }) {
        super();

        this.scene = scene;

    }

    toggle = (event) => {
        ReactDOM.render(<div></div>, document.getElementById("ui"));
        this.scene.children = [];

    }

    render() {
        return ( <div onClick ={this.toggle} >Reset</div>

        )
    }
}

export default ResetScene;