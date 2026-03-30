export default async function handler(req, res) {
  try {
    const { store, client_id, client_secret } = req.body;

    if (!store || !client_id || !client_secret) {
      return res.status(400).json({
        success: false,
        error: "Missing fields",
      });
    }

    const response = await fetch(`https://${store}/admin/oauth/access_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id,
        client_secret,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        error: data,
      });
    }

    return res.status(200).json({
      success: true,
      token: data.access_token,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
