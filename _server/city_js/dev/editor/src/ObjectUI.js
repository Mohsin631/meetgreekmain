import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Collapse, Button, CardBody, Card, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import * as BABYLON from "babylon";

class ObjectUI extends Component {
  constructor({ mesh }) {
    super();
    //console.log(mesh.userData);
    let count = 0;
    var state = {};
    for (let i in mesh.userData) {
      count++;
      state[i] = mesh.userData[i];
    }
    this.mesh = mesh;
    if (count) {
      this.state = state;
    }
    else {
      this.state = {
        collapse: false,
        scale: '1',
        buffer: '1',
        side: '0',
        shadows: false,
        map: null,
        alpha: null,
        lightmap: null,
        alphaTest: '0',
        transparent: '0',
        opacity: '1',
        color: 'ffffff',
        collider: '0',
        wirframe: '0',
        pos: [0, 0, 0],
        rot: [0, 0, 0],
        mixmap: null,
        addmap1: null,
        addmap2: null,
        addmap3: null,
        addmap4: null
      };


      this.mesh.userData = {
        scale: '1',
        buffer: '1',
        side: '0',
        shadows: false,
        map: null,
        alpha: null,
        lightmap: null,
        alphaTest: '0',
        transparent: '0',
        opacity: '1',
        color: 'ffffff',
        collider: '0',
        wirframe: '0',
        pos: [0, 0, 0],
        rot: [0, 0, 0],
        mixmap: null,
        addmap1: null,
        addmap2: null,
        addmap3: null,
        addmap4: null
      };
    }

    this.state.visible = true;
    //this.updateUserData();


    //console.log(mesh);

  }

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  changeScale = (event) => {
    //console.log(event.target.value);
    let val = event.target.value;
    this.setState(state => ({ scale: val }));
    this.mesh.scale.set(val, val, val);
    this.mesh.userData.scale = val;
    //this.updateUserData();

  }

  changeBuffer = (event) => {
    let val = event.target.value;
    this.setState(state => ({ buffer: val }));
    //this.updateUserData();
    this.mesh.userData.buffer = val;
  }

  changeSide = (event) => {

    let val = parseInt(event.target.value);

    this.setState(state => ({ side: val }));
    this.mesh.basicMaterial.side = val;
    this.mesh.shaderMaterial.side = val;
    //this.updateUserData();
    this.mesh.userData.side = val;

  }

  changeShadows = (event) => {
    let val = event.target.value;
    this.setState(state => ({ shadows: val }));
    //this.updateUserData();
    this.mesh.userData.shadows = val;
  }

  changeMap = (event) => {

    let files = event.target.files;
    if (files.length) {
      var file = files[0];
      var filename = file.name;
      //console.log(file.name);
      //var extension = filename.split('.').pop().toLowerCase();
      var reader = new FileReader();
      let img = new Image();
      let texture = new BABYLON.Texture(img);
      texture.wrapS = texture.wrapT = BABYLON.RepeatWrapping;

      img.onload = () => {
        texture.needsUpdate = true;
        //console.log(texture);
      };
      reader.addEventListener('load', (event) => {
        img.src = event.target.result;

      }, false);
      reader.readAsDataURL(file);
      this.mesh.basicMaterial.map = texture;
      this.mesh.basicMaterial.needsUpdate = true;
      this.mesh.shaderMaterial.uniforms.map.value = texture;
      //console.log(file.name);
      this.setState(state => ({ map: filename }));
      //this.updateUserData();
      this.mesh.userData.map = filename;
      event.target.value = '';
    }

  }

  changeAlpha = (event) => {

    let files = event.target.files;
    if (files.length) {
      var file = files[0];
      var filename = file.name;
      //console.log(file.name);
      //var extension = filename.split('.').pop().toLowerCase();
      var reader = new FileReader();
      let img = new Image();
      let texture = new BABYLON.Texture(img);
      texture.wrapS = texture.wrapT = BABYLON.RepeatWrapping;

      img.onload = () => {
        texture.needsUpdate = true;
        //console.log(texture);
      };
      reader.addEventListener('load', (event) => {
        img.src = event.target.result;

      }, false);
      reader.readAsDataURL(file);
      this.mesh.basicMaterial.alphaMap = texture;
      this.mesh.basicMaterial.transparent = true;
      this.mesh.basicMaterial.needsUpdate = true;

      this.setState(state => ({ alpha: filename }));
      //this.setState(state => ({ transparent: '1' }));
      //this.updateUserData();
      this.mesh.userData.alpha = filename;
      //this.mesh.userData.transparent = '1';
      event.target.value = '';
    }
  }

