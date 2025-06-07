<?php
require_once dirname(__DIR__) . '/vendor/autoload.php'; 


require_once __DIR__.'/../data/roles.php';
require_once __DIR__ . "/../middleware/authMiddleware.php";



Flight::register('usersService', 'UsersService');
Flight::register('categoriesService', 'CategoriesService');
Flight::register('claimRequestsService', 'ClaimRequestsService');
Flight::register('foundItemsService', 'FoundItemsService');
Flight::register('lostItemsService', 'LostItemsService');
Flight::register('authService', 'AuthService');
Flight::register('authMiddleware', 'AuthMiddleware');




require_once __DIR__ . '/services/usersService.php';
require_once __DIR__ . '/services/categoriesService.php';
require_once __DIR__ . '/services/claimRequestsService.php';
require_once __DIR__ . '/services/foundItemsService.php';
require_once __DIR__ . '/services/lostItemsService.php';
require_once __DIR__ . '/services/authService.php';

require_once __DIR__ . '/routes/usersRoute.php';
require_once __DIR__ . '/routes/categoriesRoute.php';
require_once __DIR__ . '/routes/claimRequestsRoute.php';
require_once __DIR__ . '/routes/foundItemsRoute.php';
require_once __DIR__ . '/routes/lostItemsRoute.php';
require_once __DIR__ . '/routes/authRoute.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authentication, Authorization, X-Requested-With");
header("Access-Control-Expose-Headers: Authentication");
header("Access-Control-Max-Age: 3600");


$token = Flight::request()->getHeader("Authentication");
if (empty($token) && isset($authHeader)) {
    $token = $authHeader;
}

error_reporting(E_ALL);

Flight::route('GET /', function() {
    echo 'Lost and Found API is running!';
});

Flight::route('/*', function() {
    $url = Flight::request()->url;
    if (
        strpos($url, '/auth/login') === 0 ||
        strpos($url, '/auth/register') === 0 ||
        strpos($url, '/public/v1/docs') === 0 || // allow docs UI
        strpos($url, '/public/v1/docs/swagger.php') === 0 // allow docs JSON
    ) {
        return TRUE;
    } else {
        try {
            $token = Flight::request()->getHeader("Authentication");
            if($token && Flight::authMiddleware()->verifyToken($token))
                return TRUE;
            else
                Flight::halt(401, "Missing authentication header");
        } catch (\Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    }
});

Flight::start();