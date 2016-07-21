var fs = require('fs');
var request = require('request');

var url = 'http://m2.music.126.net/8feyAu15mRXPKUF_Ank7ug==/2093470139301233.mp3';
// var url = 'http://m2.music.126.net/jt_bjt-DDWhFI9btE2b8tw==/7901090557280522.mp3';

var musicFile = fs.createWriteStream('music163.mp3');
// request(options, function(err, res) {
//     if (err)
//         console.log(err);
//
//     res
//     .on('data', function(data){
//         musicFile.write(data);
//         console.log(data.toString());
//     })
//     .on('end', function() {
//         musicFile.end();
//         console.log('download completed');
//     });
// });

request(url).pipe(musicFile);
