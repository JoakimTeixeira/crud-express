import express from 'express'
import { router } from './routes/members.mjs'
import exphbs from 'express-handlebars'
import { database } from './database.mjs'

const app = express()

// Body parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Members API routes
app.use('/api/members/', router)

// Express handlebars middleware
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Homepage route
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Member list',
    database
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running on port ${PORT}`))
