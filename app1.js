const express = require('express');
const Datastore = require('nedb');
const app = express();
app.listen(3000, ()=>console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db')
database.loadDatabase();
database.insert({
  "address1":"Plot No:1, Sadarpur, Sector-45, Noida, Uttar Pradesh 201303, India",
  "address2":"New Link Road, Behind Infinity Mall, Andheri West, Mumbai, Maharashtra 400053, India",
  "address3":"D-002, Sector 75 Road, Sector 75, Noida, Uttar Pradesh 201301, India",
  "address4":"Ambrahi Village, Sector 19 Dwarka, Dwarka, Delhi, 110075, India",
  "address5":"Plot No 53, Block B, Sector 56, Gurugram, Haryan 122011, India"
  });

app.post('/api',(request,response)=>{
  console.log('I got a request!');
  console.log(request.body);
  const data = request.body;
  response.json({
    status: 'success',
    latitude: data.lat,
    longitude: data.lon
  })
});