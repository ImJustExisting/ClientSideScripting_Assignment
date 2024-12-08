// Select the root element in the HTML where we will append our content
const app = document.getElementById('root');

// Create an image element for the logo and set its source
const logo = document.createElement('img');
logo.src = 'Jeopardy!_logo.png';

// Create a container div to hold the movie cards, set its class for styling
const container = document.createElement('div');
container.setAttribute('class', 'container');

// Append the logo and container to the root element
app.appendChild(logo);
app.appendChild(container);













Promise.all([
    fetch('http://cluebase.lukelav.in/clues', ),
    fetch('http://cluebase.lukelav.in/categories?limit=5')
  ])
    .then(handleResponse)
    .then(handleData)
    .catch(handleError);