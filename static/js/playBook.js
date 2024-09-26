// static/js/fetchSignedUrl.js

// Function to fetch signed download URL from the API
async function fetchSignedUrl(assetUrl) {
    try {
        const urlParams = new URL(assetUrl);
        const searchParams = new URLSearchParams(urlParams.search);
        const assetToken = searchParams.get('assetToken');
        const pathname = urlParams.pathname.split('/');
        const userName = pathname[2];
        console.log('User:', userName);
        console.log('Asset Token:', assetToken);

        // API request to get the signed download URL
        const response = await fetch(`https://be.playbook.com/graphql?${new URLSearchParams({
            operationName: 'AssetSignedDownloadUrlQuery',
            variables: JSON.stringify({
                assetToken: assetToken
            }),
            extensions: '{"operationId":"graphql-frontend-prod/61cfc4ae0c63221cc1d5ca47f13250c5"}'
        })}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MjU1MDU2MiwicGFzc3dvcmQiOiIkMmEkMTAkLldSQ2FJYnUwRDFNWUtzY3J0ZjBILlJYRW5jbEx5TElmekVPTUIuL2RQc2FxVDNEbWJ3TE8iLCJleHAiOjE3MjkzMjA1NTQsImp0aSI6IjA4MWZiZTQwLWQyOTAtNGE0MS1iYmMzLWMxNGQ5YTdmOTIyMyJ9.e5-4gOpHFDl6VpZmK0XhoYesU4AVRLLJPY7V0hBb-8I',
                'Content-Type': 'application/json',
                'organization': userName
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Extract the signed download URL from the API response
        const data = await response.json();
        const signedDownloadUrl = data?.data?.asset?.signedDownloadUrl;
        console.log('Signed URL:', signedDownloadUrl);

        // Return the signed URL
        return signedDownloadUrl;
    } catch (error) {
        console.error('Error fetching signed URL:', error);
        return null;
    }
}

// Export the function so it can be used in other files
export default fetchSignedUrl;
