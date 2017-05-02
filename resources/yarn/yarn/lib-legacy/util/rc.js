'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign;

function _load_assign() {
  return _assign = _interopRequireDefault(require('babel-runtime/core-js/object/assign'));
}

var _toConsumableArray2;

function _load_toConsumableArray() {
  return _toConsumableArray2 = _interopRequireDefault(require('babel-runtime/helpers/toConsumableArray'));
}

exports.findRc = findRc;

var _fs;

function _load_fs() {
  return _fs = require('fs');
}

var _path;

function _load_path() {
  return _path = require('path');
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const etc = '/etc';
const isWin = process.platform === 'win32';
const home = isWin ? process.env.USERPROFILE : process.env.HOME;

function findRc(name, parser) {
  let configPaths = [];

  function addConfigPath() {
    configPaths.push((_path || _load_path()).join.apply(undefined, arguments));
  }

  function addRecursiveConfigPath() {
    const queue = [];

    let oldPath;
    let path = (_path || _load_path()).join.apply(undefined, arguments);

    do {
      queue.unshift(path);

      oldPath = path;
      path = (0, (_path || _load_path()).join)((0, (_path || _load_path()).dirname)((0, (_path || _load_path()).dirname)(path)), (0, (_path || _load_path()).basename)(path));
    } while (path !== oldPath);

    configPaths = configPaths.concat(queue);
  }

  function fetchConfigs() {
    return (_assign || _load_assign()).default.apply(Object, [{}].concat((0, (_toConsumableArray2 || _load_toConsumableArray()).default)(configPaths.map(path => {
      try {
        return parser((0, (_fs || _load_fs()).readFileSync)(path).toString(), path);
      } catch (error) {
        return {};
      }
    }))));
  }

  if (!isWin) {
    addConfigPath(etc, name, 'config');
    addConfigPath(etc, `${name}rc`);
  }

  if (home) {
    addConfigPath(home, '.config', name, 'config');
    addConfigPath(home, '.config', name);
    addConfigPath(home, `.${name}`, 'config');
    addConfigPath(home, `.${name}rc`);
  }

  addRecursiveConfigPath(process.cwd(), `.${name}rc`);

  const envVariable = `${name}_config`.toUpperCase();

  if (process.env[envVariable]) {
    addConfigPath(process.env[envVariable]);
  }

  return fetchConfigs();
}