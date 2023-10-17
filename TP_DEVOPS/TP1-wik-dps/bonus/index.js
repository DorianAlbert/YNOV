import got from 'got';

async const scrapeData() => {
    got("http://e-corp.fr/ask") // Mettez le lien du site
        .then(async (response) => {
            console.log(response.body)
        })
        .catch((err) => {
            console.log(err);
        });
}