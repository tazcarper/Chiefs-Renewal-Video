// manages facebook connection and updates view state based on facebook and preload status
define(['underscore', 'jv/data/config', 'jv/data/model', 'jv/userVariables', 'jv/media',
    'jv/sceneManager', 'jv/dispatcher', 'jv/mainView', 'jv/scenes/scoreboardProjection'],
    function (_, config, model, facebook, media, sceneManager, dispatcher, mainView, scoreboard) {

        var controller = {

            init:function () {

                mainView.init();


				dispatcher.bind('theirYear', getYear);
				dispatcher.bind('lastnameConnect', onLastnameConnect);

                dispatcher.bind('usernameConnect', onUsernameConnect);
                


                 if (config.skipFacebook ) {
/*
                 console.log('skipping fb');
*/
                    startPreloading();
                } else {
                    // init facebook
/*
                    console.log('dont skip it');
*/
        
                }
            }
        };
        function getYear (event, year) {
	         facebook.set('year', year);
        }
        function onLastnameConnect (event, lname) {
	         facebook.set('lastname', lname);
        }
        function onUsernameConnect(event, username) {
        
            facebook.set('username', username);
           

            //$.cookie('username', username );
            startPreloading();

        }

       

        function startPreloading() {
            model.set('screen', 1);
            dispatcher.trigger('preloadStart');
            dispatcher.bind('mediaLoadComplete', onPreloadComplete);
        }


        function onPreloadComplete() {
            model.set('screen', 2);
        }



        return controller;

    });