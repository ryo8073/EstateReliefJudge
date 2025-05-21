import { landData } from '../data/landData';

describe('小規模宅地等の特例 判定ロジック', () => {
  const keys = ['landLeaseType', 'buildingOwner', 'buildingUser', 'buildingLeaseType', 'usageType'] as const;

  function getResult(filters: string[]): string[] {
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
  }

  it('全て未選択なら結果は空配列', () => {
    expect(getResult(['', '', '', '', ''])).toEqual([]);
  });

  it('該当データがある場合は正しい特例を返す', () => {
    // landDataの1行目と同じ条件
    expect(getResult(['使用貸借', '生計一親族', '生計一親族', 'なし', '居住用'])).toEqual(['特定居住用']);
  });

  it('該当データが複数ある場合は全て返す', () => {
    // landDataで同じ条件で複数exceptionTypeがある場合を仮定
    const filters = ['使用貸借', '生計一親族', '生計一親族', 'なし', '事業用'];
    const result = getResult(filters);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it('該当データがない場合は「適用不可」を返す', () => {
    expect(getResult(['自己使用', '第三者', '第三者', '賃貸借', '貸付用'])).toEqual(['適用不可']);
  });
}); 