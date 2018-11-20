var express = require('express');
var bodyParser = require('body-parser')
var fetcher = require('./fetcher.js')
var _ = require('lodash')
const app = express()


var port = process.env.PORT || 3000;

app.set('views', __dirname + '/magazine/');

app.set('view engine', 'pug')

app.use(express.static(__dirname+'/magazine/static/'))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  Promise.all([fetcher.popular(), fetcher.top("home"), fetcher.top("science"), fetcher.top("travel"), fetcher.top("sports"), fetcher.top("technology")]).then(function(values) {
  values.map(function(arr, index){
    if(arr != undefined){
      return arr.map(function(val){
        val.byline = _.startCase(_.toLower(val.byline.substring(3)));
        val.published_date = (new Date(val.published_date)).toLocaleDateString()
        if(index !== 0){
          if(val.multimedia.length === 0){
             val.multimedia = [{url: ""},{url: ""}, {url: ""}, {url: "img/blank.png"}, {url: "img/blank.png"}]
             }
        }
      })
    }else{
      return [];
    }
  })

    res.render("index", {popular: values[0], latest: values[1], science: values[2], travel: values[3], sports: values[4], technology: values[5]})
});

});

app.get('/category', (req, res) => {
  Promise.all([fetcher.top("travel"), fetcher.top("technology"), fetcher.top(req.query.q)]).then(function(values) {
  values.map(function(arr, index){
    return arr.map(function(val){
      val.byline = _.startCase(_.toLower(val.byline.substring(3)));
      val.published_date = (new Date(val.published_date)).toLocaleDateString()
      if(index !== 0){
        if(val.multimedia.length === 0){
           val.multimedia = [{url: ""},{url: ""}, {url: ""}, {url: "img/blank.png"}, {url: "img/blank.png"}]
           }
      }
    })
  })

    res.render("category", {travel: values[0], technology: values[1], main: values[2].slice(0,values[2].length/2), category: req.query.q})
});

});

app.get('/post', (req, res) => {
  var article_url = req.query.q;
  Promise.all([fetcher.article(article_url), fetcher.search(article_url, false), fetcher.top("technology"), fetcher.top("travel")]).then(function(values){
    values[1].pub_date = (new Date(values[1].pub_date)).toLocaleDateString();
    res.render("post",{article: values[0], search: values[1], technology: values[2], travel: values[3]})
  })

})

app.post("/search", (req, res) => {


  if(!req.body["Search-box"]){
    res.end();
  }

  res.redirect("/search?q="+req.body["Search-box"])

})

app.get("/search", (req, res) => {

  var query = req.query.q;

   fetcher.search(query, true).then(function(data){
     data.map(function(val){
           val.pub_date = (new Date(val.pub_date)).toLocaleDateString();
           val.multimedia = [{url: ""},{url: ""}, {url: ""}, {url: "img/blank.png"}, {url: "img/blank.png"}]
        if(!val.byline){
          val.byline = "";
        }

     })

     res.render("search", {query: query, results: data})

   })


})




//science, travel, sports, tech

app.listen(port, () => {
  console.log('Example app listening on port ' + port)
})
