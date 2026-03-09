export async function onRequest() {

const token = "X7fK3RMRtgo8FbA";
const url = "https://nx70782.your-storageshare.de/public.php/webdav/";

const response = await fetch(url, {

method:"PROPFIND",

headers:{
"Authorization":"Basic "+btoa(token+":"),
"Depth":"1"
}

});

const text = await response.text();

/* Dateien zählen */

const matches = text.match(/<d:response>/g);
const count = matches ? matches.length - 1 : 0;

return new Response(JSON.stringify({count:count}),{
headers:{ "content-type":"application/json" }
});

}
