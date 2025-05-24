# StudioQ Renewal

StudioQのウェブサイトリニューアルプロジェクトです。

## デプロイ方法

### GitHub Pages
このプロジェクトはGitHub Pagesを使用して自動的にデプロイされます。`main`ブランチにプッシュすると、GitHub Actionsによって`gh-pages`ブランチにデプロイされます。

### Vercel
Vercelでデプロイする場合は、リポジトリをインポートするだけで、`vercel.json`の設定に基づいて自動的にデプロイされます。

### Bolt.new
Bolt.newでデプロイする場合は、以下の手順に従ってください：

1. Bolt.newにログインします
2. 「新しいプロジェクト」を選択
3. このGitHubリポジトリ（https://github.com/tedueda/studioq_rewnewal.git）をインポート
4. フレームワークとして「Static Site」を選択
5. デプロイボタンをクリック

Bolt.newは`windsurf_deployment.yaml`の設定に基づいて自動的にサイトをデプロイします。この設定ファイルには以下の内容が含まれています：

- フレームワーク: static（静的サイト）
- サブドメイン: studioq-website
- ルートディレクトリ: /
- ビルドコマンド: なし（静的サイトのため）
- 出力ディレクトリ: /

デプロイに問題がある場合は、`windsurf_deployment.yaml`の設定を確認してください。