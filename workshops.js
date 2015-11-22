var data = {
        core:[
            {name :"javascripting", value:"javascripting"},
            {name :"learnyounode", value:"learnyounode"},
            {name :"git-it", value:"git-it"},
            {name :"how to npm", value:"how-to-npm"},
            {name :"Scope Chains & Closures ", value:"scope-chains-closures"},
            {name :"stream-adventure", value:"stream-adventure"}
        ],
        electives:[
            {name :"functional javascript", value:"functional-javascript-workshop"},
            {name :"shader school", value:"shader-school"},
            {name :"level me up scotty!", value:"levelmeup"},
            {name :"bytewiser", value:"bytewiser"},
            {name :"expressworks", value:"expressworks"},
            {name :"bug clinic", value:"bug-clinic"},
            {name :"make me hapi", value:"makemehapi"},
            {name :"browserify adventure", value:"browserify-adventure"},
            {name :"primise it won't hurt", value:"promise-it-wont-hurt"},
            {name :"intro to webGL", value:"introtowebgl"},
            {name :"async you", value:"async-you"},
            {name :"count to 6", value:"count-to-6"},
            {name :"nodebot workshop", value:"nodeboot-workshop"},
            {name :"kick off koa", value:"kick-off-koa"},
            {name :"going native", value:"goingnative"},
            {name :"lololodash", value:"lololodash"},
            {name :"planet proto", value:"planetproto"},
            {name :"learn you couch db", value:"learnyoucouchdb"},
            {name :"web GL workshop", value:"webgl-workshop"},
            {name :"es next generation", value:"esnext-generation"},
            {name :"learn generators", value:"learn-generators"},
            {name :"test anything", value:"test-anything"},
            {name :"learn you react", value:"learnyoureact"},
            {name :"tower of babel", value:"tower-of-babel"},
            {name :"perfschool", value:"perfschool"},
            {name :"learnyoumongo", value:"learnyoumongo"},
            {name :"web audio school", value:"web-audio-school"},
            {name :"regex adventure", value:"regex-adventure"},
            {name :"torrential", value:"torrential"},
            {name :"learn sass", value:"learn-sass"},
            {name :"thinking in react", value:"thinking-in-react"},
            {name :"pattern lab workshop", value:"pattern-lab-workshop"},
            {name :"post mortem debugging", value:"node-debug-school"}
        ]
} ;


function getAll(){
   return  data.core.concat(data.electives);
}

function getNames(){
    return getAll().map(function(item){
        return item.name;
    }); 
}

function getInstallCommands(){
    return getAll().map(function(item){
        return item.value;
    });
}

module.exports =  {
    getAll:getAll,
    getNames:getNames,
    getInstallCommands:getInstallCommands
};

