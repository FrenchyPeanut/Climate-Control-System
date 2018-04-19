var Monitor = require('../climateControlModules/monitor');
// var HWComponent = require('../climateControlModules/hwComponent');
// var HWController = require('..climateControlModules/hwController');
var expect = require('expect');

var monitor = new Monitor();

describe("Monitor Tests", function(){
  describe("getTempStatus() Tests", function(){
    it("Returns an error if readings unreasonably low", function(){
      var status = monitor.getTempStatus(-60);
      expect(status).toEqual("ERROR: Component malfunction");
    });

    it("Returns an error if readings unreasonably high", function(){
      var status = monitor.getTempStatus(101);
      expect(status).toEqual("ERROR: Component malfunction");
    });

    it("Returns a warning if temperature below acceptable range", function(){
      var status = monitor.getTempStatus(-1);
      expect(status).toEqual("WARNING: Temperature outside acceptable ranges");
    });

    it("Returns a warning if temperature above acceptable range", function(){
      var status = monitor.getTempStatus(41);
      expect(status).toEqual("WARNING: Temperature outside acceptable ranges");
    });

    it("Returns OK if temperature acceptable", function(){
      var status = monitor.getTempStatus(23);
      expect(status).toEqual("OK");
    });
  });

  describe("getCO2Status() Tests", function(){
    it("Returns an error if readings unreasonably low", function(){
      var status = monitor.getCO2Status(-1);
      expect(status).toEqual("ERROR: Component malfunction");
    });

    it("Returns an error if readings unreasonably high", function(){
      var status = monitor.getCO2Status(100001);
      expect(status).toEqual("ERROR: Component malfunction");
    });

    it("Returns a warning if readings above ideal levels", function(){
      var status = monitor.getCO2Status(1500);
      expect(status).toEqual("WARNING: CO2 above ideal levels");
    });

    it("Returns an alert if readings above acceptable levels", function(){
      var status = monitor.getCO2Status(3000);
      expect(status).toEqual("ALERT: CO2 above acceptable levels");
    });

    it("Returns an alert if readings approaching dangerous levels", function(){
      var status = monitor.getCO2Status(10000);
      expect(status).toEqual("ALERT: CO2 approaching dangerous levels");
    });

    it("Returns an alert if readings at dangerous levels", function(){
      var status = monitor.getCO2Status(50000);
      expect(status).toEqual("ALERT: CO2 at dangerous levels");
    });

    it("Returns OK if CO2 levels acceptable", function(){
      var status = monitor.getCO2Status(500);
      expect(status).toEqual("OK");
    });

  });

  describe("getPressureStatus() Tests", function(){
    it("Returns an error if readings unreasonably low", function(){
      var status = monitor.getPressureStatus(-1);
      expect(status).toEqual("ERROR: Component malfunction");
    });

    it("Returns an error if readings unreasonably high", function(){
      var status = monitor.getPressureStatus(201);
      expect(status).toEqual("ERROR: Component malfunction");
    });

    it("Returns a warning if readings approaching dangerous levels", function(){
      var status = monitor.getPressureStatus(55);
      expect(status).toEqual("WARNING: Boiler pressure approaching dangerous levels");
    });

    it("Returns an alert if readings at dangerous levels", function(){
      var status = monitor.getPressureStatus(61);
      expect(status).toEqual("ALERT: Boiler pressure at dangerous levels");
    });

    it("Returns OK if pressure levels acceptable", function(){
      var status = monitor.getPressureStatus(20);
      expect(status).toEqual("OK");
    });

  });

  describe("getHumidityStatus() Tests", function(){
    it("Returns an error if readings unreasonably low", function(){
      var status = monitor.getHumidityStatus(-1);
      expect(status).toEqual("ERROR: Component malfunction");
    });

    it("Returns an error if readings unreasonably high", function(){
      var status = monitor.getHumidityStatus(101);
      expect(status).toEqual("ERROR: Component malfunction");
    });

    it("Returns OK if humidity level acceptable", function(){
      var status = monitor.getTempStatus(30);
      expect(status).toEqual("OK");
    });
  });

  describe("getFanStatus() Tests", function(){
    it("Returns an error if readings unreasonably low", function(){
      var status = monitor.getFanStatus(-1);
      expect(status).toEqual("ERROR: Component malfunction");
    });

    it("Returns an error if readings unreasonably high", function(){
      var status = monitor.getFanStatus(301);
      expect(status).toEqual("ERROR: Component malfunction");
    });

    it("Returns OK if fan speeds acceptable", function(){
      var status = monitor.getFanStatus(100);
      expect(status).toEqual("OK");
    });
  });

  describe("getDamperStatus() Tests", function(){
    it("Returns an error if readings unreasonably low", function(){
      var status = monitor.getDamperStatus(-1);
      expect(status).toEqual("ERROR: Component malfunction");
    });

    it("Returns an error if readings unreasonably high", function(){
      var status = monitor.getDamperStatus(101);
      expect(status).toEqual("ERROR: Component malfunction");
    });

    it("Returns OK if damper open percentage acceptable", function(){
      var status = monitor.getDamperStatus(50);
      expect(status).toEqual("OK");
    });
  });

  describe("getHeaterStatus() Tests", function(){
    it("Returns an error if readings unreasonably low", function(){
      var status = monitor.getHeaterStatus(-1);
      expect(status).toEqual("ERROR: Component malfunction");
    });

    it("Returns an error if readings unreasonably high", function(){
      var status = monitor.getHeaterStatus(71);
      expect(status).toEqual("ERROR: Component malfunction");
    });

    it("Returns OK if heater levels acceptable", function(){
      var status = monitor.getHeaterStatus(23);
      expect(status).toEqual("OK");
    });
  });

  describe("getCoolerStatus() Tests", function(){
    it("Returns an error if readings unreasonably low", function(){
      var status = monitor.getCoolerStatus(-1);
      expect(status).toEqual("ERROR: Component malfunction");
    });

    it("Returns an error if readings unreasonably high", function(){
      var status = monitor.getCoolerStatus(31);
      expect(status).toEqual("ERROR: Component malfunction");
    });

    it("Returns OK if cooler levels acceptable", function(){
      var status = monitor.getCoolerStatus(10);
      expect(status).toEqual("OK");
    });
  });

  // describe("monitor() Tests", function(){
  //
  // })

})
