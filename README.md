# 小規模宅地等の特例 判定アプリ (Next.js)

## 概要

相続税における「小規模宅地等の特例」の適用可能性を、土地や建物の利用状況に関する段階的な選択を通じて簡易的に判定するためのWebアプリケーションです。Next.jsを使用して構築されています。

## 機能

- **段階的フィルタリング:** 土地貸借、建物所有者、使用者、建物貸借、使用区分を選択し、適用条件を絞り込みます。
- **リアルタイム判定:** すべての条件を選択すると、適用可能性のある特例の種類（特定居住用、特定事業用、貸付事業用、適用不可など）が即座に表示されます。
- **補助情報:** 各特例の限度面積と減額割合の一覧表を常時表示し、参考にできます。
- **クリア機能:** ワンクリックで全ての選択をリセットできます。

## 技術スタック

- **フレームワーク:** [Next.js](https://nextjs.org/)
- **言語:** [TypeScript](https://www.typescriptlang.org/) (推奨) または JavaScript
- **状態管理:** React Hooks (`useState`, `useMemo`)
- **スタイリング:** (選択に応じて記載:例: CSS Modules, Tailwind CSS, Emotion, etc.)

## プロジェクト構造
/
├── components/ # 再利用可能なUIコンポーネント
│ ├── FilterSelector.tsx
│ ├── ResultDisplay.tsx
│ └── ReferenceTable.tsx
├── data/ # アプリケーションで使用する静的データ
│ ├── interfaces.ts # データ構造の型定義
│ ├── landData.ts # 判定ルールデータ (CSVから生成)
│ └── referenceData.ts # 補助情報データ (CSVから生成)
├── pages/ # Next.jsのページルート
│ └── calculator.tsx # メインの判定ページ (または index.tsx)
├── styles/ # スタイル関連ファイル
├── utils/ (任意) # ヘルパー関数 (複雑な場合)
├── public/ # 静的アセット
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md # このファイル


詳細な構造と役割については `PROJECT_STRUCTURE.md` を参照してください。

## セットアップとローカル実行

1.  **リポジトリをクローン:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **依存関係をインストール:**
    ```bash
    npm install
    # または
    yarn install
    # または
    pnpm install
    ```

3.  **(初回のみ) データファイルを作成:**
    提供されたCSVファイル (`land_data.csv`, `reference_data.csv`) をもとに、`/data/landData.ts` と `/data/referenceData.ts` を作成します。詳細な手順は `DATA_SETUP.md` を参照してください。

4.  **開発サーバーを起動:**
    ```bash
    npm run dev
    # または
    yarn dev
    # または
    pnpm dev
    ```

5.  ブラウザで `http://localhost:3000` (または指定されたポート) を開きます。

## ビルドとデプロイ

- **ビルド:**
  ```bash
  npm run build
  # または yarn build / pnpm build 