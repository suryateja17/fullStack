const express = require('express')
const router = express.Router()
const Article = require('./../models/article')

router.get('/', (req, res) => {
  res.render('articles/new', { article: new Article() })
})
router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})

router.get('/blog', async (req, res) => {
  const article = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/blog', { articles: article })
})

router.get('/about', async (req, res) => {
  res.render('articles/about')
})

router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article: article })
})

router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  if (article == null) res.redirect('/')
  res.render('articles/show', { article: article })
  //res.send(req.params.id)
})

router.post(
  '/',
  async (req, res, next) => {
    req.article = new Article()
    next()
  },
  saveArticleAndRedirect('new')
)

router.put(
  '/:id',
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id.trim())
    console.log('>>>>>article: ' + req.article)
    next()
  },
  saveArticleAndRedirect('edit')
)

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    console.log(
      'Save and redirect POST: ' +
        req +
        ' with path: ' +
        path +
        'Req:' +
        req.article
    )
    console.log('>>>>req' + req.body.title)
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.content = req.body.content
    try {
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch (e) {
      console.log('>>>There was an error:' + e)
      res.render(`articles/${path}`, { article: article })
    }
  }
}

module.exports = router
