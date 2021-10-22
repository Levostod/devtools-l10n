/* Any copyright is dedicated to the Public Domain.
   http://creativecommons.org/publicdomain/zero/1.0/ */

"use strict";

// Tests that the localization helper works properly.

const { LocalizationHelper } = require("devtools-l10n");

add_task(async function() {
  const localizationHelper = new LocalizationHelper("test.properties");
  const simpleString = await localizationHelper.getString("test.label");
  is(simpleString, "Test", "LocalizationHelper could localize a string");

  const formattedString = await localizationHelper.getFormatString(
    "test.formatted",
    "param"
  );
  is(
    formattedString,
    "Test (param) formatted",
    "LocalizationHelper could format a string with a parameter"
  );

  await Assert.rejects(
    localizationHelper.getString("missing.string"),
    /No localization found for \[missing\.string\]/,
    "MultiLocalizationHelper throws for a missing string"
  );
});
