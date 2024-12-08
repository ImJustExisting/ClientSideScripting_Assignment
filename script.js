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

var tbl = document.createElement('table');
tbl.style.width = '100px';    
tbl.style.border = '5px solid black';

/**
 * Named function to handle the processed data.
 * Callback for the second `.then` in the fetch call.
 *
 * @param {Array} data - The array of movie objects returned from the API.
 */
function handleData(data) {
  data.forEach(createCategory);
}

/**
 * Named function to handle errors that occur during the fetch call.
 * Callback for the `.catch` in the fetch call.
 *
 * @param {Error} error - The error object caught from the fetch call.
 */
function handleError(error) {
  const errorMessage = document.createElement('marquee');
  errorMessage.textContent = `Gah, it's not working! Error: ${error.message}`;
  app.appendChild(errorMessage);
}

/**
 * Named function to create and display a column for each category
 * Called within `handleData` for each category object.
 *
 * @param {Object} category - An object containing names of categories
 * @param {Object} clue
 * */

function createCategory(category, clue){
  var cateData = [{cate: category.category}];
  var headCate = tbl.insertRow(0);
  headCate.innerHTML = cateData[0].cate;

  for (let i = 1; i < 6; i++) {
    for(x in clue.id){
      if(clue.category == category.category){
        var val = '$' + clue.value;
        var rows = 
        `<tr>
          <td>${val}</td>
        </tr>`
        tbl.innerHTML += rows;
      }
    }
    
  }

  container.appendChild(tbl);
}




Promise.all([
  fetch('http://cluebase.lukelav.in/clues?game_id=1&&limit=30',{ mode: 'no-cors' }),
  fetch('http://cluebase.lukelav.in/categories?limit=5',{ mode: 'no-cors' })
])
  .then(res => res)
  .then(handleData)
  .catch(handleError);