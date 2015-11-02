/* global import, export */
'use strict';

import O from 'orchestra';

let _ = O._;
let $ = O.$;

export default O.Model.extend({
  initialize: function() {
    console.log(this);
  },
  sendCommand: function(options, command) {
    let url = this.url() + '/command/' + command;
    let ajaxOptions = {
      url: url,
    };

    $.ajax(_.extend(ajaxOptions, options));
  },
});