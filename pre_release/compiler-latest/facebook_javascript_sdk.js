/*
 * Copyright 2010 The Closure Compiler Authors.
 * Copyright 2012 Denis Zawada.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Externs for Facebook Javascript SDK
 * @see http://developers.facebook.com/docs/reference/javascript/
 * @externs
 */

/** @const */
var FB = {};

/**
 * @typedef {{
 *   status: string,
 *   authResponse: (undefined|{
 *     userID: string,
 *     signedRequest: string,
 *     expiresIn: number,
 *     accessToken: string
 *   })
 * }}
 */
var FBAuthStatusResponse;

/**
 * @typedef {function(!FBAuthStatusResponse)}
 */
var FBAuthStatusCallback;

/**
 * @typedef {{
 *   appId: (undefined|string),
 *   cookie: (undefined|boolean),
 *   logging: (undefined|boolean),
 *   status: (undefined|boolean),
 *   xfbml: (undefined|boolean),
 *   channelUrl: (undefined|string),
 *   authResponse: (undefined|!Object),
 *   frictionlessRequests: (undefined|boolean),
 *   hideFlashCallback: (undefined|function({state: string, elem: Element}))
 * }}
 */
var FBInitOptions;

/**
 * @typedef {{scope: string}}
 */
var FBLoginOptions;

/**
 * @deprecated
 * @see http://developers.facebook.com/docs/reference/javascript/fb.getsession/
 * @return {Object.<*,*>}
 */
FB.getSession = function() { };

/**
 * @see http://developers.facebook.com/docs/reference/javascript/fb.api/
 * @param {string} path
 * @param {(string|Object.<string, *>|function(Object.<*,*>))=} method
 * @param {(Object.<string, *>|function(Object.<*,*>))=} params
 * @param {function(Object.<*,*>)=} callback
 */
FB.api = function(path, method, params, callback) { };

/**
 * @see https://developers.facebook.com/docs/reference/javascript/FB.getAuthResponse/
 * @return {!FBAuthStatusResponse}
 */
FB.getAuthResponse = function() {};

/**
 * @see http://developers.facebook.com/docs/reference/javascript/fb.getloginstatus/
 * @param {!FBAuthStatusCallback} callback
 * @param {boolean=} opt_force
 */
FB.getLoginStatus = function(callback, opt_force) {};

/**
 * @see http://developers.facebook.com/docs/reference/javascript/fb.init/
 * @param {!FBInitOptions=} opt_opts
 */
FB.init = function(opt_opts) {};

/**
 * @see http://developers.facebook.com/docs/reference/javascript/fb.login/
 * @param {!FBAuthStatusCallback=} opt_callback
 * @param {!FBLoginOptions=} opt_opts
 */
FB.login = function(opt_callback, opt_opts) {};

/**
 * @see http://developers.facebook.com/docs/reference/javascript/fb.logout/
 * @param {!FBAuthStatusCallback=} opt_callback
 */
FB.logout = function(opt_callback) {};

/**
 * @see http://developers.facebook.com/docs/reference/javascript/fb.ui/
 * @param {Object.<string, *>} params
 * @param {function(Object.<*,*>)=} opt_callback
 */
FB.ui = function(params, opt_callback) { };

/** @const */
FB.Event = {};

/**
 * @see http://developers.facebook.com/docs/reference/javascript/fb.Event.subscribe/
 * @param {string} eventName
 * @param {!FBAuthStatusCallback} callback
 */
FB.Event.subscribe = function(eventName, callback) {};

/**
 * @see http://developers.facebook.com/docs/reference/javascript/fb.Event.unsubscribe/
 * @param {string} eventName
 * @param {!FBAuthStatusCallback} callback
 */
FB.Event.unsubscribe = function(eventName, callback) {};

/** @const */
FB.XFBML = {};

/**
 * @see http://developers.facebook.com/docs/reference/javascript/fb.XFBML.parse/
 * @param {Element=} node
 * @param {function(Object.<*,*>)=} callback
 */
FB.XFBML.parse = function(node, callback) {};

/** @const */
FB.Data = {};

/**
 * This object is not constructed directly. It is returned by calls to
 * FB.Data.Query.
 * @constructor
 * @private
 */
FB.Data.queryObject = function() {};

/**
 * @see http://developers.facebook.com/docs/reference/javascript/fb.data.query/
 * @param {string} template
 * @param {...(string|number|FB.Data.queryObject)} var_data
 * @return {FB.Data.queryObject}
 */
FB.Data.query = function(template, var_data) {};

/**
 * @see http://developers.facebook.com/docs/reference/javascript/fb.data.waiton/
 * @param {Array.<*>} dependencies
 * @param {function(Object.<*,*>)} callback
 * @return {Object.<*,*>}
 */
FB.Data.waitOn = function(dependencies, callback) {};

/** @const */
FB.Canvas = {};

/**
 * @see http://developers.facebook.com/docs/reference/javascript/fb.Canvas.setAutoResize/
 * @param {(boolean|number)=} onOrOff
 * @param {number=} interval
 */
FB.Canvas.setAutoResize = function(onOrOff, interval) {};

/**
 * @see http://developers.facebook.com/docs/reference/javascript/fb.Canvas.setSize/
 * @param {Object.<*, number>} params
 */
FB.Canvas.setSize = function(params) {};
