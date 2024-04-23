document.addEventListener("DOMContentLoaded", function () {
    const chocolates = document.querySelectorAll(
      '#chocolates .chocolate input[type="checkbox"]'
    );
    const quantities = document.querySelectorAll("#chocolates .chocolate select");
    const totalPriceSpan = document.getElementById("total");
    const totalItemsSpan = document.getElementById("items");
    const addToCartBtn = document.getElementById("addToCart");
  
    let totalPrice = 0;
    let totalItems = 0;
  
    chocolates.forEach(function (chocolate, index) {
      chocolate.addEventListener("change", function () {
        const quantity = parseInt(quantities[index].value);
        const price = 2; // Assuming each chocolate costs $2
        if (this.checked) {
          totalItems += quantity;
          if (totalItems > 8) {
            alert("Not more than 8 items");
            this.checked = false;
            totalItems -= quantity;
          } else {
            totalPrice += price * quantity;
          }
        } else {
          totalItems -= quantity;
          totalPrice -= price * quantity;
        }
        updateTotal();
      });
    });
  
    quantities.forEach(function (quantitySelect, index) {
      quantitySelect.addEventListener("change", function () {
        const quantity = parseInt(this.value);
        const price = 2; // Assuming each chocolate costs $2
        if (chocolates[index].checked) {
          totalItems -=
            quantity - parseInt(quantities[index].dataset.prevValue || 0);
          if (totalItems > 8) {
            alert("Not more than 8 items");
            this.value = this.dataset.prevValue || 0;
            return;
          }
          totalPrice -=
            price * parseInt(quantities[index].dataset.prevValue || 0);
          totalPrice += price * quantity;
          quantities[index].dataset.prevValue = quantity;
          updateTotal();
        }
      });
    });
  
    addToCartBtn.addEventListener("click", function () {
      if (totalItems === 0) {
        alert("Add items please");
      } else {
        alert("Added to Cart");
        // Reset total price and total items to zero
        totalPrice = 0;
        totalItems = 0;
        updateTotal();
        // Reset checkboxes
        chocolates.forEach(function(chocolate) {
          chocolate.checked = false;
        });
      }
    });
  
    function updateTotal() {
      totalPriceSpan.textContent = totalPrice.toFixed(2);
      totalItemsSpan.textContent = totalItems;
    }
  });
