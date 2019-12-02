# Micro UI

This is CLI based package to build and publish a micro UI or reusable web-component to microuihub.com for public access and use.

[![rrr](https://raw.githubusercontent.com/Micro-UI-Hub/microui-cli/master/base_logo.png)](https://microuihub.com)

[![npm version](https://img.shields.io/npm/v/microui-cli.svg)](https://www.npmjs.com/package/microui-cli)

[![npm version](https://img.shields.io/npm/dm/microui-cli.svg)](https://www.npmjs.com/package/microui-cli)


## Installation
This is CLI based node module available throught the npm registry. This should be installed for work space setup of web-component.

``
$ npm install microui-cli -g
``

## Features
* Initialize microui setup
* Login to microuihub.com
* Build releasable code.
* Publish to microuihub.com
* Load locally for non-CDN setup

## Quick Start

### Initialization
Initialize microui developer setup in existing ui project. Also it will ask for any template selection menu to select.

``$ microui init ``

Create React based reusable web component with microui setup.

``$ microui init react``

Create Angular based reusable web component with microui setup.

``$ microui init angular``

Create Vue based reusable web component with microui setup.

``$ microui init vue``

Create SAPUI5 based reusable web component with microui setup.

``$ microui init ui5``


Create JS based reusable web component with microui setup.

``$ microui init js``


### Configurations

Once init command run, its create basic setup of micro ui enviorment. Its create one file `.microui.json` and one directory `.microui`. You need to put the directory name in all you ignore files (e.g .gitignore).

#### Directory ``.microui``

Its a temporary working directory for microui-cli, which is being used during different actions. There should not be nay manual change, which may cause problem during publish.

#### File ``.microui.json``

This is a manifest file for module defination will used in build and publish. Initially its comes with some basic values, which need to be changed based on development setup.

### Build 

``$ microui build``

### Publish (beta)

``$ microui publish``

### Login/Logout (beta)

``$ microui login``