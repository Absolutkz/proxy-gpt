export default async function handler(req, res) {
  const { url, method = 'GET', headers = {}, body } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL to proxy.' });
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: method !== 'GET' ? JSON.stringify(body) : undefined,
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy error', details: error.toString() });
  }
}
