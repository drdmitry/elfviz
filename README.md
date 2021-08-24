# ELF Data Structure Visualization

Web application for visualization of the ELF files data structure (Sections, Symbols)

Sample files can be downloaded directly from the website (4 sample JSON files).

Two visualization charts was used:
* Icicles with interaction (to zoom sections, w/o animation)
* Sunburst without interaction


## Technologies used

React.js, D3.js, Bootstrap 3.3.7, FontAwesome, Jest, Enzyme, Webpack, Perl

* React is used as the rendering engine
* D3 - visualization kernel
* Bootstrap - a quick way to use responsive ui
* Jest, Enzyme - testing; Istanbul (comes with Jest) - code coverage
* Webpack - dev server and build system
* Perl - to create convertor for `readelf` output to `json` format


## Installation

To install dependencies:

```sh
yarn
or
npm install
```

## Build web application

```sh
yarn build:prod
or
npm run build:prod
```

As a result, application will be built into dist/ folder.

Open index.html in the browser.

## Tests
To run unit tests:
```sh
yarn test
or
npm test
```

To create tests coverage report:
```sh
yarn test:coverage
or
npm test:coverage
```

Report will be generated in the folder: `coverage/lcov-report/`

Generated code coverage report available at http://elfviz.conversiontools.io/lcov-report/

Code quality check was not included to the tests, because ESLint is integrated into IDE that I use (Visual Studio Code). ESLint can be added as an additional step in the build process.


## To run Development environment

```sh
yarn start
or
npm start
```

## To generate JSON for custom ELF binary

To generate JSON file for any ELF binary file, use `readelf` linux command and readelf output parser which was created for this task: `tools/parse-readelf.pl`
```sh
readelf -W -S -s "BinaryFile.o" > ./elf.txt
perl parse-readelf.pl
```
As a result elf.json will be created, which could be uploaded to the website for visualizing the data.

## Created by

Dmitry Fedotov <dmitry.fedotov@gmail.com>

August 2017
