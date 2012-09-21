forge.logging.info("Loaded!");

Pusher.log = forge.logging.info;

( function( $ ) {
	
  var CONFIG = {
			PUSHER: {
		    APP_KEY: '49e26cb8e9dde3dfc009'
			}
	};
	
  // Connect
	var pusher = new Pusher(CONFIG.PUSHER.APP_KEY);
	pusher.connection.bind('state_change', connectionStateChange);
	
	function connectionStateChange(state) {
		$('#connectionStatus').html(state.current);
	}
	
	// Subscribe
	var channel = pusher.subscribe('my-channel');
	channel.bind('pusher:subscription_succeeded', subscriptionSucceeded);
	
	function subscriptionSucceeded() {
		$('#subscriptionStatus').html('succeeded');
	}
	
	channel.bind('my-event', handleMyEvent);
	
	function handleMyEvent( data ) {
		$('#myEventData').append('<pre>' + JSON.stringify(data, null, 2) + '</pre>');
	}
  
} )( jQuery );