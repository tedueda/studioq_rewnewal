# スタジオQ ブログ自動生成システム

このシステムは、指定されたキーワードに基づいてブログ記事を自動生成し、スタジオQのウェブサイトに投稿するためのツールです。

## 機能

- 指定されたキーワードに基づいたブログ記事の自動生成
- OpenAI APIを使用した高品質なコンテンツ作成
- SEO対策済みのHTML形式での出力
- ブログインデックスページの自動更新
- GitHub Actionsによる定期実行

## セットアップ

1. 必要なパッケージをインストール：

```bash
npm install
```

2. `.env.example`ファイルを`.env`にコピーし、必要な情報を入力：

```bash
cp .env.example .env
```

3. `.env`ファイルを編集し、OpenAI APIキーを設定：

```
OPENAI_API_KEY=your_openai_api_key_here
```

## 使用方法

### 手動実行

特定のキーワードでブログ記事を生成：

```bash
node generate.js "4K映像制作"
```

キーワードを指定せずにランダムなキーワードで記事を生成：

```bash
node generate.js
```

### 自動実行（GitHub Actions）

このリポジトリには、GitHub Actionsの設定ファイルが含まれています。これにより、毎日指定された時間にブログ記事が自動的に生成されます。

## GitHub Actions設定

`.github/workflows/daily-blog-post.yml`ファイルを作成し、以下の内容を設定します：

```yaml
name: Daily Blog Post

on:
  schedule:
    # 毎日午前9時（UTC 0:00）に実行
    - cron: '0 0 * * *'
  workflow_dispatch:  # 手動実行用

jobs:
  generate-blog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: cd blog-generator && npm install
        
      - name: Generate blog post
        env:
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
        run: cd blog-generator && node generate.js
        
      - name: Commit and push if changes
        run: |
          git config --global user.name 'Blog Bot'
          git config --global user.email 'bot@studioq.co.jp'
          git add -A
          git diff --quiet && git diff --staged --quiet || git commit -m "Add daily blog post $(date +'%Y-%m-%d')"
          git push
```

## ディレクトリ構造

```
blog-generator/
├── generate.js        # メインスクリプト
├── package.json       # 依存関係
├── .env               # 環境変数（APIキーなど）
├── .env.example       # 環境変数のサンプル
├── blog-style.css     # ブログ用スタイルシート
└── README.md          # このドキュメント
```

## カスタマイズ

`generate.js`ファイル内の以下の変数を編集することで、生成されるブログ記事の内容をカスタマイズできます：

- `keywords`: 記事生成に使用されるキーワードのリスト
- `categories`: ブログ記事のカテゴリーリスト

## 注意事項

- OpenAI APIの使用には料金が発生します。使用量に応じた課金が行われるため、予算を考慮して使用してください。
- 自動生成されたコンテンツは、公開前に内容を確認することをお勧めします。
- 画像は自動生成されないため、必要に応じて手動で追加してください。

## ライセンス

このプロジェクトはスタジオQの内部使用を目的としています。
