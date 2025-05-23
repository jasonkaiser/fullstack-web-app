$(document).ready(function () {

    const userId = localStorage.getItem('user_id');
    const jwtToken = localStorage.getItem('jwt_token');

    if (!userId || !jwtToken) {
        Toast.error("You need to be logged in to access this page.");
        window.location.href = '/login';
        return;
    }

    const editProfileModal = new bootstrap.Modal(document.getElementById('editProfileModal'));

    function loadProfileData() {
        RestClient.get(`rest/users/${userId}`, function (response) {
            if (response) {
                updateProfileUI(response);
            } else {
                Toast.error("Failed to load profile data");
                console.error('Failed to load profile data');
            }
        }, function (error) {
            console.error('Error loading profile:', error);
            Toast.error("Error loading profile data");
            if (error.status === 401) {
                Toast.error("Session expired. Please login again.");
                window.location.href = '/login';
            }
        });
    }

    function updateProfileUI(userData) {
        $('.profile-name').text(userData.name || 'Not provided');
        $('.user-name').text(`@${userData.email?.split('@')[0]}` || '@username');

        $('.info-name').text(userData.name || 'Not provided');
        $('.info-email').text(userData.email || 'Not provided');
        $('.info-password').text('********');
        $('.info-verified').text(userData.verified ? "Verified" : "Not Verified");
        $('.card-avatar').css('background-image', 'url("frontend/assets/images/avatar.png")');
    }

    function loadUserReports() {
        RestClient.get(`rest/lost-items/user/${userId}`, function (lostReports) {
            renderReports(lostReports, '.lost-reports');
        }, function (error) {
            console.error('Error loading lost reports:', error);
            Toast.info("No Lost Item reports found");
            $('.lost-reports').html('<div class="no-reports-message">No lost reports found</div>');
        });

        RestClient.get(`rest/found-items/user/${userId}`, function (foundReports) {
            renderReports(foundReports, '.found-reports');
        }, function (error) {
            console.error('Error loading found reports:', error);
            Toast.info("No Found Item reports found");
            $('.found-reports').html('<div class="no-reports-message">No found reports found</div>');
        });
    }

    function renderReports(reports, containerSelector) {
        const $container = $(containerSelector);
        $container.empty();

        if (!reports || reports.length === 0) {
            $container.append('<div class="no-reports-message">No reports found</div>');
            return;
        }

        reports.forEach(report => {
            const reportDate = new Date(report.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            $container.append(`
                <div class="report-card">
                    <div class="card-header">
                        <h5 class="report-title">
                            <b style="color:var(--primary-color)">ID:${report.id} - </b>
                            <b>${report.itemName || 'Untitled Report'}</b>
                        </h5>
                        <div class="report-meta">
                            <span class="report-description">${report.description || 'No description provided'}</span>    
                            <div>
                                <span class="meta-item"><i class="far fa-calendar"></i> ${reportDate}</span>
                                <span class="meta-item"><i class="fas fa-map-marker-alt"></i> ${report.location || 'Unknown location'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
    }

 
    $(document).on("click", ".edit-profile-btn, .edit-info-btn", function() {
        const $btn = $(this);
        $btn.prop("disabled", true);
        
        RestClient.get(`rest/users/${userId}`, function(user) {
            $('#editName').val(user.name || '');
            $('#editEmail').val(user.email || '');
            $('#editPassword').val('');
            
            editProfileModal.show();
            $btn.prop("disabled", false);
        }, function(error) {
            Toast.error("Failed to load profile data for editing");
            console.error(error);
            $btn.prop("disabled", false);
        });
    });

    $('#profileForm').submit(function (e) {
        e.preventDefault();
        const $form = $(this);
        const $submitBtn = $form.find("button[type='submit']");
        $submitBtn.prop("disabled", true);
        
        const updatedData = {
            name: $('#editName').val().trim(),
            email: $('#editEmail').val().trim()
        };

        const newPassword = $('#editPassword').val().trim();
        if (newPassword) {
            updatedData.password = newPassword;
        }

        if (!updatedData.name) {
            Toast.error("Please enter your name");
            $submitBtn.prop("disabled", false);
            return;
        }

        if (!updatedData.email) {
            Toast.error("Please enter your email");
            $submitBtn.prop("disabled", false);
            return;
        }

        RestClient.put(`rest/users/${userId}`, updatedData, function (response) {
            Toast.success("Profile updated successfully!");
            editProfileModal.hide();
            loadProfileData();
            $submitBtn.prop("disabled", false);
        }, function (error) {
            console.error('Error updating profile:', error);
            if (error.status === 400) {
                Toast.error("Invalid data. Please check your inputs.");
            } else {
                Toast.error("Failed to update profile. Please try again.");
            }
            $submitBtn.prop("disabled", false);
        });
    });

    $(document).on('click', '[data-bs-dismiss="modal"]', function() {
        editProfileModal.hide();
    });

    loadProfileData();
    loadUserReports();

    $('#editProfileModal').on('hidden.bs.modal', function () {
        $('#profileForm')[0].reset();
    });
});