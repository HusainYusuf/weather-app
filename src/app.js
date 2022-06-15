const express = require('express');
const hbs = require("hbs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000
const publicStaticDirectPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials')
const data = require('../utils/data')

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicStaticDirectPath));

app.get('', (req, res) => {
       res.render('index', {
              title: ''
       })
})

app.get('/weather', (req, res) => {
       const address = req.query.address

       if(!address) {
              return res.send({
                     error: "Address must be searched in text box"
              })
       }

       data(address, (error, {temperature, description, cityName} = {}) => {
              if(error) {
                     return res.send({
                            error
                     })
              }
              console.log(temperature, description, cityName)
              res.send({
                     temperature,
                     description,
                     cityName
              })
       })
});

app.get("*", (req, res) => {
       res.render('404', {
              title: "Page Not Found"
       })
})

app.listen(port, () => {
       console.log("Server is running on port: ", port);
})