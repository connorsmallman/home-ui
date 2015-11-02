'use strict';

import O from 'orchestra';
import GenericView from './views/generic-view';
import SwitchMultilevelView from './views/switch-multi-level-view';

let views = {
	'generic': GenericView,
	'switchMultilevel': SwitchMultilevelView
}

export default O.CollectionView.extend({
  tagName: 'ul',
  getChildView: function(item) {
  	if (typeof views[item.get('deviceType')] === 'function') {
  		return views[item.get('deviceType')];
  	} else {
  		return views['generic'];
  	}
  }
});
