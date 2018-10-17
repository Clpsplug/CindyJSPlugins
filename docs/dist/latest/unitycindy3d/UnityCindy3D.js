(function(){
'use strict';CindyJS.registerPlugin(1,"UnityCindy3D",function(b){var a=b.nada,e=b.evaluate;b=b.defineFunction;var k=[],c=-1,f=0,h=function(){if("undefined"==typeof uc3dBuffer)return!1;f=0;return!0},l=function(d){uc3dBuffer[f++]=d},m=function(d,a,b){uc3dBuffer[f++]=b;for(var g=a;g<a+b;++g)for(var n=coerce.toHomog(e(d[g])),c=0;3>c;c++)uc3dBuffer[f++]=n[c]},u=function(d){var a=d.length;uc3dBuffer[f++]=a;for(var b=0;b<a;++b)for(var e=coerce.toHomog(d[b]),c=0;3>c;c++)uc3dBuffer[f++]=e[c]},p=function(d,
a,b){var g=null,n=a,c=null;a={color:function(d){return g=coerce.toColor(d)},alpha:function(d){return coerce.toInterval(0,1,d)},shininess:function(d){return coerce.toInterval(0,128,d)},size:function(d){return n=coerce.toReal(d)},topology:function(d){return c=coerce.toString(d,c).toLowerCase()}};for(var h in d){var k=a[h];null!=k&&k(e(d[h]))}null!=g&&(uc3dBuffer[f++]=1,uc3dBuffer[f++]=g[0],uc3dBuffer[f++]=g[1],uc3dBuffer[f++]=g[2]);if(null!=b)for(uc3dBuffer[f++]=2,uc3dBuffer[f++]=b.length,d=0;d<b.length;++d)h=
coerce.toColor(b[d]),uc3dBuffer[f++]=h[0],uc3dBuffer[f++]=h[1],uc3dBuffer[f++]=h[2];null!=n&&(uc3dBuffer[f++]=0,uc3dBuffer[f++]=n);null!=c&&(uc3dBuffer[f++]=3,"close"==c?uc3dBuffer[f++]=1:uc3dBuffer[f++]=0);uc3dBuffer[f]=-1};b("clear3d",0,function(d,g){if(0==h())return a;gameInstance.SendMessage("Manager","Clear3D","");k=[];c=-1;f=0;return a});b("begin3d",0,function(d,a){return t("Default",a,!0)});b("begin3d",1,function(d,a){return t(coerce.toString(e(d[0])),a,!0)});b("createprototype3d",1,function(d,
a){return t(coerce.toString(e(d[0])),a,!1)});var t=function(d,g,b){if(-1!=c||0==h())return a;uc3dBuffer[f++]=b;gameInstance.SendMessage("Manager","Begin3D",d);c=Math.floor(uc3dBuffer[0]);k[c]={id:c,classname:d,active:b,init:!1,start:null,update:null};return{ctype:"number",value:{real:c,imag:0}}};b("instantiate3d",2,function(d,a){return{ctype:"number",value:{real:v(d,a,!0),imag:0}}});b("extends3d",1,function(d,a){var b=-1;-1==c&&(c=b=v(d,a,!1));return{ctype:"number",value:{real:b,imag:0}}});var v=
function(d,a,b){a=-1;if(0==h())return a;var g=coerce.toInt(e(d[0])),c=k[g];c&&(l(g),(uc3dBuffer[f++]=b)&&m(d,1,1),gameInstance.SendMessage("Manager","Instantiate3D",""),a=Math.floor(uc3dBuffer[0]),k[a]={id:a,classname:c.classname,active:b,init:!1,start:c.start,update:c.update});return a};b("end3d",0,function(d,b){if(-1==c||0==h())return a;gameInstance.SendMessage("Manager","End3D","");c=-1;return a});b("destroy3d",1,function(d,a){return w(c,d,0,a)});b("destroy3d",2,function(a,b){return w(coerce.toInt(e(a[0])),
a,1,b)});var w=function(d,b,c,k){if(-1==d||0==h())return a;b=coerce.toReal(e(b[c]));l(d);uc3dBuffer[f++]=b;gameInstance.SendMessage("Manager","Destroy3D","");return a};b("ondestroy3d",1,function(d,b){d=coerce.toInt(e(d[0]));delete k[d];console.log("ondestroy3d: id = "+d+" / gameobjs.length = "+Object.keys(k).length);return a});b("draw3d",1,function(d,b){if(-1==c||0==h())return a;m(d,0,1);p(b,null,null);gameInstance.SendMessage("Manager","AddPoint3D","");return a});b("draw3d",2,function(d,b){if(-1==
c||0==h())return a;m(d,0,2);p(b,null,null);gameInstance.SendMessage("Manager","AddLine3D","");return a});b("connect3d",1,function(a,b){return x(a,b)});b("connect3d",2,function(a,b){return x(a,b)});var x=function(d,b){if(-1==c||0==h())return a;u(coerce.toList(e(d[0])));var g=null;2==d.length&&(g=coerce.toList(e(d[1])));p(b,null,g);gameInstance.SendMessage("Manager","AddLine3D","");return a};b("fillpoly3d",1,function(d,b){if(-1==c||0==h())return a;u(coerce.toList(e(d[0])));p(b,null,null);gameInstance.SendMessage("Manager",
"AddPolygon3D","");return a});b("drawsphere3d",2,function(d,b){if(-1==c||0==h())return a;m(d,0,1);d=coerce.toReal(e(d[1]));p(b,d,null);gameInstance.SendMessage("Manager","AddSphere3D","");return a});b("setactive3d",1,function(a,b){return y(c,a,0,b)});b("setactive3d",2,function(a,b){return y(coerce.toInt(e(a[0])),a,1,b)});var y=function(b,g,c,r){if(-1==b||0==h())return a;r=k[b];if(!r)return a;g=coerce.toBool(e(g[c+1]));r.active=g;l(b);uc3dBuffer[f++]=g;gameInstance.SendMessage("Manager","SetActive3D",
"");return a};b("usegravity3d",1,function(a,b){return z(c,a,0,b)});b("usegravity3d",2,function(a,b){return z(coerce.toInt(e(a[0])),a,1,b)});var z=function(b,g,c,k){if(-1==b||0==h())return a;g=coerce.toBool(e(g[c]));l(b);uc3dBuffer[f++]=g;gameInstance.SendMessage("Manager","UseGravity3D","");return a};b("addcollider3d",0,function(a,b){return A(c,a,b)});b("addcollider3d",1,function(a,b){return A(coerce.toInt(e(a[0])),a,b)});var A=function(b,g,e){if(-1==b||0==h())return a;l(b);gameInstance.SendMessage("Manager",
"AddCollider3D","");return a};b("setstart3d",1,function(a,b){return q(c,"start",a,0,b)});b("setstart3d",2,function(a,b){return q(coerce.toInt(e(a[0])),"start",a,1,b)});b("setupdate3d",1,function(a,b){return q(c,"update",a,0,b)});b("setupdate3d",2,function(a,b){return q(coerce.toInt(e(a[0])),"update",a,1,b)});var q=function(b,g,e,c,f){if(-1==b)return a;b=k[b];if(!b)return a;if("function"!==e[c].ctype)return console.log("argument is not a function"),a;b[g]=e[c].oper.replace("$0","();");return a};b("update3d",
0,function(b,g){if(null==cdy)return a;k.forEach(function(a){a.active&&(a.init||null==a.start||(c=a.id,cdy.evokeCS(a.start),a.init=!0),null!=a.update&&(c=a.id,cdy.evokeCS(a.update)))});return a});b("setposition3d",1,function(a,b){return B(c,a,0,b)});b("setposition3d",2,function(a,b){return B(coerce.toInt(e(a[0])),a,1,b)});var B=function(b,e,c,f){if(-1==b||0==h())return a;l(b);m(e,c,1);gameInstance.SendMessage("Manager","SetPosition3D","");return a};b("getposition3d",0,function(a,b){return C(c,a,0,
b)});b("getposition3d",1,function(a,b){return C(coerce.toInt(e(a[0])),a,1,b)});var C=function(b,e,c,f){if(-1==b||0==h())return a;l(b);gameInstance.SendMessage("Manager","GetPosition3D","");return{ctype:"list",value:[{ctype:"number",value:{real:uc3dBuffer[0],imag:0}},{ctype:"number",value:{real:uc3dBuffer[1],imag:0}},{ctype:"number",value:{real:uc3dBuffer[2],imag:0}}]}};b("setrotation3d",1,function(a,b){return D(c,a,0,b)});b("setrotation3d",2,function(a,b){return D(coerce.toInt(e(a[0])),a,1,b)});var D=
function(b,e,c,f){if(-1==b||0==h())return a;l(b);m(e,c,1);gameInstance.SendMessage("Manager","SetRotation3D","");return a};b("setvelocity3d",1,function(a,b){return E(c,a,0,b)});b("setvelocity3d",2,function(a,b){return E(coerce.toInt(e(a[0])),a,1,b)});var E=function(b,e,c,f){if(-1==b||0==h())return a;l(b);m(e,c,1);gameInstance.SendMessage("Manager","SetVelocity3D","");return a};b("getkey3d",1,function(b,c){c=!1;if(0==h())return a;gameInstance.SendMessage("Manager","GetKey3D",coerce.toString(e(b[0])));
uc3dBuffer[0]&&(c=!0);return{ctype:"boolean",value:c}})});var coerce={toList:function(b,a){a=void 0===a?null:a;return"list"!==b.ctype?(console.log("argument is not a list"),a):b.value},toHomog:function(b,a,e){a=void 0===a?[0,0,0,0]:a;e=void 0===e?3:e;b=coerce.toList(b);if(null===b)return a;a=b.map(coerce.toReal);a.length>e+1&&(console.log("Coordinate vector too long."),a=a.slice(0,e+1));for(;a.length<e;)a.push(0);a.length===e&&a.push(1);return a},toDirection:function(b,a){a=void 0===a?[0,0,0]:a;b=coerce.toList(b);if(null===b)return a;a=b.map(coerce.toReal);
3<a.length&&(console.log("Coordinate vector too long."),a=a.slice(0,3));for(;3>a.length;)a.push(0);return a},toDirectionPoint:function(b,a){a=void 0===a?[0,0,0,0]:a;b=coerce.toDirection(b,a);b!==a&&(b[3]=0);return b},toColor:function(b,a){a=void 0===a?[.5,.5,.5]:a;if("number"===b.ctype){var e=coerce.toInterval(0,1,b);if(!isNaN(e))return[e,e,e]}b=coerce.toList(b);return null===b?a:3!=b.length?(console.log("Not an RGB color vector"),a):b.map(function(a){return coerce.toInterval(0,1,a)})},toReal:function(b,
a){a=void 0===a?Number.NaN:a;if("number"!==b.ctype)return console.log("argument is not a number"),a;b=b.value;a=b.real;0!==b.imag&&console.log("complex number is not real");return a},toInt:function(b,a){a=void 0===a?Number.NaN:a;if("number"!==b.ctype)return console.log("argument is not a number"),a;a=b.value;b=a.real;a=a.imag;0!==a&&console.log("complex number is not real");a=Math.round(b);a!==b&&console.log("number is not an integer");return a},clamp:function(b,a,e){return e<b?b:e>a?a:e},toInterval:function(b,
a,e,k){k=void 0===k?Number.NaN:k;return coerce.clamp(b,a,coerce.toReal(e,k))},toString:function(b,a){a=void 0===a?null:a;if("string"===b.ctype)return b.value;console.log("argument is not a string");return a},toEnum:function(b,a,e){e=void 0===e?null:e;a=coerce.toString(a,e);if(a!==e&&-1!==b.indexOf(a))return a;console.log("argument is not one of "+b.join(", "));return e},toBool:function(b,a){if("boolean"===b.ctype)return b.value;console.log("argument is not boolean");return a}};
}).call(this);

