require(['jv/controller', 'bumpslide/stats', 'jv/data/model', 'BrowserDetect', 'jv/dispatcher', 'jv/tracker'], function (controller, stats, model, _BrowserDetect, dispatcher, tracker) {

function change_the_email_url() {
			share_url = location.href + '?fname='+encodeURIComponent(jQuery('#fname').val());
			console.log(share_url);
			jQuery('#st_email_large').attr('st_url',share_url);
		}
		jQuery(document).ready(function(){
			jQuery('#show_email_form').on('click',function(){ 
				jQuery('#st_email_large .stLarge').css({
					backgroundImage: 'url(https://cdn1.iconfinder.com/data/icons/musthave/48/Forward.png)',
					height: '48px',
					width: '48px'
				});
				jQuery('#email_form').css({display: 'block'}); 
			});
			jQuery('.change_the_email_url').on('change',function(){
				change_the_email_url();
			});
			change_the_email_url();
			jQuery('#st_email_large').attr('st_url',share_url);
		});
		
		});