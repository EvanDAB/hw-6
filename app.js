var topics = ['basketball', 'baseball', 'football', 'esports', 'hockey'];
var button, requestUrl, image, gifAnimate, gifDisplay;
for (var game in topics) {
    button = $('<button>').text(topics[game]);
    button.addClass('buttons');
    $('#myButtons').append(button);    
}

function getGifs() {
    $.ajax({
        url: requestUrl,
        cache: false
    })
    .then(function(response){
        console.log(response);
        var imgContainer = $('<span>').addClass('container');
        for(var i=0; i<response.data.length; i++) {
            console.log('IMAGE DATA: ' + response.data[i].images.original_still.url);
            var caption = response.data[i].rating;
            console.log(caption);
            var cpDisplay = $('<div>').text("Rating :" + caption).addClass('rating');
            var image = $('<img>').addClass('gifs').attr({
                "src" : response.data[i].images.original_still.url, 
                "data-state": 'still', 
                "data-still": response.data[i].images.original_still.url,
                "data-animate": response.data[i].images.original.url
            });           
            gifDisplay.append(imgContainer);
            imgContainer.append(image.css({'width': '200px', 'height': '200px'}));            
        }
        $('.gifs').wrap('<div class = image></div>'); 
        $('.image').wrapInner(cpDisplay);

    });
}

$('#addGame').on('click', function () { 
    var  newGame = $('#user-input').val();
    topics.push(newGame);
    button = $('<button>').text(newGame);
    button.addClass('buttons');
    $('#myButtons').append(button);     
});


$(document).on('click', '.buttons', function() {
    var selection = $(this).text();
    var limit = 10;
    requestUrl = "https://api.giphy.com/v1/gifs/search?api_key=DAzntdJCGDlaU1ZeayhjLaYOQx9ODvgM&q=" + selection + "&limit="+ limit + "&offset=0&rating=G&lang=en";
    gifDisplay = $('#gifs');
    if (gifDisplay != "") gifDisplay.text('');
    console.log(selection);
    console.log(requestUrl);
    for(var i=0; i<1; i++){
        getGifs();
    }
});


$(document).on('click', '.gifs', function() {
    event.preventDefault;
    var gifChange = $(this).attr('data-state');
    if(gifChange == 'still') {
        console.log('hey');
        $(this).attr('data-state', 'animate');
        $(this).attr('src', $(this).attr("data-animate"));
        console.log($(this).attr('data-state'));
    } else if (gifChange == 'animate') {
        console.log('hey');
        $(this).attr('data-state', 'still');
        $(this).attr('src', $(this).attr("data-still"));
        console.log($(this).attr('data-state'));
    }
});

