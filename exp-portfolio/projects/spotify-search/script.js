console.log("Sanity check");
(function () {
    var submitButton = $(".submit-button");
    // var textResults = $(".textResults");
    var nextUrl = "";
    var userInput;
    var dropdownInput;
    var resultsContainer = $(".results-container");
    // console.log("resultsContainer: ", resultsContainer);

    submitButton.on("click", function () {
        userInput = $('input[name="search"]').val();
        dropdownInput = $(".artist-or-album").val();

        $.ajax({
            url: "https://spicedify.herokuapp.com/spotify",
            data: {
                q: userInput,
                type: dropdownInput,
            },
            success: function (payload) {
                // render 3 things on screen: external urls, images, name
                // look at incremental search exercise to find out how to run over the object
                payload = payload.artists || payload.albums;
                // console.log("payload: ", payload);
                setNextUrl(payload.next);

                console.log(location); //infos about url. the value "search" is the query string itself

                if (location.search.indexOf("scroll=infinite") > -1) {
                    //it is going to return the index of
                    console.log("SCroll = Infinite");
                    checkScrollPosition();

                    // hide the more button
                    // turn on the infinite scroll
                }

                resultsContainer.html(getResultsHTML(payload));

                // console.log("nextUrl: ", nextUrl);
                setNextUrl(payload.next);
            }, // closes success
        }); // closes ajax
        // clicking on "more" button will send the second ajax to the proxy
        // the second ajax is made to the "next" url in the payload. It is a spotify url, so we have to spicify it, modify it
        // if payload.next == null than hide the more button
    }); // closes click

    $(document).on("click", ".more-button", function () {
        $.ajax({
            url: nextUrl,

            success: function (payload) {
                payload = payload.artists || payload.albums;
                setNextUrl(payload.next);
                resultsContainer.append(getResultsHTML(payload));

                console.log("nextUrl: ", nextUrl);
            }, // closes success
        }); // closes ajax
    }); // closes click

    function setNextUrl(next) {
        if (next) {
            nextUrl = next.replace(
                "https://api.spotify.com/v1/search",
                "https://spicedify.herokuapp.com/spotify"
            );
        }
        // i could also add here the logic for determining whether or not the more buttun
    }

    function getResultsHTML(payload) {
        console.log("payload:", payload);
        var nameResult = "";
        for (var i = 0; i < payload.items.length; i++) {
            if (payload.items[i].images.length > 0) {
                var img = payload.items[i].images[0].url;
            } else {
                img =
                    "https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png";
            }

            nameResult +=
                "<div class='music-result'><img class='img' src='" +
                img +
                "'/>" +
                "<div class='link'><a href='" +
                payload.items[i].external_urls.spotify +
                "'>" +
                payload.items[i].name +
                "</a></div></div>";
        }
        nameResult +=
            "<button class='more-button' type='button'>More results</button>";
        var moreButton = $(".more-button");
        moreButton.fadeOut();
        return nameResult;
    }
    function checkScrollPosition() {
        setTimeout(function () {
            if (
                // $(window).height() + $(document).scrollTop() ===
                // $(document).height
                $(window).height() + $(document).scrollTop() >=
                $(document).height() - 200
            ) {
                $.ajax({
                    url: nextUrl,
                    success: function (payload) {
                        payload = payload.artists || payload.albums;
                        setNextUrl(payload.next);
                        resultsContainer.append(getResultsHTML(payload));
                        checkScrollPosition();
                    }, // closes success
                }); //closes ajax
            } else {
                var img =
                    "https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png";
                // if user is NOT scrolled down
                checkScrollPosition();
            }
        }, 500);
    }
})(); //closes iife
