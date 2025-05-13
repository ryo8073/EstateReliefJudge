# プロジェクト構造と主要コンポーネント/Agent定義

## 1. ディレクトリ構造
/
├── components/ # 再利用可能なUIコンポーネント
│ ├── FilterSelector.tsx # 各段階の選択用ドロップダウン
│ ├── ResultDisplay.tsx # 最終判定結果の表示エリア
│ └── ReferenceTable.tsx # 補助情報テーブル
├── data/ # アプリケーションで使用する静的データ
│ ├── interfaces.ts # データ構造のTypeScriptインターフェース定義
│ ├── landData.ts # 判定ルールマスターデータ (CSVから生成)
│ └── referenceData.ts # 補助情報マスターデータ (CSVから生成)
├── pages/ # Next.jsのページコンポーネント
│ └── calculator.tsx # メインの判定アプリケーションページ (or index.tsx)
├── styles/ # グローバルCSS、CSS Modulesなど
├── utils/ (任意) # 共通ヘルパー関数 (フィルタリングロジックなど)
├── public/ # 画像などの静的アセット
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json # TypeScript設定
└── README.md
└── PRD.md
└── CONTRIBUTING.md
└── PROJECT_STRUCTURE.md # このファイル
└── DATA_SETUP.md # データ設定ガイド


## 2. Agent (役割) 定義

ソフトウェアの役割分担に基づくエージェントの定義です。

*   **Root Agent (Controller/Orchestrator):**
    *   **役割:** アプリケーション全体の状態（ユーザーの選択肢）を管理し、UIの更新フローを制御する。ユーザー操作を受け付け、他のエージェント（主にCalculation AgentとUI Agent）に指示を出す。
    *   **実装:** `/pages/calculator.tsx` 内のReactコンポーネント。`useState`で各選択ステップの状態を保持し、`FilterSelector`からの`onChange`イベントを処理し、`ResultDisplay`や他の`FilterSelector`に必要なデータを渡す。クリアボタンのロジックも担当。
*   **Calculation Agent (Logic/Filtering Engine):**
    *   **役割:** 現在の選択状態と`landData`に基づき、次のドロップダウンに表示するべき選択肢リスト、および最終的な「小規模宅地等の特例」の結果リストを計算（フィルタリングとユニーク化）する。
    *   **実装:** `/pages/calculator.tsx` 内の `useMemo` フックでラップされたフィルタリングロジック。複雑化する場合は `/utils/filtering.ts` などに独立した関数として抽出可能。
*   **UI Agent (View Components):**
    *   **役割:** ユーザーインターフェースの特定の部分（ドロップダウン、結果表示、テーブル）のレンダリングを担当する。Root Agentから表示に必要なデータ（選択肢リスト、結果リスト、補助データ）をPropsとして受け取る。
    *   **実装:** `/components` ディレクトリ内の各Reactコンポーネント (`FilterSelector.tsx`, `ResultDisplay.tsx`, `ReferenceTable.tsx`)。
*   **Data Agent (Data Provider):**
    *   **役割:** アプリケーションが必要とする静的な判定ルールデータと補助情報データを提供する。
    *   **実装:** `/data` ディレクトリ内の `landData.ts`, `referenceData.ts` および型定義 `interfaces.ts`。

## 3. データ構造 (TypeScript Interfaces)

データの一貫性を保つためにTypeScriptインターフェースを定義します。

```typescript
// /data/interfaces.ts

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
``` 