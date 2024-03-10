//Array's Menü's
let menus = [
    {
        "name": "Menü 1",
        "description": "9er Chicken Nugget's, mit Pommen und ein Getränk Ihrer Wahl ",
        "price": 15.35,
    },
    {
        "name": "Menü 2",
        "description":"zwei Burger nach Wahl mit Pommes und ein Getränk",
        "price": 12.50,
    },
    {
        "name": "Menü 3",
        "description": "eine Familienpizza, zwei Getränje nach Wahl und eie Flasche Wein",
        "price": 18.95,
    },
    {
        "name": "Pizza Salami",
        "description": "mit Salami",
        "price": 8.70,
    },
    {
        "name": "Pizza Tonno",
        "description": "mit Thunfisch und frisch gehackten Zwiebeln",
        "price": 9.95,
    },
    {
        "name": "Pasta Curry",
        "description": "mit Frühlingszwiebeln, Hähnchen, Zucchini und Möhren",
        "price": 14.25,
    },
    {
        "name": "Royal TS",
        "description": "Burger mit Rindfleisch, Salat, Zwiebeln und Tomaten",
        "price": 5.45,
    },
    {
        "name": "Cheeseburger",
        "description": "mit Rindfleisch, Käse und Tomate",
        "price": 2.99,
    },
    {
        "name": "Hamburger",
        "description": "mit karamellisierten Zwiebeln, Beefpatty, Gewürzgurken und Salat",
        "price": 7.50,
    },
    {
        "name": "Chickenburger",
        "description": "mit karamellisierten Zwiebeln, Chickenpatty, Tomaten und Salat",
        "price": 4.95,
    },
    {
        "name": "Coka Cola",
        "description": "",
        "price": 2.25,
    },
    {
        "name": "Wiskey",
        "description": "",
        "price": 35.50,
    },
    {
        "name": "Wasser",
        "description": "",
        "price": 1.50,
    },
    ];
    
    //leere Array's
    let names = [];
    let prices = [];
    let amounts = [];
    
    //Array's aus dem LocalStorage laden
    loadLocalStorage();
    
    //Content rendern
    function renderMenu(){
        let content = document.getElementById('content');
        content.innerHTML = '';
    
        for (let i = 0; i < menus.length; i++){
            const menu = menus[i];
            
            content.innerHTML += renderMenuHTML(menu, i);
        }
    }
    
    //Index Ausgeben
    function getIndex(i){
        index = names.indexOf(i);
        if(index != -1){
            return index;
        } else {
            return -1;
        }
    }
    
    //Index im Warenkorb hinzufügen oder entfernen
    function addToBasket(i){
        let index = getIndex(menus[i]['name']);
    
        if(index == -1){
            names.push(menus[i]['name']);
            prices.push(menus[i]['price']).toFixed(2);
            amounts.push(1);
        } else{
            amounts[index]++;
        }
        saveLocalStorage();
        renderBasket();
    }
    
    //Warenkorb rendern (Anzeigen)
    function renderBasket(){
        let basket = document.getElementById('basket-content');
        let mobilebasket = document.getElementById('mobilebasket-content');
    
        basket.innerHTML = '';
        for (let i = 0; i < names.length; i++){
            basket.innerHTML += renderBasketHTML(i);
        }
        
        mobilebasket.innerHTML = '';
        for (let i = 0; i < names.length; i++){
            mobilebasket.innerHTML += renderBasketHTML(i);
        }
    
        document.getElementById('basket-sum').innerHTML = '';
        document.getElementById('mobilebasket-sum').innerHTML = '';
        displayTotal();
        mobileshoppingcard();
        displayTotalResponsive();
        saveLocalStorage();
    }
    
    //Betrag erhöhen
    function increaseAmount(i){
        amounts[i]++;
        saveLocalStorage();
        renderBasket();
    }
    
    //Betrag verringern
    function decreaseAmount(i){
        if(amounts[i] > 1) {
            amounts[i]--;
        } else {
            names.splice(i, 1);
            prices.splice(i, 1);
            amounts.splice(i, 1);
        }
        saveLocalStorage();
        renderBasket(); 
    }
    
    //alles Löschen
    function deleteAll(i){
        names.splice(i, 1);
        prices.splice(i, 1);
        amounts.splice(i, 1);
        saveLocalStorage();
        renderBasket();
    }
    
    //gesamten Betrag ermitteln
    function calculateTotalAmount(){
        let totalAmount = 0;
    
        for (let i = 0; i < names.length; i++) {
            totalAmount += prices[i] * amounts[i];
        }
        return totalAmount;
    }
    
    //Menükarte Mobilansicht
    function mobileshoppingcard(){
        let subtotal = calculateTotalAmount();
        let mobilebasket = document.getElementById('mobileshoppingcard');
    
        mobilebasket.innerHTML = /*html*/`
            <span class="mobileshoppingcard-text">
                Warenkorb (${subtotal.toFixed(2).replace('.',',')}€)
            </span>
        `;
    }
    
    //Warenkorb-Content Ansicht
    function displayTotal(){
        let subtotal = calculateTotalAmount();
        let totalAmountElement = document.getElementById('basket-sum');
    
        if (subtotal === 1){
            document.getElementById('basket-content').innerHTML = renderEmptyBasket();
        } else{
            totalAmountElement.innerHTML =
                subtotal < 25 ? minOrderValueText() : orderFinishedText();
        }
    }
    
    //Warenkorb-Content Mobilansicht
    function displayTotalResponsive(){
        let subtotal = calculateTotalAmount();
        let totalAmountElement = document.getElementById('mobilebasket-sum');
    
        if (subtotal === 1){
            document.getElementById('mobilebasket-content').innerHTML = renderEmptyBasket();
        } else {
            totalAmountElement.innerHTML =
                subtotal < 25 ? minOrderValueText() : orderFinishedText();
        }
    }
    
    //mindestens Bestellwert berechnen
    function minOrderValueText(){
        let subtotal = calculateTotalAmount();
        let remainingAmount = 25 - subtotal;
        return /*html*/`
            <span> Gesamt: ${subtotal.toFixed(2).replace('.',',')}€</span>
            <span> Bis zum Mindestbestellwert: ${remainingAmount.toFixed(2).replace('.',',')}€</span>
            <button class="button-no-order" onclick="minOrderValue()">
                Bestellen ${subtotal.toFixed(2).replace('.',',')}€
            </button>
        `;
    }
    


