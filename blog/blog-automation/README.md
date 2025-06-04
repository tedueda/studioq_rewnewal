# ブログ自動生成システム

スタジオQのブログ記事を自動生成・公開するシステムです。OpenAI API統合により、キーワードベースでの自動記事生成が可能です。

## 機能

### 基本機能
- JSONデータからHTMLブログ記事を自動生成
- ホームページのブログセクションを自動更新
- テンプレートベースの記事作成
- 複数記事の一括処理対応

### OpenAI API統合機能 🆕
- **キーワードベース記事生成**: 指定キーワードから自動でブログ記事を生成
- **SEO最適化**: メタタグ、構造化データ（JSON-LD）、Open Graphタグの自動生成
- **高品質コンテンツ**: GPT-4/GPT-3.5による専門的な記事作成
- **自動SEOスコア算出**: 生成記事の品質指標を自動計算

## 使用方法

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境設定（OpenAI API使用時）

`.env.example`をコピーして`.env`ファイルを作成：

```bash
cp .env.example .env
```

OpenAI APIキーを設定：
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. ブログ記事の作成

#### OpenAI APIを使用した自動生成 🆕

```bash
# 基本的な使用方法
npm run generate-ai "4K映像制作技術"

# カテゴリーを指定
node blog-generator.js generate-ai "音響技術" "技術情報"

# 複数キーワード
npm run generate-ai "ライブ配信 スタジオ設備"
```

#### 従来のJSONベース記事作成

```bash
# サンプルデータを使用
npm run create-sample

# 独自のJSONファイルを使用
npm run create custom-blog-data.json

# 直接実行
node blog-generator.js create blog-data-sample.json
```

### 4. テスト実行

```bash
# モックテスト（OpenAI APIキー不要、推奨）
npm run test-mock

# 完全統合テスト
npm run test-integration

# デモ実行（複数記事の一括生成）
npm run demo

# 実際のOpenAI APIテスト（APIキー必要）
npm run test

# または直接実行
node test-openai.js
```

## ファイル構造

```
blog-automation/
├── blog-generator.js              # メイン生成スクリプト
├── openai-integration.js          # OpenAI API統合モジュール 🆕
├── test-openai.js                 # OpenAIテストスクリプト 🆕
├── test-openai-mock.js            # モックテストスクリプト 🆕
├── test-integration.js            # 統合テストスクリプト 🆕
├── demo-ai-generation.js          # デモ実行スクリプト 🆕
├── blog-data-sample.json          # サンプルブログデータ
├── .env.example                   # 環境変数テンプレート 🆕
├── .env                           # 環境変数（要作成）🆕
├── templates/
│   ├── blog-post-template.html    # 標準ブログ記事テンプレート
│   └── blog-post-seo-template.html # SEO最適化テンプレート 🆕
├── package.json                   # 依存関係とスクリプト
└── README-OpenAI.md              # OpenAI統合詳細ドキュメント 🆕
```

## データ形式

### JSONデータ形式（従来）

```json
{
  "title": "記事タイトル",
  "slug": "article-slug",
  "date": "2025.04.01",
  "category": "カテゴリー",
  "image": "image.jpg",
  "excerpt": "記事の概要",
  "content": "<p>記事の内容（HTML形式）</p>",
  "author": "著者名"
}
```

### OpenAI生成データ形式 🆕

OpenAI APIで生成される記事には以下の追加フィールドが含まれます：

```json
{
  "title": "記事タイトル",
  "excerpt": "記事の概要",
  "content": "<p>記事の内容（HTML形式）</p>",
  "meta_description": "SEO用メタディスクリプション",
  "keywords": ["キーワード1", "キーワード2"],
  "seo_score": 85,
  "structured_data": { /* JSON-LD構造化データ */ },
  "category": "技術情報",
  "author": "スタジオQ",
  "date": "2025.04.01",
  "image": "slide1.jpg",
  "slug": "auto-generated-slug"
}
```

## 出力

- **ブログ記事**: `../blog/{slug}.html`
- **インデックス更新**: `../index.html`（トップページのブログセクション）

### テンプレート選択

- **SEO最適化記事**: OpenAI生成時は自動的にSEOテンプレートを使用
- **標準記事**: JSON入力時は従来のテンプレートを使用

## 環境変数

| 変数名 | 説明 | デフォルト値 |
|--------|------|-------------|
| `OPENAI_API_KEY` | OpenAI APIキー | - |
| `OPENAI_MODEL` | 使用するGPTモデル | `gpt-4` |
| `OPENAI_MAX_TOKENS` | 最大トークン数 | `2000` |
| `OPENAI_TEMPERATURE` | 創造性レベル | `0.7` |
| `SITE_NAME` | サイト名 | `スタジオQ` |
| `BASE_URL` | ベースURL | `https://studioq.jp` |
| `DEFAULT_AUTHOR` | デフォルト著者 | `スタジオQ` |
| `DEFAULT_CATEGORY` | デフォルトカテゴリー | `技術情報` |
| `DEFAULT_IMAGE` | デフォルト画像 | `slide1.jpg` |

## カスタマイズ

### テンプレートの編集

- `templates/blog-post-template.html`: 標準ブログ記事のテンプレート
- `templates/blog-post-seo-template.html`: SEO最適化ブログ記事のテンプレート 🆕
- `blog-generator.js`: 生成ロジックのカスタマイズ
- `CONFIG`オブジェクト: 各種設定（ディレクトリパスなど）

### OpenAI設定の調整 🆕

- `openai-integration.js`の`buildPrompt`メソッド: 生成プロンプトのカスタマイズ
- `.env`ファイル: APIキーやモデル設定の変更

## 注意事項

- 画像ファイルは手動で`../images/`ディレクトリに配置してください
- 生成されたHTMLファイルは既存ファイルを上書きします
- トップページの更新は最新3記事のみ表示されます
- OpenAI APIの使用には料金が発生します 🆕
- APIキーは絶対に公開しないでください 🆕

## 詳細ドキュメント

OpenAI API統合の詳細については、[README-OpenAI.md](./README-OpenAI.md)をご覧ください。
