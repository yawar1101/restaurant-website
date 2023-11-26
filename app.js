const apiUrl = 'https://crudcrud.com/api/bda655bbe6b14ea9ae7788fe6afbc42c';

function addToBill() {
    const dishSelect = document.getElementById('dishInput');
    const priceInput = document.getElementById('priceInput');
    const tableSelect = document.getElementById('tableSelect');

    const dish = dishSelect.value;
    const price = priceInput.value;
    const table = tableSelect.value;

    console.log(table);
    console.log(dish);
    console.log(price);
    if (dish && price && table) {
        const order = `${dish} - Rs. ${price} | ${table}`
        updateWaiterTab(order);
        updateCrudCrud(dish, price, table);
        clearInputs();
    } else {
        alert('Please fill out all fields.');
    }
}

function updateCrudCrud(dish, price, table) {
    axios
        .post(`${apiUrl}/orders`, {
            category: table,
            description: dish,
            expenseAmount: price,
        })
        .then((res) => {
            console.log('Orders added to CRUD CRUD: ', res.data);
        })
        .catch((err) => {
            console.error('Error adding order to CRUD CRUD: ', err);
        });
}

function updateWaiterTab(order) {
    const listItem = document.createElement('li');
    listItem.textContent = order;

    waiterTab.appendChild(listItem);
}


function clearInputs() {
    document.getElementById('dishInput').value = '';
    document.getElementById('priceInput').value = '';
    document.getElementById('tableSelect').value = '';
}

function loadOrders() {
    axios
        .get(`${apiUrl}/orders`)
        .then((response) => {
            const orders = response.data;
            console.log('Orders loaded from CRUD CRUD:', orders);
            orders.forEach((order) => {
                const orderText = `${order.description} - Rs. ${order.expenseAmount} | ${order.category}`;
                updateWaiterTab(orderText);
            });
        })
        .catch((error) => {
            console.error('Error loading orders from CRUD CRUD:', error);
        });
}

window.onload = loadOrders;
