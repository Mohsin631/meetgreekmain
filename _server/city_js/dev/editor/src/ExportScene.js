import React, { Component } from "react";
import JSZip from "jszip";
import * as BABYLON from "babylon";
import { saveAs } from '@progress/kendo-file-saver';

class ExportScene extends Component {
    constructor({ scene }) {
        super();

        this.scene = scene;

    }

    toggle = (event) => {
        let zip = new JSZip();
        let textures = zip.folder("textures");
        let locTextures = textures.folder('loc');
        let geometry = zip.folder("geometry");
        let locGeometry = geometry.folder("loc");

        let toJSON = function() {

            var data = {
                metadata: {
                    version: 4.5,
                    type: 'Geometry',
                    generator: 'Geometry.toJSON'
                }
            };

            // standard Geometry serialization

            data.uuid = this.uuid;
            data.type = this.type;
            if (this.name !== '') data.name = this.name;

            if (this.parameters !== undefined) {

                var parameters = this.parameters;

                for (var key in parameters) {

                    if (parameters[key] !== undefined) data[key] = parameters[key];

                }

                return data;

            }

            var vertices = [];

            for (var i = 0; i < this.vertices.length; i++) {

                var vertex = this.vertices[i];
                vertices.push(vertex.x, vertex.y, vertex.z);

            }

            var faces = [];
            var normals = [];
            var normalsHash = {};
            var colors = [];
            var colorsHash = {};
            var uvs = [];
            var uvsHash = {};
            var uvs2 = [];
            var uvsHash2 = {};

            for (var i = 0; i < this.faces.length; i++) {

                var face = this.faces[i];

                var hasMaterial = true;
                var hasFaceUv = false; // deprecated
                var hasFaceVertexUv = this.faceVertexUvs[0][i] !== undefined;
                var hasFaceVertexUv2 = this.faceVertexUvs[1] !== undefined;
                var hasFaceNormal = face.normal.length() > 0;
                var hasFaceVertexNormal = face.vertexNormals.length > 0;
                var hasFaceColor = face.color.r !== 1 || face.color.g !== 1 || face.color.b !== 1;
                var hasFaceVertexColor = face.vertexColors.length > 0;

                var faceType = 0;

                faceType = setBit(faceType, 0, 0); // isQuad
                faceType = setBit(faceType, 1, hasMaterial);
                faceType = setBit(faceType, 2, hasFaceUv);
                faceType = setBit(faceType, 3, hasFaceVertexUv);
                faceType = setBit(faceType, 4, hasFaceNormal);
                faceType = setBit(faceType, 5, hasFaceVertexNormal);
                faceType = setBit(faceType, 6, hasFaceColor);
                faceType = setBit(faceType, 7, hasFaceVertexColor);

                faces.push(faceType);
                faces.push(face.a, face.b, face.c);
                faces.push(face.materialIndex);

                if (hasFaceVertexUv) {

                    var faceVertexUvs = this.faceVertexUvs[0][i];

                    faces.push(
                        getUvIndex(faceVertexUvs[0]),
                        getUvIndex(faceVertexUvs[1]),
                        getUvIndex(faceVertexUvs[2])
                    );

                }

                if (hasFaceVertexUv2) {

                    var faceVertexUvs2 = this.faceVertexUvs[1][i];

                    faces.push(
                        getUvIndex2(faceVertexUvs2[0]),
                        getUvIndex2(faceVertexUvs2[1]),
                        getUvIndex2(faceVertexUvs2[2])
                    );

                } else {
                    console.log('no uv2');
                }

                if (hasFaceNormal) {

                    faces.push(getNormalIndex(face.normal));

                }

                if (hasFaceVertexNormal) {

                    var vertexNormals = face.vertexNormals;

                    faces.push(
                        getNormalIndex(vertexNormals[0]),
                        getNormalIndex(vertexNormals[1]),
                        getNormalIndex(vertexNormals[2])
                    );

                }

                if (hasFaceColor) {

                    faces.push(getColorIndex(face.color));

                }

                if (hasFaceVertexColor) {

                    var vertexColors = face.vertexColors;

                    faces.push(
                        getColorIndex(vertexColors[0]),
                        getColorIndex(vertexColors[1]),
                        getColorIndex(vertexColors[2])
                    );

                }

            }

            function setBit(value, position, enabled) {

                return enabled ? value | (1 << position) : value & (~(1 << position));

            }

            function getNormalIndex(normal) {

                var hash = normal.x.toString() + normal.y.toString() + normal.z.toString();

                if (normalsHash[hash] !== undefined) {

                    return normalsHash[hash];

                }

                normalsHash[hash] = normals.length / 3;
                normals.push(normal.x, normal.y, normal.z);

                return normalsHash[hash];

            }

            function getColorIndex(color) {

                var hash = color.r.toString() + color.g.toString() + color.b.toString();

                if (colorsHash[hash] !== undefined) {

                    return colorsHash[hash];

                }

                colorsHash[hash] = colors.length;
                colors.push(color.getHex());

                return colorsHash[hash];

            }

            function getUvIndex(uv) {

                var hash = uv.x.toString() + uv.y.toString();

                if (uvsHash[hash] !== undefined) {

                    return uvsHash[hash];

                }

                uvsHash[hash] = uvs.length / 2;
                uvs.push(uv.x, uv.y);

                return uvsHash[hash];

            }

            function getUvIndex2(uv) {

                var hash = uv.x.toString() + uv.y.toString();

                if (uvsHash2[hash] !== undefined) {

                    return uvsHash2[hash];

                }

                uvsHash2[hash] = uvs2.length / 2;
                uvs2.push(uv.x, uv.y);

                return uvsHash2[hash];

            }

            data.data = {};

            data.data.vertices = vertices;
            data.data.normals = normals;
            if (colors.length > 0) data.data.colors = colors;
            if (uvs.length > 0) data.data.uvs = [uvs]; // temporal backward compatibility
            if (uvs2.length > 0) data.data.uvs.push(uvs2);
            console.log(uvs2);
            data.data.faces = faces;

            return data;

        };


        let assets = {};
        let obj = [];
        let locations = {
            obj: obj,
            z: 20
        };
        let imgList = [];
        for (let i in this.scene.children) {
            let mesh = this.scene.children[i];
            let data = mesh.userData;
            let asset = {};
            asset.scale = data.scale;
            asset.geo = mesh.name + '.js';
            asset.buffer = data.buffer === '1' ? true : false;
            //console.log(data.map);
            if (data.map) {
                asset.map = data.map;
                if (imgList.indexOf(data.map) === -1) {
                    imgList.push(data.map);
                    if (mesh.basicMaterial.map.image.src.indexOf('blob') !== -1) {
                        locTextures.file(data.map, mesh.basicMaterial.map.blob);
                    } else {
                        let img = mesh.basicMaterial.map.image.src.split(',');
                        //console.log(img);
                        locTextures.file(data.map, img[1], { base64: true });
                    }
                }

            }

            if (data.alpha) {
                asset.alpha = data.alpha;
                if (imgList.indexOf(data.alpha) === -1) {
                    imgList.push(data.alpha);
                    if (mesh.basicMaterial.alphaMap.image.src.indexOf('blob') !== -1) {
                        locTextures.file(data.alpha, mesh.basicMaterial.alphaMap.blob);
                    } else {
                        let img = mesh.basicMaterial.alphaMap.image.src.split(',');
                        locTextures.file(data.alpha, img[1], { base64: true });
                    }
                }
            }

            if (data.lightmap) {
                asset.lightmap = data.lightmap;
                if (imgList.indexOf(data.lightmap) === -1) {
                    imgList.push(data.lightmap);
                    if (mesh.basicMaterial.lightMap.image.src.indexOf('blob') !== -1) {
                        locTextures.file(data.lightmap, mesh.basicMaterial.lightMap.blob);
                    } else {
                        let img = mesh.basicMaterial.lightMap.image.src.split(',');
                        locTextures.file(data.lightmap, img[1], { base64: true });
                    }
                }
            }

            if (data.mixmap) {
                asset.mixmap = data.mixmap;
                if (imgList.indexOf(data.mixmap) === -1) {
                    imgList.push(data.mixmap);
                    console.log(mesh.shaderMaterial.uniforms.mixMap.value,  mesh.shaderMaterial.uniforms.mixMap.value.blob);
                    if (mesh.shaderMaterial.uniforms.mixMap.value.image.src.indexOf('blob') !== -1) {
                        console.log(data.mixmap, mesh.shaderMaterial.uniforms.mixMap.value.blob);
                        locTextures.file(data.mixmap, mesh.shaderMaterial.uniforms.mixMap.value.blob);
                    } else {
                        let img = mesh.shaderMaterial.uniforms.mixMap.value.image.src.split(',');
                        locTextures.file(data.mixmap, img[1], { base64: true });
                    }
                }
            }

            if (data.addmap1) {
                asset.addmap1 = data.addmap1;
                if (imgList.indexOf(data.addmap1) === -1) {
                    imgList.push(data.addmap1);
                    if (mesh.shaderMaterial.uniforms.addMap1.value.image.src.indexOf('blob') !== -1) {
                        locTextures.file(data.addmap1, mesh.shaderMaterial.uniforms.addMap1.value.blob);
                    } else {
                        let img = mesh.shaderMaterial.uniforms.addMap1.value.image.src.split(',');
                        locTextures.file(data.addmap1, img[1], { base64: true });
                    }
                }
            }

            if (data.addmap2) {
                asset.addmap2 = data.addmap2;
                if (imgList.indexOf(data.addmap2) === -1) {
                    imgList.push(data.addmap2);
                    if (mesh.shaderMaterial.uniforms.addMap2.value.image.src.indexOf('blob') !== -1) {
                        locTextures.file(data.addmap2, mesh.shaderMaterial.uniforms.addMap2.value.blob);
                    } else {
                        let img = mesh.shaderMaterial.uniforms.addMap2.value.image.src.split(',');
                        locTextures.file(data.addmap2, img[1], { base64: true });
                    }
                }
            }

            if (data.addmap3) {
                asset.addmap3 = data.addmap3;
                if (imgList.indexOf(data.addmap3) === -1) {
                    imgList.push(data.addmap3);
                    if (mesh.shaderMaterial.uniforms.addMap3.value.image.src.indexOf('blob') !== -1) {
                        locTextures.file(data.addmap3, mesh.shaderMaterial.uniforms.addMap3.value.blob);
                    } else {
                        let img = mesh.shaderMaterial.uniforms.addMap3.value.image.src.split(',');
                        locTextures.file(data.addmap3, img[1], { base64: true });
                    }
                }
            }

            if (data.addmap4) {
                asset.addmap4 = data.addmap4;
                if (imgList.indexOf(data.addmap4) === -1) {
                    imgList.push(data.addmap4);
                    if (mesh.shaderMaterial.uniforms.addMap4.value.image.src.indexOf('blob') !== -1) {
                        locTextures.file(data.addmap4, mesh.shaderMaterial.uniforms.addMap4.value.blob);
                    } else {
                        let img = mesh.shaderMaterial.uniforms.addMap4.value.image.src.split(',');
                        locTextures.file(data.addmap4, img[1], { base64: true });
                    }
                }
            }

            asset.side = parseInt(data.side);
            if (data.shadows === '1') {
                asset.shadows = true;
            }

            if (data.alphaTest > 0) {
                asset.alphaTest = data.alphaTest;
            }
            if (data.transparent === '1') {
                asset.transparent = true;
            }

            if (data.transparent === '1') {
                asset.opacity = data.opacity;
            }

            asset.color = parseInt(data.color, '16');
            if (data.collider === '1') {
                asset.collider = true;
            }

            if (data.wirframe === '1') {
                asset.wirframe = true;
            }

            asset.pos = data.pos;
            asset.rot = data.rot;

            assets[mesh.name] = asset;
            obj.push({ id: mesh.name });

            let geo;

            if (mesh.geometry.type === 'BufferGeometry') {
                geo = new BABYLON.Geometry();
                geo.fromBufferGeometry(mesh.geometry);
            } else {
                geo = mesh.geometry;
            }
            //console.log(mesh.geometry, geo);
            geo.toJSON = toJSON;

            locGeometry.file(mesh.name + '.js', JSON.stringify(geo.toJSON().data));



        }
        zip.file('assets.js', JSON.stringify(assets));
        zip.file('locations.js', JSON.stringify(locations));

        zip.generateAsync({ type: "blob" })
            .then(function(content) {
                saveAs(content, "export.zip");

            });


    }

    render() {
        return ( <div onClick = { this.toggle } > Export </div> )
    }
}

export default ExportScene;