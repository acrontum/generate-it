"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var generateOperationFile_1 = tslib_1.__importDefault(require("./generateOperationFile"));
var _ = tslib_1.__importStar(require("lodash"));
/**
 * Generates all the files for each operation by iterating over the operations.
 *
 * @param   {Object}  config Configuration options
 * @returns {Promise}
 */
exports["default"] = (function (config) { return new Promise(function (resolve, reject) {
    var files = {};
    // Iterate over all path
    // pathProperties = all the http verbs and their contents
    // pathName = the full path after the basepath
    _.each(config.data.swagger.paths, function (pathProperties, pathName) {
        var operationName;
        var segments = pathName.split('/').filter(function (s) { return s && s.trim() !== ''; });
        var joinedSegments;
        // if (segments.length > config.segmentsCount) {
        // segments.splice(config.segmentsCount);
        // operationName = segments.join(' ').toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
        // joinedSegments = segments.join('/');
        // } else {
        operationName = pathProperties.endpointName;
        joinedSegments = operationName;
        // }
        if (files[operationName] === undefined) {
            files[operationName] = [];
        }
        pathName = pathName.replace(/}/g, '').replace(/{/g, ':');
        files[operationName].push({
            path_name: pathName,
            path: pathProperties,
            subresource: (pathName.substring(joinedSegments.length + 1) || '/').replace(/}/g, '').replace(/{/g, ':')
        });
    });
    Promise.all(_.map(files, function (operation, operationNameItem) {
        return generateOperationFile_1["default"](config, operation, operationNameItem);
    })).then(function () {
        resolve(files);
    })["catch"](reject);
}); });
