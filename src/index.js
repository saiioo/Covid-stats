const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const { connection } = require('./connector')



app.get('/covid',(req,res)=>{
  res.send('Hello')
})


// app.post('/upload',async (req,res)=>{
//   const data = await connection.create(req.body)
//   if(data){
//     res.send(data)
//   }else
//   {
//     res.json({
//       status:"failed",
//     })
//   }
// })


app.get('/totalRecovered',async (req,res)=>{
  const data = await connection.find()
  let Totalrecovered = 0
  data.forEach((item)=>{
    Totalrecovered = Totalrecovered + parseInt(item.recovered)
  })
  res.json({
    TotalRecoveredData : {
      _id:"total",
      recovered:Totalrecovered
    }
  })
  // res.send("Reacived")
})


app.get('/totalActive',async (req,res)=>{
  const data = await connection.find()
  let TotalActive = 0
  data.forEach((item)=>{
    
    TotalActive = TotalActive + parseInt(item.infected-item.recovered)
  })
  res.json({
    totalActiveData : {
      _id:"total",
      Active:TotalActive
    }
  })
  // res.send("Reacived")
})


app.get('/hotspotStates',async (req,res)=>{
  const data = await connection.find()
  // res.send("Reacived")
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;