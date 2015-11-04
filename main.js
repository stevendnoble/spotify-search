// wait for DOM to load before running JS
$(document).ready(function() {

  // check to make sure JS is loaded
  console.log('JS is loaded!');
  
  // your code here
  $('#search').on('submit', function(event) {
  	event.preventDefault();
  	$('#results').empty();

  	var searchedTrack = $('#track').val();
  	var url = 'https://api.spotify.com/v1/search?q=' + searchedTrack + '&type=track';

		$.get(url, function (data) {

			console.log(data.tracks.items);
			var trackResults = data.tracks.items;

			trackResults.forEach(function (track) {
				var $row = $('<div class="row"></div>');
				var $col3 = $('<div class="col-md-3"></div>');
				var $col9 = $('<div class="col-md-9"></div>');

				if(track.preview_url) {
					var $track = $('<a target="_blank" href="' + track.preview_url + '""></a>');
					$col3.append($track);
					// console.log(track.preview_url);
				}
				if(track.album.images) {
					$track.append('<img src=' + track.album.images[2].url + '>');
				}
				$col9.append('<p class="artist">' + track.artists[0].name + '</p>');
				$col9.append('<p>' + track.album.name + '</p>');
				$col9.append('<p>' + track.name + '</p><br>');
				$row.append($col3);
				$row.append($col9);
				$('#results').append($row);
				// console.log(track.name);
				// console.log(track.album.images[0].url);
			});
		});
  });


});