import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as request from "request";
import * as moment from "moment";

//controllers
import {StreamMusic} from "./conrollers/StreamMusic";
import {Record} from "./conrollers/Record";

const streamMusic = new StreamMusic();
const record = new Record();

const CronJob = require('cron').CronJob;
const port = 3000;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Point static path to dist
app.use(express.static(path.join(__dirname, "./mp3")));
//allow cors
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

//routes

// stream the audio
app.get('/test', (req,res) => res.send("hi hi hi "));
app.get('/mp3', (req,res) => streamMusic.streamMp3(req,res));
app.get('/getfileList', (req,res) => streamMusic.fileList(req,res));

//cron job kike samuel 100 fm
new CronJob('0 12 * * 5', function() {
    const options = {
        stream: request('http://100fm.streamgates.net/Radios100Fm'),
        mp3Path: path.join(__dirname, "../mp3"),
        fileName: `kike_samuel_${moment().format("MM-DD-YYYY")}.mp3`,
        endTime:'14:00:00'
    };
    record.writeToFile(options);
}, null, true, 'Asia/Jerusalem');

//cron smash 100 fm

new CronJob('0 22 * * 0', function() {
    console.log("smash");
    const options = {
        stream: request('http://100fm.streamgates.net/Radios100Fm'),
        mp3Path: path.join(__dirname, "../mp3"),
        fileName: `smash_shlomi_kaufman_${moment().format("MM-DD-YYYY")}.mp3`,
        endTime:'23:59:00'
    };
    record.writeToFile(options);
}, null, true, 'Asia/Jerusalem');

new CronJob('0 22 * * 1', function() {
    console.log("smash");
    const options = {
        stream: request('http://100fm.streamgates.net/Radios100Fm'),
        mp3Path: path.join(__dirname, "../mp3"),
        fileName: `smash_shlomi_kaufman_${moment().format("MM-DD-YYYY")}.mp3`,
        endTime:'23:59:00'
    };
    record.writeToFile(options);
}, null, true, 'Asia/Jerusalem');

new CronJob('0 22 * * 2', function() {
    console.log("smash");
    const options = {
        stream: request('http://100fm.streamgates.net/Radios100Fm'),
        mp3Path: path.join(__dirname, "../mp3"),
        fileName: `smash_shlomi_kaufman_${moment().format("MM-DD-YYYY")}.mp3`,
        endTime:'23:59:00'
    };
    record.writeToFile(options);
}, null, true, 'Asia/Jerusalem');

new CronJob('0 22 * * 3', function() {
    console.log("smash");
    const options = {
        stream: request('http://100fm.streamgates.net/Radios100Fm'),
        mp3Path: path.join(__dirname, "../mp3"),
        fileName: `smash_shlomi_kaufman_${moment().format("MM-DD-YYYY")}.mp3`,
        endTime:'24:00:00'
    };
    record.writeToFile(options);
}, null, true, 'Asia/Jerusalem');

app.listen(port, function () { return console.log("client server listening on port " + port + "!"); });


// function record(){
//     console.log("recording kika Samuel");
//     //eco 99 fm
//     //request('http://eco01.mediacast.co.il/ecolive/99fm_aac/icecast.audio?hash=1557812363510.m4a').pipe(fs.createWriteStream('song.mp3'))

//     //100fm
//     // request('http://100fm.streamgates.net/Radios100Fm').pipe(fs.createWriteStream('./mp3/song.mp3'));

//     console.log("recording ...");
// }


// stream the audio
// app.get('/stream', function (req, res) {
//     const filePath = path.join(__dirname, "/mp3/song.mp3");
//     res.setHeader("content-type", "audio/mpeg");
//     fs.createReadStream(filePath).pipe(res);
// });

