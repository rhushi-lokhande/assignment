import { Observable } from 'rxjs/Rx';
import { observable } from 'rxjs/symbol/observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }
    getData(startDate, endDate): Observable<any> {
        const url = `/api/data?startdate=${startDate}&&enddate=${endDate}`;
        return this.http.get(url);
    }
}
