// api/fee-nullifier.js
export default async function handler(req, res) {
  const { amount, factorRate } = req.body;
  
  const costOfWaiting = amount * 0.02; // Opportunity cost proxy
  const costOfAdvance = amount * factorRate;

  return res.status(200).json({
    strategy: costOfAdvance < costOfWaiting ? "Advance Capital" : "Wait for Release",
    comparison: {
      costOfWaiting,
      costOfAdvance,
      savings: costOfWaiting - costOfAdvance
    }
  });
}
