var HWController = require('../climateControlModules/hwController');
var expect = require('expect');

var hwcontroller = new HWController();
hwcontroller.buildHWComponentList();

describe("HWController Tests", function(){
  describe("buildHWComponentList() tests", function(){
    it('hardware components temp reading is 15', () => {

        expect(hwcontroller.hwComponents[0]['reading']).toBe(0);
    });

    it('hardware components type is temp-sensor', () => {

        expect(hwcontroller.hwComponents[0]['type']).toBe('Temp-Sensor');
    });

    it('hardware component of first zone is present or not', () => {
        expect(hwcontroller.hwComponents[0]).toEqual({
          "id": "temp_sensor_outside",
          "override": false,
          "power": false,
          "reading": 0,
          "type": "Temp-Sensor",
          "zone": "Outside"});
    });

    it('hardware components id is temp-sensor-outside', () => {

        expect(hwcontroller.hwComponents[0]['id']).toBe('temp_sensor_outside');
    });
  });
});
