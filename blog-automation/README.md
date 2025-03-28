# スタジオQ ブログ自動化システム

このシステムは、スタジオQのブログ記事を簡単に作成し、トップページに自動的に掲載するためのツールです。

## 機能

- JSONデータからブログ記事HTMLを自動生成
- トップページのブログセクションを自動更新
- テンプレートを使用した一貫性のあるデザイン

## セットアップ

1. 必要なパッケージをインストール:

```bash
cd blog-automation
npm install
```

## 使い方

### 1. ブログ記事データの準備

`blog-data.json`ファイルを作成し、以下のような形式でブログ記事のデータを定義します:

```json
{
  "title": "記事のタイトル",
  "slug": "url-friendly-slug",
  "date": "2025.04.01",
  "category": "カテゴリー名",
  "image": "image-filename.jpg",
  "excerpt": "記事の概要（トップページに表示）",
  "content": "記事の本文（HTMLタグ使用可）",
  "author": "著者名"
}
```

サンプルとして`blog-data-sample.json`を参考にしてください。

### 2. ブログ記事の生成と公開

準備したJSONファイルを使用して、ブログ記事を生成します:

```bash
# カスタムデータファイルを使用
node blog-generator.js create path/to/your-blog-data.json

# または、デフォルトのblog-data.jsonを使用
npm run create

# サンプルデータを使用
npm run create-sample
```

### 3. 自動化のアイデア

以下のような方法で、さらに自動化することができます:

#### 定期的な記事公開（cron jobを使用）

```bash
# 毎週月曜日の朝9時に実行する例
0 9 * * 1 cd /path/to/blog-automation && npm run create
```

#### CMS連携

- HeadlessCMS（Contentful、Strapi等）と連携し、CMSからデータを取得して記事を生成
- CMSのWebhookを使用して、コンテンツ更新時に自動的に記事を生成・公開

#### GitHubワークフロー

- GitHubリポジトリでブログ記事のマークダウンを管理
- GitHub Actionsを使用して、新しい記事がプッシュされたときに自動的にHTMLに変換して公開

## カスタマイズ

- `templates/blog-post-template.html`: ブログ記事のテンプレート
- `blog-generator.js`: 生成ロジックのカスタマイズ
- `CONFIG`オブジェクト: 各種設定（ディレクトリパスなど）

## 注意事項

- 画像ファイルは`/images`ディレクトリに事前に配置しておく必要があります
- スラグ（URLフレンドリーな文字列）は一意である必要があります
- 日本語のスラグは自動的に処理されないため、英数字のスラグを推奨します
