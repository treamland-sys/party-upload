globalThis.counter = globalThis.counter || 0;
let counter = 0;

export async function onRequest(context) {

const token = "X7fK3RMRtgo8FbA";
const baseUrl = "https://nx70782.your-storageshare.de/public.php/webdav/";

const request = context.request;
const url = new URL(request.url);

/* ---------- Zähler anzeigen ---------- */

if (url.pathname === "/count") {

return new Response(JSON.stringify({count:counter}),{
headers:{ "content-type":"application/json" }
});

}

/* ---------- Upload ---------- */

if (request.method === "POST") {

const fileName = request.headers.get("x-file-name");
const body = await request.arrayBuffer();

const response = await fetch(baseUrl + Date.now()+"_"+fileName, {

method:"PUT",

headers:{
"Authorization":"Basic "+btoa(token+":"),
"Content-Type":"application/octet-stream"
},

body:body

});

/* Upload zählen */

if(response.status === 201 || response.status === 204){
counter++;
}

return new Response("Nextcloud Status: "+response.status);

}

return new Response("Worker läuft");

}

