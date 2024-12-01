export default function handler(req, res) {
    const { DISCORD_CLIENT_ID, VERCEL_URL } = process.env;

    if (!DISCORD_CLIENT_ID || !VERCEL_URL) {
        return res.status(500).json({ error: "Missing environment variables" });
    }

    let redirectUri;

    if (VERCEL_URL.includes('localhost') && !VERCEL_URL.startsWith('http')) redirectUri = `http://${VERCEL_URL}/api/auth/callback`;
    else if (!VERCEL_URL.startsWith('http')) redirectUri = `https://${VERCEL_URL}/api/auth/callback`;

    const params = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'identify email',
    });

    res.redirect(`https://discord.com/oauth2/authorize?${params.toString()}`);
}
