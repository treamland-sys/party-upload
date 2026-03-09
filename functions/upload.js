export async function onRequest(context) {

const token = "X7fK3RMRtgo8FbA";
const baseUrl = "https://nx70782.your-storageshare.de/public.php/webdav/";

const request = context.request;
const url = new URL(request.url);

/* ---------------- UPLOAD ---------------- */

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

return new Response("Nextcloud Status: "+response.status);

}

/* ---------------- FOTOZÄHLER ---------------- */

if (url.pathname === "/count") {

const response = await fetch(baseUrl, {

method:"PROPFIND",

headers:{
"Authorization":"Basic "+btoa(token+":"),
"Depth":"1"
}

});

const text = await response.text();

/* einfache Dateizählung */

const matches = text.match(/<d:response>/g);

const count = matches ? matches.length-1 : 0;

return new Response(JSON.stringify({count:count}),{
headers:{ "content-type":"application/json" }
});

}

return new Response("Worker läuft");

}
