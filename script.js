
// Select the root element in the HTML where we will append our content
const app = document.getElementById('root');

// Create an image element for the logo and set its source
const logo = document.createElement('img');
logo.src = 'Jeopardy!_logo.png';

// Create a container div to hold the movie cards, set its class for styling
const container = document.createElement('div');
container.setAttribute('class', 'container');
container.st

// Append the logo and container to the root element
app.appendChild(logo);
app.appendChild(container);

var tbl = document.createElement('table');
tbl.style.width = '100px';    
tbl.style.border = '5px solid black';
tbl.style.color = 'white';

Promise.all([
  fetch('http://cluebase.lukelav.in/clues?game_id=1&&limit=30',{ mode: 'no-cors' }),
  fetch('http://cluebase.lukelav.in/categories?limit=5',{ mode: 'no-cors' })
])
  .then(res => res)
  .then(data => {
    data.forEach(clue => {
      var cateData = [{cate: clue.category}];
      var headCate = tbl.insertRow(0);
      headCate.innerHTML = cateData[0].cate;

      for (let i = 0; i < 5; i++) {
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
    })
  })
  .catch(error => {
    // Handle any errors from the fetch operation
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working! Error: ${error.message}`;
    app.appendChild(errorMessage);
  });
