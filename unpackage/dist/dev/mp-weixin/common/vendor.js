(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"明天更美好","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"明天更美好","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"明天更美好","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"明天更美好","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"明天更美好","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 5);

/***/ }),
/* 5 */
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 6);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),
/* 6 */
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),
/* 7 */
/*!**********************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/pages.json ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/*!******************************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images sync ^\.\/lifestyle_.*\.png$ ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./lifestyle_ac.png": 19,
	"./lifestyle_ag.png": 20,
	"./lifestyle_air.png": 21,
	"./lifestyle_airc.png": 22,
	"./lifestyle_comf.png": 23,
	"./lifestyle_cw.png": 24,
	"./lifestyle_drsg.png": 25,
	"./lifestyle_flu.png": 26,
	"./lifestyle_fsh.png": 27,
	"./lifestyle_gl.png": 28,
	"./lifestyle_mu.png": 29,
	"./lifestyle_ptfc.png": 30,
	"./lifestyle_spi.png": 31,
	"./lifestyle_sport.png": 32,
	"./lifestyle_trav.png": 33,
	"./lifestyle_uv.png": 34
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 18;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images/lifestyle_ac.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 20 */
/*!******************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images/lifestyle_ag.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 21 */
/*!*******************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images/lifestyle_air.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAQAAABpN6lAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiCgoQOSsMSz9mAAAMJklEQVR42tVda3BWxRl+NjcDKEEqECBggEZUFLlEBaGKFdRWpxbbTgVvIKMdFIUOUJk6OioZb6jAVCyItSiT4qUoSGloa6kyUgoFERUkxUAkJEAwCYEACSR5+iPnu5495+yey3fC8w3Dlz27+77Pe/acvbzv7icQOJiBS5CHHHSO+xf7JnBM+jmOKuwQp4LWTgRGOx2XYDgKMRxD0MFlJS3Yha3Yim3YIRrPCgMwDQNRiEIMx1B09LHiZuyMmuJ0MKbwTv5yvsBKBo06LuUYBtZy3VE/j7/m9sCpx6OCz7NP2LzbyHfiHH6XUvIRNHIhe4RLPoMzWR0K+QhO8Hl2Cov+AP4nVPIRlHJYGPTv5bGwmUfRxFkpfi3yxbA5m/BmCk3AZ8NmK8WrqaL/VNhMLTFPn412s+EY/CtFlnaDG8T6QA3ADHyOQWGztMEODBOtOgXSNAU83K7pA1dgsl4BrRbAXJSic9gcHXAIBaJBPbteC3i63dMHcjFbJ7tGC2AaqvG9sPkpYLe4RD2zTgu4Wpv+EbyP6SjEANwPrVeTCY3YiArFvBeztydZVuBc5f64im9zKi+NH5vxA9e9eyl/xRyA6dyoWOLeYAzwXwXRrVzNkdLSo1yR38zbGW2lnKxYankwBjjgSH45L7Upv1mTfAnHJNVwv2LJr4IxgP3M/0uOcij/S2XqzSzmFZIaHlEsvz8YA9RbCmziHGY6ls/gLgXlK/ky8y1qmKdogKPBGOCUhbgGjlOsoQs/tFH7ABdytN2klm8oGqAlkKkxW6TCajlCkncQn+NXXMKkbpaCj3IXm+PKt3I/1/MljnJWmq8pGoCBLJPxpERQFS9PytWDM/hZ9PoT0prO4VDew1kcz8uo4TThImUDZARhgCqTmL3sn5Aji48nPSjNvN5HDRYo0j8WAH2AO5PEfMmeCdfH8GtpG3G5dM08zuFiDolLeVDRAAH1AhuTiF0Qd60Tl1mqs0HXBOzIO/l3452zJS59mKIBdgRjgLUJQn4Sd6Ubt9gqVKs6OKXgtfxD0npz1NDMkL6HzPgkGAMUx4kojkvvx/8pKLWO/Wxrz+ZoPskyScnb4nJ9qmSAVeqsdN6WddFvh/FIVKXBWIeeCqVvQhm3YS3WYS9qREsbaXRHD1yIkbgGw5BlUXI0Vke/b8AoBVl1Cnn0waKohW+PpuW68ge3sJplNiPLRGyK0yGXDQol5quz0lkPOGr8/45431AnE++hlwtbpqEb+iuvLg2PjRXEISxQKKHRAnQMUAMAOIJp0ZT5GO2Cvi4ycVXcX/NQG5YBSlCJJtwtvmv7kxPwUAroA8CPYl9FPZ5zzH80ID2YHWuM7MLDLp5+d2iIH3IxW9pXxONWdU5aq8KiMS5qqwjdA7KzGZ3wdLwWuBEHbfMH0wvEg0MTZnTBo5mXJci/lEdscgfvvOHHKaVPkn9N0mCwdObRBjc9kxb9ESmnT5Jjk7TowAVsleb0M0BPaoCVoRhgJ00jB14vWatuCpp+gcXaUPD4JyXDZV7LVQkaHQraAC+HRJ8k36W032J/zuBaY5j8VrD0BfeHaADy97TsupnJ63gbzwvWAFeHSp8k/0EfRyC6ARLAzwK1rwrGYjt/EJp07g27AZAkmzmXYcQqKK/KpQI1nON9/V/3Efh5CFa3Qlc8i72c6S1gWtcABWGzTkJ3vIgqrudUP1+MNuCdYbd7SzRzBbNTYQJV70wYuFOfj36kaBo+xC0psLQ+TmGQ2KdbSHscIFpxB4LxvHjFZH36ji2A2RiKvsanM/4klgIA+2Czki8glZgrDE80Z+MhnEQpdqMUu7FduJ8dsqtp9e1B40ohT4T9wCfg/Uh0AaclXSnj+e4NMNwk6EzE3c3bLRYjwsDnkQERb+AZ09UR7g2QLbnPNRxgXP1N2LwNHOaFhkbfZ43p6glPnaM0pmdnZMLJ18PmTrKJhnOGnaVBWKvdswfAB6RC17TNyZnJ9WHz532GpmlJ7vsI7vdmgN4WYp83rp/P3aHSj7pBLULoWj2vEFtuib3LuD4gpH2jJLmO6YYW91jk2ObEzzk+YC2GSNNf5x6xGRBlHI+PLH371qhHOcpRDiAf+chHjnYNpbjDiDMYgdcs8vxF/5YnwcYHUBUJS+fdGnetmSs5jl1McrpwHFdq+JvqeJFRMo8HLXMVejdAmk2M8NaIs1QxlP4Qi5hnKy2PRTykZMYbjRIduM0y10FfIkb5po0iK4w8gm87qNzKIio9KMxikeMga3o09zs2uV73gT7AX9iq8piRK5ubbHLV6risAd7KWpvalkbzPW6r20/9MUAOT9veWUMMu3OfRZ7P7CPEpFL7xQXcJmJDJDKd421bSqNvEcMOw53jHGzkGyQNfHK5UsNsrpDUVs5uxvXBDgFTJT7RBziT9tgXVeom02TkY+edBJZyM01u+Jixu7HcQSv/Ang4kE6INcupCel72NWT5K7cE1db7HHL4gZHnS70zQBAghpyxF5M86NpdRzog/HrovU9Fk1d6qjPlz7SV1wKNaJHmcY1JMkzySENLmWPNR6rFdEUlb1Dz/hrgLEKIpsjW2d4LtfwCCf6Jn0CD/PP0UHXOKXx4jX+GiDddrdPBLUsiJXwVX5s72CB7Qghgk+o7/Z1UCHLZkdADF9Tf1Kjo0WO0vR7mdqYU1/8KwrCS/y99wny01mioMErwdm/l2TJ0YwnA5P/pIL0M3pLIHqRolX4QCHbSIU87qBS8weiKjADAFAJQFLd5q4PlZoDDpE6h8cdmuBp/YmPsvR+ttMykjzOc/Tq1GwBoglOU4xlbjx0itL3YZlDlhIPjjA1cILtHWhi30Cl92WTrfwJujXqu8dzUG2zBPqqsJyD8RnYnC6QgF3it5a1LMKDluVOo7uo12WkDZu++JT16R0coNCFxTDAsp7elrvYXa0AuBkwrrK8skRUWl7TWxWwzC0qscSFZn6CuRbB0ieZa1PqYq0WcLGtfPn+0RY7+VZw0QLEIWyUXnhVBB2nHZEvPzhvY2rkA+Akif0bIstiFmU6amyxrLTf8sBu0tXASa7M6coAHXHQtO3xU+EQv8tM5YOYasQZh7o+NW2hPYae4qQbNq7AxSb7Nwd0fpNMeh/JW2hxysgDAAslTfAJ7/UqSpfNCl16AV37zvg5kk/62Y9+ssMMeZXriLKDYos5kekoR7KHcYcY4paJWwNMk9wFSQAlh2h1f8mQ0OKtknzTHBW2gPuVs2KYD7x/QJLPRd/sUNospRHFzlX5bABRh5WmxFuCfxEyDz82Ja4UrjfLelk7NTuf0zElaAPgPpjXHP1xg+uCgqWmZ/Hb5CVRj7tMk4IcmS7Zs1bqJQzCw4lLgpyHpUmJfTERiaf5bcZdyFOvNQEHsDkpZSLMvyowT9A9C09gFitM9+ObQI6xapOXwW9M8g4E5ANQVEnmpQvsPcApEmkzQqQPsIMkhGqf+4gAW1mZkgiUI153intsruIU5yPZD5uPKTCNzJmJT9SXxHCdZDo0BfmmtAUpnADJwc5x/vsIKsyH5CkEWcTDFFfAbMn7pt67J9KzD1Ucg9kXl4ffmTPqVWtKKZL0JYtSsATqDF4gXZ64JymXpyUx3iyJBztpvwSTShO8JKHQkHjELi/SMsBFCWVzpUf2LPRDd18OH2Uv7IXZJbULV8ZeUUzD2xisWOEXuCM2sabA32A+tvUM+osDfmjvC6RtgCz2I06Dj0rrXhQ250QlsywO3l7ltZ/mJGlMQlWwkShuFO0n6Q5Jcqub1XqjzjSLlhV3oF87Am+zUPbbxFOglOvLsXTCqYRphGICq/tVz5u16yqwPCmqwn2bCtoAmfy3Zce2WnZcukU953KWZTBcg2ydsN2AfWwO4W/lu3T88QtewLk2kYAt8afZtkswj1+QNgSWW8cPsy8XOuxJnq6jiwoCOIWdnbES9lHCZfgI61GOalSjAwZGPwW2s9MWTBVLcTaAmfwj/UYjx4fNS88IKkGN6jiS/HMbZwE4yTGoTRUl7bbjczDBaNOJ9Po4xYfD5uHFBJmcrXQWtBXeS5wYn5VgHt9y9TB8xCvD1t0/I/TkU0pbYttwjG+EeF5cYEbI4kQud/i5pqNcw4k6vzviFSH8hjcL8EMMRQ/jk4Ya1KIGFdiEjdip93uR3vF/CLWHvMNYTgMAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMTAtMTBUMTY6NTc6NDMrMDI6MDCQMdy2AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTEwLTEwVDE2OjU3OjQzKzAyOjAw4WxkCgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="

/***/ }),
/* 22 */
/*!********************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images/lifestyle_airc.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAQAAABpN6lAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiCgoKOC3tgo20AAAKdElEQVR42u2de2wUxx3Hv3M+TI0CNqhRKA8bCg6I+JEANgZEcNKotIkEoirUMkJRUzVBqaJINCBFSVv1EUIVtVQVSKUUmahqHi1ERGmj0kIwIhiXN8aEFgMBB1SHQjGvgAHft394dti727vbx+zOUfL75+zbmfn9vp+bnZmdnZ0VMGSciu+gEjHEILAfq8Q+U5GYEL+AHzHVdnKe6biiES/4CjPZy6ajC19+Ad9gNvuJ6QjDBrDIJnYTn+c0TuPz3GT79gXTMYYpv5hnpczzbEw60sjz8sg5fsF0nOEBWC5FJjgz7dhMJuTRb5uOMzwAh6XEFY5HV8ij/68dIgt5U0qc4Hh8gmoHRpiONRwAFVLeVRY4Hi/gVZliVHRRxSMkcBZzAQCXRa/TYdHLTzE6wnjyzThQNYOjovMaMy3bZjUQAICb6DYdigFjnLvl7/+26VjMAFiu+oB607FEL34Y31fyj5iOJkrhgo/x19zJ60r+RU4xHVWUAH6bci14iVNNxxSl/P78LEn+BU43HVO0AEps4tu5iPeYjkinuAGs4URmHWXYAHw9a7oi1rGGA8KJVGiVXYpqVKEaVShHDMBJjBc9DumKMQP1eAQT5Rf7sBXN2C4uOqFEO0YDSKADbTiINhwUnXkEgANQIWVXoiTt8FOiKU14PR5yHIEmsB/NqSD4PaxMS9mNQ30o0C4+Cxa/z4shlqnfemzW4XQ1ALBECn8wa9oYJmESvo8ED0gQ3QBGOaQswQzM6IPGY6penPKjxFMN4ERMQjWqUIVil1la0JpV+BUAmRq/BA6gGVPgtm+4iDa04SD2ernH4BoAh+BPeDRnstOyapbjp1nTXcEONKMZewBMRj3qMR3Ze4EfoEPWutzTJR/gm+KCVgAcgs14KMPBaziMg330LbcshXOFVMLFrRQP8Rwgyqymj4NlLazGAyjKENN+PCb+qw2Ao/xOWeHa0OE0wcFjGONGeFo+ZxDHxViHtAUoly1RFUr9InAhn/tUj32aa/gcH2ZJzlwrVJ7lrKPnxpZx1tmuEFfkTF/Ch/kc1/C0yrOPQ3TL73A/XcmR7JG53qOvzpaC78kSejjSda4R7NCIwK98AODqYPf8+LLKv9pTvuHaEASRD7CUl2TeXs7y7HsWe9U1YqnHvHoQBJMPAGxU+bs5x1POOexWeRu95FQIjgZEEFw+AHCt7YpvBQtd5Sm0NaDkWp+egyHQIx9gkW2yi9zFcTlzjOMuW473WeTGj2YEuuQDAPslrQhIcDMb2N8xZX82cLO6N0CSb7BfIN/DfCHQKR8AKLiMt2i3c1zNJWxkPctZzpls5BKu5rmkNLe4zF/3GRCBbvmy1Fp1Z9idHWatJs/D+C8PCMKRDwAs5FJ+4kr8J1zqrrnUjiA8+bL8OOdzW8rpkFztt3G+92GzJgRhy1d+BvEJvsYtPMQu3uRNdvEQt/A1PsFBofn8Uk4EUclP8SqCN3SuEfwzCwIz8qO1LAjuBvlZENwt8jMguJvkAwCH8kgSAttV+10gPw3BavCM+qfedGiRIahTms+AK20jsDEeCxrEN83WGo7gm15HDxzFk0rzSrCYrf4QcBBbSR73Ol+jUX4pj5Ns9YIgSX4riwGfCDiIO2WeEywzIr+MJ2QEO90icJCPVASd/LIn+eTJKNf1ZRDjCkEG+d4R5IN87wiyyPeGgAPZkg/y00S1cKBv+WkITjHDqt18ku8egQv57hBwIHfkk/w0cTucELiUnxtBkvyr+SFfCryaGYEH+Q4IbCKT5JNdpmUnRd1liywJgUf5aQhUNec9/JC8IwCQH1pL7nzId0aQJj+/AUgEPuU7IKjgdtu5n88AbrcF21nhW34agl4bjIa8BtBgE90bQH4aAnU6qEvJ/ARQl1Ttg8h3QNDXGuQ5gJQzP4j8FASyP8h/AEkIgsmXCNbyEjdal7x3AgCAZdzIS1wbWL4szrbO884AkBp1ZnOVSCRMC/Rj7qLOp+cGjdjnAEwHYNo+B2A6ANN21wNIWY7CkZiMyRiPgow5BsvPEm704Y84i07swWbnPQSMGue5XMSkw7r4Y+fVgj5jdxgIeSvgXv4xMvGWtbPaPIAYAHAMDiP6nbwewFZWRe41xeIAY1iHe+X/CRzCbhxBWINfgftRi2rZxgzG31klPjXMgItVpTzi+xzy5vFBHlA+l2kp0X8bwFJek5m3R7eJFfupVeQXst3QigLAkzLrVY71nDlIyMN5QXpebBJAHJPlX03iGABwNoaFrP2cWA+IM1yFlwAA8/HLkD26AtAqPxdjpt/CXNpBrE/yqGfWxqfFUCn/aovct+XR6MYJMbVpUfQrfSyPRgHE0YnhAIBa/BkAsAvXQ/Z5XH5aj0T82yQA8Oey/TwR7R4eLGS79PyShtICdIOVakiyKlIA1t6yCR3rDAJdDPFvCsFvdAxKXHgs4i/UnbttWkr0DUAALEU7LOGn8BZ24wjCulqP4X7UYh7K5f9nMb1v/BEUAO4DAEwVrX6yz1FPekdrlzlJD9eAl8PiXcxGj9esge0W5oq9kXt1AgDgi9D4oJpLuz0KNWhxAOAsNCVtpnEDDMmfSAL9KiGWm0YA1vCKOis3s8HronmP3so4T+0MQZJf0VJqoG5wq8x8nc9E9hDbQl62kBsGwFL1vPaSaMRLv99VdUBDTxAEwIsy624WeM4cLOgt0vNbJgHE1Wzwhr5bFXwH00JU3SK+of62dqbSNjnux+Kw5gF3yc8hckwVjtmf17Q8hrRToDuLwdqO7mKgcvyY5TFPAEQ/KLE8Rj8Es1kc1mKnevRtV/QsQnuIHcAl29/18vMDkwDAR9V1+SOR+p2s3jYwV0NpgQZCe2Xmj908L6ZJ/nC1p8h5HdtlBAPQoIYkl/mMzpvWGfz140J1U4T8oZYyA02IFOAdzFbf3MRHOBrizdGxqLA1e03iKVcCJ+BpDM2SYI7szuvEP/zwK+S7RiZENrobfXJwyh7Umc3nhMgNPI1r/n9Wn9aLJS4XysyG2w21zvsCwCJscO1CnxVgg8tnft3G1iI6vAYRB1iAt9XWtcTRCBZIjJczUZVYz8dz7TJqs6NoSvmmGC+ohV6nsMBXTLadO09Gs4kCp9h29XFxN0K9oeyvKd87Pt/mNZg4/yOL2BPNXQEAYBGbpdee3Gv6nQFokQ/wcRVIRVTyAYCj1UTck34AaJKPOKwNK9eJdgDg17L2t0GtS0gR4mOuwlIAwLfwumd8xdgE62Ucp1AvTvqOSG0/Kn8HVTXDsWab5znyu5wdcGoN0PXrA0BM9f8HghTjyyyPHjfI1/jrwz4fEP1uMJZHl9ughyEfiCsANfgLgLBrgr30GvnZbU4+AL4qz6WOsN7ikcFvP7VY8nc501ptQIu+c/924UPVa45ybmCuFcCPpNdbudcnJr2qVa98AOAaWWiCv4qmFrCQr6iNNde5SL8oPPkC4Di0q/H0MfwhggUSDbBeukl8FbkXSCzAz2z/6Tn3bwMAuBCv633hToimVb41H/B7PIsbppWZkG8zVqTtFpB/FsLGPUkVnzVYiCkoxX15eELcwAa86O9dQtnsf5gyNZP3FhlYAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTEwLTEwVDEwOjU2OjQ1KzAyOjAwvMZdbwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0xMC0xMFQxMDo1Njo0NSswMjowMM2b5dMAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"

/***/ }),
/* 23 */
/*!********************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images/lifestyle_comf.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 24 */
/*!******************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images/lifestyle_cw.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 25 */
/*!********************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images/lifestyle_drsg.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAQAAABpN6lAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBhgRNzlfU3uCAAAE9ElEQVR42u2d32sUVxzFzx3TKCSBllgJlDyoURJaX9pCQPpWTEl8aoo0pVDwoU/+ikJRrOiDtP9AXpQ+l6BJGvrStZWC5gei0AilRVBiIKEQCGlpJZGwuKcPbiYzuzuT2dmdPTvr/Twld+6dPefM97t7Z9lNgERhEw/TxF5teJhNySpM2v4YySe8wI6y13bwAp+QHEttBHn7L8lykke5I9K6HTzKSWbdtemMwGd/kyVe5QC7uavkil3s5gCvcqloXYIRxO7PUPNtOIKv8W7wBCzjKRawgKcA9mEv9mIfOkLUzOEb3DbP6j4AvoN+9OMDvFZ9qchiBhlkzB91GADb8CH60Y/OBIwXsoQMMvi1OvVQcQB8G/0YSOiah5HFDH5CxvxZ48f1WD/Ea1ykmkVe4yGF+XHm1N5dchyvYQhs5406Mr8Vwg2218J+bx2UfRCL7E3a/kluqF2GssGTyZlv5ajaXyRG2RrdVeSXQfZgAj2Jllf1eIRPzKNoU52I9ofwIDX2gR484FDVzsZmjqirOhYjbN7e3bYtwE6MIenn1qS4j2NmKXzKNi3APsyl1j7Qizn2xQ6ADq8gg91qFxWxGxleYYjLwBZgO77HR2r9VeJnfG5WywqAvRirya1trVjCMXO/1IGSxcETmGoo+0Anpnii1IGiCmALvsNnar0JMYovzVpoAKna78WhaI/oa4GU7ffiULRHdANgM0cwijJuI1JKK0a9e8R8C6R6vxcHd4/oAKnf78XB3SM6DbHfi0N+j2j4Az4uOPQjxvE6vkWbWmMV+Q9f4W8MFr3AT4LDBTeRv3MnALCba+r72aqxxm4AYBMfFhwZBh1O+4aub4bDM2rdVeOM6+m6b3yaDgB2cd0z+NCd7HBKrbwqTG3dDfoqYJ1dm8P+NnA3CuxqgDZYc22CQ74jw/Bca28brHBPA7XBVvnv4YpnfNr3LgEP+Npgwh03KW+Dqa1PKHHCM77OAwWvBw3ZBlHKP0IbnFb7iM3pSOXfsG0QvfzdaWd9J9hqg/0pbIM17g8o/7OB+0U6nPFMTHcbBJX/TNh7xGFtcFftqCzull3+DdUGcco/QhucUvuKzKlY5d8wbRC//APa4NOCNpjnRV7mstqnj2Ve5kXOs7Lyj9QGN9mSDyNblsQkyb40zRberLD83cUHg9rAM+ee2rfLPY+qoPI/WNppQCrmMS55fh3cbANDz+i/ZSSaLB4lmwo5hEHPjEvmcZnnpMNZT4KeNnBn3FJfeJdbRdr85T8bXP6BB0wOx/Hc/fUO1mt+XSthHXfcn5/juMnFOgvPkSRf8HzJo3VcAQDA83xBkjwXO0Y6nOVq0IdM6j0AgH1cDSt/AAj9KorJ8QvkzELsBMWYX/g+nPDy3+a7OGZebaLCCLa9eOVsDhoSG4BagBobgFqAGhuAWoAaG4BagBobgFqAGhuAWoAaG4BagBobgFqAGhuAWoAaG4BagBobgFqAGhuAWoAaG4BagBobgFqAGhuAWoAaG4BagBobgFqAGhuAWoAaG4BagBobgFqAGhuAWoAaG4BagBobgFqAGhuAWoAaG4BagBobgFqAGhuAWoAaG4BagBobgFqAGhuAWoCaVz6ACv7dHt/ATrX8PBvmH7UEiyWlVPIc8B7eVMvPs2J+Ezxq/f8VmSi88i+DNgC1ADWVPAkewVtq+Xn+MrfjLv0fowqY6sg9pU8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDYtMjRUMTc6NTU6NTcrMDI6MDAOp9bVAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA2LTI0VDE3OjU1OjU3KzAyOjAwf/puaQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="

/***/ }),
/* 26 */
/*!*******************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images/lifestyle_flu.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 27 */
/*!*******************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images/lifestyle_fsh.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAQAAABpN6lAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiCgoKOi5Gvb6MAAAJEUlEQVR42u1df3RUxRm9k0TEUAMSE1JqEbElEYXGBG1LaYtWAQsqFjilyhGttgpSW61t4YDFA1VUbDzq6QFaitaeHlGQlgpiUCixtoquVMRQCFaK0hMChJDkBPJjN7d/ZLPZTd6Pmffe7OxK7v6R3Xkz33z37s68mW9mXoBe9KIXXsFcfta0D34hPBEvxFSUohTnA6jGTryLl0TINJUkgZn8OZvZHRE+xr6mfUsG/SK+RTvs5VdM+6ebfgFr6YQWXmLaR70CbKAbQswy7aU++jNd6ZPkQtN+6qKfzeNSArTwfNO+qiBDOmcxzpHK1wdfM01KjwClGnKmAHoFkM5ZrCFnCkBegBoNOVMA8gLs1JAzBSAvwLsacqYATnsBFCAxEP50D4Y5iMdc6TfzYtN+6pTgu64C/MK0j7olKHOk/zwzTXuoX4KreNCS/DHOMO1bsiQ4myvYkED+JF/gINN+ufpdwtU8wFpu5pe6Uj0FRQFmYDguw2XogxDeQaUIm6bn4u1k3ItvxhLaMOb0CeJmcw6rejTYHab9Sg75wXzIJooZ4WdMe6ebfDGfZavt/aqVZ3bkcxm1cQjuwJUQAGoQQgghcdQ0NVfqApNwL65wzPR30eJuKIu/Z7iHdv/lOs7jVZQLkCWb/Fm8k3tdh2sN8fcBe/prXcx8yDW8j+PYxzTtqMcF/JXEYJ38gENlzP1awlQHavgghxgmP4rPsEXS32dkDOawUVoAkmziNwxRF/w2X1PyVUqAu5VMkmRj8lcG2Zc/5B5lT6UE2K5sltxPj+NKT+QHcTGPuvrUzs1cpiwABes9CEBOTBL5S7jaYom+O07xdxwBcIq6AMM90SfXaqcuOJFbJDyp4SLmRcs4CmA9EBot6U8tjqIo7nOeVvJ9MRP3YIRrxkqU4U8SAx0HAWTXdnKxEtdipE7aUfL5mIPZyHfNWI4yscV/dfJd4AmO4PuxT69qIX8xV/GUqyfNXGUdj1TuAyi6hTuc8VvmxSR4PHDy4/mKhA9H+ABtfx3qAhQq0CcjLIlJMDNA6mfyVu6WqL+Stztvz1IX4EbbyqwdegOISlCEQMBzeT8PS5DfwonuYw91AexnActsxtvfA5jHf1B+ncm+9ou4UqrFr5bdkKUuQIVttS/yEcv0T9gP6Awx+CD/LW5iuyv5o1ysEoJVFMCxC6zjAFZbXlnik3ofzuIuV+rkHv5AdUOmqgDOXeAYzrJMP8ULPJPP5QIbWRPxKq/xMttQFeAmRyceoLDZK/qiJ/KFXM6TrtRb+DRHeRZYUQDnxa83AV5u006vVHRsNF+SaPHHuIQFXsl7EaDC0Z0wzwH4tOW13Worgxzmeqv7N+/gWX7IKwvADNdI0DSABTYd5TwOZj8F10ocOtytnBRMfEFtNjgcbgsGE7BOHOZiLLO4thRLAUbQgHqb1wlUdS2jiZ2cis3o/rtpxRqUiV1BkFdXy7kLJMmDAMAzuM81pzXq+UL8ORNuS7h6jA8GfQrF+RfQfezmHgkYwiJAtOEej/7kYDr+xYtin9fF3lVhNoaIBaI6WAHU1Hpd4jv8cTTvJo+/AZLcHquxgBGS2zhZV0RRoROU6AJJclM09xelI/FWiI3kOZ/FWr9UhSZQ6NoFAsC4jlG/2I8nfPg1vPONWCre0ymAMxIFkAuFZWNs9N0SHPZcc6s50n4FAMZ3/BGNuAmnPNUbRoVp6lYCXCpZakLnG7ENU9Dgod5HRaNp6h1IHAgNliw1iueJQ1EJtjAfV2MC8tA/9nLrSf6AX5ombi3AuZKlBObjrtiHFmzExvjLzEROnBzxrzA+xF/E66ZpW4IZEnOzTrR6n/8nnZfsbVC0o17a6hnYwC+YphYEEjvBjxRKjkSIM1Jld4h3JPYBH6FEoWx/PIdGbsch1OI46lHfNQsU3m6OxgUoxzTF8mfjWqtkttlMh9vwT3HENGlbMEciPucXG/37qchKfi4gGrBeuz+TeE2yJXBC93jA/WjSXucV/k1oE0AcgP7T38WmSTsIAOBJvKy5zhzTpB0FEO24HitNu2VQAECExZ34GWjaNWMCAIB4DNN8BDvSCLYr+mI9Po/r8Ge0mXZRL6IjQWajFKPRc9W9Cn/EVPSXsHQcW9GekNIPk03TkxSAk7AKvhYgAQxECeaKV7oSODRNBOBcPBWIrQvxV94o1vk3FDB246fIjHu9l3CVRRI7cuRRx9yY5aE2ed4yrUg8MnAfgnwG2ADcbZqSqgCy+4JlcblpSqoCDAvY4nmmKakhC5UI9qTHB3oc5XRchwsVnnhhh2a8jxViT5fhMqVOzh2xPiDITtBmU45XNHN6l+l8iYMn8tjbtYsvOAF4Q6D0SbKOAztsZ4gjuB2ShwtcUY+bRXNAtuIR/IBqQOcTzzIAsQGleNu3SaIcI4V/O9buarOZBQCiEl9mnuVcoAtjcZtl+stYC+IT7BQntJAHgB34TuA2Vb8q3mLTmh62LRFcH9CP/wm4D1jRaTuADe76IZowFus97kToiSNYiLmdH9LkoUeiGlOZhcFBjANEQqAnTQQAABHGx8FbTYsmoBOnvQAp1gSYj2xvBVEnvOxVSh0BKPAjzIP3fcIRbsVcsV+1WOo0gUV4wgd9IBPj8Q4/l6YCMBcLAjDTH/PTVACUBNQYv5quApwwZSdVBNiFQ4HYUd5/kiICiFbMwknfZl7Dk6pFdN4GwyrpYhsvxU9Q7HkccBDlWCnaVQvqFOB/aLDcDLHHOruowhyN3thAYxMQtHnCcEo9ylBvH/CIRdrHeM406aQJIMp7bLaJ4LZUOSnQAd1zgdnYh4diq497MSu4sCkH4i6Mltq7YIVqVGCVCGsWQBCPcw3GoAR1COFN2af7SNAvxN98zR2AGfg+x8lXqBwU1QupE47ueDRFBkLK9HPx9UAMTUlTAaQP97ghL10F2K9wusUJoTQVQLQHEj+IYGGaCgCI32AOan2Z2IfxYkfKxAQ9SLAcy3mB93GAqAFUBkL1iunJEeGAXwv+/81OWv1THV/gAYuBRFNqPmFajwATLARIs12BfiVYxEgC/WeT+SDdlADHsIJNJFv4Nq837Y0pETI5LP2PzPaiF70AAPwfoSa7kBpCevQAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMTAtMTBUMTA6NTg6NDYrMDI6MDCT53dBAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTEwLTEwVDEwOjU4OjQ2KzAyOjAw4rrP/QAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="

/***/ }),
/* 28 */
/*!******************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images/lifestyle_gl.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAQAAABpN6lAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiCgoKNhe1DXmIAAAEC0lEQVR42u2aS2hUZxiGnz/B4AWSthFS6ULoRUtKQcEEUpBgRLClgouCYBdZaTduRNyEEqR0KYLgxmykSAWxuLFpS5sojdLaRFelVmhTcCFJ2phmHBJzmczbXZwzyWTOnMt/2vR7ZvV/hznv+37nP4f/XMAwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwDMMwjPWKi/Y31VNHfckv4n5iIgoUWKRAwRVTbIAa2M+bvLz820pdJoGrNSPPGOOMMcY4vzLoFhJogA7yIYdoyjpfBHLc4HP3TYw9qF1D+q8zpPZo4Z3OqJi1+0Qo6owqzvQKG7SZz/jA53xNmS/odrOhG6ANfEdn1p4T5nsOuMWV5dWv5hfWXXzo5MJq5VVmgI5z0YOhj3lSMmrmUw+aH7m+qg1QI3/Q7MFMuxspUW1j2IPmE151T4OllafAaS/x4ZU1RmnRzOnyUlkD1MJJL1agfo1RepxUS7DgQG/wCR28AMAGNnuyMkvpNdm/7jQ/0ut+c2plxJv4v41Z2pz6eS9rHxnyldMUL2btIkP+rmM6aw+ZMl3H9aw9ZMp1p03cYH/WPjJikEMO5HifNhqB42zyJP0DI2WVNt7xpP2MPuApI3zpgvfJmvS0CoR3y5/U6CBfe9KeciUpgyvBEM/QEmGB2ytqt72pz5cOgg34y5OFu26mvORmuOtJPZAymwYM1FBdlw0YrKG6DhuQr3DvP0w+6wb86cXALVdYrewK3PKiH0gZbMBPXgz0RdiSJIGUwXXARqZSXwr9wttOq2+S42feSln/GS+5uefDwAxwcwylLA9nK8UHJ86mrj9UGn/lM8FvU5Z/zJU1t1/hccoOyhKWNyDOq8QwnF/7ja1b4HzKDqol1ECKb+km1FjNnxo1kaKD6ost7U1R/nCYQ6TDKTrYG8bAzZTEL4WdpbqUkoOb4eQ7UxF/VH36l5wGj1LxEPaNpy4nLr2kfWHjA2iflhL3cDm8/BY9SFS6qGO1xAfQsYQ/z3igLbXIt2omQfETtcYH0IkEHcyotVb5o4kdgVNR4gPoVEIOijoaRf6I5mNL59UdNT6AupWP7WFeR6LKdykXS/q+dsSJD6Aduh/LQ05dceR36WFE4aLOqSFufAA16Fzk0/GhdsWX74lwQexXRxLhl110qL9mDzPqSeYQoO26qsWQsku6pt1Jhl92sVvXQq8OFnVV25OV36YejVYRvaNe7Uwj/LKLnerVnSoHY1Q92hZ2jzV95S3HHtrZQxuvsRGAIpOMM8HvDDDocmmGL/HRRBcHeJ2Wkg+35xhlhHsMc6/yI5eYDQiYaKCJOibdkp/QFX3Us5UiuTBfhhuGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiGYRiG8f/iH2PaNcHQZiJ/AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTEwLTEwVDEwOjU0OjIzKzAyOjAwHYyx7wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0xMC0xMFQxMDo1NDoyMyswMjowMGzRCVMAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAAAElFTkSuQmCC"

/***/ }),
/* 29 */
/*!******************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images/lifestyle_mu.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAQAAABpN6lAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiCgoKNxQ1HxlzAAACfUlEQVR42u2bv2pTcQBGv9glgjpEBK0isSCCFCl1cRGKi04uOomd7BMoPoHg6GN01LWIZvUdCo4OlmpFIkZJ+zlF8M+Sm/u7J+F+Z7+/e75DcglcIjWKb/ul3/m9n/tUs3eeC/zEY0/46Hu0T9PzH/pPxr5POzUb4JX/5qfv0lbNze966H/54Tu0WVMB+v4/332LdmMD2N98k7ZjA9hffYP2YwPYX3ydNmQD2J98jfA6Rof5TU9vfLXNAaQzeuvLbQ4gndXAl9ocQLqggS+2OYDU12sfb3MA6YqetTuA9KDtAc75dLsDSCfbHqAxEoAWoEkAWoAmAWgBmgSgBWgSgBagSQBagCYBaAGaBKAFaBoK4BVtTXXBI/ebj1Fu/lMfelrGfkx71zV/a+rxE6b71FSiU3x+Vx/Uq3jxZ53vjMr6lX8GrFaeL/W0WlqvfIAV8Oq5CDDbHYr75XcALUCTALQATQLQAjQJQAvQJAAtQJMAtABNAtACNAlAC9AkAC1AUziAu1qf6YB1dxusUfv8De9VficwYc8b9I6q89c8mnm+bY+8Rm+pFmCnlvm2vVPOstibIS9pqLq+vyOd6ByW8Sz3EFyubb7U1XIpzXIBlub4tEYCLAgJQAvQJAAtQJMAtABNAtACNAlAC9AkAC1AkwC0AE0C0AI0CUAL0CQALUCTALQATQLQAjQJQAvQJAAtQJMAtABNAtACNAlAC9AkAC1AkwC0AE0C0AI0CUAL0CQALUCTALQATQLQAjQJQAvQJAAtQJMAtABNuQD7OqrtrCPtL1yAzlC7tR222xkuXABJL+bwpGbxdi3/Hd+md8ySYNMDH1SefuCBN8sa/gJkaOeqW35B1gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMC0xMFQxMDo1NToyMCswMjowMMOmwEwAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTAtMTBUMTA6NTU6MjArMDI6MDCy+3jwAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="

/***/ }),
/* 30 */
/*!********************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images/lifestyle_ptfc.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 31 */
/*!*******************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images/lifestyle_spi.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 32 */
/*!*********************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images/lifestyle_sport.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 33 */
/*!********************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images/lifestyle_trav.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 34 */
/*!******************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/images/lifestyle_uv.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 35 */,
/* 36 */,
/* 37 */
/*!**************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/utils/utils.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var formatDate = function formatDate(nDate, date) {
  if (isNaN(nDate.getTime())) {
    // 不是时间格式
    return '--';
  }
  var o = {
    'M+': nDate.getMonth() + 1,
    'd+': nDate.getDate(),
    'h+': nDate.getHours(),
    'm+': nDate.getMinutes(),
    's+': nDate.getSeconds(),
    // 季度
    'q+': Math.floor((nDate.getMonth() + 3) / 3),
    'S': nDate.getMilliseconds() };

  if (/(y+)/.test(date)) {
    date = date.replace(RegExp.$1, (nDate.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(date)) {
      date = date.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return date;
};

var isEmptyObject = function isEmptyObject(obj) {
  for (var i in obj) {
    return false;
  }
  return true;
};

// let themeSetting = () => {
//   let bcgColor = '#40a7e7'
//   let hour = new Date().getHours()
//   if (hour >= 6 && hour <= 17) {
//     bcgColor = '#40a7e7'
//   } else {
//     bcgColor = '#384148'
//   }
//   wx.setNavigationBarColor({
//     frontColor: '#ffffff',
//     backgroundColor: bcgColor,
//   })
//   return bcgColor
// }

// 比较版本号：left > right 1, left < right -1, left == right 0
// 用途：旧版本不执行写入、删除 日历操作
var cmpVersion = function cmpVersion(left, right) {
  if (typeof left + typeof right !== 'stringstring') {
    return false;
  }
  var a = left.split('.');
  var b = right.split('.');
  var i = 0;
  var len = Math.max(a.length, b.length);
  for (; i < len; i++) {
    if (a[i] && !b[i] && parseInt(a[i]) > 0 || parseInt(a[i]) > parseInt(b[i])) {
      return 1;
    } else if (b[i] && !a[i] && parseInt(b[i]) > 0 || parseInt(a[i]) < parseInt(b[i])) {
      return -1;
    }
  }
  return 0;
};

module.exports = {
  formatDate: formatDate,
  isEmptyObject: isEmptyObject,
  // themeSetting,
  cmpVersion: cmpVersion };

/***/ }),
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */
/*!*************************************************************!*\
  !*** C:/Users/25740/Desktop/专属定制/static/data/staticData.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  cities: [{ "letter": "B", "name": "北京市" }, { "letter": "T", "name": "天津市" }, { "letter": "S", "name": "石家庄市" }, { "letter": "T", "name": "唐山市" }, { "letter": "Q", "name": "秦皇岛市" }, { "letter": "H", "name": "邯郸市" }, { "letter": "X", "name": "邢台市" }, { "letter": "B", "name": "保定市" }, { "letter": "Z", "name": "张家口市" }, { "letter": "C", "name": "承德市" }, { "letter": "C", "name": "沧州市" }, { "letter": "L", "name": "廊坊市" }, { "letter": "H", "name": "衡水市" }, { "letter": "T", "name": "太原市" }, { "letter": "D", "name": "大同市" }, { "letter": "Y", "name": "阳泉市" }, { "letter": "C", "name": "长治市" }, { "letter": "J", "name": "晋城市" }, { "letter": "S", "name": "朔州市" }, { "letter": "J", "name": "晋中市" }, { "letter": "Y", "name": "运城市" }, { "letter": "X", "name": "忻州市" }, { "letter": "L", "name": "临汾市" }, { "letter": "L", "name": "吕梁市" }, { "letter": "H", "name": "呼和浩特市" }, { "letter": "B", "name": "包头市" }, { "letter": "W", "name": "乌海市" }, { "letter": "C", "name": "赤峰市" }, { "letter": "T", "name": "通辽市" }, { "letter": "E", "name": "鄂尔多斯市" }, { "letter": "H", "name": "呼伦贝尔市" }, { "letter": "B", "name": "巴彦淖尔市" }, { "letter": "W", "name": "乌兰察布市" }, { "letter": "X", "name": "兴安盟" }, { "letter": "X", "name": "锡林郭勒盟" }, { "letter": "A", "name": "阿拉善盟" }, { "letter": "S", "name": "沈阳市" }, { "letter": "D", "name": "大连市" }, { "letter": "A", "name": "鞍山市" }, { "letter": "F", "name": "抚顺市" }, { "letter": "B", "name": "本溪市" }, { "letter": "D", "name": "丹东市" }, { "letter": "J", "name": "锦州市" }, { "letter": "Y", "name": "营口市" }, { "letter": "F", "name": "阜新市" }, { "letter": "L", "name": "辽阳市" }, { "letter": "P", "name": "盘锦市" }, { "letter": "T", "name": "铁岭市" }, { "letter": "C", "name": "朝阳市" }, { "letter": "H", "name": "葫芦岛市" }, { "letter": "Z", "name": "长春市" }, { "letter": "J", "name": "吉林市" }, { "letter": "S", "name": "四平市" }, { "letter": "L", "name": "辽源市" }, { "letter": "T", "name": "通化市" }, { "letter": "B", "name": "白山市" }, { "letter": "S", "name": "松原市" }, { "letter": "B", "name": "白城市" }, { "letter": "Y", "name": "延边朝鲜族自治州" }, { "letter": "H", "name": "哈尔滨市" }, { "letter": "Q", "name": "齐齐哈尔市" }, { "letter": "J", "name": "鸡西市" }, { "letter": "H", "name": "鹤岗市" }, { "letter": "S", "name": "双鸭山市" }, { "letter": "D", "name": "大庆市" }, { "letter": "Y", "name": "伊春市" }, { "letter": "J", "name": "佳木斯市" }, { "letter": "Q", "name": "七台河市" }, { "letter": "M", "name": "牡丹江市" }, { "letter": "H", "name": "黑河市" }, { "letter": "S", "name": "绥化市" }, { "letter": "D", "name": "大兴安岭地区" }, { "letter": "S", "name": "上海市" }, { "letter": "N", "name": "南京市" }, { "letter": "W", "name": "无锡市" }, { "letter": "X", "name": "徐州市" }, { "letter": "C", "name": "常州市" }, { "letter": "S", "name": "苏州市" }, { "letter": "N", "name": "南通市" }, { "letter": "L", "name": "连云港市" }, { "letter": "H", "name": "淮安市" }, { "letter": "Y", "name": "盐城市" }, { "letter": "Y", "name": "扬州市" }, { "letter": "Z", "name": "镇江市" }, { "letter": "T", "name": "泰州市" }, { "letter": "S", "name": "宿迁市" }, { "letter": "H", "name": "杭州市" }, { "letter": "N", "name": "宁波市" }, { "letter": "W", "name": "温州市" }, { "letter": "J", "name": "嘉兴市" }, { "letter": "H", "name": "湖州市" }, { "letter": "S", "name": "绍兴市" }, { "letter": "J", "name": "金华市" }, { "letter": "Q", "name": "衢州市" }, { "letter": "Z", "name": "舟山市" }, { "letter": "T", "name": "台州市" }, { "letter": "L", "name": "丽水市" }, { "letter": "H", "name": "合肥市" }, { "letter": "W", "name": "芜湖市" }, { "letter": "B", "name": "蚌埠市" }, { "letter": "H", "name": "淮南市" }, { "letter": "M", "name": "马鞍山市" }, { "letter": "H", "name": "淮北市" }, { "letter": "T", "name": "铜陵市" }, { "letter": "A", "name": "安庆市" }, { "letter": "H", "name": "黄山市" }, { "letter": "C", "name": "滁州市" }, { "letter": "F", "name": "阜阳市" }, { "letter": "S", "name": "宿州市" }, { "letter": "L", "name": "六安市" }, { "letter": "B", "name": "亳州市" }, { "letter": "C", "name": "池州市" }, { "letter": "X", "name": "宣城市" }, { "letter": "F", "name": "福州市" }, { "letter": "S", "name": "厦门市" }, { "letter": "P", "name": "莆田市" }, { "letter": "S", "name": "三明市" }, { "letter": "Q", "name": "泉州市" }, { "letter": "Z", "name": "漳州市" }, { "letter": "N", "name": "南平市" }, { "letter": "L", "name": "龙岩市" }, { "letter": "N", "name": "宁德市" }, { "letter": "N", "name": "南昌市" }, { "letter": "J", "name": "景德镇市" }, { "letter": "P", "name": "萍乡市" }, { "letter": "J", "name": "九江市" }, { "letter": "X", "name": "新余市" }, { "letter": "Y", "name": "鹰潭市" }, { "letter": "G", "name": "赣州市" }, { "letter": "J", "name": "吉安市" }, { "letter": "Y", "name": "宜春市" }, { "letter": "F", "name": "抚州市" }, { "letter": "S", "name": "上饶市" }, { "letter": "J", "name": "济南市" }, { "letter": "Q", "name": "青岛市" }, { "letter": "Z", "name": "淄博市" }, { "letter": "Z", "name": "枣庄市" }, { "letter": "D", "name": "东营市" }, { "letter": "Y", "name": "烟台市" }, { "letter": "W", "name": "潍坊市" }, { "letter": "J", "name": "济宁市" }, { "letter": "T", "name": "泰安市" }, { "letter": "W", "name": "威海市" }, { "letter": "R", "name": "日照市" }, { "letter": "L", "name": "莱芜市" }, { "letter": "L", "name": "临沂市" }, { "letter": "D", "name": "德州市" }, { "letter": "L", "name": "聊城市" }, { "letter": "B", "name": "滨州市" }, { "letter": "H", "name": "菏泽市" }, { "letter": "Z", "name": "郑州市" }, { "letter": "K", "name": "开封市" }, { "letter": "L", "name": "洛阳市" }, { "letter": "P", "name": "平顶山市" }, { "letter": "A", "name": "安阳市" }, { "letter": "H", "name": "鹤壁市" }, { "letter": "X", "name": "新乡市" }, { "letter": "J", "name": "焦作市" }, { "letter": "P", "name": "濮阳市" }, { "letter": "X", "name": "许昌市" }, { "letter": "L", "name": "漯河市" }, { "letter": "S", "name": "三门峡市" }, { "letter": "N", "name": "南阳市" }, { "letter": "S", "name": "商丘市" }, { "letter": "X", "name": "信阳市" }, { "letter": "Z", "name": "周口市" }, { "letter": "Z", "name": "驻马店市" }, { "letter": "J", "name": "济源市" }, { "letter": "W", "name": "武汉市" }, { "letter": "H", "name": "黄石市" }, { "letter": "S", "name": "十堰市" }, { "letter": "Y", "name": "宜昌市" }, { "letter": "X", "name": "襄阳市" }, { "letter": "E", "name": "鄂州市" }, { "letter": "J", "name": "荆门市" }, { "letter": "X", "name": "孝感市" }, { "letter": "J", "name": "荆州市" }, { "letter": "H", "name": "黄冈市" }, { "letter": "X", "name": "咸宁市" }, { "letter": "S", "name": "随州市" }, { "letter": "E", "name": "恩施土家族苗族自治州" }, { "letter": "X", "name": "仙桃市" }, { "letter": "Q", "name": "潜江市" }, { "letter": "T", "name": "天门市" }, { "letter": "S", "name": "神农架林区" }, { "letter": "C", "name": "长沙市" }, { "letter": "Z", "name": "株洲市" }, { "letter": "X", "name": "湘潭市" }, { "letter": "H", "name": "衡阳市" }, { "letter": "S", "name": "邵阳市" }, { "letter": "Y", "name": "岳阳市" }, { "letter": "C", "name": "常德市" }, { "letter": "Z", "name": "张家界市" }, { "letter": "Y", "name": "益阳市" }, { "letter": "C", "name": "郴州市" }, { "letter": "Y", "name": "永州市" }, { "letter": "H", "name": "怀化市" }, { "letter": "L", "name": "娄底市" }, { "letter": "X", "name": "湘西土家族苗族自治州" }, { "letter": "G", "name": "广州市" }, { "letter": "S", "name": "韶关市" }, { "letter": "S", "name": "深圳市" }, { "letter": "Z", "name": "珠海市" }, { "letter": "S", "name": "汕头市" }, { "letter": "F", "name": "佛山市" }, { "letter": "J", "name": "江门市" }, { "letter": "Z", "name": "湛江市" }, { "letter": "M", "name": "茂名市" }, { "letter": "Z", "name": "肇庆市" }, { "letter": "H", "name": "惠州市" }, { "letter": "M", "name": "梅州市" }, { "letter": "S", "name": "汕尾市" }, { "letter": "H", "name": "河源市" }, { "letter": "Y", "name": "阳江市" }, { "letter": "Q", "name": "清远市" }, { "letter": "D", "name": "东莞市" }, { "letter": "Z", "name": "中山市" }, { "letter": "C", "name": "潮州市" }, { "letter": "J", "name": "揭阳市" }, { "letter": "Y", "name": "云浮市" }, { "letter": "N", "name": "南宁市" }, { "letter": "L", "name": "柳州市" }, { "letter": "G", "name": "桂林市" }, { "letter": "W", "name": "梧州市" }, { "letter": "B", "name": "北海市" }, { "letter": "F", "name": "防城港市" }, { "letter": "Q", "name": "钦州市" }, { "letter": "G", "name": "贵港市" }, { "letter": "Y", "name": "玉林市" }, { "letter": "B", "name": "百色市" }, { "letter": "H", "name": "贺州市" }, { "letter": "H", "name": "河池市" }, { "letter": "L", "name": "来宾市" }, { "letter": "C", "name": "崇左市" }, { "letter": "H", "name": "海口市" }, { "letter": "S", "name": "三亚市" }, { "letter": "S", "name": "三沙市" }, { "letter": "D", "name": "儋州市" }, { "letter": "W", "name": "五指山市" }, { "letter": "Q", "name": "琼海市" }, { "letter": "W", "name": "文昌市" }, { "letter": "W", "name": "万宁市" }, { "letter": "D", "name": "东方市" }, { "letter": "D", "name": "定安县" }, { "letter": "T", "name": "屯昌县" }, { "letter": "C", "name": "澄迈县" }, { "letter": "L", "name": "临高县" }, { "letter": "B", "name": "白沙黎族自治县" }, { "letter": "C", "name": "昌江黎族自治县" }, { "letter": "L", "name": "乐东黎族自治县" }, { "letter": "L", "name": "陵水黎族自治县" }, { "letter": "B", "name": "保亭黎族苗族自治县" }, { "letter": "Q", "name": "琼中黎族苗族自治县" }, { "letter": "C", "name": "重庆市" }, { "letter": "C", "name": "成都市" }, { "letter": "Z", "name": "自贡市" }, { "letter": "P", "name": "攀枝花市" }, { "letter": "L", "name": "泸州市" }, { "letter": "D", "name": "德阳市" }, { "letter": "M", "name": "绵阳市" }, { "letter": "G", "name": "广元市" }, { "letter": "S", "name": "遂宁市" }, { "letter": "N", "name": "内江市" }, { "letter": "L", "name": "乐山市" }, { "letter": "N", "name": "南充市" }, { "letter": "M", "name": "眉山市" }, { "letter": "Y", "name": "宜宾市" }, { "letter": "G", "name": "广安市" }, { "letter": "D", "name": "达州市" }, { "letter": "Y", "name": "雅安市" }, { "letter": "B", "name": "巴中市" }, { "letter": "Z", "name": "资阳市" }, { "letter": "A", "name": "阿坝藏族羌族自治州" }, { "letter": "G", "name": "甘孜藏族自治州" }, { "letter": "L", "name": "凉山彝族自治州" }, { "letter": "G", "name": "贵阳市" }, { "letter": "L", "name": "六盘水市" }, { "letter": "Z", "name": "遵义市" }, { "letter": "A", "name": "安顺市" }, { "letter": "B", "name": "毕节市" }, { "letter": "T", "name": "铜仁市" }, { "letter": "Q", "name": "黔西南布依族苗族自治州" }, { "letter": "Q", "name": "黔东南苗族侗族自治州" }, { "letter": "Q", "name": "黔南布依族苗族自治州" }, { "letter": "K", "name": "昆明市" }, { "letter": "Q", "name": "曲靖市" }, { "letter": "Y", "name": "玉溪市" }, { "letter": "B", "name": "保山市" }, { "letter": "Z", "name": "昭通市" }, { "letter": "L", "name": "丽江市" }, { "letter": "P", "name": "普洱市" }, { "letter": "L", "name": "临沧市" }, { "letter": "C", "name": "楚雄彝族自治州" }, { "letter": "H", "name": "红河哈尼族彝族自治州" }, { "letter": "W", "name": "文山壮族苗族自治州" }, { "letter": "X", "name": "西双版纳傣族自治州" }, { "letter": "D", "name": "大理白族自治州" }, { "letter": "D", "name": "德宏傣族景颇族自治州" }, { "letter": "N", "name": "怒江傈僳族自治州" }, { "letter": "D", "name": "迪庆藏族自治州" }, { "letter": "L", "name": "拉萨市" }, { "letter": "R", "name": "日喀则市" }, { "letter": "C", "name": "昌都市" }, { "letter": "L", "name": "林芝市" }, { "letter": "S", "name": "山南市" }, { "letter": "N", "name": "那曲地区" }, { "letter": "A", "name": "阿里地区" }, { "letter": "X", "name": "西安市" }, { "letter": "T", "name": "铜川市" }, { "letter": "B", "name": "宝鸡市" }, { "letter": "X", "name": "咸阳市" }, { "letter": "W", "name": "渭南市" }, { "letter": "Y", "name": "延安市" }, { "letter": "H", "name": "汉中市" }, { "letter": "Y", "name": "榆林市" }, { "letter": "A", "name": "安康市" }, { "letter": "S", "name": "商洛市" }, { "letter": "L", "name": "兰州市" }, { "letter": "J", "name": "嘉峪关市" }, { "letter": "J", "name": "金昌市" }, { "letter": "B", "name": "白银市" }, { "letter": "T", "name": "天水市" }, { "letter": "W", "name": "武威市" }, { "letter": "Z", "name": "张掖市" }, { "letter": "P", "name": "平凉市" }, { "letter": "J", "name": "酒泉市" }, { "letter": "Q", "name": "庆阳市" }, { "letter": "D", "name": "定西市" }, { "letter": "L", "name": "陇南市" }, { "letter": "L", "name": "临夏回族自治州" }, { "letter": "G", "name": "甘南藏族自治州" }, { "letter": "X", "name": "西宁市" }, { "letter": "H", "name": "海东市" }, { "letter": "H", "name": "海北藏族自治州" }, { "letter": "H", "name": "黄南藏族自治州" }, { "letter": "H", "name": "海南藏族自治州" }, { "letter": "G", "name": "果洛藏族自治州" }, { "letter": "Y", "name": "玉树藏族自治州" }, { "letter": "H", "name": "海西蒙古族藏族自治州" }, { "letter": "Y", "name": "银川市" }, { "letter": "S", "name": "石嘴山市" }, { "letter": "W", "name": "吴忠市" }, { "letter": "G", "name": "固原市" }, { "letter": "Z", "name": "中卫市" }, { "letter": "W", "name": "乌鲁木齐市" }, { "letter": "K", "name": "克拉玛依市" }, { "letter": "T", "name": "吐鲁番市" }, { "letter": "H", "name": "哈密市" }, { "letter": "C", "name": "昌吉回族自治州" }, { "letter": "B", "name": "博尔塔拉蒙古自治州" }, { "letter": "B", "name": "巴音郭楞蒙古自治州" }, { "letter": "A", "name": "阿克苏地区" }, { "letter": "K", "name": "克孜勒苏柯尔克孜自治州" }, { "letter": "K", "name": "喀什地区" }, { "letter": "H", "name": "和田地区" }, { "letter": "Y", "name": "伊犁哈萨克自治州" }, { "letter": "T", "name": "塔城地区" }, { "letter": "A", "name": "阿勒泰地区" }, { "letter": "S", "name": "石河子市" }, { "letter": "A", "name": "阿拉尔市" }, { "letter": "T", "name": "图木舒克市" }, { "letter": "W", "name": "五家渠市" }, { "letter": "B", "name": "北屯市" }, { "letter": "S", "name": "双河市" }, { "letter": "K", "name": "可克达拉市" }] };

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map