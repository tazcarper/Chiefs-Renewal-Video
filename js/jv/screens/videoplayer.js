// This is the controller for the main interactive video sequence

define(['underscore', 'bumpslide/view', 'text!./videoplayer.html',
    'jv/media', 'jv/sceneManager', 'jv/data/config',
     'jv/scenes/lockerScreenProjection', 'jv/scenes/imageScene', 'jv/frameCodeReader', 'jv/scenes/imageSprite',
     'jv/dispatcher', 'bumpslide/timeline', 'jv/scenes/endScreen', 'jv/scenes/endProjection', 'jv/scenes/modifiedShareOverlay','jv/scenes/scoreboardProjection', 'jv/scenes/introCopy', 'jv/scenes/screenOverlay'],
    function (_, view, template, media, sceneManager, config, lockerScreenProjection, imageScene, frameCodeReader, imageSprite, dispatcher, timeline, endScreen, endProjection, modifiedShareOverlay, scoreboardProjection, introCopy, screenOverlay) {

        var holder;
        var video;
        var $video;
        var time = timeline(render);
        var endFrame = 1122;
        var frame_reader;
        var zoomed = false;
        var returnVisitor = true;

        var self = view.extend({
            template:template,
            name:'video',
            pageName:'Video',
            onInit:onInit,
            onShow:onShow,
            onHide:onHide,
            getVideo:function () {
                return video;
            }
        });

        return self;

        function onInit() {

            holder = $('#holder', self.el);

            // connect our scene manager to this holder DIV
            sceneManager.setHolder(holder);

            // When we get the preloadStart signal, start loading stuff
            dispatcher.bind('preloadStart', startLoading);

            initControls();

            // uncomment this to check for return visitor
//            returnVisitor = $.cookie('returnVisitor');
//            console.log('returnVisitor:', returnVisitor);
        }


        function startLoading() {

            // start loading and attach video to holder
            video = media.getVideo('http://chiefs.s3.amazonaws.com/chiefs-final-v2_2', true);
            $video = $(video);
            $video.hide();

            var offset = 0;
 /* Intro Text Scene */
     sceneManager.addScene(introCopy(), offset + 0, offset + 70);
     /* Locker Room Scene */
     sceneManager.addScene(lockerScreenProjection(), offset + 71, offset + 125);
     /* Scoreboard scene */
     sceneManager.addScene(scoreboardProjection(), offset + 875, offset + 9999);
     sceneManager.addScene(screenOverlay(), offset + 856, offset + 9999);



       
     sceneManager.addScene(endScreen(), 1081 + offset, offset + 9999);

          //  sceneManager.addScene(endProjection(), 1122 + offset, offset + endFrame + 9999);

          //  sceneManager.addScene(modifiedShareOverlay(), 1125 + offset, offset + endFrame + 9999);




            sceneManager.initViews();

            frame_reader = frameCodeReader(video, 23.976);
            time.getCurrentFrame = frame_reader.getCurrentFrame;

            $(window).resize(updateZoom);
        }


        function onShow() {


            time.setMedia(video);
            holder.prepend(video);

            _.delay( function() {
                //console.log( 'goto and play');
                time.gotoAndPlay(0);
            }, 10);


            initEvents();

        }

        function onHide() {
            removeEvents();
        }

        function initEvents() {
            $(document).bind('keypress', onKeyPress);
            $(document).bind('contextmenu', killEvent);
            $(document).bind('selectstart', killEvent);
        }

        function removeEvents() {
            $(document).unbind('keypress', onKeyPress);
            $(document).unbind('contextmenu', killEvent);
            $(document).unbind('selectstart', killEvent);
        }

        function onKeyPress(event) {
            switch (event.which) {
                case 100:
                    $('#controls').toggle(500);
                    break;
                case 102:
                    // toggleZoom();
                    break;
            }
        }

        function killEvent(event) {
            event.stopImmediatePropagation();
            event.preventDefault();
        }

        function render(frame) {


           // console.log('render '+frame);

            $('#frameNum', self.el).text('Frame: ' + frame + ' (' + time.getTimecode() + ')');

            // because of bleep at start
            try {
                if (video.muted && frame > 3) video.muted = true;
            } catch (e) {
                console.log(e);
            }

            sceneManager.renderFrame(frame);

            if (frame > endFrame && !time.isSeeking()) {
/*
             console.log('video ending');
*/
                time.gotoAndStop(endFrame);
               // $video.hide();
               $('.scoreboard_transform').fadeOut();
                video.muted = true;
/*
                console.log('video end');
*/
                dispatcher.trigger('videoEnd');

                $.cookie('returnVisitor', '1', { expires:7, path:'/' });

            } else {

                if (!$video.is(':visible') && frame < endFrame - 2) {
                    $video.show();
                    video.muted = false;
                    //console.log('video start');
                    dispatcher.trigger('videoStart');
                }
            }


        }

        function initControls() {

            $('#pauseBtn', self.el).click(pause);
            $('#playBtn', self.el).click(playVideo);

            $('.gotoFrameBtn', document).live('click',
                function (evt) {
                    evt.preventDefault();
                    //time.play();
                    time.gotoAndPlay($(this).data('frame'));
                    dispatcher.trigger('videoStart');
                });

            $('#minusBtn', self.el).click(
                function () {
                    time.gotoAndStop(time.getCurrentFrame() - 1);
                });

            $('#plusBtn', self.el).click(
                function () {
                    time.gotoAndStop(time.getCurrentFrame() + 1);
                });

            $('#backBtn', self.el).click(
                function () {
                    time.gotoAndPlay(time.getCurrentFrame() - 24);
                });
            $('#forwardBtn', self.el).click(
                function () {
                    time.gotoAndPlay(time.getCurrentFrame() + 24);
                });
            $('#muteBtn', self.el).click(toggleMute);

            $('#zoomBtn', self.el).click(toggleZoom);

            $("#container").dblclick(function (event) {
                if (event.target == $('#container')[0]) toggleZoom();
            });


        }

        function toggleZoom() {
            zoomed = !zoomed;
            updateZoom();
            $(window).resize();

        }

        function toggleMute() {
          
            if (video.muted == false) {
    // Mute the video
    video.muted = true;

    // Update the button text
    $('.muteIt').hide();
    $('.unmuteIt').show();
  } else {
    // Unmute the video
    video.muted = false;

    // Update the button text
      $('.muteIt').show();
    $('.unmuteIt').hide();
  }
        }

        function pause() {
           		
                time.pause();
                $('#pauseBtn').hide();
                $('#playBtn').show();
            
        }
        function playVideo() {
           
                time.play();
                $('#pauseBtn').show();
                $('#playBtn').hide();
        }

        function updateZoom() {

            if (zoomed) {
                holder.css({zoom:$(window).width() / 960});
                $('#container').addClass('zoomed');
            } else {
                holder.css({zoom:1.0});
                $('#container').removeClass('zoomed');

            }

        }


    });