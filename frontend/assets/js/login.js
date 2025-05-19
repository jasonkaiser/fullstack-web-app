function updateNavbar() {
    const role = localStorage.getItem('user_role');
    const token = localStorage.getItem('jwt_token');
    

    if (token) {
        $('#login-link').hide();


        if (!$('#logout-link').length) {
            $('<li><a href="#" id="logout-link">Logout</a></li>')
                .insertAfter('#login-link')
                .click(function(e) {
                    e.preventDefault();
                    localStorage.removeItem('jwt_token');
                    localStorage.removeItem('user_role');
                    updateNavbar();
                    window.location.hash = '#login';
                });
        } else {
            $('#logout-link').show();
        }
    } else {
        $('#login-link').show();
        $('#logout-link').hide();
    }

    if (role === 'Admin') {
        $('#admin-dashboard-link').show();
    } else {
        $('#admin-dashboard-link').hide();
    }
}
$(document).ready(function() {
    $('.btn-primary').click(function(e) {
        e.preventDefault();
        
        const loginData = {
            email: $('#email').val().trim(),
            password: $('#password').val().trim()
        };

    
        if (!loginData.email || !loginData.password) {
            showError('Email and password are required');
            return;
        }

    
        $.ajax({
            url: 'backend/rest/auth/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(loginData),

            success: function(response) {
                localStorage.setItem('jwt_token', response.data.token);
                localStorage.setItem('user_role', response.data.role); 
                localStorage.setItem('user_id', response.data.id);
                updateNavbar();
                window.location.hash = '#home'; 
            },
            error: function(xhr) {
                const error = xhr.responseJSON?.error || 'Login failed';
                showError(error);
            }
        });
    });

    function showError(message) {
        const $errorDiv = $('#login-error').length ? $('#login-error') : 
            $('<div id="login-error" class="alert alert-danger mt-3"></div>').appendTo('.form-container');
        $errorDiv.text(message).stop().fadeIn().delay(5000).fadeOut();
    }
});





