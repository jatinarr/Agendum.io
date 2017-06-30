import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class TodoService{

    constructor(private _http: Http){


    }

    getTodos(){

        return this._http.get('/api/v1/todos')
        .map(res =>  res.json());
    };

    saveTodo(todo){

        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        var todoString=JSON.stringify(todo);
        return this._http.post('/api/v1/todo', todoString, {headers: headers})
        .map(result => result.json());

    };

    updateTodo(_todo){

        var headers=new Headers();
        headers.append('Content-Type', 'application/json');
        var todoString=JSON.stringify(_todo);
        return this._http.put('/api/v1/todo/' + _todo._id , todoString, {headers: headers})
        .map(result => result.json());

    };

    // updateTodoCount(_todo){

    //     var headers=new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     var todoString=JSON.stringify(_todo);
    //     return this._http.put('/api/v1/todosCount/' + _todo._id , todoString, {headers: headers})
    //     .map(result => result.json());

    // };

    deleteTodo(id){

        return this._http.delete('/api/v1/todo/' + id)
        .map(res => res.json());

    }

}