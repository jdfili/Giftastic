$(document).ready(function () {

    var topics = ["basketball", "football", "soccer", "mma", "hockey"]

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
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $(this).text() + "&api_key=Ig97Ln5sSfkudRTNHGujt1BpG3WxVTSi&limit=10"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            $(".display").empty();
            console.log(results)
            console.log(results[0].images.fixed_height.url)
            console.log(results[0].rating)
            for (var i = 0; i < results.length; i++) {
                var item = $("<div>")
                var giphy = $("<img>");
                giphy.attr("src", results[i].images.fixed_height.url);
                item.append(giphy);
                var rating = $("<p>");
                rating.text("Rating: " + results[i].rating);
                item.prepend(rating);
                $(".display").prepend(item);
            }

        })
    });

    renderButtons();
})