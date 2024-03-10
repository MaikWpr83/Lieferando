function renderMenuHTML(menu, i) {
    return /*html*/`
    <div class="card">
        <div class="dishtitel">
            <h3>${menu['name']}</h3>
            <img onclick="addToBasket(${i})" src="./icons/plus_icon.png" alt="Plus-Icon">
        </div>
        <div class="dishdescription">
            <p>${menu['description']}</p>
            <b>${menu['price'].toFixed(2).replace('.',',')}€</b>
        </div>
    </div>
`;
}

function renderBasketHTML(i) {
    let subtotal = prices[i] * amounts[i];
    return /*html*/`
            <div class="shoppingcard">
                <div class="shoppingheader">
                    <h3>${names[i]}</h3>
                    <span>${subtotal.toFixed(2).replace('.',',')}€</span>
                </div>
                <div class="shoppingoptions">
                <div>
                    <img onclick="deleteAll(${i})" src="./icons/trash.png" alt="Trash-Icon">
                </div>
                    <img onclick="decreaseAmount(${i})" src="./icons/minus_icon.png" alt="Minus-Icon">
                    <span>${amounts[i]}</span>
                    <img onclick="increaseAmount(${i})" src="./icons/plus_icon.png" alt="Plus-Icon">
                </div>
            </div>
        `;
}