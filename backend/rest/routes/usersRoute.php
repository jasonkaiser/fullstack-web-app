<?php

// Get all users
Flight::route('GET /users', function() {
    Flight::json(Flight::usersService()->getAllUsers());
});

// Get user by email
Flight::route('GET /users/@email', function($email) {
    Flight::json(Flight::usersService()->getUserByEmail($email));
});

// Get user by ID
Flight::route('GET /users/id/@id', function($id) {
    Flight::json(Flight::usersService()->getById($id));
});

// Create new user
Flight::route('POST /users', function() {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::usersService()->add($data));
});

// Update user
Flight::route('PUT /users/@id', function($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::usersService()->update($id, $data));
});

// Delete user
Flight::route('DELETE /users/@id', function($id) {
    Flight::json(Flight::usersService()->delete($id));
});




