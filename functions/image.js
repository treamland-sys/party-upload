export async function onRequestGet(context) {

const url = new URL(context.request.url);
const file = url.searchParams.get("file");

if(!file){
return new Response("File fehlt", {status:400});
}

const shareToken = "X7fK3RMRtgo8FbA";

const nextcloudURL =
"https://nx70782.your-storageshare.de/public.php/webdav/" + file;

const response = await fetch(nextcloudURL,{
headers:{
Authorization: "Basic " + btoa(shareToken + ":"),
"Accept": "*/*"
}
});

if(!response.ok){
return new Response("Nextcloud Fehler", {status:500});
}

/* Bild komplett laden (stabiler als Stream) */

const buffer = await response.arrayBuffer();

return new Response(buffer,{
headers:{
"Content-Type": response.headers.get("content-type") || "image/jpeg",
"Cache-Control":"public, max-age=86400"
}
});

}
