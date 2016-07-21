var client = new Paho.MQTT.Client("m11.cloudmqtt.com", 32429, "web_"+parseInt(Math.random() * 100, 10));

var matchSongId = function()
{
    try {
        var id = document.getElementById('iot-status').innerHTML.match(/\d+/g)[0];
        var url = 'http://music.163.com/api/song/detail/?id=' + id + '&ids=%5B' + id + '%5D';
        var html = '<a href="'+url+'" target="_blank">'+id+'</a>';

        document.getElementById('iot-status').innerHTML = 'Playing '+html;
    } catch(e)
    {
    }
};

var onConnectionLost = function(res)
{
    if (res.errorCode !== 0)
    {
        console.log('onConnectionLost:', res)
    }
};

var onMessageArrived = function(msg)
{
    console.log("onMessageArrived:", msg.payloadString);

    document.getElementById('iot-status').innerHTML = msg.payloadString;
    matchSongId(msg.payloadString);
};

var onConnect = function()
{
    console.log("onConnect");

    client.subscribe("song");
    client.subscribe("status");

    document.getElementById('iot-play').disabled = false;
    document.getElementById('iot-pause').disabled = false;
    document.getElementById('iot-resume').disabled = false;
};

var doFail = function(err)
{
    console.log(err);
};

var playSong = function(songId)
{
    var message = new Paho.MQTT.Message(songId);
    message.destinationName = "song";
    client.send(message);
}


var options = {
    useSSL: true,
    userName: "commander",
    password: "commander",
    onSuccess:onConnect,
    onFailure:doFail
};
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect(options);
