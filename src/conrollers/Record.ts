

import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as bot from "../modules/telegramSendMessage";
import * as moment from "moment";

interface writeToFileOptions{
    stream: any;
    mp3Path: string
    fileName: string;
    endTime:string;
};

export class Record {

    constructor() {
    }

    writeToFile(options:writeToFileOptions){
        console.log("start recording");
        //send telegram message
        bot.telegram("start recording");
    
        options.stream.on('data',(chunk)=>{
            fs.appendFileSync(`${options.mp3Path}/${options.fileName}`, chunk);
            if(moment().isAfter(moment(options.endTime, 'hh:mm:ss'))){
                options.stream.abort();
                console.log("finish recording.")
                //send telegram message
                bot.telegram("finish recording.");
            }
        });
    }
}