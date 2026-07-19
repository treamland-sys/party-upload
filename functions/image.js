export async function onRequestGet(context) {

  const url = new URL(context.request.url);

  const file = url.searchParams.get("file");
  const thumb = url.searchParams.get("thumb");

  const shareToken = "CyiTxGiYJqBaHHg";

  let nextcloudURL;

  if (thumb) {

    nextcloudURL =
      `https://nx70782.your-storageshare.de/apps/files_sharing/publicpreview/${shareToken}` +
      `?file=/${encodeURIComponent(file)}` +
      `&x=256&y=256&mimeFallback=true&a=0`;

    const response = await fetch(nextcloudURL);

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=86400"
      }
    });

  } else {

    nextcloudURL =
      nextcloudURL =
  `https://nx70782.your-storageshare.de/public.php/webdav/${file}`;

    const response = await fetch(nextcloudURL, {
      headers: {
        Authorization: "Basic " + btoa(shareToken + ":")
      }
    });

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type"),
        "Cache-Control": "public, max-age=86400"
      }
    });

  }
}
