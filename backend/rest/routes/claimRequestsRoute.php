<?php

// Get all claim requests
Flight::route('GET /claim-requests', function() {
    Flight::json(Flight::claimRequestsService()->getClaimRequests());
});

// Get specific claim request by ID
Flight::route('GET /claim-requests/@id', function($id) {
    Flight::json(Flight::claimRequestsService()->getById($id));
});

// Create new claim request
Flight::route('POST /claim-requests', function() {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::claimRequestsService()->add($data));
});

// Update claim request
Flight::route('PUT /claim-requests/@id', function($id) {
    $data = Flight::request()->data->getData();
    Flight::json(Flight::claimRequestsService()->update($id, $data));
});

// Delete claim request
Flight::route('DELETE /claim-requests/@id', function($id) {
    Flight::json(Flight::claimRequestsService()->delete($id));
});