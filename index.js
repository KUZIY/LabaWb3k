const express = require('express')
const exphbs = require('express-handlebars')
const PORT = process.env.PORT || 3000
const todoRoutes = require('./routes/todos')

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(todoRoutes)

app.listen(PORT, ()=>{
    console.log('Srver hes been started on port:',PORT)
})