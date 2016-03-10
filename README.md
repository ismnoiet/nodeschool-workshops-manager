## NodeSchool Workshops Manager
A nodejs package that allows you to manage all the nodeschool workshops from  your terminal,
you can search,install and remove workshop(s) with just one or two line of code in your terminal without going on the internet
and searching manually for desired workshops.

### How to install it ?
```
 [sudo] npm install -g nodeschool-workshops
```

[sudo] : Depending on your configuration, you may need to be an administrator in order to install npm packages

### How to use it ?

#### List all workshops
```
 nsworkshops list
```

By default, this command list all the workshops(installed + not installed ones).
You can add the ``-i``(aka ``--installed``)  or ``-n``(aka ``--notinstalled``) flags to fetch only installed or not installed workshops respectively.
##### Examples

```
# to list only installed workshops:
 nsworkshops list -i  
 ``` 

```
# to list only not installed workshops:
 nsworkshops list -n  
```

#### Search for workshops
```
 nsworkshops search PATTERN
```

``PATTERN`` is the workshop name(or some characters from the workshop name), you should know that fuzzy search is used here.
By default, this command search for both installed & not installed workshops, the returned result can be a workshop name or an array of workshop names

**Note :** as always we can use the `-i` and `-n` flags to limit the returned result.

##### Examples

```
# search for installed workshops containing 'javascript':
 nsworkshops search javascript -i  
```

```
# search for all workshops that contains 'js' and are not already installed:
 nsworkshops search js  -n 
```

#### Install workshops

```
 nsworkshops install PATTERN  
```

```
# Install the remaining workshops:
 nsworkshops install -n 
```


#### Remove workshops

Remove a list of workshops that contains ``PATTERN`` as a substring or a single workshop if the full name is specified:

```
 nsworkshops remove PATTERN
```

```
# Remove installed workshops
 nsworkshops remove -i
```

## How to contribute ?
You are interested and want to contribute? Good decision BUT you have to consider the following rules(or convensions if you will):

1. Fork this repository.
2. Use [standard-format](https://www.npmjs.com/package/standard-format) to format your code. If you are using Sublime Text here is a nice [plugin](https://packagecontrol.io/packages/StandardFormat) that can help you with standard-format.
3. Issue a PR  after ensuring that your code is respecting standard-format, otherwise your PR will be rejected.  

#### TODO :
* Improve documentation.

