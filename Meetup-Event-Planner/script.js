const menuIcon = document.querySelector('.menu-icon');
const panel = document.querySelector('.panel');
const menu = document.querySelector('.menu');
menuIcon.addEventListener('click', function () {
  panel.classList.toggle('show-menu');
  menu.classList.toggle('active');
});

/*
* Submit Code for Account
*/
const submitAccount = document.querySelector('#create-account-form button.submit');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const notification = document.querySelector('.notification');
if (submitAccount !== null ) {
  submitAccount.onclick = function () {
    if (name.value === '') {
      name.setCustomValidity('Name is required');
    } else {
      name.setCustomValidity('');
    } 
    
    if (email.value === '') {
      email.setCustomValidity('Email is required');
    } else {
      email.setCustomValidity('');
    }
    
    if (password.value === '') {
      password.setCustomValidity('Password is required');
    } else if (password.value.length < 6 || password.value.length > 25) {
      password.setCustomValidity('Password minimin length is 6');
    } else if (!password.value.match(/[A-Z]/g)) {
      password.setCustomValidity('Please match the strong password criteria');
    } else if (!password.value.match(/[a-z]/g)) {
      password.setCustomValidity('Please match the strong password criteria');
    } else if (!password.value.match(/[0-9]/g)) {
      password.setCustomValidity('Please match the strong password criteria');
    } else {
      password.setCustomValidity('');
    }

    if (name.value !== '' && name.value !== '' && name.value !== '') {
      const user = {
        name: name,
        email: email,
        password: password
      }

      localStorage.setItem('user', user);
    }
    notification.innerHTML = '<div class="success">User account is successfully created.</div>';
    notification.style.display = 'block';
    setTimeout(function(){
      document.querySelector('.success').style.opacity = 1;
    }, 1);    
  }
}

/*
* Submit Code for Event
*/
const submitEvent = document.querySelector('#create-event-form button.submit');
const eventName = document.querySelector('#eventName');
const eventType = document.querySelector('#eventType');
const eventHost = document.querySelector('#eventHost');
const eventStart = document.querySelector('#eventStart');
const eventEnd = document.querySelector('#eventEnd');
const eventGuestList = document.querySelector('#eventGuestList');
const eventLocation = document.querySelector('#eventLocation');
const eventMessage = document.querySelector('#eventMessage');

if (submitEvent !== null) {
  submitEvent.onclick = function () {  

    if (eventName.value === '') {
      eventName.setCustomValidity('Name is required');
    } else {
      eventName.setCustomValidity('');
    }

    if (eventType.value === '') {
      eventType.setCustomValidity('Event Type is required');
    } else {
      eventType.setCustomValidity('');
    }

    if (eventHost.value === '') {
      eventHost.setCustomValidity('Event Host is required');
    } else {
      eventHost.setCustomValidity('');
    }  
    
    if (eventStart.value === '') {
      eventStart.setCustomValidity('Event Start date and time is required');
    } else {
      eventStart.setCustomValidity('');
    }    
    
    if (eventEnd.value === '') {
      eventEnd.setCustomValidity('Event End date and time is required');
    } else {
      eventEnd.setCustomValidity('');
    }  
    
    if (eventGuestList.value === '') {
      eventGuestList.setCustomValidity('Guest List is required');
    } else {
      eventGuestList.setCustomValidity('');
    }   
    
    if (eventLocation.value === '') {
      eventLocation.setCustomValidity('Location is required');
    } else {
      eventLocation.setCustomValidity('');
    }  
    
    if (eventLocation.value === '') {
      eventLocation.setCustomValidity('Location is required');
    } else {
      eventLocation.setCustomValidity('');
    }  
    
  }
}

var placeSearch, autocomplete;

function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(eventLocation),
    { types: ['geocode'] });
}


function initGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
};

function errorCallback() { }

function successCallback(position) {
  var mapUrl = "http://maps.google.com/maps/api/staticmap?center=";
  mapUrl = mapUrl + position.coords.latitude + ',' + position.coords.longitude;
  mapUrl = mapUrl + '&zoom=15&size=512x512&maptype=roadmap&sensor=false';
  var imgElement = document.getElementById("static-map");
  imgElement.src = mapUrl;
}
