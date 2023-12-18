const argv = require('yargs').argv;
const originTranslations = require(argv['out-file']);

module.exports = {
  compile: function (msgs) {
    const results = {};
    for (const k in msgs) {
      const defaultMessage = msgs[k];
      if (originTranslations[k]) {
        results[k] = originTranslations[k];
      } else {
        results[k] = defaultMessage;
      }
    }
    return results;
  },
};
