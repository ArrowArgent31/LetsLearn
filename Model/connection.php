<?php
function Connection(){
$conn = null;
$host = '127.0.0.1';
$db = 'letslearn';
$user = 'root';
$pwd = '';
try {
    $conn = new PDO('mysql:host=' . $host . ';dbname=' . $db, $user, $pwd);
} catch (Exception $ex) {
    echo 'hijueputa.' . $ex;
    exit;
}
return $conn;
}
?>