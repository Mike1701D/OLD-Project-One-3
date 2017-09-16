$(document).ready(function() {
    // Make Dog Array -- Make newDogClick variable -- Make startGif variable
    var dogs = ["Goodfellas", "Casino", "Captain Phillips", "The Wolf of Wall Street", "Philomena", "Fighting For Freedom"];
    var newDogClick;
    var startGif = 0;

    // Create Start Button Function
    function renderButtonsZero() {
        $("#dog-buttons").empty();
        for (var i = 0; i < dogs.length; i++) {
            var a = $("<button>");
            a.addClass("createDogGifs");
            a.data("dogs", dogs[i]);
            a.text(dogs[i]);
            $("#dog-buttons").append(a);
        }
    }

    // Listen for Button Clicks and Download Gif
    $(document).on("click", ".createDogGifs", function() {
        $("#dog-gallery").empty();
        $("#dog-gallery").append("<h2>" + newDogClick +"<h2>");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            encodeURI(newDogClick) + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g";
        $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                for (var j = 0; j < response.data.length; j++) {
                    var gifDiv = $("<h2>");
                    var img = $("<img>");
                    $(gifDiv).addClass("Canvas <h2>");
                    $(img).attr("src", response.data[j].images.fixed_width_still.url);
                    $(img).data("giphyData", response.data[j]);
                    $(img).addClass("Start");
                    $(gifDiv).append(img);
                    $("#dog-gallery").append(gifDiv);
                }
            });
        console.log(queryURL);
    });

    // Use startGif variable to track binary status of Gifs
    $(document).on("click", ".Start", function() {
        if (startGif === 0) {
          startGif = 1;
          $(this).attr("src", $(this).data("giphyData").images.fixed_width.url);
          return;
        }

        if (startGif === 1) {
            $(this).attr("src", $(this).data("giphyData").images.fixed_width_still.url);
            startGif = 0;
        }
       
    });

    renderButtonsZero();

 


});