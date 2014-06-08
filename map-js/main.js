//Useful links:
// http://code.google.com/apis/maps/documentation/javascript/reference.html#Marker
// http://code.google.com/apis/maps/documentation/javascript/services.html#Geocoding
// http://jqueryui.com/demos/autocomplete/#remote-with-cache

		

function updateMap(selectlocation){
		switch(selectlocation){
			case'loc0':
			var latLng = new google.maps.LatLng(50,10)
			break;
			case'loc1':
			var latLng = new google.maps.LatLng(52.370216,4.895168)
			break;
			case'loc2':
			var latLng = new google.maps.LatLng(39.904030 ,116.407526)
			break;
			case'loc3':
			var latLng = new google.maps.LatLng(52.520007 , 13.404954)
			break;
			case'loc4':
			var latLng = new google.maps.LatLng(50.850000 , 4.35)
			break;
			case'loc5':
			var latLng = new google.maps.LatLng(41.878114 , -87.629798)
			break;
			case'loc6':
			var latLng = new google.maps.LatLng(6.927079 , 79.861243)
			break;
			case'loc7':
			var latLng = new google.maps.LatLng(42.331427 , -83.045754)
			break;
			case'loc8':
			var latLng = new google.maps.LatLng(22.396428 , 114.109497)
			break;
			case'loc9':
			var latLng = new google.maps.LatLng(40.416775 , -3.70379)
			break;
			case'loc10':
			var latLng = new google.maps.LatLng(19.075984 , 72.877656)
			break;
			case'loc11':
			var latLng = new google.maps.LatLng(28.635308 , 77.22496)
			break;
			case'loc12':
			var latLng = new google.maps.LatLng(40.705631 , -73.978003)
			break;
			case'loc13':
			var latLng = new google.maps.LatLng(41.872389 , 12.48018)
			break;
			case'loc14':
			var latLng = new google.maps.LatLng(1.352083 , 103.819836)
		}
		initialize(latLng);
	}    
 

      
var geocoder;
var map;
var marker1;
var marker2;
var directionDisplay;
var directionsService = new google.maps.DirectionsService();

    
function initialize(schoolLatLng){
	directionsDisplay = new google.maps.DirectionsRenderer();
	 var myLatLng = schoolLatLng;
			var options = {
          zoom: 13,
          center: myLatLng,
          
        };
        
  map = new google.maps.Map(document.getElementById("map-canvas"), options);
  directionsDisplay.setMap(map);
  
        

  geocoder = new google.maps.Geocoder();
  var image1 = 'http://foxhouze.com/backup/durban/from.png';    
  marker1 = new google.maps.Marker({
    map: map,
    draggable: true,
	icon: image1
	
  });
  var image2 = 'http://foxhouze.com/backup/durban/to.png';
  marker2 = new google.maps.Marker({
    map: map,
    draggable: true,
	icon: image2
  });
				
}
function calcRoute() {
	var start = document.getElementById("address").value;
	var end = document.getElementById("to").value;
	var distanceInput = document.getElementById("distance");
	var request = {
				origin:start, 
				destination:end,
				travelMode: google.maps.DirectionsTravelMode.DRIVING
			};
			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
					distanceInput.value = response.routes[0].legs[0].distance.value / 1000 + " Km";
				}
			});
			
	}
		
$(document).ready(function() { 
         
  initialize();
				  
  $(function() {
    $("#address").autocomplete({

      source: function(request, response) {
        geocoder.geocode( {	'address': request.term }, function(results, status) {
          response($.map(results, function(item) {
            return {
              label:  item.formatted_address,
              value: item.formatted_address,
              latitude: item.geometry.location.lat(),
              longitude: item.geometry.location.lng()
            }
          }));
        })
      },

      select: function hi(event, ui) {
        $("#latitude").val(ui.item.latitude);
        $("#longitude").val(ui.item.longitude);
        var location1 = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
        marker1.setPosition(location1);
        map.setCenter(location1);
		
		map.setZoom(7);
		
		
		marker1.setAnimation(google.maps.Animation.DROP);
      }
    }); 

	$("#to").autocomplete({
source: function(request, response)
{
geocoder.geocode( {	'address': request.term }, function(results2, status2) {
          response($.map(results2, function(item) {
return {
              label:  item.formatted_address,
              value: item.formatted_address,
              latitude2: item.geometry.location.lat(),
              longitude2: item.geometry.location.lng()
            }
 }));	
}) 
},

select: function hi(event, ui) {
        $("#latitude1").val(ui.item.latitude2);
        $("#longitude1").val(ui.item.longitude2);
        var location1 = new google.maps.LatLng(ui.item.latitude2, ui.item.longitude2);
        marker2.setPosition(location1);
        map.setCenter(location1);
		
		map.setZoom(7);
		
		
		marker1.setAnimation(google.maps.Animation.DROP);
	
		 }
    });
  //above this
  });
	

  google.maps.event.addListener(marker1, 'drag', function() {
    geocoder.geocode({'latLng': marker1.getPosition()}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          $('#address').val(results[0].formatted_address);
          $('#latitude').val(marker1.getPosition().lat());
          $('#longitude').val(marker1.getPosition().lng());
        }
      }
    });
  });
  //my code
    google.maps.event.addListener(marker2, 'drag', function() {
  geocoder.geocode({'latLng': marker2.getPosition()}, function(results2, status2) {
  if (status2 == google.maps.GeocoderStatus.OK) {
  if (results2[0]) {
          $('#to').val(results2[0].formatted_address);
          $('#latitude1').val(marker2.getPosition().lat());
          $('#longitude1').val(marker2.getPosition().lng());
        }
      }
    });
  });
  //above
  var worldBounds = new google.maps.LatLngBounds(new google.maps.LatLng(-20,-10),
                                               new google.maps.LatLng(20,-10));//(20,-10)
    map.fitBounds(worldBounds);
  
});
