"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

var _FavReducers = _interopRequireDefault(require("./Reducers/FavReducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Store = (0, _redux.createStore)(_FavReducers["default"], (0, _redux.applyMiddleware)(_reduxLogger["default"], _reduxThunk["default"]));
var _default = Store;
exports["default"] = _default;