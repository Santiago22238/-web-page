const inventoryTable = document.getElementById("inventoryTable");
const productForm = document.getElementById("productForm");
const addButton = document.getElementById("addButton");

// Cargar datos del inventario desde el almacenamiento local al cargar la página
window.addEventListener("load", loadInventory);

function loadInventory() {
    const storedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    for (const productData of storedInventory) {
        addProductToTable(productData);
       
    }
       
    }


// Función para agregar un producto al inventario
function addProduct() {
    const product = document.getElementById("product").value;
    const category = document.getElementById("category").value;
    const stock = document.getElementById("stock").value;
    const price = document.getElementById("price").value;

    const productData = { product, category, stock, price };
    addProductToTable(productData);
    
    // Guardar datos en el almacenamiento local
    saveToLocalStorage(productData);

    productForm.reset();
}

function addProductToTable(productData) {
    const newRow = inventoryTable.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete");
    cell5.appendChild(deleteButton);

    deleteButton.addEventListener("click", (event) => {
        const row =
        event.target.parentNode.parentNode;
        const productData = {
            product: row.cells[0].innerHTML, 
            category: row.cells[1].innerHTML, 
            stock: row.cells[2].innerHTML, 
            price: row.cells[3].innerHTML, 
        };
        row.remove();
        // Eliminar datos del almacenamiento local
        removeFromLocalStorage(productData);
        
    });

    cell1.innerHTML = productData.product;
    cell2.innerHTML = productData.category;
    cell3.innerHTML = productData.stock;
    cell4.innerHTML = productData.price;


    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit");
    editButton.addEventListener("click", () => editProduct(newRow, productData));
    cell6.appendChild(editButton);
}


  function editProduct(button) {
    const row = button.parentNode.parentNode;
    const cells = row.getElementsByTagName("td");
    const product = cells[0].innerHTML;
    const category = cells[1].innerHTML;
    const stock = cells[2].innerHTML;
    const price = cells[3].innerHTML;
    

    document.getElementById("product").value = product;

    document.getElementById("category").value = category;

    document.getElementById("stock").value = stock;

    document.getElementById("price").value = price;

  }
  
    // Implementar la lógica de edición aquí
    // También puedes guardar los datos editados en el almacenamiento local si es necesario

document.getElementById("searcher").addEventListener("input", function() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searcher");
  filter = input.value.toUpperCase();
  table = document.getElementById("inventoryTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0]; // Adjust index based on your column
      if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
          } else {
              tr[i].style.display = "none";
          }
      }
  }
});

function saveToLocalStorage(productData) {
    const storedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    storedInventory.push(productData);
    localStorage.setItem("inventory", JSON.stringify(storedInventory));
}

function removeFromLocalStorage(productData) {
    const storedInventory = JSON.parse(localStorage.getItem("inventory")) || [];
    const updatedInventory = storedInventory.filter(item => !isEqual(item, productData));
    localStorage.setItem("inventory", JSON.stringify(updatedInventory));
}

// Función para comparar objetos
function isEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

// Asocia la función al botón de agregar
addButton.addEventListener("click", addProduct);