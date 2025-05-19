$('form').submit(function(e) {
    e.preventDefault();

    const reportType = $('#reportType').val(); // "lost" or "found"
    const title = $('#title').val().trim();
    const description = $('#description').val().trim();
    const category = $('#category').val();
    const location = $('#location').val().trim();
    const date = $('#date').val();
    // Image upload is optional and more complex, so skipping for now

    const userID = localStorage.getItem('user_id');
    const token = localStorage.getItem('jwt_token');

    // Map category name to categoryID (adjust IDs if needed)
    const categoryMap = {
        'electronics': 1,
        'pets': 2,
        'documents': 3,
        'other': 4
    };
    const categoryID = categoryMap[category];

    if (!userID || !token) {
        alert('You must be logged in to submit a report.');
        return;
    }

    if (!reportType) {
        alert('Please select a report type.');
        return;
    }

    // Prepare data object to send
    const data = {
        userID: parseInt(userID),
        categoryID: categoryID,
        itemName: title,
        description: description,
        location: location,
        // If your backend supports date, you can add it here:
        // date: date
    };

    // Determine URL based on reportType
    let url = '';
    if (reportType === 'lost') {
        url = '/lost-items';
    } else if (reportType === 'found') {
        url = '/found-items';
    } else {
        alert('Invalid report type selected.');
        return;
    }

    // Send POST request
    $.ajax({
        url: 'backend/rest' + url,  // Adjust the base path if needed
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        headers: {
            Authorization: 'Bearer ' + token
        },
        success: function(response) {
            alert('Report submitted successfully!');
            $('form')[0].reset();
        },
        error: function(xhr) {
            alert('Failed to submit report: ' + (xhr.responseJSON?.error || xhr.statusText));
        }
    });
});
