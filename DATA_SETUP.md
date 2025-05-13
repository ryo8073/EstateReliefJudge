# データ設定ガイド

このアプリケーションは、判定ロジックと補助情報を定義したデータファイルに依存しています。以下の手順に従って、提供されたCSVファイルから必要なTypeScriptファイルを作成してください。

**必要なCSVファイル:**

1.  `land_data.csv`: 判定ルールデータ（ExcelのB3:J102相当）。以下の列が含まれていることを想定しています（順番は異なる可能性あり）：
    *   土地貸借
    *   建物所有者
    *   建物使用者
    *   建物貸借
    *   使用区分
    *   小規模宅地等の特例
    *   限度面積
    *   減額割合
2.  `reference_data.csv`: 補助情報データ（ExcelのK13:M18相当）。以下の列が含まれていることを想定しています：
    *   特例の種類
    *   限度面積
    *   減額割合

**作成するファイル:**

1.  `/data/interfaces.ts`: データ構造を定義するTypeScriptインターフェースファイル。（これは `PROJECT_STRUCTURE.md` に記載の内容をコピー＆ペーストしてください）
2.  `/data/landData.ts`: `land_data.csv` の内容を `LandDataItem[]` 型の配列としてエクスポートするファイル。
3.  `/data/referenceData.ts`: `reference_data.csv` の内容を `ReferenceItem[]` 型の配列としてエクスポートするファイル。

**手順 (Cursorを使用する場合の指示例):**

1.  **インターフェースファイル作成:**
    *   `PROJECT_STRUCTURE.md` に記載されている `/data/interfaces.ts` の内容をコピーし、`/data/interfaces.ts` という名前でファイルを作成・保存してください。

2.  **`landData.ts` 作成:**
    *   `land_data.csv` ファイルの内容を読み込んでください。
    *   CSVの各行を `/data/interfaces.ts` で定義された `LandDataItem` インターフェースにマッピングしてください。CSVのヘッダー名をインターフェースのプロパティ名（`landLeaseType`, `buildingOwner` など）に対応させてください。
    *   各データオブジェクトにユニークな `id` プロパティ（連番など）を追加してください。
    *   結果を `LandDataItem[]` 型の配列として定義し、`landData` という名前で `export const` を使ってエクスポートするTypeScriptファイル (`/data/landData.ts`) を生成してください。
    *   例 (`/data/landData.ts` の冒頭):
        ```typescript
        import { LandDataItem } from './interfaces';

        export const landData: LandDataItem[] = [
          { id: 1, landLeaseType: "CSVの該当値", buildingOwner: "CSVの該当値", /* ...他のプロパティ */ reductionRate: "CSVの該当値" },
          { id: 2, landLeaseType: "CSVの該当値", buildingOwner: "CSVの該当値", /* ...他のプロパティ */ reductionRate: "CSVの該当値" },
          // ... CSVファイルの全行に対応するデータ
        ];
        ```

3.  **`referenceData.ts` 作成:**
    *   `reference_data.csv` ファイルの内容を読み込んでください。
    *   CSVの各行を `/data/interfaces.ts` で定義された `ReferenceItem` インターフェースにマッピングしてください。CSVのヘッダー名をインターフェースのプロパティ名（`exceptionType`, `limitArea`, `reductionRate`）に対応させてください。
    *   結果を `ReferenceItem[]` 型の配列として定義し、`referenceData` という名前で `export const` を使ってエクスポートするTypeScriptファイル (`/data/referenceData.ts`) を生成してください。
    *   例 (`/data/referenceData.ts` の冒頭):
        ```typescript
        import { ReferenceItem } from './interfaces';

        export const referenceData: ReferenceItem[] = [
          { exceptionType: "CSVの該当値", limitArea: "CSVの該当値", reductionRate: "CSVの該当値" },
          { exceptionType: "CSVの該当値", limitArea: "CSVの該当値", reductionRate: "CSVの該当値" },
          // ... CSVファイルの全行に対応するデータ
        ];
        ```

これらのファイルが正しく作成されれば、アプリケーションはデータを利用して動作する準備が整います。

@land_data.csv @reference_data.csv 