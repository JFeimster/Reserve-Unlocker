export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { amount, factorRate } = req.body;
    if (!amount || !factorRate) {
      return res.status(400).json({ error: 'Parameters amount and factorRate are strictly required.' });
    }

    const costOfWaiting = parseFloat((amount * 0.02).toFixed(2)); 
    const costOfAdvance = parseFloat((amount * factorRate).toFixed(2));
    const savings = parseFloat((costOfWaiting - costOfAdvance).toFixed(2));

    return res.status(200).json({
      strategy: costOfAdvance < costOfWaiting ? "Advance Capital" : "Wait for Release",
      comparison: {
        costOfWaiting,
        costOfAdvance,
        savings
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Calculation engine breakdown.' });
  }
}
