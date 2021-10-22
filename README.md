# devtools-l10n

This repository contains a simplified version of the l10n.js module used in Firefox DevTools. You can see the original module on [searchfox](https://searchfox.org/mozilla-central/rev/36aa22c7ea92bd3cf7910774004fff7e63341cf5/devtools/shared/l10n.js).

Note that this is not a node or commonjs module. It is only intended to be used within the Firefox codebase.

Firefox is available in many languages and all the text displayed in the Browser, including DevTools should be localized.
This means strings are not hardcoded, but instead are dynamically translated.
LocalizationHelper is one of the helpers used in Firefox DevTools to translate strings.

It is used as follows:
```javascript
// Create a LocalizationHelper reading localized strings from a "toolbox.properties"
// file, which is called a bundle.
const localizationHelper = new LocalizationHelper(
  "devtools/client/locales/toolbox.properties"
);

// Retrieve the translation of a string. Here "toolbox.defaultTitle" is a key identifying
// a localized string.
const localizedTitle = await localizationHelper.getString(
  "toolbox.defaultTitle"
);
```

Note that we don't have to specify the locale anywhere in this API, the Firefox build system will ensure that the "bundles" we load correspond to the current locale.

You can find more examples in the /examples folder.