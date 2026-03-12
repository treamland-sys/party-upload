export async function onRequestGet(context) {

const url = new URL(context.request.url);

const file = url.searchParams.get("file");
const thumb = url.searchParams.get("thumb");

const shareToken = "X7fK3RMRtgo8FbA";

/* Thumbnail oder Original */

let nextcloudURL;

if(thumb){

nextcloudURL =
`https://nx70782.your-storageshare.de/public.php/dav/files/${shareToken}/${file}?x=600&y=600`;

}else{

nextcloudURL =
`https://nx70782.your-storageshare.de/public.php/webdav/${file}`;

}

/* Anfrage an Nextcloud */

const response = await fetch(nextcloudURL,{
headers:{
Authorization:"Basic " + btoa(shareToken + ":")
}
});

/* Bild zurückgeben */

return new Response(response.body,{
headers:{
"Content-Type": response.headers.get("content-type"),
"Cache-Control":"public, max-age=86400"
}
});

}
