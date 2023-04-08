const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
let editMode = false;

function displayItems()
{
    const displayItemsFromLocalStorage = getItemFromLoclaStorage();
    displayItemsFromLocalStorage.forEach(item => {
        addItemstoDOM(item);

    });
    checkUI();
}

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  
  
  addItemstoDOM(newItem);
  addToLoacalStorage(newItem);
  checkUI();

  itemInput.value = '';
}

function addItemstoDOM(item)
{
    // Create list item
    const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
  }
  
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
  }


  function addToLoacalStorage(item)
{
   
    const  addItemToLoclaStorage = getItemFromLoclaStorage();
    addItemToLoclaStorage.push(item); 
    localStorage.setItem("items", JSON.stringify(addItemToLoclaStorage));

}

function getItemFromLoclaStorage()
{
    let addItemToLoclaStorage;

    if(localStorage.getItem("items") === null)
    {
        addItemToLoclaStorage=[];
    }
    else{
        addItemToLoclaStorage=JSON.parse(localStorage.getItem("items"));
        
    }
    return addItemToLoclaStorage;
}


function removeItemOrEditItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
        
        removeFromDOM(e.target.parentElement.parentElement);
        removeFromLocalStorage(e.target.parentElement.parentElement.textContent);
      }
    else if (e.target.parentElement.parentElement === "li"){
      console.log(1);
      setItemToEdit(e.target);
      
        }
        
      }
      checkUI();
    }

function removeFromDOM(item)
{
    item.remove();
}

function removeFromLocalStorage(item)
{
    let itemFromLocalStorgae = getItemFromLoclaStorage();
//    console.log(itemFromLocalStorgae);
    itemFromLocalStorgae = itemFromLocalStorgae.filter((i)=> i !== item);
    // console.log(itemFromLocalStorgae);
    localStorage.setItem("items", JSON.stringify(itemFromLocalStorgae));
}

function clearItems() {
//     if(confirm('Are you sure to clear all?')) {
//   while (itemList.firstChild) {
//     itemList.removeChild(itemList.firstChild);
  
//Remove form DOM
   itemList.innerHTML = '';

 //Remove From Local Storage
    localStorage.clear();
   checkUI();
    }
  
function setItemToEdit(item)
{
  editMode= true;
  itemList.querySelectorAll("li").forEach((i)=>{
    i.style.color = "black";
  });
  item.style.color = "#ccc";
}

function checkUI() {
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

function onFilter(e)
{
    const items = itemList.querySelectorAll('li');
    const searchedItem = e.target.value.toLowerCase();

    items.forEach((item)=>{
        const itemName = item.firstChild.textContent.toLowerCase();

        console.log(itemName);
        if (itemName.indexOf(searchedItem) != -1)
        {
            item.style.display = "flex";
        }
        else{
            item.style.display = "none";

        }
    });
   
    
    
}
// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItemOrEditItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input',onFilter);
document.addEventListener("DOMContentLoaded",displayItems);
checkUI();
