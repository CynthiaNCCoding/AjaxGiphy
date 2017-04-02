var buttonDiv = $("#button-div");
var gifDiv = $("#gif-div");
var buttonItems = ["Porsche", "Bugatti", "Pagani", "Prius", "BMW", "Mercedes", "Yugo"];
var carInput = $("#-input");

for ( var i = 0; i < buttonItems.length; i++) {
  var button = $("<button>").text(buttonItems[i]).val(buttonItems[i]).addClass("car-btn");
  
  $(buttonDiv).append(button);


};

$("#add-car").click(function(event) {

    event.preventDefault()
    buttonItems.push(carInput.value);
    var button = $("<button>").text(carInput.val()).val(carInput.val()).addClass("car-btn");
    $(buttonDiv).append(button);
    $(button).click(function() {
      getGiphy(this.value)
    })

});

$('.car-btn').click(function() {
  getGiphy(this.value)
})

function getGiphy(car) {
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        car + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
       url: queryURL,
       method: "GET"
    })

    .done(function(response) {
      console.log(response)
        var results = response.data;
        var carDivContainer = $("<div>");
        for( var i = 0; i<results.length; i++) {
          var carDiv = $("<div>");
          var p = $("<p>").text("Rating: " + results[i].rating);
          var carImage = $("<img>");
          carImage.attr("src", results[i].images.fixed_height_still.url);
          carImage.attr("data-still", results[i].images.fixed_height_still.url);
          carImage.attr("data-animate", results[i].images.fixed_height.url);
          carImage.attr("data-state", "still");
          carDiv.append(p);
          carDiv.append(carImage);
          carDivContainer.append(carDiv);

        }
        $("#gif-div").html(carDivContainer);

        $("img").click(function() {
          var state = $(this).attr("data-state");

          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          };

        })

    })

  // construct query string with rapper
  // make ajax call
}






