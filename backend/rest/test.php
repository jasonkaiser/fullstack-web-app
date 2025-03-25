<?php
ini_set('display_errors', 1);   
error_reporting(E_ALL);      

require_once __DIR__ . "/dao/baseDao.php";
require_once __DIR__ . "/dao/usersDao.php"; 

$user = new User();
$getUser = $user->getUserByEmail("bob.brown@example.com");

if ($getUser) {
    // Since getUserByEmail returns a single user, you can directly access the fields
    echo "User ID: " . $getUser['id'] . "<br>";
    echo "User Name: " . $getUser['name'] . "<br>";
} else {
    echo "No user found with the given email.";
}
?>
