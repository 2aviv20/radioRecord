const express = require("express");
const moment = require("moment");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require('fs');
const request = require('request');
const CronJob = require('cron').CronJob;
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


// Point static path to dist
app.use(express.static(path.join(__dirname, "./mp3")));
const port = 3000;
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// stream the audio
app.get('/stream', function (req, res) {
    const filePath = path.join(__dirname, "/mp3/song.mp3");
    res.setHeader("content-type", "audio/mpeg");
    fs.createReadStream(filePath).pipe(res);
});

app.listen(port, function () { return console.log("client server listening on port " + port + "!"); });

new CronJob('0 12 * * *', function() {
    writeToFile(request('http://100fm.streamgates.net/Radios100Fm') ,"./mp3/", "kike_samuel.mp3");
}, null, true, 'Asia/Jerusalem');

function record(){
    console.log("recording kika Samuel");
    //eco 99 fm
    //request('http://eco01.mediacast.co.il/ecolive/99fm_aac/icecast.audio?hash=1557812363510.m4a').pipe(fs.createWriteStream('song.mp3'))
    
    //100fm
    // request('http://100fm.streamgates.net/Radios100Fm').pipe(fs.createWriteStream('./mp3/song.mp3'));

    console.log("recording ...");
}

function writeToFile(stream ,filePath, fileName){
    console.log("start recording");
    stream.on('data',(chunk)=>{
        fs.appendFileSync(`${filePath}/${fileName}`, chunk);
        if(moment().isAfter(moment('14:00:00', 'hh:mm:ss'))){
            stream.abort();
            console.log("finish recording.")
        }
    });
}