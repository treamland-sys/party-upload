export async function onRequest(context) {

const shareToken = "X7fK3RMRtgo8FbA";

const url = "https://nx70782.your-storageshare.de/public.php/dav/files/" + shareToken + "/";

const res = await fetch(url, {
method: "PROPFIND",
headers: {
Authorization: "Basic " + btoa(shareToken + ":"),
Depth: "1"
}
});

const xml = await res.text();

const parser = new DOMParser();
const doc = parser.parseFromString(xml, "application/xml");

const responses = [...doc.getElementsByTagName("d:response")];

let files = [];

responses.forEach(node => {

const href = node.getElementsByTagName("d:href")[0]?.textContent;
const modified = node.getElementsByTagName("d:getlastmodified")[0]?.textContent;

if (!href) return;

if (href.match(/\.(jpg|jpeg|png|heic)$/i)) {

files.push({
path: decodeURIComponent(href),
date: new Date(modified).getTime()
});

}

});

/* Sortieren nach Datum (neueste zuerst) */

files.sort((a,b) => b.date - a.date);

return new Response(JSON.stringify(files.map(f => f.path)), {
headers: { "Content-Type": "application/json" }
});

}
