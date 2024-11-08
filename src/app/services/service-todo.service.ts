import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itodo } from '../Models/itodo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceTodoService {
  API_URL="http://localhost:3000/todos"
  constructor(private http:HttpClient) { }

  getAllTodos(): Observable<Itodo[]>{
    return this.http.get<Itodo[]>(this.API_URL);
  }
  addTodo(obj:Itodo):Observable<Itodo>{
    return this.http.post<Itodo>(this.API_URL,obj)
  }
  HandleChangeTodo(id:any,data:Itodo):Observable<Itodo>{
    return this.http.put<Itodo>(`${this.API_URL}/${id}`,data)

  }
  deleteTodo(id:number):Observable<Object>{
    return this.http.delete<Object>(`${this.API_URL}/${id}`)

  }
}
