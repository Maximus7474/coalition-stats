export default function handler(req, res) {
    const { DISCORD_CLIENT_ID, HOST_URL } = process.env;

    if (!DISCORD_CLIENT_ID || !HOST_URL) {
        return res.status(500).json({ error: "Missing environment variables" });
    }

    let redirectUri;

    if (HOST_URL.includes('localhost') && !HOST_URL.startsWith('http')) redirectUri = `http://${HOST_URL}/api/auth/callback`;
    else if (!HOST_URL.startsWith('http')) redirectUri = `https://${HOST_URL}/api/auth/callback`;

    console.log('Using', redirectUri, 'as redirect uri');

    const params = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'identify email',
    });

    res.redirect(`https://discord.com/oauth2/authorize?${params.toString()}`);
}
