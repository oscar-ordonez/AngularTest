import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../interfaces/ApiResponse';
import { ToDo } from '../interfaces/ToDo';
import { ToDoService } from '../services/ToDo.service';

@Component({
  selector: 'app-spa',
  templateUrl: './spa.component.html',
  styleUrls: ['./spa.component.css']
})
export class SPAComponent implements OnInit {

  constructor(private _todoService:ToDoService) { }

  ngOnInit(): void {
    this.loadAllToDo();
  }

  allTodo:ToDo[] =[];
  

  loadAllToDo(){
    this._todoService.getAllToDo().subscribe(
      (resp : ApiResponse) => { //Next callback
        this.allTodo = resp.data;
        console.log(this.allTodo);
        let today = new Date();
        let taskDate;
        let difference;
        let hourDifference;
        for(let i=0; i< this.allTodo.length; i++){
          taskDate = new Date(this.allTodo[i].dueDate);
          difference = Math.abs(taskDate.getTime() - today.getTime());
          hourDifference = difference  / 1000 / 3600;
          console.log(hourDifference);
          if(taskDate > today){
            if(hourDifference >= 12 && !this.allTodo[i].isDone){
              this.allTodo[i].status = "12+ hours";
            }else if(hourDifference < 12 && !this.allTodo[i].isDone){
              this.allTodo[i].status = "<12 hours";
            }
          }else if(taskDate < today){
            this.allTodo[i].status = "Overdue";
          }else if(this.allTodo[i].isDone){
            this.allTodo[i].status = "Completed";
          }
        }
      },
      (error) => {   //Error callback
        console.log("Error(SPA/loadAllToDo): " + error.message);
      }
    )
  }

  viewCreate(){
    (document.getElementById("create") as HTMLDivElement).hidden = false;
    (document.getElementById("table") as HTMLDivElement).hidden = true;
  }

  completeTask(index:number){
    // not really sure if I only have to do a Update but thats what I'm doing
    this._todoService.complete(this.allTodo[index]).then(() => {
      this.loadAllToDo();
    }).catch(error => {
      console.log("Error(SPA/CompleteTask): " + error.message);
    });
  }

  createTodo(){
    let name = (document.getElementById("inputName") as HTMLInputElement).value;
    let description = (document.getElementById("inputDescription") as HTMLInputElement).value;
    let hours = (document.getElementById("inputHours") as HTMLInputElement).value;
    this._todoService.addTodo(name, description, parseInt(hours)).then(() => {
      this.loadAllToDo();
      (document.getElementById("create") as HTMLDivElement).hidden = true;
      (document.getElementById("table") as HTMLDivElement).hidden = false;
    }).catch(error => {
      console.log("Error(SPA/CreateToDo): " + error.message);
    });
  }

  deleteTask(index:number){
    this._todoService.deleteTodo(this.allTodo[index].id).subscribe(() => {
      this.loadAllToDo();
    },
    (error) => {   //Error callback
      console.log("Error(SPA/DeleteTask): " + error.message);
    });
  }
}
