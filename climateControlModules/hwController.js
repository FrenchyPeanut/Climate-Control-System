var hwComponent = require('./hwComponent');

class HWController{
  constructor(){
    this.hwComponents = [];
    this.numZones = 3;
  }

  buildHWComponentList(){
    var tempSensorOutside = new hwComponent("Outside", "Temp-Sensor", "temp_sensor_outside");
    this.hwComponents.push(tempSensorOutside);

    for (var i = 0; i < this.numZones; i++){
      var tempSensor = new hwComponent("Zone-" + String(i), "Temp-Sensor", "temp_sensor_" + i);
      var co2Sensor = new hwComponent("Zone-" + String(i), "CO2-Sensor", "co2_sensor_" + i);
      var fan = new hwComponent("Zone-" + String(i), "Fan", "fan_" + i);
      var zoneHeater = new hwComponent("Zone-" + String(i), "Zone-Heater", "zone_heater_" + i);

      this.hwComponents.push(tempSensor);
      this.hwComponents.push(co2Sensor);
      this.hwComponents.push(fan);
      this.hwComponents.push(zoneHeater);
    }
    var heatCoil = new hwComponent("Vent", "Heat-Coil", "heat_coil");
    var coolCoil = new hwComponent("Vent", "Cool-Coil", "cool_coil");
    var humiditySensor = new hwComponent("Vent", "Humidity-Sensor", "humidity_sensor_vent");
    var tempSensorVent = new hwComponent("Vent", "Temp-Sensor", "temp_sensor_vent");
    var pressureSensor = new hwComponent("Boiler", "Pressure-Sensor", "pressure_sensor_boiler");
    var damperIn = new hwComponent("Vent", "Damper", "damper_in");
    var damperRecycle = new hwComponent("Vent", "Damper", "damper_recycle");
    var damperOut = new hwComponent("Vent", "Damper", "damper_out");
    this.hwComponents.push(heatCoil);
    this.hwComponents.push(coolCoil);
    this.hwComponents.push(humiditySensor);
    this.hwComponents.push(tempSensorVent);
    this.hwComponents.push(damperIn);
    this.hwComponents.push(damperRecycle);
    this.hwComponents.push(damperOut);
    this.hwComponents.push(pressureSensor);
  }

  getHWComponentList(){
    var comps = [];
    for (var i = 0; i < this.hwComponents.length; i++){
      var hwComp = {};
      hwComp["zone"] = this.hwComponents[i].zone;
      hwComp["type"] = this.hwComponents[i].type;
      hwComp["id"] = this.hwComponents[i].id;
    }
    return comps;
  }

  addHWComponent(zone, type, id){
    var newComp = new hwComponent(zone, type, id);
    this.hwComponents.push(newComp);
  }

  getReadings(){
    var readings = [];
    for (var i = 0; i < this.hwComponents.length; i++){
      var hwComp = {};
      hwComp["zone"] = this.hwComponents[i].zone;
      hwComp["type"] = this.hwComponents[i].type;
      hwComp["id"] = this.hwComponents[i].id;
      hwComp["reading"] = this.hwComponents[i].reading;
      readings.push(hwComp);
    }
    return readings;
  }

  getReadingsByType(type){
    var readings = [];
    for (var i = 0; i < this.hwComponents.length; i++){
      if (this.hwComponents[i].type === type){
        var hwComp = {};
        hwComp["zone"] = this.hwComponents[i].zone;
        hwComp["type"] = this.hwComponents[i].type;
        hwComp["id"] = this.hwComponents[i].id;
        hwComp["reading"] = this.hwComponents[i].reading;
        readings.push(hwComp);
      }
    }
    return readings;
  }

  getReadingById(id){
    var reading = null;
    for (var i = 0; i < this.hwComponents.length; i++){
      if (this.hwComponents[i]["id"] == id){
        var hwComp = {};
        hwComp["zone"] = this.hwComponents[i].zone;
        hwComp["type"] = this.hwComponents[i].type;
        hwComp["id"] = this.hwComponents[i].id;
        hwComp["reading"] = this.hwComponents[i].reading;
        reading = hwComp;
        break;
      }
    }
    return reading;
  }

  setSingleReadingById(id, value){
    for (var i = 0; i < this.hwComponents.length; i++){
      if (this.hwComponents[i].id === id){
        this.hwComponents[i].setReading(value);
      }
    }
    return;
  }

  setReadingsById(readingList){
    for (var i = 0; i < readingList.length; i++){
      var id = readingList[i].id;
      var reading = readingList[i].reading;
      for (var j = 0; j < this.hwComponents.length; j++){
        // console.log(id);
        // console.log(this.hwComponents[j].id + "\n");
        if (id == this.hwComponents[j].id){
          this.hwComponents[j].setReading(reading);
          // console.log(this.hwComponents[j].reading);
          break;
        }
      }
    }
  }

  setPowerById(id, value){
    for (var i = 0; i < this.hwComponents.length; i++){
      if (this.hwComponents[i].id === id){
        this.hwComponents[i].setPower(value);
      }
    }
    return;
  }


  sudoSetSingleReading(id, value, override){
    for (var i = 0; i < this.hwComponents.length; i++){
      if (id == this.hwComponents[i].id){
        this.hwComponents[i].sudoSetReading(value, override);
        break;
      }
    }
  }

  simSetReadings(readingList){
    for (var i = 0; i < readingList.length; i++){
      var toUpdate = readingList[i];
      for (var j = 0; j < this.hwComponents.length; j++){
        if (this.hwComponents[j].id == toUpdate.id){
          this.hwComponents[j].simSetReading(toUpdate.reading);
        }
      }
    }
  }
}

module.exports = HWController;
