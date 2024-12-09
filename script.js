
// Select the root element in the HTML where content will be placed 
const app = document.getElementById('root');

// Create an image element for the logo and set its source
const logo = document.createElement('img');
logo.src = 'Jeopardy!_logo.png';

// Create a container div to hold the jeopardy board
const container = document.createElement('div');
container.setAttribute('class', 'container');

// Add the above elements to root element
app.appendChild(logo);
app.appendChild(container);

//create table element, where the categories and clues will go into. Also styling of table features
var tbl = document.createElement('table');
tbl.style.width = '100px';    
tbl.style.border = '5px solid black';
tbl.style.color = 'white';

//json rendering function
async function gameData(data) {
  data.forEach(clue => {
    var cateData = [{cate: clue.category}]; //creates array that will hold the value of the clues category
    var headCate = tbl.insertRow(0); //inserts a row into the table made earlier
    headCate.innerHTML = cateData[0].cate; //displays the clue category in the above created row

    //for loop to display the clue value in its singular column
    for (let i = 0; i < 5; i++) {
      for(x in clue.category){
        var val = '$' + clue.value;
        var rows = 
        `<tr>
          <td>${val}</td>
        </tr>`
        tbl.innerHTML += rows;
      }
    }
    //adds above to the table
    container.appendChild(tbl);
  })
}

//Fetching both endpoints while setting promise to both of them
Promise.all([
  fetch('http://cluebase.lukelav.in/clues?game_id=1&&limit=30',{ mode: 'no-cors', credentials: 'include' }),
  fetch('http://cluebase.lukelav.in/categories?limit=5',{ mode: 'no-cors', status: 'success'})
])
  .then(res => res) //calling a response after fetching
  .then(gameData) //calling rendering function
  .catch(error => {
    // Handle any errors from the fetch operation
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Error: ${error.message}`;
    errorMessage.style.color = 'GoldenRod' //styling said error because eyestrain
    app.appendChild(errorMessage);
  });
