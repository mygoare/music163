var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');
var request = require('request');


var player;  // node stream object
var mp3Player = {
    player: player
};
var playList = [];
var getMusicUrl = function(id, flag)
{
    var fetchUrl = 'http://music.163.com/api/song/detail/?id=' + id + '&ids=%5B' + id + '%5D';
    console.log('music 163 fetchUrl: ', fetchUrl);

    var musicUrl;
    request(fetchUrl, function(err, res, body) {
        if (err)
        {
            console.log('error: ', err);
            return;
        }

        musicUrl = JSON.parse(body).songs[0].mp3Url;
        console.log('mp3 source path: ', musicUrl);

        switch (flag)
        {
            case 0:
                playMusic(musicUrl)
        }
    });
};

var speaker;
var decoder;

var playMusic = function(url)
{

    speaker = new Speaker();
    decoder = new lame.Decoder();

    var stream = mp3Player.player = request(url).pipe(decoder);


    mp3Player.player
        .pipe(speaker)
        .on('end', function(){
            console.log('the song is end');
        })
        .on('error', function(err)
        {
            console.log(err);
        });
};

// pause and resume reference here: https://github.com/TooTallNate/node-speaker/issues/52
var pauseMusic = function()
{
    // mp3Player.player
    //     .unpipe(speaker);
    speaker.end();
};

var resumeMusic = function()
{
    speaker = new Speaker();
    decoder.pipe(speaker);
};

mp3Player.getMusicUrl = getMusicUrl;
mp3Player.playMusic   = playMusic;
mp3Player.pauseMusic  = pauseMusic;
mp3Player.resumeMusic = resumeMusic;


module.exports = mp3Player;
