console.log($);
(function (countries) {
    //Declare the array which im passing to the EFI
    // I use a EFI to keep all my variables at local scope
    console.log(countries);

    var inputField = $('input[name="search"]'); // get info by var name
    console.log("Input Field: ", inputField);

    var resultsContainer = $(".results-container");
    console.log("Results container: ", resultsContainer);

    inputField.on("input", function () {
        console.log("input event is firing!");

        var inputValue = inputField.val(); //It tells us what the user types
        console.log("inputValues: ", inputValue);

        function makeRequest() {
            var current = inputValue;
            console.log("inputValues: ", inputValue);

            $.ajax({
                url: " https://spicedworld.herokuapp.com/",
                data: {
                    q: inputValue, //im hard coding the letter a. we want to change it and  put here whatever the user types in the input field
                },
                success: function (response) {
                    // we have to compare the current value of the input field to the value we put into the ajax
                    // if they are not equal they need to be discarded
                    if (current == inputValue) {
                        var countriesHtml = "";
                        for (var i = 0; i < response.length; i++) {
                            console.log("results; ", i);
                            countriesHtml +=
                                "<p class='country'>" + response[i] + "<p>";
                        }
                        // check if the results box is empty
                        if (response.length == 0) {
                            countriesHtml = "No results";
                        }
                        resultsContainer.html(countriesHtml);
                    }
                    console.log("response: ", response);
                },
            });
        }
        setTimeout(makeRequest, 250);
    }); // closes input event

    function highlight(selected) {
        selected.css({
            backgroundColor: "steelblue",
            color: "#f3f3f3",
            textDecoration: "underline",
        });
    }

    function lowlight(selected) {
        selected.css({
            backgroundColor: "transparent",
            color: "black",
            textDecoration: "none",
        });
    }
    // highlight results upon hover
    resultsContainer.on("mouseenter", "p", function () {
        event.preventDefault();
        highlight($(this));
    });

    // Stop highlighting on mouseleave
    resultsContainer.on("mouseleave", "p", function () {
        lowlight($(this));
    });
})();
