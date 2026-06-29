const encoder =
new TextEncoder();

const decoder =
new TextDecoder();



let lastResult="";



function hexBytes(hex){

let out=[];

for(let i=0;i<hex.length;i+=2)

out.push(
parseInt(
hex.substr(i,2),
16)
);

return out;

}



// =====================
// BASE64
// =====================


function bytesToBase64(bytes){

let s="";

bytes.forEach(
x=>s+=String.fromCharCode(x)
);

return btoa(s);

}



function base64Bytes(str){

str=str
.replace(/\s/g,"")
.replace("_","/");


let bin=atob(str);

let out=[];

for(let i=0;i<bin.length;i++)
out.push(bin.charCodeAt(i));


return out;

}




// ======================
// FILE LOAD
// ======================


function loadFile(){


let file=
document.getElementById("file")
.files[0];


if(!file)return;


let reader=
new FileReader();



reader.onload=e=>{

document
.getElementById("editor")
.value=e.target.result;

};


reader.readAsText(file);


}




// =======================
// LẤY CONTENT BASE64
// =======================


function extractBase64(data){


let json=
data.match(
/"fullContent"\s*:\s*"([^"]+)"/
);



if(json)

return json[1];


return data.trim();


}




// =======================
// DOWNLOAD
// =======================


function downloadLua(){


let blob=
new Blob(
[lastResult ||
document.getElementById("editor").value],
{
type:"text/plain"
}
);


let a=document.createElement("a");

a.href=
URL.createObjectURL(blob);


a.download="result.lua";


a.click();

}