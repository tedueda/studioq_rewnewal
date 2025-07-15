<?php
// 文字エンコーディングの設定
mb_language("Japanese");
mb_internal_encoding("UTF-8");

// フォームから送信されたデータを取得
$name = isset($_POST['name']) ? $_POST['name'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
$message = isset($_POST['message']) ? $_POST['message'] : '';
$subject = isset($_POST['subject']) ? $_POST['subject'] : 'StudioQウェブサイトからのお問い合わせ';

// 入力値のバリデーション
if (empty($name) || empty($email) || empty($message)) {
    // 必須項目が入力されていない場合はエラーページにリダイレクト
    header('Location: contact_error.html');
    exit;
}

// 送信先メールアドレス
$to = 't.ueda@studioq.co.jp';

// メールヘッダー
$headers = "From: " . mb_encode_mimeheader("StudioQ問い合わせフォーム") . " <t.ueda@studioq.co.jp>\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// メール本文の作成
$mail_body = "StudioQウェブサイトからのお問い合わせ\n\n";
$mail_body .= "【お名前】\n" . $name . "\n\n";
$mail_body .= "【メールアドレス】\n" . $email . "\n\n";

if (!empty($phone)) {
    $mail_body .= "【電話番号】\n" . $phone . "\n\n";
}

$mail_body .= "【お問い合わせ内容】\n" . $message . "\n\n";
$mail_body .= "----------------------------------------\n";
$mail_body .= "送信日時: " . date("Y/m/d H:i:s") . "\n";
$mail_body .= "送信元IPアドレス: " . $_SERVER['REMOTE_ADDR'] . "\n";
$mail_body .= "ブラウザ情報: " . $_SERVER['HTTP_USER_AGENT'] . "\n";

// メール送信
$result = mb_send_mail($to, $subject, $mail_body, $headers);

// 自動返信メールの送信
if ($result) {
    $auto_reply_subject = "【StudioQ】お問い合わせありがとうございます";
    
    $auto_reply_message = $name . " 様\n\n";
    $auto_reply_message .= "この度はStudioQへお問い合わせいただき、誠にありがとうございます。\n";
    $auto_reply_message .= "以下の内容でお問い合わせを受け付けました。\n\n";
    $auto_reply_message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    $auto_reply_message .= "【お名前】\n" . $name . "\n\n";
    $auto_reply_message .= "【メールアドレス】\n" . $email . "\n\n";
    
    if (!empty($phone)) {
        $auto_reply_message .= "【電話番号】\n" . $phone . "\n\n";
    }
    
    $auto_reply_message .= "【お問い合わせ内容】\n" . $message . "\n";
    $auto_reply_message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    $auto_reply_message .= "内容を確認次第、担当者より折り返しご連絡させていただきます。\n";
    $auto_reply_message .= "なお、お問い合わせの内容によっては、回答までにお時間をいただく場合がございます。\n";
    $auto_reply_message .= "あらかじめご了承くださいませ。\n\n";
    $auto_reply_message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    $auto_reply_message .= "Studio Q\n";
    $auto_reply_message .= "〒556-0003\n";
    $auto_reply_message .= "大阪府大阪市浪速区恵美須西３−２−４ ２F\n";
    $auto_reply_message .= "TEL: 06-6978-8122\n";
    $auto_reply_message .= "FAX: 06-6978-8123\n";
    $auto_reply_message .= "URL: https://studioq.co.jp\n";
    $auto_reply_message .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    
    $auto_reply_headers = "From: " . mb_encode_mimeheader("StudioQ") . " <t.ueda@studioq.co.jp>\r\n";
    $auto_reply_headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $auto_reply_headers .= "MIME-Version: 1.0\r\n";
    $auto_reply_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    mb_send_mail($email, $auto_reply_subject, $auto_reply_message, $auto_reply_headers);
}

// 送信完了ページへリダイレクト
if ($result) {
    header('Location: contact_thanks.html');
} else {
    header('Location: contact_error.html');
}
exit;
?>
