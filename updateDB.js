var mongoClient = require('mongodb').MongoClient;

// MongoDB url stored in credentials.js
var url = require('./credentials.js');

mongoClient.connect(url, function(err, db) {
    if (err) {
        console.log('Sorry unable to connect to MongoDB Error:', err);
    } else {
        var mins = 0;
        var secs = 0;
        var newValue = 50;
        var collection = db.collection('timeseriesdata');
        var selector = {"timestamp_hour": "2017-10-10T10:00:00:000Z"};
        //var updater = setInterval(updateTimeSeries, 1000);
        updateTimeSeries();

        db.close();

        function updateTimeSeries() {
            var valuesToSet = "{\"values." + mins + "." + secs + "\":" + newValue + "}";
            //var valuesToSet = {"values.0.0": 46};
            console.log(valuesToSet);
            valuesToSet = JSON.parse(valuesToSet);

        collection.updateOne(selector, {
            $set: valuesToSet
        }, function(err, results) {
            console.log(results.result);
        });
            secs++;
            if(secs > 59){
                clearInterval(updater);
                console.log("End of Sequence!!!")
            }
        };
    }
    });