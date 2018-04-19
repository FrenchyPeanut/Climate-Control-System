// function optimize(){
//   this.valuesToChange = [];
// // CO2 is most important
// // if co2 < what it should be do nothing
// // if co2 is > open dampers

// // pressure
// // lower temperature in boiler

// // zone temperature
// // if all zones are too low, increase boiler temperature
// // if all zones too high, lower boiler temperature/turn on cooler

// // if only one zone too low/high, adjust zoneheater

// // for each of these, if value to hardware changes, add to valuesToChange array.

// }


class optimizer {

  constructor() {
    this.defaultSettings = {
      "fan_zone_0": 0,
      "fan_zone_1": 0,
      "fan_zone_2": 0,
      "temp_zone_0": 0,
      "temp_zone_1": 0,
      "temp_zone_2": 0,
      "co2_zone_0": 0,
      "co2_zone_1": 0,
      "co2_zone_2": 0,
      "damper_in": 0,
      "damper_recycle": 0,
      "damper_out": 0,
      "temp_vent": 0,
      "coil_heat": 0,
      "coil_cool": 0,
      "humidity_level": 0,
      "pressure_boiler": 0
    }
    this.readings = [];
    this.settings = {};
    this.valuesToChange = [];
    this.co2readings = [];
    this.damperReadings = [];
  }


  updateSettings(settings) {
    //console.log(settings);
    this.settings = settings;

  }

  optimize() {
    console.log('Hello World!!!')
    this.valuesToChange = [];
    var values = Object.values(this.defaultSettings);
    var names = Object.keys(this.defaultSettings);
    var updatedSettings = Object.values(this.settings)
    // console.log(updatedSettings);
    //
    // console.log(values);
    // console.log('-----------')
    for (var i = 0; i < values.length; i++) {
      // console.log(values[i])
      // console.log('--------------')
      // console.log(updatedSettings[i]);
      if (values[i] !== updatedSettings[i]) {
        //send signal to monitor to change with names[i]
        var id = names[i];
        //console.log('HEYYYYY!!!')
        //console.log(id);
        if (id === "temp_zone_0") {
          //change the zone_heater_0
          var jsonObj = {
            "id": "zone_heater_0",
            "reading": updatedSettings[i]
          }
          this.valuesToChange.push(jsonObj);
          //this.defaultSettings[i] = this.settings[i];
          this.defaultSettings["temp_zone_0"] = this.settings["temp_zone_0"];

        } else if (id === "temp_zone_1") {
          //change the zone_heater_1
          var jsonObj = {
            "id": "zone_heater_1",
            "reading": updatedSettings[i]
          }
          this.valuesToChange.push(jsonObj);
          this.defaultSettings["temp_zone_1"] = this.settings["temp_zone_1"];
        } else if (id === "temp_zone_2") {
          var jsobObj = {
            "id": "zone_heater_2",
            "reading": updatedSettings[i]
          }
          this.valuesToChange.push(jsobObj)
          this.defaultSettings["temp_zone_2"] = this.settings["temp_zone_2"]
        }

      }
    }

    //co2 part
    console.log(this.co2readings);
    console.log(this.damperReadings);

    this.co2readings.map((readings)=>{
        return readings.reading = 340;
    })

    console.log('check if co2 readings changed or not.')
    console.log(this.co2readings);
    for(var i = 0; i<this.co2readings.length;i++){
      if(this.co2readings[i].reading > 750 && this.co2readings[i].reading < 1000 ) {
       this.damperReadings = this.damperReadings.map((readings)=>{
            if(readings.id === 'damper_in' || readings.id === 'damper_out') {
               readings.reading = 75;
            }
            if(readings.id === 'damper_recycle') {
              readings.reading = 25;
            }

           return readings;
          })
      } else if(this.co2readings[i].reading >= 1200 ) {
        this.damperReadings = this.damperReadings.map((readings)=>{
          if(readings.id === 'damper_in' || readings.id === 'damper_out') {
            readings.reading = 100
          }
          if(readings.id === 'damper_recycle') {
            readings.reading = 0
          }

          return readings;
        })
      } else if(this.co2readings[i].reading < 400) {
        this.damperReadings = this.damperReadings.map((readings)=>{
          if(readings.id === 'damper_in' || readings.id === 'damper_out') {
            readings.reading = 25;
          }
          if(readings.id === 'damper_recycle') {
            readings.reading = 75;
          }

          return readings;
        })
      }
    }
    console.log('---check damper---')
    console.log(this.damperReadings);

    for(var i = 0; i<this.damperReadings.length;i++) {
      var jsonObj = {
        "id": '',
        "reading": ''
      }
      jsonObj["id"] = this.damperReadings[i].id;
      jsonObj["reading"] = this.damperReadings[i].reading;
      this.valuesToChange.push(jsonObj);
    }


    console.log('---check values to change----')
    console.log(this.valuesToChange);
  }


  getMonitorReadings(readings) {
    this.readings = readings;
    //console.log(this.readings);
  }

  getValuesToChange() {
    return this.valuesToChange;
  }

  getCO2readings(readings) {
    this.co2readings = readings;
  }

  getDamperStuff(damperReadings) {
    this.damperReadings = damperReadings;
  }

}



// function updateReadings(readings){
//   this.readings = readings;
// }

// function getValuesToChange(){
//   return this.valuesToChange;
// }


module.exports = optimizer;

  //var valuesToChange = [];
  //var readings = [];
  //var settings = {};

  //function optimize(){
    //this.valuesToChange = [];
  // CO2 is most important
  // if co2 < what it should be do nothing
  // if co2 is > open dampers

  // pressure
  // lower temperature in boiler

  // zone temperature
  // if all zones are too low, increase boiler temperature
  // if all zones too high, lower boiler temperature/turn on cooler

  // if only one zone too low/high, adjust zoneheater

  // for each of these, if value to hardware changes, add to valuesToChange array.

  //}

  // function updateSettings(settings){
  //   this.settings = settings;
  // }
  //
  // function updateReadings(readings){
  //   this.readings = readings;
  // }
  //
  // function getValuesToChange(){
  //   returns this.valuesToChange;
  // }
