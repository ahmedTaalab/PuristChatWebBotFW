var builder = require('botbuilder');
var Store = require('./musemumstore');

module.exports = [
    // Card limit
    function (session) {

       // session.send('Welcome to Credit Card helper');
       // builder.Prompts.text(session, 'Please enter your card limit required?');
        builder.Prompts.choice(session,'Do you have any personal perference in the place to visit?',['Heritage','Islamic','Science']);
    },
    function (session) {
        //session.send('Are you self employeed or company/orgnaizaion employee 1,2?');
         builder.Prompts.choice(session,'You plan to visits with ',['Family','Alone']);
     },
     function (session, results, next) {
         session.dialogData.type = results.response;
         next();
     },
      // Apply date
      function (session) {
         builder.Prompts.time(session, 'In what date you plan to visit during the week?');
         
     },
     function (session, results, next) {
        session.dialogData.applydate = results.response.resolution.start;
        next();
    },
    function (session, results, next) {
        if (  session.dialogData.cardlimit  < 1 ||  session.dialogData.cardlimit  > 3) {
            session.dialogData.place = results.response;
            next();
           //session.endDialogWithResult({ response: number });
        }
        //  else {
        //     // Repeat the dialog
        //     session.replaceDialog('cards', { reprompt: true });
        // }

        session.send('Looking for places in your preferences..') ;
        next();
    },    
  
   

    // Search...
    function (session,results, next) {
        var musumType = ['heritage','ismalic','science']
        var type = session.dialogData.type;
        var applydate = new Date(session.dialogData.applydate);

       // session.send( 'Ok. getting tickets  %s ...',applydate);
        // Async search
        Store
            .searchMusem(type)
            .then(function (arr) {
                // Results
                session.send('I found in total %d Museums for your request:', arr.length);

                var arrList = arr.map(function (m) { 
                    return '<li> ' + m.name + '</li>' 
                 }).join('\n ');

                var newArr = arr.find(type => arr.type ==='islamic');
                 
                // console.log(cardList);
                // var message = new builder.Message()
               
                 session.send('These are the Museums that we have for you: \n ' + arrList);
                 
                  //  session.send(message);

                  //  var message = new builder.Message()
                  //  .attachmentLayout(builder.AttachmentLayout.carousel)
                  //  .attachments(arr.map(cardsAsAttachment));

 
               // session.send(message);
                
            });
            next();
               
    
    }
    // function (session,results, next) {
    //      builder.Prompts.choice(session,'Happy with my services?' ,[' Happy ',' Okay' ,'No ']);
    //      session.dialogData.service =  session.dialogData.results;
         
    //      session.send('Thanks ... ');
        
    //      session.endDialog();
    //    // next();
    // }
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
                .value('http://www.sharjahmuseums.ae/')
        ]);
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};