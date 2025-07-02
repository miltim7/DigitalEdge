<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

error_reporting(E_ALL);
ini_set('display_errors', 1);

function logError($message) {
    error_log(date('Y-m-d H:i:s') . " - " . $message . PHP_EOL, 3, "mail_errors.log");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    if (!empty($_POST['honeypot'])) {
        logError("Bot detected from IP: " . $_SERVER['REMOTE_ADDR']);
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Обнаружена подозрительная активность']);
        exit;
    }
    
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : ''; // Убрал strip_tags для комментария
    
    // Детальная валидация
    if (empty($name)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Поле "Имя" обязательно для заполнения']);
        exit;
    }
    
    if (strlen($name) < 2) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Имя должно содержать минимум 2 символа']);
        exit;
    }
    
    if (strlen($name) > 50) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Имя не должно превышать 50 символов']);
        exit;
    }
    
    if (empty($email)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Поле "Email" обязательно для заполнения']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Введите корректный email адрес']);
        exit;
    }
    
    if (empty($message)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Поле "Сообщение" обязательно для заполнения']);
        exit;
    }
    
    if (strlen($message) < 1) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Сообщение должно содержать минимум 5 символов']);
        exit;
    }
    
    if (strlen($message) > 2000) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Сообщение не должно превышать 2000 символов']);
        exit;
    }
    
    // Убрал проверку на спам - теперь можно писать что угодно
    
    $to = "manager@degit.tech";
    $subject = "=?UTF-8?B?" . base64_encode("Новое сообщение с сайта Digital Edge") . "?=";
    
    $body = "Новое сообщение с формы обратной связи:\n\n";
    $body .= "Имя: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Сообщение:\n" . $message . "\n\n";
    $body .= "---\n";
    $body .= "IP адрес: " . $_SERVER['REMOTE_ADDR'] . "\n";
    $body .= "User-Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'Не определен') . "\n";
    $body .= "Дата: " . date('Y-m-d H:i:s') . "\n";
    
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=utf-8\r\n";
    $headers .= "From: noreply@degit.tech\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Return-Path: noreply@degit.tech\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    // Попытка отправки с детальным логированием
    $mailResult = @mail($to, $subject, $body, $headers, '-f noreply@degit.tech');
    
    if ($mailResult) {
        logError("Mail sent successfully to: " . $to . " from: " . $email);
        http_response_code(200);
        echo json_encode(['status' => 'success', 'message' => 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.']);
    } else {
        $lastError = error_get_last();
        $errorMessage = $lastError ? $lastError['message'] : 'Неизвестная ошибка';
        
        logError("Mail send failed. Error: " . $errorMessage . ", To: " . $to . ", From: " . $email);
        
        http_response_code(500);
        echo json_encode([
            'status' => 'error', 
            'message' => 'Не удалось отправить сообщение. Попробуйте позже или свяжитесь с нами напрямую по email: manager@degit.tech',
            'debug' => 'Mail function returned false. Check server logs.'
        ]);
    }
    
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Разрешен только POST метод']);
}
?>