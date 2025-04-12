<?php

// Get all found items
Flight::route('GET /found-items', function() {
    Flight::json(Flight::foundItemsService()->getFoundItems());
});

// Get found item by ID (using BaseService)
Flight::route('GET /found-items/@id', function($id) {
    Flight::json(Flight::foundItemsService()->getById($id));
});

// Get items by category
Flight::route('GET /found-items/category/@category', function($category) {
    Flight::json(Flight::foundItemsService()->getItemByCategory($category));
});

// Get items by name
Flight::route('GET /found-items/name/@name', function($name) {
    Flight::json(Flight::foundItemsService()->getItemByName($name));
});

// Get items by user
Flight::route('GET /found-items/user/@user', function($user) {
    Flight::json(Flight::foundItemsService()->getItemByUser($user));
});

// Create new found item
Flight::route('POST /found-items', function() {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::foundItemsService()->add($data));
});

// Update found item
Flight::route('PUT /found-items/@id', function($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::foundItemsService()->update($id, $data));
});

// Delete found item
Flight::route('DELETE /found-items/@id', function($id) {
    Flight::json(Flight::foundItemsService()->delete($id));
});