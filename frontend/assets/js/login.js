$(document).ready(function() {
    // Initialize navbar
    Utils.updateNavbar();

    $('.btn-primary').click(function(e) {
        e.preventDefault();
        
        const loginData = {
            email: $('#email').val().trim(),
            password: $('#password').val().trim()
        };

        if (!loginData.email || !loginData.password) {
            Utils.showError('#login-error', 'Email and password are required');
            return;
        }

        RestClient.post('rest/auth/login', loginData, function(response) {
            localStorage.setItem('jwt_token', response.data.token);
            localStorage.setItem('user_role', response.data.role); 
            localStorage.setItem('user_id', response.data.id);
            Utils.updateNavbar();
            window.location.hash = '#home'; 
        }, function(xhr) {
            const error = xhr.responseJSON?.error || 'Login failed';
            Utils.showError('#login-error', error);
        });
    });
});