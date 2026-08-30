import React from 'react';
import { Wallet, TrendingUp, AlertCircle } from 'lucide-react';

export default function BudgetDisplay({ total = 0, spent = 0, currency = '$' }) {
  const remaining = total - spent;
  const percentage = total > 0 ? Math.min(100, Math.max(0, (spent / total) * 100)) : 0;
  
  let statusColor = "bg-green-500";
  let statusText = "text-green-600";
  
  if (percentage > 75) {
    statusColor = "bg-red-500";
    statusText = "text-red-600";
  } else if (percentage > 50) {
    statusColor = "bg-[#F59E0B]"; 
    statusText = "text-[#F59E0B]";
  } else if (percentage > 0) {
    statusColor = "bg-[#00838F]"; 
    statusText = "text-[#00838F]";
  }

  const isOverBudget = remaining < 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F0F9FF] flex items-center justify-center">
            <Wallet size={20} className="text-[#0077B6]" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Total Budget</h3>
            <p className="text-xl font-bold text-[#1B2A4A]">{currency}{total.toLocaleString()}</p>
          </div>
        </div>
        {isOverBudget && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium">
            <AlertCircle size={14} />
            <span>Over Budget</span>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-gray-500">Spent: {currency}{spent.toLocaleString()}</span>
          <span className={statusText}>Left: {currency}{Math.max(0, remaining).toLocaleString()}</span>
        </div>
        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full ${statusColor} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1 flex items-center gap-1"><TrendingUp size={12} className="text-[#00838F]"/> Spent</span>
          <span className="text-lg font-semibold text-[#1B2A4A]">{percentage.toFixed(0)}%</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500 mb-1">Remaining</span>
          <span className={`text-lg font-semibold ${isOverBudget ? 'text-red-600' : 'text-[#00838F]'}`}>
            {isOverBudget ? '0' : (100 - percentage).toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
}
