
function loadPage(route){

    const app = document.getElementById('app');

    if(routes[route]){
        fetch(`frontend/pages/${routes[route]}`)

            .then(response => response.text())
            .then(html => {
                app.innerHTML = html;

                const cssFile = `frontend/assets/styles/${route}.css`;
                loadCSS(cssFile);

            })
            .catch(error => {
                console.error('Error Loading the page');
                app.innerHTML('<h1>Page not found!</h1>')
            })

    } else {

        app.innerHTML = '<h1>Page not found!</h1>';
    }

}


function loadSPA(){

    const route = location.hash.slice(1) || 'home';
    loadPage(route);
}

function loadCSS(href){

   let existingLink = document.getElementById('dynamic-css');
    if (existingLink) existingLink.remove(); 
    
    let link = document.createElement('link');
    link.id = 'dynamic-css';
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

window.addEventListener('hashchange', () => {
    const route = location.hash.slice(1);
    loadPage(route)
})

loadSPA();

function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("open");
}


