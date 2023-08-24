import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/Funcionarios';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private apiUrl = `${environment.ApiUrl}/Funcionario`;

  constructor(private http: HttpClient) {}

  GetFuncionarios(): Observable<Response<Funcionario[]>> {
    return this.http.get<Response<Funcionario[]>>(this.apiUrl);
  }

  CreateFuncionario(
    funcionario: Funcionario
  ): Observable<Response<Funcionario[]>> {
    return this.http.post<Response<Funcionario[]>>(
      `${this.apiUrl}`,
      funcionario
    );
  }

  GetFuncionario(id: number): Observable<Response<Funcionario>> {
    return this.http.get<Response<Funcionario>>(`${this.apiUrl}/${id}`);
  }

  EditarFuncionario(
    funcionario: Funcionario
  ): Observable<Response<Funcionario[]>> {
    return this.http.put<Response<Funcionario[]>>(
      `${this.apiUrl}`,
      funcionario
    );
  }

  InativaFuncionario(id: number): Observable<Response<Funcionario[]>> {
    return this.http.put<Response<Funcionario[]>>(
      `${this.apiUrl}/InativaFuncionario/${id}`,
      id
    );
  }
  ExcluirFuncionario(id: number): Observable<Response<Funcionario[]>> {
    return this.http.delete<Response<Funcionario[]>>(`${this.apiUrl}?id=${id}`);
  }
}
