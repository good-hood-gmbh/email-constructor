/* eslint-disable prefer-arrow-callback */
require('core-js/es6/map'); // Used by React
require('core-js/es6/set'); // Used by React
require('raf/polyfill'); // Used by React

require('core-js/fn/array/from'); // Used by Babel
require('core-js/fn/symbol'); // Used by Babel
require('core-js/fn/symbol/iterator'); // Used by Babel

require('core-js/fn/object/assign');
require('core-js/fn/object/is');

require('core-js/fn/array/entries');
require('core-js/fn/array/every');
require('core-js/fn/array/find');
require('core-js/fn/array/find-index');
require('core-js/fn/array/includes');
require('core-js/fn/array/keys');
require('core-js/fn/array/values');
require('core-js/fn/array/some');

require('core-js/fn/promise');

require('core-js/fn/number/is-finite');
require('core-js/fn/number/is-nan');
require('core-js/fn/number/is-integer');
require('core-js/fn/number/is-safe-integer');

require('core-js/fn/string/ends-with');
require('core-js/fn/string/includes');
require('core-js/fn/string/repeat');
require('core-js/fn/string/starts-with');

// Fixes glitch in Safari when HTML and JS get out of sync upon navigating back
if (window.addEventListener) {
  window.addEventListener('pageshow', function(event) {
    if (event.persisted) window.location.reload();
  });
}
