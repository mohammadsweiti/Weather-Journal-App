// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8855;
const server = app.listen(port,()=>{
    console.log(`port running in port whis is ${port}`);
    
});
app.get('/', (request, response) => {
    response.send('Server is running!');
});


app.get('/generalthing',(req,res)=>{
    console.log('Sending project data:', projectData);
    res.status(200).send(projectData);
});
const addData = (req,res)=>{
    console.log(`server data is ${JSON.stringify(req.body)}`);
    projectData['date']= req.body.date;
    projectData['temperature']= req.body.temperature;
    projectData['content']= req.body.content;

    res.send(projectData);
    console.log("the data publised : "+JSON.stringify(projectData));
    
}
app.post('/addData',addData);
    




