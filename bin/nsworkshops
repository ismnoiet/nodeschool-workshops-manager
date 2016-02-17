#!/usr/bin/env node

var fs = require('fs'),
  childProcess = require('child_process'),
  minimist = require('minimist'),
  workshops = require('./workshops.js'),
  checkNpm = require('./check-npm.js'),
  args = minimist(process.argv),
  allInstallCommands = workshops.getInstallCommands(),
  installedList = checkNpm.installedList(allInstallCommands),
  notInstalledList = checkNpm.notInstalledList(allInstallCommands)

var indexes = [], i = 0
for (attr in args) {
  indexes[i] = attr
  i++
}

function executeOperation (operation, moduleName) {
  var operation = (operation == 'install') ? 'install' : 'remove',
    command = 'sudo npm ' + operation + ' -g '

  if (typeof (moduleName) === 'string') {
    command += moduleName
  } else if ((typeof (moduleName) !== 'boolean') && (moduleName.length !== 0)) {
    command += moduleName.join(' ')
  }
  // we can add else here to display message when there is nothing to show

  handleInstallRemoveOutput(command)

}

function handleInstallRemoveOutput (command) {
  childProcess.exec(command, function (err, stdout, stderr) {
    if (err) {
      throw err
    }
    console.log(stdout)
  })
}

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
          console.log('the module "' + installPattern + '" exists and is ready to be installed')
          console.log('-------------------------------------------------')
          // install the module asynchronously
          executeOperation('install', installPattern)
        }
      } else {
        // module doesn't exist in our db 
        console.log('Sorry, this workshop(' + installPattern + ') doesnt exist')
      }

    } else if (installPattern === true) {
      if (typeof (args.search) === 'boolean') {
        console.log('Please, provide the name of the workshop after --search ')
      } else if (typeof (args.search) === 'string') {
        // you want to install a group of workshops that match a regex 
        var searchPattern = args.search
        // retrieved list contains  both installed and not installed workshops
        retrievedElements = checkNpm.search(searchPattern, workshops.getInstallCommands())
        retrievedElements = checkNpm.notInstalledList(retrievedElements)

        console.log('you are about to install the following ' + retrievedElements.length + ' workshops:')
        console.log('---------------------------------------------------------------')
        console.log(display(retrievedElements))
        executeOperation('install', retrievedElements)
      } else if (typeof (args.notinstalled) === 'boolean') {
        console.log('You are about to install the all the workshops that are not already installed:  ')
        console.log('---------------------------------------------------------------')
        console.log(display(notInstalledList))
        executeOperation('install', notInstalledList)
      }

    // console.log('Please, provide the name of the workshop after --install ')
    }
    break
  case 'remove':

    var removePattern = args.remove
    if (typeof (removePattern) === 'string') {
      // search for the workshop in our  installed list                   
      var moduleExists = checkNpm.isModule(installedList, removePattern)
      // if it exists 
      if (moduleExists) {
        // module exists and can be removed,
        console.log('the module "' + removePattern + '" is ready to be removed ')
        console.log('---------------------------------------------------------------')
        executeOperation('remove', removePattern)
      } else {
        // module doesn't exist in our db 
        console.log('Sorry, this workshop( ' + removePattern + ' ) doesnt exist')
      }
    } else if (removePattern === true) {
      if (typeof (args.search) === 'boolean') {
        console.log('Please, provide the name of the workshop after --search ')
      } else if (typeof (args.search) === 'string') {
        // you want to remove a group of workshops that match a regex 
        removePattern = args.search
        // retrieved list contains  just installed workshops
        retrievedElements = checkNpm.search(removePattern, installedList)

        console.log('you are about to remove the following ' + retrievedElements.length + ' workshops:')
        console.log('---------------------------------------------------------------')
        console.log(display(retrievedElements))
        executeOperation('remove', retrievedElements)
      } else if (typeof (args.installed) === 'boolean') {
        console.log('you are about to remove the following ' + installedList.length + ' workshops:')
        console.log('---------------------------------------------------------------')
        console.log(display(installedList))
        executeOperation('remove', installedList)
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
  console.log('---------------------------------------------------------------')
  console.log(display(retrievedList) + '\n')
}
