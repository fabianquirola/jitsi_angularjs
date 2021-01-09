'use strict';

var express = require('express');
var http = require('http');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var faker = require('faker');

var fs = require('fs');
const { image } = require('faker');
// sign with RSA SHA256
var privateKey = fs.readFileSync('jaasauth.key');


var app = express();

try {

  app.use('/jwt', function(req, res) {
    console.log(req.query);

    var is_moderator = req.query.is_moderator
    var room_name = req.query.room_name
    var vpaas = 'vpaas-magic-cookie-1a656b2d05664edbbdad560acaee1fd7';
    var kid = vpaas+'/f8e36c';
    var payload = {
      "aud": "jitsi",
      "exp": moment().add(1,'days').unix(),
      "nbf": moment().unix(),
      "iss": "chat",
      "room": `${room_name}`,
      "sub": vpaas,
      "context": {
        "features": {
          "livestreaming": "false",
          "outbound-call": "false",
          "transcription": "false",
          "recording": "false"
        },
        "user": {
          "moderator": is_moderator,
          "name": faker.name.findName(),
          "id": faker.random.uuid(),
          "avatar": faker.image.avatar(),
          "email": faker.internet.email()
        }
      }
    };
    var token = jwt.sign(payload, privateKey, { algorithm: 'RS256', keyid: kid});
    res.status(200).json({"token":token});
  });

  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser({ uploadDir: '/tmp' }));
  app.use(express.methodOverride());

  app.use(require('less-middleware')(__dirname + '/../client/app'));
  app.use('/', express['static'](__dirname + '/../client/app'));
  app.use(express.errorHandler());

  app.use(app.router);
}
catch(error){
  console.error(error);
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
