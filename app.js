const express = require("express");

const bodyParser = require("body-parser");

const https = require("https");

const request = require("request");
const { response } = require("express");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
       
})


app.post("/",function(req,res){
    const fName = (req.body.name1);
    const lName = (req.body.name2);
    const email = (req.body.email);
    console.log(req.body);

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME:fName,
                    LNAME:lName,
                }
            
            }
                   
        ]
    }

    const jsonData = JSON.stringify(data);

    console.log(jsonData);

    const options={
        url:"https://us2.api.mailchimp.com/3.0/lists/3fa7b58a67",
        method:"POST",
        headers:{
            Authorization:"Afzal b13b633b7e57ded49158035167c6a3b0-us2",
            },
        body: jsonData,
    }


    request(options,(err, response, body) =>{

        if(response.statusCode == 200){
            res.sendFile(__dirname +"/success.html");
                 

        }

        else{
            res.sendFile(__dirname +"/failure.html");
            
        }
        

    })
    
})

app.post("/failure",function (req,res){
    res.redirect("/");
  })

app.listen(process.env.PORT||3000,function(){
    console.log("Server is running ");
})

//api key b13b633b7e57ded49158035167c6a3b0-us2

// id 3fa7b58a67