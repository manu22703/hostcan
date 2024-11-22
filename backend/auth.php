<?php
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;

function register($data) {
    global $conn;
    
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $password = password_hash($data['password'], PASSWORD_DEFAULT);
    
    $stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $email, $password);
    
    if ($stmt->execute()) {
        return ['message' => 'User registered successfully'];
    }
    
    throw new Exception('Registration failed');
}

function login($data) {
    global $conn;
    
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($user = $result->fetch_assoc()) {
        if (password_verify($data['password'], $user['password'])) {
            $token = JWT::encode([
                'user_id' => $user['id'],
                'exp' => time() + (60 * 60 * 24) // 24 hours
            ], JWT_SECRET);
            
            return ['token' => $token];
        }
    }
    
    throw new Exception('Invalid credentials');
}

function validateToken() {
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        throw new Exception('No token provided');
    }
    
    try {
        $token = str_replace('Bearer ', '', $headers['Authorization']);
        $decoded = JWT::decode($token, JWT_SECRET, ['HS256']);
        return $decoded->user_id;
    } catch (Exception $e) {
        throw new Exception('Invalid token');
    }
}