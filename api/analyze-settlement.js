// api/analyze-settlement.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { data } = req.body;
  
  // High-performance local calculation (No database needed)
  const trapped = data.reduce((acc, row) => acc + (row.reserve_amount || 0), 0);
  const total = data.reduce((acc, row) => acc + (row.total || 0), 0);

  return res.status(200).json({
    trapped_capital: trapped,
    available_capital: total - trapped,
    velocity_score: ((total - trapped) / total) * 100
  });
}
