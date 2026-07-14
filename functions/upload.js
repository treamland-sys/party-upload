export async function onRequestPost(context) {
    return new Response("ICH BIN DIE NEUE UPLOAD.JS", {
        status: 200,
        headers: {
            "Content-Type": "text/plain"
        }
    });
}
