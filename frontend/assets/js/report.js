const availableImages = [
  'frontend/assets/images/preview1.jpg',
  'frontend/assets/images/preview2.jpg',
  'frontend/assets/images/preview3.jpg',
  'frontend/assets/images/preview4.jpg',
  'frontend/assets/images/preview5.jpg',
  'frontend/assets/images/preview6.jpg',
  'frontend/assets/images/preview7.jpeg',
  'frontend/assets/images/preview8.jpg',
  'frontend/assets/images/preview9.jpeg'
];

const imageSelector = document.getElementById('imageSelector');
const selectedImageInput = document.getElementById('selectedImage');
const previewImage = document.getElementById('previewImage');

availableImages.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.className = 'img-thumbnail';
  img.style.width = '87px';
  img.style.height = '80px';
  img.style.cursor = 'pointer';

  img.addEventListener('click', () => {
    document.querySelectorAll('#imageSelector img').forEach(i => {
      i.classList.remove('border', 'border-primary');
    });

    img.classList.add('border', 'border-primary');
    selectedImageInput.value = src;
    previewImage.src = src;
    previewImage.classList.remove('d-none');
  });

  imageSelector.appendChild(img);
});

document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const reportType = document.getElementById('reportType').value;
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  let category = document.getElementById('category').value;
  const location = document.getElementById('location').value.trim();
  const date = document.getElementById('date').value;

  const userID = localStorage.getItem('user_id');
  const token = localStorage.getItem('jwt_token');

  const categoryMap = {
    'electronics': 1,
    'wallets': 2,
    'clothing': 3,
    'keys': 4,
    'documents': 5,
    'pets': 6,
    'jewelry': 7,
    'toys': 8,
    'others': 9
  };

  category = category.toLowerCase();
  const categoryID = categoryMap[category];

  if (!userID || !token) {
    Toast.error('You must be logged in to submit a report.');
    return;
  }

  if (!reportType) {
    Toast.error('Please select a report type.');
    return;
  }

  if (!categoryID) {
    Toast.error('Please select a valid category.');
    return;
  }

  if (!title) {
    Toast.error('Please enter the item title.');
    return;
  }

  const selectedImage = selectedImageInput.value;

  const data = {
    userID: parseInt(userID),
    categoryID: categoryID,
    itemName: title,
    description: description,
    location: location,
    image: selectedImage
  };

  let url = '';
  if (reportType === 'lost') {
    url = '/lost-items';
  } else if (reportType === 'found') {
    url = '/found-items';
  } else {
    Toast.error('Invalid report type selected.');
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
      Toast.success('Report submitted successfully!');
      document.querySelector('form').reset();
      selectedImageInput.value = '';
      previewImage.classList.add('d-none');
      document.querySelectorAll('#imageSelector img').forEach(i => {
        i.classList.remove('border', 'border-primary');
      });
    })
    .catch(error => {
      Toast.error('Failed to submit report: ' + (error.error || error.message || 'Unknown error'));
    });
});
