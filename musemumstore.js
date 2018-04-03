var Promise = require('bluebird');

module.exports = {
    searchMusem: function (reqtype) {
        return new Promise(function (resolve) {

            // Filling the hotels results manually just for demo purposes
            var museum = [];
          
                museum.push({
                    name: 'Al Eslah School Museum',
                    type: 'islamic',
                    Open: 'April 2003',
                    fees : 'Free',
                    image: 'http://www.sharjahmuseums.ae/SMD2/media/Content_Images/Al-eslah_1.jpg'
                });
                museum.push({
                    name: 'Sharjah Science Museum',
                    type : 'sicence',
                    Open: 'Apr 17 1996',
                    fees: '10 AED',
                    image: 'http://www.sharjahmuseums.ae/SMD2/media/Content_Images/science_3.jpg'
                });
                museum.push({
                    name: 'Sharjah Discovery Centre',
                    type : 'sicence',
                    Open: 'Mar 18 1999',
                    fees: '10 AED',
                    image: 'http://www.sharjahmuseums.ae/SMD2/media/Content_Images/discovery_3.jpg'
                });

                museum.push({
                    name: 'Sharjah Heritage Museum ',
                    type: 'heritage',
                    Open: '2005',
                    fees: '10 AED',
                    image: 'http://www.sharjahmuseums.ae/SMD2/media/Content_Images/Heritage_2.jpg'
                });

           // cards.sort(function (a, b) { return a.fees - b.fees; });

            // complete promise with a timer to simulate async response
            
           // museum = [museum.find(type => museum.type ==='islamic')];
            
            console.log(museum);

            //find( fruit => fruit.name === 'cherries' );

            setTimeout(function () { resolve(museum); }, 1000);
        });
    }
};