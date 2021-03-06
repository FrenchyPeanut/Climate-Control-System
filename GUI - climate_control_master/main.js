//modal window code//
var modal = new tingle.modal({
  footer: true,
  stickyFooter: false,
  closeMethods: ['overlay', 'button', 'escape'],
  closeLabel: "Close",
  cssClass: ['custom-class-1', 'custom-class-2'],
  onOpen: function() {
    console.log('modal open');
  },
  onClose: function() {
    console.log('modal closed');
  },
  beforeClose: function() {
    // here's goes some logic
    // e.g. save content before closing the modal
    return true; // close the modal
    return false; // nothing happens
  }
});


/* Climate Control Code */

/* Button Set Temperature - Zone 1 */
var buttonZ1 = document.querySelector('.buttonZ1');
//console.log(button);
buttonZ1.addEventListener("click", function() {
  var input = document.querySelector('.inputZ1').value;
  //console.log(input);
  if (input.length == 0) {
    modal.setContent("<h1>Please enter some value</h1>");
    modal.open();
    return;
  }

  if (parseInt(input) >= 30) {
    //alert("Tempereature level too high");
    modal.setContent("<h1>Temperature level too high</h1>");
    modal.open();
    return;
  }
  if (parseInt(input) <= 15) {
    modal.setContent("<h1>Temperature level too low</h1>");
    modal.open();
    return;
  }
  var id = "temp_zone_0"

  var url = 'http://localhost:3001/settings/' + id + "?value=" + input;

  console.log(url);
  /*postData('http://localhost:3000/settings/' + id, {
      value: input
    })
    .then(data => console.log(data)) // JSON from `response.json()` call
    .catch(error => console.error(error))*/

  //function postData(url, data) {
  var data = input;
  fetch(url, {
      //body: data, // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // *manual, follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => response.json())
    .then(response => console.log(response))
  // Default options are marked with *
  //return  // parses response to JSON
});

/* Button Set Temperature - Zone 2 */
var buttonZ2 = document.querySelector('.buttonZ2');
buttonZ2.addEventListener("click", function() {
  var input = document.querySelector('.inputZ2').value;
  //console.log(input);
  if (input.length == 0) {
    modal.setContent("<h1>Please enter some value</h1>");
    modal.open();
    return;
  }
  if (parseInt(input) >= 30) {
    //alert("Tempereature level too high");
    modal.setContent("<h1>Temperature level too high</h1>");
    modal.open();
    return;
  }
  if (parseInt(input) <= 15) {
    modal.setContent("<h1>Temperature level too low</h1>");
    modal.open();
    return;
  }
  var id = "temp_zone_1";
  var url = 'http://localhost:3001/settings/' + id + "?value=" + input;
  console.log(url);
  var data = input;
  fetch(url, {
      //body: data, // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // *manual, follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => response.json())
    .then(response => console.log(response))
});

/* Button Set Temperature - Zone 3 */
var buttonZ3 = document.querySelector('.buttonZ3');
buttonZ3.addEventListener("click", function() {
  var input = document.querySelector('.inputZ3').value;
  //console.log(input);
  if (input.length == 0) {
    modal.setContent("<h1>Please enter some value</h1>");
    modal.open();
    return;
  }
  if (parseInt(input) >= 30) {
    //alert("Tempereature level too high");
    modal.setContent("<h1>Temperature level too high</h1>");
    modal.open();
    return;
  }
  if (parseInt(input) <= 15) {
    modal.setContent("<h1>Temperature level too low</h1>");
    modal.open();
    return;
  }
  var id = "temp_zone_2"
  var url = 'http://localhost:3001/settings/' + id + "?value=" + input;
  console.log(url);
  var data = input;
  fetch(url, {
      //body: data, // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // *manual, follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => response.json())
    .then(response => console.log(response))
});


//var press = document.querySelector('.press');
//var hum = document.querySelector('.hum');
//press.textContent = JSON.parse(json[20].reading) + ' PSI';
//hum.textContent = JSON.parse(json[15].reading) + ' %';

setInterval(() => {
  var hum = document.querySelector('.hum');
  var random_value2 = Math.floor(getRandomArbitrary(10, 55));
  hum.textContent = random_value2 + ' %';
  if (parseInt(hum.textContent) > 50) {
    console.log('humidity too high');
  }
  if (parseInt(hum.textContent) < 20) {
    console.log('humidity too low');
  }
},3000);

var pre = document.querySelector('.press');

setInterval(() => {
  var press = document.querySelector('.press');
  var random_value3 = Math.floor(getRandomArbitrary(3, 60));
  press.textContent = random_value3 + ' PSI';
  if (parseInt(pre.textContent) > 50) {
    console.log('pressure too high');
  }
  if (parseInt(pre.textContent) < 7) {
    console.log('pressure too low');
  }
}, 3000);

/*var buttonP1 = document.querySelector('.buttonP');
//console.log(button);
buttonP1.addEventListener("click", function() {
  var input = document.querySelector('.inputP').value;
  //console.log(input);
  if (input.length == 0) {
    modal.setContent("<h1>Please enter some value</h1>");
    modal.open();
    return;
  }

  var url = 'http://localhost:3001/sudo/zones/Zone-0?numPeople=' + input;
  console.log(url);
  //function postData(url, data) {
  var data = input;
  fetch(url, {
      //body: data, // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // *manual, follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    //.then(response => response.json())
    //.then(response => console.log(response))
  // Default options are marked with *
  //return  // parses response to JSON
}); */

/* Button Set Temperature - Vent */
/*var buttonV = document.querySelector('.buttonV');
buttonV.addEventListener("click", function() {
  var input = document.querySelector('.inputV').value;
  //console.log(input);
  if (input.length == 0) {
    modal.setContent("<h1>Please enter some value</h1>");
    modal.open();
    return;
  }
  if (parseInt(input) >= 30) {
    //alert("Tempereature level too high");
    modal.setContent("<h1>Temperature level too high</h1>");
    modal.open();
    return;
  }
  if (parseInt(input) <= 15) {
    modal.setContent("<h1>Temperature level too low</h1>");
    modal.open();
    return;
  }
  var id = "temp_heat_coil"
  var url = 'http://localhost:3001/settings/' + id + "?value=" + input;
  console.log(url);
  var data = input;
  fetch(url, {
      //body: data, // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // *manual, follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => response.json())
    .then(response => console.log(response))
});
*/


// Adding the code here for the NodeJS api:

/* $.get("http://localhost:3000/temp")
  .done(function(data) {
    alert("Data Loaded: " + data);
  });*/

/*fetch('http://localhost:3000/temp')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    // Parse data
    console.log('parsed json', json)
    // Do stuff:

  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })*/

// Displaying the results here:
// temp.textContent = input + String.fromCharCode(176);
// temp2.textContent = input + String.fromCharCode(176);
//})

var co2_value = document.querySelector('.co2_data');

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/*setInterval(() => {
  var random_value = Math.floor(getRandomArbitrary(200, 250));
  co2_value.textContent = random_value + ' PPM';
  if (parseInt(co2_value.textContent) > 240) {
    console.log('CO2 value too high!!');
  }

}, 5000)*/

var hum = document.querySelector('.hum');

/*setInterval(() => {
  var random_value2 = Math.floor(getRandomArbitrary(10, 55));
  hum.textContent = random_value2 + ' %';
  if (parseInt(hum.textContent) > 50) {
    console.log('humidity too high');
  }
  if (parseInt(hum.textContent) < 20) {
    console.log('humidity too low');
  }
}, 20000);*/

var pre = document.querySelector('.press');

/*setInterval(() => {
  var random_value3 = Math.floor(getRandomArbitrary(3, 60));
  pre.textContent = random_value3 + ' PSI';
  if (parseInt(pre.textContent) > 50) {
    console.log('pressure too high');
  }
  if (parseInt(pre.textContent) < 7) {
    console.log('pressure too low');
  }
}, 10000);*/



// Initializing the allReadings query to the API:
setInterval(() => {

  fetch('http://localhost:3001/allReadings') //fetch('http://45.76.143.202:3000/allReadings')

    .then(function(response) {
      return response.json()
    }).then(function(json) {
      // Parse data
      console.log('parsed json', json);
      // Do stuff:
      //.log('parsed json', json[0].reading);
      var temp = document.querySelector('.temp');
      var temp2 = document.querySelector('.temp2');
      var temp3 = document.querySelector('.temp3');
      //var tempV = document.querySelector('.tempV');

      var co2 = document.querySelector('.co2_data');
      var co22 = document.querySelector('.co2_data2');
      var co23 = document.querySelector('.co2_data3');

      var press = document.querySelector('.press');
      var hum = document.querySelector('.hum');

      temp.textContent = JSON.parse(json[4].reading) + " °C";
      temp2.textContent = JSON.parse(json[8].reading) + " °C";
      temp3.textContent = JSON.parse(json[12].reading) + " °C";
      //tempV.textContent = JSON.parse(json[16].reading)+ " °C";

      co2.textContent = JSON.parse(json[2].reading) + ' PPM';
      co22.textContent = JSON.parse(json[6].reading) + ' PPM';
      co23.textContent = JSON.parse(json[10].reading) + ' PPM';
      if (JSON.parse(json[2].status != "OK")) {
        modal.setContent("<h1>Alert, the CO2 level of Zone 1 is too high!</h1>");
        modal.open();
        return;
      }
      if (JSON.parse(json[6].status != "OK")) {
        modal.setContent("<h1>Alert, the CO2 level of Zone 2 is too high!</h1>");
        modal.open();
        return;
      }
      if (JSON.parse(json[10].status != "OK")) {
        modal.setContent("<h1>Alert, the CO2 level of Zone 3 is too high!</h1>");
        modal.open();
        return;
      }




    }).catch(function(ex) {
      console.log('parsing failed', ex);
      //console.log('parsing failed', response);
    })

}, 3000);
