$(document).ready(function () {
    if (!Utils.isAuthenticated() || !Utils.isAdmin()) {
        alert("You need to be logged in as admin to access this page.");
        window.location.hash = "#login";
        return;
    }


    const profileModal = new bootstrap.Modal($("#viewProfileModal")[0]);
    const editUserModal = new bootstrap.Modal($("#editUserModal")[0]);
    const viewLostItemModal = new bootstrap.Modal($("#viewLostItemModal")[0]);
    const editLostItemModal = new bootstrap.Modal($("#editLostItemModal")[0]);
    const viewFoundItemModal = new bootstrap.Modal($("#viewFoundItemModal")[0]);
    const editFoundItemModal = new bootstrap.Modal($("#editFoundItemModal")[0]);


    loadUsers();
    loadLostItems();
    loadFoundItems();



    $(document).on("click", "#users-table-body .btn-info", function () {
        const userId = $(this).data("id");
        RestClient.get(`rest/users/${userId}`, function (user) {
            $("#profile-id").text(user.id);
            $("#profile-name").text(user.name);
            $("#profile-email").text(user.email);
            $("#profile-role").text(user.role);
            profileModal.show();
        }, function (xhr) {
            alert("Failed to fetch user details.");
            console.error(xhr.responseText);
        });
    });

    $(document).on("click", "#users-table-body .btn-primary", function () {
        const userId = $(this).data("id");
        RestClient.get(`rest/users/${userId}`, function (user) {
            $("#edit-user-id").val(user.id);
            $("#edit-user-name").val(user.name);
            $("#edit-user-email").val(user.email);
            $("#edit-user-password").val("");
            editUserModal.show();
        }, function (xhr) {
            alert("Failed to load user for editing.");
            console.error(xhr.responseText);
        });
    });


    $("#edit-user-form").on("submit", function (e) {
        e.preventDefault();
        const userId = $("#edit-user-id").val();
        const updatedData = {
            name: $("#edit-user-name").val(),
            email: $("#edit-user-email").val()
        };

        const password = $("#edit-user-password").val();
        if (password) {
            updatedData.passwordHash = password;
        }

        RestClient.put(`rest/users/${userId}`, updatedData, function () {
            alert("User updated successfully!");
            loadUsers();
            editUserModal.hide();
        }, function (xhr) {
            alert("Failed to update user.");
            console.error(xhr.responseText);
        });
    });


    $(document).on("click", "#users-table-body .btn-danger", function () {
        const userId = $(this).data("id");
        if (confirm("Are you sure you want to delete this user?")) {
            RestClient.delete(`rest/users/${userId}`, function () {
                alert("User deleted successfully!");
                loadUsers();
            }, function (xhr) {
                alert("Failed to delete user.");
                console.error(xhr.responseText);
            });
        }
    });




    $(document).on("click", "#lost-items-table-body .btn-info", function () {
        const itemId = $(this).data("id");
        RestClient.get(`rest/lost-items/${itemId}`, function (item) {
            $("#lost-item-id").text(item.id);
            $("#lost-item-name").text(item.itemName);
            $("#lost-item-description").text(item.description);
            $("#lost-item-location").text(item.location);
            $("#lost-item-date").text(item.createdAt);
            $("#lost-item-user-id").text(item.userID);
            viewLostItemModal.show();
        }, function (xhr) {
            alert("Failed to fetch lost item details.");
            console.error(xhr.responseText);
        });
    });


    $(document).on("click", "#lost-items-table-body .btn-primary", function () {
        const itemId = $(this).data("id");
        RestClient.get(`rest/lost-items/${itemId}`, function (item) {
            $("#edit-lost-item-id").val(item.id);
            $("#edit-lost-item-name").val(item.itemName);
            $("#edit-lost-item-description").val(item.description);
            $("#edit-lost-item-location").val(item.location);
            $("#edit-lost-item-date").val(item.createdAt.split('T')[0]);
            editLostItemModal.show();
        }, function (xhr) {
            alert("Failed to load lost item for editing.");
            console.error(xhr.responseText);
        });
    });


    $("#edit-lost-item-form").on("submit", function (e) {
        e.preventDefault();
        const itemId = $("#edit-lost-item-id").val();
        const updatedData = {
            itemName: $("#edit-lost-item-name").val(),
            description: $("#edit-lost-item-description").val(),
            location: $("#edit-lost-item-location").val(),
            createdAt: $("#edit-lost-item-date").val(),

        };

        RestClient.put(`rest/lost-items/${itemId}`, updatedData, function () {
            alert("Lost item updated successfully!");
            loadLostItems();
            editLostItemModal.hide();
        }, function (xhr) {
            alert("Failed to update lost item.");
            console.error(xhr.responseText);
        });
    });


    $(document).on("click", "#lost-items-table-body .btn-danger", function () {
        const itemId = $(this).data("id");
        if (confirm("Are you sure you want to delete this lost item report?")) {
            RestClient.delete(`rest/lost-items/${itemId}`, function () {
                alert("Lost item deleted successfully!");
                loadLostItems();
            }, function (xhr) {
                alert("Failed to delete lost item.");
                console.error(xhr.responseText);
            });
        }
    });



    $(document).on("click", "#found-items-table-body .btn-info", function () {
        const itemId = $(this).data("id");
        RestClient.get(`rest/found-items/${itemId}`, function (item) {
            $("#found-item-id").text(item.id);
            $("#found-item-name").text(item.itemName);
            $("#found-item-description").text(item.description);
            $("#found-item-location").text(item.location);
            $("#found-item-date").text(item.createdAt);
            $("#found-item-user-id").text(item.userID);

            viewFoundItemModal.show();
        }, function (xhr) {
            alert("Failed to fetch found item details.");
            console.error(xhr.responseText);
        });
    });


    $(document).on("click", "#found-items-table-body .btn-primary", function () {
        const itemId = $(this).data("id");
        RestClient.get(`rest/found-items/${itemId}`, function (item) {
            $("#edit-found-item-id").val(item.id);
            $("#edit-found-item-name").val(item.itemName);
            $("#edit-found-item-description").val(item.description);
            $("#edit-found-item-location").val(item.location);
            $("#edit-found-item-date").val(item.createdAt.split('T')[0]);

            editFoundItemModal.show();
        }, function (xhr) {
            alert("Failed to load found item for editing.");
            console.error(xhr.responseText);
        });
    });


    $("#edit-found-item-form").on("submit", function (e) {
        e.preventDefault();
        const itemId = $("#edit-found-item-id").val();
        const updatedData = {
            itemName: $("#edit-found-item-name").val(),
            description: $("#edit-found-item-description").val(),
            location: $("#edit-found-item-location").val(),
            createdAt: $("#edit-found-item-date").val(),

        };

        RestClient.put(`rest/found-items/${itemId}`, updatedData, function () {
            alert("Found item updated successfully!");
            loadFoundItems();
            editFoundItemModal.hide();
        }, function (xhr) {
            alert("Failed to update found item.");
            console.error(xhr.responseText);
        });
    });


    $(document).on("click", "#found-items-table-body .btn-danger", function () {
        const itemId = $(this).data("id");
        if (confirm("Are you sure you want to delete this found item report?")) {
            RestClient.delete(`rest/found-items/${itemId}`, function () {
                alert("Found item deleted successfully!");
                loadFoundItems();
            }, function (xhr) {
                alert("Failed to delete found item.");
                console.error(xhr.responseText);
            });
        }
    });


    
    function loadUsers() {
        RestClient.get("rest/users", function (users) {
            const $tbody = $("#users-table-body");
            $tbody.empty();

            if (!users || users.length === 0) {
                $tbody.append('<tr><td colspan="7" class="text-center">No users found</td></tr>');
                $("#totalUsers").text(0);
                return;
            }

            users.forEach((user) => {
                const row = `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name || "-"}</td>
                        <td>${user.email || "-"}</td>
                        <td>${user.location || "-"}</td>
                        <td>${user.verified ? "Yes" : "No"}</td>
                        <td>${user.role || "user"}</td>
                        <td>
                            <button class="btn btn-info btn-sm" data-id="${user.id}">Profile</button>
                            <button class="btn btn-primary btn-sm" data-id="${user.id}">Edit</button>
                            <button class="btn btn-danger btn-sm" data-id="${user.id}">Delete</button>
                        </td>
                    </tr>`;
                $tbody.append(row);
            });

            $("#totalUsers").text(users.length);
        }, function (xhr) {
            console.error("Error loading users:", xhr.responseText);
            $("#users-table-body").html('<tr><td colspan="7" class="text-center">Error loading users</td></tr>');
            alert("Failed to load users. Check your permissions.");
        });
    }

    function loadLostItems() {
        RestClient.get("rest/lost-items", function (lostItems) {
            const $tbody = $("#lost-items-table-body");
            $tbody.empty();

            if (!lostItems || lostItems.length === 0) {
                $tbody.append('<tr><td colspan="8" class="text-center">No lost items found</td></tr>');
                $("#totalLost").text(0);
                return;
            }

            lostItems.forEach((item) => {
                const row = `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.itemName || "-"}</td>
                        <td>${item.description || "-"}</td>
                        <td>${item.location || "-"}</td>
                        <td>${item.createdAt ? item.createdAt.split('T')[0] : "-"}</td>
                        <td>${item.userID || "-"}</td>
                        <td>
                            <button class="btn btn-info btn-sm" data-id="${item.id}">View</button>
                            <button class="btn btn-primary btn-sm" data-id="${item.id}">Edit</button>
                            <button class="btn btn-danger btn-sm" data-id="${item.id}">Delete</button>
                        </td>
                    </tr>`;
                $tbody.append(row);
            });

            $("#totalLost").text(lostItems.length);
        }, function (xhr) {
            console.error("Error loading lost items:", xhr.responseText);
            $("#lost-items-table-body").html('<tr><td colspan="8" class="text-center">Error loading lost items</td></tr>');
            alert("Failed to load lost items. Check your permissions.");
        });
    }

    function loadFoundItems() {
        RestClient.get("rest/found-items", function (foundItems) {
            const $tbody = $("#found-items-table-body");
            $tbody.empty();

            if (!foundItems || foundItems.length === 0) {
                $tbody.append('<tr><td colspan="8" class="text-center">No found items</td></tr>');
                $("#totalFound").text(0);
                return;
            }

            foundItems.forEach((item) => {
                const row = `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.itemName || "-"}</td>
                        <td>${item.description || "-"}</td>
                        <td>${item.location || "-"}</td>
                        <td>${item.createdAt ? item.createdAt.split('T')[0] : "-"}</td>
                        <td>${item.userID || "-"}</td>
                        <td>
                            <button class="btn btn-info btn-sm" data-id="${item.id}">View</button>
                            <button class="btn btn-primary btn-sm" data-id="${item.id}">Edit</button>
                            <button class="btn btn-danger btn-sm" data-id="${item.id}">Delete</button>
                        </td>
                    </tr>`;
                $tbody.append(row);
            });

            $("#totalFound").text(foundItems.length);
        }, function (xhr) {
            console.error("Error loading found items:", xhr.responseText);
            $("#found-items-table-body").html('<tr><td colspan="8" class="text-center">Error loading found items</td></tr>');
            alert("Failed to load found items. Check your permissions.");
        });
    }
});