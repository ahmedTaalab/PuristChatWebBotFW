// This loads the environment variables from the .env file
//require('dotenv-extended').load();

var builder = require('botbuilder');
var restify = require('restify');

// Setup Restify Server

var server = restify.createServer();

// PORT ! important to refrence your port where webhook will POST can reach 

 server.listen(process.env.port || process.env.PORT || 3978, function () {
     console.log('%s listening to %s', server.name, server.url);
 });


// Always test the logic with emulator , keep this AS IS , in case you want to test with Emulator 

//var connector = new builder.ChatConnector({
    //appId: process.env.MICROSOFT_APP_ID,
    //appPassword: process.env.MICROSOFT_APP_PASSWORD
//});

// PuristChat Automated agent need two level of access , Admin API access & Operator User Stream access 
// therfore the connection setting need to supply these info to WebhookConnector of Microsoft Bot SDK.

// Create connector and listen for messages

var connector = new builder.WebhookConnector({
    user: 'liev5eZvK9gXYk4n9PDu1I0JYZcJLrv',
    password: '12341234',
    operator: 'admin@sharjah.ae',
    operator_password:"12341234"
});

// Defulat MS Bot / change to your webhook URL or point to the same , don't forget to map proxy to access the end point 

server.post('/api/messages', connector.listen());


var DialogLabels = {
    Museum: 'Museum'
};

var bot = new builder.UniversalBot(connector, [

    function (session) {
        var username = session.message.address.user.name;
        var welcomemsg = 'Wecleome Mr. ' + username + ' this is a Museum Info Chatbot agent will guide through dialogs?';

        builder.Prompts.choice(
            session,
            welcomemsg,
            [DialogLabels.Museum],
            {
                maxRetries: 3,
                retryPrompt: 'Not a valid option'
            });
    },
    function (session, result) {
        if (!result.response) {
            // exhausted attemps and no selection, start over
            session.send('Ooops! Too many attemps :( But don\'t worry, I\'m handling that exception and you can try again!');
            return session.endDialog();
        }

        // on error, start over
        session.on('error', function (err) {
            session.send('Failed with message: %s', err.message);
            session.endDialog();
        });

        // continue on proper dialog

        var selection = result.response.entity;
        switch (selection) {
            case DialogLabels.Museum:
                return session.beginDialog('Museum');
            
        }
    }
]);

// when we can't help 
bot.dialog('help', function(activity) {
htmltext = "</b> Type anyting or Musesum to start <b> "
    session.send( htmtex);

});

bot.dialog('Museum', require('./Museum'))
.triggerAction({
    matches: [/Musem/i,/Museums/i]
});


bot.dialog('human', require('./human'))
    .triggerAction({
        matches: [/human/i, /man/i, /person/i,/problem/i,/support/i]

});

// log any bot errors into the console
bot.on('error', function (e) {
    console.log('And error ocurred', e);
});

bot.on('conversationUpdate', function (activity) {
    var mybot = 'Sharjah Musemum Agent Bot using Microsoft Bot Framework PuristChat Support Engine , type Help to know more';
      // when user joins conversation, send instructions
      if (activity.membersAdded) {
          activity.membersAdded.forEach(function (identity) {
              if (identity.id === activity.address.bot.id) {
            
                  var reply = new builder.Message()
                      .address(activity.address)
                      .text(mybot);
                  bot.send(reply);
              }
          });
      }
  
  });