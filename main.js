var key = ':kSqerfIfoni4ApNhSqAtHqJZHGNXh6SLOlTUO/8j5aM';
var searchURL = 'https://api.datamarket.azure.com/Bing/Search/v1/Composite?Sources=%27web%27&Query=%27';

	$('input').on('keyup', function (evt) {
			getResults($(this).val());		
	});

	function getResults(query) {
		var q = query;
		var url = searchURL + q + '%27';

		$.ajax({
			url: url,
			dataType: 'json',

			//had to encode the key to Base64 to pass the authentication
			headers:{
	            'Authorization': 'Basic OmtTcWVyZklmb25pNEFwTmhTcUF0SHFKWkhHTlhoNlNMT2xUVU8vOGo1YU0='
	        },
		}).done(function(response){
			render(response.d.results[0].Web);
			//console.log(response.d.results[0].Web);
			
		});
	}

function render(Web) {
	var suggestions = $('.suggestions');
	suggestions.empty();
	for(var i = 0; i < Web.length; i++){
		//console.log(Web[i]);
		suggestions.append(createSuggestionHTML(Web[i]));
	}
}

function createSuggestionHTML(Web){
	var suggestionString = '<div id="description">' + Web.Title  +'</div>';

	// var suggestionLink = '<a href = ' + '"' + Web.Url + '" ' + 'target = "_blank"' + 
	// 						suggestionString + '</a>'; 
	 
	var suggestionLink = $(suggestionString);
	suggestionLink.click(function(){
		window.open(Web.Url, "Web.Title");
	});

	suggestionLink.mouseover(function() {
	    $( this ).css({
	    	'background-color': '#ade6d8',
	    	'cursor' : 'pointer'
	    })
  	});

  	suggestionLink.mouseout(function() {
    	$( this ).css({
	    	'background-color': 'white',
	    	'cursor' : 'pointer'
	    })
  	});

	return suggestionLink;
}


