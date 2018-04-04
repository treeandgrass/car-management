var {getServiceJsObject, getServiceJsObjectSync} = require('./util/readFile.js');
const c = require("./util/constant.js");
// init 
var initPath = '../init'
getServiceJsObjectSync(initPath);

// start parse url
require('./parser/httpRequestURL.js')(c.URL);