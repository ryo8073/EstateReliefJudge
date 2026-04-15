import React from 'react';
import { ReferenceItem, LandDataItem } from '../data/interfaces';

interface ResultDisplayProps {
  results: string[];
  description?: string;
  referenceData?: ReferenceItem[];
  matchedLandData?: LandDataItem[];
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results, description, referenceData, matchedLandData = [] }) => {
  const matched = (referenceData && results.length > 0)
    ? referenceData.filter(ref => results.includes(ref.exceptionType))
    : [];

  const isApplicable = results.length > 0 && !results.every(r => r === '適用不可');
  const isEmpty = results.length === 0;

  return (
    <section style={{
      background: isEmpty ? '#f8fafc' : isApplicable ? '#f0fdf4' : '#fef2f2',
      border: `2px solid ${isEmpty ? '#e2e8f0' : isApplicable ? '#86efac' : '#fca5a5'}`,
      borderRadius: 16,
      padding: '28px 24px',
      margin: '24px 0',
      textAlign: 'center',
      boxShadow: isEmpty ? 'none' : '0 4px 20px rgba(0,0,0,0.06)',
      transition: 'all 0.4s ease',
      animation: !isEmpty ? 'fadeInUp 0.4s ease-out' : undefined,
    }}>
      <h2 style={{
        fontSize: 16,
        fontWeight: 700,
        color: isEmpty ? '#94a3b8' : isApplicable ? '#166534' : '#991b1b',
        marginBottom: 16,
        letterSpacing: '0.05em',
        textTransform: 'uppercase' as const,
      }}>
        {isEmpty ? '条件を選択してください' : '判定結果'}
      </h2>

      {description && <p style={{ color: '#555', marginBottom: 16 }}>{description}</p>}

      {!isEmpty && (
        <div style={{ animation: 'fadeInUp 0.3s ease-out' }}>
          {results.map((r, i) => {
            const isNg = r === '適用不可';
            return (
              <div key={i} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 20,
                fontWeight: 800,
                color: isNg ? '#dc2626' : '#059669',
                background: isNg ? '#fee2e2' : '#dcfce7',
                borderRadius: 12,
                padding: '12px 24px',
                margin: '4px 6px',
                animation: 'pulseSuccess 0.6s ease-out',
              }}>
                <span style={{ fontSize: 22 }}>{isNg ? '\u2716' : '\u2714'}</span>
                {r}
              </div>
            );
          })}
        </div>
      )}

      {/* Detail table */}
      {matched.length > 0 && (
        <div style={{
          marginTop: 20,
          animation: 'fadeInUp 0.5s ease-out',
        }}>
          <table style={{
            margin: '0 auto',
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
            minWidth: 280,
            borderCollapse: 'separate',
            borderSpacing: 0,
            overflow: 'hidden',
          }}>
            <thead>
              <tr style={{ background: isApplicable ? '#dcfce7' : '#fee2e2' }}>
                <th style={{ padding: '10px 16px', fontWeight: 600, fontSize: 13, color: '#475569' }}>特例の種類</th>
                <th style={{ padding: '10px 16px', fontWeight: 600, fontSize: 13, color: '#475569' }}>限度面積</th>
                <th style={{ padding: '10px 16px', fontWeight: 600, fontSize: 13, color: '#475569' }}>減額割合</th>
              </tr>
            </thead>
            <tbody>
              {matched.map((item, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px 16px', textAlign: 'center', fontWeight: 600, color: '#1e293b' }}>{item.exceptionType}</td>
                  <td style={{ padding: '10px 16px', textAlign: 'center', color: '#475569' }}>{item.limitArea}</td>
                  <td style={{ padding: '10px 16px', textAlign: 'center', color: '#4f46e5', fontWeight: 700, fontSize: 17 }}>{item.reductionRate}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Notes */}
          {matchedLandData.some(ld => ld.note) && (
            <div style={{
              marginTop: 14,
              padding: '10px 16px',
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: 10,
              textAlign: 'left',
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#92400e', marginBottom: 4 }}>
                {'\u26A0'} 注意事項
              </div>
              {matchedLandData.filter(ld => ld.note).map((ld, i) => (
                <div key={i} style={{ color: '#92400e', fontSize: 13, lineHeight: 1.5 }}>
                  {ld.note}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ResultDisplay;
