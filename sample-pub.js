var connect = require('./connect');

var mqttUrl = "mqtt://commander:commander@m11.cloudmqtt.com:12429";

var client = connect(mqttUrl);

client.on('connect', function() {
    client.subscribe('song');
    client.subscribe('status');

    console.log('connected, going to publish song id', process.argv[2]);

    client.publish('song', process.argv[2]);
    client.end();

    // client.on('message', function(topic, msg) {
    //     console.log(msg.toString());
    // });
});
