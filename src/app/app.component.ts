import { Component, ViewChild, ElementRef } from '@angular/core';

import { Canvas_Graph } from './graph';
import * as moment from 'moment';
import * as io from 'socket.io-client';
import { DataService } from './service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('myCanvas') el: ElementRef;
    _g;
    startDate: string;
    endDate: string;
    invalidDate = false;
    startStreaming = false;
    private url = 'http://localhost:3000';
    socket;
    constructor(private dataService: DataService) {
    }
    isValidDate(str) {
        if (!str) {
            return false;
        }
        const d = moment(str, 'yyyy-mm-dd');
        if (d == null || !d.isValid()) {
            return false;
        }
        return true;
    }
    GetInitialData() {
        this.invalidDate = false;
        if (!this.isValidDate(this.startDate) || !this.isValidDate(this.endDate)) {
            this.invalidDate = true;
            return;
        }
        this.dataService.getData(this.startDate, this.endDate).subscribe(res => {
            this._g = Canvas_Graph(this.el.nativeElement, res);
        });
    }
    startStream() {
        this.startStreaming = true;
        this.socket = io.connect(this.url);
        this.socket.emit('getData', {
            startDate: this.startDate,
            endDate: this.endDate,
            frequency: 1 // in seconds
        });
        this.socket.on('updateGraph', (data) => {
            if (!this._g) {
                this._g = Canvas_Graph(this.el.nativeElement, []);
            }
            console.log(data);
            this._g.update(data);
        });
    }
    endStream() {
        this.startStreaming = false;
        this.socket.emit('disconnect');
        this.socket.disconnect();
    }
}
