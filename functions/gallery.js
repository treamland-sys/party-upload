export async function onRequest(context) {

const shareToken = "X7fK3RMRtgo8FbA";

const url = "https://nx70782.your-storageshare.de/public.php/dav/files/" + shareToken + "/";

const response = await fetch(url, {
method: "PROPFIND",
headers: {
Authorization: "Basic " + btoa(shareToken + ":"),
Depth: "1"
}
});

const xml = await response.text();

/* Bilder suchen */

const files = [];

const regex = /<d:href>(.*?)<\/d:href>/g;

let match;

while ((match = regex.exec(xml)) !== null) {

let file = decodeURIComponent(match[1]);

if (
file.endsWith(".jpg") ||
file.endsWith(".jpeg") ||
file.endsWith(".png") ||
file.endsWith(".JPG") ||
file.endsWith(".PNG")
) {

let name = file.split("/").pop();

files.push(name);

}

}

/* Neueste zuerst */

files.sort().reverse();

return new Response(JSON.stringify(files), {
headers: { "Content-Type": "application/json" }
});

}
