## NodeSchool Workshops Manager
A nodejs package that allows you to manage all the nodeschool workshops from  your terminal,
you can search,install and remove workshop(s) with just one or two line of code in your terminal without going on the internet
and searching manually for desired workshops.


## Very important
This package is under developement and any idea of feature request is more then welcomed



### How to install it ?
``[sudo] npm install -g nodeschool-workshops``

[sudo] : Depending on your configuration, you may need to be an administrator in order to install npm packages

### How to use it ?
#### List all workshops
``nsworkshops --list``

By default, this command list all the workshops(installed + not installed ones).
You can add the `--installed` or `--notinstalled` flags to fetch only installed or not installed workshops respectively
#####Examples
`nsworkshops --list --installed  //to list only installed workshops` 

`nsworkshops --list --notinstalled  //to list only not installed workshops`

#### Search for workshops
``nsworkshops --search PATTERN``

``PATTERN`` is the workshop name(or some characters from the workshop name), you should know that fuzzy search is used here.
By default, this command search for both installed & not installed workshops, the returned result can be a workshop name or an array of workshop names

**Note :** as always we can use the `--installed` and `--notinstalled` flags to limit the returned result.

#####Examples
`nsworkshops --search javascript --installed  //search for an installed workshop called 'javascript'`

 `nsworkshops --search js  --notinstalled //to list all workshops that contains js and are not aleardy installed`

#### Install workshops

`nsworkshops --install WORKSHOPNAME`

`nsworkshops --install --search PATTERN`


#### Remove workshops
remove a single workshop(we can use npm remove -g WORKSHOPNAME instead):

`nsworkshops --remove WORKSHOPNAME`

Remove a list of module that contains a set of  specific characters:

`nsworkshops --remove --search PATTERN`

## How to contribute ?
You are interested and want to contribute? Good decision BUT you have to consider the following rules(or convensions if you will):

1. Fork the repository  
2. Use [standard-format](https://www.npmjs.com/package/standard-format) to format your code. If you are using Sublime Text here is a nice [plugin](https://packagecontrol.io/packages/StandardFormat) that can help you with standard-format.
3. Issue a PR  after ensuring that your code is respecting standard-format, otherwise your PR will be rejected.  


####TODO :
`--install` & `--remove` cammands are available and can be used, the documentation of this part is "on the road" and will be accessible soon.
