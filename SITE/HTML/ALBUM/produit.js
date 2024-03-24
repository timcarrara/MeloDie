menu-hamburger.js
            
            document.addEventListener('DOMContentLoaded', function() {
                const quantityInput = document.getElementById('quantity-input');
                const incrementButton = document.querySelector('.increment');
                const decrementButton = document.querySelector('.decrement');
                const pricePerUnit = 18.00; // Prix par unité
        
                function updateTotalPrice() {
                    const currentQuantity = parseInt(quantityInput.value);
                    const totalAmount = pricePerUnit * currentQuantity;
                    document.getElementById('total-amount').textContent = `${totalAmount.toFixed(2)} €`;
                }
        
                incrementButton.addEventListener('click', function() {
                    let currentQuantity = parseInt(quantityInput.value);
                    quantityInput.value = currentQuantity + 1;
                    updateTotalPrice();
                });
        
                decrementButton.addEventListener('click', function() {
                    let currentQuantity = parseInt(quantityInput.value);
                    if (currentQuantity > 1) {
                        quantityInput.value = currentQuantity - 1;
                        updateTotalPrice();
                    }
                });
        
                quantityInput.addEventListener('input', updateTotalPrice);
            });

    document.addEventListener('DOMContentLoaded', function() {
        // Récupérer le bouton "Acheter" de la page de produit
        const buyButton = document.querySelector('.buy-button');
        const quantityInput = document.getElementById('quantity-input');

        // Écouter le clic sur le bouton "Acheter"
        buyButton.addEventListener('click', function() {
            const productName = buyButton.getAttribute('data-name');
            const productPrice = parseFloat(buyButton.getAttribute('data-price'));
            const productImage = buyButton.getAttribute('data-image');
            const productQuantity = parseInt(quantityInput.value);
            addToCart(productName, productPrice, productImage, productQuantity);
        });

        // Fonction pour ajouter un produit au panier
        function addToCart(name, price, image, quantity) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Ajouter le produit au panier
            cart.push({ name, price, image, quantity });

            // Mettre à jour le stockage local du navigateur avec les nouvelles données du panier
            localStorage.setItem('cart', JSON.stringify(cart));

            // Rediriger l'utilisateur vers la page du panier
            window.location.href = '../panier.html';
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');

    // Structure de données pour stocker les avis
    let reviewsData = JSON.parse(localStorage.getItem('reviews')) || [];

    // Charger les avis existants depuis le localStorage
    for (const review of reviewsData) {
        addReviewToPage(review);
    }

    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Récupérez les données du formulaire (nom, note, commentaire)
        const name = document.getElementById('name').value;
        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;

        // Créez un objet d'avis
        const review = {
            name: name,
            rating: rating,
            comment: comment
        };

        // Ajoutez l'avis à la structure de données
        reviewsData.push(review);

        // Sauvegardez les avis dans le localStorage
        localStorage.setItem('reviews', JSON.stringify(reviewsData));

        // Appeler une fonction pour ajouter l'avis à la page
        addReviewToPage(review);

        // Réinitialisez le formulaire
        reviewForm.reset();
    });

    function addReviewToPage(review) {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');
        reviewElement.innerHTML = `
            <p>${review.name} a donné une note de ${review.rating}/5</p>
            <p>${review.comment}</p>
            <button class="delete-review">Supprimer</button>
        `;

        // Ajoutez un gestionnaire d'événements pour le bouton "Supprimer"
        const deleteButton = reviewElement.querySelector('.delete-review');
        deleteButton.addEventListener('click', function() {
            // Supprimez l'avis de la structure de données
            const index = reviewsData.indexOf(review);
            if (index > -1) {
                reviewsData.splice(index, 1);
            }

            // Supprimez l'élément HTML de l'avis de la page
            reviewsList.removeChild(reviewElement);

            // Mettez à jour le localStorage après la suppression
            localStorage.setItem('reviews', JSON.stringify(reviewsData));
        });

        reviewsList.appendChild(reviewElement);
    }
});
