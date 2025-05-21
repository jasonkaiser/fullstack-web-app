$(document).ready(function() {
    $('.btn-primary').click(function(e) {
        e.preventDefault();

        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const password = $('#password').val().trim();
        const confirmPassword = $('#confirm-password').val().trim();

        if (!name || !email || !password || !confirmPassword) {
            Utils.showError('#register-error', 'All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            Utils.showError('#register-error', 'Passwords do not match');
            return;
        }

        const userData = {
            name: name,
            email: email,
            password: password
        };

        RestClient.post('rest/auth/register', userData, function(response) {
            Utils.showSuccess('#register-success', 'Registration successful! Redirecting to login...');
            setTimeout(() => {
                window.location.hash = '#login';
            }, 1500);
        }, function(xhr) {
            const error = xhr.responseJSON?.error || 'Registration failed';
            Utils.showError('#register-error', error);
        });
    });

    $('#goToLogin').click(function(e) {
        e.preventDefault();
        window.location.hash = '#login';
    });
});