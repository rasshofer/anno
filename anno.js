var LINE_BREAKS = /\r\n?|\n/;
var BLOCK_START = /^\s*\/\*\*/;
var ANNOTATION = /^\s*\*\s*@([\w:-_\(\)]+)(\s+(.*))?/;
var FUNCTION_MATCHERS = [{
  pattern: /^\s*function\s+(\w+)\s*/,
  index: 1
}, {
  pattern: /^\s*(var|let|const)\s+(\w+)\s*=\s*function/,
  index: 2
}, {
  pattern: /^\s*(var|let|const)\s+(\w+)\s*=\s*new Function/,
  index: 2
}, {
  pattern: /^\s*(var|let|const)\s+(\w+)\s*=\s*\(?.*?\)?\s*=>/,
  index: 2
}, {
  pattern: /^\s*module\.exports\s*=\s*function/,
  fallback: 'anonymous'
}, {
  pattern: /^\s*exports\.(\w+)\s*=\s*function/,
  index: 1
}, {
  pattern: /exports\[['"](\w+)['"]\]\s*=\s*function/,
  index: 1
}];

module.exports = function (data) {

  var annotations = {};
  var lines = data.split(LINE_BREAKS);
  var current = {};

  lines.forEach(function (line) {

    if (BLOCK_START.test(line)) {

      current = {};

    } else if (ANNOTATION.test(line) && current !== false) {

      var matches = line.match(ANNOTATION);
      var key = matches[1].trim();
      var value = matches[3] ? matches[3].trim() : true;

      if (current[key] !== undefined) {
        if (typeof current[key] === 'string') {
          current[key] = [current[key]];
        }
        current[key].push(value);
      } else {
        current[key] = value;
      }

    } else {

      FUNCTION_MATCHERS.forEach(function (matcher) {

        var matches = line.match(matcher.pattern);

        if (matches !== null) {
          annotations[matcher.fallback || matches[matcher.index]] = current || {};
          current = false;
        }

      });

    }

  });

  return annotations;

};
