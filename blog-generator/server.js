const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const app = express();
const port = 3001;

// JSONボディパーサーを有効化
app.use(express.json());

// 静的ファイルの提供
app.use(express.static(__dirname));

// ブログ生成APIエンドポイント
app.post('/api/generate-blog', (req, res) => {
    const { keyword, category } = req.body;
    
    if (!keyword) {
        return res.status(400).json({ error: 'キーワードが必要です' });
    }
    
    console.log(`ブログ生成開始: キーワード="${keyword}", カテゴリー="${category}"`);
    
    // Node.jsスクリプトを実行
    const child = spawn('node', ['generate.js', keyword], {
        cwd: __dirname,
        stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let output = '';
    let error = '';
    
    child.stdout.on('data', (data) => {
        output += data.toString();
        console.log('stdout:', data.toString());
    });
    
    child.stderr.on('data', (data) => {
        error += data.toString();
        console.error('stderr:', data.toString());
    });
    
    child.on('close', (code) => {
        console.log(`プロセス終了コード: ${code}`);
        
        if (code === 0) {
            // 成功時のレスポンス
            const match = output.match(/ブログ記事「(.+?)」を生成しました: (.+)/);
            const filename = match ? match[1] : 'ブログ記事';
            
            res.json({
                success: true,
                message: 'ブログ記事が正常に生成されました',
                filename: filename,
                output: output
            });
        } else {
            // エラー時のレスポンス
            res.status(500).json({
                success: false,
                error: 'ブログ生成中にエラーが発生しました',
                details: error || output
            });
        }
    });
    
    child.on('error', (err) => {
        console.error('プロセス実行エラー:', err);
        res.status(500).json({
            success: false,
            error: 'プロセス実行エラー',
            details: err.message
        });
    });
});

// ヘルスチェックエンドポイント
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'ブログ生成サーバーが正常に動作しています' });
});

app.listen(port, () => {
    console.log(`ブログ生成サーバーが http://localhost:${port} で起動しました`);
    console.log(`UI: http://localhost:${port}/ui.html`);
});
