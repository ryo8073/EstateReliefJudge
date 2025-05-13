/**
 * 判定ルールデータの各行を表すインターフェース
 * (ExcelのB列からJ列に相当)
 */
export interface LandDataItem {
  id: number; // Reactのkeyなどで使用するためのユニークID (CSVに無ければ生成)
  landLeaseType: string;      // B列: 土地貸借 (例: "使用貸借")
  buildingOwner: string;      // C列: 建物所有者 (例: "生計一親族")
  buildingUser: string;       // D列: 建物使用者 (例: "生計一親族")
  buildingLeaseType: string;  // E列: 建物貸借 (例: "なし")
  usageType: string;          // F列: 使用区分 (例: "居住用")
  exceptionType: string;      // G列: 小規模宅地等の特例 (例: "特定居住用")
  limitArea: string;          // H列: 限度面積 (例: "330㎡")
  reductionRate: string;      // J列: 減額割合 (例: "80%")
}

/**
 * 補助情報データの各行を表すインターフェース
 * (ExcelのK列からM列に相当)
 */
export interface ReferenceItem {
  exceptionType: string; // K列: 特例の種類 (例: "特定居住用")
  limitArea: string;     // L列: 限度面積 (例: "330㎡")
  reductionRate: string; // M列: 減額割合 (例: "80%")
} 