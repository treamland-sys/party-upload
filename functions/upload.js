export async function onRequestPost(context) {

const request = context.request;

const fileName = request.headers.get("x-file-name");

const size = request.headers.get("content-length");

return new Response(
"Upload angekommen: "+fileName+" ("+size+" bytes)"
);

}
