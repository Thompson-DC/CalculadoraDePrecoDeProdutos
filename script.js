let productCount = 2;

document.querySelector('.add-product').addEventListener('click', () => {
    const form = document.getElementById('product-form');

    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.dataset.index = productCount;

    productDiv.innerHTML = `
        <label for="capacity-${productCount}">Capacidade (L, Kg ou Unid):</label>
        <input type="text" id="capacity-${productCount}" placeholder="Ex: 1,500" required>
        
        <label for="price-${productCount}">Preço (R$):</label>
        <input type="text" id="price-${productCount}" placeholder="Ex: 10,50" required>
    `;

    form.insertBefore(productDiv, document.querySelector('.add-product'));
    productCount++;
});

document.querySelector('.compare-button').addEventListener('click', () => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    let products = [];
    let error = false;

    for (let i = 0; i < productCount; i++) {
        const capacityInput = document.getElementById(`capacity-${i}`);
        const priceInput = document.getElementById(`price-${i}`);

        const capacity = parseFloat(capacityInput.value.replace(',', '.'));
        const price = parseFloat(priceInput.value.replace(',', '.'));

        if (isNaN(capacity) || isNaN(price)) {
            capacityInput.classList.add('error');
            priceInput.classList.add('error');
            error = true;
        } else {
            capacityInput.classList.remove('error');
            priceInput.classList.remove('error');

            products.push({
                index: i,
                capacity: capacity.toFixed(3).replace('.', ','),
                price: price.toFixed(2).replace('.', ','),
                pricePerUnit: (price / capacity).toFixed(4)
            });
        }
    }

    if (error) {
        resultDiv.innerHTML = '<p class="error-message">Todos os campos devem ser preenchidos!</p>';
        return;
    }

    products.sort((a, b) => a.pricePerUnit - b.pricePerUnit);

    products.forEach(product => {
        resultDiv.innerHTML += `<p>Produto ${product.index + 1}: R$ ${product.price} - Capacidade: ${product.capacity} - Preço por unidade: R$ ${product.pricePerUnit}</p>`;
    });
});
