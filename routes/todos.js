var express=require('express');
var router=express.Router();
var mongojs=require('mongojs');

// 2nd para= array of collection you want
var db=mongojs('mongodb://jatin:jatin@ds143141.mlab.com:43141/meantodos_jatinarr', ['todos']);
var db2=mongojs('mongodb://jatin:jatin@ds143141.mlab.com:43141/meantodos_jatinarr', ['todosCount']);


// getting all todos
router.get('/todos', function(req, res, next){
    db.todos.find(function(err,todos){
        if(err){
            res.send(err);
        }

        else {
            res.json(todos);
        }
    })

});

// //get todos Count
// router.get('/todosCount', function(req, res, next){
//     db2.todosCount.find(function(err,todosCount){
//         if(err){
//             res.send(err);
//         }

//         else {
//             res.json(todosCount);
//         }
//     })

// });

//get single todo
router.get('/todo/:id', function(req,res,next){
    
    
    db.todos.findOne({
        // passed _id para too which get value
        // from request url
        _id:mongojs.ObjectId(req.params.id)

    }, function(err,todo){

        if(err){
            res.send(err);
        }

        else {
            res.json(todo);
        }
    })

});



//save todo

router.post('/todo', function(req, res, next){

    var todo=req.body;
    if(!todo.text || !(todo.isCompleted+'')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    }
        else {
            db.todos.save(todo, function(err, result){
                if(err){
                    res.send(err);
                }
                else{
                    res.json(result);
                }
            })
        }
});

//update todo

router.put('/todo/:id', function(req, res, next){
    var todo=req.body;
    var updatedObj={};

    if(todo.isCompleted){

updatedObj.isCompleted=todo.isCompleted;

    }
    if(todo.text){
        updatedObj.text=todo.text;
    }

    if(!updatedObj){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        })
    }

    else{

        db.todos.update({
            _id:mongojs.ObjectId(req.params.id)
        }, updatedObj, {}, function(err, result){

            if(err){
                res.send(err);
            }
            else{
                res.json(result);
            }
        });
    }
});

// // updating counts
// router.put('/todosCount/:id', function(req, res, next){
//     var todoCount=req.body;
//     var updatedObj={};

//     if(todoCount.pendingCount){

// updatedObj.pendingCount=todoCount.pendingCount;

//     }
//     if(todoCount.completedCount){
//         updatedObj.completedCount=todoCount.completedCount;
//     }

//     if(!updatedObj){
//         res.status(400);
//         res.json({
//             "error": "Invalid Data"
//         })
//     }

//     else{

//         db.todos.update({
//             _id:mongojs.ObjectId(req.params.id)
//         }, updatedObj, {}, function(err, result){

//             if(err){
//                 res.send(err);
//             }
//             else{
//                 res.json(result);
//             }
//         });
//     }
// });



// delete todos

router.delete('/todo/:id', function(req, res, next){

    db.todos.remove({
        _id:mongojs.ObjectId(req.params.id)
    }, function(err, result){

        if(err){
            res.send(err);
        }

        else {
            res.json(result);
        }
    });
});


module.exports=router;