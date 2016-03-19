// intro screen -

define(['bumpslide/view', 'text!./welcome.html', 'jv/dispatcher', 'purl', 'jquery.profanityfilter.min', 'text!swearWords.json' ], function (view, template, dispatcher, purl, profanityFilterz, swearWords) {
	
    var _defaultText;

    var _usernameInput;

    var self = view.extend({
        template:template,
        name:'welcome',
        pageName: "Welcome",
        onInit:onInit,
        transitionIn:function () {
            this.el.stop(true, true).delay(500).fadeIn(1000, 'easeOutQuad');
        }
        /*onShow:function () {
            if ($.cookie('username')) {
                _usernameInput.val($.cookie('username'));
                onNoFb();

                setTimeout( function() { dispatcher.trigger('usernameConnect', $.cookie('username')); }, 750);
            }
        }*/
    });

    self.$ = function (selector) {
        return $(selector, self.el);
    };

    // METHODS
    function onInit() {

        _usernameInput = $("#connect-field-input", self.el);
        _defaultText = _usernameInput.val();

        $(this.el).on('focus', _usernameInput, null, onFieldFocus);
        $(this.el).on('keydown', _usernameInput, null, onFieldKeyDown);
        $(this.el).on('blur', _usernameInput, null, onFieldBlur);
        $(this.el).on('click', "#connect-copy-nofb", null, onNoFb);
        $(this.el).on('click', "#connect-field-btn", null, onFieldBtn);

    }



    
    /* Play button */
    function onFieldBtn(event) {
    event.preventDefault();
    	/* Parse the URL */
    	var url = $.url();
    	var newURL = url.attr('source');
    	/* PULLS FIRST NAME, LAST NAME, YEAR FROM URL PARAMS */
    	var getFirstName = $.url(newURL).param('fname');
    	var getLastName = $.url(newURL).param('lname');
    	var getTheYear = $.url(newURL).param('year');
    	
    	if (typeof getFirstName === "undefined" || getLastName === "undefined") {
	    	
    	}
    	else {
    	
    	
    	if (getFirstName.indexOf('_') === -1 ) {
    		
    	}
    	else {
	    	getFirstName = getFirstName.replace("_"," ");
    	}
    	}
       $('.f').html(getFirstName);
       
       $('.l').html(getLastName);
       /* run profanity filter */
        $('.f , .l').profanityFilter({
	        externalSwears: 'js/swearWords.json',
	        replaceWith: ' '
	        });
    	
        getFirstName =  $('.f').text();
        getLastName =  $('.l').text();
        $('.f , .l').remove();
        
        if (!getFirstName.replace(/\s/g, '').length) {
	       getFirstName = '';
 	    }
    	if (!getLastName.replace(/\s/g, '').length) {
	    	getLastName = '';
	    }
        if (isNaN(getTheYear)){
	        getTheYear = "";
	        dispatcher.trigger('theirYear', getTheYear);
        }
        if (getTheYear == '') getTheYear = "";
        dispatcher.trigger('theirYear', getTheYear);
        if (getFirstName == '' || getFirstName == null ) getFirstName = "Fan";
        dispatcher.trigger('usernameConnect', getFirstName);
        if (getLastName == '' || getLastName == null ) getLastName = "";
        dispatcher.trigger('lastnameConnect', getLastName);	
        
        //event.preventDefault();
    }

    function onNoFb(event) {
        if (event) event.preventDefault();
        //$("#connect-fb .connect-box", self.el).stop(true,true).hide();
        $("#connect-fb").hide();
        //$("#connect-fb .connect-copy").hide();
        $("#connect-field", self.el).stop(true,true).fadeIn();
    }

  

    function onFieldFocus() {
        if ($(this).val() == _defaultText) {
            $(this).val("");
        }
    }

    function onFieldBlur() {
        if ($(this).val() == "") {
            $(this).val(_defaultText);
        }
    }

    function onFieldKeyDown(e) {
        // on ENTER
        if (e.keyCode === 13) {
            onFieldBlur.call(this);
            onFieldBtn();
        }

        e.stopPropagation();
        //e.preventDefault();
    }


    return self;

});