/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const parsePropertiesFile = require("utils/node-properties.js");
const { sprintf } = require("utils/sprintf.js");

/**
 * Localization convenience methods.
 *
 * @param string bundleName
 *        The desired string bundle's name.
 */
function LocalizationHelper(bundleName) {
  this.bundleName = bundleName;
}

LocalizationHelper.prototype = {
  /**
   * Download and parse the localized strings bundle.
   *
   * @return {Object} parsed properties mapped in an object.
   */
  fetchBundle: async function() {
    const propertiesFile = await fetch("raw!" + this.bundleName);
    return parsePropertiesFile(propertiesFile);
  },

  /**
   * L10N shortcut function.
   *
   * @param {String} name
   * @return {String}
   */
  getString: async function(name) {
    const properties = await this.fetchBundle();
    if (name in properties) {
      return properties[name];
    }
    throw new Error("No localization found for [" + name + "]");
  },

  /**
   * L10N shortcut function.
   *
   * @param {String} name
   * @param {Array} args
   * @return {String}
   */
  getFormatString: async function(name, ...args) {
    const string = await this.getString(name);
    return sprintf(string, ...args);
  },
};

exports.LocalizationHelper = LocalizationHelper;
