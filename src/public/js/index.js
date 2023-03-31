const API_ROUTE = '/api/rpc/v1/';

function trainModel() {
    hitEndpoint('train');
}

async function hitEndpoint (endpoint) {
    let responsePromise = fetch(API_ROUTE + endpoint,
            {
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: {},
            });

    console.log("waiting for " + endpoint + " endpoint to respond");
    let response = await responsePromise;
    console.log("endpoint " + endpoint + " has responded. response:");
    let responseBodyJson = await response.json();
    console.log(responseBodyJson);
    console.log(responseBodyJson.result);
}
