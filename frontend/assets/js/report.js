document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const reportType = document.getElementById('reportType').value;
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const category = document.getElementById('category').value;
    const location = document.getElementById('location').value.trim();
    const date = document.getElementById('date').value;

    const userID = localStorage.getItem('user_id');
    const token = localStorage.getItem('jwt_token');

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

    const data = {
        userID: parseInt(userID),
        categoryID: categoryID,
        itemName: title,
        description: description,
        location: location,

    };

    let url = '';
    if (reportType === 'lost') {
        url = '/lost-items';
    } else if (reportType === 'found') {
        url = '/found-items';
    } else {
        alert('Invalid report type selected.');
        return;
    }

    fetch('backend/rest' + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw err; });
        }
        return response.json();
    })
    .then(response => {
        alert('Report submitted successfully!');
        document.querySelector('form').reset();
    })
    .catch(error => {
        alert('Failed to submit report: ' + (error.error || error.message || 'Unknown error'));
    });
});