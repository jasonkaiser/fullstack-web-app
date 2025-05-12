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
                window.location.hash = '#home'; // Triggers your custom SPA router
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



//

