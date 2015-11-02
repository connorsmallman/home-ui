'use strict';

import O from 'orchestra';
import itemTemplate from './item-template.hbs';
import commandTemplate from './command-template.hbs';
import { commands } from '../config';

let $ = O.$;
let _ = O._;

var DeviceView = O.ItemView.extend({
  tagName: 'li',
  templateHelpers: function() {
    let deviceType = this.model.get('deviceType');

    if (typeof commands[deviceType] === 'function') {
      let deviceCommands = commands[deviceType]();

      return {
        commands: _.map(deviceCommands, (command) => commandTemplate(command)).join(' '),
      };
    }
  },
  template: itemTemplate,
  ui: {
    'command': '.js-send-command',
  },
  events: {
    'click @ui.command': 'sendCommand',
  },
  sendCommand: function(e) {
    let command = $(e.target).attr('data-command');

    this.model.sendCommand({}, command);
  },
});

export default O.CollectionView.extend({
  tagName: 'ul',
  childView: DeviceView,
});
