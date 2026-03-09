export async function onRequestGet() {

const token = "X7fK3RMRtgo8FbA";

const url = "https://nx70782.your-storageshare.de/public.php/webdav/";

const res = await fetch(url,{
method:"PROPFIND",
headers:{
Authorization:"Basic " + btoa(token + ":"),
Depth:"1"
}
});

const xml = await res.text();

const matches = [...xml.matchAll(/<d:href>(.*?)<\/d:href>/g)];

const images = matches
.map(m => decodeURIComponent(m[1]))
.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

return new Response(JSON.stringify(images),{
headers:{ "Content-Type":"application/json" }
});

}
