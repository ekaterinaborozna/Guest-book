console.log('файл fetch подключен');
window.onload = function () {
    //запрос GET для получения списка сообщений
    fetch("http://localhost:3000/getAllMessages", {
            method: 'get',
        })
        .then(function (res) {
            var contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return res.json();
            }
            throw new TypeError("Oops, we haven't got JSON!");
        })
        .then(function (jsongett) {
            console.log('Process your JSON further');
            console.log(jsongett);
            if (jsongett.length > 0) {
                var divv = document.createElement('h3');
                divv.innerHTML = ' Messages received: ';
                document.body.appendChild(divv);
                //Вывод всех сообщений
                var arr = jsongett;
                arr.forEach(function (item, i, arr) {
                    var div = document.createElement('h5');
                    div.innerHTML = arr[i];
                    document.body.appendChild(div);
                });

            }
        })
        .catch(function (error) {
            console.log(error);
        });
    document.getElementById("submit").addEventListener("click", function (e) {
        e.preventDefault();
        var registerForm = document.forms.registerForm;
        var name = registerForm.elements["name"].value;
        var message = registerForm.elements["message"].value;
        // сериализуем данные в json
        var user = JSON.stringify({
            name: name,
            message: message
        });
        console.log(user);
        //запрос POST для отправки приветсвия 
        fetch("http://localhost:3000/user", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: user
            })
            .then(function (res) {
                var contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return res.json();
                }
                throw new TypeError("Oops, we haven't got JSON!");
            })
            .then(function (jsonget) {
                console.log('Process your JSON further');
                console.log(jsonget);
                //вписываем в div приветствие с именем пользователя
                var Textwelcome = document.getElementById('msg');
                Textmsg = jsonget.name;
                Textwelcome.innerHTML = 'Welcome, ' + Textmsg + ' !';
            })
            .catch(function (error) {
                console.log(error);
            });
        //запрос POST для сохранения сообщений в массив 
        fetch("http://localhost:3000/saveMessage", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: user
            })
            .then(function (res) {
                var contentType = res.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return res.json();
                }
                throw new TypeError("Oops, we haven't got JSON!");
            })
            .catch(function (error) {
                console.log(error);
            });
    })
};

/*  fetch('http://localhost:3000', {
    method: 'post',
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: 'foo=bar&lorem=ipsum'
  })
  .then(function (data) {
    console.log('Request succeeded', data);
    console.log('Request succeeded', data);
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });*/
