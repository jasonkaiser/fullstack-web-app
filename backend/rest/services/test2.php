
<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../services/UsersService.php';

$usersService = new UsersService();

$user = $usersService->getUserByEmail("jasonkaiser@gmail.com");

echo "<pre>";
print_r($user);
echo "</pre>";



?>