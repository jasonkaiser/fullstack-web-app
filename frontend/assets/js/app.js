
//
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

function loadPage(route) {
    const app = $('#app');
    console.log('Loading page:', route);

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

   
    loadSPA();
});
