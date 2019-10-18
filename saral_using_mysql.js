var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json());
var mysql = require('mysql');
var knex = require("knex")({
    client:"mysql",
    connection:{
        host : 'localhost',
        user : 'root',
        password : 'navgurukul',
        database : 'saralApiData'
    }
});

// create courses
app.post("/post",function(req,res){
    knex('Allcourses').insert({courseName:req.body.courseName,discription:req.body.discription})
    .then((data)=>{
        res.json(data)
    }).catch((err)=>{
        console.log("oops!!! somthing went wrong")
    })
});
// read all courses
app.get("/get/courses",function(req,res){
    knex.select("*").from("Allcourses").then((data)=>{
        res.send(data)
    }).catch(()=>{
        console.log("oops!!!!! somthing went wrong")
    })
});
// read courses by id
app.get("/get/courses/:courseId",function(req,res){
    knex.select("*").from("Allcourses").where("courseId",req.params.courseId)
    .then((data)=>{
        res.send(data)
    }).catch(()=>{
        console.log("oops!!! somthing went wrong")
    })
})

// update
app.put("/update/:courseId",function(req,res){
    knex("Allcourses").where("courseId",req.params.courseId)
    .update({
        "courseName":req.body.courseName,
        "discription":req.body.discription
    }).then(()=>{
        res.json("update is sucessful")
    }).catch(()=>{
        console.log("oops!! somthing went wrong")
    })
});

// delete 
app.delete("/delete/:courseId",function(req,res){
    knex("Allcourses").where({"courseId":req.params.courseId}).del()
    .then(()=>{
        res.send("id deleted")
    }).catch(()=>{
        res.send("oops!!! somthing went wrong")
    })

});

// create exercise
app.post("/post/exercises",function(req,res){
    knex('Exercises').insert({courseID:req.body.courseID,exerciseName:req.body.exerciseName})
    .then((data)=>{
        res.json(data)
    }).catch((err)=>{
        console.log("oops!!! somthing went wrong")
    })
});

// get exercises
app.get("/get/exercises",function(req,res){
    knex.select("*").from("Exercises").then((data)=>{
        res.send(data)
    }).catch(()=>{
        console.log("oops!!!!! somthing went wrong")
    })
});
// exercises by id
app.get("/get/courses/exercise/:exerciseId",function(req,res){
    knex.select("*").from("Exercises").where({"exerciseId":req.params.exerciseId})
    .then((data)=>{
        res.send(data)
    }).catch(()=>{
        console.log("oops!!! somthing went wrong")
    })
})
// 
app.get("/get/courses/:courseID/exercise/:exerciseId",function(req,res){
    knex.select("*").from("Exercises").where("courseID",req.param.courseID)
    .where("exerciseId",req.param.exerciseId)
    .then((data)=>{
        res.send(data)
    }).catch(()=>{
        console.log("oops!! somthing went wrong")
    })
})


app.listen(5000, function () {
    console.log('Express server is listening on port 5000');
});