  changeLightMap = (event) => {

    let files = event.target.files;
    if (files.length) {
      var file = files[0];
      var filename = file.name;
      //console.log(file.name);
      //var extension = filename.split('.').pop().toLowerCase();
      var reader = new FileReader();
      let img = new Image();
      let texture = new BABYLON.Texture(img);
      texture.wrapS = texture.wrapT = BABYLON.RepeatWrapping;

      img.onload = () => {
        texture.needsUpdate = true;
        //console.log(texture);
      };
      reader.addEventListener('load', (event) => {
        img.src = event.target.result;

      }, false);
      reader.readAsDataURL(file);
      this.mesh.basicMaterial.lightMap = texture;
      this.mesh.basicMaterial.needsUpdate = true;

      this.mesh.shaderMaterial.uniforms.lightMap.value = texture;
      this.mesh.shaderMaterial.defines.USE_LIGHTMAP = true;
      this.mesh.shaderMaterial.needsUpdate = true;

      this.setState(state => ({ lightMap: filename }));
      //this.updateUserData();
      //console.log(this.state);
      this.mesh.userData.lightmap = filename;
      event.target.value = '';
    }
  }

  changeAlphaTest = (event) => {
    let val = event.target.value;
    this.setState(state => ({ alphaTest: val }));
    this.mesh.basicMaterial.alphaTest = val;
    this.mesh.basicMaterial.needsUpdate = true;
    //this.updateUserData();
    this.mesh.userData.alphaTest = val;
    console.log(val);

  }

  changeTransparent = (event) => {
    let val = parseInt(event.target.value);
    this.setState(state => ({ transparent: val }));
    this.mesh.basicMaterial.transparent = (val ) ? true : false;
    this.mesh.basicMaterial.needsUpdate = true;
       //console.log(this.mesh.material.transparent, val,  this.state.alpha, (val || this.state.alpha));
    //this.updateUserData();
    this.mesh.userData.transparent = val;

  }


  changeColor = (event) => {
    let val = event.target.value;
    this.setState(state => ({ color: val }));
    this.mesh.basicMaterial.color.set(parseInt(val, 16));
    //this.updateUserData();
    this.mesh.userData.color = val;

  }

  changeCollider = (event) => {
    let val = event.target.value;
    this.setState(state => ({ collider: val }));
    if (val === '1') {
      this.setState(state => ({ buffer: '0' }));
    }
    else {
      this.setState(state => ({ buffer: '1' }));
    }


    this.mesh.basicMaterial.wireframe = (val == '1') ? true : false;

    this.mesh.basicMaterial.needsUpdate = true;
    //this.updateUserData();
    this.mesh.userData.collider = val;

  }

  changeWireframe = (event) => {
    let val = event.target.value;
    this.setState(state => ({ wireframe: val }));


    this.mesh.basicMaterial.wireframe = (val === '1' || this.state.collider == '1') ? true : false;

    this.mesh.basicMaterial.needsUpdate = true;
    //this.updateUserData();
    this.mesh.userData.wireframe = val;

  }

  changeOpacity = (event) => {
    let val = event.target.value;
    this.setState(state => ({ opacity: val }));
    this.mesh.basicMaterial.opacity = val;
    //this.updateUserData();
    this.mesh.userData.opacity = val;
    if(val != 1 ){
      this.setState(state => ({ transparent: '1' }));
      this.mesh.userData.transparent = '1';
      this.mesh.basicMaterial.transparent = true;

    }

  }



