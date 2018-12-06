$(document).ready(function () {

    var topics = ["basketball", "football", "soccer", "mma", "hockey"]
    localStorage.getItem("topics");

    function renderButtons() {
        for (var i = 0; i < topics.length; i++) {
            var button = $("<button>");
            button.addClass("btn btn-primary topic");
            button.text(topics[i]);
            $(".buttons").append(button);
        }
    }

    $(".submit").on("click", function () {
        $(".buttons").empty();
        event.preventDefault();
        topics.push($("#add-topic").val().trim());
        renderButtons();
    })

    $(document).on("click", ".topic", function () {
        $(".display").empty();
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $(this).text() + "&api_key=Ig97Ln5sSfkudRTNHGujt1BpG3WxVTSi&limit=10"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var item = $("<span>")
                var giphy = $("<img>");
                giphy.addClass("giphy");
                giphy.attr("src", results[i].images.fixed_height_still.url);
                giphy.attr("data-state", "still");
                giphy.attr("data-still", results[i].images.fixed_height_still.url);
                giphy.attr("data-animate", results[i].images.fixed_height.url);
                item.append(giphy);
                var rating = $("<p>");
                rating.text("Rating: " + results[i].rating);
                item.prepend(rating);
                $(".display").prepend(item);
            }

        })
        $(document).on("click", ".giphy", function () {
            state = $(this).attr("data-state");
            console.log($(this).attr("data-still"))
            console.log($(this).attr("data-animate"));
            console.log($(this).attr("data-state"));
            if (state == "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else if (state == "animate") {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })

    });

    renderButtons();
})