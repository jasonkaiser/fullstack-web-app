<?php

// Get all users
/**
* @OA\Put(
*     path="/restaurant/{id}",
*     tags={"restaurants"},
*     summary="Update an existing restaurant by ID",
*     @OA\Parameter(
*         name="id",
*         in="path",
*         required=true,
*         description="Restaurant ID",
*         @OA\Schema(type="integer", example=1)
*     ),
*     @OA\RequestBody(
*         required=true,
*         @OA\JsonContent(
*             required={"name", "location"},
*             @OA\Property(property="name", type="string", example="Updated Name"),
*             @OA\Property(property="location", type="string", example="New Location"),
*             @OA\Property(property="cuisine", type="string", example="Fusion")
*         )
*     ),
*     @OA\Response(
*         response=200,
*         description="Restaurant updated"
*     )
* )
*/

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




