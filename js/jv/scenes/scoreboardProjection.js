define(['underscore', 'bumpslide/view', 'jv/media', 'jv/userVariables', 'bumpslide/canvasUtil', 'jv/dispatcher', 'quasimondo/stackBlur'],
    function (_, view, media, userVars, canvasUtil, dispatcher, stackBlur) {


        // static

        var DEG_TO_RAD = Math.PI / 180;

        return function (id) {

            var stage = canvasUtil.create(900, 507);
            var stage2 = canvasUtil.create(900, 507);
            var wall_img;
            var userName = "fan";
            var lastName = "fan"
            var yearRegistered = "2014";
            var mediaReady = false;
            var self = view.extend({
                template:'<div class="scene HD" id="scoreboard"></div>',
                name:'Scoreboard',
                onInit:onInit,
                onShow:onShow,
                onHide:onHide
            });

var imageObj = new Image();
imageObj.src = 'images/squairy_light.png';
            function onInit() {
               wall_img = media.getImage('img/scoreboardText2.png');
                //wall_img = media.getImage('img/phoneZoom02c_guide.jpg');
                userVars.bind('lastname', setLastName, true);
                userVars.bind('year', getTheYear, true);
                userVars.bind('username', setUserName, true);
                dispatcher.bind('mediaLoadComplete', onMediaReady);
/*
                 dispatcher.bind('usernameConnect', setUserName);
*/



            }
            
            function setLastName(val) {
	            lastName = val.toUpperCase();
/*
	            console.log('LAST NAME = ' + lastName);
*/

            }
            function getTheYear(year) {
/*
	            console.log('their year = ' + year);
*/
	            yearRegistered = 'SINCE '+ year.substring(0,4);
	           
            }
            function setUserName(val) {
/*
            console.log('the value ' + val);
*/
               userName = val.toUpperCase();
               
            }

            function getDisplayName() {
                if(userName==null) return "";
                var names = userName.split(' ');
                var label = names[0];
                if(names.length>1) {
/*
				// Show one letter of the last name
                    label += ' ' + names[names.length-1].substr(0,1);
*/
				// hide anything after first name
                    label += '' + names[names.length-1].substr(0,0);
                   

                }
                label = label + ' ' +lastName;
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
/*
            check to see if there is a year provided in the URL. If there is none, run the name screen without the year.
*/
	            if (yearRegistered == null || yearRegistered == '' || yearRegistered == 'SINCE ') {
		             if (!mediaReady) return;

                // render to stage
                var ctx = stage.getContext('2d');
                var w = ctx.width / 2;
                var h = ctx.height / 2;
               var pattern = ctx.createPattern(imageObj, 'repeat');
                // black background

               
                
                ctx.save();

                  ctx.rotate(0);
ctx.save();
                    ctx.translate(200, 200);
                    ctx.transform.apply(ctx, skew(0, 0));
                 // ctx.scale(1.06, .92);
                 //  ctx.rotate(-0.01);
                   ctx.font = "bold 100px 'EurostileLTW01-BoldObli', arial";
                       ctx.fillStyle = '#ffffff';
                     ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
                    ctx.shadowOffsetX = 2; 
                    ctx.shadowOffsetY = 2; 
                    ctx.shadowBlur = 0;
                    ctx.textAlign="center"; 
                    
                   
                    ctx.fillText(getDisplayName(), 245, 60, 600);
                    
                  //  stackBlur(stage, .5);
                

                ctx.restore();
                
                // draw overlay
                ctx.save();
                //ctx.globalAlpha = .5;
                
          
   
                ctx.restore();

	            }
	            
	            /* IF THERE IS A YEAR */
	            else {
	            
	            
	             if (!mediaReady) return;

                // render to stage
                var ctx = stage.getContext('2d');
                var w = ctx.width / 2;
                var h = ctx.height / 2;
                // black background
/*
                ctx.fillRect(110, 190, 480, 80);
*/
                
                ctx.save();
                 

                  ctx.rotate(0);
                  ctx.save();
                  var pattern = ctx.createPattern(imageObj, 'repeat');
                    ctx.translate(200, 195);
                    ctx.transform.apply(ctx, skew(0, 0));
                 // ctx.scale(1.06, .92);
                 //  ctx.rotate(-0.01);
                    ctx.font = "bold 100px 'EurostileLTW01-BoldObli', arial";
                       ctx.fillStyle = '#ffffff';
                     ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
                    ctx.shadowOffsetX = 2; 
                    ctx.shadowOffsetY = 2; 
                    ctx.shadowBlur = 0;
                    ctx.textAlign="center"; 
                    
                   
                    ctx.fillText(getDisplayName(), 245, 60, 600);
                    
                  
                

                ctx.restore();
                
                
                // 'season ticket holder' text
                // draw overlay
                ctx.save();
                 ctx.translate(200, 238);
                    ctx.transform.apply(ctx, skew(0, 0));
                 // ctx.scale(1.06, .92);
                 //  ctx.rotate(-0.01);
                    ctx.font = "bold 27px 'Eurostile LT W01 Bold', arial";
                       ctx.fillStyle = '#ffffff';
                     ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
                    ctx.shadowOffsetX = 2; 
                    ctx.shadowOffsetY = 2; 
                    ctx.shadowBlur = 0;
                    ctx.textAlign="center"; 
                    
                   
                    ctx.fillText('SEASON TICKET HOLDER', 245, 60);
                
          
   
                ctx.restore();
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
                
              

                    ctx.translate(25, 218);
                 //   ctx.scale(1.06, .92);
                   // ctx.rotate(0.2);
                    ctx.font = "35px 'Eurostile LT W01 Bold', arial";
                      ctx.fillStyle = '#ffffff';
                     ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
                    ctx.shadowOffsetX = 2; 
                    ctx.shadowOffsetY = 2; 
                    ctx.shadowBlur = 0;
                    ctx.textAlign="center"; 
                    ctx.fillText(yearRegistered, 425, 120);
                    
                

                ctx.restore();
                
                // draw overlay
                ctx.save();
                //ctx.globalAlpha = .5;
                 // ctx.drawImage(wall_img, 250, 270);
/*
            ctx.drawImage(wall_img, 155, 113);
*/
                ctx.restore();


            }

            function onShow() {
            	$(stage).hide();
            	    $(stage).addClass('scoreboard_transform'); 
                self.el.append(stage);
                $(stage).fadeIn( 1500, function() {
      setTimeout(function() {
   
    }, 6000);
  });
              

            }

            function onHide() {
            
                self.el.children().remove();
            }

            return self;

        };
    });