  changePosX = (event) => {
    let val = event.target.value;
    this.setState(state => ({ pos: [val, this.state.pos[1], this.state.pos[2]] }));
    this.mesh.position.x = val;
    //this.updateUserData();
    this.mesh.userData.pos[0] = val;

  }

  changePosY = (event) => {
    let val = event.target.value;
    this.setState(state => ({ pos: [this.state.pos[0], val, this.state.pos[2]] }));
    this.mesh.position.z = val;
    //this.updateUserData();
    this.mesh.userData.pos[1] = val;

  }

  changePosZ = (event) => {
    let val = event.target.value;
    this.setState(state => ({ pos: [this.state.pos[0], this.state.pos[1], val] }));
    this.mesh.position.y = val;
    //this.updateUserData();
    this.mesh.userData.pos[2] = val;

  }

  changeRotX = (event) => {
    let val = event.target.value;
    this.setState(state => ({ rot: [val, this.state.rot[1], this.state.rot[2]] }));
    this.mesh.rotation.x = val / 180 * Math.PI;
    //this.updateUserData();
    this.mesh.userData.rot[0] = val;

  }

  changeRotY = (event) => {
    let val = event.target.value;
    this.setState(state => ({ pos: [this.state.rot[0], val, this.state.rot[2]] }));
    this.mesh.rotation.y = val / 180 * Math.PI;
    //this.updateUserData();
    this.mesh.userData.rot[1] = val;

  }

  changeRotZ = (event) => {
    let val = event.target.value;
    this.setState(state => ({ pos: [this.state.rot[0], this.state.rot[1], val] }));
    this.mesh.rotation.z = val / 180 * Math.PI;
    //this.updateUserData();
    this.mesh.userData.rot[2] = val;
  }

  changeVisible = (event) => {
    let val = event.target.value;
    this.setState(state => ({ visisble: val }));
    this.mesh.visible = (val == '1') ? true : false;
    //console.log(this.mesh.visible);
  }

  changeMixMap = (event) => {
    //let val = event.target.value;
    //this.setState(state => ({ mixmap: val }));

    let files = event.target.files;
    if (files.length) {
      var file = files[0];
      var filename = file.name;
     
      var reader = new FileReader();
      let img = new Image();
      let texture = new BABYLON.Texture(img);
      texture.wrapS = texture.wrapT = BABYLON.RepeatWrapping;

      img.onload = () => {
        texture.needsUpdate = true;
       
      };
      reader.addEventListener('load', (event) => {
        img.src = event.target.result;

      }, false);
      reader.readAsDataURL(file);
      this.mesh.shaderMaterial.uniforms.mixMap.value = texture;
      this.mesh.material = this.mesh.shaderMaterial;
      //this.mesh.shaderMaterial.needsUpdate = true;

      this.setState(state => ({ mixMap: filename }));
      
      this.mesh.userData.mixmap = filename;
      event.target.value = '';
    }
  }

  changeAddMap1 = (event) => {
    let files = event.target.files;
    if (files.length) {
      var file = files[0];
      var filename = file.name;
     
      var reader = new FileReader();
      let img = new Image();
      let texture = new BABYLON.Texture(img);
      texture.wrapS = texture.wrapT = BABYLON.RepeatWrapping;

      img.onload = () => {
        texture.needsUpdate = true;
       
      };
      reader.addEventListener('load', (event) => {
        img.src = event.target.result;

      }, false);
      reader.readAsDataURL(file);
      this.mesh.shaderMaterial.uniforms.addMap1.value = texture;
      //this.mesh.shaderMaterial.needsUpdate = true;

      this.setState(state => ({ addMap1: filename }));
      
      this.mesh.userData.addmap1 = filename;
      event.target.value = '';
    }
  }

  changeAddMap2 = (event) => {
    let files = event.target.files;
    if (files.length) {
      var file = files[0];
      var filename = file.name;
     
      var reader = new FileReader();
      let img = new Image();
      let texture = new BABYLON.Texture(img);
      texture.wrapS = texture.wrapT = BABYLON.RepeatWrapping;

      img.onload = () => {
        texture.needsUpdate = true;
       
      };
      reader.addEventListener('load', (event) => {
        img.src = event.target.result;

      }, false);
      reader.readAsDataURL(file);
      this.mesh.shaderMaterial.uniforms.addMap2.value = texture;
      //this.mesh.shaderMaterial.needsUpdate = true;

      this.setState(state => ({ addMap2: filename }));
      
      this.mesh.userData.addmap2 = filename;
      event.target.value = '';
    }
  }

