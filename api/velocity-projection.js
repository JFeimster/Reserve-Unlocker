// api/velocity-projection.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { historicalVelocity, currentReserve } = req.body;
  
  // Projection logic: Assume a 3-week clearance cycle for DD+7
  const projectedUnlockDate = new Date();
  projectedUnlockDate.setDate(projectedUnlockDate.getDate() + 21);

  return res.status(200).json({
    status: 'success',
    data: {
      projectedDate: projectedUnlockDate.toISOString().split('T')[0],
      projectedCapital: historicalVelocity * 0.85, // 15% slippage buffer
      recommendation: "Increase velocity by 10% to meet Q3 targets."
    }
  });
}
