const express = require('express')
const app = express()
const port = 3000
var path = require('path');


let cls = require('continuation-local-storage');
let namespace = cls.createNamespace('com.chrometest');

var testmessage = "";

app.use((req, res, next) => {
    var namespace = cls.getNamespace('com.chrometest');
    // wrap the events from request and response
    namespace.bindEmitter(req);
    namespace.bindEmitter(res);
 
    // run following middleware in the scope of the namespace we created
    namespace.run(function () {
       // set data on the namespace, makes it available for all continuations
       namespace.set('message', testmessage);
       next();
    });
 })


app.get('/api/sendresponse', (req, res) => { testmessage = req["query"]; res.send('ok') } ); 
app.get('/api/getresponse', (req, res) => { res.send(namespace.get('message')) } );

/*app.get('/index.html', function(req, res) {
    res.sendFile(path.join(__dirname +'/html/example/' ));
});*/

app.use(express.static(__dirname));

/*app.get('/ie', function(req, res) {
    res.sendFile(path.join(__dirname + '/ie.html'));
});*/

app.listen(port, () => console.log(`Example app listening on port ${port}!`))