let counter = 0;

export async function onRequest(context) {

return new Response(JSON.stringify({count:counter}),{
headers:{ "content-type":"application/json" }
});

}

