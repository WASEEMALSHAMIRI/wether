const express = require("express")
const path = require("path");
const app = express()
const port = process.env.port || 5000
var hbs = require("hbs");
const publicdirctorys = path.join(__dirname, "/src")
const stacdirctry = path.join(__dirname, "/views")
hbs.registerPartials(stacdirctry)
const Forecast = require("./src/Data/Forccast")
const Code = require("./src/Data/Code")
/////////////////////////////////
app.set('view engine', 'hbs');
app.use(express.static(publicdirctorys))
app.get("/",(req ,res)=>{
    res.render("index",{
        hi:"hi"
    })
})

app.get('/weather', (req, res) => {

    // if (!req.query.address) {
    //     return res.render({
    //         error: "error"
    //     })
    // }

    Code(req.query.address, (error, data) => {
        if (error) {
            return res.send({error})

        }
        Forecast(data.latitude, data.longtitude, (error, datas) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                tempeeratures: datas,
                city: req.query.address,
                latitudes: data.latitude,
                longitudes: data.longtitude
                
            })
        })
    })
       
  
})

app.get('*', (req, res) => {
    res.send('404 Page Not Founded')
})

app.listen(port, () => {
    console.log("start app")
})
