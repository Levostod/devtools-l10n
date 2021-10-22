/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const { LocalizationHelper } = require("devtools-l10n");

function Inspector(toolbox) {
  this._toolbox = toolbox;
  this._doc = window.document;

  this._localizationHelper = new LocalizationHelper(
    "locales/inspector.properties"
  );
}

Inspector.prototype = {
  async init() {
    // l10n.js is used to translate all strings from index.html.
    this._localizeMarkup();

    // l10n.js is also used to retrieve specific strings, to setup keyboard
    // shortcuts for instance.
    const searchKey = this._localizationHelper.getString("inspector.search.key");
    this._toolbox.addKeyboardShortcut(searchKey, event => {
      event.preventDefault();
      this._doc.getElementById("inspector-searchbox").focus();
    });

    // Not showcased here, but l10n.js could also translate strings outside of
    // the initialization of the panel. However, most of the time the localized
    // strings are retrieved very early in the lifecycle of a DevTools panel.
  },


  /**
   * Translate all the initial markup of the panel
   */
  _localizeMarkup() {
    // Get all elements with a data-l10n attribute.
    const elements = this._doc.querySelectorAll("[data-l10n]");

    for (const element of elements) {

      // data-l10n attributes contain values such as "title=inspector.ruleview.title"
      // which means that the "title" attribute of the element should use the
      // localized string corresponding to "inspector.ruleview.title"
      const [attr, l10nKey] = element.getAttribute("data-l10n").split("=");
      const localizedString = this._localizationHelper.getString(l10nKey);

      if (attr == "content") {
        // "content" is a special case where the localized string should be used
        // as text content for the element.
        element.textContent = localizedString;
      } else {
        element.setAttribute(attr, localizedString);
      }
    }
  },
};

exports.Inspector = Inspector;