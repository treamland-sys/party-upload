export async function onRequestGet(context) {

const url = new URL(context.request.url);
const file = url.searchParams.get("file");

const shareToken = "X7fK3RMRtgo8FbA";

const nextcloudURL =
"https://nx70782.your-storageshare.de/public.php/webdav/" + file;

const response = await fetch(nextcloudURL,{
headers:{
Authorization:"Basic " + btoa(shareToken + ":")
}
});

return new Response(response.body,{
headers:{
"Content-Type": response.headers.get("content-type")
}
});

}
