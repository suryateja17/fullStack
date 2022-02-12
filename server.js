if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()

mongoose.connect(process.env.CLOUD_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.once('error', (error) => console.log('**Connection Error!' + error))
db.once('open', () => console.log('**Connection established'))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'))

app.get('/', async function (req, res) {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  //res.send('Hello World!')
  res.render('articles/index', {
    pageName: 'Home Page',
    articles: articles,
  })
})

app.get('/test', function (req, res) {
  res.render('articles/test')
})

app.get('/home', function (req, res) {
  res.render('articles/home')
})

app.use('/articles', articleRouter)

app.listen(process.env.PORT || 5000, function () {
  console.log('New Blog listening on port 5000!')
})
