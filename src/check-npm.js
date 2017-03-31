const fs = require('fs')
const path = require('path')
const execSync = require('child_process').execSync
const _ = require('lodash')
const fuzzy = require('fuzzy')

// static value for globally installed modules path
// NODE_MODULES_PATH = '/usr/local/lib/node_modules/'
let NODE_MODULES_PATH = execSync('npm root -g').toString() + path.sep
NODE_MODULES_PATH = NODE_MODULES_PATH.split('\n').join('')

export const isInstalled = (moduleName) => {
  const files = fs.readdirSync(NODE_MODULES_PATH)
  return (files.indexOf(moduleName) !== -1)
}

export const installedList = (originalList) => {
  var installed = []
  originalList.forEach((item) => {
    if (isInstalled(item)) {
      installed.push(item)
    }
  })
  return installed
}

export const notInstalledList = (originalList) => {
  return _.difference(originalList, installedList(originalList))
}

export const search = (moduleName, list) => {
  const results = fuzzy.filter(moduleName, list)
  return results.map((item) => item.string)
}
