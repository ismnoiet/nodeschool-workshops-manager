#!/usr/bin/env node

var fs = require('fs'),
  childProcess = require('child_process'),
  minimist = require('minimist'),
  workshops = require('./workshops.js'),
  checkNpm = require('./check-npm.js')

var allPackages = workshops.getAll(),
  args = minimist(process.argv)

allInstallCommands = workshops.getInstallCommands()
var installedList = checkNpm.installedList(allInstallCommands)

var indexes = [], i = 0
for (attr in args) {
  indexes[i] = attr
  i++
}

function install (moduleName) {
  // check if it is a module or a list of modules 
  var command = ''
  console.log('type is : ' + typeof (moduleName))
  if (typeof (moduleName) === 'string') {
    command = 'sudo npm install -g ' + moduleName
  } else if ((typeof (moduleName) !== 'boolean') && (moduleName.length !== 0)) {
    command = 'sudo npm install -g ' + moduleName.join(' ')
  } else {
    console.log('No workshop to be installed')
  }

  // console.log(command)

  childProcess.exec(command, function (err, stdout, stderr) {
    if (err) {
      throw err
    }
    console.log(stdout)
  })
}

function remove (moduleName) {
  // check if it is a module or a list of modules 
  var command = ''
  if (typeof (moduleName) === 'string') {
    command = 'sudo npm remove -g ' + moduleName
  } else if ((typeof (moduleName) !== 'boolean') && (moduleName.length !== 0)) {
    command = 'sudo npm remove -g ' + moduleName.join(' ')
  }

  childProcess.exec(command, function (err, stdout, stderr) {
    if (err) {
      throw err
    }
    console.log(stdout)
  })
}

console.log(indexes[1])

switch (indexes[1]) {
  case 'list':
    if (args.installed) {
      // console.log('display installed list ');   
      displayList(allInstallCommands, 'install', ['You have', 'nodeschool workshops installed'])
    } else if (args.notinstalled) {
      // console.log('display not installed list ');   
      displayList(allInstallCommands, 'notinstall', ['You have', 'nodeschool workshops  not installed :'])
    } else {
      displayList(allInstallCommands, '', ['There is yes yes', 'nodeschool workshops  in total :'])
    }
    break
  case 'search':
    var searchPattern = args.search,
      retrievedElements = checkNpm.search(searchPattern, workshops.getInstallCommands())

    if (args.installed) {
      displayList(retrievedElements, 'install', ['You have', 'nodeschool workshops installed'])
    } else if (args.notinstalled) {
      displayList(retrievedElements, 'notinstall', ['You have', 'nodeschool workshops not installed :'])
    } else {
      displayList(retrievedElements, '', ['There is', 'nodeschool workshops  in total :'])
    }
    break
  case 'install':

    var installPattern = args.install
    if (typeof (installPattern) === 'string') {
      // search for the workshop in our list             
      var moduleExists = checkNpm.isModule(allInstallCommands, installPattern)

      // if it exists 
      if (moduleExists) {
        if (checkNpm.isModule(installedList, installPattern)) {
          // module exists and already installed, display a message that says it is already installed  
          console.log('that module (' + installPattern + ') is already installed on your  machine :)')
        } else {
          // if it does exist   and not installed, then install 
          // here we get the the install phase
          console.log('the module exists and is ready to be installed')
          console.log('-------------------------------------------------')
          // install the module asynchronously
          install(installPattern)
        }
      } else {
        // module doesn't exist in our db 
        console.log('Sorry, this workshop(' + installPattern + ') doesnt exist')
      }

    } else if (installPattern === true) {
      if (typeof (args.search) === 'boolean') {
        console.log('Please, provide the name of the workshop after --search ')
      } else {
        // you want to install a group of workshops that match a regex 
        var searchPattern = args.search
        // retrieved list contains  both installed and not installed workshops
        retrievedElements = checkNpm.search(searchPattern, workshops.getInstallCommands())
        retrievedElements = checkNpm.notInstalledList(retrievedElements)

        console.log('you are about to install the following ' + retrievedElements.length + ' workshops:')
        console.log('---------------------------------------------------------------')
        install(retrievedElements)
      }

    // console.log('Please, provide the name of the workshop after --install ')
    }
    break
  case 'remove':

    var removePattern = args.remove
    if (typeof (removePattern) === 'string') {
      // search for the workshop in our  instaled list             
      var moduleExists = checkNpm.isModule(installed, installPattern)

      // if it exists 
      if (moduleExists) {
        // module exists and can be removed,
        remove(removePattern)
      } else {
        // module doesn't exist in our db 
        console.log('Sorry, this workshop( ' + installPattern + ' ) doesnt exist')
      }
    } else if (removePattern === true) {
      if (typeof (args.search) === 'boolean') {
        console.log('Please, provide the name of the workshop after --search ')
      } else {
        // you want to remove a group of workshops that match a regex 
        removePattern = args.search
        // retrieved list contains  just installed workshops
        retrievedElements = checkNpm.search(removePattern, installedList)

        console.log('you are about to remove the following ' + retrievedElements.length + ' workshops:')
        console.log('---------------------------------------------------------------')
        console.log(display(retrievedElements))
        remove(retrievedElements)
      }
    }
    break
}

function display (list) {
  return list.map(function (item) {
    return '├──' + item
  }).join('\n')
}

function displayList (list, type, message) {
  var retrievedList = (type == '') ? list : checkNpm[(type == 'install') ? 'installedList' : 'notInstalledList'](list)
  console.log(message[0] + ' ' + retrievedList.length + ' ' + message[1])
  console.log('-------------------------------------------------')
  console.log(display(retrievedList) + '\n')
}
