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
// get all courses
app.get('/get', function (req, res) {
    fs.readFile("data.json", 'utf8', function (err, data) {
       console.log( data );
       return res.end( data );
    });
 })
//  selected courses
 app.get("/get/:name",function(req,res){
    let id = req.params.name
    var data = fs.readFileSync("data.json") 
    var Data = JSON.parse(data);
    for(var index in Data){
        if(Data[index]["name"]==id){
            console.log(Data[index])
            return res.send(JSON.stringify(Data[index]))
        }
    }
 });
//  update data
 app.put('/put/:id',(req,res)=>{

    var id = req.params.id-1;
    var jsondata = fs.readFileSync('data.json')
    var Data = JSON.parse(jsondata);

    Data[id]["name"] = req.body.name;
    Data[id]["description"] = req.body.description;

    fs.writeFileSync("data.json", JSON.stringify(Data));
    console.log(Data)
    return res.json(Data)
}),
// post exercise data
app.post('/postexercise',(req,res)=>{
    var id = req.params.id;
    var user1 ={
        courseId:req.body.courseId,
        name:req.body.name,
        description:req.body.description,
        content:req.body.content,
        hint:req.body.hint

    }
    var data =fs.readFileSync("exercise.json")
    console.log(data)
    data = data.toString();
    let Data = JSON.parse(data)
    id=Data.length
    user1["id"] = id+1;
    console.log(user1);
    Data.push(user1)
    fs.writeFileSync("exercise.json",JSON.stringify(Data,null,2))
    return res.json(Data)
})
// get all courses
app.get('/exercises', function (req, res) {
    fs.readFile("exercise.json", 'utf8', function (err, data) {
       console.log( data );
       return res.end( data );
    });
 })
//  selected course exercise
 app.get("/course/:cId/exercises",function(req,res){
    let id = req.params.id
    var data = fs.readFileSync("exercise.json") 
    var Data = JSON.parse(data);
    var exercises = []
    for(var index in Data){
        if(Data[index]["courseId"]==id){
            exercises.push(Data[index])
            console.log(exercises)
        }
    }
    return res.send(JSON.stringify(exercises))
 });
//  selected exercise
app.get("/course/:cId/exercises/:eId",function(req,res){
    let id = req.params.cId
    var data = fs.readFileSync("exercise.json")
    var Data = JSON.parse(data);
    console.log(Data)
    for(var index in Data){
        if(Data[index]["courseId"]==id){
            var eId = req.params.eId
            for (var j in Data){
                if (Data[j]["id"]==eId && Data[j]["courseId"]==id){
                    res.json(JSON.stringify(Data[j]))
                }
                
            }
        }
    }
    res.end("data is not found")
})
app.listen(3000, () => console.log('server is listening'));
