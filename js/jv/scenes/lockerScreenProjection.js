define(['underscore', 'bumpslide/view', 'jv/media', 'jv/userVariables', 'bumpslide/canvasUtil', 'jv/dispatcher', 'jv/projection', 'quasimondo/stackBlur'],
    function (_, view, media, userVars, canvasUtil, dispatcher, projection, stackBlur) {


        // static

        var DEG_TO_RAD = Math.PI / 180;

        return function (id) {

            var stage = canvasUtil.create(900, 507);
            var wall_img;
            var userName = "Fred ";
            var lastName = "Jones";
            var userYear = "2013";
            var mediaReady = false;

            var self = view.extend({
                template:'<div class="scene HD" id="locker"></div>',
                name:'locker',
                onInit:onInit,
                onShow:onShow,
                onHide:onHide
            });



            function onInit() {
            	/* get bg img */
                wall_img = media.getImage('img/lockerBG.png');
                /* get dynanmic variables from userVariables */
                userVars.bind('year', setYear, true);
                userVars.bind('lastname', setLastName, true);
                userVars.bind('username', setUserName, true);
                /* media load */
                dispatcher.bind('mediaLoadComplete', onMediaReady);
               
            }
            
            function setYear(val) {
	            userYear = val.slice(-2);
	            
            }
            
            function setLastName(val) {
	            lastName = val.toUpperCase();
/*
	            console.log('LAST NAME = ' + lastName);
*/

            }

            function setUserName(val) {
                userName = val.toUpperCase();
/*
                console.log('FIRST NAME = ' + userName);
*/
                render();
            }

            function getDisplayName() {
                if(userName==null) return "";
        /*
        var names = userName.split(' ');
                var label = names[0];
                if(names.length>1) {
                    label += '' + names[names.length-1].substr(0,0);
                }
*/
				var names = userName;
                return names;
            }
            
            function getLastName() {
                if(lastName==null) return "";
                var names = lastName.split(' ');
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
	            if (userName == 'FAN' || lastName == null || lastName == '') {
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
		ctx.drawImage(wall_img, 0, 0);
                ctx.save();

                if (id == 2) {

                    ctx.translate(299, 243);
                    
                   // ctx.transform.apply(ctx, skew(33.5, 16.5));
               //     ctx.scale(.733, .66);
                  //  ctx.font = "32px Segoe,Trebuchet,Arial,sans-serif";
                    ctx.fillStyle = "rgba(255,255,255,.9)";
                    ctx.fillText(getDisplayName(), 4, 33, 400);
                  //  stackBlur(stage, .6);
                } else {
                    ctx.translate(535, 244);
                    ctx.transform.apply(ctx, skew(-14, 0));
                 //   ctx.scale(1.06, .92);
                    ctx.rotate(0.2705);
                    ctx.font = "bold 85px 'Verdana'";
                    ctx.fillStyle = "#fff";
                    ctx.textAlign="center"; 
                    ctx.shadowColor = "rgba(0, 0, 0, 1)";
                    ctx.shadowOffsetX = 1; 
                    ctx.shadowOffsetY = 5; 
                    ctx.shadowBlur = 30;
                    
                    ctx.fillText(getDisplayName(), 0, 50, 350);
                  //  stackBlur(stage, 1.0);
                }

                ctx.restore();

                // draw overlay
                ctx.save();
               
                render2();

		            }
		            else {
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
			ctx.drawImage(wall_img, 0, 0);
                ctx.save();

                if (id == 2) {

                    ctx.translate(299, 243);
                    
                   // ctx.transform.apply(ctx, skew(33.5, 16.5));
               //     ctx.scale(.733, .66);
                  //  ctx.font = "32px Segoe,Trebuchet,Arial,sans-serif";
                    ctx.fillStyle = "rgba(255,255,255,.9)";
                    ctx.fillText(getDisplayName(), 4, 33, 400);
                  //  stackBlur(stage, .6);
                } else {
                    ctx.translate(535, 204);
                    ctx.transform.apply(ctx, skew(-14, 0));
                 //   ctx.scale(1.06, .92);
                    ctx.rotate(0.2705);
                    ctx.font = "bold 55px 'Verdana'";
                    ctx.fillStyle = "#fff";
                    ctx.textAlign="center"; 
                    ctx.shadowColor = "rgba(0, 0, 0, 1)";
                    ctx.shadowOffsetX = 1; 
                    ctx.shadowOffsetY = 5; 
                    ctx.shadowBlur = 30;
                    
                    ctx.fillText(getDisplayName(), 0, 50, 350);
                  //  stackBlur(stage, 1.0);
                }

                ctx.restore();

                // draw overlay
                ctx.save();
               
render2();
}
            }
function render2() {
                if (!mediaReady) return;

                // render to stage
                var ctx = stage.getContext('2d');
                var w2 = ctx.width / 2;
                var h2 = ctx.height / 2;

                // black background
/*
                ctx.fillRect(110, 190, 480, 80);
*/
                
              
				ctx.translate(530, 258);
                   
                   ctx.transform.apply(ctx, skew(-14, 0));
                 //   ctx.scale(1.06, .92);
                    ctx.rotate(0.2705);
                    ctx.font = "bold 55px 'Verdana'";
                    ctx.fillStyle = "#fff";
                    ctx.textAlign="center"; 
                    ctx.shadowColor = "rgba(0, 0, 0, 1)";
                    ctx.shadowOffsetX = 1; 
                    ctx.shadowOffsetY = 5; 
                    ctx.shadowBlur = 30;
                    ctx.fillText(getLastName(), 0, 50, 350);
                 
                

                ctx.restore();
                
                // draw overlay
                ctx.save();
                //ctx.globalAlpha = .5;
               
/*
            ctx.drawImage(wall_img, 155, 113);
*/
                ctx.restore();
                render3();

            }
            function render3() {
            if (userYear == null || userYear == '' || userYear == 'SINCE ') {
             if (!mediaReady) return;

                // render to stage
                var ctx = stage.getContext('2d');
                var w2 = ctx.width / 2;
                var h2 = ctx.height / 2;

                // black background
/*
                ctx.fillRect(110, 190, 480, 80);
*/
                
              
				ctx.translate(808, 330);
                   
                   ctx.transform.apply(ctx, skew(-14, 0));
                 //   ctx.scale(1.06, .92);
                    ctx.rotate(0.273);
                    ctx.font = "152px 'UnitedSansRgBd', script";
                    ctx.fillStyle = "#fff";
                    ctx.textAlign="center"; 
                    ctx.shadowColor = "rgba(0, 0, 0, 1)";
                    ctx.shadowOffsetX = 1; 
                    ctx.shadowOffsetY = 5; 
                    ctx.shadowBlur = 30;
                    ctx.fillText('1', 0, 50, 100);
                 
                

                ctx.restore();
                
                // draw overlay
                ctx.save();
                //ctx.globalAlpha = .5;
               
/*
            ctx.drawImage(wall_img, 155, 113);
*/
                ctx.restore();
            }
            else {
                if (!mediaReady) return;

                // render to stage
                var ctx = stage.getContext('2d');
                var w2 = ctx.width / 2;
                var h2 = ctx.height / 2;

                // black background
/*
                ctx.fillRect(110, 190, 480, 80);
*/
                
              
				ctx.translate(808, 330);
                   
                   ctx.transform.apply(ctx, skew(-14, 0));
                 //   ctx.scale(1.06, .92);
                    ctx.rotate(0.273);
                    ctx.font = "152px 'UnitedSansRgBd', script";
                    ctx.fillStyle = "#fff";
                    ctx.textAlign="center"; 
                    ctx.shadowColor = "rgba(0, 0, 0, 1)";
                    ctx.shadowOffsetX = 1; 
                    ctx.shadowOffsetY = 5; 
                    ctx.shadowBlur = 30;
                    ctx.fillText(userYear, 0, 50, 100);
                 
                

                ctx.restore();
                
                // draw overlay
                ctx.save();
                //ctx.globalAlpha = .5;
               
/*
            ctx.drawImage(wall_img, 155, 113);
*/
                ctx.restore();
             

            }
            }
            
            function onShow() {
               
                
           
                self.el.append(stage);
               
            }

            function onHide() {
                self.el.children().remove();
            }

            return self;

        };
    });


