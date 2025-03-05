function loadPage(route){

    const app = document.getElementById('app');

    if(routes[route]){
        fetch(`frontend/pages/${routes[route]}`)

            .then(response => response.text())
            .then(html => {
                app.innerHTML = html;
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

window.addEventListener('hashchange', () => {
    const route = location.hash.slice(1);
    loadPage(route)
})

loadSPA();