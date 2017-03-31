#!/usr/bin/env node

import childProcess from 'child_process'
import program from 'commander'
import { getInstallCommands } from './data/workshops'
import * as checkNpm from './check-npm'
import {VERSION} from '../package.json'

// @todo: find a better way to impliment the next line
const allInstallCommands = getInstallCommands()
const installedList = checkNpm.installedList(allInstallCommands)
const notInstalledList = checkNpm.notInstalledList(allInstallCommands)

const executeOperation = (operation, moduleName) => {
  const tmpOperation = (operation === 'install') ? 'install' : 'remove'
  let command = 'sudo npm ' + tmpOperation + ' -g '

  if (typeof (moduleName) === 'string') {
    command += moduleName
  } else if ((typeof (moduleName) !== 'boolean') && (moduleName.length !== 0)) {
    command += moduleName.join(' ')
  }
  // we can add else here to display message when there is nothing to show
  handleInstallRemoveOutput(command)
}

const handleInstallRemoveOutput = command => {
  childProcess.exec(command, (err, stdout, stderr) => {
    if (err) {
      throw err
    }
    console.log(stdout)
  })
}

const display = list => list.map(item => '├── ' + item).join('\n')

const displayList = (list, type, message) => {
  const retrievedList = (type === '') ? list : checkNpm[(type === 'install') ? 'installedList' : 'notInstalledList'](list)
  console.log(message[0] + ' ' + retrievedList.length + ' ' + message[1])
  // hhh, finally a case where using Array constructor is useful.
  console.log(Array(63).join('-'))
  console.log(display(retrievedList) + '\n')
}

program.version(VERSION)
  .command('list')
  .description('- By default, this command list all the workshops(installed + not installed ones)')
  .option('-i, --installed', 'Fetch only the installed workshops')
  .option('-n, --notinstalled', 'Fetch only not installed workshops')
  .action((options) => {
    if (options.installed) {
      displayList(allInstallCommands, 'install', ['You have', 'nodeschool workshops installed :'])
    } else if (options.notinstalled) {
      displayList(allInstallCommands, 'notinstall', ['You have', 'nodeschool workshops  not installed :'])
    } else {
      displayList(allInstallCommands, '', ['There are', 'nodeschool workshops  in total :'])
    }
  })

program
  .command('search <PATTERN>')
  .description('- PATTERN is the workshop name(or some characters from the workshop name),\n                             you should know that fuzzy search is used here. By default,\n                             this command search for both installed & not installed workshops,\n                             the returned result can be a workshop name or an array of workshop names')
  .option('-i, --installed', 'Fetch only the installed workshops')
  .option('-n, --notinstalled', 'Fetch only not installed workshops')
  .action((PATTERN, options) => {
    const searchPattern = PATTERN
    const retrievedElements = checkNpm.search(searchPattern, getInstallCommands())
    if (options.installed) {
      displayList(retrievedElements, 'install', ['You have', 'nodeschool workshops installed :'])
    } else if (options.notinstalled) {
      displayList(retrievedElements, 'notinstall', ['You have', 'nodeschool workshops not installed :'])
    } else {
      displayList(retrievedElements, '', ['There is', 'nodeschool workshops  in total :'])
    }
  })

program
  .command('install [PATTERN]')
  .description('- PATTERN is the workshop name(or some characters from the workshop(s) name(s) ) to install')
  .option('-n, --notinstalled', '- Install  the remaining  workshops')
  .action((PATTERN, options) => {
    var installPattern = PATTERN
    var retrievedElements = []

    if (installPattern) {
      retrievedElements = checkNpm.search(installPattern, notInstalledList)
      console.log('You are about to install the following ' + retrievedElements.length + ' workshops:')
      console.log(Array(63).join('-'))
      console.log(display(retrievedElements))
    } else if (options.notinstalled) {
      // install all the remaining packages
      retrievedElements = notInstalledList
      console.log('You are about to install all the workshops(' + notInstalledList.length + ') that are not already installed :')
      console.log(Array(63).join('-'))
      console.log(display(notInstalledList))
    }

    if (!retrievedElements.length) {
      console.log('Sorry, the workshop/s(' + installPattern + ") doesnt/don't exist")
      return
    }

    executeOperation('install', retrievedElements)
  })

program
  .command('remove [PATTERN]')
  .description('- PATTERN is the workshop name(or some characters from the workshop(s) name) to remove')
  .option('-i, --installed', 'Remove all the installed workshops')
  .action((PATTERN, options) => {
    var removePattern = PATTERN
    var retrievedElements = []
    if (removePattern) {
      retrievedElements = checkNpm.search(removePattern, installedList)
      console.log('You are about to remove the following ' + retrievedElements.length + ' workshops:')
      console.log(Array(63).join('-'))
      console.log(display(retrievedElements))
    } else if (options.installed) {
      // remove all the the installed workshops
      retrievedElements = installedList
      console.log('you are about to remove the following ' + installedList.length + ' workshops:')
      console.log(Array(63).join('-'))
      console.log(display(installedList))
    }
    if (!retrievedElements.length) {
      console.log('Sorry, the workshop/s(' + removePattern + ") doesnt/don't exist")
      return
    }
    executeOperation('remove', retrievedElements)
  })

program.parse(process.argv)

if (!program.args.length) {
  program.help()
}
