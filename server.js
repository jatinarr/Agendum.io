var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');

//homepage route
var index=require('./routes/index');
// todos api route
var todos=require('./routes/todos');

var app=express();

// view engine, with express we can use many but we will use ejs

//set views folder and use path module

//express will now grab templates from todoviews folder
app.set('views', path.join(__dirname,'todoviews'));
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

//angular content in client folder
app.use(express.static(path.join(__dirname, 'client')));

//Parses the text as json
app.use(bodyParser.json());
//Parses the text as URL encoded data
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', index);
app.use('/api/v1/', todos);

app.listen(3000, function(){

    console.log('Server started on port 3000...');

})

