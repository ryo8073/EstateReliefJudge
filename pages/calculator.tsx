import React, { useState, useMemo, useCallback } from 'react';
import { landData } from '../data/landData';
import { referenceData } from '../data/referenceData';
import FilterSelector from '../components/FilterSelector';
import ResultDisplay from '../components/ResultDisplay';
import ReferenceTable from '../components/ReferenceTable';
import Head from 'next/head';

const filterLabels = [
  '土地貸借',
  '建物所有者',
  '建物使用者',
  '建物貸借',
  '使用区分',
];

const filterKeys = ['landLeaseType', 'buildingOwner', 'buildingUser', 'buildingLeaseType', 'usageType'] as const;

const helpTexts: Record<string, string> = {
  '土地貸借': '被相続人（亡くなった方）の土地の貸借関係を選択してください',
  '建物所有者': '土地上の建物を所有している方を選択してください',
  '建物使用者': '実際に建物を使用している方を選択してください',
  '建物貸借': '建物の貸借関係を選択してください',
  '使用区分': '土地・建物の使用目的を選択してください',
};

const CalculatorPage: React.FC = () => {
  const [filters, setFilters] = useState<string[]>(['', '', '', '', '']);

  // Optimized: Reset filtered per iteration to avoid redundant re-filtering
  const optionsList = useMemo(() => {
    return filterLabels.map((_label, idx) => {
      let filtered = landData;
      for (let i = 0; i < idx; i++) {
        if (filters[i]) {
          filtered = filtered.filter(item => item[filterKeys[i]] === filters[i]);
        }
      }
      return Array.from(new Set(filtered.map(item => String(item[filterKeys[idx]]))));
    });
  }, [filters]);

  const result = useMemo(() => {
    if (filters.some(f => !f)) return [];
    const filtered = landData.filter(item =>
      filterKeys.every((key, i) => item[key] === filters[i])
    );
    const types = Array.from(new Set(filtered.map(item => item.exceptionType)));
    return types.length ? types : ['適用不可'];
  }, [filters]);

  const matchedLandData = useMemo(() => {
    if (filters.some(f => !f)) return [];
    return landData.filter(item =>
      filterKeys.every((key, i) => item[key] === filters[i])
    );
  }, [filters]);

  const handleFilterChange = useCallback((idx: number, val: string) => {
    setFilters(f => f.map((v, i) => (i === idx ? val : (i > idx ? '' : v))));
  }, []);

  const handleClear = useCallback(() => setFilters(['', '', '', '', '']), []);

  const completedCount = filters.filter(f => !!f).length;
  const firstEmptyIdx = filters.findIndex(f => !f);
  const allCompleted = completedCount === filterLabels.length;

  return (
    <>
      <Head>
        <title>小規模宅地等の特例 判定ツール</title>
        <meta name="description" content="相続税の小規模宅地等の特例が適用できるかを5つの条件から判定するツール" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main style={{ maxWidth: 540, margin: '32px auto', padding: '0 16px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h1 style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#1e1b4b',
            marginBottom: 6,
            letterSpacing: '-0.02em',
          }}>
            小規模宅地等の特例 判定ツール
          </h1>
          <p style={{
            fontSize: 13,
            color: '#64748b',
            margin: 0,
          }}>
            5つの条件を選択すると、適用可能な特例を自動判定します
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          background: '#e2e8f0',
          borderRadius: 100,
          height: 6,
          marginBottom: 24,
          overflow: 'hidden',
        }}>
          <div style={{
            background: allCompleted
              ? 'linear-gradient(90deg, #22c55e, #16a34a)'
              : 'linear-gradient(90deg, #818cf8, #6366f1)',
            height: '100%',
            width: `${(completedCount / filterLabels.length) * 100}%`,
            borderRadius: 100,
            transition: 'width 0.4s ease, background 0.4s ease',
          }} />
        </div>

        {/* Filter form */}
        <form
          style={{
            background: '#fff',
            borderRadius: 18,
            padding: '24px 20px 16px',
            boxShadow: '0 1px 12px rgba(0,0,0,0.06)',
            marginBottom: 8,
            border: '1px solid #e2e8f0',
          }}
          onSubmit={e => e.preventDefault()}
        >
          {filterLabels.map((label, idx) => {
            const isActive = firstEmptyIdx === idx;
            return (
              <FilterSelector
                key={label}
                label={label}
                options={optionsList[idx]}
                value={filters[idx]}
                onChange={val => handleFilterChange(idx, val)}
                disabled={idx > 0 && !filters[idx - 1]}
                isActive={isActive}
                stepNumber={idx + 1}
                totalSteps={filterLabels.length}
                helpText={helpTexts[label]}
              />
            );
          })}

          {/* Clear button */}
          {completedCount > 0 && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingTop: 4,
            }}>
              <button
                type="button"
                onClick={handleClear}
                style={{
                  background: 'transparent',
                  color: '#94a3b8',
                  border: '1px solid #e2e8f0',
                  borderRadius: 8,
                  padding: '6px 16px',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={e => {
                  e.currentTarget.style.color = '#ef4444';
                  e.currentTarget.style.borderColor = '#fca5a5';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.color = '#94a3b8';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                {'\u21BA'} やり直す
              </button>
            </div>
          )}
        </form>

        {/* Result */}
        <ResultDisplay
          results={result}
          referenceData={referenceData}
          matchedLandData={matchedLandData}
        />

        {/* Reference table */}
        <ReferenceTable data={referenceData} highlightType={result} />

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '16px 0 32px',
          fontSize: 11,
          color: '#94a3b8',
          lineHeight: 1.6,
        }}>
          <div>本ツールは参考判定用です。実際の申告は税理士にご相談ください。</div>
          <div style={{ marginTop: 2 }}>
            国税庁「
            <a
              href="https://www.nta.go.jp/taxes/shiraberu/taxanswer/sozoku/4124.htm"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#818cf8' }}
            >
              No.4124 相続した事業の用に供されていた宅地等の価額の特例
            </a>
            」準拠
          </div>
        </footer>
      </main>
    </>
  );
};

export default CalculatorPage;
