import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ToDo } from '../interfaces/ToDo';
import { ApiResponse } from '../interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  baseUrl = 'https://auto.loanvantage360.com/fps/api/';
  headers = new HttpHeaders().set("Authorization", "Basic YzQ2ZWVhM2QtY2MxNi00MGMwLTkwOTYtNjJiMGE3YjFlM2MzOmUxNTQ4M2FmLTk4OGQtNDc1My1iYjU5LTkyNmU4ZDAwZjQzMw==");
  
  constructor(private http: HttpClient) { }

  getAllToDo(): Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.baseUrl + "todo", {headers: this.headers});
  }

  getToDo(id:string): Observable<ToDo>{
    return this.http.get<ToDo>(this.baseUrl + "todo /" + id, {headers: this.headers});
  }
  
  addTodo(name:string, description:string, hours:number) {
    const promise = new Promise((resolve, reject) => {
      let body = new HttpParams()
        .set("Name", name)
        .set("Description", description)
        .set("DueIn", hours);
      const httpResult = this.http.post(this.baseUrl + "todo", body.toString(), {headers: this.headers}).toPromise();
      httpResult.then(function (data) {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
    return promise;
  }

  complete(todo: ToDo){
    const promise = new Promise((resolve, reject) => {
      let body = new HttpParams()
        .set("id", todo.id)
        .set("name", todo.name)
        .set("description", todo.description)
        .set("dueDate", todo.dueDate)
        .set("isDone", true);
      const httpResult = this.http.put(this.baseUrl + "todo", body.toString(), {headers: this.headers}).toPromise();
      httpResult.then(function (data) {
        resolve(data);
      }).catch((error) => {
        reject(error);
      });
    });
    return promise;
  }
  
  deleteTodo(id:number): Observable<any> {
    return this.http.delete(this.baseUrl + "todo/" + id, {headers: this.headers});
  }
}
