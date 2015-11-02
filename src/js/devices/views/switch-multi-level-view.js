'use strict';

import O from 'orchestra';
import template from '../templates/switch-multi-level-template.hbs';

export default O.ItemView.extend({
	tagName: 'li',
	template,
});