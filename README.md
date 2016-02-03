ionic-ng-boilerplate
====================

Boilerplate for quickly start building ionic's apps. Based on ng-boilerplate by Josh David Miller (http://joshdmiller.github.com/ng-boilerplate).




***

## Quick Start

Install Node.js and then:

```sh
$ git git@gitlab.com:draniu/ionic-e-sim-app.git
$ cd ionic-e-sim-app
$ sudo npm -g install grunt-cli karma bower cordova ionic
$ npm install
$ bower install
$ ionic serve
```

add plugins

```sh
$ ionic plugin add com.google.admobsdk
$ ionic plugin add com.ionic.keyboard
$ ionic plugin add cordova-plugin-admobpro
$ ionic plugin add nl.x-services.plugins.toast
$ ionic plugin add cordova-plugin-device
$ ionic plugin add org.apache.cordova.console
$ ionic plugin add cordova-plugin-whitelist  
$ ionic plugin add org.apache.cordova.network-information
```

for IOS
```sh
$ ionic platform add ios
```
for Analytics
```sh
$ mkdir www/js
$ touch www/js/app.js
$ ionic add ionic-service-core
$ ionic add ionic-service-analytics
```


Notes:

 You can substitute android for ios.
 You need android SDK, ANT and JAVA SDK for running Cordova/Ionic apps on Android

Android development:

 You will need JAVA_HOME, ANT_HOME, ANDROID_HOME environments variables pointing to installation directories.<br>
 You will need to add to PATH JAVA_HOME/bin, ANT_HOME/bin, ANDROID_HOME/tools, ANDROID_HOME/platform-tools.<br>
 Remember to install the latest Android SDK with the SDK Manager.<br>
 You may need OEM Drivers to be able to run app on phone with (ionic run android).<br>

Happy hacking!
## Learn

### Overall Directory Structure

At a high level, the structure looks roughly like this:

```
ionic-ng-boilerplate/
  |- grunt-tasks/
  |- karma/
  |- src/
  |  |- app/
  |  |  |- <app logic>
  |  |- assets/
  |  |  |- <static files>
  |  |- common/
  |  |  |- <reusable code>
  |- vendor/
  |  |- angular-bootstrap/
  |  |- bootstrap/
  |  |- placeholders/
  |- .bowerrc
  |- bower.json
  |- build.config.js
  |- Gruntfile.js
  |- module.prefix
  |- module.suffix
  |- package.json
```

What follows is a brief description of each entry, but most directories contain
their own `README.md` file with additional documentation, so browse around to
learn more.

- `karma/` - test configuration.
- `src/` - our application sources. [Read more &raquo;](src/README.md)
- `vendor/` - third-party libraries. [Bower](http://bower.io) will install
  packages here. Anything added to this directory will need to be manually added
  to `build.config.js` and `karma/karma-unit.js` to be picked up by the build
  system.
- `.bowerrc` - the Bower configuration file. This tells Bower to install
  components into the `vendor/` directory.
- `bower.json` - this is our project configuration for Bower and it contains the
  list of Bower dependencies we need.
- `build.config.js` - our customizable build settings; see "The Build System"
  below.
- `Gruntfile.js` - our build script; see "The Build System" below.
- `module.prefix` and `module.suffix` - our compiled application script is
  wrapped in these, which by default are used to place the application inside a
  self-executing anonymous function to ensure no clashes with other libraries.
- `package.json` - metadata about the app, used by NPM and our build script. Our
  NPM dependencies are listed here.

### Detailed Installation

This section provides a little more detailed understanding of what goes into
getting `ionic-ng-boilerplate` up and running. Though `ionic-ng-boilerplate` is really simple
to use, it might help to have an understanding of the tools involved here, like
Node.js and Grunt and Bower. If you're completely new to highly organized,
modern JavaScript development, take a few short minutes to read [this overview
of the tools](tools.md) before continuing with this section.

```sh
$ ionic platform add android
# ionic run android or ionic emulate android
```


### The Build System

The best way to learn about the build system is by familiarizing yourself with
Grunt and then reading through the heavily documented build script,
`Gruntfile.js`. But you don't need to do that to be very productive with
`ionic-ng-boilerplate`. What follows in this section is a quick introduction to the
tasks provided and should be plenty to get you started.

The driver of the process is the `delta` multi-task, which watches for file
changes using `grunt-contrib-watch` and executes one of nine tasks when a file
changes:

* `delta:gruntfile` - When `Gruntfile.js` changes, this task runs the linter
  (`jshint`) on that one file and reloads the configuration.
* `delta:assets` - When any file within `src/assets/` changes, all asset files
  are copied to `build/assets/`.
* `delta:html` - When `src/index.html` changes, it is compiled as a Grunt
  template, so script names, etc., are dynamically replaced with the correct
  values configured dynamically by Grunt.
* `delta:less` - When any `*.less` file within `src/` changes, the
  `src/less/main.less` file is linted and copied into
  `build/assets/ionic-ng-boilerplate.css`.
* `delta:jssrc` - When any JavaScript file within `src/` that does not end in
  `.spec.js` changes, all JavaScript sources are linted, all unit tests are run,
  and the all source files are re-copied to `build/src`.
* `delta:coffeesrc` - When any `*.coffee` file in `src/` that doesn't match
  `*.spec.coffee` changes, the Coffee scripts are compiled independently into
  `build/src` in a structure mirroring where they were in `src/` so it's easy to
  locate problems. For example, the file
  `src/common/titleService/titleService.coffee` is compiled to
  `build/src/common/titleService/titleService.js`.
* `delta:tpls` - When any `*.tpl.html` file within `src/` changes, all templates
  are put into strings in a JavaScript file (technically two, one for
  `src/common/` and another for `src/app/`) that will add the template to
  AngularJS's
  [`$templateCache`](http://docs.angularjs.org/api/ng.$templateCache) so
  template files are part of the initial JavaScript payload and do not require
  any future XHR.  The template cache files are `build/template-app.js` and
  `build/template-common.js`.
* `delta:jsunit` - When any `*.spec.js` file in `src/` changes, the test files
  are linted and the unit tests are executed.
* `delta:coffeeunit` - When any `*.spec.coffee` file in `src/` changes, the test
  files are linted, compiled their tests executed.



### My own command

```sh
$ cordova build android && adb install -r /media/truecrypt1/test3/platforms/android/ant-build/CordovaApp-debug.apk && adb -s BX9031M2WD logcat | grep D/CordovaLog

```
