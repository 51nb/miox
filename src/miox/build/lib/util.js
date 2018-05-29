'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sessionIndexName = sessionIndexName;
exports.sortURI = sortURI;
exports.getLocalURI = getLocalURI;
exports.extend = extend;
exports.replaceHash = replaceHash;
/**
 * Created by evio on 2017/8/29.
 */
var sessionCurrentName = exports.sessionCurrentName = '@MIOX:HISTORY:CURRENT';
var sessionIndexRegExp = exports.sessionIndexRegExp = /^\@MIOX\:HISTORY\:INDEX\:/;
var sessionCurrentRegExp = exports.sessionCurrentRegExp = /^\@MIOX\:HISTORY\:CURRENT/;

function sessionIndexName(index) {
  return '@MIOX:HISTORY:INDEX:' + index;
}

function sortURI(obj) {
  var result = [];
  for (var i in obj) {
    result.push(i + '=' + obj[i]);
  }return result.sort().join('&');
}

function getLocalURI(locate, popState) {
  if (popState) {
    return locate.pathname + locate.search + locate.hash;
  }

  var hash = locate.hash ? locate.hash.replace(/^\#/, '') : '/';
  var search = locate.search ? locate.search.replace(/^\?/, '') : '';
  var hasQuery = hash.indexOf('?') > -1;

  if (hasQuery && search) {
    return hash + '&' + search;
  }

  if (!hasQuery && search) {
    return hash + '?' + search;
  }

  return hash;
}

function extend(source, target) {
  for (var i in target) {
    if (source[i] !== undefined) {
      target[i] = source[i];
    }
  }

  for (var j in source) {
    if (target[j] === undefined) {
      target[j] = source[j];
    }
  }

  return target;
}

function replaceHash(path) {
  var i = global.location.href.indexOf('#');
  global.location.replace(global.location.href.slice(0, i >= 0 ? i : 0) + '#' + path);
}