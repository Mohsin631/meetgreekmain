import React, { Component } from "react";
import ReactDOM from "react-dom";
import ObjectUI from './ObjectUI';
import * as BABYLON from "babylon";
import * as OBJLoader from 'babylon-obj-loader';
import * as ColladaLoader from 'babylon-collada-loader';
import './index.css';
import JSZip from "jszip";

OBJLoader(BABYLON);
ColladaLoader(BABYLON);

class ImportOBJ extends Component {
    constructor({ scene }) {
        super();

        this.scene = scene;

    }

    toggle = (event) => {
        //console.log(event);
        let files = event.target.files;
        if (files.length) {
            var file = files[0];
            var filename = file.name;
            var extension = filename.split('.').pop().toLowerCase();
            var reader = new FileReader();
            //console.log(this.scene);
            let scene = this.scene;

            let vert = [
           
            'varying vec2 vUv;',
            'varying vec2 vUv2;',
            'attribute vec2 uv2;',
            

            'void main( void ) {',
            '	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
            '	vUv = uv;',
            '	vUv2 = uv2;',
            '	gl_Position = projectionMatrix * mvPosition;',
          
            '}'
            ].join('\n');

           

            let frag = [
                'varying vec2 vUv;',
                'varying vec2 vUv2;',
                'uniform sampler2D map;',
                'uniform sampler2D mixMap;',
                'uniform sampler2D addMap1;',
                'uniform sampler2D addMap2;',
                'uniform sampler2D addMap3;',
                'uniform sampler2D addMap4;',
                'uniform sampler2D lightMap;',
                'uniform float lightMapIntensity;',
              
              
            
               
                'void main( void ) {',
                '	vec4 textureColor = texture2D(map, vUv);',
                '	vec4 mmap = texture2D(mixMap, vUv2);',
                '	vec4 textureColor1 = texture2D(addMap1, vUv);',
                '	vec4 textureColor2 = texture2D(addMap2, vUv);',
                '	vec4 textureColor3 = texture2D(addMap3, vUv);',
                '	vec4 textureColor4 = texture2D(addMap4, vUv);',
              
                '   vec3 color = textureColor.xyz;',
                '	color = mix( color, textureColor1.xyz, mmap.r );',
                '	color = mix( color, textureColor2.xyz, mmap.g );',
                '	color = mix( color, textureColor3.xyz, mmap.b );',
                /*'	color = mix( color, textureColor4.xyz, mmap.a );',*/
                'vec3 indirectDiffuse = vec3(1.0);',

                '#ifdef USE_LIGHTMAP',
                'indirectDiffuse = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;',
                'if(indirectDiffuse.x < 0.5) {',
                '   color.x = 2.0 * indirectDiffuse.x * color.x;',
                '}',
                'else {',
                '   color.x = 1.0 - 2.0 * (1.0 - indirectDiffuse.x) * (1.0 - color.x);',
                '}',

                'if(indirectDiffuse.y < 0.5) {',
                '   color.y = 2.0 * indirectDiffuse.y * color.y;',
                '}',
                'else {',
                '   color.y = 1.0 - 2.0 * (1.0 - indirectDiffuse.y) * (1.0 - color.y);',
                '}',

                'if(indirectDiffuse.z < 0.5) {',
                '   color.z = 2.0 * indirectDiffuse.z * color.z;',
                '}',
                'else {',
                '   color.z = 1.0 - 2.0 * (1.0 - indirectDiffuse.z) * (1.0 - color.z);',
                '}',

                
                
      
                '#endif',
        
                '	gl_FragColor = vec4(color, 1.0);',
                '}' 
            ].join('\n');

            
          


            switch (extension) {
                case 'dae':

                    reader.addEventListener('load', (event) => {

                        var contents = event.target.result;
                        this.BABYLON = BABYLON;

                        var loader = new ColladaLoader();
                        var collada = loader.parse(contents);

                        collada.scene.name = filename;
                        //console.log(collada);
                        //this.scene.add(collada.scene);
                        collada.scene.scale.set(1,1,1);
                        collada.scene.updateMatrixWorld(true);
                        for (let i in collada.scene.children) {
                            collada.scene.children[i].children[0].material = new BABYLON.MeshBasicMaterial();
                            collada.scene.children[i].children[0].basicMaterial =  collada.scene.children[i].children[0].material;

                            collada.scene.children[i].children[0].shaderMaterial = new BABYLON.ShaderMaterial({
                                vertexShader: vert,
                                fragmentShader: frag,
                                uniforms: {
                
                                    map: {
                                        type: "t",
                                        value: new BABYLON.Texture()
                                    },

                                    lightMap: {
                                        type: "t",
                                        value: new BABYLON.Texture()
                                    },

                                    lightMapIntensity: {
                                        type: "f",
                                        value: 1,
                                    },
                    
                                    mixMap: {
                                        type: "t",
                                        value: new BABYLON.Texture()
                                    },
                    
                                    addMap1: {
                                        type: "t",
                                        value: new BABYLON.Texture()
                                    },
                    
                                    addMap2: {
                                        type: "t",
                                        value: new BABYLON.Texture()
                                    },
                    
                                    addMap3: {
                                        type: "t",
                                        value: new BABYLON.Texture()
                                    },
                    
                                    addMap4: {
                                        type: "t",
                                        value: new BABYLON.Texture()
                                    }
                                }
                            });

                            collada.scene.children[i].children[0].shaderMaterial.defines.USE_LIGHTMAP = false;
                

                            collada.scene.children[i].children[0].name = collada.scene.children[i].name;
                            //let pos = collada.scene.children[i].position;
                            //console.log(pos);
                            //collada.scene.children[i].children[0].position.copy(collada.scene.children[i].position);
                            //collada.scene.children[i].children[0].geometry.translate(pos.x, pos.y, pos.z);
                            collada.scene.children[i].children[0].geometry.applyMatrix(collada.scene.children[i].children[0].matrixWorld);

                            collada.scene.children[i].children[0].position.set(0,0,0);
                            collada.scene.children[i].children[0].rotation.set(0,0,0);
                            collada.scene.children[i].children[0].scale.set(1,1,1);

                            //console.log(collada.scene.children[i].children[0].position);

                            //collada.scene.children[i].children[0].rotation.copy(collada.scene.children[i].rotation);
                            //collada.scene.children[i].children[0].geometry.rotateX(collada.scene.children[i].rotation.x);
                            //collada.scene.children[i].children[0].geometry.rotateY(collada.scene.children[i].rotation.y);
                            //collada.scene.children[i].children[0].geometry.rotateZ(collada.scene.children[i].rotation.z);


                            this.scene.add(collada.scene.children[i].children[0]);
                        }
                        //console.log(collada.scene.children);

                        ReactDOM.render(
                            <div>
                                {
                                    this.scene.children.map((mesh) => {

                                        return (<ObjectUI key={mesh.uuid} mesh={mesh} />);
                                    })
                                }
                            </div>, document.getElementById("ui"));



                    }, false);

                    reader.readAsText(file);

                    break;

                case 'obj':

                    reader.addEventListener('load', (event) => {

                        var contents = event.target.result;
                        //console.log( BABYLON.OBJLoader );
                        this.BABYLON = BABYLON;
                        var object = new this.BABYLON.OBJLoader().parse(contents);
                        object.name = filename;

                        //this.scene.add(object);
                        //console.log(object);

                        for (let i in object.children) {
                            object.children[i].material = new BABYLON.MeshBasicMaterial();
                            object.children[i].basicMaterial =  object.children[i].material;
                            object.children[i].shaderMaterial = new BABYLON.ShaderMaterial({
                                vertexShader: vert,
                                fragmentShader: frag,
                                uniforms: {
                
                                    map: {
                                        type: "t",
                                        value: new BABYLON.Texture()
                                    },

                                    lightMap: {
                                        type: "t",
                                        value: new BABYLON.Texture()
                                    },

                                    lightMapIntensity: {
                                        type: "f",
                                        value: 1,
                                    },
                    
                                    mixMap: {
                                        type: "t",
                                        value: new BABYLON.Texture()
                                    },
                    
                                    addMap1: {
                                        type: "t",
                                        value: new BABYLON.Texture()
                                    },
                    
                                    addMap2: {
                                        type: "t",
                                        value: new BABYLON.Texture()
                                    },
                    
                                    addMap3: {
                                        type: "t",
                                        value: new BABYLON.Texture()
                                    },
                    
                                    addMap4: {
                                        type: "t",
                                        value: new BABYLON.Texture()
                                    }
                                }
                            });

                            //console.log( object.children[i].shaderMaterial);
                            object.children[i].shaderMaterial.defines.USE_LIGHTMAP = false;
                
                            this.scene.add(object.children[i]);
                        }
                        ReactDOM.render(
                            <div>
                                {
                                    this.scene.children.map((mesh) => {

                                        return (<ObjectUI key={mesh.uuid} mesh={mesh} />);
                                    })
                                }
                            </div>, document.getElementById("ui"));

                        //console.log(object);

                    }, false);
                    reader.readAsText(file);

                    break;

                case 'zip':
                    reader.addEventListener('load', (event) => {
                        let zip = new JSZip();
                        zip.loadAsync(event.target.result)
                            .then(function (zip) {
                                zip.file('assets.js').async("string").then(function (value) {
                                    //console.log(value);
                                    let assets = JSON.parse(value);
                                    console.log(assets);
                                    let geos = {};
                                    let textures = {};
                                    let jsonloader = new BABYLON.JSONLoader();
                                    let total = 0;
                                    let current = 0;
                                    let onLoad = function () {
                                        console.log('onLoad', current,  total);
                                        if (current == total) {
                                            for (let i in assets) {
                                                let mat = new BABYLON.MeshBasicMaterial();

                                                                                    
                                                let data = {
                                                    color: 'ffffff',
                                                    scale: assets[i].scale,
                                                    buffer: (assets[i].buffer) ? '1' : '0',
                                                    side: assets[i].side,
                                                    shadows: (assets[i].shadows) ? '1' : '0',
                                                    alphaTest: assets[i].alphaTest || '0',
                                                    transparent: (assets[i].transparent) ? '1' : '0',
                                                    opacity: assets[i].opacity,
                                                    collider: (assets[i].collider) ? '1' : '0',
                                                    wirframe: (assets[i].wirframe) ? '1' : '0',
                                                    pos: assets[i].pos,
                                                    rot: assets[i].rot
                                                };


                                                let shaderMat = new BABYLON.ShaderMaterial({
                                                    vertexShader: vert,
                                                    fragmentShader: frag,
                                                    uniforms: {
                                    
                                                        map: {
                                                            type: "t",
                                                            value: new BABYLON.Texture()
                                                        },

                                                        lightMap: {
                                                            type: "t",
                                                            value: new BABYLON.Texture()
                                                        },

                                                        lightMapIntensity: {
                                                            type: "f",
                                                            value: 1,
                                                        },
                                        
                                                        mixMap: {
                                                            type: "t",
                                                            value: new BABYLON.Texture()
                                                        },
                                        
                                                        addMap1: {
                                                            type: "t",
                                                            value: new BABYLON.Texture()
                                                        },
                                        
                                                        addMap2: {
                                                            type: "t",
                                                            value: new BABYLON.Texture()
                                                        },
                                        
                                                        addMap3: {
                                                            type: "t",
                                                            value: new BABYLON.Texture()
                                                        },
                                        
                                                        addMap4: {
                                                            type: "t",
                                                            value: new BABYLON.Texture()
                                                        }
                                                    }
                                                });

                                                shaderMat.defines.USE_LIGHTMAP = false;

                                                if (assets[i].map) {
                                                    mat.map = textures[assets[i].map];
                                                    data.map = assets[i].map;
                                                    shaderMat.uniforms.map.value = textures[assets[i].map];
                                                }

                                                if (assets[i].mixmap) {
                                                    data.mixmap = assets[i].mixmap;                                                   
                                                    shaderMat.uniforms.mixMap.value = textures[assets[i].mixmap];
                                                }

                                                if (assets[i].addmap1) {
                                                    data.addmap1 = assets[i].addmap1; 
                                                    shaderMat.uniforms.addMap1.value = textures[assets[i].addmap1];
                                                }

                                                if (assets[i].addmap2) {
                                                    data.addmap2 = assets[i].addmap2; 
                                                    shaderMat.uniforms.addMap2.value = textures[assets[i].addmap2];
                                                }

                                                if (assets[i].addmap3) {
                                                    data.addmap3 = assets[i].addmap3; 
                                                    shaderMat.uniforms.addMap3.value = textures[assets[i].addmap3];
                                                }

                                                if (assets[i].addmap4) {
                                                    data.addmap4 = assets[i].addmap4; 
                                                    shaderMat.uniforms.addMap4.value = textures[assets[i].addmap4];
                                                }




                                                if (assets[i].alpha) {
                                                    mat.alphaMap = textures[assets[i].alpha];
                                                    data.alpha = assets[i].alpha;
                                                  
                                                }

                                                if (assets[i].lightmap) {
                                                    mat.lightMap = textures[assets[i].lightmap];
                                                    data.lightmap = assets[i].lightmap;
                                                    shaderMat.uniforms.lightMap.value = textures[assets[i].lightmap];
                                                    shaderMat.defines.USE_LIGHTMAP = true;
                                                    //console.log( shaderMat.uniforms);
                                                }

                                                let mesh = new BABYLON.Mesh(geos[assets[i].geo], mat);

                                                //console.log();
                                                mesh.userData = data;

                                                if (assets[i].alphaTest) {
                                                    mat.alphaTest = assets[i].alphaTest;
                                                }

                                                if (assets[i].transparent) {
                                                    mat.transparent = true;
                                                }

                                                if (assets[i].collider || assets[i].wireframe) {
                                                    mat.wireframe = true
                                                }

                                                if (assets[i].side) {
                                                    mat.side = assets[i].side;
                                                }

                                                if (assets[i].scale) {
                                                    let s = assets[i].scale;
                                                    mesh.scale.set(s, s, s);
                                                }

                                                let pos = data.pos;
                                                mesh.position.fromArray(pos);

                                                let rot = assets[i].rot;
                                                mesh.rotation.x = rot[0] / 180 * Math.PI;
                                                mesh.rotation.y = rot[1] / 180 * Math.PI;
                                                mesh.rotation.z = rot[2] / 180 * Math.PI;

                                                if (assets[i].opacity !== undefined) {
                                                    mat.opacity = assets[i].opacity;
                                                }



                                                mesh.basicMaterial = mat;
                                                mesh.shaderMaterial = shaderMat;
                                                if(data.mixmap) {
                                                    mesh.material = shaderMat;
                                                    console.log(data.mixmap, shaderMat);
                                                }
                                                mesh.name = i;
                                                scene.add(mesh);
                                                //scope.scene.add(mesh);

                                            }
                                            //console.log(scene);

                                            ReactDOM.render(
                                                <div>
                                                    {
                                                        scene.children.map((mesh) => {

                                                            return (<ObjectUI key={mesh.uuid} mesh={mesh} />);
                                                        })
                                                    }
                                                </div>, document.getElementById("ui"));
                                        }
                                        
                                    };
                                    for (let i in assets) {
                                        total++;
                                        //console.log('geo', total);
                                        let curAsset = assets[i];
                                        console.log(curAsset);
                                        zip.folder('geometry').folder('loc').file(assets[i].geo).async('string').then(function (value) {
                                            current++;
                                            let geo = jsonloader.parse(JSON.parse(value));
                                            geos[curAsset.geo] = new BABYLON.BufferGeometry();
                                            geos[curAsset.geo].fromGeometry(geo.geometry);
                                            //console.log(geo);
                                            console.log('geo',  current);

                                            onLoad();
                                        });

                                        if (assets[i].map) {
                                            total++;
                                           // console.log('map', total);
                                            zip.folder('textures').folder('loc')
                                                .file(assets[i].map).async('arraybuffer').then(function (value) {
                                                    let buffer = new Uint8Array(value);
                                                    let blob = new Blob([buffer.buffer]);
                                                    let img = new Image;
                                                    img.onload = function () {
                                                        current++;
                                                        onLoad();
                                                        document.body.appendChild(this);
                                                        console.log('map',  current);
                                                    }
                                                    img.src = URL.createObjectURL(blob);
                                                    textures[curAsset.map] = new BABYLON.Texture(img);
                                                    textures[curAsset.map].needsUpdate = true;
                                                    textures[curAsset.map].wrapS = textures[curAsset.map].wrapT = BABYLON.RepeatWrapping;
                                                    textures[curAsset.map].blob = blob;
                                                   

                                                });
                                        }

                                        if (assets[i].alpha) {
                                            total++;
                                            //console.log('alpha', total);
                                            zip.folder('textures').folder('loc')
                                                .file(assets[i].alpha).async('arraybuffer').then(function (value) {
                                                    let buffer = new Uint8Array(value);
                                                    let blob = new Blob([buffer.buffer]);
                                                    let img = new Image;
                                                    img.onload = function () {
                                                        current++;
                                                        onLoad();
                                                        document.body.appendChild(this);
                                                    }
                                                    img.src = URL.createObjectURL(blob);
                                                    textures[curAsset.alpha] = new BABYLON.Texture(img);
                                                    textures[curAsset.alpha].needsUpdate = true;
                                                    textures[curAsset.alpha].wrapS = textures[curAsset.alpha].wrapT = BABYLON.RepeatWrapping;
                                                    textures[curAsset.alpha].blob = blob;

                                                });
                                        }

                                        if (assets[i].lightmap) {
                                            total++;
                                            //console.log('lightmap', total);
                                            zip.folder('textures').folder('loc')
                                                .file(assets[i].lightmap).async('arraybuffer').then(function (value) {
                                                    let buffer = new Uint8Array(value);
                                                    let blob = new Blob([buffer.buffer]);
                                                    let img = new Image;
                                                    img.onload = function () {
                                                        current++;
                                                        onLoad();
                                                        document.body.appendChild(this);
                                                        console.log('lightmap',  current);
                                                    }
                                                    img.src = URL.createObjectURL(blob);
                                                    textures[curAsset.lightmap] = new BABYLON.Texture(img);
                                                    textures[curAsset.lightmap].needsUpdate = true;
                                                    textures[curAsset.lightmap].wrapS = textures[curAsset.lightmap].wrapT = BABYLON.RepeatWrapping;
                                                    textures[curAsset.lightmap].blob = blob;
                                                   

                                                });
                                        }

                                        if (assets[i].mixmap) {
                                            total++;
                                            //console.log('mixmap', total);
                                            zip.folder('textures').folder('loc')
                                                .file(assets[i].mixmap).async('arraybuffer').then(function (value) {
                                                    let buffer = new Uint8Array(value);
                                                    let blob = new Blob([buffer.buffer]);
                                                    let img = new Image;
                                                    img.onload = function () {
                                                        current++;
                                                        onLoad();
                                                        document.body.appendChild(this);
                                                        console.log('mixmap',  current);
                                                    }
                                                    img.src = URL.createObjectURL(blob);
                                                    textures[curAsset.mixmap] = new BABYLON.Texture(img);
                                                    textures[curAsset.mixmap].needsUpdate = true;
                                                    textures[curAsset.mixmap].wrapS = textures[curAsset.mixmap].wrapT = BABYLON.RepeatWrapping;
                                                    textures[curAsset.mixmap].blob = blob;
                                                    

                                                });
                                        }

                                        if (assets[i].addmap1) {
                                            total++;
                                           // console.log('addmap1', total);
                                            zip.folder('textures').folder('loc')
                                                .file(assets[i].addmap1).async('arraybuffer').then(function (value) {
                                                    let buffer = new Uint8Array(value);
                                                    let blob = new Blob([buffer.buffer]);
                                                    let img = new Image;
                                                    img.onload = function () {
                                                        current++;
                                                        onLoad();
                                                        document.body.appendChild(this);
                                                        console.log('addmap1',  current);
                                                    }
                                                    img.src = URL.createObjectURL(blob);
                                                    textures[curAsset.addmap1] = new BABYLON.Texture(img);
                                                    textures[curAsset.addmap1].needsUpdate = true;
                                                    textures[curAsset.addmap1].wrapS = textures[curAsset.addmap1].wrapT = BABYLON.RepeatWrapping;
                                                    textures[curAsset.addmap1].blob = blob;
                                                   

                                                });
                                        }


                                        if (assets[i].addmap2) {
                                            total++;
                                           // console.log('addmap2', total);
                                            zip.folder('textures').folder('loc')
                                                .file(assets[i].addmap2).async('arraybuffer').then(function (value) {
                                                    let buffer = new Uint8Array(value);
                                                    let blob = new Blob([buffer.buffer]);
                                                    let img = new Image;
                                                    img.onload = function () {
                                                        current++;
                                                        onLoad();
                                                        document.body.appendChild(this);
                                                        console.log('addmap2',  current);
                                                    }
                                                    img.src = URL.createObjectURL(blob);
                                                    textures[curAsset.addmap2] = new BABYLON.Texture(img);
                                                    textures[curAsset.addmap2].needsUpdate = true;
                                                    textures[curAsset.addmap2].wrapS = textures[curAsset.addmap2].wrapT = BABYLON.RepeatWrapping;
                                                    textures[curAsset.addmap2].blob = blob;
                                                   

                                                });
                                        }


                                        if (assets[i].addmap3) {
                                            total++;
                                            //console.log('addmap3', total);
                                            zip.folder('textures').folder('loc')
                                                .file(assets[i].addmap3).async('arraybuffer').then(function (value) {
                                                    let buffer = new Uint8Array(value);
                                                    let blob = new Blob([buffer.buffer]);
                                                    let img = new Image;
                                                    img.onload = function () {
                                                        current++;
                                                        onLoad();
                                                        document.body.appendChild(this);
                                                        console.log('addmap3',  current);
                                                    }
                                                    img.src = URL.createObjectURL(blob);
                                                    textures[curAsset.addmap3] = new BABYLON.Texture(img);
                                                    textures[curAsset.addmap3].needsUpdate = true;
                                                    textures[curAsset.addmap3].wrapS = textures[curAsset.addmap3].wrapT = BABYLON.RepeatWrapping;
                                                    textures[curAsset.addmap3].blob = blob;
                                                    

                                                });
                                        }

                                        if (assets[i].addmap4) {
                                            total++;
                                            //console.log('addmap4', total);
                                            zip.folder('textures').folder('loc')
                                                .file(assets[i].addmap4).async('arraybuffer').then(function (value) {
                                                    let buffer = new Uint8Array(value);
                                                    let blob = new Blob([buffer.buffer]);
                                                    let img = new Image;
                                                    img.onload = function () {
                                                        current++;
                                                        onLoad();
                                                        document.body.appendChild(this);
                                                        console.log('addmap4',  current);
                                                    }
                                                    img.src = URL.createObjectURL(blob);
                                                    textures[curAsset.addmap4] = new BABYLON.Texture(img);
                                                    textures[curAsset.addmap4].needsUpdate = true;
                                                    textures[curAsset.addmap4].wrapS = textures[curAsset.addmap4].wrapT = BABYLON.RepeatWrapping;
                                                    textures[curAsset.addmap4].blob = blob;
                                                   

                                                });
                                        }

                                    }
                                });
                                // you now have every files contained in the loaded zip
                                //new_zip.file("hello.txt").async("string"); // a promise of "Hello World\n"
                            });
                    }, false);
                    reader.readAsBinaryString(file);

                    break;
                default:
                    alert('bad format');
                    break;
            }
            event.target.value = '';
           
        }
    }

    render() {
        return (
            <label>Import<input type="file" name="file" onChange={this.toggle} className="hidden" /></label>

        )
    }
}

export default ImportOBJ;


