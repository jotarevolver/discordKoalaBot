async function getFinalUrl(shortUrl) {
    const fetch = (await import('node-fetch')).default;

    try {
        const response = await fetch(shortUrl, {
            method: 'HEAD',
            redirect: 'manual'
        });

        if (response.status >= 300 && response.status < 400) {
            const finalUrl = response.headers.get('location');
            return finalUrl;
        } else {
            return "No redirection found";
        }
    } catch (error) {
        console.error('Error:', error);
    }
}