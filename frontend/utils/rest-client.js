let Constants = {
    PROJECT_BASE_URL: "backend/", // Relative path since you're using 'backend/' in your requests
    USER_ROLE: "User",
    ADMIN_ROLE: "Admin"
};

let RestClient = {
    get: function(url, callback, error_callback) {
        $.ajax({
            url: Constants.PROJECT_BASE_URL + url,
            type: "GET",
            beforeSend: function(xhr) {
                const token = localStorage.getItem("jwt_token");
                if (token) {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                }
            },
            success: function(response) {
                if (callback) callback(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (error_callback) {
                    error_callback(jqXHR);
                } else {
                    console.error("GET Request Failed:", jqXHR.responseText);
                }
            }
        });
    },

    post: function(url, data, callback, error_callback) {
        $.ajax({
            url: Constants.PROJECT_BASE_URL + url,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function(response) {
                if (callback) callback(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (error_callback) {
                    error_callback(jqXHR);
                } else {
                    console.error("POST Request Failed:", jqXHR.responseText);
                }
            }
        });
    },

    put: function(url, data, callback, error_callback) {
        $.ajax({
            url: Constants.PROJECT_BASE_URL + url,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(data),
            beforeSend: function(xhr) {
                const token = localStorage.getItem("jwt_token");
                if (token) {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                }
            },
            success: function(response) {
                if (callback) callback(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (error_callback) {
                    error_callback(jqXHR);
                } else {
                    console.error("PUT Request Failed:", jqXHR.responseText);
                }
            }
        });
    },

    delete: function(url, callback, error_callback) {
        $.ajax({
            url: Constants.PROJECT_BASE_URL + url,
            type: "DELETE",
            beforeSend: function(xhr) {
                const token = localStorage.getItem("jwt_token");
                if (token) {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                }
            },
            success: function(response) {
                if (callback) callback(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (error_callback) {
                    error_callback(jqXHR);
                } else {
                    console.error("DELETE Request Failed:", jqXHR.responseText);
                }
            }
        });
    }
};