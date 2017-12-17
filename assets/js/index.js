$(document).ready(function() {
    //set current date
    $("#date").html(moment().format('MMMM Do YYYY'));

    //get articles - nytimes mostviewed all categories
    var ourl = "https://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/7.json?api-key=4fea4b9b548c41e9bf0714a2ca762e4b";
    

    $.ajax({
        url: ourl,
        method: 'GET',
    }).done(function(data) {
        var results = data.results;
        //append data for specified article
            var el = $("#text");
            var num = el.data('num');
            var inde = num-1;
            $("#title" + (num)).html(results[inde].title);
            $("#author" + (num)).html(results[inde].byline);
            $("#time" + (num)).html(results[inde].published_date);
            $("#tag" + (num)).html(results[inde].section);
            $("#img" + (num)).attr("src", results[inde].media[0]["media-metadata"][0].url);
            $("#img" + (num)).css("height", results[inde].media[0]["media-metadata"][0].height);
            $("#img" + (num)).css("width", results[inde].media[0]["media-metadata"][0].width);
            $("figurecaption[id=" + (num) + "]").html(results[inde].media[0].caption);

            //get article body from lateral.io
            var burl = "https://document-parser-api.lateral.io/?url=";
            var subkey = "ec60b77ed62c58e872a2bba620a4c899";
            var aurl = results[inde].url;
            var turl = burl + aurl;


            $.ajax({
                url: turl,
                method: 'GET',
                headers: {
                    "content-type": "application/json",
                    "subscription-key": subkey
                }
            }).done(function(data) {
              el.html(data.body);
            }).fail(function(err) {
                console.log(err);
            });



    }).fail(function(err) {
        console.log(err);
    });



});
