import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ImportOBJ from "./ImportOBJ";
import ExportScene from "./ExportScene";
import ResetScene from "./ResetScene"

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  InputGroup, InputGroupAddon, InputGroupText, Input
} from 'reactstrap';

class Menu extends Component {
  constructor({ scene }) {
    super();
    this.state = {
      importDropdownOpen: false,
      sceneWirframe: true
    };
    this.scene = scene;
    //console.log(scene);

  }

  importOBJ = () => {
    console.log('import obj');
  }

  importDAE = () => {
    console.log('import DAE');
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <label>
            <Input addon type="checkbox" aria-label="Show scene wirframe" checked={this.state.sceneWirframe} onChange={this.setSceneWirframe}/>
            Show scene wirframe
          </label>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

            <NavItem>
                <NavLink ><ResetScene scene={this.scene} /></NavLink>
              </NavItem>


              <NavItem>
                <NavLink ><ExportScene scene={this.scene} /></NavLink>
              </NavItem>

              <NavItem>
                <NavLink>  <ImportOBJ scene={this.scene} /></NavLink>
              </NavItem>

              
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }

  setSceneWirframe = () => {
    this.setState({
      sceneWirframe: !this.state.sceneWirframe
    });
    this.scene.parent.children[1].visible = !this.state.sceneWirframe;
    console.log( this.scene.parent.children, this.state.sceneWirframe);
  }
}

export default Menu;
