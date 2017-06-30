"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var todo_service_1 = require("../../services/todo.service");
var TodosComponent = (function () {
    // idcount:number;
    // idstring:string;
    function TodosComponent(_todoService) {
        // this.idcount=1;
        this._todoService = _todoService;
        this.newCount = 0;
        this.myArr = ["e.g. Get the car serviced"];
        this.pendingCount = 0;
        this.completedCount = 0;
    }
    // generateId(){
    //   this.idstring='test'+ this.idcount;
    // }
    // increment(){
    //   this.idcount=this.idcount+1;
    //   this.generateId();
    //   console.log(this.idcount);
    // }
    TodosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._todoService.getTodos()
            .subscribe(function (results) {
            // console.log(results);
            _this.todosArr = results
                , _this.checkPendingCount(_this.todosArr),
                _this.checkCompletedCount(_this.todosArr);
        });
        // this.checkPendingCount(this.todosArr);
        this.createPlaceholderArr();
    };
    ;
    TodosComponent.prototype.addNewTodo = function (event, newtodotext) {
        var _this = this;
        var newTodo = {
            text: newtodotext.value,
            isCompleted: false
        };
        var savedTodo = this._todoService.saveTodo(newTodo);
        savedTodo.subscribe(function (res) {
            // console.log("after saving, res: " + res);
            _this.todosArr.push(newTodo);
            // console.log("after pushing, newtodo: " + res._id);
            newtodotext.value = '';
        });
        if (newTodo) {
            this.pendingCount += 1;
        }
        console.log("new todo added");
    };
    ;
    TodosComponent.prototype.alterEditState = function (todo, state) {
        if (state) {
            todo.isEditMode = state;
        }
        else {
            delete todo.isEditMode;
        }
    };
    ;
    TodosComponent.prototype.changeCheckedStatus = function (todo) {
        if (todo._id) {
            var _todo = {
                _id: todo._id,
                text: todo.text,
                isCompleted: !todo.isCompleted
            };
            this._todoService.updateTodo(_todo)
                .subscribe(function (result) {
                todo.isCompleted = !todo.isCompleted;
            });
            if (_todo.isCompleted) {
                this.completedCount += 1;
                this.pendingCount -= 1;
            }
            if (!_todo.isCompleted) {
                this.completedCount -= 1;
                this.pendingCount += 1;
            }
        }
        else {
            console.log("refresh the page after adding a new task");
        }
    };
    ;
    TodosComponent.prototype.updateTodoText = function (event, todo) {
        var _this = this;
        if (event.which === 13) {
            todo.text = event.target.value;
            var _todo = {
                _id: todo._id,
                text: todo.text,
                isCompleted: todo.isCompleted
            };
            this._todoService.updateTodo(_todo)
                .subscribe(function (result) {
                _this.alterEditState(todo, false);
            });
        }
        ;
    };
    ;
    TodosComponent.prototype.deleteTodo = function (todo) {
        var _this = this;
        if (todo._id) {
            this._todoService.deleteTodo(todo._id)
                .subscribe(function (result) {
                if (result.n == 1) {
                    for (var i = 0; i < _this.todosArr.length; i++) {
                        if (_this.todosArr[i]._id == todo._id) {
                            _this.todosArr.splice(i, 1);
                        }
                    }
                }
            });
            if (todo.isCompleted) {
                this.completedCount -= 1;
            }
            if (!todo.isCompleted) {
                this.pendingCount -= 1;
            }
        }
        else {
            console.log("refresh the page after adding a new task");
        }
    };
    ;
    TodosComponent.prototype.changeCount = function () {
        // console.log("ran");
        var count = this.newCount;
        if (count == 0)
            this.newCount = 1;
        else
            this.newCount = 0;
        this.randomPlaceholder();
        // console.log(this.todosArr);
    };
    ;
    TodosComponent.prototype.randomPlaceholder = function () {
        var rand = this.myArr[Math.floor(Math.random() * this.myArr.length)];
        this.currString = rand;
    };
    TodosComponent.prototype.createPlaceholderArr = function () {
        var str1 = "e.g. Get Groceries from the store";
        var str2 = "e.g. Pickup kids from school";
        var str3 = "e.g. Pay electricity bill";
        var str4 = "e.g. Take wife out for a dinner";
        var str5 = "e.g. Meet the client";
        var str6 = "e.g. Buy a new pair of shoes";
        var str7 = "e.g. Get the tv set repaired";
        var str8 = "e.g. Call customer care";
        var str9 = "e.g. Get the passport reissued";
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
    ;
    TodosComponent.prototype.checkPendingCount = function (todosArr) {
        this.temp = todosArr;
        var i;
        var x = 0;
        // console.log("hi");
        //  console.log(this.todosArr);
        for (i = 0; i < todosArr.length; i++) {
            if (!todosArr[i].isCompleted) {
                console.log("hi");
                x += 1;
            }
            this.pendingCount = x;
        }
        console.log("pending:" + this.pendingCount);
    };
    ;
    TodosComponent.prototype.checkCompletedCount = function (todosArr) {
        this.temp = todosArr;
        var i;
        var x = 0;
        // console.log("hi");
        //  console.log(this.todosArr);
        for (i = 0; i < todosArr.length; i++) {
            if (todosArr[i].isCompleted) {
                console.log("hllo");
                x += 1;
            }
            this.completedCount = x;
        }
        console.log("completed:" + this.completedCount);
    };
    return TodosComponent;
}());
TodosComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'todos',
        templateUrl: 'todos.component.html',
        providers: [todo_service_1.TodoService]
    }),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodosComponent);
exports.TodosComponent = TodosComponent;
//# sourceMappingURL=todos.component.js.map