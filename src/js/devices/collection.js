/**/
'use strict';

import O from 'orchestra';
import Model from './model';
import { devices } from '../config';

export default O.Collection.extend({
  url: function() {
    return devices.url;
  },
  model: Model,
  parse: function(response) {
    return response.data.devices;
  },
});