  changeAddMap3 = (event) => {
    let files = event.target.files;
    if (files.length) {
      var file = files[0];
      var filename = file.name;
     
      var reader = new FileReader();
      let img = new Image();
      let texture = new BABYLON.Texture(img);
      texture.wrapS = texture.wrapT = BABYLON.RepeatWrapping;

      img.onload = () => {
        texture.needsUpdate = true;
       
      };
      reader.addEventListener('load', (event) => {
        img.src = event.target.result;

      }, false);
      reader.readAsDataURL(file);
      this.mesh.shaderMaterial.uniforms.addMap3.value = texture;
      //this.mesh.shaderMaterial.needsUpdate = true;

      this.setState(state => ({ addMap3: filename }));
      
      this.mesh.userData.addmap3 = filename;
      event.target.value = '';
    }
  }

  changeAddMap4 = (event) => {
    let files = event.target.files;
    if (files.length) {
      var file = files[0];
      var filename = file.name;
     
      var reader = new FileReader();
      let img = new Image();
      let texture = new BABYLON.Texture(img);
      texture.wrapS = texture.wrapT = BABYLON.RepeatWrapping;

      img.onload = () => {
        texture.needsUpdate = true;
       
      };
      reader.addEventListener('load', (event) => {
        img.src = event.target.result;

      }, false);
      reader.readAsDataURL(file);
      this.mesh.shaderMaterial.uniforms.addMap4.value = texture;
      //this.mesh.shaderMaterial.needsUpdate = true;

      this.setState(state => ({ addMap4: filename }));
      
      this.mesh.userData.addmap4 = filename;
      event.target.value = '';
    }
  }


