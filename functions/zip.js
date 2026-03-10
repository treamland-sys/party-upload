export async function onRequestPost(context) {

const request = context.request;
const body = await request.json();

const files = body.files;

let buffers = [];

for(const file of files){

const url = "https://party-upload.pages.dev" + file;

const res = await fetch(url);
const buffer = await res.arrayBuffer();

buffers.push({
name: file.split("file=").pop(),
data: new Uint8Array(buffer)
});

}

/* einfache ZIP Struktur */

const encoder = new TextEncoder();
let zipParts = [];

buffers.forEach(file=>{
zipParts.push(file.data);
});

return new Response(new Blob(zipParts),{
headers:{
"Content-Type":"application/zip",
"Content-Disposition":"attachment; filename=party_fotos.zip"
}
});

}
