import fetch from 'node-fetch';

async function getFinalUrl(shortUrl) {
    try{
        const response = await fetch (shortUrl, {
            method: 'HEAD',
            redirect: 'manual'
        });
    
        if (response.status >= 300 && response.status < 400) {
            // La URL de redirección estará en la cabecera 'location'.
            const finalUrl = response.headers.get('location');
            return finalUrl;
        } else {
            return "No redirection found";
        }
    } 
    catch (error) {
        console.error('Error:', error);
    }
}
    

