<?php

// Get all lost items
Flight::route('GET /lost-items', function() {
    Flight::json(Flight::lostItemsService()->getLostItems());
});

// Get lost item by ID 
Flight::route('GET /lost-items/@id', function($id) {
    Flight::json(Flight::lostItemsService()->getById($id));
});

// Get lost items by category
Flight::route('GET /lost-items/category/@category', function($category) {
    Flight::json(Flight::lostItemsService()->getItemByCategory($category));
});

// Get lost items by name
Flight::route('GET /lost-items/name/@name', function($name) {
    Flight::json(Flight::lostItemsService()->getItemByName($name));
});

// Get lost items by user
Flight::route('GET /lost-items/user/@user', function($user) {
    Flight::json(Flight::lostItemsService()->getItemByUser($user));
});

// Create new lost item
Flight::route('POST /lost-items', function() {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::lostItemsService()->add($data));
});

// Update lost item
Flight::route('PUT /lost-items/@id', function($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::lostItemsService()->update($id, $data));
});

// Delete lost item
Flight::route('DELETE /lost-items/@id', function($id) {
    Flight::json(Flight::lostItemsService()->delete($id));
});