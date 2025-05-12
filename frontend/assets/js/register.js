$(document).ready(function () {
    $('.btn-primary').click(function (e) {
        e.preventDefault();

        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const password = $('#password').val().trim();
        const confirmPassword = $('#confirm-password').val().trim();


        if (!name || !email || !password || !confirmPassword) {
            showError('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            showError('Passwords do not match');
            return;
        }

        const userData = {
            name: name,
            email: email,
            password: password
        };

        $.ajax({
            url: 'backend/rest/auth/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function (response) {
                showSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => {
                    window.location.hash = '#login';
                }, 1500);
            },
            error: function (xhr) {
                const error = xhr.responseJSON?.error || 'Registration failed';
                showError(error);
            }
        });
    });

    $('#goToLogin').click(function (e) {
        e.preventDefault();
        window.location.hash = '#login';
    });

    function showError(message) {
        const $errorDiv = $('#register-error').length
            ? $('#register-error')
            : $('<div id="register-error" class="alert alert-danger mt-3"></div>').appendTo('.form-container');
        $errorDiv.text(message).stop().fadeIn().delay(5000).fadeOut();
    }

    function showSuccess(message) {
        const $successDiv = $('#register-success').length
            ? $('#register-success')
            : $('<div id="register-success" class="alert alert-success mt-3"></div>').appendTo('.form-container');
        $successDiv.text(message).stop().fadeIn().delay(5000).fadeOut();
    }
});
