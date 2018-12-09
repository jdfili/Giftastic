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
        $(".topic").remove();
        event.preventDefault();
        topics.push($("#add-topic").val().trim());
        renderButtons();
    })

    $(".edit").on("click", function () {
        if (!$(".edit").hasClass("active")) {
            $(".edit").addClass("active");
        }
        else if ($(".edit").hasClass("active")) {
            $(".edit").removeClass("active")
        }
        if (!$(".topic").hasClass("remove")) {
            $(".topic").removeClass("btn-primary");
            $(".topic").addClass("btn-danger");
            $(".topic").addClass("remove");
        }
        else if ($(".topic").hasClass("remove")) {
            $(".topic").removeClass("btn-danger");
            $(".topic").removeClass("remove");
            $(".topic").addClass("btn-primary");
        }
    })

    $(document).on("click", ".topic", function () {
        if ($(".topic").hasClass("btn-primary")) {
            $(".display").empty();
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).text() + "&api_key=Ig97Ln5sSfkudRTNHGujt1BpG3WxVTSi&limit=10"
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var item = $("<span>")
                    var giphy = $("<img>");
                    giphy.addClass("giphy");
                    giphy.addClass("rounded");
                    giphy.attr("src", results[i].images.fixed_height_still.url);
                    giphy.attr("data-state", "still");
                    giphy.attr("data-still", results[i].images.fixed_height_still.url);
                    giphy.attr("data-animate", results[i].images.fixed_height.url);
                    item.append(giphy);
                    var rating = $("<p>");
                    rating.text("Rating: " + results[i].rating);
                    item.prepend(rating);
                    $(".display").append(item);
                }

                $(".giphy").on("click", function () {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    }
                    else if (state === "animate") {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                })

            })
        }

        if ($(this).hasClass("remove")) {
            topics.splice($(this), 1);
            $(this).remove();
        }
    });

    renderButtons();
})