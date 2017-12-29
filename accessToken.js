exports.handler = function(context, event, callback) {
   	// Documentation: https://www.twilio.com/docs/api/rest/access-tokens
   	//
  	// The Client using tokens from this Function, receive calls made to this client ID.
    let clientid = event.clientid || null;
  	if (clientid === null) {
		clientid = context.CLIENT_ID || null;
  		if (clientid === null) {
  			console.log("-- In Functions Configure, add: CLIENT_ID.");
    	    return;
	    }
    }
	// Client ID must be handled in the Twilio Function: Make a call.
  	console.log("+ Client ID: " + clientid);
 	//
   	// Authorization parameters
   	const twilioAccountSid = context.ACCOUNT_SID;
   	const twilioApiKey = context.VOICE_API_KEY;
   	const twilioApiSecret = context.VOICE_API_SECRET;
   	// Outgoing application parameters
   	const outgoingApplicationSid = context.VOICE_TWIML_APP_SID_CALL;
  	//
   	// Generate the access token with voice grants.
   	const AccessToken = require('twilio').jwt.AccessToken;
   	const VoiceGrant = AccessToken.VoiceGrant;
   	const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: outgoingApplicationSid
   	});
   	const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret);
   	token.addGrant(voiceGrant);
   	token.identity = clientid;
  	token.ttl = 10800;	// 3600/hour
   	// Output the token.
   	console.log(token.toJwt());
   	let response = token.toJwt();
   	callback(null, response);
};
