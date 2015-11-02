/* global import */
'use strict';

import O from 'orchestra';
import LayoutView from './layout';
import DevicesCollection from './devices/collection';
import DevicesView from './devices/view';

const HOST = 'http://localhost:8083';
const LOGIN = HOST + '/ZAutomation/api/v1/login';
const DEVICES = HOST + '/ZAutomation/api/v1/devices';

let sync = O.sync;

O.sync = function(method, model, options) {
  options = options || {};

  if (!options.xhrFields) {
    options.xhrFields = { withCredentials: true };
  }

  return sync(method, model, options);
};

let $ = O.$;

let App = O.Application.extend({
  initialize: function() {
    this.authCookie = null;
  },
  login: function(done) {
    let _this = this;

    if (this.authCookie === null) {
      let data = {
        "form": true,
        "login": "admin",
        "password": "admin",
        "keepme": false,
        "default_ui": 1
      };

      $.ajax({
        url: LOGIN,
        method: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json",
      }).then(function(response, textStatus, jqXHR) {
        document.cookie = 'ZWAYSession=' + response.sid;
        done();
      });
    }
  },
  onStart: function() {
    let _this = this;
    let layoutView = new LayoutView();
    
    layoutView.render();

    this.login(function() {
      let devices = new DevicesCollection();

      devices.fetch();

      let devicesView = new DevicesView({ collection: devices });

      layoutView.getRegion('devices').show(devicesView);
    });
  },
});

let app = new App();

app.start();