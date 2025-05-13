import React from 'react';
import { ReferenceItem } from '../data/interfaces';

interface ResultDisplayProps {
  results: string[];
  description?: string;
  referenceData?: ReferenceItem[];
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results, description, referenceData }) => {
  // 結果に該当するreferenceDataを抽出
  const matched = (referenceData && results.length > 0)
    ? referenceData.filter(ref => results.includes(ref.exceptionType))
    : [];

  return (
    <section style={{
      background: '#f9fafb',
      border: '2px solid #6366f1',
      borderRadius: 12,
      padding: '24px 20px',
      margin: '32px 0',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(99,102,241,0.06)',
    }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#3730a3', marginBottom: 12 }}>判定結果</h2>
      {description && <p style={{ color: '#555', marginBottom: 16 }}>{description}</p>}
      {results.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {results.map((r, i) => (
            <li key={i} style={{
              fontSize: 18,
              fontWeight: 600,
              color: r === '適用不可' ? '#ef4444' : '#2563eb',
              background: r === '適用不可' ? '#fee2e2' : '#dbeafe',
              borderRadius: 8,
              padding: '10px 0',
              marginBottom: 8,
            }}>{r}</li>
          ))}
        </ul>
      ) : (
        <div style={{ color: '#888', fontSize: 16 }}>条件を選択してください</div>
      )}
      {/* 限度面積・減額割合の追加表示 */}
      {matched.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <table style={{ margin: '0 auto', background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #e0e7ff', minWidth: 260 }}>
            <thead>
              <tr style={{ background: '#e0e7ff' }}>
                <th style={{ padding: 8, fontWeight: 600, color: '#3730a3' }}>限度面積</th>
                <th style={{ padding: 8, fontWeight: 600, color: '#3730a3' }}>減額割合</th>
              </tr>
            </thead>
            <tbody>
              {matched.map((item, i) => (
                <tr key={i}>
                  <td style={{ padding: 8, textAlign: 'center' }}>{item.limitArea}</td>
                  <td style={{ padding: 8, textAlign: 'center', color: '#2563eb', fontWeight: 600 }}>{item.reductionRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ResultDisplay; 