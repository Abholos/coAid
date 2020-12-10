//Vissarion start
//MAP SCRIPT

var map;
function initMap() {
   //Contructor creates a new map - only center and zoom required
   map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 37.96639, lng: 23.73513 },
      zoom: 13
   });

   //Test marker
   var acropolis = { lat: 37.97157, lng: 23.72582 };
   var marker = new google.maps.Marker({
      position: acropolis,
      map: map,
      title: "Acropolis - Test Marker"
   });

   //Array of markers
   var markers = [
      { lat: 38.00335152618623, lng: 23.74245093801985 },
      { lat: 38.02189450633734, lng: 23.747306768389443 },
   ];

   //iterate markers array
   for (var i = 0; i < markers.length; i++) {
      addMarker(markers[i]);
   }

   //Add marker function
   function addMarker(coords, contentInfo) {
      var marker = new google.maps.Marker({
         position: coords,
         content: contentInfo,
         map: map
      });

      var infowindow = new google.maps.InfoWindow({
         content: contentInfo
      });

      //marker listener
      marker.addListener("click", () => {
         infowindow.open(map, marker);
      });

      //ADD NEW MARKER Functionality
      var addEvent = document.getElementById("addEventModalID");

      console.log(infowindow);
      addEvent.onclick = () => {
         var latitude = document.getElementById("eventLat").value;
         var longtitude = document.getElementById("eventLong").value;

         //adds the coords to the markers array
         markers.push({ lat: parseFloat(latitude), lng: parseFloat(longtitude) });

         //fill the info window from user input (add event modal)
         var eventName = document.getElementById("eventName").value;
         var eventDate = document.getElementById("eventDate").value;
         var eventDescription = document.getElementById("eventDescription").value;
         var donate = document.getElementById("radioYes");
         var donateNo = document.getElementById("radioNo");

         contentInfo = `<h5> ${eventName} </h5><br>
                        <div><strong>${marker.getPosition()}</strong></div><br>
                        <div>Day: ${eventDate}<div><br>
                        <div>Info: ${eventDescription}<div><br>
                        <a href="./contactus.html" target="_blank">Ask for help!</a><br><br>
                        <div>${donation()}</div>`
         console.log(contentInfo);


         function donation() {
            if (donate.checked) {
               return `<input type="button" id="donateButton" class="btn btn-info btn-block" value="Donate" data-toggle="modal" data-target="#donateModalID">`;
            } else if (donateNo.checked) {
               return `<p class="badge badge-danger">Donations are closed for this event</p>`;
            }
         }
         console.log(markers);
         addMarker(markers[markers.length - 1], contentInfo); //adds the new marker to the map
      }
   }
}


//  Donate Radio Modal VIEW script
var radiosField = document.getElementById("rField");
var myRadioNo = document.getElementById("radioNo");
var donation = document.getElementById("donationID");

radiosField.onclick = () => {
   if (myRadioNo.checked) {
      donation.style.display = "none";
   } else {
      donation.style.display = "block";
   }
}