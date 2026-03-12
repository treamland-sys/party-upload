export async function onRequestPost(context) {

const request = context.request;

/* Dateiname aus Header holen */

const fileName = request.headers.get("x-file-name");

if(!fileName){
return new Response("Kein Dateiname", {status:400});
}

/* nur Bilder erlauben */

const allowed = /\.(jpg|jpeg|png|webp|heic)$/i;

if(!allowed.test(fileName)){
return new Response("Nur Bilder erlaubt", {status:400});
}

/* Nextcloud Share */

const shareToken = "X7fK3RMRtgo8FbA";

const nextcloudURL =
"https://nx70782.your-storageshare.de/public.php/webdav/" + encodeURIComponent(fileName);

/* Duplikat prüfen */

const check = await fetch(nextcloudURL,{
method:"HEAD",
headers:{
Authorization:"Basic " + btoa(shareToken + ":")
}
});

if(check.status === 200){
return new Response("Datei existiert bereits", {status:409});
}

/* Datei lesen */

const fileBuffer = await request.arrayBuffer();

/* Upload zu Nextcloud */

const upload = await fetch(nextcloudURL,{
method:"PUT",
headers:{
Authorization:"Basic " + btoa(shareToken + ":")
},
body:fileBuffer
});

if(upload.status !== 201 && upload.status !== 204){
return new Response("Upload Fehler", {status:500});
}

/* Counter erhöhen */

const kv = context.env.COUNTER;

let count = await kv.get("photos");

count = parseInt(count || "0") + 1;

await kv.put("photos", count.toString());

/* Erfolg */

return new Response(
JSON.stringify({
success:true,
file:fileName
}),
{
headers:{
"Content-Type":"application/json"
}
}
);

}
