const { Router } = require('express')
const router = Router()
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const bodyParser = require('body-parser');
const crypto=require('crypto')

var urlencodedParser = bodyParser.urlencoded({extended:false})

router.get('/', (req, res) => {
    res.render('index')
})

router.post('/auth',urlencodedParser, (req, res) => {
    const login = req.body.login
    const password =  req.body.password
    
    var cryptPassword =  crypto.createHash("sha1").update(password).digest()
    let user = {
        login: login,
        password: cryptPassword.toString('hex')
};

var xhr = new  XMLHttpRequest();

var body = JSON.stringify(user);
xhr.open("POST", 'https://helloworldprojectt.herokuapp.com/v1/authorization',false);
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xhr.withCredentials = true;
xhr.send(body);

if (xhr.status == 200){
    var getRes = new XMLHttpRequest();
    getRes.open("GET", 'https://helloworldprojectt.herokuapp.com/v1/cars',false);
    getRes.setRequestHeader("access_token", xhr.getResponseHeader("access_token"));
    getRes.withCredentials = true;
    getRes.send(body);
    console.log(JSON.parse(getRes.responseText));

     var carsList = JSON.parse(getRes.responseText);


    res.render('cars',{carsList: carsList})
}
else
    res.render('error')

})

module.exports = router