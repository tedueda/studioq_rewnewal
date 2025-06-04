# OpenAI API統合ブログ自動生成システム

## 概要

このシステムは、OpenAI APIを使用してキーワードベースでブログ記事を自動生成し、SEO最適化されたHTMLファイルを出力します。

## 機能

- **OpenAI API統合**: GPT-4/GPT-3.5を使用した高品質なコンテンツ生成
- **SEO最適化**: メタタグ、構造化データ（JSON-LD）、Open Graphタグの自動生成
- **キーワードベース生成**: 指定されたキーワードに基づいた専門的な記事作成
- **既存システム互換**: 従来のJSONベース記事作成機能を維持

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`をコピーして`.env`ファイルを作成し、必要な値を設定してください：

```bash
cp .env.example .env
```

`.env`ファイルの設定例：

```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4
OPENAI_MAX_TOKENS=2000
OPENAI_TEMPERATURE=0.7

SITE_NAME=スタジオQ
BASE_URL=https://studioq.jp
DEFAULT_AUTHOR=スタジオQ

DEFAULT_CATEGORY=技術情報
DEFAULT_IMAGE=slide1.jpg
```

### 3. OpenAI APIキーの取得

1. [OpenAI Platform](https://platform.openai.com/)にアクセス
2. APIキーを生成
3. `.env`ファイルの`OPENAI_API_KEY`に設定

## 使用方法

### OpenAI APIを使用した記事生成

```bash
# 基本的な使用方法
npm run generate-ai "4K映像制作技術"

# カテゴリーを指定
node blog-generator.js generate-ai "音響技術" "技術情報"

# 複数キーワード
npm run generate-ai "ライブ配信 スタジオ設備"
```

### 従来のJSONベース記事作成

```bash
# サンプルデータを使用
npm run create-sample

# 独自のJSONファイルを使用
npm run create custom-blog-data.json
```

### テスト実行

```bash
# モックテスト（OpenAI APIキー不要）
npm run test-mock

# 完全統合テスト（モック使用）
npm run test-integration

# デモ実行（複数記事の一括生成）
npm run demo

# 実際のOpenAI APIテスト（APIキー必要）
npm run test

# または直接実行
node test-openai.js
```

## 生成される記事の特徴

### SEO最適化

- **メタタグ**: title, description, keywords, author
- **Open Graphタグ**: Facebook/SNS共有最適化
- **Twitterカード**: Twitter共有最適化
- **構造化データ**: JSON-LD形式のschema.org準拠データ

### コンテンツ品質

- **専門性**: 映像制作・音響技術に特化した内容
- **読みやすさ**: 適切な見出し構造とHTML形式
- **SEOスコア**: 自動算出されるSEO品質指標
- **キーワード最適化**: 自然なキーワード配置（密度2-3%）

## ファイル構造

```
blog-automation/
├── blog-generator.js          # メイン生成スクリプト
├── openai-integration.js     # OpenAI API統合モジュール
├── test-openai.js            # テストスクリプト
├── .env.example              # 環境変数テンプレート
├── .env                      # 環境変数（要作成）
├── package.json              # 依存関係とスクリプト
├── templates/
│   ├── blog-post-template.html     # 標準テンプレート
│   └── blog-post-seo-template.html # SEO最適化テンプレート
└── README-OpenAI.md          # このファイル
```

## 生成されるファイル

### 出力先

- **ブログ記事**: `../blog/{slug}.html`
- **インデックス更新**: `../index.html`（トップページのブログセクション）

### テンプレート選択

- **SEO最適化記事**: OpenAI生成時は自動的にSEOテンプレートを使用
- **標準記事**: JSON入力時は従来のテンプレートを使用

## トラブルシューティング

### よくあるエラー

1. **OpenAI APIキーエラー**
   ```
   エラー: OPENAI_API_KEYが設定されていません
   ```
   → `.env`ファイルにAPIキーを設定してください

2. **JSON形式エラー**
   ```
   OpenAI APIからの応答がJSON形式ではありません
   ```
   → APIの応答が不正な場合があります。再実行してください

3. **テンプレートファイルエラー**
   ```
   テンプレートファイルが見つかりません
   ```
   → `templates/`ディレクトリにテンプレートファイルが存在することを確認

### デバッグ方法

1. **モックテスト実行（推奨）**
   ```bash
   npm run test-mock
   npm run test-integration
   ```

2. **実際のAPIテスト**
   ```bash
   npm run test
   ```

3. **詳細ログ確認**
   ```bash
   DEBUG=* node blog-generator.js generate-ai "テストキーワード"
   ```

4. **生成されたファイルの確認**
   ```bash
   ls -la ../blog/
   ```

## カスタマイズ

### プロンプトの調整

`openai-integration.js`の`buildPrompt`メソッドを編集して、生成される記事の内容や形式をカスタマイズできます。

### テンプレートの変更

`templates/blog-post-seo-template.html`を編集して、記事のレイアウトやSEO要素をカスタマイズできます。

### 設定の変更

`.env`ファイルで以下の設定を調整できます：

- `OPENAI_MODEL`: 使用するGPTモデル
- `OPENAI_MAX_TOKENS`: 生成される記事の最大長
- `OPENAI_TEMPERATURE`: 創造性のレベル（0.0-1.0）

## 注意事項

- OpenAI APIの使用には料金が発生します
- APIキーは絶対に公開しないでください
- 生成された記事は公開前に内容を確認することを推奨します
- 画像ファイルは手動で配置する必要があります
