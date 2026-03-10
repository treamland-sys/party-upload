import JSZip from "jszip";

export async function onRequestPost(context) {

const { request } = context;
const data = await request.json();

const files = data.files;

const zip = new JSZip();

for (const file of files){

const url = "https://party-upload.pages.dev" + file;

const res = await fetch(url);
const blob = await res.arrayBuffer();

const filename = file.split("file=").pop();

zip.file(filename, blob);

}

const content = await zip.generateAsync({type:"uint8array"});

return new Response(content,{
headers:{
"Content-Type":"application/zip",
"Content-Disposition":"attachment; filename=party_fotos.zip"
}
});

}
