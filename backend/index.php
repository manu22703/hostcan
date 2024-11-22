<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once 'config.php';
require_once 'auth.php';
require_once 'files.php';

$request = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

try {
    switch ($path) {
        case '/api/auth/register':
            if ($request === 'POST') {
                $data = json_decode(file_get_contents('php://input'), true);
                echo json_encode(register($data));
            }
            break;

        case '/api/auth/login':
            if ($request === 'POST') {
                $data = json_decode(file_get_contents('php://input'), true);
                echo json_encode(login($data));
            }
            break;

        case '/api/files/upload':
            if ($request === 'POST') {
                validateToken();
                echo json_encode(uploadFile($_FILES['file']));
            }
            break;

        case '/api/files/list':
            if ($request === 'GET') {
                validateToken();
                echo json_encode(listFiles());
            }
            break;

        case '/api/sites/deploy':
            if ($request === 'POST') {
                validateToken();
                $data = json_decode(file_get_contents('php://input'), true);
                echo json_encode(deploySite($data));
            }
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}