var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.get('/',function(req,res){
   res.sendFile(path.join(__dirname,'page.html'));
});
app.get('/favicon.ico',function(req,res){
    res.send('404');
});

app.use(express.static(path.resolve('..')));
app.use(bodyParser.json());
var books = [{id:1,name:'javascript'},{id:2,name:'node.js'}];
//当用户访问 /books路径，并且请求方式是get的时候
app.route('/books').get(function(req,res){
  res.send(books);
    //增加一个书籍
}).post(function(req,res){
    var book = req.body;
    book.id = books[books.length-1].id+1;
    books.push(book);
    res.send(book);
});

app.route('/books/:id').delete(function(req,res){
    books = books.filter(function(current){
        return current.id != req.params.id;
    });
    res.send({});
}).get(function(req,res){
    var book  = books.filter(function(current){
        return current.id == req.params.id;
    })[0];
    res.send(book);
}).put(function(req,res){
    books = books.map(function(current){
        if(current.id == req.params.id){
            return req.body;
        }else{
            return current;
        }
    });
    res.send(req.body);
});

app.listen(8080);