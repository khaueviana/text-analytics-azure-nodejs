var azureMobileApps = require('azure-mobile-apps');

var mobile = azureMobileApps(require('./azureMobile'));

mobile.tables.import(__dirname + '/tables');

module.exports = mobile;