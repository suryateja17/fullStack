/* var express = require('express');
var app = express();
app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.sendFile
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const MediumArticle = require('./models/mediumArticle')
const mongoose = require('mongoose')
mongoose.connect(process.env.CLOUD_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.once('error', (error) => console.log('**Connection Error!' + error))
db.once('open', () => {
  console.log('**Connection established')
  createNewRecord()
})

async function createNewRecord() {
  let article = new MediumArticle()
  article.title = 'Test Article'
  article.content = 'Test Content'
  article.articleNumber = 4
  article.url = 'www.test.com'
  try {
    article = await article.save()
    console.log('Article saved! ' + article)
  } catch (e) {
    console.log('>>>There was an error:' + e)
  }
}
