$(document).ready(function() {
  var burl = "https://api.nytimes.com/svc/mostpopular/v2/mostviewed/";
  var apikey = "/7.json?api-key=4fea4b9b548c41e9bf0714a2ca762e4b"
  //get main articles - carousel


  $.ajax({
    method: 'GET',
    url: burl+"all-sections"+apikey
  }).done(function(data){
    var res = data.results
    //loop through slider items
    for(var i= 0; i < 4;i++){
      var el = $("div[data-item="+i+"]");
      el.find("a.slider_tittle").html(res[i].title);
      el.find("p").html(res[i].abstract);
      el.find("img").attr("src",res[i].media[0]["media-metadata"][5].url)
    }

  }).fail(function(err){
    console.log(err);
  });

  //world news section
  $.ajax({}).done(function(data){}).fail(function(err){
    console.log(err);
  });


});