//nach bestellen öffnen von Dialog-Fenster 
function order() {
    let dialogBackground = document.getElementById('dialog');
    let cartBackground = document.getElementById('basket');

    cartBackground.classList.toggle('vs-hidden');
    dialogBackground.classList.toggle('vs-hidden');
    toggleBody();

    shoppingCart.splice(0, shoppingCart.length);
    renderShoppingCart();
    ifElseCartBackgound(cartBackground);
}









    //Dialogfeld "alert" anzeigen
    function minOrderValue(){
        alert("Mindestbestellwert nicht erreicht!");
    }
    
    //Bestellwert erreicht berechnen
    function orderFinishedText() {
        let subtotal = calculateTotalAmount();
        let totalAmount = subtotal + 5.00;
        return /*html*/`
            <span>Zwischensumme ${subtotal.toFixed(2).replace('.',',')}</span>
            <span>Lieferkosten: 5,00€</span>
            <button class="button-to-order" onclick="orderFinished()">
                Bestellen (${totalAmount.toFixed(2).replace('.',',')}€)
            </button>
        `;
    }

    //Bestellwert erreicht, Dialog-Feld (alert) anzeigen
    function orderFinished(){
        alert("Vielen Dank für Ihre Bestellung");
        names.splice(0, names.length);
        prices.splice(0, prices.length);
        amounts.splice(0, amounts.length);
        saveLocalStorage();
        renderBasket();
    }
    
    //Array's im LocalStorage speichern
    function saveLocalStorage(){
        let namesAsText = JSON.stringify(names);
        localStorage.setItem('names',namesAsText);
    
        let pricesAsText = JSON.stringify(prices);
        localStorage.setItem('prices',pricesAsText);
    
        let amountsAsText = JSON.stringify(amounts);
        localStorage.setItem('amounts',amountsAsText);
    }
    
    //Array's aus LocalStorage laden
    function loadLocalStorage(){
        let namesAsText = localStorage.getItem('names'); 
        let pricesAsText = localStorage.getItem('prices');
        let amountsAsText = localStorage.getItem('amounts');
        
        if(namesAsText && pricesAsText && amountsAsText) {
        names = JSON.parse(namesAsText)
        prices = JSON.parse(pricesAsText)
        amounts = JSON.parse(amountsAsText)
        }
    }
    
    //Class in Mobilansicht hinzufügen oder entfernen
    //Warenkorb in Mobilansicht öffnen/schließen
    function openMobileBasket() {
        document.getElementById('shoppingcardcontainer').classList.remove('add');
        document.getElementById('mobile').classList.remove('dnone');
    }
    //Warenkorb in Mobilansicht schließen/öffnen 
    function closeMobileBasket() {
        document.getElementById('shoppingcardcontainer').classList.add('dnone');
        document.getElementById('mobile').classList.add('dnone');
    }

    //Impressum im footer 
    function openImprint() {
        let contentImprint = document.getElementById('contentImprint');
        contentImprint.classList.toggle('translateX');
    }