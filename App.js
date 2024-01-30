 var showDetails = 0;

      document.getElementById('show-details-box').style.display = 'none';  
      document.getElementById('no-route').style.display = 'none';  

      const initMap = () => {
        var mapProp= {
          center:new google.maps.LatLng(-33.8688, 151.2093),
          zoom:10,
        };

        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();
       
        var map = new google.maps.Map(document.getElementById("google-map"),mapProp);
        directionsRenderer.setMap(map);

        var origin = document.getElementById('origin-add');
        var autocompleteOrigin = new google.maps.places.Autocomplete(origin);

        var dest = document.getElementById('dest-add');
        var autocompleteDest = new google.maps.places.Autocomplete(dest);

        console.log(autocompleteOrigin, autocompleteDest)

        autocompleteOrigin.addListener('place_changed', function () {
          var place = autocompleteOrigin.getPlace();

          console.log(place)
          console.log(document.getElementById('origin-add').value)

        });

        document.getElementById('show-route-btn').addEventListener('click', () => {
          var placeOrigin = autocompleteOrigin.getPlace();
          console.log(placeOrigin)
          var placeDest = autocompleteDest.getPlace();
          console.log(placeDest)

          var start = document.getElementById('origin-add').value;
          var end = document.getElementById('dest-add').value;
          var selectedMode = "DRIVING";
          console.log(selectedMode);
          
          var request = {
            origin: start,
            destination: end,
            travelMode: selectedMode
          };
          directionsService.route(request, (result, status) => {
            if (status == 'OK') {
              console.log(result)
              directionsRenderer.setDirections(result);
              document.getElementById('show-details-box').style.display = 'none';  
              document.getElementById('no-route').style.display = 'none';  
            } else {          
              directionsRenderer.setDirections({routes: []});
              document.getElementById('show-details-box').style.display = 'none';  
              document.getElementById('no-route').style.display = 'block';  
            }
          });
        });
      }

      window.initMap = initMap;