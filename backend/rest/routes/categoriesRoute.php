<?php

// Get all categories
Flight::route('GET /categories', function() {
    Flight::json(Flight::categoriesService()->getCategories());
});

// Get category by name
Flight::route('GET /categories/@name', function($name) {
    Flight::json(Flight::categoriesService()->getCategoryByName($name));
});

// Get category by ID (using BaseService's getById)
Flight::route('GET /categories/id/@id', function($id) {
    Flight::json(Flight::categoriesService()->getById($id));
});

// Create new category
Flight::route('POST /categories', function() {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::categoriesService()->add($data));
});

// Update category
Flight::route('PUT /categories/@id', function($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::categoriesService()->update($id, $data));
});

// Delete category
Flight::route('DELETE /categories/@id', function($id) {
    Flight::json(Flight::categoriesService()->delete($id));
});