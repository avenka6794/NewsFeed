$(document).ready(function() {
  var burl = "https://api.nytimes.com/svc/mostpopular/v2/mostviewed/";
  var apikey = "/7.json?api-key=4fea4b9b548c41e9bf0714a2ca762e4b"
  //get main articles - carousel

$("#ticker01").html("");
  $.ajax({
    method: 'GET',
    url: burl+"all-sections"+apikey
  }).done(function(data){
    var res = data.results
    //loop through slider items
    for(var i= 0; i < 5;i++){
      
      var el = $("div[data-item="+i+"]");
      el.find("a.slider_tittle").html(res[i].title);
      el.find("p").html(res[i].abstract);
      el.find("img").attr("src",res[i].media[0]["media-metadata"][5].url);
    
      $("#ticker01").append('<li><a href="#"><img src="'+res[i].media[0]["media-metadata"][1].url+'" alt="">'+res[i].title.substring(0,18)+'...</a></li>');
    }
    

  }).fail(function(err){
    console.log(err);
  });

  //world news section
  $.ajax({
    method: 'GET',
    url: burl+"world"+apikey
  }).done(function(data){
    var res = data.results;
    
    for(var i = 0; i < 5; i++){
      var el = $(".latest_postnav");
      var mediaurl = "";
      if(res[i].media != ""){
        mediaurl = res[i].media[0]["media-metadata"][1].url;
        el.append('<li>'+
                '<div class="media"> <a href="pages/single_page.html" class="media-left"> <img alt="" src="'+mediaurl+'"> </a>'+
                  '<div class="media-body"> <a href="pages/single_page.html" class="catg_title">'+res[i].title+'</a> </div>'+
                '</div> </li>');   
      }else{
     el.append('<li>'+
                '<div class="media"> <a href="pages/single_page.html" class="media-left"> <img alt="" src="images/featured_img'+((i%3)+1)+'.jpg"> </a>'+
                  '<div class="media-body"> <a href="pages/single_page.html" class="catg_title">'+res[i].title+'</a> </div>'+
                '</div> </li>');    
      }
             
    }
  }).fail(function(err){
    console.log(err);
  });

  //technology
  $.ajax({
    method: 'GET',
    url: burl+"technology"+apikey
  }).done(function(data){
    var res = data.results;
    var mediaur = "images/featured_img1.jpg";
    if(res[0].media != ""){
    mediaur = res[0].media[0]["media-metadata"][1].url;
    }
    $("#techmain").html('<li>'+
                  '<figure class="bsbig_fig"> <a href="pages/single_page.html" class="featured_img"> <img alt="" src="'+mediaur+'"> <span class="overlay"></span> </a>'+
                    '<figcaption> <a href="pages/single_page.html">'+res[0].title+'</a> </figcaption>'+
                    '<p>Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a phare...</p>'+
                  '</figure></li>');
    for(var i = 1; i < 5; i++){
      var el = $("#techmain2");
      var mediaurl = "";
      if(res[i].media != ""){
        mediaurl = res[i].media[0]["media-metadata"][1].url;
     
        el.append('<li>'+
                  '<div class="media wow fadeInDown"> <a href="pages/single_page.html" class="media-left"> <img alt="" src="'+mediaurl+'"> </a>'+
                   ' <div class="media-body"> <a href="pages/single_page.html" class="catg_title"> '+res[i].title+'</a> </div>'+
                  '</div></li>');   
      }else{
     el.append('<li>'+
                  '<div class="media wow fadeInDown"> <a href="pages/single_page.html" class="media-left"> <img alt="" src="images/post_img1.jpg"> </a>'+
                   ' <div class="media-body"> <a href="pages/single_page.html" class="catg_title"> '+res[i].title+'</a> </div>'+
                  '</div></li>');    
      }
             
    }
  }).fail(function(err){
    console.log(err);
  });
  
  //art
  $.ajax({
    method: 'GET',
    url: burl+"arts"+apikey
  }).done(function(data){
    var res = data.results;
    var mediaur = "images/post_img1.jpg";
    if(res[0].media != ""){
    mediaur = res[0].media[0]["media-metadata"][1].url;
    }
    $("#artmain").html('<li>'+
                  '<figure class="bsbig_fig"> <a href="pages/single_page.html" class="featured_img"> <img alt="" src="'+mediaur+'"> <span class="overlay"></span> </a>'+
                    '<figcaption> <a href="pages/single_page.html">'+res[0].title+'</a> </figcaption>'+
                    '<p>Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a phare...</p>'+
                  '</figure></li>');
    for(var i = 1; i < 5; i++){
      var el = $("#artmain2");
      var mediaurl = "";
      if(res[i].media != ""){
        mediaurl = res[i].media[0]["media-metadata"][1].url;
        
        el.append('<li>'+
                  '<div class="media wow fadeInDown"> <a href="pages/single_page.html" class="media-left"> <img alt="" src="'+mediaurl+'"> </a>'+
                   ' <div class="media-body"> <a href="pages/single_page.html" class="catg_title"> '+res[i].title+'</a> </div>'+
                  '</div></li>');   
      }else{
     el.append('<li>'+
                  '<div class="media wow fadeInDown"> <a href="pages/single_page.html" class="media-left"> <img alt="" src="images/post_img3.jpg"> </a>'+
                   ' <div class="media-body"> <a href="pages/single_page.html" class="catg_title"> '+res[i].title+'</a> </div>'+
                  '</div></li>');    
      }
             
    }
  }).fail(function(err){
    console.log(err);
  });
  
  //sports
  $.ajax({
    method: 'GET',
    url: burl+"sports"+apikey
  }).done(function(data){
    var res = data.results;
    var mediaur = "images/featured_img1.jpg";
    if(res[0].media != ""){
    mediaur = res[0].media[0]["media-metadata"][1].url;
    }
    $("#sportmain").html('<li>'+
                  '<figure class="bsbig_fig"> <a href="pages/single_page.html" class="featured_img"> <img alt="" src="'+mediaur+'"> <span class="overlay"></span> </a>'+
                    '<figcaption> <a href="pages/single_page.html">'+res[0].title+'</a> </figcaption>'+
                    '<p>Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a phare...</p>'+
                  '</figure></li>');
    for(var i = 1; i < 5; i++){
      var el = $("#sportmain2");
      var mediaurl = "images/post_img1.jpg";
      if(res[i].media != ""){
        if(res[i].media[0]["media-metadata"][1].url){
        mediaurl = res[i].media[0]["media-metadata"][1].url;
        }
        el.append('<li>'+
                  '<div class="media wow fadeInDown"> <a href="pages/single_page.html" class="media-left"> <img alt="" src="'+mediaurl+'"> </a>'+
                   ' <div class="media-body"> <a href="pages/single_page.html" class="catg_title"> '+res[i].title+'</a> </div>'+
                  '</div></li>');   
      }else{
     el.append('<li>'+
                  '<div class="media wow fadeInDown"> <a href="pages/single_page.html" class="media-left"> <img alt="" src="images/post_img1.jpg"> </a>'+
                   ' <div class="media-body"> <a href="pages/single_page.html" class="catg_title"> '+res[i].title+'</a> </div>'+
                  '</div></li>');    
      }
             
    }
  }).fail(function(err){
    console.log(err);
  });
   
  //food
  $.ajax({
    method: 'GET',
    url: burl+"food"+apikey
  }).done(function(data){
    var res = data.results;
    var mediaur = "images/featured_img1.jpg";
    if(res[0].media != ""){
    mediaur = res[0].media[0]["media-metadata"][1].url;
    }
    $("#foodmain").html('<li>'+
                  '<figure class="bsbig_fig"> <a href="pages/single_page.html" class="featured_img"> <img alt="" src="'+mediaur+'"> <span class="overlay"></span> </a>'+
                    '<figcaption> <a href="pages/single_page.html">'+res[0].title+'</a> </figcaption>'+
                    '<p>Nunc tincidunt, elit non cursus euismod, lacus augue ornare metus, egestas imperdiet nulla nisl quis mauris. Suspendisse a phare...</p>'+
                  '</figure></li>');
    for(var i = 1; i < 5; i++){
      var el = $("#foodmain2");
      var mediaurl = "";
      if(res[i].media != ""){
        mediaurl = res[i].media[0]["media-metadata"][1].url;
        
        el.append('<li>'+
                  '<div class="media wow fadeInDown"> <a href="pages/single_page.html" class="media-left"> <img alt="" src="'+mediaurl+'"> </a>'+
                   ' <div class="media-body"> <a href="pages/single_page.html" class="catg_title"> '+res[i].title+'</a> </div>'+
                  '</div></li>');   
      }else{
     el.append('<li>'+
                  '<div class="media wow fadeInDown"> <a href="pages/single_page.html" class="media-left"> <img alt="" src="images/post_img3.jpg"> </a>'+
                   ' <div class="media-body"> <a href="pages/single_page.html" class="catg_title"> '+res[i].title+'</a> </div>'+
                  '</div></li>');    
      }
             
    }
  }).fail(function(err){
    console.log(err);
  });
});
