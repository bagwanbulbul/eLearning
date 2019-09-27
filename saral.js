var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.post('/post',(req,res)=>{
    var id = req.params.id;
    var user1 ={
        name:req.body.name,
        description:req.body.description
    }
    var data =fs.readFileSync("data.json")
    console.log(data)
    data = data.toString();
    let Data = JSON.parse(data)
    id=Data.length
    user1["id"] = id+1;
    console.log(user1);
    Data.push(user1)
    fs.writeFileSync("data.json",JSON.stringify(Data,null,2))
    return res.json(Data)
})
app.get('/get', function (req, res) {
    fs.readFile("data.json", 'utf8', function (err, data) {
       console.log( data );
       return res.end( data );
    });
 })
app.listen(3000, () => console.log('server is listening'));
