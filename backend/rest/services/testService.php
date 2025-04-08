
<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../services/usersService.php';
require_once __DIR__ . '/../services/categoriesService.php';

$usersService = new UsersService();
$categoryService = new CategoriesService();

$category = $categoryService->getCategoryByName("");

echo "<pre>";
print_r($category);
echo "</pre>";



?>