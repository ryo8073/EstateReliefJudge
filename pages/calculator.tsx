import React, { useState, useMemo } from 'react';
import { landData } from '../data/landData';
import { referenceData } from '../data/referenceData';
import FilterSelector from '../components/FilterSelector';
import ResultDisplay from '../components/ResultDisplay';
import ReferenceTable from '../components/ReferenceTable';

const filterLabels = [
  '土地貸借',
  '建物所有者',
  '建物使用者',
  '建物貸借',
  '使用区分',
];

const CalculatorPage: React.FC = () => {
  // 各選択肢の状態
  const [filters, setFilters] = useState<string[]>(['', '', '', '', '']);

  // 各段階の選択肢リストを動的に生成
  const optionsList = useMemo(() => {
    let filtered = landData;
    return filterLabels.map((label, idx) => {
      if (idx > 0) {
        for (let i = 0; i < idx; i++) {
          if (filters[i]) {
            filtered = filtered.filter(item => {
              const keys = ['landLeaseType', 'buildingOwner', 'buildingUser', 'buildingLeaseType', 'usageType'];
              return item[keys[i] as keyof typeof item] === filters[i];
            });
          }
        }
      }
      const keys = ['landLeaseType', 'buildingOwner', 'buildingUser', 'buildingLeaseType', 'usageType'];
      return Array.from(new Set(filtered.map(item => String(item[keys[idx] as keyof typeof item]))));
    });
  }, [filters]);

  // 判定結果
  const result = useMemo(() => {
    if (filters.some(f => !f)) return [];
    const filtered = landData.filter(item =>
      item.landLeaseType === filters[0] &&
      item.buildingOwner === filters[1] &&
      item.buildingUser === filters[2] &&
      item.buildingLeaseType === filters[3] &&
      item.usageType === filters[4]
    );
    const types = Array.from(new Set(filtered.map(item => item.exceptionType)));
    return types.length ? types : ['適用不可'];
  }, [filters]);

  // クリア
  const handleClear = () => setFilters(['', '', '', '', '']);

  return (
    <main style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#3730a3', marginBottom: 32, textAlign: 'center' }}>
        小規模宅地等の特例 判定アプリ
      </h1>
      <form
        style={{
          background: '#e0e7ff',
          borderRadius: 16,
          padding: 24,
          boxShadow: '0 2px 12px rgba(99,102,241,0.08)',
          marginBottom: 32,
        }}
        onSubmit={e => e.preventDefault()}
      >
        {filterLabels.map((label, idx) => (
          <FilterSelector
            key={label}
            label={label}
            options={optionsList[idx]}
            value={filters[idx]}
            onChange={val => setFilters(f => f.map((v, i) => (i === idx ? val : (i > idx ? '' : v))))}
            disabled={idx > 0 && !filters[idx - 1]}
          />
        ))}
        <button
          type="button"
          onClick={handleClear}
          style={{
            marginTop: 12,
            background: '#fff',
            color: '#6366f1',
            border: '2px solid #6366f1',
            borderRadius: 6,
            padding: '8px 20px',
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            float: 'right',
            boxShadow: '0 1px 4px rgba(99,102,241,0.07)',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          クリア
        </button>
      </form>
      <ResultDisplay results={result} referenceData={referenceData} />
      <ReferenceTable data={referenceData} />
    </main>
  );
};

export default CalculatorPage; 