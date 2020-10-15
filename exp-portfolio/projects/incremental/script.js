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

        var results = [];
        resultsContainer.html("");
        if (inputValue.length == 0) return;
        for (var i = 0; i < countries.length; i++) {
            if (
                countries[i].toLowerCase().indexOf(inputValue.toLowerCase()) === //check if first letter correspond
                0
            ) {
                results.push(countries[i]); // push countries which match the criterias into the array
            } // closes if

            if (results.length === 4) {
                break;
            } // closes if
        } // closes for
        console.log("results: ", results);

        var countriesHtml = "";
        for (i = 0; i < results.length; i++) {
            console.log("results; ", i);
            countriesHtml += "<p class='country'>" + results[i] + "<p>";
        }
        // check if the results box is empty
        if (results.length == 0) {
            countriesHtml = "No results";
        }
        resultsContainer.html(countriesHtml);
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
    resultsContainer.mouseenter(function () {
        highlight(resultsContainer);
    });

    // Stop highlighting on mouseleave
    resultsContainer.mouseleave(function () {
        lowlight(resultsContainer);
    });
})([
    //Closes and calls the EFI
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Côte D'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic People's Republic of Korea",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People’s Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Republic of Korea",
    "Republic of Moldova",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Tajikistan",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United Republic of Tanzania",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Viet Nam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
]);
