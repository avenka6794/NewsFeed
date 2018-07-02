var fetcher = require('./fetcher.js')

var results = fetcher.search("https://www.nytimes.com/2018/06/24/business/media/james-wolfe-ali-watkins-leaks-reporter.html")

results.then(function(data){
  console.log(data)
})