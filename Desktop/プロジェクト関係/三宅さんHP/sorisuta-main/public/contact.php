<?php
// contact.php - receives form submission and sends email via Xserver server mail
// Note: Uses mb_send_mail on Xserver. For authenticated SMTP, deploy PHPMailer later if required.

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// Allow only POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method Not Allowed']);
    exit;
}

// Read JSON body or form body
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    $data = $_POST;
}

function get($arr, $key) { return isset($arr[$key]) ? trim((string)$arr[$key]) : ''; }

$name    = get($data, 'name');
$tel     = get($data, 'tel');
$email   = get($data, 'email');
$message = get($data, 'message');
$agreed  = (string)get($data, 'agreed');

// Basic validation
$errors = [];
if ($name === '') $errors['name'] = 'お名前は必須項目です';
if ($tel === '') $errors['tel'] = '電話番号は必須項目です';
if ($email === '' || !preg_match('/^[^\s@]+@[^\s@]+\.[^\s@]+$/', $email)) $errors['email'] = '正しいメールアドレスを入力してください';
if ($message === '') $errors['message'] = 'お問い合わせ内容は必須項目です';
if (!in_array($agreed, ['true','1','on'], true)) $errors['agreed'] = 'プライバシーポリシーへの同意が必要です';

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'errors' => $errors]);
    exit;
}

// Config (provided by client; using Xserver environment)
$SMTP_HOST = 'sv5186.xserver.jp'; // Provided, not used with mb_send_mail
$SMTP_PORT_SSL = 465;             // Provided, not used with mb_send_mail
$SMTP_USER = 'info@office-miyake.com'; // Provided
$SMTP_PASS = '0011miyake';             // Provided

$FROM = 'info@office-miyake.com';
$TO   = 'gm-miyake@office.email.ne.jp';
$BCC  = 'gm-miyake@office.email.ne.jp';

// Guard header injection
function sanitize_header($v) { return str_replace(["\r","\n"], ' ', $v); }
$fromHeader = 'From: ' . sanitize_header($FROM);
$replyToHeader = $email !== '' ? ('Reply-To: ' . sanitize_header($email)) : '';
$bccHeader = 'Bcc: ' . sanitize_header($BCC);
$headers = array_filter([$fromHeader, $replyToHeader, $bccHeader, 'MIME-Version: 1.0', 'Content-Type: text/plain; charset=UTF-8']);

mb_language('Japanese');
mb_internal_encoding('UTF-8');

$subject = '【お問い合わせ】行政書士ソリスタサービス - ' . $name;
$body = "以下の内容でお問い合わせを受け付けました。\n\n"
      . "お名前: {$name}\n"
      . "電話番号: {$tel}\n"
      . "メールアドレス: {$email}\n"
      . "同意: 同意済み\n"
      . "送信日時: " . date('Y-m-d H:i:s') . "\n"
      . "IP: " . ($_SERVER['REMOTE_ADDR'] ?? '-') . "\n"
      . "UA: " . ($_SERVER['HTTP_USER_AGENT'] ?? '-') . "\n\n"
      . "--- お問い合わせ内容 ---\n"
      . $message . "\n";

$sent = @mb_send_mail($TO, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'メール送信に失敗しました']);
}
