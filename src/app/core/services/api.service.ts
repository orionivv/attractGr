import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private dataUrl = environment.apiUrl + 'testData';

  constructor(
    private http: HttpClient
  ) { }

  getCategory = () => this.http.get(`${this.dataUrl}/category`);

  getCity = () => this.http.get(`${this.dataUrl}/city`);

  getData = () => this.http.get(`${this.dataUrl}/data`);

  getAllDataFromApi() {
    return forkJoin([
      this.getCategory(),
      this.getCity(),
      this.getData()
    ]);
  }

}
