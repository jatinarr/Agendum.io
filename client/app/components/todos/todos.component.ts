import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../services/todo.service';


@Component({
  moduleId:module.id,
  selector: 'todos',
  templateUrl: 'todos.component.html',
  providers: [TodoService]
})
export class TodosComponent implements OnInit{ 

  todosArr:any[];
  temp:any[];
  newCount=0;
  myArr=["e.g. Get the car serviced"];
  currString: String;
  pendingCount=0;
  completedCount=0;
  // idcount:number;
  // idstring:string;
  
  

  constructor(private _todoService: TodoService){
    // this.idcount=1;
  

  }

  // generateId(){
  //   this.idstring='test'+ this.idcount;

  // }

  // increment(){
  //   this.idcount=this.idcount+1;
  //   this.generateId();
  //   console.log(this.idcount);
  // }

  ngOnInit(){
    this._todoService.getTodos()
    .subscribe( results => {
      // console.log(results);
      this.todosArr=results
      ,this.checkPendingCount(this.todosArr),
      this.checkCompletedCount(this.todosArr);
    });
    // this.checkPendingCount(this.todosArr);
    this.createPlaceholderArr();
  
   
  };


  addNewTodo(event, newtodotext){

    var newTodo={
      text: newtodotext.value,
      isCompleted:false
    };

    var savedTodo=this._todoService.saveTodo(newTodo);
    savedTodo.subscribe(res => {
      // console.log("after saving, res: " + res);
      this.todosArr.push(newTodo);
      // console.log("after pushing, newtodo: " + res._id);
      newtodotext.value='';

    })

    if(newTodo){
      this.pendingCount+=1;
    }

    console.log("new todo added");
  };

  alterEditState(todo, state){

    if(state){

      todo.isEditMode=state;
    }

  else{
    delete todo.isEditMode;
  }
};

  changeCheckedStatus(todo){
    if(todo._id){
    var _todo={
      _id:todo._id,
      text: todo.text,
      isCompleted:!todo.isCompleted
    };

    this._todoService.updateTodo(_todo)
    .subscribe( result => {
      todo.isCompleted=!todo.isCompleted;

    })

    if(_todo.isCompleted){
      this.completedCount+=1;
      this.pendingCount-=1; 
    }

    if(!_todo.isCompleted){
      this.completedCount-=1;
      this.pendingCount+=1;
    }
  }
  
  else{
    console.log("refresh the page after adding a new task");
  }

  };

  updateTodoText(event, todo){

    if(event.which === 13){
      todo.text= event.target.value;
      var _todo={
        _id: todo._id,
      text: todo.text,
      isCompleted:todo.isCompleted
    };
    
    this._todoService.updateTodo(_todo)
    .subscribe(result => {

      this.alterEditState(todo,false);
    })
  };


};


 deleteTodo(todo){

   if(todo._id){
        
   this._todoService.deleteTodo(todo._id)
   .subscribe(result=> {
     if(result.n==1){
        for(var i=0;i<this.todosArr.length;i++){
          if(this.todosArr[i]._id==todo._id){
            this.todosArr.splice(i,1);
          }
        }

     }
   })

   if(todo.isCompleted){
     this.completedCount-=1;
   }

   if(!todo.isCompleted){
     this.pendingCount-=1;
   }
  }
  
  else{
    console.log("refresh the page after adding a new task");
  }
    
  };

  changeCount(){
    // console.log("ran");
    var count=this.newCount;
    
    if(count==0)
      this.newCount=1;

    else
      this.newCount=0;

      this.randomPlaceholder();
        // console.log(this.todosArr);

  };

  randomPlaceholder(){

    var rand =this.myArr[Math.floor(Math.random() * this.myArr.length)];
    this.currString=rand;
    

  }

  createPlaceholderArr(){
    var str1="e.g. Get Groceries from the store";
    var str2="e.g. Pickup kids from school";
    var str3="e.g. Pay electricity bill";
    var str4="e.g. Take wife out for a dinner";
    var str5="e.g. Meet the client";
    var str6="e.g. Buy a new pair of shoes";
    var str7="e.g. Get the tv set repaired";
    var str8="e.g. Call customer care";
    var str9="e.g. Get the passport reissued";
    
    this.myArr.push(str1);
    this.myArr.push(str2);
    this.myArr.push(str3);
    this.myArr.push(str4);
    this.myArr.push(str5);
    this.myArr.push(str6);
    this.myArr.push(str7);
    this.myArr.push(str8);
    this.myArr.push(str9);
    
     

    
  };

  checkPendingCount(todosArr){
    this.temp=todosArr;
    var i:number;
    var x=0;
    // console.log("hi");
    //  console.log(this.todosArr);


    for(i=0;i<todosArr.length;i++){

      if(!todosArr[i].isCompleted){
        console.log("hi")
        x+=1;
      }
this.pendingCount=x;
    }
    console.log("pending:" + this.pendingCount);
  };

   checkCompletedCount(todosArr){
    this.temp=todosArr;
    var i:number;
    var x=0;
    // console.log("hi");
    //  console.log(this.todosArr);


    for(i=0;i<todosArr.length;i++){

     if(todosArr[i].isCompleted){
        console.log("hllo")
        x+=1;
      }
  this.completedCount=x;

    }
    console.log("completed:" + this.completedCount);
  }
  

}
