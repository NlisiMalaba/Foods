let products = [];

fetch('foods.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        displayProducts();
    });

function displayProducts() {
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';

    products.forEach(product => {
        const row = tableBody.insertRow();
        row.innerHTML = `<td>${product.id}</td>
                             <td>${product.name}</td>
                             <td>
                                <button onclick="editProduct('${product.id}')">Edit</button>
                                <button onclick="deleteProduct('${product.id}')">Delete</button>
                             </td>`;
    });
}



function openModal(){
    const modal = document.getElementById('tableModal');
    const modal1 = document.getElementById('createModal');
    modal.style.display = 'block';
    modal1.style.display = 'none';
}

function closeModal(){
    const modal = document.getElementById('tableModal');
    modal.style.display = 'none';
}

function openCreateModal(){
    const modal = document.getElementById('createModal');
    const modal1 = document.getElementById('tableModal');
    modal.style.display = 'block';
    modal1.style.display = 'none'
}

function closeCreateModal(){
    const modal = document.getElementById('createModal');
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === modal) {
      closeModal();
    }
  };


function addProduct() {
    const name = document.getElementById('name').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());

    // Create a new product object
    const newProduct = {
        id: generateId(),
        name: name,
        // Add nutrition properties here
        tags: tags,
    };

    // Add the new product to the products array
    products.push(newProduct);

    // Display the updated list
    displayProducts();

    // Clear the form fields
    document.getElementById('name').value = '';
    document.getElementById('tags').value = '';
}

function editProduct(id) {
    const product = products.find(product => product.id === id);
        document.getElementById('name').value = product.name;
        document.getElementById('tags').value = product.tags.join(','); 
        document.getElementById('productId').value = id;
}

function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    displayProducts();
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}