import React, { useState } from 'react';
import { Upload, Download, ArrowRight, Activity, Shield } from 'lucide-react';
import Papa from 'papaparse';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ReserveUploadDashboard() {
  const [chartData, setChartData] = useState(null);
  const [fileMeta, setFileMeta] = useState({ name: '', size: 0 });
  const [metrics, setMetrics] = useState({ total: 0, trapped: 0, available: 0 });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileMeta({ name: file.name, size: (file.size / 1024).toFixed(2) });

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        let calculatedTrapped = 0;
        let calculatedTotal = 0;

        const processed = results.data.map((row, idx) => {
          const rawTotal = parseFloat(row['total']?.replace(/[^0-9.-]+/g, "") || row['amount'] || 0);
          const rawReserve = parseFloat(row['reserve_amount']?.replace(/[^0-9.-]+/g, "") || row['reserve'] || 0);

          calculatedTotal += rawTotal;
          calculatedTrapped += rawReserve;

          return {
            id: `Seq ${idx + 1}`,
            revenue: rawTotal,
            reserve: rawReserve
          };
        }).slice(-15); // Show last 15 sequences for optimized density view

        setMetrics({
          total: calculatedTotal,
          trapped: calculatedTrapped,
          available: calculatedTotal - calculatedTrapped
        });
        setChartData(processed);
      }
    });
  };

  return (
    <div className="w-full bg-[#1b1e22] rounded-2xl border border-gray-800 p-8">
      {!chartData ? (
        <div className="w-full py-20 border-2 border-dashed border-gray-700 rounded-xl bg-[#0f1111] flex flex-col items-center justify-center text-center px-4">
          <Upload className="text-[#FF9900] mb-4 animate-pulse" size={48} />
          <input type="file" id="csvDrop" accept=".csv,.txt" onChange={handleFileUpload} className="hidden" />
          <label htmlFor="csvDrop" className="bg-[#FF9900] text-black font-black px-6 py-3 rounded cursor-pointer uppercase text-sm tracking-wider hover:bg-yellow-600 transition-all">
            Drop Settlement Report
          </label>
          <p className="text-gray-500 text-xs mt-4 flex items-center gap-2">
            <Shield size={14} /> Client-side Sandbox Engine. Absolute Privacy Guarantee.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#0f1111] p-6 rounded-xl border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black tracking-tight text-white flex items-center gap-2 uppercase text-sm">
                <Activity size={16} className="text-[#FF9900]" /> Liquidity Acceleration Matrix
              </h3>
              <span className="text-xs text-gray-500 font-mono">{fileMeta.name} ({fileMeta.size} KB)</span>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="id" stroke="#4a5568" fontSize={10} tickLine={false} />
                  <YAxis stroke="#4a5568" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#1b1e22', border: '1px solid #2d3748', borderRadius: '6px' }} />
                  <Bar dataKey="reserve" fill="#4a5568" name="Deferred (Locked)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="revenue" fill="#22c55e" name="Available Payout" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-[#0f1111] p-6 rounded-xl border border-gray-800">
            <div>
              <div className="mb-4 border-b border-gray-800 pb-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Trapped Capital Pool</span>
                <h4 className="text-3xl font-mono font-black text-gray-400 mt-1">${metrics.trapped.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h4>
              </div>
              <div className="mb-6">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Available Blueprint Capital</span>
                <h4 className="text-4xl font-mono font-black text-[#22c55e] mt-1">${metrics.available.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h4>
              </div>
            </div>
            <button onClick={() => window.print()} className="w-full bg-[#FF9900] text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-yellow-600 transition-all">
              Advance to Vault <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
