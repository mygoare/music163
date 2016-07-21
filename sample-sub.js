var mp3Player = require('./mp3Player');
var connect = require('./connect');

// Create a client connection
var client = connect("mqtt://test1:test1@m11.cloudmqtt.com:12429");

var playSong = function(songId)
{
    if (mp3Player.player)
    {
        mp3Player.pauseMusic();
        mp3Player.player = null;
    }
    console.log('mp3Player.player: ', mp3Player.player);
    mp3Player.getMusicUrl(songId, 0);
};

client.on('connect', function() {
    console.log('sub connected...');

    client.subscribe('song');
    client.subscribe('status');

    // update status after connected
    client.publish('status', 'I am ready...Waiting...');

    client.on('message', function(topic, msg) {
        if (topic == 'song')
        {
            console.log('song topic content: ', msg.toString());

            switch (msg.toString())
            {
                case 'pause':
                    console.log('pause the music');
                    mp3Player.pauseMusic();
                    break;
                case 'resume':
                    console.log('resume the music');
                    mp3Player.resumeMusic();
                    break;
                default:
                    playSong(msg.toString());
                    client.publish('status', 'Playing '+msg.toString());
                    break;
            }
        }

        if (topic == 'status')
        {
          console.log('status topic content: ', msg.toString());
        }
    });

});
