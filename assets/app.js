// create an array of  vegetables
var vegetables = ["Celery", "Cucumber", "Corn", "Carrot", "Cabbage"];

// creates buttons for each of these
function makeButtons(){ 
	// deletes the vegetables prior to adding new vegetables so there are no repeat buttons
	$('#buttonsView').empty();
	// loops through the vegetables array
	for (var i = 0; i < vegetables.length; i++){
		// dynamically makes buttons for every veg in the array
		var a = $('<button>') 
		a.addClass('veg'); // add a class
		a.attr('data-name', vegetables[i]); // add a data-attribute
		a.text(vegetables[i]); // make button text
		$('#buttonsView').append(a); // append the button to buttonsView div
	}
}

// handles addveg button event
$("#addveg").on("click", function(){

	// grabs the user veg input
	var veg = $("#veg-input").val().trim();
	// that input is now added to the array
	vegetables.push(veg);
	// the makeButtons function is called, which makes buttons for all my vegetables plus the user veg
	makeButtons()
	
	
	// this line is so users can hit "enter" instead of clicking the submit button
	return false; 
})

// function to display gifs
function displayGifs(){
	var veg = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + veg + "&limit=9&api_key=dc6zaTOxFJmzC";

		// creates ajax call
		$.ajax({url: queryURL, method: "GET"}).done(function (response) {
			console.log(response.data);
			// save results as a variable
			var results = response.data;
			// for loop goes through each gif and adds these variables
			for (var i = 0; i < results.length; i++) {
				// creates a  div to hold the results
				var gifDiv = $('<div>');
				var vegGif = $('<img>');
				    vegGif.attr('src', results[i].images.fixed_height_still.url);
					// vegetable rating on hover
					vegGif.attr('title', "Rating: " + results[i].rating);
					vegGif.attr('data-still', results[i].images.fixed_height_still.url);
					vegGif.attr('data-state', 'still');
				    vegGif.addClass('gif');
					vegGif.attr('data-animate', results[i].images.fixed_height.url);
				// var rating = results[i].rating;
				// var p = $('<p>').text('Rating: ' + rating);
				gifDiv.append(vegGif)
				// gifDiv.append(p)

				$("#gifsView").prepend(gifDiv);
			}
			
		});
}

// function for animating gifs
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying veg gifs
$(document).on("click", ".veg", displayGifs);

// initially calls the makeButtons function
makeButtons();