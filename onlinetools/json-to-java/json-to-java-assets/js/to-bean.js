function main(){try{var e=document.getElementById("input-textarea").value;var t="json";if(e){var a;if(t==="json"){a=getBeanFieldFromJson(e)}else if(t==="sql"){alert("还没实现")}$(".result-list").html("");$.each(a,function(e,t){var a=toBeanText(t);var r="";if(e!=0){r="small-text"}if(e==1){$(".result-list").append("<p class='more-class-tip'>below is the more class contain in the basic class</p>")}var n='<div><textarea class="result '+r+'" >'+a+"</textarea></div>";$(".result-list").append(n)});initCopyBtn();$(".error-tip").html("").addClass("hide")}}catch(e){var r="";if(e.message.indexOf("Parse error on line")!=-1){r=e.message}else{r="parse error,makesure the json is right"}$(".error-tip").html(r).removeClass("hide")}}function toBeanText(e){var a=e.val;var r=e.name;var n="";var i="";var s="";var o={};var l=false;var p=document.getElementById("getset-templ").innerHTML;for(key in a){var u=camelCase(key);if(u!=key){i+='   @JsonProperty("'+key+'")\n';l=true}i+="   private "+a[key]+" "+u+";\n";var c=a[key];if(c.indexOf("List<")>-1){c=a[key].replace("List<","");c=c.replace(">","");o["List"]="true"}o[c]="true";var m={a:u,A:firstToUpperCase(u),T:a[key]};s+=p.replace(/a|A|T/g,function(e){return m[e]})}for(t in o){if(importMap[t]){n+="import "+importMap[t]+";\n"}}if(l){n+="import org.codehaus.jackson.annotate.JsonIgnoreProperties;\nimport org.codehaus.jackson.annotate.JsonProperty;"}var v=document.getElementById("package-input").value;if(v){n="package "+v+";\n"+n}return n+"\n\n   \npublic class "+r+" {\n\n"+i+s+"\n}"}function getBeanFieldFromJson(e){var t=null;e=trimStr(e);jsonlint.parse(e);if(e[0]==="["&&e[e.length-1]==="]"){e='{ "list": '+e+"}";t=JSON.parse(e).list[0]}else{t=JSON.parse(e)}var a={};var r=[];for(key in t){var n=t[key];a[key]=getTypeFromJsonVal(n,key,r)}var i=document.getElementById("class-input").value;if(!i){i="A"}else{i=camelCaseWithFirstCharUpper(i)}a={name:i,val:a};return $.merge([a],r)}function getTypeFromJsonVal(e,t,a){if(e&&e.replace){e=e.replace(/ /g,"")}var r=typeof e;if(r==="number"){if(isInt(e)){return"int"}else{return"double"}}else if(r==="boolean"){return r}else if(isDate(e)){return"Date"}else if(!e){return"String"}else if(r==="string"){return"String"}else{if(isArray(e)){var n=getTypeFromJsonVal(e[0],t,a);return"List<"+n+">"}else{var i=camelCaseWithFirstCharUpper(t);var s={};for(t in e){var o=e[t];s[t]=getTypeFromJsonVal(o,t,a)}a.push({name:i,val:s});return i}}}function initCopyBtn(){$(".copy-button").each(function(e,r){var t=new ZeroClipboard(r);t.on("copy",function(e){var t=e.clipboardData;var a=$(r).siblings("textarea").val();t.setData("text/plain",a);alert("copy success")})})}var importMap={Date:"java.util.Date",List:"java.util.List"};document.addEventListener("DOMContentLoaded",function(e){var t=document.getElementById("input-textarea");t.innerHTML=document.getElementById("input-example").innerHTML;main();$("#input-textarea,.config input").live("change keyup paste",function(){main()})});