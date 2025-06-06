# StudioQ Renewal

StudioQのウェブサイトリニューアルプロジェクトです。

## Blog Cascade AI統合ステータス (2025年6月6日更新)

### 統合完了項目
✅ **AIブログ生成システム統合**: blog_cascadeシステムとStudio Qウェブサイトの完全統合
✅ **データ変換モジュール**: `studioq-bridge.js`による形式変換システム
✅ **自動公開システム**: `blog-cascade-integration.js`による自動HTML生成・公開
✅ **SEO最適化**: メタタグ、OGP、JSON-LD構造化データの自動生成
✅ **カテゴリマッピング**: ターゲットオーディエンスから適切なカテゴリへの自動変換
✅ **テンプレート統合**: 既存のStudio Qブログテンプレートとの完全互換性
✅ **ローカルビルド**: Eleventyビルドプロセスの正常動作確認済み

### 現在の課題
❌ **Netlifyデプロイメント失敗**: 4つのCIチェック（Header rules, Pages changed, Redirect rules, Deploy Preview）が継続的に失敗
❌ **Node.jsバージョン問題**: 16から18への更新後も問題継続（より深い構造的問題の可能性）
⚠️ **大容量ファイル問題**: MP4動画ファイル（greem1-2.mp4, back1.mp4）がNetlify制限（10MB）を超過している可能性

### 技術詳細

#### 統合アーキテクチャ
```
Blog Cascade UI → AI生成 → Studio Q Bridge → 統合モジュール → 公開済みブログ記事
```

#### 主要ファイル
- `blog/blog-automation/blog-cascade-integration.js`: メイン統合モジュール
- `INTEGRATION_GUIDE.md`: 完全な統合ドキュメント
- `blog_cascade/studioq-bridge.js`: データ形式変換器
- `blog_cascade/integration-workflow.js`: ワークフロー自動化

#### カテゴリマッピング
- **映像制作**: 映像制作者, 動画クリエイター, ビデオグラファー
- **音響技術**: 音響エンジニア, サウンドデザイナー
- **ライブ配信**: 配信者, ストリーマー
- **バーチャルプロダクション**: VRクリエイター, ARデベロッパー
- **機材紹介**: カメラマン, フォトグラファー
- **撮影テクニック**: 撮影技術関連

### 使用方法

#### 手動統合
```bash
# ブログデータ生成
cd blog_cascade
node studioq-bridge.js test

# Studio Qに処理・公開
cd studioq_rewnewal/blog/blog-automation
node blog-cascade-integration.js process ../../../blog_cascade/output/studioq-[timestamp].json
```

#### 自動ワークフロー
```bash
cd blog_cascade
node integration-workflow.js test
```

### トラブルシューティング

#### Netlifyデプロイメント問題
1. **大容量ファイル**: MP4ファイルを外部ホスティング（YouTube, Vimeo）に移行検討
2. **ビルド設定**: `netlify.toml`でNode.js 18、`npm run build`コマンド使用
3. **ファイル制限**: 10MB超過ファイルの除外または圧縮が必要

#### 今後の対応が必要な項目
- [ ] MP4ファイルの外部ホスティング移行
- [ ] Netlifyビルドログの詳細調査
- [ ] 代替デプロイメント方法の検討（Vercel、GitHub Pages）
- [ ] ファイルサイズ最適化の実装

### 関連リンク
- [統合ガイド](./INTEGRATION_GUIDE.md): 詳細な技術ドキュメント
- [PR #3](https://github.com/tedueda/studioq_rewnewal/pull/3): 統合実装プルリクエスト
- [Blog Cascade Repository](https://github.com/tedueda/blog_cascade.git): AIブログ生成システム

---

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
