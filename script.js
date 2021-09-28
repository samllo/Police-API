//https://data.police.uk/api/crimes-street-dates

/*
$(document).ready(function() {
  //Start get - URI and callback function
  // URI needs to start with http if you are on http - but my browser defaults to https
  var burglarycount = 0;
  var asbocount = 0;
  var bikecount = 0;
  var arsoncount = 0;
var violentcrime = 0;
  $.get("https://data.police.uk/api/crimes-at-location?date=2017-02&lat=52.629729&lng=-1.131592", function(crimes) {
    // Define what the function does
    //tracks is made into Jquery object, .each loops through, performs new function
    // Start 'for each' loop. Run function naming variable 'crime' and index as 'index'
    $(crimes).each(function(index, crime) {
      //Use console log to show crime name
      console.log(crime);
      if (crime.category == 'burglary') {
        burglarycount = burglarycount + 1
      };
      if (crime.category == 'criminal-damage-arson') {
        arsoncount = arsoncount + 1
      };
      if (crime.category == 'anti-social-behaviour') {
        asbocount = asbocount + 1
      };
      if (crime.category == 'bicyle-theft') {
        bikecount = bikecount + 1
      };
      if (crime.category == 'violent-crime') {
        violentcrime = violentcrime + 1
      };
      
      // there's a second URL with crime outcome details, e.g. 
      // http://data.police.uk/api/outcomes-for-crime/eb643ba6cd4ea4d2630ac1ad6b8b42036faafee3a45767128110765de04d8f3c
      // .crimes is class="crimes" - target as jquery object
      $('.crimes').append($('<tr class="row"><td><a href="http://data.police.uk/api/outcomes-for-crime/' + crime.persistent_id + '">' + crime.category + '</a></td><td>' + crime.location.latitude + "," + crime.location.longitude + '</td>' + '<td>' + crime.location.street.name + '</td>' + '<td>' + crime.persistent_id + '</td><td>' + crime.month.split('-')[1] + '</td></tr>'));
      $('td.burglary b').text(burglarycount);
      $('td.violent b').text(violentcrime);
      $('td.asbo b').text(asbocount);
      $('td.bike b').text(bikecount);
      $('td.arson b').text(arsoncount);
    }); //Close function
  }); //Close get

}); //Close document ready

*/


/*
$.ajax({
  url: url,
  type: "GET",
  dataType: "json"}
  */

let map;

let userLatLong

function initAutocomplete(){

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 54.0840, lng: -2.8594 },
    zoom: 6,
    mapTypeId: "roadmap",
  });
  
  map.setOptions({draggableCursor:'crosshair'});// set cursor
  // Configure the click listener.
  map.addListener("click", (mapsMouseEvent) => {
    
  userLatLong = (mapsMouseEvent.latLng.toJSON());

  console.log(userLatLong)

  var userlat= userLatLong.lng;
  console.log(userlat);

  });


  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
 
  const input = document.getElementById("pac-input");
 const searchBox = new google.maps.places.SearchBox(input);
 
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

}



