var azureMobileApps = require('azure-mobile-apps');

var table = azureMobileApps.table();

table.dynamicSchema = true;

table.access = 'anonymous';

module.exports = table;