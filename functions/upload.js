export async function onRequestPost(context) {

const request = context.request;

/* Dateiname vom Browser */

const fileName = request.headers.get("x-file-name");

if(!fileName){
return new Response("Kein Dateiname", {status:400});
}

/* nur Bildformate erlauben */

const allowed = /\.(jpg|jpeg|png|webp|heic)$/i;

if(!allowed.test(fileName)){
return new Response("Nur Bilder erlaubt", {status:400});
}

/* eindeutigen Namen erzeugen */

const timestamp = Date.now();
const random = Math.floor(Math.random()*1000);

const safeName = `${timestamp}_${random}_${fileName}`;

/* Nextcloud 32 TEST */

const shareToken = "CyiTxGiYJqBaHHg";

const nextcloudURL =
`https://nx70782.your-storageshare.de/public.php/dav/files/${shareToken}/${encodeURIComponent(safeName)}`;

const fileBuffer = await request.arrayBuffer();

const upload = await fetch("https://www.google.de");

return new Response(
  await upload.text(),
  {
    headers:{
      "Content-Type":"text/html"
    }
  }
);

