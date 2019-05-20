

import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as path from 'path';
import { eventNames } from "cluster";


export class StreamMusic {

    constructor() {
    }

    // stream the audio
    fileList(req: Request, res: Response) {
        let names = [];
        fs.readdirSync(path.join(__dirname, "../../mp3")).forEach(file => {
            names.push(file);
        });
        res.json(names);
    }

    streamMp3(req: Request, res: Response) {
        const fileName = req.query.fileName;
        if(fileName == undefined || fileName == null || fileName == ""){
            res.send("file name is empty");
        }
        const filePath = `./mp3/${fileName}`;
        if (!fs.existsSync(filePath)) {
            res.send("the file isnot exist on the server");
        }
        const stat = fs.statSync(filePath);
        const total = stat.size;
        if (req.headers.range) {
            let range = req.headers.range;
            const parts = range.replace(/bytes=/, "").split("-");
            const partialstart = parts[0];
            const partialend = parts[1];

            const start = parseInt(partialstart, 10);
            const end = partialend ? parseInt(partialend, 10) : total - 1;
            const chunksize = (end - start) + 1;
            let readStream = fs.createReadStream(filePath, { start: start, end: end });
            res.writeHead(206, {
                'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
                'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
                'Content-Type': 'video/mp4'
            });
            readStream.pipe(res);
        }
        else {
            res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
            fs.createReadStream(filePath).pipe(res);
        }
    }
}