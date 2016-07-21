document.getElementById('iot-play').addEventListener('click', function(){
    var songId = document.querySelector('form').songId.value;

    playSong(songId);
    document.querySelector('form').songId.value = '';
});

document.getElementById('iot-pause').addEventListener('click', function(){
    var message = new Paho.MQTT.Message('pause');
    message.destinationName = "song";
    client.send(message);
});

document.getElementById('iot-resume').addEventListener('click', function(){
    var message = new Paho.MQTT.Message('resume');
    message.destinationName = "song";
    client.send(message);
});
