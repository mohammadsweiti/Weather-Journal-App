/* Global Variables */

//const { json } = require("body-parser");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+"/"+ d.getDate()+'/'+ d.getFullYear();

let urlfirst = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
let APIkey = '&appid=51179c24c05901a71177d986aec4a8ab';

document.getElementById('generate').addEventListener('click',()=>{
    const newzipnmber = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    getWeatherData(urlfirst,newzipnmber,APIkey).then((data)=>{
        console.log(data);
        postWeatherData('/addgeneralthing',{
            date: newDate ,
            temperature:data.list[0].main.temp,
            content:feeling });
            nowUpdate();
    })

})

const getWeatherData = async (urlfirst,zipnumber,key )=>{
    const response = await fetch (urlfirst+zipnumber+key);
    try{
        const responseData = await response.json();
        return responseData;
    }catch(error){
        console.log("there is error which is ",error);
        
    }
}

const postWeatherData = async (newurl ='',newdata={})=>{
    console.log(newdata);
    const response = await fetch(newurl,{
        method:'POST',
        credentials:'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(newdata)
    });
    try{
        const newNewData = await response.json();
        console.log(newNewData);
        return newNewData;
        
    }catch(error){
        console.log("there is error which is ",error);

    }
    
}

const nowUpdate = async ()=>{
    const request = await fetch('generalthing');
    try{
        const generalData = await request.json();
        document.getElementById('content').innerHTML = `Feeling = ${generalData[0].content}`;
        document.getElementById('temp').innerHTML = `Temperature = ${generalData[0].temperature} °K`;

    }catch(error){
        console.log("there is error which is ",error);

    }
}