
class hwComponent{
  constructor(zone, type, id){
    this.zone = zone;
    this.type = type;
    this.id = id;
    this.reading = 0;
    this.power = false;
    this.override = false;
  }

  setReading(value){
    if (this.type === "Temp-Sensor" || this.type === "CO2-Sensor" ||
        this.type === "Pressure-Sensor" || this.type === "Humidity-Sensor"){
      return "Error: Cannot set reading of " + this.type;
    }
    else if ((this.type === "Zone-Heater" && value >= 0 && value <= 60) ||
        (this.type === "Fan" && value >= 0 && value <= 300) ||
        (this.type === "Heat-Coil" && value >= 0 && value <= 60) ||
        (this.type === "Cool-Coil" && value >= 0 && value <= 30) ||
        (this.type === "Damper" && value >= 0 && value <= 100) ){
      if (!this.override){
        this.reading = value;
      }
      return "OK";
    } else {
      return "Error: Invalid value";
    }
  }

  setPower(bool){
    this.power = bool;
  }

  simSetReading(value){
    this.reading = value;
    this.override = true;
  }
}

module.exports = hwComponent;
