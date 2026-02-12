import React, { useMemo, useState } from 'react';
import { Transaction } from '../types';

interface ReportsProps {
  transactions: Transaction[];
}

const Reports: React.FC<ReportsProps> = ({ transactions }) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return transactions;
    return transactions.filter(t =>
      t.category.toLowerCase().includes(q) ||
      (t.note || '').toLowerCase().includes(q) ||
      t.type.toLowerCase().includes(q) ||
      new Date(t.date).toLocaleDateString().toLowerCase().includes(q)
    );
  }, [transactions, query]);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">รายงานประวัติการบันทึก</h1>
            <p className="text-sm text-gray-500 dark:text-neutral-400">ประวัติรายการรายรับ รายจ่าย และการลงทุนที่บันทึกไว้</p>
          </div>
          <div className="w-full max-w-xs">
            <input
              placeholder="ค้นหาหมวดหมู่, หมายเหตุ, วันที่..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white h-10 px-3"
            />
          </div>
        </div>

        <div className="overflow-x-auto bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-neutral-900/20">
              <tr>
                <th className="px-4 py-3">วันที่</th>
                <th className="px-4 py-3">ประเภท</th>
                <th className="px-4 py-3">หมวดหมู่</th>
                <th className="px-4 py-3">จำนวน (฿)</th>
                <th className="px-4 py-3">หมายเหตุ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-gray-500 dark:text-neutral-400">ไม่พบรายการ</td>
                </tr>
              ) : (
                filtered.map(tx => (
                  <tr key={tx.id} className="border-t border-gray-100 dark:border-neutral-800">
                    <td className="px-4 py-3 align-top text-gray-700 dark:text-neutral-300">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3 align-top capitalize text-gray-700 dark:text-neutral-300">{tx.type}</td>
                    <td className="px-4 py-3 align-top text-gray-700 dark:text-neutral-300">{tx.category}</td>
                    <td className="px-4 py-3 align-top font-semibold text-gray-900 dark:text-white">{tx.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 align-top text-gray-600 dark:text-neutral-400">{tx.note || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
