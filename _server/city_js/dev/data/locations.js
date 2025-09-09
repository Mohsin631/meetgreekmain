var locations = {
    1: {
        name: 'Локация 1',
        shadow: [60, -60],
        obj: [{
                id: 'loc1_main'
            },
            {
                id: 'loc1_floor'
            },
            {
                id: 'loc1_pic1'
            }, {
                id: 'loc1_pic2'
            }, {
                id: 'loc1_pic3'
            }, {
                id: 'loc1_pic4'
            }, {
                id: 'loc1_pic5'
            }, {
                id: 'loc1_sky'
            },

            {
                id: 'loc1_tv'
            },

            { id: 'loc1_tv_screen' },

            {
                id: 'loc1_col'
            }
        ],
        exits: [{
            loc: '2',
            spawn: 0,
            x1: 90,
            y2: -750,
            x2: 400,
            y1: -900,
            angle: 0

        }, {
            loc: '6',

            spawn: 1,
            x1: 250,
            y1: 1450,
            x2: 550,
            y2: 1550,
            angle: 180
        }],
        z: -400,
        z2: -200,
        enters: [
            [250, 250]
        ],

        lifts: [{
            x1: -340,
            x2: -230,
            y1: 120,
            y2: 270,
            end_x: -315,
            end_y: 634,
            rot: 180,
            floor: 2
        }, {
            x1: -340,
            x2: -230,
            y1: 580,
            y2: 620,
            end_x: -315,
            end_y: 100,
            rot: 1,
            floor: 1
        }],

        onInit: function() {
            let mesh = new BABYLON.Realmirror(130, 180);

            this.dirLight = new BABYLON.DirectionalLight(0xffffff, 0.8);
            this.dirLight.position.set(10, 10, 10);
            chat3d.world.scene.add(this.dirLight);

            //console.log(mesh);
            this.mirror = mesh;
            mesh.position.x = 850;
            mesh.position.y = -250;
            mesh.position.z = 1172;
            mesh.rotation.y = -Math.PI / 2;
            chat3d.world.obj.push(mesh);

            chat3d.world.scene.add(mesh);
            let chardata = {
                id: 200501,
                type: 'male',
                face: 'data/faces/2.jpg',
                cap: 'male_hair_11',
                head_color: 'F1CCBC',
                pos: [-60, 0], //250, 0
                rot: 90

            };

            //chat3d.world.set_self_char(chardata);

            this.extcol = new BABYLON.Mesh(
                new BABYLON.BoxGeometry(190, 250, 470),
                new BABYLON.MeshBasicMaterial({ side: 2, wireframe: true, visible: false })
            );
            this.extcol.position.set(-275, -100, 800);

            chat3d.world.scene.add(this.extcol);

            chat3d.world.colliders.push(this.extcol);

        },

        onRender: function(delta) {
            this.mirror.render(chat3d.world.renderer, chat3d.world.scene, chat3d.world.camera);
            this.mirror.fxaa(chat3d.world.renderer);
        },

        onClean: function() {
            chat3d.world.scene.remove(this.mirror);
            chat3d.world.scene.remove(this.dirLight);
        },

        video: {
            obj: 'loc1_tv_screen',
            sound: [180, -1055],
            x1: -183,
            y2: 0,
            x2: 150,
            y1: -270,
            loader_pos: [-84, -266, -179],
            loader_rot: [0, 45 / 180 * Math.PI, 0],
            loader_scale: 0.5

        },
        disableCharOptimization: true,
        showSelf: true,
        scripts: ['real_mirror.js', 'EffectComposer.js', 'FXAAShader.js', 'ShaderPass.js']
    },
    2: {
        name: 'Локация 2',
        shadow: [-10, 0],
        obj: [{
            id: 'loc2_display'
        }, {
            id: 'loc02'
        }, {
            id: 'loc2_floor'
        }, {
            id: 'loc2_col'
        }, {
            id: 'loc2_p1'
        }, {
            id: 'loc2_p2'
        }, {
            id: 'loc2_p3'
        }, {
            id: 'loc2_p4'
        }, {
            id: 'loc2_p5'
        }, {
            id: 'loc2_p6'
        }, {
            id: 'loc2_p7'
        }, {
            id: 'loc2_p8'
        }, {
            id: 'loc2_sky'
        }],
        z: 17,
        enters: [
            [-500, 575]
        ],
        exits: [{
                loc: '1',
                spawn: 0,
                x1: -700,
                y2: 850,
                x2: -300,
                y1: 700,
                angle: 180
            },

            {
                loc: '3',
                spawn: 0,
                x1: 850,
                y2: 200,
                x2: 999,
                y1: -50,
                angle: 230
            }
        ],
        video: {
            obj: 'loc2_display',
            sound: [180, -1055],
            x1: -580,
            y2: -800,
            x2: 850,
            y1: -1060,
            loader_pos: [165, 250, -1085],
            loader_rot: [0, 0, 0]

        },
        onInit: function() {
            console.log('oninit');
            if (chat3d.mobile_mode) {
                $('#world').click(function(e) {
                    console.log('video clicked');
                    //console.log(e);
                    if (chat3d.world.video.video) {
                        chat3d.world.video.video.muted = !chat3d.world.video.video.muted;
                    }
                    //console.log(chat3d.world.video.video.muted);
                });

                this.isOnScreen = chat3d.world.video.isOnScreen;
            }
        },
        onMouseDown: function(e) {
            if (chat3d.mobile_mode) {
                console.log('mousedown');
                return this.isOnScreen(e.clientX, e.clientY);
            } else {
                return true;
            }
        },
        onMouseUp: function(e) {
            if (chat3d.mobile_mode) {
                console.log('mouseup');
                return this.isOnScreen(e.clientX, e.clientY);
            } else {
                return true;
            }
        },
        onTouchDown: function(e) {
            if (chat3d.mobile_mode) {
                return this.isOnScreen(e.changedTouches[0].clientX, e.changedTouches[0].clientY);

            } else {
                return true;
            }
        },
        onTouchUp: function(e) {
            if (chat3d.mobile_mode) {
                console.log('touchend');
                return this.isOnScreen(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            } else {
                return true;
            }
        }

        /*view_zones: '2_viewzones.json'*/
    },

    3: {
        name: 'Локация 3',
        shadow: [280, -280],
        obj: [{
            id: 'loc3_floor'
        }, {
            id: 'loc3_pt1'
        }, {
            id: 'loc3_pt2'
        }, {
            id: 'loc3_pic01'
        }, {
            id: 'loc3_pic02'
        }, {
            id: 'loc3_pic03'
        }, {
            id: 'loc3_pic04'
        }, {
            id: 'loc3_pic05'
        }, {
            id: 'loc3_pic06'
        }, {
            id: 'loc3_pic07'
        }, {
            id: 'loc3_pic08'
        }, {
            id: 'loc3_pic09'
        }, {
            id: 'loc3_pic10'
        }, {
            id: 'loc3_pic11'
        }, {
            id: 'loc3_pic12'
        }, {
            id: 'loc3_pic13'
        }, {
            id: 'loc3_pic14'
        }, {
            id: 'loc3_pic15'
        }, {
            id: 'loc3_pic16'
        }, {
            id: 'loc3_pic17'
        }, {
            id: 'loc3_pic18'
        }, {
            id: 'loc3_pic19'
        }, {
            id: 'loc3_pic21'
        }, {
            id: 'loc3_pic22'
        }, {
            id: 'loc3_pic23'
        }, {
            id: 'loc3_pic24'
        }, {
            id: 'loc3_pic25'
        }, {
            id: 'loc3_pic26'
        }, {
            id: 'loc3_pic27'
        }, {
            id: 'loc3_pic28'
        }, {
            id: 'loc3_pic20'
        }, {
            id: 'loc3_sky'
        }, {
            id: 'loc3_col'
        }],
        z: 17,
        //dyn_view_zones: '3_dyn_view.json',
        enters: [
            [-500, 575]
        ],
        exits: [{
                loc: '2',
                spawn: 1,
                x1: 300,
                y2: 1100,
                x2: 600,
                y1: 950,
                angle: 180
            },

            {
                loc: '4',
                spawn: 0,
                x1: -380,
                y2: -1150,
                x2: -200,
                y1: -1250
            }
        ]
    },

    4: {
        name: 'Локация 4',
        shadow: [140, -140],
        obj: [{
            id: 'loc4_floor'
        }, {
            id: 'loc4'
        }, {
            id: 'loc4_flowers'
        }, {
            id: 'loc4_pic1'
        }, {
            id: 'loc4_pic2'
        }, {
            id: 'loc4_pic3'
        }, {
            id: 'loc4_pic4'
        }, {
            id: 'loc4_pic5'
        }, {
            id: 'loc4_col'
        }, {
            id: 'loc4_sphere'
        }],
        z: 17,
        enters: [
            [0, 575]
        ],
        exits: [{
                loc: '3',
                spawn: 1,
                x1: -350,
                y1: 777,
                y2: 1000,
                x2: -90,
                angle: 180

            },

            {
                loc: '5',
                spawn: 0,
                x1: -1300,
                y2: -345,
                x2: -1177,
                y1: -479,
                angle: 90
            }
        ]
    },

    5: {
        name: 'Локация 5',
        shadow: [-190, 190],
        obj: [{
                id: 'loc5_floor'
            }, {
                id: 'loc5'
            }, {
                id: 'loc5_display'
            }, {
                id: 'loc5_mag'
            }, {
                id: 'loc5_pic001'
            }, {
                id: 'loc5_pic002'
            }, {
                id: 'loc5_pic003'
            }, {
                id: 'loc5_pic004'
            }, {
                id: 'loc5_pic005'
            }, {
                id: 'loc5_pic006'
            }, {
                id: 'loc5_pic007'
            }, {
                id: 'loc5_pic008'
            },
            {
                id: 'loc5_collider'
            },
            /*{
                id: 'loc5_collider0'
            },
            {
                id: 'loc5_collider1'
            },

            {
                id: 'loc5_collider2'
            },
            {
                id: 'loc5_collider3'
            },
            {
                id: 'loc5_collider4'
            },
            {
                id: 'loc5_collider5'
            },
            {
                id: 'loc5_collider6'
            },
            {
                id: 'loc5_collider7'
            },
            {
                id: 'loc5_collider8'
            },
            {
                id: 'loc5_collider9'
            },

            {
                id: 'loc5_collider10'
            },

            {
                id: 'loc5_collider11'
            },

            {
                id: 'loc5_collider12'
            },

            {
                id: 'loc5_collider13'
            },

            {
                id: 'loc5_collider14'
            },

            {
                id: 'loc5_collider15'
            },

            {
                id: 'loc5_collider16'
            },

            {
                id: 'loc5_collider17'
            },

            {
                id: 'loc5_collider18'
            },

            {
                id: 'loc5_collider19'
            },

            {
                id: 'loc5_collider20'
            },

            {
                id: 'loc5_collider21'
            },

            {
                id: 'loc5_collider22'
            },

            {
                id: 'loc5_collider23'
            },

            {
                id: 'loc5_collider24'
            },

            {
                id: 'loc5_collider25'
            },

            {
                id: 'loc5_collider26'
            },

            {
                id: 'loc5_collider27'
            },

            {
                id: 'loc5_collider28'
            },

            {
                id: 'loc5_collider29'
            },

            {
                id: 'loc5_collider30'
            },

            {
                id: 'loc5_collider31'
            },

            {
                id: 'loc5_collider32'
            },

            {
                id: 'loc5_collider33'
            },

            {
                id: 'loc5_collider34'
            },

            {
                id: 'loc5_collider35'
            },

            {
                id: 'loc5_collider36'
            },

            {
                id: 'loc5_collider37'
            },

            {
                id: 'loc5_collider38'
            },

            {
                id: 'loc5_collider39'
            },

            {
                id: 'loc5_collider40'
            },

            {
                id: 'loc5_collider41'
            },

            {
                id: 'loc5_collider42'
            },

            {
                id: 'loc5_collider43'
            },

            {
                id: 'loc5_collider44'
            },

            {
                id: 'loc5_collider45'
            },

            {
                id: 'loc5_collider46'
            },

            {
                id: 'loc5_collider47'
            },

            {
                id: 'loc5_collider48'
            },

            {
                id: 'loc5_collider49'
            },

            {
                id: 'loc5_collider50'
            },

            {
                id: 'loc5_collider51'
            },

            {
                id: 'loc5_collider52'
            },

            {
                id: 'loc5_collider53'
            },

            {
                id: 'loc5_collider54'
            },

            {
                id: 'loc5_collider55'
            },

            {
                id: 'loc5_collider56'
            },

            {
                id: 'loc5_collider57'
            },

            {
                id: 'loc5_collider58'
            },

            {
                id: 'loc5_collider59'
            },

            {
                id: 'loc5_collider60'
            },

            {
                id: 'loc5_collider61'
            },

            {
                id: 'loc5_collider62'
            },

            {
                id: 'loc5_collider63'
            },

            {
                id: 'loc5_collider64'
            },

            {
                id: 'loc5_collider65'
            },

            {
                id: 'loc5_collider66'
            },

            {
                id: 'loc5_collider67'
            },

            {
                id: 'loc5_collider68'
            },

            {
                id: 'loc5_collider69'
            },

            {
                id: 'loc5_collider70'
            },

            {
                id: 'loc5_collider71'
            },*/


            {
                id: 'loc5_sphere'
            }
        ],
        z: 17,
        enters: [
            [0, 575]
        ],
        video: {
            obj: 'loc5_display',
            sound: [179, 0],
            x1: 210,
            y2: 240,
            x2: 350,
            y1: -180,
            loader_pos: [179, 189, 10],
            loader_rot: [0, Math.PI / 2, 0]

        },
        onInit: function() {
            console.log('oninit');
            if (chat3d.mobile_mode) {
                $('#world').click(function(e) {
                    console.log('video clicked');
                    //console.log(e);
                    if (chat3d.world.video.video) {
                        chat3d.world.video.video.muted = !chat3d.world.video.video.muted;
                    }
                    //console.log(chat3d.world.video.video.muted);
                });

                this.isOnScreen = chat3d.world.video.isOnScreen;
            }
        },
        onMouseDown: function(e) {
            if (chat3d.mobile_mode) {
                console.log('mousedown');
                return this.isOnScreen(e.clientX, e.clientY);
            } else {
                return true;
            }
        },
        onMouseUp: function(e) {
            if (chat3d.mobile_mode) {
                console.log('mouseup');
                return this.isOnScreen(e.clientX, e.clientY);
            } else {
                return true;
            }
        },
        onTouchDown: function(e) {
            if (chat3d.mobile_mode) {
                return this.isOnScreen(e.changedTouches[0].clientX, e.changedTouches[0].clientY);

            } else {
                return true;
            }
        },
        onTouchUp: function(e) {
            if (chat3d.mobile_mode) {
                console.log('touchend');
                return this.isOnScreen(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            } else {
                return true;
            }
        },
        exits: [{
                loc: '4',
                spawn: 1,
                x1: -575,
                y1: 750,
                y2: 830,
                x2: -300,
                angle: 180

            },

            {
                loc: '6',
                spawn: 1,
                x1: 1050,
                y1: -100,
                y2: 170,
                x2: 1170,
                angle: 270

            }
        ]
    },

    6: {
        name: 'Локация 6',
        shadow: [-285, 285],
        obj: [{
            id: 'loc6_floor'
        }, {
            id: 'loc6'
        }, {
            id: 'loc6_collider'
        }],
        //camera_far: 4000,
        z: 17,
        enters: [
            [0, 575]
        ],
        exits: [{
                loc: '5',
                spawn: 1,
                x1: 1840,
                y1: -300,
                y2: -50,
                x2: 1910,
                angle: 270

            },

            {
                loc: '1',
                spawn: 1,
                x1: -1350,
                y1: -650,
                y2: -450,
                x2: -1200,
                angle: 90

            }
        ],
        scripts: ['customobjselect.js'],
        textures: ['text_active2.png']
    },


    7: {
        name: 'Локация 7',
        shadow: [-285, 285],
        water: {
            w: 50000,
            h: 50000,
            x: 0,
            y: 0,
            z: 0
        },
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'loc8'
        },
        sun: {
            x: -600,
            y: 100,
            z: 100,
            color: 0x999999
        },
        obj: [{
            id: 'loc8'
        }, {
            id: 'loc8_antenna'
        }, {
            id: 'loc8_col'
        }, {
            id: 'loc8_handrail'
        }, {
            id: 'loc8_wineglass'
        }, {
            id: 'loc8_pic1'
        }, {
            id: 'loc8_pic2'
        }, {
            id: 'loc8_floor1'
        }, {
            id: 'loc8_floor2'
        }, {
            id: 'loc8_glass_front'
        }, {
            id: 'loc8_glass_table'
        }],
        //camera_far: 4000,
        z: 205,
        z2: 520,
        enters: [
            [0, 575]
        ],


        lifts: [{
            x1: -300,
            x2: -210,
            y1: 35,
            y2: 60,
            end_x: -220,
            end_y: -350,
            rot: 1,
            floor: 2
        }, {
            x1: -300,
            x2: -200,
            y1: -325,
            y2: -300,
            end_x: -220,
            end_y: 100,
            rot: 180,
            floor: 1
        }]
    },

    8: {
        name: 'Локация 8',
        shadow: [-285, 285],
        water: {
            w: 50000,
            h: 50000,
            x: 0,
            y: 0,
            z: 0
        },
        sun: {
            x: -450,
            y: 300,
            z: 1000,
            color: 0xffffff
        },
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'loc8_night'
        },
        obj: [{
            id: 'loc8_night'
        }, {
            id: 'loc8_antenna_night'
        }, {
            id: 'loc8_col'
        }, {
            id: 'loc8_handrail1'
        }, {
            id: 'loc8_handrail2'
        }, {
            id: 'loc8_wineglass'
        }, {
            id: 'loc8_pic1'
        }, {
            id: 'loc8_pic2'
        }, {
            id: 'loc8_floor1_night'
        }, {
            id: 'loc8_floor2_night'
        }, {
            id: 'loc8_glass_front_night'
        }, {
            id: 'loc8_glass_table_night'
        }],
        //camera_far: 4000,
        z: 205,
        z2: 520,
        enters: [
            [0, 575]
        ],


        lifts: [{
            x1: -300,
            x2: -210,
            y1: 35,
            y2: 60,
            end_x: -220,
            end_y: -350,
            rot: 1,
            floor: 2
        }, {
            x1: -300,
            x2: -200,
            y1: -325,
            y2: -300,
            end_x: -220,
            end_y: 100,
            rot: 180,
            floor: 1
        }]
    },

    9: {
        name: 'Локация 9',

        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: -100,
            map: 'loc9'
        },

        water: {
            w: 50000,
            h: 50000,
            x: 0,
            y: 0,
            z: -100
        },
        sun: {
            x: -450,
            y: 300,
            z: 1000,
            color: 0xffffff
        },

        obj: [{
            id: 'loc9_col'
        }, {
            id: 'loc9_floor'
        }, {
            id: 'loc9_inner'
        }, {
            id: 'loc9_outer'
        }, {
            id: 'loc9_fire'
        }, {
            id: 'loc9_smog'
        }, {
            id: 'loc9_prop'
        }, {
            id: 'loc_09_candle_fire'
        }],
        //camera_far: 4000,
        z: -28,

        enters: [
            [0, 575]
        ]


    },

    10: {
        name: 'Локация 10',

        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: -100,
            rot: 90,
            map: 'loc9_night'
        },

        water: {
            w: 50000,
            h: 50000,
            x: 0,
            y: 0,
            z: -100
        },
        sun: {
            x: -450,
            y: 300,
            z: 1000,
            color: 0xffffff
        },

        obj: [{
            id: 'loc9_col_n'
        }, {
            id: 'loc9_floor_n'
        }, {
            id: 'loc9_inner'
        }, {
            id: 'loc9_outer_n'
        }, {
            id: 'loc9_fire'
        }, {
            id: 'loc9_smog'
        }, {
            id: 'loc9_prop'
        }, {
            id: 'loc_09_candle_fire'
        }],
        //camera_far: 4000,
        z: -27,

        enters: [
            [0, 575]
        ]


    },

    12: {
        name: 'street platform 1',
        obj: [{
                id: 'street_sphere'
            }, {
                id: 'street_col'
            }, {
                id: 'street_gate'
            }, {
                id: 'street_gate_floor'
            },
            {
                id: 'street_col_snow'
            }, {
                id: 'street_gate_snow'
            }, {
                id: 'street_gate_floor_snow'
            },
            {
                id: 'platform_05_snow'
            },
            {
                id: 'loc_10_pave'
            }, {
                id: 'loc_10_pave_col'
            }, {
                id: 'loc_10_pave_floor'
            }, {
                id: 'loc_10_pave_plants'
            }, {
                id: 'loc_10_pave_shadow'
            },

            {
                id: 'loc_10_08'
            }, {
                id: 'loc_10_08_col'
            }, {
                id: 'loc_10_08_floor'
            }, {
                id: 'loc_10_07'
            }, {
                id: 'loc_10_07_col'
            }, {
                id: 'loc_10_07_floor'
            }, {
                id: 'loc_10_07_plants'
            }, {
                id: 'loc_10_07_shadow'
            },

            {
                id: 'loc_10_09'
            }, {
                id: 'loc_10_09_col'
            }, {
                id: 'loc_10_09_floor'
            }, {
                id: 'loc_10_09_plants'
            },

            {
                id: 'loc_10_10'
            },
            /*{
            	id: 'loc_10_10_col'
            },*/
            {
                id: 'loc_10_10_floor'
            }, {
                id: 'loc_10_10_plants'
            }, {
                id: 'loc_10_10_shadow'
            }, {
                id: 'loc_10_10_col'
            },

            {
                id: 'loc_10_11_col'
            }, {
                id: 'loc_10_11_shadow'
            }, {
                id: 'loc_10_11_floor'
            }, {
                id: 'loc_10_11_plants'
            }, {
                id: 'loc_10_11_sled'
            },

            {
                id: 'loc_10_11_col_2'
            }, {
                id: 'loc_10_11_shadow_2'
            }, {
                id: 'loc_10_11_floor_2'
            }, {
                id: 'loc_10_11_plants_2'
            }, {
                id: 'loc_10_11_sled_2'
            }, {
                id: 'loc_10_16_collider'
            }, {
                id: 'loc_10_16_floor'
            }, {
                id: 'loc_10_16_gazebo'
            }, {
                id: 'loc_10_16_fire'
            }, {
                id: 'loc_10_17_collider'
            }, {
                id: 'loc_10_17_road_works'
            }, {
                id: 'loc_10_17_road_snow'
            }, {
                id: 'loc_10_17_road_floor'
            }, {
                id: 'loc_10_17_road_smog'
            }, {
                id: 'loc_10_17_road_shadow'
            }, {
                id: 'loc_10_17_collider_2'
            }, {
                id: 'loc_10_17_road_works_2'
            }, {
                id: 'loc_10_17_road_floor_2'
            }, {
                id: 'loc_10_17_road_smog_2'
            }, {
                id: 'loc_10_14_floor'
            }, {
                id: 'loc_10_14_chains'
            }, {
                id: 'loc_10_14_collider'
            }, {
                id: 'loc_10_14_glass'
            }, {
                id: 'loc_10_14_mt'
            }

            , {
                id: 'loc_10_18_carousel'
            }, {
                id: 'loc_10_18_coach'
            }, {
                id: 'loc_10_18_coach2'
            }, {
                id: 'loc_10_18_coach3'
            }, {
                id: 'loc_10_18_coach4'
            }, {
                id: 'loc_10_18_fence'
            }, {
                id: 'loc_10_18_horse_1'
            }, {
                id: 'loc_10_18_horse_2'
            }, {
                id: 'loc_10_18_floor'
            }, {
                id: 'loc_10_18_col'
            }, {
                id: 'loc_10_18_horse_3'
            }, {
                id: 'loc_10_18_horse_4'
            }, {
                id: 'loc_10_18_horse_5'
            }, {
                id: 'loc_10_18_horse_6'
            }, {
                id: 'loc_10_18_horse_7'
            }, {
                id: 'loc_10_18_horse_8'
            }, {
                id: 'loc_10_12_army_truck'
            }, {
                id: 'loc_10_12_collider'
            }, {
                id: 'loc_10_12_floor'
            }, {
                id: 'loc_10_13_pickup_truck'
            }, {
                id: 'loc_10_13_collider'
            }, {
                id: 'loc_10_13_floor'
            }, {
                id: 'loc_10_15_collider'
            }, {
                id: 'loc_10_15_floor'
            }, {
                id: 'loc_10_15_pavilion'
            }, {
                id: 'loc_10_15_plants'
            }

            , {
                id: 'pl_20'
            }, {
                id: 'pl_20_col'
            }, {
                id: 'pl_20_ground'
            }, {
                id: 'pl_20_wings'
            }, {
                id: 'pl_20_plants'
            }

            , {
                id: 'pl_19'
            }, {
                id: 'pl_19_col'
            }, {
                id: 'pl_19_ground'
            }, {
                id: 'pl_19_plants'
            }, {
                id: 'pl_19_b1'
            }, {
                id: 'pl_19_b2'
            }, {
                id: 'pl_19_b3'
            }, {
                id: 'pl_19_b4'
            }, {
                id: 'pl_19_b5'
            }, {
                id: 'pl_19_b6'
            }, {
                id: 'pl_19_b7'
            }, {
                id: 'pl_19_b8'
            }, {
                id: 'pl_19_b9'
            }, {
                id: 'pl_19_b10'
            }, {
                id: 'pl_19_b11'
            }, {
                id: 'pl_19_b12'
            },

            {
                id: "pl_24_floor"
            },
            {
                id: "pl_24"
            },
            {
                id: "pl_24_col"
            },

            {
                id: "pl_25_floor"
            },
            {
                id: "pl_25"
            },
            {
                id: "pl_25_col"
            },

            {
                id: "pl_26_floor"
            },
            {
                id: "pl_26"
            },
            {
                id: "pl_26_col"
            },

            {
                id: "pl_27_floor"
            },
            {
                id: "pl_27"
            },
            {
                id: "pl_27_col"
            },

            { "id": "pl_23" }, { "id": "pl_23_water" }, /*{ "id": "pl_23_water_1" }, { "id": "pl_23_water_2" }, { "id": "pl_23_water_3" },*/ { "id": "pl_23_mc_plant_k03_001" }, { "id": "pl_23_mc_plant_111_001" }, { "id": "pl_23_mc_plant_204_001" }, { "id": "pl_23_mc_plant_319_001" }, { "id": "pl_23_mc_plant_309_001" }, { "id": "pl_23_mc_plant_311_001" }, { "id": "pl_23_mc_plant_305_001" }, { "id": "pl_23_mc_plant_309_002" }, { "id": "pl_23_mc_plant_305_002" }, { "id": "pl_23_mc_plant_309_003" }, { "id": "pl_23_mc_plant_705_001" }, { "id": "pl_23_mc_plant_k13_001" }, { "id": "pl_23_mc_plant_k13_002" }, { "id": "pl_23_mc_plant_705_002" }, { "id": "pl_23_mc_plant_k13_003" }, { "id": "pl_23_mc_plant_k13_004" }, { "id": "pl_23_mc_plant_201_001" }, { "id": "pl_23_mc_plant_705_003" }, { "id": "pl_23_mc_plant_201_002" }, { "id": "pl_23_mc_tree_1_001" }, { "id": "pl_23_mc_plant_k03_002" }, { "id": "pl_23_mc_plant_204_002" }, { "id": "pl_23_mc_plant_201_003" }, { "id": "pl_23_floor" }, { "id": "pl_23_collider" }

        ],

        onInit: function() {
            //console.log(chat3d.world.googlemap.getLinks());
            //console.log(chat3d.loader);
            //for (var i in chat3d.loader.googlemap.data) {
            //console.log(chat3d.loader.googlemap.data[i].googlemap.getLinks());
            //}
            //console.log(this.col);
            this.col = new BABYLON.Mesh(new BABYLON.SphereGeometry(2000, 100, 100), new BABYLON.MeshBasicMaterial({ side: BABYLON.DoubleSide, wireframe: true, visible: false }));
            this.col.position.set(chat3d.world.custom_loc_data.gm_offset.y * -5, 0, chat3d.world.custom_loc_data.gm_offset.x * -5);
            chat3d.world.scene.add(this.col);
            this.hub = new p2phub();
            var colGeo = new BABYLON.PlaneGeometry(250, 250);
            var colMat = new BABYLON.MeshBasicMaterial({ visible: false, side: BABYLON.doubleSide });
            this.mark1 = new BABYLON.Sprite(
                new BABYLON.SpriteMaterial({
                    map: chat3d.loader.textures.get(chat3d.world.maps + 'loc/pokazyvalka.png'),

                })
            );
            this.mark1.visible = false;
            this.mark1.enabled = false;


            this.mark1_col = new BABYLON.Mesh(colGeo,
                colMat);

            this.mark1.scale.set(250, 250, 250);

            chat3d.world.scene.add(this.mark1);
            chat3d.world.scene.add(this.mark1_col);


            this.mark2 = new BABYLON.Sprite(
                new BABYLON.SpriteMaterial({
                    map: chat3d.loader.textures.get(chat3d.world.maps + 'loc/pokazyvalka2.png'),
                    //blending: BABYLON.AdditiveBlending
                    //depthTest: false
                })
            );
            this.mark2.visible = false;
            this.mark2.enabled = false;

            this.mark2_col = new BABYLON.Mesh(colGeo, colMat);

            this.mark2.scale.set(250, 250, 250);
            chat3d.world.scene.add(this.mark2);
            chat3d.world.scene.add(this.mark2_col);
            //console.log(this.mark1);
            this.setMark = function(pos, type) {

                this['mark' + type].position.copy(pos);
                this['mark' + type + '_col'].position.copy(pos);
                this['mark' + type].enabled = true;
                this['mark' + type].material.opacity = 0.3;
            };

            this.setMarkOff = function(type) {
                this['mark' + type].enabled = false;
            };

            this.sendMarkState = function(type) {

                this.hub.broadcast('markState' + type, {
                    enabled: this['mark' + type].enabled,
                    pos: this['mark' + type].position.toArray()
                });
            };

            this.showNextPano = function() {
                chat3d.world.custom_loc_data['gm_uniforms'].map.value = chat3d.world.custom_loc_data['gm_next_tex'];
                chat3d.world.location.goNext = false;

            };

            this.loadNext = function(data) {
                chat3d.world.googlemap = data;
                var nextpano = new GSVPANO.PanoLoader({ noFakeLoad: true });
                nextpano.onPanoramaLoad = function() {
                    var tex;
                    if (!chat3d.mobile_mode) {
                        var canvas = document.createElement('canvas');
                        canvas.width = 4096;
                        canvas.height = 2048;

                        var context = canvas.getContext('2d');

                        context.drawImage(this.canvas[0], 0, 0, canvas.width, canvas.height);
                        //console.log(this.canvas[0]);
                        tex = new BABYLON.Texture(canvas);
                    } else {

                        tex = new BABYLON.Texture(this);

                    }
                    tex.needsUpdate = true;
                    //console.log(tex);
                    chat3d.world.custom_loc_data['gm_uniforms'].map.value = tex;
                    chat3d.world.location.goNext = false;
                    //chat3d.world.custom_loc_data['gm_next_tex'] = tex;

                    chat3d.msg.send('nextStreetLoadDone', '');
                    //chat3d.msg.send('nextStreetMap', chat3d.world.googlemap);

                };
                var Latlng = new google.maps.LatLng(data.lat, data.lng);
                //console.log(chat3d.panorama.location, Latlng);

                nextpano.setZoom(!chat3d.mobile_mode ? 4 : 3);
                //nextpano.load(chat3d.panorama.location.latLng, chat3d.panorama.pano);
                nextpano.load(Latlng, data.platform);

                chat3d.msg.send('nextStreetLoadStart', '');
                chat3d.msg.send('nextStreetMap', chat3d.world.googlemap);
            };

            this.isSameMarkPos = function(pos, type) {
                if (pos[0] != this['mark' + type].position.x) {
                    //console.log('new x ', pos[0], this['mark' + type].position.x);
                    return false;
                }

                if (pos[1] != this['mark' + type].position.y) {
                    //console.log('new y ', pos[1], this['mark' + type].position.y);
                    return false;
                }

                if (pos[2] != this['mark' + type].position.z) {
                    //console.log('new z ', pos[2], this['mark' + type].position.z);
                    return false;
                }

                return true;
            };

            this.setCamRot = function(pos) {
                if (chat3d.disableMark) {
                    return;
                }
                this.rotation = true;
                this.targetRot = Math.atan2(pos[0], pos[2]) * 180 / Math.PI + 180;
                //console.log('setCamRot', this.targetRot);
                chat3d.move.setAutoRot(this.targetRot);
                //chat3d.move.h_angle = this.targetRot + 180;
            }

            if (chat3d.manager) {
                //console.log('manager');
                setTimeout(function() {
                    if (!chat3d.panorama) {
                        var panoramaOptions = {
                            position: new google.maps.LatLng(chat3d.world.googlemap.lat, chat3d.world.googlemap.lng),
                            pov: {
                                heading: 270,
                                pitch: 0
                            },
                            visible: true
                        };
                        var element = document.createElement('div');
                        var panorama = new google.maps.StreetViewPanorama(element, panoramaOptions);
                        //console.log(panorama.getLinks());

                        this.links = [];
                        chat3d.panorama = panorama;
                        this.goCols = [];


                        google.maps.event.addListener(panorama, 'links_changed', function() {
                            //console.log(panorama.getLinks());
                            chat3d.world.location.links = chat3d.panorama.getLinks();
                            //console.log(chat3d.world.location.links);
                            var geo = new BABYLON.BoxGeometry(400, 450, 20);
                            for (var i in chat3d.world.location.goCols) {
                                chat3d.world.scene.remove(chat3d.world.location.goCols[i]);
                            }
                            chat3d.world.location.goCols = [];
                            for (i in chat3d.world.location.links) {
                                //console.log(chat3d.pano_heading);
                                //var rowAngle = -(chat3d.world.location.links[i].heading - 90 - chat3d.pano_heading) * Math.PI / 180;
                                //console.log(chat3d.world.location.links[i].heading);


                                //var angle = -(chat3d.world.location.links[i].heading - 90 + chat3d.pano_heading) * Math.PI / 180;
                                var mesh = new BABYLON.Mesh(geo, new BABYLON.MeshBasicMaterial({ wireframe: true, visible: false }));
                                // mesh.position.set(Math.cos(rowAngle) * 500, 100, Math.sin(rowAngle) * 500);
                                //mesh.rotation.set(0, rowAngle, 0);

                                chat3d.world.scene.add(mesh);
                                chat3d.world.location.goCols.push(mesh);

                            }
                            /*if ($('#nextStep').length) {
                                $('#nextStep').html('');
                            }

                            for (var i in chat3d.world.location.links) {
                                $('#nextStep').append(
                                    $('<option/>').attr('value', i).text(i)
                                );
                            }*/

                            if (chat3d.world.location.goNext) {
                                var data = {};
                                //console.log(chat3d.panorama.location);
                                data.street = {
                                    lat: chat3d.panorama.location.latLng.lat(),
                                    lng: chat3d.panorama.location.latLng.lng(),
                                    platform: chat3d.panorama.location.pano, //chat3d.world.googlemap.platform,
                                    key_map: chat3d.world.googlemap.key_map,
                                };
                                var state = chat3d.move.get_state();
                                data.pos = state.pos;
                                data.rot = state.angle;
                                data.floor = state.floor;
                                data.cam_type = 0;
                                data.custom_loc_data = [];
                                data.location = 12;
                                //chat3d.world.set_loc(data);
                                chat3d.world.location.loadNext(data.street);
                                //chat3d.msg.send('nextStreetMap', data.street);


                                /*chat3d.loader.googlemap.clean();

                                chat3d.world.googlemap.lat = scope.panorama.location.latLng.lat();
                                chat3d.world.googlemap.lng = scope.panorama.location.latLng.lng();

                                chat3d.world.prev_init_loc = null;


                                if (chat3d.world.googlemap && !chat3d.world.googlemap.water) {
                                    chat3d.loader.googlemap.add(chat3d.world.googlemap.lat + '_' + chat3d.world.googlemap.lng, '1', chat3d.world.googlemap);
                                } else if (chat3d.world.googlemap && chat3d.world.googlemap.water) {
                                    chat3d.loader.textures.add(chat3d.world.maps + 'loc/water_' + chat3d.world.googlemap.water + '.jpg');
                                }
                                chat3d.loader.googlemap.start();*/


                            } else {
                                console.log(chat3d.panorama.getLinks());
                            }

                        });
                    } else {
                        console.log(chat3d.panorama);
                        if (chat3d.panorama.location.latLng.lat() != chat3d.world.googlemap.lat && chat3d.world.googlemap.lng != chat3d.panorama.location.latLng.lng()) {
                            chat3d.panorama.setPosition(new google.maps.LatLng(chat3d.world.googlemap.lat, chat3d.world.googlemap.lng));
                        }

                    }

                    if ($('#streetgobut').length === 0) {
                        var gobut = $('<img/>')
                            .attr('id', 'streetgobut')
                            .attr('src', 'img/streetgobut.png')
                            .css('position', 'absolute')
                            .css('bottom', '135px')
                            .css('left', '50%')
                            .css('width', '100px')
                            .css('margin-left', '-50px')
                            .css('cursor', 'pointer')
                            .css('display', 'none')
                            .click(function() {
                                if ($(this).data('n')) {
                                    chat3d.world.location.next($(this).data('n'));
                                    $(this).data('n', '');
                                }
                            });
                        $(gobut).hide();

                        $('body').append(gobut);
                    }
                    //console.log(chat3d.panorama);
                }.bind(this), 1000);
            }




            this.next = function(n) {
                this['mark1'].enabled = false;
                this['mark2'].enabled = false;
                this.sendMarkState(1);
                this.sendMarkState(2);
                //console.log(this.panorama);
                //console.log(1111111111, this.links);
                //this.links = chat3d.panorama.getLinks();
                //console.log(n, this.links[n], chat3d.panorama);
                chat3d.panorama.setPano(this.links[n].pano);
                //chat3d.panorama.setPov({ heading: this.links[n].heading, pitch: 0 });
                //this.panorama.setVisible(true);m
                this.goNext = true;
                //console.log(this.panorama);


            };



            this.goNextStreet = function(data) {
                chat3d.panorama.setPano(data.platform);
                this.loadNext(data);
                //chat3d.panorama.setPosition(new google.maps.LatLng(chat3d.world.googlemap.lat, chat3d.world.googlemap.lng));
            }


        },

        onRender: function(delta) {

            if (chat3d.manager && !this.goNext) {

                //console.log(this.links);
                //this.links = chat3d.panorama.getLinks();
                //console.log(chat3d.panorama.getLinks());
                var rot = chat3d.math.norm_angle(180 - chat3d.move.get_state().angle);

                /*for (var n in this.links) {

                    var heading = chat3d.math.norm_angle(this.links[n].heading + chat3d.pano_heading);
                     var delta = Math.abs(chat3d.math.get_angle_delta(heading, rot));
                    if (delta < 40) {
                        $('#streetgobut').data('n', n).fadeIn();
                        return;
                    }
                }*/

                var raycast = chat3d.view.raycaster;
                raycast.ray.origin.setFromMatrixPosition(chat3d.world.camera.matrixWorld);
                var vector = new BABYLON.Vector3(0, 0, 0.9);
                vector.unproject(chat3d.world.camera);
                vector.sub(raycast.ray.origin).normalize();
                raycast.far = 1000;
                raycast.ray.direction = vector;
                var fadein;
                var angle;
                $('#streetgobut').data('n', '');
                for (var i in this.goCols) {

                    angle = -(this.links[i].heading - 90 - chat3d.pano_heading) * Math.PI / 180;
                    this.goCols[i].position.set(-Math.cos(angle) * 500, 100, Math.sin(angle) * 500);
                    this.goCols[i].lookAt(raycast.ray.origin);
                    this.goCols[i].updateMatrixWorld();
                    var intersects = raycast.intersectObject(this.goCols[i]);
                    if (intersects.length) {
                        $('#streetgobut').data('n', i);

                        $('#streetgobut').fadeIn();

                        //.fadeIn();
                        fadein = true;
                        this.fadein = true;
                        //console.log('fadein');
                    }

                }

                if (!fadein) {
                    if (this.fadein) {
                        $('#streetgobut').fadeOut();
                        //console.log('fadeout');
                    } else {
                        this.fadein = false;
                    }
                    //console.log(this.goCols);
                }
            }

            if (this.mark1.enabled) {
                this.mark1.visible = true;
                this.mark1.material.opacity += delta * 2;
                this.mark1.material.opacity = Math.min(this.mark1.material.opacity, 1);
            } else {
                this.mark1.material.opacity -= delta * 2;
                if (this.mark1.material.opacity < 0.3) {
                    this.mark1.visible = false;
                }
            }
            if (this.mark2.enabled) {
                this.mark2.visible = true;
                this.mark2.material.opacity += delta;
                this.mark2.material.opacity = Math.min(this.mark2.material.opacity, 1);
            } else {
                this.mark2.material.opacity -= delta;
                if (this.mark2.material.opacity < 0.3) {
                    this.mark2.visible = false;
                }
            }

            if (chat3d.disableMark) {
                this.mark2.visible = false;
                this.mark1.visible = false;
            }




        },

        onClean: function() {
            for (var i in this.goCols) {
                chat3d.world.scene.remove(this.goCols[i]);
            }
            $('#streetgobut').fadeOut();
            chat3d.world.scene.remove(this.mark1);
            chat3d.world.scene.remove(this.mark2);
            chat3d.world.scene.remove(this.mark1_col);
            chat3d.world.scene.remove(this.mark2_col);
            chat3d.world.scene.remove(this.col);
        },

        onMouseUp: function(e) {
            if (!chat3d.disableMark) {
                if (chat3d.manager || chat3d.visitor) {
                    if (this.markActionTimer) {
                        clearTimeout(this.markActionTimer);
                        this.markActionTimer = null;
                        console.log('clean timer');
                        return true;
                    }
                    if (chat3d.pc_controls.move < 20) {

                        var x = e.clientX;
                        var y = e.clientY;
                        var raycast = chat3d.view.raycaster;
                        raycast.ray.origin.setFromMatrixPosition(chat3d.world.camera.matrixWorld);
                        var vector = new BABYLON.Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.9);
                        vector.unproject(chat3d.world.camera);
                        vector.sub(raycast.ray.origin).normalize();
                        raycast.far = 5000;
                        raycast.ray.direction = vector;
                        var type = '1';
                        var type2 = '2';
                        if (!chat3d.manager) {
                            type = '2';
                            type2 = '1';
                        }
                        this['mark' + type + '_col'].lookAt(raycast.ray.origin);
                        this['mark' + type + '_col'].updateMatrixWorld();
                        var intersects;
                        intersects = raycast.intersectObject(this['mark' + type + '_col']);
                        if (intersects.length && this['mark' + type].enabled) {
                            this.markActionTimer = setTimeout(function() {
                                this.setMarkOff(type);
                                this.sendMarkState(type);
                                this.markActionTimer = null;
                            }.bind(this), 200);
                        } else {
                            this['mark' + type2 + '_col'].lookAt(raycast.ray.origin);
                            this['mark' + type2 + '_col'].updateMatrixWorld();
                            intersects = raycast.intersectObject(this['mark' + type2 + '_col']);
                            if (intersects.length === 0 || !this['mark' + type2].enabled) {
                                intersects = raycast.intersectObject(this.col);
                                if (intersects.length) {
                                    //console.log(intersects[0]);
                                    var point = intersects[0].point;
                                    //var stepBack = new BABYLON.Vector3().copy(vector).multiplyScalar(-400);
                                    //point.add(stepBack);
                                    this.markActionTimer = setTimeout(function() {
                                        this.setMark(point, type);
                                        this.sendMarkState(type);
                                        this.markActionTimer = null;
                                    }.bind(this), 200);
                                }
                            }
                        }


                    }
                }
            }

            return true;
        },

        onMessage: function(data) {
            if (data) {

                //console.log(data);
                for (var i in data) {
                    var msg = data[i];
                    if (this.hub.pCounters[msg.type] && this.hub.pCounters[msg.type] > msg.counter) {
                        console.log('%c old data!!', ' background: #FF2222');
                        console.log(msg.type, this.hub.pCounters[msg.type], msg.counter);

                    } else {
                        switch (msg.type) {

                            case 'markState1':
                                if (chat3d.manager || chat3d.visitor) {
                                    if (msg.data.enabled) {

                                        if (chat3d.visitor && !this.isSameMarkPos(msg.data.pos, '1')) {
                                            this.setCamRot(msg.data.pos);
                                        }
                                        if (!this.isSameMarkPos(msg.data.pos, '1')) {
                                            this.setMark(new BABYLON.Vector3().fromArray(msg.data.pos), '1');
                                        }
                                    } else {
                                        this.setMarkOff('1');
                                    }
                                }
                                break;

                            case 'markState2':
                                if (chat3d.manager || chat3d.visitor) {
                                    if (msg.data.enabled) {
                                        if (chat3d.manager && !this.isSameMarkPos(msg.data.pos, '2')) {
                                            this.setCamRot(msg.data.pos);
                                        }
                                        if (!this.isSameMarkPos(msg.data.pos, '2')) {
                                            this.setMark(new BABYLON.Vector3().fromArray(msg.data.pos), '2');
                                        }

                                    } else {
                                        this.setMarkOff('2');
                                    }
                                }
                                break;


                            default:
                                console.log('old or unknown', msg);
                                break;


                        }
                        this.hub.onMessage(msg);
                    }
                }
            }


        },

        /*onMouseMove: function(e) {

            var x = e.clientX;
            var y = e.clientY;
            if ($('#streetgobut').data('n')) {
                var raycast = chat3d.view.raycaster;
                raycast.ray.origin.setFromMatrixPosition(chat3d.world.camera.matrixWorld);
                var vector = new BABYLON.Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.9);

                vector.unproject(chat3d.world.camera);
                vector.sub(raycast.ray.origin).normalize();
                raycast.far = 1000;
                raycast.ray.direction = vector;
                for (var i in this.goCols) {
                    var intersects = raycast.intersectObject(this.goCols[i]);
                    if (intersects.length) {
                        $('#streetgobut').fadeIn();
                        return true;
                    }
                }
                $('#streetgobut').fadeOut();
            } else {
                $('#streetgobut').fadeOut();
            }
            return true;
        },*/



        z: 20,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', 'waternormals.jpg', 'Water_1_M_Normal.jpg', 'Water_2_M_Normal.jpg'],
        scripts: ['p2player.js', 'horMirror.js', 'Water2.js']

    },



    11: {
        skybox: {
            w: 500000,
            h: 500000,
            t: 500000,
            x: 0,
            y: 0,
            z: 0,

            map: 'mars'
        },
        obj: [{
            id: 'loc_11_col'
        }, {
            id: 'loc_11_mars'
        }, {
            id: 'loc_11_station_bridge'
        }, {
            id: 'loc_11_station_pt1'
        }, {
            id: 'loc_11_station_pt2'
        }],
        z: 20
            //z: 150
    },

    13: {
        obj: [],
        z: 20,
        cam_floor: true,
        deviceOrientationListener: function(e) {


        },

        onInit: function() {

            var video = document.querySelector("#camvideo");

            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

            if (navigator.getUserMedia) {
                navigator.mediaDevices.enumerateDevices()
                    .then(function(devices) {
                        devices.forEach(function(device) {
                            if (device.kind == 'videoinput') {
                                if (device.label.indexOf('facing back') != -1) {
                                    navigator.getUserMedia({
                                        video: {
                                            optional: [{
                                                sourceId: device.deviceId
                                            }]
                                        }
                                    }, handleVideo, videoError);

                                }

                            }
                        });
                    })
                    .
                catch(function(err) {
                    console.log(err.name + ": " + error.message);
                });

            }

            function handleVideo(stream) {
                video.src = window.URL.createObjectURL(stream);
            }

            function videoError(e) {
                // do something
            }

            //chat3d.touch_controls.off();
            chat3d.orientation_controls.on();


        },
        onClean: function() {
            var video = document.querySelector("#camvideo");
            video.pause();

            //chat3d.touch_controls.on();
            chat3d.orientation_controls.off();
        }
    },

    14: {
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'loc8'
        },

        /*disableCharOptimization: true,*/

        onInit: function() {
            //this.recorder = new hbRecord(chat3d.world.eyes);
            this.replay = [];
            /*for (let i = 0; i < 2350; i++) {
                this.replay.push(replay[i]);
            }*/

            //console.log(this.replay);

            //this.gameReplay = JSON.parse('');
            this.replay = JSON.parse('[{"time":0,"pos":[-150,172,300],"rot":[1.5707963267948966,-1.3175347633361678,1.5707963267948966,"XYZ"]},{"time":0.014855000015813857,"pos":[-150,172,300],"rot":[1.5707963267948966,-1.3175347633361678,1.5707963267948966,"XYZ"]},{"time":0.848424999974668,"pos":[-150,172,300],"rot":[1.5707963267948966,-1.3175347633361678,1.5707963267948966,"XYZ"]},{"time":0.9483499999623746,"pos":[-150,172,300],"rot":[1.5707963267948966,-1.3175347633361678,1.5707963267948966,"XYZ"]},{"time":1.065070000011474,"pos":[-150,172,300],"rot":[1.5707963267948966,-1.3175347633361678,1.5707963267948966,"XYZ"]},{"time":1.1816600000020117,"pos":[-150,172,300],"rot":[1.5707963267948966,-1.3175347633361678,1.5707963267948966,"XYZ"]},{"time":1.2817649999633431,"pos":[-150,172,300],"rot":[1.5707963267948966,-1.3175347633361678,1.5707963267948966,"XYZ"]},{"time":1.3983449999941513,"pos":[-150,172,300],"rot":[1.7556355768536318,-1.3114403939074555,1.7618793011375664,"XYZ"]},{"time":1.5150399999693036,"pos":[-150,172,300],"rot":[2.3721973362699034,-1.139771182137654,2.4199856311098875,"XYZ"]},{"time":1.6317099999869242,"pos":[-150,172,300],"rot":[2.62404927262639,-0.8221201715432638,2.746460395074684,"XYZ"]},{"time":1.7482149999705143,"pos":[-150,172,300],"rot":[2.7244393201593295,-0.5304245692267039,2.9210438486145973,"XYZ"]},{"time":1.8150749999913387,"pos":[-150,172,300],"rot":[2.778560829764472,-0.3233569849220135,3.021470144245785,"XYZ"]},{"time":1.9982050000107847,"pos":[-150,172,300],"rot":[2.7948653325800263,-0.21168694594095136,3.0658203678293185,"XYZ"]},{"time":2.098309999972116,"pos":[-150,172,300],"rot":[2.8038134371926926,-0.1448902774573467,3.0909226522954767,"XYZ"]},{"time":2.198404999973718,"pos":[-150,172,300],"rot":[2.8083127875434073,-0.1162754808452488,3.1014510363481556,"XYZ"]},{"time":2.365029999986291,"pos":[-150,172,300],"rot":[2.811032731732456,-0.12676219337769062,3.0982377154154124,"XYZ"]},{"time":2.481740000017453,"pos":[-150,172,300],"rot":[2.810956335946121,-0.12849684491363791,3.097637512921659,"XYZ"]},{"time":2.5984600000083447,"pos":[-150,172,300],"rot":[2.810956335946121,-0.12849684491363791,3.097637512921659,"XYZ"]},{"time":2.7102849999791943,"pos":[-150.0274497982659,172,299.79906157870994],"rot":[2.810956335946121,-0.12849684491363791,3.097637512921659,"XYZ"]},{"time":2.8151249999646097,"pos":[-150.13670992661508,172,298.9992539630858],"rot":[2.810956335946121,-0.12849684491363791,3.097637512921659,"XYZ"]},{"time":2.931784999964293,"pos":[-150.41500619082294,172,296.96206551313344],"rot":[2.810956335946121,-0.12849684491363791,3.097637512921659,"XYZ"]},{"time":3.0317100000102073,"pos":[-150.75294169093235,172,294.488305042035],"rot":[2.810956335946121,-0.12849684491363791,3.097637512921659,"XYZ"]},{"time":3.1485000000102445,"pos":[-151.4737128890175,172,289.2121050040042],"rot":[2.810956335946121,-0.12849684491363791,3.097637512921659,"XYZ"]},{"time":3.2652349999989383,"pos":[-152.6455129929997,172,280.63427646476646],"rot":[2.810956335946121,-0.12849684491363791,3.097637512921659,"XYZ"]},{"time":3.3816900000092573,"pos":[-154.10863356495773,172,269.92391950555776],"rot":[2.810956335946121,-0.12849684491363791,3.097637512921659,"XYZ"]},{"time":3.498380000004545,"pos":[-155.71475385798095,172,258.16677386260716],"rot":[2.810956335946121,-0.12849684491363791,3.097637512921659,"XYZ"]},{"time":3.6151149999932386,"pos":[-157.4407784298245,172,245.53190313553512],"rot":[2.810956335946121,-0.12849684491363791,3.097637512921659,"XYZ"]},{"time":3.7317649999749847,"pos":[-159.51364753553455,172,230.35805589602865],"rot":[2.810956335946121,-0.12849684491363791,3.097637512921659,"XYZ"]},{"time":3.8484450000105426,"pos":[-161.35513124469574,172,216.8779994757366],"rot":[2.810956335946121,-0.12849684491363791,3.097637512921659,"XYZ"]},{"time":3.9650849999743514,"pos":[-162.5983580735222,172,207.7771003234582],"rot":[2.809673687675929,-0.125318325211714,3.098538728009376,"XYZ"]},{"time":4.065234999987297,"pos":[-163.12291922364614,172,203.93695278079497],"rot":[2.8100299604513346,-0.07126279293656844,3.1170845490641015,"XYZ"]},{"time":4.181869999971241,"pos":[-163.41925282286155,172,201.76758750742948],"rot":[2.802686118085869,0.18258240988367513,-3.077675251337259,"XYZ"]},{"time":4.265149999991991,"pos":[-163.55017087122334,172,200.80917756496947],"rot":[2.7624796403669714,0.4878047888783965,-2.957000232777195,"XYZ"]},{"time":4.398449999978766,"pos":[-163.62259945344294,172,200.27895064678572],"rot":[2.656609816398785,0.7936108569604374,-2.7822390090868545,"XYZ"]},{"time":4.498424999997951,"pos":[-163.75810664540705,172,199.87549779647549],"rot":[2.460764080453356,1.0246470201827655,-2.5361221626037516,"XYZ"]},{"time":4.615095000015572,"pos":[-164.22627373309632,172,198.52058788973983],"rot":[1.9752617663893968,1.2072144200540968,-2.000289100573423,"XYZ"]},{"time":4.715194999997038,"pos":[-164.58631503891874,172,195.83541136958468],"rot":[1.3559675673305676,1.2305785833759337,-1.3433390864429087,"XYZ"]},{"time":4.831784999987576,"pos":[-164.53000492573145,172,192.70748041645996],"rot":[0.8516365958574575,1.1294168831984615,-0.8014557599511326,"XYZ"]},{"time":4.931884999969043,"pos":[-163.7972177531607,172,188.72999576535094],"rot":[0.6532117925893915,1.017077544336349,-0.5770301063386561,"XYZ"]},{"time":5.048469999979716,"pos":[-161.44563797558703,172,181.26853218676936],"rot":[0.5326306213312094,0.8988299719121852,-0.4322176569697819,"XYZ"]},{"time":5.165139999997336,"pos":[-157.35355871552855,172,172.05226980041874],"rot":[0.48874277475854533,0.8738223761292904,-0.3871765614029349,"XYZ"]},{"time":5.2650249999715015,"pos":[-152.51224979207913,172,162.8423142225497],"rot":[0.5312409262158532,0.9570086028453493,-0.44779186827405176,"XYZ"]},{"time":5.365129999991041,"pos":[-146.4807419426413,172,151.69585703977648],"rot":[0.6091131844299091,1.0356199299867859,-0.5404638819088893,"XYZ"]},{"time":5.481715000001714,"pos":[-140.28231456220652,172,139.89194743195497],"rot":[0.6960220727820523,1.0898312743167144,-0.6375362577193313,"XYZ"]},{"time":5.598360000003595,"pos":[-136.18281118120183,172,131.78418960173963],"rot":[0.7277228399028299,1.1014941986743958,-0.6713860335106647,"XYZ"]},{"time":5.698340000002645,"pos":[-134.44893401752404,172,128.3361617325036],"rot":[0.7277228399028299,1.1014941986743958,-0.6713860335106647,"XYZ"]},{"time":5.815424999978859,"pos":[-133.49305242862138,172,126.43527369540936],"rot":[0.7277228399028299,1.1014941986743958,-0.6713860335106647,"XYZ"]},{"time":5.915389999980107,"pos":[-133.0758980678854,172,125.60571097221154],"rot":[0.7277228399028299,1.1014941986743958,-0.6713860335106647,"XYZ"]},{"time":6.031819999974687,"pos":[-132.8221946035746,172,125.10119044804136],"rot":[0.7163664905312587,1.085658753128258,-0.65630111735141,"XYZ"]},{"time":6.132035000016913,"pos":[-132.7080144837338,172,124.87412924464644],"rot":[0.5880167846298205,0.9179156873693088,-0.4870262446939482,"XYZ"]},{"time":6.248599999991711,"pos":[-132.63725679798247,172,124.73341888895096],"rot":[0.45506526386157464,0.6185461333709681,-0.27646552334517815,"XYZ"]},{"time":6.331904999969993,"pos":[-132.59542835111912,172,124.6502378807844],"rot":[0.3872380712482962,0.31264866634901,-0.12478852869896588,"XYZ"]},{"time":6.498395000002347,"pos":[-132.57876291419035,172,124.61709661092566],"rot":[0.36763709551804163,0.08642329557584774,-0.03323203796592893,"XYZ"]},{"time":6.615089999977499,"pos":[-132.57145605551062,172,124.6025660242774],"rot":[0.36704937345872346,-0.10696863892992488,0.04102508541577018,"XYZ"]},{"time":6.715295000001788,"pos":[-132.56808582961972,172,124.59586391582307],"rot":[0.37638401832824464,-0.24242861549138855,0.09459513222655064,"XYZ"]},{"time":6.831750000012107,"pos":[-132.56599630368225,172,124.5917086366506],"rot":[0.3916469382434627,-0.3631880808750615,0.1456749088735876,"XYZ"]},{"time":6.948414999991655,"pos":[-132.56492375595147,172,124.58957574364977],"rot":[0.41271088894916763,-0.4602590896498156,0.1920898669170047,"XYZ"]},{"time":7.065109999966808,"pos":[-132.5643707198086,172,124.58847596330011],"rot":[0.46307278025199977,-0.6193525705565834,0.28210711456239995,"XYZ"]},{"time":7.181715000013355,"pos":[-132.5640942955254,172,124.58792625963466],"rot":[0.5311959708874877,-0.7698337016834929,0.3881778616178915,"XYZ"]},{"time":7.281619999965187,"pos":[-132.56396802647484,172,124.58767515810656],"rot":[0.6023396630337946,-0.8737204586713256,0.4851551580055909,"XYZ"]},{"time":7.381850000005215,"pos":[-132.56389712913352,172,124.58753417002862],"rot":[0.681022161056787,-0.9548604627794611,0.5843735043120142,"XYZ"]},{"time":7.484629999962635,"pos":[-132.56385728892536,172,124.58745494287756],"rot":[0.7596007532394583,-1.0143314710307962,0.6786370233971528,"XYZ"]},{"time":7.581854999996722,"pos":[-132.56383495257163,172,124.58741052429255],"rot":[0.8274045409669978,-1.0540254693226565,0.757503556660032,"XYZ"]},{"time":7.69851000001654,"pos":[-132.56382093055123,172,124.5873826397814],"rot":[0.8798887967059758,-1.0792800306639525,0.8174362859221522,"XYZ"]},{"time":7.8151749999960884,"pos":[-132.56381378397276,172,124.58736842793165],"rot":[0.8934004744542496,-1.085137775482394,0.8327382237364658,"XYZ"]},{"time":7.9154599999892525,"pos":[-132.56381051275113,172,124.58736192270528],"rot":[0.8934004744542496,-1.085137775482394,0.8327382237364658,"XYZ"]},{"time":8.03190000000177,"pos":[-132.5638084729026,172,124.58735786621574],"rot":[0.8958624741218577,-1.0861791021052565,0.8355213679040832,"XYZ"]},{"time":8.148500000010245,"pos":[-132.5638074277628,172,124.58735578782681],"rot":[0.8958624741218577,-1.0861791021052565,0.8355213679040832,"XYZ"]},{"time":8.248684999998659,"pos":[-132.56380695004052,172,124.58735483781732],"rot":[0.8958624741218577,-1.0861791021052565,0.8355213679040832,"XYZ"]},{"time":8.350310000008903,"pos":[-132.56380667970043,172,124.58735430021281],"rot":[0.8958624741218577,-1.0861791021052565,0.8355213679040832,"XYZ"]},{"time":8.46528499998385,"pos":[-132.563806513993,172,124.58735397068322],"rot":[0.9046716748725463,-1.0898412608026042,0.8454673107944632,"XYZ"]},{"time":8.565405000001192,"pos":[-132.56380643704085,172,124.5873538176544],"rot":[0.9554960524561272,-1.1050475390263808,0.9015049611784706,"XYZ"]},{"time":8.665254999999888,"pos":[-132.5638063938465,172,124.5873537317572],"rot":[1.0083275259394415,-1.1224060876873319,0.9603744491326457,"XYZ"]},{"time":8.7819099999615,"pos":[-132.76442650533522,172,124.63682161169605],"rot":[1.0259859601883234,-1.1276221428348898,0.979945306410171,"XYZ"]},{"time":8.898524999967776,"pos":[-134.0282188983036,172,124.94780393239118],"rot":[1.0259859601883234,-1.1276221428348898,0.979945306410171,"XYZ"]},{"time":9.015124999976251,"pos":[-136.4133404895062,172,125.53292702515074],"rot":[1.0339014954694332,-1.1298721494714121,0.988702605869203,"XYZ"]},{"time":9.115294999966864,"pos":[-139.42846261542456,172,126.26434439729276],"rot":[1.038463645701271,-1.1311448646484503,0.9937457201078262,"XYZ"]},{"time":9.23200999997789,"pos":[-146.11006274587513,172,127.87378427780502],"rot":[1.0384636457012708,-1.1311448646484503,0.9937457201078261,"XYZ"]},{"time":9.348494999983814,"pos":[-155.566066729697,172,129.82414469019358],"rot":[1.038463645701271,-1.1311448646484503,0.9937457201078262,"XYZ"]},{"time":9.448504999978468,"pos":[-164.97498047292052,172,130.804737597723],"rot":[1.0384636457012708,-1.1311448646484503,0.9937457201078261,"XYZ"]},{"time":9.54842499998631,"pos":[-175.08070892686194,172,131.24469805441893],"rot":[1.0384636457012708,-1.1311448646484503,0.9937457201078261,"XYZ"]},{"time":9.648715000017546,"pos":[-185.56536435872826,172,131.99663573943732],"rot":[1.0384636457012708,-1.1311448646484503,0.9937457201078261,"XYZ"]},{"time":9.765344999963418,"pos":[-197.97018072239803,172,133.27983063497817],"rot":[1.038463645701271,-1.1311448646484503,0.9937457201078262,"XYZ"]},{"time":9.865434999985155,"pos":[-208.74226356876602,172,133.83115114594634],"rot":[1.038463645701271,-1.1311448646484503,0.9937457201078262,"XYZ"]},{"time":9.965350000013132,"pos":[-219.38869177510247,172,133.29911320077184],"rot":[1.038463645701271,-1.1311448646484503,0.9937457201078262,"XYZ"]},{"time":10.081874999974389,"pos":[-231.6837357986304,172,131.60855994629495],"rot":[1.0384636457012708,-1.1311448646484503,0.9937457201078261,"XYZ"]},{"time":10.18171999999322,"pos":[-242.4254073556604,172,130.2024871297313],"rot":[1.038463645701271,-1.1311448646484503,0.9937457201078262,"XYZ"]},{"time":10.298520000011194,"pos":[-254.94973339562975,172,129.6366583746554],"rot":[1.0384636457012708,-1.1311448646484503,0.9937457201078261,"XYZ"]},{"time":10.41520499996841,"pos":[-267.4059523809301,172,130.21801429182503],"rot":[1.038463645701271,-1.1311448646484503,0.9937457201078262,"XYZ"]},{"time":10.51517500000773,"pos":[-278.1534066928549,172,131.34725898167565],"rot":[1.038463645701271,-1.1311448646484503,0.9937457201078262,"XYZ"]},{"time":10.61522999999579,"pos":[-288.9823349727275,172,132.5536368686372],"rot":[1.038463645701271,-1.1311448646484503,0.9937457201078262,"XYZ"]},{"time":10.715194999997038,"pos":[-299.79304350427077,172,133.04218348546044],"rot":[1.0315068366496083,-1.1291970930171535,0.9860542729913624,"XYZ"]},{"time":10.831899999990128,"pos":[-312.09173283751795,172,132.14992791141978],"rot":[1.0006080613238895,-1.1261213173879534,0.9531832723521615,"XYZ"]},{"time":10.931999999971595,"pos":[-322.36029518351086,172,130.06182840600405],"rot":[0.9315471164782764,-1.1101638420343125,0.8781031097401234,"XYZ"]},{"time":11.048559999966528,"pos":[-334.19676788443064,172,126.52347562769883],"rot":[0.875156819709422,-1.0901731367428764,0.8155042795125825,"XYZ"]},{"time":11.165080000006128,"pos":[-345.97887229234306,172,122.26073889498106],"rot":[0.8601486665220268,-1.083485514418503,0.7985490871328469,"XYZ"]},{"time":11.265444999968167,"pos":[-356.0879070081439,172,118.22598211557627],"rot":[0.8484921629719959,-1.0799846211219601,0.7858506374068176,"XYZ"]},{"time":11.381944999971893,"pos":[-367.91510866848864,172,113.48474244627522],"rot":[0.7414493071255648,-1.0346608198075522,0.6669248079076668,"XYZ"]},{"time":11.49845999997342,"pos":[-379.9313720014743,172,109.83550961843108],"rot":[0.6181137418252656,-0.9341766136204244,0.5194068908673855,"XYZ"]},{"time":11.615349999978207,"pos":[-391.70972099384755,172,108.47632847274909],"rot":[0.5505483198386254,-0.8519632020978548,0.4327679158501783,"XYZ"]},{"time":11.731779999972787,"pos":[-402.84522039864464,172,109.8333759092785],"rot":[0.5128027289596641,-0.7923518828288479,0.3812744111281142,"XYZ"]},{"time":11.848654999979772,"pos":[-413.54940986728496,172,113.40089950157618],"rot":[0.4942483185191121,-0.7579769175140192,0.35476651263407505,"XYZ"]},{"time":11.965354999992996,"pos":[-423.9722842880294,172,118.64592282059998],"rot":[0.48981676278029723,-0.7491653909527801,0.34829004723620033,"XYZ"]},{"time":12.081829999980982,"pos":[-434.24445634079774,172,125.14840202595637],"rot":[0.48981676278029734,-0.7491653909527798,0.3482900472362004,"XYZ"]},{"time":12.198600000003353,"pos":[-444.2617406338844,172,132.43879937180702],"rot":[0.48981676278029707,-0.7491653909527799,0.3482900472362003,"XYZ"]},{"time":12.298569999984466,"pos":[-452.82656681173614,172,139.22294208835118],"rot":[0.48981676278029707,-0.7491653909527799,0.3482900472362003,"XYZ"]},{"time":12.415355000004638,"pos":[-462.6200705556299,172,146.25013572216517],"rot":[0.48981676278029707,-0.7491653909527799,0.3482900472362003,"XYZ"]},{"time":12.515254999976605,"pos":[-471.3151978517209,172,151.23452942924104],"rot":[0.48981676278029707,-0.7491653909527799,0.3482900472362003,"XYZ"]},{"time":12.615285000007134,"pos":[-479.9517014172292,172,157.01679631066085],"rot":[0.48981676278029707,-0.7491653909527799,0.3482900472362003,"XYZ"]},{"time":12.732075000007171,"pos":[-489.9339818989281,172,164.30493202742346],"rot":[0.48634931525536906,-0.7505459639840658,0.3460857255268642,"XYZ"]},{"time":12.831859999976587,"pos":[-498.96692967765455,172,169.71761656859883],"rot":[0.48757537205286194,-0.7548840862549366,0.34851677711966267,"XYZ"]},{"time":12.948559999989811,"pos":[-510.0206661437023,172,175.23711891289642],"rot":[0.49466505878136363,-0.7687799225017601,0.35878769571182456,"XYZ"]},{"time":13.065360000007786,"pos":[-520.7562319588817,172,181.50790676120934],"rot":[0.5173155808454833,-0.8093547903552526,0.39069557029745805,"XYZ"]},{"time":13.181990000011865,"pos":[-531.31268229498,172,188.40024963887652],"rot":[0.5624091698299456,-0.8660279421876245,0.4476390694708203,"XYZ"]},{"time":13.298569999984466,"pos":[-541.8613187383196,172,195.46986804965834],"rot":[0.5982092172074518,-0.9075247445316272,0.4928220555735903,"XYZ"]},{"time":13.415159999975003,"pos":[-552.5642640416006,172,202.48506084104218],"rot":[0.6148609877669937,-0.9240218326664386,0.5131892349741622,"XYZ"]},{"time":13.515119999996386,"pos":[-562.0114620633196,172,207.87266730393165],"rot":[0.6099519759665087,-0.9174537819387529,0.5066160009866272,"XYZ"]},{"time":13.63182999996934,"pos":[-573.3957701122429,172,212.6570996637399],"rot":[0.5913246988116823,-0.8961775900961932,0.48296543565046207,"XYZ"]},{"time":13.731845000002068,"pos":[-583.4518382072113,172,215.28871134451924],"rot":[0.5739300695065661,-0.8745933202260643,0.46049805820276407,"XYZ"]},{"time":13.848560000013094,"pos":[-595.4624888319918,172,216.84467045631916],"rot":[0.5472185698788444,-0.8376750264346495,0.42514093534053615,"XYZ"]},{"time":13.965194999997038,"pos":[-607.8240893369408,172,217.41974109301816],"rot":[0.5113164273830793,-0.7843833423567055,0.3773528551772754,"XYZ"]},{"time":14.082004999974743,"pos":[-620.4072094672566,172,217.59604395678943],"rot":[0.46627476974690885,-0.7088548584881663,0.31660248932248103,"XYZ"]},{"time":14.198555000009947,"pos":[-633.1049308480086,172,217.87693191201086],"rot":[0.42621433193646224,-0.6202790122279327,0.25803668310468886,"XYZ"]},{"time":14.298825000005309,"pos":[-644.0198058715822,172,218.48652493604217],"rot":[0.4034289688651259,-0.5525124161446853,0.22037946040459092,"XYZ"]},{"time":14.398669999965932,"pos":[-654.905042452913,172,219.57703013248766],"rot":[0.387278515428924,-0.49475477058294787,0.19129833159405302,"XYZ"]},{"time":14.498740000010002,"pos":[-665.6601823905917,172,221.37664689253083],"rot":[0.37657556353217664,-0.45036554455420585,0.17046555836045985,"XYZ"]},{"time":14.615419999987353,"pos":[-677.4367051345629,172,224.82885393398672],"rot":[0.3674540196514598,-0.4050143084876286,0.15053011231290278,"XYZ"]},{"time":14.715404999966267,"pos":[-686.5754402796896,172,229.28110582531073],"rot":[0.3626643402817585,-0.37914352158352455,0.13953047215840897,"XYZ"]},{"time":14.831944999983534,"pos":[-695.6115354163517,172,236.22990572584152],"rot":[0.36170145189059355,-0.3727049090183341,0.1369077588706373,"XYZ"]},{"time":14.9486850000103,"pos":[-703.3134971918159,172,244.76322194308662],"rot":[0.36170145189059355,-0.3727049090183341,0.1369077588706373,"XYZ"]},{"time":15.048609999998007,"pos":[-708.5391953647917,172,253.08711160451256],"rot":[0.36170145189059355,-0.3727049090183341,0.1369077588706373,"XYZ"]},{"time":15.14874500001315,"pos":[-712.0859157046258,172,262.05424446831876],"rot":[0.36170145189059366,-0.37270490901833414,0.13690775887063736,"XYZ"]},{"time":15.26527500001248,"pos":[-714.0100745352834,172,273.01554070752235],"rot":[0.36170145189059366,-0.37270490901833414,0.13690775887063736,"XYZ"]},{"time":15.38202999997884,"pos":[-713.8624281508394,172,284.3587109030502],"rot":[0.36094809401704,-0.37783778468166757,0.13836896452805653,"XYZ"]},{"time":15.49845000001369,"pos":[-712.2221660928716,172,296.1748503769597],"rot":[0.3628381816134227,-0.39019360461074315,0.143413845665,"XYZ"]},{"time":15.615179999964312,"pos":[-709.6510779127876,172,308.0775000277835],"rot":[0.37070607388080196,-0.43685745890804145,0.1629876478505984,"XYZ"]},{"time":15.715339999995194,"pos":[-707.0479247381608,172,318.56767140847563],"rot":[0.38408969358988493,-0.5032890764738724,0.19251721525453216,"XYZ"]},{"time":15.832025000010617,"pos":[-704.0655372891924,172,330.8772240931432],"rot":[0.40989021761490757,-0.6028932788623999,0.24156312386229034,"XYZ"]},{"time":15.94858500000555,"pos":[-701.5462761411205,172,343.33199475362517],"rot":[0.4485409946271334,-0.7074894107161147,0.30314195602098837,"XYZ"]},{"time":16.048609999998007,"pos":[-700.0166800536475,172,354.1120106828104],"rot":[0.4926792624304827,-0.7998844581037539,0.36755966171701054,"XYZ"]},{"time":16.16529500001343,"pos":[-699.1684610083464,172,366.7296123865947],"rot":[0.5456811843146643,-0.882767968537007,0.4385785565706825,"XYZ"]},{"time":16.28194999997504,"pos":[-699.3624709932494,172,379.28950148860866],"rot":[0.5910720700582043,-0.937969723562482,0.49602718297199216,"XYZ"]},{"time":16.382035000016913,"pos":[-700.4131924540959,172,390.0090846180624],"rot":[0.6170922402472033,-0.9648507708131161,0.5279799654270607,"XYZ"]},{"time":16.49862500000745,"pos":[-703.049033434212,172,402.06486344220076],"rot":[0.6328806233109305,-0.9828189514606593,0.5479944173263919,"XYZ"]},{"time":16.61553000001004,"pos":[-707.061023979553,172,413.6928508623337],"rot":[0.7480380967795622,-1.0655910261564379,0.6820249187922655,"XYZ"]},{"time":16.71528499998385,"pos":[-711.1311221970437,172,423.7196158502535],"rot":[0.9406132591891181,-1.1473730680016645,0.8960253045033508,"XYZ"]},{"time":16.832070000004023,"pos":[-716.4424550523631,172,435.02328541604095],"rot":[1.2561166616670683,-1.213160476684714,1.2363670931446378,"XYZ"]},{"time":16.931939999980386,"pos":[-721.7560800633909,172,444.4039556448097],"rot":[1.5459186696586338,-1.231340355973914,1.544413816723863,"XYZ"]},{"time":17.032039999961853,"pos":[-727.8253207429459,172,453.2187498234884],"rot":[1.780601956898904,-1.2235240667000709,1.7934978420026626,"XYZ"]},{"time":17.14865499996813,"pos":[-736.0156437908422,172,462.20232897929975],"rot":[1.8993093343096865,-1.211433597088281,1.9199980351920178,"XYZ"]},{"time":17.26512499997625,"pos":[-745.4139397794169,172,469.24270178376605],"rot":[1.9079338336427463,-1.2103116586346223,1.9292129855207192,"XYZ"]},{"time":17.365469999960624,"pos":[-754.189277283155,172,473.3575535421523],"rot":[1.8933401357629225,-1.2121896490791149,1.9136224196012985,"XYZ"]},{"time":17.481919999991078,"pos":[-765.1675593293643,172,476.3194149318361],"rot":[1.891978630676518,-1.212359772104345,1.9121684673155894,"XYZ"]},{"time":17.582159999990836,"pos":[-775.2078978304079,172,477.7579717396352],"rot":[1.891978630676518,-1.212359772104345,1.9121684673155894,"XYZ"]},{"time":17.682009999989532,"pos":[-785.6389394913414,172,478.4425785179298],"rot":[1.891978630676518,-1.212359772104345,1.9121684673155894,"XYZ"]},{"time":17.798669999989215,"pos":[-798.0596394982601,172,478.5468596479893],"rot":[1.8919786306765196,-1.212359772104345,1.9121684673155903,"XYZ"]},{"time":17.89889499999117,"pos":[-808.872727402421,172,478.2115405611445],"rot":[1.891978630676518,-1.212359772104345,1.9121684673155894,"XYZ"]},{"time":18.01530999998795,"pos":[-821.5519627034918,172,477.47779426647264],"rot":[1.891978630676518,-1.212359772104345,1.9121684673155894,"XYZ"]},{"time":18.116035000013653,"pos":[-832.4801033387355,172,476.64087704743804],"rot":[1.8919786306765196,-1.212359772104345,1.9121684673155903,"XYZ"]},{"time":18.231879999977536,"pos":[-845.219846310442,172,475.50388054902555],"rot":[1.8818275421835813,-1.2136012273781052,1.9013309907499747,"XYZ"]},{"time":18.348454999970272,"pos":[-857.9829927335451,172,474.27035462611394],"rot":[1.8406318372072668,-1.2200104837226207,1.857214569909329,"XYZ"]},{"time":18.465339999995194,"pos":[-870.7046841568775,172,472.9371546740295],"rot":[1.651565871172185,-1.2421817610981538,1.6561106221113517,"XYZ"]},{"time":18.565300000016578,"pos":[-881.5570454220993,172,471.25567577461106],"rot":[1.2813611388157646,-1.2465382618128193,1.2663907534673242,"XYZ"]},{"time":18.682059999962803,"pos":[-893.8658334558812,172,468.4341052013754],"rot":[0.9362646128158117,-1.1895431473326534,0.9003272105322999,"XYZ"]},{"time":18.78214999998454,"pos":[-904.2201670062035,172,465.26767075743294],"rot":[0.7725978645146463,-1.1270675144086613,0.7218389706105116,"XYZ"]},{"time":18.898660000006203,"pos":[-916.2639270552422,172,461.0065911226399],"rot":[0.665747645703013,-1.064250510212753,0.601767906006661,"XYZ"]},{"time":19.01565000001574,"pos":[-928.184812983161,172,456.6779185416986],"rot":[0.611663517186765,-1.0217871182590077,0.5391846361662972,"XYZ"]},{"time":19.132044999976642,"pos":[-940.2696192052993,172,452.4290245489174],"rot":[0.59034877332952,-1.002351147963193,0.5140488242346525,"XYZ"]},{"time":19.232039999973495,"pos":[-950.7372159167248,172,448.8936893872303],"rot":[0.589239874376693,-1.0012915162201923,0.5127325515358306,"XYZ"]},{"time":19.34878000000026,"pos":[-962.7481589928985,172,445.1644177131364],"rot":[0.5825901601203991,-0.9978184409283837,0.5056394410776244,"XYZ"]},{"time":19.465289999963716,"pos":[-974.5742922318215,172,442.57277183334577],"rot":[0.5322440310250485,-0.9424896181310283,0.44464119900110427,"XYZ"]},{"time":19.56539999996312,"pos":[-984.7381116740196,172,441.04398428616105],"rot":[0.4479397936314359,-0.8111178009002242,0.3352506569416812,"XYZ"]},{"time":19.682005000009667,"pos":[-996.9295465480258,172,439.85280557220227],"rot":[0.3775537945368521,-0.6345163259799148,0.23089470288930172,"XYZ"]},{"time":19.782109999971,"pos":[-1007.6151169664131,172,439.59184363438584],"rot":[0.3452073996530955,-0.5004513756517396,0.17086465413312626,"XYZ"]},{"time":19.898809999984223,"pos":[-1020.0160202684813,172,440.49697784211634],"rot":[0.3239464820412902,-0.3689196267444761,0.12049656636344565,"XYZ"]},{"time":20.015335000003688,"pos":[-1032.0791137221972,172,442.7666382598898],"rot":[0.31276830756114016,-0.2657369251759206,0.0847235618075442,"XYZ"]},{"time":20.115419999987353,"pos":[-1042.229991648738,172,445.78180279802666],"rot":[0.3077031936102359,-0.1989959572680175,0.06274128452997133,"XYZ"]},{"time":20.215339999995194,"pos":[-1052.1416593221468,172,449.6880719545997],"rot":[0.30511049864986567,-0.15291006249615474,0.04793401579350962,"XYZ"]},{"time":20.3156650000019,"pos":[-1061.7638298372178,172,454.33227787500624],"rot":[0.3039939165818726,-0.12776566131098757,0.03995212654535444,"XYZ"]},{"time":20.432044999965,"pos":[-1072.6211948179998,172,460.5323772657972],"rot":[0.3037886680432532,-0.12256405619317558,0.03830801738895418,"XYZ"]},{"time":20.54863999999361,"pos":[-1082.7600127476205,172,467.76104977003087],"rot":[0.30378866804325333,-0.12256405619317562,0.03830801738895421,"XYZ"]},{"time":20.64869499998167,"pos":[-1090.3854806370268,172,474.91218290945477],"rot":[0.30378866804325333,-0.12256405619317562,0.03830801738895421,"XYZ"]},{"time":20.748679999960586,"pos":[-1096.5530110147067,172,482.91476097350204],"rot":[0.30312407545810793,-0.1039007124728071,0.03242644905572816,"XYZ"]},{"time":20.86533000000054,"pos":[-1101.9057595211389,172,493.18529113777515],"rot":[0.3014385164760725,0.0020776506262408147,-0.0006459682816849699,"XYZ"]},{"time":20.965714999998454,"pos":[-1105.0980263866961,172,502.7301023089056],"rot":[0.3042687918701898,0.10825041838319514,-0.03391340987751263,"XYZ"]},{"time":21.082110000017565,"pos":[-1107.545204661848,172,514.3974494436906],"rot":[0.30954597197851813,0.20452594104263555,-0.06486668395642532,"XYZ"]},{"time":21.198679999972228,"pos":[-1109.760480862017,172,526.565946246092],"rot":[0.3148901479118158,0.2725835625962571,-0.08746888484329206,"XYZ"]},{"time":21.298684999987017,"pos":[-1112.1008424403599,172,537.1629473501789],"rot":[0.31842838275096885,0.3086800058195438,-0.09981410863143593,"XYZ"]},{"time":21.415600000007544,"pos":[-1115.5944273060572,172,549.2447488609554],"rot":[0.3201191263744778,0.3242964125972526,-0.10524636866432024,"XYZ"]},{"time":21.53194000001531,"pos":[-1119.756643891114,172,561.1825342178372],"rot":[0.32035476580199,0.32640261783253677,-0.10598357082471688,"XYZ"]},{"time":21.632119999965653,"pos":[-1123.6930058283656,172,571.3953684119775],"rot":[0.322865513860701,0.34789972728296226,-0.1135730276401951,"XYZ"]},{"time":21.732970000011846,"pos":[-1127.764054934872,172,581.6356454233127],"rot":[0.3319580035488744,0.4250290122267264,-0.14119602935482514,"XYZ"]},{"time":21.849244999990333,"pos":[-1132.2101877801376,172,593.5317325792508],"rot":[0.35363671489053783,0.5407619630832565,-0.18779787051595215,"XYZ"]},{"time":21.965239999990445,"pos":[-1136.0443491382862,172,605.6774401230455],"rot":[0.376775873047699,0.6318163180366918,-0.22957258626123198,"XYZ"]},{"time":22.065230000007432,"pos":[-1138.6944792957845,172,616.2690640720035],"rot":[0.3943101279240589,0.6875089906280935,-0.25817126861949635,"XYZ"]},{"time":22.18209499999648,"pos":[-1141.0198930312647,172,628.7183636931065],"rot":[0.40843231830169274,0.7264547988221601,-0.2799084185694939,"XYZ"]},{"time":22.282059999997728,"pos":[-1142.4521244449252,172,639.5128908954325],"rot":[0.41369221835188796,0.7398531668015941,-0.2877680072541463,"XYZ"]},{"time":22.398824999982025,"pos":[-1143.5736780488116,172,652.1550164279374],"rot":[0.4382127014712669,0.7958157255373767,-0.32305495311388105,"XYZ"]},{"time":22.498670000000857,"pos":[-1143.9603667494548,172,663.3995878466234],"rot":[0.5104818278051022,0.9176916998711993,-0.41847597695123684,"XYZ"]},{"time":22.615660000010394,"pos":[-1143.3618415801095,172,675.6213448105657],"rot":[0.6678972968071246,1.0772629562455807,-0.607160747052397,"XYZ"]},{"time":22.715389999968465,"pos":[-1141.6815015883103,172,686.1110892301305],"rot":[0.8897563177582817,1.1854708244746217,-0.8522467420701122,"XYZ"]},{"time":22.81533999997191,"pos":[-1138.8201749110972,172,696.205513533887],"rot":[1.191087961052237,1.2509638653578414,-1.1728338403960252,"XYZ"]},{"time":22.931879999989178,"pos":[-1132.779546261753,172,707.962898961246],"rot":[1.567949412745124,1.274464037614944,-1.567819672856015,"XYZ"]},{"time":23.032305000000633,"pos":[-1125.768662912265,172,715.4780043817503],"rot":[1.8267694184396213,1.2641656943046062,-1.8387152128591497,"XYZ"]},{"time":23.1488450000179,"pos":[-1119.8402317732896,172,718.3861545769647],"rot":[2.017158381515709,1.241125935173814,-2.039084836660857,"XYZ"]},{"time":23.24875999998767,"pos":[-1116.1433216453504,172,717.7355524489587],"rot":[2.102005855261056,1.225276593545916,-2.1289986605223667,"XYZ"]},{"time":23.365324999962468,"pos":[-1112.6021213407278,172,717.3109619226286],"rot":[2.159719604758798,1.2119739930672107,-2.1904824754507715,"XYZ"]},{"time":23.481930000009015,"pos":[-1108.942139035347,172,718.2054853042247],"rot":[2.221579669658946,1.1949813505727063,-2.2567584185004623,"XYZ"]},{"time":23.582070000004023,"pos":[-1105.233275685395,172,719.6941854910856],"rot":[2.2601502571192795,1.182703833985086,-2.2983227060593494,"XYZ"]},{"time":23.698764999979176,"pos":[-1099.0741930577735,172,722.5909279656968],"rot":[2.273876626178237,1.177981618429669,-2.313166171334954,"XYZ"]},{"time":23.798810000007506,"pos":[-1091.8000214247643,172,726.2835218314766],"rot":[2.2840965053215503,1.1743364334672652,-2.324236962560435,"XYZ"]},{"time":23.89882000000216,"pos":[-1083.3722040522389,172,730.7192724531693],"rot":[2.2951721303367263,1.1702560935584845,-2.3362541635280563,"XYZ"]},{"time":24.015589999966323,"pos":[-1072.8583688791805,172,736.2792510805881],"rot":[2.302993339940934,1.169959124506201,-2.344185521797842,"XYZ"]},{"time":24.11582000000635,"pos":[-1063.2758559888227,172,740.8396571646715],"rot":[2.3029933399409312,1.1699591245062018,-2.344185521797839,"XYZ"]},{"time":24.232229999965057,"pos":[-1051.7223862290753,172,745.0016252336774],"rot":[2.302993339940934,1.169959124506201,-2.344185521797842,"XYZ"]},{"time":24.332025000010617,"pos":[-1041.7570141078613,172,746.7259352737797],"rot":[2.3029933399409312,1.1699591245062018,-2.344185521797839,"XYZ"]},{"time":24.44873499998357,"pos":[-1030.7177190004604,172,746.1428861371621],"rot":[2.3029933399409312,1.1699591245062018,-2.344185521797839,"XYZ"]},{"time":24.565379999985453,"pos":[-1020.4758916135875,172,742.9155105488688],"rot":[2.302993339940934,1.169959124506201,-2.344185521797842,"XYZ"]},{"time":24.665434999973513,"pos":[-1012.4694599923747,172,738.2482316755077],"rot":[2.3029933399409317,1.1699591245062022,-2.3441855217978396,"XYZ"]},{"time":24.782130000006873,"pos":[-1003.9400292814495,172,731.0874790161013],"rot":[2.3029933399409317,1.1699591245062022,-2.3441855217978396,"XYZ"]},{"time":24.898730000015348,"pos":[-995.9191686989856,172,722.4717324105146],"rot":[2.302993339940934,1.1699591245062013,-2.344185521797842,"XYZ"]},{"time":25.015435000008438,"pos":[-988.3572851513642,172,712.912508654805],"rot":[2.302993339940934,1.1699591245062013,-2.344185521797842,"XYZ"]},{"time":25.11565499997232,"pos":[-982.1433192188689,172,704.1921741560994],"rot":[2.302993339940934,1.1699591245062013,-2.344185521797842,"XYZ"]},{"time":25.232114999962505,"pos":[-975.1503104715116,172,693.6354275479645],"rot":[2.302993339940934,1.169959124506201,-2.344185521797842,"XYZ"]},{"time":25.348859999969136,"pos":[-968.2850059255416,172,682.932282608238],"rot":[2.3029933399409312,1.1699591245062018,-2.344185521797839,"XYZ"]},{"time":25.465339999995194,"pos":[-960.9506744876994,172,672.5615657124146],"rot":[2.302993339940934,1.169959124506201,-2.344185521797842,"XYZ"]},{"time":25.565334999992047,"pos":[-953.9208380679255,172,664.4963863263392],"rot":[2.3005073588570553,1.17293560742556,-2.3410578078911133,"XYZ"]},{"time":25.66575499996543,"pos":[-946.0697190103612,172,657.6878481948979],"rot":[2.2928271351468545,1.180273864645711,-2.331803888891866,"XYZ"]},{"time":25.78202499996405,"pos":[-935.9617417689107,172,651.1485525035306],"rot":[2.258611095583129,1.1920579273063536,-2.294892110869837,"XYZ"]},{"time":25.898715000017546,"pos":[-925.0441452213819,172,645.6920045613001],"rot":[2.1966215927014883,1.2105728190379752,-2.228422533331371,"XYZ"]},{"time":26.015354999981355,"pos":[-913.5521317013686,172,641.0962252088348],"rot":[2.122587240049281,1.2215473378891533,-2.150763659492097,"XYZ"]},{"time":26.11622999998508,"pos":[-903.2893495051079,172,637.7357536648735],"rot":[1.9013303948581408,1.243861121280269,-1.9183980722313392,"XYZ"]},{"time":26.23233500000788,"pos":[-891.1322880297156,172,634.7291850867583],"rot":[1.467085604134394,1.2454262404612093,-1.4613873867291411,"XYZ"]},{"time":26.348724999988917,"pos":[-878.8072432047574,172,632.9371022393916],"rot":[1.131708089983515,1.2113986867592286,-1.1057714188492116,"XYZ"]},{"time":26.448715000005905,"pos":[-868.1344951193599,172,632.4382193176297],"rot":[0.9529297369452415,1.1695628058432717,-0.9133595405538858,"XYZ"]},{"time":26.5654649999924,"pos":[-855.7338940577855,172,633.0214606301636],"rot":[0.8341630005975547,1.1265559115338994,-0.783189460456167,"XYZ"]},{"time":26.68206999998074,"pos":[-843.3732433250508,172,634.7100581131339],"rot":[0.7772208781014485,1.0996165459521479,-0.719723471177242,"XYZ"]},{"time":26.78208999999333,"pos":[-832.8192793069861,172,636.8746492054635],"rot":[0.7640644991647422,1.0926536432278582,-0.7049319881575841,"XYZ"]},{"time":26.89877999998862,"pos":[-820.5464645062488,172,640.0637805240344],"rot":[0.7591199432401537,1.085290046420127,-0.6981529836657246,"XYZ"]},{"time":27.015329999965616,"pos":[-808.9154749026856,172,644.3576241589899],"rot":[0.7394515124235664,1.0697761020812822,-0.6747303947412685,"XYZ"]},{"time":27.115494999976363,"pos":[-799.7494745143958,172,649.34427263096],"rot":[0.7253979580222518,1.0540875736262965,-0.6567495313715181,"XYZ"]},{"time":27.232099999964703,"pos":[-789.5044896916204,172,656.0829865171163],"rot":[0.7180953247363645,1.04702982294974,-0.64769666779713,"XYZ"]},{"time":27.332170000008773,"pos":[-780.3709993474644,172,661.8352965006699],"rot":[0.7180953247363645,1.04702982294974,-0.64769666779713,"XYZ"]},{"time":27.448739999963436,"pos":[-769.4614149524687,172,668.2878923865806],"rot":[0.7180953247363645,1.04702982294974,-0.64769666779713,"XYZ"]},{"time":27.565744999970775,"pos":[-758.9779270165363,172,675.4027862628449],"rot":[0.7180953247363645,1.04702982294974,-0.64769666779713,"XYZ"]},{"time":27.682459999981802,"pos":[-749.7207409591799,172,683.5359135348834],"rot":[0.7262827599682752,1.0523647373129676,-0.657137057589628,"XYZ"]},{"time":27.798744999978226,"pos":[-741.7751503973195,172,692.7639856406288],"rot":[0.76495246507247,1.079273324567148,-0.7023316583926648,"XYZ"]},{"time":27.915455000009388,"pos":[-734.5108704280135,172,702.7772057485347],"rot":[0.8444666065255444,1.1232813270453246,-0.7927705812456516,"XYZ"]},{"time":28.032160000002477,"pos":[-725.9567424050492,172,714.2308606713018],"rot":[0.9041633980422366,1.1483999635329312,-0.8590308266547476,"XYZ"]},{"time":28.132485000009183,"pos":[-717.2532711258887,172,724.6600617625076],"rot":[0.9239179598037436,1.1551829205369692,-0.8806558347877674,"XYZ"]},{"time":28.2487100000144,"pos":[-708.380516315114,172,733.6331874785024],"rot":[0.8495264880510821,1.1273876261682392,-0.7988480917359397,"XYZ"]},{"time":28.36538999999175,"pos":[-702.860369747968,172,738.5423035132],"rot":[0.607618055390739,0.9711804683681913,-0.5211366217852395,"XYZ"]},{"time":28.46545000001788,"pos":[-700.3955569469161,172,739.8651962708387],"rot":[0.4659350997553227,0.7711071124846832,-0.33708444459240733,"XYZ"]},{"time":28.58218999998644,"pos":[-698.56241175036,172,740.6195415616008],"rot":[0.38748251788852756,0.5497614629954758,-0.21008714570644219,"XYZ"]},{"time":28.698789999994915,"pos":[-697.5467889820509,172,740.8730596643042],"rot":[0.35011331216253405,0.35023679901495935,-0.12464320762785805,"XYZ"]},{"time":28.8154649999924,"pos":[-695.9539353200557,172,740.602685505036],"rot":[0.33341889401447317,0.17667587433554022,-0.0607987069987866,"XYZ"]},{"time":28.93230499996571,"pos":[-692.6539896080602,172,740.0791639426197],"rot":[0.3281954196435481,0.03094512244227352,-0.010535046387527041,"XYZ"]},{"time":29.032354999973904,"pos":[-689.184287412712,172,740.075976081828],"rot":[0.3289145938180544,-0.07191953743652332,0.024520970405226668,"XYZ"]},{"time":29.148875000013504,"pos":[-684.9130013325058,172,741.009012248092],"rot":[0.33275851511103266,-0.1656330514190804,0.056921488746882326,"XYZ"]},{"time":29.265420000010636,"pos":[-677.7967215087665,172,742.7258217134689],"rot":[0.33735175810449797,-0.2312183276132126,0.08020898249084805,"XYZ"]},{"time":29.365690000005998,"pos":[-669.5897300886722,172,744.7448950482654],"rot":[0.34037399818361214,-0.2650592307780322,0.09251260431223164,"XYZ"]},{"time":29.48216000001412,"pos":[-658.647216341739,172,747.6014068565897],"rot":[0.3417046171417403,-0.27851240082882434,0.0974691168138923,"XYZ"]},{"time":29.582379999978002,"pos":[-648.6107504101841,172,750.3549021172171],"rot":[0.3417046171417403,-0.27851240082882434,0.0974691168138923,"XYZ"]},{"time":29.69894500001101,"pos":[-636.6229393871745,172,753.7524063739819],"rot":[0.3417046171417403,-0.27851240082882434,0.0974691168138923,"XYZ"]},{"time":29.815434999996796,"pos":[-624.1015090770858,172,757.3843677069159],"rot":[0.3417046171417403,-0.27851240082882434,0.0974691168138923,"XYZ"]},{"time":29.93213500001002,"pos":[-609.2512060748222,172,761.7512075754003],"rot":[0.3417046171417403,-0.27851240082882434,0.0974691168138923,"XYZ"]},{"time":30.048904999974184,"pos":[-596.2240371427331,172,765.6113108040645],"rot":[0.3417046171417403,-0.27851240082882434,0.0974691168138923,"XYZ"]},{"time":30.14886999997543,"pos":[-588.3106142105797,172,767.9647958931084],"rot":[0.3417046171417403,-0.27851240082882434,0.0974691168138923,"XYZ"]},{"time":30.24875999998767,"pos":[-584.1031742812144,172,769.2167172166731],"rot":[0.3415163836387537,-0.2766544115563834,0.09678221468058627,"XYZ"]},{"time":30.34948999999324,"pos":[-582.0091286632953,172,769.8397992821574],"rot":[0.3291510482749759,-0.15118721643639366,0.051400189326375766,"XYZ"]},{"time":30.448975000006612,"pos":[-580.9059968037947,172,770.1680355305166],"rot":[0.328362357982223,0.13514957191258486,-0.04587268684172624,"XYZ"]},{"time":30.565609999990556,"pos":[-580.2413380663196,172,770.3658043543877],"rot":[0.36726392303708855,0.47353454993839705,-0.17367754724973017,"XYZ"]},{"time":30.665515000000596,"pos":[-579.8772668213361,172,770.5425467102602],"rot":[0.4466280126211208,0.7379780703544188,-0.31169983098119863,"XYZ"]},{"time":30.76545000000624,"pos":[-579.0680143680344,172,771.1449962860617],"rot":[0.601507627448963,0.965905827567785,-0.5139597711262367,"XYZ"]},{"time":30.882144999981392,"pos":[-577.0865311861073,172,772.207069489636],"rot":[0.9470085675002169,1.1565521515280073,-0.9045680561375253,"XYZ"]},{"time":30.998604999971576,"pos":[-574.0899450048688,172,773.1646650515798],"rot":[1.4652093559154094,1.231166845529964,-1.4588644340538457,"XYZ"]},{"time":31.09892999997828,"pos":[-569.0380277293522,172,774.0259305142026],"rot":[1.8532419535193891,1.215177796924581,-1.871012989955118,"XYZ"]},{"time":31.215354999992996,"pos":[-560.3160157295551,172,774.5558639166826],"rot":[1.9883817074439625,1.1898031555388915,-2.0166493078222048,"XYZ"]},{"time":31.31604000000516,"pos":[-551.1594463888974,172,774.4353011498984],"rot":[1.9493805015763983,1.1921237144790744,-1.975289949500454,"XYZ"]},{"time":31.432299999985844,"pos":[-539.482993206266,172,773.787613043087],"rot":[1.9303370504591166,1.1948409114380927,-1.9548340759829008,"XYZ"]},{"time":31.548810000007506,"pos":[-527.190918740187,172,772.7625104029539],"rot":[1.9303370504591166,1.1948409114380927,-1.9548340759829008,"XYZ"]},{"time":31.665540000016335,"pos":[-514.6924210946543,172,771.4911056785332],"rot":[1.9303370504591166,1.1948409114380927,-1.9548340759829008,"XYZ"]},{"time":31.765795000013895,"pos":[-503.8102950090664,172,770.2583434092611],"rot":[1.9303370504591166,1.1948409114380927,-1.9548340759829008,"XYZ"]},{"time":31.882425000017975,"pos":[-491.0813849284821,172,768.7157169164813],"rot":[1.930337050459116,1.194840911438092,-1.9548340759829002,"XYZ"]},{"time":31.998989999992773,"pos":[-478.4415870286789,172,767.1105572344753],"rot":[1.9303370504591166,1.1948409114380927,-1.9548340759829008,"XYZ"]},{"time":32.11541999998735,"pos":[-465.771629589104,172,765.452286097197],"rot":[1.9303370504591166,1.1948409114380927,-1.9548340759829008,"XYZ"]},{"time":32.23204999999143,"pos":[-453.0109811036204,172,763.7486266001968],"rot":[1.930337050459116,1.194840911438092,-1.9548340759829002,"XYZ"]},{"time":32.34904000000097,"pos":[-440.34449412774563,172,762.3850430700469],"rot":[1.9303370504591166,1.1948409114380927,-1.9548340759829008,"XYZ"]},{"time":32.449099999968894,"pos":[-429.5502088564811,172,762.2255994322123],"rot":[1.930337050459116,1.194840911438092,-1.9548340759829002,"XYZ"]},{"time":32.56547500001034,"pos":[-416.9378819291771,172,762.7947367205034],"rot":[1.930337050459116,1.194840911438092,-1.9548340759829002,"XYZ"]},{"time":32.68252500001108,"pos":[-404.27326867286314,172,762.8946294176186],"rot":[1.930337050459116,1.194840911438092,-1.9548340759829002,"XYZ"]},{"time":32.79889999999432,"pos":[-391.5936810907928,172,762.3857957672446],"rot":[1.930337050459116,1.194840911438092,-1.9548340759829002,"XYZ"]},{"time":32.89885499997763,"pos":[-380.6709515894778,172,761.6139770129564],"rot":[1.9303370504591166,1.1948409114380927,-1.9548340759829008,"XYZ"]},{"time":33.01569999998901,"pos":[-367.9639344835493,172,760.4502031695625],"rot":[1.930337050459116,1.194840911438092,-1.9548340759829002,"XYZ"]},{"time":33.11574500001734,"pos":[-357.0483731088967,172,759.2909131039136],"rot":[1.9303370504591166,1.1948409114380927,-1.9548340759829008,"XYZ"]},{"time":33.23209000000497,"pos":[-344.3471932113784,172,757.8146354864538],"rot":[1.930337050459116,1.1948409114380922,-1.9548340759829002,"XYZ"]},{"time":33.33220999996411,"pos":[-333.4322955384933,172,756.4694823904733],"rot":[1.930337050459116,1.1948409114380922,-1.9548340759829002,"XYZ"]},{"time":33.432124999992084,"pos":[-322.5004348726827,172,755.0728054520918],"rot":[1.930337050459116,1.1948409114380922,-1.9548340759829002,"XYZ"]},{"time":33.53233000001637,"pos":[-311.58050088989825,172,753.6425293574622],"rot":[1.930337050459116,1.1948409114380922,-1.9548340759829002,"XYZ"]},{"time":33.64894499996444,"pos":[-298.8970976261277,172,751.9504598764554],"rot":[1.930337050459116,1.1948409114380922,-1.9548340759829002,"XYZ"]},{"time":33.74874999996973,"pos":[-287.9791195643798,172,750.5205072711158],"rot":[1.930337050459116,1.1948409114380922,-1.9548340759829002,"XYZ"]},{"time":33.86551500001224,"pos":[-275.3192867061968,172,749.6179427994564],"rot":[1.930337050459116,1.1948409114380922,-1.9548340759829002,"XYZ"]},{"time":33.98222499998519,"pos":[-262.9965488979888,172,750.3443302180323],"rot":[1.930337050459116,1.1948409114380922,-1.9548340759829002,"XYZ"]},{"time":34.08214000001317,"pos":[-252.8398879204228,172,752.4814566808252],"rot":[1.9500189787578874,1.1918196984133542,-1.976006379120979,"XYZ"]},{"time":34.19904999999562,"pos":[-241.48193927217045,172,756.4683410641092],"rot":[2.0333464364800395,1.1788078036575085,-2.06558370758401,"XYZ"]},{"time":34.298804999969434,"pos":[-231.7899054194081,172,760.7954207681779],"rot":[2.0898579914915763,1.1660946361772258,-2.1268916114024448,"XYZ"]},{"time":34.41543499997351,"pos":[-220.63841707552493,172,766.4257307496671],"rot":[2.1271800263091754,1.1626858602991357,-2.166309740339101,"XYZ"]},{"time":34.5321399999666,"pos":[-209.48202606224936,172,772.4713861211906],"rot":[2.198187859868307,1.1481021583566058,-2.2425465125428246,"XYZ"]},{"time":34.649059999966994,"pos":[-198.33746154812138,172,778.6069903250947],"rot":[2.2893540228896985,1.1188181222862186,-2.3420668567787644,"XYZ"]},{"time":34.74888999998802,"pos":[-188.63862587795032,172,783.8211181288224],"rot":[2.320910904878045,1.1062063173959598,-2.3768974319391556,"XYZ"]},{"time":34.86574500001734,"pos":[-177.19715271692073,172,789.3952354542306],"rot":[2.323007125937226,1.1052241124268019,-2.3792427612598814,"XYZ"]},{"time":34.98209499998484,"pos":[-165.42702812741405,172,793.775855464976],"rot":[2.323007125937226,1.1052241124268019,-2.3792427612598814,"XYZ"]},{"time":35.08227000001352,"pos":[-155.23526688238994,172,795.9976567283823],"rot":[2.323007125937226,1.1052241124268019,-2.3792427612598814,"XYZ"]},{"time":35.19898499996634,"pos":[-143.02253221487734,172,796.6057345860295],"rot":[2.3307352443207368,1.1041339488462691,-2.3872466786272213,"XYZ"]},{"time":35.29928999999538,"pos":[-132.884542196773,172,795.8733445735165],"rot":[2.4101126478609918,1.0669312800238246,-2.4754238887400284,"XYZ"]},{"time":35.41571999998996,"pos":[-121.04343173348092,172,793.7145071358849],"rot":[2.537072446226186,0.9745173872273971,-2.6223295549758503,"XYZ"]},{"time":35.515704999968875,"pos":[-110.98504449607265,172,790.7460398048729],"rot":[2.5999414158480465,0.9065135460016558,-2.6991766059787095,"XYZ"]},{"time":35.63219500001287,"pos":[-99.62464094382702,172,786.1286294607331],"rot":[2.640288743485768,0.848150977015549,-2.751614149676957,"XYZ"]},{"time":35.732380000001285,"pos":[-90.14072550344729,172,781.2815559052963],"rot":[2.658099191604507,0.8179764333993413,-2.775679203841913,"XYZ"]},{"time":35.848935000016354,"pos":[-79.43441338590154,172,774.8399535523885],"rot":[2.6641238504390463,0.8070279885333705,-2.783977368822608,"XYZ"]},{"time":35.94902000000002,"pos":[-70.4288602579993,172,768.826012209107],"rot":[2.6650564373963674,0.8012347306931557,-2.7865491665225104,"XYZ"]},{"time":36.04883499996504,"pos":[-61.27450972663558,172,762.9451486770812],"rot":[2.6724154977222354,0.7870996179758442,-2.796866072930239,"XYZ"]},{"time":36.16563000000315,"pos":[-50.19783954446716,172,757.0499632171542],"rot":[2.7123243701558093,0.6968460890511405,-2.855855872133731,"XYZ"]},{"time":36.26579999999376,"pos":[-40.28367742761359,172,752.862151266354],"rot":[2.7557832619988885,0.5582676647989014,-2.92967065695009,"XYZ"]},{"time":36.38227000000188,"pos":[-28.427519823151357,172,748.5283342832212],"rot":[2.7874611246404317,0.4016711158933131,-2.9980431695546756,"XYZ"]},{"time":36.49877499998547,"pos":[-16.13416520845565,172,743.8544360477181],"rot":[2.8037844369186002,0.2726712211165008,-3.04727385948337,"XYZ"]},{"time":36.59891499998048,"pos":[-6.445967216428267,172,739.4474714106357],"rot":[2.811014191275052,0.1829088908356348,-3.079253856893023,"XYZ"]},{"time":36.69886999996379,"pos":[2.5205651836631873,172,734.0082105804997],"rot":[2.8145474864666724,0.113598894152933,-3.1031586409164067,"XYZ"]},{"time":36.81550500000594,"pos":[10.41271745931682,172,726.3523237857332],"rot":[2.81613917217089,0.05934360756085995,-3.121581410512419,"XYZ"]},{"time":36.932099999976344,"pos":[15.020640899873412,172,717.5874390784325],"rot":[2.817957811188482,0.03373972837201656,-3.130278023633172,"XYZ"]},{"time":37.03207499999553,"pos":[16.52639050598081,172,709.5308390913563],"rot":[2.817728024117614,0.0500712145712598,-3.1247931527611814,"XYZ"]},{"time":37.132274999981746,"pos":[16.014631267951803,172,701.1469187514012],"rot":[2.8155973059097326,0.12296366985543021,-3.1001524003221275,"XYZ"]},{"time":37.24884000001475,"pos":[13.429793447909871,172,690.8276607576794],"rot":[2.8082202069112885,0.2402406878605471,-3.0593816191572105,"XYZ"]},{"time":37.36572999996133,"pos":[9.589759995713159,172,679.8867506646989],"rot":[2.7980846452117594,0.3371270859479529,-3.02382483070574,"XYZ"]},{"time":37.46568500000285,"pos":[5.848495263419325,172,670.0611153016678],"rot":[2.7895784576827083,0.39804467434046226,-3.000166630349271,"XYZ"]},{"time":37.565434999996796,"pos":[2.048084511465718,172,660.0049364977189],"rot":[2.781310675062542,0.44743764669040287,-2.9800208889530886,"XYZ"]},{"time":37.68220499996096,"pos":[-2.128615773032702,172,648.060089596747],"rot":[2.7498645383840823,0.5872065390996277,-2.916607340564426,"XYZ"]},{"time":37.78226499998709,"pos":[-5.047250440183724,172,637.6227888970365],"rot":[2.689611666155108,0.7557937424889312,-2.820152360699778,"XYZ"]},{"time":37.882400000002235,"pos":[-6.744320584473641,172,627.1803933838752],"rot":[2.599308862769348,0.9073377595063317,-2.6983727739967014,"XYZ"]},{"time":37.98219999996945,"pos":[-6.611828995242875,172,617.1519495785433],"rot":[2.480104678236451,1.0312953210357008,-2.552723612749336,"XYZ"]},{"time":38.09892999997828,"pos":[-3.8382437159987957,172,606.7888185112683],"rot":[2.315882464777699,1.1305321243078892,-2.365947703262334,"XYZ"]},{"time":38.21555999998236,"pos":[1.5216479289659055,172,598.5044245094347],"rot":[2.133649649041913,1.191365446119384,-2.1674546424511885,"XYZ"]},{"time":38.3321799999685,"pos":[9.09605061549573,172,591.846272224236],"rot":[1.9700059276930415,1.223892735611454,-1.9924720917278431,"XYZ"]},{"time":38.44907999999123,"pos":[18.458788356233516,172,586.516328190986],"rot":[1.862981745749144,1.2375440309850803,-1.8789623206608421,"XYZ"]},{"time":38.565520000003744,"pos":[29.132237517922498,172,582.3247746185908],"rot":[1.8327646790915417,1.2405047643366587,-1.847002695414655,"XYZ"]},{"time":38.68234499997925,"pos":[40.68625042119851,172,579.0253857254708],"rot":[1.8327646790915428,1.240504764336659,-1.8470026954146563,"XYZ"]},{"time":38.78228499996476,"pos":[51.03817514236987,172,576.7272252000785],"rot":[1.8327646790915417,1.2405047643366587,-1.847002695414655,"XYZ"]},{"time":38.898884999973234,"pos":[63.403395487828504,172,574.5011833496505],"rot":[1.8327646790915428,1.240504764336659,-1.8470026954146563,"XYZ"]},{"time":38.998930000001565,"pos":[74.20374513584434,172,572.8670543465092],"rot":[1.8327646790915417,1.2405047643366587,-1.847002695414655,"XYZ"]},{"time":39.115560000005644,"pos":[86.83356986349922,172,571.2012258980944],"rot":[1.8327646790915417,1.2405047643366587,-1.8470026954146552,"XYZ"]},{"time":39.215640000009444,"pos":[97.73101553335655,172,569.9102428043475],"rot":[1.8327646790915417,1.2405047643366587,-1.847002695414655,"XYZ"]},{"time":39.33225500001572,"pos":[110.47185345504641,172,568.5176266020738],"rot":[1.8327646790915428,1.240504764336659,-1.8470026954146563,"XYZ"]},{"time":39.44906000001356,"pos":[123.22295652365041,172,567.2099188283187],"rot":[1.8327646790915417,1.2405047643366587,-1.8470026954146552,"XYZ"]},{"time":39.565694999997504,"pos":[135.98611221386741,172,565.9587084638939],"rot":[1.8327646790915417,1.2405047643366587,-1.847002695414655,"XYZ"]},{"time":39.665775000001304,"pos":[146.94793775151305,172,564.9155417469298],"rot":[1.8327646790915428,1.240504764336659,-1.8470026954146563,"XYZ"]},{"time":39.78247999999439,"pos":[159.6996905788965,172,563.7270458871731],"rot":[1.8327646790915417,1.2405047643366587,-1.847002695414655,"XYZ"]},{"time":39.89883499999996,"pos":[172.46802408782932,172,562.5554813369696],"rot":[1.8327646790915417,1.2405047643366587,-1.847002695414655,"XYZ"]},{"time":40.015529999975115,"pos":[185.25122642290336,172,561.3949899184299],"rot":[1.8327646790915428,1.240504764336659,-1.8470026954146563,"XYZ"]},{"time":40.11560499999905,"pos":[196.2444854549442,172,560.4037922791576],"rot":[1.8327646790915428,1.240504764336659,-1.8470026954146563,"XYZ"]},{"time":40.23217500001192,"pos":[209.03701432155725,172,559.2557756317184],"rot":[1.8327646790915428,1.240504764336659,-1.8470026954146563,"XYZ"]},{"time":40.349019999965094,"pos":[221.91790944475295,172,558.1038571655212],"rot":[1.8327646790915417,1.2405047643366587,-1.847002695414655,"XYZ"]},{"time":40.46572500001639,"pos":[234.55892322725768,172,556.9760270264836],"rot":[1.8327646790915417,1.2405047643366587,-1.847002695414655,"XYZ"]},{"time":40.565669999981765,"pos":[245.5279958988549,172,555.9988168243851],"rot":[1.8327646790915428,1.240504764336659,-1.8470026954146563,"XYZ"]},{"time":40.66560999996727,"pos":[256.4947179070731,172,555.0227538085325],"rot":[1.8327646790915428,1.240504764336659,-1.8470026954146563,"XYZ"]},{"time":40.7821399999666,"pos":[269.25696088825,172,554.1029793282581],"rot":[1.9490060075463909,1.2269870781607723,-1.9701545543216152,"XYZ"]},{"time":40.88242999999784,"pos":[280.15495520114507,172,554.0423669664534],"rot":[2.2614017653976233,1.1523197699026586,-2.306034631840635,"XYZ"]},{"time":40.999145000008866,"pos":[292.7820712613707,172,554.8398734862815],"rot":[2.549327251782992,0.9750299095603864,-2.633449380212763,"XYZ"]},{"time":41.1157200000016,"pos":[305.4371880664845,172,556.1236502348783],"rot":[2.682546223177559,0.7855916467508559,-2.805306834864792,"XYZ"]},{"time":41.232214999967255,"pos":[318.1060548947499,172,557.0764397620998],"rot":[2.7466680262639467,0.6133812238768973,-2.906105953693011,"XYZ"]},{"time":41.332419999991544,"pos":[329.01698405506914,172,557.1225532520684],"rot":[2.778234258259169,0.4839358413596002,-2.966490571167857,"XYZ"]},{"time":41.44897500000661,"pos":[341.4666870852657,172,555.9973905281842],"rot":[2.797163921415825,0.36051835339749966,-3.0157172000999237,"XYZ"]},{"time":41.56557500001509,"pos":[353.64036253068696,172,553.5741786676206],"rot":[2.798011231034812,0.31583849590500995,-3.030918041931225,"XYZ"]},{"time":41.6822449999745,"pos":[365.699332290633,172,550.1640255707257],"rot":[2.7884132761236176,0.38660371638514435,-3.0034852343216425,"XYZ"]},{"time":41.79881000000751,"pos":[377.8078511985077,172,546.4271242381417],"rot":[2.7615618910390913,0.5284122178630841,-2.94286379463318,"XYZ"]},{"time":41.9155449999962,"pos":[390.07720917439724,172,542.9716375505385],"rot":[2.7107954238224554,0.6905305823579317,-2.8568172097237037,"XYZ"]},{"time":42.03230500000063,"pos":[402.45388135912333,172,539.7737935698441],"rot":[2.6095669758201505,0.8831167921781566,-2.714708214380327,"XYZ"]},{"time":42.132400000002235,"pos":[413.23298486837376,172,537.0580266623807],"rot":[2.4242912423127954,1.0588972858392327,-2.491412269679761,"XYZ"]},{"time":42.24900999997044,"pos":[425.44729265950957,172,533.729042392085],"rot":[2.045456037631544,1.200367382874445,-2.0745839185003483,"XYZ"]},{"time":42.34897499997169,"pos":[435.8816653203424,172,530.3933349294771],"rot":[1.5278735015986418,1.238961475086068,-1.5254000918076285,"XYZ"]},{"time":42.46567499998491,"pos":[447.8504692705979,172,526.0143582310252],"rot":[0.9234812560186233,1.1430824593723123,-0.8775433587321139,"XYZ"]},{"time":42.565744999970775,"pos":[458.11767372241354,172,522.0830262991718],"rot":[0.63149310403701,0.9690123858265748,-0.5425609593166301,"XYZ"]},{"time":42.682399999990594,"pos":[470.1682637819963,172,518.0760710716995],"rot":[0.47243066014556234,0.7459640453397698,-0.33384283706138906,"XYZ"]},{"time":42.79893499996979,"pos":[482.47314258303675,172,515.4790020519267],"rot":[0.3992335475688631,0.5359644987495598,-0.21220319591051745,"XYZ"]},{"time":42.89882999996189,"pos":[492.82896336212275,172,514.7445759606508],"rot":[0.36728218107777555,0.37440030648794004,-0.13978721332910377,"XYZ"]},{"time":42.99907499999972,"pos":[503.0426500240875,172,515.4743246400137],"rot":[0.3505810808420849,0.2324624246440976,-0.08404650254637265,"XYZ"]},{"time":43.115734999999404,"pos":[514.2126411654845,172,518.3617466586047],"rot":[0.3424655217537281,0.09780224392277546,-0.0347981915416998,"XYZ"]},{"time":43.23227500001667,"pos":[523.8562197926564,172,523.5666664660263],"rot":[0.34102209507261966,0.03826514559526655,-0.013575665804277302,"XYZ"]},{"time":43.348919999960344,"pos":[531.403948145659,172,530.8194221939569],"rot":[0.3415710877821649,0.06747094212098402,-0.023963510879400705,"XYZ"]},{"time":43.44909499998903,"pos":[536.3467055466783,172,538.4321507928128],"rot":[0.3422176910700961,0.09043532041538724,-0.03216115008139421,"XYZ"]},{"time":43.565635000006296,"pos":[541.0856686553194,172,548.658786469937],"rot":[0.3423564669818286,0.09463233205886715,-0.033663020570264705,"XYZ"]},{"time":43.665724999969825,"pos":[545.2066592833315,172,558.1455251608561],"rot":[0.3423564669818286,0.09463233205886715,-0.033663020570264705,"XYZ"]},{"time":43.78262499999255,"pos":[550.811043081138,172,569.0884311692424],"rot":[0.3423564669818286,0.09463233205886715,-0.033663020570264705,"XYZ"]},{"time":43.89893999998458,"pos":[557.6125901312874,172,579.37999115775],"rot":[0.3423564669818286,0.09463233205886715,-0.033663020570264705,"XYZ"]},{"time":44.01574499998242,"pos":[565.4204981769037,172,588.9713439522404],"rot":[0.3423564669818286,0.09463233205886715,-0.033663020570264705,"XYZ"]},{"time":44.11569499998586,"pos":[572.6691895563488,172,596.9250256997041],"rot":[0.3423564669818286,0.09463233205886715,-0.033663020570264705,"XYZ"]},{"time":44.2322849999764,"pos":[581.1101312353887,172,606.3608838717292],"rot":[0.3423564669818286,0.09463233205886715,-0.033663020570264705,"XYZ"]},{"time":44.33224999997765,"pos":[587.700454275722,172,614.9293307431924],"rot":[0.3423564669818286,0.09463233205886715,-0.033663020570264705,"XYZ"]},{"time":44.432099999976344,"pos":[593.0655593499348,172,623.9981304178904],"rot":[0.34078034957712283,0.0968641139628275,-0.03428235246293435,"XYZ"]},{"time":44.54917499999283,"pos":[597.4653371555663,172,635.0811097664784],"rot":[0.33345945053550147,0.14030677229456276,-0.048404391654627885,"XYZ"]},{"time":44.649050000007264,"pos":[599.5300334212874,172,644.9253300340378],"rot":[0.3195504870337772,0.25451697639220994,-0.0831190183678066,"XYZ"]},{"time":44.765695000009146,"pos":[600.2157071150452,172,656.6841973659593],"rot":[0.3109849822550559,0.44399367426636954,-0.13719580029653902,"XYZ"]},{"time":44.8659050000133,"pos":[599.7905318894249,172,667.0741492311461],"rot":[0.327899327444818,0.6044344811582579,-0.19096709746619547,"XYZ"]},{"time":44.98232000001008,"pos":[598.9842934437498,172,679.4668939100027],"rot":[0.37493259034195414,0.762555878365591,-0.26543752157490885,"XYZ"]},{"time":45.08240000001388,"pos":[598.6014230030672,172,690.2942497132228],"rot":[0.4254262229715908,0.8742068641908692,-0.3344825188475318,"XYZ"]},{"time":45.18228499998804,"pos":[598.8128206761763,172,701.1526930418712],"rot":[0.48296616155473115,0.9640709942929968,-0.40676796795967857,"XYZ"]},{"time":45.29911500000162,"pos":[599.9733295095126,172,713.7142162838618],"rot":[0.5573854663090078,1.0465168673610905,-0.4948179896747248,"XYZ"]},{"time":45.41565499996068,"pos":[602.152343968354,172,726.06061417231],"rot":[0.6463404081131358,1.115571121304185,-0.5955437294884547,"XYZ"]},{"time":45.51574000000255,"pos":[604.8421692609376,172,736.5154475072372],"rot":[0.7445053005683652,1.1664997532116268,-0.702809532364884,"XYZ"]},{"time":45.615950000006706,"pos":[608.2440017170499,172,746.7450575140161],"rot":[0.8386673349209395,1.1999330895354356,-0.8035611254507448,"XYZ"]},{"time":45.71577499998966,"pos":[612.3806996238984,172,756.6679110876423],"rot":[0.8819448670206261,1.2121291529325535,-0.8494994732064644,"XYZ"]},{"time":45.83247999998275,"pos":[618.3667508909472,172,767.4573177639694],"rot":[0.8830297023182151,1.212463480298457,-0.8506579602388883,"XYZ"]},{"time":45.93235499999719,"pos":[624.6669097416153,172,775.6609579705208],"rot":[0.8830297023182151,1.212463480298457,-0.8506579602388883,"XYZ"]},{"time":46.04899999999907,"pos":[633.2942824366761,172,783.4333317387451],"rot":[0.8830297023182151,1.212463480298457,-0.8506579602388883,"XYZ"]},{"time":46.165559999994,"pos":[643.1962095689177,172,789.7264917300128],"rot":[0.897331924066036,1.216771925764284,-0.8659178866453286,"XYZ"]},{"time":46.265829999989364,"pos":[652.4547586270851,172,794.2958632338216],"rot":[0.9085091501155014,1.2200143080635706,-0.877826942005296,"XYZ"]},{"time":46.38232999999309,"pos":[663.8898084100889,172,798.9114389981751],"rot":[0.9316049956211585,1.226385564103131,-0.9023916476719858,"XYZ"]},{"time":46.498804999981076,"pos":[675.7979612700316,172,802.857224402715],"rot":[1.1929733577165664,1.2936388488515784,-1.1794427859606036,"XYZ"]},{"time":46.61582000000635,"pos":[687.9266605510296,172,805.8580710216052],"rot":[1.6212318039971634,1.3193372179096294,-1.6228665717257604,"XYZ"]},{"time":46.71594999998342,"pos":[698.5762561177286,172,807.9208835867172],"rot":[1.8997933472292718,1.30509685154894,-1.9108706390654604,"XYZ"]},{"time":46.83230000000913,"pos":[710.9885801681928,172,810.6179213552588],"rot":[2.0899484924638974,1.2805248590125051,-2.108553993084427,"XYZ"]},{"time":46.932399999990594,"pos":[721.3939196925123,172,813.6517823092113],"rot":[2.193989790580555,1.2597775534967992,-2.217465861147069,"XYZ"]},{"time":47.04923000000417,"pos":[733.1792315231161,172,818.0879605698444],"rot":[2.516021723359416,1.1325173467598642,-2.5623555971225516,"XYZ"]},{"time":47.1655449999962,"pos":[744.9727173219716,172,822.6276622057327],"rot":[2.7043617754469302,0.9436050412166336,-2.7798045520989225,"XYZ"]},{"time":47.266179999976885,"pos":[755.3726520144044,172,825.9560122882236],"rot":[2.7793707201409394,0.793603022194338,-2.877748731063914,"XYZ"]},{"time":47.38250499998685,"pos":[767.6020173504045,172,828.6447513416036],"rot":[2.8262202722101586,0.6415391826093373,-2.948773948265845,"XYZ"]},{"time":47.4991699999664,"pos":[782.2034098405775,172,829.9536697254982],"rot":[2.851856687191549,0.5160003620941539,-2.995543460127781,"XYZ"]},{"time":47.61576000001514,"pos":[798.3642014792242,172,829.4163205465693],"rot":[2.866171633072314,0.4183323654027085,-3.027289140024101,"XYZ"]},{"time":47.71804000000702,"pos":[809.3570455291646,172,828.0576778630026],"rot":[2.8735105271808354,0.35353246893292617,-3.046774773470912,"XYZ"]},{"time":47.83251500001643,"pos":[816.6624676806072,172,826.8481759616398],"rot":[2.8864600130836875,0.17541119191033308,-3.0961081795684677,"XYZ"]},{"time":47.949190000013914,"pos":[819.8390981443456,172,826.3185153701617],"rot":[2.8876782246027304,-0.14658069775068808,3.1037068631031803,"XYZ"]},{"time":48.06567499996163,"pos":[821.3245988854173,172,826.0708280139713],"rot":[2.855991952453979,-0.4906181075828529,3.0041163007781924,"XYZ"]},{"time":48.16587999998592,"pos":[821.9757459573307,172,825.962257959259],"rot":[2.791738019901509,-0.7597655697514255,2.8953903952668547,"XYZ"]},{"time":48.282594999996945,"pos":[822.3064722278772,172,825.8656855924719],"rot":[2.630653721574994,-1.0342333086633269,2.692600660474804,"XYZ"]},{"time":48.398975000018254,"pos":[821.598662701901,172,825.5021461506319],"rot":[2.2633899356686245,-1.2329060360659199,2.292131147815718,"XYZ"]},{"time":48.51565000001574,"pos":[819.5874308298918,172,825.0276459364577],"rot":[1.8416235317479144,-1.2969151077577692,1.8515753550792038,"XYZ"]},{"time":48.615749999997206,"pos":[817.0621765157391,172,824.7000373669817],"rot":[1.7001820505025869,-1.3005701170958603,1.7049969477239915,"XYZ"]},{"time":48.732529999979306,"pos":[811.3318526042594,172,824.2188885621524],"rot":[1.7171024417737182,-1.2950932980020715,1.722758320194588,"XYZ"]},{"time":48.83238999999594,"pos":[803.7761089957287,172,823.7055249624161],"rot":[1.723460797719606,-1.2933155520408774,1.7294332189416222,"XYZ"]},{"time":48.94902000000002,"pos":[792.9776476852622,172,823.0628232787437],"rot":[1.7234607977196068,-1.2933155520408786,1.729433218941623,"XYZ"]},{"time":49.06569000001764,"pos":[781.2260045777963,172,822.4286962078912],"rot":[1.7234607977196068,-1.2933155520408786,1.729433218941623,"XYZ"]},{"time":49.16571999998996,"pos":[770.6294840417985,172,821.8925036527006],"rot":[1.7234607977196068,-1.2933155520408786,1.729433218941623,"XYZ"]},{"time":49.28259000001708,"pos":[758.0794369754414,172,821.2858503984608],"rot":[1.7234607977196068,-1.2933155520408786,1.729433218941623,"XYZ"]},{"time":49.382334999972954,"pos":[747.138134195352,172,820.7740897349897],"rot":[1.723460797719606,-1.2933155520408774,1.7294332189416222,"XYZ"]},{"time":49.49903499998618,"pos":[734.3382506979183,172,820.1890873410163],"rot":[1.723460797719606,-1.2933155520408774,1.7294332189416222,"XYZ"]},{"time":49.61593999998877,"pos":[721.5979517851576,172,819.6167964985472],"rot":[1.723460797719606,-1.2933155520408774,1.7294332189416222,"XYZ"]},{"time":49.71570999996038,"pos":[710.5804585385067,172,819.1273821346572],"rot":[1.723460797719606,-1.2933155520408774,1.7294332189416222,"XYZ"]},{"time":49.83248499996262,"pos":[697.784440229329,172,818.5272921662668],"rot":[1.9008275845163125,-1.2650000194340631,1.9156657750610149,"XYZ"]},{"time":49.93252999999095,"pos":[686.8056446301591,172,817.8982631169935],"rot":[2.23568963051541,-1.1924825536449952,2.271580451836599,"XYZ"]},{"time":50.04915999999503,"pos":[674.0225365119181,172,817.3863236862542],"rot":[2.525013066085666,-1.0399428696506539,2.5929673981211785,"XYZ"]},{"time":50.14895499998238,"pos":[663.0413697952645,172,817.2649869668566],"rot":[2.654364340589506,-0.8952878515573865,2.749523267455178,"XYZ"]},{"time":50.249054999963846,"pos":[652.0438697576475,172,817.3877359129367],"rot":[2.7250701363235508,-0.7618166018498005,2.8452198587575293,"XYZ"]},{"time":50.365734999999404,"pos":[639.2852710575963,172,817.2420915372131],"rot":[2.7714588249435343,-0.6278699319612353,2.9174912426910087,"XYZ"]},{"time":50.48246500000823,"pos":[626.9825601817661,172,815.6411562911792],"rot":[2.796325907784284,-0.5117653377672022,2.967242608797558,"XYZ"]},{"time":50.582460000005085,"pos":[617.4659835493877,172,812.5163031965761],"rot":[2.8185488563911894,-0.3700691493522991,3.021099291365876,"XYZ"]},{"time":50.69919499999378,"pos":[608.5654208594605,172,806.7512340046005],"rot":[2.836476915259053,-0.17214551003944026,3.087694983686262,"XYZ"]},{"time":50.79926499997964,"pos":[602.6940879365949,172,800.1958040622756],"rot":[2.841081624908391,-0.017420179049591367,3.136194530605652,"XYZ"]},{"time":50.915674999996554,"pos":[597.8164282721144,172,791.0759324077507],"rot":[2.8382301869616047,0.13622080308060006,-3.0991095573105056,"XYZ"]},{"time":51.03260999999475,"pos":[594.9974570950001,172,780.7724546147308],"rot":[2.830239591144091,0.26110412843435926,-3.0587059784577613,"XYZ"]},{"time":51.13245500001358,"pos":[594.1453825859502,172,771.2553508692865],"rot":[2.8215694938733153,0.3458270851757225,-3.029720304888632,"XYZ"]},{"time":51.24926999997115,"pos":[594.8284401170235,172,759.7905931635648],"rot":[2.81187868088029,0.4174899983118393,-3.003719880697287,"XYZ"]},{"time":51.36565499997232,"pos":[596.7556516359276,172,747.9533407727592],"rot":[2.804917799156568,0.46032645379153175,-2.9873435202725918,"XYZ"]},{"time":51.482205000007525,"pos":[598.6338832714564,172,735.6850086871441],"rot":[2.802292769492568,0.47511262335233734,-2.9815213159369236,"XYZ"]},{"time":51.582634999998845,"pos":[599.4506377706989,172,724.9910520220578],"rot":[2.802292769492568,0.47511262335233734,-2.9815213159369236,"XYZ"]},{"time":51.699114999966696,"pos":[599.1355272194999,172,712.6137466940817],"rot":[2.802292769492568,0.47511262335233734,-2.9815213159369236,"XYZ"]},{"time":51.79900499997893,"pos":[597.9530324771745,172,701.6921170162212],"rot":[2.802292769492568,0.47511262335233734,-2.9815213159369236,"XYZ"]},{"time":51.91568500001449,"pos":[595.9648709651964,172,689.4192865160845],"rot":[2.802292769492568,0.47511262335233734,-2.9815213159369236,"XYZ"]},{"time":52.01587499998277,"pos":[594.1491456648072,172,678.7109062722735],"rot":[2.802292769492568,0.47511262335233734,-2.9815213159369236,"XYZ"]},{"time":52.132400000002235,"pos":[592.7773343176549,172,666.1996891832342],"rot":[2.802292769492568,0.47511262335233734,-2.9815213159369236,"XYZ"]},{"time":52.24898999999277,"pos":[593.0235146013015,172,653.881743849626],"rot":[2.802292769492568,0.47511262335233734,-2.9815213159369236,"XYZ"]},{"time":52.349110000010114,"pos":[594.7161305103498,172,643.6372118654217],"rot":[2.802292769492568,0.47511262335233734,-2.9815213159369236,"XYZ"]},{"time":52.46585999999661,"pos":[597.9501325539927,172,631.8730541569055],"rot":[2.802292769492568,0.47511262335233734,-2.9815213159369236,"XYZ"]},{"time":52.582319999986794,"pos":[602.1486220103683,172,620.1860022273877],"rot":[2.802292769492568,0.47511262335233734,-2.9815213159369236,"XYZ"]},{"time":52.68257999996422,"pos":[606.2894857662408,172,610.2020294273403],"rot":[2.802292769492568,0.47511262335233734,-2.9815213159369236,"XYZ"]},{"time":52.79910999996355,"pos":[611.5482105009769,172,598.6156029183969],"rot":[2.802292769492568,0.47511262335233734,-2.9815213159369236,"XYZ"]},{"time":52.91601499996614,"pos":[617.1246736208163,172,587.1789117551684],"rot":[2.802292769492568,0.47511262335233734,-2.9815213159369236,"XYZ"]},{"time":53.03247999999439,"pos":[623.5367083080196,172,576.2575522062255],"rot":[2.802292769492568,0.47511262335233734,-2.9815213159369236,"XYZ"]},{"time":53.149150000012014,"pos":[631.128310804728,172,566.7308240908573],"rot":[2.7984334119104397,0.47418038861037337,-2.979872937191315,"XYZ"]},{"time":53.24887499999022,"pos":[638.701626122455,172,559.7840580284286],"rot":[2.798862919662393,0.46453040240194465,-2.983081237063208,"XYZ"]},{"time":53.3659050000133,"pos":[648.5416035179124,172,552.9292215271857],"rot":[2.8071173688388815,0.4147030612646147,-3.0024699072205565,"XYZ"]},{"time":53.48238499998115,"pos":[659.1641222224596,172,546.7651750161665],"rot":[2.815072549443574,0.35769293838153304,-3.0235804628409064,"XYZ"]},{"time":53.58245499996701,"pos":[668.6593432927006,172,541.6848739490318],"rot":[2.8234950009658886,0.3167809783370226,-3.039376510670176,"XYZ"]},{"time":53.68254499998875,"pos":[678.3041005866704,172,536.6278752719104],"rot":[2.8308938217311725,0.2678850639500828,-3.056804125205954,"XYZ"]},{"time":53.78283999999985,"pos":[687.9424526116916,172,531.4472973080093],"rot":[2.8355423295043014,0.20769331400418442,-3.0765288955149765,"XYZ"]},{"time":53.882724999974016,"pos":[697.4910099191221,172,526.01625148445],"rot":[2.839514151250913,0.16933065168957243,-3.0891266551738767,"XYZ"]},{"time":53.99923499999568,"pos":[708.4254506872201,172,519.372670356173],"rot":[2.8399719652459607,0.16049578214454327,-3.09191533988994,"XYZ"]},{"time":54.09974500001408,"pos":[717.6946546405627,172,513.4741580634214],"rot":[2.833609516183509,0.19435884293665642,-3.080231755585748,"XYZ"]},{"time":54.2155849999981,"pos":[728.8080804213623,172,506.49329661450025],"rot":[2.79668301045234,0.3827192799556857,-3.008221554927235,"XYZ"]},{"time":54.31599500001175,"pos":[741.1256561264373,172,499.64125576737297],"rot":[2.700182114751785,0.6232928254267103,-2.8724765902553715,"XYZ"]},{"time":54.43234499997925,"pos":[755.3976990616751,172,493.44855467436463],"rot":[2.42704182045333,0.9004895212123762,-2.5445673926973256,"XYZ"]},{"time":54.54910000000382,"pos":[765.5171369227313,172,490.0368477486838],"rot":[1.8879687049657958,1.0518972081382008,-1.9322065946020743,"XYZ"]},{"time":54.665990000008605,"pos":[770.3657366943994,172,488.4488031863202],"rot":[1.3155220626770607,1.0149922956301576,-1.2727380260329841,"XYZ"]},{"time":54.78241499996511,"pos":[772.5323065029353,172,487.73919431665627],"rot":[1.0106799383535587,0.9137728035431851,-0.9009561784111455,"XYZ"]},{"time":54.88247999997111,"pos":[773.4631712193393,172,487.4343115214584],"rot":[0.9079814733345747,0.8656594186448927,-0.7730119665178841,"XYZ"]},{"time":54.98239499999909,"pos":[773.9704262373258,172,487.2681720975052],"rot":[0.8907130066414302,0.8612733936114478,-0.7534299004596553,"XYZ"]},{"time":55.09919500001706,"pos":[774.2839629631852,172,487.1654805337445],"rot":[0.9045999185406083,0.8765046765151137,-0.7740936371802756,"XYZ"]},{"time":55.21570499998052,"pos":[774.4412229044592,172,487.1139737469651],"rot":[0.9676913769061731,0.9260147896537241,-0.8595436633371712,"XYZ"]},{"time":55.31597499997588,"pos":[774.5131224783504,172,487.0904247363783],"rot":[1.0418847478554825,0.9634123525903473,-0.9522224648076696,"XYZ"]},{"time":55.432389999972656,"pos":[774.5580958485258,172,487.075694769105],"rot":[1.1054805184510923,0.9868071615009077,-1.029033756452325,"XYZ"]},{"time":55.53263500001049,"pos":[774.775414175258,172,487.12533386255075],"rot":[1.1307094174691086,0.9948466541205647,-1.059193639260739,"XYZ"]},{"time":55.64928499999223,"pos":[776.0427617834333,172,487.4690091881937],"rot":[1.139758882296553,0.9989775769423966,-1.0703553541734132,"XYZ"]},{"time":55.76572500000475,"pos":[778.4213494698305,172,488.0866896882809],"rot":[1.2204584955521307,1.024179301317808,-1.1666088567896205,"XYZ"]},{"time":55.86574500001734,"pos":[781.4381259531153,172,488.74961919193197],"rot":[1.3577403044450402,1.0502533092770419,-1.3264121685445074,"XYZ"]},{"time":55.982589999970514,"pos":[788.1776111399499,172,489.83517611268763],"rot":[1.616849794903203,1.065708873453579,-1.6234095482016049,"XYZ"]},{"time":56.08240000001388,"pos":[796.3123683156726,172,490.52627669657215],"rot":[1.8503368072532473,1.045600144644895,-1.8911402416651684,"XYZ"]},{"time":56.199280000000726,"pos":[807.2127103859999,172,490.46443213697506],"rot":[2.0441921228195765,0.9986140011143461,-2.11802064295576,"XYZ"]},{"time":56.29914000001736,"pos":[817.2103824425009,172,489.4668983756026],"rot":[2.1539905933644055,0.9553145021308701,-2.2504075654838998,"XYZ"]},{"time":56.415864999988116,"pos":[829.0648665893234,172,487.18833453090946],"rot":[2.233441205234396,0.913108576325464,-2.3491603451765313,"XYZ"]},{"time":56.53244999999879,"pos":[840.9555120913491,172,483.8029834877799],"rot":[2.297935172597672,0.8696783599633935,-2.4320247576113037,"XYZ"]},{"time":56.64925999997649,"pos":[852.5438334338148,172,479.36720808818126],"rot":[2.440394688311109,0.7557588982335917,-2.6166960816263845,"XYZ"]},{"time":56.76574499998242,"pos":[863.5185941705442,172,473.65649601417374],"rot":[2.5478139743816968,0.621055329459389,-2.7673060690875944,"XYZ"]},{"time":56.86602999997558,"pos":[872.1510984741094,172,467.70983644507584],"rot":[2.5942243955286246,0.5127226560776231,-2.851066099998333,"XYZ"]},{"time":56.965889999992214,"pos":[879.9850967671099,172,460.82349108858796],"rot":[2.621789373141858,0.42010156007278837,-2.9122836107463677,"XYZ"]},{"time":57.08264999999665,"pos":[888.0336613747913,172,451.7753910334367],"rot":[2.6406940125593037,0.3349983060470026,-2.9635090636100934,"XYZ"]},{"time":57.18249999999534,"pos":[894.0890339056203,172,443.2066328014111],"rot":[2.6498474343391134,0.28196649943044044,-2.9936447122529786,"XYZ"]},{"time":57.28255999996327,"pos":[899.4038380048482,172,434.0483472161664],"rot":[2.6577731755157417,0.24483281483921332,-3.014902727597847,"XYZ"]},{"time":57.39924499997869,"pos":[904.7276641132294,172,422.87727802187277],"rot":[2.66753033225696,0.20036946695158903,-3.0398250029166958,"XYZ"]},{"time":57.499039999966044,"pos":[908.6599110024721,172,412.8590501270405],"rot":[2.6756089137460415,0.16160705912558984,-3.0608459187056307,"XYZ"]},{"time":57.61602999997558,"pos":[912.4762019198934,172,400.91858574729366],"rot":[2.687061017795221,0.08239783934463007,-3.1013956304951806,"XYZ"]},{"time":57.71581999998307,"pos":[914.9866532864525,172,390.42991060843116],"rot":[2.6917350833630853,-0.03276549057200479,3.125775022875358,"XYZ"]},{"time":57.83253999997396,"pos":[916.7687223423742,172,378.05559120449317],"rot":[2.687073663281737,-0.142119638908104,3.072490944370813,"XYZ"]},{"time":57.93265500001144,"pos":[917.2596647792045,172,367.3990638201611],"rot":[2.6806612677740547,-0.21434675175058812,3.036349585771378,"XYZ"]},{"time":58.03260500001488,"pos":[916.8347206642111,172,356.7442641301102],"rot":[2.674215813579876,-0.2668132745319337,3.0093089385242036,"XYZ"]},{"time":58.149250000016764,"pos":[915.3032322444152,172,344.3092277933093],"rot":[2.6687809516522925,-0.30331164243256414,2.989986515855388,"XYZ"]},{"time":58.26602499996079,"pos":[912.8899384421792,172,332.03844723314296],"rot":[2.6671390809724986,-0.31336928842905254,2.984576412197843,"XYZ"]},{"time":58.36572499998147,"pos":[910.2845383397939,172,321.5002586485577],"rot":[2.6671390809724986,-0.31336928842905254,2.984576412197843,"XYZ"]},{"time":58.482405000017025,"pos":[906.8621607833019,172,309.21920032151644],"rot":[2.6679719370494057,-0.30831625285762965,2.9872993896517244,"XYZ"]},{"time":58.599234999972396,"pos":[903.9764974106647,172,296.90453434912763],"rot":[2.6735660326455006,-0.2714772199838342,3.0068653115625867,"XYZ"]},{"time":58.69906000001356,"pos":[902.7263263976652,172,286.31504230595243],"rot":[2.676150059982064,-0.25234691077186033,3.0168444961394707,"XYZ"]},{"time":58.79925999999978,"pos":[902.1317111934212,172,275.59934001683206],"rot":[2.6744723800981665,-0.2483475078533863,3.0182518444020867,"XYZ"]},{"time":58.91596999997273,"pos":[901.0477368011013,172,263.0663447048047],"rot":[2.673934276712456,-0.24828281019908094,3.018119594113501,"XYZ"]},{"time":59.0158250000095,"pos":[899.2453244851891,172,250.49570148794928],"rot":[2.673934276712456,-0.24828281019908094,3.018119594113501,"XYZ"]},{"time":59.13245999999344,"pos":[896.6665491355922,172,235.91261491335445],"rot":[2.673934276712456,-0.24828281019908094,3.018119594113501,"XYZ"]},{"time":59.24926000001142,"pos":[894.4776777542191,172,224.85710712210857],"rot":[2.674716921841792,-0.24208330222471242,3.021343868505164,"XYZ"]},{"time":59.34927000000607,"pos":[893.3614841375268,172,219.379920613847],"rot":[2.6862338225699816,-0.11311663919925018,3.08637575687693,"XYZ"]},{"time":59.466039999970235,"pos":[892.756939060461,172,216.41340468845328],"rot":[2.682684404760332,0.1412086465811099,-3.0721663037528595,"XYZ"]},{"time":59.582684999972116,"pos":[892.4744805863843,172,215.02737477373094],"rot":[2.652326377134107,0.3677170987090114,-2.952473137420189,"XYZ"]},{"time":59.68255500000669,"pos":[892.3498996416818,172,214.41605335125848],"rot":[2.6055895819116253,0.5379951408542475,-2.846122739774274,"XYZ"]},{"time":59.799270000017714,"pos":[892.2734753066024,172,214.04103746625523],"rot":[2.5275291382037253,0.705736171606797,-2.712726814000132,"XYZ"]},{"time":59.90000500000315,"pos":[892.2388019424781,172,213.8708945095692],"rot":[2.421722731185853,0.8430287894785762,-2.561919890770657,"XYZ"]},{"time":60.015855000005104,"pos":[892.6304682835638,172,213.61109141725507],"rot":[2.014662744837069,1.0646411278926244,-2.0687760014483647,"XYZ"]},{"time":60.11618000001181,"pos":[893.9403952368023,172,213.33604893183394],"rot":[1.4063090839604655,1.1121151301786316,-1.3877469645630849,"XYZ"]},{"time":60.216090000001714,"pos":[896.0405146247068,172,213.4098795641611],"rot":[0.9095680904251677,0.984317346938239,-0.8194140158979283,"XYZ"]},{"time":60.332509999978356,"pos":[899.4978014124958,172,214.43958247829036],"rot":[0.6356225912573565,0.7440460397059161,-0.4633789138947718,"XYZ"]},{"time":60.4491449999623,"pos":[905.3878978522775,172,217.73960578332145],"rot":[0.5191266219920357,0.4895354559725371,-0.2624836090304363,"XYZ"]},{"time":60.5658650000114,"pos":[912.1159535612593,172,223.67722587811463],"rot":[0.4720841905482338,0.2539613230686317,-0.12758409330165243,"XYZ"]},{"time":60.66608499997528,"pos":[917.3625066302626,172,230.57384557256995],"rot":[0.4578022244033944,0.0907873559004552,-0.0446411426280945,"XYZ"]},{"time":60.78249000001233,"pos":[922.2421914126927,172,240.2083789586686],"rot":[0.45619189230330665,-0.04127142995082768,0.020243986456718654,"XYZ"]},{"time":60.899334999965504,"pos":[926.4093792559455,172,251.10110884181213],"rot":[0.4605674620606418,-0.1391987720378086,0.06873300693106313,"XYZ"]},{"time":61.01568999997107,"pos":[930.5593086159062,172,262.6458481421664],"rot":[0.46869086078537625,-0.20036223187563817,0.10043097965623995,"XYZ"]},{"time":61.11624000000302,"pos":[933.5914458176518,172,272.8843450452522],"rot":[0.47155861627211093,-0.2264071714493599,0.11397153519630707,"XYZ"]},{"time":61.21596000000136,"pos":[935.3670957339951,172,283.23313136668924],"rot":[0.4723734096930052,-0.2332301313286555,0.11754828879471535,"XYZ"]},{"time":61.332569999969564,"pos":[935.8259660768541,172,295.336798733055],"rot":[0.4723734096930056,-0.23323013132865564,0.11754828879471547,"XYZ"]},{"time":61.44912499998463,"pos":[935.0667178443962,172,307.62270085214203],"rot":[0.47465699368258085,-0.2512655429784987,0.1270673115038234,"XYZ"]},{"time":61.54920499998843,"pos":[933.6129152867879,172,318.20720494244745],"rot":[0.48801270176024747,-0.34254593564025176,0.17644697736242068,"XYZ"]},{"time":61.66585499997018,"pos":[930.8811365409908,172,330.3622606995397],"rot":[0.5115700248314368,-0.4461326052066013,0.23766400099324178,"XYZ"]},{"time":61.76581499999156,"pos":[927.5987577006125,172,340.5495415451788],"rot":[0.5309385290507237,-0.5111182871292428,0.27969122128686724,"XYZ"]},{"time":61.86582000000635,"pos":[923.5192383737726,172,350.4398757105574],"rot":[0.5447443831191519,-0.5505406281284326,0.30695555365780114,"XYZ"]},{"time":61.98265999997966,"pos":[917.9183118558956,172,361.61537272841446],"rot":[0.5532571392813185,-0.5726573160948523,0.3229395205994328,"XYZ"]},{"time":62.08351999998558,"pos":[912.5271835901235,172,370.99523513625826],"rot":[0.5539569285771938,-0.5744100415333221,0.3242292076826337,"XYZ"]},{"time":62.182589999982156,"pos":[906.7381236417356,172,380.2470033719431],"rot":[0.5539569285771938,-0.5744100415333221,0.3242292076826337,"XYZ"]},{"time":62.28243999998085,"pos":[900.6445147961915,172,389.4316588933443],"rot":[0.5531881322892344,-0.5761354547966515,0.324513723131397,"XYZ"]},{"time":62.39945999998599,"pos":[893.3768330560852,172,399.84732939101707],"rot":[0.5687352470708451,-0.6267438112911571,0.35867345305229176,"XYZ"]},{"time":62.51585999998497,"pos":[885.7111633756385,172,409.9549211351875],"rot":[0.6126287261995652,-0.716242363427861,0.43233682607582086,"XYZ"]},{"time":62.61584499996388,"pos":[878.6402325683932,172,418.2852588087664],"rot":[0.6526518828834522,-0.7753282427815718,0.4912853383930477,"XYZ"]},{"time":62.71628499997314,"pos":[871.1397356974211,172,426.169702652358],"rot":[0.68511409590772,-0.8155773340819138,0.536726091290411,"XYZ"]},{"time":62.8325799999875,"pos":[861.890990348674,172,434.82811190843995],"rot":[0.707620224912353,-0.8402972288401688,0.5672793249009064,"XYZ"]},{"time":62.93255500000669,"pos":[853.5412318437299,172,441.9220928674622],"rot":[0.711342691627274,-0.8441658352061345,0.5722683384638402,"XYZ"]},{"time":63.04949999996461,"pos":[843.5863458611458,172,449.8022000073214],"rot":[0.712969773470069,-0.8509447080105496,0.5764984444561704,"XYZ"]},{"time":63.16587999998592,"pos":[833.3469651931872,172,457.423751706196],"rot":[0.7347604066861634,-0.8764494054706609,0.6069139070484546,"XYZ"]},{"time":63.2658400000073,"pos":[824.3601428452541,172,463.73256595021945],"rot":[0.7534731319548341,-0.8930892960601109,0.6310964656335101,"XYZ"]},{"time":63.38246499997331,"pos":[813.7234031625152,172,470.8037297445192],"rot":[0.757790224386302,-0.8967634433158433,0.6366300281255716,"XYZ"]},{"time":63.499079999979585,"pos":[802.9400518170347,172,477.6657202525122],"rot":[0.7577902243863026,-0.8967634433158439,0.6366300281255723,"XYZ"]},{"time":63.599385000008624,"pos":[793.5666105003515,172,483.46439339578137],"rot":[0.7577902243863026,-0.8967634433158439,0.6366300281255723,"XYZ"]},{"time":63.699190000013914,"pos":[784.1531863840644,172,489.1818308234828],"rot":[0.757790224386302,-0.8967634433158433,0.6366300281255716,"XYZ"]},{"time":63.81578999996418,"pos":[773.1840061442458,172,495.7388350763408],"rot":[0.7812492900507462,-0.9192723543595027,0.6677446571643657,"XYZ"]},{"time":63.91603500000201,"pos":[763.6177033559858,172,501.2138644697423],"rot":[0.8800037287449132,-0.9853103558001064,0.7894786801953945,"XYZ"]},{"time":64.03273500001524,"pos":[752.294077652818,172,507.0575544622069],"rot":[1.002875079297027,-1.0411538994234215,0.9341538906108284,"XYZ"]},{"time":64.13285499997437,"pos":[742.3094375911297,172,511.5271571524501],"rot":[1.091345722689932,-1.0700956277795075,1.035788090737178,"XYZ"]},{"time":64.24914500000887,"pos":[730.4614784898264,172,516.0493167971098],"rot":[1.1580443742479132,-1.0872041546421776,1.111457608088064,"XYZ"]},{"time":64.34921000001486,"pos":[720.0928606212319,172,519.4349721768975],"rot":[1.1763530995823885,-1.0912901006238092,1.1321153901155698,"XYZ"]},{"time":64.465830000001,"pos":[707.8645748187928,172,522.9409332439685],"rot":[1.1763530995823885,-1.0912901006238092,1.1321153901155698,"XYZ"]},{"time":64.56589999998687,"pos":[697.2301108178002,172,525.698694711021],"rot":[1.1763530995823885,-1.0912901006238092,1.1321153901155698,"XYZ"]},{"time":64.68254999996861,"pos":[684.7504834626775,172,528.7035302985151],"rot":[1.1763530995823885,-1.0912901006238092,1.1321153901155698,"XYZ"]},{"time":64.79907000000821,"pos":[672.2056388456687,172,531.5537310526836],"rot":[1.1763530995823885,-1.0912901006238092,1.1321153901155698,"XYZ"]},{"time":64.89922999998089,"pos":[661.4898243842645,172,533.8974087312257],"rot":[1.1763530995823885,-1.0912901006238092,1.1321153901155698,"XYZ"]},{"time":65.01613499998348,"pos":[648.9807150451517,172,536.5602217054903],"rot":[1.1763530995823885,-1.0912901006238092,1.1321153901155698,"XYZ"]},{"time":65.13272499997402,"pos":[636.4221000432161,172,539.1650901075058],"rot":[1.2210112353672233,-1.1002557848081334,1.182330870814218,"XYZ"]},{"time":65.24908500001766,"pos":[623.8381838402271,172,541.5540197709422],"rot":[1.5429060942502535,-1.130640135866585,1.5399694367113252,"XYZ"]},{"time":65.36608000000706,"pos":[611.256700916074,172,543.8747257922889],"rot":[1.9064925726725932,-1.1015087364832892,1.943687995491879,"XYZ"]},{"time":65.46605499996804,"pos":[600.5185860523296,172,546.160516776884],"rot":[2.1228706647168503,-1.0454503752295738,2.1895120825869,"XYZ"]},{"time":65.58246999996481,"pos":[588.1582250158025,172,549.3349416511988],"rot":[2.28155289795516,-0.9722629954854971,2.376749986157125,"XYZ"]},{"time":65.68277999997372,"pos":[577.6234716320466,172,552.3736742469574],"rot":[2.3646837595822134,-0.9159071010397087,2.4793140406487395,"XYZ"]},{"time":65.78288000001339,"pos":[567.0684443473386,172,555.3909049167071],"rot":[2.4216959488740892,-0.8715844775477618,2.55051069590154,"XYZ"]},{"time":65.88285499997437,"pos":[556.433783652712,172,558.1849758296876],"rot":[2.491303518725284,-0.796939819271125,2.643336548477698,"XYZ"]},{"time":65.99937999999383,"pos":[543.9789471602738,172,560.7554329749071],"rot":[2.585797166746017,-0.6478277385538481,2.7829877012558946,"XYZ"]},{"time":66.11586999997962,"pos":[531.4681567878764,172,562.1183531193317],"rot":[2.64040291587862,-0.5042281294639621,2.882843216376089,"XYZ"]},{"time":66.23242499999469,"pos":[519.0744711264509,172,562.0216233111371],"rot":[2.6679715952598997,-0.3884755762930508,2.949842835422665,"XYZ"]},{"time":66.33269000001019,"pos":[508.5731389162269,172,560.7621332900758],"rot":[2.6824129154531353,-0.3097103216572908,2.9920250273893636,"XYZ"]},{"time":66.44932000001427,"pos":[496.5777069387453,172,558.0200419079183],"rot":[2.691755779867606,-0.24221650648645543,3.0262914095892848,"XYZ"]},{"time":66.565895000007,"pos":[485.03158414727636,172,553.8683389745157],"rot":[2.6961993963095097,-0.20115924638283422,3.0464960981618674,"XYZ"]},{"time":66.68257000000449,"pos":[474.5388442976519,172,548.0802091056386],"rot":[2.6975366098359363,-0.18687923812391044,3.0534314957440514,"XYZ"]},{"time":66.79927499999758,"pos":[465.7234722804433,172,540.614769630055],"rot":[2.6975366098359363,-0.18687923812391044,3.0534314957440514,"XYZ"]},{"time":66.89946499996586,"pos":[459.6783621337084,172,532.9840746711905],"rot":[2.6975366098359363,-0.18687923812391044,3.0534314957440514,"XYZ"]},{"time":67.01610499998787,"pos":[453.88594193708525,172,522.9490887552596],"rot":[2.6975366098359363,-0.18687923812391044,3.0534314957440514,"XYZ"]},{"time":67.11605999997118,"pos":[449.65391787502983,172,513.5499410257555],"rot":[2.6975366098359363,-0.18687923812391044,3.0534314957440514,"XYZ"]},{"time":67.2324549999903,"pos":[445.36566873063356,172,501.99454762142074],"rot":[2.6975366098359363,-0.18687923812391044,3.0534314957440514,"XYZ"]},{"time":67.33250999997836,"pos":[442.095775093542,172,491.7351812760872],"rot":[2.704676854086708,-0.18443555163086034,3.056153898973239,"XYZ"]},{"time":67.44922999996925,"pos":[438.65373456004926,172,479.55179242028987],"rot":[2.7212858319289204,-0.17815353793750066,3.0625541282718753,"XYZ"]},{"time":67.5492249999661,"pos":[435.9530930108743,172,468.9544383044977],"rot":[2.7301512668080576,-0.16498381539738785,3.070051085197315,"XYZ"]},{"time":67.64925000001676,"pos":[433.45509314571143,172,458.1911845909837],"rot":[2.73135311398525,-0.15006646234687818,3.076662435667861,"XYZ"]},{"time":67.76605999999447,"pos":[430.8271832899845,172,445.7518163511131],"rot":[2.7300847120415286,-0.14795970428547414,3.0773432158990515,"XYZ"]},{"time":67.86611000000266,"pos":[428.70703266326217,172,434.96073002157567],"rot":[2.729427389925914,-0.14945680362460456,3.0765836850796404,"XYZ"]},{"time":67.96599499997683,"pos":[426.6833658245402,172,424.1466056115083],"rot":[2.729427389925914,-0.14945680362460456,3.0765836850796404,"XYZ"]},{"time":68.08283999998821,"pos":[424.403214876134,172,411.48430660432024],"rot":[2.7303839197339492,-0.14845500938045342,3.077182766145083,"XYZ"]},{"time":68.19927499996265,"pos":[422.2187405008129,172,398.9248545757221],"rot":[2.735566092214411,-0.1383870659719339,3.0823570343417703,"XYZ"]},{"time":68.29944999999134,"pos":[420.44143604436914,172,388.03974761255796],"rot":[2.738226388907297,-0.08236061426886801,3.106498009415184,"XYZ"]},{"time":68.41603500000201,"pos":[418.72366871525264,172,375.373242155199],"rot":[2.7379108272124606,-0.019552194164112108,3.133241856134715,"XYZ"]},{"time":68.51584999996703,"pos":[417.64734856753074,172,364.45398791805616],"rot":[2.7379589560663646,0.012527550548015578,-3.136242539909308,"XYZ"]},{"time":68.63267500000075,"pos":[416.8446028668431,172,351.67861967251406],"rot":[2.7378637606816874,0.024548272021069385,-3.1311071766453846,"XYZ"]},{"time":68.74929000000702,"pos":[416.41691081931566,172,338.913467136401],"rot":[2.7378637606816874,0.024548272021069385,-3.1311071766453846,"XYZ"]},{"time":68.86608000000706,"pos":[416.1677823532915,172,326.1079443930573],"rot":[2.739580975674979,0.05067634559452597,-3.120059318014313,"XYZ"]},{"time":68.98274999996647,"pos":[415.3647730373348,172,313.3855622144294],"rot":[2.734295096705252,0.16471065825385048,-3.0709713566351544,"XYZ"]},{"time":69.08268499997212,"pos":[413.92283907747185,172,302.6067262199229],"rot":[2.7205257401520706,0.2975961115461777,-3.011019139219322,"XYZ"]},{"time":69.19959500001278,"pos":[411.46344577676143,172,290.1657229693324],"rot":[2.6962100529178925,0.4410036731727304,-2.940579218743084,"XYZ"]},{"time":69.31604499998502,"pos":[408.6635617586831,172,277.7720439551059],"rot":[2.665143789966458,0.5558322733287405,-2.8757166243049364,"XYZ"]},{"time":69.43249500001548,"pos":[406.1139048088187,172,265.27115417349535],"rot":[2.63325611811677,0.6427964076407771,-2.8192495161894575,"XYZ"]},{"time":69.53266999998596,"pos":[404.3683893735034,172,254.45779123435557],"rot":[2.6091508965627366,0.6959474284961827,-2.7804177699241475,"XYZ"]},{"time":69.64951000001747,"pos":[402.9584623939871,172,241.81925884742373],"rot":[2.5772734502463965,0.7547918750879016,-2.7323929838313323,"XYZ"]},{"time":69.76595500000985,"pos":[402.2733036852449,172,229.13361303930967],"rot":[2.5481273559304602,0.8000965333588741,-2.690856071352174,"XYZ"]},{"time":69.86619999998948,"pos":[402.240660129593,172,218.199620959677],"rot":[2.5311045952393108,0.8148994203962385,-2.670690200499807,"XYZ"]},{"time":69.982640000002,"pos":[402.70658081624634,172,205.47333024481432],"rot":[2.5352648507108864,0.809237161443698,-2.6764228259526672,"XYZ"]},{"time":70.08357000001706,"pos":[403.4268064383369,172,194.50517880563095],"rot":[2.5724140331781706,0.7728240080748336,-2.7214948346694894,"XYZ"]},{"time":70.19932000001427,"pos":[404.6497471782567,172,181.8500309556522],"rot":[2.7202865037439374,0.5810323743667998,-2.900402634992522,"XYZ"]},{"time":70.29921999998624,"pos":[405.95095892302584,172,170.93802243420427],"rot":[2.792108949179579,0.40130963573929773,-3.000182363060321,"XYZ"]},{"time":70.41602999996394,"pos":[407.8575575636528,172,158.32499768011027],"rot":[2.8238652018182218,0.20918336879983856,-3.0734051812765766,"XYZ"]},{"time":70.53259999997681,"pos":[409.90309475677907,172,145.67155057734485],"rot":[2.8307360341136247,0.042484094070541115,-3.1279486439354676,"XYZ"]},{"time":70.6492899999721,"pos":[411.3542394194468,172,133.00434255142244],"rot":[2.829541320096289,-0.09598662826435068,3.110685620081443,"XYZ"]},{"time":70.76597999996739,"pos":[411.8227130409067,172,120.34133704460558],"rot":[2.8240738526883296,-0.20617138313371774,3.074417126094082,"XYZ"]},{"time":70.88287500001024,"pos":[411.1799498969162,172,107.7963032191588],"rot":[2.8172363342669735,-0.2877175918374277,3.046470170598604,"XYZ"]},{"time":70.99932999996236,"pos":[409.70392208508457,172,95.25384053191326],"rot":[2.7913640013077905,-0.47199097397990786,2.9770130406269173,"XYZ"]},{"time":71.1159500000067,"pos":[407.84043937677194,172,82.69359864324667],"rot":[2.691962265885184,-0.7910225478890653,2.8110215150997666,"XYZ"]},{"time":71.23251000000164,"pos":[405.0500073626975,172,70.43301970908036],"rot":[2.4263486900941516,-1.0886121168970289,2.4856374708670983,"XYZ"]},{"time":71.34932500001742,"pos":[400.1796441902236,172,60.11410584753039],"rot":[1.7910923495809066,-1.2518755689086476,1.802386869150559,"XYZ"]},{"time":71.46625499997754,"pos":[393.2853575910254,172,52.732040533662826],"rot":[1.040265044945408,-1.2081756940562682,1.0104496554693057,"XYZ"]},{"time":71.56601000000956,"pos":[385.8378144701271,172,47.71702513490629],"rot":[0.7018980839824064,-1.077113015419294,0.6400203307488582,"XYZ"]},{"time":71.66593999997713,"pos":[377.2279451888137,172,43.485082575085464],"rot":[0.5455586704306922,-0.9401765877001729,0.4558251494697936,"XYZ"]},{"time":71.78286500001559,"pos":[366.18313681200965,172,39.36968385968421],"rot":[0.45226548323308374,-0.7952019427093722,0.3339112988394817,"XYZ"]},{"time":71.88294999999925,"pos":[356.1432231811373,172,36.713221712040095],"rot":[0.407229629760245,-0.6880168648962942,0.26734754395744076,"XYZ"]},{"time":71.99923999997554,"pos":[344.10141892091315,172,34.848634242175656],"rot":[0.3762176579830703,-0.5867019787437548,0.2153076128111813,"XYZ"]},{"time":72.09940999996616,"pos":[333.5467294569123,172,34.309513811760006],"rot":[0.36046632855480865,-0.5207102712675276,0.18537111146128438,"XYZ"]},{"time":72.21595499996329,"pos":[321.22583759797993,172,34.82300228365707],"rot":[0.35021226158833935,-0.4695498339543973,0.16379794739854844,"XYZ"]},{"time":72.31609999999637,"pos":[310.48425101110485,172,36.143103035667195],"rot":[0.34628717459976377,-0.44765201687113365,0.15493216019387562,"XYZ"]},{"time":72.43264999997336,"pos":[294.8608136349402,172,39.28806011935268],"rot":[0.3484417672572814,-0.4444710750238006,0.15494426877504344,"XYZ"]},{"time":72.53272000001743,"pos":[281.66802272199266,172,42.72687560589469],"rot":[0.35197416014018484,-0.44272468303741935,0.15605906247855517,"XYZ"]},{"time":72.63280999998096,"pos":[271.7602432389899,172,45.780606802700206],"rot":[0.3554544912459946,-0.43812909927850563,0.15620649902820732,"XYZ"]},{"time":72.74952499999199,"pos":[266.1313732161064,172,47.8527777064267],"rot":[0.3626762141792594,-0.4420107446697597,0.16091414211879182,"XYZ"]},{"time":72.84955499996431,"pos":[265.2337148222756,172,48.948632817136954],"rot":[0.39093976759936555,-0.49179597460319835,0.1922201574606876,"XYZ"]},{"time":72.94950499996776,"pos":[265.9283029750166,172,50.17488519536766],"rot":[0.46982123959755295,-0.6592687039971756,0.3015279209157321,"XYZ"]},{"time":73.04943499999354,"pos":[267.3448846603022,172,51.85076427198748],"rot":[0.6013867208734867,-0.858482296253688,0.4789934832838056,"XYZ"]},{"time":73.16595499997493,"pos":[269.8917716111648,172,55.150444907091995],"rot":[0.8284812367034281,-1.0444051806648609,0.7558227020700754,"XYZ"]},{"time":73.28265499998815,"pos":[272.1187930924102,172,59.50928916699857],"rot":[1.1119197839449888,-1.1495970449159882,1.074605977847073,"XYZ"]},{"time":73.39939500001492,"pos":[273.3542284365234,172,66.63046366774975],"rot":[1.3820636787875724,-1.1883554016790767,1.3677539609788294,"XYZ"]},{"time":73.51593499997398,"pos":[272.35772651517436,172,75.33227835764852],"rot":[1.5875077000795283,-1.1954329701021584,1.5887580532173924,"XYZ"]},{"time":73.61595499998657,"pos":[269.54511173562133,172,83.24790858905259],"rot":[1.6822734098096181,-1.1960084165757405,1.6905122562335981,"XYZ"]},{"time":73.73270499997307,"pos":[264.3457692977905,172,92.6865704524266],"rot":[1.7152389010568148,-1.1943356657423945,1.7259478870817535,"XYZ"]},{"time":73.83262999996077,"pos":[258.51234052953146,172,100.56325240758771],"rot":[1.7152389010568148,-1.1943356657423945,1.7259478870817535,"XYZ"]},{"time":73.94951000000583,"pos":[250.2067388122837,172,108.82429136555646],"rot":[1.7124015845295013,-1.1944971508374769,1.7228970137222002,"XYZ"]},{"time":74.04954500001622,"pos":[240.33446111834604,172,115.87417733421118],"rot":[1.7110501947889776,-1.1945728970390634,1.7214439766638943,"XYZ"]},{"time":74.16593999997713,"pos":[228.38588702927294,172,121.99392040682736],"rot":[1.7110501947889776,-1.1945728970390634,1.7214439766638943,"XYZ"]},{"time":74.28279500000644,"pos":[219.32017521499753,172,125.51681150275193],"rot":[1.7110501947889776,-1.1945728970390634,1.7214439766638943,"XYZ"]},{"time":74.38286000001244,"pos":[214.85691481422745,172,126.72633305628652],"rot":[1.7265371598490618,-1.1936595464874062,1.738098526641998,"XYZ"]},{"time":74.49956500000553,"pos":[210.60183969501412,172,127.13858197000147],"rot":[2.146548016114775,-1.1221714169725827,2.1950835128220816,"XYZ"]},{"time":74.59940999996616,"pos":[206.8771433068538,172,126.73830745865804],"rot":[2.4814941182422707,-0.9356553578832632,2.5830779795405574,"XYZ"]},{"time":74.71624999999767,"pos":[200.35888975630814,172,124.60242614355955],"rot":[2.6504101560511795,-0.6857711078840162,2.814982942577082,"XYZ"]},{"time":74.81606499996269,"pos":[193.64136260186322,172,120.83854235569748],"rot":[2.717602893563526,-0.47931902972426615,2.936364364259113,"XYZ"]},{"time":74.93275500001619,"pos":[185.99950741658276,172,114.28145069313229],"rot":[2.7543908564276913,-0.25864257043657174,3.0376691627742236,"XYZ"]},{"time":75.03265499998815,"pos":[181.11855150353304,172,107.38630568260663],"rot":[2.7663468731577945,-0.08935150443377765,3.1064574402682616,"XYZ"]},{"time":75.13273999997182,"pos":[177.86465104257792,172,99.42784324076872],"rot":[2.7672112887049645,0.05998094208360418,-3.1180438886841833,"XYZ"]},{"time":75.24949499999639,"pos":[175.4027739567143,172,88.81594974230886],"rot":[2.759243345589467,0.20826097604006497,-3.058637622925432,"XYZ"]},{"time":75.36609999998473,"pos":[174.640518121955,172,77.47702373236649],"rot":[2.7439484950184294,0.3403104388661906,-3.002306602860599,"XYZ"]},{"time":75.46626499999547,"pos":[175.41642435603134,172,67.50775090442934],"rot":[2.7173642196940224,0.48033482829060475,-2.9358473352948993,"XYZ"]},{"time":75.56603499996709,"pos":[177.57701304007563,172,57.68413998573675],"rot":[2.6756123448951628,0.6224299741081905,-2.8563790561555025,"XYZ"]},{"time":75.66613999998663,"pos":[181.1268330654833,172,48.23569281525088],"rot":[2.6212092010875723,0.7463517074118531,-2.7705222437216457,"XYZ"]},{"time":75.78273500001524,"pos":[186.88777818365003,172,37.97833996056728],"rot":[2.5458247682715625,0.8625193311682602,-2.666107412340222,"XYZ"]},{"time":75.88294499996118,"pos":[193.0758478480121,172,29.92225075307432],"rot":[2.470924254805799,0.93945484212082,-2.5719850143941616,"XYZ"]},{"time":75.99934500001837,"pos":[201.50377663168064,172,21.517495303245884],"rot":[2.335938074854491,1.0298072931383109,-2.4128530295678496,"XYZ"]},{"time":76.09970500000054,"pos":[209.69413871917257,172,15.195250895931599],"rot":[2.2007556006588396,1.0931548949585719,-2.258169495970024,"XYZ"]},{"time":76.21611999999732,"pos":[220.05918495274523,172,8.996582836468619],"rot":[2.0499858945741303,1.1388965463044725,-2.0904616429716714,"XYZ"]},{"time":76.31605999998283,"pos":[229.5971647599153,172,4.580673797028394],"rot":[1.9465510820881227,1.1600329823758966,-1.977140630514224,"XYZ"]},{"time":76.43246499996167,"pos":[241.2240571277541,172,0.3922832027437535],"rot":[1.8770441611963995,1.1706248837956525,-1.9015073501816553,"XYZ"]},{"time":76.54943499999354,"pos":[253.25011674884888,172,-2.9766813810059967],"rot":[1.8503444820181676,1.175844525599049,-1.8723214564648183,"XYZ"]},{"time":76.64957999996841,"pos":[263.8235331154133,172,-5.3431024166132195],"rot":[1.6956321748652525,1.1888494315974167,-1.7052140753077933,"XYZ"]},{"time":76.76597499998752,"pos":[276.2761589864039,172,-7.310314221453045],"rot":[1.3067900825286252,1.1715223849092502,-1.2854118017911802,"XYZ"]},{"time":76.86602999997558,"pos":[287.0219534796212,172,-8.044660938203913],"rot":[1.0364250983990055,1.1195653079271606,-0.9890794545556222,"XYZ"]},{"time":76.98294000001624,"pos":[299.4252640292341,172,-7.5986166247263345],"rot":[0.8440118494372831,1.0446883224437908,-0.7715013785700388,"XYZ"]},{"time":77.09943000000203,"pos":[311.6107005884925,172,-5.747429566399596],"rot":[0.734663407389085,0.9766063069584658,-0.6425523773400934,"XYZ"]},{"time":77.21604500000831,"pos":[323.579293275295,172,-2.58631412508073],"rot":[0.6737930612941464,0.925476012209091,-0.5678111412810615,"XYZ"]},{"time":77.31602500000736,"pos":[333.64270659709575,172,1.0333770378525944],"rot":[0.6451324280132449,0.8942119415300961,-0.5306398186754968,"XYZ"]},{"time":77.43298499996308,"pos":[344.82056626286567,172,6.3154589137432655],"rot":[0.6302545288372475,0.8682404170606778,-0.508013013006946,"XYZ"]},{"time":77.54937500000233,"pos":[355.63754164414786,172,12.549230855773217],"rot":[0.6223545043236525,0.8558019545539288,-0.49649415985763923,"XYZ"]},{"time":77.66625000000931,"pos":[366.3886892308257,172,19.237151271834165],"rot":[0.6271015533783733,0.861485200086838,-0.5027653535539528,"XYZ"]},{"time":77.78283499996178,"pos":[376.5636430532639,172,26.65250170101332],"rot":[0.7058592100779415,0.9407611009304948,-0.6031071351436226,"XYZ"]},{"time":77.88298499997472,"pos":[384.6169312814439,172,33.76481564100092],"rot":[0.9156849440536979,1.0678989747213683,-0.8509103394601876,"XYZ"]},{"time":77.99950999999419,"pos":[393.4077295761477,172,42.65223396711476],"rot":[1.3350007241422508,1.166832495781872,-1.315213957304997,"XYZ"]},{"time":78.1040749999811,"pos":[400.92811806720255,172,50.54784921369404],"rot":[1.7337078421172436,1.1743619440331665,-1.7471333943519562,"XYZ"]},{"time":78.19949500000803,"pos":[408.7117149743175,172,58.17946361314048],"rot":[2.025068347078066,1.1329133013571624,-2.0653165444578594,"XYZ"]},{"time":78.31607000000076,"pos":[418.3477641136727,172,66.42256143508611],"rot":[2.233265876063621,1.0664503094667366,-2.298621435354455,"XYZ"]},{"time":78.41605499997968,"pos":[427.0858882953697,172,72.74923912206178],"rot":[2.3401147169158967,1.0131057124428104,-2.4220751264380587,"XYZ"]},{"time":78.53266999998596,"pos":[437.802700056267,172,79.2429926642006],"rot":[2.411382392483708,0.965004360842219,-2.5071251903004503,"XYZ"]},{"time":78.64957000000868,"pos":[449.01536823745005,172,84.87028044530707],"rot":[2.4427218638501556,0.9419341326383537,-2.544691768409905,"XYZ"]},{"time":78.76605999999447,"pos":[463.37081060360896,172,90.89878490609188],"rot":[2.4001798147237134,0.9720723506655771,-2.4940046385716372,"XYZ"]},{"time":78.86621499998728,"pos":[476.71043247056843,172,96.06255202554932],"rot":[2.257510267581042,1.0562196296559718,-2.326224330801785,"XYZ"]},{"time":78.96635999996215,"pos":[487.3374801735967,172,100.2086599445088],"rot":[2.0728783379165105,1.120127429377447,-2.1184665622580923,"XYZ"]},{"time":79.08272499998566,"pos":[494.43855249672583,172,102.9359637820664],"rot":[1.9616012134346759,1.1451098913224969,-1.9956172581960172,"XYZ"]},{"time":79.1995899999747,"pos":[497.82564505288224,172,103.77315333251258],"rot":[2.0411028214884173,1.1281709929411774,-2.083235792489047,"XYZ"]},{"time":79.2994399999734,"pos":[500.5156775489395,172,103.76648610426474],"rot":[2.11570210413284,1.1079791662534886,-2.166178761241005,"XYZ"]},{"time":79.41612499998882,"pos":[503.9605118707781,172,103.26072692408043],"rot":[2.1518430718416672,1.0964324159990233,-2.206684394092108,"XYZ"]},{"time":79.51604999997653,"pos":[508.63358515099685,172,102.26259092035406],"rot":[2.153056311479204,1.0960225920696873,-2.2080483664816075,"XYZ"]},{"time":79.6161500000162,"pos":[515.6917378094076,172,100.57950603850023],"rot":[2.154458782784373,1.0939275935708175,-2.21002516564804,"XYZ"]},{"time":79.71614999999292,"pos":[524.3637802214226,172,98.38312993653818],"rot":[2.154458782784373,1.0939275935708175,-2.21002516564804,"XYZ"]},{"time":79.81634999997914,"pos":[533.9603059918699,172,95.86530474285273],"rot":[2.154458782784373,1.0939275935708175,-2.21002516564804,"XYZ"]},{"time":79.9328600000008,"pos":[545.7846966517906,172,93.1660334408949],"rot":[2.1534652627729987,1.091554648068143,-2.209579035950912,"XYZ"]},{"time":80.03292999998666,"pos":[556.1966990097478,172,91.873812367762],"rot":[2.1575963852595432,1.087640051108993,-2.2148618601397234,"XYZ"]},{"time":80.13278499996522,"pos":[566.5636346042977,172,91.91170089567044],"rot":[2.1650784064805446,1.0829926935316063,-2.223829598612076,"XYZ"]},{"time":80.23282500001369,"pos":[576.7528984222366,172,93.31154149576618],"rot":[2.1740487587819133,1.0797324011155118,-2.2339931285190597,"XYZ"]},{"time":80.33285999996588,"pos":[586.860595712095,172,95.7807955070361],"rot":[2.2043066296329896,1.0732145837999945,-2.2670251497259155,"XYZ"]},{"time":80.4495899999747,"pos":[598.678234543747,172,99.5645546026068],"rot":[2.2753326711481523,1.0486463488172983,-2.3464814613565865,"XYZ"]},{"time":80.56611999997403,"pos":[610.5208991875522,172,103.79371120683776],"rot":[2.4271308783222048,0.9753238925398013,-2.5188634467112734,"XYZ"]},{"time":80.66628499998478,"pos":[620.8483167648891,172,107.24313271058763],"rot":[2.6192617332970713,0.8192909020447309,-2.7434432074347663,"XYZ"]},{"time":80.78290499997092,"pos":[634.7412910572848,172,110.6586971110735],"rot":[2.721919394652788,0.6261289809815894,-2.8858505541472104,"XYZ"]},{"time":80.88283000001684,"pos":[648.9655032734667,172,112.61043963678648],"rot":[2.760215801490933,0.4798314894278138,-2.9585466265233724,"XYZ"]},{"time":80.99928499996895,"pos":[662.8469709708805,172,113.22859490558805],"rot":[2.784550368447409,0.33420164023836313,-3.0198384603888653,"XYZ"]},{"time":81.10009999998147,"pos":[670.42828063124,172,113.27333002159313],"rot":[2.7956432244814162,0.22991184239956453,-3.059634249217021,"XYZ"]},{"time":81.21614999999292,"pos":[674.5199751570347,172,113.298884387902],"rot":[2.8136752466526933,0.07278922959762892,-3.1168566945153087,"XYZ"]},{"time":81.31634499999927,"pos":[676.2104559362028,172,113.30944215676689],"rot":[2.8354601746259567,-0.14755042773924992,3.095159062852753,"XYZ"]},{"time":81.43291999999201,"pos":[677.213904053554,172,113.31570911550517],"rot":[2.817821391714825,-0.3296012525977598,3.033400997676836,"XYZ"]},{"time":81.53301499999361,"pos":[677.6644263523282,172,113.31550636814997],"rot":[2.79722329177096,-0.3977807380626123,3.0035408513981463,"XYZ"]},{"time":81.63287999999011,"pos":[678.2757615940197,172,113.12773423675799],"rot":[2.790413665438566,-0.4335592925744024,2.9888797270755267,"XYZ"]},{"time":81.74948499997845,"pos":[679.8845959919386,172,112.38475443713801],"rot":[2.7876492936911634,-0.44945583672594996,2.982410601284765,"XYZ"]},{"time":81.86604499997338,"pos":[682.3409791823393,172,111.1066428860816],"rot":[2.7876488937873294,-0.44945808030931794,2.982409680857899,"XYZ"]},{"time":81.96618499996839,"pos":[685.5093936209082,172,108.93461151683822],"rot":[2.7876488937873294,-0.44945808030931794,2.982409680857899,"XYZ"]},{"time":82.08279999997467,"pos":[691.0849165117819,172,103.80058294807071],"rot":[2.7876488937873294,-0.44945808030931794,2.982409680857899,"XYZ"]},{"time":82.19948999996996,"pos":[697.1554168680044,172,96.16672158030543],"rot":[2.7876488937873294,-0.44945808030931794,2.982409680857899,"XYZ"]},{"time":82.29963500000304,"pos":[702.1378731030293,172,88.10503078611686],"rot":[2.7876488937873294,-0.44945808030931794,2.982409680857899,"XYZ"]},{"time":82.39975499996217,"pos":[706.7211180824623,172,79.14291446332939],"rot":[2.7876488937873294,-0.44945808030931794,2.982409680857899,"XYZ"]},{"time":82.51607499999227,"pos":[711.0288409495497,172,67.9209380533824],"rot":[2.7876488937873294,-0.44945808030931794,2.982409680857899,"XYZ"]},{"time":82.63283999997657,"pos":[713.5444305037786,172,56.29879852705987],"rot":[2.7876488937873294,-0.44945808030931794,2.982409680857899,"XYZ"]},{"time":82.73282999999356,"pos":[713.8749307199656,172,46.35664341033378],"rot":[2.7876488937873294,-0.44945808030931794,2.982409680857899,"XYZ"]},{"time":82.83282999997027,"pos":[712.7189805778521,172,36.437788335503704],"rot":[2.7876488937873294,-0.44945808030931794,2.982409680857899,"XYZ"]},{"time":82.93297500000335,"pos":[710.3862575573283,172,26.48225138902753],"rot":[2.7876488937873294,-0.44945808030931794,2.982409680857899,"XYZ"]},{"time":83.04976500000339,"pos":[706.0090163439676,172,15.552523121807466],"rot":[2.786367198347815,-0.4476635649409938,2.9823771604081606,"XYZ"]},{"time":83.14955500001088,"pos":[700.7205996012455,172,7.155392867800587],"rot":[2.782203089159509,-0.4412542766253058,2.9824944824397313,"XYZ"]},{"time":83.26638499996625,"pos":[692.98931978194,172,-1.1807374796106185],"rot":[2.777984773235544,-0.43101891861052655,2.9839290097220235,"XYZ"]},{"time":83.36644499999238,"pos":[685.1492971715797,172,-7.379859978099779],"rot":[2.7768901617171013,-0.40262062249975294,2.993100191204543,"XYZ"]},{"time":83.48286499996902,"pos":[675.0419764618299,172,-13.91905515100562],"rot":[2.7785859303760763,-0.35744506952333255,3.0094679249749916,"XYZ"]},{"time":83.59954999998445,"pos":[664.2783055526407,172,-20.107191572550196],"rot":[2.78112995345808,-0.29298278651244375,3.03315845820697,"XYZ"]},{"time":83.71610499999952,"pos":[653.2574454601175,172,-26.324237783633997],"rot":[2.787683291616336,-0.18151177711794517,3.0749966490117564,"XYZ"]},{"time":83.83288000000175,"pos":[642.4101363014861,172,-32.90050731624001],"rot":[2.7922777320559264,-0.08983417405958152,3.1089259660488913,"XYZ"]},{"time":83.94946999999229,"pos":[631.8424617960742,172,-40.07656110402931],"rot":[2.793626512663376,-0.025683976354616087,3.132277718208026,"XYZ"]},{"time":84.06636499997694,"pos":[621.7040710866295,172,-47.81455413884355],"rot":[2.793723548170647,0.011163327111403241,-3.137544763878185,"XYZ"]},{"time":84.1830450000125,"pos":[612.0845071993778,172,-55.981408103693205],"rot":[2.7783115919871695,0.0954477443951773,-3.105378775556626,"XYZ"]},{"time":84.28285000001779,"pos":[604.2626203346616,172,-63.575493149990486],"rot":[2.740420571442024,0.26747401877739274,-3.029950868411521,"XYZ"]},{"time":84.39958500000648,"pos":[596.3571449092955,172,-73.15558238818265],"rot":[2.689107924520989,0.49202748635098326,-2.915855412276182,"XYZ"]},{"time":84.51618999999482,"pos":[590.2500905060828,172,-83.49972321717136],"rot":[2.620275947176796,0.6860741620188274,-2.7926515889907533,"XYZ"]},{"time":84.6161500000162,"pos":[586.5806971270059,172,-92.95615829845488],"rot":[2.549273010917772,0.8154162238672984,-2.686062900229366,"XYZ"]},{"time":84.7161999999662,"pos":[584.3745990356349,172,-102.83135949668488],"rot":[2.473152888120416,0.906267206120987,-2.5853904062365,"XYZ"]},{"time":84.83311499998672,"pos":[583.5411261171416,172,-114.55570889634406],"rot":[2.3811264977791415,0.9830237971283823,-2.471943432734548,"XYZ"]},{"time":84.93330999999307,"pos":[584.1529126935436,172,-124.7900193118126],"rot":[2.3093563087037623,1.0275953254769365,-2.3869764508582616,"XYZ"]},{"time":85.04953999997815,"pos":[586.1892244375746,172,-136.72030952122634],"rot":[2.248764671983936,1.0578749770324871,-2.3168451653067317,"XYZ"]},{"time":85.14960999996401,"pos":[588.8695356918299,172,-146.9433633484672],"rot":[2.225702415315678,1.0679703054243266,-2.2904522154704954,"XYZ"]},{"time":85.26610999996774,"pos":[592.7893848725266,172,-158.76575065296925],"rot":[2.224840421445749,1.0683339035674406,-2.2894685543447717,"XYZ"]},{"time":85.36618499999167,"pos":[596.6635280279755,172,-168.91405161304678],"rot":[2.224840421445749,1.0683339035674406,-2.2894685543447717,"XYZ"]},{"time":85.48306499997852,"pos":[601.7086173624862,172,-180.5142402156456],"rot":[2.224840421445749,1.0683339035674406,-2.2894685543447717,"XYZ"]},{"time":85.58311499998672,"pos":[606.8135090190019,172,-189.9923551066339],"rot":[2.224840421445749,1.0683339035674406,-2.2894685543447717,"XYZ"]},{"time":85.68306499999017,"pos":[612.8883002072704,172,-198.62508034166748],"rot":[2.2289237904088752,1.0683388146529955,-2.2936558201568964,"XYZ"]},{"time":85.7995949999895,"pos":[621.2001658484439,172,-207.02722939508985],"rot":[2.2289237904088752,1.0683388146529955,-2.2936558201568964,"XYZ"]},{"time":85.89960499998415,"pos":[629.3547822417615,172,-213.1568335517426],"rot":[2.2289237904088752,1.0683388146529955,-2.2936558201568964,"XYZ"]},{"time":85.99964499997441,"pos":[638.2580142052802,172,-218.61365591756683],"rot":[2.2265105173210893,1.0693602342501034,-2.29090297790816,"XYZ"]},{"time":86.11641999997664,"pos":[649.204387969157,172,-224.2501371360764],"rot":[2.2265105173210893,1.0693602342501034,-2.29090297790816,"XYZ"]},{"time":86.23282500001369,"pos":[660.7456065192935,172,-228.63109696186567],"rot":[2.2265105173210893,1.069360234250103,-2.29090297790816,"XYZ"]},{"time":86.34986999997636,"pos":[672.4396761309972,172,-230.98398224216453],"rot":[2.2265105173210893,1.0693602342501034,-2.29090297790816,"XYZ"]},{"time":86.46626499999547,"pos":[684.5191412415268,172,-232.00152019067426],"rot":[2.30355300848727,1.04616633350317,-2.3756691211308034,"XYZ"]},{"time":86.56628500000807,"pos":[695.1281473019865,172,-233.17204606146868],"rot":[2.463686066487748,0.959963252097596,-2.5584982862684056,"XYZ"]},{"time":86.66615000000456,"pos":[705.4484941177086,172,-235.52155692974858],"rot":[2.5629799207952377,0.8544045460293808,-2.6838656726161845,"XYZ"]},{"time":86.78292999998666,"pos":[716.7139270448066,172,-239.7308722611904],"rot":[2.6294625199987767,0.7483400365069988,-2.7762578253122108,"XYZ"]},{"time":86.88354000000982,"pos":[726.1004461246309,172,-244.41795648475033],"rot":[2.6636745955095873,0.6748762736612264,-2.828603579886469,"XYZ"]},{"time":86.99987499997951,"pos":[737.1447122895173,172,-250.20929759746562],"rot":[2.6871350803923537,0.6127690170044784,-2.8676656149402513,"XYZ"]},{"time":87.09986999997636,"pos":[746.9625246609452,172,-254.8625524225773],"rot":[2.6978236903561847,0.5801060466430713,-2.886691766502925,"XYZ"]},{"time":87.1997899999842,"pos":[757.0275615805107,172,-258.8391032126909],"rot":[2.7017718059885096,0.5671870331629922,-2.8939665629681417,"XYZ"]},{"time":87.31659499998204,"pos":[768.9846040179522,172,-262.7133375116603],"rot":[2.699266823487691,0.5647139760680617,-2.893349027191358,"XYZ"]},{"time":87.41653499996755,"pos":[779.4756856386412,172,-265.61914027898086],"rot":[2.7000603347039305,0.560267721616103,-2.8955089932447797,"XYZ"]},{"time":87.5329250000068,"pos":[791.8940557234378,172,-268.690025408902],"rot":[2.702566098630197,0.5517081705222499,-2.90025666229201,"XYZ"]},{"time":87.6332200000179,"pos":[802.6166374467487,172,-271.1628805361545],"rot":[2.70839614459645,0.5309009887522753,-2.911570847321885,"XYZ"]},{"time":87.74958999996306,"pos":[815.0150180376671,172,-274.01411187083744],"rot":[2.7226515115414185,0.473738602474895,-2.941165713642231,"XYZ"]},{"time":87.84958999999799,"pos":[825.6922693042835,172,-276.6734109284768],"rot":[2.736911890143823,0.41222782860643836,-2.971640341070611,"XYZ"]},{"time":87.94958499999484,"pos":[836.2635827783826,172,-279.6693452416927],"rot":[2.7521517425462316,0.3467772322177764,-3.0030041945130352,"XYZ"]},{"time":88.06630000000587,"pos":[848.3223535537378,172,-283.72899985718004],"rot":[2.768417725550399,0.25827866098706853,-3.0419232077533294,"XYZ"]},{"time":88.16654000000563,"pos":[858.4498683354745,172,-287.8321059308095],"rot":[2.774287379936988,0.19333956627675594,-3.0677989392961558,"XYZ"]},{"time":88.28321500000311,"pos":[869.8317825626357,172,-293.3062408013],"rot":[2.7801476877896776,0.14233912860675293,-3.0880137097270315,"XYZ"]},{"time":88.39954000001308,"pos":[880.7279114719418,172,-299.65401379573734],"rot":[2.788786888417225,0.08610177818299848,-3.109938733038672,"XYZ"]},{"time":88.51617499999702,"pos":[890.3864904045105,172,-307.1666775522376],"rot":[2.792304974758586,0.020723961949249872,-3.134045225312051,"XYZ"]},{"time":88.61623499996495,"pos":[897.1094116968553,172,-314.6614556750773],"rot":[2.7929606863846748,-0.013414927391147125,3.1367167947517567,"XYZ"]},{"time":88.73291999998037,"pos":[902.6847363650464,172,-324.4296392656584],"rot":[2.7928605009791054,-0.027037916999714456,3.1317633874219126,"XYZ"]},{"time":88.84960999997566,"pos":[906.4306244612457,172,-335.2075934085273],"rot":[2.7928605009791054,-0.027037916999714456,3.1317633874219126,"XYZ"]},{"time":88.94971999997506,"pos":[908.6408910651655,172,-345.14248273333584],"rot":[2.7928605009791054,-0.027037916999714456,3.1317633874219126,"XYZ"]},{"time":89.06617000000551,"pos":[910.3623494197398,172,-357.257755987231],"rot":[2.7928605009791054,-0.02703791699971447,3.1317633874219126,"XYZ"]},{"time":89.16630499996245,"pos":[911.3016025610661,172,-367.9291211449468],"rot":[2.7928605009791054,-0.027037916999714456,3.1317633874219126,"XYZ"]},{"time":89.282984999998,"pos":[911.9539321830069,172,-380.5482811836322],"rot":[2.7928605009791054,-0.02703791699971447,3.1317633874219126,"XYZ"]},{"time":89.39962999999989,"pos":[912.2741557612436,172,-393.2851149472198],"rot":[2.7928605009791054,-0.027037916999714456,3.1317633874219126,"XYZ"]},{"time":89.51650500000687,"pos":[912.368684485324,172,-406.0281452269757],"rot":[2.7928605009791054,-0.027037916999714456,3.1317633874219126,"XYZ"]},{"time":89.61628499999642,"pos":[912.326896290343,172,-417.0067073426898],"rot":[2.7928605009791054,-0.027037916999714456,3.1317633874219126,"XYZ"]},{"time":89.73297499999171,"pos":[912.1796849786207,172,-429.81642835711307],"rot":[2.7928605009791054,-0.02703791699971447,3.1317633874219126,"XYZ"]},{"time":89.83309500000905,"pos":[911.9936662423984,172,-440.8490535635156],"rot":[2.7928605009791054,-0.027037916999714456,3.1317633874219126,"XYZ"]},{"time":89.94961499999044,"pos":[911.7302065438381,172,-453.679795834679],"rot":[2.7928605009791054,-0.02703791699971447,3.1317633874219126,"XYZ"]},{"time":90.06641999998828,"pos":[911.4332428770806,172,-466.4601021552536],"rot":[2.7928605009791054,-0.02703791699971447,3.1317633874219126,"XYZ"]},{"time":90.16653499996755,"pos":[911.1583652717591,172,-477.4757777933063],"rot":[2.7928605009791054,-0.02703791699971447,3.1317633874219126,"XYZ"]},{"time":90.28301000001375,"pos":[910.8236475761554,172,-490.28545334114216],"rot":[2.7928605009791054,-0.027037916999714456,3.1317633874219126,"XYZ"]},{"time":90.38322499999776,"pos":[910.5272092373243,172,-501.28477729965925],"rot":[2.7928605009791054,-0.02703791699971447,3.1317633874219126,"XYZ"]},{"time":90.48296499997377,"pos":[910.2248864968396,172,-512.2868679838497],"rot":[2.7928605009791054,-0.02703791699971447,3.1317633874219126,"XYZ"]},{"time":90.58316999999806,"pos":[909.9183667439478,172,-523.2913578084846],"rot":[2.7928605009791054,-0.02703791699971447,3.1317633874219126,"XYZ"]},{"time":90.68324499996379,"pos":[909.6090502544923,172,-534.2908914441372],"rot":[2.7928605009791054,-0.02703791699971447,3.1317633874219126,"XYZ"]},{"time":90.7828950000112,"pos":[909.295434670864,172,-545.3014263045457],"rot":[2.791446431505749,-0.030531838068275613,3.1304447972042952,"XYZ"]},{"time":90.89962999999989,"pos":[908.993992872525,172,-558.101880623481],"rot":[2.7895724629756886,-0.04431968215233827,3.1253199328727965,"XYZ"]},{"time":91.00026999996044,"pos":[909.3530072537089,172,-569.0022953269757],"rot":[2.788301859367679,-0.0941088276335775,3.1069539316192083,"XYZ"]},{"time":91.11640499997884,"pos":[910.9982268410495,172,-581.4309704976031],"rot":[2.7828304071273555,-0.19507129199556303,3.069033444053287,"XYZ"]},{"time":91.2330700000166,"pos":[913.9267657557094,172,-593.5005654750347],"rot":[2.7742846204485327,-0.30983358975237024,3.0248102016248373,"XYZ"]},{"time":91.33299999998417,"pos":[917.1064016692878,172,-603.7915800354865],"rot":[2.7647261708810276,-0.40651650332064637,2.9863540932072894,"XYZ"]},{"time":91.44954000000143,"pos":[920.9529654342139,172,-615.8782596051421],"rot":[2.748361330198104,-0.5137869796468338,2.940465551514756,"XYZ"]},{"time":91.54970999999205,"pos":[924.0006718512739,172,-626.4001148364695],"rot":[2.7281946230798964,-0.5976460863745312,2.8995876681714217,"XYZ"]},{"time":91.66635000001406,"pos":[926.9748734285316,172,-638.8706903950899],"rot":[2.7021684339704914,-0.6751409592386786,2.8558319487119816,"XYZ"]},{"time":91.78317999996943,"pos":[929.1545668724672,172,-651.2740599541643],"rot":[2.6817039982525985,-0.7298943097592808,2.822603201987336,"XYZ"]},{"time":91.88290500000585,"pos":[930.4468315594983,172,-662.1562220201429],"rot":[2.6698253295215983,-0.755627559549101,2.8050413288070586,"XYZ"]},{"time":91.9995849999832,"pos":[931.0004854050944,172,-674.6786442089277],"rot":[2.6667352246302456,-0.7619909580889251,2.8005503017095563,"XYZ"]},{"time":92.09961999999359,"pos":[930.2746513471152,172,-685.288809547532],"rot":[2.6667352246302456,-0.7619909580889251,2.8005503017095563,"XYZ"]},{"time":92.21626999997534,"pos":[927.6050791147868,172,-696.9804795528147],"rot":[2.6667352246302456,-0.7619909580889251,2.8005503017095563,"XYZ"]},{"time":92.33311499998672,"pos":[922.9275341124262,172,-707.6894743520676],"rot":[2.6667352246302456,-0.7619909580889251,2.8005503017095563,"XYZ"]},{"time":92.44971000001533,"pos":[916.7055700106627,172,-717.8421140363937],"rot":[2.6667352246302456,-0.7619909580889251,2.8005503017095563,"XYZ"]},{"time":92.54964499996277,"pos":[910.1193198843738,172,-726.1066380358629],"rot":[2.6667352246302456,-0.7619909580889251,2.8005503017095563,"XYZ"]},{"time":92.66632999997819,"pos":[901.4379778176983,172,-734.0197829638468],"rot":[2.6667352246302456,-0.7619909580889251,2.8005503017095563,"XYZ"]},{"time":92.78305999998702,"pos":[891.6774929554846,172,-739.926311289267],"rot":[2.6667352246302456,-0.7619909580889251,2.8005503017095563,"XYZ"]},{"time":92.88290999998571,"pos":[882.4727345375364,172,-743.5003373268573],"rot":[2.6667352246302456,-0.7619909580889251,2.8005503017095563,"XYZ"]},{"time":92.9995849999832,"pos":[871.0191090482759,172,-746.3340308776309],"rot":[2.6667352246302456,-0.7619909580889251,2.8005503017095563,"XYZ"]},{"time":93.09960000001593,"pos":[860.6856205383416,172,-747.9462077889614],"rot":[2.6667352246302456,-0.7619909580889251,2.8005503017095563,"XYZ"]},{"time":93.21627500001341,"pos":[848.3363126897173,172,-749.1300181146012],"rot":[2.6667352246302456,-0.7619909580889251,2.8005503017095563,"XYZ"]},{"time":93.31692999997176,"pos":[837.5314314262763,172,-749.7219796529173],"rot":[2.6667352246302456,-0.7619909580889251,2.8005503017095563,"XYZ"]},{"time":93.43297999998322,"pos":[824.8054480788347,172,-750.0695683777044],"rot":[2.6622959410190004,-0.7548969017570123,2.799478525335228,"XYZ"]},{"time":93.53278499998851,"pos":[813.8600188297473,172,-750.1995287004012],"rot":[2.667219080544788,-0.7191183436938086,2.8154321401205067,"XYZ"]},{"time":93.64971500000684,"pos":[801.080494160357,172,-750.3921825273658],"rot":[2.685646665647947,-0.6583528073481378,2.850099256286871,"XYZ"]},{"time":93.74959500000114,"pos":[790.1006373338095,172,-750.8073190056659],"rot":[2.701079129164083,-0.5686519292824104,2.892992231810184,"XYZ"]},{"time":93.86639999999898,"pos":[777.4515923681029,172,-751.9747396772458],"rot":[2.713198035266041,-0.37184420973393834,2.97716348823054,"XYZ"]},{"time":93.98291999998037,"pos":[765.2001042523058,172,-754.4448790706072],"rot":[2.7193631535079317,-0.16678356439332095,3.067149956620866,"XYZ"]},{"time":94.083180000016,"pos":[755.2587327205284,172,-757.8642893478064],"rot":[2.7244002881836065,-0.013714380181355488,3.135514579485809,"XYZ"]},{"time":94.19974000001093,"pos":[744.6067818487877,172,-763.3820852765738],"rot":[2.7201256466156325,0.13894089420241204,-3.0795806656723324,"XYZ"]},{"time":94.29993500001729,"pos":[736.3264675894075,172,-769.3768286171487],"rot":[2.7103990505636952,0.24810817034798358,-3.02909094590414,"XYZ"]},{"time":94.4163899999694,"pos":[727.7665933900622,172,-777.648991224487],"rot":[2.6957261692371377,0.3495790672782548,-2.9793270901419224,"XYZ"]},{"time":94.51647999999113,"pos":[721.3300436002702,172,-785.7018800841596],"rot":[2.682969891535618,0.414872945673152,-2.945147828854294,"XYZ"]},{"time":94.63290999998571,"pos":[714.470837407011,172,-795.916261789811],"rot":[2.670911727293751,0.4659086263132274,-2.916872484017862,"XYZ"]},{"time":94.74987499997951,"pos":[707.5632906694561,172,-806.3947870280398],"rot":[2.661914508685508,0.49928392492373086,-2.8974884657702007,"XYZ"]},{"time":94.86641999997664,"pos":[699.3808896741397,172,-816.9476755294172],"rot":[2.6543270417477145,0.5249892989078806,-2.8820066438970073,"XYZ"]},{"time":94.98297000001185,"pos":[691.3381919335825,172,-825.3946926541587],"rot":[2.6439245051372917,0.5572480182509663,-2.8618144059669195,"XYZ"]},{"time":95.08338500000536,"pos":[683.4354470410916,172,-832.791336996786],"rot":[2.638304655732078,0.5734441579000811,-2.851324311568841,"XYZ"]},{"time":95.19963499996811,"pos":[674.1347415958597,172,-841.5355301442369],"rot":[2.6379725581042393,0.5743767825137043,-2.8507126238488834,"XYZ"]},{"time":95.31640999997035,"pos":[664.2230368271349,172,-853.1828269614551],"rot":[2.6379725581042393,0.5743767825137043,-2.8507126238488834,"XYZ"]},{"time":95.4165899999789,"pos":[659.7960042423832,172,-861.4102114689331],"rot":[2.6379725581042393,0.5743767825137043,-2.8507126238488834,"XYZ"]},{"time":95.51634500001092,"pos":[658.2119774626806,172,-868.517366402407],"rot":[2.6209544931015887,0.6072896277301276,-2.825360851171759,"XYZ"]},{"time":95.63312999997288,"pos":[658.9354128269995,172,-877.2879836227648],"rot":[2.4914827027034256,0.7711831124505197,-2.6542564600864647,"XYZ"]},{"time":95.73317999998108,"pos":[661.9305805557859,172,-883.7557332939477],"rot":[2.2701298513879964,0.9277406181636506,-2.381096209252369,"XYZ"]},{"time":95.84976499999175,"pos":[667.4775493855525,172,-888.7692264205024],"rot":[1.9166535550462966,1.0460931600918135,-1.9653188027559114,"XYZ"]},{"time":95.96639999997569,"pos":[674.1849275377842,172,-890.6739202880304],"rot":[1.512288656692149,1.0787487592583669,-1.5044352213213892,"XYZ"]},{"time":96.0663099999656,"pos":[680.5198711152468,172,-889.9389345481833],"rot":[1.2194269362709673,1.0445242332297884,-1.1698176825877245,"XYZ"]},{"time":96.18305499997223,"pos":[688.0898050616044,172,-886.4797926067419],"rot":[1.0147988628979134,0.9821214365457306,-0.9291216723246849,"XYZ"]},{"time":96.29959999996936,"pos":[695.4768756544989,172,-880.4396366496671],"rot":[0.8992106093732154,0.9242233718910633,-0.7874789484668482,"XYZ"]},{"time":96.39991500001634,"pos":[701.3419440811997,172,-873.5408144783569],"rot":[0.8492844735251904,0.8916176479858311,-0.724155481522536,"XYZ"]},{"time":96.51619499997469,"pos":[707.4668435575189,172,-864.0164616413683],"rot":[0.8391184961201076,0.8864740273108832,-0.7119433691807551,"XYZ"]},{"time":96.63301499997033,"pos":[712.9394647771669,172,-853.3868159764825],"rot":[0.843521166644611,0.8896745811173685,-0.7176179368956733,"XYZ"]},{"time":96.74970499996562,"pos":[717.9138153036206,172,-842.0791413678983],"rot":[0.8504264777644053,0.8945965767163604,-0.7264888862608431,"XYZ"]},{"time":96.84966000000713,"pos":[721.9049407787411,172,-832.0495869239004],"rot":[0.8590143390611682,0.9021973989372791,-0.7381196965079758,"XYZ"]},{"time":96.94967000000179,"pos":[725.8055078209966,172,-821.8717846199303],"rot":[0.8605863112895125,0.9032657579545579,-0.740122152336706,"XYZ"]},{"time":97.06634999997914,"pos":[730.783633601988,172,-810.209882007215],"rot":[0.8623480091855145,0.90445626104675,-0.7423642930732036,"XYZ"]},{"time":97.16659999999683,"pos":[736.0662215933776,172,-801.161112061252],"rot":[0.8623480091855145,0.90445626104675,-0.7423642930732036,"XYZ"]},{"time":97.26643499999773,"pos":[742.6210483247451,172,-793.8421037141126],"rot":[0.8623480091855145,0.90445626104675,-0.7423642930732036,"XYZ"]},{"time":97.38309499999741,"pos":[751.4890708505806,172,-787.7452440090005],"rot":[0.8623480091855145,0.90445626104675,-0.7423642930732036,"XYZ"]},{"time":97.49974499997916,"pos":[761.4416731873945,172,-784.1364030587779],"rot":[0.8623480091855145,0.90445626104675,-0.7423642930732036,"XYZ"]},{"time":97.59974500001408,"pos":[770.6378717102368,172,-782.830560622612],"rot":[0.8623480091855145,0.90445626104675,-0.7423642930732036,"XYZ"]},{"time":97.71636999998009,"pos":[782.0444019078429,172,-782.8684518656305],"rot":[0.8460661702201318,0.8894399604936826,-0.720064065488698,"XYZ"]},{"time":97.83305000001565,"pos":[794.0320601711696,172,-784.0315354962879],"rot":[0.7886685469872673,0.8436958130854464,-0.6447846946706624,"XYZ"]},{"time":97.94969999999739,"pos":[806.3057820457117,172,-785.6684177090059],"rot":[0.7003747722906589,0.7500539833231997,-0.5215385294248268,"XYZ"]},{"time":98.04993999999715,"pos":[817.0810944097321,172,-786.9248441141443],"rot":[0.6323160347956895,0.6524789935561653,-0.41855897842357803,"XYZ"]},{"time":98.1663899999694,"pos":[829.7175742335794,172,-787.7318349819975],"rot":[0.5855003803007794,0.5552058972813293,-0.33623838830086705,"XYZ"]},{"time":98.2665149999666,"pos":[840.5549089809803,172,-787.6596194333665],"rot":[0.5611149772460197,0.48962943591523556,-0.28740112692935554,"XYZ"]},{"time":98.38323999999557,"pos":[852.8646070746811,172,-786.2525323395764],"rot":[0.5445475953844429,0.43581431784584757,-0.250303444273697,"XYZ"]},{"time":98.49963999999454,"pos":[864.3288806589629,172,-782.9471828119457],"rot":[0.5367929674335841,0.4070003224235453,-0.23134800224932953,"XYZ"]},{"time":98.6000350000104,"pos":[873.0617286339256,172,-778.4205687515022],"rot":[0.5354908305802871,0.401880635464392,-0.22803893773773073,"XYZ"]},{"time":98.699729999993,"pos":[880.7176679427874,172,-772.4651925286646],"rot":[0.5354908305802871,0.401880635464392,-0.22803893773773073,"XYZ"]},{"time":98.81634999997914,"pos":[888.7900044265218,172,-764.0902221375953],"rot":[0.5354908305802871,0.401880635464392,-0.22803893773773073,"XYZ"]},{"time":98.9330150000169,"pos":[896.1813203283056,172,-754.5982651323143],"rot":[0.5240637443133406,0.36046465856428184,-0.20109991065890961,"XYZ"]},{"time":99.03308500000276,"pos":[901.9439322647635,172,-745.7413239199026],"rot":[0.5057397516552656,0.27160961793494515,-0.14749023673711775,"XYZ"]},{"time":99.14968500001123,"pos":[907.724716210019,172,-734.8292686641746],"rot":[0.49528193229290135,0.1903555157117048,-0.10185495831857422,"XYZ"]},{"time":99.24960499996087,"pos":[911.8874696958691,172,-724.9859557109928],"rot":[0.4908461649034762,0.14099455132006006,-0.07496794574735755,"XYZ"]},{"time":99.36658999999054,"pos":[915.8519149738545,172,-713.1389087317468],"rot":[0.4886337062158875,0.10780546140001654,-0.057139874406635184,"XYZ"]},{"time":99.46661000000313,"pos":[918.6527905647476,172,-702.6022410210475],"rot":[0.48820774487883867,0.1001225375846926,-0.05303531993205854,"XYZ"]},{"time":99.58303500001784,"pos":[921.3253519411036,172,-690.3390323812829],"rot":[0.48820774487883867,0.1001225375846926,-0.05303531993205854,"XYZ"]},{"time":99.68306999997003,"pos":[923.3157138812873,172,-679.5936953607815],"rot":[0.48820774487883867,0.1001225375846926,-0.05303531993205854,"XYZ"]},{"time":99.79992499999935,"pos":[925.3689320385125,172,-666.9986997151076],"rot":[0.48820774487883867,0.1001225375846926,-0.05303531993205854,"XYZ"]},{"time":99.91644000000088,"pos":[927.2266484202543,172,-654.3402619302097],"rot":[0.48820774487883867,0.1001225375846926,-0.05303531993205854,"XYZ"]},{"time":100.03310000000056,"pos":[928.9521003971281,172,-641.6422157171957],"rot":[0.48820774487883867,0.1001225375846926,-0.05303531993205854,"XYZ"]},{"time":100.14980999997351,"pos":[930.5874768071923,172,-628.9254268693112],"rot":[0.48820774487883867,0.1001225375846926,-0.05303531993205854,"XYZ"]},{"time":100.25002500001574,"pos":[931.9402789382036,172,-618.0107110073402],"rot":[0.486991696014391,0.09829345371955338,-0.05191887377851072,"XYZ"]},{"time":100.36643499997444,"pos":[933.4637758241352,172,-605.2595487433041],"rot":[0.48214185354785927,0.08977813115572196,-0.046886672356759036,"XYZ"]},{"time":100.48299499996938,"pos":[934.8943806445719,172,-592.5036724598236],"rot":[0.4809130918321085,0.06855308285596641,-0.03572586013083229,"XYZ"]},{"time":100.59986999997636,"pos":[936.1670177397496,172,-579.774395839654],"rot":[0.4805516201764858,0.05757788025493826,-0.029990473118121978,"XYZ"]},{"time":100.6999599999981,"pos":[937.14550578307,172,-568.8089786819902],"rot":[0.4805516201764858,0.05757788025493826,-0.029990473118121978,"XYZ"]},{"time":100.81643000000622,"pos":[938.1907216066351,172,-556.025512099297],"rot":[0.4805516201764858,0.05757788025493826,-0.029990473118121978,"XYZ"]},{"time":100.9164499999606,"pos":[939.031743378006,172,-545.0398729594946],"rot":[0.4805516201764858,0.05757788025493826,-0.029990473118121978,"XYZ"]},{"time":101.01634500001092,"pos":[939.8315332456178,172,-534.0658169930317],"rot":[0.4784216897411732,0.04938810281176095,-0.025596983156996947,"XYZ"]},{"time":101.11665999999968,"pos":[940.5515260099488,172,-523.0895911776523],"rot":[0.47784989124915195,0.01528035968466338,-0.007912935319199612,"XYZ"]},{"time":101.23313499998767,"pos":[941.1672746443905,172,-510.275398746613],"rot":[0.4778580514656821,-0.016278830557320604,0.008430093961208144,"XYZ"]},{"time":101.34968499996467,"pos":[941.4996300787218,172,-497.48704048673915],"rot":[0.4779224045207879,-0.022659832486610472,0.011735638100542735,"XYZ"]},{"time":101.4664599999669,"pos":[941.6166095098541,172,-484.57242249450064],"rot":[0.4779224045207879,-0.022659832486610472,0.011735638100542735,"XYZ"]},{"time":101.5829500000109,"pos":[941.5870671209119,172,-471.86215108014204],"rot":[0.47794827259100464,-0.024765460086932492,0.012826637282372976,"XYZ"]},{"time":101.68335999996634,"pos":[941.458644903683,172,-460.84872499719967],"rot":[0.4784494618147581,-0.050459833135602865,0.026153501596838248,"XYZ"]},{"time":101.78317999996943,"pos":[941.1517400650608,172,-449.8212147638613],"rot":[0.48166490112521654,-0.09876852148786522,0.05149967459336789,"XYZ"]},{"time":101.89994500001194,"pos":[940.4187629318408,172,-437.0469329838626],"rot":[0.48684314608157403,-0.14568888472088407,0.07669569129525047,"XYZ"]},{"time":102.01643000001786,"pos":[939.2252822086116,172,-424.34575517722345],"rot":[0.48889058851558775,-0.16593532136818806,0.0876419917536709,"XYZ"]},{"time":102.11645500001032,"pos":[937.8849487363666,172,-413.46057926931394],"rot":[0.48897892272859267,-0.16692372458856433,0.0881752103312956,"XYZ"]},{"time":102.23301500000525,"pos":[936.0606027985573,172,-400.7786938493923],"rot":[0.48897892272859267,-0.16692372458856433,0.0881752103312956,"XYZ"]},{"time":102.34974500001408,"pos":[934.0423188337489,172,-388.1397459060429],"rot":[0.48694487556438903,-0.17583349322490702,0.09235612076526614,"XYZ"]},{"time":102.44977000000654,"pos":[932.1020132641873,172,-377.16883106065785],"rot":[0.49524403646702875,-0.24794207594714374,0.1317879328580811,"XYZ"]},{"time":102.56657500000438,"pos":[929.3766261801002,172,-364.8472850430109],"rot":[0.5182636900862506,-0.3762922585662855,0.2065665222649392,"XYZ"]},{"time":102.66653499996755,"pos":[926.3036593221266,172,-354.42321773649445],"rot":[0.5419033748133172,-0.4662570218852026,0.26430417528978994,"XYZ"]},{"time":102.7664549999754,"pos":[922.4783070764695,172,-344.31995359509745],"rot":[0.5656776516193921,-0.5363910421228564,0.31373526338797914,"XYZ"]},{"time":102.86652499996126,"pos":[917.9109895282126,172,-334.5732653823868],"rot":[0.5864555999301575,-0.5872000877830135,0.35272362593648754,"XYZ"]},{"time":102.98312499996973,"pos":[911.7406881976235,172,-323.6468650173142],"rot":[0.6017927672741701,-0.6231615441769045,0.3811990877013012,"XYZ"]},{"time":103.08363499998813,"pos":[905.8096924264793,172,-314.56591976529427],"rot":[0.6170804647709938,-0.6585533824289975,0.409638626505024,"XYZ"]},{"time":103.19973499997286,"pos":[898.2542285334854,172,-304.5064047405045],"rot":[0.6891279684333065,-0.7673914800394418,0.5195623987483182,"XYZ"]},{"time":103.29979999997886,"pos":[891.0711507053206,172,-296.44796659114206],"rot":[0.7749838800270276,-0.8578604974954226,0.6376200594819936,"XYZ"]},{"time":103.4168049999862,"pos":[881.9467475003197,172,-288.0190095260055],"rot":[0.881757807158532,-0.9361208573012579,0.774068399284573,"XYZ"]},{"time":103.51670500001637,"pos":[873.4343695625037,172,-281.5908547081727],"rot":[0.9681098092452094,-0.9818069155533624,0.8794965170152957,"XYZ"]},{"time":103.63307999999961,"pos":[862.8322229002133,172,-275.028367461334],"rot":[1.0479024953409946,-1.014281321638915,0.974407745878368,"XYZ"]},{"time":103.75028500001645,"pos":[851.7462374798238,172,-269.4094721370412],"rot":[1.0921120959761237,-1.0290892681142558,1.0262322155683101,"XYZ"]},{"time":103.8498350000009,"pos":[841.8095221677767,172,-265.1232794377424],"rot":[1.0986236594057797,-1.0311019033482225,1.0338272065886083,"XYZ"]},{"time":103.96669500001008,"pos":[829.9644927501573,172,-260.6171748866903],"rot":[1.0986236594057797,-1.0311019033482225,1.0338272065886083,"XYZ"]},{"time":104.08346499997424,"pos":[817.9660104878308,172,-256.4880429359783],"rot":[1.0986236594057797,-1.0311019033482225,1.0338272065886083,"XYZ"]},{"time":104.18342499999562,"pos":[807.5240077309546,172,-253.13022553509722],"rot":[1.0986236594057797,-1.0311019033482225,1.0338272065886083,"XYZ"]},{"time":104.29982999997446,"pos":[795.3042661298545,172,-249.3873744234629],"rot":[1.0986236594057797,-1.0311019033482225,1.0338272065886083,"XYZ"]},{"time":104.40000999998301,"pos":[784.7640233742586,172,-246.2703221208489],"rot":[1.0986236594057797,-1.0311019033482225,1.0338272065886083,"XYZ"]},{"time":104.4997849999927,"pos":[774.1470351286846,172,-243.20255576404443],"rot":[1.0986236594057797,-1.0311019033482225,1.0338272065886083,"XYZ"]},{"time":104.61648500000592,"pos":[761.8498320329543,172,-239.71196647735152],"rot":[1.0986236594057797,-1.0311019033482225,1.0338272065886083,"XYZ"]},{"time":104.71674999996321,"pos":[751.2333055335924,172,-236.73607393560619],"rot":[1.0986236594057797,-1.0311019033482225,1.0338272065886083,"XYZ"]},{"time":104.83318499999586,"pos":[738.8889737957953,172,-233.30578637700077],"rot":[1.0986236594057797,-1.0311019033482225,1.0338272065886083,"XYZ"]},{"time":104.94977000000654,"pos":[726.5169468214365,172,-229.88455149857288],"rot":[1.0903991377306164,-1.0285529105705336,1.0242327115511356,"XYZ"]},{"time":105.04988999996567,"pos":[715.9033508312875,172,-226.94032300135012],"rot":[1.082821047906406,-1.0261450704022965,1.0153791130410148,"XYZ"]},{"time":105.16641000000527,"pos":[703.574278437625,172,-223.49056140982916],"rot":[1.0767407296337537,-1.0225239341884125,1.0078128031290343,"XYZ"]},{"time":105.26662499998929,"pos":[692.8966895263671,172,-220.46683346709068],"rot":[1.0686676006121485,-1.0184911838452915,0.9979689384386988,"XYZ"]},{"time":105.38322999997763,"pos":[680.6634990177688,172,-216.9421457721719],"rot":[1.0508460560811497,-1.0122897213077109,0.9769949941977922,"XYZ"]},{"time":105.4831000000122,"pos":[670.1187878639232,172,-213.80889419909198],"rot":[0.9797927808971818,-0.9930943922536211,0.8954484884373111,"XYZ"]},{"time":105.58318499999586,"pos":[659.6689141064609,172,-210.3730857398755],"rot":[0.7144805548645996,-0.882433607386732,0.5901983482008034,"XYZ"]},{"time":105.69968499999959,"pos":[647.8594903157186,172,-205.71350578541572],"rot":[0.47236513446535466,-0.6330703677133069,0.2935533684380567,"XYZ"]},{"time":105.7998849999858,"pos":[637.9303075228439,172,-201.20223911680753],"rot":[0.3777761822180847,-0.40522194136040807,0.15518410227729837,"XYZ"]},{"time":105.90019999997457,"pos":[628.3071368860478,172,-196.16275527346346],"rot":[0.3395577214309472,-0.18625274558202243,0.06531901313569796,"XYZ"]},{"time":106.00014499999816,"pos":[619.8164230591703,172,-190.12976145000306],"rot":[0.33319803882536214,0.015367716693687765,-0.005318538619696407,"XYZ"]},{"time":106.11663000000408,"pos":[612.7107755963233,172,-181.86129774439752],"rot":[0.3420406609618445,0.22403177070890185,-0.07893316251604533,"XYZ"]},{"time":106.23320999997668,"pos":[608.9229609453827,172,-172.70015180655656],"rot":[0.3636093721521762,0.4039316691124505,-0.14846148240843818,"XYZ"]},{"time":106.34995000000345,"pos":[607.9235947284619,172,-162.86340291645075],"rot":[0.39474659912651566,0.554119186793331,-0.21580639483215172,"XYZ"]},{"time":106.46666500001447,"pos":[609.4206073213559,172,-152.6398703154567],"rot":[0.4322644522025889,0.6751214940954529,-0.2807340786875193,"XYZ"]},{"time":106.583180000016,"pos":[613.137182415915,172,-142.43952106588262],"rot":[0.47152913808846975,0.7670927103478845,-0.3401338010248746,"XYZ"]},{"time":106.68384000001242,"pos":[617.8467116507762,172,-133.91540550211357],"rot":[0.5021353714848473,0.8237551753693068,-0.38296964008494966,"XYZ"]},{"time":106.79991499998141,"pos":[624.7570703873212,172,-124.42873861523972],"rot":[0.5282349176553625,0.8647200863502345,-0.41787817334192395,"XYZ"]},{"time":106.9001500000013,"pos":[631.4219556634682,172,-116.49436314605643],"rot":[0.5384097076743664,0.8792017274624409,-0.4311678400243946,"XYZ"]},{"time":106.9997849999927,"pos":[637.7951236775245,172,-108.0761181180598],"rot":[0.53888003287952,0.8798529789977122,-0.4317783049686982,"XYZ"]},{"time":107.11654000001727,"pos":[644.7175437593495,172,-97.73042652163295],"rot":[0.53888003287952,0.8798529789977122,-0.4317783049686982,"XYZ"]},{"time":107.23345499997959,"pos":[651.3915192902186,172,-87.14698321071154],"rot":[0.53888003287952,0.8798529789977122,-0.4317783049686982,"XYZ"]},{"time":107.3332250000094,"pos":[657.2383617401334,172,-77.96037136351866],"rot":[0.53888003287952,0.8798529789977122,-0.4317783049686982,"XYZ"]},{"time":107.43316499999491,"pos":[663.6132150978547,172,-69.1934229490406],"rot":[0.53888003287952,0.8798529789977122,-0.4317783049686982,"XYZ"]},{"time":107.5331250000163,"pos":[670.6770373286904,172,-61.13065422729144],"rot":[0.53888003287952,0.8798529789977122,-0.4317783049686982,"XYZ"]},{"time":107.63325999997323,"pos":[678.2978663592222,172,-53.54151255678477],"rot":[0.53888003287952,0.8798529789977122,-0.4317783049686982,"XYZ"]},{"time":107.73323999997228,"pos":[685.4464156653912,172,-45.995627445420425],"rot":[0.53888003287952,0.8798529789977122,-0.4317783049686982,"XYZ"]},{"time":107.84993500000564,"pos":[692.4017992099908,172,-36.679341125056695],"rot":[0.5362027297079339,0.8526417304679661,-0.4207773192516647,"XYZ"]},{"time":107.96648499998264,"pos":[698.597986739502,172,-26.754054298537415],"rot":[0.48080004362046413,0.7138156845232259,-0.3291019701465111,"XYZ"]},{"time":108.08310499996878,"pos":[704.3003697413158,172,-16.104525777546947],"rot":[0.40149213737695844,0.4583759960510184,-0.1856971801817699,"XYZ"]},{"time":108.18326499999966,"pos":[709.606559358382,172,-7.239480941404567],"rot":[0.3659282262630502,0.16773288181421658,-0.06388491710116048,"XYZ"]},{"time":108.28342499997234,"pos":[715.8435162512599,172,1.0779023241828611],"rot":[0.3627983922317964,-0.1087707187668033,0.041184814056991724,"XYZ"]},{"time":108.39989999996033,"pos":[723.1701615104587,172,11.132783734207466],"rot":[0.3937962137396598,-0.40408699766502115,0.16193538572163205,"XYZ"]},{"time":108.51647999999113,"pos":[729.3384836698491,172,21.854110231504254],"rot":[0.46546887528347014,-0.6664668058819921,0.3010755022936951,"XYZ"]},{"time":108.61667999997735,"pos":[733.0695800010695,172,31.4511988121159],"rot":[0.5717223543663983,-0.8605538485886128,0.4538636798708434,"XYZ"]},{"time":108.73329499998363,"pos":[735.2925915078027,172,42.845091049599205],"rot":[0.7593978558257094,-1.0391735117028205,0.6857931532424855,"XYZ"]},{"time":108.83329999999842,"pos":[735.3763254796066,172,52.73473012665574],"rot":[0.9002649453818755,-1.121038823311315,0.8487453516214623,"XYZ"]},{"time":108.94990499998676,"pos":[733.5359909788584,172,64.06121639786285],"rot":[1.0574724048872635,-1.1692209545900893,1.0212699892581303,"XYZ"]},{"time":109.04975499998545,"pos":[730.2383859283099,172,73.28190288586678],"rot":[1.1670757427600662,-1.1915082468153717,1.1397653595381665,"XYZ"]},{"time":109.15006000001449,"pos":[725.3619541385044,172,81.49024630165722],"rot":[1.2344052215214805,-1.2017677642835454,1.212094051935328,"XYZ"]},{"time":109.2664699999732,"pos":[717.8960604764699,172,89.20318566196428],"rot":[1.2514246559902038,-1.2039993910690767,1.2303340325140195,"XYZ"]},{"time":109.38315499998862,"pos":[708.7504309604722,172,95.10547280376993],"rot":[1.2514246559902038,-1.2039993910690767,1.2303340325140195,"XYZ"]},{"time":109.50007499998901,"pos":[698.3175913185693,172,99.75050986674707],"rot":[1.2514246559902038,-1.2039993910690767,1.2303340325140195,"XYZ"]},{"time":109.61657000001287,"pos":[686.925030778845,172,103.50474214681007],"rot":[1.2514246559902038,-1.2039993910690767,1.2303340325140195,"XYZ"]},{"time":109.73332499997923,"pos":[674.9467366013567,172,106.59139809935337],"rot":[1.2514246559902038,-1.2039993910690767,1.2303340325140195,"XYZ"]},{"time":109.83325500000501,"pos":[664.4039526937191,172,108.8477188908268],"rot":[1.2514246559902038,-1.2039993910690767,1.2303340325140195,"XYZ"]},{"time":109.94987999997102,"pos":[651.9324091316777,172,111.15261374000849],"rot":[1.2514246559902038,-1.2039993910690767,1.2303340325140195,"XYZ"]},{"time":110.05011499999091,"pos":[641.0849328108607,172,112.93894048412731],"rot":[1.2514246559902038,-1.2039993910690767,1.2303340325140195,"XYZ"]},{"time":110.16655999998329,"pos":[628.4977902755794,172,114.75174267819067],"rot":[1.2514246559902038,-1.2039993910690767,1.2303340325140195,"XYZ"]},{"time":110.28321999998298,"pos":[615.9102959508915,172,115.51213055192686],"rot":[1.2514246559902038,-1.2039993910690767,1.2303340325140195,"XYZ"]},{"time":110.38351000001421,"pos":[605.42428528782,172,114.75815035817607],"rot":[1.2514246559902038,-1.2039993910690767,1.2303340325140195,"XYZ"]},{"time":110.49968999996781,"pos":[593.2926540725636,172,112.57687554660895],"rot":[1.2486061300458338,-1.203639420550153,1.2273144519727173,"XYZ"]},{"time":110.60000500001479,"pos":[582.7355625581905,172,110.6426405589705],"rot":[1.2378469715773934,-1.2007629823124575,1.2155987514668953,"XYZ"]},{"time":110.69982999999775,"pos":[572.0117904469636,172,109.25288605409736],"rot":[1.164340590431749,-1.189523998701899,1.136589206143905,"XYZ"]},{"time":110.81659499998204,"pos":[559.4403506363183,172,107.53148732388432],"rot":[1.0101103899861938,-1.1553729873409966,0.9693403635117505,"XYZ"]},{"time":110.93353999999817,"pos":[547.0275960378634,172,105.02105597797265],"rot":[0.9150905628675874,-1.1249613844145712,0.8648026250556976,"XYZ"]},{"time":111.04997499997262,"pos":[534.9213721349632,172,101.56096446251898],"rot":[0.8774942604316442,-1.1103209485304781,0.822988043774903,"XYZ"]},{"time":111.1499499999918,"pos":[524.4592371729753,172,98.41676968735582],"rot":[0.8755410633724126,-1.1095134961975823,0.8208073137445405,"XYZ"]},{"time":111.26652499998454,"pos":[512.2333943283413,172,94.96728475298707],"rot":[0.8620140526052833,-1.1062050479691732,0.8062874846846044,"XYZ"]},{"time":111.36660000000848,"pos":[501.7802550751207,172,91.65069972538831],"rot":[0.7720999704448828,-1.0774480583068071,0.708908978477505,"XYZ"]},{"time":111.4831450000056,"pos":[489.7349233770549,172,87.44353354846777],"rot":[0.592004839170428,-0.951294877726572,0.5009202723975269,"XYZ"]},{"time":111.58314000000246,"pos":[479.40351459619245,172,83.6692193555332],"rot":[0.4856758070706446,-0.8036392368962992,0.3631380130562906,"XYZ"]},{"time":111.68329999997513,"pos":[469.163819036466,172,79.69426330798427],"rot":[0.42560909719563644,-0.6684957995248838,0.2739068886651911,"XYZ"]},{"time":111.78354999999283,"pos":[459.14282395144636,172,75.30468151413613],"rot":[0.39110403978317765,-0.5503854031929645,0.21241025848466588,"XYZ"]},{"time":111.90025999996578,"pos":[447.7037810079341,172,69.70036651912235],"rot":[0.37719175206360245,-0.45599770895815284,0.17271428188958535,"XYZ"]},{"time":112.01659000001382,"pos":[436.28033674004183,172,63.941022158856605],"rot":[0.38250906920795325,-0.47469746234933524,0.18185870560859338,"XYZ"]},{"time":112.13322999997763,"pos":[424.99847726565105,172,57.94821050169206],"rot":[0.414411475151361,-0.5957277617655335,0.24198827997715727,"XYZ"]},{"time":112.2497549999971,"pos":[414.15797102149924,172,51.33839542938015],"rot":[0.4547474580853886,-0.709331560054401,0.30829550299117797,"XYZ"]},{"time":112.35022500000196,"pos":[405.85750120678756,172,44.769408620321826],"rot":[0.48125440855652807,-0.7697238073901724,0.3485822265396272,"XYZ"]},{"time":112.4499300000025,"pos":[399.10292754764316,172,37.25300257291087],"rot":[0.4807745015931194,-0.7812296099253975,0.35198812358244314,"XYZ"]},{"time":112.54994499997701,"pos":[393.9879349572153,172,28.894492844162578],"rot":[0.47624871621295023,-0.7774164776157101,0.34718308660503344,"XYZ"]},{"time":112.66672999999719,"pos":[388.92615680063125,172,16.64540131427675],"rot":[0.47375451411617114,-0.7724640222701126,0.3436182903063879,"XYZ"]},{"time":112.76664499996696,"pos":[384.67811099878503,172,3.768957749562286],"rot":[0.4725993726978075,-0.7701432353222367,0.34196115455708764,"XYZ"]},{"time":112.88356499996735,"pos":[380.6219640972421,172,-8.613444369350269],"rot":[0.4725993726978074,-0.770143235322236,0.3419611545570875,"XYZ"]},{"time":113.00003499997547,"pos":[377.9179418221274,172,-15.34829112909186],"rot":[0.4725993726978075,-0.7701432353222367,0.34196115455708764,"XYZ"]},{"time":113.10008999996353,"pos":[376.22167882216684,172,-16.916761450260317],"rot":[0.4725993726978074,-0.770143235322236,0.3419611545570875,"XYZ"]},{"time":113.20003000000725,"pos":[373.91780777385475,172,-17.13031839322138],"rot":[0.4720605664311071,-0.7690547526807328,0.34118683787011256,"XYZ"]},{"time":113.31660999997985,"pos":[370.1162075799173,172,-16.82209347014061],"rot":[0.46933773025919073,-0.7634950855282249,0.3372603835782848,"XYZ"]},{"time":113.43322000000626,"pos":[363.2277826732978,172,-16.319218802141556],"rot":[0.4664129051735302,-0.757410522630846,0.33301691456814403,"XYZ"]},{"time":113.53323499998078,"pos":[354.9894148591539,172,-16.001566123399456],"rot":[0.46070178714540444,-0.7451787372448658,0.32465020621534335,"XYZ"]},{"time":113.65002999996068,"pos":[343.7375842415308,172,-15.741000792430928],"rot":[0.44581843234910207,-0.7146228337557909,0.30351223133073274,"XYZ"]},{"time":113.76683999999659,"pos":[331.0339285897776,172,-15.45419326850639],"rot":[0.4304850626527519,-0.6793248141734523,0.2808785726555932,"XYZ"]},{"time":113.86702999996487,"pos":[316.69983420313997,172,-15.033828635415876],"rot":[0.41824690929721137,-0.6509538811542461,0.2630830539598656,"XYZ"]},{"time":113.98326000000816,"pos":[302.7102067725219,172,-13.366352534763426],"rot":[0.40935219032352144,-0.6248666883519631,0.24855579386237728,"XYZ"]},{"time":114.10005499998806,"pos":[297.18081059328273,172,-11.221852023217565],"rot":[0.40846112864224965,-0.6220071809995,0.2470295580951958,"XYZ"]},{"time":114.21679500001483,"pos":[296.60961459019893,172,-9.411812259489704],"rot":[0.40846112864224965,-0.6220071809995,0.2470295580951958,"XYZ"]},{"time":114.3169249999919,"pos":[297.5418901272686,172,-7.732978231463032],"rot":[0.40846112864224965,-0.6220071809995,0.2470295580951958,"XYZ"]},{"time":114.43332000001101,"pos":[300.92397458019224,172,-3.841966097570393],"rot":[0.40846112864224965,-0.6220071809995,0.2470295580951958,"XYZ"]},{"time":114.53362000000197,"pos":[305.98805755055804,172,1.1735214631229598],"rot":[0.40846112864224965,-0.6220071809995,0.2470295580951958,"XYZ"]},{"time":114.65005499997642,"pos":[313.6642725303262,172,8.18256209971931],"rot":[0.40846112864224965,-0.6220071809995,0.2470295580951958,"XYZ"]},{"time":114.7666699999827,"pos":[322.49415643123723,172,15.825420293058322],"rot":[0.40846112864224965,-0.6220071809995003,0.24702955809519586,"XYZ"]},{"time":114.86736999999266,"pos":[330.58346947261816,172,22.604172680657843],"rot":[0.40846112864224965,-0.6220071809995003,0.24702955809519586,"XYZ"]},{"time":114.96659500000533,"pos":[337.8479154341642,172,28.591668313099948],"rot":[0.40846112864224965,-0.6220071809995003,0.24702955809519586,"XYZ"]},{"time":115.08337499998743,"pos":[342.9504308217071,172,32.78518669584648],"rot":[0.40846112864224965,-0.6220071809995003,0.24702955809519586,"XYZ"]},{"time":115.1999749999959,"pos":[346.02937339315014,172,35.31562537013035],"rot":[0.40846112864224965,-0.6220071809994999,0.24702955809519572,"XYZ"]},{"time":115.31690500001423,"pos":[348.07757925186337,172,36.99894982244509],"rot":[0.40846112864224965,-0.6220071809994999,0.24702955809519572,"XYZ"]},{"time":115.41687999997521,"pos":[349.3687834276228,172,38.06013005134659],"rot":[0.40846112864224965,-0.6220071809995003,0.24702955809519586,"XYZ"]},{"time":115.53329499997199,"pos":[350.5198312497845,172,39.006122338491835],"rot":[0.40846112864224965,-0.6220071809995003,0.24702955809519586,"XYZ"]},{"time":115.64993999997387,"pos":[351.517067769668,172,39.80247315155407],"rot":[0.40846112864224965,-0.6220071809994999,0.24702955809519572,"XYZ"]},{"time":115.74994499998866,"pos":[353.7636387928593,172,40.977718097604],"rot":[0.40846112864224965,-0.6220071809995003,0.24702955809519586,"XYZ"]},{"time":115.84997999999905,"pos":[356.76950390489463,172,41.78442286973371],"rot":[0.40609874447911065,-0.5983508467081134,0.23763462176933595,"XYZ"]},{"time":115.96700999996392,"pos":[362.52118695229876,172,42.425356301107904],"rot":[0.3803739713005062,-0.49673001125557753,0.18829092318218196,"XYZ"]},{"time":116.08335999998963,"pos":[372.01376450800433,172,42.20359360639189],"rot":[0.3610794246834199,-0.3926525064401304,0.143505389755732,"XYZ"]},{"time":116.18358000001172,"pos":[384.03281126751926,172,41.22448274522976],"rot":[0.3517094113520622,-0.3256375850253299,0.11686253861058359,"XYZ"]},{"time":116.29989500000374,"pos":[396.7958322610659,172,41.38276943762681],"rot":[0.34607782638740875,-0.2757223971555533,0.09785426260212438,"XYZ"]},{"time":116.4003050000174,"pos":[402.5291269855989,172,42.95662870326415],"rot":[0.34423551060243623,-0.2569409964019153,0.09085476477892754,"XYZ"]},{"time":116.51657999999588,"pos":[404.71092119669714,172,45.507571809893506],"rot":[0.3426246972395249,-0.25741849595216393,0.0905602290067039,"XYZ"]},{"time":116.61696999997366,"pos":[405.20311914037796,172,48.40612770099063],"rot":[0.3426246972395249,-0.25741849595216393,0.0905602290067039,"XYZ"]},{"time":116.71669500001008,"pos":[405.0882387767462,172,53.77502580262516],"rot":[0.3426246972395249,-0.25741849595216393,0.0905602290067039,"XYZ"]},{"time":116.83371500001522,"pos":[404.06861713252954,172,62.612481649774736],"rot":[0.34262469723952504,-0.257418495952164,0.09056022900670399,"XYZ"]},{"time":116.93338499998208,"pos":[402.55846917791916,172,71.75475447634759],"rot":[0.3426246972395249,-0.25741849595216393,0.0905602290067039,"XYZ"]},{"time":117.04999999998836,"pos":[400.9876144690374,172,83.41158911418988],"rot":[0.34262469723952504,-0.25741849595216393,0.09056022900670392,"XYZ"]},{"time":117.15041000000201,"pos":[400.62910328585866,172,93.75347075273905],"rot":[0.3426246972395249,-0.25741849595216393,0.0905602290067039,"XYZ"]},{"time":117.26659999997355,"pos":[401.8153040759905,172,105.73759213957979],"rot":[0.3426246972395249,-0.25741849595216393,0.0905602290067039,"XYZ"]},{"time":117.38357000000542,"pos":[404.6137318851073,172,117.50691637177054],"rot":[0.34262469723952504,-0.25741849595216393,0.09056022900670392,"XYZ"]},{"time":117.50015999999596,"pos":[408.5538432595391,172,129.14977809878934],"rot":[0.34262469723952504,-0.257418495952164,0.09056022900670399,"XYZ"]},{"time":117.60005999996793,"pos":[412.58731658244386,172,139.1113758197699],"rot":[0.3426246972395249,-0.25741849595216393,0.0905602290067039,"XYZ"]},{"time":117.71668499999214,"pos":[417.72061098831506,172,150.66873856208605],"rot":[0.34262469723952504,-0.257418495952164,0.09056022900670399,"XYZ"]},{"time":117.83338999998523,"pos":[422.5893902802956,172,162.3871838252738],"rot":[0.3426246972395249,-0.25741849595216393,0.0905602290067039,"XYZ"]},{"time":117.95000999997137,"pos":[426.2820178399402,172,174.38660123114965],"rot":[0.34262469723952504,-0.257418495952164,0.09056022900670399,"XYZ"]},{"time":118.06695000000764,"pos":[428.03216317465484,172,186.39700352935043],"rot":[0.3426246972395249,-0.25741849595216393,0.0905602290067039,"XYZ"]},{"time":118.18339999997988,"pos":[428.1146114764883,172,198.4913983220166],"rot":[0.34262469723952504,-0.257418495952164,0.09056022900670399,"XYZ"]},{"time":118.29990499996347,"pos":[427.05795508311775,172,210.76039901292165],"rot":[0.34262469723952504,-0.257418495952164,0.09056022900670399,"XYZ"]},{"time":118.40000999998301,"pos":[425.511436886505,172,221.39975617013096],"rot":[0.34262469723952504,-0.257418495952164,0.09056022900670399,"XYZ"]},{"time":118.51662000000942,"pos":[423.2002470039268,172,233.8149875630522],"rot":[0.3426246972395249,-0.25741849595216393,0.0905602290067039,"XYZ"]},{"time":118.61664999998175,"pos":[420.90815850891175,172,244.4855791281611],"rot":[0.3426246972395249,-0.25741849595216393,0.0905602290067039,"XYZ"]},{"time":118.71697000000859,"pos":[418.41840953571165,172,255.1548311441547],"rot":[0.3426246972395249,-0.25741849595216393,0.0905602290067039,"XYZ"]},{"time":118.83328999998048,"pos":[415.3448330186664,172,267.57513122261054],"rot":[0.3435113846265035,-0.256255959735282,0.09041378243751182,"XYZ"]},{"time":118.94998500001384,"pos":[412.1717858421396,172,280.0231583578034],"rot":[0.34973667040635636,-0.2124750493703242,0.07676312683764079,"XYZ"]},{"time":119.05003499996383,"pos":[409.5868532013562,172,290.7063873141624],"rot":[0.3482979223293238,-0.1286341505348938,0.04654482221543515,"XYZ"]},{"time":119.16688999999315,"pos":[407.05367799855054,172,303.1997811443998],"rot":[0.3485616991210371,-0.04066066749174132,0.014770916678121264,"XYZ"]},{"time":119.26670500001637,"pos":[405.42874959765663,172,314.0291440111096],"rot":[0.350801831598512,0.015371877786667048,-0.005624864651159336,"XYZ"]},{"time":119.38354999996955,"pos":[404.22036113540895,172,326.7195628703238],"rot":[0.3517527534576519,0.05535572834533882,-0.020303277319612404,"XYZ"]},{"time":119.5001700000139,"pos":[403.6659070611618,172,339.4037831858855],"rot":[0.35202349524355775,0.06735828155290699,-0.024718525749368933,"XYZ"]},{"time":119.600065000006,"pos":[403.57886197230977,172,350.35526357069904],"rot":[0.35202349524355775,0.06735828155290699,-0.024718525749368933,"XYZ"]},{"time":119.71671499998774,"pos":[403.80914438083425,172,363.11432651419983],"rot":[0.35202349524355775,0.06735828155290699,-0.024718525749368933,"XYZ"]},{"time":119.8171399999992,"pos":[404.64355948756247,172,373.9660307673249],"rot":[0.3519830487101426,0.06570560378437812,-0.024110150710668805,"XYZ"]},{"time":119.93365500000073,"pos":[407.0614446312109,172,386.05555216139896],"rot":[0.35289119894676396,0.05951242988590609,-0.021902488889584907,"XYZ"]},{"time":120.03352499997709,"pos":[410.5694752309627,172,395.79404905278597],"rot":[0.3595241662827442,0.016499851492191284,-0.006201268340455657,"XYZ"]},{"time":120.15007999999216,"pos":[416.0577770127578,172,406.5564457860679],"rot":[0.36814896703264516,-0.1242806245837033,0.04777970403053652,"XYZ"]},{"time":120.24997499998426,"pos":[421.3634306903996,172,415.8108103130238],"rot":[0.3804742776241171,-0.276240502082848,0.10865645519653598,"XYZ"]},{"time":120.36674500000663,"pos":[427.3855216355711,172,426.89875908824456],"rot":[0.408498234931189,-0.45233449247884894,0.1869731562392533,"XYZ"]},{"time":120.4833149999613,"pos":[432.55641398981464,172,438.3341648281977],"rot":[0.4481917042360291,-0.6014958124141422,0.26565741366364193,"XYZ"]},{"time":120.5835949999746,"pos":[436.39409695852476,172,448.4998674976376],"rot":[0.48900590628702445,-0.7065891799577819,0.33263360205723036,"XYZ"]},{"time":120.70006000000285,"pos":[440.65456561470063,172,460.4404515139593],"rot":[0.5394053285356221,-0.8015319788786172,0.40615144063929853,"XYZ"]},{"time":120.80038999998942,"pos":[444.71173625288907,172,470.6458488492837],"rot":[0.5804429932527293,-0.8612298262145255,0.46166190617086833,"XYZ"]},{"time":120.91694500000449,"pos":[450.3609602583634,172,481.7554144876435],"rot":[0.6122047274962933,-0.9030415779718725,0.5039033764031484,"XYZ"]},{"time":121.0167449999717,"pos":[456.32743929164724,172,490.3661997752264],"rot":[0.6239954324907993,-0.9159457449910058,0.5188431677203419,"XYZ"]},{"time":121.11689000000479,"pos":[463.8552958699049,172,498.35182465493557],"rot":[0.6243872880675506,-0.9163633336911823,0.5193371451792546,"XYZ"]},{"time":121.21694000001298,"pos":[474.0974647987516,172,507.1156393294775],"rot":[0.63046857994863,-0.9193433143842218,0.5258572955741183,"XYZ"]},{"time":121.33360499999253,"pos":[484.411615078232,172,516.197652696763],"rot":[0.6391161160922367,-0.9252348142124507,0.5357126701311152,"XYZ"]},{"time":121.44984499999555,"pos":[488.7606153496088,172,522.0878353360911],"rot":[0.6440586512811441,-0.9301927793466367,0.5418888746916553,"XYZ"]},{"time":121.55040499998722,"pos":[488.84421787861334,172,524.8386939172901],"rot":[0.6483842435841967,-0.9344490801781442,0.5472756121539686,"XYZ"]},{"time":121.65008499997202,"pos":[487.5855887373899,172,526.9569222894672],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":121.75023499998497,"pos":[484.48917205629687,172,530.0798693525612],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":121.8669349999982,"pos":[478.1571041168088,172,535.2756839711135],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":121.9668149999925,"pos":[470.9852355970659,172,540.5252963637892],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":122.08349499996984,"pos":[461.42857907716734,172,547.0347749580524],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":122.20023000001675,"pos":[451.1444974151802,172,553.684614323506],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":122.30027999996673,"pos":[441.8980811710536,172,559.0757504285139],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":122.41679499996826,"pos":[430.6339519867858,172,564.0465756833047],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":122.51719499996398,"pos":[420.6836757698502,172,566.7761495954824],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":122.63365999999223,"pos":[408.8925352304586,172,568.1415178609678],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":122.73359000001801,"pos":[398.50851886548327,172,568.119296448042],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":122.83361999999033,"pos":[387.9106885265387,172,567.2977241681507],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":122.95036999997683,"pos":[375.5763379825423,172,565.6426265091492],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":123.06711499998346,"pos":[363.14347821969415,172,563.4536419369775],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":123.18340500001796,"pos":[350.6802876055769,172,560.9056403930049],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":123.3000699999975,"pos":[338.220341541467,172,558.1286213872318],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":123.40030999999726,"pos":[327.4554548601077,172,555.8668305287702],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":123.51672499999404,"pos":[314.9203011833465,172,554.1189172687504],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":123.61689000000479,"pos":[304.3287650260884,172,553.947679312911],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":123.7335299999686,"pos":[292.34285482364675,172,555.4939550238365],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":123.85018000000855,"pos":[280.1403735005239,172,557.5974665378632],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":123.95014999998966,"pos":[269.4202581909485,172,558.8735585998718],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":124.0669699999853,"pos":[256.9964993452832,172,559.1706070233604],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":124.16681500000414,"pos":[246.31730426978183,172,558.495027624207],"rot":[0.6519692622015804,-0.9379196352246196,0.5517273731053184,"XYZ"]},{"time":124.26726499997312,"pos":[235.56233977031377,172,557.1998881267805],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":124.36708499997621,"pos":[224.82575593574876,172,555.4677363525493],"rot":[0.6519692622015805,-0.9379196352246194,0.5517273731053183,"XYZ"]},{"time":124.48406499996781,"pos":[212.4154927043468,172,553.0809505991774],"rot":[0.6519692622015805,-0.9379196352246196,0.5517273731053184,"XYZ"]},{"time":124.58405000000494,"pos":[201.6971673106233,172,550.7859572311901],"rot":[0.6519692622015805,-0.9379196352246196,0.5517273731053184,"XYZ"]},{"time":124.68401500000618,"pos":[190.98930797592357,172,548.3416406894899],"rot":[0.6519692622015805,-0.9379196352246196,0.5517273731053184,"XYZ"]},{"time":124.800270000007,"pos":[178.53715923674153,172,545.3893036805658],"rot":[0.6519692622015805,-0.9379196352246196,0.5517273731053184,"XYZ"]},{"time":124.91667999996571,"pos":[166.02793830404232,172,542.808235982522],"rot":[0.6403353250003071,-0.9264673623608284,0.5372383349036626,"XYZ"]},{"time":125.0169299999834,"pos":[155.28250265109168,172,541.5718906329738],"rot":[0.6085617982650674,-0.8921436855419543,0.4969796318380469,"XYZ"]},{"time":125.13365999999223,"pos":[143.31736523304633,172,542.0820387289161],"rot":[0.5507972971912665,-0.8129983060450977,0.419628414608332,"XYZ"]},{"time":125.23352499998873,"pos":[133.68597136230161,172,544.4223544019327],"rot":[0.5101600628267277,-0.7341983046525448,0.3586889526760636,"XYZ"]},{"time":125.3336699999636,"pos":[124.57730174468796,172,548.263996292708],"rot":[0.4800282634131391,-0.6614037669053169,0.3095164058504264,"XYZ"]},{"time":125.4503750000149,"pos":[114.61013544591209,172,554.320404860777],"rot":[0.4555414576156887,-0.5946708169875181,0.2678679665715013,"XYZ"]},{"time":125.55016499996418,"pos":[106.55557341153666,172,560.6684871543094],"rot":[0.44350507338509293,-0.5562158301437307,0.24575538922405268,"XYZ"]},{"time":125.66677000001073,"pos":[97.6345456296061,172,569.0886797955877],"rot":[0.4365195063754667,-0.5316840428128922,0.2322583926207473,"XYZ"]},{"time":125.78386999998474,"pos":[88.578202525753,172,577.6929546801529],"rot":[0.42709055157781867,-0.5186900731510884,0.22189948562270775,"XYZ"]},{"time":125.90025499998592,"pos":[78.84780143976185,172,585.5298544536997],"rot":[0.4209426169291623,-0.5103626068619614,0.2153103541517862,"XYZ"]},{"time":126.00033999996958,"pos":[69.93858144799914,172,591.5160587834878],"rot":[0.4190531265117251,-0.5091253152531768,0.21379420195495907,"XYZ"]},{"time":126.10010499996133,"pos":[60.9045313612354,172,597.5090528811514],"rot":[0.4190531265117251,-0.5091253152531768,0.21379420195495907,"XYZ"]},{"time":126.21697499998845,"pos":[51.48907971043033,172,605.3765892381616],"rot":[0.4180794803857676,-0.5115879685325568,0.21416297104534565,"XYZ"]},{"time":126.3171849999926,"pos":[44.99289850532582,172,613.1429774931556],"rot":[0.41967903011699664,-0.5179395335735305,0.21741189575478279,"XYZ"]},{"time":126.43348000000697,"pos":[39.577594167748444,172,623.154373846694],"rot":[0.42174439131593766,-0.5259652833038873,0.22155439879078773,"XYZ"]},{"time":126.55013499996858,"pos":[36.39132824267113,172,633.9285371568849],"rot":[0.4445289303217465,-0.6036836440945488,0.2640843285683066,"XYZ"]},{"time":126.65040499996394,"pos":[34.73743212048579,172,643.9448990539827],"rot":[0.5091341734103347,-0.7604563759477452,0.3672964063355434,"XYZ"]},{"time":126.76678999996511,"pos":[33.04694431628687,172,656.0079166627056],"rot":[0.6235988978284864,-0.9315488941123375,0.5235728187075537,"XYZ"]},{"time":126.88348499999847,"pos":[30.757346614694704,172,668.3191547733293],"rot":[0.8076532222702465,-1.068671351386211,0.7418417413222747,"XYZ"]},{"time":127.00022499996703,"pos":[27.398891489442214,172,680.3988868037765],"rot":[1.0555363319658295,-1.1595978502421889,1.0174045571739845,"XYZ"]},{"time":127.11689499998465,"pos":[22.69471035070017,172,691.7710225670158],"rot":[1.331182784484409,-1.2046270984992675,1.3148803342500306,"XYZ"]},{"time":127.2185649999883,"pos":[17.308672909099588,172,700.4399946683706],"rot":[1.542425170226622,-1.2154106595149998,1.5405352771198055,"XYZ"]},{"time":127.33341500000097,"pos":[9.525614961265301,172,708.5137314191184],"rot":[1.6946382148575418,-1.212695418163475,1.702932075770389,"XYZ"]},{"time":127.43352500000037,"pos":[1.7408423664903605,172,713.4164762028554],"rot":[1.7422798082357212,-1.2100321400644751,1.7538245589851522,"XYZ"]},{"time":127.53391499997815,"pos":[-6.977262221043934,172,716.8435878937361],"rot":[1.745279465262992,-1.2098343396625664,1.757030716485107,"XYZ"]},{"time":127.65021499997238,"pos":[-18.134896048108093,172,719.5090618741691],"rot":[1.7284904266797203,-1.2122807065222103,1.7390029811466412,"XYZ"]},{"time":127.76694999996107,"pos":[-30.05457914044695,172,721.1466078882711],"rot":[1.6902710760477981,-1.215964149296759,1.6981253344320366,"XYZ"]},{"time":127.86730499996338,"pos":[-40.660534943225485,172,721.9958435597487],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":127.9837449999759,"pos":[-53.164666466927684,172,722.5428358630154],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":128.08347499999218,"pos":[-64.0827339667027,172,722.7471990496318],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":128.200205000001,"pos":[-76.84056473466504,172,722.7681106423297],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":128.31680999998935,"pos":[-89.60950766782682,172,722.6287912139125],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":128.43343999999342,"pos":[-102.42045815837803,172,722.3810859768039],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":128.53336000000127,"pos":[-113.44817485952017,172,722.1087593157499],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":128.63364499999443,"pos":[-124.44767057364052,172,721.7992555155591],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":128.75015999999596,"pos":[-137.26853359522798,172,721.405154422541],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":128.86684999999125,"pos":[-150.0570362923705,172,720.9875165065603],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":128.9668899999815,"pos":[-161.05607457971925,172,720.6149168557619],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":129.0668650000007,"pos":[-172.05995435972451,172,720.2335173842124],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":129.16687000001548,"pos":[-183.0618428518835,172,719.8460502396069],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":129.2669449999812,"pos":[-194.07430828228058,172,719.4538432136859],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":129.38351499999408,"pos":[-206.85688445434738,172,718.9947650254583],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":129.48684500000672,"pos":[-217.95210479740115,172,718.6826915486345],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":129.60048999998253,"pos":[-230.51621648834006,172,719.2288943697777],"rot":[1.6699608301479276,-1.216789080898753,1.67646921548231,"XYZ"]},{"time":129.70065499999328,"pos":[-240.9328000057947,172,721.0124817869805],"rot":[1.6755193508643746,-1.217958361464161,1.682339099863795,"XYZ"]},{"time":129.81684499996481,"pos":[-252.3537294885335,172,724.7791337830371],"rot":[1.6808929134489428,-1.2177449266929041,1.6880656515124584,"XYZ"]},{"time":129.9168499999796,"pos":[-261.73190632013035,172,729.2309968774316],"rot":[1.686671536163033,-1.2175032185820427,1.6942243877912195,"XYZ"]},{"time":130.01719499996398,"pos":[-271.1529238985917,172,734.1670443122327],"rot":[1.686671536163033,-1.2175032185820427,1.6942243877912195,"XYZ"]},{"time":130.13354499998968,"pos":[-282.47728235885336,172,739.5631741643242],"rot":[1.686671536163033,-1.2175032185820427,1.6942243877912195,"XYZ"]},{"time":130.2502000000095,"pos":[-294.1784021282916,172,743.5613991729007],"rot":[1.686671536163033,-1.2175032185820427,1.6942243877912195,"XYZ"]},{"time":130.35018499998841,"pos":[-304.5241438271702,172,745.8124676734918],"rot":[1.686671536163033,-1.2175032185820427,1.6942243877912195,"XYZ"]},{"time":130.46694000001298,"pos":[-316.8013569458273,172,747.4735139032999],"rot":[1.686671536163033,-1.2175032185820427,1.6942243877912195,"XYZ"]},{"time":130.56710499996552,"pos":[-327.58080540445286,172,748.3285225123329],"rot":[1.686671536163033,-1.2175032185820427,1.6942243877912195,"XYZ"]},{"time":130.68387999996776,"pos":[-340.22871903274523,172,748.853196990069],"rot":[1.686671536163033,-1.2175032185820427,1.6942243877912195,"XYZ"]},{"time":130.8005150000099,"pos":[-352.97727412161413,172,749.0289966001044],"rot":[1.686671536163033,-1.2175032185820427,1.6942243877912195,"XYZ"]},{"time":130.91688999999315,"pos":[-365.7258141561689,172,748.9685611507765],"rot":[1.686671536163033,-1.2175032185820427,1.6942243877912195,"XYZ"]},{"time":131.0335399999749,"pos":[-378.5775895926209,172,748.7491698166834],"rot":[1.678233783266681,-1.2153395357883316,1.6853372269730664,"XYZ"]},{"time":131.15055500000017,"pos":[-391.37091556925304,172,748.4403045793878],"rot":[1.6595885072548633,-1.2155956664909553,1.6654660675236952,"XYZ"]},{"time":131.26676500000758,"pos":[-404.2440020632948,172,748.098485739289],"rot":[1.6389082125240715,-1.216198175019764,1.64341146403084,"XYZ"]},{"time":131.38361499999883,"pos":[-417.0033430113376,172,747.7703606331341],"rot":[1.6200835889439291,-1.215676391101795,1.623357680657109,"XYZ"]},{"time":131.4838849999942,"pos":[-428.00212213519603,172,747.5150672833389],"rot":[1.6037883916520106,-1.2153007894177232,1.6059870742711917,"XYZ"]},{"time":131.58350999996765,"pos":[-439.00162544792533,172,747.2989116516785],"rot":[1.5886951699233272,-1.2154433789948773,1.589887661738359,"XYZ"]},{"time":131.6837199999718,"pos":[-450.0050716305485,172,747.1233032643396],"rot":[1.5886951699233272,-1.2154433789948773,1.589887661738359,"XYZ"]},{"time":131.80017499998212,"pos":[-462.80660303522194,172,747.1923494122724],"rot":[1.591990540363006,-1.2154194709414239,1.5934026496529876,"XYZ"]},{"time":131.90058999997564,"pos":[-473.565211308561,172,748.1972522867115],"rot":[1.6049608653803569,-1.2117664649348998,1.6072856190205687,"XYZ"]},{"time":132.01688499999,"pos":[-485.4647712786351,172,750.9476757485138],"rot":[1.629431694115277,-1.2063929125964734,1.6335420260902285,"XYZ"]},{"time":132.1172249999945,"pos":[-495.07485707534937,172,754.7169285615979],"rot":[1.676326625367887,-1.2003390663671292,1.6839434051411135,"XYZ"]},{"time":132.23362499999348,"pos":[-505.8791504207925,172,760.4185872543756],"rot":[1.8357440702580903,-1.1817271594612802,1.8560422538621788,"XYZ"]},{"time":132.35021000000415,"pos":[-516.5174869002506,172,766.7834673675094],"rot":[2.138138796240586,-1.113250547449531,2.188392376857197,"XYZ"]},{"time":132.450205000001,"pos":[-526.0098024743592,172,771.9075621044807],"rot":[2.3751209473264643,-0.9969060291850091,2.461633755850135,"XYZ"]},{"time":132.5502850000048,"pos":[-535.7241336629792,172,775.5698517276534],"rot":[2.5130339647227906,-0.875745397870459,2.63241326756065,"XYZ"]},{"time":132.66696999996202,"pos":[-547.11445718335,172,777.4777979150211],"rot":[2.6035869745392013,-0.7453466954420017,2.7570302106755786,"XYZ"]},{"time":132.7835699999705,"pos":[-558.9860601474688,172,777.8507292617601],"rot":[2.6549861687674845,-0.6347054949009883,2.837626372868346,"XYZ"]},{"time":132.88396000000648,"pos":[-569.5321427870739,172,777.5350039928308],"rot":[2.68655491587027,-0.5471188241069016,2.892346218464398,"XYZ"]},{"time":133.0003049999941,"pos":[-582.0972461976849,172,776.7882474140897],"rot":[2.7152416176409426,-0.4332502546493313,2.9531661880545763,"XYZ"]},{"time":133.11695499997586,"pos":[-594.7243806779061,172,776.115970810194],"rot":[2.7372348551592802,-0.30439766836749677,3.0140277096335453,"XYZ"]},{"time":133.21876999997767,"pos":[-605.6292012314046,172,776.0029011978768],"rot":[2.7489806176949227,-0.1951373963111573,3.061467776862675,"XYZ"]},{"time":133.31682000000728,"pos":[-616.5342751492793,172,776.456903159706],"rot":[2.7543904925126204,-0.10940514945347049,3.097096873957491,"XYZ"]},{"time":133.4335650000139,"pos":[-629.2830324224509,172,777.2530929074371],"rot":[2.7555355983584335,-0.07975769952285187,3.109220554698993,"XYZ"]},{"time":133.55016499996418,"pos":[-642.0145955992414,172,778.1621715087398],"rot":[2.755275018031384,-0.08740729491460021,3.10609930481458,"XYZ"]},{"time":133.65022000001045,"pos":[-654.854291210818,172,779.1674041236756],"rot":[2.755275018031384,-0.08740729491460021,3.10609930481458,"XYZ"]},{"time":133.75043999997433,"pos":[-667.8056363990298,172,779.8649492413007],"rot":[2.755275018031384,-0.08740729491460021,3.10609930481458,"XYZ"]},{"time":133.85028499999316,"pos":[-677.3059348049497,172,779.041564146602],"rot":[2.753322115865499,-0.09323418390076574,3.1035302581031297,"XYZ"]},{"time":133.96687999996357,"pos":[-682.2574746107205,172,776.5967436125509],"rot":[2.7533241946457565,-0.11440246038064641,3.094934253599906,"XYZ"]},{"time":134.06696500000544,"pos":[-684.6600722532403,172,773.5327633089964],"rot":[2.75765956945573,-0.18551680078150407,3.0672141073406234,"XYZ"]},{"time":134.1834899999667,"pos":[-688.0165859148603,172,767.0604777379208],"rot":[2.7538373078191136,-0.2672770625145419,3.0341383641496646,"XYZ"]},{"time":134.30030999996234,"pos":[-691.9745099105523,172,757.9689849590442],"rot":[2.7470091484256938,-0.32183595609891597,3.0106283163108105,"XYZ"]},{"time":134.40032999997493,"pos":[-695.6987749359704,172,748.9216508172528],"rot":[2.743385508568324,-0.3467604933601439,2.999585171651125,"XYZ"]},{"time":134.51679999998305,"pos":[-700.2511924214953,172,737.7055366580748],"rot":[2.7425641407193004,-0.3521125164686538,2.9971861052956363,"XYZ"]},{"time":134.6336049999809,"pos":[-704.9447729510482,172,726.0728856337372],"rot":[2.7425641407193004,-0.3521125164686538,2.9971861052956363,"XYZ"]},{"time":134.7502600000007,"pos":[-709.4434188704174,172,714.2418160840846],"rot":[2.7425641407193004,-0.3521125164686538,2.9971861052956363,"XYZ"]},{"time":134.85036499996204,"pos":[-712.3962647589781,172,703.8745519167036],"rot":[2.734809531044362,-0.3982976958223899,2.9760317624401824,"XYZ"]},{"time":134.96718999999575,"pos":[-714.4785751581265,172,691.7203645380253],"rot":[2.6907918715185892,-0.5789498367211048,2.8826946947444534,"XYZ"]},{"time":135.08354500000132,"pos":[-715.6342098859741,172,679.2522709310576],"rot":[2.6175292490350994,-0.7610675260355368,2.7622740104744277,"XYZ"]},{"time":135.20026999997208,"pos":[-716.7433859356712,172,666.6479902500647],"rot":[2.5122037956923355,-0.9077183032777201,2.620601310284751,"XYZ"]},{"time":135.3006699999678,"pos":[-718.2102507004739,172,655.8474348988852],"rot":[2.398345903742025,-1.0057347870333153,2.4815345001279363,"XYZ"]},{"time":135.40045000001555,"pos":[-720.3998648919967,172,645.1982866887641],"rot":[2.26857374379293,-1.0782596489089493,2.3314035043994576,"XYZ"]},{"time":135.51679999998305,"pos":[-724.0229036942081,172,633.319736884568],"rot":[2.1167031220209362,-1.132981650838437,2.1616223366049234,"XYZ"]},{"time":135.61741499998607,"pos":[-728.4094643371635,172,623.9038680774768],"rot":[1.989011915172145,-1.1630787760243826,2.021657784351725,"XYZ"]},{"time":135.71695999999065,"pos":[-734.0644903674199,172,617.0242777984389],"rot":[1.8327115231376205,-1.1862538488023084,1.8523092291210486,"XYZ"]},{"time":135.81695999996737,"pos":[-740.9764842495658,172,612.0636378513444],"rot":[1.4914692862700658,-1.2050724354992088,1.4858775517617684,"XYZ"]},{"time":135.93358499999158,"pos":[-750.4692782198997,172,608.1481653991368],"rot":[1.0583001182786025,-1.151657567137673,1.0187255689718586,"XYZ"]},{"time":136.0338899999624,"pos":[-759.515390122815,172,606.4196219149354],"rot":[0.8348767917132867,-1.0718254753716354,0.7699488517408034,"XYZ"]},{"time":136.1505499999621,"pos":[-770.5655706771141,172,606.3349294185899],"rot":[0.68711655820433,-0.9774125893892791,0.59733958082723,"XYZ"]},{"time":136.266959999979,"pos":[-781.8473033856145,172,608.1900605511553],"rot":[0.6046831591388564,-0.8970750319860219,0.49516950619043665,"XYZ"]},{"time":136.38355999998748,"pos":[-793.0607928341735,172,611.750755048458],"rot":[0.5589453155041757,-0.8381325500095903,0.43524112348298366,"XYZ"]},{"time":136.48365000000922,"pos":[-802.517363276481,172,615.9470893033543],"rot":[0.5385957765973928,-0.807245346397215,0.4074824216462933,"XYZ"]},{"time":136.60028999997303,"pos":[-813.2634300262085,172,621.8611859099162],"rot":[0.530934762927515,-0.7947087224489204,0.3968132865208964,"XYZ"]},{"time":136.70020999998087,"pos":[-822.3125168477054,172,627.6022242193765],"rot":[0.530934762927515,-0.7947087224489204,0.3968132865208964,"XYZ"]},{"time":136.81703999999445,"pos":[-832.6627891435024,172,634.8026579181343],"rot":[0.5309347629275156,-0.794708722448921,0.3968132865208973,"XYZ"]},{"time":136.93358499999158,"pos":[-842.8968210213848,172,642.4067058461239],"rot":[0.530934762927515,-0.7947087224489204,0.3968132865208964,"XYZ"]},{"time":137.03366499999538,"pos":[-851.5833987963257,172,649.1312884894094],"rot":[0.530934762927515,-0.7947087224489204,0.3968132865208964,"XYZ"]},{"time":137.15084499999648,"pos":[-861.7559362808424,172,656.7286413419076],"rot":[0.530934762927515,-0.7947087224489204,0.3968132865208964,"XYZ"]},{"time":137.26689500000793,"pos":[-871.8267817684023,172,664.5521971043437],"rot":[0.5327939829391367,-0.7978005091839931,0.39941453037749364,"XYZ"]},{"time":137.3836499999743,"pos":[-881.7479090048505,172,672.5115018329559],"rot":[0.5436769521305287,-0.8039282507460654,0.4105193277910258,"XYZ"]},{"time":137.50026499998057,"pos":[-891.0969127224614,172,681.0442356191281],"rot":[0.5762960672512878,-0.8392327922003693,0.45044275448347176,"XYZ"]},{"time":137.60060000000522,"pos":[-898.1939637632408,172,689.0729509047511],"rot":[0.6424916675701067,-0.9044119241999312,0.5317776722783936,"XYZ"]},{"time":137.71704000001773,"pos":[-905.5027216138653,172,698.9078769801959],"rot":[0.8581229799365016,-1.0303315759185379,0.7814960561201186,"XYZ"]},{"time":137.81708499998786,"pos":[-912.344643368743,172,705.1548202921172],"rot":[1.136198382240922,-1.1166288706274439,1.0939857408323608,"XYZ"]},{"time":137.93368499999633,"pos":[-921.0508253882424,172,711.7867918285135],"rot":[1.4999331939003253,-1.1603822508814843,1.493539910460396,"XYZ"]},{"time":138.03417499997886,"pos":[-928.8716625315534,172,718.3549532696499],"rot":[1.7831753307281122,-1.151481083136994,1.8026345144263327,"XYZ"]},{"time":138.15036999998847,"pos":[-938.4116637368492,172,726.2004043206044],"rot":[2.0201310818451295,-1.1131397210822145,2.0640341653062855,"XYZ"]},{"time":138.25025499996264,"pos":[-946.9996605098435,172,732.7215149714448],"rot":[2.149873384616611,-1.0752512959802596,2.209967755622564,"XYZ"]},{"time":138.36701499996707,"pos":[-957.4256094834183,172,739.8283653883436],"rot":[2.239032043840501,-1.0390434925933534,2.312298014599592,"XYZ"]},{"time":138.48349000001326,"pos":[-968.2921042111684,172,746.3872376257743],"rot":[2.2805390176335814,-1.0184534435491033,2.3607453622151873,"XYZ"]},{"time":138.58395499998005,"pos":[-977.8598934541857,172,751.6070132611236],"rot":[2.2948306390909536,-1.0107094290788212,2.3775734554490313,"XYZ"]},{"time":138.68374499998754,"pos":[-987.6373578811981,172,756.5279331259115],"rot":[2.3395010399235616,-0.9840260356571124,2.430741184200142,"XYZ"]},{"time":138.80024499999126,"pos":[-999.2313602669363,172,761.7713756533544],"rot":[2.4322061731847247,-0.9134700073892148,2.544700858678133,"XYZ"]},{"time":138.9171750000096,"pos":[-1011.0714548227311,172,766.2635670917956],"rot":[2.5161062620930386,-0.8233752009066438,2.6544595079942273,"XYZ"]},{"time":139.01701999997022,"pos":[-1021.4902831582798,172,769.3713453704588],"rot":[2.568288384968353,-0.7501436738903773,2.7269506545414703,"XYZ"]},{"time":139.1336799999699,"pos":[-1033.7617934678692,172,772.0009359651485],"rot":[2.6035097131319214,-0.6851840173782121,2.78047341271706,"XYZ"]},{"time":139.2337299999781,"pos":[-1044.4256462888247,172,773.2739835736052],"rot":[2.6202859530833837,-0.6487969275758725,2.8075865261570825,"XYZ"]},{"time":139.3505700000096,"pos":[-1056.5961606921453,172,773.1147540515692],"rot":[2.6294503494422528,-0.6297829383454676,2.821850144378481,"XYZ"]},{"time":139.45033999998122,"pos":[-1066.5931511353106,172,771.2436353999046],"rot":[2.6445528597603465,-0.596378407905956,2.845852095594695,"XYZ"]},{"time":139.5670449999743,"pos":[-1076.872452216784,172,766.9207745649232],"rot":[2.6753814537114997,-0.499833697076512,2.904934492908652,"XYZ"]},{"time":139.66733500000555,"pos":[-1084.8075542192582,172,761.5071475354125],"rot":[2.6921458238103897,-0.43221593703055305,2.942218719945052,"XYZ"]},{"time":139.7837099999888,"pos":[-1093.0610834015897,172,753.6508804669569],"rot":[2.7031715149244873,-0.3781808241905273,2.9701766871131694,"XYZ"]},{"time":139.88412999996217,"pos":[-1099.4614478009182,172,745.7852208037453],"rot":[2.707681469521756,-0.35290188413019724,2.982792381457059,"XYZ"]},{"time":140.00033499998972,"pos":[-1106.1930697652235,172,735.7139152170317],"rot":[2.708679118239715,-0.34699490176438286,2.9857022420337875,"XYZ"]},{"time":140.1007249999675,"pos":[-1112.2342232278522,172,725.262619692117],"rot":[2.708679118239715,-0.34699490176438286,2.9857022420337875,"XYZ"]},{"time":140.20038499997463,"pos":[-1118.3301066446165,172,713.8252979766299],"rot":[2.708679118239715,-0.34699490176438286,2.9857022420337875,"XYZ"]},{"time":140.31700999999885,"pos":[-1123.9219814170408,172,702.734179846131],"rot":[2.708679118239715,-0.34699490176438286,2.9857022420337875,"XYZ"]},{"time":140.41758000000846,"pos":[-1126.6376907467074,172,697.1010723257052],"rot":[2.709175725153993,-0.34400757792190384,2.9871685919223587,"XYZ"]},{"time":140.5169299999834,"pos":[-1128.4464821428337,172,693.0568458771887],"rot":[2.7080519571361314,-0.32283375124971225,2.9957733618407283,"XYZ"]},{"time":140.6337899999926,"pos":[-1130.1848902125062,172,688.6876206147524],"rot":[2.703555229811001,-0.2301995114712349,3.035124494645788,"XYZ"]},{"time":140.75030000001425,"pos":[-1132.3701182361328,172,681.8581527926576],"rot":[2.7054335294649405,-0.11993627318090333,3.085882369372835,"XYZ"]},{"time":140.85042999999132,"pos":[-1134.3602576061494,172,673.7926624420147],"rot":[2.7082674883086377,-0.04704192111798901,3.1198400845490264,"XYZ"]},{"time":140.95085999998264,"pos":[-1136.1995487551192,172,664.427109855035],"rot":[2.70877040060288,0.006187132734074039,-3.138733968601788,"XYZ"]},{"time":141.06723499996588,"pos":[-1138.7771088436607,172,652.7856729170077],"rot":[2.708351072943557,0.04303276702223078,-3.121696604022582,"XYZ"]},{"time":141.18378500000108,"pos":[-1142.430955946321,172,641.0884374151055],"rot":[2.7081238382983006,0.05322864410662851,-3.116973651704233,"XYZ"]},{"time":141.2837099999888,"pos":[-1146.1381748006502,172,630.7606761404168],"rot":[2.7081238382983006,0.05322864410662851,-3.116973651704233,"XYZ"]},{"time":141.40061999997124,"pos":[-1149.7177507935924,172,618.9488640433799],"rot":[2.7081238382983006,0.05322864410662851,-3.116973651704233,"XYZ"]},{"time":141.5169899999746,"pos":[-1152.0419600026496,172,606.7494666367667],"rot":[2.7081238382983006,0.05322864410662851,-3.116973651704233,"XYZ"]},{"time":141.61706499999855,"pos":[-1153.2255510263026,172,596.0411839703095],"rot":[2.7074709174761016,0.07515543699412057,-3.1067959948440893,"XYZ"]},{"time":141.73373500001617,"pos":[-1153.7793365099374,172,583.5135686659187],"rot":[2.7025674857868167,0.16295153404957002,-3.065557276505533,"XYZ"]},{"time":141.83373499999288,"pos":[-1153.4495555134274,172,572.7183377849952],"rot":[2.6918233561165423,0.26635817174563237,-3.0151953380538528,"XYZ"]},{"time":141.93362500000512,"pos":[-1151.8066583913878,172,559.9927412993059],"rot":[2.6617582727040694,0.43094205718135303,-2.927537765794809,"XYZ"]},{"time":142.05043499998283,"pos":[-1149.3000504188808,172,549.5122470550172],"rot":[2.623443092284252,0.5607465190593031,-2.847208470167222,"XYZ"]},{"time":142.16745999996783,"pos":[-1145.8009297752124,172,537.8001848749],"rot":[2.5600027740315032,0.7020940145828598,-2.74007057641861,"XYZ"]},{"time":142.2669449999812,"pos":[-1142.5902970529946,172,527.5012669155074],"rot":[2.4536422112269394,0.844688023370733,-2.590518270861356,"XYZ"]},{"time":142.3841549999779,"pos":[-1138.713961309356,172,515.4870922820129],"rot":[2.2451125647007557,0.999393770118703,-2.330695042469786,"XYZ"]},{"time":142.4671049999888,"pos":[-1134.4422882302442,172,505.1791416059985],"rot":[2.0010034950963336,1.0873878645428625,-2.0489416031348564,"XYZ"]},{"time":142.58417499996722,"pos":[-1129.0831507105245,172,496.2090725236041],"rot":[1.7130344557523964,1.1298929129675053,-1.7278410247238847,"XYZ"]},{"time":142.68360499996925,"pos":[-1121.4233558453157,172,488.3846568705737],"rot":[1.4222790841109976,1.1294588504627605,-1.40680781538041,"XYZ"]},{"time":142.8005000000121,"pos":[-1113.9371243356384,172,483.8909243868444],"rot":[1.2271866255053436,1.105514931748584,-1.1899761698633933,"XYZ"]},{"time":142.90069500001846,"pos":[-1105.3973411585841,172,480.83119804856653],"rot":[1.11816952464688,1.0838524340088935,-1.0677558709139623,"XYZ"]},{"time":143.01704999996582,"pos":[-1094.2480192973862,172,477.78732198833126],"rot":[1.1361926271045268,1.0920417358045391,-1.0889130787300596,"XYZ"]},{"time":143.13397999998415,"pos":[-1082.5252334179838,172,474.4284293589189],"rot":[1.1405543254095278,1.0930852984094683,-1.0938259518361477,"XYZ"]},{"time":143.25039499998093,"pos":[-1070.40160475973,172,471.45144441807645],"rot":[1.1480861928108692,1.0932906954310497,-1.1019782349718046,"XYZ"]},{"time":143.36703500000294,"pos":[-1058.1335745179483,172,469.895338010255],"rot":[1.1480861928108692,1.0932906954310497,-1.1019782349718046,"XYZ"]},{"time":143.4670749999932,"pos":[-1047.521809705421,172,469.6659125985742],"rot":[1.1480861928108692,1.0932906954310497,-1.1019782349718046,"XYZ"]},{"time":143.58370499999728,"pos":[-1035.0760507017824,172,470.2891906478523],"rot":[1.1480861928108692,1.0932906954310497,-1.1019782349718046,"XYZ"]},{"time":143.70031499996549,"pos":[-1022.5334905080609,172,471.57958524530966],"rot":[1.1480861928108692,1.0932906954310497,-1.1019782349718046,"XYZ"]},{"time":143.8004249999649,"pos":[-1011.699453216914,172,473.06005189941584],"rot":[1.1480861928108692,1.0932906954310497,-1.1019782349718046,"XYZ"]},{"time":143.91722999996273,"pos":[-999.1587021421171,172,475.0635997455561],"rot":[1.150083827205034,1.0937541620464553,-1.1042271886199015,"XYZ"]},{"time":144.01711000001524,"pos":[-988.3127221591759,172,476.96275885956686],"rot":[1.1746596075872386,1.0992146638899838,-1.1318521480454584,"XYZ"]},{"time":144.13403000001563,"pos":[-975.7305491101393,172,479.1550180030319],"rot":[1.3836039310080326,1.1301032734753158,-1.3643610501431889,"XYZ"]},{"time":144.23379500000738,"pos":[-964.8185202142266,172,480.7092783273683],"rot":[1.5995091711665617,1.1381361094125582,-1.602421649189431,"XYZ"]},{"time":144.35067000001436,"pos":[-952.1848556828434,172,481.82196358251855],"rot":[1.7891005994974474,1.1270747684849836,-1.8116539969138088,"XYZ"]},{"time":144.45051499997498,"pos":[-941.3061461771964,172,482.1124293987431],"rot":[1.8951984459367868,1.112770926120518,-1.929502840747925,"XYZ"]},{"time":144.5670299999765,"pos":[-928.6478150691452,172,481.70728327345216],"rot":[1.9598945438341864,1.1006983543581148,-2.001842625849233,"XYZ"]},{"time":144.66707500000484,"pos":[-917.7683010707394,172,480.8207363986142],"rot":[1.9717323410229615,1.0981828086790344,-2.015129236550025,"XYZ"]},{"time":144.78365499997744,"pos":[-905.127137277909,172,479.33864992639633],"rot":[1.9809112254615266,1.0961630607255528,-2.025443475837806,"XYZ"]},{"time":144.88416000001598,"pos":[-894.2534624276012,172,478.07941928863687],"rot":[2.0983344075752433,1.0643659761400117,-2.1585035497602876,"XYZ"]},{"time":144.9837749999715,"pos":[-883.3404141302319,172,477.3137868863642],"rot":[2.3312551279655316,0.953941952465821,-2.432796355260701,"XYZ"]},{"time":145.08409499999834,"pos":[-872.3964879899108,172,477.0172658930161],"rot":[2.4824404041595547,0.8201712741205124,-2.626136604219579,"XYZ"]},{"time":145.20041499997023,"pos":[-859.6773903040429,172,477.02002160009573],"rot":[2.578241773618096,0.6725008612373439,-2.7667293949783924,"XYZ"]},{"time":145.31703999999445,"pos":[-846.8953745830698,172,476.78447969046874],"rot":[2.6319939050731485,0.5426491315879254,-2.8606414878329787,"XYZ"]},{"time":145.41756999999052,"pos":[-835.9132681697441,172,475.97497876224077],"rot":[2.6594355825139444,0.4489179889968698,-2.918250221366014,"XYZ"]},{"time":145.53366499999538,"pos":[-823.2324413838122,172,474.09103396567036],"rot":[2.6799540828007573,0.35432083237886586,-2.9706704959622203,"XYZ"]},{"time":145.65023999998812,"pos":[-811.1877467884748,172,471.15423700560524],"rot":[2.7029229596362305,0.1816464331684237,-3.057042000115031,"XYZ"]},{"time":145.7503999999608,"pos":[-801.304009394665,172,467.47879834714956],"rot":[2.710624212673234,0.003982635372105012,-3.139761469899954,"XYZ"]},{"time":145.86713999998756,"pos":[-790.7704159761888,172,461.721002380805],"rot":[2.7032346541631385,-0.17799017678089218,3.0587847595020694,"XYZ"]},{"time":145.98375499999383,"pos":[-781.4425629253041,172,454.3539034756308],"rot":[2.682277815752108,-0.3222514285961717,2.9862153320064295,"XYZ"]},{"time":146.1005100000184,"pos":[-773.4320661877077,172,445.62361235570785],"rot":[2.6743750083993305,-0.35444952644553185,2.9682609320126603,"XYZ"]},{"time":146.2171850000159,"pos":[-766.5852842221599,172,435.79782738626466],"rot":[2.6830652171248803,-0.3034445682296314,2.9951515140838283,"XYZ"]},{"time":146.31718000001274,"pos":[-761.7986627157851,172,426.6431527886062],"rot":[2.68644029559,-0.27014575855615397,3.0117139552637697,"XYZ"]},{"time":146.43365500000073,"pos":[-757.9590002132289,172,415.4127808257351],"rot":[2.688286014150318,-0.2561134336497359,3.0188098401859014,"XYZ"]},{"time":146.55039499996928,"pos":[-756.3116115886212,172,403.8864046855173],"rot":[2.688286014150318,-0.2561134336497359,3.0188098401859014,"XYZ"]},{"time":146.65051499998663,"pos":[-756.2367071787493,172,393.7122557707112],"rot":[2.688286014150318,-0.2561134336497359,3.0188098401859014,"XYZ"]},{"time":146.75056000001496,"pos":[-756.9701398603977,172,383.2800753039896],"rot":[2.688286014150318,-0.2561134336497359,3.018809840185902,"XYZ"]},{"time":146.85050499998033,"pos":[-757.6735891397664,172,372.56932298141646],"rot":[2.688286014150318,-0.2561134336497359,3.0188098401859014,"XYZ"]},{"time":146.96716499998,"pos":[-757.4927864614816,172,360.18111262041856],"rot":[2.688286014150318,-0.2561134336497359,3.018809840185902,"XYZ"]},{"time":147.06709999998566,"pos":[-756.0997479529887,172,349.6895214029541],"rot":[2.688286014150318,-0.2561134336497359,3.0188098401859014,"XYZ"]},{"time":147.18390000000363,"pos":[-753.1420402146898,172,337.34734945145976],"rot":[2.6855268532111793,-0.27679181044180257,3.008331770687044,"XYZ"]},{"time":147.30040000000736,"pos":[-748.8067140793252,172,321.74663943659664],"rot":[2.6728818264767673,-0.34964064924386545,2.9698477286999814,"XYZ"]},{"time":147.40043500001775,"pos":[-745.594425586116,172,309.2487470959598],"rot":[2.6612931366672994,-0.4028141647743587,2.940129946969871,"XYZ"]},{"time":147.51712500001304,"pos":[-743.401586910345,172,298.8868961530229],"rot":[2.6527786201427426,-0.43343129652855217,2.9218236959139894,"XYZ"]},{"time":147.63393499999074,"pos":[-742.4252201448136,172,293.9377519618082],"rot":[2.6517046737061536,-0.43776419530587657,2.9192785191835866,"XYZ"]},{"time":147.7503999999608,"pos":[-741.987707995227,172,291.72002928816465],"rot":[2.6517046737061536,-0.43776419530587657,2.9192785191835866,"XYZ"]},{"time":147.86710999999195,"pos":[-741.77832121708,172,290.658660350418],"rot":[2.6517046737061536,-0.43776419530587657,2.9192785191835866,"XYZ"]},{"time":147.9838049999671,"pos":[-741.6753083665885,172,290.13649443016345],"rot":[2.6517046737061536,-0.43776419530587657,2.9192785191835866,"XYZ"]},{"time":148.08378499996616,"pos":[-741.6602816192602,172,289.85072642073885],"rot":[2.654098934221876,-0.42802025561182727,2.924985880857393,"XYZ"]},{"time":148.20042499998817,"pos":[-742.0636295171444,172,288.8011263584438],"rot":[2.679478977218901,-0.2982577523036328,2.996259941003608,"XYZ"]},{"time":148.3171849999926,"pos":[-742.6654861486809,172,286.7650270365157],"rot":[2.698659780503495,-0.04374931999982395,3.120848954639875,"XYZ"]},{"time":148.43401999998605,"pos":[-742.950093731037,172,283.655797269411],"rot":[2.6846965511450422,0.24178747302177492,-3.024426465367843,"XYZ"]},{"time":148.53382000001147,"pos":[-742.4541594171844,172,278.68151828939006],"rot":[2.642219527030132,0.4635877696979962,-2.9023437099071194,"XYZ"]},{"time":148.6341549999779,"pos":[-740.6057429307784,172,271.84572144182346],"rot":[2.5746764795966826,0.6534409227625835,-2.772326458036248,"XYZ"]},{"time":148.75044999999227,"pos":[-736.4126467419158,172,262.9803819782897],"rot":[2.4693257415593046,0.8190158348396532,-2.6149460155771904,"XYZ"]},{"time":148.85065999999642,"pos":[-731.0102057143921,172,255.7612762488212],"rot":[2.366090698985746,0.9216019919133076,-2.478570367292456,"XYZ"]},{"time":148.9672150000115,"pos":[-723.1147033128835,172,249.46994343070423],"rot":[2.2873402075052716,0.9749026007291164,-2.381694621977971,"XYZ"]},{"time":149.06848499999614,"pos":[-715.2255548917761,172,246.09208875968432],"rot":[2.288140919439498,0.9744290540687766,-2.3826622329033733,"XYZ"]},{"time":149.16719499998726,"pos":[-706.6032677614946,172,244.50486049878202],"rot":[2.2923926497028986,0.9736681611484915,-2.3872021465133155,"XYZ"]},{"time":149.2672550000134,"pos":[-697.2883784524504,172,244.3572294085612],"rot":[2.2923926497028986,0.9736681611484915,-2.3872021465133155,"XYZ"]},{"time":149.36715999996522,"pos":[-687.4813843881368,172,245.3257867925513],"rot":[2.2923926497028986,0.9736681611484915,-2.3872021465133155,"XYZ"]},{"time":149.48386500001652,"pos":[-675.6710277554793,172,247.4977180506196],"rot":[2.2998767695850484,0.971152229090395,-2.3955774117574746,"XYZ"]},{"time":149.60051499999827,"pos":[-663.7433318961589,172,249.97618328610142],"rot":[2.3308247888938642,0.9619350975468353,-2.4295915346400325,"XYZ"]},{"time":149.70075499999803,"pos":[-653.4144896148905,172,251.55104968552965],"rot":[2.454125133701271,0.8982057111623352,-2.570675663237066,"XYZ"]},{"time":149.8008999999729,"pos":[-642.9650738965702,172,252.18755654515473],"rot":[2.5473617526736856,0.816267158325937,-2.6841146819386004,"XYZ"]},{"time":149.90080499998294,"pos":[-632.812638872597,172,251.2708583172502],"rot":[2.595296730088341,0.7419969342941286,-2.751745241881594,"XYZ"]},{"time":150.01707499998156,"pos":[-621.3107484567954,172,247.78439894066503],"rot":[2.6279189897613393,0.6771812395950808,-2.8017837871847386,"XYZ"]},{"time":150.13394999998854,"pos":[-608.5313902931272,172,241.59031505068103],"rot":[2.646731377949167,0.6328067619241972,-2.8326574310622465,"XYZ"]},{"time":150.25048499996774,"pos":[-598.0816994801172,172,235.11106749073917],"rot":[2.691250156205004,0.4953589134689526,-2.9156953967765618,"XYZ"]},{"time":150.36712999996962,"pos":[-591.5461811130353,172,230.45497125036417],"rot":[2.7448937629258467,0.1653110862794779,-3.072766472190295,"XYZ"]},{"time":150.46718999999575,"pos":[-588.873884124289,172,228.52491274550945],"rot":[2.749837879011302,-0.11805368542678707,3.0929753120604015,"XYZ"]},{"time":150.5838249999797,"pos":[-587.3523490605756,172,227.42598859803576],"rot":[2.7130256507179125,-0.42174958222033915,2.9566984295514804,"XYZ"]},{"time":150.70048499997938,"pos":[-586.6172612401388,172,226.8950736190405],"rot":[2.6320829653947584,-0.6803494230208659,2.8036106523640956,"XYZ"]},{"time":150.80053499998758,"pos":[-586.2891161013011,172,226.6580717742952],"rot":[2.5334252914113407,-0.8351707236482795,2.6650957954867627,"XYZ"]},{"time":150.9171600000118,"pos":[-586.0823313991938,172,226.48648908047696],"rot":[2.423478115386869,-0.9432176655659015,2.5260185981761896,"XYZ"]},{"time":151.0173749999958,"pos":[-586.1271237257367,172,225.72203298251392],"rot":[2.338409694965918,-1.004018929516742,2.4232215884786537,"XYZ"]},{"time":151.11718999996083,"pos":[-586.7014688731255,172,223.6968998869596],"rot":[2.2843260557236738,-1.0317792776592398,2.3605283530698453,"XYZ"]},{"time":151.23378499998944,"pos":[-588.0241112831947,172,219.94162870185542],"rot":[2.3265347018681393,-0.9833387648307914,2.4181080825834003,"XYZ"]},{"time":151.33384500001557,"pos":[-589.5848930121336,172,215.30256984802443],"rot":[2.438551376831902,-0.81911666899115,2.587221551590775,"XYZ"]},{"time":151.45049499999732,"pos":[-591.5805805271874,172,206.9417726917105],"rot":[2.5407220829361705,-0.5158949656419657,2.8155360005479158,"XYZ"]},{"time":151.55041500000516,"pos":[-592.3229376925772,172,198.2300316476136],"rot":[2.576995261121475,-0.24810241598148827,2.9872948417396015,"XYZ"]},{"time":151.65058999997564,"pos":[-591.7729638849696,172,188.84130307251738],"rot":[2.5793001587495987,0.0002210862574280704,-3.1414533365878405,"XYZ"]},{"time":151.75052499998128,"pos":[-589.9892873112946,172,179.13349178928402],"rot":[2.557897153139822,0.22710994882758068,-2.9939629907718364,"XYZ"]},{"time":151.86718499998096,"pos":[-586.7211851704992,172,167.55402808457475],"rot":[2.4978879582910816,0.46306054191373425,-2.818200405964637,"XYZ"]},{"time":151.98405999998795,"pos":[-582.7875877079956,172,155.78742899466917],"rot":[2.3940970489383857,0.6614673715854439,-2.6239846872592496,"XYZ"]},{"time":152.10048500000266,"pos":[-578.5304217356851,172,143.9224769738391],"rot":[2.23762828580803,0.8267099562242245,-2.3899372267471763,"XYZ"]},{"time":152.2006200000178,"pos":[-574.6309721483744,172,133.66288283071881],"rot":[2.03928903450323,0.9379248880716782,-2.131278121454306,"XYZ"]},{"time":152.31728499999736,"pos":[-569.6069616452427,172,122.04662003015902],"rot":[1.820889768686238,1.0022156987680924,-1.8651266503123782,"XYZ"]},{"time":152.41727500001434,"pos":[-564.615510965367,172,112.41191080570647],"rot":[1.728769925880586,1.018501267542435,-1.7557788171456212,"XYZ"]},{"time":152.53380999999354,"pos":[-557.8298651139578,172,102.87835984079467],"rot":[1.6662957761599648,1.0233818316406484,-1.6825131554657824,"XYZ"]},{"time":152.65056999999797,"pos":[-549.5423213462368,172,96.42042046617621],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":152.7671449999907,"pos":[-539.7615027898161,172,91.83353928545485],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":152.86732999997912,"pos":[-530.4178993693205,172,88.93540842520119],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":152.98404000001028,"pos":[-518.8418910487843,172,86.73980155559605],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":153.10056499997154,"pos":[-507.0123458746123,172,86.3035607757137],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":153.20078000001376,"pos":[-496.88973957286134,172,87.56402648949671],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":153.317555000016,"pos":[-485.05934651183765,172,89.91051144109755],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":153.43410000001313,"pos":[-472.75908987306724,172,91.88351259788486],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":153.533844999969,"pos":[-461.9404610550972,172,92.91515830019034],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":153.65074499999173,"pos":[-449.40398124243956,172,93.55068558165117],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":153.7505699999747,"pos":[-438.4841366850986,172,93.76741547234106],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":153.86723500001244,"pos":[-425.7540470898026,172,93.75149666936946],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":153.98386500001652,"pos":[-412.95802453065363,172,93.53645175998925],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":154.08419999998296,"pos":[-401.95954244192325,172,93.24288652813942],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":154.18407999997726,"pos":[-390.9292937416,172,92.88301314677103],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":154.30056499998318,"pos":[-378.17268274605027,172,92.88669952315162],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":154.41716499999166,"pos":[-365.6859423436453,172,94.05093091277722],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":154.51743999996688,"pos":[-354.87990795634215,172,95.2039205241573],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":154.6172099999967,"pos":[-344.00413412426315,172,95.90790358111349],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":154.71725499996683,"pos":[-333.07652408240864,172,96.25548946312117],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":154.8340099999914,"pos":[-320.30798303474296,172,96.34484032278395],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":154.9342099999776,"pos":[-309.3020876745888,172,96.23152639105174],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":155.05061999999452,"pos":[-296.54431540751165,172,95.9496231406268],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":155.15071000001626,"pos":[-285.5503344450274,172,95.61623511421917],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":155.25077499996405,"pos":[-274.4021663431928,172,95.21868343729157],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":155.3674699999974,"pos":[-261.7011588962296,172,94.71489813569792],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":155.4842499999795,"pos":[-248.57636438169044,172,94.15551004986143],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":155.60048500000266,"pos":[-233.07518628917427,172,93.46704524011767],"rot":[1.650867611431243,1.0242087645113664,-1.6644493890564844,"XYZ"]},{"time":155.70056500000646,"pos":[-222.3361716329845,172,92.97920113724],"rot":[1.6508676114312422,1.0242087645113662,-1.664449389056484,"XYZ"]},{"time":155.80061500001466,"pos":[-215.41539648501072,172,92.65784301722596],"rot":[1.6508676114312422,1.0242087645113662,-1.664449389056484,"XYZ"]},{"time":155.917294999992,"pos":[-207.16455705165447,172,92.26744794247989],"rot":[1.6508676114312422,1.0242087645113662,-1.664449389056484,"XYZ"]},{"time":156.01727999997092,"pos":[-198.09920699811477,172,91.83426822458506],"rot":[1.6508676114312422,1.0242087645113662,-1.664449389056484,"XYZ"]},{"time":156.11725999996997,"pos":[-186.12059086095215,172,91.25886398646024],"rot":[1.6508676114312422,1.0242087645113662,-1.664449389056484,"XYZ"]},{"time":156.2173199999961,"pos":[-174.00008501539037,172,90.67489039989827],"rot":[1.6508676114312422,1.0242087645113662,-1.664449389056484,"XYZ"]},{"time":156.33399000001373,"pos":[-162.95992831653268,172,90.14196922281364],"rot":[1.6508676114312422,1.0242087645113662,-1.664449389056484,"XYZ"]},{"time":156.45059500000207,"pos":[-156.88098323416273,172,89.84835810265508],"rot":[1.6508676114312422,1.0242087645113662,-1.664449389056484,"XYZ"]},{"time":156.5509149999707,"pos":[-154.4708316153445,172,89.7319485436009],"rot":[1.6508676114312422,1.0242087645113662,-1.664449389056484,"XYZ"]},{"time":156.6506100000115,"pos":[-153.21125486568235,172,89.67111138593901],"rot":[1.6508676114312422,1.0242087645113662,-1.664449389056484,"XYZ"]},{"time":156.76744500000495,"pos":[-152.45488235634588,172,89.63457883354478],"rot":[1.6508676114312422,1.0242087645113662,-1.664449389056484,"XYZ"]},{"time":156.88396000000648,"pos":[-152.0758828050645,172,89.61627327537909],"rot":[1.6508676114312422,1.0242087645113662,-1.664449389056484,"XYZ"]},{"time":156.9838849999942,"pos":[-151.9044044572286,172,89.60799092554554],"rot":[1.6508676114312422,1.0242087645113662,-1.664449389056484,"XYZ"]},{"time":157.08429500000784,"pos":[-151.80761671924552,172,89.73040137295303],"rot":[1.6508676114312422,1.0242087645113662,-1.664449389056484,"XYZ"]},{"time":157.2008499999647,"pos":[-151.7075325033555,172,90.84019992988367],"rot":[1.6508676114312422,1.0242087645113662,-1.664449389056484,"XYZ"]},{"time":157.3171250000014,"pos":[-151.5608905634804,172,93.37970944132158],"rot":[1.6535399502902455,1.023010007622828,-1.667640103576452,"XYZ"]},{"time":157.43421999999555,"pos":[-151.25926987795094,172,98.90416284607971],"rot":[1.6677532165908147,1.022182410963949,-1.6842965314454967,"XYZ"]},{"time":157.55057500000112,"pos":[-151.451911711949,172,104.33290799492231],"rot":[1.8333477393327233,1.0042361051122382,-1.8791598499747466,"XYZ"]},{"time":157.6509949999745,"pos":[-152.74684176440985,172,106.71520546002353],"rot":[2.1472801736935097,0.9060355771155593,-2.2612208088549495,"XYZ"]},{"time":157.76727499999106,"pos":[-156.02834253947506,172,109.715083045979],"rot":[2.359604988098816,0.7488402005738342,-2.5470452776539703,"XYZ"]},{"time":157.8839549999684,"pos":[-160.2301818575589,172,113.36332405857938],"rot":[2.47469306776787,0.5836037477084336,-2.7323040875612694,"XYZ"]},{"time":158.00096500001382,"pos":[-162.74366518467545,172,115.57623905527586],"rot":[2.537200413958818,0.43151461674617947,-2.860402613181071,"XYZ"]},{"time":158.10190000000875,"pos":[-163.80276610289337,172,116.50869015994589],"rot":[2.5683038513330785,0.3159774832629677,-2.943598000386296,"XYZ"]},{"time":158.20063999999547,"pos":[-164.37313809983607,172,117.01085571326914],"rot":[2.5873665166908446,0.21932607360326292,-3.0077350293608354,"XYZ"]},{"time":158.3173100000131,"pos":[-164.71767567982687,172,117.31419266779025],"rot":[2.6185222865073006,0.01740307464759163,-3.131558084636703,"XYZ"]},{"time":158.41784000000916,"pos":[-164.87487784918224,172,117.45259622683784],"rot":[2.607556657367472,-0.2526285551645344,2.994846904843899,"XYZ"]},{"time":158.53394499997376,"pos":[-164.97259905295843,172,117.5386316960206],"rot":[2.5342465749870873,-0.5351264399714746,2.801000919772266,"XYZ"]},{"time":158.6342799999984,"pos":[-165.0172879845631,172,117.5779766186097],"rot":[2.4193040225407603,-0.733909611381778,2.608441225318153,"XYZ"]},{"time":158.75072000001092,"pos":[-165.04497837231668,172,117.6023557237596],"rot":[2.231240870277468,-0.8999798276819545,2.3520301853415195,"XYZ"]},{"time":158.85063999996055,"pos":[-165.0577660285234,172,117.61361420154105],"rot":[2.044421327587572,-0.9864749650942808,2.1217993720224637,"XYZ"]},{"time":158.96731500001624,"pos":[-165.065666276999,172,117.6205697194634],"rot":[1.8218474787206056,-1.0393308535113874,1.859955285097032,"XYZ"]},{"time":159.08387500001118,"pos":[-165.06974416734386,172,117.6241599659559],"rot":[1.6248363208579102,-1.0568383316091245,1.6328345751277833,"XYZ"]},{"time":159.18428499996662,"pos":[-165.0715986915743,172,117.62579272175614],"rot":[1.5218263549603506,-1.0569858630874576,1.5145800533889504,"XYZ"]},{"time":159.3008099999861,"pos":[-165.07276478039006,172,117.62681936689044],"rot":[1.5205524008392572,-1.0569501656969993,1.5131171999154422,"XYZ"]},{"time":159.4173099999898,"pos":[-165.07335799566985,172,117.62734164407239],"rot":[1.6719789006492654,-1.0547631368261994,1.6869998460620201,"XYZ"]},{"time":159.5340899999719,"pos":[-165.07365934364844,172,117.62760695614101],"rot":[1.9962113373277426,-1.001608862108648,2.06429216815844,"XYZ"]},{"time":159.63403000001563,"pos":[-165.0737974218405,172,117.62772852261358],"rot":[2.230799743077042,-0.9002515697151836,2.3514670913229647,"XYZ"]},{"time":159.75065000000177,"pos":[-165.0738841723948,172,117.62780489932972],"rot":[2.394871561267253,-0.7630396177018516,2.5725445655975396,"XYZ"]},{"time":159.86758499999996,"pos":[-165.07392823191498,172,117.62784369010741],"rot":[2.487765244864988,-0.6315489540994063,2.7167468595683157,"XYZ"]},{"time":159.9840049999766,"pos":[-165.0679543347058,172,117.62373522719989],"rot":[2.5416139891155893,-0.5167192978319778,2.815675892543296,"XYZ"]},{"time":160.08395499998005,"pos":[-164.6941567614064,172,117.39428388942119],"rot":[2.569631096985404,-0.43483681073747116,2.8767783029095275,"XYZ"]},{"time":160.18403499998385,"pos":[-163.49970367817824,172,116.7534594155299],"rot":[2.587013054119357,-0.3702122802644626,2.921119881396651,"XYZ"]},{"time":160.28395999997156,"pos":[-161.5426308991509,172,115.83050443425451],"rot":[2.5973024421460194,-0.3237512891752313,2.9513671535830768,"XYZ"]},{"time":160.38409000000684,"pos":[-158.69784981705217,172,114.63025103316424],"rot":[2.6026917159139904,-0.2957638614412769,2.9690447392559527,"XYZ"]},{"time":160.5005699999747,"pos":[-152.3380038304455,172,112.14714150296578],"rot":[2.6043544993019205,-0.2864652812825814,2.974837926821172,"XYZ"]},{"time":160.60073000000557,"pos":[-144.10374995603368,172,109.07534333428367],"rot":[2.6043544993019205,-0.2864652812825814,2.974837926821172,"XYZ"]},{"time":160.70066999999108,"pos":[-133.03312987043844,172,105.03739915907718],"rot":[2.6043544993019205,-0.2864652812825814,2.974837926821172,"XYZ"]},{"time":160.81744000001345,"pos":[-120.9777210668295,172,100.70175482085007],"rot":[2.6043544993019205,-0.2864652812825814,2.974837926821172,"XYZ"]},{"time":160.91759999998612,"pos":[-113.47956746517625,172,98.02497421352672],"rot":[2.6043544993019205,-0.2864652812825814,2.974837926821172,"XYZ"]},{"time":161.03401000000304,"pos":[-109.02715955510934,172,96.43704978586882],"rot":[2.6043544993019205,-0.2864652812825812,2.974837926821172,"XYZ"]},{"time":161.15087999997195,"pos":[-107.03364259933791,172,95.72607398693935],"rot":[2.6043544993019205,-0.28646528128258125,2.974837926821172,"XYZ"]},{"time":161.25126499996986,"pos":[-106.17035808784784,172,95.4181887725783],"rot":[2.6043544993019205,-0.28646528128258125,2.974837926821172,"XYZ"]},{"time":161.35067499999423,"pos":[-105.6999879960004,172,95.25043411622808],"rot":[2.6072162806289874,-0.2851195181056182,2.9766451290213523,"XYZ"]},{"time":161.4506200000178,"pos":[-105.43945226627291,172,95.15751561957],"rot":[2.614240776084805,-0.24242137997678545,3.002693791231109,"XYZ"]},{"time":161.5673700000043,"pos":[-105.27847601619825,172,95.10010441086463],"rot":[2.6303987463518337,-0.05301280106755599,3.1118790044319122,"XYZ"]},{"time":161.6674500000081,"pos":[-105.20465454215882,172,95.07377642738227],"rot":[2.624060462962281,0.15855076288701617,-3.05194993627394,"XYZ"]},{"time":161.78414499998325,"pos":[-105.15882957880257,172,95.05743323058186],"rot":[2.587377335845958,0.38103618920961074,-2.915367001871344,"XYZ"]},{"time":161.90061499999138,"pos":[-105.13534375620708,172,95.04905715360144],"rot":[2.5220587142334767,0.5730324203668072,-2.77261484186956,"XYZ"]},{"time":162.00066499999957,"pos":[-105.12462165309441,172,95.0452331801937],"rot":[2.450951130648474,0.7049742224277883,-2.6499276303266637,"XYZ"]},{"time":162.10081999999238,"pos":[-105.11861425518278,172,95.04309067796049],"rot":[2.371000389365076,0.8028421802227954,-2.5319803975497965,"XYZ"]},{"time":162.20068499998888,"pos":[-105.11523995605559,172,95.04188725452792],"rot":[2.2830426285611094,0.8772213664278257,-2.414005606004588,"XYZ"]},{"time":162.31731499999296,"pos":[-105.1131274616542,172,95.0411338461406],"rot":[2.1835767770437604,0.9378809523309681,-2.287900961240569,"XYZ"]},{"time":162.41761000000406,"pos":[-105.11214258749249,172,95.04078259671084],"rot":[2.110003594348094,0.9717175328222044,-2.1977928351069886,"XYZ"]},{"time":162.5340299999807,"pos":[-105.1115467220733,172,95.04057008490287],"rot":[2.055374365019533,0.9922206433407568,-2.1321112690619906,"XYZ"]},{"time":162.63403999997536,"pos":[-105.11127194111847,172,95.0404720859326],"rot":[2.036627816414625,0.998477772367254,-2.109766377386083,"XYZ"]},{"time":162.75075999996625,"pos":[-105.11110009835531,172,95.04041079924754],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":162.8506949999719,"pos":[-105.11102136112656,172,95.04038271808977],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":162.96739999996498,"pos":[-105.11097211948675,172,95.04036515635592],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":163.0840099999914,"pos":[-105.11094693999651,172,95.04035617624258],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":163.1839649999747,"pos":[-105.11093543921187,172,95.04035207455712],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":163.30074999999488,"pos":[-105.11092823248586,172,95.04034950432177],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":163.4008899999899,"pos":[-105.11092493769232,172,95.0403483292535],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":163.5006599999615,"pos":[-105.11092308678475,172,95.04034766913848],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":163.61743499996373,"pos":[-105.11092192661022,172,95.04034725536923],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":163.71736999996938,"pos":[-105.11092139645066,172,95.04034706629102],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":163.83405000000494,"pos":[-105.11092106401061,172,95.0403469477283],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":163.9340249999659,"pos":[-105.11092091206332,172,95.04034689353722],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":164.03401999996277,"pos":[-105.11092082672846,172,95.04034686310304],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":164.15069999999832,"pos":[-105.11092077323357,172,95.0403468440244],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":164.25066499999957,"pos":[-105.11092074878863,172,95.04034683530628],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":164.367425000004,"pos":[-105.11092073344557,172,95.04034682983428],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":164.48394000000553,"pos":[-105.11092072562235,172,95.04034682704417],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":164.60073499998543,"pos":[-105.11092072163547,172,95.04034682562228],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":164.7008349999669,"pos":[-105.11092071981297,172,95.0403468249723],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":164.81741000001784,"pos":[-105.11092071866933,172,95.04034682456442],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":164.91740999999456,"pos":[-105.11092071814701,172,95.04034682437813],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":165.03406500001438,"pos":[-105.11092071781907,172,95.04034682426118],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":165.13409999996657,"pos":[-105.11092071766947,172,95.04034682420783],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":165.2507999999798,"pos":[-105.11092071757564,172,95.04034682417435],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":165.35080499999458,"pos":[-105.11092071753275,172,95.04034682415906],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":165.46736999996938,"pos":[-105.11092071750586,172,95.04034682414947],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":165.56770000001416,"pos":[-105.11092071749354,172,95.04034682414508],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":165.68407000001753,"pos":[-105.11092071748583,172,95.04034682414232],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":165.80084499996156,"pos":[-105.1109207174819,172,95.04034682414093],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":165.91746999998577,"pos":[-105.1109207174799,172,95.04034682414022],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":166.03409999998985,"pos":[-105.11092071747889,172,95.04034682413985],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":166.15066499996465,"pos":[-105.11092071747836,172,95.04034682413966],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":166.25082499999553,"pos":[-105.11092071747812,172,95.04034682413958],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":166.35062499996275,"pos":[-105.110920717478,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":166.46740500000305,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":166.56747499998892,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":166.66745999996783,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":166.7841400000034,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":166.9008099999628,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":167.0008449999732,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":167.11749500001315,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":167.21753999998327,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":167.33415999996942,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":167.4508199999691,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":167.5510849999846,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":167.6511349999928,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":167.75089500000468,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":167.86753499996848,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":167.9841000000015,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":168.08415499998955,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":168.18418999999994,"pos":[-105.1109207174779,172,95.04034682413953],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":168.30069499998353,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":168.4174950000015,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":168.51737999997567,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":168.61755500000436,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":168.73416499997256,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":168.85077999997884,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":168.96750999998767,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":169.0840099999914,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":169.18416999996407,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":169.2841400000034,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":169.40075500000967,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":169.5174699999625,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":169.63419999997132,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":169.73414999997476,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":169.8506799999741,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":169.96746499999426,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":170.0841449999716,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":170.18418499996187,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":170.30080500000622,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":170.40081500000088,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":170.51743499998702,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":170.63412999996217,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":170.7341299999971,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":170.8342549999943,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":170.95100000000093,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":171.06748500000685,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":171.18413000000874,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":171.2841550000012,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":171.3841549999779,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":171.50067999999737,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":171.60083499999018,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":171.70082999998704,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":171.80082999996375,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":171.90065999998478,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":172.01743000000715,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":172.11751000001095,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":172.23413499997696,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":172.350849999988,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":172.4508049999713,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":172.55082000000402,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":172.6674800000037,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":172.76755499996943,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":172.8842050000094,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":172.98462499998277,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":173.08434000000125,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":173.20097999996506,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":173.30077999999048,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":173.41733999998542,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":173.51753499999177,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":173.6341099999845,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":173.75086500000907,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":173.86761499999557,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":173.96757999999681,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":174.08422999997856,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":174.20091999997385,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":174.31757999997353,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":174.43427999998676,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":174.5508399999817,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":174.66774999996414,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":174.7841849999968,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":174.90081500000088,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":175.00091499998234,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":175.11755500000436,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":175.23413499997696,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":175.3340999999782,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":175.43420000001788,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":175.55092000000877,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":175.6675249999971,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":175.76754999998957,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":175.8842050000094,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":175.98448499996448,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":176.10100500000408,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":176.20091499999398,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":176.31759499997133,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":176.43427999998676,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":176.53432999999495,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":176.65094500000123,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":176.75312499998836,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":176.86754000000656,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":176.98422499996377,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":177.08425000001444,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":177.20092500001192,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":177.3008849999751,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]},{"time":177.41755000001285,"pos":[-105.11092071747788,172,95.04034682413952],"rot":[2.0364102295771183,0.9985482204655517,-2.1095075508417898,"XYZ"]}]');

            this.keyword = [82, 82, 82, 69, 80, 76, 65, 89];
            this.curWord = [];
        },


        onKeyDown: function(e) {

            let curPos = this.curWord.length;
            if (this.keyword[curPos] == e.keyCode) {
                this.curWord.push(e.keyCode);
            } else {
                this.curWord = [];
            }
            if (this.curWord.length == this.keyword.length) {
                this.replays = [];

                let conf = [{
                        type: 'female2',
                        face: 'data/faces/4.jpg',
                        cap: 'female_hair_14',

                    },

                    {
                        type: 'male',
                        face: 'data/faces/2.jpg',
                        cap: 'male_hair_11',

                    },

                    {
                        type: 'female06',
                        face: 'data/faces/5.jpg',
                        cap: 'female_hair1_golden',

                    },

                    {
                        type: 'male06',
                        face: '../../../_files/city/default/face/m/5.jpg?',
                        cap: 'male_hair_24'
                    },

                    {
                        type: 'female05_brown',
                        face: 'data/faces/6.jpg',
                        cap: 'female_hair2',

                    },

                    {
                        type: 'male2_grey',
                        face: '../../../_files/city/default/face/m/6.jpg?',
                        cap: 'hair1'
                    },
                ];

                for (var i in conf) {
                    let n = Math.floor(Math.random() * this.replay.length);
                    console.log(this.replay, this.replay[n]);
                    let timeShift = -this.replay[n].time;
                    let data = [];
                    for (let r = 0; r < this.replay.length; r++) {
                        let cur = this.replay[n];
                        let step = {
                            time: cur.time + timeShift,
                            pos: [cur.pos[0], cur.pos[1], cur.pos[2]],
                            rot: [cur.rot[0], cur.rot[1], cur.rot[2]]
                        };
                        data.push(step);
                        n++;
                        if (n == this.replay.length) {
                            n = 0;
                            timeShift = this.replay[this.replay.length - 1].time + timeShift + 0.01;
                        }
                    }
                    let id = parseInt(i);
                    chat3d.world.set_char({
                        id: 100501 + id,
                        type: conf[i].type,
                        face: conf[i].face,
                        cap: conf[i].cap,
                        head_color: 'F1CCBC',
                        pos: [-60, 0], //250, 0
                        rot: 90
                    });
                    let rp = new hbReplayChar(data, chat3d.world.chars[100501 + id], 170, true);
                    rp.repeat = true;
                    this.replays.push(rp);

                }



            }


            return true;
        },

        onRender: function(delta) {
            /*if (this.recorder) {
                this.recorder.update(delta);
            }*/

            for (let i in this.replays) {
                if (this.replays[i]) {
                    this.replays[i].update(delta);


                }
            }
        },

        obj: [{
                id: 'loc_12_anchor'
            }, {
                id: 'loc_12_barrel'
            }, {
                id: 'loc_12_barrel2'
            }, {
                id: 'loc_12_barrel3'
            }, {
                id: 'loc_12_barrel4'
            }, {
                id: 'loc_12_bench'
            }, {
                id: 'loc_12_black_mold'
            }, {
                id: 'loc_12_bucket'
            }, {
                id: 'loc_12_bucket2'
            }, {
                id: 'loc_12_chair'
            }, {
                id: 'loc_12_chair2'
            }, {
                id: 'loc_12_chest'
            }, {
                id: 'loc_12_chest2'
            }, {
                id: 'loc_12_chest3'
            }, {
                id: 'loc_12_clock'
            }, {
                id: 'loc_12_collider'
            }, {
                id: 'loc_12_crate1'
            }, {
                id: 'loc_12_crate2'
            }, {
                id: 'loc_12_crate3'
            }, {
                id: 'loc_12_crate4'
            }, {
                id: 'loc_12_crate5'
            }, {
                id: 'loc_12_ground'
            }, {
                id: 'loc_12_ivy1'
            }, {
                id: 'loc_12_ivy1_2'
            }, {
                id: 'loc_12_ivy1_3'
            }, {
                id: 'loc_12_ivy1_4'
            }, {
                id: 'loc_12_ivy1_5'
            }, {
                id: 'loc_12_ivy2_1'
            }, {
                id: 'loc_12_ivy2_2'
            }, {
                id: 'loc_12_ivy2_3'
            }, {
                id: 'loc_12_ivy2_4'
            }, {
                id: 'loc_12_ivy2_5'
            }, {
                id: 'loc_12_ivy2_6'
            }, {
                id: 'loc_12_ivy3_1'
            }, {
                id: 'loc_12_ivy3_2'
            }, {
                id: 'loc_12_ivy3_3'
            }, {
                id: 'loc_12_knife'
            }, {
                id: 'loc_12_other'
            }, {
                id: 'loc_12_plants1_1'
            }, {
                id: 'loc_12_plants1_2'
            }, {
                id: 'loc_12_plants2_1'
            }, {
                id: 'loc_12_plants2_2'
            }, {
                id: 'loc_12_plants2_3'
            }, {
                id: 'loc_12_plants2_4'
            }, {
                id: 'loc_12_plants3_1'
            }, {
                id: 'loc_12_plants3_2'
            }, {
                id: 'loc_12_plants3_3'
            }, {
                id: 'loc_12_plants3_4'
            }, {
                id: 'loc_12_plants4_1'
            }, {
                id: 'loc_12_plants4_2'
            }, {
                id: 'loc_12_plants4_3'
            }, {
                id: 'loc_12_plants5_1'
            }, {
                id: 'loc_12_plants5_2'
            }, {
                id: 'loc_12_plants6_1'
            }, {
                id: 'loc_12_plants6_2'
            }, {
                id: 'loc_12_plants7_1'
            }, {
                id: 'loc_12_plants7_2'
            }, {
                id: 'loc_12_plants7_3'
            }, {
                id: 'loc_12_plants8_1'
            }, {
                id: 'loc_12_plants9_1'
            }, {
                id: 'loc_12_saber'
            }, {
                id: 'loc_12_spanish_moss_1'
            }, {
                id: 'loc_12_spanish_moss_2'
            }, {
                id: 'loc_12_spanish_moss_3'
            }, {
                id: 'loc_12_stone'
            }, {
                id: 'loc_12_stones'
            }, {
                id: 'loc_12_torch_1'
            }, {
                id: 'loc_12_torch_2'
            }, {
                id: 'loc_12_torch_3'
            }, {
                id: 'loc_12_torch_4'
            }, {
                id: 'loc_12_torch_5'
            }, {
                id: 'loc_12_torch_6'
            }, {
                id: 'loc_12_torch_7'
            }, {
                id: 'loc_12_tree_1'
            }, {
                id: 'loc_12_tree_2'
            }, {
                id: 'loc_12_tree2'
            }, {
                id: 'loc_12_vines_1'
            }, {
                id: 'loc_12_vines_2'
            }, {
                id: 'loc_12_vines_3'
            }, {
                id: 'loc_12_vines_4'
            }, {
                id: 'loc_12_vines_5'
            }, {
                id: 'loc_12_vines_6'
            }, {
                id: 'loc_12_wall'
            }, {
                id: 'loc_12_windows'
            }, {
                id: 'loc_12_windows_2'
            }, {
                id: 'loc_12_windows_3'
            }, {
                id: 'loc_12_windows_4'
            }, {
                id: 'loc_12_windows_5'
            }, {
                id: 'loc12_fire_1'
            }, {
                id: 'loc12_fire_2'
            }, {
                id: 'loc12_fire_3'
            }, {
                id: 'loc12_fire_4'
            }, {
                id: 'loc12_fire_5'
            }, {
                id: 'loc12_fire_6'
            }, {
                id: 'loc12_fire_7'
            }, {
                id: 'loc12_fire_8'
            }, {
                id: 'loc12_fire_9'
            }



        ],
        z: 20,
        view_zones: '14_view.json',
        dyn_view_zones: '14_dyn_view.json',
        scripts: ['hoverboard/replay.js'],

    },

    15: {
        obj: [{
            id: 'loc_14_alpha'
        }, {
            id: 'loc_14_collider'
        }, {
            id: 'loc_14_floor'
        }, {
            id: 'loc_14_main'
        }],
        z: 20,
        onInit: function() {
            console.log('%cinit custom location', ' background: #DAFF7F');
            this.black_player = null;
            this.white_player = null;
            this.comp_timer = 0;
            this.player1 = null;
            this.player2 = null;
            this.player1_ttl = 0;
            this.player2_ttl = 0;
            this.cur_turn = 'w';
            this.game_id = null;
            this.renderDelay = 0;
            this.gameEndTimer = 0;
            this.gameTime = 0;
            this.singlePlayer = true;
            this.light = new BABYLON.HemisphereLight(0xfffff9, 0x444444, 0.5);
            this.light2 = new BABYLON.DirectionalLight(0xfffff9, 0.6);
            //chat3d.world.scene.add(this.light);
            chat3d.world.scene.add(this.light2);
            this.light.position.set(0, 5, 0);
            this.light2.position.set(0, 5, 1);
            this.light3 = new BABYLON.AmbientLight(0x808080);
            chat3d.world.scene.add(this.light3);

            this.hub = new p2phub();

            //this.recorder = new chessRecorder();
            this.keyword = [82, 82, 82, 69, 80, 76, 65, 89];
            this.curWord = [];

            this.replays = chess_replay;


            this.started = false;
            //var data = chat3d.world.custom_loc_data;
            var game = this.game = new Chess();
            var scope = this;
            var engineRunning = false;
            var cursor = 0;
            var moveList = this.moveList = [],
                scoreList = [];
            this.player = 'w';
            var entirePGN = '';

            var engine = this.engine = new Worker("data/scripts/lozza.js");
            engine.postMessage("uci");
            engine.postMessage("ucinewgame");

            this.getPlayersColor = function() {
                if (this.player1 == chat3d.selfid) {
                    return 'w';
                }
                if (this.player2 == chat3d.selfid) {
                    return 'b';
                }
                return;
            };

            this.set_player1 = function(id) {

                if (id != this.player1) {
                    if (id && this.player2 == chat3d.selfid && this.game_id) {
                        //this.board.players[0] = new ChessPlayer(this.board, 1);

                        if (this.player2 == chat3d.selfid) {
                            chat3d.msg.send('alert', 'player_joined');
                        }
                    }
                    if (this.player1 == chat3d.selfid && id != chat3d.selfid) {
                        console.log('%cim droped from player1 by id ' + id, ' background: #DAFF7F');
                    }

                    this.player1 = id;
                    if (id == chat3d.selfid) {
                        this.player = 'w';
                    }

                    if (!id) {
                        this.player1_ttl = 0;

                    } else {
                        this.player1_ttl = 10;


                    }
                }

            };

            this.set_player2 = function(id) {


                if (id != this.player2) {
                    if (id && this.player1 == chat3d.selfid) {
                        //this.board.players[1] = new ChessPlayer(this.board, 2);
                        console.log('%cset player 2', 'background: #DAFF7F');
                        if (this.player1 == chat3d.selfid && this.game_id) {
                            chat3d.msg.send('alert', 'player_joined');
                            console.log('%cSend player 2 joined alert', 'background: #DAFF7F');
                        }
                    }
                    this.player2 = id;
                    if (id == chat3d.selfid) {
                        this.player = 'b';
                    }

                    if (!id) {
                        this.player2_ttl = 0;

                    } else {
                        //this.singlePlayer = false;
                        console.log('%csinglePlayer mode off', 'background: #DAFF7F');
                        this.player2_ttl = 10;
                    }
                }

            };

            this.update_player1 = function(id, age) {
                if (id == this.player1) {
                    if (age < 6) {
                        this.player1_ttl = 10;
                    } else if (age > 30) {
                        this.player1_ttl = 0;
                    }
                }

            };

            this.update_player2 = function(id, age) {
                if (id == this.player2) {
                    if (age < 6) {
                        this.player2_ttl = 10;
                    } else if (age > 30) {
                        this.player2_ttl = 0;
                    }
                }

            };

            this.setGameId = function(id) {
                this.game_id = id;
                this.player1_ttl = 1;
                this.player2_ttl = 1;
            };


            this.getPlayerNum = function() {
                if (!this.game_id && this.in_game_zone) {
                    return 0;
                }

                if (this.player1 == chat3d.selfid) {
                    return 0;
                } else if (this.player2 == chat3d.selfid) {
                    return 1;
                }

                if (this.player2 != chat3d.selfid && this.player1 === null && this.game.turn() == 'w') {
                    return 0;
                }

                if (this.player1 != chat3d.selfid && this.player2 === null && this.game.turn() == 'b') {
                    return 1;
                }

                return false;
            };

            this.sendGameState = function() {
                this.stateId = Math.random();
                //console.log(this.board.orientation());
                //console.log(scope.game.turn());
                console.log('%c send game state!!', ' background: #22ff22');
                console.log('send turn', this.game.turn());
                this.cur_turn = this.game.turn();
                this.hub.broadcast('gameState', {
                    game_id: this.game_id,

                    player1: this.player1,
                    player2: this.player2,
                    cur_turn: this.game.turn(),
                    board: this.board.getCurState(),
                    board2: this.game.getBoard(),
                    game_over: this.game.game_over(),
                    stateId: this.stateId,
                    etc: this.game.getEtc()
                });

                if (this.recorder && this.recorder.setData) {

                    this.recorder.setData({
                        game_id: this.game_id,

                        player1: this.player1,
                        player2: this.player2,
                        cur_turn: this.game.turn(),
                        board: this.board.getCurState(),
                        board2: this.game.getBoard(),
                        game_over: this.game.game_over(),
                        stateId: this.stateId,
                        etc: this.game.getEtc()
                    });
                }
                //console.log(this.board.getCurState());
                //console.log(this.game.getEtc());
                //console.log(this.game);
                var etc = this.game.getEtc();
                console.log(etc);
                if (etc.history.length) {
                    /*for (var i in etc.history) {
                        console.log(etc.history[i].move.to, this.game.getSq(etc.history[i].move.to));
                        if (this.board.findPMesh(this.game.getSq(etc.history[i].move.to))) {
                            this.board.findPMesh(this.game.getSq(etc.history[i].move.to)).material.emissive.set(0xdddddd);
                        }
                    }*/
                }

                //проверка на конец игры
                if (!this.game_over) {
                    if (this.game.game_over()) {
                        this.game_over = true;
                        console.log('gameover');
                        if (this.getPlayersColor()) {
                            if (this.game.turn() === this.getPlayersColor()) {
                                console.log('you lose');
                                chat3d.msg.send('alert', 'game_lose');
                            } else {
                                console.log('you win');
                                chat3d.msg.send('alert', 'game_won');
                            }
                        }
                    }
                }
            };


            this.setGameState = function(data, age, counter) {
                if (this.stateId != data.stateId) {
                    //console.log('%c set game state!!', ' background: #22ff22');
                    //console.log('set turn', data.cur_turn);
                    this.board.snapbackDraggedPiece();
                    this.cur_turn = data.cur_turn;
                    /*if (this.hub.pCounters.gameState && this.hub.pCounters.gameState == counter) {
                        if (data.stateId != this.stateId) {
                            console.log('%cfalse_start', ' background: #FF2222');
                            chat3d.msg.send('alert', 'false_start');
                            return;
                        }
                    }*/
                    this.stateId = data.stateId;

                    if (age < 10) {
                        this.lastTurnTime = 0;
                    } else {
                        this.lastTurnTime = 10;
                    }


                    /*if (data.board) {
                        this.board.setCurState(data.board);
                        //console.log(this.board.fen());
                        //var msg = "position fen " + this.board.fen();
                        //engine.postMessage(msg);
                    }*/

                    if (data.board2) {
                        this.game.setBoard(data.board2);
                        if (!this.packetCount) {
                            this.board.setCurState(data.board);
                            this.packetCount = 1;
                        } else {
                            this.board.position(this.game.fen(), true);
                            this.packetCount++;
                        }
                    }

                    if (data.etc) {
                        this.game.setEtc(data.etc);
                    }

                    this.set_player1(data.player1);
                    this.set_player2(data.player2);



                    //this.cur_turn = data.cur_turn;
                    if (data.cur_turn == 0) {
                        data.cur_turn = 'w';
                    }

                    if (data.cur_turn == 1) {
                        data.cur_turn = 'b';
                    }
                    this.game.setTurn(data.cur_turn);

                    if (this.game_id && !this.game_over && data.game_over) {
                        console.log('gameover');
                        if (this.getPlayersColor()) {
                            if (this.game.turn() === this.getPlayersColor()) {
                                console.log('you lose');
                                chat3d.msg.send('alert', 'game_lose');
                            } else {
                                console.log('you win');
                                chat3d.msg.send('alert', 'game_won');
                            }
                        }
                    }
                    this.game_over = data.game_over;
                    this.game_id = 1;
                }

            };

            function fireEngine() {
                engineRunning = true;
                updateStatus();
                var currentScore;
                var msg = "position fen " + game.fen();
                console.log("GUI: " + msg);
                engine.postMessage(msg);
                msg = 'go movetime ' + 1;
                console.log("GUI: " + msg);
                engine.postMessage(msg);
                engine.onmessage = function(event) {
                    var line = event.data;
                    console.log("ENGINE: " + line);
                    var best = parseBestMove(line);
                    console.log(best);
                    if (best !== undefined) {
                        var move = game.move(best);
                        moveList.push(move);
                        if (currentScore !== undefined) {
                            if (scoreList.length > 0) {
                                scoreList.pop(); // remove the dummy score for the user's prior move
                                scoreList.push(currentScore); // Replace it with the engine's opinion
                            }
                            scoreList.push(currentScore); // engine's response
                        } else {
                            scoreList.push(0); // not expected
                        }
                        cursor++;
                        scope.board.position(game.fen(), true);
                        engineRunning = false;
                        updateStatus();
                        scope.sendGameState();
                        scope.lastTurnTime = 0;

                    } else {
                        // Before the move gets here, the engine emits info responses with scores
                        var score = parseScore(line);
                        if (score !== undefined) {
                            if (scope.player === 'w') {
                                score = -score; // convert from engine's score to white's score
                            }
                            //updateScoreGauge(score);
                            currentScore = score;
                        }
                    }
                };
            }

            function parseBestMove(line) {
                var match = line.match(/bestmove\s([a-h][1-8][a-h][1-8])(n|N|b|B|r|R|q|Q)?/);
                console.log(line);
                if (match) {
                    var bestMove = match[1];
                    var promotion = match[2];
                    return {
                        from: bestMove.substring(0, 2),
                        to: bestMove.substring(2, 4),
                        promotion: promotion
                    }
                }
            }

            function parseScore(line) {
                var match = line.match(/score\scp\s(-?\d+)/);
                if (match) {
                    return match[1];
                } else {
                    if (line.match(/mate\s-?\d/)) {
                        return 2500;
                    }
                }
            }

            function updateStatus() {

                var status = '';

                var moveColor = 'White';
                if (game.turn() === 'b') {
                    moveColor = 'Black';
                }
                console.log(game.turn());

                if (game.game_over()) {

                    if (game.in_checkmate()) {
                        status = moveColor + ' checkmated.';
                    } else if (game.in_stalemate()) {
                        status = moveColor + " stalemated";
                    } else if (game.insufficient_material()) {
                        status = "Draw (insufficient material)."
                    } else if (game.in_babylonfold_repetition()) {
                        status = "Draw (babylonfold repetition)."
                    } else if (game.in_draw()) {
                        status = "Game over (fifty move rule)."
                    }
                    console.log({
                        title: "Game Over",
                        text: status,
                        type: 'info',
                        showCancelButton: false,
                        confirmButtonColor: "#DD6655",
                        onConfirmButtonText: 'OK',
                        closeOnConfirm: true
                    });
                    engineRunning = false;
                }

                // game still on
                else {
                    if (scope.player === 'w') {
                        status = "Computer playing Black; ";
                    } else {
                        status = "Computer playing White; ";
                    }
                    status += moveColor + ' to move.';

                    // check?
                    if (game.in_check() === true) {
                        status += ' ' + moveColor + ' is in check.';
                    }
                }

                //fenEl.html(game.fen().replace(/ /g, '&nbsp;'));
                var currentPGN = game.pgn({
                    max_width: 10,
                    newline_char: "<br>"
                });
                var matches = entirePGN.lastIndexOf(currentPGN, 0) === 0;
                if (matches) {
                    currentPGN += "<span>" + entirePGN.substring(currentPGN.length, entirePGN.length) + "</span>";
                } else {
                    entirePGN = currentPGN;
                }
                //pgnEl.html(currentPGN);
                if (engineRunning) {
                    status += ' Thinking...';
                }
                //statusEl.html(status);
            };

            var onDrop = function(source, target) {
                if (engineRunning) {
                    return 'snapback';
                }
                if (scope.board.hasOwnProperty('removeGreySquares') && typeof scope.board.removeGreySquares === 'function') {
                    scope.board.removeGreySquares();
                }

                // see if the move is legal
                var move = game.move({
                    from: source,
                    to: target,
                    promotion: 'q'
                        //promotion: $("#promotion").val()
                });

                // illegal move
                if (move === null) return 'snapback';
                if (cursor === 0) {
                    //console.log("GUI: ucinewgame");
                    //engine.postMessage("ucinewgame");
                    //var msg = "position fen " + scope.board.fen();
                    //engine.postMessage(msg);
                }
                moveList = moveList.slice(0, cursor);
                scoreList = scoreList.slice(0, cursor);
                moveList.push(move);
                //console.log(moveList);
                // User just made a move- add a dummy score for now. We will correct this element once we hear from the engine
                scoreList.push(scoreList.length === 0 ? 0 : scoreList[scoreList.length - 1]);
                cursor = moveList.length;
            };


            var onSnapEnd = function() {
                if (!scope.game.game_over() && scope.game.turn() !== scope.player && scope.singlePlayer) {

                    //fireEngine();
                }
            };


            var onMouseoverSquare = function(square) {
                //console.log(square);

                // get list of possible moves for this square
                var moves = scope.game.moves({
                    square: square,
                    verbose: true
                });

                //console.log(scope.game.turn());


                // exit if there are no moves available for this square
                if (moves.length === 0) return;

                if (scope.board.hasOwnProperty('greySquare') && typeof scope.board.greySquare === 'function') {
                    // highlight the square they moused over
                    scope.board.greySquare(square);


                    // highlight the possible squares for this piece
                    for (var i = 0; i < moves.length; i++) {
                        scope.board.greySquare(moves[i].to);
                    }
                }
            };

            var onMouseoutSquare = function(square, piece) {
                if (scope.board.hasOwnProperty('removeGreySquares') && typeof scope.board.removeGreySquares === 'function') {
                    scope.board.removeGreySquares();
                }
            };


            var cfg = {
                cameraControls: false,
                draggable: true,
                position: 'start',
                onDrop: onDrop,
                onSetPos: function(position) {
                    this.sendGameState();
                }.bind(this),
                onMouseoutSquare: onMouseoutSquare,
                onMouseoverSquare: onMouseoverSquare,
                onSnapEnd: onSnapEnd,
                moveSpeed: 'slow',
                blackPieceColor: 0x5b3514
            };
            this.board = new ChessBoard3(cfg);

            this.board.scene.position.set(0, 81, 0);
            this.board.scene.scale.set(5, 5, 5);
            chat3d.world.scene.add(this.board.scene);

            this.resetbox = new BABYLON.Mesh(new BABYLON.CubeGeometry(14, 1, 14), new BABYLON.MeshBasicMaterial({
                visible: false
            }));
            this.resetbox.position.set(-69.5, 80, -0.5);
            chat3d.world.scene.add(this.resetbox);

            this.isResetable = function(x, y, msg) {

                if (this.getPlayersColor()) {
                    var raycast = chat3d.view.raycaster;
                    raycast.ray.origin.setFromMatrixPosition(chat3d.world.camera.matrixWorld);

                    var vector = new BABYLON.Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.9);
                    vector.unproject(chat3d.world.camera);
                    vector.sub(raycast.ray.origin).normalize();
                    raycast.far = 500;
                    raycast.ray.direction = vector;
                    intersects = raycast.intersectObject(this.resetbox);
                    if (intersects.length) {



                        return true;
                    }
                }

                return false;

            };

            this.resetBut = function(x, y) {
                if (this.isResetable(x, y, true)) {

                    chat3d.msg.send('confirm', 'game_reset');

                    return true;
                }
                return false;

            };

            this.reset = function() {
                this.game.reset();
                this.board.reset();
                this.game_over = false;
            };

            this.isClickable = function(x, y, all) {
                /*var raycast = chat3d.view.raycaster;
                raycast.ray.origin.setFromMatrixPosition(chat3d.world.camera.matrixWorld);
                var vector = new BABYLON.Vector3(pos.x, pos.y, 0.9);
                vector.unproject(chat3d.world.camera);
                vector.sub(raycast.ray.origin).normalize();
                raycast.far = 500;
                raycast.ray.direction = vector;
                intersects = raycast.intersectObjects(this.board.scene.children, true);
                if (intersects.length) {
                    return true;
                }*/

                //console.log(this.board.raycast(pos.x, pos.y));

                if (this.board.raycast(x, y, all).mesh) {
                    return true;
                }

                return;
            }

            this.onLoop = function(delta) {
                //console.log(this.game.turn());
                //this.board.animate();
                //-50 60
                //50 130
                this.player1_ttl -= delta;
                this.player2_ttl -= delta;
                if (this.player1_ttl < 0 && this.player1) {
                    this.set_player1(null);
                }

                if (this.player2_ttl < 0 && this.player2) {
                    this.set_player2(null);
                }


                with(chat3d.world.eyes.position) {
                    if (x > -110 && x < 100 && z > 20 && z < 150) {
                        //console.log('w zone');
                        if (!this.player1) {
                            this.started = true;
                            this.player = 'w';
                            this.set_player1(chat3d.selfid);
                            chat3d.msg.send('alert', 'ingame');
                            this.sendGameState();
                            this.player1_ttl = 10;
                            console.log('set player 1');
                            if (!this.player2) {
                                //this.singlePlayer = true;
                                this.player2_ttl = 1;
                            }


                        }
                        if (this.player1 == chat3d.selfid && this.player1_ttl < 8) {
                            console.log('update self as player1');

                            this.player1_ttl = 10;
                            this.hub.broadcast('update_player1', this.player1);

                        }

                    } else if (x > -110 && x < 110 && z > -150 && z < -20) {
                        /*if (!this.started && moveList.length === 0) {
                            fireEngine();
                        }*/
                        //console.log('b zone');

                        if (!this.player2) {
                            this.started = true;
                            this.player = 'b';
                            this.set_player2(chat3d.selfid);
                            chat3d.msg.send('alert', 'ingame');
                            this.sendGameState();
                            this.player2_ttl = 10;
                            console.log('set player 2');
                            if (!this.player1) {
                                //this.singlePlayer = true;
                                this.player1_ttl = 1;
                            }
                        }
                        if (this.player2 == chat3d.selfid && this.player2_ttl < 8) {
                            //console.log('update self as player2');
                            this.player2_ttl = 10;
                            this.hub.broadcast('update_player2', this.player2);
                        }

                        //console.log(moveList.length);
                    } else {
                        //console.log('n zone');
                        this.started = false;
                        this.player = '';
                        //console.log(this.player1, chat3d.selfid);
                        if (this.player1 == chat3d.selfid) {
                            this.player1 = null;

                            this.sendGameState();
                            //this.ttt.game.playerManager.players[0].resetIntersect();

                            console.log('player 1 off');
                        }
                        if (this.player2 == chat3d.selfid) {
                            this.player2 = null;

                            this.sendGameState();
                            console.log('player 2 off');
                        }
                    }

                }
                if (this.player1 !== null && this.player2 !== null) {
                    this.singlePlayer = false;
                }
                if (!this.game_over && this.getPlayersColor()) {
                    if ((this.player1 === null && this.player1_ttl < -5) || (this.player2 === null && this.player2_ttl < -5)) {

                        if (this.cur_turn != this.getPlayersColor()) {
                            this.comp_timer += delta;
                            if (this.comp_timer > 1) {
                                this.comp_timer = 0;
                                fireEngine();
                                if (!this.singlePlayer) {
                                    chat3d.msg.send('alert', 'comp_joined');
                                }
                                this.singlePlayer = true;
                            }
                        }
                    }
                }

            };



            //this.onTouchMove = this.onMouseMove;
            //this.onTouchDown = this.onMouseDown;
            //this.onTouchUp = this.onMouseUp;

            this.lastTurnTimer = 0;
            this.lastTurnTime = 0;

            this.isGameOverReset = function(x, y) {
                if (!this.game_over) {
                    return false;
                }
                if (this.getPlayersColor()) {
                    var raycast = chat3d.view.raycaster;
                    raycast.ray.origin.setFromMatrixPosition(chat3d.world.camera.matrixWorld);

                    var vector = new BABYLON.Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.9);
                    vector.unproject(chat3d.world.camera);
                    vector.sub(raycast.ray.origin).normalize();
                    raycast.far = 500;
                    raycast.ray.direction = vector;

                    intersects = raycast.intersectObjects(this.board.scene.children);
                    if (intersects.length) {
                        return true;
                    }
                }

                return false;
            };

        },
        //mobileZShift: 20,
        //mobileLook: 120,
        lookDist: 200,
        noSlip: true,

        onRender: function(delta) {
            if (chat3d.mobile_mode && chat3d.world.camera.fov != 95) {
                chat3d.world.camera.fov = 95;
                chat3d.world.camera.updateProjectionMatrix();
            }

            var mobileLook = 30;
            if (this.getPlayersColor()) {
                mobileLook = 120;
            }

            if (chat3d.world.location.mobileLook < mobileLook) {
                chat3d.world.location.mobileLook += delta * 100;
                chat3d.world.location.mobileLook = Math.min(mobileLook, chat3d.world.location.mobileLook);
            } else if (chat3d.world.location.mobileLook > mobileLook) {
                chat3d.world.location.mobileLook -= delta * 100;
                chat3d.world.location.mobileLook = Math.max(mobileLook, chat3d.world.location.mobileLook);
            }

            this.board.animate();
            var etc = this.game.getEtc();
            if (etc.history.length) {
                var last = etc.history[etc.history.length - 1];
                var mesh = this.board.findPMesh(this.game.getSq(last.move.to));
                for (var m in this.board.scene.children) {
                    if (this.board.scene.children[m].material.name == 'w' || this.board.scene.children[m].material.name == 'b') {
                        //this.board.scene.children[m].material.emissive.set(0x000000);
                        this.board.scene.children[m].material.color.set(this.board.scene.children[m].material.srcColor);

                    }
                }
                if (last.turn != this.getPlayersColor()) {
                    this.lastTurnTimer += delta;
                    this.lastTurnTime += delta;
                    if (this.lastTurnTimer > 1) {
                        this.lastTurnTimer = 0;
                    }
                    if (mesh) {

                        if (this.lastTurnTimer < 0.5 && this.lastTurnTime < 3) {
                            //mesh.material.emissive.set(0x000000);
                            mesh.material.color.set(mesh.material.srcColor);


                        } else {
                            if (mesh.material.name == 'w') {
                                //mesh.material.emissive.set(0x111111);
                                //mesh.material.color.set(0xffffff);
                                mesh.material.color.set(0xfEf4e8);
                            } else {
                                //mesh.material.emissive.set(0x222222);
                                mesh.material.color.set(mesh.material.srcColor + 0x222222);
                                //console.log(mesh.material.color);
                            }

                        }
                    }
                    if (this.lastTurnTime >= 3) {
                        this.lastTurnTimer = 0;
                        //mesh.material.emissive.set(0x000000);
                        mesh.material.color.set(mesh.material.srcColor);
                        //console.log(mesh.material.color, mesh.material.srcColor);
                    }
                } else {
                    if (mesh) {
                        //mesh.material.emissive.set(0x000000);
                        mesh.material.color.set(mesh.material.srcColor);
                    }
                }
            }

            //this.recorder.update(delta);

            if (this.replay) {
                //console.log(this.replay);
                this.game_replay.update(delta);

                for (let i in this.replay) {
                    if (this.replay[i]) {
                        this.replay[i].update(delta);

                        if (this.replay[i].done) {
                            this.replay[i] = null;
                        }
                    }
                }



            }

        },
        onClean: function() {
            chat3d.world.scene.remove(this.board.scene);
            chat3d.world.scene.remove(this.light);
            chat3d.world.scene.remove(this.light2);
            chat3d.world.scene.remove(this.light3);

            chat3d.world.scene.remove(this.resetbox);
            if (chat3d.mobile_mode) {
                chat3d.world.width = 0;
                chat3d.world.resize();
            }

        },
        onMouseMove: function(e) {
            if (!this.game_over && this.cur_turn === this.getPlayersColor()) {
                return this.board.mouseMove(e);
            }
            return true;
        },
        onMouseDown: function(e) {
            this.mouseDown = true;
            if (!this.game_over && this.cur_turn === this.getPlayersColor()) {
                this.board.mouseMove(e);
                this.board.mouseDown(e);
            } else {
                if (this.game_over && this.isGameOverReset(e.clientX, e.clientY)) {
                    chat3d.msg.send('confirm', 'game_reset');
                    return true;
                }
                if (this.getPlayersColor() && this.isClickable(e.clientX, e.clientY, true)) {
                    chat3d.msg.send('alert', 'partners_turn');
                }
            }

            return true;
        },
        onMouseUp: function(e) {
            this.mouseDown = false;
            if (this.getPlayersColor()) {
                if (this.resetBut(e.clientX, e.clientY)) {

                    return true;
                }

                /*if (this.game_over && this.isGameOverReset(e.clientX, e.clientY)) {
                    chat3d.msg.send('confirm', 'game_reset');
                    return true;
                }*/
            }



            if (!this.game_over && this.cur_turn === this.getPlayersColor()) {
                this.board.mouseUp(e);
            }


            return true;

        },

        onTouchMove: function(e) {
            if (!this.game_over && this.cur_turn === this.getPlayersColor()) {
                this.board.mouseMove(e, true);
                if (this.board.getDragInfo()) {
                    return;
                }
            }
            return true;
        },

        onTouchUp: function(e) {
            if (this.getPlayersColor()) {
                if (this.resetBut(e.changedTouches[0].clientX, e.changedTouches[0].clientY)) {

                    return;
                }

                if (this.game_over && this.isGameOverReset(e.changedTouches[0].clientX, e.changedTouches[0].clientY)) {

                    chat3d.msg.send('confirm', 'game_reset');
                    return;
                }
            }



            if (!this.game_over && this.cur_turn === this.getPlayersColor()) {
                if (this.board.getDragInfo()) {
                    this.board.mouseUp(e, true);
                    return;
                }
            }

            return true;

        },

        onTouchDown: function(e) {
            if (this.board.getDragInfo()) {
                return;
            }
            if (!this.game_over) {
                if (this.cur_turn === this.getPlayersColor()) {
                    //this.onTouch = true;
                    this.board.mouseMove(e, true);
                    this.board.mouseDown(e, true);
                } else {
                    if (this.getPlayersColor() && this.isClickable(e.touches[0].clientX, e.touches[0].clientY, true)) {
                        chat3d.msg.send('alert', 'partners_turn');
                    }
                }
            }
            return true;

        },

        onMessage: function(data) {
            if (data) {

                //console.log(data);
                for (var i in data) {
                    var msg = data[i];
                    if (this.hub.pCounters[msg.type] && this.hub.pCounters[msg.type] > msg.counter) {
                        console.log('%c old data!!', ' background: #FF2222');
                        console.log(msg.type, this.hub.pCounters[msg.type], msg.counter);

                    } else {
                        switch (msg.type) {

                            case 'gameState':
                                this.setGameState(msg.data, msg.age, msg.counter);

                                break;

                            case 'update_player1':
                                this.update_player1(msg.data, msg.age);
                                break;

                            case 'update_player2':
                                this.update_player2(msg.data, msg.age);
                                break;

                            case 'resetmsg':
                                if (msg.age < 10 && this.hub.checkCounter(msg)) {
                                    chat3d.msg.send('alert', 'reseted');
                                    console.log('%creset alert', 'background: #DAFF7F');
                                }
                                break;

                            default:
                                console.log('old or unknown', msg);
                                break;


                        }
                        this.hub.onMessage(msg);
                    }
                }
            }


        },

        /*onCharFlush: function(pool) {
            this.recorder.setActions(pool);
        },*/


        onKeyDown: function(e) {
            //console.log(e.keyCode);
            let curPos = this.curWord.length;
            if (this.keyword[curPos] == e.keyCode) {
                this.curWord.push(e.keyCode);
            } else {
                this.curWord = [];
            }
            if (this.curWord.length == this.keyword.length) {
                this.replay = [];
                //this.game_replay = new reversiReplay(this.gameReplay, this);

                let conf = [
                    /*{
                        type: 'female2',
                        face: 'data/faces/4.jpg',
                        cap: 'female_hair_14',
        
                    },
        
                    {
                        type: 'male',
                        face: 'data/faces/2.jpg',
                        cap: 'male_hair_11',
        
                    },
        
                    {
                        type: 'female06',
                        face: 'data/faces/5.jpg',
                        cap: 'female_hair1_golden',
        
                    },*/

                    {
                        type: 'male06',
                        face: '../../../_files/city/default/face/m/5.jpg?',
                        cap: 'male_hair_24'
                    },

                    {
                        type: 'female05_brown',
                        face: 'data/faces/6.jpg',
                        cap: 'female_hair2',

                    }

                ];


                //console.log(conf[this.curReplay]);

                for (let i in this.replays) {
                    let n = parseInt(i);
                    chat3d.world.set_char({
                        id: 100501 + n,
                        type: conf[i].type,
                        face: conf[i].face,
                        cap: conf[i].cap,
                        head_color: 'F1CCBC',
                        pos: [-60000, 0], //250, 0
                        rot: 90
                    });

                    /*for (let l in this.replays[i]) {
                        chat3d.world.set_chars_actions([{
                            id: 100501 + n,
                            pool: this.replays[i][l]
                        }]);
                    }*/

                    /*chat3d.world.set_chars_actions([{
                        id: 100501+ n,
                        pool: this.pool
                    }]);*/
                    //console.log(i);
                    //this.replay.push(new hbReplayChar(this.replays[i], chat3d.world.chars[100501 + n], 170, true));
                    this.replay.push(new charReplay(this.replays[i], 100501 + n));
                }

                this.game_replay = new chessReplay(chess_gamereplay, this);
            }


            return true;
        },

        onView: function(x, y) {
            //console.log(this.game);
            var pointer = false;
            var move = false;

            if (this.isResetable(x, y) || this.isGameOverReset(x, y)) {
                $('#world canvas').attr('title', chat3d.translate.reset);
                pointer = true;

            } else if (!this.game_over && this.getPlayersColor() == this.cur_turn && this.isClickable(x, y)) {
                pointer = true;

                $('#world canvas').attr('title', '');

            } else {
                pointer = false;
                $('#world canvas').attr('title', '');
            }

            if (this.board.getDragInfo()) {
                move = true;
            }

            if (pointer || move) {
                if (move) {
                    $('canvas').addClass('pointer_on_game_obj_move');
                } else {
                    $('canvas').addClass('pointer_on_game_obj');
                    $('canvas').removeClass('pointer_on_game_obj_move');
                }

            } else {
                $('canvas').removeClass('pointer_on_game_obj').removeClass('pointer_on_game_obj_move');
            }




        },

        onConfirm: function(type) {
            console.log(type);

            switch (type) {
                case 'game_reset':
                    console.log('reset callback');
                    this.reset();
                    this.sendGameState();
                    if (this.player1 && this.player2) {
                        var msgto;
                        if (this.player1 == chat3d.selfid) {
                            msgto = this.player2;
                        } else {
                            msgto = this.player1;
                        }
                        this.hub.broadcast('resetmsg', msgto);
                    }

                    break;
            }

        },

        /*onCharUnload: function() {
        	this.p2phub.rollcall();
        },*/

        geo: ['B.json', 'K.json', 'N.json', 'P.json', 'Q.json', 'R.json'],
        //fonts: ['helvetiker_regular.typeface.js'],
        scripts: ['chessboard3.js', 'chess.js', 'p2player.js', 'chessPlayer.js', 'chessComp.js', 'tween.min.js', 'hoverboard/replay.js', 'replays/chess.js'],
        textures: ['chess4.jpg']
    },

    16: {
        obj: [{
                "id": "loc_16_plant_2_001"
            }, {
                "id": "loc_16_tree_001_1"
            }, {
                "id": "loc_16_plant_1_001"
            }, {
                "id": "loc_16_plant_3_002"
            }, {
                "id": "loc_16_plant_2_002"
            }, {
                "id": "loc_16_plant_5_001"
            }, {
                "id": "loc_16_plant_5_002"
            }, {
                "id": "loc_16_tree_001_5"
            }, {
                "id": "loc_16_plant_1_002"
            }, {
                "id": "loc_16_plant_1_003"
            }, {
                "id": "loc_16_plant_3_007"
            }, {
                "id": "loc_16_plant_4_001"
            }, {
                "id": "loc_16_plant_3_001"
            }, {
                "id": "loc_16_plant_2_003"
            }, {
                "id": "loc_16_plant_7_001"
            }, {
                "id": "loc_16_plant_6_001"
            }, {
                "id": "loc_16_plant_10_002"
            }, {
                "id": "loc_16_plant_11_001"
            }, {
                "id": "loc_16_plant_9"
            }, {
                "id": "loc_16_plant_8"
            }, {
                "id": "loc_16_plant_2_004"
            }, {
                "id": "loc_16_tree_001_4"
            }, {
                "id": "loc_16_plant_7_002"
            }, {
                "id": "loc_16_plant_1_004"
            }, {
                "id": "loc_16_plant_4_002"
            }, {
                "id": "loc_16_tree_001_3"
            }, {
                "id": "loc_16_plant_4_003"
            }, {
                "id": "loc_16_plant_2_005"
            }, {
                "id": "loc_16_plant_5_003"
            }, {
                "id": "loc_16_plant_7_003"
            }, {
                "id": "loc_16_plant_3_005"
            }, {
                "id": "loc_16_plant_3_004"
            }, {
                "id": "loc_16_plant_1_005"
            }, {
                "id": "loc_16_plant_6_002"
            }, {
                "id": "loc_16_plant_3_003"
            }, {
                "id": "loc_16_plant_11_002"
            }, {
                "id": "loc_16_plant_10_001"
            }, {
                "id": "loc_16_plant_6_003"
            }, {
                "id": "loc_16_plant_7_004"
            }, {
                "id": "loc_16_plant_3_006"
            }, {
                "id": "loc_16_tree_003_1"
            }, {
                "id": "loc_16_tree_003_2"
            }, {
                "id": "loc_16_tree_003_3"
            }, {
                "id": "loc_16_tree_004"
            }, {
                "id": "loc_16_tree_005_1"
            }, {
                "id": "loc_16_tree_001_2"
            }, {
                "id": "loc_16_tree_002_1"
            }, {
                "id": "loc_16_tree_002_2"
            }, {
                "id": "loc_16_tree_005_1"
            }, {
                "id": "loc_16_stuff"
            }, {
                "id": "loc_16_flat_ground"
            }, {
                "id": "loc_16_pavement"
            }, {
                "id": "loc_16_ground"
            }, {
                "id": "loc_16_collider"
            }

        ],
        z: 20,
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'loc8'
        },
        //mobileLook: 125,



        onInit: function() {
            var loc = this;
            this.player1 = null;
            this.player2 = null;
            this.player1_ttl = 0;
            this.player2_ttl = 0;
            this.game_id = null;
            this.renderDelay = 0;
            this.mouseDown = false;
            this.gameEndTimer = 0;
            this.hub = new p2phub();
            this.game = new CHECKERS.Game();
            chat3d.world.scene.add(this.game.controller.scene);
            this.game.controller.scene.scale.set(12.5, 12.5, 12.5);
            this.game.controller.scene.position.set(-500, 1, -500);
            //this.recorder = new charRecorder();

            //console.log(this.game.controller.scene.children);

            this.replays = [];
            /*for (let i in checkers_replays) {
                this.replays.push(JSON.parse(checkers_replays[i]));
            }*/
            this.replays = checkers_replays;

            this.gameReplay = checkers_gameReplay;

            //console.log(this.replays);



            this.keyword = [82, 82, 82, 69, 80, 76, 65, 89];
            this.curWord = [];

            this.set_player1 = function(id) {

                if (id != this.player1) {
                    if (id) {


                        if (this.player2 == chat3d.selfid) {
                            chat3d.msg.send('alert', 'player_joined');
                        }
                    }
                    if (this.player1 == chat3d.selfid && id != chat3d.selfid) {
                        console.log('%cim droped from player1 by id ' + id, ' background: #DAFF7F');
                    }

                    this.player1 = id;

                    if (!id) {
                        this.player1_ttl = 0;

                    } else {
                        this.player1_ttl = 10;


                    }
                }

            };

            this.set_player2 = function(id) {


                if (id != this.player2) {
                    if (id) {

                        console.log('%cset player 2', 'background: #DAFF7F');
                        if (this.player1 == chat3d.selfid) {
                            chat3d.msg.send('alert', 'player_joined');
                            console.log('%cSend player 2 joined alert', 'background: #DAFF7F');
                        }
                    }
                    this.player2 = id;

                    if (!id) {
                        this.player2_ttl = 0;

                    } else {
                        this.singlePlayer = false;
                        console.log('%csinglePlayer mode off', 'background: #DAFF7F');
                        this.player2_ttl = 10;

                    }
                }

            };

            this.update_player1 = function(id, age) {
                if (id == this.player1) {
                    if (age < 6) {
                        this.player1_ttl = 10;
                    } else if (age > 30) {
                        this.player1_ttl = 0;
                    }
                }

            };

            this.update_player2 = function(id, age) {
                if (id == this.player2) {
                    if (age < 6) {
                        this.player2_ttl = 10;
                    } else if (age > 30) {
                        this.player2_ttl = 0;
                    }
                }

            };

            this.interchangePlayers = function() {
                var player1 = this.player1;
                var player2 = this.player2;
                this.set_player1(player2);
                this.set_player2(player1);
                this.hub.broadcast('set_player1', this.player1);
                this.hub.broadcast('set_player2', this.player2);


            };

            this.sendGameState = function() {
                //console.log('send Game State', this.game.getBoard());
                this.hub.broadcast('gameState', {
                    game_id: this.game_id,
                    board: this.game.getBoard(),
                    player1: this.player1,
                    player2: this.player2,
                    cur_turn: this.game.getCurTurn(),
                    stateId: this.stateId
                });
                if (this.game.gameOver()) {
                    if (this.game.gameOver() == this.game.getCurTurn()) {
                        chat3d.msg.send('alert', 'game_won');
                        console.log("Congrats You win! (send state)");
                    } else {
                        chat3d.msg.send('alert', 'game_lose');
                        console.log("You lose. (send state)");
                    }
                }

            };

            this.setGameId = function(id) {
                this.game_id = id;
            };

            this.setGameState = function(data, age, counter) {
                if (this.hub.pCounters.gameState && this.hub.pCounters.gameState == counter) {
                    if (data.stateId != this.stateId) {
                        console.log('%cfalse_start', ' background: #FF2222');
                        chat3d.msg.send('alert', 'false_start');
                    }
                }
                console.log('set Game State', data);
                var gamestate = this.game.gameOver();
                this.game_id = data.game_id;
                this.set_player1(data.player1);
                this.set_player2(data.player2);
                this.game.setBoard(data.board);
                this.game.setCurTurn(data.cur_turn);
                if (!gamestate && this.game.gameOver()) {
                    if (this.game.gameOver() == this.game.getCurTurn()) {
                        chat3d.msg.send('alert', 'game_won');
                        console.log("Congrats You win! (set state)");
                    } else {
                        chat3d.msg.send('alert', 'game_lose');
                        console.log("You lose. (set state)");
                    }
                }

            };

            this.getPlayerNum = function() {
                if (this.player1 == chat3d.selfid) {
                    return 2;
                }
                if (this.player2 == chat3d.selfid) {
                    return 1;
                }
                return false;
            };


            this.isResetable = function(x, y, msg) {
                var playerNum = this.getPlayerNum();
                if (playerNum !== false) {
                    var raycast = chat3d.view.raycaster;
                    raycast.ray.origin.setFromMatrixPosition(chat3d.world.camera.matrixWorld);

                    var vector = new BABYLON.Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.9);
                    vector.unproject(chat3d.world.camera);
                    vector.sub(raycast.ray.origin).normalize();
                    raycast.far = 1000;
                    raycast.ray.direction = vector;
                    intersects = raycast.intersectObject(this.resetbox);
                    if (intersects.length) {

                        return true;
                    }
                } else if (msg) {

                    chat3d.msg.send('alert', 'cant_reset');


                }

                return false;

            };

            this.resetBut = function(x, y) {
                if (this.isResetable(x, y, true)) {
                    chat3d.msg.send('confirm', 'game_reset');

                    return true;
                }
                return false;

            };

            this.reset = function() {
                this.game.reset();
                this.setGameId(null);
                //this.set_player1(null);
                //this.set_player2(null);
            };

            this.resetbox = new BABYLON.Mesh(new BABYLON.CubeGeometry(30, 10, 30), new BABYLON.MeshBasicMaterial({
                visible: false
            }));
            this.resetbox.position.set(-660, 100, 0);
            chat3d.world.scene.add(this.resetbox);

            this.comp = new checkerscomp();

            //console.log(this.game.getBoard());
            //console.log(this.comp.getBoard());
            //console.log(this.game.boardToComp());
            //this.game.boardFromComp(this.comp.getBoard());


        },

        onMouseDown: function(e) {
            if (!this.game.gameOver() && this.getPlayerNum() !== false) {
                if (this.getPlayerNum() == this.game.getCurTurn()) {

                    this.mouseDown = true;
                    this.game.controller.onMouseDown(e, this.game.getCurTurn());
                } else {
                    if (this.game.controller.checkMousePos(e, this.game.getCurTurn())) {

                        chat3d.msg.send('alert', 'partners_turn');
                        //console.log('partners_turn');
                    }
                }
            }
            return true;
        },

        onMouseUp: function(e) {
            if (this.getPlayerNum() !== false) {
                console.log('mousUp is player');
                if (chat3d.pc_controls.move < 20) {
                    var x = e.clientX;
                    var y = e.clientY;
                    if (this.resetBut(x, y)) {

                        return true;
                    }
                }
                if (this.getPlayerNum() == this.game.getCurTurn()) {
                    this.mouseDown = false;
                    this.game.controller.onMouseUp(e);
                    console.log('mouseUp');
                }


            }
            return true;
        },

        onMouseMove: function(e) {
            if (this.getPlayerNum() !== false) {
                if (this.getPlayerNum() == this.game.getCurTurn()) {
                    this.game.controller.onMouseMove(e);
                    if (this.game.controller.selectedPiece()) {
                        //console.log(this.game.controller.selectedPiece());
                        return false;
                    }
                }
            }
            return true;
        },

        onTouchMove: function(e) {
            var pos = { layerX: e.changedTouches[0].clientX, layerY: e.changedTouches[0].clientY };

            if (this.getPlayerNum() !== false) {
                if (this.getPlayerNum() == this.game.getCurTurn()) {
                    this.game.controller.onMouseMove(pos);
                    if (this.game.controller.selectedPiece()) {
                        //console.log(this.game.controller.selectedPiece());
                        return false;
                    }
                }
            }
            return true;
        },

        onTouchUp: function(e) {
            var pos = { layerX: e.changedTouches[0].clientX, layerY: e.changedTouches[0].clientY };
            if (this.getPlayerNum() !== false) {
                console.log('mousUp is player');
                if (chat3d.pc_controls.move < 20) {
                    var x = pos.layerX;
                    var y = pos.layerY;
                    if (this.resetBut(x, y)) {

                        return true;
                    }
                }
                if (this.getPlayerNum() == this.game.getCurTurn()) {
                    this.mouseDown = false;
                    this.game.controller.onMouseUp(pos);
                    console.log('mouseUp');
                }


            }
            return true;

        },

        onTouchDown: function(e) {
            //console.log(e);
            var pos = { layerX: e.changedTouches[0].clientX, layerY: e.changedTouches[0].clientY };
            if (chat3d.move.side_speed === 0 && chat3d.move.front_speed === 0 && chat3d.move.h_rot_speed === 0) {
                if (!this.game.gameOver() && this.getPlayerNum() !== false) {
                    if (this.getPlayerNum() == this.game.getCurTurn()) {

                        this.mouseDown = true;
                        this.game.controller.onMouseDown(pos, this.game.getCurTurn());
                    } else {
                        if (this.game.controller.checkMousePos(pos, this.game.getCurTurn())) {

                            chat3d.msg.send('alert', 'partners_turn');
                            //console.log('partners_turn');
                        }
                    }
                }
            }
            return true;

        },

        onClean: function() {
            chat3d.world.scene.remove(this.game.controller.scene);
            chat3d.world.scene.remove(this.resetbox);

            chat3d.world.width = 0;
            chat3d.world.resize();

        },

        onLoop: function(delta) {
            this.player1_ttl -= delta;
            this.renderDelay += delta;
            if (this.renderDelay > 30) {
                if (this.game_id) {
                    if (this.player1 == chat3d.selfid) {
                        this.set_player1(null);
                        this.sendGameState();

                    }

                    if (this.player2 == chat3d.selfid) {
                        this.set_player2(null);
                        this.sendGameState();
                    }
                }

                return;
            }


            if (this.player1) {

                if (this.player1_ttl <= 0) {
                    this.player1 = null;
                    console.log('%cdrop player1', 'background: #DAFF7F');
                }

            }

            this.player2_ttl -= delta;
            if (this.player2) {

                if (this.player2_ttl <= 0) {
                    this.player2 = null;
                    console.log('%cdrop player2', 'background: #DAFF7F');
                }
            }

            var pos_x = chat3d.world.eyes.position.x;
            var pos_y = chat3d.world.eyes.position.z;
            //console.log(this.getPlayerNum());

            if (pos_x > -850 && pos_x < 850 && pos_y > -690 && pos_y < 690) {
                if (this.renderDelay < 30) {
                    if (!this.player1 && this.player2 != chat3d.selfid) {
                        this.set_player1(chat3d.selfid);
                        chat3d.msg.send('alert', 'ingame');
                        this.sendGameState();
                        this.player1_ttl = 10;
                        console.log('set player 1');
                    }

                    if (!this.player2 && this.player1 != chat3d.selfid) {
                        this.set_player2(chat3d.selfid);
                        chat3d.msg.send('alert', 'ingame');
                        this.sendGameState();
                        this.player2_ttl = 10;
                        console.log('set player 2');
                    }
                    if (this.player1 == chat3d.selfid && this.player1_ttl < 8) {
                        console.log('update self as player1');
                        this.player1_ttl = 10;
                        this.hub.broadcast('update_player1', this.player1);

                    }

                    if (this.player2 == chat3d.selfid && this.player2_ttl < 8) {
                        console.log('update self as player2');
                        this.player2_ttl = 10;
                        this.hub.broadcast('update_player2', this.player2);
                    }
                }
            } else {
                if (this.player1 == chat3d.selfid) {
                    this.player1 = null;
                    this.sendGameState();
                    console.log('player 1 off');
                }

                if (this.player2 == chat3d.selfid) {
                    this.player2 = null;
                    this.sendGameState();
                    console.log('player 2 off');
                }
            }
            //console.log(this.getPlayerNum(), this.game.getCurTurn());
            if (this.getPlayerNum !== false) {
                if (this.player1 && !this.player2 && this.player2_ttl < -5 && this.game.getCurTurn() === 1) {
                    if (!this.game.gameOver()) {
                        this.compTimer += delta;
                        if (this.compTimer > 1) {
                            this.compTimer = 0;
                            this.comp.setBoard(this.game.boardToComp());
                            this.comp.turn();
                            this.game.boardFromComp(this.comp.getBoard());
                            this.game.setCurTurn(2);
                            this.sendGameState();
                        }
                    }
                } else {
                    this.compTimer = 0;
                }
            } else {
                this.compTimer = 0;
            }




        },

        onView: function(x, y) {
            var pointer = false;
            var move = false;

            var playerNum = this.getPlayerNum();
            if (playerNum !== false) {
                if (this.isResetable(x, y)) {
                    pointer = true;
                    $('#world canvas').attr('title', chat3d.translate.reset);


                } else if (this.getPlayerNum() == this.game.getCurTurn()) {
                    //console.log(x, y);
                    if (this.game.controller.checkMousePos({ layerX: x, layerY: y },
                            this.game.getCurTurn())) {
                        pointer = true;
                        if (this.game.controller.getSelectedPiece()) {
                            move = true;
                        }
                    }
                }


            }

            if (pointer || move) {
                if (move) {
                    $('canvas').addClass('pointer_on_game_obj_move');
                } else {
                    $('canvas').addClass('pointer_on_game_obj');
                    $('canvas').removeClass('pointer_on_game_obj_move');
                }

            } else {
                $('canvas').removeClass('pointer_on_game_obj').removeClass('pointer_on_game_obj_move');
            }

        },

        onRender: function(delta) {
            this.renderDelay = 0;
            this.game.controller.onAnimationFrame(delta);
            if (chat3d.mobile_mode && chat3d.world.camera.fov != 95) {
                chat3d.world.camera.fov = 95;
                chat3d.world.camera.updateProjectionMatrix();
            }

            if (!chat3d.mobile_mode && chat3d.world.camera.fov != 70) {
                chat3d.world.camera.fov = 70;
                chat3d.world.camera.updateProjectionMatrix();
            }
            var targetLook = 30;
            if (this.getPlayerNum() !== false) {
                targetLook = 125;
            }
            if (this.mobileLook > targetLook) {
                this.mobileLook -= delta * 100;
                if (this.mobileLook < targetLook) {
                    this.mobileLook = targetLook;
                }
            } else if (this.mobileLook < targetLook) {
                this.mobileLook += delta * 100;
                if (this.mobileLook > targetLook) {
                    this.mobileLook = targetLook;
                }
            }

            //this.recorder.update(delta);


            if (this.replay) {
                //console.log(this.replay);
                this.game_replay.update(delta);

                for (let i in this.replay) {
                    if (this.replay[i]) {
                        this.replay[i].update(delta);

                        if (this.replay[i].done) {
                            this.replay[i] = null;
                        }
                    }
                }



            }

        },

        onKeyDown: function(e) {
            //console.log(e.keyCode);
            let curPos = this.curWord.length;
            if (this.keyword[curPos] == e.keyCode) {
                this.curWord.push(e.keyCode);
            } else {
                this.curWord = [];
            }
            if (this.curWord.length == this.keyword.length) {
                this.replay = [];
                this.game_replay = new checkersReplay(this.gameReplay, this.game, 6);

                let conf = [{
                        type: 'female2',
                        face: 'data/faces/4.jpg',
                        cap: 'female_hair_14',

                    },

                    {
                        type: 'male',
                        face: 'data/faces/2.jpg',
                        cap: 'male_hair_11',

                    },

                    /*{
                        type: 'female06',
                        face: 'data/faces/5.jpg',
                        cap: 'female_hair1_golden',

                    },

                    {
                        type: 'male06',
                        face: '../../../_files/city/default/face/m/5.jpg?',
                        cap: 'male_hair_24'
                    },

                    {
                        type: 'female05_brown',
                        face: 'data/faces/6.jpg',
                        cap: 'female_hair2',

                    }*/

                ];


                //console.log(conf[this.curReplay]);

                for (let i in this.replays) {
                    let n = parseInt(i);
                    chat3d.world.set_char({
                        id: 100501 + n,
                        type: conf[i].type,
                        face: conf[i].face,
                        cap: conf[i].cap,
                        head_color: 'F1CCBC',
                        pos: [-6000, 0], //250, 0
                        rot: 90
                    });
                    //console.log(i);
                    //this.replay.push(new hbReplayChar(this.replays[i], chat3d.world.chars[100501 + n], 160, true));
                    this.replay.push(new charReplay(this.replays[i], 100501 + n));
                }
            }


            return true;
        },

        onMessage: function(data) {
            if (data) {

                for (var i in data) {
                    var msg = data[i];
                    if (this.hub.pCounters[msg.type] && this.hub.pCounters[msg.type] > msg.counter) {
                        console.log('%c old data!!', ' background: #FF2222');

                    } else {
                        switch (msg.type) {


                            case 'gameState':
                                this.setGameState(msg.data, msg.age, msg.counter);

                                break;

                            case 'update_player1':
                                this.update_player1(msg.data, msg.age);
                                break;

                            case 'update_player2':
                                this.update_player2(msg.data, msg.age);
                                break;

                            case 'resetmsg':
                                if (msg.age < 10 && this.hub.checkCounter(msg)) {
                                    chat3d.msg.send('alert', 'reseted');
                                    console.log('%creset alert', 'background: #DAFF7F');
                                }
                                break;

                            default:
                                console.log('old or unknown', msg);
                                break;


                        }
                        this.hub.onMessage(msg);
                    }
                }
            }

        },

        /*onCharFlush: function(pool) {
            this.recorder.setActions(pool);
        },*/


        onConfirm: function(type) {


            switch (type) {
                case 'game_reset':
                    console.log('reset callback');
                    this.reset();
                    this.sendGameState();

                    if (this.player1 && this.player2) {
                        var msgto;
                        if (this.player1 == chat3d.selfid) {
                            msgto = this.player2;
                        } else {
                            msgto = this.player1;
                        }
                        this.hub.broadcast('resetmsg', msgto);
                    }

                    break;
            }

        },

        scripts: ['p2player.js', 'checkers/Game.js', 'checkers/BoardController.js', 'babylonjs/Projector.js', 'checkers/comp.js', 'hoverboard/replay.js', 'replays/checkers.js'],
        textures: ['piece_shadow.png', 'loc_16_dark_king_3_1024.jpg', 'loc_16_dark_chess_1_512.jpg', 'loc_16_light_chess_2_512.jpg', 'loc_16_light_king_2_1024.jpg'],
        geo: ['piece.js', 'light_chess.js', 'light_king.js'],
    },

    17: {
        obj: [{
            "id": "loc_15_cubes"
        }, {
            "id": "loc_15_main"
        }, {
            "id": "loc_15_collider"
        }],
        z: 20,

        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'loc8'
        },
        /*water: {
        	w: 50000,
        	h: 50000,
        	x: 0,
        	y: 0,
        	z: -390
        },*/
        onInit: function() {
            this.player1 = null;
            this.player2 = null;
            this.player1_ttl = 0;
            this.player2_ttl = 0;
            this.game_id = null;
            this.renderDelay = 0;
            this.mouseDown = false;
            this.gameEndTimer = 0;
            this.computerSkill = 0;
            this.gameTime = 0;

            //this.recorder = new tttRecorder();

            this.replays = [];
            for (let i in ttt_replays) {
                this.replays.push(ttt_replays[i]);
            }


            //this.gameReplay = checkers_gameReplay;

            //console.log(this.replays);



            this.keyword = [82, 82, 82, 69, 80, 76, 65, 89];
            this.curWord = [];


            this.singlePlayer = true;
            var _cubeGeo = new BABYLON.CubeGeometry(7.7, 7.7, 7.7);
            var cubeGeo = new BABYLON.BufferGeometry().fromGeometry(_cubeGeo);
            //console.log(cubeGeo);
            var srcGeo = chat3d.loader.geo.get('data/geometry/loc/cubes.js')
            for (var i = 0; i < 72; i++) {
                cubeGeo.attributes.uv.array[i] = srcGeo.attributes.uv.array[i];
            }
            var path = chat3d.world.maps + 'loc/';
            this.p1Cube = new BABYLON.Mesh(cubeGeo, new BABYLON.MeshBasicMaterial({
                map: chat3d.loader.textures.get(path + 'loc_15_cubes_green_E2.png')
            }));
            this.p2Cube = new BABYLON.Mesh(cubeGeo, new BABYLON.MeshBasicMaterial({
                map: chat3d.loader.textures.get(path + 'loc_15_cubes_blue_2_E2.png')
            }));
            //this.p1Cube.position.set(0, 190, -5);
            //this.p2Cube.position.set(0, 190, -5);


            /*this.p1Cube.scale.set(0.01, 0.01, 0.01);
            this.p2Cube.scale.set(0.01, 0.01, 0.01);

            this.p1Cube.position.set(0, 0.03, -0.33);
            this.p2Cube.position.set(0, 0.03, -0.33);*/

            this.p1Cube.rotation.x = Math.PI;
            this.p2Cube.rotation.x = Math.PI;
            chat3d.world.scene.add(this.p1Cube);
            chat3d.world.scene.add(this.p2Cube);


            this.p1CubePlace = new BABYLON.Object3D();
            this.p2CubePlace = new BABYLON.Object3D();
            this.p1CubePlace.position.set(0, 0.03, -0.4);
            this.p2CubePlace.position.set(0, 0.03, -0.4);


            this.reset = function() {
                if ((this.ttt.game.playerManager.players[0] instanceof Demo.Player.Computer) ||
                    (this.ttt.game.playerManager.players[1] instanceof Demo.Player.Computer)) {
                    this.computerSkill++;
                }
                if (this.ttt) {
                    chat3d.world.scene.remove(this.ttt.scene);

                }
                this.ttt = new Demo.Scene({
                    dims: 4,
                    position: new BABYLON.Vector3(0, 166, 0)
                });



                chat3d.world.scene.add(this.ttt.scene);
                this.ttt.game.init({
                    userFirst: true
                });
                this.manager = this.ttt.game;


                this.setGameId(null);
                //this.hub.broadcast('gameid', this.game_id);



                this.cur_turn = 0;
                //this.hub.broadcast('cur_turn', this.cur_turn);*/

                this.sendGameState();

                this.ttt.game.last1 = 100;
                this.ttt.game.last2 = 100;
                //this.hub.broadcast('last1', 100);
                //this.hub.broadcast('last2', 100);


            };


            this.resetIntersect = Demo.Player.User.prototype.resetIntersect;
            this.isClickable = Demo.Player.User.prototype.getCubeIntersect;

            this.resetbox = new BABYLON.Mesh(new BABYLON.CubeGeometry(20, 20, 20), new BABYLON.MeshBasicMaterial({
                visible: false
            }));
            this.resetbox.position.set(-256, 100, -256);
            chat3d.world.scene.add(this.resetbox);

            this.isResetable = function(x, y, msg) {
                var playerNum = this.getPlayerNum();
                if (playerNum !== false) {
                    var raycast = chat3d.view.raycaster;
                    raycast.ray.origin.setFromMatrixPosition(chat3d.world.camera.matrixWorld);

                    var vector = new BABYLON.Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.9);
                    vector.unproject(chat3d.world.camera);
                    vector.sub(raycast.ray.origin).normalize();
                    raycast.far = 500;
                    raycast.ray.direction = vector;
                    intersects = raycast.intersectObject(this.resetbox);
                    if (intersects.length) {



                        return true;
                    }
                } else if (msg) {
                    if (chat3d.world.eyes.position.distanceTo(this.gamezone) < 400) {
                        chat3d.msg.send('alert', 'cant_reset');
                    }

                }

                return false;

            };

            this.resetBut = function(x, y) {
                if (this.isResetable(x, y, true)) {
                    //this.reset();
                    //this.sendCubes();
                    chat3d.msg.send('confirm', 'game_reset');

                    return true;
                }
                return false;

            };

            this.sendCubes = function() {

                this.sendGameState();

            };

            this.checkForDraw = function() {
                var cubes = this.ttt.collisions;
                var colored = 0;
                for (var i in cubes) {
                    if (cubes[i].ttt) {
                        colored++;
                    }
                }

                if (colored == 64) {
                    return true;
                }
                return false;
            };

            this.checkForTTT = function(colored) {
                colored = colored || 0;
                if (this.getPlayerNum() !== false && colored !== 0) {
                    if (!this.ttt.game.gameOver) {
                        this.ttt.game.checkForTTT();
                        if (this.ttt.game.gameOver) {
                            if (this.getPlayerNum() == this.ttt.game.gameOver - 1) {
                                chat3d.msg.send('alert', 'game_won');
                                console.log("Congrats You win! (set)");
                            } else {
                                chat3d.msg.send('alert', 'game_lose');
                                console.log("You lose. (set)");
                            }
                        } else if (this.checkForDraw()) {
                            this.ttt.game.gameOver = 3;
                            chat3d.msg.send('alert', 'game_draw');
                            console.log("It's a draw! (checkForTTT)");
                        }
                    } else {
                        this.ttt.game.gameOver = false;
                        this.ttt.game.checkForTTT(true);
                    }

                } else {
                    this.ttt.game.gameOver = false;
                    this.ttt.game.checkForTTT(true);
                }
            };



            //this.sendCubes();
            this.hub = new p2phub();
            this.gamezone = new BABYLON.Vector3();
            this.resetPlayers = function() {


            };

            this.getPlayerNum = function() {
                if (!this.game_id && this.in_game_zone) {
                    return 0;
                }

                if (this.player1 == chat3d.selfid) {
                    return 0;
                } else if (this.player2 == chat3d.selfid) {
                    return 1;
                }

                return false;
            };

            this.cur_turn = 0;

            this.next_turn = function() {
                //this.ttt.game.checkForTTT(true);
                if (!this.ttt.game.gameOver) {
                    if (this.cur_turn === 0) {
                        this.cur_turn = 1;
                    } else {
                        this.cur_turn = 0;
                    }
                    //this.hub.broadcast('cur_turn', this.cur_turn);
                    this.sendGameState();
                    this.ttt.game.playerManager.players[this.cur_turn].takeTurn();
                }

            };

            this.set_player1 = function(id) {

                if (id != this.player1) {
                    if (id && (this.ttt.game.playerManager.players[0] instanceof Demo.Player.Computer)) {
                        this.ttt.game.playerManager.players[0] = new Demo.Player.User({
                            context: this.ttt.game,
                            name: 'player1',
                            cssColor: "#00FF00"
                        });

                        if (this.player2 == chat3d.selfid) {
                            chat3d.msg.send('alert', 'player_joined');
                        }
                    }
                    if (this.player1 == chat3d.selfid && id != chat3d.selfid) {
                        console.log('%cim droped from player1 by id ' + id, ' background: #DAFF7F');
                    }

                    this.player1 = id;

                    if (!id) {
                        this.player1_ttl = 0;

                    } else {
                        this.player1_ttl = 10;


                    }
                }

            };

            this.set_player2 = function(id) {


                if (id != this.player2) {
                    if (id && (this.ttt.game.playerManager.players[1] instanceof Demo.Player.Computer)) {
                        this.ttt.game.playerManager.players[1] = new Demo.Player.User({
                            context: this.ttt.game,
                            name: 'player2',
                            cssColor: "#FF0000"
                        });
                        console.log('%cset player 2', 'background: #DAFF7F');
                        if (this.player1 == chat3d.selfid) {
                            chat3d.msg.send('alert', 'player_joined');
                            console.log('%cSend player 2 joined alert', 'background: #DAFF7F');
                        }
                    }
                    this.player2 = id;

                    if (!id) {
                        this.player2_ttl = 0;

                    } else {
                        this.singlePlayer = false;
                        console.log('%csinglePlayer mode off', 'background: #DAFF7F');
                        this.player2_ttl = 10;

                    }
                }

            };

            this.update_player1 = function(id, age) {
                if (id == this.player1) {
                    if (age < 6) {
                        this.player1_ttl = 10;
                    } else if (age > 30) {
                        this.player1_ttl = 0;
                    }
                }

            };

            this.update_player2 = function(id, age) {
                if (id == this.player2) {
                    if (age < 6) {
                        this.player2_ttl = 10;
                    } else if (age > 30) {
                        this.player2_ttl = 0;
                    }
                }

            };

            this.isFirstTurn = function() {
                var cubes = this.ttt.collisions;

                for (var i in cubes) {
                    if (cubes[i].ttt) {
                        return false;
                    }
                }
                return true;

            };

            this.interchangePlayers = function() {
                var player1 = this.player1;
                var player2 = this.player2;
                this.set_player1(player2);
                this.set_player2(player1);
                this.hub.broadcast('set_player1', this.player1);
                this.hub.broadcast('set_player2', this.player2);


            }

            this.setGameId = function(id) {


                this.game_id = id;
            };



            this.sendGameState = function() {
                var list = [];
                var cubes = this.ttt.collisions;

                var last1;
                var last2;
                for (var i in cubes) {
                    list.push(cubes[i].ttt);
                    if (cubes[i].last) {
                        if (cubes[i].last == 'player1') {
                            last1 = i;
                        } else {
                            last2 = i;
                        }

                        cubes[i].last = false;
                    }
                }
                this.stateId = Math.random();

                this.hub.broadcast('gameState', {
                    game_id: this.game_id,
                    cubes: list,
                    player1: this.player1,
                    player2: this.player2,
                    cur_turn: this.cur_turn,
                    stateId: this.stateId
                });

                if (this.recorder && this.recorder.setGameState) {
                    this.recorder.setGameState({
                        game_id: this.game_id,
                        cubes: list,
                        player1: this.player1,
                        player2: this.player2,
                        cur_turn: this.cur_turn,
                        stateId: this.stateId
                    });
                }

                if (last1 !== undefined) {
                    this.hub.broadcast('last1', last1);
                    this.ttt.game.last1 = (this.player1 == chat3d.selfid) ? 101 : last1;
                    this.ttt.game.last1Time = 0;
                }

                if (last2 !== undefined) {
                    this.hub.broadcast('last2', last2);
                    this.ttt.game.last2 = (this.player2 == chat3d.selfid) ? 101 : last2;
                    this.ttt.game.last2Time = 0;
                }

                if (this.ttt.game.gameOver && this.getPlayerNum() !== false) {
                    if (this.getPlayerNum() == this.ttt.game.gameOver - 1) {
                        chat3d.msg.send('alert', 'game_won');
                        console.log("Congrats You win!");
                    } else {
                        chat3d.msg.send('alert', 'game_lose');
                        console.log("You lose. (send)");
                    }
                } else {
                    if (this.checkForDraw()) {
                        this.ttt.game.gameOver = 3;
                        chat3d.msg.send('alert', 'game_draw');
                        console.log("It's a draw! (send)");
                    }
                }

            };

            this.setGameState = function(data, age, counter) {
                if (this.hub.pCounters.gameState && this.hub.pCounters.gameState == counter) {
                    if (data.stateId != this.stateId) {
                        console.log('%cfalse_start', ' background: #FF2222');
                        chat3d.msg.send('alert', 'false_start');
                    }
                }
                this.game_id = data.game_id;
                var cubes = this.ttt.collisions;
                var colored = 0;
                for (var i in cubes) {

                    if (cubes[i].ttt) {
                        colored++;
                    }
                }

                for (var i in data.cubes) {
                    if (cubes[i]) {
                        cubes[i].ttt = data.cubes[i];
                    }
                }
                //this.player1 = data.player1;
                //this.player2 = data.player2;
                this.set_player1(data.player1);
                this.set_player2(data.player2);

                this.cur_turn = data.cur_turn;
                this.stateId = data.stateId;

                this.checkForTTT(colored);
                if (this.ttt.game.gameOver) {
                    this.gameEndTimer = age;
                } else {
                    this.gameEndTimer = 0;
                }

            };

            this.set_last1 = function(n, age, counter) {
                if (age < 10 && n != this.ttt.game.last1 && counter > parseInt(this.hub.pCounters.last1)) {
                    this.ttt.game.last1 = n;
                    this.ttt.game.last1Time = 0;
                }
            };

            this.set_last2 = function(n, age, counter) {
                if (age < 10 && n != this.ttt.game.last2 && counter > parseInt(this.hub.pCounters.last2)) {
                    this.ttt.game.last2 = n;
                    this.ttt.game.last2Time = 0;

                }
            };

            //this.reset();
            this.ttt = new Demo.Scene({
                dims: 4,
                position: new BABYLON.Vector3(0, 166, 0)
            });



            chat3d.world.scene.add(this.ttt.scene);
            this.ttt.game.init({
                userFirst: true
            });
            this.manager = this.ttt.game;
            this.goResetBox = new BABYLON.Mesh(new BABYLON.CubeGeometry(270, 270, 270), new BABYLON.MeshBasicMaterial({ visible: false }));
            this.goResetBox.position.y = 175;
            chat3d.world.scene.add(this.goResetBox);
            this.isGameOverReset = function(x, y) {
                if (!this.ttt.game.gameOver) {
                    return false;
                }
                if (this.getPlayerNum() !== false) {
                    var raycast = chat3d.view.raycaster;
                    raycast.ray.origin.setFromMatrixPosition(chat3d.world.camera.matrixWorld);

                    var vector = new BABYLON.Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.9);
                    vector.unproject(chat3d.world.camera);
                    vector.sub(raycast.ray.origin).normalize();
                    raycast.far = 500;
                    raycast.ray.direction = vector;

                    intersects = raycast.intersectObject(this.goResetBox);
                    if (intersects.length) {
                        return true;
                    }
                }

                return false;
            };


        },

        onClean: function() {
            chat3d.world.scene.remove(this.ttt.scene);
            chat3d.world.scene.remove(this.resetbox);
            chat3d.world.scene.remove(this.p1Cube);
            chat3d.world.scene.remove(this.p2Cube);
            chat3d.world.scene.remove(this.goResetBox);
        },

        onMouseDown: function() {
            this.mouseDown = true;
            return true;
        },

        onMouseUpEnd: function(e) {
            this.mouseDown = false;
            if (chat3d.pc_controls.move < 20) {
                var x = e.clientX;
                var y = e.clientY;
                var pos = {
                    x: ((x - e.currentTarget.offsetLeft) / e.currentTarget.width) * 2 - 1,
                    y: -((y - e.currentTarget.offsetTop) / e.currentTarget.height) * 2 + 1
                };

                if (this.resetBut(x, y)) {

                    return true;
                }

                if (this.isGameOverReset(x, y)) {
                    chat3d.msg.send('confirm', 'game_reset');
                    return true;
                }
                var playerObj;
                if (this.ttt.game.playerManager.players[0] instanceof Demo.Player.User) {
                    playerObj = this.ttt.game.playerManager.players[0];
                } else {
                    playerObj = this.ttt.game.playerManager.players[1];
                }
                var intersected = playerObj.getCubeIntersect(pos);


                if (intersected.length) {
                    var playerNum = this.getPlayerNum();
                    if (playerNum !== false) {


                        if (!this.ttt.game.gameOver) {
                            if (this.cur_turn == playerNum) {
                                //this.ttt.game.checkForTTT(true);
                                if (!this.game_id) {
                                    if (intersected.length && intersected[0].object.ttt === null) {
                                        console.log('new game ', this.player1, this.player2);
                                        if (this.player2 == chat3d.selfid) {
                                            this.set_player2(this.player1);

                                        }
                                        this.set_player1(chat3d.selfid);
                                        //this.hub.broadcast('set_player1', this.player1, 'force');
                                        //this.hub.broadcast('set_player2', this.player2, 'force');
                                        if (!this.player2) {
                                            this.singlePlayer = true;
                                        }

                                        this.setGameId(chat3d.selfid);
                                        //this.hub.broadcast('gameid', this.game_id);

                                        this.ttt.game.playerManager.players[playerNum].selectCube(pos);

                                    }

                                } else {
                                    this.ttt.game.playerManager.players[playerNum].selectCube(pos);
                                }



                            } else {
                                chat3d.msg.send('alert', 'partners_turn');
                                /*if (!this.isFirstTurn()) {
                                	chat3d.msg.send('alert', 'partners_turn');
                                } else {
                                	this.interchangePlayers();
                                	this.ttt.game.playerManager.players[0].selectCube(pos);

                                }*/
                            }
                        } else {
                            console.log('%cgameover', 'background: #DAFF7F');
                            chat3d.msg.send('alert', 'game_over');
                        }
                    } else {
                        if (chat3d.world.eyes.position.distanceTo(this.gamezone) < 600) {
                            chat3d.msg.send('alert', 'game_in_progress');
                        }

                    }
                }

            }
            //console.log(this.player1, this.player2, chat3d.selfid);

            //return true;

        },

        onView: function(x, y) {
            var pointer = false;

            if (this.isResetable(x, y) || this.isGameOverReset(x, y)) {
                pointer = true;
                $('#world canvas').attr('title', chat3d.translate.reset);

            } else if (!this.ttt.game.gameOver &&
                this.in_game_zone &&
                this.getPlayerNum() !== false &&
                this.cur_turn == this.getPlayerNum() &&
                !this.mouseDown &&
                this.isClickable({
                    x: (x / window.innerWidth) * 2 - 1,
                    y: -(y / window.innerHeight) * 2 + 1
                }, true).length) {
                pointer = true;
                $('#world canvas').attr('title', "");
            } else {
                pointer = false;
                $('#world canvas').attr('title', "");
            }


            if (pointer) {
                $('canvas').addClass('pointer_on_game_obj');

            } else {
                $('canvas').removeClass('pointer_on_game_obj');
            }



        },

        onTouchUpEnd: function(e) {
            var x = e.changedTouches[0].clientX;
            var y = e.changedTouches[0].clientY;
            var pos = {
                x: ((x) / window.innerWidth) * 2 - 1,
                y: -((y) / window.innerHeight) * 2 + 1
            };
            if (Math.abs(x - chat3d.touch_controls.start_touch.x) < 100 && Math.abs(y - chat3d.touch_controls.start_touch.y) < 100) {
                if (this.resetBut(x, y)) {
                    return true;
                }

                if (this.isGameOverReset(x, y)) {
                    chat3d.msg.send('confirm', 'game_reset');
                    return true;
                }

                var playerObj;
                if (this.ttt.game.playerManager.players[0] instanceof Demo.Player.User) {
                    playerObj = this.ttt.game.playerManager.players[0];
                } else {
                    playerObj = this.ttt.game.playerManager.players[1];
                }
                var intersected = playerObj.getCubeIntersect(pos);

                if (intersected.length) {
                    var playerNum = this.getPlayerNum();
                    if (playerNum !== false) {

                        if (!this.ttt.game.gameOver) {
                            if (this.cur_turn == playerNum) {
                                //this.ttt.game.checkForTTT(true);


                                //this.ttt.game.playerManager.players[playerNum].selectCube(pos);
                                if (!this.game_id) {
                                    if (intersected.length && intersected[0].object.ttt === null) {
                                        if (this.player2 == chat3d.selfid) {
                                            this.set_player2(this.player1);

                                        }
                                        this.set_player1(chat3d.selfid);
                                        //this.hub.broadcast('set_player1', this.player1, 'force');
                                        //this.hub.broadcast('set_player2', this.player2, 'force');
                                        if (!this.player2) {
                                            this.singlePlayer = true;
                                        }

                                        this.setGameId(chat3d.selfid);
                                        //this.hub.broadcast('gameid', this.game_id);

                                        this.ttt.game.playerManager.players[playerNum].selectCube(pos);

                                    }

                                } else {
                                    this.ttt.game.playerManager.players[playerNum].selectCube(pos);
                                }

                            } else {
                                chat3d.msg.send('alert', 'partners_turn');
                                /*if (!this.isFirstTurn()) {
                                	chat3d.msg.send('alert', 'partners_turn');
                                } else {
                                	this.interchangePlayers();

                                	this.ttt.game.playerManager.players[0].selectCube(pos);

                                }*/
                            }
                        } else {
                            console.log('%cgameover', 'background: #DAFF7F');
                            chat3d.msg.send('alert', 'game_over');

                        }
                    } else {
                        if (chat3d.world.eyes.position.distanceTo(this.gamezone) < 600) {
                            chat3d.msg.send('alert', 'game_in_progress');
                        }
                    }
                }
            }

            //return true;

        },


        onLoop: function(delta) {
            //console.log(chat3d.selfid);
            this.gameTime += delta;
            //this.hub.onLoop(delta);
            this.player1_ttl -= delta;
            this.renderDelay += delta;
            if (this.renderDelay > 30) {
                if (this.game_id) {
                    if (this.player1 == chat3d.selfid) {
                        this.set_player1(null);
                        this.sendGameState();

                    }

                    if (this.player2 == chat3d.selfid) {
                        this.set_player2(null);
                        this.sendGameState();
                    }
                }

                return;
            }


            if (this.player1) {


                //console.log(this.player1_ttl);
                if (this.player1_ttl <= 0) {
                    this.player1 = null;
                    console.log('%cdrop player1', 'background: #DAFF7F');
                }

                if (this.game_id && this.player2_ttl < -3 && this.player1 == chat3d.selfid) {
                    if (this.ttt.game.playerManager.players[1] instanceof Demo.Player.User) {
                        this.ttt.game.playerManager.players[1] = new Demo.Player.Computer({
                            context: this.ttt.game,
                            name: 'player2',
                            cssColor: "#FF0000",
                            skill: this.computerSkill
                        });
                        if (!this.singlePlayer) {
                            console.log('comp joined');
                            if (this.gameTime > 10) {
                                chat3d.msg.send('alert', 'comp_joined');
                            }
                        }
                        if (this.cur_turn == 1) {
                            //this.ttt.game.checkForTTT(true);
                            if (!this.ttt.game.gameOver) {
                                this.ttt.game.playerManager.players[1].takeTurn();
                                console.log('comp takeTurn');
                            }
                        }
                    }

                }

            }
            this.player2_ttl -= delta;
            //console.log(this.player2_ttl);

            if (this.player2) {

                if (this.player2_ttl <= 0) {
                    this.player2 = null;
                    console.log('%cdrop player2', 'background: #DAFF7F');
                }

                if (this.game_id && this.player1_ttl < -3 && this.player2 == chat3d.selfid) {
                    if (this.ttt.game.playerManager.players[0] instanceof Demo.Player.User) {
                        this.ttt.game.playerManager.players[0] = new Demo.Player.Computer({
                            context: this.ttt.game,
                            name: 'player1',
                            cssColor: "#00FF00",
                            skill: this.computerSkill
                        });
                        if (this.gameTime > 10) {
                            chat3d.msg.send('alert', 'comp_joined');
                        }
                        if (this.cur_turn == 0) {
                            //this.ttt.game.playerManager.players[0].takeTurn();
                            //this.cur_turn = 1;
                            //this.hub.broadcast('cur_turn', this.cur_turn);
                            //this.ttt.game.checkForTTT(true);
                            if (!this.ttt.game.gameOver) {
                                this.ttt.game.playerManager.players[0].takeTurn();
                                console.log('comp takeTurn');
                            }
                        }
                    }

                }
            }

            if (!this.player1 && !this.player2 && this.player1_ttl < 7) {
                if (this.ttt.game.playerManager.players[0] instanceof Demo.Player.Computer) {
                    this.ttt.game.playerManager.players[0] = new Demo.Player.User({
                        context: this.ttt.game,
                        name: 'player1',
                        cssColor: "#00FF00"
                    });
                }

                if (this.ttt.game.playerManager.players[1] instanceof Demo.Player.Computer) {
                    this.ttt.game.playerManager.players[1] = new Demo.Player.User({
                        context: this.ttt.game,
                        name: 'player2',
                        cssColor: "#FF0000"
                    });
                }

            }




            if (chat3d.world.eyes.position.distanceTo(this.gamezone) < 750) {
                this.in_game_zone = true;

                if (this.game_id && this.renderDelay <= 30) {



                    if (!this.player1 && this.player2 != chat3d.selfid && this.player1_ttl < 7) {
                        //this.player1 = chat3d.selfid;
                        this.set_player1(chat3d.selfid);
                        chat3d.msg.send('alert', 'ingame');
                        //this.hub.broadcast('set_player1', this.player1);
                        this.sendGameState();
                        //this.resetPlayers();
                        this.player1_ttl = 10;
                        console.log('set player 1');
                        if (!this.player2) {
                            this.singlePlayer = true;
                        }
                        //delete localStorage['ttt_last_player_2'];
                    }
                    if (!this.player2 && this.player1 != chat3d.selfid && this.player2_ttl < 7) {
                        //this.player2 = chat3d.selfid;
                        this.set_player2(chat3d.selfid);
                        chat3d.msg.send('alert', 'ingame');
                        //this.hub.broadcast('set_player2', this.player2);
                        this.sendGameState();
                        //this.resetPlayers();
                        this.player2_ttl = 10;
                        console.log('set player 2');
                        //localStorage['ttt_last_player_2'] = true;
                    }
                }






                if (this.player1 == chat3d.selfid && this.player1_ttl < 8) {
                    console.log('update self as player1');

                    this.player1_ttl = 10;
                    this.hub.broadcast('update_player1', this.player1);

                }

                /*if (this.player1 == this.player2 && this.player1 == chat3d.selfid) {
                	this.player2 = null;
                	this.hub.broadcast('set_player2', null);
                }*/

                if (this.player2 == chat3d.selfid && this.player2_ttl < 8) {
                    console.log('update self as player2');
                    this.player2_ttl = 10;
                    this.hub.broadcast('update_player2', this.player2);
                }
            } else {
                this.in_game_zone = false;
                if (this.player1 == chat3d.selfid) {
                    this.player1 = null;
                    //chat3d.msg.send('alert', 'leftgame');
                    //this.hub.broadcast('set_player1', null);
                    this.sendGameState();
                    this.ttt.game.playerManager.players[0].resetIntersect();
                    //this.resetPlayers();
                    console.log('player 1 off');
                }
                if (this.player2 == chat3d.selfid) {
                    this.player2 = null;
                    //chat3d.msg.send('alert', 'leftgame');
                    //this.hub.broadcast('set_player2', null);
                    this.sendGameState();
                    this.ttt.game.playerManager.players[1].resetIntersect();
                    //this.resetPlayers();
                    console.log('player 2 off');
                }

            }



            if (chat3d.selfid != 'dummy') {
                if (this.ttt.game.gameOver) {
                    if (!this.player1 && !this.player2) {
                        var minid = chat3d.selfid;
                        for (var i in chat3d.world.chars) {
                            minid = Math.min(chat3d.world.chars[i].id, minid);
                        }
                        if (minid == chat3d.selfid) {
                            this.reset();
                        }
                    } else {
                        this.gameEndTimer += delta;
                        if (this.gameEndTimer > 30) {
                            var minid = chat3d.selfid;
                            this.gameEndTimer = 0;
                            for (var i in chat3d.world.chars) {
                                minid = Math.min(chat3d.world.chars[i].id, minid);
                            }
                            if (minid == chat3d.selfid) {
                                this.reset();

                            }
                        }
                    }



                } else {
                    this.gameEndTimer = 0;
                }
            }



            //this.p1Cube.rotation.y += delta;
            //this.p2Cube.rotation.y += delta;
        },

        /*onCharFlush: function(pool) {
            this.recorder.setActions(pool);
        },*/

        onRender: function(delta) {
            this.renderDelay = 0;
            this.ttt.game.last1Time += delta;
            this.ttt.game.last2Time += delta;
            /*if (chat3d.world.eyes.position.distanceTo(this.gamezone) > 1000) {
            	chat3d.world.water.visible = true;

            }
            else {
            	chat3d.world.water.visible = false;

            }*/

            if (this.ttt.game.last1 != 100 && this.ttt.game.last1Time > 2) {
                //this.hub.broadcast('last1', 100);
                this.ttt.game.last1 = 100;
                this.ttt.game.last1Time = 0;
            }

            if (this.ttt.game.last2 != 100 && this.ttt.game.last2Time > 2) {
                //this.hub.broadcast('last2', 100);
                this.ttt.game.last2 = 100;
                this.ttt.game.last2Time = 0;
            }

            this.ttt.game.setUniforms(this.mapMult, delta);

            if (!this.player1) {
                if (this.p1CubePlace.parent) {
                    this.p1CubePlace.parent.remove(this.p1CubePlace);

                    console.log('%c remove player2 cube', 'background: #DAFF7F');
                }
                this.p1Cube.visible = false;
            } else {
                if (chat3d.world.chars[this.player1] && chat3d.world.chars[this.player1].head) {
                    if (chat3d.world.chars[this.player1].head != this.p1CubePlace.parent) {
                        chat3d.world.chars[this.player1].head.add(this.p1CubePlace);

                        console.log('%c add player1 cube', 'background: #DAFF7F');
                    }
                    chat3d.world.chars[this.player1].pivot.updateMatrix(true, true);
                    //chat3d.world.chars[this.player1].pivot.updateMatrixWorld(true, true);
                    chat3d.world.chars[this.player1].forceAnim = true;
                    this.p1Cube.visible = true;
                    this.p1Cube.position.setFromMatrixPosition(this.p1CubePlace.matrixWorld);
                    if (!chat3d.world.chars[this.player1].visible) {
                        this.p1Cube.visible = false;
                    }
                } else {
                    if (this.p1CubePlace.parent) {
                        this.p1CubePlace.parent.remove(this.p1CubePlace);
                        console.log('%c remove player1 cube', 'background: #DAFF7F');
                    }
                    this.p1Cube.visible = false;
                }
            }

            if (!this.player2) {
                if (this.p2CubePlace.parent) {
                    this.p2CubePlace.parent.remove(this.p2CubePlace);
                    console.log('%c remove player2 cube', 'background: #DAFF7F');
                }
                this.p2Cube.visible = false;
            } else {
                if (chat3d.world.chars[this.player2] && chat3d.world.chars[this.player2].head) {
                    if (chat3d.world.chars[this.player2].head != this.p2CubePlace.parent) {
                        chat3d.world.chars[this.player2].head.add(this.p2CubePlace);

                        console.log('%c add player2 cube', 'background: #DAFF7F');
                    }
                    chat3d.world.chars[this.player2].pivot.updateMatrix(true, true);
                    //chat3d.world.chars[this.player2].pivot.updateMatrixWorld(true, true);
                    chat3d.world.chars[this.player2].forceAnim = true;
                    this.p2Cube.visible = true;
                    this.p2Cube.position.setFromMatrixPosition(this.p2CubePlace.matrixWorld);
                    if (!chat3d.world.chars[this.player2].visible) {
                        this.p2Cube.visible = false;
                    }
                } else {
                    if (this.p2CubePlace.parent) {
                        this.p2CubePlace.parent.remove(this.p2CubePlace);
                        console.log('%c remove player2 cube', 'background: #DAFF7F');
                    }
                    this.p2Cube.visible = false;
                }
            }

            if (!this.game_id) {
                this.p1Cube.visible = false;
                this.p2Cube.visible = false;

            }

            //this.recorder.update(delta);
            if (this.gameReplay) {
                this.gameReplay.update(delta);
            }

            if (this.replay) {
                //console.log(this.replay);
                //this.game_replay.update(delta);

                for (let i in this.replay) {
                    if (this.replay[i]) {
                        this.replay[i].update(delta);

                        if (this.replay[i].done) {
                            this.replay[i] = null;
                        }
                    }
                }



            }

        },


        onKeyDown: function(e) {
            //console.log(e.keyCode);
            let curPos = this.curWord.length;
            if (this.keyword[curPos] == e.keyCode) {
                this.curWord.push(e.keyCode);
            } else {
                this.curWord = [];
            }
            if (this.curWord.length == this.keyword.length) {
                this.replay = [];
                this.game_replay = new checkersReplay(this.gameReplay, this.game);

                let conf = [{
                        type: 'female2',
                        face: 'data/faces/4.jpg',
                        cap: 'female_hair_14',

                    },

                    {
                        type: 'male',
                        face: 'data/faces/2.jpg',
                        cap: 'male_hair_11',

                    },

                    /*{
                        type: 'female06',
                        face: 'data/faces/5.jpg',
                        cap: 'female_hair1_golden',

                    },

                    {
                        type: 'male06',
                        face: '../../../_files/city/default/face/m/5.jpg?',
                        cap: 'male_hair_24'
                    },

                    {
                        type: 'female05_brown',
                        face: 'data/faces/6.jpg',
                        cap: 'female_hair2',

                    }*/

                ];


                //console.log(conf[this.curReplay]);

                for (let i in this.replays) {
                    let n = parseInt(i);
                    chat3d.world.set_char({
                        id: 100501 + n,
                        type: conf[i].type,
                        face: conf[i].face,
                        cap: conf[i].cap,
                        head_color: 'F1CCBC',
                        pos: [-6000, 0], //250, 0
                        rot: 90
                    });

                    /*for (let l in this.replays[i]) {
                        chat3d.world.set_chars_actions([{
                            id: 100501 + n,
                            pool: this.replays[i][l]
                        }]);
                    }*/

                    /*chat3d.world.set_chars_actions([{
                        id: 100501+ n,
                        pool: this.pool
                    }]);*/
                    //console.log(i);
                    //this.replay.push(new hbReplayChar(this.replays[i], chat3d.world.chars[100501 + n], 170, true));
                    this.replay.push(new charReplay(this.replays[i], 100501 + n));
                }

                this.gameReplay = new tttReplay(ttt_gamereplay, this);
            }


            return true;
        },

        onMessage: function(data) {
            if (data) {

                //console.log(data);
                for (var i in data) {
                    var msg = data[i];
                    if (this.hub.pCounters[msg.type] && this.hub.pCounters[msg.type] > msg.counter) {
                        console.log('%c old data!!', ' background: #FF2222');
                        console.log(msg.type, this.hub.pCounters[msg.type], msg.counter);

                    } else {
                        switch (msg.type) {


                            case 'last1':
                                this.set_last1(msg.data, msg.age, msg.counter);
                                break;

                            case 'last2':
                                this.set_last2(msg.data, msg.age, msg.counter);
                                break;

                            case 'gameState':
                                this.setGameState(msg.data, msg.age, msg.counter);

                                break;

                            case 'update_player1':
                                this.update_player1(msg.data, msg.age);
                                break;

                            case 'update_player2':
                                this.update_player2(msg.data, msg.age);
                                break;

                            case 'resetmsg':
                                if (msg.age < 10 && this.hub.checkCounter(msg)) {
                                    chat3d.msg.send('alert', 'reseted');
                                    console.log('%creset alert', 'background: #DAFF7F');
                                }
                                break;

                            default:
                                console.log('old or unknown', msg);
                                break;


                        }
                        this.hub.onMessage(msg);
                    }
                }
            }

        },


        onConfirm: function(type) {
            console.log(type);

            switch (type) {
                case 'game_reset':
                    console.log('reset callback');
                    this.reset();
                    //this.sendCubes();
                    if (this.player1 && this.player2) {
                        var msgto;
                        if (this.player1 == chat3d.selfid) {
                            msgto = this.player2;
                        } else {
                            msgto = this.player1;
                        }
                        this.hub.broadcast('resetmsg', msgto);
                    }

                    break;
            }

        },
        mobileLook: 25,

        textures: ['loc_15_cubes_blue_2_E2.png', 'loc_15_cubes_green_E2.png', 'loc_15_cubes_grey_3_E1.png'],
        scripts: ['p2player.js', 'babylonjs/Projector.js', 'ttt/config.js', 'ttt/interactions.js', 'ttt/player-manager.js', 'ttt/scene.js', 'ttt/game.js', 'ttt/computer.js', 'ttt/camera.js', 'ttt/setup.js', 'ttt/user.js', 'ttt/util.js', 'ttt/cubes.js', 'hoverboard/replay.js', 'replays/ttt.js']

    },

    18: {
        obj: [{ "id": "loc_17_ground" }, { "id": "loc_17_main" }, { "id": "loc_17_collider" }, { "id": "mc_plant_103_001" }, { "id": "mc_tree_1_001" }, { "id": "mc_plant_101_002" }, { "id": "mc_plant_110_001" }, { "id": "mc_plant_103_002" }, { "id": "mc_plant_111_001" }, { "id": "mc_plant_111_002" }, { "id": "mc_plant_116_001" }, { "id": "mc_plant_206_001" }, { "id": "mc_plant_204_002" }, { "id": "mc_plant_201_001" }, { "id": "mc_plant_214_001" }, { "id": "mc_plant_103_003" }, { "id": "mc_plant_101_001" }, { "id": "mc_plant_116_002" }, { "id": "mc_plant_116_003" }, { "id": "mc_plant_103_004" }, { "id": "mc_plant_111_003" }, { "id": "mc_plant_208_001" }, { "id": "mc_plant_110_002" }, { "id": "mc_plant_201_002" }, { "id": "mc_plant_204_001" }, { "id": "mc_plant_208_002" }, { "id": "mc_plant_206_002" }, { "id": "mc_tree_3_001" }, { "id": "mc_tree_3_002" }, { "id": "mc_tree_4_001" }, { "id": "mc_tree_5_002" }, { "id": "mc_tree_1_002" }, { "id": "mc_tree_2_001" }, { "id": "mc_tree_2_002" }, { "id": "mc_tree_5_001" }, { "id": "mc_tree_3_003" }, { "id": "mc_plant_111_004" }, { "id": "mc_plant_201_003" }, { "id": "mc_plant_201_004" }],
        z: 20,
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'loc8'
        },
        mobileLook: -15,

        onInit: function() {
            this.player1 = null;
            this.player2 = null;
            this.player1_ttl = 0;
            this.player2_ttl = 0;
            this.game_id = null;
            this.renderDelay = 0;
            this.gameEndTimer = 0;
            this.gameTime = 0;
            this.singlePlayer = true;
            //this.cur_turn = 0;

            //this.recorder = new c4Recorder();

            this.gameReplay = c4_gameplay;

            this.replays = c4_replays;

            this.keyword = [82, 82, 82, 69, 80, 76, 65, 89];
            this.curWord = [];

            this.resetbox = new BABYLON.Mesh(new BABYLON.CubeGeometry(40, 40, 40), new BABYLON.MeshBasicMaterial({
                visible: false
            }));
            this.resetbox.position.set(735, 80, 35);
            chat3d.world.scene.add(this.resetbox);


            this.hub = new p2phub();
            this.gamezone = new BABYLON.Vector3();

            var geopath = 'data/geometry/loc/';
            var pointer_geo = chat3d.loader.geo.get(geopath + 'loc_17_pointer.js');
            pointer_geo.center();
            var texpath = chat3d.world.maps + 'loc/';
            /*if (!chat3d.mobile_mode) {
                this.pointer1 = new BABYLON.Mesh(pointer_geo, new BABYLON.MeshBasicMaterial({ map: chat3d.loader.textures.get(texpath + 'loc_17_pointer_light_001.jpg') }));
                this.pointer2 = new BABYLON.Mesh(pointer_geo, new BABYLON.MeshBasicMaterial({ map: chat3d.loader.textures.get(texpath + 'loc_17_pointer_red_001.jpg') }));
            } else {
                this.pointer1 = new BABYLON.Object3D();
                this.pointer2 = new BABYLON.Object3D();
            }*/



            this.pointer1 = new BABYLON.Object3D();
            this.pointer2 = new BABYLON.Object3D();

            this.pointer1.position.set(0, 600, 0);
            this.pointer2.position.set(0, 600, 0);
            //chat3d.world.scene.add(this.pointer1);
            //chat3d.world.scene.add(this.pointer2);

            /*if (!chat3d.mobile_mode) {
                this.pointer1Mesh = new BABYLON.Mesh(pointer_geo, new BABYLON.MeshBasicMaterial({ map: chat3d.loader.textures.get(texpath + 'loc_17_pointer_light_001.jpg') }));
                this.pointer2Mesh = new BABYLON.Mesh(pointer_geo, new BABYLON.MeshBasicMaterial({ map: chat3d.loader.textures.get(texpath + 'loc_17_pointer_red_001.jpg') }));
                chat3d.world.scene.add(this.pointer1Mesh);
                chat3d.world.scene.add(this.pointer2Mesh);
                this.pointer1Mesh.position.copy(this.pointer1.position);
                this.pointer2Mesh.position.copy(this.pointer2.position);
            }*/

            var chip_geo = chat3d.loader.geo.get(geopath + 'loc_17_chip.js');
            chip_geo.center();
            var _boardGeo = new BABYLON.Geometry();
            for (var i = 0; i < 6; i++) {

                for (var j = 0; j < 7; j++) {
                    var mesh = new BABYLON.Mesh(chip_geo);


                    mesh.position.set(j * 87, 5 * 87 - i * 87, 0);
                    mesh.updateMatrixWorld();
                    _boardGeo.merge(chip_geo, mesh.matrixWorld);
                }
            }
            var boardGeo = new BABYLON.BufferGeometry();
            boardGeo.fromGeometry(_boardGeo);
            var index = new Float32Array(1440 * 42);

            var n = 0;
            for (i = 0; i < 1440 * 42; i += 1440) {
                for (var ii = 0; ii < 1440; ii++) {
                    index[i + ii] = n;
                }

                n++;
            }
            boardGeo.addAttribute('indexf', new BABYLON.BufferAttribute(index, 1));
            boardGeo.attributes.indexf.needsUpdate = true;


            this.mapMult = new Float32Array(4 * 42);


            var uniforms = {
                map1: {
                    type: "t",
                    value: chat3d.loader.textures.get(texpath + 'loc_17_chip_light_002.jpg')
                },

                map2: {
                    type: "t",
                    value: chat3d.loader.textures.get(texpath + 'loc_17_chip_red_004_E1.jpg')
                },



                mapMult: {
                    type: "fv",
                    value: this.mapMult
                }

            };

            //console.log(chip_geo);
            this.board = new BABYLON.Mesh(boardGeo, new BABYLON.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: BABYLON.ShaderLib.c4board.vertexShader,
                fragmentShader: BABYLON.ShaderLib.c4board.fragmentShader
            }));
            this.board.position.set(-263, 47, -30);
            chat3d.world.scene.add(this.board);


            this.p1Mark = new BABYLON.Mesh(chip_geo, new BABYLON.MeshBasicMaterial({
                map: chat3d.loader.textures.get(texpath + 'loc_17_chip_light_002.jpg')
            }));
            this.p2Mark = new BABYLON.Mesh(chip_geo, new BABYLON.MeshBasicMaterial({
                map: chat3d.loader.textures.get(texpath + 'loc_17_chip_red_004_E1.jpg')
            }));

            this.p1Mark.scale.set(0.2, 0.2, 0.2);
            this.p2Mark.scale.set(0.2, 0.2, 0.2);

            chat3d.world.scene.add(this.p1Mark);
            chat3d.world.scene.add(this.p2Mark);

            this.p1MarkPlace = new BABYLON.Object3D();
            this.p2MarkPlace = new BABYLON.Object3D();
            this.p1MarkPlace.position.set(0, 0.03, -0.37);
            this.p2MarkPlace.position.set(0, 0.03, -0.37);



            this.reset = function() {
                /*if (this.c4) {
                    chat3d.world.scene.remove(this.c4.board);
                }*/
                var ai_dif = 0;
                if (this.c4) {
                    if (this.c4.players[0].type == 'comp' || this.c4.players[1].type == 'comp') {
                        ai_dif = this.c4.ai_dif + 0.2;

                    }
                }

                this.c4 = new Connect4();
                this.c4.board.position.set(-260, 40, 0);
                this.c4.board.updateMatrixWorld();
                //chat3d.world.scene.add(this.c4.board);
                this.setGameId(null);
                this.set_player1(null);
                this.set_player2(null);

                this.c4.ai_dif = ai_dif;

            };

            this.setGameId = function(id) {
                this.game_id = id;
                this.player1_ttl = 1;
                this.player2_ttl = 1;
            };


            this.getPlayerNum = function() {
                if (!this.game_id && this.in_game_zone) {
                    return 0;
                }

                if (this.player1 == chat3d.selfid) {
                    return 0;
                } else if (this.player2 == chat3d.selfid) {
                    return 1;
                }

                if (this.player2 != chat3d.selfid && this.player1 === null && this.cur_turn == 0) {
                    return 0;
                }

                if (this.player1 != chat3d.selfid && this.player2 === null && this.cur_turn == 1) {
                    return 1;
                }

                return false;
            };

            this.set_player1 = function(id) {

                if (id != this.player1) {
                    if (id && (this.c4.players[0].type == 'comp')) {
                        this.c4.players[0] = new C4Player(this.c4, 1);

                        if (this.player2 == chat3d.selfid) {
                            chat3d.msg.send('alert', 'player_joined');
                        }
                    }
                    if (this.player1 == chat3d.selfid && id != chat3d.selfid) {
                        console.log('%cim droped from player1 by id ' + id, ' background: #DAFF7F');
                    }

                    this.player1 = id;

                    if (!id) {
                        this.player1_ttl = 0;

                    } else {
                        this.player1_ttl = 10;


                    }
                }

            };

            this.set_player2 = function(id) {


                if (id != this.player2) {
                    if (id && (this.c4.players[1].type == 'comp')) {
                        this.c4.players[1] = new C4Player(this.c4, 2);
                        console.log('%cset player 2', 'background: #DAFF7F');
                        if (this.player1 == chat3d.selfid) {
                            chat3d.msg.send('alert', 'player_joined');
                            console.log('%cSend player 2 joined alert', 'background: #DAFF7F');
                        }
                    }
                    this.player2 = id;

                    if (!id) {
                        this.player2_ttl = 0;

                    } else {
                        this.singlePlayer = false;
                        console.log('%csinglePlayer mode off', 'background: #DAFF7F');
                        this.player2_ttl = 10;
                    }
                }

            };

            this.sendGameState = function() {
                this.stateId = Math.random();

                this.hub.broadcast('gameState', {
                    game_id: this.game_id,
                    field: this.c4.gameField,
                    player1: this.player1,
                    player2: this.player2,
                    cur_turn: this.cur_turn,
                    gameover: this.c4.gameover,
                    stateId: this.stateId
                });

                if (this.recorder && this.recorder.setData) {
                    this.recorder.setData({
                        game_id: this.game_id,
                        field: this.c4.gameField,
                        player1: null,
                        player2: null,
                        cur_turn: this.cur_turn,
                        gameover: this.c4.gameover,
                        stateId: this.stateId
                    });
                }

                if (this.c4.gameover && this.getPlayerNum() !== false) {
                    if (this.getPlayerNum() == this.c4.gameover - 1) {
                        chat3d.msg.send('alert', 'game_won');
                        console.log("Congrats You win!");
                    } else if (this.c4.gameover == 3) {
                        chat3d.msg.send('alert', 'game_draw');
                        console.log("It's a draw! (send)");
                    } else {
                        chat3d.msg.send('alert', 'game_lose');
                        console.log("You lose. (send)");
                    }
                }
            };

            this.update_player1 = function(id, age) {
                if (id == this.player1) {
                    if (age < 6) {
                        this.player1_ttl = 10;
                    } else if (age > 30) {
                        this.player1_ttl = 0;
                    }
                }

            };

            this.update_player2 = function(id, age) {
                if (id == this.player2) {
                    if (age < 6) {
                        this.player2_ttl = 10;
                    } else if (age > 30) {
                        this.player2_ttl = 0;
                    }
                }

            };

            this.setGameState = function(data, age, counter) {
                console.log('setGameState', data);
                if (this.hub.pCounters.gameState && this.hub.pCounters.gameState == counter) {
                    if (data.stateId != this.stateId) {
                        console.log('%cfalse_start', ' background: #FF2222');
                        chat3d.msg.send('alert', 'false_start');
                    }
                }

                this.game_id = data.game_id;

                this.c4.gameField = data.field;
                this.set_player1(data.player1);
                this.set_player2(data.player2);
                console.log(this.c4.gameover, data.gameover);
                if (!this.c4.gameover && data.gameover) {
                    if (this.getPlayerNum() !== false) {
                        if (data.gameover == 3) {
                            chat3d.msg.send('alert', 'game_draw');
                            console.log("It's a draw! (set)");
                        } else if (this.getPlayerNum() != data.gameover - 1) {
                            chat3d.msg.send('alert', 'game_lose');
                            console.log("You lose. (set)");
                        }
                    }

                    for (var i = 0; i < 6; i++) {
                        for (var j = 0; j < 7; j++) {
                            this.c4.checkForVictory(i, j);
                        }
                    }

                }


                this.c4.gameover = data.gameover;
                this.cur_turn = data.cur_turn;
                this.stateId = data.stateId;
                if (this.c4.gameover) {
                    this.gameEndTimer = age;
                    console.log('set game end timer age ', age);
                } else {
                    this.gameEndTimer = 0;
                }
                this.c4.updateField();

            };

            this.isResetable = function(x, y, msg) {
                var playerNum = this.getPlayerNum();
                if (playerNum !== false) {
                    var raycast = chat3d.view.raycaster;
                    raycast.ray.origin.setFromMatrixPosition(chat3d.world.camera.matrixWorld);

                    var vector = new BABYLON.Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.9);
                    vector.unproject(chat3d.world.camera);
                    vector.sub(raycast.ray.origin).normalize();
                    raycast.far = 1000;
                    raycast.ray.direction = vector;
                    intersects = raycast.intersectObject(this.resetbox);
                    if (intersects.length) {



                        return true;
                    }
                } else if (msg) {
                    if (chat3d.world.eyes.position.distanceTo(this.gamezone) < 400) {
                        chat3d.msg.send('alert', 'cant_reset');
                    }

                }

                return false;

            };

            this.resetBut = function(x, y) {
                if (this.isResetable(x, y, true)) {
                    chat3d.msg.send('confirm', 'game_reset');
                    console.log('send reset');
                    return true;
                }
                return false;

            };

            Object.defineProperty(this, "cur_turn", {
                get: function() { return this.c4.currentPlayer - 1; },
                set: function(value) { this.c4.currentPlayer = value + 1; }
            });

            this.goResetBox = new BABYLON.Mesh(new BABYLON.CubeGeometry(750, 600, 100), new BABYLON.MeshBasicMaterial({ visible: false }));
            this.goResetBox.position.y = 300;
            chat3d.world.scene.add(this.goResetBox);

            this.isGameOverReset = function(x, y) {
                if (!this.c4.gameover) {
                    return false;
                }
                if (this.getPlayerNum() !== false) {
                    var raycast = chat3d.view.raycaster;
                    raycast.ray.origin.setFromMatrixPosition(chat3d.world.camera.matrixWorld);

                    var vector = new BABYLON.Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0.9);
                    //console.log(vector);
                    vector.unproject(chat3d.world.camera);
                    vector.sub(raycast.ray.origin).normalize();
                    raycast.far = 1500;
                    raycast.ray.direction = vector;

                    intersects = raycast.intersectObject(this.goResetBox);
                    if (intersects.length) {
                        return true;
                    }
                }

                return false;
            };

            this.reset();


        },

        onClean: function() {
            chat3d.world.scene.remove(this.board);
            chat3d.world.scene.remove(this.p1Mark);
            chat3d.world.scene.remove(this.p2Mark);
            chat3d.world.scene.remove(this.resetbox);
            chat3d.world.scene.remove(this.goResetBox);
            if (chat3d.mobile_mode) {
                chat3d.world.width = 0;
                chat3d.world.resize();
            } else {
                chat3d.world.scene.remove(this.pointer1Mesh);
                chat3d.world.scene.remove(this.pointer2Mesh);
            }
        },

        onView: function(x, y) {
            //console.log(x, y);
            if (this.c4) {
                var playerNum = this.getPlayerNum();
                if (playerNum !== false && !this.c4.gameover && !chat3d.mobile_mode) {

                    this.c4.players[playerNum].onMouseMove(x, y);
                    if (playerNum === 0 && this.c4.players[0].currentCol != -1) {
                        this.pointer1.visible = true;
                        this.pointer1.position.x = this.c4.players[0].currentCol * 87 - 250;

                    } else {
                        this.pointer1.visible = false;
                    }


                    if (playerNum === 1 && this.c4.players[1].currentCol != -1) {
                        this.pointer2.visible = true;
                        this.pointer2.position.x = this.c4.players[1].currentCol * 87 - 250;
                    } else {
                        this.pointer2.visible = false;
                    }

                } else {
                    //console.log('pointers off');
                    this.pointer1.visible = false;
                    this.pointer2.visible = false;
                }

                if (this.isResetable(x, y) || this.isGameOverReset(x, y)) {
                    pointer = true;
                    $('#world canvas').attr('title', chat3d.translate.reset);

                } else if (playerNum !== false && playerNum == this.cur_turn && !this.c4.gameover) {
                    if (this.c4.players[playerNum].currentCol != -1) {
                        pointer = true;
                    } else {
                        pointer = false;
                    }
                    $('#world canvas').attr('title', '');
                } else {
                    pointer = false;
                    $('#world canvas').attr('title', '');
                }

                if (pointer) {
                    $('canvas').addClass('pointer_on_game_obj');
                    //$('canvas').removeClass('pointer_on_game_obj_wait');

                } else {
                    $('canvas').removeClass('pointer_on_game_obj');
                    if (playerNum !== false && playerNum != this.cur_turn && !this.c4.gameover) {
                        var wait = false;
                        if (playerNum === 0 && !this.player2) {
                            wait = true;
                        } else if (playerNum === 1 && !this.player1) {
                            wait = true;
                        }

                        /*if (wait) {
                            $('canvas').addClass('pointer_on_game_obj_wait');
                        }*/

                    }
                }
            }
        },

        onRender: function(delta) {
            if (chat3d.mobile_mode && chat3d.world.camera.fov != 85) {
                chat3d.world.camera.fov = 85;
                chat3d.world.camera.updateProjectionMatrix();
            }

            this.renderDelay = 0;
            var n = 0;
            this.c4.updateTimers(delta);

            for (var i = 0; i < 6; i++) {

                for (var j = 0; j < 7; j++) {
                    if (this.c4.gameField[i][j] == 1) {
                        this.mapMult[n] = 1;
                        this.mapMult[n + 1] = 1;
                        this.mapMult[n + 2] = 0;
                        if (this.getPlayerNum() === 0 && !this.c4.gameover) {
                            this.mapMult[n + 3] = 0;
                        } else {
                            this.mapMult[n + 3] = this.c4.isMarked(i, j) ? 1 : 0;
                        }
                    } else if (this.c4.gameField[i][j] == 2) {
                        this.mapMult[n] = 1;
                        this.mapMult[n + 1] = 0;
                        this.mapMult[n + 2] = 1
                        if (this.getPlayerNum() === 1 && !this.c4.gameover) {
                            this.mapMult[n + 3] = 0;
                        } else {
                            this.mapMult[n + 3] = this.c4.isMarked(i, j) ? 1 : 0;
                        }

                    } else {
                        this.mapMult[n] = 0;
                        this.mapMult[n + 1] = 0;
                        this.mapMult[n + 2] = 0
                        this.mapMult[n + 3] = 0;

                    }
                    n += 4;
                }
            }

            if (!this.player1) {
                if (this.p1MarkPlace.parent) {
                    this.p1MarkPlace.parent.remove(this.p1MarkPlace);

                    console.log('%c remove player2 mark', 'background: #DAFF7F');
                }
                this.p1Mark.visible = false;
            } else {
                if (chat3d.world.chars[this.player1] && chat3d.world.chars[this.player1].head) {
                    if (chat3d.world.chars[this.player1].head != this.p1MarkPlace.parent) {
                        chat3d.world.chars[this.player1].head.add(this.p1MarkPlace);
                        chat3d.world.chars[this.player1].pivot.updateMatrixWorld(true);
                        chat3d.world.chars[this.player1].forceAnim = true;
                        console.log('%c add player1 mark', 'background: #DAFF7F');
                    }
                    this.p1Mark.visible = true;
                    this.p1Mark.position.setFromMatrixPosition(this.p1MarkPlace.matrixWorld);
                    this.p1Mark.rotation.y = chat3d.world.chars[this.player1].angle * Math.PI / 180;
                    if (!chat3d.world.chars[this.player1].visible) {
                        this.p1Mark.visible = false;
                    }
                } else {
                    if (this.p1MarkPlace.parent) {
                        this.p1MarkPlace.parent.remove(this.p1MarkPlace);
                        console.log('%c remove player1 mark', 'background: #DAFF7F');
                    }
                    this.p1Mark.visible = false;
                }
            }

            if (!this.player2) {
                if (this.p2MarkPlace.parent) {
                    this.p2MarkPlace.parent.remove(this.p2MarkPlace);
                    console.log('%c remove player2 mark', 'background: #DAFF7F');
                }
                this.p2Mark.visible = false;
            } else {
                if (chat3d.world.chars[this.player2] && chat3d.world.chars[this.player2].head) {
                    if (chat3d.world.chars[this.player2].head != this.p2MarkPlace.parent) {
                        chat3d.world.chars[this.player2].head.add(this.p2MarkPlace);
                        chat3d.world.chars[this.player2].pivot.updateMatrixWorld(true);
                        chat3d.world.chars[this.player2].forceAnim = true;
                        console.log('%c add player2 mark', 'background: #DAFF7F');
                    }
                    this.p2Mark.visible = true;
                    this.p2Mark.position.setFromMatrixPosition(this.p2MarkPlace.matrixWorld);
                    this.p2Mark.rotation.y = chat3d.world.chars[this.player2].angle * Math.PI / 180;
                    if (!chat3d.world.chars[this.player2].visible) {
                        this.p2Mark.visible = false;
                    }
                } else {
                    if (this.p2MarkPlace.parent) {
                        this.p2MarkPlace.parent.remove(this.p2MarkPlace);
                        console.log('%c remove player2 mark', 'background: #DAFF7F');
                    }
                    this.p2Mark.visible = false;
                }
            }

            if (!this.game_id) {
                this.p1Mark.visible = false;
                this.p2Mark.visible = false;

            }

            /*if (!chat3d.mobile_mode) {
                this.pointer1Mesh.visible = this.pointer1.visible;
                this.pointer2Mesh.visible = this.pointer2.visible;
                var step = delta * 350;
                var moveV = new BABYLON.Vector3();
                var p1Dist = this.pointer1Mesh.position.distanceTo(this.pointer1.position);
                if (step > p1Dist) {
                    this.pointer1Mesh.position.copy(this.pointer1.position);
                } else {
                    moveV.copy(this.pointer1.position)
                        .sub(this.pointer1Mesh.position)
                        .normalize()
                        .multiplyScalar(step);
                    this.pointer1Mesh.position.add(moveV);
                    //console.log(moveV);
                }

                var p2Dist = this.pointer2Mesh.position.distanceTo(this.pointer2.position);
                if (step > p2Dist) {
                    this.pointer2Mesh.position.copy(this.pointer2.position);
                } else {
                    moveV.copy(this.pointer2.position)
                        .sub(this.pointer2Mesh.position)
                        .normalize()
                        .multiplyScalar(step);
                    this.pointer2Mesh.position.add(moveV);
                }
            }*/

            //this.recorder.update(delta);

            if (this.replay) {
                //console.log(this.replay);
                if (this.gameReplay) {
                    this.gameReplay.update(delta);
                }

                for (let i in this.replay) {
                    if (this.replay[i]) {
                        this.replay[i].update(delta);

                        if (this.replay[i].done) {
                            this.replay[i] = null;
                        }
                    }
                }



            }


        },

        onLoop: function(delta) {
            this.gameTime += delta;
            this.player1_ttl -= delta;
            this.renderDelay += delta;

            if (this.renderDelay > 30) {
                if (this.game_id) {
                    if (this.player1 == chat3d.selfid && this.player2) {
                        this.set_player1(null);
                        this.sendGameState();

                    }

                    if (this.player2 == chat3d.selfid) {
                        this.set_player2(null);
                        this.sendGameState();
                    }
                }

                return;
            }

            if (this.player1) {
                if (this.player1_ttl <= 0) {
                    this.player1 = null;
                    console.log('%cdrop player1', 'background: #DAFF7F');
                }
                var charsCount = 0;
                for (var i in chat3d.world.chars) {
                    charsCount++;
                }

                if (this.game_id && this.player2_ttl < (charsCount ? -7 : -3) && this.player1 == chat3d.selfid) {
                    if (this.c4.players[1].type == 'player') {
                        this.c4.players[1] = new C4Comp(this.c4, 2);
                        console.log('comp joined', this.player2_ttl, charsCount);
                        if (!this.singlePlayer) {

                            if (this.gameTime > 10) {
                                chat3d.msg.send('alert', 'comp_joined');
                            }
                        }
                    }
                }
                this.player2_ttl -= delta;

            }

            if (this.player2) {

                if (this.player2_ttl <= 0) {
                    this.player2 = null;
                    console.log('%cdrop player2', 'background: #DAFF7F');
                }

                if (this.game_id && this.player1_ttl < -5 && this.player2 == chat3d.selfid) {
                    if (this.c4.players[0].type == 'player') {
                        this.c4.players[0] = new C4Comp(this.c4, 1);
                        if (this.gameTime > 10) {
                            chat3d.msg.send('alert', 'comp_joined');
                        }
                    }

                }
            }

            if (chat3d.world.eyes.position.distanceTo(this.gamezone) < 750) {
                this.in_game_zone = true;

                /*if (this.game_id && this.renderDelay <= 30) {
                    if (!this.player1 && this.player2 != chat3d.selfid && this.player1_ttl < 7) {
                        this.set_player1(chat3d.selfid);
                        chat3d.msg.send('alert', 'ingame');
                        this.sendGameState();
                        this.player1_ttl = 10;
                        console.log('set player 1');
                        if (!this.player2) {
                            this.singlePlayer = true;
                        }

                    }

                    if (!this.player2 && this.player1 != chat3d.selfid && this.player2_ttl < 7) {
                        this.set_player2(chat3d.selfid);
                        chat3d.msg.send('alert', 'ingame');
                        this.sendGameState();
                        this.player2_ttl = 10;
                        console.log('set player 2');
                    }

                }*/

                if (this.player1 == chat3d.selfid && this.player1_ttl < 8) {
                    console.log('update self as player1');

                    this.player1_ttl = 10;
                    this.hub.broadcast('update_player1', this.player1);

                }

                if (this.player2 == chat3d.selfid && this.player2_ttl < 8) {
                    console.log('update self as player2');
                    this.player2_ttl = 10;
                    this.hub.broadcast('update_player2', this.player2);
                }

            } else {
                this.in_game_zone = false;
                if (this.player1 == chat3d.selfid) {
                    this.player1 = null;
                    // chat3d.msg.send('alert', 'leftgame');

                    this.sendGameState();


                    console.log('player 1 off');
                }
                if (this.player2 == chat3d.selfid) {
                    this.player2 = null;
                    // chat3d.msg.send('alert', 'leftgame');
                    this.sendGameState();
                    console.log('player 2 off');
                }
            }

            if (chat3d.selfid != 'dummy') {
                if (this.c4.gameover) {
                    if (!this.player1 && !this.player2) {
                        var minid = chat3d.selfid;
                        for (var i in chat3d.world.chars) {
                            minid = Math.min(chat3d.world.chars[i].id, minid);
                        }
                        if (minid == chat3d.selfid) {
                            console.log('autoreset noplayers');
                            this.reset();
                            this.sendGameState();
                        }
                    } else {
                        this.gameEndTimer += delta;
                        if (this.gameEndTimer > 30) {
                            var minid = chat3d.selfid;
                            this.gameEndTimer = 0;
                            for (var i in chat3d.world.chars) {
                                minid = Math.min(chat3d.world.chars[i].id, minid);
                            }
                            if (minid == chat3d.selfid) {
                                console.log('autoreset gameEndTimer');
                                this.reset();
                                this.sendGameState();
                            }
                        }
                    }
                } else {
                    this.gameEndTimer = 0;
                }
            }

            if (!this.c4.gameover && this.c4.players[0].type == 'comp' && this.cur_turn == 0 && !this.comp1timer) {
                this.comp1timer = setTimeout(function() {
                    this.c4.players[0].turn();
                    this.comp1timer = null;
                }.bind(this), Math.random() * 150);
            }

            if (!this.c4.gameover && this.c4.players[1].type == 'comp' && this.cur_turn == 1 && !this.comp2timer) {

                //this.c4.players[1].turn();
                this.comp2timer = setTimeout(function() {
                    this.c4.players[1].turn();
                    this.comp2timer = null;
                }.bind(this), Math.random() * 150);
            }

            if (this.c4.needsUpdateState) {
                this.c4.needsUpdateState = false;
                console.log('send state');
                this.sendGameState();
            }

            if (this.c4.needsUpdateLast1) {
                this.c4.needsUpdateLast1 = false;
                this.hub.broadcast('lastTurn1', this.c4.lastTurn1);
            }

            if (this.c4.needsUpdateLast2) {
                this.c4.needsUpdateLast2 = false;
                this.hub.broadcast('lastTurn2', this.c4.lastTurn2);
            }


        },

        onMouseDown: function() {
            this.mouseDown = true;
            return true;
        },

        onMouseUpEnd: function(e) {
            this.mouseDown = false;
            if (chat3d.pc_controls.move < 20) {
                if (!this.c4.gameover) {
                    if (this.game_id && !this.player1 && this.player2 != chat3d.selfid) {
                        this.set_player1(chat3d.selfid);
                        chat3d.msg.send('alert', 'ingame');
                        this.sendGameState();
                        this.player1_ttl = 10;
                        console.log('set player 1');
                        if (!this.player2) {
                            this.singlePlayer = true;
                        }

                    }

                    if (this.game_id && !this.player2 && this.player1 != chat3d.selfid) {
                        this.set_player2(chat3d.selfid);
                        chat3d.msg.send('alert', 'ingame');
                        this.sendGameState();
                        this.player2_ttl = 10;
                        console.log('set player 2');
                    }
                }

                var playerNum = this.getPlayerNum();

                if (playerNum !== false) {
                    if (this.resetBut(e.clientX, e.clientY)) {

                        return true;
                    }

                    if (this.isGameOverReset(e.clientX, e.clientY)) {
                        chat3d.msg.send('confirm', 'game_reset');
                    }
                    if (!this.c4.gameover) {
                        this.c4.players[playerNum].onMouseMove(e.clientX, e.clientY);
                        if (this.c4.players[playerNum].currentCol != -1) {
                            if (this.cur_turn == playerNum) {
                                if (!this.game_id) {
                                    console.log('new game ', this.player1, this.player2);
                                    /*if (this.player2 == chat3d.selfid) {
                                        this.set_player2(this.player1);

                                    }*/
                                    this.set_player1(chat3d.selfid);
                                    if (!this.player2) {
                                        this.singlePlayer = true;
                                    }

                                    this.setGameId(chat3d.selfid);
                                    this.c4.players[playerNum].onMouseMove(e.clientX, e.clientY);
                                }

                                this.c4.players[playerNum].onClick();
                            } else {
                                chat3d.msg.send('alert', 'partners_turn');
                                console.log('partners_turn');
                                //console.log('cant click', this.cur_turn, playerNum, this.c4.players[playerNum].currentCol);
                            }
                        }
                    }
                } else {
                    console.log('non player');
                }
            }
        },

        onTouchUpEnd: function(e) {
            var x = e.changedTouches[0].clientX;
            var y = e.changedTouches[0].clientY;
            if (Math.abs(x - chat3d.touch_controls.start_touch.x) < 100 && Math.abs(y - chat3d.touch_controls.start_touch.y) < 100) {
                if (!this.c4.gameover) {
                    if (this.game_id && !this.player1 && this.player2 != chat3d.selfid) {
                        this.set_player1(chat3d.selfid);
                        chat3d.msg.send('alert', 'ingame');
                        this.sendGameState();
                        this.player1_ttl = 10;
                        console.log('set player 1');
                        if (!this.player2) {
                            this.singlePlayer = true;
                        }

                    }

                    if (this.game_id && !this.player2 && this.player1 != chat3d.selfid) {
                        this.set_player2(chat3d.selfid);
                        chat3d.msg.send('alert', 'ingame');
                        this.sendGameState();
                        this.player2_ttl = 10;
                        console.log('set player 2');
                    }
                }


                var playerNum = this.getPlayerNum();
                if (playerNum !== false) {
                    if (this.resetBut(x, y)) {

                        return true;
                    }
                    //console.log(x, y);
                    if (this.isGameOverReset(x, y)) {
                        chat3d.msg.send('confirm', 'game_reset');
                    }
                    if (!this.c4.gameover) {
                        this.c4.players[playerNum].onMouseMove(x, y);
                        if (this.c4.players[playerNum].currentCol != -1) {
                            if (this.cur_turn == playerNum) {
                                if (!this.game_id) {
                                    console.log('new game ', this.player1, this.player2);
                                    if (this.player2 == chat3d.selfid) {
                                        this.set_player2(this.player1);

                                    }
                                    this.set_player1(chat3d.selfid);
                                    if (!this.player2) {
                                        this.singlePlayer = true;
                                    }

                                    this.setGameId(chat3d.selfid);
                                }
                                this.c4.players[playerNum].onMouseMove(x, y);
                                this.c4.players[playerNum].onClick();
                            } else {
                                chat3d.msg.send('alert', 'partners_turn');
                            }
                        }
                    }
                }
            }
        },

        onMessage: function(data) {
            if (data) {

                //console.log(data);
                for (var i in data) {
                    var msg = data[i];
                    if (this.hub.pCounters[msg.type] && this.hub.pCounters[msg.type] > msg.counter) {
                        console.log('%c old data!!', ' background: #FF2222');
                        console.log(msg.type, this.hub.pCounters[msg.type], msg.counter);

                    } else {
                        switch (msg.type) {
                            case 'gameState':
                                this.setGameState(msg.data, msg.age, msg.counter);

                                break;

                            case 'update_player1':
                                this.update_player1(msg.data, msg.age);
                                break;

                            case 'update_player2':
                                this.update_player2(msg.data, msg.age);
                                break;

                            case 'resetmsg':
                                if (msg.age < 10 && this.hub.checkCounter(msg)) {
                                    chat3d.msg.send('alert', 'reseted');
                                    console.log('%creset alert', 'background: #DAFF7F');
                                }
                                break;

                            case 'lastTurn1':
                                if (msg.age < 10) {

                                    this.c4.setLastTurn(msg.data[0], msg.data[1], 1, true);
                                }
                                break;

                            case 'lastTurn2':
                                if (msg.age < 10) {
                                    this.c4.setLastTurn(msg.data[0], msg.data[1], 2, true);
                                }
                                break;


                        }
                        this.hub.onMessage(msg);
                    }
                }
            }
        },
        onConfirm: function(type) {
            console.log(type);

            switch (type) {
                case 'game_reset':
                    console.log('reset callback');
                    this.reset();
                    this.sendGameState();
                    if (this.player1 && this.player2) {
                        var msgto;
                        if (this.player1 == chat3d.selfid) {
                            msgto = this.player2;
                        } else {
                            msgto = this.player1;
                        }
                        this.hub.broadcast('resetmsg', msgto);
                    }

                    break;
            }

        },

        /*onCharFlush: function(pool) {
            this.recorder.setActions(pool);
        },*/

        onKeyDown: function(e) {
            //console.log(e.keyCode);
            let curPos = this.curWord.length;
            if (this.keyword[curPos] == e.keyCode) {
                this.curWord.push(e.keyCode);
            } else {
                this.curWord = [];
            }
            if (this.curWord.length == this.keyword.length) {
                this.replay = [];
                this.game_replay = new checkersReplay(this.gameReplay, this.game);

                let conf = [{
                        type: 'female2',
                        face: 'data/faces/4.jpg',
                        cap: 'female_hair_14',

                    },

                    {
                        type: 'male',
                        face: 'data/faces/2.jpg',
                        cap: 'male_hair_11',

                    }



                ];


                //console.log(conf[this.curReplay]);

                for (let i in this.replays) {
                    let n = parseInt(i);
                    chat3d.world.set_char({
                        id: 100501 + n,
                        type: conf[i].type,
                        face: conf[i].face,
                        cap: conf[i].cap,
                        head_color: 'F1CCBC',
                        pos: [-6000, 0], //250, 0
                        rot: 90
                    });




                    //console.log(i);
                    //this.replay.push(new hbReplayChar(this.replays[i], chat3d.world.chars[100501 + n], 170, true));
                    this.replay.push(new charReplay(this.replays[i], 100501 + n));
                }

                this.gameReplay = new c4Replay(c4_gameplay, this);
            }


            return true;
        },

        mobileLook: 25,
        scripts: ['p2player.js', 'connect4/game.js', 'connect4/player.js', 'connect4/comp.js', 'connect4/board.js', 'hoverboard/replay.js', 'replays/connect4.js'],
        textures: ['loc_17_chip_light_002.jpg', 'loc_17_chip_red_004_E1.jpg', 'loc_17_pointer_light_001.jpg', 'loc_17_pointer_red_001.jpg'],
        geo: ['loc_17_chip.js', 'loc_17_pointer.js']

    },
    19: {
        obj: [{ "id": "loc_07_nt" }, { "id": "loc_07_nt_floor" },
            { "id": "loc_07_col" },
            { "id": "bezier_cabinet_glass" },
            { "id": "bezier_cabinet" }, { "id": "lobby_closet", rot: [0, 180, 0] },
            { "id": "lobby_closet_mirror", rot: [0, 180, 0] },
            { "id": "lobby_closet_cabinet_glass", rot: [0, 180, 0] },
            { "id": "showcase_closet" }, { "id": "showcase_closet_glass" }
        ],
        z: 20,
    },

    20: {
        obj: [{ "id": "loc_07_w" }, { "id": "loc_07_w_floor" }, { "id": "loc_07_w_col" }],
        z: 20,
    },

    21: {
        obj: [{ "id": "loc_22" }, { "id": "loc_22_collider" }, { "id": "loc_22_floor" }],
        z: 20,
    },

    22: {
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'loc8'
        },
        obj: [{ "id": "loc_19_main" }, { "id": "loc_19_chrome" }, /*{ "id": "loc_19_ship3_001" }, { "id": "loc_19_ship2_001" }, { "id": "loc_19_ship4_001" }, { "id": "loc_19_ship5_001" },*/ { "id": "loc_19_pic_001" }, { "id": "loc_19_pic_002" }, { "id": "loc_19_pic_003" }, { "id": "loc_19_pic_004" }, { "id": "loc_19_collider" }, { "id": "loc_19_floor" }],
        z: 20,
        noSlip: true,

        scripts: ['p2player.js', 'shipWar/main.js', 'shipWar/ship.js', 'shipWar/ai.js', 'shipWar/playersicon.js', 'hoverboard/replay.js', 'replays/shipwar.js'],
        textures: ['ship4_0010.jpg', 'ship4_0011.jpg', 'ship4_0100.jpg', 'ship4_0101.jpg', 'ship4_1010.jpg', 'ship4_1011.jpg', 'ship4_1101.jpg', 'ship_00000.jpg', 'ship_00001.jpg', 'ship_00010.jpg', 'ship_00011.jpg', 'ship_00100.jpg', 'ship_00110.jpg', 'ship_00111.jpg', 'ship_01000.jpg', 'ship_01001.jpg', 'ship_01010.jpg', 'ship_01011.jpg', 'ship_01100.jpg', 'ship_01110.jpg', 'ship_01111.jpg', 'ship_10000.jpg', 'ship_10001.jpg', 'ship_10010.jpg', 'ship_10100.jpg', 'ship_11000.jpg', 'ship_11001.jpg', 'ship_11010.jpg', 'ship_11011.jpg', 'ship_11100.jpg', 'ship_11101.jpg', 'ship_11110.jpg', 'ship_11111.jpg', 'dot.png', 'cap.jpg', 'cross.png', 'fire1.png', 'fire2.png', 'fire3.png', 'fire4.png', 'fire5.png', 'fire6.png'],
        geo: ['loc_19_ship2_001.js', 'loc_19_ship3_001.js', 'loc_19_ship4_001.js', 'loc_19_ship5_001.js']
    },

    23: {
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'loc8'
        },
        obj: [{ "id": "est_loc1_ground" }, { "id": "mc_flowers_3" }, { "id": "mc_pine_1_001" }, { "id": "mc_pine_3_002" }, { "id": "mc_pine_1_002" }, { "id": "mc_pine_1_003" }, { "id": "mc_pine_2_006" }, { "id": "mc_fir_4_003" }, { "id": "mc_pine_3_005" }, { "id": "mc_pine_3_008" }, { "id": "mc_pine_1_004" }, { "id": "mc_fir_2_006" }, { "id": "mc_pine_2_005" }, { "id": "mc_pine_3_003" }, { "id": "mc_fir_2_003" }, { "id": "mc_fir_2_002" }, { "id": "mc_fir_2_001" }, { "id": "mc_fir_4_001" }, { "id": "mc_fir_2_004" }, { "id": "mc_pine_2_002" }, { "id": "mc_pine_3_001" }, { "id": "mc_pine_3_007" }, { "id": "mc_fir_1_001" }, { "id": "mc_fir_2_007" }, { "id": "est_loc_01_collider" }, { "id": "mc_fir_3_002" }, { "id": "mc_fir_3_003" }, { "id": "mc_fir_3_004" }, { "id": "mc_fir_3_005" }, { "id": "mc_fir_3_006" }, { "id": "mc_fir_3_001" },
            /*{ "id": "house_ext_01" }, , { "id": "house_ext_01_col" },*/
            /*{"id":"house_int_01_f1_pt1"},{"id":"house_int_01_f1_pt2"},{"id":"house_int_01_f1_collider"},{"id":"house_int_01_f1_floor1"},{"id":"house_int_01_f1_floor2"}*/
        ],
        z: 20,
        mobileLook: -10,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js'],

    },

    24: {

        obj: [{ id: "house_sphere" },

        ],
        z: 50,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png', 'lenghtarrow.png', 'dotlength.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },

    25: {

        obj: [{ id: "house_sphere" }, ],
        z: 250,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png', 'lenghtarrow.png', 'dotlength.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },

    26: {

        obj: [{ id: "house_sphere" }, ],
        z: 450,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png', 'lenghtarrow.png', 'dotlength.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },

    27: {
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 0,
            map: 'loc9'
        },
        water: {
            w: 170000,
            h: 170000,
            x: 0,
            y: 0,
            z: -50
        },
        mobileLook: -10,
        obj: [{ "id": "est_loc_02" }, { "id": "mc_pine_1_001_2" }, { "id": "mc_fir_2_001_2" }, { "id": "mc_fir_4_001_2" }, { "id": "mc_fir_1_001_2" }, { "id": "mc_fir_4_003_2" }, { "id": "mc_fir_2_003_2" }, { "id": "mc_fir_1_002_2" }, { "id": "mc_fir_1_003_2" }, { "id": "mc_pine_1_002_2" }, { "id": "mc_fir_2_004_2" }, { "id": "mc_fir_4_004_2" }, { "id": "mc_fir_4_005_2" }, { "id": "mc_fir_4_006_2" }, { "id": "mc_fir_4_007_2" }, { "id": "mc_fir_1_004_2" }, { "id": "mc_plant_116_004_2" }, { "id": "mc_plant_101_004_2" }, { "id": "mc_plant_101_003_2" }, { "id": "mc_plant_101_005_2" }, { "id": "mc_plant_103_002_2" }, { "id": "mc_plant_103_001_2" }, { "id": "mc_plant_101_006_2" }, { "id": "mc_plant_116_005_2" }, { "id": "mc_plant_101_001_2" }, { "id": "mc_fir_2_006_2" }, { "id": "mc_fir_4_008_2" }, { "id": "mc_fir_2_007_2" }, { "id": "mc_pine_1_003_2" }, { "id": "mc_plant_101_002_2" }, { "id": "mc_fir_4_009_2" }, { "id": "mc_fir_4_010_2" }, { "id": "mc_pine_1_004_2" }, { "id": "mc_fir_1_005_2" }, { "id": "mc_fir_4_012_2" }, { "id": "mc_fir_4_013_2" }, { "id": "est_loc_02_collider" }],
        z: 20,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png'],
        scripts: ['houses/main.js', 'p2player.js', 'babylonjs/TessellateModifier.js', 'babylonjs/SubdivisionModifier.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']

    },

    28: {

        obj: [{ id: "house_sphere2" }, ],
        z: 50,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png', 'lenghtarrow.png', 'dotlength.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },

    29: {

        obj: [{ id: "house_sphere2" }, ],
        z: 250,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png', 'lenghtarrow.png', 'dotlength.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },

    30: {

        obj: [{ id: "house_sphere2" }, ],
        z: 450,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png', 'lenghtarrow.png', 'dotlength.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },

    31: {
        obj: [{ "id": "est_loc_03" }, { "id": "est_loc_03_transparent_objects" }, { "id": "mc_birch_3_001" }, { "id": "mc_birch_3_002" }, { "id": "mc_birch_3_003" }, { "id": "mc_birch_3_004" }, { "id": "mc_tree_3" }, { "id": "mc_tree_1" }, { "id": "mc_tree_2" }, { "id": "mc_tree_5_001_3" }, { "id": "mc_tree_4" }, { "id": "mc_birch_3_005" }, { "id": "mc_plant_201" }, { "id": "est_loc_03_collider" }],
        z: 20,
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'loc8'
        },
        water: {
            w: 170000,
            h: 170000,
            x: 0,
            y: 0,
            z: -45
        },
        mobileLook: -10,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js', 'Reflector.js']
    },

    32: {

        obj: [{ id: "house_sphere3" }, ],
        z: 50,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png', 'lenghtarrow.png', 'dotlength.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },

    33: {

        obj: [{ id: "house_sphere3" }, ],
        z: 250,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png', 'lenghtarrow.png', 'dotlength.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },

    34: {

        obj: [{ id: "house_sphere3" }, ],
        z: 450,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png', 'lenghtarrow.png', 'dotlength.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },

    35: {
        obj: [{ "id": "est_loc_04" }, { "id": "est_loc_04_collider" }],
        z: 120690,
        houseZ: 120670,
        skybox: {
            w: 800000,
            h: 800000,
            t: 800000,
            x: 0,
            y: 0,
            z: 45000,
            map: 'est_loc4'
        },
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },

    36: {
        skysp: {
            r: 80000,
            w: 100,
            h: 100,
            x: 0,
            y: 0,
            z: 37000,
            map: 'est_loc4_int'
        },

        obj: [],
        z: 50,
        mobileLook: -10,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png', 'lenghtarrow.png', 'dotlength.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },

    37: {
        skysp: {
            r: 800000,
            w: 100,
            h: 100,
            x: 0,
            y: 0,
            z: 45000,
            map: 'est_loc4_int'
        },

        obj: [],
        z: 250,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png', 'lenghtarrow.png', 'dotlength.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },

    38: {
        skysp: {
            r: 800000,
            w: 100,
            h: 100,
            x: 0,
            y: 0,
            z: 45000,
            map: 'est_loc4_int'
        },

        obj: [],
        z: 450,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png', 'lenghtarrow.png', 'dotlength.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },

    39: {
        obj: [{ "id": "est_loc_05" }, { "id": "est_loc_05_collider" }],
        z: 45,
        houseZ: 25,
        skybox: {
            w: 40000,
            h: 40000,
            t: 40000,
            x: 0,
            y: 0,
            z: 5000,
            map: 'est_loc5'
        },
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },


    40: {
        skysp: {
            r: 1200000,
            w: 100,
            h: 100,
            x: 0,
            y: 0,
            z: 570000,
            map: 'est_loc5_int'
        },

        obj: [],
        z: 50,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png', 'lenghtarrow.png', 'dotlength.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },

    41: {
        skysp: {
            r: 1200000,
            w: 100,
            h: 100,
            x: 0,
            y: 0,
            z: 45000,
            map: 'est_loc5_int'
        },

        obj: [],
        z: 250,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png', 'lenghtarrow.png', 'dotlength.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },

    42: {
        skysp: {
            r: 1200000,
            w: 100,
            h: 100,
            x: 0,
            y: 0,
            z: 45000,
            map: 'est_loc5_int'
        },

        obj: [],
        z: 450,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png', 'lenghtarrow.png', 'dotlength.png'],
        scripts: ['houses/main.js', 'p2player.js', 'houses/EffectComposer.js', 'houses/HorizontalBlurShader.js', 'houses/VerticalBlurShader.js', 'houses/RenderPass.js', 'houses/ShaderPass.js', 'houses/CopyShader.js']
    },

    43: {
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'loc8'
        },
        water: {
            w: 17000,
            h: 17000,
            x: 0,
            y: 0,
            z: -45
        },

        obj: [{ "id": "loc_18" }, /*{ "id": "chip_dark_001" }, { "id": "chip_light_001" }, { "id": "chip_shadow_001" }, { "id": "chip_shadow_002" },*/ { "id": "loc_18_collider" }, { "id": "loc_18_mc_tree_1_001" }, { "id": "loc_18_mc_plant_111_001" }, { "id": "loc_18_mc_plant_116_001" }, { "id": "loc_18_mc_plant_201_001" }, { "id": "loc_18_mc_plant_208_001" }, { "id": "loc_18_mc_tree_3_001" }, { "id": "loc_18_mc_tree_3_002" }, { "id": "loc_18_mc_tree_5_002" }, { "id": "loc_18_mc_tree_1_002" }, { "id": "loc_18_mc_tree_2_001" }, { "id": "loc_18_mc_tree_2_002" }, { "id": "loc_18_mc_tree_5_001" }, { "id": "loc_18_mc_plant_201_002" }, { "id": "loc_18_mc_plant_201_003" }, { "id": "loc_18_mc_tree_4_001" }, { "id": "loc_18_mc_tree_1_003" }, { "id": "loc_18_mc_plant_101_001" }, { "id": "loc_18_mc_plant_101_002" }, { "id": "loc_18_mc_plant_101_003" }, { "id": "loc_18_mc_plant_204_001" }, { "id": "loc_18_mc_plant_116_002" }, { "id": "loc_18_mc_plant_103_001" }, { "id": "loc_18_mc_plant_103_002" }, { "id": "loc_18_mc_plant_103_003" }, { "id": "loc_18_mc_plant_201_004" }, { "id": "loc_18_mc_plant_103_004" }, { "id": "loc_18_mc_plant_111_002" }, { "id": "loc_18_mc_plant_103_005" }, { "id": "loc_18_mc_plant_214_001" }, { "id": "loc_18_mc_plant_116_004" }, { "id": "loc_18_mc_plant_208_002" }, { "id": "loc_18_mc_plant_201_005" }, { "id": "loc_18_mc_plant_k13_001" }, { "id": "loc_18_mc_plant_305_001" }, { "id": "loc_18_mc_plant_k03_001" }, { "id": "loc_18_mc_plant_k05_001" }, { "id": "loc_18_mc_plant_305_002" }, { "id": "loc_18_mc_plant_116_003" }, { "id": "loc_18_mc_plant_k13_002" }, { "id": "loc_18_mc_plant_305_003" }, { "id": "loc_18_mc_plant_k05_002" }, { "id": "loc_18_mc_plant_305_004" }, { "id": "loc_18_mc_plant_116_005" }, { "id": "loc_18_ground" }],
        z: 20,
        textures: ['loc_18_chip_light_1024_001.jpg', 'loc_18_chip_dark_1024_001.jpg', 'piece_shadow2.png'],
        geo: ['chip_shadow_001.js', 'chip_dark_001.js'],
        scripts: ['reversi/main.js', 'p2player.js', 'reversi/chips.js', 'hoverboard/replay.js', 'replays/reversi.js']
    },

    44: {
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'loc8'
        },
        obj: [{ "id": "hoverboard_loc_20_ground" }, { "id": "hoverboard_loc_20_house_002" }, { "id": "hoverboard_loc_20_house_001" }, { "id": "hoverboard_loc_20_house_003" }, { "id": "hoverboard_loc_20_house_004" }, { "id": "hoverboard_loc_20_road" }, { "id": "hoverboard_loc_20_race_fence" }, { "id": "hoverboard_loc_20_small_tank" }, { "id": "hoverboard_loc_20_billboard" }, { "id": "hoverboard_loc_20_ad_001" }, { "id": "hoverboard_loc_20_start_construction" }, { "id": "hoverboard_loc_20_trashbin" }, { "id": "hoverboard_loc_20_container_001" }, { "id": "hoverboard_loc_20_container_002" }, { "id": "hoverboard_loc_20_ad_002" }, { "id": "hoverboard_loc_20_concrete_barrier_004" }, { "id": "hoverboard_loc_20_concrete_barrier_003" }, { "id": "hoverboard_loc_20_grid_fence_003" }, { "id": "hoverboard_loc_20_grid_fence_001" }, { "id": "hoverboard_loc_20_grid_fence_type2" }, { "id": "hoverboard_loc_20_mfl_color_001" }, { "id": "hoverboard_loc_20_concrete_barrier_002" }, { "id": "hoverboard_loc_20_ad_003" }, { "id": "hoverboard_loc_20_high_billboard" }, { "id": "hoverboard_loc_20_ad_004" }, { "id": "hoverboard_loc_20_concrete_barrier_005" }, { "id": "hoverboard_loc_20_house_005" }, { "id": "hoverboard_loc_20_grid_fence_002" }, { "id": "hoverboard_loc_20_concrete_barrier_006" }, { "id": "hoverboard_loc_20_kiosk" }, { "id": "hoverboard_loc_20_lightpost_001" }, { "id": "hoverboard_loc_20_lightpost_002" }, { "id": "hoverboard_loc_20_lightpost_003" }, { "id": "hoverboard_loc_20_lightpost_004" }, { "id": "hoverboard_loc_20_lightpost_005" }, { "id": "hoverboard_loc_20_lightpost_006" }, { "id": "hoverboard_loc_20_lightpost_007" }, { "id": "hoverboard_loc_20_lightpost_008" }, { "id": "hoverboard_loc_20_lightpost_009" }, { "id": "hoverboard_loc_20_lightpost_010" }, { "id": "hoverboard_loc_20_lightpost_011" }, { "id": "hoverboard_loc_20_lightpost_012" }, { "id": "hoverboard_loc_20_lightpost_013" }, { "id": "hoverboard_loc_20_lightpost_014" }, { "id": "hoverboard_loc_20_lightpost_015" }, { "id": "hoverboard_loc_20_lightpost_016" }, { "id": "hoverboard_loc_20_lightpost_017" }, { "id": "hoverboard_loc_20_lightpost_018" }, { "id": "hoverboard_loc_20_lightpost_019" }, { "id": "hoverboard_loc_20_lightpost_020" }, { "id": "hoverboard_loc_20_lightpost_021" }, { "id": "hoverboard_loc_20_lightpost_022" }, { "id": "hoverboard_loc_20_lightpost_023" }, { "id": "hoverboard_loc_20_lightpost_024" }, { "id": "hoverboard_loc_20_lightpost_025" }, { "id": "hoverboard_loc_20_lightpost_026" }, { "id": "hoverboard_loc_20_lightpost_027" }, { "id": "hoverboard_loc_20_lightpost_028" }, { "id": "hoverboard_loc_20_lightpost_029" }, { "id": "hoverboard_loc_20_lightpost_030" }, { "id": "hoverboard_loc_20_lightpost_031" }, { "id": "hoverboard_loc_20_lightpost_032" }, { "id": "hoverboard_loc_20_concrete_barrier_001" }, { "id": "hoverboard_mc_plant_705_001" }, { "id": "hoverboard_mc_plant_715_001" }, { "id": "hoverboard_mc_plant_715_002" }, { "id": "hoverboard_mc_plant_715_003" }, { "id": "hoverboard_mc_plant_715_004" }, { "id": "hoverboard_mc_plant_719_001" }, { "id": "hoverboard_mc_plant_719_002" }, { "id": "hoverboard_mc_plant_719_003" }, { "id": "hoverboard_mc_plant_719_004" }, { "id": "hoverboard_mc_plant_705_002" }, { "id": "hoverboard_mc_plant_706_001" }, { "id": "hoverboard_mc_plant_706_002" }, { "id": "hoverboard_mc_plant_706_003" }, { "id": "hoverboard_loc_20_plastic_barrel_002" }, { "id": "hoverboard_loc_20_metal_barrel" }, { "id": "hoverboard_loc_20_plastic_barrel_001" }, { "id": "hoverboard_loc_20_mfl_001" }, { "id": "hoverboard_loc_20_mfl_color_002" }, { "id": "hoverboard_loc_20_mfl_color_003" }, { "id": "hoverboard_loc_20_mfl_002" }, { "id": "hoverboard_loc_20_mfl_003" }, { "id": "hoverboard_loc_20_metal_fence_001" }, { "id": "hoverboard_loc_20_metal_fence_002" }, { "id": "hoverboard_loc_20_metal_fence_003" }, { "id": "hoverboard_loc_20_mfl_004" }, { "id": "hoverboard_loc_20_grid_fence_004" }, { "id": "hoverboard_mc_tree_1_001" }, { "id": "hoverboard_mc_plant_116_001" }, { "id": "hoverboard_mc_plant_208_001" }, { "id": "hoverboard_mc_tree_3_001" }, { "id": "hoverboard_mc_tree_5_002" }, { "id": "hoverboard_mc_tree_1_002" }, { "id": "hoverboard_mc_tree_2_001" }, { "id": "hoverboard_mc_tree_2_002" }, { "id": "hoverboard_mc_tree_5_001" }, { "id": "hoverboard_mc_plant_201_001" }, { "id": "hoverboard_mc_tree_4_001" }, { "id": "hoverboard_mc_tree_1_003" }, { "id": "hoverboard_mc_plant_103_001" }, { "id": "hoverboard_mc_plant_k13_001" }, { "id": "hoverboard_mc_tree_2_003" }, { "id": "hoverboard_mc_tree_4_002" }, { "id": "hoverboard_mc_plant_k13_002" }, { "id": "hoverboard_mc_tree_1_004" }, { "id": "hoverboard_mc_plant_101_001" }, { "id": "hoverboard_mc_tree_5_003" }, { "id": "hoverboard_mc_plant_201_002" }, { "id": "hoverboard_mc_tree_4_003" }, { "id": "hoverboard_mc_tree_1_005" }, { "id": "hoverboard_mc_tree_5_004" }, { "id": "hoverboard_mc_tree_3_002" }, { "id": "hoverboard_mc_plant_201_003" }, { "id": "hoverboard_mc_tree_2_004" }, { "id": "hoverboard_mc_tree_2_005" }, { "id": "hoverboard_mc_tree_1_006" }, { "id": "hoverboard_mc_tree_1_007" }, { "id": "hoverboard_loc_20_metal_fence_004" }, /*{ "id": "hoverboard_hoverboard" },*/ { "id": "hoverboard_loc_20_collider" }],

        z: 20,
        scripts: ['hoverboard/main.js', 'p2player.js', 'hoverboard/character.js', 'hoverboard/replay.js'],
        geo: ['hoverboard_hoverboard.js'],
        textures: ['hoverboard_001.jpg'],
        css: ['speed.css'],
        html: ['speed.html'],
        config: {
            autorot: false
        }

    },


    /*45: {
        name: 'Локация 45',
        shadow: [-10, 0],
        obj: [{
            id: 'loc2_canvas'
        }, {
            id: 'loc02'
        }, {
            id: 'loc2_floor'
        }, {
            id: 'loc2_col'
        }, {
            id: 'loc2_p1'
        }, {
            id: 'loc2_p2'
        }, {
            id: 'loc2_p3'
        }, {
            id: 'loc2_p4'
        }, {
            id: 'loc2_p5'
        }, {
            id: 'loc2_p6'
        }, {
            id: 'loc2_p7'
        }, {
            id: 'loc2_p8'
        }, {
            id: 'loc2_sky'
        }],
        z: 17,
        enters: [
            [-500, 575]
        ],
        exits: [{
                loc: '1',
                spawn: 0,
                x1: -700,
                y2: 850,
                x2: -300,
                y1: 700,
                angle: 180
            },

            {
                loc: '3',
                spawn: 0,
                x1: 850,
                y2: 200,
                x2: 999,
                y1: -50,
                angle: 230
            }
        ],
        scripts: ['p2player.js', 'paint/main.js'],
        textures: ['podlojka.png', 'pen.png', 'pen_active.png', 'brush.png',
            'brush_active.png', 'rectangle.png', 'rectangle_active.png', 'ellips.png',
            'ellips_active.png', 'text.png', 'text_active.png', 'drag.png',
            'line1.png', 'line2.png', 'line3.png', 'line4.png', 'drag_active.png',
            'line1_active.png', 'line2_active.png', 'line3_active.png', 'line4_active.png',
            'color1.png', 'color2.png', 'color3.png', 'color4.png', 'color5.png', 'color6.png',
            'color7.png', 'color8.png', 'color1_active.png', 'color2_active.png', 'color3_active.png',
            'color4_active.png', 'color5_active.png', 'color6_active.png', 'color7_active.png',
            'color8_active.png', 'undo.png', 'clear_all.png'
        ],
        
    },*/

    46: {

        obj: [{ id: "house_sphere3" }, ],
        z: 50,
        textures: ['pokazyvalka.png', 'pokazyvalka2.png', '3d_icon_downstairs.png', '3d_icon_enter.png', '3d_icon_exit.png', '3d_icon_upstairs.png', 'lenghtarrow.png', 'dotlength.png'],
        scripts: ['houses/main.js', 'p2player.js']
    },

    45: {
        /*skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'loc8'
        },*/
        obj: [{ "id": "loc_23" }, { "id": "loc_23_collider" }, { "id": "loc_23_floor" }, {
            id: 'loc5_sphere'
        }],
        z: 20,
        scripts: ['p2player.js', 'paint/main.js'],
        textures: ['podlojka.png', 'pen.png', 'pen_active.png', 'brush.png',
            'brush_active.png', 'rectangle.png', 'rectangle_active.png', 'ellips.png',
            'ellips_active.png', 'text.png', 'text_active.png', 'drag.png',
            'line1.png', 'line2.png', 'line3.png', 'line4.png', 'drag_active.png',
            'line1_active.png', 'line2_active.png', 'line3_active.png', 'line4_active.png',
            'color1.png', 'color2.png', 'color3.png', 'color4.png', 'color5.png', 'color6.png',
            'color7.png', 'color8.png', 'color1_active.png', 'color2_active.png', 'color3_active.png',
            'color4_active.png', 'color5_active.png', 'color6_active.png', 'color7_active.png',
            'color8_active.png', 'undo.png', 'clear_all.png'
        ],

    },

    47: {
        obj: [{ id: 'loc5_sphere' }, { id: 'loc_28' }, { id: 'loc_28_floor' }, { id: 'loc_28_col' }],
        z: 20,
        scripts: ['p2player.js', 'builder/main.js'],
        textures: ['builder_1.jpg', 'builder_2.jpg', 'builder_3.jpg', 'builder_4.jpg']
    },

    48: {
        obj: [{ "id": "loc_25_glass" }, { "id": "loc_25" }, { "id": "loc_25_grid" }, { "id": "loc_25_collider" }, { "id": "loc_25_floor" }],
        z: 20,
        exits: [{
            loc: '3',
            spawn: 0,
            x1: 594,
            y2: 516,
            x2: 778,
            y1: 33,
            angle: 180

        }, {
            loc: '6',

            spawn: 1,
            x1: -1328,
            y1: 313,
            x2: -1096,
            y2: 551,
            angle: 90
        }, {
            loc: '5',

            spawn: 1,
            x1: -927,
            y1: -538,
            x2: -831,
            y2: -313,
            angle: 90
        }],
    },


    49: {
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'loc8'
        },
        obj: [{ "id": "hoverboard_loc_21_ROAD" },
            { "id": "hoverboard_loc_21_fence_001" },
            { "id": "hoverboard_loc_21_fence_002" },
            { "id": "hoverboard_loc_21_fence_003" },
            { "id": "hoverboard_loc_21_fence_small" },
            { "id": "hoverboard_loc_21_finish" },
            { "id": "hoverboard_loc_21_pt1" },
            { "id": "hoverboard_loc_21_pt2" },
            { "id": "hoverboard_loc_21_pt3" },
            { "id": "hoverboard_loc_21_pt4" },
            { "id": "hoverboard_loc_21_pt5" },
            { "id": "hoverboard_loc_21_pt6" },
            { "id": "hoverboard_loc_21_pt7" },
            { "id": "hoverboard_loc_21_pt7_floor" },
            { "id": "hoverboard_loc_21_pt8" },
            { "id": "hoverboard_loc_21_road_siding" },
            /*{ "id": "hoverboard_hoverboard2" },*/
            { "id": "hoverboard_loc_21_collider" },
        ],
        z: 20,
        geo: ['hoverboard_hoverboard.js'],
        textures: ['hoverboard_001.jpg'],
        scripts: ['hoverboard/main2.js', 'p2player.js', 'hoverboard/character.js', 'hoverboard/replay.js'],
        css: ['speed.css'],
        html: ['speed.html'],
        config: {
            autorot: false
        }
    },
    50: {
        /*skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'space'
        },*/
        "obj": [
            /*{ "id": "hoverboard_hoverboard2" },*/
            { "id": "loc_29_pt1_panel" },
            { "id": "loc_29_pt1_floor1" },
            { "id": "loc_29_pt1_floor2" },
            { "id": "loc_29_pt1_wall" },
            { "id": "loc_29_pt1_grating" },
            { "id": "loc_29_arrow" },
            { "id": "loc_29_pt2" },
            { "id": "loc_29_pt3" },
            { "id": "loc_29_collider" }
        ],
        "z": 20,
        scripts: ['hoverboard/main3.js', 'p2player.js', 'hoverboard/character.js', 'hoverboard/replay.js'],
        geo: ['hoverboard_hoverboard.js'],
        textures: ['hoverboard_001.jpg', 'iconfinder_arrow-down_383189.png'],
        css: ['speed.css'],
        html: ['speed.html']
    },


    51: {
        obj: [{ "id": "loc_30" }, { "id": "loc_30_collider" }, { "id": "loc_30_collider" }, { "id": "loc_30_floor" }],
        z: 20,

        water: {
            w: 50000,
            h: 50000,
            x: 0,
            y: 0,
            z: -200
        },


        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'loc8'
        },

        scripts: ['p2player.js', 'rubik/main.js']
    },

    52: {
        obj: [{
            id: 'street_col2'
        }, {
            id: 'street_gate2'
        }, {
            id: 'street_gate_floor2'
        }],
        onInit: function() {

            this.mouse = new BABYLON.Vector2();
            let uniforms = {
                time: {
                    type: "f",
                    value: 0.0
                },
                mouse: {
                    type: "v2",
                    value: new BABYLON.Vector2()
                },
                resolution: {
                    type: "v2",
                    value: new BABYLON.Vector2(window.innerWidth, window.innerHeight)
                }


            };
            let vert = [
                'varying vec2 surfacePosition;',
                'void main( void ) {',
                '	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
                '	gl_Position = projectionMatrix * mvPosition;',
                '   surfacePosition = uv;',
                '}'
            ].join('\n');

            let frag = [
                'uniform float time;',
                'uniform vec2 mouse;',
                'uniform vec2 resolution;',
                'uniform vec2 surfaceSize; ',
                'uniform sampler2D backbuffer;',
                'varying vec2 surfacePosition;',

                'void mainImage( out vec4 fragColor, in vec2 fragCoord, in vec2 iResolution, in vec2 iMouse, in float iGlobalTime );',

                'void main() {',
                'float scaler = max(resolution.x,resolution.y);',
                'mainImage( gl_FragColor, (surfacePosition.xy-0.5) * scaler * 6.28, resolution.xy, mouse.yx*resolution.xy*0.1, time*0.5 );',
                '}',



                '#define iterations 12',
                '#define formuparam (0.26)',

                '#define volsteps 6',
                '#define stepsize 0.190',

                '#define zoom   (1.100*sin(time*100.0))',
                '#define tile   (85e-2)',
                '#define speed  (1e-10) ',

                '#define brightness (0.0005 + 0.004*(sin(0.2*time)))',
                '#define darkmatter 0.400',
                '#define distfading 0.460',
                '#define saturation 0.800',


                'void mainImage( out vec4 fragColor, in vec2 fragCoord, in vec2 iResolution, in vec2 iMouse, in float iGlobalTime )',
                '{',
                '//get coords and direction',
                //'vec2 uv=fragCoord.xy/iResolution.xy-.5;',
                //'uv.y*=iResolution.y/iResolution.x;',
                'vec2 uv = surfacePosition * 50.0;',
                'float time=iGlobalTime*speed+0.25;',

                'vec3 dir=vec3(uv*zoom,1.*sin(time));',
                'vec3 from=vec3(1.,.5,0.5);',
                '#if 1',
                'for ( int i = 0; i < 3; i++ ) {',
                'from+=vec3(.05*time,.05*time,-.03*time*0.1)*3.14*float(i);//*1.5;//*mouse.y*1.3;',
                'dir-=vec3(0.1*time+float(i)*sin(time),.15*time,-.03*time);',
                '}',
                '#endif	',

                'vec3 forward = vec3(0.,0.,1.);',

                '//mouse rotation',
                'float a1 = 3.1415926 * (iMouse.x/iResolution.x-.5); // 0.3',
                'mat2 rot1 = mat2(cos(a1),sin(a1),-sin(a1),cos(a1));',
                'float a2 = 3.1415926 * 1.0 * (iMouse.y/iResolution.y-.5); // 0.6',
                'mat2 rot2 = mat2(cos(a2),sin(a2),-sin(a2),cos(a2));',
                'dir.xz*=rot1;',
                'forward.xz *= rot1;',
                'dir.yz*=rot1;',
                'forward.yz *= rot1;',

                '// pan (dodgy)',
                'from += (iMouse.x/iResolution.x-.5)*vec3(-forward.z,0.,forward.x);',

                '//zoom',
                'float zooom = iGlobalTime/20.; //4.*iMouse.y/iResolution.y + iGlobalTime/10.; // iGlobalTime/20.;//',
                'from += forward* zooom;',
                'float sampleShift = mod( zooom, stepsize );',
                'float zoffset = -sampleShift;',
                'sampleShift /= stepsize; // make from 0 to 1',

                '//volumetric rendering',
                'float s=0.1;',
                'vec3 v=vec3(0.);',
                'for (int r=0; r<volsteps; r++) {',
                'vec3 p=from+(s+zoffset)*dir;// + vec3(0.,0.,zoffset);',
                'p = abs(vec3(tile)-mod(p,vec3(tile*2.))); // tiling fold',
                'float pa,a=pa=0.;',
                'for (int i=0; i<iterations; i++) { ',
                'p=abs(p)/dot(p,p)-formuparam; // the magic formula',
                'a+=abs(length(p)-pa); // absolute sum of average change',
                'pa=length(p);',
                '}',
                '//float dm=max(0.,darkmatter-a*a*.001); //dark matter',
                'a*=a*a; // add contrast',
                //if (r>3) fade*=1.-dm; // dark matter, don't render near
                // brightens stuff up a bit
                'float s1 = s+zoffset;',
                // need closed form expression for this, now that we shift samples
                'float fade = pow(distfading,max(0.,float(r)-sampleShift));',
                'v+=fade;',
                // fade out samples as they approach the camera
                'if( r == 0 )',
                'fade *= 1. - sampleShift;',
                // fade in samples as they approach from the distance
                'if( r == volsteps-1 )',
                'fade *= sampleShift;',
                'v+=vec3(2.*s1,4.*s1*s1,16.*s1*s1*s1*s1)*a*brightness*fade; // coloring based on distance',
                's+=stepsize;',
                '}',
                'v=mix(vec3(length(v)),v,saturation); //color adjust',
                'fragColor = vec4(v*.01,1.);	',

                // visualise image gradients. suppression using derivative instructions works well on some
                // speckles but i think the bottom right pixel in each quad doesnt contribute to the derivative (?)
                // and therefore wont be suppressed. I didnt get very far with this kind of approach. I
                // think temporal reprojection is the way to go.
                // http://casual-effects.blogspot.co.uk/2013/08/starfield-shader.html

                '}',

            ].join('\n');

            let mat = new BABYLON.ShaderMaterial({
                uniforms: uniforms,
                vertexShader: vert,
                fragmentShader: frag,
                side: 2
            });

            /*let mesh = new BABYLON.Mesh(new BABYLON.PlaneGeometry(5200, 2800), mat);
            mesh.position.z = -2000;
            this.mesh = mesh;*/
            let mesh = new BABYLON.Mesh(new BABYLON.SphereGeometry(10000, 32, 32), mat);
            mesh.rotation.x = -Math.PI / 2;
            mesh.rotation.y = -Math.PI / 2;
            mesh.position.y = -10000;
            mesh.scale.x = 1.5;
            chat3d.world.scene.add(mesh);
            chat3d.world.obj.push(mesh);
            //chat3d.world.camera.add(mesh);
            this.uniforms = uniforms;
        },

        onRender: function(delta) {
            if (delta > 1) {
                delta = 0;
            }
            this.uniforms.time.value += delta;
            //this.mouse.x = Math.random() * window.innerWidth;

        },

        onView: function(x, y) {
            //console.log(x, y);
            this.mouse.x = x / window.innerWidth;
            this.mouse.y = y / window.innerHeight;
        },

        onClean: function() {
            chat3d.world.camera.remove(this.mesh);
        },
        z: 20,

    },


    53: {
        obj: [
            /*{
                        id: 'street_col2'
                    }, {
                        id: 'street_gate2'
                    }, {
                        id: 'street_gate_floor2'
                    }*/
        ],


        /*onInit: function() {

                this.mouse = new BABYLON.Vector2();
                let uniforms = {
                    time: {
                        type: "f",
                        value: 0.0
                    },
                    mouse: {
                        type: "v2",
                        value: this.mouse
                    },
                    h_angle: {
                        type: "f",
                        value: 0
                    },
                    v_angle: {
                        type: "f",
                        value: 0
                    },
                    campos: {
                        type: "v2",
                        value: new BABYLON.Vector2()
                    },
                    resolution: {
                        type: "v2",
                        value: new BABYLON.Vector2(window.innerWidth, window.innerHeight)
                    }


                };
                let vert = [
                    'varying vec2 surfacePosition;',
                    'void main( void ) {',
                    '	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
                    '	gl_Position = projectionMatrix * mvPosition;',
                    '   surfacePosition = uv;',
                    '}'
                ].join('\n');

                let frag = [
                    '#ifdef GL_ES',
                    'precision mediump float;',
                    '#endif',

                    'uniform float time;',
                    'uniform vec2 mouse;',
                    'uniform vec2 resolution;',
                    'uniform float h_angle;',
                    'uniform float v_angle;',
                    'uniform vec2 campos;',

                    'void main() {',

                    'vec2 pos = (gl_FragCoord.xy / resolution.xy) - vec2(0.5, 0.5);	',
                    'float horizon = v_angle;',
                    'float fov = 0.6; ',
                    'float scaling = 0.1;',

                    'vec3 p = vec3(pos.x, fov, pos.y - horizon);',
                    'float a = h_angle;',
                    //'float a = 0.1;',
                    'vec3 q = vec3(p.x * cos(a) + p.y * sin(a), p.x * sin(a) - p.y * cos(a)  , p.z);',
                    //'q.x += time;',
                    //'float dir = -(abs(pos.y) / pos.y);',
                    'float dir = 1.0;',
                    'float m = 0.0;',
                    'vec2 s = vec2(q.x / q.z - campos.x, q.y / q.z + campos.y  ) * scaling ;',

                    // checkboard texture
                    'float color = sign((mod(s.x, 0.1) - 0.05 ) * (mod(s.y, 0.1) - 0.05 ));',

                    // fading
                    'color *= p.z * p.z * (8.0 + 2.0 * sin(time * 3.));',
                    'color += 0.25;',

                    'gl_FragColor = vec4(color * vec3(1.0, 0.0, 0.5), 1.0);',
                    '}'

                ].join('\n');

                let mat = new BABYLON.ShaderMaterial({
                    uniforms: uniforms,
                    vertexShader: vert,
                    fragmentShader: frag
                });

                let mesh = new BABYLON.Mesh(new BABYLON.PlaneGeometry(5200, 2800), mat);
                mesh.position.z = -2000;
                this.mesh = mesh;
                chat3d.world.camera.add(mesh);
                this.uniforms = uniforms;
            },

            onRender: function(delta) {
                if (delta > 1) {
                    delta = 0;
                }
                this.uniforms.time.value += delta;
                //this.mouse.x = Math.random() * window.innerWidth;

            },

            onView: function(x, y) {
                //console.log(x, y);
                
            this.uniforms.h_angle.value = -chat3d.move.h_angle / 180 * Math.PI;
            this.uniforms.v_angle.value = -chat3d.move.v_angle / 180 * Math.PI;
            this.uniforms.campos.value.x = -chat3d.move.cam_pos.x / 250;
            this.uniforms.campos.value.y = -chat3d.move.cam_pos.z / 250;
        },

        onClean: function() {
            chat3d.world.camera.remove(this.mesh);
        },
        */
        z: 20,
        scripts: ['sur/main.js']

    },

    54: {
        obj: [],
        z: -357,
        scripts: ['wintertrees/NormalMapShader.js', 'wintertrees/main.js', 'EffectComposer.js', 'ShaderPass.js', 'wintertrees/BloomPass.js', 'wintertrees/BleachBypassShader.js',
            'wintertrees/ConvolutionShader.js', 'wintertrees/CopyShader.js', 'wintertrees/HorizontalTiltShiftShader.js', 'wintertrees/LuminosityShader.js',
            'wintertrees/VerticalTiltShiftShader.js', 'wintertrees/RenderPass.js', 'wintertrees/MaskPass.js',
            'wintertrees/SavePass.js'
        ],
        textures: ['b-grasslight-big2.jpg', 'b-backgrounddetailed62.jpg', 'b-grasslight-big-nm2.jpg'],

    },

    55: {
        obj: [{
            id: 'loc8'
        }, {
            id: 'loc8_antenna'
        }, {
            id: 'loc8_col'
        }, {
            id: 'loc8_handrail3'
        }, {
            id: 'loc8_wineglass'
        }, {
            id: 'loc8_pic1'
        }, {
            id: 'loc8_pic2'
        }, {
            id: 'loc8_floor1'
        }, {
            id: 'loc8_floor2'
        }, {
            id: 'loc8_glass_front'
        }, {
            id: 'loc8_glass_table'
        }],
        //camera_far: 4000,
        z: 205,
        z2: 520,
        enters: [
            [0, 575]
        ],


        lifts: [{
            x1: -300,
            x2: -210,
            y1: 35,
            y2: 60,
            end_x: -220,
            end_y: -350,
            rot: 1,
            floor: 2
        }, {
            x1: -300,
            x2: -200,
            y1: -325,
            y2: -300,
            end_x: -220,
            end_y: 100,
            rot: 180,
            floor: 1
        }],
        scripts: ['see/main.js']

    },

    56: {
        obj: [{
            id: 'pl_24_floor_2'
        }, {
            id: 'pl_24_2'
        }, {
            id: 'pl_24_col_2'
        }],
        scripts: ['psiho/main.js'],

        z: 20,

    },

    57: {
        obj: [],
        scripts: ['octopus/main.js'],
        textures: ['Sand.jpg'],
        z: 0,

    },

    58: {
        obj: [],
        scripts: ['cubes/main.js'],
        z: 11120,

    },

    59: {
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: -100,
            map: 'loc9'
        },

        water: {
            w: 50000,
            h: 50000,
            x: 0,
            y: 0,
            z: -100
        },
        sun: {
            x: -450,
            y: 300,
            z: 1000,
            color: 0xffffff
        },
        "obj": [{ "id": "display_7" }, { "id": "loc_31" }, { "id": "mc_trees" }, { "id": "plants" }, { "id": "loc_31_collider" }, { "id": "display_big" }, { "id": "display_1" }, { "id": "display_2" }, { "id": "display_3" }, { "id": "display_4" }, { "id": "display_5" }, { "id": "display_6" }, { "id": "loc_31_floor" }],
        z: 20,
        scripts: ['rtc/main.js'],
    },

    60: {
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: -100,
            rot: 50,
            map: 'loc9_night'
        },

        water: {
            w: 50000,
            h: 50000,
            x: 0,
            y: 0,
            z: -100
        },
        sun: {
            x: -450,
            y: 300,
            z: 1000,
            color: 0xffffff
        },
        "obj": [{ "id": "display_7" }, { "id": "loc_31_night" }, { "id": "mc_trees" }, { "id": "plants" }, { "id": "loc_31_collider" }, { "id": "display_big" }, { "id": "display_1" }, { "id": "display_2" }, { "id": "display_3" }, { "id": "display_4" }, { "id": "display_5" }, { "id": "display_6" }, { "id": "loc_31_floor_night" }],
        scripts: ['rtc/main.js'],
        z: 20
    },

    61: {
        z: 1500,
        scripts: ['city/main.js']
    },

    62: {
        z: -50,
        scripts: ['desert/main.js']
    },


    63: {
        //z: -220,
        z: 0,
        scripts: ['alien/main.js']
    },

    64: {

        z: 20,
        scripts: ['forest/main.js'],
        textures: ['snowflake.png']
    },

    65: {

        z: 20,
        video: {
            obj: 'loc1_tv_screen',
            sound: [180, -1055],
            x1: -183,
            y2: 0,
            x2: 150,
            y1: -270,
            loader_pos: [-84, -266, -180],
            loader_rot: [0, 45 / 180 * Math.PI, 0],
            loader_scale: 0.5

        },
        lights: true,
        obj: [{ id: 'loc1_tv_screen' }],
        scripts: ['p2player.js', 'audio/ObjetoCanvas.js', 'audio/ObjetoAnimacion.js', 'audio/spectum.js', 'audio/main.js']
    },

    66: {
        z: 0,
        obj: [],
        geo: ['grass.json', 'plant_1.json', 'rock.json', 'tree.json'],
        textures: ['grass.jpg', 'grass4.png', 'lensflare0.png', 'ground.jpg', 'morning03_low.jpg', 'plant.png', 'rock_ao.jpg', 'rock.jpg', 'tree.png', 'tree_ao.jpg', 's_g.png', 's_r.png', 'grass_repartition.jpg'],
        scripts: ['forest2/lib.js', 'forest2/main.js']

    },

    67: {
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'loc8'
        },

        "obj": [{ "id": "loc_32_collider" }, { "id": "loc_32_props" }, { "id": "loc_32_canyon" }],
        "z": 20,
        scripts: ['hoverboard/character.js', 'hoverboard/main4.js', 'p2player.js', 'hoverboard/replay.js'],
        geo: ['hoverboard_hoverboard.js'],
        textures: ['hoverboard_001.jpg'],
        css: ['speed.css'],
        html: ['speed.html'],
        config: {
            autorot: false
        }

    },

    68: {
        z: 0,
        scripts: ['psyhoyacht/main.js'],
        obj: [

            {
                id: 'loc8'
            },
            {
                id: 'loc8_antenna'
            },
            {
                id: 'loc8_col'
            },
            {
                id: 'loc8_handrail3'
            },
            {
                id: 'loc8_wineglass'
            },
            {
                id: 'loc8_pic1'
            },
            {
                id: 'loc8_pic2'
            },
            {
                id: 'loc8_floor1'
            },
            {
                id: 'loc8_floor2'
            },
            {
                id: 'loc8_glass_front'
            },
            {
                id: 'loc8_glass_table'
            }
        ],
        //camera_far: 4000,
        z: 205,
        z2: 520,
        enters: [
            [0, 575]
        ],


        lifts: [{
            x1: -300,
            x2: -210,
            y1: 35,
            y2: 60,
            end_x: -220,
            end_y: -350,
            rot: 1,
            floor: 2
        }, {
            x1: -300,
            x2: -200,
            y1: -325,
            y2: -300,
            end_x: -220,
            end_y: 100,
            rot: 180,
            floor: 1
        }],

    },

    69: {


        "obj": [],
        "z": -120,
        scripts: ['hoverboard/character.js', 'cyberhoverbord/main.js', 'p2player.js', 'cyberhoverbord/simplex-noise.min.js'],
        geo: ['hoverboard_hoverboard.js'],
        textures: ['hoverboard_001.jpg', 'iconfinder_finish_flag_172465.png'],
        css: ['speed.css'],
        html: ['speed.html'],
        config: {
            autorot: false
        }

    },

    70: {
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 0,
            map: 'cubes_sky'
        },

        "obj": [{ id: 'pl_25_floor2' }, { id: 'pl_25_2' }, { id: 'pl_25_col2' }],
        "z": 20,
        scripts: ['cubes2/main.js'],

        config: {
            autorot: false
        }

    },

    71: {
        skybox: {
            w: 80000,
            h: 50000,
            t: 80000,
            x: 0,
            y: 0,
            z: 500,
            map: 'loc8'
        },
        "obj": [{ "id": "loc_33_cave" }, { "id": "loc_33_props" }, { "id": "loc_33_collider" }],
        "z": 20,
        scripts: ['hoverboard/character.js', 'hoverboard/main5.js', 'p2player.js', 'hoverboard/replay.js'],
        geo: ['hoverboard_hoverboard.js'],
        textures: ['hoverboard_001.jpg'],
        css: ['speed.css'],
        html: ['speed.html'],
        config: {
            autorot: false
        }
    },

    72: {
        water: {
            w: 50000,
            h: 50000,
            x: 0,
            y: 0,
            z: -10
        },
        /* skybox: {
             w: 80000,
             h: 50000,
             t: 80000,
             x: 0,
             y: 0,
             z: 500,
             map: 'loc8_night'
         },*/



        "obj": [{ id: 'pl_25_floor2' }, { id: 'pl_25_2' }, { id: 'pl_25_col2' }],
        "z": 20,
        scripts: ['sky/sky.js'],
        onInit: function() {
            this.sky = new Sky();
            //this.sky.obj.position.x = 1000;
            chat3d.world.obj.push(this.sky.obj);
            chat3d.world.scene.add(this.sky.obj);

            this.relf_sky = new Sky();

            chat3d.world.water_refl_obj.push(this.relf_sky.obj);
            chat3d.world.water_scene.add(this.relf_sky.obj);


        },

        onRender: function(delta) {
            this.sky.update(delta);
            this.relf_sky.update(delta);

        },

        textures: ['noise.png', 'clouds-1-tile.jpg']

    },

    73: {
        obj: [],
        z: 20,
        scripts: ['forest3/shaders.js', 'forest3/main.js'],
        textures: ['SampleLeaves_1.png', '9128-ambientocclusion2.jpg', '9204-v2_grey.jpg', '9204-normal.jpg', 'Cap_02.jpg', 'branch.png', '6825-diffuse.jpg', '6825-normal.jpg', 'ray2.png', 'forest3_tree.png', 'fins2.png', '9128-ambientocclusion.jpg', 'vitsippa.png', 'bush.png', '6422.jpg', '6422-normal.jpg', 'bob2.png', '9451-ambientocclusion.jpg'],
        geo: ['tree.js', 'butterfly.js']
    }






};


locations.street = locations[12];