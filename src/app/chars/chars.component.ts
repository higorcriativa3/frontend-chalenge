import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { ResultsModel } from '../services/resultsModel';

@Component({
  selector: 'app-chars',
  templateUrl: './chars.component.html',
  styleUrls: ['./chars.component.css']
})
export class CharsComponent implements OnInit {

  /* variávéis que serão populadas pela resposta da api */
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

  /* Encontra o id na URL */
  idFromUrl(url){
    return url.match(/([0-9])+/g)[0];
  }

  /* Popula o array Chars[] com os personagens */
  getChars(){
    this.page++;
    this.request.doGet(`people/?page=${this.page}`).subscribe(data => {
      this.page === 1 ? this.chars = data : this.chars.results = this.chars.results.concat(data.results);
    });
  }

  /* Recebe a URL do template, encontra o id e busca o planeta no objeto */
  getPlan(urlPlan){
    this.request.doGet(`planets/${this.idFromUrl(urlPlan)}/`).subscribe(data =>{
      this.specs = data;
    });
  }

  /* Recebe a URL do template, encontra o id, busca os planetas no objeto e popula o array plans[] */
  getFilms(films) {
    this.films = [];
    films.forEach(film => {
      this.request.doGet(`films/${this.idFromUrl(film)}/`).subscribe(data =>{
        this.films.push(data);
      });
    })
  }

  /* Recebe a URL do template, encontra o id e busca a espécie no objeto */
  getSpecs(urlSpecie){
    this.request.doGet(`species/${this.idFromUrl(urlSpecie)}/`).subscribe(data =>{
      this.specs = data;
    });
  }

  /* Função que será disparada quando o personagem for clicado */
  sltChar(char){
    this.charSlt = char;
    this.getSpecs(this.charSlt.species[0]);
    this.getFilms(this.charSlt.films);
    this.getPlan(this.charSlt.homeworld);
  }

  /* Recebe a ID do template e busca a imagem na pasta */
  imgUrl(id){
    return `../../assets/images/characters/${id}.jpg`;
  }

  /* Função disparada ao clicar no botão de fechar */
  close(){
    this.charSlt = null;
    this.plans = null;
    this.films = null;
  }

}
