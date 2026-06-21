export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid payload structure. Data array required.' });
    }

    const trapped = data.reduce((acc, row) => acc + (parseFloat(row.reserve_amount) || 0), 0);
    const total = data.reduce((acc, row) => acc + (parseFloat(row.total) || 0), 0);
    const available = total - trapped;
    const velocityScore = total > 0 ? parseFloat(((available / total) * 100).toFixed(2)) : 100;

    return res.status(200).json({
      trapped_capital: parseFloat(trapped.toFixed(2)),
      available_capital: parseFloat(available.toFixed(2)),
      velocity_score: velocityScore
    });
  } catch (err) {
    return res.status(500).json({ error: 'Internal pipeline error executing analysis.' });
  }
}
