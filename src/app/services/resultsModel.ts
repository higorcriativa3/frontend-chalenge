/* Modelo de resposta da API */
export class ResultsModel {
  count: number;
  next: string;
  previous: string;
  results: string[] = [];
}