//MAP SCRIPT variables - Vissarion start
var geocoder;
var map;
//Array of markers
var markers = [];
var localM = [];
//MAP SCRIPT variables - Vissarion end

//Panos start
$('#myTab a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})


$(document).ready(function () {
  var boxheight = $('#myCarousel .cInner').innerHeight();
  var itemlength = $('#myCarousel').length;
  var triggerheight = Math.round(boxheight / itemlength + 1);
  $('#myCarousel .list-group-item').outerHeight(triggerheight);
});

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

var newDate = new Date();
newDate.setDate(newDate.getDate() + 1);
$('#Date').html(dayNames[newDate.getDay()] + ", " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
//Panos END

//Maria START
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = "<span class='wrap'>" + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type').split(".");
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], toRotate, period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}
//Maria END


//MAP main - Vissrion start
function initMap() {
  var styles = {
    default: [],

    night: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ]
  }


  //Contructor creates a new map - only center and zoom required
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 37.96639, lng: 23.73513 },
    zoom: 11,
    mapTypeControl: false,
    styles: styles[localStorage.getItem('map')],
    //markers: localStorage.getItem('map'),
  });

  //geocoder inst
  geocoder = new google.maps.Geocoder();

  // Add a style-selector control to the map.
  var styleControl = document.getElementById("style-selector-control");
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);


  // Set the map's style to the initial value of the selector.
  var styleSelector = document.getElementById("style-selector");
  //map.setOptions({ styles: styles[styleSelector.value] });

  // Apply new JSON when the user selects a different style.
  styleSelector.addEventListener("change", function () {
    map.setOptions({ styles: styles[styleSelector.value] });
    localStorage.setItem('map', styleSelector.value);
  });


  //Test marker
  // new google.maps.Marker({
  //   position: { lat: 37.97157, lng: 23.72582 },
  //   map: map,
  //   title: "Acropolis - Test Marker"
  // })

  var coords = [
    { lat: 37.99326371499679, lng: 23.735884675423478 },

  ];
  //iterate markers array
  for (var i = 0; i < coords.length; i++) {
    addMarker(coords[i]);
    //add marker and infoWindow to localStorage
    //localStorage[markers] = JSON.stringify(markers);
  }

  //ADD NEW MARKER Functionality
  var addEvent = document.getElementById("addEventModalID");

  //console.log(infowindow);
  addEvent.onclick = function () {
    //var latitude = document.getElementById("eventLat").value;
    //var longtitude = document.getElementById("eventLong").value;
    //markers.push({ lat: parseFloat(latitude), lng: parseFloat(longtitude) });
    geocodeAddress(geocoder, map);
  }
}
//MAP SCRIPT FULL END
//ARIS END
function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById("eventAddress").value;
  //console.log(document.getElementById("address").value);
  geocoder.geocode({ address: address }, function (results, status) {
    if (status === "OK") {
      map.setCenter(results[0].geometry.location);
      addMarker(results[0].geometry.location);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function addMarker(coords) {



  //fill the info window from user input (add event modal)
  var eventName = document.getElementById("eventName").value;
  var eventAddress = document.getElementById("eventAddress").value;
  var eventDate = document.getElementById("eventDate").value;
  var eventDescription = document.getElementById("eventDescription").value;
  var contentInfo = '';

  var marker = new google.maps.Marker({
    position: coords,
    content: contentInfo,
    map: map,
    icon: './images/pinicored2.png'
  });

  contentInfo = "<h5>" + eventName + "</h5><br>" +
    "<div><strong>" + eventAddress + "</strong></div><br>" +
    "<div style='font-size:16px'><strong>Day: </strong>" + eventDate + "<div><br>" +
    "<div style='font-size:16px'><strong>Info: </strong>" + eventDescription + "<div><br>" +
    "<a href='./contactus.html' target='_blank' style='font-size:16px'>Ask for help!</a><br><br>" +
    "<div style='font-size:16px'>" + donation() + "</div>";

  var infowindow = new google.maps.InfoWindow({
    content: contentInfo
  });

  //marker listener
  marker.addListener("click", function () {
    infowindow.open(map, marker);
  });

  markers.push(marker);
  //get localStorage for PINs

  marker.addListener("click", function () {
    infowindow.open(map, marker);

  });

}



function donation() {
  var radiosField = document.getElementById("rField");
  var myRadioNo = document.getElementById("radioNo");
  var donation = document.getElementById("donationID");
  var myRadioYes = document.getElementById("radioYes");
  var accountName = document.getElementById("accountName");
  var iban = document.getElementById("iban");
  var addEventBtn = document.getElementById("addEventModalID");

  radiosField.onclick = function () {


    eblDblAddEventBtn(iban);

    if (myRadioNo.checked) {
      donation.style.display = "none";
      document.getElementById("addEventModalID").disabled = false;
    } else {
      document.getElementById("addEventModalID").disabled = true;
      donation.style.display = "block";
    }

  }

  var donate = document.getElementById("radioYes");
  var donateNo = document.getElementById("radioNo");
  if (donate.checked) {
    return '<input type="button" id="donateButton" class="btn btn-info btn-block" value="Donate" data-toggle="modal" data-target="#donateModalID">';
  } else if (donateNo.checked) {
    return '<p class="badge badge-danger">Donations are closed for this event</p>';
  }
} function eblDblAddEventBtn(element) {
  element.oninput = function () {
    if (!this.validity.valid) {
      //addEventBtn.style.backgroundColor = "red";
      document.getElementById("addEventModalID").disabled = true;
    } else {
      //addEventBtn.style.backgroundColor = "green";
      document.getElementById("addEventModalID").disabled = false;
    }
  }
}

function eblDblAddEventBtn(element) {
  element.oninput = function () {
    if (!this.validity.valid) {
      //addEventBtn.style.backgroundColor = "red";
      document.getElementById("addEventModalID").disabled = true;
    } else {
      //addEventBtn.style.backgroundColor = "green";
      document.getElementById("addEventModalID").disabled = false;
    }
  }
}
//MAP main - Vissarion end



// FORM VALIDATION

var eventNameMod = document.getElementById("eventName");
eventNameMod.oninput = function () {
  if (!this.validity.valid) {
    eventNameMod.style.backgroundImage = "url(./images/exclamation.ico)";
    eventNameMod.style.backgroundRepeat = "no-repeat";
    eventNameMod.style.backgroundPosition = "right center";
    eventNameMod.style.border = "3px solid red";
    eventNameModInfo.innerHTML = "<em>Please use at least 4 characters</em>";
    document.getElementById("addEventModalID").disabled = true;
  } else {
    eventNameMod.style.backgroundImage = "url(./images/tick.ico)";
    eventNameMod.style.backgroundRepeat = "no-repeat";
    eventNameMod.style.backgroundPosition = "right center";
    eventNameMod.style.border = "none";
    eventNameModInfo.style.display = "none";
    document.getElementById("addEventModalID").disabled = false;
  }
}

var eventAddressMod = document.getElementById("eventAddress");
eventAddressMod.oninput = function () {
  if (!this.validity.valid) {
    eventNameMod.style.backgroundImage = "url(./images/exclamation.ico)";
    eventAddressMod.style.backgroundRepeat = "no-repeat";
    eventAddressMod.style.backgroundPosition = "right center";
    eventAddressMod.style.border = "3px solid red";
    eventAddressModInfo.innerHTML = "<em>Please use at least 3 characters</em>";
    document.getElementById("addEventModalID").disabled = true;
  } else {
    eventNameMod.style.backgroundImage = "url(./images/tick.ico)";
    eventAddressMod.style.backgroundRepeat = "no-repeat";
    eventAddressMod.style.backgroundPosition = "right center";
    eventAddressMod.style.border = "none";
    eventAddressModInfo.style.display = "none";
    document.getElementById("addEventModalID").disabled = false;
  }
}

var eventDescriptionMod = document.getElementById("eventDescription");
eventDescriptionMod.oninput = function () {
  if (!this.validity.valid) {
    eventDescriptionMod.style.backgroundImage = "url(./images/exclamation.ico)";
    eventDescriptionMod.style.backgroundRepeat = "no-repeat";
    eventDescriptionMod.style.backgroundPosition = "right top";
    eventDescriptionMod.style.border = "3px solid red";
    eventDescriptionModInfo.innerHTML = "<em>Please use at least 10 characters</em>";
    document.getElementById("addEventModalID").disabled = true;
  } else {
    eventDescriptionMod.style.backgroundImage = "url(./images/tick.ico)";
    eventDescriptionMod.style.backgroundRepeat = "no-repeat";
    eventDescriptionMod.style.backgroundPosition = "right top";
    eventDescriptionMod.style.border = "none";
    eventDescriptionModInfo.style.display = "none";
    document.getElementById("addEventModalID").disabled = false;
  }
}


var eventDateMod = document.getElementById("eventDate");
//getTime() / 1000 + 900 + 330*60
eventDateMod.oninput = function () {
  var eventDateModConv = new Date(document.getElementById("eventDate").value)
  var epochDatePicked = parseInt(eventDateModConv.getTime());
  var epochNow = Date.now();
  //console.log(epochNow);
  //console.log(epochDatePicked);
  if (epochNow > epochDatePicked) {
    eventDateMod.style.backgroundImage = "url(./images/exclamation.ico)";
    eventDateMod.style.backgroundRepeat = "no-repeat";
    eventDateMod.style.backgroundPosition = "right center";
    eventDateMod.style.border = "3px solid red";
    eventDateModInfo.innerHTML = "<em>Please submit an event at least 1 day after today</em>"
    document.getElementById("addEventModalID").disabled = true;
  } else {
    eventDateMod.style.backgroundImage = "url(./images/tick.ico)";
    eventDateMod.style.backgroundRepeat = "no-repeat";
    eventDateMod.style.backgroundPosition = "right center";
    eventDateMod.style.border = "1px solid lightgray";
    eventDateModInfo.style.display = "none";
    document.getElementById("addEventModalID").disabled = false;
  }
}



// var loginPass = document.getElementById("logPassword");



// var signUpEmail = document.getElementById("signEmail");
// var signUpPass = document.getElementById("signPassword");












