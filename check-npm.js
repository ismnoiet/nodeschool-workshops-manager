var fs = require('fs'),
  path = require('path'),
  execSync = require('child_process').execSync,
  _ = require('lodash'),
  fuzzy = require('fuzzy')

// static value for globally installed modules path
// NODE_MODULES_PATH = '/usr/local/lib/node_modules/'
var NODE_MODULES_PATH = execSync('npm root -g').toString() + path.sep
NODE_MODULES_PATH = NODE_MODULES_PATH.split('\n').join('')

function isInstalled (moduleName) {
  var files = fs.readdirSync(NODE_MODULES_PATH)
  return (files.indexOf(moduleName) === -1 ? false : true)
}

function installedList (originalList) {
  var installed = []
  for (var i = 0; i < originalList.length; i++) {
    if (isInstalled(originalList[i])) {
      // installed.push({index:i,value:originalList[i]}) 
      installed.push(originalList[i])
    }
  }
  return installed
}

function notInstalledList (originalList) {
  return _.difference(originalList, installedList(originalList))
}

function search (moduleName, list) {
  var results = fuzzy.filter(moduleName, list)

  return results.map(function (item) {
    return item.string
  })
}

function isModule (list, moduleName) {
  return (list.indexOf(moduleName) === -1 ? false : true)
}

module.exports = {
  search: search,
  isModule: isModule,
  isInstalled: isInstalled,
  installedList: installedList,
  notInstalledList: notInstalledList
}
