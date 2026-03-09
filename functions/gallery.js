export async function onRequestGet() {

const token = "X7fK3RMRtgo8FbA";

const url =
"https://nx70782.your-storageshare.de/public.php/webdav/";

const res = await fetch(url,{
method:"PROPFIND",
headers:{
Authorization:"Basic "+btoa(token+":"),
Depth:"1"
}
});

const text = await res.text();

const images =
[...text.matchAll(/href>([^<]+\.(jpg|jpeg|png|webp))/gi)]
.map(m=>m[1]);

return new Response(JSON.stringify(images),{
headers:{ "content-type":"application/json"}
});

}
