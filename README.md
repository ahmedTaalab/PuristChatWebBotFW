# PuristChat Enterprise Connector for Node.js for Microsoft Bot Builder

[Bot Builder for Node.js](http://docs.botframework.com/builder/node/overview/) is a powerful framework for constructing bots that can handle both freeform interactions and more guided ones where the possibilities are explicitly shown to the user. It is easy to use and models frameworks like Express & Restify to provide developers with a familiar way to write Bots.

High Level Features:

* Powerful dialog system with dialogs that are isolated and composable.
* Built-in prompts for simple things like Yes/No, strings, numbers, enumerations.
* Built-in dialogs that utilize powerful AI frameworks like [LUIS](http://luis.ai).
* Bots are stateless which helps them scale.
* Bots can run on almost any bot platform like the [Microsoft Bot Framework](http://botframework.com), [Skype](http://skype.com), and [Slack](http://slack.com).

## Test your bot
Use the [Bot Framework Emulator](http://docs.botframework.com/connector/tools/bot-framework-emulator/) to test your bot on localhost. 

 
## Build a bot
Create a folder for your bot, cd into it, and run npm init.

    npm init
    
Get the BotBuilder and Restify modules using npm.

    npm install --save botbuilder
    npm install --save restify
    
Create a file named app.js and say hello in a few lines of code.
 
    var restify = require('restify');
    var builder = require('botbuilder');

    // Create bot and add dialogs
    var connector = new builder.ChatConnector({
        appId: "YourAppId",
        appPassword: "YourAppSecret"
    });


    // Setup Restify Server
    var server = restify.createServer();
    server.post('/api/messages', connector.listen());
    server.listen(process.env.port || 3978, function () {
        console.log('%s listening to %s', server.name, server.url); 
    });


## PuristChat Webhook Connector 

We have developed new connector WebhookConnector.js , copy the file to MS Bot SDK 

* $ cp WebhookConnector.js to /node_modules/botbuilder/lib/bots/

* Add line in botbuilder.js of bot SDK. 

// PuristChat Connector adding line to botbuilder.js to export the new connector to outside world

var WebhookConnector_1 = require("./bots/WebhookConnector");
exports.WebhookConnector = WebhookConnector_1.WebhookConnector;


* Modify Channel.js add exports.channels webhook last line bellow:

exports.channels = {
    facebook: 'facebook',
    skype: 'skype',
    msteams: 'msteams',
    telegram: 'telegram',
    kik: 'kik',
    email: 'email',
    slack: 'slack',
    groupme: 'groupme',
    sms: 'sms',
    emulator: 'emulator',
    directline: 'directline',
    webchat: 'webchat',
    console: 'console',
    cortana: 'cortana',
    webhook: 'webhook'
};

Done ! , now new connector is ready to be used from your bot app.

for best experince you should follow Micrsodt instructions in how create and test bot with emulrator 

for example if you are developing  using ChatConnector :

// Always test the logic with localhost & emulator before deploy to server

 var connector = new builder.ChatConnector({
     //appId: process.env.MICROSOFT_APP_ID,
     //appPassword: process.env.MICROSOFT_APP_PASSWORD
 });

When you have done testing your bots using ChatConnector and emlautor , it time to use the PuristChat WebhookConnector :

Copy the the same ChatConnector blok above and comments the line we don't need it unless you want to test again
now we have a reference to Webhook connector insted 

// Create connector and listen for messages

// Create connector and listen for messages
var connector = new builder.WebhookConnector({
    user: 'Server API Key',
    password: 'Admin Password',
    operator: 'operator@yourdomain.com',
    operator_password:"operator password"
});


Your don't need to supply any appID or password this bot will work using Open Source Micrsoft tools in 
any server with nodejs , you will need to supply API key in the user and your admin password , PuristChat Enterprise have two level of security 

1. Admin API Access (user/password)
2. User operator, Websocket/stream access operator/operator_password 


NOTE: Your Can't Test with emulator's at this pont you need to test with PuristChat account only , uncomments
ChatConnector block and comments PuristChat WebhookConnector if you need to test back.

Once you have tested and created your bot with Microsoft Bot SDK , it time to make it works with PuristChat Support Server 

* Deploy to any server with nodejs > 6.x  
* Make sure you have added the webhook end point to point to MS boot you have delpoyed ,/yourserver/mybot in the support catagory setup.
* Using your Admin account , supply user & password , the server API key is your user  and Admin password to access the API of PuristChat server & also supply the operator username/password .



## Test your Automated Support bot

1. Login to native PuristChat client @ http://user.puristchat.com as end customer 
2. Click the room you have setup webhooks to receive POST messages in your support catagroy you like.
3. Type something to wake-up the Microsoft bot you have developed 
4. Go ! and run your bot as you have with Microsoft Bot Framewrok 


## Text only chatting  

PuristChat nattive client dose not support markdown or HTML , other client do , ask your sales
or account manager for rich HTML client support



