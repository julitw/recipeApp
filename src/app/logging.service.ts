import { Injectable } from "@angular/core";

// @Injectable({providedIn : 'root'})
export class LoggingService{
    lastLog: string;

    printingLog(message: string){
        console.log("1 ", message)
        console.log("2 ", this.lastLog);
        this.lastLog = message
    }
}