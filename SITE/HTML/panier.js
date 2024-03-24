document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les informations du panier depuis le stockage local du navigateur
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Fonction pour mettre à jour l'affichage du panier
    function updateCartDisplay() {
        const cartList = document.getElementById('cart-list');
        const subTotalPanier = document.getElementById('sub-total');
        const totalPanier = document.getElementById('total');

        // Réinitialiser la liste du panier
        cartList.innerHTML = '';

        let subTotalAmount = 0;

        // Afficher chaque élément du panier
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Prix unitaire : ${item.price.toFixed(2)} €</p>
                    <div class="quantity">Quantité : ${item.quantity}</div>
                    <p>Prix Total : ${(item.price * item.quantity).toFixed(2)} €</p>
                </div>
            </div>`;
            cartList.appendChild(listItem);
        });

        // Calculer le sous-total, les frais de livraison et le total
        const subTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const total = subTotal + 10; // Frais de livraison de $10

        // Mettre à jour les montants dans le récapitulatif
        document.getElementById('sub-total').textContent = `Sous-total : ${subTotal.toFixed(2)} €`;
        document.getElementById('total').textContent = `Total : ${total.toFixed(2)} €`;
    }

    // Mettre à jour l'affichage initial du panier
    updateCartDisplay();

    // Récupérer le bouton "Vider le Panier"
    const clearCartButton = document.querySelector('.clear-cart-button');

    // Écouter le clic sur le bouton "Vider le Panier"
    clearCartButton.addEventListener('click', function() {
        // Effacer le contenu du panier dans le stockage local
        localStorage.removeItem('cart');
        // Rafraîchir la page pour refléter le panier vide
        location.reload();
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const promoCodeInput = document.getElementById('promo-code');
    const applyPromoButton = document.getElementById('apply-promo-button');
    const subTotal = document.getElementById('sub-total');
    const total = document.getElementById('total');

    // Définissez les codes promo prédéfinis et leurs réductions
    const promoCodes = {
        'CODE1': 0.1,  // 10% de réduction
        'CODE2': 0.2   // 20% de réduction
    };

    // Écoutez l'événement de soumission du formulaire
    applyPromoButton.addEventListener('click', function() {
        const enteredPromoCode = promoCodeInput.value;

        // Vérifiez si le code promo est valide
        if (promoCodes.hasOwnProperty(enteredPromoCode)) {
            const discount = promoCodes[enteredPromoCode];
            const currentSubTotal = parseFloat(subTotal.textContent.replace('Sous-total : ', '').replace(' €', ''));
            const discountedTotal = currentSubTotal - (currentSubTotal * discount);

            // Mettez à jour le total avec la réduction
            total.textContent = `Total : ${discountedTotal.toFixed(2)} €`;

            // Effacez le champ de saisie du code promo
            promoCodeInput.value = '';

            // Désactivez le champ de saisie et le bouton après avoir appliqué la réduction
            promoCodeInput.disabled = true;
            applyPromoButton.disabled = true;
        }
    });
});
