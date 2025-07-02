<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    if (!empty($_POST['honeypot'])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Bot detected']);
        exit;
    }
    
    $name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
    $message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';
    
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Заполните все поля']);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Неверный email']);
        exit;
    }

    $smtp_server = 'smtp.yandex.com:587';
    $smtp_username = 'manager@degit.tech';
    $smtp_password = 'sokhxfiulhssofty';
    
    ini_set('SMTP', $smtp_server);
    ini_set('smtp_port', 587);
    ini_set('sendmail_from', 'manager@degit.tech');
    
    $to = "manager@degit.tech";
    $subject = "=?UTF-8?B?" . base64_encode("Новое сообщение с сайта Digital Edge") . "?=";
    
    $body = "Новое сообщение с формы обратной связи:\n\n";
    $body .= "Имя: $name\n";
    $body .= "Email: $email\n";
    $body .= "Сообщение:\n$message\n\n";
    $body .= "IP адрес: " . $_SERVER['REMOTE_ADDR'] . "\n";
    $body .= "Дата: " . date('Y-m-d H:i:s') . "\n";
    
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/plain; charset=utf-8\r\n";
    $headers .= "From: manager@degit.tech\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo json_encode(['status' => 'success', 'message' => 'Сообщение успешно отправлено']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Ошибка отправки письма']);
    }
    
} else {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Разрешен только POST метод']);
}
?>