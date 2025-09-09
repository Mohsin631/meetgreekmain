import React, { Component}  from "react";
import ReactDOM from "react-dom";
import './index.css';
import * as BABYLON from "babylon";
import  Menu from './Menu';




const OrbitControls = require("babylon-orbit-controls")(BABYLON);


var scene = new BABYLON.Scene(), objectGroup = new BABYLON.Group();
scene.add(objectGroup);

class App extends Component {
    componentDidMount() {
      var camera = new BABYLON.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 30000 );
      this.camera = camera;
      var renderer = new BABYLON.WebGLRenderer();
      this.renderer = renderer;
      renderer.setSize( window.innerWidth, window.innerHeight );
      this.mount.appendChild( renderer.domElement );
     
      camera.position.z = 150;
      camera.position.y = 150;
      var size = 2500,
      step = 50;
      var geometry = new BABYLON.Geometry();
     for (var i = -size; i <= size; i += step) {
         geometry.vertices.push(new BABYLON.Vector3(-size, 0, i));
         geometry.vertices.push(new BABYLON.Vector3(size, 0, i));
         geometry.vertices.push(new BABYLON.Vector3(i, 0, -size));
         geometry.vertices.push(new BABYLON.Vector3(i, 0, size));
     }
     var material = new BABYLON.LineBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });
     var line = new BABYLON.LineSegments(geometry, material);
     scene.add(line);

     
      const controls = new OrbitControls( camera, renderer.domElement );
      var animate = function () {
        requestAnimationFrame( animate );
        controls.update();
        renderer.render( scene, camera );
      };
      window.addEventListener('resize', this.onWindowResize, false);
      animate();
    }

    onWindowResize = () =>{
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render() {
      return (
        <div ref={ref => (this.mount = ref)} />
      )
    }
  }
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

ReactDOM.render(<Menu scene={objectGroup} />, document.getElementById("menu"));
