import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResultsModel } from './resultsModel';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  API = environment.api;
  constructor(private http: HttpClient) { }

  doGet(route) {
    return this.http.get<ResultsModel>(this.API + route);
  }
}