  render() {
    //console.log(this.state.transparent);
    return (
      <div>
        <Container>
          <Row>
            <Col>{this.mesh.name}</Col>
            <Col>  <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Options</Button></Col>
          </Row>
        </Container>

        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label for="buffer">Visible</Label>
                  <Input type="select" name="visible" id="buffer" onChange={this.changeVisible}>
                    <option selected={this.state.visisble == '1'}>1</option>
                    <option selected={this.state.visisble == '0'}>0</option>


                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="scale">Scale</Label>
                  <Input name="scale" id="scale" value={this.state.scale} onChange={this.changeScale} />
                </FormGroup>
                <FormGroup>
                  <Label for="buffer">BufferGeometry</Label>
                  <Input type="select" name="buffer" id="buffer" onChange={this.changeBuffer}>
                    <option selected={this.state.buffer == '1'}>1</option>
                    <option selected={this.state.buffer == '0'}>0</option>


                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="side">Face Side</Label>
                  <Input type="select" name="side" id="side" onChange={this.changeSide}>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="shadows">Floor (shadows)</Label>
                  <Input type="select" name="shadows" id="shadows" onChange={this.changeShadows}>
                    <option>0</option>
                    <option>1</option>
                  </Input>
                </FormGroup>


                <FormGroup>
                  <Label for="map">Diffuse map</Label>
                  <Row>
                    <Col ><Input type="file" name="map" id="map" onChange={this.changeMap} style={{ color: 'transparent' }} /></Col>
                    <Col>{this.mesh.userData.map}</Col>
                  </Row>
                </FormGroup>

                <FormGroup>
                  <Label for="alpha">Alpha map</Label>
                  <Row>
                    <Col >
                      <Input type="file" name="alpha" id="alpha" onChange={this.changeAlpha} style={{ color: 'transparent' }}  /></Col>
                    <Col>{this.mesh.userData.alpha}</Col>
                  </Row>
                </FormGroup>

                <FormGroup>
                  <Label for="light">Light map</Label>
                  <Row>
                    <Col >
                  <Input type="file" name="light" id="light" onChange={this.changeLightMap} style={{ color: 'transparent' }}  /></Col>
                    <Col>{this.mesh.userData.lightmap}</Col>
                  </Row>
                </FormGroup>

                <FormGroup>
                  <Label for="light">Mix map</Label>
                  <Row>
                    <Col >
                  <Input type="file" name="mix" id="mix" onChange={this.changeMixMap} style={{ color: 'transparent' }}  /></Col>
                    <Col>{this.mesh.userData.mixmap}</Col>
                  </Row>
                </FormGroup>

                <FormGroup>
                  <Label for="light">Addition map 1</Label>
                  <Row>
                    <Col >
                  <Input type="file" name="mix" id="mix" onChange={this.changeAddMap1} style={{ color: 'transparent' }}  /></Col>
                    <Col>{this.mesh.userData.addmap1}</Col>
                  </Row>
                </FormGroup>


                <FormGroup>
                  <Label for="light">Addition map 2</Label>
                  <Row>
                    <Col >
                  <Input type="file" name="mix" id="mix" onChange={this.changeAddMap2} style={{ color: 'transparent' }}  /></Col>
                    <Col>{this.mesh.userData.addmap2}</Col>
                  </Row>
                </FormGroup>

                <FormGroup>
                  <Label for="light">Addition map 3</Label>
                  <Row>
                    <Col >
                  <Input type="file" name="mix" id="mix" onChange={this.changeAddMap3} style={{ color: 'transparent' }}  /></Col>
                    <Col>{this.mesh.userData.addmap3}</Col>
                  </Row>
                </FormGroup>

                <FormGroup>
                  <Label for="light">Addition map 4</Label>
                  <Row>
                    <Col >
                  <Input type="file" name="mix" id="mix" onChange={this.changeAddMap4} style={{ color: 'transparent' }}  /></Col>
                    <Col>{this.mesh.userData.addmap4}</Col>
                  </Row>
                </FormGroup>

                <FormGroup>
                  <Label for="alphaTest">alphaTest</Label>
                  <Input name="alphaTest" id="alphaTest" value={this.state.alphaTest} onChange={this.changeAlphaTest} />
                </FormGroup>

                

                <FormGroup>
                  <Label for="transparent">Transparent</Label>
                  <Input type="select" name="transparent" id="transparent" onChange={this.changeTransparent}>
                    <option selected={this.state.transparent == '0'}>0</option>
                    <option selected={this.state.transparent == '1'}>1</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="opacity">Opacity</Label>
                  <Input name="scale" id="scale" value={this.state.opacity} onChange={this.changeOpacity} />
                </FormGroup>

                <FormGroup>
                  <Label for="color">Color</Label>
                  <Input name="color" id="color" value={this.state.color} onChange={this.changeColor} />
                </FormGroup>

                <FormGroup>
                  <Label for="collider">Collider</Label>
                  <Input type="select" name="collider" id="collider" onChange={this.changeCollider}>
                    <option>0</option>
                    <option>1</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="wireframe">Wireframe</Label>
                  <Input type="select" name="wireframe" id="wireframe" onChange={this.changeWireframe}>
                    <option>0</option>
                    <option>1</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="pos">Position</Label>
                  <Input name="posX" id="posX" value={this.state.pos[0]} onChange={this.changePosX} />
                  <Input name="posY" id="posY" value={this.state.pos[1]} onChange={this.changePosY} />
                  <Input name="posZ" id="posZ" value={this.state.pos[2]} onChange={this.changePosZ} />
                </FormGroup>

                <FormGroup>
                  <Label for="pos">Rotation</Label>
                  <Input name="rotX" id="rotX" value={this.state.rot[0]} onChange={this.changeRotX} />
                  <Input name="rotY" id="rotY" value={this.state.rot[1]} onChange={this.changeRotY} />
                  <Input name="rotZ" id="rotZ" value={this.state.rot[2]} onChange={this.changeRotZ} />
                </FormGroup>



              </Form>
            </CardBody>
          </Card>
        </Collapse>

      </div>
    )
  }
}

export default ObjectUI;
