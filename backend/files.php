<?php
function uploadFile($file) {
    $user_id = validateToken();
    $user_path = STORAGE_PATH . $user_id . '/';
    
    if (!file_exists($user_path)) {
        mkdir($user_path, 0755, true);
    }
    
    $filename = basename($file['name']);
    $target = $user_path . $filename;
    
    if (move_uploaded_file($file['tmp_name'], $target)) {
        return ['message' => 'File uploaded successfully'];
    }
    
    throw new Exception('File upload failed');
}

function listFiles() {
    $user_id = validateToken();
    $user_path = STORAGE_PATH . $user_id . '/';
    
    if (!file_exists($user_path)) {
        return ['files' => []];
    }
    
    $files = array_diff(scandir($user_path), ['.', '..']);
    return ['files' => array_values($files)];
}

function deploySite($data) {
    $user_id = validateToken();
    $subdomain = generateSubdomain($data['name']);
    $site_path = SITES_PATH . $subdomain . '/';
    
    if (!file_exists($site_path)) {
        mkdir($site_path, 0755, true);
    }
    
    // Copy files from storage to site directory
    foreach ($data['files'] as $file) {
        $source = STORAGE_PATH . $user_id . '/' . $file;
        $target = $site_path . $file;
        copy($source, $target);
    }
    
    // Create Apache virtual host
    createVirtualHost($subdomain);
    
    return [
        'message' => 'Site deployed successfully',
        'url' => 'http://' . $subdomain . '.hostcan.local'
    ];
}

function generateSubdomain($name) {
    return preg_replace('/[^a-z0-9]/', '', strtolower($name)) . 
           '-' . substr(md5(uniqid()), 0, 6);
}

function createVirtualHost($subdomain) {
    $config = "
<VirtualHost *:80>
    ServerName {$subdomain}.hostcan.local
    DocumentRoot " . SITES_PATH . $subdomain . "
    
    <Directory " . SITES_PATH . $subdomain . ">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>";
    
    file_put_contents('/etc/apache2/sites-available/' . $subdomain . '.conf', $config);
    shell_exec('a2ensite ' . $subdomain . '.conf && systemctl reload apache2');
}