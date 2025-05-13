import React from 'react';
import { ReferenceItem } from '../data/interfaces';

interface ReferenceTableProps {
  data: ReferenceItem[];
}

const ReferenceTable: React.FC<ReferenceTableProps> = ({ data }) => {
  return (
    <div style={{
      background: '#f1f5f9',
      borderRadius: 12,
      padding: '20px 16px',
      margin: '32px 0',
      boxShadow: '0 1px 6px rgba(59,130,246,0.07)',
      overflowX: 'auto',
    }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#2563eb', marginBottom: 12 }}>特例ごとの限度面積・減額割合</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8 }}>
        <thead>
          <tr style={{ background: '#e0e7ff' }}>
            <th style={{ padding: 10, fontWeight: 600, color: '#3730a3', borderRadius: '8px 0 0 0' }}>特例の種類</th>
            <th style={{ padding: 10, fontWeight: 600, color: '#3730a3' }}>限度面積</th>
            <th style={{ padding: 10, fontWeight: 600, color: '#3730a3', borderRadius: '0 8px 0 0' }}>減額割合</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#f8fafc' : '#fff' }}>
              <td style={{ padding: 10, textAlign: 'center', fontWeight: 500 }}>{item.exceptionType}</td>
              <td style={{ padding: 10, textAlign: 'center' }}>{item.limitArea}</td>
              <td style={{ padding: 10, textAlign: 'center', color: '#2563eb', fontWeight: 600 }}>{item.reductionRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReferenceTable; 