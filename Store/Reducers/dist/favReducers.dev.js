"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Type = require("../Type");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var stateInnicial = {
  favoriteFilm: []
};

function FavToggle() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : stateInnicial;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var nextState;

  switch (action.type) {
    case _Type.favToggleType:
      var favFilmIndex = state.favoriteFilm.findIndex(function (item) {
        return item.id === action.value.id;
      });

      if (favFilmIndex !== -1) {
        return _objectSpread({}, state, {
          favoriteFilm: state.favoriteFilm.filter(function (item, index) {
            return index !== favFilmIndex;
          })
        });
      } else {
        return _objectSpread({}, state, {
          favoriteFilm: [].concat(_toConsumableArray(state.favoriteFilm), [action.value])
        });
      }

    default:
      return state || nextState;
  }
}

var _default = FavToggle;
exports["default"] = _default;