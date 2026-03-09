export async function onRequestPost(context) {

const token = "X7fK3RMRtgo8FbA";

const uploadUrl =
"https://nx70782.your-storageshare.de/public.php/webdav/";

const request = context.request;

const fileName = request.headers.get("x-file-name");

const body = await request.arrayBuffer();

const response = await fetch(uploadUrl + Date.now()+"_"+fileName, {

method:"PUT",

headers:{
"Authorization":"Basic "+btoa(token+":"),
"Content-Type":"application/octet-stream"
},

body:body

});

return new Response(
"Nextcloud Status: "+response.status
);

}


