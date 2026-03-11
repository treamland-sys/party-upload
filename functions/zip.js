import JSZip from "jszip";
export async function onRequestPost(context) {

const data = await context.request.json();
const files = data.files;

const shareToken = "X7fK3RMRtgo8FbA";

const zip = new JSZip();

for (let i = 0; i < files.length; i++) {

const filename = files[i].split("file=").pop();

const nextcloudURL =
"https://nx70782.your-storageshare.de/public.php/webdav/" + filename;

const response = await fetch(nextcloudURL,{
headers:{
Authorization:"Basic " + btoa(shareToken + ":")
}
});

const buffer = await response.arrayBuffer();

zip.file(filename, buffer);

}

const content = await zip.generateAsync({
type:"uint8array",
compression:"DEFLATE"
});

return new Response(content,{
headers:{
"Content-Type":"application/zip",
"Content-Disposition":'attachment; filename="party_fotos.zip"'
}
});

}
