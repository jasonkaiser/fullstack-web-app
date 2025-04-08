
<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../services/usersService.php';
require_once __DIR__ . '/../services/categoriesService.php';
require_once __DIR__ . '/../services/claimRequestsService.php';

$usersService = new UsersService();
$categoryService = new CategoriesService();
$claimRequestsService = new ClaimRequestsService();

$claimRequestsService = $claimRequestsService->getClaimRequests();

echo "<pre>";
print_r($claimRequestsService);
echo "</pre>";



?>