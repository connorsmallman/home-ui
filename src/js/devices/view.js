/* global export */
'use strict';

import O from 'orchestra';
import HB from 'handlebars';
import itemTemplate from './item-template.hbs';
import { commands } from '../config';

let $ = O.$;
let _ = O._;

var DeviceView = O.ItemView.extend({
  tagName: 'li',
  templateHelpers: function() {
    let deviceType = this.model.get('deviceType');

    if (typeof commands[deviceType] === 'function') {
      let deviceCommands = commands[deviceType]();
      let template = HB.compile('<a href="#" class="js-send-command" data-command={{commandType}}>{{commandName}}</a>');

      return {
        commands: _.map(deviceCommands, (command) => template(command)).join(' '),
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
