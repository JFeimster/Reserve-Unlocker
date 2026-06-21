export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { historicalVelocity, currentReserve } = req.body;
    if (typeof historicalVelocity === 'undefined' || typeof currentReserve === 'undefined') {
      return res.status(400).json({ error: 'Missing historicalVelocity or currentReserve metrics.' });
    }

    const projectedUnlockDate = new Date();
    projectedUnlockDate.setDate(projectedUnlockDate.getDate() + 21);

    return res.status(200).json({
      status: 'success',
      projectedDate: projectedUnlockDate.toISOString().split('T')[0],
      projectedCapital: parseFloat((historicalVelocity * 0.85).toFixed(2)),
      recommendation: "Increase current stock allocation by 10% to meet projected velocity match."
    });
  } catch (err) {
    return res.status(500).json({ error: 'Projection engine exception.' });
  }
}
