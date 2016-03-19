define(['underscore', 'bumpslide/view', 'jv/media', 'jv/userVariables', 'bumpslide/canvasUtil', 'jv/dispatcher', 'jv/projection', 'quasimondo/stackBlur'],
    function (_, view, media, userVars, canvasUtil, dispatcher, projection, stackBlur) {


        // static

        var DEG_TO_RAD = Math.PI / 180;

        return function (id) {

            var stage = canvasUtil.create(900, 507);
            var wall_img;
            var userName = "Fred Jones";
            var mediaReady = false;

            var self = view.extend({
                template:'<div class="scene HD" id="screenOverlay" style="z-index:89;"></div>',
                name:'screenOverlay',
                onInit:onInit,
                onShow:onShow,
                onHide:onHide
            });



            function onInit() {
                wall_img = media.getImage('img/screenOverlay.png');
                //wall_img = media.getImage('img/phoneZoom02c_guide.jpg');

               userVars.bind('username', setUserName, true);
                dispatcher.bind('mediaLoadComplete', onMediaReady);
               
            }

            function setUserName(val) {
                userName = val.toUpperCase();
                render();
            }

            function getDisplayName() {
                if(userName==null) return "";
                var names = userName.split(' ');
                var label = names[0];
                if(names.length>1) {
                    label += '' + names[names.length-1].substr(0,0);
                }
                return label;
            }

            function onMediaReady() {
                mediaReady = true;
                render();
            }

            function skew(skewX, skewY) {
                skewX = skewX * DEG_TO_RAD;
                skewY = skewY * DEG_TO_RAD;
                return [ Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), 0, 0];
            }

            function render() {

                if (!mediaReady) return;

                // render to stage
                var ctx = stage.getContext('2d');
                var w = stage.width;
                var h = stage.height;

                // black background
/*
                ctx.fillRect(0, 0, w, h);
*/
/*
                ctx.fillStyle = "rgba(25,25,255,.9)";
*/
ctx.globalAlpha = .4;
ctx.drawImage(wall_img, 107, 116, 680, 258);
                ctx.save();

             

                ctx.restore();

                // draw overlay
                ctx.save();
                
              
                ctx.restore();


            }

            function onShow() {
               
                
            //    $(stage).addClass('phone_transform'); 
                self.el.append(stage);
               
            }

            function onHide() {
                self.el.children().remove();
            }

            return self;

        };
    });


