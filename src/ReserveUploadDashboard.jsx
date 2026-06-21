import React, { useState } from 'react';
import { Upload, BarChart3, Download } from 'lucide-react';
import Papa from 'papaparse';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ReserveUploadDashboard() {
  const [data, setData] = useState(null);
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, { header: true, complete: (results) => {
      setData(results.data.map((r, i) => ({ name: i, amount: parseFloat(r.total), reserve: parseFloat(r.reserve_amount) })));
    }});
  };
  return (
    <div className="bg-[#1b1e22] p-8 rounded-xl border border-gray-700">
      {!data ? (
        <label className="block p-20 border-2 border-dashed border-gray-600 cursor-pointer text-center">
          <Upload className="mx-auto text-[#FF9900]" />
          <p>Upload Settlement CSV</p>
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar dataKey="reserve" fill="#22c55e" />
              <Bar dataKey="amount" fill="#4a5568" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
