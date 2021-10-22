/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const parsePropertiesFile = require("utils/node-properties.js");
const { sprintf } = require("utils/sprintf.js");

/**
 * Localization convenience methods.
 *
 * @param string b
 *        The desired string bundle's name.
 */
function LocalizationHelper(b) {
  this.bundleName = b;
}

LocalizationHelper.prototype = {
  /**
   * Download and parse the localized strings bundle.
   *
   * @return {Object} parsed properties mapped in an object.
   */
  fetchBundle: async function() {
    const pf = await fetch("raw!" + this.bundleName);
    return parsePropertiesFile(pf);
  },

  /**
   * L10N shortcut function. Can be used with a single string or an array of
   * strings.
   *
   * @param {String|Array} n
   * @return {String}
   */
  getString: async function(n) {
    if (Array.isArray(n)) {
      const s = [];

      for (const i = 0; i < n.length; i++) {
        const p = await this.fetchBundle();
        if (n[i] in p) {
          s.push(p[n]);
        } else {
          throw new Error("No localization found for [" + n[i] + "]");
        }
      }
      return s;
    }

    const p = await this.fetchBundle();
    if (n in p) {
      return p[n];
    }
    throw new Error("No localization found for [" + n + "]");
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
