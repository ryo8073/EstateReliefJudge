import React, { useState } from 'react';
import { ReferenceItem } from '../data/interfaces';

interface ReferenceTableProps {
  data: ReferenceItem[];
  highlightType?: string[];
}

const ReferenceTable: React.FC<ReferenceTableProps> = ({ data, highlightType = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{
      background: '#fff',
      borderRadius: 14,
      padding: 0,
      margin: '24px 0',
      boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
      overflow: 'hidden',
      border: '1px solid #e2e8f0',
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 700,
          color: '#475569',
          letterSpacing: '0.02em',
        }}
      >
        <span>{'\u{1F4CB}'} 特例一覧（限度面積・減額割合）</span>
        <span style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease',
          fontSize: 12,
        }}>
          {'\u25BC'}
        </span>
      </button>

      {isOpen && (
        <div style={{
          padding: '0 16px 16px',
          animation: 'slideDown 0.3s ease-out',
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: 0,
            borderRadius: 10,
            overflow: 'hidden',
            fontSize: 14,
          }}>
            <thead>
              <tr style={{ background: '#f1f5f9' }}>
                <th style={{ padding: '10px 12px', fontWeight: 600, color: '#475569', textAlign: 'left' }}>特例の種類</th>
                <th style={{ padding: '10px 12px', fontWeight: 600, color: '#475569', textAlign: 'center' }}>限度面積</th>
                <th style={{ padding: '10px 12px', fontWeight: 600, color: '#475569', textAlign: 'center' }}>減額割合</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => {
                const isHighlighted = highlightType.includes(item.exceptionType);
                return (
                  <tr
                    key={i}
                    style={{
                      background: isHighlighted ? '#eef2ff' : i % 2 === 0 ? '#fafbfc' : '#fff',
                      transition: 'background 0.2s ease',
                      fontWeight: isHighlighted ? 600 : 400,
                    }}
                  >
                    <td style={{
                      padding: '10px 12px',
                      color: isHighlighted ? '#4f46e5' : '#1e293b',
                      borderBottom: i < data.length - 1 ? '1px solid #f1f5f9' : 'none',
                    }}>
                      {isHighlighted && '\u2192 '}{item.exceptionType}
                    </td>
                    <td style={{
                      padding: '10px 12px',
                      textAlign: 'center',
                      color: '#475569',
                      borderBottom: i < data.length - 1 ? '1px solid #f1f5f9' : 'none',
                    }}>
                      {item.limitArea}
                    </td>
                    <td style={{
                      padding: '10px 12px',
                      textAlign: 'center',
                      color: isHighlighted ? '#4f46e5' : '#475569',
                      fontWeight: isHighlighted ? 700 : 500,
                      borderBottom: i < data.length - 1 ? '1px solid #f1f5f9' : 'none',
                    }}>
                      {item.reductionRate}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReferenceTable;
