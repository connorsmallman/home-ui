'use strict';

import O from 'orchestra';
import template from './template.hbs';

export default O.LayoutView.extend({
  el: '#app',
  template: template,
  regions: {
    'devices': '.devices',
  }
});