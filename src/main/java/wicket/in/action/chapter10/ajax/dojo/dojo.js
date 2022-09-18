/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

if(typeof dojo=="undefined"){
var dj_global=this;
function dj_undef(_1,_2){
if(_2==null){
_2=dj_global;
}
return (typeof _2[_1]=="undefined");
}
if(dj_undef("djConfig")){
var djConfig={};
}
if(dj_undef("dojo")){
var dojo={};
}
dojo.version={major:0,minor:3,patch:1,flag:"",revision:Number("$Rev: 4342 $".match(/[0-9]+/)[0]),toString:function(){
with(dojo.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
dojo.evalProp=function(_3,_4,_5){
return (_4&&!dj_undef(_3,_4)?_4[_3]:(_5?(_4[_3]={}):undefined));
};
dojo.parseObjPath=function(_6,_7,_8){
var _9=(_7!=null?_7:dj_global);
var _a=_6.split(".");
var _b=_a.pop();
for(var i=0,l=_a.length;i<l&&_9;i++){
_9=dojo.evalProp(_a[i],_9,_8);
}
return {obj:_9,prop:_b};
};
dojo.evalObjPath=function(_d,_e){
if(typeof _d!="string"){
return dj_global;
}
if(_d.indexOf(".")==-1){
return dojo.evalProp(_d,dj_global,_e);
}
var _f=dojo.parseObjPath(_d,dj_global,_e);
if(_f){
return dojo.evalProp(_f.prop,_f.obj,_e);
}
return null;
};
dojo.errorToString=function(_10){
if(!dj_undef("message",_10)){
return _10.message;
}else{
if(!dj_undef("description",_10)){
return _10.description;
}else{
return _10;
}
}
};
dojo.raise=function(_11,_12){
if(_12){
_11=_11+": "+dojo.errorToString(_12);
}
try{
dojo.hostenv.println("FATAL: "+_11);
}
catch(e){
}
throw Error(_11);
};
dojo.debug=function(){
};
dojo.debugShallow=function(obj){
};
dojo.profile={start:function(){
},end:function(){
},stop:function(){
},dump:function(){
}};
function dj_eval(_14){
return dj_global.eval?dj_global.eval(_14):eval(_14);
}
dojo.unimplemented=function(_15,_16){
var _17="'"+_15+"' not implemented";
if(_16!=null){
_17+=" "+_16;
}
dojo.raise(_17);
};
dojo.deprecated=function(_18,_19,_1a){
var _1b="DEPRECATED: "+_18;
if(_19){
_1b+=" "+_19;
}
if(_1a){
_1b+=" -- will be removed in version: "+_1a;
}
dojo.debug(_1b);
};
dojo.inherits=function(_1c,_1d){
if(typeof _1d!="function"){
dojo.raise("dojo.inherits: superclass argument ["+_1d+"] must be a function (subclass: ["+_1c+"']");
}
_1c.prototype=new _1d();
_1c.prototype.constructor=_1c;
_1c.superclass=_1d.prototype;
_1c["super"]=_1d.prototype;
};
dojo.render=(function(){
function vscaffold(_1e,_1f){
var tmp={capable:false,support:{builtin:false,plugin:false},prefixes:_1e};
for(var _21 in _1f){
tmp[_21]=false;
}
return tmp;
}
return {name:"",ver:dojo.version,os:{win:false,linux:false,osx:false},html:vscaffold(["html"],["ie","opera","khtml","safari","moz"]),svg:vscaffold(["svg"],["corel","adobe","batik"]),vml:vscaffold(["vml"],["ie"]),swf:vscaffold(["Swf","Flash","Mm"],["mm"]),swt:vscaffold(["Swt"],["ibm"])};
})();
dojo.hostenv=(function(){
var _22={isDebug:false,allowQueryConfig:false,baseScriptUri:"",baseRelativePath:"",libraryScriptUri:"",iePreventClobber:false,ieClobberMinimal:true,preventBackButtonFix:true,searchIds:[],parseWidgets:true};
if(typeof djConfig=="undefined"){
djConfig=_22;
}else{
for(var _23 in _22){
if(typeof djConfig[_23]=="undefined"){
djConfig[_23]=_22[_23];
}
}
}
return {name_:"(unset)",version_:"(unset)",getName:function(){
return this.name_;
},getVersion:function(){
return this.version_;
},getText:function(uri){
dojo.unimplemented("getText","uri="+uri);
}};
})();
dojo.hostenv.getBaseScriptUri=function(){
if(djConfig.baseScriptUri.length){
return djConfig.baseScriptUri;
}
var uri=new String(djConfig.libraryScriptUri||djConfig.baseRelativePath);
if(!uri){
dojo.raise("Nothing returned by getLibraryScriptUri(): "+uri);
}
var _26=uri.lastIndexOf("/");
djConfig.baseScriptUri=djConfig.baseRelativePath;
return djConfig.baseScriptUri;
};
(function(){
var _27={pkgFileName:"__package__",loading_modules_:{},loaded_modules_:{},addedToLoadingCount:[],removedFromLoadingCount:[],inFlightCount:0,modulePrefixes_:{dojo:{name:"dojo",value:"src"}},setModulePrefix:function(_28,_29){
this.modulePrefixes_[_28]={name:_28,value:_29};
},getModulePrefix:function(_2a){
var mp=this.modulePrefixes_;
if((mp[_2a])&&(mp[_2a]["name"])){
return mp[_2a].value;
}
return _2a;
},getTextStack:[],loadUriStack:[],loadedUris:[],post_load_:false,modulesLoadedListeners:[],unloadListeners:[],loadNotifying:false};
for(var _2c in _27){
dojo.hostenv[_2c]=_27[_2c];
}
})();
dojo.hostenv.loadPath=function(_2d,_2e,cb){
var uri;
if((_2d.charAt(0)=="/")||(_2d.match(/^\w+:/))){
uri=_2d;
}else{
uri=this.getBaseScriptUri()+_2d;
}
if(djConfig.cacheBust&&dojo.render.html.capable){
uri+="?"+String(djConfig.cacheBust).replace(/\W+/g,"");
}
try{
return ((!_2e)?this.loadUri(uri,cb):this.loadUriAndCheck(uri,_2e,cb));
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.hostenv.loadUri=function(uri,cb){
if(this.loadedUris[uri]){
return 1;
}
var _33=this.getText(uri,null,true);
if(_33==null){
return 0;
}
this.loadedUris[uri]=true;
if(cb){
_33="("+_33+")";
}
var _34=dj_eval(_33);
if(cb){
cb(_34);
}
return 1;
};
dojo.hostenv.loadUriAndCheck=function(uri,_36,cb){
var ok=true;
try{
ok=this.loadUri(uri,cb);
}
catch(e){
dojo.debug("failed loading ",uri," with error: ",e);
}
return ((ok)&&(this.findModule(_36,false)))?true:false;
};
dojo.loaded=function(){
};
dojo.unloaded=function(){
};
dojo.hostenv.loaded=function(){
this.loadNotifying=true;
this.post_load_=true;
var mll=this.modulesLoadedListeners;
for(var x=0;x<mll.length;x++){
mll[x]();
}
this.modulesLoadedListeners=[];
this.loadNotifying=false;
dojo.loaded();
};
dojo.hostenv.unloaded=function(){
var mll=this.unloadListeners;
while(mll.length){
(mll.pop())();
}
dojo.unloaded();
};
dojo.addOnLoad=function(obj,_3d){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.modulesLoadedListeners.push(obj);
}else{
if(arguments.length>1){
dh.modulesLoadedListeners.push(function(){
obj[_3d]();
});
}
}
if(dh.post_load_&&dh.inFlightCount==0&&!dh.loadNotifying){
dh.callLoaded();
}
};
dojo.addOnUnload=function(obj,_40){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.unloadListeners.push(obj);
}else{
if(arguments.length>1){
dh.unloadListeners.push(function(){
obj[_40]();
});
}
}
};
dojo.hostenv.modulesLoaded=function(){
if(this.post_load_){
return;
}
if((this.loadUriStack.length==0)&&(this.getTextStack.length==0)){
if(this.inFlightCount>0){
dojo.debug("files still in flight!");
return;
}
dojo.hostenv.callLoaded();
}
};
dojo.hostenv.callLoaded=function(){
if(typeof setTimeout=="object"){
setTimeout("dojo.hostenv.loaded();",0);
}else{
dojo.hostenv.loaded();
}
};
dojo.hostenv.getModuleSymbols=function(_42){
var _43=_42.split(".");
for(var i=_43.length-1;i>0;i--){
var _45=_43.slice(0,i).join(".");
var _46=this.getModulePrefix(_45);
if(_46!=_45){
_43.splice(0,i,_46);
break;
}
}
return _43;
};
dojo.hostenv._global_omit_module_check=false;
dojo.hostenv.loadModule=function(_47,_48,_49){
if(!_47){
return;
}
_49=this._global_omit_module_check||_49;
var _4a=this.findModule(_47,false);
if(_4a){
return _4a;
}
if(dj_undef(_47,this.loading_modules_)){
this.addedToLoadingCount.push(_47);
}
this.loading_modules_[_47]=1;
var _4b=_47.replace(/\./g,"/")+".js";
var _4c=this.getModuleSymbols(_47);
var _4d=((_4c[0].charAt(0)!="/")&&(!_4c[0].match(/^\w+:/)));
var _4e=_4c[_4c.length-1];
var _4f=_47.split(".");
if(_4e=="*"){
_47=(_4f.slice(0,-1)).join(".");
while(_4c.length){
_4c.pop();
_4c.push(this.pkgFileName);
_4b=_4c.join("/")+".js";
if(_4d&&(_4b.charAt(0)=="/")){
_4b=_4b.slice(1);
}
ok=this.loadPath(_4b,((!_49)?_47:null));
if(ok){
break;
}
_4c.pop();
}
}else{
_4b=_4c.join("/")+".js";
_47=_4f.join(".");
var ok=this.loadPath(_4b,((!_49)?_47:null));
if((!ok)&&(!_48)){
_4c.pop();
while(_4c.length){
_4b=_4c.join("/")+".js";
ok=this.loadPath(_4b,((!_49)?_47:null));
if(ok){
break;
}
_4c.pop();
_4b=_4c.join("/")+"/"+this.pkgFileName+".js";
if(_4d&&(_4b.charAt(0)=="/")){
_4b=_4b.slice(1);
}
ok=this.loadPath(_4b,((!_49)?_47:null));
if(ok){
break;
}
}
}
if((!ok)&&(!_49)){
dojo.raise("Could not load '"+_47+"'; last tried '"+_4b+"'");
}
}
if(!_49&&!this["isXDomain"]){
_4a=this.findModule(_47,false);
if(!_4a){
dojo.raise("symbol '"+_47+"' is not defined after loading '"+_4b+"'");
}
}
return _4a;
};
dojo.hostenv.startPackage=function(_51){
var _52=dojo.evalObjPath((_51.split(".").slice(0,-1)).join("."));
this.loaded_modules_[(new String(_51)).toLowerCase()]=_52;
var _53=_51.split(/\./);
if(_53[_53.length-1]=="*"){
_53.pop();
}
return dojo.evalObjPath(_53.join("."),true);
};
dojo.hostenv.findModule=function(_54,_55){
var lmn=(new String(_54)).toLowerCase();
if(this.loaded_modules_[lmn]){
return this.loaded_modules_[lmn];
}
var _57=dojo.evalObjPath(_54);
if((_54)&&(typeof _57!="undefined")&&(_57)){
this.loaded_modules_[lmn]=_57;
return _57;
}
if(_55){
dojo.raise("no loaded module named '"+_54+"'");
}
return null;
};
dojo.kwCompoundRequire=function(_58){
var _59=_58["common"]||[];
var _5a=(_58[dojo.hostenv.name_])?_59.concat(_58[dojo.hostenv.name_]||[]):_59.concat(_58["default"]||[]);
for(var x=0;x<_5a.length;x++){
var _5c=_5a[x];
if(_5c.constructor==Array){
dojo.hostenv.loadModule.apply(dojo.hostenv,_5c);
}else{
dojo.hostenv.loadModule(_5c);
}
}
};
dojo.require=function(){
dojo.hostenv.loadModule.apply(dojo.hostenv,arguments);
};
dojo.requireIf=function(){
if((arguments[0]===true)||(arguments[0]=="common")||(arguments[0]&&dojo.render[arguments[0]].capable)){
var _5d=[];
for(var i=1;i<arguments.length;i++){
_5d.push(arguments[i]);
}
dojo.require.apply(dojo,_5d);
}
};
dojo.requireAfterIf=dojo.requireIf;
dojo.provide=function(){
return dojo.hostenv.startPackage.apply(dojo.hostenv,arguments);
};
dojo.setModulePrefix=function(_5f,_60){
return dojo.hostenv.setModulePrefix(_5f,_60);
};
dojo.exists=function(obj,_62){
var p=_62.split(".");
for(var i=0;i<p.length;i++){
if(!(obj[p[i]])){
return false;
}
obj=obj[p[i]];
}
return true;
};
}
if(typeof window=="undefined"){
dojo.raise("no window object");
}
(function(){
if(djConfig.allowQueryConfig){
var _65=document.location.toString();
var _66=_65.split("?",2);
if(_66.length>1){
var _67=_66[1];
var _68=_67.split("&");
for(var x in _68){
var sp=_68[x].split("=");
if((sp[0].length>9)&&(sp[0].substr(0,9)=="djConfig.")){
var opt=sp[0].substr(9);
try{
djConfig[opt]=eval(sp[1]);
}
catch(e){
djConfig[opt]=sp[1];
}
}
}
}
}
if(((djConfig["baseScriptUri"]=="")||(djConfig["baseRelativePath"]==""))&&(document&&document.getElementsByTagName)){
var _6c=document.getElementsByTagName("script");
var _6d=/(__package__|dojo|bootstrap1)\.js([\?\.]|$)/i;
for(var i=0;i<_6c.length;i++){
var src=_6c[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_6d);
if(m){
var _71=src.substring(0,m.index);
if(src.indexOf("bootstrap1")>-1){
_71+="../";
}
if(!this["djConfig"]){
djConfig={};
}
if(djConfig["baseScriptUri"]==""){
djConfig["baseScriptUri"]=_71;
}
if(djConfig["baseRelativePath"]==""){
djConfig["baseRelativePath"]=_71;
}
break;
}
}
}
var dr=dojo.render;
var drh=dojo.render.html;
var drs=dojo.render.svg;
var dua=drh.UA=navigator.userAgent;
var dav=drh.AV=navigator.appVersion;
var t=true;
var f=false;
drh.capable=t;
drh.support.builtin=t;
dr.ver=parseFloat(drh.AV);
dr.os.mac=dav.indexOf("Macintosh")>=0;
dr.os.win=dav.indexOf("Windows")>=0;
dr.os.linux=dav.indexOf("X11")>=0;
drh.opera=dua.indexOf("Opera")>=0;
drh.khtml=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0);
drh.safari=dav.indexOf("Safari")>=0;
var _79=dua.indexOf("Gecko");
drh.mozilla=drh.moz=(_79>=0)&&(!drh.khtml);
if(drh.mozilla){
drh.geckoVersion=dua.substring(_79+6,_79+14);
}
drh.ie=(document.all)&&(!drh.opera);
drh.ie50=drh.ie&&dav.indexOf("MSIE 5.0")>=0;
drh.ie55=drh.ie&&dav.indexOf("MSIE 5.5")>=0;
drh.ie60=drh.ie&&dav.indexOf("MSIE 6.0")>=0;
drh.ie70=drh.ie&&dav.indexOf("MSIE 7.0")>=0;
dojo.locale=(drh.ie?navigator.userLanguage:navigator.language).toLowerCase();
dr.vml.capable=drh.ie;
drs.capable=f;
drs.support.plugin=f;
drs.support.builtin=f;
if(document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature("org.w3c.dom.svg","1.0")){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
})();
dojo.hostenv.startPackage("dojo.hostenv");
dojo.render.name=dojo.hostenv.name_="browser";
dojo.hostenv.searchIds=[];
dojo.hostenv._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
dojo.hostenv.getXmlhttpObject=function(){
var _7a=null;
var _7b=null;
try{
_7a=new XMLHttpRequest();
}
catch(e){
}
if(!_7a){
for(var i=0;i<3;++i){
var _7d=dojo.hostenv._XMLHTTP_PROGIDS[i];
try{
_7a=new ActiveXObject(_7d);
}
catch(e){
_7b=e;
}
if(_7a){
dojo.hostenv._XMLHTTP_PROGIDS=[_7d];
break;
}
}
}
if(!_7a){
return dojo.raise("XMLHTTP not available",_7b);
}
return _7a;
};
dojo.hostenv.getText=function(uri,_7f,_80){
var _81=this.getXmlhttpObject();
if(_7f){
_81.onreadystatechange=function(){
if(4==_81.readyState){
if((!_81["status"])||((200<=_81.status)&&(300>_81.status))){
_7f(_81.responseText);
}
}
};
}
_81.open("GET",uri,_7f?true:false);
try{
_81.send(null);
if(_7f){
return null;
}
if((_81["status"])&&((200>_81.status)||(300<=_81.status))){
throw Error("Unable to load "+uri+" status:"+_81.status);
}
}
catch(e){
if((_80)&&(!_7f)){
return null;
}else{
throw e;
}
}
return _81.responseText;
};
dojo.hostenv.defaultDebugContainerId="dojoDebug";
dojo.hostenv._println_buffer=[];
dojo.hostenv._println_safe=false;
dojo.hostenv.println=function(_82){
if(!dojo.hostenv._println_safe){
dojo.hostenv._println_buffer.push(_82);
}else{
try{
var _83=document.getElementById(djConfig.debugContainerId?djConfig.debugContainerId:dojo.hostenv.defaultDebugContainerId);
if(!_83){
_83=document.getElementsByTagName("body")[0]||document.body;
}
var div=document.createElement("div");
div.appendChild(document.createTextNode(_82));
_83.appendChild(div);
}
catch(e){
try{
document.write("<div>"+_82+"</div>");
}
catch(e2){
window.status=_82;
}
}
}
};
dojo.addOnLoad(function(){
dojo.hostenv._println_safe=true;
while(dojo.hostenv._println_buffer.length>0){
dojo.hostenv.println(dojo.hostenv._println_buffer.shift());
}
});
function dj_addNodeEvtHdlr(_85,_86,fp,_88){
var _89=_85["on"+_86]||function(){
};
_85["on"+_86]=function(){
fp.apply(_85,arguments);
_89.apply(_85,arguments);
};
return true;
}
dj_addNodeEvtHdlr(window,"load",function(){
if(arguments.callee.initialized){
return;
}
arguments.callee.initialized=true;
var _8a=function(){
if(dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
};
if(dojo.hostenv.inFlightCount==0){
_8a();
dojo.hostenv.modulesLoaded();
}else{
dojo.addOnLoad(_8a);
}
});
dj_addNodeEvtHdlr(window,"unload",function(){
dojo.hostenv.unloaded();
});
dojo.hostenv.makeWidgets=function(){
var _8b=[];
if(djConfig.searchIds&&djConfig.searchIds.length>0){
_8b=_8b.concat(djConfig.searchIds);
}
if(dojo.hostenv.searchIds&&dojo.hostenv.searchIds.length>0){
_8b=_8b.concat(dojo.hostenv.searchIds);
}
if((djConfig.parseWidgets)||(_8b.length>0)){
if(dojo.evalObjPath("dojo.widget.Parse")){
var _8c=new dojo.xml.Parse();
if(_8b.length>0){
for(var x=0;x<_8b.length;x++){
var _8e=document.getElementById(_8b[x]);
if(!_8e){
continue;
}
var _8f=_8c.parseElement(_8e,null,true);
dojo.widget.getParser().createComponents(_8f);
}
}else{
if(djConfig.parseWidgets){
var _8f=_8c.parseElement(document.getElementsByTagName("body")[0]||document.body,null,true);
dojo.widget.getParser().createComponents(_8f);
}
}
}
}
};
dojo.addOnLoad(function(){
if(!dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
});
try{
if(dojo.render.html.ie){
document.write("<style>v:*{ behavior:url(#default#VML); }</style>");
document.write("<xml:namespace ns=\"urn:schemas-microsoft-com:vml\" prefix=\"v\"/>");
}
}
catch(e){
}
dojo.hostenv.writeIncludes=function(){
};
dojo.byId=function(id,doc){
if(id&&(typeof id=="string"||id instanceof String)){
if(!doc){
doc=document;
}
return doc.getElementById(id);
}
return id;
};
(function(){
if(typeof dj_usingBootstrap!="undefined"){
return;
}
var _92=false;
var _93=false;
var _94=false;
if((typeof this["load"]=="function")&&((typeof this["Packages"]=="function")||(typeof this["Packages"]=="object"))){
_92=true;
}else{
if(typeof this["load"]=="function"){
_93=true;
}else{
if(window.widget){
_94=true;
}
}
}
var _95=[];
if((this["djConfig"])&&((djConfig["isDebug"])||(djConfig["debugAtAllCosts"]))){
_95.push("debug.js");
}
if((this["djConfig"])&&(djConfig["debugAtAllCosts"])&&(!_92)&&(!_94)){
_95.push("browser_debug.js");
}
if((this["djConfig"])&&(djConfig["compat"])){
_95.push("compat/"+djConfig["compat"]+".js");
}
var _96=djConfig["baseScriptUri"];
if((this["djConfig"])&&(djConfig["baseLoaderUri"])){
_96=djConfig["baseLoaderUri"];
}
for(var x=0;x<_95.length;x++){
var _98=_96+"src/"+_95[x];
if(_92||_93){
load(_98);
}else{
try{
document.write("<scr"+"ipt type='text/javascript' src='"+_98+"'></scr"+"ipt>");
}
catch(e){
var _99=document.createElement("script");
_99.src=_98;
document.getElementsByTagName("head")[0].appendChild(_99);
}
}
}
})();
dojo.fallback_locale="en";
dojo.normalizeLocale=function(_9a){
return _9a?_9a.toLowerCase():dojo.locale;
};
dojo.requireLocalization=function(_9b,_9c,_9d){
dojo.debug("EXPERIMENTAL: dojo.requireLocalization");
var _9e=dojo.hostenv.getModuleSymbols(_9b);
var _9f=_9e.concat("nls").join("/");
_9d=dojo.normalizeLocale(_9d);
var _a0=_9d.split("-");
var _a1=[];
for(var i=_a0.length;i>0;i--){
_a1.push(_a0.slice(0,i).join("-"));
}
if(_a1[_a1.length-1]!=dojo.fallback_locale){
_a1.push(dojo.fallback_locale);
}
var _a3=[_9b,"_nls",_9c].join(".");
var _a4=dojo.hostenv.startPackage(_a3);
dojo.hostenv.loaded_modules_[_a3]=_a4;
var _a5=false;
for(var i=_a1.length-1;i>=0;i--){
var loc=_a1[i];
var pkg=[_a3,loc].join(".");
var _a8=false;
if(!dojo.hostenv.findModule(pkg)){
dojo.hostenv.loaded_modules_[pkg]=null;
var _a9=[_9f,loc,_9c].join("/")+".js";
_a8=dojo.hostenv.loadPath(_a9,null,function(_aa){
_a4[loc]=_aa;
if(_a5){
for(var x in _a5){
if(!_a4[loc][x]){
_a4[loc][x]=_a5[x];
}
}
}
});
}else{
_a8=true;
}
if(_a8&&_a4[loc]){
_a5=_a4[loc];
}
}
};
dojo.provide("dojo.lang.common");
dojo.require("dojo.lang");
dojo.lang._mixin=function(obj,_ad){
var _ae={};
for(var x in _ad){
if(typeof _ae[x]=="undefined"||_ae[x]!=_ad[x]){
obj[x]=_ad[x];
}
}
if(dojo.render.html.ie&&dojo.lang.isFunction(_ad["toString"])&&_ad["toString"]!=obj["toString"]){
obj.toString=_ad.toString;
}
return obj;
};
dojo.lang.mixin=function(obj,_b1){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(obj,arguments[i]);
}
return obj;
};
dojo.lang.extend=function(_b3,_b4){
for(var i=1,l=arguments.length;i<l;i++){
dojo.lang._mixin(_b3.prototype,arguments[i]);
}
return _b3;
};
dojo.lang.find=function(arr,val,_b8,_b9){
if(!dojo.lang.isArrayLike(arr)&&dojo.lang.isArrayLike(val)){
var a=arr;
arr=val;
val=a;
}
var _bb=dojo.lang.isString(arr);
if(_bb){
arr=arr.split("");
}
if(_b9){
var _bc=-1;
var i=arr.length-1;
var end=-1;
}else{
var _bc=1;
var i=0;
var end=arr.length;
}
if(_b8){
while(i!=end){
if(arr[i]===val){
return i;
}
i+=_bc;
}
}else{
while(i!=end){
if(arr[i]==val){
return i;
}
i+=_bc;
}
}
return -1;
};
dojo.lang.indexOf=dojo.lang.find;
dojo.lang.findLast=function(arr,val,_c1){
return dojo.lang.find(arr,val,_c1,true);
};
dojo.lang.lastIndexOf=dojo.lang.findLast;
dojo.lang.inArray=function(arr,val){
return dojo.lang.find(arr,val)>-1;
};
dojo.lang.isObject=function(wh){
if(typeof wh=="undefined"){
return false;
}
return (typeof wh=="object"||wh===null||dojo.lang.isArray(wh)||dojo.lang.isFunction(wh));
};
dojo.lang.isArray=function(wh){
return (wh instanceof Array||typeof wh=="array");
};
dojo.lang.isArrayLike=function(wh){
if(dojo.lang.isString(wh)){
return false;
}
if(dojo.lang.isFunction(wh)){
return false;
}
if(dojo.lang.isArray(wh)){
return true;
}
if(typeof wh!="undefined"&&wh&&dojo.lang.isNumber(wh.length)&&isFinite(wh.length)){
return true;
}
return false;
};
dojo.lang.isFunction=function(wh){
if(!wh){
return false;
}
return (wh instanceof Function||typeof wh=="function");
};
dojo.lang.isString=function(wh){
return (wh instanceof String||typeof wh=="string");
};
dojo.lang.isAlien=function(wh){
if(!wh){
return false;
}
return !dojo.lang.isFunction()&&/\{\s*\[native code\]\s*\}/.test(String(wh));
};
dojo.lang.isBoolean=function(wh){
return (wh instanceof Boolean||typeof wh=="boolean");
};
dojo.lang.isNumber=function(wh){
return (wh instanceof Number||typeof wh=="number");
};
dojo.lang.isUndefined=function(wh){
return ((wh==undefined)&&(typeof wh=="undefined"));
};
dojo.provide("dojo.lang.array");
dojo.require("dojo.lang.common");
dojo.lang.has=function(obj,_ce){
try{
return (typeof obj[_ce]!="undefined");
}
catch(e){
return false;
}
};
dojo.lang.isEmpty=function(obj){
if(dojo.lang.isObject(obj)){
var tmp={};
var _d1=0;
for(var x in obj){
if(obj[x]&&(!tmp[x])){
_d1++;
break;
}
}
return (_d1==0);
}else{
if(dojo.lang.isArrayLike(obj)||dojo.lang.isString(obj)){
return obj.length==0;
}
}
};
dojo.lang.map=function(arr,obj,_d5){
var _d6=dojo.lang.isString(arr);
if(_d6){
arr=arr.split("");
}
if(dojo.lang.isFunction(obj)&&(!_d5)){
_d5=obj;
obj=dj_global;
}else{
if(dojo.lang.isFunction(obj)&&_d5){
var _d7=obj;
obj=_d5;
_d5=_d7;
}
}
if(Array.map){
var _d8=Array.map(arr,_d5,obj);
}else{
var _d8=[];
for(var i=0;i<arr.length;++i){
_d8.push(_d5.call(obj,arr[i]));
}
}
if(_d6){
return _d8.join("");
}else{
return _d8;
}
};
dojo.lang.forEach=function(_da,_db,_dc){
if(dojo.lang.isString(_da)){
_da=_da.split("");
}
if(Array.forEach){
Array.forEach(_da,_db,_dc);
}else{
if(!_dc){
_dc=dj_global;
}
for(var i=0,l=_da.length;i<l;i++){
_db.call(_dc,_da[i],i,_da);
}
}
};
dojo.lang._everyOrSome=function(_de,arr,_e0,_e1){
if(dojo.lang.isString(arr)){
arr=arr.split("");
}
if(Array.every){
return Array[(_de)?"every":"some"](arr,_e0,_e1);
}else{
if(!_e1){
_e1=dj_global;
}
for(var i=0,l=arr.length;i<l;i++){
var _e3=_e0.call(_e1,arr[i],i,arr);
if((_de)&&(!_e3)){
return false;
}else{
if((!_de)&&(_e3)){
return true;
}
}
}
return (_de)?true:false;
}
};
dojo.lang.every=function(arr,_e5,_e6){
return this._everyOrSome(true,arr,_e5,_e6);
};
dojo.lang.some=function(arr,_e8,_e9){
return this._everyOrSome(false,arr,_e8,_e9);
};
dojo.lang.filter=function(arr,_eb,_ec){
var _ed=dojo.lang.isString(arr);
if(_ed){
arr=arr.split("");
}
if(Array.filter){
var _ee=Array.filter(arr,_eb,_ec);
}else{
if(!_ec){
if(arguments.length>=3){
dojo.raise("thisObject doesn't exist!");
}
_ec=dj_global;
}
var _ee=[];
for(var i=0;i<arr.length;i++){
if(_eb.call(_ec,arr[i],i,arr)){
_ee.push(arr[i]);
}
}
}
if(_ed){
return _ee.join("");
}else{
return _ee;
}
};
dojo.lang.unnest=function(){
var out=[];
for(var i=0;i<arguments.length;i++){
if(dojo.lang.isArrayLike(arguments[i])){
var add=dojo.lang.unnest.apply(this,arguments[i]);
out=out.concat(add);
}else{
out.push(arguments[i]);
}
}
return out;
};
dojo.lang.toArray=function(_f3,_f4){
var _f5=[];
for(var i=_f4||0;i<_f3.length;i++){
_f5.push(_f3[i]);
}
return _f5;
};
dojo.provide("dojo.dom");
dojo.require("dojo.lang.array");
dojo.dom.ELEMENT_NODE=1;
dojo.dom.ATTRIBUTE_NODE=2;
dojo.dom.TEXT_NODE=3;
dojo.dom.CDATA_SECTION_NODE=4;
dojo.dom.ENTITY_REFERENCE_NODE=5;
dojo.dom.ENTITY_NODE=6;
dojo.dom.PROCESSING_INSTRUCTION_NODE=7;
dojo.dom.COMMENT_NODE=8;
dojo.dom.DOCUMENT_NODE=9;
dojo.dom.DOCUMENT_TYPE_NODE=10;
dojo.dom.DOCUMENT_FRAGMENT_NODE=11;
dojo.dom.NOTATION_NODE=12;
dojo.dom.dojoml="http://www.dojotoolkit.org/2004/dojoml";
dojo.dom.xmlns={svg:"http://www.w3.org/2000/svg",smil:"http://www.w3.org/2001/SMIL20/",mml:"http://www.w3.org/1998/Math/MathML",cml:"http://www.xml-cml.org",xlink:"http://www.w3.org/1999/xlink",xhtml:"http://www.w3.org/1999/xhtml",xul:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",xbl:"http://www.mozilla.org/xbl",fo:"http://www.w3.org/1999/XSL/Format",xsl:"http://www.w3.org/1999/XSL/Transform",xslt:"http://www.w3.org/1999/XSL/Transform",xi:"http://www.w3.org/2001/XInclude",xforms:"http://www.w3.org/2002/01/xforms",saxon:"http://icl.com/saxon",xalan:"http://xml.apache.org/xslt",xsd:"http://www.w3.org/2001/XMLSchema",dt:"http://www.w3.org/2001/XMLSchema-datatypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",dc:"http://purl.org/dc/elements/1.1/",dcq:"http://purl.org/dc/qualifiers/1.0","soap-env":"http://schemas.xmlsoap.org/soap/envelope/",wsdl:"http://schemas.xmlsoap.org/wsdl/",AdobeExtensions:"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"};
dojo.dom.isNode=function(wh){
if(typeof Element=="object"){
try{
return wh instanceof Element;
}
catch(E){
}
}else{
return wh&&!isNaN(wh.nodeType);
}
};
dojo.dom.getTagName=function(_f8){
dojo.deprecated("dojo.dom.getTagName","use node.tagName instead","0.4");
var _f9=_f8.tagName;
if(_f9.substr(0,5).toLowerCase()!="dojo:"){
if(_f9.substr(0,4).toLowerCase()=="dojo"){
return "dojo:"+_f9.substring(4).toLowerCase();
}
var djt=_f8.getAttribute("dojoType")||_f8.getAttribute("dojotype");
if(djt){
return "dojo:"+djt.toLowerCase();
}
if((_f8.getAttributeNS)&&(_f8.getAttributeNS(this.dojoml,"type"))){
return "dojo:"+_f8.getAttributeNS(this.dojoml,"type").toLowerCase();
}
try{
djt=_f8.getAttribute("dojo:type");
}
catch(e){
}
if(djt){
return "dojo:"+djt.toLowerCase();
}
if((!dj_global["djConfig"])||(!djConfig["ignoreClassNames"])){
var _fb=_f8.className||_f8.getAttribute("class");
if((_fb)&&(_fb.indexOf)&&(_fb.indexOf("dojo-")!=-1)){
var _fc=_fb.split(" ");
for(var x=0;x<_fc.length;x++){
if((_fc[x].length>5)&&(_fc[x].indexOf("dojo-")>=0)){
return "dojo:"+_fc[x].substr(5).toLowerCase();
}
}
}
}
}
return _f9.toLowerCase();
};
dojo.dom.getUniqueId=function(){
do{
var id="dj_unique_"+(++arguments.callee._idIncrement);
}while(document.getElementById(id));
return id;
};
dojo.dom.getUniqueId._idIncrement=0;
dojo.dom.firstElement=dojo.dom.getFirstChildElement=function(_ff,_100){
var node=_ff.firstChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.nextSibling;
}
if(_100&&node&&node.tagName&&node.tagName.toLowerCase()!=_100.toLowerCase()){
node=dojo.dom.nextElement(node,_100);
}
return node;
};
dojo.dom.lastElement=dojo.dom.getLastChildElement=function(_102,_103){
var node=_102.lastChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.previousSibling;
}
if(_103&&node&&node.tagName&&node.tagName.toLowerCase()!=_103.toLowerCase()){
node=dojo.dom.prevElement(node,_103);
}
return node;
};
dojo.dom.nextElement=dojo.dom.getNextSiblingElement=function(node,_106){
if(!node){
return null;
}
do{
node=node.nextSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_106&&_106.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.nextElement(node,_106);
}
return node;
};
dojo.dom.prevElement=dojo.dom.getPreviousSiblingElement=function(node,_108){
if(!node){
return null;
}
if(_108){
_108=_108.toLowerCase();
}
do{
node=node.previousSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_108&&_108.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.prevElement(node,_108);
}
return node;
};
dojo.dom.moveChildren=function(_109,_10a,trim){
var _10c=0;
if(trim){
while(_109.hasChildNodes()&&_109.firstChild.nodeType==dojo.dom.TEXT_NODE){
_109.removeChild(_109.firstChild);
}
while(_109.hasChildNodes()&&_109.lastChild.nodeType==dojo.dom.TEXT_NODE){
_109.removeChild(_109.lastChild);
}
}
while(_109.hasChildNodes()){
_10a.appendChild(_109.firstChild);
_10c++;
}
return _10c;
};
dojo.dom.copyChildren=function(_10d,_10e,trim){
var _110=_10d.cloneNode(true);
return this.moveChildren(_110,_10e,trim);
};
dojo.dom.removeChildren=function(node){
var _112=node.childNodes.length;
while(node.hasChildNodes()){
node.removeChild(node.firstChild);
}
return _112;
};
dojo.dom.replaceChildren=function(node,_114){
dojo.dom.removeChildren(node);
node.appendChild(_114);
};
dojo.dom.removeNode=function(node){
if(node&&node.parentNode){
return node.parentNode.removeChild(node);
}
};
dojo.dom.getAncestors=function(node,_117,_118){
var _119=[];
var _11a=dojo.lang.isFunction(_117);
while(node){
if(!_11a||_117(node)){
_119.push(node);
}
if(_118&&_119.length>0){
return _119[0];
}
node=node.parentNode;
}
if(_118){
return null;
}
return _119;
};
dojo.dom.getAncestorsByTag=function(node,tag,_11d){
tag=tag.toLowerCase();
return dojo.dom.getAncestors(node,function(el){
return ((el.tagName)&&(el.tagName.toLowerCase()==tag));
},_11d);
};
dojo.dom.getFirstAncestorByTag=function(node,tag){
return dojo.dom.getAncestorsByTag(node,tag,true);
};
dojo.dom.isDescendantOf=function(node,_122,_123){
if(_123&&node){
node=node.parentNode;
}
while(node){
if(node==_122){
return true;
}
node=node.parentNode;
}
return false;
};
dojo.dom.innerXML=function(node){
if(node.innerXML){
return node.innerXML;
}else{
if(node.xml){
return node.xml;
}else{
if(typeof XMLSerializer!="undefined"){
return (new XMLSerializer()).serializeToString(node);
}
}
}
};
dojo.dom.createDocument=function(){
var doc=null;
if(!dj_undef("ActiveXObject")){
var _126=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var i=0;i<_126.length;i++){
try{
doc=new ActiveXObject(_126[i]+".XMLDOM");
}
catch(e){
}
if(doc){
break;
}
}
}else{
if((document.implementation)&&(document.implementation.createDocument)){
doc=document.implementation.createDocument("","",null);
}
}
return doc;
};
dojo.dom.createDocumentFromText=function(str,_129){
if(!_129){
_129="text/xml";
}
if(!dj_undef("DOMParser")){
var _12a=new DOMParser();
return _12a.parseFromString(str,_129);
}else{
if(!dj_undef("ActiveXObject")){
var _12b=dojo.dom.createDocument();
if(_12b){
_12b.async=false;
_12b.loadXML(str);
return _12b;
}else{
dojo.debug("toXml didn't work?");
}
}else{
if(document.createElement){
var tmp=document.createElement("xml");
tmp.innerHTML=str;
if(document.implementation&&document.implementation.createDocument){
var _12d=document.implementation.createDocument("foo","",null);
for(var i=0;i<tmp.childNodes.length;i++){
_12d.importNode(tmp.childNodes.item(i),true);
}
return _12d;
}
return ((tmp.document)&&(tmp.document.firstChild?tmp.document.firstChild:tmp));
}
}
}
return null;
};
dojo.dom.prependChild=function(node,_130){
if(_130.firstChild){
_130.insertBefore(node,_130.firstChild);
}else{
_130.appendChild(node);
}
return true;
};
dojo.dom.insertBefore=function(node,ref,_133){
if(_133!=true&&(node===ref||node.nextSibling===ref)){
return false;
}
var _134=ref.parentNode;
_134.insertBefore(node,ref);
return true;
};
dojo.dom.insertAfter=function(node,ref,_137){
var pn=ref.parentNode;
if(ref==pn.lastChild){
if((_137!=true)&&(node===ref)){
return false;
}
pn.appendChild(node);
}else{
return this.insertBefore(node,ref.nextSibling,_137);
}
return true;
};
dojo.dom.insertAtPosition=function(node,ref,_13b){
if((!node)||(!ref)||(!_13b)){
return false;
}
switch(_13b.toLowerCase()){
case "before":
return dojo.dom.insertBefore(node,ref);
case "after":
return dojo.dom.insertAfter(node,ref);
case "first":
if(ref.firstChild){
return dojo.dom.insertBefore(node,ref.firstChild);
}else{
ref.appendChild(node);
return true;
}
break;
default:
ref.appendChild(node);
return true;
}
};
dojo.dom.insertAtIndex=function(node,_13d,_13e){
var _13f=_13d.childNodes;
if(!_13f.length){
_13d.appendChild(node);
return true;
}
var _140=null;
for(var i=0;i<_13f.length;i++){
var _142=_13f.item(i)["getAttribute"]?parseInt(_13f.item(i).getAttribute("dojoinsertionindex")):-1;
if(_142<_13e){
_140=_13f.item(i);
}
}
if(_140){
return dojo.dom.insertAfter(node,_140);
}else{
return dojo.dom.insertBefore(node,_13f.item(0));
}
};
dojo.dom.textContent=function(node,text){
if(text){
dojo.dom.replaceChildren(node,document.createTextNode(text));
return text;
}else{
var _145="";
if(node==null){
return _145;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
_145+=dojo.dom.textContent(node.childNodes[i]);
break;
case 3:
case 2:
case 4:
_145+=node.childNodes[i].nodeValue;
break;
default:
break;
}
}
return _145;
}
};
dojo.dom.collectionToArray=function(_147){
dojo.deprecated("dojo.dom.collectionToArray","use dojo.lang.toArray instead","0.4");
return dojo.lang.toArray(_147);
};
dojo.dom.hasParent=function(node){
return node&&node.parentNode&&dojo.dom.isNode(node.parentNode);
};
dojo.dom.isTag=function(node){
if(node&&node.tagName){
var arr=dojo.lang.toArray(arguments,1);
return arr[dojo.lang.find(node.tagName,arr)]||"";
}
return "";
};
dojo.provide("dojo.xml.Parse");
dojo.require("dojo.dom");
dojo.xml.Parse=function(){
function getDojoTagName(node){
var _14c=node.tagName;
if(_14c.substr(0,5).toLowerCase()!="dojo:"){
if(_14c.substr(0,4).toLowerCase()=="dojo"){
return "dojo:"+_14c.substring(4).toLowerCase();
}
var djt=node.getAttribute("dojoType")||node.getAttribute("dojotype");
if(djt){
return "dojo:"+djt.toLowerCase();
}
if(node.getAttributeNS&&node.getAttributeNS(dojo.dom.dojoml,"type")){
return "dojo:"+node.getAttributeNS(dojo.dom.dojoml,"type").toLowerCase();
}
try{
djt=node.getAttribute("dojo:type");
}
catch(e){
}
if(djt){
return "dojo:"+djt.toLowerCase();
}
if(!dj_global["djConfig"]||!djConfig["ignoreClassNames"]){
var _14e=node.className||node.getAttribute("class");
if(_14e&&_14e.indexOf&&_14e.indexOf("dojo-")!=-1){
var _14f=_14e.split(" ");
for(var x=0;x<_14f.length;x++){
if(_14f[x].length>5&&_14f[x].indexOf("dojo-")>=0){
return "dojo:"+_14f[x].substr(5).toLowerCase();
}
}
}
}
}
return _14c.toLowerCase();
}
this.parseElement=function(node,_152,_153,_154){
if(node.getAttribute("parseWidgets")=="false"){
return {};
}
var _155={};
var _156=getDojoTagName(node);
_155[_156]=[];
if((!_153)||(_156.substr(0,4).toLowerCase()=="dojo")){
var _157=parseAttributes(node);
for(var attr in _157){
if((!_155[_156][attr])||(typeof _155[_156][attr]!="array")){
_155[_156][attr]=[];
}
_155[_156][attr].push(_157[attr]);
}
_155[_156].nodeRef=node;
_155.tagName=_156;
_155.index=_154||0;
}
var _159=0;
var tcn,i=0,nodes=node.childNodes;
while(tcn=nodes[i++]){
switch(tcn.nodeType){
case dojo.dom.ELEMENT_NODE:
_159++;
var ctn=getDojoTagName(tcn);
if(!_155[ctn]){
_155[ctn]=[];
}
_155[ctn].push(this.parseElement(tcn,true,_153,_159));
if((tcn.childNodes.length==1)&&(tcn.childNodes.item(0).nodeType==dojo.dom.TEXT_NODE)){
_155[ctn][_155[ctn].length-1].value=tcn.childNodes.item(0).nodeValue;
}
break;
case dojo.dom.TEXT_NODE:
if(node.childNodes.length==1){
_155[_156].push({value:node.childNodes.item(0).nodeValue});
}
break;
default:
break;
}
}
return _155;
};
function parseAttributes(node){
var _15d={};
var atts=node.attributes;
var _15f,i=0;
while(_15f=atts[i++]){
if((dojo.render.html.capable)&&(dojo.render.html.ie)){
if(!_15f){
continue;
}
if((typeof _15f=="object")&&(typeof _15f.nodeValue=="undefined")||(_15f.nodeValue==null)||(_15f.nodeValue=="")){
continue;
}
}
var nn=(_15f.nodeName.indexOf("dojo:")==-1)?_15f.nodeName:_15f.nodeName.split("dojo:")[1];
_15d[nn]={value:_15f.nodeValue};
}
return _15d;
}
};
dojo.provide("dojo.lang.func");
dojo.require("dojo.lang.common");
dojo.lang.hitch=function(_161,_162){
if(dojo.lang.isString(_162)){
var fcn=_161[_162];
}else{
var fcn=_162;
}
return function(){
return fcn.apply(_161,arguments);
};
};
dojo.lang.anonCtr=0;
dojo.lang.anon={};
dojo.lang.nameAnonFunc=function(_164,_165,_166){
var nso=(_165||dojo.lang.anon);
if((_166)||((dj_global["djConfig"])&&(djConfig["slowAnonFuncLookups"]==true))){
for(var x in nso){
if(nso[x]===_164){
return x;
}
}
}
var ret="__"+dojo.lang.anonCtr++;
while(typeof nso[ret]!="undefined"){
ret="__"+dojo.lang.anonCtr++;
}
nso[ret]=_164;
return ret;
};
dojo.lang.forward=function(_16a){
return function(){
return this[_16a].apply(this,arguments);
};
};
dojo.lang.curry=function(ns,func){
var _16d=[];
ns=ns||dj_global;
if(dojo.lang.isString(func)){
func=ns[func];
}
for(var x=2;x<arguments.length;x++){
_16d.push(arguments[x]);
}
var _16f=(func["__preJoinArity"]||func.length)-_16d.length;
function gather(_170,_171,_172){
var _173=_172;
var _174=_171.slice(0);
for(var x=0;x<_170.length;x++){
_174.push(_170[x]);
}
_172=_172-_170.length;
if(_172<=0){
var res=func.apply(ns,_174);
_172=_173;
return res;
}else{
return function(){
return gather(arguments,_174,_172);
};
}
}
return gather([],_16d,_16f);
};
dojo.lang.curryArguments=function(ns,func,args,_17a){
var _17b=[];
var x=_17a||0;
for(x=_17a;x<args.length;x++){
_17b.push(args[x]);
}
return dojo.lang.curry.apply(dojo.lang,[ns,func].concat(_17b));
};
dojo.lang.tryThese=function(){
for(var x=0;x<arguments.length;x++){
try{
if(typeof arguments[x]=="function"){
var ret=(arguments[x]());
if(ret){
return ret;
}
}
}
catch(e){
dojo.debug(e);
}
}
};
dojo.lang.delayThese=function(farr,cb,_181,_182){
if(!farr.length){
if(typeof _182=="function"){
_182();
}
return;
}
if((typeof _181=="undefined")&&(typeof cb=="number")){
_181=cb;
cb=function(){
};
}else{
if(!cb){
cb=function(){
};
if(!_181){
_181=0;
}
}
}
setTimeout(function(){
(farr.shift())();
cb();
dojo.lang.delayThese(farr,cb,_181,_182);
},_181);
};
dojo.provide("dojo.lang.extras");
dojo.require("dojo.lang.common");
dojo.lang.setTimeout=function(func,_184){
var _185=window,argsStart=2;
if(!dojo.lang.isFunction(func)){
_185=func;
func=_184;
_184=arguments[2];
argsStart++;
}
if(dojo.lang.isString(func)){
func=_185[func];
}
var args=[];
for(var i=argsStart;i<arguments.length;i++){
args.push(arguments[i]);
}
return setTimeout(function(){
func.apply(_185,args);
},_184);
};
dojo.lang.getNameInObj=function(ns,item){
if(!ns){
ns=dj_global;
}
for(var x in ns){
if(ns[x]===item){
return new String(x);
}
}
return null;
};
dojo.lang.shallowCopy=function(obj){
var ret={},key;
for(key in obj){
if(dojo.lang.isUndefined(ret[key])){
ret[key]=obj[key];
}
}
return ret;
};
dojo.lang.firstValued=function(){
for(var i=0;i<arguments.length;i++){
if(typeof arguments[i]!="undefined"){
return arguments[i];
}
}
return undefined;
};
dojo.lang.getObjPathValue=function(_18e,_18f,_190){
with(dojo.parseObjPath(_18e,_18f,_190)){
return dojo.evalProp(prop,obj,_190);
}
};
dojo.lang.setObjPathValue=function(_191,_192,_193,_194){
if(arguments.length<4){
_194=true;
}
with(dojo.parseObjPath(_191,_193,_194)){
if(obj&&(_194||(prop in obj))){
obj[prop]=_192;
}
}
};
dojo.provide("dojo.lang.declare");
dojo.require("dojo.lang.common");
dojo.require("dojo.lang.extras");
dojo.lang.declare=function(_195,_196,init,_198){
if((dojo.lang.isFunction(_198))||((!_198)&&(!dojo.lang.isFunction(init)))){
var temp=_198;
_198=init;
init=temp;
}
var _19a=[];
if(dojo.lang.isArray(_196)){
_19a=_196;
_196=_19a.shift();
}
if(!init){
init=dojo.evalObjPath(_195,false);
if((init)&&(!dojo.lang.isFunction(init))){
init=null;
}
}
var ctor=dojo.lang.declare._makeConstructor();
var scp=(_196?_196.prototype:null);
if(scp){
scp.prototyping=true;
ctor.prototype=new _196();
scp.prototyping=false;
}
ctor.superclass=scp;
ctor.mixins=_19a;
for(var i=0,l=_19a.length;i<l;i++){
dojo.lang.extend(ctor,_19a[i].prototype);
}
ctor.prototype.initializer=null;
ctor.prototype.declaredClass=_195;
if(dojo.lang.isArray(_198)){
dojo.lang.extend.apply(dojo.lang,[ctor].concat(_198));
}else{
dojo.lang.extend(ctor,(_198)||{});
}
dojo.lang.extend(ctor,dojo.lang.declare.base);
ctor.prototype.constructor=ctor;
ctor.prototype.initializer=(ctor.prototype.initializer)||(init)||(function(){
});
dojo.lang.setObjPathValue(_195,ctor,null,true);
};
dojo.lang.declare._makeConstructor=function(){
return function(){
var self=this._getPropContext();
var s=self.constructor.superclass;
if((s)&&(s.constructor)){
if(s.constructor==arguments.callee){
this.inherited("constructor",arguments);
}else{
this._inherited(s,"constructor",arguments);
}
}
var m=(self.constructor.mixins)||([]);
for(var i=0,l=m.length;i<l;i++){
(((m[i].prototype)&&(m[i].prototype.initializer))||(m[i])).apply(this,arguments);
}
if((!this.prototyping)&&(self.initializer)){
self.initializer.apply(this,arguments);
}
};
};
dojo.lang.declare.base={_getPropContext:function(){
return (this.___proto||this);
},_inherited:function(_1a2,_1a3,args){
var _1a5=this.___proto;
this.___proto=_1a2;
var _1a6=_1a2[_1a3].apply(this,(args||[]));
this.___proto=_1a5;
return _1a6;
},inheritedFrom:function(ctor,prop,args){
var p=((ctor)&&(ctor.prototype)&&(ctor.prototype[prop]));
return (dojo.lang.isFunction(p)?p.apply(this,(args||[])):p);
},inherited:function(prop,args){
var p=this._getPropContext();
do{
if((!p.constructor)||(!p.constructor.superclass)){
return;
}
p=p.constructor.superclass;
}while(!(prop in p));
return (dojo.lang.isFunction(p[prop])?this._inherited(p,prop,args):p[prop]);
}};
dojo.declare=dojo.lang.declare;
dojo.provide("dojo.event");
dojo.require("dojo.lang.array");
dojo.require("dojo.lang.extras");
dojo.require("dojo.lang.func");
dojo.event=new function(){
this.canTimeout=dojo.lang.isFunction(dj_global["setTimeout"])||dojo.lang.isAlien(dj_global["setTimeout"]);
function interpolateArgs(args,_1af){
var dl=dojo.lang;
var ao={srcObj:dj_global,srcFunc:null,adviceObj:dj_global,adviceFunc:null,aroundObj:null,aroundFunc:null,adviceType:(args.length>2)?args[0]:"after",precedence:"last",once:false,delay:null,rate:0,adviceMsg:false};
switch(args.length){
case 0:
return;
case 1:
return;
case 2:
ao.srcFunc=args[0];
ao.adviceFunc=args[1];
break;
case 3:
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isFunction(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
var _1b2=dl.nameAnonFunc(args[2],ao.adviceObj,_1af);
ao.adviceFunc=_1b2;
}else{
if((dl.isFunction(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=dj_global;
var _1b2=dl.nameAnonFunc(args[0],ao.srcObj,_1af);
ao.srcFunc=_1b2;
ao.adviceObj=args[1];
ao.adviceFunc=args[2];
}
}
}
}
break;
case 4:
if((dl.isObject(args[0]))&&(dl.isObject(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isString(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isFunction(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
var _1b2=dl.nameAnonFunc(args[1],dj_global,_1af);
ao.srcFunc=_1b2;
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))&&(dl.isFunction(args[3]))){
ao.srcObj=args[1];
ao.srcFunc=args[2];
var _1b2=dl.nameAnonFunc(args[3],dj_global,_1af);
ao.adviceObj=dj_global;
ao.adviceFunc=_1b2;
}else{
if(dl.isObject(args[1])){
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=dj_global;
ao.adviceFunc=args[3];
}else{
if(dl.isObject(args[2])){
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
ao.srcObj=ao.adviceObj=ao.aroundObj=dj_global;
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
ao.aroundFunc=args[3];
}
}
}
}
}
}
break;
case 6:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundFunc=args[5];
ao.aroundObj=dj_global;
break;
default:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundObj=args[5];
ao.aroundFunc=args[6];
ao.once=args[7];
ao.delay=args[8];
ao.rate=args[9];
ao.adviceMsg=args[10];
break;
}
if(dl.isFunction(ao.aroundFunc)){
var _1b2=dl.nameAnonFunc(ao.aroundFunc,ao.aroundObj,_1af);
ao.aroundFunc=_1b2;
}
if(dl.isFunction(ao.srcFunc)){
ao.srcFunc=dl.getNameInObj(ao.srcObj,ao.srcFunc);
}
if(dl.isFunction(ao.adviceFunc)){
ao.adviceFunc=dl.getNameInObj(ao.adviceObj,ao.adviceFunc);
}
if((ao.aroundObj)&&(dl.isFunction(ao.aroundFunc))){
ao.aroundFunc=dl.getNameInObj(ao.aroundObj,ao.aroundFunc);
}
if(!ao.srcObj){
dojo.raise("bad srcObj for srcFunc: "+ao.srcFunc);
}
if(!ao.adviceObj){
dojo.raise("bad adviceObj for adviceFunc: "+ao.adviceFunc);
}
return ao;
}
this.connect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=interpolateArgs(arguments,true);
}
if(dojo.lang.isArray(ao.srcObj)&&ao.srcObj!=""){
var _1b4={};
for(var x in ao){
_1b4[x]=ao[x];
}
var mjps=[];
dojo.lang.forEach(ao.srcObj,function(src){
if((dojo.render.html.capable)&&(dojo.lang.isString(src))){
src=dojo.byId(src);
}
_1b4.srcObj=src;
mjps.push(dojo.event.connect.call(dojo.event,_1b4));
});
return mjps;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
if(ao.adviceFunc){
var mjp2=dojo.event.MethodJoinPoint.getForMethod(ao.adviceObj,ao.adviceFunc);
}
mjp.kwAddAdvice(ao);
return mjp;
};
this.log=function(a1,a2){
var _1bc;
if((arguments.length==1)&&(typeof a1=="object")){
_1bc=a1;
}else{
_1bc={srcObj:a1,srcFunc:a2};
}
_1bc.adviceFunc=function(){
var _1bd=[];
for(var x=0;x<arguments.length;x++){
_1bd.push(arguments[x]);
}
dojo.debug("("+_1bc.srcObj+")."+_1bc.srcFunc,":",_1bd.join(", "));
};
this.kwConnect(_1bc);
};
this.connectBefore=function(){
var args=["before"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectAround=function(){
var args=["around"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectOnce=function(){
var ao=interpolateArgs(arguments,true);
ao.once=true;
return this.connect(ao);
};
this._kwConnectImpl=function(_1c4,_1c5){
var fn=(_1c5)?"disconnect":"connect";
if(typeof _1c4["srcFunc"]=="function"){
_1c4.srcObj=_1c4["srcObj"]||dj_global;
var _1c7=dojo.lang.nameAnonFunc(_1c4.srcFunc,_1c4.srcObj,true);
_1c4.srcFunc=_1c7;
}
if(typeof _1c4["adviceFunc"]=="function"){
_1c4.adviceObj=_1c4["adviceObj"]||dj_global;
var _1c7=dojo.lang.nameAnonFunc(_1c4.adviceFunc,_1c4.adviceObj,true);
_1c4.adviceFunc=_1c7;
}
return dojo.event[fn]((_1c4["type"]||_1c4["adviceType"]||"after"),_1c4["srcObj"]||dj_global,_1c4["srcFunc"],_1c4["adviceObj"]||_1c4["targetObj"]||dj_global,_1c4["adviceFunc"]||_1c4["targetFunc"],_1c4["aroundObj"],_1c4["aroundFunc"],_1c4["once"],_1c4["delay"],_1c4["rate"],_1c4["adviceMsg"]||false);
};
this.kwConnect=function(_1c8){
return this._kwConnectImpl(_1c8,false);
};
this.disconnect=function(){
var ao=interpolateArgs(arguments,true);
if(!ao.adviceFunc){
return;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
return mjp.removeAdvice(ao.adviceObj,ao.adviceFunc,ao.adviceType,ao.once);
};
this.kwDisconnect=function(_1cb){
return this._kwConnectImpl(_1cb,true);
};
};
dojo.event.MethodInvocation=function(_1cc,obj,args){
this.jp_=_1cc;
this.object=obj;
this.args=[];
for(var x=0;x<args.length;x++){
this.args[x]=args[x];
}
this.around_index=-1;
};
dojo.event.MethodInvocation.prototype.proceed=function(){
this.around_index++;
if(this.around_index>=this.jp_.around.length){
return this.jp_.object[this.jp_.methodname].apply(this.jp_.object,this.args);
}else{
var ti=this.jp_.around[this.around_index];
var mobj=ti[0]||dj_global;
var meth=ti[1];
return mobj[meth].call(mobj,this);
}
};
dojo.event.MethodJoinPoint=function(obj,_1d4){
this.object=obj||dj_global;
this.methodname=_1d4;
this.methodfunc=this.object[_1d4];
this.before=[];
this.after=[];
this.around=[];
};
dojo.event.MethodJoinPoint.getForMethod=function(obj,_1d6){
if(!obj){
obj=dj_global;
}
if(!obj[_1d6]){
obj[_1d6]=function(){
};
if(!obj[_1d6]){
dojo.raise("Cannot set do-nothing method on that object "+_1d6);
}
}else{
if((!dojo.lang.isFunction(obj[_1d6]))&&(!dojo.lang.isAlien(obj[_1d6]))){
return null;
}
}
var _1d7=_1d6+"$joinpoint";
var _1d8=_1d6+"$joinpoint$method";
var _1d9=obj[_1d7];
if(!_1d9){
var _1da=false;
if(dojo.event["browser"]){
if((obj["attachEvent"])||(obj["nodeType"])||(obj["addEventListener"])){
_1da=true;
dojo.event.browser.addClobberNodeAttrs(obj,[_1d7,_1d8,_1d6]);
}
}
var _1db=obj[_1d6].length;
obj[_1d8]=obj[_1d6];
_1d9=obj[_1d7]=new dojo.event.MethodJoinPoint(obj,_1d8);
obj[_1d6]=function(){
var args=[];
if((_1da)&&(!arguments.length)){
var evt=null;
try{
if(obj.ownerDocument){
evt=obj.ownerDocument.parentWindow.event;
}else{
if(obj.documentElement){
evt=obj.documentElement.ownerDocument.parentWindow.event;
}else{
evt=window.event;
}
}
}
catch(e){
evt=window.event;
}
if(evt){
args.push(dojo.event.browser.fixEvent(evt,this));
}
}else{
for(var x=0;x<arguments.length;x++){
if((x==0)&&(_1da)&&(dojo.event.browser.isEvent(arguments[x]))){
args.push(dojo.event.browser.fixEvent(arguments[x],this));
}else{
args.push(arguments[x]);
}
}
}
return _1d9.run.apply(_1d9,args);
};
obj[_1d6].__preJoinArity=_1db;
}
return _1d9;
};
dojo.lang.extend(dojo.event.MethodJoinPoint,{unintercept:function(){
this.object[this.methodname]=this.methodfunc;
this.before=[];
this.after=[];
this.around=[];
},disconnect:dojo.lang.forward("unintercept"),run:function(){
var obj=this.object||dj_global;
var args=arguments;
var _1e1=[];
for(var x=0;x<args.length;x++){
_1e1[x]=args[x];
}
var _1e3=function(marr){
if(!marr){
dojo.debug("Null argument to unrollAdvice()");
return;
}
var _1e5=marr[0]||dj_global;
var _1e6=marr[1];
if(!_1e5[_1e6]){
dojo.raise("function \""+_1e6+"\" does not exist on \""+_1e5+"\"");
}
var _1e7=marr[2]||dj_global;
var _1e8=marr[3];
var msg=marr[6];
var _1ea;
var to={args:[],jp_:this,object:obj,proceed:function(){
return _1e5[_1e6].apply(_1e5,to.args);
}};
to.args=_1e1;
var _1ec=parseInt(marr[4]);
var _1ed=((!isNaN(_1ec))&&(marr[4]!==null)&&(typeof marr[4]!="undefined"));
if(marr[5]){
var rate=parseInt(marr[5]);
var cur=new Date();
var _1f0=false;
if((marr["last"])&&((cur-marr.last)<=rate)){
if(dojo.event.canTimeout){
if(marr["delayTimer"]){
clearTimeout(marr.delayTimer);
}
var tod=parseInt(rate*2);
var mcpy=dojo.lang.shallowCopy(marr);
marr.delayTimer=setTimeout(function(){
mcpy[5]=0;
_1e3(mcpy);
},tod);
}
return;
}else{
marr.last=cur;
}
}
if(_1e8){
_1e7[_1e8].call(_1e7,to);
}else{
if((_1ed)&&((dojo.render.html)||(dojo.render.svg))){
dj_global["setTimeout"](function(){
if(msg){
_1e5[_1e6].call(_1e5,to);
}else{
_1e5[_1e6].apply(_1e5,args);
}
},_1ec);
}else{
if(msg){
_1e5[_1e6].call(_1e5,to);
}else{
_1e5[_1e6].apply(_1e5,args);
}
}
}
};
if(this.before.length>0){
dojo.lang.forEach(this.before,_1e3);
}
var _1f3;
if(this.around.length>0){
var mi=new dojo.event.MethodInvocation(this,obj,args);
_1f3=mi.proceed();
}else{
if(this.methodfunc){
_1f3=this.object[this.methodname].apply(this.object,args);
}
}
if(this.after.length>0){
dojo.lang.forEach(this.after,_1e3);
}
return (this.methodfunc)?_1f3:null;
},getArr:function(kind){
var arr=this.after;
if((typeof kind=="string")&&(kind.indexOf("before")!=-1)){
arr=this.before;
}else{
if(kind=="around"){
arr=this.around;
}
}
return arr;
},kwAddAdvice:function(args){
this.addAdvice(args["adviceObj"],args["adviceFunc"],args["aroundObj"],args["aroundFunc"],args["adviceType"],args["precedence"],args["once"],args["delay"],args["rate"],args["adviceMsg"]);
},addAdvice:function(_1f8,_1f9,_1fa,_1fb,_1fc,_1fd,once,_1ff,rate,_201){
var arr=this.getArr(_1fc);
if(!arr){
dojo.raise("bad this: "+this);
}
var ao=[_1f8,_1f9,_1fa,_1fb,_1ff,rate,_201];
if(once){
if(this.hasAdvice(_1f8,_1f9,_1fc,arr)>=0){
return;
}
}
if(_1fd=="first"){
arr.unshift(ao);
}else{
arr.push(ao);
}
},hasAdvice:function(_204,_205,_206,arr){
if(!arr){
arr=this.getArr(_206);
}
var ind=-1;
for(var x=0;x<arr.length;x++){
var aao=(typeof _205=="object")?(new String(_205)).toString():_205;
var a1o=(typeof arr[x][1]=="object")?(new String(arr[x][1])).toString():arr[x][1];
if((arr[x][0]==_204)&&(a1o==aao)){
ind=x;
}
}
return ind;
},removeAdvice:function(_20c,_20d,_20e,once){
var arr=this.getArr(_20e);
var ind=this.hasAdvice(_20c,_20d,_20e,arr);
if(ind==-1){
return false;
}
while(ind!=-1){
arr.splice(ind,1);
if(once){
break;
}
ind=this.hasAdvice(_20c,_20d,_20e,arr);
}
return true;
}});
dojo.require("dojo.event");
dojo.provide("dojo.event.topic");
dojo.event.topic=new function(){
this.topics={};
this.getTopic=function(_212){
if(!this.topics[_212]){
this.topics[_212]=new this.TopicImpl(_212);
}
return this.topics[_212];
};
this.registerPublisher=function(_213,obj,_215){
var _213=this.getTopic(_213);
_213.registerPublisher(obj,_215);
};
this.subscribe=function(_216,obj,_218){
var _216=this.getTopic(_216);
_216.subscribe(obj,_218);
};
this.unsubscribe=function(_219,obj,_21b){
var _219=this.getTopic(_219);
_219.unsubscribe(obj,_21b);
};
this.destroy=function(_21c){
this.getTopic(_21c).destroy();
delete this.topics[_21c];
};
this.publishApply=function(_21d,args){
var _21d=this.getTopic(_21d);
_21d.sendMessage.apply(_21d,args);
};
this.publish=function(_21f,_220){
var _21f=this.getTopic(_21f);
var args=[];
for(var x=1;x<arguments.length;x++){
args.push(arguments[x]);
}
_21f.sendMessage.apply(_21f,args);
};
};
dojo.event.topic.TopicImpl=function(_223){
this.topicName=_223;
this.subscribe=function(_224,_225){
var tf=_225||_224;
var to=(!_225)?dj_global:_224;
dojo.event.kwConnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this.unsubscribe=function(_228,_229){
var tf=(!_229)?_228:_229;
var to=(!_229)?null:_228;
dojo.event.kwDisconnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this.destroy=function(){
dojo.event.MethodJoinPoint.getForMethod(this,"sendMessage").disconnect();
};
this.registerPublisher=function(_22c,_22d){
dojo.event.connect(_22c,_22d,this,"sendMessage");
};
this.sendMessage=function(_22e){
};
};
dojo.provide("dojo.event.browser");
dojo.require("dojo.event");
dojo._ie_clobber=new function(){
this.clobberNodes=[];
function nukeProp(node,prop){
try{
node[prop]=null;
}
catch(e){
}
try{
delete node[prop];
}
catch(e){
}
try{
node.removeAttribute(prop);
}
catch(e){
}
}
this.clobber=function(_231){
var na;
var tna;
if(_231){
tna=_231.all||_231.getElementsByTagName("*");
na=[_231];
for(var x=0;x<tna.length;x++){
if(tna[x]["__doClobber__"]){
na.push(tna[x]);
}
}
}else{
try{
window.onload=null;
}
catch(e){
}
na=(this.clobberNodes.length)?this.clobberNodes:document.all;
}
tna=null;
var _235={};
for(var i=na.length-1;i>=0;i=i-1){
var el=na[i];
if(el["__clobberAttrs__"]){
for(var j=0;j<el.__clobberAttrs__.length;j++){
nukeProp(el,el.__clobberAttrs__[j]);
}
nukeProp(el,"__clobberAttrs__");
nukeProp(el,"__doClobber__");
}
}
na=null;
};
};
if(dojo.render.html.ie){
dojo.addOnUnload(function(){
dojo._ie_clobber.clobber();
try{
if((dojo["widget"])&&(dojo.widget["manager"])){
dojo.widget.manager.destroyAll();
}
}
catch(e){
}
try{
window.onload=null;
}
catch(e){
}
try{
window.onunload=null;
}
catch(e){
}
dojo._ie_clobber.clobberNodes=[];
});
}
dojo.event.browser=new function(){
var _239=0;
this.clean=function(node){
if(dojo.render.html.ie){
dojo._ie_clobber.clobber(node);
}
};
this.addClobberNode=function(node){
if(!dojo.render.html.ie){
return;
}
if(!node["__doClobber__"]){
node.__doClobber__=true;
dojo._ie_clobber.clobberNodes.push(node);
node.__clobberAttrs__=[];
}
};
this.addClobberNodeAttrs=function(node,_23d){
if(!dojo.render.html.ie){
return;
}
this.addClobberNode(node);
for(var x=0;x<_23d.length;x++){
node.__clobberAttrs__.push(_23d[x]);
}
};
this.removeListener=function(node,_240,fp,_242){
if(!_242){
var _242=false;
}
_240=_240.toLowerCase();
if(_240.substr(0,2)=="on"){
_240=_240.substr(2);
}
if(node.removeEventListener){
node.removeEventListener(_240,fp,_242);
}
};
this.addListener=function(node,_244,fp,_246,_247){
if(!node){
return;
}
if(!_246){
var _246=false;
}
_244=_244.toLowerCase();
if(_244.substr(0,2)!="on"){
_244="on"+_244;
}
if(!_247){
var _248=function(evt){
if(!evt){
evt=window.event;
}
var ret=fp(dojo.event.browser.fixEvent(evt,this));
if(_246){
dojo.event.browser.stopEvent(evt);
}
return ret;
};
}else{
_248=fp;
}
if(node.addEventListener){
node.addEventListener(_244.substr(2),_248,_246);
return _248;
}else{
if(typeof node[_244]=="function"){
var _24b=node[_244];
node[_244]=function(e){
_24b(e);
return _248(e);
};
}else{
node[_244]=_248;
}
if(dojo.render.html.ie){
this.addClobberNodeAttrs(node,[_244]);
}
return _248;
}
};
this.isEvent=function(obj){
return (typeof obj!="undefined")&&(typeof Event!="undefined")&&(obj.eventPhase);
};
this.currentEvent=null;
this.callListener=function(_24e,_24f){
if(typeof _24e!="function"){
dojo.raise("listener not a function: "+_24e);
}
dojo.event.browser.currentEvent.currentTarget=_24f;
return _24e.call(_24f,dojo.event.browser.currentEvent);
};
this.stopPropagation=function(){
dojo.event.browser.currentEvent.cancelBubble=true;
};
this.preventDefault=function(){
dojo.event.browser.currentEvent.returnValue=false;
};
this.keys={KEY_BACKSPACE:8,KEY_TAB:9,KEY_ENTER:13,KEY_SHIFT:16,KEY_CTRL:17,KEY_ALT:18,KEY_PAUSE:19,KEY_CAPS_LOCK:20,KEY_ESCAPE:27,KEY_SPACE:32,KEY_PAGE_UP:33,KEY_PAGE_DOWN:34,KEY_END:35,KEY_HOME:36,KEY_LEFT_ARROW:37,KEY_UP_ARROW:38,KEY_RIGHT_ARROW:39,KEY_DOWN_ARROW:40,KEY_INSERT:45,KEY_DELETE:46,KEY_LEFT_WINDOW:91,KEY_RIGHT_WINDOW:92,KEY_SELECT:93,KEY_F1:112,KEY_F2:113,KEY_F3:114,KEY_F4:115,KEY_F5:116,KEY_F6:117,KEY_F7:118,KEY_F8:119,KEY_F9:120,KEY_F10:121,KEY_F11:122,KEY_F12:123,KEY_NUM_LOCK:144,KEY_SCROLL_LOCK:145};
this.revKeys=[];
for(var key in this.keys){
this.revKeys[this.keys[key]]=key;
}
this.fixEvent=function(evt,_252){
if((!evt)&&(window["event"])){
var evt=window.event;
}
if((evt["type"])&&(evt["type"].indexOf("key")==0)){
evt.keys=this.revKeys;
for(var key in this.keys){
evt[key]=this.keys[key];
}
if((dojo.render.html.ie)&&(evt["type"]=="keypress")){
evt.charCode=evt.keyCode;
}
}
if(dojo.render.html.ie){
if(!evt.target){
evt.target=evt.srcElement;
}
if(!evt.currentTarget){
evt.currentTarget=(_252?_252:evt.srcElement);
}
if(!evt.layerX){
evt.layerX=evt.offsetX;
}
if(!evt.layerY){
evt.layerY=evt.offsetY;
}
var _254=((dojo.render.html.ie55)||(document["compatMode"]=="BackCompat"))?document.body:document.documentElement;
if(!evt.pageX){
evt.pageX=evt.clientX+(_254.scrollLeft||0);
}
if(!evt.pageY){
evt.pageY=evt.clientY+(_254.scrollTop||0);
}
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
this.currentEvent=evt;
evt.callListener=this.callListener;
evt.stopPropagation=this.stopPropagation;
evt.preventDefault=this.preventDefault;
}
return evt;
};
this.stopEvent=function(ev){
if(window.event){
ev.returnValue=false;
ev.cancelBubble=true;
}else{
ev.preventDefault();
ev.stopPropagation();
}
};
};
dojo.kwCompoundRequire({common:["dojo.event","dojo.event.topic"],browser:["dojo.event.browser"],dashboard:["dojo.event.browser"]});
dojo.provide("dojo.event.*");
dojo.provide("dojo.widget.Manager");
dojo.require("dojo.lang.array");
dojo.require("dojo.lang.func");
dojo.require("dojo.event.*");
dojo.widget.manager=new function(){
this.widgets=[];
this.widgetIds=[];
this.topWidgets={};
var _256={};
var _257=[];
this.getUniqueId=function(_258){
return _258+"_"+(_256[_258]!=undefined?++_256[_258]:_256[_258]=0);
};
this.add=function(_259){
dojo.profile.start("dojo.widget.manager.add");
this.widgets.push(_259);
if(!_259.extraArgs["id"]){
_259.extraArgs["id"]=_259.extraArgs["ID"];
}
if(_259.widgetId==""){
if(_259["id"]){
_259.widgetId=_259["id"];
}else{
if(_259.extraArgs["id"]){
_259.widgetId=_259.extraArgs["id"];
}else{
_259.widgetId=this.getUniqueId(_259.widgetType);
}
}
}
if(this.widgetIds[_259.widgetId]){
dojo.debug("widget ID collision on ID: "+_259.widgetId);
}
this.widgetIds[_259.widgetId]=_259;
dojo.profile.end("dojo.widget.manager.add");
};
this.destroyAll=function(){
for(var x=this.widgets.length-1;x>=0;x--){
try{
this.widgets[x].destroy(true);
delete this.widgets[x];
}
catch(e){
}
}
};
this.remove=function(_25b){
var tw=this.widgets[_25b].widgetId;
delete this.widgetIds[tw];
this.widgets.splice(_25b,1);
};
this.removeById=function(id){
for(var i=0;i<this.widgets.length;i++){
if(this.widgets[i].widgetId==id){
this.remove(i);
break;
}
}
};
this.getWidgetById=function(id){
return this.widgetIds[id];
};
this.getWidgetsByType=function(type){
var lt=type.toLowerCase();
var ret=[];
dojo.lang.forEach(this.widgets,function(x){
if(x.widgetType.toLowerCase()==lt){
ret.push(x);
}
});
return ret;
};
this.getWidgetsOfType=function(id){
dojo.deprecated("getWidgetsOfType","use getWidgetsByType","0.4");
return dojo.widget.manager.getWidgetsByType(id);
};
this.getWidgetsByFilter=function(_265,_266){
var ret=[];
dojo.lang.every(this.widgets,function(x){
if(_265(x)){
ret.push(x);
if(_266){
return false;
}
}
return true;
});
return (_266?ret[0]:ret);
};
this.getAllWidgets=function(){
return this.widgets.concat();
};
this.getWidgetByNode=function(node){
var w=this.getAllWidgets();
for(var i=0;i<w.length;i++){
if(w[i].domNode==node){
return w[i];
}
}
return null;
};
this.byId=this.getWidgetById;
this.byType=this.getWidgetsByType;
this.byFilter=this.getWidgetsByFilter;
this.byNode=this.getWidgetByNode;
var _26c={};
var _26d=["dojo.widget"];
for(var i=0;i<_26d.length;i++){
_26d[_26d[i]]=true;
}
this.registerWidgetPackage=function(_26f){
if(!_26d[_26f]){
_26d[_26f]=true;
_26d.push(_26f);
}
};
this.getWidgetPackageList=function(){
return dojo.lang.map(_26d,function(elt){
return (elt!==true?elt:undefined);
});
};
this.getImplementation=function(_271,_272,_273){
var impl=this.getImplementationName(_271);
if(impl){
var ret=new impl(_272);
return ret;
}
};
this.getImplementationName=function(_276){
var _277=_276.toLowerCase();
var impl=_26c[_277];
if(impl){
return impl;
}
if(!_257.length){
for(var _279 in dojo.render){
if(dojo.render[_279]["capable"]===true){
var _27a=dojo.render[_279].prefixes;
for(var i=0;i<_27a.length;i++){
_257.push(_27a[i].toLowerCase());
}
}
}
_257.push("");
}
for(var i=0;i<_26d.length;i++){
var _27c=dojo.evalObjPath(_26d[i]);
if(!_27c){
continue;
}
for(var j=0;j<_257.length;j++){
if(!_27c[_257[j]]){
continue;
}
for(var _27e in _27c[_257[j]]){
if(_27e.toLowerCase()!=_277){
continue;
}
_26c[_277]=_27c[_257[j]][_27e];
return _26c[_277];
}
}
for(var j=0;j<_257.length;j++){
for(var _27e in _27c){
if(_27e.toLowerCase()!=(_257[j]+_277)){
continue;
}
_26c[_277]=_27c[_27e];
return _26c[_277];
}
}
}
throw new Error("Could not locate \""+_276+"\" class");
};
this.resizing=false;
this.onWindowResized=function(){
if(this.resizing){
return;
}
try{
this.resizing=true;
for(var id in this.topWidgets){
var _280=this.topWidgets[id];
if(_280.checkSize){
_280.checkSize();
}
}
}
catch(e){
}
finally{
this.resizing=false;
}
};
if(typeof window!="undefined"){
dojo.addOnLoad(this,"onWindowResized");
dojo.event.connect(window,"onresize",this,"onWindowResized");
}
};
(function(){
var dw=dojo.widget;
var dwm=dw.manager;
var h=dojo.lang.curry(dojo.lang,"hitch",dwm);
var g=function(_285,_286){
dw[(_286||_285)]=h(_285);
};
g("add","addWidget");
g("destroyAll","destroyAllWidgets");
g("remove","removeWidget");
g("removeById","removeWidgetById");
g("getWidgetById");
g("getWidgetById","byId");
g("getWidgetsByType");
g("getWidgetsByFilter");
g("getWidgetsByType","byType");
g("getWidgetsByFilter","byFilter");
g("getWidgetByNode","byNode");
dw.all=function(n){
var _288=dwm.getAllWidgets.apply(dwm,arguments);
if(arguments.length>0){
return _288[n];
}
return _288;
};
g("registerWidgetPackage");
g("getImplementation","getWidgetImplementation");
g("getImplementationName","getWidgetImplementationName");
dw.widgets=dwm.widgets;
dw.widgetIds=dwm.widgetIds;
dw.root=dwm.root;
})();
dojo.provide("dojo.widget.Widget");
dojo.provide("dojo.widget.tags");
dojo.require("dojo.lang.func");
dojo.require("dojo.lang.array");
dojo.require("dojo.lang.extras");
dojo.require("dojo.lang.declare");
dojo.require("dojo.widget.Manager");
dojo.require("dojo.event.*");
dojo.declare("dojo.widget.Widget",null,{initializer:function(){
this.children=[];
this.extraArgs={};
},parent:null,isTopLevel:false,isModal:false,isEnabled:true,isHidden:false,isContainer:false,widgetId:"",widgetType:"Widget",toString:function(){
return "[Widget "+this.widgetType+", "+(this.widgetId||"NO ID")+"]";
},repr:function(){
return this.toString();
},enable:function(){
this.isEnabled=true;
},disable:function(){
this.isEnabled=false;
},hide:function(){
this.isHidden=true;
},show:function(){
this.isHidden=false;
},onResized:function(){
this.notifyChildrenOfResize();
},notifyChildrenOfResize:function(){
for(var i=0;i<this.children.length;i++){
var _28a=this.children[i];
if(_28a.onResized){
_28a.onResized();
}
}
},create:function(args,_28c,_28d){
this.satisfyPropertySets(args,_28c,_28d);
this.mixInProperties(args,_28c,_28d);
this.postMixInProperties(args,_28c,_28d);
dojo.widget.manager.add(this);
this.buildRendering(args,_28c,_28d);
this.initialize(args,_28c,_28d);
this.postInitialize(args,_28c,_28d);
this.postCreate(args,_28c,_28d);
return this;
},destroy:function(_28e){
this.destroyChildren();
this.uninitialize();
this.destroyRendering(_28e);
dojo.widget.manager.removeById(this.widgetId);
},destroyChildren:function(){
while(this.children.length>0){
var tc=this.children[0];
this.removeChild(tc);
tc.destroy();
}
},getChildrenOfType:function(type,_291){
var ret=[];
var _293=dojo.lang.isFunction(type);
if(!_293){
type=type.toLowerCase();
}
for(var x=0;x<this.children.length;x++){
if(_293){
if(this.children[x] instanceof type){
ret.push(this.children[x]);
}
}else{
if(this.children[x].widgetType.toLowerCase()==type){
ret.push(this.children[x]);
}
}
if(_291){
ret=ret.concat(this.children[x].getChildrenOfType(type,_291));
}
}
return ret;
},getDescendants:function(){
var _295=[];
var _296=[this];
var elem;
while(elem=_296.pop()){
_295.push(elem);
dojo.lang.forEach(elem.children,function(elem){
_296.push(elem);
});
}
return _295;
},satisfyPropertySets:function(args){
return args;
},mixInProperties:function(args,frag){
if((args["fastMixIn"])||(frag["fastMixIn"])){
for(var x in args){
this[x]=args[x];
}
return;
}
var _29d;
var _29e=dojo.widget.lcArgsCache[this.widgetType];
if(_29e==null){
_29e={};
for(var y in this){
_29e[((new String(y)).toLowerCase())]=y;
}
dojo.widget.lcArgsCache[this.widgetType]=_29e;
}
var _2a0={};
for(var x in args){
if(!this[x]){
var y=_29e[(new String(x)).toLowerCase()];
if(y){
args[y]=args[x];
x=y;
}
}
if(_2a0[x]){
continue;
}
_2a0[x]=true;
if((typeof this[x])!=(typeof _29d)){
if(typeof args[x]!="string"){
this[x]=args[x];
}else{
if(dojo.lang.isString(this[x])){
this[x]=args[x];
}else{
if(dojo.lang.isNumber(this[x])){
this[x]=new Number(args[x]);
}else{
if(dojo.lang.isBoolean(this[x])){
this[x]=(args[x].toLowerCase()=="false")?false:true;
}else{
if(dojo.lang.isFunction(this[x])){
if(args[x].search(/[^\w\.]+/i)==-1){
this[x]=dojo.evalObjPath(args[x],false);
}else{
var tn=dojo.lang.nameAnonFunc(new Function(args[x]),this);
dojo.event.connect(this,x,this,tn);
}
}else{
if(dojo.lang.isArray(this[x])){
this[x]=args[x].split(";");
}else{
if(this[x] instanceof Date){
this[x]=new Date(Number(args[x]));
}else{
if(typeof this[x]=="object"){
if(this[x] instanceof dojo.uri.Uri){
this[x]=args[x];
}else{
var _2a2=args[x].split(";");
for(var y=0;y<_2a2.length;y++){
var si=_2a2[y].indexOf(":");
if((si!=-1)&&(_2a2[y].length>si)){
this[x][_2a2[y].substr(0,si).replace(/^\s+|\s+$/g,"")]=_2a2[y].substr(si+1);
}
}
}
}else{
this[x]=args[x];
}
}
}
}
}
}
}
}
}else{
this.extraArgs[x.toLowerCase()]=args[x];
}
}
},postMixInProperties:function(){
},initialize:function(args,frag){
return false;
},postInitialize:function(args,frag){
return false;
},postCreate:function(args,frag){
return false;
},uninitialize:function(){
return false;
},buildRendering:function(){
dojo.unimplemented("dojo.widget.Widget.buildRendering, on "+this.toString()+", ");
return false;
},destroyRendering:function(){
dojo.unimplemented("dojo.widget.Widget.destroyRendering");
return false;
},cleanUp:function(){
dojo.unimplemented("dojo.widget.Widget.cleanUp");
return false;
},addedTo:function(_2aa){
},addChild:function(_2ab){
dojo.unimplemented("dojo.widget.Widget.addChild");
return false;
},removeChild:function(_2ac){
for(var x=0;x<this.children.length;x++){
if(this.children[x]===_2ac){
this.children.splice(x,1);
break;
}
}
return _2ac;
},resize:function(_2ae,_2af){
this.setWidth(_2ae);
this.setHeight(_2af);
},setWidth:function(_2b0){
if((typeof _2b0=="string")&&(_2b0.substr(-1)=="%")){
this.setPercentageWidth(_2b0);
}else{
this.setNativeWidth(_2b0);
}
},setHeight:function(_2b1){
if((typeof _2b1=="string")&&(_2b1.substr(-1)=="%")){
this.setPercentageHeight(_2b1);
}else{
this.setNativeHeight(_2b1);
}
},setPercentageHeight:function(_2b2){
return false;
},setNativeHeight:function(_2b3){
return false;
},setPercentageWidth:function(_2b4){
return false;
},setNativeWidth:function(_2b5){
return false;
},getPreviousSibling:function(){
var idx=this.getParentIndex();
if(idx<=0){
return null;
}
return this.getSiblings()[idx-1];
},getSiblings:function(){
return this.parent.children;
},getParentIndex:function(){
return dojo.lang.indexOf(this.getSiblings(),this,true);
},getNextSibling:function(){
var idx=this.getParentIndex();
if(idx==this.getSiblings().length-1){
return null;
}
if(idx<0){
return null;
}
return this.getSiblings()[idx+1];
}});
dojo.widget.lcArgsCache={};
dojo.widget.tags={};
dojo.widget.tags.addParseTreeHandler=function(type){
var _2b9=type.toLowerCase();
this[_2b9]=function(_2ba,_2bb,_2bc,_2bd,_2be){
return dojo.widget.buildWidgetFromParseTree(_2b9,_2ba,_2bb,_2bc,_2bd,_2be);
};
};
dojo.widget.tags.addParseTreeHandler("dojo:widget");
dojo.widget.tags["dojo:propertyset"]=function(_2bf,_2c0,_2c1){
var _2c2=_2c0.parseProperties(_2bf["dojo:propertyset"]);
};
dojo.widget.tags["dojo:connect"]=function(_2c3,_2c4,_2c5){
var _2c6=_2c4.parseProperties(_2c3["dojo:connect"]);
};
dojo.widget.buildWidgetFromParseTree=function(type,frag,_2c9,_2ca,_2cb,_2cc){
var _2cd=type.split(":");
_2cd=(_2cd.length==2)?_2cd[1]:type;
var _2ce=_2cc||_2c9.parseProperties(frag["dojo:"+_2cd]);
var _2cf=dojo.widget.manager.getImplementation(_2cd);
if(!_2cf){
throw new Error("cannot find \""+_2cd+"\" widget");
}else{
if(!_2cf.create){
throw new Error("\""+_2cd+"\" widget object does not appear to implement *Widget");
}
}
_2ce["dojoinsertionindex"]=_2cb;
var ret=_2cf.create(_2ce,frag,_2ca);
return ret;
};
dojo.widget.defineWidget=function(_2d1,_2d2,_2d3,init,_2d5){
if(dojo.lang.isString(arguments[3])){
dojo.widget._defineWidget(arguments[0],arguments[3],arguments[1],arguments[4],arguments[2]);
}else{
var args=[arguments[0]],p=3;
if(dojo.lang.isString(arguments[1])){
args.push(arguments[1],arguments[2]);
}else{
args.push("",arguments[1]);
p=2;
}
if(dojo.lang.isFunction(arguments[p])){
args.push(arguments[p],arguments[p+1]);
}else{
args.push(null,arguments[p]);
}
dojo.widget._defineWidget.apply(this,args);
}
};
dojo.widget.defineWidget.renderers="html|svg|vml";
dojo.widget._defineWidget=function(_2d7,_2d8,_2d9,init,_2db){
var _2dc=_2d7.split(".");
var type=_2dc.pop();
var regx="\\.("+(_2d8?_2d8+"|":"")+dojo.widget.defineWidget.renderers+")\\.";
var r=_2d7.search(new RegExp(regx));
_2dc=(r<0?_2dc.join("."):_2d7.substr(0,r));
dojo.widget.manager.registerWidgetPackage(_2dc);
dojo.widget.tags.addParseTreeHandler("dojo:"+type.toLowerCase());
_2db=(_2db)||{};
_2db.widgetType=type;
if((!init)&&(_2db["classConstructor"])){
init=_2db.classConstructor;
delete _2db.classConstructor;
}
dojo.declare(_2d7,_2d9,init,_2db);
};
dojo.provide("dojo.widget.Parse");
dojo.require("dojo.widget.Manager");
dojo.require("dojo.dom");
dojo.widget.Parse=function(_2e0){
this.propertySetsList=[];
this.fragment=_2e0;
this.createComponents=function(frag,_2e2){
var _2e3=[];
var _2e4=false;
try{
if((frag)&&(frag["tagName"])&&(frag!=frag["nodeRef"])){
var _2e5=dojo.widget.tags;
var tna=String(frag["tagName"]).split(";");
for(var x=0;x<tna.length;x++){
var ltn=(tna[x].replace(/^\s+|\s+$/g,"")).toLowerCase();
if(_2e5[ltn]){
_2e4=true;
frag.tagName=ltn;
var ret=_2e5[ltn](frag,this,_2e2,frag["index"]);
_2e3.push(ret);
}else{
if((dojo.lang.isString(ltn))&&(ltn.substr(0,5)=="dojo:")){
dojo.debug("no tag handler registed for type: ",ltn);
}
}
}
}
}
catch(e){
dojo.debug("dojo.widget.Parse: error:",e);
}
if(!_2e4){
_2e3=_2e3.concat(this.createSubComponents(frag,_2e2));
}
return _2e3;
};
this.createSubComponents=function(_2ea,_2eb){
var frag,comps=[];
for(var item in _2ea){
frag=_2ea[item];
if((frag)&&(typeof frag=="object")&&(frag!=_2ea.nodeRef)&&(frag!=_2ea["tagName"])){
comps=comps.concat(this.createComponents(frag,_2eb));
}
}
return comps;
};
this.parsePropertySets=function(_2ee){
return [];
var _2ef=[];
for(var item in _2ee){
if((_2ee[item]["tagName"]=="dojo:propertyset")){
_2ef.push(_2ee[item]);
}
}
this.propertySetsList.push(_2ef);
return _2ef;
};
this.parseProperties=function(_2f1){
var _2f2={};
for(var item in _2f1){
if((_2f1[item]==_2f1["tagName"])||(_2f1[item]==_2f1.nodeRef)){
}else{
if((_2f1[item]["tagName"])&&(dojo.widget.tags[_2f1[item].tagName.toLowerCase()])){
}else{
if((_2f1[item][0])&&(_2f1[item][0].value!="")&&(_2f1[item][0].value!=null)){
try{
if(item.toLowerCase()=="dataprovider"){
var _2f4=this;
this.getDataProvider(_2f4,_2f1[item][0].value);
_2f2.dataProvider=this.dataProvider;
}
_2f2[item]=_2f1[item][0].value;
var _2f5=this.parseProperties(_2f1[item]);
for(var _2f6 in _2f5){
_2f2[_2f6]=_2f5[_2f6];
}
}
catch(e){
dojo.debug(e);
}
}
}
}
}
return _2f2;
};
this.getDataProvider=function(_2f7,_2f8){
dojo.io.bind({url:_2f8,load:function(type,_2fa){
if(type=="load"){
_2f7.dataProvider=_2fa;
}
},mimetype:"text/javascript",sync:true});
};
this.getPropertySetById=function(_2fb){
for(var x=0;x<this.propertySetsList.length;x++){
if(_2fb==this.propertySetsList[x]["id"][0].value){
return this.propertySetsList[x];
}
}
return "";
};
this.getPropertySetsByType=function(_2fd){
var _2fe=[];
for(var x=0;x<this.propertySetsList.length;x++){
var cpl=this.propertySetsList[x];
var cpcc=cpl["componentClass"]||cpl["componentType"]||null;
if((cpcc)&&(propertySetId==cpcc[0].value)){
_2fe.push(cpl);
}
}
return _2fe;
};
this.getPropertySets=function(_302){
var ppl="dojo:propertyproviderlist";
var _304=[];
var _305=_302["tagName"];
if(_302[ppl]){
var _306=_302[ppl].value.split(" ");
for(var _307 in _306){
if((_307.indexOf("..")==-1)&&(_307.indexOf("://")==-1)){
var _308=this.getPropertySetById(_307);
if(_308!=""){
_304.push(_308);
}
}else{
}
}
}
return (this.getPropertySetsByType(_305)).concat(_304);
};
this.createComponentFromScript=function(_309,_30a,_30b){
var ltn="dojo:"+_30a.toLowerCase();
if(dojo.widget.tags[ltn]){
_30b.fastMixIn=true;
return [dojo.widget.tags[ltn](_30b,this,null,null,_30b)];
}else{
if(ltn.substr(0,5)=="dojo:"){
dojo.debug("no tag handler registed for type: ",ltn);
}
}
};
};
dojo.widget._parser_collection={"dojo":new dojo.widget.Parse()};
dojo.widget.getParser=function(name){
if(!name){
name="dojo";
}
if(!this._parser_collection[name]){
this._parser_collection[name]=new dojo.widget.Parse();
}
return this._parser_collection[name];
};
dojo.widget.createWidget=function(name,_30f,_310,_311){
var _312=name.toLowerCase();
var _313="dojo:"+_312;
var _314=(dojo.byId(name)&&(!dojo.widget.tags[_313]));
if((arguments.length==1)&&((typeof name!="string")||(_314))){
var xp=new dojo.xml.Parse();
var tn=(_314)?dojo.byId(name):name;
return dojo.widget.getParser().createComponents(xp.parseElement(tn,null,true))[0];
}
function fromScript(_317,name,_319){
_319[_313]={dojotype:[{value:_312}],nodeRef:_317,fastMixIn:true};
return dojo.widget.getParser().createComponentFromScript(_317,name,_319,true);
}
if(typeof name!="string"&&typeof _30f=="string"){
dojo.deprecated("dojo.widget.createWidget","argument order is now of the form "+"dojo.widget.createWidget(NAME, [PROPERTIES, [REFERENCENODE, [POSITION]]])","0.4");
return fromScript(name,_30f,_310);
}
_30f=_30f||{};
var _31a=false;
var tn=null;
var h=dojo.render.html.capable;
if(h){
tn=document.createElement("span");
}
if(!_310){
_31a=true;
_310=tn;
if(h){
document.body.appendChild(_310);
}
}else{
if(_311){
dojo.dom.insertAtPosition(tn,_310,_311);
}else{
tn=_310;
}
}
var _31c=fromScript(tn,name,_30f);
if(!_31c||!_31c[0]||typeof _31c[0].widgetType=="undefined"){
throw new Error("createWidget: Creation of \""+name+"\" widget failed.");
}
if(_31a){
if(_31c[0].domNode.parentNode){
_31c[0].domNode.parentNode.removeChild(_31c[0].domNode);
}
}
return _31c[0];
};
dojo.widget.fromScript=function(name,_31e,_31f,_320){
dojo.deprecated("dojo.widget.fromScript"," use "+"dojo.widget.createWidget instead","0.4");
return dojo.widget.createWidget(name,_31e,_31f,_320);
};
dojo.provide("dojo.uri.Uri");
dojo.uri=new function(){
this.joinPath=function(){
var arr=[];
for(var i=0;i<arguments.length;i++){
arr.push(arguments[i]);
}
return arr.join("/").replace(/\/{2,}/g,"/").replace(/((https*|ftps*):)/i,"$1/");
};
this.dojoUri=function(uri){
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri(),uri);
};
this.Uri=function(){
var uri=arguments[0];
for(var i=1;i<arguments.length;i++){
if(!arguments[i]){
continue;
}
var _326=new dojo.uri.Uri(arguments[i].toString());
var _327=new dojo.uri.Uri(uri.toString());
if(_326.path==""&&_326.scheme==null&&_326.authority==null&&_326.query==null){
if(_326.fragment!=null){
_327.fragment=_326.fragment;
}
_326=_327;
}else{
if(_326.scheme==null){
_326.scheme=_327.scheme;
if(_326.authority==null){
_326.authority=_327.authority;
if(_326.path.charAt(0)!="/"){
var path=_327.path.substring(0,_327.path.lastIndexOf("/")+1)+_326.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==segs.length-1){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_326.path=segs.join("/");
}
}
}
}
uri="";
if(_326.scheme!=null){
uri+=_326.scheme+":";
}
if(_326.authority!=null){
uri+="//"+_326.authority;
}
uri+=_326.path;
if(_326.query!=null){
uri+="?"+_326.query;
}
if(_326.fragment!=null){
uri+="#"+_326.fragment;
}
}
this.uri=uri.toString();
var _32b="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var r=this.uri.match(new RegExp(_32b));
this.scheme=r[2]||(r[1]?"":null);
this.authority=r[4]||(r[3]?"":null);
this.path=r[5];
this.query=r[7]||(r[6]?"":null);
this.fragment=r[9]||(r[8]?"":null);
if(this.authority!=null){
_32b="^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$";
r=this.authority.match(new RegExp(_32b));
this.user=r[3]||null;
this.password=r[4]||null;
this.host=r[5];
this.port=r[7]||null;
}
this.toString=function(){
return this.uri;
};
};
};
dojo.kwCompoundRequire({common:["dojo.uri.Uri",false,false]});
dojo.provide("dojo.uri.*");
dojo.provide("dojo.widget.DomWidget");
dojo.require("dojo.event.*");
dojo.require("dojo.widget.Widget");
dojo.require("dojo.dom");
dojo.require("dojo.xml.Parse");
dojo.require("dojo.uri.*");
dojo.require("dojo.lang.func");
dojo.require("dojo.lang.extras");
dojo.widget._cssFiles={};
dojo.widget._cssStrings={};
dojo.widget._templateCache={};
dojo.widget.defaultStrings={dojoRoot:dojo.hostenv.getBaseScriptUri(),baseScriptUri:dojo.hostenv.getBaseScriptUri()};
dojo.widget.buildFromTemplate=function(){
dojo.lang.forward("fillFromTemplateCache");
};
dojo.widget.fillFromTemplateCache=function(obj,_32e,_32f,_330,_331){
var _332=_32e||obj.templatePath;
var _333=_32f||obj.templateCssPath;
if(_332&&!(_332 instanceof dojo.uri.Uri)){
_332=dojo.uri.dojoUri(_332);
dojo.deprecated("templatePath should be of type dojo.uri.Uri",null,"0.4");
}
if(_333&&!(_333 instanceof dojo.uri.Uri)){
_333=dojo.uri.dojoUri(_333);
dojo.deprecated("templateCssPath should be of type dojo.uri.Uri",null,"0.4");
}
var _334=dojo.widget._templateCache;
if(!obj["widgetType"]){
do{
var _335="__dummyTemplate__"+dojo.widget._templateCache.dummyCount++;
}while(_334[_335]);
obj.widgetType=_335;
}
var wt=obj.widgetType;
if(_333&&!dojo.widget._cssFiles[_333.toString()]){
if((!obj.templateCssString)&&(_333)){
obj.templateCssString=dojo.hostenv.getText(_333);
obj.templateCssPath=null;
}
if((obj["templateCssString"])&&(!obj.templateCssString["loaded"])){
dojo.style.insertCssText(obj.templateCssString,null,_333);
if(!obj.templateCssString){
obj.templateCssString="";
}
obj.templateCssString.loaded=true;
}
dojo.widget._cssFiles[_333.toString()]=true;
}
var ts=_334[wt];
if(!ts){
_334[wt]={"string":null,"node":null};
if(_331){
ts={};
}else{
ts=_334[wt];
}
}
if((!obj.templateString)&&(!_331)){
obj.templateString=_330||ts["string"];
}
if((!obj.templateNode)&&(!_331)){
obj.templateNode=ts["node"];
}
if((!obj.templateNode)&&(!obj.templateString)&&(_332)){
var _338=dojo.hostenv.getText(_332);
if(_338){
_338=_338.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _339=_338.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_339){
_338=_339[1];
}
}else{
_338="";
}
obj.templateString=_338;
if(!_331){
_334[wt]["string"]=_338;
}
}
if((!ts["string"])&&(!_331)){
ts.string=obj.templateString;
}
};
dojo.widget._templateCache.dummyCount=0;
dojo.widget.attachProperties=["dojoAttachPoint","id"];
dojo.widget.eventAttachProperty="dojoAttachEvent";
dojo.widget.onBuildProperty="dojoOnBuild";
dojo.widget.waiNames=["waiRole","waiState"];
dojo.widget.wai={waiRole:{name:"waiRole",namespace:"http://www.w3.org/TR/xhtml2",alias:"x2",prefix:"wairole:",nsName:"role"},waiState:{name:"waiState",namespace:"http://www.w3.org/2005/07/aaa",alias:"aaa",prefix:"",nsName:"state"},setAttr:function(node,attr,_33c){
if(dojo.render.html.ie){
node.setAttribute(this[attr].alias+":"+this[attr].nsName,this[attr].prefix+_33c);
}else{
node.setAttributeNS(this[attr].namespace,this[attr].nsName,this[attr].prefix+_33c);
}
}};
dojo.widget.attachTemplateNodes=function(_33d,_33e,_33f){
var _340=dojo.dom.ELEMENT_NODE;
function trim(str){
return str.replace(/^\s+|\s+$/g,"");
}
if(!_33d){
_33d=_33e.domNode;
}
if(_33d.nodeType!=_340){
return;
}
var _342=_33d.all||_33d.getElementsByTagName("*");
var _343=_33e;
for(var x=-1;x<_342.length;x++){
var _345=(x==-1)?_33d:_342[x];
var _346=[];
for(var y=0;y<this.attachProperties.length;y++){
var _348=_345.getAttribute(this.attachProperties[y]);
if(_348){
_346=_348.split(";");
for(var z=0;z<_346.length;z++){
if(dojo.lang.isArray(_33e[_346[z]])){
_33e[_346[z]].push(_345);
}else{
_33e[_346[z]]=_345;
}
}
break;
}
}
var _34a=_345.getAttribute(this.templateProperty);
if(_34a){
_33e[_34a]=_345;
}
dojo.lang.forEach(dojo.widget.waiNames,function(name){
var wai=dojo.widget.wai[name];
var val=_345.getAttribute(wai.name);
if(val){
dojo.widget.wai.setAttr(_345,wai.name,val);
}
},this);
var _34e=_345.getAttribute(this.eventAttachProperty);
if(_34e){
var evts=_34e.split(";");
for(var y=0;y<evts.length;y++){
if((!evts[y])||(!evts[y].length)){
continue;
}
var _350=null;
var tevt=trim(evts[y]);
if(evts[y].indexOf(":")>=0){
var _352=tevt.split(":");
tevt=trim(_352[0]);
_350=trim(_352[1]);
}
if(!_350){
_350=tevt;
}
var tf=function(){
var ntf=new String(_350);
return function(evt){
if(_343[ntf]){
_343[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_345,tevt,tf,false,true);
}
}
for(var y=0;y<_33f.length;y++){
var _356=_345.getAttribute(_33f[y]);
if((_356)&&(_356.length)){
var _350=null;
var _357=_33f[y].substr(4);
_350=trim(_356);
var _358=[_350];
if(_350.indexOf(";")>=0){
_358=dojo.lang.map(_350.split(";"),trim);
}
for(var z=0;z<_358.length;z++){
if(!_358[z].length){
continue;
}
var tf=function(){
var ntf=new String(_358[z]);
return function(evt){
if(_343[ntf]){
_343[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_345,_357,tf,false,true);
}
}
}
var _35b=_345.getAttribute(this.onBuildProperty);
if(_35b){
eval("var node = baseNode; var widget = targetObj; "+_35b);
}
}
};
dojo.widget.getDojoEventsFromStr=function(str){
var re=/(dojoOn([a-z]+)(\s?))=/gi;
var evts=str?str.match(re)||[]:[];
var ret=[];
var lem={};
for(var x=0;x<evts.length;x++){
if(evts[x].legth<1){
continue;
}
var cm=evts[x].replace(/\s/,"");
cm=(cm.slice(0,cm.length-1));
if(!lem[cm]){
lem[cm]=true;
ret.push(cm);
}
}
return ret;
};
dojo.declare("dojo.widget.DomWidget",dojo.widget.Widget,{initializer:function(){
if((arguments.length>0)&&(typeof arguments[0]=="object")){
this.create(arguments[0]);
}
},templateNode:null,templateString:null,templateCssString:null,preventClobber:false,domNode:null,containerNode:null,addChild:function(_363,_364,pos,ref,_367){
if(!this.isContainer){
dojo.debug("dojo.widget.DomWidget.addChild() attempted on non-container widget");
return null;
}else{
this.addWidgetAsDirectChild(_363,_364,pos,ref,_367);
this.registerChild(_363,_367);
}
return _363;
},addWidgetAsDirectChild:function(_368,_369,pos,ref,_36c){
if((!this.containerNode)&&(!_369)){
this.containerNode=this.domNode;
}
var cn=(_369)?_369:this.containerNode;
if(!pos){
pos="after";
}
if(!ref){
if(!cn){
cn=document.body;
}
ref=cn.lastChild;
}
if(!_36c){
_36c=0;
}
_368.domNode.setAttribute("dojoinsertionindex",_36c);
if(!ref){
cn.appendChild(_368.domNode);
}else{
if(pos=="insertAtIndex"){
dojo.dom.insertAtIndex(_368.domNode,ref.parentNode,_36c);
}else{
if((pos=="after")&&(ref===cn.lastChild)){
cn.appendChild(_368.domNode);
}else{
dojo.dom.insertAtPosition(_368.domNode,cn,pos);
}
}
}
},registerChild:function(_36e,_36f){
_36e.dojoInsertionIndex=_36f;
var idx=-1;
for(var i=0;i<this.children.length;i++){
if(this.children[i].dojoInsertionIndex<_36f){
idx=i;
}
}
this.children.splice(idx+1,0,_36e);
_36e.parent=this;
_36e.addedTo(this);
delete dojo.widget.manager.topWidgets[_36e.widgetId];
},removeChild:function(_372){
dojo.dom.removeNode(_372.domNode);
return dojo.widget.DomWidget.superclass.removeChild.call(this,_372);
},getFragNodeRef:function(frag){
if(!frag||!frag["dojo:"+this.widgetType.toLowerCase()]){
dojo.raise("Error: no frag for widget type "+this.widgetType+", id "+this.widgetId+" (maybe a widget has set it's type incorrectly)");
}
return (frag?frag["dojo:"+this.widgetType.toLowerCase()]["nodeRef"]:null);
},postInitialize:function(args,frag,_376){
var _377=this.getFragNodeRef(frag);
if(_376&&(_376.snarfChildDomOutput||!_377)){
_376.addWidgetAsDirectChild(this,"","insertAtIndex","",args["dojoinsertionindex"],_377);
}else{
if(_377){
if(this.domNode&&(this.domNode!==_377)){
var _378=_377.parentNode.replaceChild(this.domNode,_377);
}
}
}
if(_376){
_376.registerChild(this,args.dojoinsertionindex);
}else{
dojo.widget.manager.topWidgets[this.widgetId]=this;
}
if(this.isContainer){
var _379=dojo.widget.getParser();
_379.createSubComponents(frag,this);
}
},buildRendering:function(args,frag){
var ts=dojo.widget._templateCache[this.widgetType];
if((!this.preventClobber)&&((this.templatePath)||(this.templateNode)||((this["templateString"])&&(this.templateString.length))||((typeof ts!="undefined")&&((ts["string"])||(ts["node"]))))){
this.buildFromTemplate(args,frag);
}else{
this.domNode=this.getFragNodeRef(frag);
}
this.fillInTemplate(args,frag);
},buildFromTemplate:function(args,frag){
var _37f=false;
if(args["templatecsspath"]){
args["templateCssPath"]=args["templatecsspath"];
}
if(args["templatepath"]){
_37f=true;
args["templatePath"]=args["templatepath"];
}
dojo.widget.fillFromTemplateCache(this,args["templatePath"],args["templateCssPath"],null,_37f);
var ts=dojo.widget._templateCache[this.widgetType];
if((ts)&&(!_37f)){
if(!this.templateString.length){
this.templateString=ts["string"];
}
if(!this.templateNode){
this.templateNode=ts["node"];
}
}
var _381=false;
var node=null;
var tstr=this.templateString;
if((!this.templateNode)&&(this.templateString)){
_381=this.templateString.match(/\$\{([^\}]+)\}/g);
if(_381){
var hash=this.strings||{};
for(var key in dojo.widget.defaultStrings){
if(dojo.lang.isUndefined(hash[key])){
hash[key]=dojo.widget.defaultStrings[key];
}
}
for(var i=0;i<_381.length;i++){
var key=_381[i];
key=key.substring(2,key.length-1);
var kval=(key.substring(0,5)=="this.")?dojo.lang.getObjPathValue(key.substring(5),this):hash[key];
var _388;
if((kval)||(dojo.lang.isString(kval))){
_388=(dojo.lang.isFunction(kval))?kval.call(this,key,this.templateString):kval;
tstr=tstr.replace(_381[i],_388);
}
}
}else{
this.templateNode=this.createNodesFromText(this.templateString,true)[0];
if(!_37f){
ts.node=this.templateNode;
}
}
}
if((!this.templateNode)&&(!_381)){
dojo.debug("weren't able to create template!");
return false;
}else{
if(!_381){
node=this.templateNode.cloneNode(true);
if(!node){
return false;
}
}else{
node=this.createNodesFromText(tstr,true)[0];
}
}
this.domNode=node;
this.attachTemplateNodes(this.domNode,this);
if(this.isContainer&&this.containerNode){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,this.containerNode);
}
}
},attachTemplateNodes:function(_38a,_38b){
if(!_38b){
_38b=this;
}
return dojo.widget.attachTemplateNodes(_38a,_38b,dojo.widget.getDojoEventsFromStr(this.templateString));
},fillInTemplate:function(){
},destroyRendering:function(){
try{
delete this.domNode;
}
catch(e){
}
},cleanUp:function(){
},getContainerHeight:function(){
dojo.unimplemented("dojo.widget.DomWidget.getContainerHeight");
},getContainerWidth:function(){
dojo.unimplemented("dojo.widget.DomWidget.getContainerWidth");
},createNodesFromText:function(){
dojo.unimplemented("dojo.widget.DomWidget.createNodesFromText");
}});
dojo.provide("dojo.graphics.color");
dojo.require("dojo.lang.array");
dojo.graphics.color.Color=function(r,g,b,a){
if(dojo.lang.isArray(r)){
this.r=r[0];
this.g=r[1];
this.b=r[2];
this.a=r[3]||1;
}else{
if(dojo.lang.isString(r)){
var rgb=dojo.graphics.color.extractRGB(r);
this.r=rgb[0];
this.g=rgb[1];
this.b=rgb[2];
this.a=g||1;
}else{
if(r instanceof dojo.graphics.color.Color){
this.r=r.r;
this.b=r.b;
this.g=r.g;
this.a=r.a;
}else{
this.r=r;
this.g=g;
this.b=b;
this.a=a;
}
}
}
};
dojo.graphics.color.Color.fromArray=function(arr){
return new dojo.graphics.color.Color(arr[0],arr[1],arr[2],arr[3]);
};
dojo.lang.extend(dojo.graphics.color.Color,{toRgb:function(_392){
if(_392){
return this.toRgba();
}else{
return [this.r,this.g,this.b];
}
},toRgba:function(){
return [this.r,this.g,this.b,this.a];
},toHex:function(){
return dojo.graphics.color.rgb2hex(this.toRgb());
},toCss:function(){
return "rgb("+this.toRgb().join()+")";
},toString:function(){
return this.toHex();
},blend:function(_393,_394){
return dojo.graphics.color.blend(this.toRgb(),new dojo.graphics.color.Color(_393).toRgb(),_394);
}});
dojo.graphics.color.named={white:[255,255,255],black:[0,0,0],red:[255,0,0],green:[0,255,0],blue:[0,0,255],navy:[0,0,128],gray:[128,128,128],silver:[192,192,192]};
dojo.graphics.color.blend=function(a,b,_397){
if(typeof a=="string"){
return dojo.graphics.color.blendHex(a,b,_397);
}
if(!_397){
_397=0;
}else{
if(_397>1){
_397=1;
}else{
if(_397<-1){
_397=-1;
}
}
}
var c=new Array(3);
for(var i=0;i<3;i++){
var half=Math.abs(a[i]-b[i])/2;
c[i]=Math.floor(Math.min(a[i],b[i])+half+(half*_397));
}
return c;
};
dojo.graphics.color.blendHex=function(a,b,_39d){
return dojo.graphics.color.rgb2hex(dojo.graphics.color.blend(dojo.graphics.color.hex2rgb(a),dojo.graphics.color.hex2rgb(b),_39d));
};
dojo.graphics.color.extractRGB=function(_39e){
var hex="0123456789abcdef";
_39e=_39e.toLowerCase();
if(_39e.indexOf("rgb")==0){
var _3a0=_39e.match(/rgba*\((\d+), *(\d+), *(\d+)/i);
var ret=_3a0.splice(1,3);
return ret;
}else{
var _3a2=dojo.graphics.color.hex2rgb(_39e);
if(_3a2){
return _3a2;
}else{
return dojo.graphics.color.named[_39e]||[255,255,255];
}
}
};
dojo.graphics.color.hex2rgb=function(hex){
var _3a4="0123456789ABCDEF";
var rgb=new Array(3);
if(hex.indexOf("#")==0){
hex=hex.substring(1);
}
hex=hex.toUpperCase();
if(hex.replace(new RegExp("["+_3a4+"]","g"),"")!=""){
return null;
}
if(hex.length==3){
rgb[0]=hex.charAt(0)+hex.charAt(0);
rgb[1]=hex.charAt(1)+hex.charAt(1);
rgb[2]=hex.charAt(2)+hex.charAt(2);
}else{
rgb[0]=hex.substring(0,2);
rgb[1]=hex.substring(2,4);
rgb[2]=hex.substring(4);
}
for(var i=0;i<rgb.length;i++){
rgb[i]=_3a4.indexOf(rgb[i].charAt(0))*16+_3a4.indexOf(rgb[i].charAt(1));
}
return rgb;
};
dojo.graphics.color.rgb2hex=function(r,g,b){
if(dojo.lang.isArray(r)){
g=r[1]||0;
b=r[2]||0;
r=r[0]||0;
}
var ret=dojo.lang.map([r,g,b],function(x){
x=new Number(x);
var s=x.toString(16);
while(s.length<2){
s="0"+s;
}
return s;
});
ret.unshift("#");
return ret.join("");
};
dojo.provide("dojo.style");
dojo.require("dojo.graphics.color");
dojo.require("dojo.uri.Uri");
dojo.require("dojo.lang.common");
(function(){
var h=dojo.render.html;
var ds=dojo.style;
var db=document["body"]||document["documentElement"];
ds.boxSizing={MARGIN_BOX:"margin-box",BORDER_BOX:"border-box",PADDING_BOX:"padding-box",CONTENT_BOX:"content-box"};
var bs=ds.boxSizing;
ds.getBoxSizing=function(node){
if((h.ie)||(h.opera)){
var cm=document["compatMode"];
if((cm=="BackCompat")||(cm=="QuirksMode")){
return bs.BORDER_BOX;
}else{
return bs.CONTENT_BOX;
}
}else{
if(arguments.length==0){
node=document.documentElement;
}
var _3b3=ds.getStyle(node,"-moz-box-sizing");
if(!_3b3){
_3b3=ds.getStyle(node,"box-sizing");
}
return (_3b3?_3b3:bs.CONTENT_BOX);
}
};
ds.isBorderBox=function(node){
return (ds.getBoxSizing(node)==bs.BORDER_BOX);
};
ds.getUnitValue=function(node,_3b6,_3b7){
var s=ds.getComputedStyle(node,_3b6);
if((!s)||((s=="auto")&&(_3b7))){
return {value:0,units:"px"};
}
if(dojo.lang.isUndefined(s)){
return ds.getUnitValue.bad;
}
var _3b9=s.match(/(\-?[\d.]+)([a-z%]*)/i);
if(!_3b9){
return ds.getUnitValue.bad;
}
return {value:Number(_3b9[1]),units:_3b9[2].toLowerCase()};
};
ds.getUnitValue.bad={value:NaN,units:""};
ds.getPixelValue=function(node,_3bb,_3bc){
var _3bd=ds.getUnitValue(node,_3bb,_3bc);
if(isNaN(_3bd.value)){
return 0;
}
if((_3bd.value)&&(_3bd.units!="px")){
return NaN;
}
return _3bd.value;
};
ds.getNumericStyle=function(){
dojo.deprecated("dojo.(style|html).getNumericStyle","in favor of dojo.(style|html).getPixelValue","0.4");
return ds.getPixelValue.apply(this,arguments);
};
ds.setPositivePixelValue=function(node,_3bf,_3c0){
if(isNaN(_3c0)){
return false;
}
node.style[_3bf]=Math.max(0,_3c0)+"px";
return true;
};
ds._sumPixelValues=function(node,_3c2,_3c3){
var _3c4=0;
for(var x=0;x<_3c2.length;x++){
_3c4+=ds.getPixelValue(node,_3c2[x],_3c3);
}
return _3c4;
};
ds.isPositionAbsolute=function(node){
return (ds.getComputedStyle(node,"position")=="absolute");
};
ds.getBorderExtent=function(node,side){
return (ds.getStyle(node,"border-"+side+"-style")=="none"?0:ds.getPixelValue(node,"border-"+side+"-width"));
};
ds.getMarginWidth=function(node){
return ds._sumPixelValues(node,["margin-left","margin-right"],ds.isPositionAbsolute(node));
};
ds.getBorderWidth=function(node){
return ds.getBorderExtent(node,"left")+ds.getBorderExtent(node,"right");
};
ds.getPaddingWidth=function(node){
return ds._sumPixelValues(node,["padding-left","padding-right"],true);
};
ds.getPadBorderWidth=function(node){
return ds.getPaddingWidth(node)+ds.getBorderWidth(node);
};
ds.getContentBoxWidth=function(node){
node=dojo.byId(node);
return node.offsetWidth-ds.getPadBorderWidth(node);
};
ds.getBorderBoxWidth=function(node){
node=dojo.byId(node);
return node.offsetWidth;
};
ds.getMarginBoxWidth=function(node){
return ds.getInnerWidth(node)+ds.getMarginWidth(node);
};
ds.setContentBoxWidth=function(node,_3d1){
node=dojo.byId(node);
if(ds.isBorderBox(node)){
_3d1+=ds.getPadBorderWidth(node);
}
return ds.setPositivePixelValue(node,"width",_3d1);
};
ds.setMarginBoxWidth=function(node,_3d3){
node=dojo.byId(node);
if(!ds.isBorderBox(node)){
_3d3-=ds.getPadBorderWidth(node);
}
_3d3-=ds.getMarginWidth(node);
return ds.setPositivePixelValue(node,"width",_3d3);
};
ds.getContentWidth=ds.getContentBoxWidth;
ds.getInnerWidth=ds.getBorderBoxWidth;
ds.getOuterWidth=ds.getMarginBoxWidth;
ds.setContentWidth=ds.setContentBoxWidth;
ds.setOuterWidth=ds.setMarginBoxWidth;
ds.getMarginHeight=function(node){
return ds._sumPixelValues(node,["margin-top","margin-bottom"],ds.isPositionAbsolute(node));
};
ds.getBorderHeight=function(node){
return ds.getBorderExtent(node,"top")+ds.getBorderExtent(node,"bottom");
};
ds.getPaddingHeight=function(node){
return ds._sumPixelValues(node,["padding-top","padding-bottom"],true);
};
ds.getPadBorderHeight=function(node){
return ds.getPaddingHeight(node)+ds.getBorderHeight(node);
};
ds.getContentBoxHeight=function(node){
node=dojo.byId(node);
return node.offsetHeight-ds.getPadBorderHeight(node);
};
ds.getBorderBoxHeight=function(node){
node=dojo.byId(node);
return node.offsetHeight;
};
ds.getMarginBoxHeight=function(node){
return ds.getInnerHeight(node)+ds.getMarginHeight(node);
};
ds.setContentBoxHeight=function(node,_3dc){
node=dojo.byId(node);
if(ds.isBorderBox(node)){
_3dc+=ds.getPadBorderHeight(node);
}
return ds.setPositivePixelValue(node,"height",_3dc);
};
ds.setMarginBoxHeight=function(node,_3de){
node=dojo.byId(node);
if(!ds.isBorderBox(node)){
_3de-=ds.getPadBorderHeight(node);
}
_3de-=ds.getMarginHeight(node);
return ds.setPositivePixelValue(node,"height",_3de);
};
ds.getContentHeight=ds.getContentBoxHeight;
ds.getInnerHeight=ds.getBorderBoxHeight;
ds.getOuterHeight=ds.getMarginBoxHeight;
ds.setContentHeight=ds.setContentBoxHeight;
ds.setOuterHeight=ds.setMarginBoxHeight;
ds.getAbsolutePosition=ds.abs=function(node,_3e0){
node=dojo.byId(node);
var ret=[];
ret.x=ret.y=0;
var st=dojo.html.getScrollTop();
var sl=dojo.html.getScrollLeft();
if(h.ie){
with(node.getBoundingClientRect()){
ret.x=left-2;
ret.y=top-2;
}
}else{
if(document.getBoxObjectFor){
var bo=document.getBoxObjectFor(node);
ret.x=bo.x-ds.sumAncestorProperties(node,"scrollLeft");
ret.y=bo.y-ds.sumAncestorProperties(node,"scrollTop");
}else{
if(node["offsetParent"]){
var _3e5;
if((h.safari)&&(node.style.getPropertyValue("position")=="absolute")&&(node.parentNode==db)){
_3e5=db;
}else{
_3e5=db.parentNode;
}
if(node.parentNode!=db){
var nd=node;
if(window.opera){
nd=db;
}
ret.x-=ds.sumAncestorProperties(nd,"scrollLeft");
ret.y-=ds.sumAncestorProperties(nd,"scrollTop");
}
do{
var n=node["offsetLeft"];
ret.x+=isNaN(n)?0:n;
var m=node["offsetTop"];
ret.y+=isNaN(m)?0:m;
node=node.offsetParent;
}while((node!=_3e5)&&(node!=null));
}else{
if(node["x"]&&node["y"]){
ret.x+=isNaN(node.x)?0:node.x;
ret.y+=isNaN(node.y)?0:node.y;
}
}
}
}
if(_3e0){
ret.y+=st;
ret.x+=sl;
}
ret[0]=ret.x;
ret[1]=ret.y;
return ret;
};
ds.sumAncestorProperties=function(node,prop){
node=dojo.byId(node);
if(!node){
return 0;
}
var _3eb=0;
while(node){
var val=node[prop];
if(val){
_3eb+=val-0;
if(node==document.body){
break;
}
}
node=node.parentNode;
}
return _3eb;
};
ds.getTotalOffset=function(node,type,_3ef){
return ds.abs(node,_3ef)[(type=="top")?"y":"x"];
};
ds.getAbsoluteX=ds.totalOffsetLeft=function(node,_3f1){
return ds.getTotalOffset(node,"left",_3f1);
};
ds.getAbsoluteY=ds.totalOffsetTop=function(node,_3f3){
return ds.getTotalOffset(node,"top",_3f3);
};
ds.styleSheet=null;
ds.insertCssRule=function(_3f4,_3f5,_3f6){
if(!ds.styleSheet){
if(document.createStyleSheet){
ds.styleSheet=document.createStyleSheet();
}else{
if(document.styleSheets[0]){
ds.styleSheet=document.styleSheets[0];
}else{
return null;
}
}
}
if(arguments.length<3){
if(ds.styleSheet.cssRules){
_3f6=ds.styleSheet.cssRules.length;
}else{
if(ds.styleSheet.rules){
_3f6=ds.styleSheet.rules.length;
}else{
return null;
}
}
}
if(ds.styleSheet.insertRule){
var rule=_3f4+" { "+_3f5+" }";
return ds.styleSheet.insertRule(rule,_3f6);
}else{
if(ds.styleSheet.addRule){
return ds.styleSheet.addRule(_3f4,_3f5,_3f6);
}else{
return null;
}
}
};
ds.removeCssRule=function(_3f8){
if(!ds.styleSheet){
dojo.debug("no stylesheet defined for removing rules");
return false;
}
if(h.ie){
if(!_3f8){
_3f8=ds.styleSheet.rules.length;
ds.styleSheet.removeRule(_3f8);
}
}else{
if(document.styleSheets[0]){
if(!_3f8){
_3f8=ds.styleSheet.cssRules.length;
}
ds.styleSheet.deleteRule(_3f8);
}
}
return true;
};
ds.insertCssFile=function(URI,doc,_3fb){
if(!URI){
return;
}
if(!doc){
doc=document;
}
var _3fc=dojo.hostenv.getText(URI);
_3fc=ds.fixPathsInCssText(_3fc,URI);
if(_3fb){
var _3fd=doc.getElementsByTagName("style");
var _3fe="";
for(var i=0;i<_3fd.length;i++){
_3fe=(_3fd[i].styleSheet&&_3fd[i].styleSheet.cssText)?_3fd[i].styleSheet.cssText:_3fd[i].innerHTML;
if(_3fc==_3fe){
return;
}
}
}
var _400=ds.insertCssText(_3fc);
if(_400&&djConfig.isDebug){
_400.setAttribute("dbgHref",URI);
}
return _400;
};
ds.insertCssText=function(_401,doc,URI){
if(!_401){
return;
}
if(!doc){
doc=document;
}
if(URI){
_401=ds.fixPathsInCssText(_401,URI);
}
var _404=doc.createElement("style");
_404.setAttribute("type","text/css");
var head=doc.getElementsByTagName("head")[0];
if(!head){
dojo.debug("No head tag in document, aborting styles");
return;
}else{
head.appendChild(_404);
}
if(_404.styleSheet){
_404.styleSheet.cssText=_401;
}else{
var _406=doc.createTextNode(_401);
_404.appendChild(_406);
}
return _404;
};
ds.fixPathsInCssText=function(_407,URI){
if(!_407||!URI){
return;
}
var pos=0;
var str="";
var url="";
while(pos!=-1){
pos=0;
url="";
pos=_407.indexOf("url(",pos);
if(pos<0){
break;
}
str+=_407.slice(0,pos+4);
_407=_407.substring(pos+4,_407.length);
url+=_407.match(/^[\t\s\w()\/.\\'"-:#=&?]*\)/)[0];
_407=_407.substring(url.length-1,_407.length);
url=url.replace(/^[\s\t]*(['"]?)([\w()\/.\\'"-:#=&?]*)\1[\s\t]*?\)/,"$2");
if(url.search(/(file|https?|ftps?):\/\//)==-1){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=url;
}
return str+_407;
};
ds.getBackgroundColor=function(node){
node=dojo.byId(node);
var _40d;
do{
_40d=ds.getStyle(node,"background-color");
if(_40d.toLowerCase()=="rgba(0, 0, 0, 0)"){
_40d="transparent";
}
if(node==document.getElementsByTagName("body")[0]){
node=null;
break;
}
node=node.parentNode;
}while(node&&dojo.lang.inArray(_40d,["transparent",""]));
if(_40d=="transparent"){
_40d=[255,255,255,0];
}else{
_40d=dojo.graphics.color.extractRGB(_40d);
}
return _40d;
};
ds.getComputedStyle=function(node,_40f,_410){
node=dojo.byId(node);
var _40f=ds.toSelectorCase(_40f);
var _411=ds.toCamelCase(_40f);
if(!node||!node.style){
return _410;
}else{
if(document.defaultView){
try{
var cs=document.defaultView.getComputedStyle(node,"");
if(cs){
return cs.getPropertyValue(_40f);
}
}
catch(e){
if(node.style.getPropertyValue){
return node.style.getPropertyValue(_40f);
}else{
return _410;
}
}
}else{
if(node.currentStyle){
return node.currentStyle[_411];
}
}
}
if(node.style.getPropertyValue){
return node.style.getPropertyValue(_40f);
}else{
return _410;
}
};
ds.getStyleProperty=function(node,_414){
node=dojo.byId(node);
return (node&&node.style?node.style[ds.toCamelCase(_414)]:undefined);
};
ds.getStyle=function(node,_416){
var _417=ds.getStyleProperty(node,_416);
return (_417?_417:ds.getComputedStyle(node,_416));
};
ds.setStyle=function(node,_419,_41a){
node=dojo.byId(node);
if(node&&node.style){
var _41b=ds.toCamelCase(_419);
node.style[_41b]=_41a;
}
};
ds.toCamelCase=function(_41c){
var arr=_41c.split("-"),cc=arr[0];
for(var i=1;i<arr.length;i++){
cc+=arr[i].charAt(0).toUpperCase()+arr[i].substring(1);
}
return cc;
};
ds.toSelectorCase=function(_41f){
return _41f.replace(/([A-Z])/g,"-$1").toLowerCase();
};
ds.setOpacity=function setOpacity(node,_421,_422){
node=dojo.byId(node);
if(!_422){
if(_421>=1){
if(h.ie){
ds.clearOpacity(node);
return;
}else{
_421=0.999999;
}
}else{
if(_421<0){
_421=0;
}
}
}
if(h.ie){
if(node.nodeName.toLowerCase()=="tr"){
var tds=node.getElementsByTagName("td");
for(var x=0;x<tds.length;x++){
tds[x].style.filter="Alpha(Opacity="+_421*100+")";
}
}
node.style.filter="Alpha(Opacity="+_421*100+")";
}else{
if(h.moz){
node.style.opacity=_421;
node.style.MozOpacity=_421;
}else{
if(h.safari){
node.style.opacity=_421;
node.style.KhtmlOpacity=_421;
}else{
node.style.opacity=_421;
}
}
}
};
ds.getOpacity=function getOpacity(node){
node=dojo.byId(node);
if(h.ie){
var opac=(node.filters&&node.filters.alpha&&typeof node.filters.alpha.opacity=="number"?node.filters.alpha.opacity:100)/100;
}else{
var opac=node.style.opacity||node.style.MozOpacity||node.style.KhtmlOpacity||1;
}
return opac>=0.999999?1:Number(opac);
};
ds.clearOpacity=function clearOpacity(node){
node=dojo.byId(node);
var ns=node.style;
if(h.ie){
try{
if(node.filters&&node.filters.alpha){
ns.filter="";
}
}
catch(e){
}
}else{
if(h.moz){
ns.opacity=1;
ns.MozOpacity=1;
}else{
if(h.safari){
ns.opacity=1;
ns.KhtmlOpacity=1;
}else{
ns.opacity=1;
}
}
}
};
ds.setStyleAttributes=function(node,_42a){
var _42b={"opacity":dojo.style.setOpacity,"content-height":dojo.style.setContentHeight,"content-width":dojo.style.setContentWidth,"outer-height":dojo.style.setOuterHeight,"outer-width":dojo.style.setOuterWidth};
var _42c=_42a.replace(/(;)?\s*$/,"").split(";");
for(var i=0;i<_42c.length;i++){
var _42e=_42c[i].split(":");
var name=_42e[0].replace(/\s*$/,"").replace(/^\s*/,"").toLowerCase();
var _430=_42e[1].replace(/\s*$/,"").replace(/^\s*/,"");
if(dojo.lang.has(_42b,name)){
_42b[name](node,_430);
}else{
node.style[dojo.style.toCamelCase(name)]=_430;
}
}
};
ds._toggle=function(node,_432,_433){
node=dojo.byId(node);
_433(node,!_432(node));
return _432(node);
};
ds.show=function(node){
node=dojo.byId(node);
if(ds.getStyleProperty(node,"display")=="none"){
ds.setStyle(node,"display",(node.dojoDisplayCache||""));
node.dojoDisplayCache=undefined;
}
};
ds.hide=function(node){
node=dojo.byId(node);
if(typeof node["dojoDisplayCache"]=="undefined"){
var d=ds.getStyleProperty(node,"display");
if(d!="none"){
node.dojoDisplayCache=d;
}
}
ds.setStyle(node,"display","none");
};
ds.setShowing=function(node,_438){
ds[(_438?"show":"hide")](node);
};
ds.isShowing=function(node){
return (ds.getStyleProperty(node,"display")!="none");
};
ds.toggleShowing=function(node){
return ds._toggle(node,ds.isShowing,ds.setShowing);
};
ds.displayMap={tr:"",td:"",th:"",img:"inline",span:"inline",input:"inline",button:"inline"};
ds.suggestDisplayByTagName=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
var tag=node.tagName.toLowerCase();
return (tag in ds.displayMap?ds.displayMap[tag]:"block");
}
};
ds.setDisplay=function(node,_43e){
ds.setStyle(node,"display",(dojo.lang.isString(_43e)?_43e:(_43e?ds.suggestDisplayByTagName(node):"none")));
};
ds.isDisplayed=function(node){
return (ds.getComputedStyle(node,"display")!="none");
};
ds.toggleDisplay=function(node){
return ds._toggle(node,ds.isDisplayed,ds.setDisplay);
};
ds.setVisibility=function(node,_442){
ds.setStyle(node,"visibility",(dojo.lang.isString(_442)?_442:(_442?"visible":"hidden")));
};
ds.isVisible=function(node){
return (ds.getComputedStyle(node,"visibility")!="hidden");
};
ds.toggleVisibility=function(node){
return ds._toggle(node,ds.isVisible,ds.setVisibility);
};
ds.toCoordinateArray=function(_445,_446){
if(dojo.lang.isArray(_445)){
while(_445.length<4){
_445.push(0);
}
while(_445.length>4){
_445.pop();
}
var ret=_445;
}else{
var node=dojo.byId(_445);
var pos=ds.getAbsolutePosition(node,_446);
var ret=[pos.x,pos.y,ds.getBorderBoxWidth(node),ds.getBorderBoxHeight(node)];
}
ret.x=ret[0];
ret.y=ret[1];
ret.w=ret[2];
ret.h=ret[3];
return ret;
};
})();
dojo.provide("dojo.string.common");
dojo.require("dojo.string");
dojo.string.trim=function(str,wh){
if(!str.replace){
return str;
}
if(!str.length){
return str;
}
var re=(wh>0)?(/^\s+/):(wh<0)?(/\s+$/):(/^\s+|\s+$/g);
return str.replace(re,"");
};
dojo.string.trimStart=function(str){
return dojo.string.trim(str,1);
};
dojo.string.trimEnd=function(str){
return dojo.string.trim(str,-1);
};
dojo.string.repeat=function(str,_450,_451){
var out="";
for(var i=0;i<_450;i++){
out+=str;
if(_451&&i<_450-1){
out+=_451;
}
}
return out;
};
dojo.string.pad=function(str,len,c,dir){
var out=String(str);
if(!c){
c="0";
}
if(!dir){
dir=1;
}
while(out.length<len){
if(dir>0){
out=c+out;
}else{
out+=c;
}
}
return out;
};
dojo.string.padLeft=function(str,len,c){
return dojo.string.pad(str,len,c,1);
};
dojo.string.padRight=function(str,len,c){
return dojo.string.pad(str,len,c,-1);
};
dojo.provide("dojo.string");
dojo.require("dojo.string.common");
dojo.provide("dojo.html");
dojo.require("dojo.lang.func");
dojo.require("dojo.dom");
dojo.require("dojo.style");
dojo.require("dojo.string");
dojo.lang.mixin(dojo.html,dojo.dom);
dojo.lang.mixin(dojo.html,dojo.style);
dojo.html.clearSelection=function(){
try{
if(window["getSelection"]){
if(dojo.render.html.safari){
window.getSelection().collapse();
}else{
window.getSelection().removeAllRanges();
}
}else{
if(document.selection){
if(document.selection.empty){
document.selection.empty();
}else{
if(document.selection.clear){
document.selection.clear();
}
}
}
}
return true;
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.html.disableSelection=function(_45f){
_45f=dojo.byId(_45f)||document.body;
var h=dojo.render.html;
if(h.mozilla){
_45f.style.MozUserSelect="none";
}else{
if(h.safari){
_45f.style.KhtmlUserSelect="none";
}else{
if(h.ie){
_45f.unselectable="on";
}else{
return false;
}
}
}
return true;
};
dojo.html.enableSelection=function(_461){
_461=dojo.byId(_461)||document.body;
var h=dojo.render.html;
if(h.mozilla){
_461.style.MozUserSelect="";
}else{
if(h.safari){
_461.style.KhtmlUserSelect="";
}else{
if(h.ie){
_461.unselectable="off";
}else{
return false;
}
}
}
return true;
};
dojo.html.selectElement=function(_463){
_463=dojo.byId(_463);
if(document.selection&&document.body.createTextRange){
var _464=document.body.createTextRange();
_464.moveToElementText(_463);
_464.select();
}else{
if(window["getSelection"]){
var _465=window.getSelection();
if(_465["selectAllChildren"]){
_465.selectAllChildren(_463);
}
}
}
};
dojo.html.selectInputText=function(_466){
_466=dojo.byId(_466);
if(document.selection&&document.body.createTextRange){
var _467=_466.createTextRange();
_467.moveStart("character",0);
_467.moveEnd("character",_466.value.length);
_467.select();
}else{
if(window["getSelection"]){
var _468=window.getSelection();
_466.setSelectionRange(0,_466.value.length);
}
}
_466.focus();
};
dojo.html.isSelectionCollapsed=function(){
if(document["selection"]){
return document.selection.createRange().text=="";
}else{
if(window["getSelection"]){
var _469=window.getSelection();
if(dojo.lang.isString(_469)){
return _469=="";
}else{
return _469.isCollapsed;
}
}
}
};
dojo.html.getEventTarget=function(evt){
if(!evt){
evt=window.event||{};
}
var t=(evt.srcElement?evt.srcElement:(evt.target?evt.target:null));
while((t)&&(t.nodeType!=1)){
t=t.parentNode;
}
return t;
};
dojo.html.getDocumentWidth=function(){
dojo.deprecated("dojo.html.getDocument*","replaced by dojo.html.getViewport*","0.4");
return dojo.html.getViewportWidth();
};
dojo.html.getDocumentHeight=function(){
dojo.deprecated("dojo.html.getDocument*","replaced by dojo.html.getViewport*","0.4");
return dojo.html.getViewportHeight();
};
dojo.html.getDocumentSize=function(){
dojo.deprecated("dojo.html.getDocument*","replaced of dojo.html.getViewport*","0.4");
return dojo.html.getViewportSize();
};
dojo.html.getViewportWidth=function(){
var w=0;
if(window.innerWidth){
w=window.innerWidth;
}
if(dojo.exists(document,"documentElement.clientWidth")){
var w2=document.documentElement.clientWidth;
if(!w||w2&&w2<w){
w=w2;
}
return w;
}
if(document.body){
return document.body.clientWidth;
}
return 0;
};
dojo.html.getViewportHeight=function(){
if(window.innerHeight){
return window.innerHeight;
}
if(dojo.exists(document,"documentElement.clientHeight")){
return document.documentElement.clientHeight;
}
if(document.body){
return document.body.clientHeight;
}
return 0;
};
dojo.html.getViewportSize=function(){
var ret=[dojo.html.getViewportWidth(),dojo.html.getViewportHeight()];
ret.w=ret[0];
ret.h=ret[1];
return ret;
};
dojo.html.getScrollTop=function(){
return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
};
dojo.html.getScrollLeft=function(){
return window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;
};
dojo.html.getScrollOffset=function(){
var off=[dojo.html.getScrollLeft(),dojo.html.getScrollTop()];
off.x=off[0];
off.y=off[1];
return off;
};
dojo.html.getParentOfType=function(node,type){
dojo.deprecated("dojo.html.getParentOfType","replaced by dojo.html.getParentByType*","0.4");
return dojo.html.getParentByType(node,type);
};
dojo.html.getParentByType=function(node,type){
var _474=dojo.byId(node);
type=type.toLowerCase();
while((_474)&&(_474.nodeName.toLowerCase()!=type)){
if(_474==(document["body"]||document["documentElement"])){
return null;
}
_474=_474.parentNode;
}
return _474;
};
dojo.html.getAttribute=function(node,attr){
node=dojo.byId(node);
if((!node)||(!node.getAttribute)){
return null;
}
var ta=typeof attr=="string"?attr:new String(attr);
var v=node.getAttribute(ta.toUpperCase());
if((v)&&(typeof v=="string")&&(v!="")){
return v;
}
if(v&&v.value){
return v.value;
}
if((node.getAttributeNode)&&(node.getAttributeNode(ta))){
return (node.getAttributeNode(ta)).value;
}else{
if(node.getAttribute(ta)){
return node.getAttribute(ta);
}else{
if(node.getAttribute(ta.toLowerCase())){
return node.getAttribute(ta.toLowerCase());
}
}
}
return null;
};
dojo.html.hasAttribute=function(node,attr){
node=dojo.byId(node);
return dojo.html.getAttribute(node,attr)?true:false;
};
dojo.html.getClass=function(node){
node=dojo.byId(node);
if(!node){
return "";
}
var cs="";
if(node.className){
cs=node.className;
}else{
if(dojo.html.hasAttribute(node,"class")){
cs=dojo.html.getAttribute(node,"class");
}
}
return dojo.string.trim(cs);
};
dojo.html.getClasses=function(node){
var c=dojo.html.getClass(node);
return (c=="")?[]:c.split(/\s+/g);
};
dojo.html.hasClass=function(node,_480){
return dojo.lang.inArray(dojo.html.getClasses(node),_480);
};
dojo.html.prependClass=function(node,_482){
_482+=" "+dojo.html.getClass(node);
return dojo.html.setClass(node,_482);
};
dojo.html.addClass=function(node,_484){
if(dojo.html.hasClass(node,_484)){
return false;
}
_484=dojo.string.trim(dojo.html.getClass(node)+" "+_484);
return dojo.html.setClass(node,_484);
};
dojo.html.setClass=function(node,_486){
node=dojo.byId(node);
var cs=new String(_486);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_486);
node.className=cs;
}else{
return false;
}
}
}
catch(e){
dojo.debug("dojo.html.setClass() failed",e);
}
return true;
};
dojo.html.removeClass=function(node,_489,_48a){
var _489=dojo.string.trim(new String(_489));
try{
var cs=dojo.html.getClasses(node);
var nca=[];
if(_48a){
for(var i=0;i<cs.length;i++){
if(cs[i].indexOf(_489)==-1){
nca.push(cs[i]);
}
}
}else{
for(var i=0;i<cs.length;i++){
if(cs[i]!=_489){
nca.push(cs[i]);
}
}
}
dojo.html.setClass(node,nca.join(" "));
}
catch(e){
dojo.debug("dojo.html.removeClass() failed",e);
}
return true;
};
dojo.html.replaceClass=function(node,_48f,_490){
dojo.html.removeClass(node,_490);
dojo.html.addClass(node,_48f);
};
dojo.html.classMatchType={ContainsAll:0,ContainsAny:1,IsOnly:2};
dojo.html.getElementsByClass=function(_491,_492,_493,_494,_495){
_492=dojo.byId(_492)||document;
var _496=_491.split(/\s+/g);
var _497=[];
if(_494!=1&&_494!=2){
_494=0;
}
var _498=new RegExp("(\\s|^)(("+_496.join(")|(")+"))(\\s|$)");
var _499=[];
if(!_495&&document.evaluate){
var _49a="//"+(_493||"*")+"[contains(";
if(_494!=dojo.html.classMatchType.ContainsAny){
_49a+="concat(' ',@class,' '), ' "+_496.join(" ') and contains(concat(' ',@class,' '), ' ")+" ')]";
}else{
_49a+="concat(' ',@class,' '), ' "+_496.join(" ')) or contains(concat(' ',@class,' '), ' ")+" ')]";
}
var _49b=document.evaluate(_49a,_492,null,XPathResult.ANY_TYPE,null);
var _49c=_49b.iterateNext();
while(_49c){
try{
_499.push(_49c);
_49c=_49b.iterateNext();
}
catch(e){
break;
}
}
return _499;
}else{
if(!_493){
_493="*";
}
_499=_492.getElementsByTagName(_493);
var node,i=0;
outer:
while(node=_499[i++]){
var _49e=dojo.html.getClasses(node);
if(_49e.length==0){
continue outer;
}
var _49f=0;
for(var j=0;j<_49e.length;j++){
if(_498.test(_49e[j])){
if(_494==dojo.html.classMatchType.ContainsAny){
_497.push(node);
continue outer;
}else{
_49f++;
}
}else{
if(_494==dojo.html.classMatchType.IsOnly){
continue outer;
}
}
}
if(_49f==_496.length){
if((_494==dojo.html.classMatchType.IsOnly)&&(_49f==_49e.length)){
_497.push(node);
}else{
if(_494==dojo.html.classMatchType.ContainsAll){
_497.push(node);
}
}
}
}
return _497;
}
};
dojo.html.getElementsByClassName=dojo.html.getElementsByClass;
dojo.html.getCursorPosition=function(e){
e=e||window.event;
var _4a2={x:0,y:0};
if(e.pageX||e.pageY){
_4a2.x=e.pageX;
_4a2.y=e.pageY;
}else{
var de=document.documentElement;
var db=document.body;
_4a2.x=e.clientX+((de||db)["scrollLeft"])-((de||db)["clientLeft"]);
_4a2.y=e.clientY+((de||db)["scrollTop"])-((de||db)["clientTop"]);
}
return _4a2;
};
dojo.html.overElement=function(_4a5,e){
_4a5=dojo.byId(_4a5);
var _4a7=dojo.html.getCursorPosition(e);
with(dojo.html){
var top=getAbsoluteY(_4a5,true);
var _4a9=top+getInnerHeight(_4a5);
var left=getAbsoluteX(_4a5,true);
var _4ab=left+getInnerWidth(_4a5);
}
return (_4a7.x>=left&&_4a7.x<=_4ab&&_4a7.y>=top&&_4a7.y<=_4a9);
};
dojo.html.setActiveStyleSheet=function(_4ac){
var i=0,a,els=document.getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")){
a.disabled=true;
if(a.getAttribute("title")==_4ac){
a.disabled=false;
}
}
}
};
dojo.html.getActiveStyleSheet=function(){
var i=0,a,els=document.getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")&&!a.disabled){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.getPreferredStyleSheet=function(){
var i=0,a,els=document.getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("rel").indexOf("alt")==-1&&a.getAttribute("title")){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.body=function(){
return document.body||document.getElementsByTagName("body")[0];
};
dojo.html.isTag=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
var arr=dojo.lang.map(dojo.lang.toArray(arguments,1),function(a){
return String(a).toLowerCase();
});
return arr[dojo.lang.find(node.tagName.toLowerCase(),arr)]||"";
}
return "";
};
dojo.html.copyStyle=function(_4b3,_4b4){
if(dojo.lang.isUndefined(_4b4.style.cssText)){
_4b3.setAttribute("style",_4b4.getAttribute("style"));
}else{
_4b3.style.cssText=_4b4.style.cssText;
}
dojo.html.addClass(_4b3,dojo.html.getClass(_4b4));
};
dojo.html._callExtrasDeprecated=function(_4b5,args){
var _4b7="dojo.html.extras";
dojo.deprecated("dojo.html."+_4b5,"moved to "+_4b7,"0.4");
dojo["require"](_4b7);
return dojo.html[_4b5].apply(dojo.html,args);
};
dojo.html.createNodesFromText=function(){
return dojo.html._callExtrasDeprecated("createNodesFromText",arguments);
};
dojo.html.gravity=function(){
return dojo.html._callExtrasDeprecated("gravity",arguments);
};
dojo.html.placeOnScreen=function(){
return dojo.html._callExtrasDeprecated("placeOnScreen",arguments);
};
dojo.html.placeOnScreenPoint=function(){
return dojo.html._callExtrasDeprecated("placeOnScreenPoint",arguments);
};
dojo.html.renderedTextContent=function(){
return dojo.html._callExtrasDeprecated("renderedTextContent",arguments);
};
dojo.html.BackgroundIframe=function(){
return dojo.html._callExtrasDeprecated("BackgroundIframe",arguments);
};
dojo.provide("dojo.string.extras");
dojo.require("dojo.string.common");
dojo.require("dojo.lang");
dojo.string.substituteParams=function(_4b8,hash){
var map=(typeof hash=="object")?hash:dojo.lang.toArray(arguments,1);
return _4b8.replace(/\%\{(\w+)\}/g,function(_4bb,key){
return map[key]||dojo.raise("Substitution not found: "+key);
});
};
dojo.string.paramString=function(str,_4be,_4bf){
dojo.deprecated("dojo.string.paramString","use dojo.string.substituteParams instead","0.4");
for(var name in _4be){
var re=new RegExp("\\%\\{"+name+"\\}","g");
str=str.replace(re,_4be[name]);
}
if(_4bf){
str=str.replace(/%\{([^\}\s]+)\}/g,"");
}
return str;
};
dojo.string.capitalize=function(str){
if(!dojo.lang.isString(str)){
return "";
}
if(arguments.length==0){
str=this;
}
var _4c3=str.split(" ");
for(var i=0;i<_4c3.length;i++){
_4c3[i]=_4c3[i].charAt(0).toUpperCase()+_4c3[i].substring(1);
}
return _4c3.join(" ");
};
dojo.string.isBlank=function(str){
if(!dojo.lang.isString(str)){
return true;
}
return (dojo.string.trim(str).length==0);
};
dojo.string.encodeAscii=function(str){
if(!dojo.lang.isString(str)){
return str;
}
var ret="";
var _4c8=escape(str);
var _4c9,re=/%u([0-9A-F]{4})/i;
while((_4c9=_4c8.match(re))){
var num=Number("0x"+_4c9[1]);
var _4cb=escape("&#"+num+";");
ret+=_4c8.substring(0,_4c9.index)+_4cb;
_4c8=_4c8.substring(_4c9.index+_4c9[0].length);
}
ret+=_4c8.replace(/\+/g,"%2B");
return ret;
};
dojo.string.escape=function(type,str){
var args=dojo.lang.toArray(arguments,1);
switch(type.toLowerCase()){
case "xml":
case "html":
case "xhtml":
return dojo.string.escapeXml.apply(this,args);
case "sql":
return dojo.string.escapeSql.apply(this,args);
case "regexp":
case "regex":
return dojo.string.escapeRegExp.apply(this,args);
case "javascript":
case "jscript":
case "js":
return dojo.string.escapeJavaScript.apply(this,args);
case "ascii":
return dojo.string.encodeAscii.apply(this,args);
default:
return str;
}
};
dojo.string.escapeXml=function(str,_4d0){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_4d0){
str=str.replace(/'/gm,"&#39;");
}
return str;
};
dojo.string.escapeSql=function(str){
return str.replace(/'/gm,"''");
};
dojo.string.escapeRegExp=function(str){
return str.replace(/\\/gm,"\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm,"\\$1");
};
dojo.string.escapeJavaScript=function(str){
return str.replace(/(["'\f\b\n\t\r])/gm,"\\$1");
};
dojo.string.escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.string.summary=function(str,len){
if(!len||str.length<=len){
return str;
}else{
return str.substring(0,len).replace(/\.+$/,"")+"...";
}
};
dojo.string.endsWith=function(str,end,_4d9){
if(_4d9){
str=str.toLowerCase();
end=end.toLowerCase();
}
if((str.length-end.length)<0){
return false;
}
return str.lastIndexOf(end)==str.length-end.length;
};
dojo.string.endsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.endsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.startsWith=function(str,_4dd,_4de){
if(_4de){
str=str.toLowerCase();
_4dd=_4dd.toLowerCase();
}
return str.indexOf(_4dd)==0;
};
dojo.string.startsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.startsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.has=function(str){
for(var i=1;i<arguments.length;i++){
if(str.indexOf(arguments[i])>-1){
return true;
}
}
return false;
};
dojo.string.normalizeNewlines=function(text,_4e4){
if(_4e4=="\n"){
text=text.replace(/\r\n/g,"\n");
text=text.replace(/\r/g,"\n");
}else{
if(_4e4=="\r"){
text=text.replace(/\r\n/g,"\r");
text=text.replace(/\n/g,"\r");
}else{
text=text.replace(/([^\r])\n/g,"$1\r\n");
text=text.replace(/\r([^\n])/g,"\r\n$1");
}
}
return text;
};
dojo.string.splitEscaped=function(str,_4e6){
var _4e7=[];
for(var i=0,prevcomma=0;i<str.length;i++){
if(str.charAt(i)=="\\"){
i++;
continue;
}
if(str.charAt(i)==_4e6){
_4e7.push(str.substring(prevcomma,i));
prevcomma=i+1;
}
}
_4e7.push(str.substr(prevcomma));
return _4e7;
};
dojo.require("dojo.html");
dojo.provide("dojo.html.extras");
dojo.require("dojo.string.extras");
dojo.html.gravity=function(node,e){
node=dojo.byId(node);
var _4eb=dojo.html.getCursorPosition(e);
with(dojo.html){
var _4ec=getAbsoluteX(node,true)+(getInnerWidth(node)/2);
var _4ed=getAbsoluteY(node,true)+(getInnerHeight(node)/2);
}
with(dojo.html.gravity){
return ((_4eb.x<_4ec?WEST:EAST)|(_4eb.y<_4ed?NORTH:SOUTH));
}
};
dojo.html.gravity.NORTH=1;
dojo.html.gravity.SOUTH=1<<1;
dojo.html.gravity.EAST=1<<2;
dojo.html.gravity.WEST=1<<3;
dojo.html.renderedTextContent=function(node){
node=dojo.byId(node);
var _4ef="";
if(node==null){
return _4ef;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
var _4f1="unknown";
try{
_4f1=dojo.style.getStyle(node.childNodes[i],"display");
}
catch(E){
}
switch(_4f1){
case "block":
case "list-item":
case "run-in":
case "table":
case "table-row-group":
case "table-header-group":
case "table-footer-group":
case "table-row":
case "table-column-group":
case "table-column":
case "table-cell":
case "table-caption":
_4ef+="\n";
_4ef+=dojo.html.renderedTextContent(node.childNodes[i]);
_4ef+="\n";
break;
case "none":
break;
default:
if(node.childNodes[i].tagName&&node.childNodes[i].tagName.toLowerCase()=="br"){
_4ef+="\n";
}else{
_4ef+=dojo.html.renderedTextContent(node.childNodes[i]);
}
break;
}
break;
case 3:
case 2:
case 4:
var text=node.childNodes[i].nodeValue;
var _4f3="unknown";
try{
_4f3=dojo.style.getStyle(node,"text-transform");
}
catch(E){
}
switch(_4f3){
case "capitalize":
text=dojo.string.capitalize(text);
break;
case "uppercase":
text=text.toUpperCase();
break;
case "lowercase":
text=text.toLowerCase();
break;
default:
break;
}
switch(_4f3){
case "nowrap":
break;
case "pre-wrap":
break;
case "pre-line":
break;
case "pre":
break;
default:
text=text.replace(/\s+/," ");
if(/\s$/.test(_4ef)){
text.replace(/^\s/,"");
}
break;
}
_4ef+=text;
break;
default:
break;
}
}
return _4ef;
};
dojo.html.createNodesFromText=function(txt,trim){
if(trim){
txt=dojo.string.trim(txt);
}
var tn=document.createElement("div");
tn.style.visibility="hidden";
document.body.appendChild(tn);
var _4f7="none";
if((/^<t[dh][\s\r\n>]/i).test(dojo.string.trimStart(txt))){
txt="<table><tbody><tr>"+txt+"</tr></tbody></table>";
_4f7="cell";
}else{
if((/^<tr[\s\r\n>]/i).test(dojo.string.trimStart(txt))){
txt="<table><tbody>"+txt+"</tbody></table>";
_4f7="row";
}else{
if((/^<(thead|tbody|tfoot)[\s\r\n>]/i).test(dojo.string.trimStart(txt))){
txt="<table>"+txt+"</table>";
_4f7="section";
}
}
}
tn.innerHTML=txt;
if(tn["normalize"]){
tn.normalize();
}
var _4f8=null;
switch(_4f7){
case "cell":
_4f8=tn.getElementsByTagName("tr")[0];
break;
case "row":
_4f8=tn.getElementsByTagName("tbody")[0];
break;
case "section":
_4f8=tn.getElementsByTagName("table")[0];
break;
default:
_4f8=tn;
break;
}
var _4f9=[];
for(var x=0;x<_4f8.childNodes.length;x++){
_4f9.push(_4f8.childNodes[x].cloneNode(true));
}
tn.style.display="none";
document.body.removeChild(tn);
return _4f9;
};
dojo.html.placeOnScreen=function(node,_4fc,_4fd,_4fe,_4ff){
if(dojo.lang.isArray(_4fc)){
_4ff=_4fe;
_4fe=_4fd;
_4fd=_4fc[1];
_4fc=_4fc[0];
}
if(!isNaN(_4fe)){
_4fe=[Number(_4fe),Number(_4fe)];
}else{
if(!dojo.lang.isArray(_4fe)){
_4fe=[0,0];
}
}
var _500=dojo.html.getScrollOffset();
var view=dojo.html.getViewportSize();
node=dojo.byId(node);
var w=node.offsetWidth+_4fe[0];
var h=node.offsetHeight+_4fe[1];
if(_4ff){
_4fc-=_500.x;
_4fd-=_500.y;
}
var x=_4fc+w;
if(x>view.w){
x=view.w-w;
}else{
x=_4fc;
}
x=Math.max(_4fe[0],x)+_500.x;
var y=_4fd+h;
if(y>view.h){
y=view.h-h;
}else{
y=_4fd;
}
y=Math.max(_4fe[1],y)+_500.y;
node.style.left=x+"px";
node.style.top=y+"px";
var ret=[x,y];
ret.x=x;
ret.y=y;
return ret;
};
dojo.html.placeOnScreenPoint=function(node,_508,_509,_50a,_50b){
if(dojo.lang.isArray(_508)){
_50b=_50a;
_50a=_509;
_509=_508[1];
_508=_508[0];
}
if(!isNaN(_50a)){
_50a=[Number(_50a),Number(_50a)];
}else{
if(!dojo.lang.isArray(_50a)){
_50a=[0,0];
}
}
var _50c=dojo.html.getScrollOffset();
var view=dojo.html.getViewportSize();
node=dojo.byId(node);
var _50e=node.style.display;
node.style.display="";
var w=dojo.style.getInnerWidth(node);
var h=dojo.style.getInnerHeight(node);
node.style.display=_50e;
if(_50b){
_508-=_50c.x;
_509-=_50c.y;
}
var x=-1,y=-1;
if((_508+_50a[0])+w<=view.w&&(_509+_50a[1])+h<=view.h){
x=(_508+_50a[0]);
y=(_509+_50a[1]);
}
if((x<0||y<0)&&(_508-_50a[0])<=view.w&&(_509+_50a[1])+h<=view.h){
x=(_508-_50a[0])-w;
y=(_509+_50a[1]);
}
if((x<0||y<0)&&(_508+_50a[0])+w<=view.w&&(_509-_50a[1])<=view.h){
x=(_508+_50a[0]);
y=(_509-_50a[1])-h;
}
if((x<0||y<0)&&(_508-_50a[0])<=view.w&&(_509-_50a[1])<=view.h){
x=(_508-_50a[0])-w;
y=(_509-_50a[1])-h;
}
if(x<0||y<0||(x+w>view.w)||(y+h>view.h)){
return dojo.html.placeOnScreen(node,_508,_509,_50a,_50b);
}
x+=_50c.x;
y+=_50c.y;
node.style.left=x+"px";
node.style.top=y+"px";
var ret=[x,y];
ret.x=x;
ret.y=y;
return ret;
};
dojo.html.BackgroundIframe=function(node){
if(dojo.render.html.ie55||dojo.render.html.ie60){
var html="<iframe "+"style='position: absolute; left: 0px; top: 0px; width: 100%; height: 100%;"+"z-index: -1; filter:Alpha(Opacity=\"0\");' "+">";
this.iframe=document.createElement(html);
if(node){
node.appendChild(this.iframe);
this.domNode=node;
}else{
document.body.appendChild(this.iframe);
this.iframe.style.display="none";
}
}
};
dojo.lang.extend(dojo.html.BackgroundIframe,{iframe:null,onResized:function(){
if(this.iframe&&this.domNode&&this.domNode.parentElement){
var w=dojo.style.getOuterWidth(this.domNode);
var h=dojo.style.getOuterHeight(this.domNode);
if(w==0||h==0){
dojo.lang.setTimeout(this,this.onResized,50);
return;
}
var s=this.iframe.style;
s.width=w+"px";
s.height=h+"px";
}
},size:function(node){
if(!this.iframe){
return;
}
var _519=dojo.style.toCoordinateArray(node,true);
var s=this.iframe.style;
s.width=_519.w+"px";
s.height=_519.h+"px";
s.left=_519.x+"px";
s.top=_519.y+"px";
},setZIndex:function(node){
if(!this.iframe){
return;
}
if(dojo.dom.isNode(node)){
this.iframe.style.zIndex=dojo.html.getStyle(node,"z-index")-1;
}else{
if(!isNaN(node)){
this.iframe.style.zIndex=node;
}
}
},show:function(){
if(!this.iframe){
return;
}
this.iframe.style.display="block";
},hide:function(){
if(!this.ie){
return;
}
var s=this.iframe.style;
s.display="none";
},remove:function(){
dojo.dom.removeNode(this.iframe);
}});
dojo.provide("dojo.lfx.Animation");
dojo.provide("dojo.lfx.Line");
dojo.require("dojo.lang.func");
dojo.lfx.Line=function(_51d,end){
this.start=_51d;
this.end=end;
if(dojo.lang.isArray(_51d)){
var diff=[];
dojo.lang.forEach(this.start,function(s,i){
diff[i]=this.end[i]-s;
},this);
this.getValue=function(n){
var res=[];
dojo.lang.forEach(this.start,function(s,i){
res[i]=(diff[i]*n)+s;
},this);
return res;
};
}else{
var diff=end-_51d;
this.getValue=function(n){
return (diff*n)+this.start;
};
}
};
dojo.lfx.easeIn=function(n){
return Math.pow(n,3);
};
dojo.lfx.easeOut=function(n){
return (1-Math.pow(1-n,3));
};
dojo.lfx.easeInOut=function(n){
return ((3*Math.pow(n,2))-(2*Math.pow(n,3)));
};
dojo.lfx.IAnimation=function(){
};
dojo.lang.extend(dojo.lfx.IAnimation,{curve:null,duration:1000,easing:null,repeatCount:0,rate:25,handler:null,beforeBegin:null,onBegin:null,onAnimate:null,onEnd:null,onPlay:null,onPause:null,onStop:null,play:null,pause:null,stop:null,fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,(args||[]));
}
},_active:false,_paused:false});
dojo.lfx.Animation=function(_52c,_52d,_52e,_52f,_530,rate){
dojo.lfx.IAnimation.call(this);
if(dojo.lang.isNumber(_52c)||(!_52c&&_52d.getValue)){
rate=_530;
_530=_52f;
_52f=_52e;
_52e=_52d;
_52d=_52c;
_52c=null;
}else{
if(_52c.getValue||dojo.lang.isArray(_52c)){
rate=_52f;
_530=_52e;
_52f=_52d;
_52e=_52c;
_52d=null;
_52c=null;
}
}
if(dojo.lang.isArray(_52e)){
this.curve=new dojo.lfx.Line(_52e[0],_52e[1]);
}else{
this.curve=_52e;
}
if(_52d!=null&&_52d>0){
this.duration=_52d;
}
if(_530){
this.repeatCount=_530;
}
if(rate){
this.rate=rate;
}
if(_52c){
this.handler=_52c.handler;
this.beforeBegin=_52c.beforeBegin;
this.onBegin=_52c.onBegin;
this.onEnd=_52c.onEnd;
this.onPlay=_52c.onPlay;
this.onPause=_52c.onPause;
this.onStop=_52c.onStop;
this.onAnimate=_52c.onAnimate;
}
if(_52f&&dojo.lang.isFunction(_52f)){
this.easing=_52f;
}
};
dojo.inherits(dojo.lfx.Animation,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Animation,{_startTime:null,_endTime:null,_timer:null,_percent:0,_startRepeatCount:0,play:function(_532,_533){
if(_533){
clearTimeout(this._timer);
this._active=false;
this._paused=false;
this._percent=0;
}else{
if(this._active&&!this._paused){
return this;
}
}
this.fire("handler",["beforeBegin"]);
this.fire("beforeBegin");
if(_532>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_533);
}),_532);
return this;
}
this._startTime=new Date().valueOf();
if(this._paused){
this._startTime-=(this.duration*this._percent/100);
}
this._endTime=this._startTime+this.duration;
this._active=true;
this._paused=false;
var step=this._percent/100;
var _535=this.curve.getValue(step);
if(this._percent==0){
if(!this._startRepeatCount){
this._startRepeatCount=this.repeatCount;
}
this.fire("handler",["begin",_535]);
this.fire("onBegin",[_535]);
}
this.fire("handler",["play",_535]);
this.fire("onPlay",[_535]);
this._cycle();
return this;
},pause:function(){
clearTimeout(this._timer);
if(!this._active){
return this;
}
this._paused=true;
var _536=this.curve.getValue(this._percent/100);
this.fire("handler",["pause",_536]);
this.fire("onPause",[_536]);
return this;
},gotoPercent:function(pct,_538){
clearTimeout(this._timer);
this._active=true;
this._paused=true;
this._percent=pct;
if(_538){
this.play();
}
},stop:function(_539){
clearTimeout(this._timer);
var step=this._percent/100;
if(_539){
step=1;
}
var _53b=this.curve.getValue(step);
this.fire("handler",["stop",_53b]);
this.fire("onStop",[_53b]);
this._active=false;
this._paused=false;
return this;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}else{
return "stopped";
}
},_cycle:function(){
clearTimeout(this._timer);
if(this._active){
var curr=new Date().valueOf();
var step=(curr-this._startTime)/(this._endTime-this._startTime);
if(step>=1){
step=1;
this._percent=100;
}else{
this._percent=step*100;
}
if((this.easing)&&(dojo.lang.isFunction(this.easing))){
step=this.easing(step);
}
var _53e=this.curve.getValue(step);
this.fire("handler",["animate",_53e]);
this.fire("onAnimate",[_53e]);
if(step<1){
this._timer=setTimeout(dojo.lang.hitch(this,"_cycle"),this.rate);
}else{
this._active=false;
this.fire("handler",["end"]);
this.fire("onEnd");
if(this.repeatCount>0){
this.repeatCount--;
this.play(null,true);
}else{
if(this.repeatCount==-1){
this.play(null,true);
}else{
if(this._startRepeatCount){
this.repeatCount=this._startRepeatCount;
this._startRepeatCount=0;
}
}
}
}
}
return this;
}});
dojo.lfx.Combine=function(){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._animsEnded=0;
var _53f=arguments;
if(_53f.length==1&&(dojo.lang.isArray(_53f[0])||dojo.lang.isArrayLike(_53f[0]))){
_53f=_53f[0];
}
var _540=this;
dojo.lang.forEach(_53f,function(anim){
_540._anims.push(anim);
var _542=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_542();
_540._onAnimsEnded();
};
});
};
dojo.inherits(dojo.lfx.Combine,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Combine,{_animsEnded:0,play:function(_543,_544){
if(!this._anims.length){
return this;
}
this.fire("beforeBegin");
if(_543>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_544);
}),_543);
return this;
}
if(_544||this._anims[0].percent==0){
this.fire("onBegin");
}
this.fire("onPlay");
this._animsCall("play",null,_544);
return this;
},pause:function(){
this.fire("onPause");
this._animsCall("pause");
return this;
},stop:function(_545){
this.fire("onStop");
this._animsCall("stop",_545);
return this;
},_onAnimsEnded:function(){
this._animsEnded++;
if(this._animsEnded>=this._anims.length){
this.fire("onEnd");
}
return this;
},_animsCall:function(_546){
var args=[];
if(arguments.length>1){
for(var i=1;i<arguments.length;i++){
args.push(arguments[i]);
}
}
var _549=this;
dojo.lang.forEach(this._anims,function(anim){
anim[_546](args);
},_549);
return this;
}});
dojo.lfx.Chain=function(){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._currAnim=-1;
var _54b=arguments;
if(_54b.length==1&&(dojo.lang.isArray(_54b[0])||dojo.lang.isArrayLike(_54b[0]))){
_54b=_54b[0];
}
var _54c=this;
dojo.lang.forEach(_54b,function(anim,i,_54f){
_54c._anims.push(anim);
var _550=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
if(i<_54f.length-1){
anim.onEnd=function(){
_550();
_54c._playNext();
};
}else{
anim.onEnd=function(){
_550();
_54c.fire("onEnd");
};
}
},_54c);
};
dojo.inherits(dojo.lfx.Chain,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Chain,{_currAnim:-1,play:function(_551,_552){
if(!this._anims.length){
return this;
}
if(_552||!this._anims[this._currAnim]){
this._currAnim=0;
}
var _553=this._anims[this._currAnim];
this.fire("beforeBegin");
if(_551>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_552);
}),_551);
return this;
}
if(_553){
if(this._currAnim==0){
this.fire("handler",["begin",this._currAnim]);
this.fire("onBegin",[this._currAnim]);
}
this.fire("onPlay",[this._currAnim]);
_553.play(null,_552);
}
return this;
},pause:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].pause();
this.fire("onPause",[this._currAnim]);
}
return this;
},playPause:function(){
if(this._anims.length==0){
return this;
}
if(this._currAnim==-1){
this._currAnim=0;
}
var _554=this._anims[this._currAnim];
if(_554){
if(!_554._active||_554._paused){
this.play();
}else{
this.pause();
}
}
return this;
},stop:function(){
var _555=this._anims[this._currAnim];
if(_555){
_555.stop();
this.fire("onStop",[this._currAnim]);
}
return _555;
},_playNext:function(){
if(this._currAnim==-1||this._anims.length==0){
return this;
}
this._currAnim++;
if(this._anims[this._currAnim]){
this._anims[this._currAnim].play(null,true);
}
return this;
}});
dojo.lfx.combine=function(){
var _556=arguments;
if(dojo.lang.isArray(arguments[0])){
_556=arguments[0];
}
return new dojo.lfx.Combine(_556);
};
dojo.lfx.chain=function(){
var _557=arguments;
if(dojo.lang.isArray(arguments[0])){
_557=arguments[0];
}
return new dojo.lfx.Chain(_557);
};
dojo.provide("dojo.lfx.html");
dojo.require("dojo.lfx.Animation");
dojo.require("dojo.html");
dojo.lfx.html._byId=function(_558){
if(!_558){
return [];
}
if(dojo.lang.isArray(_558)){
if(!_558.alreadyChecked){
var n=[];
dojo.lang.forEach(_558,function(node){
n.push(dojo.byId(node));
});
n.alreadyChecked=true;
return n;
}else{
return _558;
}
}else{
var n=[];
n.push(dojo.byId(_558));
n.alreadyChecked=true;
return n;
}
};
dojo.lfx.html.propertyAnimation=function(_55b,_55c,_55d,_55e){
_55b=dojo.lfx.html._byId(_55b);
if(_55b.length==1){
dojo.lang.forEach(_55c,function(prop){
if(typeof prop["start"]=="undefined"){
if(prop.property!="opacity"){
prop.start=parseInt(dojo.style.getComputedStyle(_55b[0],prop.property));
}else{
prop.start=dojo.style.getOpacity(_55b[0]);
}
}
});
}
var _560=function(_561){
var _562=new Array(_561.length);
for(var i=0;i<_561.length;i++){
_562[i]=Math.round(_561[i]);
}
return _562;
};
var _564=function(n,_566){
n=dojo.byId(n);
if(!n||!n.style){
return;
}
for(var s in _566){
if(s=="opacity"){
dojo.style.setOpacity(n,_566[s]);
}else{
n.style[s]=_566[s];
}
}
};
var _568=function(_569){
this._properties=_569;
this.diffs=new Array(_569.length);
dojo.lang.forEach(_569,function(prop,i){
if(dojo.lang.isArray(prop.start)){
this.diffs[i]=null;
}else{
if(prop.start instanceof dojo.graphics.color.Color){
prop.startRgb=prop.start.toRgb();
prop.endRgb=prop.end.toRgb();
}else{
this.diffs[i]=prop.end-prop.start;
}
}
},this);
this.getValue=function(n){
var ret={};
dojo.lang.forEach(this._properties,function(prop,i){
var _570=null;
if(dojo.lang.isArray(prop.start)){
}else{
if(prop.start instanceof dojo.graphics.color.Color){
_570=(prop.units||"rgb")+"(";
for(var j=0;j<prop.startRgb.length;j++){
_570+=Math.round(((prop.endRgb[j]-prop.startRgb[j])*n)+prop.startRgb[j])+(j<prop.startRgb.length-1?",":"");
}
_570+=")";
}else{
_570=((this.diffs[i])*n)+prop.start+(prop.property!="opacity"?prop.units||"px":"");
}
}
ret[dojo.style.toCamelCase(prop.property)]=_570;
},this);
return ret;
};
};
var anim=new dojo.lfx.Animation({onAnimate:function(_573){
dojo.lang.forEach(_55b,function(node){
_564(node,_573);
});
}},_55d,new _568(_55c),_55e);
return anim;
};
dojo.lfx.html._makeFadeable=function(_575){
var _576=function(node){
if(dojo.render.html.ie){
if((node.style.zoom.length==0)&&(dojo.style.getStyle(node,"zoom")=="normal")){
node.style.zoom="1";
}
if((node.style.width.length==0)&&(dojo.style.getStyle(node,"width")=="auto")){
node.style.width="auto";
}
}
};
if(dojo.lang.isArrayLike(_575)){
dojo.lang.forEach(_575,_576);
}else{
_576(_575);
}
};
dojo.lfx.html.fadeIn=function(_578,_579,_57a,_57b){
_578=dojo.lfx.html._byId(_578);
dojo.lfx.html._makeFadeable(_578);
var anim=dojo.lfx.propertyAnimation(_578,[{property:"opacity",start:dojo.style.getOpacity(_578[0]),end:1}],_579,_57a);
if(_57b){
var _57d=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_57d();
_57b(_578,anim);
};
}
return anim;
};
dojo.lfx.html.fadeOut=function(_57e,_57f,_580,_581){
_57e=dojo.lfx.html._byId(_57e);
dojo.lfx.html._makeFadeable(_57e);
var anim=dojo.lfx.propertyAnimation(_57e,[{property:"opacity",start:dojo.style.getOpacity(_57e[0]),end:0}],_57f,_580);
if(_581){
var _583=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_583();
_581(_57e,anim);
};
}
return anim;
};
dojo.lfx.html.fadeShow=function(_584,_585,_586,_587){
var anim=dojo.lfx.html.fadeIn(_584,_585,_586,_587);
var _589=(anim["beforeBegin"])?dojo.lang.hitch(anim,"beforeBegin"):function(){
};
anim.beforeBegin=function(){
_589();
if(dojo.lang.isArrayLike(_584)){
dojo.lang.forEach(_584,dojo.style.show);
}else{
dojo.style.show(_584);
}
};
return anim;
};
dojo.lfx.html.fadeHide=function(_58a,_58b,_58c,_58d){
var anim=dojo.lfx.html.fadeOut(_58a,_58b,_58c,function(){
if(dojo.lang.isArrayLike(_58a)){
dojo.lang.forEach(_58a,dojo.style.hide);
}else{
dojo.style.hide(_58a);
}
if(_58d){
_58d(_58a,anim);
}
});
return anim;
};
dojo.lfx.html.wipeIn=function(_58f,_590,_591,_592){
_58f=dojo.lfx.html._byId(_58f);
var _593=[];
dojo.lang.forEach(_58f,function(node){
var _595=dojo.style.getStyle(node,"overflow");
if(_595=="visible"){
node.style.overflow="hidden";
}
node.style.height="0px";
dojo.style.show(node);
var anim=dojo.lfx.propertyAnimation(node,[{property:"height",start:0,end:node.scrollHeight}],_590,_591);
var _597=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_597();
node.style.overflow=_595;
node.style.height="auto";
if(_592){
_592(node,anim);
}
};
_593.push(anim);
});
if(_58f.length>1){
return dojo.lfx.combine(_593);
}else{
return _593[0];
}
};
dojo.lfx.html.wipeOut=function(_598,_599,_59a,_59b){
_598=dojo.lfx.html._byId(_598);
var _59c=[];
dojo.lang.forEach(_598,function(node){
var _59e=dojo.style.getStyle(node,"overflow");
if(_59e=="visible"){
node.style.overflow="hidden";
}
dojo.style.show(node);
var anim=dojo.lfx.propertyAnimation(node,[{property:"height",start:dojo.style.getContentBoxHeight(node),end:0}],_599,_59a);
var _5a0=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_5a0();
dojo.style.hide(node);
node.style.overflow=_59e;
if(_59b){
_59b(node,anim);
}
};
_59c.push(anim);
});
if(_598.length>1){
return dojo.lfx.combine(_59c);
}else{
return _59c[0];
}
};
dojo.lfx.html.slideTo=function(_5a1,_5a2,_5a3,_5a4,_5a5){
_5a1=dojo.lfx.html._byId(_5a1);
var _5a6=[];
dojo.lang.forEach(_5a1,function(node){
var top=null;
var left=null;
var init=(function(){
var _5ab=node;
return function(){
top=_5ab.offsetTop;
left=_5ab.offsetLeft;
if(!dojo.style.isPositionAbsolute(_5ab)){
var ret=dojo.style.abs(_5ab,true);
dojo.style.setStyleAttributes(_5ab,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,[{property:"top",start:top,end:_5a2[0]},{property:"left",start:left,end:_5a2[1]}],_5a3,_5a4);
var _5ae=(anim["beforeBegin"])?dojo.lang.hitch(anim,"beforeBegin"):function(){
};
anim.beforeBegin=function(){
_5ae();
init();
};
if(_5a5){
var _5af=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_5af();
_5a5(_5a1,anim);
};
}
_5a6.push(anim);
});
if(_5a1.length>1){
return dojo.lfx.combine(_5a6);
}else{
return _5a6[0];
}
};
dojo.lfx.html.slideBy=function(_5b0,_5b1,_5b2,_5b3,_5b4){
_5b0=dojo.lfx.html._byId(_5b0);
var _5b5=[];
dojo.lang.forEach(_5b0,function(node){
var top=null;
var left=null;
var init=(function(){
var _5ba=node;
return function(){
top=node.offsetTop;
left=node.offsetLeft;
if(!dojo.style.isPositionAbsolute(_5ba)){
var ret=dojo.style.abs(_5ba);
dojo.style.setStyleAttributes(_5ba,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,[{property:"top",start:top,end:top+_5b1[0]},{property:"left",start:left,end:left+_5b1[1]}],_5b2,_5b3);
var _5bd=(anim["beforeBegin"])?dojo.lang.hitch(anim,"beforeBegin"):function(){
};
anim.beforeBegin=function(){
_5bd();
init();
};
if(_5b4){
var _5be=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_5be();
_5b4(_5b0,anim);
};
}
_5b5.push(anim);
});
if(_5b0.length>1){
return dojo.lfx.combine(_5b5);
}else{
return _5b5[0];
}
};
dojo.lfx.html.explode=function(_5bf,_5c0,_5c1,_5c2,_5c3){
_5bf=dojo.byId(_5bf);
_5c0=dojo.byId(_5c0);
var _5c4=dojo.style.toCoordinateArray(_5bf,true);
var _5c5=document.createElement("div");
dojo.html.copyStyle(_5c5,_5c0);
with(_5c5.style){
position="absolute";
display="none";
}
document.body.appendChild(_5c5);
with(_5c0.style){
visibility="hidden";
display="block";
}
var _5c6=dojo.style.toCoordinateArray(_5c0,true);
with(_5c0.style){
display="none";
visibility="visible";
}
var anim=new dojo.lfx.propertyAnimation(_5c5,[{property:"height",start:_5c4[3],end:_5c6[3]},{property:"width",start:_5c4[2],end:_5c6[2]},{property:"top",start:_5c4[1],end:_5c6[1]},{property:"left",start:_5c4[0],end:_5c6[0]},{property:"opacity",start:0.3,end:1}],_5c1,_5c2);
anim.beforeBegin=function(){
dojo.style.setDisplay(_5c5,"block");
};
anim.onEnd=function(){
dojo.style.setDisplay(_5c0,"block");
_5c5.parentNode.removeChild(_5c5);
};
if(_5c3){
var _5c8=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_5c8();
_5c3(_5c0,anim);
};
}
return anim;
};
dojo.lfx.html.implode=function(_5c9,end,_5cb,_5cc,_5cd){
_5c9=dojo.byId(_5c9);
end=dojo.byId(end);
var _5ce=dojo.style.toCoordinateArray(_5c9,true);
var _5cf=dojo.style.toCoordinateArray(end,true);
var _5d0=document.createElement("div");
dojo.html.copyStyle(_5d0,_5c9);
dojo.style.setOpacity(_5d0,0.3);
with(_5d0.style){
position="absolute";
display="none";
}
document.body.appendChild(_5d0);
var anim=new dojo.lfx.propertyAnimation(_5d0,[{property:"height",start:_5ce[3],end:_5cf[3]},{property:"width",start:_5ce[2],end:_5cf[2]},{property:"top",start:_5ce[1],end:_5cf[1]},{property:"left",start:_5ce[0],end:_5cf[0]},{property:"opacity",start:1,end:0.3}],_5cb,_5cc);
anim.beforeBegin=function(){
dojo.style.hide(_5c9);
dojo.style.show(_5d0);
};
anim.onEnd=function(){
_5d0.parentNode.removeChild(_5d0);
};
if(_5cd){
var _5d2=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_5d2();
_5cd(_5c9,anim);
};
}
return anim;
};
dojo.lfx.html.highlight=function(_5d3,_5d4,_5d5,_5d6,_5d7){
_5d3=dojo.lfx.html._byId(_5d3);
var _5d8=[];
dojo.lang.forEach(_5d3,function(node){
var _5da=dojo.style.getBackgroundColor(node);
var bg=dojo.style.getStyle(node,"background-color").toLowerCase();
var _5dc=dojo.style.getStyle(node,"background-image");
var _5dd=(bg=="transparent"||bg=="rgba(0, 0, 0, 0)");
while(_5da.length>3){
_5da.pop();
}
var rgb=new dojo.graphics.color.Color(_5d4);
var _5df=new dojo.graphics.color.Color(_5da);
var anim=dojo.lfx.propertyAnimation(node,[{property:"background-color",start:rgb,end:_5df}],_5d5,_5d6);
var _5e1=(anim["beforeBegin"])?dojo.lang.hitch(anim,"beforeBegin"):function(){
};
anim.beforeBegin=function(){
_5e1();
if(_5dc){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+rgb.toRgb().join(",")+")";
};
var _5e2=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_5e2();
if(_5dc){
node.style.backgroundImage=_5dc;
}
if(_5dd){
node.style.backgroundColor="transparent";
}
if(_5d7){
_5d7(node,anim);
}
};
_5d8.push(anim);
});
if(_5d3.length>1){
return dojo.lfx.combine(_5d8);
}else{
return _5d8[0];
}
};
dojo.lfx.html.unhighlight=function(_5e3,_5e4,_5e5,_5e6,_5e7){
_5e3=dojo.lfx.html._byId(_5e3);
var _5e8=[];
dojo.lang.forEach(_5e3,function(node){
var _5ea=new dojo.graphics.color.Color(dojo.style.getBackgroundColor(node));
var rgb=new dojo.graphics.color.Color(_5e4);
var _5ec=dojo.style.getStyle(node,"background-image");
var anim=dojo.lfx.propertyAnimation(node,[{property:"background-color",start:_5ea,end:rgb}],_5e5,_5e6);
var _5ee=(anim["beforeBegin"])?dojo.lang.hitch(anim,"beforeBegin"):function(){
};
anim.beforeBegin=function(){
_5ee();
if(_5ec){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+_5ea.toRgb().join(",")+")";
};
var _5ef=(anim["onEnd"])?dojo.lang.hitch(anim,"onEnd"):function(){
};
anim.onEnd=function(){
_5ef();
if(_5e7){
_5e7(node,anim);
}
};
_5e8.push(anim);
});
if(_5e3.length>1){
return dojo.lfx.combine(_5e8);
}else{
return _5e8[0];
}
};
dojo.lang.mixin(dojo.lfx,dojo.lfx.html);
dojo.kwCompoundRequire({browser:["dojo.lfx.html"],dashboard:["dojo.lfx.html"]});
dojo.provide("dojo.lfx.*");
dojo.provide("dojo.lfx.toggle");
dojo.require("dojo.lfx.*");
dojo.lfx.toggle.plain={show:function(node,_5f1,_5f2,_5f3){
dojo.style.show(node);
if(dojo.lang.isFunction(_5f3)){
_5f3();
}
},hide:function(node,_5f5,_5f6,_5f7){
dojo.style.hide(node);
if(dojo.lang.isFunction(_5f7)){
_5f7();
}
}};
dojo.lfx.toggle.fade={show:function(node,_5f9,_5fa,_5fb){
dojo.lfx.fadeShow(node,_5f9,_5fa,_5fb).play();
},hide:function(node,_5fd,_5fe,_5ff){
dojo.lfx.fadeHide(node,_5fd,_5fe,_5ff).play();
}};
dojo.lfx.toggle.wipe={show:function(node,_601,_602,_603){
dojo.lfx.wipeIn(node,_601,_602,_603).play();
},hide:function(node,_605,_606,_607){
dojo.lfx.wipeOut(node,_605,_606,_607).play();
}};
dojo.lfx.toggle.explode={show:function(node,_609,_60a,_60b,_60c){
dojo.lfx.explode(_60c||[0,0,0,0],node,_609,_60a,_60b).play();
},hide:function(node,_60e,_60f,_610,_611){
dojo.lfx.implode(node,_611||[0,0,0,0],_60e,_60f,_610).play();
}};
dojo.provide("dojo.widget.HtmlWidget");
dojo.require("dojo.widget.DomWidget");
dojo.require("dojo.html");
dojo.require("dojo.html.extras");
dojo.require("dojo.lang.extras");
dojo.require("dojo.lang.func");
dojo.require("dojo.lfx.toggle");
dojo.declare("dojo.widget.HtmlWidget",dojo.widget.DomWidget,{widgetType:"HtmlWidget",templateCssPath:null,templatePath:null,toggle:"plain",toggleDuration:150,animationInProgress:false,initialize:function(args,frag){
},postMixInProperties:function(args,frag){
this.toggleObj=dojo.lfx.toggle[this.toggle.toLowerCase()]||dojo.lfx.toggle.plain;
},getContainerHeight:function(){
dojo.unimplemented("dojo.widget.HtmlWidget.getContainerHeight");
},getContainerWidth:function(){
return this.parent.domNode.offsetWidth;
},setNativeHeight:function(_616){
var ch=this.getContainerHeight();
},createNodesFromText:function(txt,wrap){
return dojo.html.createNodesFromText(txt,wrap);
},destroyRendering:function(_61a){
try{
if(!_61a){
dojo.event.browser.clean(this.domNode);
}
this.domNode.parentNode.removeChild(this.domNode);
delete this.domNode;
}
catch(e){
}
},isShowing:function(){
return dojo.style.isShowing(this.domNode);
},toggleShowing:function(){
if(this.isHidden){
this.show();
}else{
this.hide();
}
},show:function(){
this.animationInProgress=true;
this.isHidden=false;
this.toggleObj.show(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onShow),this.explodeSrc);
},onShow:function(){
this.animationInProgress=false;
this.checkSize();
},hide:function(){
this.animationInProgress=true;
this.isHidden=true;
this.toggleObj.hide(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onHide),this.explodeSrc);
},onHide:function(){
this.animationInProgress=false;
},_isResized:function(w,h){
if(!this.isShowing()){
return false;
}
w=w||dojo.style.getOuterWidth(this.domNode);
h=h||dojo.style.getOuterHeight(this.domNode);
if(this.width==w&&this.height==h){
return false;
}
this.width=w;
this.height=h;
return true;
},checkSize:function(){
if(!this._isResized()){
return;
}
this.onResized();
},resizeTo:function(w,h){
if(!this._isResized(w,h)){
return;
}
dojo.style.setOuterWidth(this.domNode,w);
dojo.style.setOuterHeight(this.domNode,h);
this.onResized();
},resizeSoon:function(){
if(this.isShowing()){
dojo.lang.setTimeout(this,this.onResized,0);
}
},onResized:function(){
dojo.lang.forEach(this.children,function(_61f){
_61f.checkSize();
});
}});
dojo.kwCompoundRequire({common:["dojo.xml.Parse","dojo.widget.Widget","dojo.widget.Parse","dojo.widget.Manager"],browser:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],dashboard:["dojo.widget.DomWidget","dojo.widget.HtmlWidget"],svg:["dojo.widget.SvgWidget"],rhino:["dojo.widget.SwtWidget"]});
dojo.provide("dojo.widget.*");
dojo.provide("dojo.io.IO");
dojo.require("dojo.string");
dojo.require("dojo.lang.extras");
dojo.io.transports=[];
dojo.io.hdlrFuncNames=["load","error","timeout"];
dojo.io.Request=function(url,_621,_622,_623){
if((arguments.length==1)&&(arguments[0].constructor==Object)){
this.fromKwArgs(arguments[0]);
}else{
this.url=url;
if(_621){
this.mimetype=_621;
}
if(_622){
this.transport=_622;
}
if(arguments.length>=4){
this.changeUrl=_623;
}
}
};
dojo.lang.extend(dojo.io.Request,{url:"",mimetype:"text/plain",method:"GET",content:undefined,transport:undefined,changeUrl:undefined,formNode:undefined,sync:false,bindSuccess:false,useCache:false,preventCache:false,load:function(type,data,evt){
},error:function(type,_628){
},timeout:function(type){
},handle:function(){
},timeoutSeconds:0,abort:function(){
},fromKwArgs:function(_62a){
if(_62a["url"]){
_62a.url=_62a.url.toString();
}
if(_62a["formNode"]){
_62a.formNode=dojo.byId(_62a.formNode);
}
if(!_62a["method"]&&_62a["formNode"]&&_62a["formNode"].method){
_62a.method=_62a["formNode"].method;
}
if(!_62a["handle"]&&_62a["handler"]){
_62a.handle=_62a.handler;
}
if(!_62a["load"]&&_62a["loaded"]){
_62a.load=_62a.loaded;
}
if(!_62a["changeUrl"]&&_62a["changeURL"]){
_62a.changeUrl=_62a.changeURL;
}
_62a.encoding=dojo.lang.firstValued(_62a["encoding"],djConfig["bindEncoding"],"");
_62a.sendTransport=dojo.lang.firstValued(_62a["sendTransport"],djConfig["ioSendTransport"],false);
var _62b=dojo.lang.isFunction;
for(var x=0;x<dojo.io.hdlrFuncNames.length;x++){
var fn=dojo.io.hdlrFuncNames[x];
if(_62b(_62a[fn])){
continue;
}
if(_62b(_62a["handle"])){
_62a[fn]=_62a.handle;
}
}
dojo.lang.mixin(this,_62a);
}});
dojo.io.Error=function(msg,type,num){
this.message=msg;
this.type=type||"unknown";
this.number=num||0;
};
dojo.io.transports.addTransport=function(name){
this.push(name);
this[name]=dojo.io[name];
};
dojo.io.bind=function(_632){
if(!(_632 instanceof dojo.io.Request)){
try{
_632=new dojo.io.Request(_632);
}
catch(e){
dojo.debug(e);
}
}
var _633="";
if(_632["transport"]){
_633=_632["transport"];
if(!this[_633]){
return _632;
}
}else{
for(var x=0;x<dojo.io.transports.length;x++){
var tmp=dojo.io.transports[x];
if((this[tmp])&&(this[tmp].canHandle(_632))){
_633=tmp;
}
}
if(_633==""){
return _632;
}
}
this[_633].bind(_632);
_632.bindSuccess=true;
return _632;
};
dojo.io.queueBind=function(_636){
if(!(_636 instanceof dojo.io.Request)){
try{
_636=new dojo.io.Request(_636);
}
catch(e){
dojo.debug(e);
}
}
var _637=_636.load;
_636.load=function(){
dojo.io._queueBindInFlight=false;
var ret=_637.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
var _639=_636.error;
_636.error=function(){
dojo.io._queueBindInFlight=false;
var ret=_639.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
dojo.io._bindQueue.push(_636);
dojo.io._dispatchNextQueueBind();
return _636;
};
dojo.io._dispatchNextQueueBind=function(){
if(!dojo.io._queueBindInFlight){
dojo.io._queueBindInFlight=true;
if(dojo.io._bindQueue.length>0){
dojo.io.bind(dojo.io._bindQueue.shift());
}else{
dojo.io._queueBindInFlight=false;
}
}
};
dojo.io._bindQueue=[];
dojo.io._queueBindInFlight=false;
dojo.io.argsFromMap=function(map,_63c,last){
var enc=/utf/i.test(_63c||"")?encodeURIComponent:dojo.string.encodeAscii;
var _63f=[];
var _640=new Object();
for(var name in map){
var _642=function(elt){
var val=enc(name)+"="+enc(elt);
_63f[(last==name)?"push":"unshift"](val);
};
if(!_640[name]){
var _645=map[name];
if(dojo.lang.isArray(_645)){
dojo.lang.forEach(_645,_642);
}else{
_642(_645);
}
}
}
return _63f.join("&");
};
dojo.io.setIFrameSrc=function(_646,src,_648){
try{
var r=dojo.render.html;
if(!_648){
if(r.safari){
_646.location=src;
}else{
frames[_646.name].location=src;
}
}else{
var idoc;
if(r.ie){
idoc=_646.contentWindow.document;
}else{
if(r.safari){
idoc=_646.document;
}else{
idoc=_646.contentWindow;
}
}
if(!idoc){
_646.location=src;
return;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
dojo.debug(e);
dojo.debug("setIFrameSrc: "+e);
}
};
dojo.provide("dojo.undo.browser");
dojo.require("dojo.io");
try{
if((!djConfig["preventBackButtonFix"])&&(!dojo.hostenv.post_load_)){
document.write("<iframe style='border: 0px; width: 1px; height: 1px; position: absolute; bottom: 0px; right: 0px; visibility: visible;' name='djhistory' id='djhistory' src='"+(dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"'></iframe>");
}
}
catch(e){
}
if(dojo.render.html.opera){
dojo.debug("Opera is not supported with dojo.undo.browser, so back/forward detection will not work.");
}
dojo.undo.browser={initialHref:window.location.href,initialHash:window.location.hash,moveForward:false,historyStack:[],forwardStack:[],historyIframe:null,bookmarkAnchor:null,locationTimer:null,setInitialState:function(args){
this.initialState={"url":this.initialHref,"kwArgs":args,"urlHash":this.initialHash};
},addToHistory:function(args){
var hash=null;
if(!this.historyIframe){
this.historyIframe=window.frames["djhistory"];
}
if(!this.bookmarkAnchor){
this.bookmarkAnchor=document.createElement("a");
(document.body||document.getElementsByTagName("body")[0]).appendChild(this.bookmarkAnchor);
this.bookmarkAnchor.style.display="none";
}
if((!args["changeUrl"])||(dojo.render.html.ie)){
var url=dojo.hostenv.getBaseScriptUri()+"iframe_history.html?"+(new Date()).getTime();
this.moveForward=true;
dojo.io.setIFrameSrc(this.historyIframe,url,false);
}
if(args["changeUrl"]){
this.changingUrl=true;
hash="#"+((args["changeUrl"]!==true)?args["changeUrl"]:(new Date()).getTime());
setTimeout("window.location.href = '"+hash+"'; dojo.undo.browser.changingUrl = false;",1);
this.bookmarkAnchor.href=hash;
if(dojo.render.html.ie){
var _64f=args["back"]||args["backButton"]||args["handle"];
var tcb=function(_651){
if(window.location.hash!=""){
setTimeout("window.location.href = '"+hash+"';",1);
}
_64f.apply(this,[_651]);
};
if(args["back"]){
args.back=tcb;
}else{
if(args["backButton"]){
args.backButton=tcb;
}else{
if(args["handle"]){
args.handle=tcb;
}
}
}
this.forwardStack=[];
var _652=args["forward"]||args["forwardButton"]||args["handle"];
var tfw=function(_654){
if(window.location.hash!=""){
window.location.href=hash;
}
if(_652){
_652.apply(this,[_654]);
}
};
if(args["forward"]){
args.forward=tfw;
}else{
if(args["forwardButton"]){
args.forwardButton=tfw;
}else{
if(args["handle"]){
args.handle=tfw;
}
}
}
}else{
if(dojo.render.html.moz){
if(!this.locationTimer){
this.locationTimer=setInterval("dojo.undo.browser.checkLocation();",200);
}
}
}
}
this.historyStack.push({"url":url,"kwArgs":args,"urlHash":hash});
},checkLocation:function(){
if(!this.changingUrl){
var hsl=this.historyStack.length;
if((window.location.hash==this.initialHash||window.location.href==this.initialHref)&&(hsl==1)){
this.handleBackButton();
return;
}
if(this.forwardStack.length>0){
if(this.forwardStack[this.forwardStack.length-1].urlHash==window.location.hash){
this.handleForwardButton();
return;
}
}
if((hsl>=2)&&(this.historyStack[hsl-2])){
if(this.historyStack[hsl-2].urlHash==window.location.hash){
this.handleBackButton();
return;
}
}
}
},iframeLoaded:function(evt,_657){
if(!dojo.render.html.opera){
var _658=this._getUrlQuery(_657.href);
if(_658==null){
if(this.historyStack.length==1){
this.handleBackButton();
}
return;
}
if(this.moveForward){
this.moveForward=false;
return;
}
if(this.historyStack.length>=2&&_658==this._getUrlQuery(this.historyStack[this.historyStack.length-2].url)){
this.handleBackButton();
}else{
if(this.forwardStack.length>0&&_658==this._getUrlQuery(this.forwardStack[this.forwardStack.length-1].url)){
this.handleForwardButton();
}
}
}
},handleBackButton:function(){
var _659=this.historyStack.pop();
if(!_659){
return;
}
var last=this.historyStack[this.historyStack.length-1];
if(!last&&this.historyStack.length==0){
last=this.initialState;
}
if(last){
if(last.kwArgs["back"]){
last.kwArgs["back"]();
}else{
if(last.kwArgs["backButton"]){
last.kwArgs["backButton"]();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("back");
}
}
}
}
this.forwardStack.push(_659);
},handleForwardButton:function(){
var last=this.forwardStack.pop();
if(!last){
return;
}
if(last.kwArgs["forward"]){
last.kwArgs.forward();
}else{
if(last.kwArgs["forwardButton"]){
last.kwArgs.forwardButton();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("forward");
}
}
}
this.historyStack.push(last);
},_getUrlQuery:function(url){
var _65d=url.split("?");
if(_65d.length<2){
return null;
}else{
return _65d[1];
}
}};
dojo.provide("dojo.io.BrowserIO");
dojo.require("dojo.io");
dojo.require("dojo.lang.array");
dojo.require("dojo.lang.func");
dojo.require("dojo.string.extras");
dojo.require("dojo.dom");
dojo.require("dojo.undo.browser");
dojo.io.checkChildrenForFile=function(node){
var _65f=false;
var _660=node.getElementsByTagName("input");
dojo.lang.forEach(_660,function(_661){
if(_65f){
return;
}
if(_661.getAttribute("type")=="file"){
_65f=true;
}
});
return _65f;
};
dojo.io.formHasFile=function(_662){
return dojo.io.checkChildrenForFile(_662);
};
dojo.io.updateNode=function(node,_664){
node=dojo.byId(node);
var args=_664;
if(dojo.lang.isString(_664)){
args={url:_664};
}
args.mimetype="text/html";
args.load=function(t,d,e){
while(node.firstChild){
if(dojo["event"]){
try{
dojo.event.browser.clean(node.firstChild);
}
catch(e){
}
}
node.removeChild(node.firstChild);
}
node.innerHTML=d;
};
dojo.io.bind(args);
};
dojo.io.formFilter=function(node){
var type=(node.type||"").toLowerCase();
return !node.disabled&&node.name&&!dojo.lang.inArray(type,["file","submit","image","reset","button"]);
};
dojo.io.encodeForm=function(_66b,_66c,_66d){
if((!_66b)||(!_66b.tagName)||(!_66b.tagName.toLowerCase()=="form")){
dojo.raise("Attempted to encode a non-form element.");
}
if(!_66d){
_66d=dojo.io.formFilter;
}
var enc=/utf/i.test(_66c||"")?encodeURIComponent:dojo.string.encodeAscii;
var _66f=[];
for(var i=0;i<_66b.elements.length;i++){
var elm=_66b.elements[i];
if(!elm||elm.tagName.toLowerCase()=="fieldset"||!_66d(elm)){
continue;
}
var name=enc(elm.name);
var type=elm.type.toLowerCase();
if(type=="select-multiple"){
for(var j=0;j<elm.options.length;j++){
if(elm.options[j].selected){
_66f.push(name+"="+enc(elm.options[j].value));
}
}
}else{
if(dojo.lang.inArray(type,["radio","checkbox"])){
if(elm.checked){
_66f.push(name+"="+enc(elm.value));
}
}else{
_66f.push(name+"="+enc(elm.value));
}
}
}
var _675=_66b.getElementsByTagName("input");
for(var i=0;i<_675.length;i++){
var _676=_675[i];
if(_676.type.toLowerCase()=="image"&&_676.form==_66b&&_66d(_676)){
var name=enc(_676.name);
_66f.push(name+"="+enc(_676.value));
_66f.push(name+".x=0");
_66f.push(name+".y=0");
}
}
return _66f.join("&")+"&";
};
dojo.io.FormBind=function(args){
this.bindArgs={};
if(args&&args.formNode){
this.init(args);
}else{
if(args){
this.init({formNode:args});
}
}
};
dojo.lang.extend(dojo.io.FormBind,{form:null,bindArgs:null,clickedButton:null,init:function(args){
var form=dojo.byId(args.formNode);
if(!form||!form.tagName||form.tagName.toLowerCase()!="form"){
throw new Error("FormBind: Couldn't apply, invalid form");
}else{
if(this.form==form){
return;
}else{
if(this.form){
throw new Error("FormBind: Already applied to a form");
}
}
}
dojo.lang.mixin(this.bindArgs,args);
this.form=form;
this.connect(form,"onsubmit","submit");
for(var i=0;i<form.elements.length;i++){
var node=form.elements[i];
if(node&&node.type&&dojo.lang.inArray(node.type.toLowerCase(),["submit","button"])){
this.connect(node,"onclick","click");
}
}
var _67c=form.getElementsByTagName("input");
for(var i=0;i<_67c.length;i++){
var _67d=_67c[i];
if(_67d.type.toLowerCase()=="image"&&_67d.form==form){
this.connect(_67d,"onclick","click");
}
}
},onSubmit:function(form){
return true;
},submit:function(e){
e.preventDefault();
if(this.onSubmit(this.form)){
dojo.io.bind(dojo.lang.mixin(this.bindArgs,{formFilter:dojo.lang.hitch(this,"formFilter")}));
}
},click:function(e){
var node=e.currentTarget;
if(node.disabled){
return;
}
this.clickedButton=node;
},formFilter:function(node){
var type=(node.type||"").toLowerCase();
var _684=false;
if(node.disabled||!node.name){
_684=false;
}else{
if(dojo.lang.inArray(type,["submit","button","image"])){
if(!this.clickedButton){
this.clickedButton=node;
}
_684=node==this.clickedButton;
}else{
_684=!dojo.lang.inArray(type,["file","submit","reset","button"]);
}
}
return _684;
},connect:function(_685,_686,_687){
if(dojo.evalObjPath("dojo.event.connect")){
dojo.event.connect(_685,_686,this,_687);
}else{
var fcn=dojo.lang.hitch(this,_687);
_685[_686]=function(e){
if(!e){
e=window.event;
}
if(!e.currentTarget){
e.currentTarget=e.srcElement;
}
if(!e.preventDefault){
e.preventDefault=function(){
window.event.returnValue=false;
};
}
fcn(e);
};
}
}});
dojo.io.XMLHTTPTransport=new function(){
var _68a=this;
var _68b={};
this.useCache=false;
this.preventCache=false;
function getCacheKey(url,_68d,_68e){
return url+"|"+_68d+"|"+_68e.toLowerCase();
}
function addToCache(url,_690,_691,http){
_68b[getCacheKey(url,_690,_691)]=http;
}
function getFromCache(url,_694,_695){
return _68b[getCacheKey(url,_694,_695)];
}
this.clearCache=function(){
_68b={};
};
function doLoad(_696,http,url,_699,_69a){
if(((http.status>=200)&&(http.status<300))||(http.status==304)||(location.protocol=="file:"&&(http.status==0||http.status==undefined))||(location.protocol=="chrome:"&&(http.status==0||http.status==undefined))){
var ret;
if(_696.method.toLowerCase()=="head"){
var _69c=http.getAllResponseHeaders();
ret={};
ret.toString=function(){
return _69c;
};
var _69d=_69c.split(/[\r\n]+/g);
for(var i=0;i<_69d.length;i++){
var pair=_69d[i].match(/^([^:]+)\s*:\s*(.+)$/i);
if(pair){
ret[pair[1]]=pair[2];
}
}
}else{
if(_696.mimetype=="text/javascript"){
try{
ret=dj_eval(http.responseText);
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=null;
}
}else{
if(_696.mimetype=="text/json"){
try{
ret=dj_eval("("+http.responseText+")");
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=false;
}
}else{
if((_696.mimetype=="application/xml")||(_696.mimetype=="text/xml")){
ret=http.responseXML;
if(!ret||typeof ret=="string"||!http.getResponseHeader("Content-Type")){
ret=dojo.dom.createDocumentFromText(http.responseText);
}
}else{
ret=http.responseText;
}
}
}
}
if(_69a){
addToCache(url,_699,_696.method,http);
}
_696[(typeof _696.load=="function")?"load":"handle"]("load",ret,http,_696);
}else{
var _6a0=new dojo.io.Error("XMLHttpTransport Error: "+http.status+" "+http.statusText);
_696[(typeof _696.error=="function")?"error":"handle"]("error",_6a0,http,_696);
}
}
function setHeaders(http,_6a2){
if(_6a2["headers"]){
for(var _6a3 in _6a2["headers"]){
if(_6a3.toLowerCase()=="content-type"&&!_6a2["contentType"]){
_6a2["contentType"]=_6a2["headers"][_6a3];
}else{
http.setRequestHeader(_6a3,_6a2["headers"][_6a3]);
}
}
}
}
this.inFlight=[];
this.inFlightTimer=null;
this.startWatchingInFlight=function(){
if(!this.inFlightTimer){
this.inFlightTimer=setInterval("dojo.io.XMLHTTPTransport.watchInFlight();",10);
}
};
this.watchInFlight=function(){
var now=null;
for(var x=this.inFlight.length-1;x>=0;x--){
var tif=this.inFlight[x];
if(!tif){
this.inFlight.splice(x,1);
continue;
}
if(4==tif.http.readyState){
this.inFlight.splice(x,1);
doLoad(tif.req,tif.http,tif.url,tif.query,tif.useCache);
}else{
if(tif.startTime){
if(!now){
now=(new Date()).getTime();
}
if(tif.startTime+(tif.req.timeoutSeconds*1000)<now){
if(typeof tif.http.abort=="function"){
tif.http.abort();
}
this.inFlight.splice(x,1);
tif.req[(typeof tif.req.timeout=="function")?"timeout":"handle"]("timeout",null,tif.http,tif.req);
}
}
}
}
if(this.inFlight.length==0){
clearInterval(this.inFlightTimer);
this.inFlightTimer=null;
}
};
var _6a7=dojo.hostenv.getXmlhttpObject()?true:false;
this.canHandle=function(_6a8){
return _6a7&&dojo.lang.inArray((_6a8["mimetype"].toLowerCase()||""),["text/plain","text/html","application/xml","text/xml","text/javascript","text/json"])&&!(_6a8["formNode"]&&dojo.io.formHasFile(_6a8["formNode"]));
};
this.multipartBoundary="45309FFF-BD65-4d50-99C9-36986896A96F";
this.bind=function(_6a9){
if(!_6a9["url"]){
if(!_6a9["formNode"]&&(_6a9["backButton"]||_6a9["back"]||_6a9["changeUrl"]||_6a9["watchForURL"])&&(!djConfig.preventBackButtonFix)){
dojo.deprecated("Using dojo.io.XMLHTTPTransport.bind() to add to browser history without doing an IO request","Use dojo.undo.browser.addToHistory() instead.","0.4");
dojo.undo.browser.addToHistory(_6a9);
return true;
}
}
var url=_6a9.url;
var _6ab="";
if(_6a9["formNode"]){
var ta=_6a9.formNode.getAttribute("action");
if((ta)&&(!_6a9["url"])){
url=ta;
}
var tp=_6a9.formNode.getAttribute("method");
if((tp)&&(!_6a9["method"])){
_6a9.method=tp;
}
_6ab+=dojo.io.encodeForm(_6a9.formNode,_6a9.encoding,_6a9["formFilter"]);
}
if(url.indexOf("#")>-1){
dojo.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
url=url.split("#")[0];
}
if(_6a9["file"]){
_6a9.method="post";
}
if(!_6a9["method"]){
_6a9.method="get";
}
if(_6a9.method.toLowerCase()=="get"){
_6a9.multipart=false;
}else{
if(_6a9["file"]){
_6a9.multipart=true;
}else{
if(!_6a9["multipart"]){
_6a9.multipart=false;
}
}
}
if(_6a9["backButton"]||_6a9["back"]||_6a9["changeUrl"]){
dojo.undo.browser.addToHistory(_6a9);
}
var _6ae=_6a9["content"]||{};
if(_6a9.sendTransport){
_6ae["dojo.transport"]="xmlhttp";
}
do{
if(_6a9.postContent){
_6ab=_6a9.postContent;
break;
}
if(_6ae){
_6ab+=dojo.io.argsFromMap(_6ae,_6a9.encoding);
}
if(_6a9.method.toLowerCase()=="get"||!_6a9.multipart){
break;
}
var t=[];
if(_6ab.length){
var q=_6ab.split("&");
for(var i=0;i<q.length;++i){
if(q[i].length){
var p=q[i].split("=");
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+p[0]+"\"","",p[1]);
}
}
}
if(_6a9.file){
if(dojo.lang.isArray(_6a9.file)){
for(var i=0;i<_6a9.file.length;++i){
var o=_6a9.file[i];
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}else{
var o=_6a9.file;
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}
if(t.length){
t.push("--"+this.multipartBoundary+"--","");
_6ab=t.join("\r\n");
}
}while(false);
var _6b4=_6a9["sync"]?false:true;
var _6b5=_6a9["preventCache"]||(this.preventCache==true&&_6a9["preventCache"]!=false);
var _6b6=_6a9["useCache"]==true||(this.useCache==true&&_6a9["useCache"]!=false);
if(!_6b5&&_6b6){
var _6b7=getFromCache(url,_6ab,_6a9.method);
if(_6b7){
doLoad(_6a9,_6b7,url,_6ab,false);
return;
}
}
var http=dojo.hostenv.getXmlhttpObject(_6a9);
var _6b9=false;
if(_6b4){
var _6ba=this.inFlight.push({"req":_6a9,"http":http,"url":url,"query":_6ab,"useCache":_6b6,"startTime":_6a9.timeoutSeconds?(new Date()).getTime():0});
this.startWatchingInFlight();
}
if(_6a9.method.toLowerCase()=="post"){
http.open("POST",url,_6b4);
setHeaders(http,_6a9);
http.setRequestHeader("Content-Type",_6a9.multipart?("multipart/form-data; boundary="+this.multipartBoundary):(_6a9.contentType||"application/x-www-form-urlencoded"));
try{
http.send(_6ab);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_6a9,{status:404},url,_6ab,_6b6);
}
}else{
var _6bb=url;
if(_6ab!=""){
_6bb+=(_6bb.indexOf("?")>-1?"&":"?")+_6ab;
}
if(_6b5){
_6bb+=(dojo.string.endsWithAny(_6bb,"?","&")?"":(_6bb.indexOf("?")>-1?"&":"?"))+"dojo.preventCache="+new Date().valueOf();
}
http.open(_6a9.method.toUpperCase(),_6bb,_6b4);
setHeaders(http,_6a9);
try{
http.send(null);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_6a9,{status:404},url,_6ab,_6b6);
}
}
if(!_6b4){
doLoad(_6a9,http,url,_6ab,_6b6);
}
_6a9.abort=function(){
return http.abort();
};
return;
};
dojo.io.transports.addTransport("XMLHTTPTransport");
};
dojo.provide("dojo.io.cookie");
dojo.io.cookie.setCookie=function(name,_6bd,days,path,_6c0,_6c1){
var _6c2=-1;
if(typeof days=="number"&&days>=0){
var d=new Date();
d.setTime(d.getTime()+(days*24*60*60*1000));
_6c2=d.toGMTString();
}
_6bd=escape(_6bd);
document.cookie=name+"="+_6bd+";"+(_6c2!=-1?" expires="+_6c2+";":"")+(path?"path="+path:"")+(_6c0?"; domain="+_6c0:"")+(_6c1?"; secure":"");
};
dojo.io.cookie.set=dojo.io.cookie.setCookie;
dojo.io.cookie.getCookie=function(name){
var idx=document.cookie.lastIndexOf(name+"=");
if(idx==-1){
return null;
}
var _6c6=document.cookie.substring(idx+name.length+1);
var end=_6c6.indexOf(";");
if(end==-1){
end=_6c6.length;
}
_6c6=_6c6.substring(0,end);
_6c6=unescape(_6c6);
return _6c6;
};
dojo.io.cookie.get=dojo.io.cookie.getCookie;
dojo.io.cookie.deleteCookie=function(name){
dojo.io.cookie.setCookie(name,"-",0);
};
dojo.io.cookie.setObjectCookie=function(name,obj,days,path,_6cd,_6ce,_6cf){
if(arguments.length==5){
_6cf=_6cd;
_6cd=null;
_6ce=null;
}
var _6d0=[],cookie,value="";
if(!_6cf){
cookie=dojo.io.cookie.getObjectCookie(name);
}
if(days>=0){
if(!cookie){
cookie={};
}
for(var prop in obj){
if(prop==null){
delete cookie[prop];
}else{
if(typeof obj[prop]=="string"||typeof obj[prop]=="number"){
cookie[prop]=obj[prop];
}
}
}
prop=null;
for(var prop in cookie){
_6d0.push(escape(prop)+"="+escape(cookie[prop]));
}
value=_6d0.join("&");
}
dojo.io.cookie.setCookie(name,value,days,path,_6cd,_6ce);
};
dojo.io.cookie.getObjectCookie=function(name){
var _6d3=null,cookie=dojo.io.cookie.getCookie(name);
if(cookie){
_6d3={};
var _6d4=cookie.split("&");
for(var i=0;i<_6d4.length;i++){
var pair=_6d4[i].split("=");
var _6d7=pair[1];
if(isNaN(_6d7)){
_6d7=unescape(pair[1]);
}
_6d3[unescape(pair[0])]=_6d7;
}
}
return _6d3;
};
dojo.io.cookie.isSupported=function(){
if(typeof navigator.cookieEnabled!="boolean"){
dojo.io.cookie.setCookie("__TestingYourBrowserForCookieSupport__","CookiesAllowed",90,null);
var _6d8=dojo.io.cookie.getCookie("__TestingYourBrowserForCookieSupport__");
navigator.cookieEnabled=(_6d8=="CookiesAllowed");
if(navigator.cookieEnabled){
this.deleteCookie("__TestingYourBrowserForCookieSupport__");
}
}
return navigator.cookieEnabled;
};
if(!dojo.io.cookies){
dojo.io.cookies=dojo.io.cookie;
}
dojo.kwCompoundRequire({common:["dojo.io"],rhino:["dojo.io.RhinoIO"],browser:["dojo.io.BrowserIO","dojo.io.cookie"],dashboard:["dojo.io.BrowserIO","dojo.io.cookie"]});
dojo.provide("dojo.io.*");
dojo.provide("dojo.widget.ToolbarContainer");
dojo.provide("dojo.widget.html.ToolbarContainer");
dojo.provide("dojo.widget.Toolbar");
dojo.provide("dojo.widget.html.Toolbar");
dojo.provide("dojo.widget.ToolbarItem");
dojo.provide("dojo.widget.html.ToolbarButtonGroup");
dojo.provide("dojo.widget.html.ToolbarButton");
dojo.provide("dojo.widget.html.ToolbarDialog");
dojo.provide("dojo.widget.html.ToolbarMenu");
dojo.provide("dojo.widget.html.ToolbarSeparator");
dojo.provide("dojo.widget.html.ToolbarSpace");
dojo.provide("dojo.widget.Icon");
dojo.require("dojo.widget.*");
dojo.require("dojo.html");
dojo.widget.tags.addParseTreeHandler("dojo:toolbarContainer");
dojo.widget.html.ToolbarContainer=function(){
dojo.widget.HtmlWidget.call(this);
};
dojo.inherits(dojo.widget.html.ToolbarContainer,dojo.widget.HtmlWidget);
dojo.lang.extend(dojo.widget.html.ToolbarContainer,{widgetType:"ToolbarContainer",isContainer:true,templateString:"<div class=\"toolbarContainer\" dojoAttachPoint=\"containerNode\"></div>",templateCssPath:dojo.uri.dojoUri("src/widget/templates/HtmlToolbar.css"),getItem:function(name){
if(name instanceof dojo.widget.ToolbarItem){
return name;
}
for(var i=0;i<this.children.length;i++){
var _6db=this.children[i];
if(_6db instanceof dojo.widget.html.Toolbar){
var item=_6db.getItem(name);
if(item){
return item;
}
}
}
return null;
},getItems:function(){
var _6dd=[];
for(var i=0;i<this.children.length;i++){
var _6df=this.children[i];
if(_6df instanceof dojo.widget.html.Toolbar){
_6dd=_6dd.concat(_6df.getItems());
}
}
return _6dd;
},enable:function(){
for(var i=0;i<this.children.length;i++){
var _6e1=this.children[i];
if(_6e1 instanceof dojo.widget.html.Toolbar){
_6e1.enable.apply(_6e1,arguments);
}
}
},disable:function(){
for(var i=0;i<this.children.length;i++){
var _6e3=this.children[i];
if(_6e3 instanceof dojo.widget.html.Toolbar){
_6e3.disable.apply(_6e3,arguments);
}
}
},select:function(name){
for(var i=0;i<this.children.length;i++){
var _6e6=this.children[i];
if(_6e6 instanceof dojo.widget.html.Toolbar){
_6e6.select(arguments);
}
}
},deselect:function(name){
for(var i=0;i<this.children.length;i++){
var _6e9=this.children[i];
if(_6e9 instanceof dojo.widget.html.Toolbar){
_6e9.deselect(arguments);
}
}
},getItemsState:function(){
var _6ea={};
for(var i=0;i<this.children.length;i++){
var _6ec=this.children[i];
if(_6ec instanceof dojo.widget.html.Toolbar){
dojo.lang.mixin(_6ea,_6ec.getItemsState());
}
}
return _6ea;
},getItemsActiveState:function(){
var _6ed={};
for(var i=0;i<this.children.length;i++){
var _6ef=this.children[i];
if(_6ef instanceof dojo.widget.html.Toolbar){
dojo.lang.mixin(_6ed,_6ef.getItemsActiveState());
}
}
return _6ed;
},getItemsSelectedState:function(){
var _6f0={};
for(var i=0;i<this.children.length;i++){
var _6f2=this.children[i];
if(_6f2 instanceof dojo.widget.html.Toolbar){
dojo.lang.mixin(_6f0,_6f2.getItemsSelectedState());
}
}
return _6f0;
}});
dojo.widget.tags.addParseTreeHandler("dojo:toolbar");
dojo.widget.html.Toolbar=function(){
dojo.widget.HtmlWidget.call(this);
};
dojo.inherits(dojo.widget.html.Toolbar,dojo.widget.HtmlWidget);
dojo.lang.extend(dojo.widget.html.Toolbar,{widgetType:"Toolbar",isContainer:true,templateString:"<div class=\"toolbar\" dojoAttachPoint=\"containerNode\" unselectable=\"on\" dojoOnMouseover=\"_onmouseover\" dojoOnMouseout=\"_onmouseout\" dojoOnClick=\"_onclick\" dojoOnMousedown=\"_onmousedown\" dojoOnMouseup=\"_onmouseup\"></div>",_getItem:function(node){
var _6f4=new Date();
var _6f5=null;
while(node&&node!=this.domNode){
if(dojo.html.hasClass(node,"toolbarItem")){
var _6f6=dojo.widget.manager.getWidgetsByFilter(function(w){
return w.domNode==node;
});
if(_6f6.length==1){
_6f5=_6f6[0];
break;
}else{
if(_6f6.length>1){
dojo.raise("Toolbar._getItem: More than one widget matches the node");
}
}
}
node=node.parentNode;
}
return _6f5;
},_onmouseover:function(e){
var _6f9=this._getItem(e.target);
if(_6f9&&_6f9._onmouseover){
_6f9._onmouseover(e);
}
},_onmouseout:function(e){
var _6fb=this._getItem(e.target);
if(_6fb&&_6fb._onmouseout){
_6fb._onmouseout(e);
}
},_onclick:function(e){
var _6fd=this._getItem(e.target);
if(_6fd&&_6fd._onclick){
_6fd._onclick(e);
}
},_onmousedown:function(e){
var _6ff=this._getItem(e.target);
if(_6ff&&_6ff._onmousedown){
_6ff._onmousedown(e);
}
},_onmouseup:function(e){
var _701=this._getItem(e.target);
if(_701&&_701._onmouseup){
_701._onmouseup(e);
}
},addChild:function(item,pos,_704){
var _705=dojo.widget.ToolbarItem.make(item,null,_704);
var ret=dojo.widget.html.Toolbar.superclass.addChild.call(this,_705,null,pos,null);
return ret;
},push:function(){
for(var i=0;i<arguments.length;i++){
this.addChild(arguments[i]);
}
},getItem:function(name){
if(name instanceof dojo.widget.ToolbarItem){
return name;
}
for(var i=0;i<this.children.length;i++){
var _70a=this.children[i];
if(_70a instanceof dojo.widget.ToolbarItem&&_70a._name==name){
return _70a;
}
}
return null;
},getItems:function(){
var _70b=[];
for(var i=0;i<this.children.length;i++){
var _70d=this.children[i];
if(_70d instanceof dojo.widget.ToolbarItem){
_70b.push(_70d);
}
}
return _70b;
},getItemsState:function(){
var _70e={};
for(var i=0;i<this.children.length;i++){
var _710=this.children[i];
if(_710 instanceof dojo.widget.ToolbarItem){
_70e[_710._name]={selected:_710._selected,enabled:_710._enabled};
}
}
return _70e;
},getItemsActiveState:function(){
var _711=this.getItemsState();
for(var item in _711){
_711[item]=_711[item].enabled;
}
return _711;
},getItemsSelectedState:function(){
var _713=this.getItemsState();
for(var item in _713){
_713[item]=_713[item].selected;
}
return _713;
},enable:function(){
var _715=arguments.length?arguments:this.children;
for(var i=0;i<_715.length;i++){
var _717=this.getItem(_715[i]);
if(_717 instanceof dojo.widget.ToolbarItem){
_717.enable(false,true);
}
}
},disable:function(){
var _718=arguments.length?arguments:this.children;
for(var i=0;i<_718.length;i++){
var _71a=this.getItem(_718[i]);
if(_71a instanceof dojo.widget.ToolbarItem){
_71a.disable();
}
}
},select:function(){
for(var i=0;i<arguments.length;i++){
var name=arguments[i];
var item=this.getItem(name);
if(item){
item.select();
}
}
},deselect:function(){
for(var i=0;i<arguments.length;i++){
var name=arguments[i];
var item=this.getItem(name);
if(item){
item.disable();
}
}
},setValue:function(){
for(var i=0;i<arguments.length;i+=2){
var name=arguments[i],value=arguments[i+1];
var item=this.getItem(name);
if(item){
if(item instanceof dojo.widget.ToolbarItem){
item.setValue(value);
}
}
}
}});
dojo.widget.ToolbarItem=function(){
dojo.widget.HtmlWidget.call(this);
};
dojo.inherits(dojo.widget.ToolbarItem,dojo.widget.HtmlWidget);
dojo.lang.extend(dojo.widget.ToolbarItem,{templateString:"<span unselectable=\"on\" class=\"toolbarItem\"></span>",_name:null,getName:function(){
return this._name;
},setName:function(_724){
return this._name=_724;
},getValue:function(){
return this.getName();
},setValue:function(_725){
return this.setName(_725);
},_selected:false,isSelected:function(){
return this._selected;
},setSelected:function(is,_727,_728){
if(!this._toggleItem&&!_727){
return;
}
is=Boolean(is);
if(_727||this._enabled&&this._selected!=is){
this._selected=is;
this.update();
if(!_728){
this._fireEvent(is?"onSelect":"onDeselect");
this._fireEvent("onChangeSelect");
}
}
},select:function(_729,_72a){
return this.setSelected(true,_729,_72a);
},deselect:function(_72b,_72c){
return this.setSelected(false,_72b,_72c);
},_toggleItem:false,isToggleItem:function(){
return this._toggleItem;
},setToggleItem:function(_72d){
this._toggleItem=Boolean(_72d);
},toggleSelected:function(_72e){
return this.setSelected(!this._selected,_72e);
},_enabled:true,isEnabled:function(){
return this._enabled;
},setEnabled:function(is,_730,_731){
is=Boolean(is);
if(_730||this._enabled!=is){
this._enabled=is;
this.update();
if(!_731){
this._fireEvent(this._enabled?"onEnable":"onDisable");
this._fireEvent("onChangeEnabled");
}
}
return this._enabled;
},enable:function(_732,_733){
return this.setEnabled(true,_732,_733);
},disable:function(_734,_735){
return this.setEnabled(false,_734,_735);
},toggleEnabled:function(_736,_737){
return this.setEnabled(!this._enabled,_736,_737);
},_icon:null,getIcon:function(){
return this._icon;
},setIcon:function(_738){
var icon=dojo.widget.Icon.make(_738);
if(this._icon){
this._icon.setIcon(icon);
}else{
this._icon=icon;
}
var _73a=this._icon.getNode();
if(_73a.parentNode!=this.domNode){
if(this.domNode.hasChildNodes()){
this.domNode.insertBefore(_73a,this.domNode.firstChild);
}else{
this.domNode.appendChild(_73a);
}
}
return this._icon;
},_label:"",getLabel:function(){
return this._label;
},setLabel:function(_73b){
var ret=this._label=_73b;
if(!this.labelNode){
this.labelNode=document.createElement("span");
this.domNode.appendChild(this.labelNode);
}
this.labelNode.innerHTML="";
this.labelNode.appendChild(document.createTextNode(this._label));
this.update();
return ret;
},update:function(){
if(this._enabled){
dojo.html.removeClass(this.domNode,"disabled");
if(this._selected){
dojo.html.addClass(this.domNode,"selected");
}else{
dojo.html.removeClass(this.domNode,"selected");
}
}else{
this._selected=false;
dojo.html.addClass(this.domNode,"disabled");
dojo.html.removeClass(this.domNode,"down");
dojo.html.removeClass(this.domNode,"hover");
}
this._updateIcon();
},_updateIcon:function(){
if(this._icon){
if(this._enabled){
if(this._cssHover){
this._icon.hover();
}else{
if(this._selected){
this._icon.select();
}else{
this._icon.enable();
}
}
}else{
this._icon.disable();
}
}
},_fireEvent:function(evt){
if(typeof this[evt]=="function"){
var args=[this];
for(var i=1;i<arguments.length;i++){
args.push(arguments[i]);
}
this[evt].apply(this,args);
}
},_onmouseover:function(e){
if(!this._enabled){
return;
}
dojo.html.addClass(this.domNode,"hover");
},_onmouseout:function(e){
dojo.html.removeClass(this.domNode,"hover");
dojo.html.removeClass(this.domNode,"down");
if(!this._selected){
dojo.html.removeClass(this.domNode,"selected");
}
},_onclick:function(e){
if(this._enabled&&!this._toggleItem){
this._fireEvent("onClick");
}
},_onmousedown:function(e){
if(e.preventDefault){
e.preventDefault();
}
if(!this._enabled){
return;
}
dojo.html.addClass(this.domNode,"down");
if(this._toggleItem){
if(this.parent.preventDeselect&&this._selected){
return;
}
this.toggleSelected();
}
},_onmouseup:function(e){
dojo.html.removeClass(this.domNode,"down");
},fillInTemplate:function(args,frag){
if(args.name){
this._name=args.name;
}
if(args.selected){
this.select();
}
if(args.disabled){
this.disable();
}
if(args.label){
this.setLabel(args.label);
}
if(args.icon){
this.setIcon(args.icon);
}
if(args.toggleitem||args.toggleItem){
this.setToggleItem(true);
}
}});
dojo.widget.ToolbarItem.make=function(wh,_748,_749){
var item=null;
if(wh instanceof Array){
item=dojo.widget.createWidget("ToolbarButtonGroup",_749);
item.setName(wh[0]);
for(var i=1;i<wh.length;i++){
item.addChild(wh[i]);
}
}else{
if(wh instanceof dojo.widget.ToolbarItem){
item=wh;
}else{
if(wh instanceof dojo.uri.Uri){
item=dojo.widget.createWidget("ToolbarButton",dojo.lang.mixin(_749||{},{icon:new dojo.widget.Icon(wh.toString())}));
}else{
if(_748){
item=dojo.widget.createWidget(wh,_749);
}else{
if(typeof wh=="string"||wh instanceof String){
switch(wh.charAt(0)){
case "|":
case "-":
case "/":
item=dojo.widget.createWidget("ToolbarSeparator",_749);
break;
case " ":
if(wh.length==1){
item=dojo.widget.createWidget("ToolbarSpace",_749);
}else{
item=dojo.widget.createWidget("ToolbarFlexibleSpace",_749);
}
break;
default:
if(/\.(gif|jpg|jpeg|png)$/i.test(wh)){
item=dojo.widget.createWidget("ToolbarButton",dojo.lang.mixin(_749||{},{icon:new dojo.widget.Icon(wh.toString())}));
}else{
item=dojo.widget.createWidget("ToolbarButton",dojo.lang.mixin(_749||{},{label:wh.toString()}));
}
}
}else{
if(wh&&wh.tagName&&/^img$/i.test(wh.tagName)){
item=dojo.widget.createWidget("ToolbarButton",dojo.lang.mixin(_749||{},{icon:wh}));
}else{
item=dojo.widget.createWidget("ToolbarButton",dojo.lang.mixin(_749||{},{label:wh.toString()}));
}
}
}
}
}
}
return item;
};
dojo.widget.tags.addParseTreeHandler("dojo:toolbarButtonGroup");
dojo.widget.html.ToolbarButtonGroup=function(){
dojo.widget.ToolbarItem.call(this);
};
dojo.inherits(dojo.widget.html.ToolbarButtonGroup,dojo.widget.ToolbarItem);
dojo.lang.extend(dojo.widget.html.ToolbarButtonGroup,{widgetType:"ToolbarButtonGroup",isContainer:true,templateString:"<span unselectable=\"on\" class=\"toolbarButtonGroup\" dojoAttachPoint=\"containerNode\"></span>",defaultButton:"",postCreate:function(){
for(var i=0;i<this.children.length;i++){
this._injectChild(this.children[i]);
}
},addChild:function(item,pos,_74f){
var _750=dojo.widget.ToolbarItem.make(item,null,dojo.lang.mixin(_74f||{},{toggleItem:true}));
var ret=dojo.widget.html.ToolbarButtonGroup.superclass.addChild.call(this,_750,null,pos,null);
this._injectChild(_750);
return ret;
},_injectChild:function(_752){
dojo.event.connect(_752,"onSelect",this,"onChildSelected");
dojo.event.connect(_752,"onDeselect",this,"onChildDeSelected");
if(_752._name==this.defaultButton||(typeof this.defaultButton=="number"&&this.children.length-1==this.defaultButton)){
_752.select(false,true);
}
},getItem:function(name){
if(name instanceof dojo.widget.ToolbarItem){
return name;
}
for(var i=0;i<this.children.length;i++){
var _755=this.children[i];
if(_755 instanceof dojo.widget.ToolbarItem&&_755._name==name){
return _755;
}
}
return null;
},getItems:function(){
var _756=[];
for(var i=0;i<this.children.length;i++){
var _758=this.children[i];
if(_758 instanceof dojo.widget.ToolbarItem){
_756.push(_758);
}
}
return _756;
},onChildSelected:function(e){
this.select(e._name);
},onChildDeSelected:function(e){
this._fireEvent("onChangeSelect",this._value);
},enable:function(_75b,_75c){
for(var i=0;i<this.children.length;i++){
var _75e=this.children[i];
if(_75e instanceof dojo.widget.ToolbarItem){
_75e.enable(_75b,_75c);
if(_75e._name==this._value){
_75e.select(_75b,_75c);
}
}
}
},disable:function(_75f,_760){
for(var i=0;i<this.children.length;i++){
var _762=this.children[i];
if(_762 instanceof dojo.widget.ToolbarItem){
_762.disable(_75f,_760);
}
}
},_value:"",getValue:function(){
return this._value;
},select:function(name,_764,_765){
for(var i=0;i<this.children.length;i++){
var _767=this.children[i];
if(_767 instanceof dojo.widget.ToolbarItem){
if(_767._name==name){
_767.select(_764,_765);
this._value=name;
}else{
_767.deselect(true,true);
}
}
}
if(!_765){
this._fireEvent("onSelect",this._value);
this._fireEvent("onChangeSelect",this._value);
}
},setValue:this.select,preventDeselect:false});
dojo.widget.tags.addParseTreeHandler("dojo:toolbarButton");
dojo.widget.html.ToolbarButton=function(){
dojo.widget.ToolbarItem.call(this);
};
dojo.inherits(dojo.widget.html.ToolbarButton,dojo.widget.ToolbarItem);
dojo.lang.extend(dojo.widget.html.ToolbarButton,{widgetType:"ToolbarButton",fillInTemplate:function(args,frag){
dojo.widget.html.ToolbarButton.superclass.fillInTemplate.call(this,args,frag);
dojo.html.addClass(this.domNode,"toolbarButton");
if(this._icon){
this.setIcon(this._icon);
}
if(this._label){
this.setLabel(this._label);
}
if(!this._name){
if(this._label){
this.setName(this._label);
}else{
if(this._icon){
var src=this._icon.getSrc("enabled").match(/[\/^]([^\.\/]+)\.(gif|jpg|jpeg|png)$/i);
if(src){
this.setName(src[1]);
}
}else{
this._name=this._widgetId;
}
}
}
}});
dojo.widget.tags.addParseTreeHandler("dojo:toolbarDialog");
dojo.widget.html.ToolbarDialog=function(){
dojo.widget.html.ToolbarButton.call(this);
};
dojo.inherits(dojo.widget.html.ToolbarDialog,dojo.widget.html.ToolbarButton);
dojo.lang.extend(dojo.widget.html.ToolbarDialog,{widgetType:"ToolbarDialog",fillInTemplate:function(args,frag){
dojo.widget.html.ToolbarDialog.superclass.fillInTemplate.call(this,args,frag);
dojo.event.connect(this,"onSelect",this,"showDialog");
dojo.event.connect(this,"onDeselect",this,"hideDialog");
},showDialog:function(e){
dojo.lang.setTimeout(dojo.event.connect,1,document,"onmousedown",this,"deselect");
},hideDialog:function(e){
dojo.event.disconnect(document,"onmousedown",this,"deselect");
}});
dojo.widget.tags.addParseTreeHandler("dojo:toolbarMenu");
dojo.widget.html.ToolbarMenu=function(){
dojo.widget.html.ToolbarDialog.call(this);
this.widgetType="ToolbarMenu";
};
dojo.inherits(dojo.widget.html.ToolbarMenu,dojo.widget.html.ToolbarDialog);
dojo.widget.ToolbarMenuItem=function(){
};
dojo.widget.tags.addParseTreeHandler("dojo:toolbarSeparator");
dojo.widget.html.ToolbarSeparator=function(){
dojo.widget.ToolbarItem.call(this);
};
dojo.inherits(dojo.widget.html.ToolbarSeparator,dojo.widget.ToolbarItem);
dojo.lang.extend(dojo.widget.html.ToolbarSeparator,{widgetType:"ToolbarSeparator",templateString:"<span unselectable=\"on\" class=\"toolbarItem toolbarSeparator\"></span>",defaultIconPath:new dojo.uri.dojoUri("src/widget/templates/buttons/-.gif"),fillInTemplate:function(args,frag,skip){
dojo.widget.html.ToolbarSeparator.superclass.fillInTemplate.call(this,args,frag);
this._name=this.widgetId;
if(!skip){
if(!this._icon){
this.setIcon(this.defaultIconPath);
}
this.domNode.appendChild(this._icon.getNode());
}
},_onmouseover:null,_onmouseout:null,_onclick:null,_onmousedown:null,_onmouseup:null});
dojo.widget.tags.addParseTreeHandler("dojo:toolbarSpace");
dojo.widget.html.ToolbarSpace=function(){
dojo.widget.html.ToolbarSeparator.call(this);
};
dojo.inherits(dojo.widget.html.ToolbarSpace,dojo.widget.html.ToolbarSeparator);
dojo.lang.extend(dojo.widget.html.ToolbarSpace,{widgetType:"ToolbarSpace",fillInTemplate:function(args,frag,skip){
dojo.widget.html.ToolbarSpace.superclass.fillInTemplate.call(this,args,frag,true);
if(!skip){
dojo.html.addClass(this.domNode,"toolbarSpace");
}
}});
dojo.widget.tags.addParseTreeHandler("dojo:toolbarSelect");
dojo.widget.html.ToolbarSelect=function(){
dojo.widget.ToolbarItem.call(this);
};
dojo.inherits(dojo.widget.html.ToolbarSelect,dojo.widget.ToolbarItem);
dojo.lang.extend(dojo.widget.html.ToolbarSelect,{widgetType:"ToolbarSelect",templateString:"<span class=\"toolbarItem toolbarSelect\" unselectable=\"on\"><select dojoAttachPoint=\"selectBox\" dojoOnChange=\"changed\"></select></span>",fillInTemplate:function(args,frag){
dojo.widget.html.ToolbarSelect.superclass.fillInTemplate.call(this,args,frag,true);
var keys=args.values;
var i=0;
for(var val in keys){
var opt=document.createElement("option");
opt.setAttribute("value",keys[val]);
opt.innerHTML=val;
this.selectBox.appendChild(opt);
}
},changed:function(e){
this._fireEvent("onSetValue",this.selectBox.value);
},setEnabled:function(is,_77d,_77e){
var ret=dojo.widget.html.ToolbarSelect.superclass.setEnabled.call(this,is,_77d,_77e);
this.selectBox.disabled=!this._enabled;
return ret;
},_onmouseover:null,_onmouseout:null,_onclick:null,_onmousedown:null,_onmouseup:null});
dojo.widget.Icon=function(_780,_781,_782,_783){
if(!arguments.length){
throw new Error("Icon must have at least an enabled state");
}
var _784=["enabled","disabled","hover","selected"];
var _785="enabled";
var _786=document.createElement("img");
this.getState=function(){
return _785;
};
this.setState=function(_787){
if(dojo.lang.inArray(_787,_784)){
if(this[_787]){
_785=_787;
_786.setAttribute("src",this[_785].src);
}
}else{
throw new Error("Invalid state set on Icon (state: "+_787+")");
}
};
this.setSrc=function(_788,_789){
if(/^img$/i.test(_789.tagName)){
this[_788]=_789;
}else{
if(typeof _789=="string"||_789 instanceof String||_789 instanceof dojo.uri.Uri){
this[_788]=new Image();
this[_788].src=_789.toString();
}
}
return this[_788];
};
this.setIcon=function(icon){
for(var i=0;i<_784.length;i++){
if(icon[_784[i]]){
this.setSrc(_784[i],icon[_784[i]]);
}
}
this.update();
};
this.enable=function(){
this.setState("enabled");
};
this.disable=function(){
this.setState("disabled");
};
this.hover=function(){
this.setState("hover");
};
this.select=function(){
this.setState("selected");
};
this.getSize=function(){
return {width:_786.width||_786.offsetWidth,height:_786.height||_786.offsetHeight};
};
this.setSize=function(w,h){
_786.width=w;
_786.height=h;
return {width:w,height:h};
};
this.getNode=function(){
return _786;
};
this.getSrc=function(_78e){
if(_78e){
return this[_78e].src;
}
return _786.src||"";
};
this.update=function(){
this.setState(_785);
};
for(var i=0;i<_784.length;i++){
var arg=arguments[i];
var _791=_784[i];
this[_791]=null;
if(!arg){
continue;
}
this.setSrc(_791,arg);
}
this.enable();
};
dojo.widget.Icon.make=function(a,b,c,d){
for(var i=0;i<arguments.length;i++){
if(arguments[i] instanceof dojo.widget.Icon){
return arguments[i];
}
}
return new dojo.widget.Icon(a,b,c,d);
};
dojo.provide("dojo.widget.RichText");
dojo.provide("dojo.widget.html.RichText");
dojo.require("dojo.widget.*");
dojo.require("dojo.dom");
dojo.require("dojo.html");
dojo.require("dojo.event.*");
dojo.require("dojo.style");
dojo.require("dojo.string");
try{
document.write("<textarea id=\"dojo.widget.RichText.savedContent\" "+"style=\"display:none;position:absolute;top:-100px;left:-100px;height:3px;width:3px;overflow:hidden;\"></textarea>");
}
catch(e){
}
dojo.widget.defineWidget("dojo.widget.html.RichText",dojo.widget.HtmlWidget,{inheritWidth:false,focusOnLoad:true,saveName:"",_content:"",height:null,minHeight:"1em",isClosed:true,isLoaded:false,useActiveX:false,relativeImageUrls:false,_SEPARATOR:"@@**%%__RICHTEXTBOUNDRY__%%**@@",fillInTemplate:function(){
this.open();
var _797=["queryCommandEnabled","queryCommandState","queryCommandValue","execCommand"];
for(var i=0;i<_797.length;i++){
dojo.event.connect("around",this,_797[i],this,"_normalizeCommand");
}
dojo.event.connect(this,"onKeyPressed",this,"afterKeyPress");
dojo.event.connect(this,"onKeyPress",this,"keyPress");
dojo.event.connect(this,"onKeyDown",this,"keyDown");
dojo.event.connect(this,"onKeyUp",this,"keyUp");
var ctrl=this.KEY_CTRL;
var exec=function(cmd,arg){
return arguments.length==1?function(){
this.execCommand(cmd);
}:function(){
this.execCommand(cmd,arg);
};
};
this.addKeyHandler("b",ctrl,exec("bold"));
this.addKeyHandler("i",ctrl,exec("italic"));
this.addKeyHandler("u",ctrl,exec("underline"));
this.addKeyHandler("a",ctrl,exec("selectall"));
this.addKeyHandler("s",ctrl,function(){
this.save(true);
});
this.addKeyHandler("1",ctrl,exec("formatblock","h1"));
this.addKeyHandler("2",ctrl,exec("formatblock","h2"));
this.addKeyHandler("3",ctrl,exec("formatblock","h3"));
this.addKeyHandler("4",ctrl,exec("formatblock","h4"));
this.addKeyHandler("\\",ctrl,exec("insertunorderedlist"));
if(!dojo.render.html.ie){
this.addKeyHandler("Z",ctrl,exec("redo"));
}
},events:["onBlur","onFocus","onKeyPress","onKeyDown","onKeyUp","onClick"],open:function(_79d){
dojo.event.topic.publish("dojo.widget.RichText::open",this);
if(!this.isClosed){
this.close();
}
this._content="";
if((arguments.length==1)&&(_79d["nodeName"])){
this.domNode=_79d;
}
if((this.domNode["nodeName"])&&(this.domNode.nodeName.toLowerCase()=="textarea")){
this.textarea=this.domNode;
var html=dojo.string.trim(this.textarea.value);
if(html==""){
html="&nbsp;";
}
this.domNode=document.createElement("div");
with(this.textarea.style){
display="block";
position="absolute";
width="1px";
height="1px";
border=margin=padding="0px";
visiblity="hidden";
if(dojo.render.html.ie){
overflow="hidden";
}
}
dojo.dom.insertBefore(this.domNode,this.textarea);
this.domNode.innerHTML=html;
if(this.textarea.form){
dojo.event.connect(this.textarea.form,"onsubmit",dojo.lang.hitch(this,function(){
this.textarea.value=this.getEditorContent();
}));
}
var _79f=this;
dojo.event.connect(this,"postCreate",function(){
dojo.dom.insertAfter(_79f.textarea,_79f.domNode);
});
}else{
var html=dojo.string.trim(this.domNode.innerHTML);
if(html==""){
html="&nbsp;";
}
}
this._oldHeight=dojo.style.getContentHeight(this.domNode);
this._oldWidth=dojo.style.getContentWidth(this.domNode);
this._firstChildContributingMargin=this._getContributingMargin(this.domNode,"top");
this._lastChildContributingMargin=this._getContributingMargin(this.domNode,"bottom");
this.savedContent=document.createElement("div");
while(this.domNode.hasChildNodes()){
this.savedContent.appendChild(this.domNode.firstChild);
}
if((this.domNode["nodeName"])&&(this.domNode.nodeName=="LI")){
this.domNode.innerHTML=" <br>";
}
if(this.saveName!=""){
var _7a0=document.getElementById("dojo.widget.RichText.savedContent");
if(_7a0.value!=""){
var _7a1=_7a0.value.split(this._SEPARATOR);
for(var i=0;i<_7a1.length;i++){
var data=_7a1[i].split(":");
if(data[0]==this.saveName){
html=data[1];
_7a1.splice(i,1);
break;
}
}
}
dojo.event.connect("before",window,"onunload",this,"_saveContent");
}
if(this.useActiveX&&dojo.render.html.ie){
this._drawObject(html);
}else{
if(dojo.render.html.ie){
this.editNode=document.createElement("div");
with(this.editNode){
innerHTML=html;
contentEditable=true;
style.height=this.height?this.height:this.minHeight;
}
if(this.height){
this.editNode.style.overflowY="scroll";
}
this.domNode.appendChild(this.editNode);
dojo.lang.forEach(this.events,function(e){
dojo.event.connect(this.editNode,e.toLowerCase(),this,e);
},this);
this.window=window;
this.document=document;
this.onLoad();
}else{
this._drawIframe(html);
}
}
if(this.domNode.nodeName=="LI"){
this.domNode.lastChild.style.marginTop="-1.2em";
}
dojo.html.addClass(this.domNode,"RichTextEditable");
this.isClosed=false;
},_hasCollapseableMargin:function(_7a5,side){
if(dojo.style.getPixelValue(_7a5,"border-"+side+"-width",false)){
return false;
}else{
if(dojo.style.getPixelValue(_7a5,"padding-"+side,false)){
return false;
}else{
return true;
}
}
},_getContributingMargin:function(_7a7,_7a8){
if(_7a8=="top"){
var _7a9="previousSibling";
var _7aa="nextSibling";
var _7ab="firstChild";
var _7ac="margin-top";
var _7ad="margin-bottom";
}else{
var _7a9="nextSibling";
var _7aa="previousSibling";
var _7ab="lastChild";
var _7ac="margin-bottom";
var _7ad="margin-top";
}
var _7ae=dojo.style.getPixelValue(_7a7,_7ac,false);
function isSignificantNode(_7af){
return !(_7af.nodeType==3&&dojo.string.isBlank(_7af.data))&&dojo.style.getStyle(_7af,"display")!="none"&&!dojo.style.isPositionAbsolute(_7af);
}
var _7b0=0;
var _7b1=_7a7[_7ab];
while(_7b1){
while((!isSignificantNode(_7b1))&&_7b1[_7aa]){
_7b1=_7b1[_7aa];
}
_7b0=Math.max(_7b0,dojo.style.getPixelValue(_7b1,_7ac,false));
if(!this._hasCollapseableMargin(_7b1,_7a8)){
break;
}
_7b1=_7b1[_7ab];
}
if(!this._hasCollapseableMargin(_7a7,_7a8)){
return parseInt(_7b0);
}
var _7b2=0;
var _7b3=_7a7[_7a9];
while(_7b3){
if(isSignificantNode(_7b3)){
_7b2=dojo.style.getPixelValue(_7b3,_7ad,false);
break;
}
_7b3=_7b3[_7a9];
}
if(!_7b3){
_7b2=dojo.style.getPixelValue(_7a7.parentNode,_7ac,false);
}
if(_7b0>_7ae){
return parseInt(Math.max((_7b0-_7ae)-_7b2,0));
}else{
return 0;
}
},_drawIframe:function(html){
var _7b5=Boolean(dojo.render.html.moz&&(typeof window.XML=="undefined"));
if(!this.iframe){
var _7b6=(new dojo.uri.Uri(document.location)).host;
this.iframe=document.createElement("iframe");
with(this.iframe){
scrolling=this.height?"auto":"no";
style.border="none";
style.lineHeight="0";
style.verticalAlign="bottom";
}
}
this.iframe.src=dojo.uri.dojoUri("src/widget/templates/richtextframe.html")+"#"+((document.domain!=_7b6)?document.domain:"");
this.iframe.width=this.inheritWidth?this._oldWidth:"100%";
if(this.height){
this.iframe.style.height=this.height;
}else{
var _7b7=this._oldHeight;
if(this._hasCollapseableMargin(this.domNode,"top")){
_7b7+=this._firstChildContributingMargin;
}
if(this._hasCollapseableMargin(this.domNode,"bottom")){
_7b7+=this._lastChildContributingMargin;
}
this.iframe.height=_7b7;
}
var _7b8=document.createElement("div");
_7b8.innerHTML=html;
if(this.relativeImageUrls){
var imgs=_7b8.getElementsByTagName("img");
for(var i=0;i<imgs.length;i++){
imgs[i].src=(new dojo.uri.Uri(window.location,imgs[i].src)).toString();
}
html=_7b8.innerHTML;
}
var _7bb=dojo.dom.firstElement(_7b8);
var _7bc=dojo.dom.lastElement(_7b8);
if(_7bb){
_7bb.style.marginTop=this._firstChildContributingMargin+"px";
}
if(_7bc){
_7bc.style.marginBottom=this._lastChildContributingMargin+"px";
}
_7b8.style.position="absolute";
this.domNode.appendChild(_7b8);
this.domNode.appendChild(this.iframe);
var _7bd=false;
var _7be=dojo.lang.hitch(this,function(){
if(!_7bd){
_7bd=true;
}else{
return;
}
if(!this.editNode){
if(this.iframe.contentWindow){
this.window=this.iframe.contentWindow;
}else{
this.window=this.iframe.contentDocument.window;
}
if(dojo.render.html.moz){
this.document=this.iframe.contentWindow.document;
}else{
this.document=this.iframe.contentDocument;
}
var _7bf=(function(_7c0){
return function(_7c1){
return dojo.style.getStyle(_7c0,_7c1);
};
})(this.domNode);
var font=_7bf("font-weight")+" "+_7bf("font-size")+" "+_7bf("font-family");
var _7c3="1.0";
var _7c4=dojo.style.getUnitValue(this.domNode,"line-height");
if(_7c4.value&&_7c4.units==""){
_7c3=_7c4.value;
}
dojo.style.insertCssText("    body,html { background: transparent; padding: 0; margin: 0; }\n"+"    body { top: 0; left: 0; right: 0;"+(this.height?"":" position: fixed; ")+"        font: "+font+";\n"+"        min-height: "+this.minHeight+"; \n"+"        line-height: "+_7c3+"} \n"+"    p { margin: 1em 0 !important; }\n"+"    body > *:first-child { padding-top: 0 !important; margin-top: "+this._firstChildContributingMargin+"px !important; }\n"+"    body > *:last-child { padding-bottom: 0 !important; margin-bottom: "+this._lastChildContributingMargin+"px !important; }\n"+"    li > ul:-moz-first-node, li > ol:-moz-first-node { padding-top: 1.2em; }\n"+"    li { min-height: 1.2em; }\n"+"",this.document);
_7b8.parentNode.removeChild(_7b8);
this.document.body.innerHTML=html;
if(_7b5){
this.document.designMode="on";
}
this.onLoad();
}else{
_7b8.parentNode.removeChild(_7b8);
this.editNode.innerHTML=html;
this.onDisplayChanged();
}
});
if(this.editNode){
_7be();
}else{
if(dojo.render.html.moz){
this.iframe.onload=function(){
setTimeout(_7be,250);
};
}else{
this.iframe.onload=_7be;
}
}
},_drawObject:function(html){
this.object=document.createElement("object");
with(this.object){
classid="clsid:2D360201-FFF5-11D1-8D03-00A0C959BC0A";
width=this.inheritWidth?this._oldWidth:"100%";
style.height=this.height?this.height:(this._oldHeight+"px");
Scrollbars=this.height?true:false;
Appearance=this._activeX.appearance.flat;
}
this.domNode.appendChild(this.object);
this.object.attachEvent("DocumentComplete",dojo.lang.hitch(this,"onLoad"));
this.object.attachEvent("DisplayChanged",dojo.lang.hitch(this,"_updateHeight"));
this.object.attachEvent("DisplayChanged",dojo.lang.hitch(this,"onDisplayChanged"));
dojo.lang.forEach(this.events,function(e){
this.object.attachEvent(e.toLowerCase(),dojo.lang.hitch(this,e));
},this);
this.object.DocumentHTML="<!doctype HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">"+"<title></title>"+"<style type=\"text/css\">"+"    body,html { padding: 0; margin: 0; }"+(this.height?"":"    body { overflow: hidden; }")+"</style>"+"<body><div id=\"bodywrapper\">"+html+"</div></body>";
},_isResized:function(){
return false;
},onLoad:function(e){
this.isLoaded=true;
if(this.object){
this.document=this.object.DOM;
this.window=this.document.parentWindow;
this.editNode=this.document.body.firstChild;
this.domNode.style.height=this.height?this.height:this.minHeight;
this.connect(this,"onDisplayChanged","_updateHeight");
}else{
if(this.iframe){
this.editNode=this.document.body;
this.connect(this,"onDisplayChanged","_updateHeight");
try{
this.document.execCommand("useCSS",false,true);
this.document.execCommand("styleWithCSS",false,false);
}
catch(e2){
}
if(dojo.render.html.safari){
this.connect(this.editNode,"onblur","onBlur");
this.connect(this.editNode,"onfocus","onFocus");
this.interval=setInterval(dojo.lang.hitch(this,"onDisplayChanged"),750);
}else{
if(dojo.render.html.mozilla||dojo.render.html.opera){
var doc=this.document;
var _7c9=dojo.event.browser.addListener(this.document,"blur",dojo.lang.hitch(this,"onBlur"));
var _7ca={unBlur:function(e){
dojo.event.browser.removeListener(doc,"blur",_7c9);
}};
dojo.event.connect("before",this,"close",_7ca,"unBlur");
dojo.event.browser.addListener(this.document,"focus",dojo.lang.hitch(this,"onFocus"));
var _7cc=dojo.event.browser.addListener;
_7cc(this.document,"keypress",dojo.lang.hitch(this,"onKeyPress"));
_7cc(this.document,"keydown",dojo.lang.hitch(this,"onKeyDown"));
_7cc(this.document,"keyup",dojo.lang.hitch(this,"onKeyUp"));
_7cc(this.document,"click",dojo.lang.hitch(this,"onClick"));
}
}
}else{
if(dojo.render.html.ie){
this.editNode.style.zoom=1;
}
}
}
if(this.focusOnLoad){
this.focus();
}
this.onDisplayChanged(e);
},onKeyDown:function(e){
if((!e)&&(this.object)){
e=dojo.event.browser.fixEvent(this.window.event);
}
dojo.debug("onkeydown:",e.keyCode);
if((dojo.render.html.ie)&&(e.keyCode==e.KEY_TAB)){
e.preventDefault();
e.stopPropagation();
this.execCommand((e.shiftKey?"outdent":"indent"));
}else{
if(dojo.render.html.ie){
if((65<=e.keyCode)&&(e.keyCode<=90)){
e.charCode=e.keyCode;
this.onKeyPress(e);
}
}
}
},onKeyUp:function(e){
return;
},KEY_CTRL:1,onKeyPress:function(e){
if((!e)&&(this.object)){
e=dojo.event.browser.fixEvent(this.window.event);
}
var _7d0=e.charCode>0?String.fromCharCode(e.charCode):null;
var code=e.keyCode;
var _7d2=e.ctrlKey?this.KEY_CTRL:0;
if(this._keyHandlers[_7d0]){
dojo.debug("char:",_7d0);
var _7d3=this._keyHandlers[_7d0],i=0,handler;
while(handler=_7d3[i++]){
if(_7d2==handler.modifiers){
handler.handler.call(this);
e.preventDefault();
break;
}
}
}
dojo.lang.setTimeout(this,this.onKeyPressed,1,e);
},addKeyHandler:function(key,_7d5,_7d6){
if(!(this._keyHandlers[key] instanceof Array)){
this._keyHandlers[key]=[];
}
this._keyHandlers[key].push({modifiers:_7d5||0,handler:_7d6});
},onKeyPressed:function(e){
this.onDisplayChanged();
},onClick:function(e){
this.onDisplayChanged(e);
},onBlur:function(e){
},_initialFocus:true,onFocus:function(e){
if((dojo.render.html.mozilla)&&(this._initialFocus)){
this._initialFocus=false;
if(dojo.string.trim(this.editNode.innerHTML)=="&nbsp;"){
this.execCommand("selectall");
this.window.getSelection().collapseToStart();
}
}
},blur:function(){
if(this.iframe){
this.window.blur();
}else{
if(this.editNode){
this.editNode.blur();
}
}
},focus:function(){
if(this.iframe){
this.window.focus();
}else{
if(this.editNode){
this.editNode.focus();
}
}
},onDisplayChanged:function(e){
},_activeX:{command:{bold:5000,italic:5023,underline:5048,justifycenter:5024,justifyleft:5025,justifyright:5026,cut:5003,copy:5002,paste:5032,"delete":5004,undo:5049,redo:5033,removeformat:5034,selectall:5035,unlink:5050,indent:5018,outdent:5031,insertorderedlist:5030,insertunorderedlist:5051,inserttable:5022,insertcell:5019,insertcol:5020,insertrow:5021,deletecells:5005,deletecols:5006,deleterows:5007,mergecells:5029,splitcell:5047,setblockformat:5043,getblockformat:5011,getblockformatnames:5012,setfontname:5044,getfontname:5013,setfontsize:5045,getfontsize:5014,setbackcolor:5042,getbackcolor:5010,setforecolor:5046,getforecolor:5015,findtext:5008,font:5009,hyperlink:5016,image:5017,lockelement:5027,makeabsolute:5028,sendbackward:5036,bringforward:5037,sendbelowtext:5038,bringabovetext:5039,sendtoback:5040,bringtofront:5041,properties:5052},ui:{"default":0,prompt:1,noprompt:2},status:{notsupported:0,disabled:1,enabled:3,latched:7,ninched:11},appearance:{flat:0,inset:1},state:{unchecked:0,checked:1,gray:2}},_normalizeCommand:function(_7dc){
var drh=dojo.render.html;
var _7de=_7dc.args[0].toLowerCase();
if(_7de=="formatblock"){
if(drh.safari){
_7de="heading";
}
if(drh.ie){
_7dc.args[1]="<"+_7dc.args[1]+">";
}
}
if(_7de=="hilitecolor"&&!drh.mozilla){
_7de="backcolor";
}
_7dc.args[0]=_7de;
if(_7dc.args.length>1){
var _7df=_7dc.args[1];
if(_7de=="heading"){
throw new Error("unimplemented");
}
_7dc.args[1]=_7df;
}
return _7dc.proceed();
},queryCommandAvailable:function(_7e0){
var ie=1;
var _7e2=1<<1;
var _7e3=1<<2;
var _7e4=1<<3;
function isSupportedBy(_7e5){
return {ie:Boolean(_7e5&ie),mozilla:Boolean(_7e5&_7e2),safari:Boolean(_7e5&_7e3),opera:Boolean(_7e5&_7e4)};
}
var _7e6=null;
switch(_7e0.toLowerCase()){
case "bold":
case "italic":
case "underline":
case "subscript":
case "superscript":
case "fontname":
case "fontsize":
case "forecolor":
case "hilitecolor":
case "justifycenter":
case "justifyfull":
case "justifyleft":
case "justifyright":
case "delete":
case "undo":
case "redo":
_7e6=isSupportedBy(_7e2|ie|_7e3|_7e4);
break;
case "createlink":
case "unlink":
case "removeformat":
case "inserthorizontalrule":
case "insertimage":
case "insertorderedlist":
case "insertunorderedlist":
case "indent":
case "outdent":
case "formatblock":
case "inserthtml":
_7e6=isSupportedBy(_7e2|ie|_7e4);
break;
case "strikethrough":
_7e6=isSupportedBy(_7e2|_7e4|(this.object?0:ie));
break;
case "blockdirltr":
case "blockdirrtl":
case "dirltr":
case "dirrtl":
case "inlinedirltr":
case "inlinedirrtl":
case "cut":
case "copy":
case "paste":
_7e6=isSupportedBy(ie);
break;
case "inserttable":
_7e6=isSupportedBy(_7e2|(this.object?ie:0));
break;
case "insertcell":
case "insertcol":
case "insertrow":
case "deletecells":
case "deletecols":
case "deleterows":
case "mergecells":
case "splitcell":
_7e6=isSupportedBy(this.object?ie:0);
break;
default:
return false;
}
return (dojo.render.html.ie&&_7e6.ie)||(dojo.render.html.mozilla&&_7e6.mozilla)||(dojo.render.html.safari&&_7e6.safari)||(dojo.render.html.opera&&_7e6.opera);
},execCommand:function(_7e7,_7e8){
var _7e9;
if(this.object){
if(_7e7=="forecolor"){
_7e7="setforecolor";
}else{
if(_7e7=="backcolor"){
_7e7="setbackcolor";
}
}
if(_7e7=="inserttable"){
var _7ea=this.constructor._tableInfo;
if(!_7ea){
_7ea=document.createElement("object");
_7ea.classid="clsid:47B0DFC7-B7A3-11D1-ADC5-006008A5848C";
document.body.appendChild(_7ea);
this.constructor._table=_7ea;
}
_7ea.NumRows=_7e8["rows"];
_7ea.NumCols=_7e8["cols"];
_7ea.TableAttrs=_7e8["TableAttrs"];
_7ea.CellAttrs=_7e8["CellAttrs"];
_7ea.Caption=_7e8["Caption"];
}
if(_7e7=="inserthtml"){
var _7eb=this.document.selection.createRange();
_7eb.select();
_7eb.pasteHTML(_7e8);
_7eb.collapse(true);
return true;
}else{
if(arguments.length==1){
return this.object.ExecCommand(this._activeX.command[_7e7],this._activeX.ui.noprompt);
}else{
return this.object.ExecCommand(this._activeX.command[_7e7],this._activeX.ui.noprompt,_7e8);
}
}
}else{
if(_7e7=="inserthtml"){
if(dojo.render.html.ie){
dojo.debug("inserthtml breaks the undo stack when not using the ActiveX version of the control!");
var _7eb=this.document.selection.createRange();
_7eb.select();
_7eb.pasteHTML(_7e8);
_7eb.collapse(true);
return true;
}else{
return this.document.execCommand(_7e7,false,_7e8);
}
}else{
if((_7e7=="unlink")&&(this.queryCommandEnabled("unlink"))&&(dojo.render.html.mozilla)){
var _7ec=this.window.getSelection();
var _7ed=_7ec.getRangeAt(0);
var _7ee=_7ed.startContainer;
var _7ef=_7ed.startOffset;
var _7f0=_7ed.endContainer;
var _7f1=_7ed.endOffset;
var _7f2=document.createRange();
var a=this.getSelectedNode();
while(a.nodeName!="A"){
a=a.parentNode;
}
_7f2.selectNode(a);
_7ec.removeAllRanges();
_7ec.addRange(_7f2);
_7e9=this.document.execCommand("unlink",false,null);
var _7ed=document.createRange();
_7ed.setStart(_7ee,_7ef);
_7ed.setEnd(_7f0,_7f1);
_7ec.removeAllRanges();
_7ec.addRange(_7ed);
return _7e9;
}else{
if((_7e7=="inserttable")&&(dojo.render.html.mozilla)){
var cols="<tr>";
for(var i=0;i<_7e8.cols;i++){
cols+="<td></td>";
}
cols+="</tr>";
var _7f6="<table><tbody>";
for(var i=0;i<_7e8.rows;i++){
_7f6+=cols;
}
_7f6+="</tbody></table>";
_7e9=this.document.execCommand("inserthtml",false,_7f6);
}else{
if((_7e7=="hilitecolor")&&(dojo.render.html.mozilla)){
this.document.execCommand("useCSS",false,false);
_7e9=this.document.execCommand(_7e7,false,_7e8);
this.document.execCommand("useCSS",false,true);
}else{
if((dojo.render.html.ie)&&((_7e7=="backcolor")||(_7e7=="forecolor"))){
var tr=this.document.selection.createRange();
_7e8=arguments.length>1?_7e8:null;
_7e9=this.document.execCommand(_7e7,false,_7e8);
setTimeout(function(){
tr.select();
},1);
}else{
_7e8=arguments.length>1?_7e8:null;
if(dojo.render.html.moz){
this.document=this.iframe.contentWindow.document;
}
_7e9=this.document.execCommand(_7e7,false,_7e8);
}
}
}
}
}
}
this.onDisplayChanged();
return _7e9;
},queryCommandEnabled:function(_7f8,_7f9){
if(this.object){
if(_7f8=="forecolor"){
_7f8="setforecolor";
}else{
if(_7f8=="backcolor"){
_7f8="setbackcolor";
}
}
if(typeof this._activeX.command[_7f8]=="undefined"){
return false;
}
var _7fa=this.object.QueryStatus(this._activeX.command[_7f8]);
return ((_7fa!=this.activeX.status.notsupported)&&(_7fa!=this.activeX.status.diabled));
}else{
if(_7f8=="unlink"&&dojo.render.html.mozilla){
var node=this.getSelectedNode();
while(node.parentNode&&node.nodeName!="A"){
node=node.parentNode;
}
return node.nodeName=="A";
}else{
if(_7f8=="inserttable"&&dojo.render.html.mozilla){
return true;
}
}
var elem=(dojo.render.html.ie)?this.document.selection.createRange():this.document;
return elem.queryCommandEnabled(_7f8);
}
},queryCommandState:function(_7fd,_7fe){
if(this.object){
if(_7fd=="forecolor"){
_7fd="setforecolor";
}else{
if(_7fd=="backcolor"){
_7fd="setbackcolor";
}
}
if(typeof this._activeX.command[_7fd]=="undefined"){
return null;
}
var _7ff=this.object.QueryStatus(this._activeX.command[_7fd]);
return ((_7ff==this._activeX.status.enabled)||(_7ff==this._activeX.status.ninched));
}else{
return this.document.queryCommandState(_7fd);
}
},queryCommandValue:function(_800,_801){
if(this.object){
switch(_800){
case "forecolor":
case "backcolor":
case "fontsize":
case "fontname":
case "blockformat":
_800="get"+_800;
return this.object.execCommand(this._activeX.command[_800],this._activeX.ui.noprompt);
}
}else{
return this.document.queryCommandValue(_800);
}
},getSelectedNode:function(){
if(!this.isLoaded){
return;
}
if(this.document.selection){
return this.document.selection.createRange().parentElement();
}else{
if(dojo.render.html.mozilla){
return this.window.getSelection().getRangeAt(0).commonAncestorContainer;
}
}
return this.editNode;
},placeCursorAtStart:function(){
if(!this.isLoaded){
dojo.event.connect(this,"onLoad",this,"placeCursorAtEnd");
return;
}
dojo.event.disconnect(this,"onLoad",this,"placeCursorAtEnd");
if(this.window.getSelection){
var _802=this.window.getSelection;
if(_802.removeAllRanges){
var _803=this.document.createRange();
_803.selectNode(this.editNode.firstChild);
_803.collapse(true);
var _802=this.window.getSelection();
_802.removeAllRanges();
_802.addRange(_803);
}else{
}
}else{
if(this.document.selection){
var _803=this.document.body.createTextRange();
_803.moveToElementText(this.editNode);
_803.collapse(true);
_803.select();
}
}
},replaceEditorContent:function(html){
if(this.window.getSelection){
var _805=this.window.getSelection;
if(dojo.render.html.moz){
var _806=this.document.createRange();
_806.selectNodeContents(this.editNode);
var _805=this.window.getSelection();
_805.removeAllRanges();
_805.addRange(_806);
this.execCommand("inserthtml",html);
}else{
this.editNode.innerHTML=html;
}
}else{
if(this.document.selection){
var _806=this.document.body.createTextRange();
_806.moveToElementText(this.editNode);
_806.select();
this.execCommand("inserthtml",html);
}
}
},placeCursorAtEnd:function(){
if(!this.isLoaded){
dojo.event.connect(this,"onLoad",this,"placeCursorAtEnd");
return;
}
dojo.event.disconnect(this,"onLoad",this,"placeCursorAtEnd");
if(this.window.getSelection){
var _807=this.window.getSelection;
if(_807.removeAllRanges){
var _808=this.document.createRange();
_808.selectNode(this.editNode.lastChild);
_808.collapse(false);
var _807=this.window.getSelection();
_807.removeAllRanges();
_807.addRange(_808);
}else{
}
}else{
if(this.document.selection){
var _808=this.document.body.createTextRange();
_808.moveToElementText(this.editNode);
_808.collapse(true);
_808.select();
}
}
},_lastHeight:0,_updateHeight:function(){
if(!this.isLoaded){
return;
}
if(this.height){
return;
}
if(this.iframe){
var _809=["margin-top","margin-bottom","padding-bottom","padding-top","border-width-bottom","border-width-top"];
for(var i=0,chromeheight=0;i<_809.length;i++){
var _80b=dojo.style.getStyle(this.iframe,_809[i]);
if(_80b){
chromeheight+=Number(_80b.replace(/[^0-9]/g,""));
}
}
if(this.document.body["offsetHeight"]){
this._lastHeight=Math.max(this.document.body.scrollHeight,this.document.body.offsetHeight)+chromeheight;
this.iframe.height=this._lastHeight+"px";
this.window.scrollTo(0,0);
}
}else{
if(this.object){
this.object.style.height=dojo.style.getInnerHeight(this.editNode)+"px";
}
}
},_saveContent:function(e){
var _80d=document.getElementById("dojo.widget.RichText.savedContent");
_80d.value+=this._SEPARATOR+this.saveName+":"+this.getEditorContent();
},getEditorContent:function(){
var ec="";
try{
ec=(this._content.length>0)?this._content:this.editNode.innerHTML;
if(dojo.string.trim(ec)=="&nbsp;"){
ec="";
}
}
catch(e){
}
dojo.lang.forEach(this.contentFilters,function(ef){
ec=ef(ec);
});
if(this.relativeImageUrls){
var _810=window.location.protocol+"//"+window.location.host;
var _811=window.location.pathname;
if(_811.match(/\/$/)){
}else{
var _812=_811.split("/");
if(_812.length){
_812.pop();
}
_811=_812.join("/")+"/";
}
var _813=new RegExp("(<img[^>]* src=[\"'])("+_810+"("+_811+")?)","ig");
ec=ec.replace(_813,"$1");
}
return ec;
},close:function(save,_815){
if(this.isClosed){
return false;
}
if(arguments.length==0){
save=true;
}
this._content=this.editNode.innerHTML;
var _816=(this.savedContent.innerHTML!=this._content);
if(this.interval){
clearInterval(this.interval);
}
if(dojo.render.html.ie&&!this.object){
dojo.event.browser.clean(this.editNode);
}
if(this.iframe){
delete this.iframe;
}
this.domNode.innerHTML="";
if(save){
dojo.event.browser.clean(this.savedContent);
if(dojo.render.html.moz){
var nc=document.createElement("span");
this.domNode.appendChild(nc);
nc.innerHTML=this.editNode.innerHTML;
}else{
this.domNode.innerHTML=this._content;
}
}else{
while(this.savedContent.hasChildNodes()){
this.domNode.appendChild(this.savedContent.firstChild);
}
}
delete this.savedContent;
dojo.html.removeClass(this.domNode,"RichTextEditable");
this.isClosed=true;
this.isLoaded=false;
delete this.editNode;
return _816;
},destroyRendering:function(){
},destroy:function(){
this.destroyRendering();
if(!this.isClosed){
this.close(false);
}
while(this._connected.length){
this.disconnect(this._connected[0],this._connected[1],this._connected[2]);
}
},_connected:[],connect:function(_818,_819,_81a){
dojo.event.connect(_818,_819,this,_81a);
},disconnect:function(_81b,_81c,_81d){
for(var i=0;i<this._connected.length;i++){
if(this._connected[0]==_81b&&this._connected[1]==_81c&&this._connected[2]==_81d){
dojo.event.disconnect(_81b,_81c,this,_81d);
this._connected.splice(i,1);
break;
}
}
},disconnectAllWithRoot:function(_81f){
for(var i=0;i<this._connected.length;i++){
if(this._connected[0]==_81f){
dojo.event.disconnect(_81f,this._connected[1],this,this._connected[2]);
this._connected.splice(i,1);
}
}
}},"html",function(){
this.contentFilters=[];
this._keyHandlers={};
});
dojo.provide("dojo.widget.ColorPalette");
dojo.provide("dojo.widget.html.ColorPalette");
dojo.require("dojo.widget.*");
dojo.require("dojo.widget.Toolbar");
dojo.require("dojo.html");
dojo.widget.tags.addParseTreeHandler("dojo:ToolbarColorDialog");
dojo.widget.html.ToolbarColorDialog=function(){
dojo.widget.html.ToolbarDialog.call(this);
};
dojo.inherits(dojo.widget.html.ToolbarColorDialog,dojo.widget.html.ToolbarDialog);
dojo.lang.extend(dojo.widget.html.ToolbarColorDialog,{widgetType:"ToolbarColorDialog",palette:"7x10",fillInTemplate:function(args,frag){
dojo.widget.html.ToolbarColorDialog.superclass.fillInTemplate.call(this,args,frag);
this.dialog=dojo.widget.createWidget("ColorPalette",{palette:this.palette});
this.dialog.domNode.style.position="absolute";
dojo.event.connect(this.dialog,"onColorSelect",this,"_setValue");
},_setValue:function(_823){
this._value=_823;
this._fireEvent("onSetValue",_823);
},showDialog:function(e){
dojo.widget.html.ToolbarColorDialog.superclass.showDialog.call(this,e);
var x=dojo.html.getAbsoluteX(this.domNode);
var y=dojo.html.getAbsoluteY(this.domNode)+dojo.html.getInnerHeight(this.domNode);
this.dialog.showAt(x,y);
},hideDialog:function(e){
dojo.widget.html.ToolbarColorDialog.superclass.hideDialog.call(this,e);
this.dialog.hide();
}});
dojo.widget.tags.addParseTreeHandler("dojo:colorpalette");
dojo.widget.html.ColorPalette=function(){
dojo.widget.HtmlWidget.call(this);
};
dojo.inherits(dojo.widget.html.ColorPalette,dojo.widget.HtmlWidget);
dojo.lang.extend(dojo.widget.html.ColorPalette,{widgetType:"colorpalette",palette:"7x10",bgIframe:null,palettes:{"7x10":[["fff","fcc","fc9","ff9","ffc","9f9","9ff","cff","ccf","fcf"],["ccc","f66","f96","ff6","ff3","6f9","3ff","6ff","99f","f9f"],["c0c0c0","f00","f90","fc6","ff0","3f3","6cc","3cf","66c","c6c"],["999","c00","f60","fc3","fc0","3c0","0cc","36f","63f","c3c"],["666","900","c60","c93","990","090","399","33f","60c","939"],["333","600","930","963","660","060","366","009","339","636"],["000","300","630","633","330","030","033","006","309","303"]],"3x4":[["ffffff","00ff00","008000","0000ff"],["c0c0c0","ffff00","ff00ff","000080"],["808080","ff0000","800080","000000"]]},buildRendering:function(){
this.domNode=document.createElement("table");
dojo.html.disableSelection(this.domNode);
dojo.event.connect(this.domNode,"onmousedown",function(e){
e.preventDefault();
});
with(this.domNode){
cellPadding="0";
cellSpacing="1";
border="1";
style.backgroundColor="white";
}
var _829=document.createElement("tbody");
this.domNode.appendChild(_829);
var _82a=this.palettes[this.palette];
for(var i=0;i<_82a.length;i++){
var tr=document.createElement("tr");
for(var j=0;j<_82a[i].length;j++){
if(_82a[i][j].length==3){
_82a[i][j]=_82a[i][j].replace(/(.)(.)(.)/,"$1$1$2$2$3$3");
}
var td=document.createElement("td");
with(td.style){
backgroundColor="#"+_82a[i][j];
border="1px solid gray";
width=height="15px";
fontSize="1px";
}
td.color="#"+_82a[i][j];
td.onmouseover=function(e){
this.style.borderColor="white";
};
td.onmouseout=function(e){
this.style.borderColor="gray";
};
dojo.event.connect(td,"onmousedown",this,"click");
td.innerHTML="&nbsp;";
tr.appendChild(td);
}
_829.appendChild(tr);
}
if(dojo.render.html.ie){
this.bgIframe=document.createElement("<iframe frameborder='0' src='javascript:void(0);'>");
with(this.bgIframe.style){
position="absolute";
left=top="0px";
display="none";
}
document.body.appendChild(this.bgIframe);
dojo.style.setOpacity(this.bgIframe,0);
}
},click:function(e){
this.onColorSelect(e.currentTarget.color);
e.currentTarget.style.borderColor="gray";
},onColorSelect:function(_832){
},hide:function(){
this.domNode.parentNode.removeChild(this.domNode);
if(this.bgIframe){
this.bgIframe.style.display="none";
}
},showAt:function(x,y){
with(this.domNode.style){
top=y+"px";
left=x+"px";
zIndex=999;
}
document.body.appendChild(this.domNode);
if(this.bgIframe){
with(this.bgIframe.style){
display="block";
top=y+"px";
left=x+"px";
zIndex=998;
width=dojo.html.getOuterWidth(this.domNode)+"px";
height=dojo.html.getOuterHeight(this.domNode)+"px";
}
}
}});
dojo.provide("dojo.widget.Editor");
dojo.provide("dojo.widget.html.Editor");
dojo.require("dojo.io.*");
dojo.require("dojo.widget.*");
dojo.require("dojo.widget.Toolbar");
dojo.require("dojo.widget.RichText");
dojo.require("dojo.widget.ColorPalette");
dojo.require("dojo.string.extras");
dojo.widget.tags.addParseTreeHandler("dojo:Editor");
dojo.widget.html.Editor=function(){
dojo.widget.HtmlWidget.call(this);
this.contentFilters=[];
this._toolbars=[];
};
dojo.inherits(dojo.widget.html.Editor,dojo.widget.HtmlWidget);
dojo.widget.html.Editor.itemGroups={textGroup:["bold","italic","underline","strikethrough"],blockGroup:["formatBlock","fontName","fontSize"],justifyGroup:["justifyleft","justifycenter","justifyright"],commandGroup:["save","cancel"],colorGroup:["forecolor","hilitecolor"],listGroup:["insertorderedlist","insertunorderedlist"],indentGroup:["outdent","indent"],linkGroup:["createlink","insertimage","inserthorizontalrule"]};
dojo.widget.html.Editor.formatBlockValues={"Normal":"p","Main heading":"h2","Sub heading":"h3","Sub sub heading":"h4","Preformatted":"pre"};
dojo.widget.html.Editor.fontNameValues={"Arial":"Arial, Helvetica, sans-serif","Verdana":"Verdana, sans-serif","Times New Roman":"Times New Roman, serif","Courier":"Courier New, monospace"};
dojo.widget.html.Editor.fontSizeValues={"1 (8 pt)":"1","2 (10 pt)":"2","3 (12 pt)":"3","4 (14 pt)":"4","5 (18 pt)":"5","6 (24 pt)":"6","7 (36 pt)":"7"};
dojo.widget.html.Editor.defaultItems=["commandGroup","|","blockGroup","|","textGroup","|","colorGroup","|","justifyGroup","|","listGroup","indentGroup","|","linkGroup"];
dojo.widget.html.Editor.supportedCommands=["save","cancel","|","-","/"," "];
dojo.lang.extend(dojo.widget.html.Editor,{widgetType:"Editor",saveUrl:"",saveMethod:"post",saveArgName:"editorContent",closeOnSave:false,items:dojo.widget.html.Editor.defaultItems,formatBlockItems:dojo.lang.shallowCopy(dojo.widget.html.Editor.formatBlockValues),fontNameItems:dojo.lang.shallowCopy(dojo.widget.html.Editor.fontNameValues),fontSizeItems:dojo.lang.shallowCopy(dojo.widget.html.Editor.fontSizeValues),getItemProperties:function(name){
var _836={};
switch(name.toLowerCase()){
case "bold":
case "italic":
case "underline":
case "strikethrough":
_836.toggleItem=true;
break;
case "justifygroup":
_836.defaultButton="justifyleft";
_836.preventDeselect=true;
_836.buttonGroup=true;
break;
case "listgroup":
_836.buttonGroup=true;
break;
case "save":
case "cancel":
_836.label=dojo.string.capitalize(name);
break;
case "forecolor":
case "hilitecolor":
_836.name=name;
_836.toggleItem=true;
_836.icon=this.getCommandImage(name);
break;
case "formatblock":
_836.name="formatBlock";
_836.values=this.formatBlockItems;
break;
case "fontname":
_836.name="fontName";
_836.values=this.fontNameItems;
case "fontsize":
_836.name="fontSize";
_836.values=this.fontSizeItems;
}
return _836;
},validateItems:true,focusOnLoad:true,minHeight:"1em",_richText:null,_richTextType:"RichText",_toolbarContainer:null,_toolbarContainerType:"ToolbarContainer",_toolbars:[],_toolbarType:"Toolbar",_toolbarItemType:"ToolbarItem",buildRendering:function(args,frag){
var node=frag["dojo:"+this.widgetType.toLowerCase()]["nodeRef"];
var trt=dojo.widget.createWidget(this._richTextType,{focusOnLoad:this.focusOnLoad,minHeight:this.minHeight},node);
var _83b=this;
setTimeout(function(){
_83b.setRichText(trt);
_83b.initToolbar();
_83b.fillInTemplate(args,frag);
},0);
},setRichText:function(_83c){
if(this._richText&&this._richText==_83c){
dojo.debug("Already set the richText to this richText!");
return;
}
if(this._richText&&!this._richText.isClosed){
dojo.debug("You are switching richTexts yet you haven't closed the current one. Losing reference!");
}
this._richText=_83c;
dojo.event.connect(this._richText,"close",this,"onClose");
dojo.event.connect(this._richText,"onLoad",this,"onLoad");
dojo.event.connect(this._richText,"onDisplayChanged",this,"updateToolbar");
if(this._toolbarContainer){
this._toolbarContainer.enable();
this.updateToolbar(true);
}
},initToolbar:function(){
if(this._toolbarContainer){
return;
}
this._toolbarContainer=dojo.widget.createWidget(this._toolbarContainerType);
var tb=this.addToolbar();
var last=true;
for(var i=0;i<this.items.length;i++){
if(this.items[i]=="\n"){
tb=this.addToolbar();
}else{
if((this.items[i]=="|")&&(!last)){
last=true;
}else{
last=this.addItem(this.items[i],tb);
}
}
}
this.insertToolbar(this._toolbarContainer.domNode,this._richText.domNode);
},insertToolbar:function(_840,_841){
dojo.html.insertBefore(_840,_841);
},addToolbar:function(_842){
this.initToolbar();
if(!(_842 instanceof dojo.widget.html.Toolbar)){
_842=dojo.widget.createWidget(this._toolbarType);
}
this._toolbarContainer.addChild(_842);
this._toolbars.push(_842);
return _842;
},addItem:function(item,tb,_845){
if(!tb){
tb=this._toolbars[0];
}
var cmd=((item)&&(!dojo.lang.isUndefined(item["getValue"])))?cmd=item["getValue"]():item;
var _847=dojo.widget.html.Editor.itemGroups;
if(item instanceof dojo.widget.ToolbarItem){
tb.addChild(item);
}else{
if(_847[cmd]){
var _848=_847[cmd];
var _849=true;
if(cmd=="justifyGroup"||cmd=="listGroup"){
var _84a=[cmd];
for(var i=0;i<_848.length;i++){
if(_845||this.isSupportedCommand(_848[i])){
_84a.push(this.getCommandImage(_848[i]));
}else{
_849=false;
}
}
if(_84a.length){
var btn=tb.addChild(_84a,null,this.getItemProperties(cmd));
dojo.event.connect(btn,"onClick",this,"_action");
dojo.event.connect(btn,"onChangeSelect",this,"_action");
}
return _849;
}else{
for(var i=0;i<_848.length;i++){
if(!this.addItem(_848[i],tb)){
_849=false;
}
}
return _849;
}
}else{
if((!_845)&&(!this.isSupportedCommand(cmd))){
return false;
}
if(_845||this.isSupportedCommand(cmd)){
cmd=cmd.toLowerCase();
if(cmd=="formatblock"){
var _84d=dojo.widget.createWidget("ToolbarSelect",{name:"formatBlock",values:this.formatBlockItems});
tb.addChild(_84d);
var _84e=this;
dojo.event.connect(_84d,"onSetValue",function(item,_850){
_84e.onAction("formatBlock",_850);
});
}else{
if(cmd=="fontname"){
var _84d=dojo.widget.createWidget("ToolbarSelect",{name:"fontName",values:this.fontNameItems});
tb.addChild(_84d);
dojo.event.connect(_84d,"onSetValue",dojo.lang.hitch(this,function(item,_852){
this.onAction("fontName",_852);
}));
}else{
if(cmd=="fontsize"){
var _84d=dojo.widget.createWidget("ToolbarSelect",{name:"fontSize",values:this.fontSizeItems});
tb.addChild(_84d);
dojo.event.connect(_84d,"onSetValue",dojo.lang.hitch(this,function(item,_854){
this.onAction("fontSize",_854);
}));
}else{
if(dojo.lang.inArray(cmd,["forecolor","hilitecolor"])){
var btn=tb.addChild(dojo.widget.createWidget("ToolbarColorDialog",this.getItemProperties(cmd)));
dojo.event.connect(btn,"onSetValue",this,"_setValue");
}else{
var btn=tb.addChild(this.getCommandImage(cmd),null,this.getItemProperties(cmd));
if(cmd=="save"){
dojo.event.connect(btn,"onClick",this,"_save");
}else{
if(cmd=="cancel"){
dojo.event.connect(btn,"onClick",this,"_close");
}else{
dojo.event.connect(btn,"onClick",this,"_action");
dojo.event.connect(btn,"onChangeSelect",this,"_action");
}
}
}
}
}
}
}
}
}
return true;
},enableToolbar:function(){
if(this._toolbarContainer){
this._toolbarContainer.domNode.style.display="";
this._toolbarContainer.enable();
}
},disableToolbar:function(hide){
if(hide){
if(this._toolbarContainer){
this._toolbarContainer.domNode.style.display="none";
}
}else{
if(this._toolbarContainer){
this._toolbarContainer.disable();
}
}
},_updateToolbarLastRan:null,_updateToolbarTimer:null,_updateToolbarFrequency:500,updateToolbar:function(_856){
if(!this._toolbarContainer){
return;
}
var diff=new Date()-this._updateToolbarLastRan;
if(!_856&&this._updateToolbarLastRan&&(diff<this._updateToolbarFrequency)){
clearTimeout(this._updateToolbarTimer);
var _858=this;
this._updateToolbarTimer=setTimeout(function(){
_858.updateToolbar();
},this._updateToolbarFrequency/2);
return;
}else{
this._updateToolbarLastRan=new Date();
}
var _859=this._toolbarContainer.getItems();
for(var i=0;i<_859.length;i++){
var item=_859[i];
if(item instanceof dojo.widget.html.ToolbarSeparator){
continue;
}
var cmd=item._name;
if(cmd=="save"||cmd=="cancel"){
continue;
}else{
if(cmd=="justifyGroup"){
try{
if(!this._richText.queryCommandEnabled("justifyleft")){
item.disable(false,true);
}else{
item.enable(false,true);
var _85d=item.getItems();
for(var j=0;j<_85d.length;j++){
var name=_85d[j]._name;
var _860=this._richText.queryCommandValue(name);
if(typeof _860=="boolean"&&_860){
_860=name;
break;
}else{
if(typeof _860=="string"){
_860="justify"+_860;
}else{
_860=null;
}
}
}
if(!_860){
_860="justifyleft";
}
item.setValue(_860,false,true);
}
}
catch(err){
}
}else{
if(cmd=="listGroup"){
var _861=item.getItems();
for(var j=0;j<_861.length;j++){
this.updateItem(_861[j]);
}
}else{
this.updateItem(item);
}
}
}
}
},updateItem:function(item){
try{
var cmd=item._name;
var _864=this._richText.queryCommandEnabled(cmd);
item.setEnabled(_864,false,true);
var _865=this._richText.queryCommandState(cmd);
if(_865&&cmd=="underline"){
_865=!this._richText.queryCommandEnabled("unlink");
}
item.setSelected(_865,false,true);
return true;
}
catch(err){
return false;
}
},supportedCommands:dojo.widget.html.Editor.supportedCommands.concat(),isSupportedCommand:function(cmd){
var yes=dojo.lang.inArray(cmd,this.supportedCommands);
if(!yes){
try{
var _868=this._richText||dojo.widget.HtmlRichText.prototype;
yes=_868.queryCommandAvailable(cmd);
}
catch(E){
}
}
return yes;
},getCommandImage:function(cmd){
if(cmd=="|"){
return cmd;
}else{
return dojo.uri.dojoUri("src/widget/templates/buttons/"+cmd+".gif");
}
},_action:function(e){
this._fire("onAction",e.getValue());
},_setValue:function(a,b){
this._fire("onAction",a.getValue(),b);
},_save:function(e){
if(!this._richText.isClosed){
if(this.saveUrl.length){
var _86e={};
_86e[this.saveArgName]=this.getHtml();
dojo.io.bind({method:this.saveMethod,url:this.saveUrl,content:_86e});
}else{
dojo.debug("please set a saveUrl for the editor");
}
if(this.closeOnSave){
this._richText.close(e.getName().toLowerCase()=="save");
}
}
},_close:function(e){
if(!this._richText.isClosed){
this._richText.close(e.getName().toLowerCase()=="save");
}
},onAction:function(cmd,_871){
switch(cmd){
case "createlink":
if(!(_871=prompt("Please enter the URL of the link:","http://"))){
return;
}
break;
case "insertimage":
if(!(_871=prompt("Please enter the URL of the image:","http://"))){
return;
}
break;
}
this._richText.execCommand(cmd,_871);
},fillInTemplate:function(args,frag){
},_fire:function(_874){
if(dojo.lang.isFunction(this[_874])){
var args=[];
if(arguments.length==1){
args.push(this);
}else{
for(var i=1;i<arguments.length;i++){
args.push(arguments[i]);
}
}
this[_874].apply(this,args);
}
},getHtml:function(){
this._richText.contentFilters=this._richText.contentFilters.concat(this.contentFilters);
return this._richText.getEditorContent();
},getEditorContent:function(){
return this.getHtml();
},onClose:function(save,hide){
this.disableToolbar(hide);
if(save){
this._fire("onSave");
}else{
this._fire("onCancel");
}
},onLoad:function(){
},onSave:function(){
},onCancel:function(){
}});
dojo.provide("dojo.lang.type");
dojo.require("dojo.lang.common");
dojo.lang.whatAmI=function(wh){
try{
if(dojo.lang.isArray(wh)){
return "array";
}
if(dojo.lang.isFunction(wh)){
return "function";
}
if(dojo.lang.isString(wh)){
return "string";
}
if(dojo.lang.isNumber(wh)){
return "number";
}
if(dojo.lang.isBoolean(wh)){
return "boolean";
}
if(dojo.lang.isAlien(wh)){
return "alien";
}
if(dojo.lang.isUndefined(wh)){
return "undefined";
}
for(var name in dojo.lang.whatAmI.custom){
if(dojo.lang.whatAmI.custom[name](wh)){
return name;
}
}
if(dojo.lang.isObject(wh)){
return "object";
}
}
catch(E){
}
return "unknown";
};
dojo.lang.whatAmI.custom={};
dojo.lang.isNumeric=function(wh){
return (!isNaN(wh)&&isFinite(wh)&&(wh!=null)&&!dojo.lang.isBoolean(wh)&&!dojo.lang.isArray(wh));
};
dojo.lang.isBuiltIn=function(wh){
return (dojo.lang.isArray(wh)||dojo.lang.isFunction(wh)||dojo.lang.isString(wh)||dojo.lang.isNumber(wh)||dojo.lang.isBoolean(wh)||(wh==null)||(wh instanceof Error)||(typeof wh=="error"));
};
dojo.lang.isPureObject=function(wh){
return ((wh!=null)&&dojo.lang.isObject(wh)&&wh.constructor==Object);
};
dojo.lang.isOfType=function(_87e,type){
if(dojo.lang.isArray(type)){
var _880=type;
for(var i in _880){
var _882=_880[i];
if(dojo.lang.isOfType(_87e,_882)){
return true;
}
}
return false;
}else{
if(dojo.lang.isString(type)){
type=type.toLowerCase();
}
switch(type){
case Array:
case "array":
return dojo.lang.isArray(_87e);
break;
case Function:
case "function":
return dojo.lang.isFunction(_87e);
break;
case String:
case "string":
return dojo.lang.isString(_87e);
break;
case Number:
case "number":
return dojo.lang.isNumber(_87e);
break;
case "numeric":
return dojo.lang.isNumeric(_87e);
break;
case Boolean:
case "boolean":
return dojo.lang.isBoolean(_87e);
break;
case Object:
case "object":
return dojo.lang.isObject(_87e);
break;
case "pureobject":
return dojo.lang.isPureObject(_87e);
break;
case "builtin":
return dojo.lang.isBuiltIn(_87e);
break;
case "alien":
return dojo.lang.isAlien(_87e);
break;
case "undefined":
return dojo.lang.isUndefined(_87e);
break;
case null:
case "null":
return (_87e===null);
break;
case "optional":
return ((_87e===null)||dojo.lang.isUndefined(_87e));
break;
default:
if(dojo.lang.isFunction(type)){
return (_87e instanceof type);
}else{
dojo.raise("dojo.lang.isOfType() was passed an invalid type");
}
break;
}
}
dojo.raise("If we get here, it means a bug was introduced above.");
};
dojo.lang.getObject=function(str){
var _884=str.split("."),i=0,obj=dj_global;
do{
obj=obj[_884[i++]];
}while(i<_884.length&&obj);
return (obj!=dj_global)?obj:null;
};
dojo.lang.doesObjectExist=function(str){
var _886=str.split("."),i=0,obj=dj_global;
do{
obj=obj[_886[i++]];
}while(i<_886.length&&obj);
return (obj&&obj!=dj_global);
};
dojo.provide("dojo.lang.assert");
dojo.require("dojo.lang.common");
dojo.require("dojo.lang.array");
dojo.require("dojo.lang.type");
dojo.lang.assert=function(_887,_888){
if(!_887){
var _889="An assert statement failed.\n"+"The method dojo.lang.assert() was called with a 'false' value.\n";
if(_888){
_889+="Here's the assert message:\n"+_888+"\n";
}
throw new Error(_889);
}
};
dojo.lang.assertType=function(_88a,type,_88c){
if(!dojo.lang.isOfType(_88a,type)){
if(!_88c){
if(!dojo.lang.assertType._errorMessage){
dojo.lang.assertType._errorMessage="Type mismatch: dojo.lang.assertType() failed.";
}
_88c=dojo.lang.assertType._errorMessage;
}
dojo.lang.assert(false,_88c);
}
};
dojo.lang.assertValidKeywords=function(_88d,_88e,_88f){
var key;
if(!_88f){
if(!dojo.lang.assertValidKeywords._errorMessage){
dojo.lang.assertValidKeywords._errorMessage="In dojo.lang.assertValidKeywords(), found invalid keyword:";
}
_88f=dojo.lang.assertValidKeywords._errorMessage;
}
if(dojo.lang.isArray(_88e)){
for(key in _88d){
if(!dojo.lang.inArray(_88e,key)){
dojo.lang.assert(false,_88f+" "+key);
}
}
}else{
for(key in _88d){
if(!(key in _88e)){
dojo.lang.assert(false,_88f+" "+key);
}
}
}
};
dojo.provide("dojo.AdapterRegistry");
dojo.require("dojo.lang.func");
dojo.AdapterRegistry=function(){
this.pairs=[];
};
dojo.lang.extend(dojo.AdapterRegistry,{register:function(name,_892,wrap,_894){
if(_894){
this.pairs.unshift([name,_892,wrap]);
}else{
this.pairs.push([name,_892,wrap]);
}
},match:function(){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[1].apply(this,arguments)){
return pair[2].apply(this,arguments);
}
}
throw new Error("No match found");
},unregister:function(name){
for(var i=0;i<this.pairs.length;i++){
var pair=this.pairs[i];
if(pair[0]==name){
this.pairs.splice(i,1);
return true;
}
}
return false;
}});
dojo.provide("dojo.lang.repr");
dojo.require("dojo.lang.common");
dojo.require("dojo.AdapterRegistry");
dojo.require("dojo.string.extras");
dojo.lang.reprRegistry=new dojo.AdapterRegistry();
dojo.lang.registerRepr=function(name,_89b,wrap,_89d){
dojo.lang.reprRegistry.register(name,_89b,wrap,_89d);
};
dojo.lang.repr=function(obj){
if(typeof (obj)=="undefined"){
return "undefined";
}else{
if(obj===null){
return "null";
}
}
try{
if(typeof (obj["__repr__"])=="function"){
return obj["__repr__"]();
}else{
if((typeof (obj["repr"])=="function")&&(obj.repr!=arguments.callee)){
return obj["repr"]();
}
}
return dojo.lang.reprRegistry.match(obj);
}
catch(e){
if(typeof (obj.NAME)=="string"&&(obj.toString==Function.prototype.toString||obj.toString==Object.prototype.toString)){
return o.NAME;
}
}
if(typeof (obj)=="function"){
obj=(obj+"").replace(/^\s+/,"");
var idx=obj.indexOf("{");
if(idx!=-1){
obj=obj.substr(0,idx)+"{...}";
}
}
return obj+"";
};
dojo.lang.reprArrayLike=function(arr){
try{
var na=dojo.lang.map(arr,dojo.lang.repr);
return "["+na.join(", ")+"]";
}
catch(e){
}
};
dojo.lang.reprString=function(str){
dojo.deprecated("dojo.lang.reprNumber","use `String(num)` instead","0.4");
return dojo.string.escapeString(str);
};
dojo.lang.reprNumber=function(num){
dojo.deprecated("dojo.lang.reprNumber","use `String(num)` instead","0.4");
return num+"";
};
(function(){
var m=dojo.lang;
m.registerRepr("arrayLike",m.isArrayLike,m.reprArrayLike);
m.registerRepr("string",m.isString,m.reprString);
m.registerRepr("numbers",m.isNumber,m.reprNumber);
m.registerRepr("boolean",m.isBoolean,m.reprNumber);
})();
dojo.kwCompoundRequire({common:["dojo.lang","dojo.lang.common","dojo.lang.assert","dojo.lang.array","dojo.lang.type","dojo.lang.func","dojo.lang.extras","dojo.lang.repr","dojo.lang.declare"]});
dojo.provide("dojo.lang.*");
dojo.provide("dojo.widget.Editor2Toolbar");
dojo.provide("dojo.widget.html.Editor2Toolbar");
dojo.require("dojo.lang.*");
dojo.require("dojo.widget.*");
dojo.require("dojo.event.*");
dojo.require("dojo.widget.RichText");
dojo.require("dojo.widget.ColorPalette");
dojo.widget.defineWidget("dojo.widget.html.Editor2Toolbar",dojo.widget.HtmlWidget,{commandList:["bold","italic","underline","subscript","superscript","fontname","fontsize","forecolor","hilitecolor","justifycenter","justifyfull","justifyleft","justifyright","cut","copy","paste","delete","undo","redo","createlink","unlink","removeformat","inserthorizontalrule","insertimage","insertorderedlist","insertunorderedlist","indent","outdent","formatblock","strikethrough","inserthtml","blockdirltr","blockdirrtl","dirltr","dirrtl","inlinedirltr","inlinedirrtl","inserttable","insertcell","insertcol","insertrow","deletecells","deletecols","deleterows","mergecells","splitcell"],templatePath:dojo.uri.dojoUri("src/widget/templates/HtmlEditorToolbar.html"),templateCssPath:dojo.uri.dojoUri("src/widget/templates/HtmlEditorToolbar.css"),forecolorPalette:null,hilitecolorPalette:null,wikiwordButton:null,htmltoggleButton:null,insertimageButton:null,styleDropdownButton:null,styleDropdownContainer:null,copyButton:null,boldButton:null,italicButton:null,underlineButton:null,justifycenterButton:null,justifyleftButton:null,justifyfullButton:null,justifyrightButton:null,pasteButton:null,undoButton:null,redoButton:null,linkButton:null,insertunorderedlistButton:null,insertorderedlistButton:null,forecolorButton:null,forecolorDropDown:null,hilitecolorButton:null,hilitecolorDropDown:null,formatSelectBox:null,inserthorizontalruleButton:null,strikethroughButton:null,clickInterceptDiv:null,oneLineTr:null,buttonClick:function(e){
e.preventDefault();
},buttonMouseOver:function(e){
},buttonMouseOut:function(e){
},preventSelect:function(e){
if(dojo.render.html.safari){
e.preventDefault();
}
},wikiwordClick:function(){
},insertimageClick:function(){
},htmltoggleClick:function(){
},styleDropdownClick:function(){
dojo.debug("styleDropdownClick:",this.styleDropdownContainer);
dojo.style.toggleShowing(this.styleDropdownContainer);
},copyClick:function(){
this.exec("copy");
},boldClick:function(){
this.exec("bold");
},italicClick:function(){
this.exec("italic");
},underlineClick:function(){
this.exec("underline");
},justifyleftClick:function(){
this.exec("justifyleft");
},justifycenterClick:function(){
this.exec("justifycenter");
},justifyfullClick:function(){
this.exec("justifyfull");
},justifyrightClick:function(){
this.exec("justifyright");
},pasteClick:function(){
this.exec("paste");
},undoClick:function(){
this.exec("undo");
},redoClick:function(){
this.exec("redo");
},linkClick:function(){
},insertunorderedlistClick:function(){
this.exec("insertunorderedlist");
},insertorderedlistClick:function(){
this.exec("insertorderedlist");
},inserthorizontalruleClick:function(){
this.exec("inserthorizontalrule");
},strikethroughClick:function(){
this.exec("strikethrough");
},formatSelectClick:function(){
var sv=this.formatSelectBox.value.toLowerCase();
this.exec("formatblock",sv);
},normalTextClick:function(){
this.exec("formatblock","p");
},h1TextClick:function(){
this.exec("formatblock","h1");
},h2TextClick:function(){
this.exec("formatblock","h2");
},h3TextClick:function(){
this.exec("formatblock","h3");
},h4TextClick:function(){
this.exec("formatblock","h4");
},indentClick:function(){
this.exec("indent");
},outdentClick:function(){
this.exec("outdent");
},hideAllDropDowns:function(){
this.domNode.style.height="";
dojo.lang.forEach(dojo.widget.byType("Editor2Toolbar"),function(tb){
try{
dojo.style.hide(tb.forecolorDropDown);
dojo.style.hide(tb.hilitecolorDropDown);
dojo.style.hide(tb.styleDropdownContainer);
if(tb.clickInterceptDiv){
dojo.style.hide(tb.clickInterceptDiv);
}
}
catch(e){
}
if(dojo.render.html.ie){
try{
dojo.style.hide(tb.forecolorPalette.bgIframe);
}
catch(e){
}
try{
dojo.style.hide(tb.hilitecolorPalette.bgIframe);
}
catch(e){
}
}
});
},selectFormat:function(_8ab){
dojo.lang.forEach(this.formatSelectBox.options,function(item){
if(item.value.toLowerCase()==_8ab.toLowerCase()){
item.selected=true;
}
});
},forecolorClick:function(e){
this.colorClick(e,"forecolor");
},hilitecolorClick:function(e){
this.colorClick(e,"hilitecolor");
},colorClick:function(e,type){
var h=dojo.render.html;
this.hideAllDropDowns();
e.stopPropagation();
var dd=this[type+"DropDown"];
var pal=this[type+"Palette"];
dojo.style.toggleShowing(dd);
if(!pal){
pal=this[type+"Palette"]=dojo.widget.createWidget("ColorPalette",{},dd,"first");
var fcp=pal.domNode;
with(dd.style){
width=dojo.html.getOuterWidth(fcp)+"px";
height=dojo.html.getOuterHeight(fcp)+"px";
zIndex=1002;
position="absolute";
}
dojo.event.connect("after",pal,"onColorSelect",this,"exec",function(mi){
mi.args.unshift(type);
return mi.proceed();
});
dojo.event.connect("after",pal,"onColorSelect",dojo.style,"toggleShowing",this,function(mi){
mi.args.unshift(dd);
return mi.proceed();
});
var cid=this.clickInterceptDiv;
if(!cid){
cid=this.clickInterceptDiv=document.createElement("div");
document.body.appendChild(cid);
with(cid.style){
backgroundColor="transparent";
top=left="0px";
height=width="100%";
position="absolute";
border="none";
display="none";
zIndex=1001;
}
dojo.event.connect(cid,"onclick",function(){
cid.style.display="none";
});
}
dojo.event.connect(pal,"onColorSelect",function(){
cid.style.display="none";
});
dojo.event.kwConnect({srcObj:document.body,srcFunc:"onclick",targetObj:this,targetFunc:"hideAllDropDowns",once:true});
document.body.appendChild(dd);
}
dojo.style.toggleShowing(this.clickInterceptDiv);
var pos=dojo.style.abs(this[type+"Button"]);
dojo.html.placeOnScreenPoint(dd,pos.x,pos.y,0,false);
if(pal.bgIframe){
with(pal.bgIframe.style){
display="block";
left=dd.style.left;
top=dd.style.top;
width=dojo.style.getOuterWidth(dd)+"px";
height=dojo.style.getOuterHeight(dd)+"px";
}
}
},uninitialize:function(){
if(!dojo.render.html.ie){
dojo.event.kwDisconnect({srcObj:document.body,srcFunc:"onclick",targetObj:this,targetFunc:"hideAllDropDowns",once:true});
}
},exec:function(what,arg){
},hideUnusableButtons:function(obj){
var op=obj||dojo.widget.html.RichText.prototype;
dojo.lang.forEach(this.commandList,function(cmd){
if(this[cmd+"Button"]){
var cb=this[cmd+"Button"];
if(!op.queryCommandAvailable(cmd)){
cb.style.display="none";
cb.parentNode.style.display="none";
}
}
},this);
if(this.oneLineTr){
var _8bf=false;
var _8c0=false;
var tds=this.oneLineTr.getElementsByTagName("td");
dojo.lang.forEach(tds,function(td){
if(td.getAttribute("isSpacer")){
if(td.style.display!="none"){
if(_8bf){
td.style.display="none";
}
_8bf=true;
}else{
_8c0=td;
_8bf=true;
}
}else{
if(td.style.display!="none"){
_8c0=td;
_8bf=false;
}
}
});
}
},highlightButton:function(name){
var bn=name+"Button";
if(this[bn]){
with(this[bn].style){
backgroundColor="White";
border="1px solid #aeaeab";
}
}
},unhighlightButton:function(name){
var bn=name+"Button";
if(this[bn]){
with(this[bn].style){
backgroundColor="";
border="";
}
}
}},"html",function(){
dojo.event.connect(this,"fillInTemplate",dojo.lang.hitch(this,function(){
if(dojo.render.html.ie){
this.domNode.style.zoom=1;
}
}));
});
dojo.provide("dojo.widget.Editor2");
dojo.provide("dojo.widget.html.Editor2");
dojo.require("dojo.io.*");
dojo.require("dojo.widget.*");
dojo.require("dojo.widget.RichText");
dojo.require("dojo.widget.Editor2Toolbar");
dojo.widget.defineWidget("dojo.widget.html.Editor2",dojo.widget.html.RichText,{saveUrl:"",saveMethod:"post",saveArgName:"editorContent",closeOnSave:false,shareToolbar:false,toolbarAlwaysVisible:false,htmlEditing:false,_inHtmlMode:false,_htmlEditNode:null,commandList:dojo.widget.html.Editor2Toolbar.prototype.commandList,toolbarWidget:null,scrollInterval:null,editorOnLoad:function(){
var _8c7=dojo.widget.byType("Editor2Toolbar");
if((!_8c7.length)||(!this.shareToolbar)){
var _8c8={};
_8c8.templatePath=dojo.uri.dojoUri("src/widget/templates/HtmlEditorToolbarOneline.html");
this.toolbarWidget=dojo.widget.createWidget("Editor2Toolbar",_8c8,this.domNode,"before");
dojo.event.connect(this,"destroy",this.toolbarWidget,"destroy");
this.toolbarWidget.hideUnusableButtons(this);
if(this.object){
this.tbBgIframe=new dojo.html.BackgroundIframe(this.toolbarWidget.domNode);
this.tbBgIframe.iframe.style.height="30px";
}
if(this.toolbarAlwaysVisible){
var src=document["documentElement"]||window;
this.scrollInterval=setInterval(dojo.lang.hitch(this,"globalOnScrollHandler"),100);
dojo.event.connect("before",this,"destroyRendering",this,"unhookScroller");
}
}else{
this.toolbarWidget=_8c7[0];
}
dojo.event.topic.registerPublisher("Editor2.clobberFocus",this.editNode,"onfocus");
dojo.event.topic.subscribe("Editor2.clobberFocus",this,"setBlur");
dojo.event.connect(this.editNode,"onfocus",this,"setFocus");
dojo.event.connect(this.toolbarWidget.linkButton,"onclick",dojo.lang.hitch(this,function(){
var _8ca;
if(this.document.selection){
_8ca=this.document.selection.createRange().text;
}else{
if(dojo.render.html.mozilla){
_8ca=this.window.getSelection().toString();
}
}
if(_8ca.length){
this.toolbarWidget.exec("createlink",prompt("Please enter the URL of the link:","http://"));
}else{
alert("Please select text to link");
}
}));
var _8cb=dojo.lang.hitch(this,function(){
if(dojo.render.html.ie){
this.editNode.focus();
}else{
this.window.focus();
}
});
dojo.event.connect(this.toolbarWidget,"formatSelectClick",_8cb);
dojo.event.connect(this,"execCommand",_8cb);
if(this.htmlEditing){
var tb=this.toolbarWidget.htmltoggleButton;
if(tb){
tb.style.display="";
dojo.event.connect(this.toolbarWidget,"htmltoggleClick",this,"toggleHtmlEditing");
}
}
},toggleHtmlEditing:function(){
if(!this._inHtmlMode){
this._inHtmlMode=true;
this.toolbarWidget.highlightButton("htmltoggle");
if(!this._htmlEditNode){
this._htmlEditNode=document.createElement("textarea");
dojo.html.insertBefore(this._htmlEditNode,this.domNode);
}
this._htmlEditNode.style.display="";
this._htmlEditNode.style.width="100%";
this._htmlEditNode.style.height=dojo.style.getInnerHeight(this.editNode)+"px";
this._htmlEditNode.value=this.editNode.innerHTML;
this.domNode.style.display="none";
}else{
this._inHtmlMode=false;
this.domNode.style.display="";
this.toolbarWidget.unhighlightButton("htmltoggle");
dojo.lang.setTimeout(this,"replaceEditorContent",1,this._htmlEditNode.value);
this._htmlEditNode.style.display="none";
this.editNode.focus();
}
},setFocus:function(){
dojo.event.connect(this.toolbarWidget,"exec",this,"execCommand");
},setBlur:function(){
dojo.event.disconnect(this.toolbarWidget,"exec",this,"execCommand");
},_scrollSetUp:false,_fixEnabled:false,_scrollThreshold:false,_handleScroll:true,globalOnScrollHandler:function(){
var isIE=dojo.render.html.ie;
if(!this._handleScroll){
return;
}
var ds=dojo.style;
var tdn=this.toolbarWidget.domNode;
var db=document["body"];
var _8d1=ds.getOuterHeight(tdn);
if(!this._scrollSetUp){
this._scrollSetUp=true;
var _8d2=ds.getOuterWidth(this.domNode);
this._scrollThreshold=ds.abs(tdn,false).y;
if((isIE)&&(db)&&(ds.getStyle(db,"background-image")=="none")){
with(db.style){
backgroundImage="url("+dojo.uri.dojoUri("src/widget/templates/images/blank.gif")+")";
backgroundAttachment="fixed";
}
}
}
var _8d3=(window["pageYOffset"])?window["pageYOffset"]:(document["documentElement"]||document["body"]).scrollTop;
if(_8d3>this._scrollThreshold){
if(!this._fixEnabled){
this.domNode.style.marginTop=_8d1+"px";
if(isIE){
var cl=dojo.style.abs(tdn).x;
document.body.appendChild(tdn);
tdn.style.left=cl+dojo.style.getPixelValue(document.body,"margin-left")+"px";
dojo.html.addClass(tdn,"IEFixedToolbar");
if(this.object){
dojo.html.addClass(this.tbBgIframe,"IEFixedToolbar");
}
}else{
with(tdn.style){
position="fixed";
top="0px";
}
}
tdn.style.zIndex=1000;
this._fixEnabled=true;
}
if(!dojo.render.html.safari){
var _8d5=(this.height)?parseInt(this.height):((this.object)?dojo.style.getInnerHeight(this.editNode):this._lastHeight);
if(_8d3>(this._scrollThreshold+_8d5)){
tdn.style.display="none";
}else{
tdn.style.display="";
}
}
}else{
if(this._fixEnabled){
this.domNode.style.marginTop=null;
with(tdn.style){
position="";
top="";
zIndex="";
if(isIE){
marginTop="";
}
}
if(isIE){
dojo.html.removeClass(tdn,"IEFixedToolbar");
dojo.html.insertBefore(tdn,this._htmlEditNode||this.domNode);
}
this._fixEnabled=false;
}
}
},unhookScroller:function(){
this._handleScroll=false;
clearInterval(this.scrollInterval);
if(dojo.render.html.ie){
dojo.html.removeClass(this.toolbarWidget.domNode,"IEFixedToolbar");
}
},_updateToolbarLastRan:null,_updateToolbarTimer:null,_updateToolbarFrequency:500,updateToolbar:function(_8d6){
if((!this.isLoaded)||(!this.toolbarWidget)){
return;
}
var diff=new Date()-this._updateToolbarLastRan;
if((!_8d6)&&(this._updateToolbarLastRan)&&((diff<this._updateToolbarFrequency))){
clearTimeout(this._updateToolbarTimer);
var _8d8=this;
this._updateToolbarTimer=setTimeout(function(){
_8d8.updateToolbar();
},this._updateToolbarFrequency/2);
return;
}else{
this._updateToolbarLastRan=new Date();
}
dojo.lang.forEach(this.commandList,function(cmd){
if(cmd=="inserthtml"){
return;
}
try{
if(this.queryCommandEnabled(cmd)){
if(this.queryCommandState(cmd)){
this.toolbarWidget.highlightButton(cmd);
}else{
this.toolbarWidget.unhighlightButton(cmd);
}
}
}
catch(e){
}
},this);
var h=dojo.render.html;
if(h.safari){
return;
}
var _8db=(h.ie)?this.document.selection.createRange().parentElement():this.window.getSelection().anchorNode;
while((_8db)&&(_8db.nodeType!=1)){
_8db=_8db.parentNode;
}
if(!_8db){
return;
}
var _8dc=["p","pre","h1","h2","h3","h4"];
var type=_8dc[dojo.lang.find(_8dc,_8db.nodeName.toLowerCase())];
while((_8db)&&(_8db!=this.editNode)&&(!type)){
_8db=_8db.parentNode;
type=_8dc[dojo.lang.find(_8dc,_8db.nodeName.toLowerCase())];
}
if(!type){
type="";
}else{
if(type.charAt(0)=="h"){
this.toolbarWidget.unhighlightButton("bold");
}
}
this.toolbarWidget.selectFormat(type);
},updateItem:function(item){
try{
var cmd=item._name;
var _8e0=this._richText.queryCommandEnabled(cmd);
item.setEnabled(_8e0,false,true);
var _8e1=this._richText.queryCommandState(cmd);
if(_8e1&&cmd=="underline"){
_8e1=!this._richText.queryCommandEnabled("unlink");
}
item.setSelected(_8e1,false,true);
return true;
}
catch(err){
return false;
}
},_save:function(e){
if(!this.isClosed){
if(this.saveUrl.length){
var _8e3={};
_8e3[this.saveArgName]=this.getHtml();
dojo.io.bind({method:this.saveMethod,url:this.saveUrl,content:_8e3});
}else{
dojo.debug("please set a saveUrl for the editor");
}
if(this.closeOnSave){
this.close(e.getName().toLowerCase()=="save");
}
}
},wireUpOnLoad:function(){
if(!dojo.render.html.ie){
}
}},"html",function(){
var cp=dojo.widget.html.Editor2.prototype;
if(!cp._wrappersSet){
cp._wrappersSet=true;
cp.fillInTemplate=(function(fit){
return function(){
fit.call(this);
this.editorOnLoad();
};
})(cp.fillInTemplate);
cp.onDisplayChanged=(function(odc){
return function(){
try{
odc.call(this);
this.updateToolbar();
}
catch(e){
}
};
})(cp.onDisplayChanged);
cp.onLoad=(function(ol){
return function(){
ol.call(this);
this.wireUpOnLoad();
};
})(cp.onLoad);
}
});

