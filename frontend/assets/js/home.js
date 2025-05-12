
//
$(document).ready(function () {
    const $container = $('#cards-container');

    function createCard(item, status) {
        const bgColor = status === 'Lost' ? 'rgba(255, 141, 141, 0.26)' : 'rgba(173, 255, 149, 0.26)';
        const borderColor = status === 'Lost' ? '#FF4B4B' : '#00A13E';
        const textColor = status === 'Lost' ? '#FF4B4B' : '#00A13E';


        const createdAt = new Date(item.createdAt.replace(' ', 'T')).toLocaleDateString();

        return $(`
            <div class="card-design">
                <div class="card-image"></div>
                <div class="card-text">
                    <div class="card-title">${item.itemName}</div>
                    <div class="card-status" style="background: ${bgColor}; border-color: ${borderColor}; color: ${textColor};">
                        ${status}
                    </div>
                    <div class="card-info">
                        <div class="card-data">
                            <div class="card-location">
                                <i class="fa-solid fa-location-dot"></i> ${item.location}
                            </div>
                            <div class="card-date">
                                <i class="fa-solid fa-calendar"></i> ${createdAt}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    function loadItems(url, status) {
        $.get(url, function (items) {
            if (Array.isArray(items) && items.length > 0) {
                items.forEach(item => {
                    const $card = createCard(item, status);
                    $container.append($card);
                });
            } else {
                console.log(`No ${status} items found.`);
                $container.append(`<p>No ${status} items available.</p>`);
            }
        }).fail(function (xhr, status, error) {
            console.error(`Error fetching ${status} items from ${url}:`, error);
            $container.append(`<p>Error loading ${status} items. Please try again later.</p>`);
        });
    }


    loadItems('backend/rest/lost-items', 'Lost');
    loadItems('backend/rest/found-items', 'Found');
});
