
const config = {
    templateDir: 'frontend/pages/',
    styleDir: 'frontend/assets/styles/',
    scriptDir: 'frontend/assets/js/'
};

const routes = {
    home: 'home.html',
    report: 'report.html',
    register: 'register.html',
    profile: 'profile.html',
    login: 'login.html',
    admin: 'admin.html'
  
};

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

function loadPage(route) {
    const app = $('#app');
    const token = localStorage.getItem('jwt_token');
    const role = localStorage.getItem('user_role');

    console.log('Loading page:', route);
    console.log('JWT Token:', token);
    console.log('User Role:', role);


    if (route === 'admin') {
        if (!token || role !== 'Admin') {
            alert('Access denied. Admins only.');
            window.location.hash = '#home';
            return;
        }
    }

    if (routes[route]) {
        const htmlPath = `${config.templateDir}${routes[route]}`;
        const cssPath = `${config.styleDir}${route}.css`;
        const jsPath = `${config.scriptDir}${route}.js`;

        $.get(htmlPath)
            .done((html) => {
                app.html(html);
                loadCSS(cssPath);
                loadJS(jsPath);
            })
            .fail((error) => {
                console.error('Failed to load page:', error);
                app.html('<h1>Page not found!</h1>');
            });
    } else {
        app.html('<h1>Page not found!</h1>');
    }
}



function loadCSS(href) {
    $('#dynamic-css').remove();
    $('<link>', {
        id: 'dynamic-css',
        rel: 'stylesheet',
        href: href
    }).appendTo('head');
}

function loadJS(src) {
    $('#dynamic-js').remove();
    const script = document.createElement('script');
    script.src = `${src}?v=${Date.now()}`;
    script.id = 'dynamic-js';
    script.defer = true;
    script.onload = () => console.log(`Loaded JS: ${src}`);
    script.onerror = () => console.error(`Failed to load JS: ${src}`);
    document.body.appendChild(script);
}

function loadSPA() {
    const route = location.hash.slice(1) || 'home';
    loadPage(route);
}

$(window).on('hashchange', function () {
    const route = location.hash.slice(1);
    loadPage(route);
});

$(document).ready(function () {
   
    $('.hamburger').on('click', function () {
        $('.nav-links').toggleClass('open');
    });

    updateNavbar();
    loadSPA();
});

$(document).on('click', '#logout-link', function (e) {
    e.preventDefault();
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role');
    window.location.hash = '#home';
    updateNavbar();
});
