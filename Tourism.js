var builder = require('botbuilder');
var Store = require('./musemumstore');

module.exports = [
    // Income
    function (session) {
        builder.Prompts.number(session, 'What is your monthly income?');
    },
    function (session, results, next) {
        session.dialogData.maxloan = results.response * 24;
        next();
    },
      // Self or Emplopyee
      function (session) {
       //session.send('Are you self employeed or company/orgnaizaion employee 1,2?');
        builder.Prompts.choice(session,'Employment type',['Self','Employee']);
    },
    function (session, results, next) {
        session.dialogData.type = results.response;
        next();
    },
    // Card limit
    function (session) {
       // session.send('Welcome to Credit Card helper');
      //  builder.Prompts.text(session, 'Please enter your card limit required?');
        builder.Prompts.choice(session,'Max loan we can give is = ' + session.dialogData.maxloan ,[,'Ok','Cancel']);
    },
    function (session, results, next) {
        if (  session.dialogData.cardlimit  < 1 ||  session.dialogData.cardlimit  > 2) {
            session.dialogData.cardlimit = results.response;
            next();
           //session.endDialogWithResult({ response: number });
        }
        
        session.send('Creating loan application') ;
        next();
    },


    
     // Apply date
     function (session) {
        builder.Prompts.time(session, 'When do you want to apply for loan, date Now or today?');
    },
    function (session, results, next) {
        session.dialogData.applydate = results.response.resolution.start;
        next();
    },

    // Search...
    function (session) {
        var cardlimit = session.dialogData.cardlimit;
        var applydate = new Date(session.dialogData.applydate);

        session.send( 'Ok. thanks ... wait for application reference');
        var tickerNumber = Math.ceil(Math.random() * 20000000);
    session.send('Thanks for contacting sales team. Your loan application number is %s.', tickerNumber);
    // Reply and return to parent dialog
    session.send('Your application \'%s\' was registered. we will get back to you as soon as posible.' , tickerNumber);
         // End
         session.endDialog();
    }
];

// Helpers
function cardsAsAttachment(card) {
    return new builder.HeroCard()
        .title(card.name)
        .subtitle('%s Card .', card.fees)
        .images([new builder.CardImage().url(card.image)])
        .buttons([
            new builder.CardAction()
                .title('More details')
                .type('openUrl')
                .value('https://www.bing.com/search?q=hotels+in+' + encodeURIComponent(card.location))
        ]);
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};