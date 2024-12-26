// Setup empty JS object to act as endpoint for all routes
projectData = [];

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


app.get('/generalthing',(request,response)=>{
    console.log('Sending project data:', projectData);
    response.status(200).send(projectData);
});

app.post('/addgeneralthing',(request,response)=>{
    console.log(`server data is ${JSON.stringify(request.body)}`);
    const newObject ={
        date : request.body.date,
        temperature : request.body.temperature,
        content: request.body.content
    }  
    projectData.push(newObject);

    response.status(200).send(projectData);   
})



