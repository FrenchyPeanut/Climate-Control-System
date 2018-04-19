class Simulator {
  constructor(){
    this.valuesToChange = [];
    this.zoneList = ["Outside", "Vent", "Zone-0", "Zone-1", "Zone-2"];
    this.zones = {
      "Outside": {
        "temp": 10,
        "co2": 250
      },
      "Vent": {
        "temp": 10,
        "heater": 0,
        "heaterOn": false,
        "cooler": 0,
        "coolerOn": false,
        "damper_in": 50,
        "damper_recycle": 50,
        "damper_out": 50,
        "fan": 100,
        "co2": 250,
      },
      "Zone-0": {
        "temp": 10,
        "heater": 0,
        "heaterOn": false,
        "fan": 100,
        "co2": 250,
        "numPeople": 10
      },
      "Zone-1": {
        "temp": 10,
        "heater": 0,
        "heaterOn": false,
        "fan": 100,
        "co2": 250,
        "numPeople": 10
      },
      "Zone-2": {
        "temp": 10,
        "heater": 0,
        "heaterOn": false,
        "fan": 100,
        "co2": 250,
        "numPeople": 10
      }
    };
  }

  updateHWReadings(hwReadings){
    // console.log(hwReadings);
    for (var i = 0; i < hwReadings.length; i++){
      if (hwReadings[i].type == "Zone-Heater" || hwReadings[i].type == "Heat-Coil"){
        var zone = hwReadings[i].zone;
        var reading = hwReadings[i].reading;
        this.zones[zone].heater = reading;
      }
      else if (hwReadings[i].type == "Cool-Coil"){
        var reading = hwReadings[i].reading;
        this.zones["Vent"].cooler = reading;
      }
      else if (hwReadings[i].type == "Fan"){
        var zone = hwReadings[i].zone;
        var reading = hwReadings[i].reading;
        this.zones[zone].fan = reading;
      }
      else if (hwReadings[i].type == "Damper"){
        var reading = hwReadings[i].reading;
        var id = hwReadings[i].id;
        this.zones["Vent"][id] = reading;
      }
    }
  }

  updateSimulation(){
    this.valuesToChange = [];
    for (var i = 0; i < this.zoneList.length; i++){
      var zone = this.zoneList[i];
      var zoneId = zone.split("-");
      if (zoneId.length == 1){
        zoneId = zoneId[0].toLowerCase();
      } else {
        zoneId = zoneId[1];
      }
      this.updateTemp(zone, zoneId);
      if (zone != "Outside"){
        this.updateCO2(zone, zoneId);
      }
    }
  }

  updateTemp(zone, zoneId){
    if (this.zones[zone].heater < this.zones[zone].temp){
      this.zones[zone].temp -= 0.25;
    } else if (this.zones[zone].heater > this.zones[zone].temp){
      this.zones[zone].temp += 0.25;
    }
    var tempSensorId = "temp_sensor_" + zoneId;
    var newZoneTemp = this.zones[zone].temp;
    var toPush = {
      "id": tempSensorId,
      "reading": newZoneTemp
    };
    this.valuesToChange.push(toPush);
  }

  updateCO2(zone, zoneId){
    // var q = 0.05 * this.zoneList[zone].numPeople; // amount of co2 supplied. 0.05m3/h per person
    // var n = 360; // number of air shifts per hour
    // var vol = 225; // volume of room
    // var e = 2.718;
    // var c0 =
    //
    // var c = (q / (n * vol)) * (1 - Math.pow(e,(- n * t))) + (c0 - ci) * Math.pow(e,(- n * t)) + ci;
    if (this.zones[zone].co2 > 1100){
      this.zones[zone].co2 = getRandomIntInclusive(900, 1100);
    }
    else if (this.zones[zone].co2 > 1000 && this.zone[zone].co2 <= 1100){
      this.zones[zone].co2 = getRandomIntInclusive(800, 1000);
    }
    else if (this.zones[zone].co2 > 800 && this.zone[zone].co2 <= 1000){
      this.zones[zone].co2 = getRandomIntInclusive(700, 1100);
    }
    else if (this.zones[zone].co2 < 800){
      this.zones[zone].co2 = getRandomIntInclusive(500, 800);
    }
    var co2SensorId = "co2_sensor_" + zoneId;
    var newZoneCO2 = this.zones[zone].co2;
    var toPush = {
      "id": co2SensorId,
      "reading": newZoneCO2
    };
    this.valuesToChange.push(toPush);

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }
  }

  getValuesToChange(){
    return this.valuesToChange;
  }
}

module.exports = Simulator;
