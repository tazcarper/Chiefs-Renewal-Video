define(['underscore', 'bumpslide/view', 'jv/media', 'jv/userVariables', 'bumpslide/canvasUtil', 'jv/dispatcher', 'quasimondo/stackBlur', 'text!./endScreen.html', 'text!./endScreen2.html'],
    function (_, view, media, userVars, canvasUtil, dispatcher, stackBlur, template, template2) {


        // static

        var DEG_TO_RAD = Math.PI / 180;

        return function (id) {

            var stage = canvasUtil.create(900, 470);
            var stage2 = canvasUtil.create(900, 470);
            var wall_img;
            var userName = "zzz";
            var yearRegistered = "2014";
            var mediaReady = false;
            var self = view.extend({
                template:template,
                name:'endScreen',
                onInit:onInit,
                onShow:onShow,
                onHide:onHide
            });



            function onInit() {
               wall_img = media.getImage('img/endCopy.png');
                //wall_img = media.getImage('img/phoneZoom02c_guide.jpg');
                userVars.bind('year', getTheYear, true);
                userVars.bind('username', setUserName, true);
                dispatcher.bind('mediaLoadComplete', onMediaReady);
/*
                 dispatcher.bind('usernameConnect', setUserName);
*/



            }
            function getTheYear(year) {
	            yearRegistered = year;
	            
	           
            }
            function setUserName(val) {
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
	            if (yearRegistered == null || yearRegistered == '') {
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

               
                
                
                
                ctx.drawImage(wall_img,133,180, 627, 82);
                
                
                // draw overlay
                ctx.save();
                //ctx.globalAlpha = .5;
                
          
   
                ctx.restore();

               

	            }
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

               
                
                
                
                ctx.drawImage(wall_img,133,180, 627, 82);
                
                
                // draw overlay
                ctx.save();
                //ctx.globalAlpha = .5;
                
          
   
                ctx.restore();

      
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
                
              

                   
                

                ctx.restore();
                
                // draw overlay
                ctx.save();
                //ctx.globalAlpha = .5;
/*
            ctx.drawImage(wall_img, 155, 113);
*/
                ctx.restore();


            }

            function onShow() {
            	$(stage).hide();
            	$('.signup').hide();
            	    $(stage).addClass('scoreboard_transform2'); 
                self.el.append(stage);
                 $('.scoreboard_transform').fadeOut(1500, function() {
	                  $(stage).fadeIn(1500);
	                  $('.signup').fadeIn(1500);
	                  /* if there is no year in the URL, change the end frame CTA button to the kcchiefs.com ticket site */
	                  if (yearRegistered == '' || yearRegistered == null) {
	                  
		                  $('.renewButtn').attr('src', 'cdn/images/end/btn2.png');
		                  $('.signup a').attr('href','http://www.kcchiefs.com/tickets/index.html');
		                  $('.renewButtn').width(316);
	            	
	            }
                 });
               
     
  
              

            }

            function onHide() {
            
              /*   self.el.children().remove(); */
            }
            
            return self;

        };
    });


