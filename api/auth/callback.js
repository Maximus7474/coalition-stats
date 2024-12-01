// api/auth/callback.js
export default async function handler(req, res) {
    const { code } = req.query;
  
    try {
      if (!code) {
        return res.status(400).json({ error: 'Missing authorization code' });
      }
      
      let redirect_uri;
      const { VERCEL_URL } = process.env;
      if (VERCEL_URL.includes('localhost') && !VERCEL_URL.startsWith('http')) redirect_uri = `http://${VERCEL_URL}/api/auth/callback`;
      else if (!VERCEL_URL.startsWith('http')) redirect_uri = `https://${VERCEL_URL}/api/auth/callback`;
  
      const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: process.env.DISCORD_CLIENT_ID,
          client_secret: process.env.DISCORD_CLIENT_SECRET,
          grant_type: 'authorization_code',
          code,
          redirect_uri,
        }),
      });
  
      if (!tokenResponse.ok) {
        const errorResponse = await tokenResponse.text();  // Capture Discord error response
        console.error('Token exchange error:', errorResponse);
        throw new Error('Failed to exchange code for token');
      }
  
      const tokenData = await tokenResponse.json();
      const { access_token } = tokenData;
  
      // Fetch user details
      const userResponse = await fetch('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${access_token}` },
      });
  
      if (!userResponse.ok) {
        throw new Error('Failed to fetch user details');
      }
  
      const userData = await userResponse.json();
      res.redirect(`/auth-success?data=${encodeURIComponent(JSON.stringify(userData))}`);
    } catch (error) {
      console.error('Authentication error:', error.message);
      res.status(500).send('Authentication failed');
    }
  }
  