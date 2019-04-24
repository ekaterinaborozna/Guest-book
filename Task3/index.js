var express = require('express')
var app = express()
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fetch = require('node-fetch');
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/css', express.static(__dirname + '/css'));
var path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));

//БД
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true
});
require('./person.model');
var Person = mongoose.model('persons');
Person.find({})
    .then(function (persons) {
        console.log('Содержимое БД: ' + (persons));
    })
//Проверка соединения
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('we are connected!');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
//Отправка данных для приветствия и запись в БД
app.post('/user', function (req, res) {
    var newperson = {
        name: JSON.stringify(req.body.name),
        message: JSON.stringify(req.body.message),
    };
    Person.insertMany(newperson, function (err, result) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(req.body);
    });
});

//Сохранение данных в массив
var userMessages = [];
app.post('/saveMessage', function (req, res) {
    newmess = req.body.message;
    userMessages.push(newmess);
    console.log(userMessages);
    res.send(userMessages);
});
app.get('/getAllMessages', function (req, res) {
    /* res.send(userMessages);*/
    Person.distinct("message")
        .then(function (messages) {
            console.log('массив ' + messages);
            /*userMessages.push(messages);*/
            res.send(messages);
        })
        .catch(function (error) {
            console.log(error);
        });
})
app.listen(3000);
console.log("Мы отслеживаем порт 3000");
