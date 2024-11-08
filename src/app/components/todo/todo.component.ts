import { FormsModule } from '@angular/forms';
import { Itodo } from './../../Models/itodo';
import { Component, inject, OnInit } from '@angular/core';
import { ServiceTodoService } from '../../services/service-todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit{

  ngOnInit(): void {
     this.getAlltodos();
  }
  constructor(){}



  todo_service=inject(ServiceTodoService);
  editable=false;
  allTodos:Itodo[]=[];

  WaitingCount:number=10;
  InProgressCount=0;
  CompletedCount=0;

  todoObj:Itodo={
    title:'',
    description:'',
    status:'Waiting'
  }

  handleAddTodo(){
    this.todo_service.addTodo(this.todoObj).subscribe({
      next:(res)=>{
        this.getAlltodos();
      },
      error:(error)=>{console.error(error)},
      complete:()=>{}
    })
  }
  getAlltodos(){
    this.todo_service.getAllTodos().subscribe({
      next:(res)=>{
        this.allTodos=res
         this.WaitingCount=this.allTodos.filter(todo=>todo.status==="Waiting").length;
        this.InProgressCount=this.allTodos.filter(todo=>todo.status==="In_Progress").length;
        this.CompletedCount=this.allTodos.filter(todo=>todo.status==="Completed").length;

      },
      error:()=>{},
      complete:()=>{},
    })
  }

  handleChange(item:Itodo,status:string){
    const newitem:Itodo={
      id:item.id,
      title:item.title,
      description:item.description,
      status:status
    }
    this.todo_service.HandleChangeTodo(item.id,newitem).subscribe({
      next:(res)=>{

         this.getAlltodos();
        },
      error : (error)=>{console.log(error)}
    });
  }
  handleEdit(item:Itodo){
    this.todoObj=item;
    this.editable=true
  }
  handleUpdate(){
    this.todo_service.HandleChangeTodo(this.todoObj.id,this.todoObj).subscribe({
      next:(res)=>{
        this.getAlltodos();
      }
    })
  }
}
