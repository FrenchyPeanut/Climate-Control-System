class Simulator {
  constructor(){
    this.valuesToChange = [];
    this.zoneList = ["Outside", "Vent", "Zone-0", "Zone-1", "Zone-2"];
    this.zones = {
      "Outside": {
        "temp": 10,
        "co2": 350
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
        "numPeople": 20
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
      if (zone != "Outside"){
        this.updateTemp(zone, zoneId);
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
    if (this.zones[zone].temp < this.zones["Outside"].temp){
      this.zones[zone].temp = this.zones["Outside"].temp;
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
    if(zone == "Zone-0" || zone == "Zone-1" || zone == "Zone-2"){
      var numPeople = this.zones[zone].numPeople;
      var co2Increase = 2 * numPeople;
      var airIntake = this.zones["Vent"]["damper_in"];
      var co2Decrease = 0.5 * airIntake;
      if (airIntake == 100 && co2Decrease < co2Increase){
        co2Decrease = co2Increase + 50;
      }

      var co2Change = co2Increase - co2Decrease;
      var curCO2 = this.zones[zone].co2;
      curCO2 = curCO2 + co2Change;

      if (curCO2 < this.zones["Outside"].co2){
        curCO2 = this.zones["Outside"].co2;
      }

      var co2SensorId = "co2_sensor_" + zoneId;
      var newZoneCO2 = curCO2;
      this.zones[zone].co2 = newZoneCO2;
      var toPush = {
        "id": co2SensorId,
        "reading": newZoneCO2
      };
      this.valuesToChange.push(toPush);
    } else if (zone == "Vent"){

      var co2SensorId = "co2_sensor_" + zoneId;
      var newZoneCO2 = this.zones[zone].co2;
      var toPush = {
        "id": co2SensorId,
        "reading": newZoneCO2
      };
      this.valuesToChange.push(toPush);
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
