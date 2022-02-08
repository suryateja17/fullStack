const express = require('express')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const app = express()

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async function (req, res) {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  //res.send('Hello World!')
  res.render('articles/index', {
    pageName: 'Home Page',
    articles: articles,
  })
})

app.use('/articles', articleRouter)

app.listen(5000, function () {
  console.log('New Blog listening on port 5000!')
})
