<?php

function getWangyiyunMusic($sid){
    $ch = curl_init();
    $srcURL = 'http://music.163.com/api/song/detail/?id=' . $sid . '&ids=%5B' . $sid . '%5D';
    curl_setopt($ch, CURLOPT_URL, $srcURL);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:38.0) Gecko/20100101 Firefox/38.0'

));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $re = curl_exec($ch);
    curl_close($ch);
    $de = json_decode($re,true);
    return $de["songs"]["0"]["mp3Url"];

}

echo getWangyiyunMusic(30053956);
