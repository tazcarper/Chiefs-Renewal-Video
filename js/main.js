/* require.config({urlArgs: JV.version}); */
// no cache during dev
require(['jv/controller', 'bumpslide/stats', 'jv/data/model', 'BrowserDetect', 'jv/dispatcher', 'jv/tracker', 'purl'], function (controller, stats, model, _BrowserDetect, dispatcher, tracker, purl) {

    $(init);

    var _isCover, _isExperience, _scrollWidth, _scrollHeight, _isVideo, _timer, _isPin;

    function init() {

        _isCover = true;
        _isExperience = false;
        _isVideo = false;
        _isPin = false;

        calcScrollBarDimensions();
        initEvents();
        addUserPhoto();
        showJumplist();
        logFirstPin();

        if (isBrowserOkay()) {
            controller.init();
        } else {
            showVideo();
        }

        onOverLabel();
        _timer = setTimeout(onOutLabel, 4000);

        $("#front").fadeIn(500, 'easeOutQuad');
        $("#back").fadeIn(500, 'easeOutQuad');
        $("#pin-text").html(getPinText());

        dispatcher.bind('videoEnd', onEnd);
        dispatcher.bind('videoStart', onBegin);
    }

    function addUserPhoto() {

    }

    function calcScrollBarDimensions() {
        var i = document.createElement("p");
        i.style.width = "100%";

        i.style.height = "200px";

        var o = document.createElement("div");
        o.style.position = "absolute";
        o.style.top = "0px";
        o.style.left = "0px";
        o.style.visibility = "hidden";
        o.style.width = "200px";
        o.style.height = "150px";
        o.style.overflow = "hidden";
        o.appendChild(i);

        document.body.appendChild(o);
        var w1 = i.offsetWidth;
        var
            h1 = i.offsetHeight;
        o.style.overflow = "scroll";
        var w2 = i.offsetWidth;
        var h2 = i.offsetHeight;
        if (w1 == w2) w2 = o.clientWidth;
        if (h1 == h2) h2 = o.clientWidth;

        document.body.removeChild(o);

        _scrollWidth = w1 - w2;
        _scrollHeight = h1 - h2;
    }

    // Mobile devices not currently supported
    function isBrowserOkay() {
        return Modernizr.audio && Modernizr.video && Modernizr.canvas && !MobileDetect.detect();
    }

    function getPinText() {

        try {
 
            // First, we need to check if the browser is in already Site Mode
            if (window.external.msIsSiteMode()) {

                // Site mode is supported and active
                return "";
            } else {
                return "";
            }

        } catch (ex) {
            if (BrowserDetect.OS == "Windows") {
                // WIN < 7
                return "Please upgrade to a newer version of IE.";
            } else {
                return "";
            }
        }
    }

    function showVideo() {
        _isVideo = true;
        $("#front-content").html("<iframe width=\"960\" height=\"540\" src=\"http://www.youtube.com/embed/XhZ1huMFROk\" frameborder=\"0\" allowfullscreen></iframe>");
        $("#app").hide();
    }

    function initEvents() {
        $("#ie-label").bind("mouseenter", onOverLabel).bind("mouseleave", onOutLabel);
        $("#credits-container").bind("mouseenter", onOverCredits).bind("mouseleave", onOutCredits);
        $("#pin").bind("mouseenter", onOverPin).bind("mouseleave", onOutPin);

        $('[data-atlas]').on('click', function(){
            Atlas.logJS($(this).data('atlas'));
        });

        $(window).bind("resize", onWindowResize);
        fixDimensions(true);
    }

    function onOverCredits() {
        $("#credits").not(':visible').stop().show().animate({"left":"-336px", "opacity":1}, 300);
    }

    function onOutCredits() {
        $("#credits").delay(200).stop().animate({"opacity":0}, 300, "linear", onOutCreditsComplete);
    }

    function onOverLabel() {
        if (_timer) {
            clearTimeout(_timer);
            _timer = null;
        } else {
            _isPin = true;
            $("#pin").stop().show().animate({"right":"-272px", "opacity":1}, 300);
        }
    }

    function onOutLabel() {
        if (_timer) {
            clearTimeout(_timer);
            _timer = null;
        }
        $("#pin").delay(200).stop().animate({"opacity":0}, 300, "linear", onOutLabelComplete);
    }

    function onOutLabelComplete() {
        _isPin = false;
        $("#pin").stop().css({"right":"-282px"}).hide();
    }

    function onOutCreditsComplete() {
        $("#credits").stop().css({"left":"-341px"}).hide();
    }

    function onOverPin() {
        if (_isPin) $("#pin").stop().css({"right":"-272px"}).animate({"opacity":1}, 100);
    }

    function onOutPin() {
        _isPin = false;
        onOutLabel();
    }

    function fixDimensions(first) {
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();

        var smallerWidth = (windowWidth < 960);
        var smallerHeight = (windowHeight < 637);

        if (smallerWidth != smallerHeight && first) {
            if (smallerWidth) windowHeight -= _scrollHeight;
            else windowWidth -= _scrollWidth;
        }

        var width = Math.max(960, windowWidth);
        var height = Math.max(637, windowHeight);

        $("#container").css({"width":width, "height":height});
        $("#mask").css({"width":width, "height":height});
        $("#cover").css({"width":width, "height":height});
        $(".cover-gradient").css({"width":width, "height":height});

        if (Modernizr.backgroundsize) {
            if (_isCover && (width < 1800 && height < 1309)) {
                _isCover = false;
                $("#container").css("background-size", "1800px 1309px");
            } else if (!_isCover && (width >= 1800 || height >= 1309)) {
                _isCover = true;
                $("#container").css("background-size", "cover");
            }
        }

        var leftPos = (width - $("#back").width()) * .5;
        var topPos = (height - $("#back").height()) * .5;

        $("#back").css({"left":leftPos, "top":topPos});
        $("#front").css({"left":leftPos, "top":0});
    }

    function onWindowResize() {
        fixDimensions(false);
    }

    function onBegin() {
        if (!_isExperience) {
            _isExperience = true;
            //console.log('BEGIN');
            $("#cover").stop(true, true).delay(300).fadeIn(500, "easeOutQuad");
            $("#experience-black").stop(true, true).hide().delay(300).fadeOut(500, "easeOutQuad");
            $("#experience-white").stop(true, true).hide().delay(300).fadeIn(500, "easeOutQuad");
            $("#behind-front, #behind-back").stop(true, true).fadeOut(500, "easeOutQuad");
        }
    }

    function onEnd() {
        if (_isExperience) {
            _isExperience = false;
            // console.log('END');
            $("#cover").stop(true, true).fadeOut(500, "easeOutQuad");
            $("#experience-black").stop(true, true).fadeIn(500, "easeInQuad");
            $("#experience-white").stop(true, true).fadeOut(500, "easeInQuad");
            $("#behind-front, #behind-back").stop(true, true).fadeIn(500, "easeOutQuad");
            onOverLabel();
            _timer = setTimeout(onOutLabel, 6000);
        }
    }

    function showJumplist() {
        try {
 
            if (window.external.msIsSiteMode()) {
                window.external.msSiteModeClearJumpList();
                
            }

        } catch (ex) {
            // Fail silently
        }
    }

    function logFirstPin() {
        try {
            if (window.external.msIsSiteMode()) {
                // Detect first launch from the Start menu.
                if (window.external.msIsSiteModeFirstRun(false) == 1) {
                    tracker.trackEvent( this, 'o', 'First Pin', 'event13', 'prop14', 'eVar14');
                    Atlas.logJS('SMG_MRTINX_SITE_JasmineV_Pin');
                }
            }
        }
        catch (ex) {
            // Fail silently. Pinned Site API not supported.
        }
    }

function change_the_email_url() {
	var url = $.url();
	var sourcePath = url.attr('source');
	var thePath = url.attr('path');
	var protoURL = url.attr('protocol');
	var theHost = url.attr('host');
	/* shareURL variable currently pulls the CURRENT URL (which will be the private site). It needs to be changed to the new public page once moved over. Something like this. var shareURL = "http://chiefsrenewal/share" */
		var shareURL = protoURL + "://" + theHost + thePath;
	
	var share_url = shareURL + '?fname=' + $('#fname').val();
	$('.st_facebook_large, .st_twitter_large').attr('st_url', '');
	$('.st_facebook_large, .st_twitter_large').attr('st_url', sourcePath);
	var getFirstName = $('#fname').val();
	var description = "There’s nothing like the experience of being a Season Ticket Holder at Arrowhead. Inside these walls, we are all Chiefs. We are the definition of strength in numbers. Join us for the 2014 season."
	$('.st_email_large, .stLarge').attr('st_url', '');
	$('.st_email_large, .stLarge').attr('st_url', share_url);
	if ($('#emailButton').length == 1) {} else {
		$('#email_form').append('<span id="emailButton"  ></span>');
		stWidget.addEntry({
			"service": "sharethis",
			"element": document.getElementById('emailButton'),
			"url": share_url,
			"title": "In the Kingdom, we are all Chiefs. Watch the video.",
			"type": "large",
			"summary": description
		});
		$('#email_form .stLarge').css({
			backgroundImage: 'url(http://i.imgur.com/QFMabBj.png)',
			height: '50px',
			margin: '0 0 0 7px',
			width: '125px'
		});
	}
}



$(document).ready(function() {
	var url = $.url();
	var sourcePath = url.attr('source');
	var thePath = url.attr('path');
	var protoURL = url.attr('protocol');
	var theHost = url.attr('host');
	
	 /* shareURL variable currently pulls the CURRENT URL (which will be the private site). It needs to be changed to the new public page once moved over. Something like this. IE something like : var shareURL = protoURL + "://chiefsrenewal?fname="; */
	 
	var shareURL = protoURL + "://" + theHost + thePath + '?fname=';
	var firstnameField = $('.createNameField').val();
	var lastNameField = $('.createNameLastField').val();
	$('.createNameField , .createNameLastField').live('keyup', function() { /* get field info */
		firstnameField = $('.createNameField').val();
		lastNameField = $('.createNameLastField').val(); /* replace space with _ */
		firstnameField = firstnameField.replace(/ /g, '_');
		if (firstnameField != '' && lastNameField != '') {
			$('.createName').show();
		} else {
			$('.createName').hide();
		}
	});
	$('.createName').click(function() {
		if (firstnameField != '' && lastNameField != '') { /* create user made URL */
			$('.theirURL').show();
			$('.userMadeURL').html('<a href="' + shareURL + firstnameField + '&lname=' + lastNameField + '" target="_blank">' + shareURL + firstnameField + '&lname=' + lastNameField + '</a>');
		} else if (firstnameField == '') {
			console.log('fill in first name');
		} else if (lastNameField == '') {
			console.log('fill in last name');
		} else {
			console.log('put names in');
			$('.userMadeURL').html('');
			$('.theirURL').hide();
		} /* create link */
/*
if (firstnameField == '') {
			$('.userMadeURL').html('');
			$('.theirURL').hide();
		} else {
			$('.theirURL').show();
			$('.userMadeURL').html('<a href="' + shareURL + firstnameField + '" target="_blank">' + shareURL + firstnameField + '</a>');
		}
*/
	});
	$('input').keydown(function(event) {
		if (!$(this).hasClass("last")) {
			if (event.which == 13) {
				event.preventDefault();
				$(this).nextAll('input:first').focus();
			}
		}
	});
	$('#show_email_form').on('click', function() {
		$('#email_form').css({
			display: 'block'
		});
	});
	$('.change_the_email_url').on('change', function() {
		$('#emailButton').remove();
		change_the_email_url();
	});
});


});