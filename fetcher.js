var request = require('request');
//config
var lateralKey = "ec60b77ed62c58e872a2bba620a4c899";
var timesKey = "4fea4b9b548c41e9bf0714a2ca762e4b";

var lateralUrl = "https://document-parser-api.lateral.io/"

var populer = function() {

  return new Promise((resolve, reject) => {
    request({
      url: "https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json",
      qs: {
        'api-key': timesKey
      }
    }, function(error, response, body) {
      if (error) {
        reject(error)
      }

      var data = JSON.parse(body);
      resolve(data.results)

    });


  });



};

var top = function(section) {
  return new Promise((resolve, reject) => {
    request({
      url: "https://api.nytimes.com/svc/topstories/v2/" + section + ".json",
      qs: {
        'api-key': timesKey
      }
    }, function(error, response, body) {
      if (error) {
        reject(error)
      }

      var data = JSON.parse(body);
      resolve(data.results)

    });
  })
};


var article = function(url) {
  return new Promise((resolve, reject) => {
    request({
      method: "GET",
      url: lateralUrl,
      qs: {
        url: url
      },
      headers: {
        "content-type": "application/json",
        "subscription-key": lateralKey
      }
    }, function(error, response, body) {
      if (error) {
        reject(error);
      }

      resolve(JSON.parse(body))
    })
  });
}

var search = function(url, full) {
  return new Promise((resolve, reject) => {
    request({
      method: "GET",
      url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
      qs: {
        'api-key': timesKey,
        "q": url
      }
    }, function(error, response, body) {

      if (error) {
        reject(error)
      }

      var result = JSON.parse(body);

      if (!full) {
        var data = result.response.docs[0];
        var related = {
          previous: result.response.docs[1].web_url,
          next: result.response.docs[2].web_url
        }
        var res = Object.assign({}, related, data);
        resolve(res)
      }else{
        var data = result.response.docs;
        resolve(data);
      }

    })
  })
}

module.exports = {
  popular: populer,
  top: top,
  article: article,
  search: search

}