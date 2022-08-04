const express = require("express");
const https = require('node:https');
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded());

//const client = require("mailchimp-marketing");



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})
app.get("/css", function(req, res) {
  res.sendFile(__dirname + "/styles.css");
})
app.get("/img", function(req, res) {
  res.sendFile(__dirname + "/shield.png");
})


app.post("/", function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  var responseCode;
  const url='https://us18.api.mailchimp.com/3.0/lists/6567b09b76';
  const options={
    method:"POST",
    auth:"vinnu:1b925b945f2b39ac105283c6a54e7dc3-us18"
  }

  var data = {
    members: [
      {
        email_address:email,
        status:"subscribed",
        merge_fields: {
          FNAME:firstName,
          LNAME:lastName
        }
      }

    ]
  }

  var jsonData=JSON.stringify(data);

  const request=https.request(url,options,function(response){
    response.on("data",function(){
      if(response.statusCode==200){
        res.sendFile(__dirname+"/sucess.html");
      } else {
        res.sendFile(__dirname+"/failure.html");
      }
    })
  });

  request.write(jsonData);

  request.end();

})

app.post("/failure",function(req,res){
  res.redirect("/");
})

var PORT=process.env.PORT|| 3000;
app.listen(PORT, function() {
  console.log("Server is running");
});
