export let devices = {
  url: 'http://localhost:8083/ZAutomation/api/v1/devices'
};

export let commands = {
  battery: function() {
    return null
  },
  doorlock: function() {
    return [
      {
        commandName: 'open',
        commandType: 'open',
      },
      {
        commandName: 'close',
        commandType: 'close',
      }
    ];
  },
  thermostat: function() {

  },
  switchBinary: function() {

  },
  switchMultilevel: function() {
    return [
      {
        commandName: 'on',
        commandType: 'on',
      },
      {
        commandName: 'off',
        commandType: 'off',
      },
    ];
  },
  sensorBinary: function() {

  },
  sensorMultilevel: function() {

  },
  switchToggle: function() {

  },
};