var mqtt = require('mqtt');
var url = require('url');

// "mqtt://test1:test1@m11.cloudmqtt.com:12429"
var connect = function(fullUrl)
{
  var client;

  var parsedUrl = url.parse(fullUrl);
  var auth = (parsedUrl.auth || ':').split(':');
  var mqttUrl = "mqtt://" + parsedUrl.host;

  console.log(auth, mqttUrl, parsedUrl.port);

  var options =
  {
    port: parsedUrl.port,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: auth[0],
    password: auth[1],
  };

  // Create a client connection
  client = mqtt.connect(mqttUrl, options);

  return client;
}

module.exports = connect;
