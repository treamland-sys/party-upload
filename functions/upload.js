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

const upload = await fetch(nextcloudURL,{
    method:"PUT",
    headers:{
        "Authorization":"Basic " + btoa(`${shareToken}:`),
        "X-Requested-With":"XMLHttpRequest",
        "Content-Type":"application/octet-stream"
    },
    body:fileBuffer,
    redirect:"follow"
});

console.log("NC Status:",upload.status);

if(upload.status !== 201 && upload.status !== 204){

    return new Response(
        await upload.text(),
        {
            status:upload.status,
            headers:{
                "Content-Type":"text/plain"
            }
        }
    );

}

/* Counter erhöhen */

try {

const kv = context.env.COUNTER;

if(kv){

let count = await kv.get("photos");

count = parseInt(count || "0") + 1;

await kv.put("photos", count.toString());

}

} catch(e){

console.log("Counter Fehler ignoriert");

}

/* Erfolg */

return new Response(
JSON.stringify({
success:true,
file:safeName
}),
{
headers:{
"Content-Type":"application/json"
}
}
);

}

