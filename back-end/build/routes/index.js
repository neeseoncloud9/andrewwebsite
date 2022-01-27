"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _getAllListings = require("./getAllListings");

var _getListing = require("./getListing");

var _addViewToListing = require("./addViewToListing");

var _files = require("./files");

var _getUserListings = require("./getUserListings");

var _createNewListing = require("./createNewListing");

var _updateListing = require("./updateListing");

var _deleteListing = require("./deleteListing");

var _default = [_deleteListing.deleteListingRoute, _updateListing.updateListingRoute, _createNewListing.createNewListingRoute, _getUserListings.getUserListingsRoute, _addViewToListing.addViewToListRoute, _getAllListings.getAllListingsRoute, _getListing.getListingRoute, _files.staticFilesRoute].concat((0, _toConsumableArray2["default"])(_files.filesRoutes));

exports["default"] = _default;