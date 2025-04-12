<?php
require 'vendor/autoload.php';


Flight::register('usersService', 'UsersService');
Flight::register('categoriesService', 'CategoriesService');
Flight::register('claimRequestsService', 'ClaimRequestsService');
Flight::register('foundItemsService', 'FoundItemsService');
Flight::register('lostItemsService', 'LostItemsService');


require_once __DIR__ . '/services/usersService.php';
require_once __DIR__ . '/services/categoriesService.php';
require_once __DIR__ . '/services/claimRequestsService.php';
require_once __DIR__ . '/services/foundItemsService.php';
require_once __DIR__ . '/services/lostItemsService.php';


require_once __DIR__ . '/routes/usersRoute.php';
require_once __DIR__ . '/routes/categoriesRoute.php';
require_once __DIR__ . '/routes/claimRequestsRoute.php';
require_once __DIR__ . '/routes/foundItemsRoute.php';
require_once __DIR__ . '/routes/lostItemsRoute.php';


Flight::route('GET /', function() {
    echo 'Lost and Found API is running!';
});


Flight::start();