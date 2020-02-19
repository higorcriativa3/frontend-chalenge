import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { ResultsModel } from '../services/resultsModel';

@Component({
  selector: 'app-chars',
  templateUrl: './chars.component.html',
  styleUrls: ['./chars.component.css']
})
export class CharsComponent implements OnInit {

  chars: ResultsModel;
  specs: any;
  plans: any;
  films: any[];
  page = 0;
  charSlt = null;

  constructor(private request: RequestsService) { }

  ngOnInit(): void {
    this.getChars();
  }

  idFromUrl(url){
    return url.match(/([0-9])+/g)[0];
  }

  getChars(){
    this.page++;
    this.request.doGet(`people/?page=${this.page}`).subscribe(data => {
      this.page === 1 ? this.chars = data : this.chars.results = this.chars.results.concat(data.results);
    });
  }

  getPlan(urlPlan){
    this.request.doGet(`planets/${this.idFromUrl(urlPlan)}/`).subscribe(data =>{
      this.specs = data;
    });
  }

  getFilms(films) {
    this.films = [];
    films.forEach(film => {
      this.request.doGet(`films/${this.idFromUrl(film)}/`).subscribe(data =>{
        this.films.push(data);
      });
    })
  }

  getSpecs(urlSpecie){
    this.request.doGet(`species/${this.idFromUrl(urlSpecie)}/`).subscribe(data =>{
      this.specs = data;
    });
  }

  sltChar(char){
    this.charSlt = char;
    this.getSpecs(this.charSlt.species[0]);
    this.getFilms(this.charSlt.films);
    this.getPlan(this.charSlt.homeworld);
  }

  imgUrl(id){
    return `../../assets/images/characters/${id}.jpg`;
  }

  close(){
    this.charSlt = null;
    this.plans = null;
    this.films = null;
  }

}
