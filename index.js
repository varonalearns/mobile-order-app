import { menuArray } from "./data.js"

// Create the menu based on data
const menuEl = document.getElementById("menu");
menuArray.forEach( (menuItem) => {
    const foodSection = document.createElement("section")
    foodSection.className = "item";
    foodSection.innerHTML = `
    <div class="item-emoji">${menuItem.emoji}</div>
    <div class="item-info">
        <p class="item-name">${menuItem.name}</p>
        <p class="item-ingredients">${menuItem.ingredients}</p>
        <p class="item-price">$${menuItem.price}</p>
    </div>
    <button class="add-btn" id="${menuItem.id}">+</button>
    `;
    menuEl.append(foodSection);
});

// Create and hide Your Order and Total Price sections and Complete Order button
const yourOrderSection = document.createElement("section")
yourOrderSection.setAttribute("id", "your-order")
yourOrderSection.innerHTML = `
    <h2>Your Order</h2>
`;
menuEl.append(yourOrderSection);

const totalPrice = document.createElement("section");
totalPrice.setAttribute("id", "total-price");
totalPrice.innerHTML = `
    <span>Total Price: </span>
    <span id="tot-num"></span>
`;
menuEl.append(totalPrice)

const completeOrderBtn = document.createElement("button");
completeOrderBtn.setAttribute("id", "complete-order-btn");
completeOrderBtn.textContent = "Complete order";
menuEl.append(completeOrderBtn);

// Add items to Your Order section
const btnEl = document.querySelectorAll(".add-btn");
let total = 0; // Global value for keep track of price
function renderYourOrderSection() {
    btnEl.forEach( (btn) => {
        btn.addEventListener("click", function() {
            // Reveal Your Order and Total Price sections when any button clicked
            yourOrderSection.style.display = "block";
            totalPrice.style.display = "flex";
            completeOrderBtn.style.display = "block";

            // Add items to Your Order
            const addItem = document.createElement("div");
            addItem.className = "added-item";
            addItem.innerHTML = `
                <div class="added-item-info">
                    <span>${menuArray[btn.id].name}</span>
                    <button class="remove-btn">remove</button>
                </div>
                <span class="price">$${menuArray[btn.id].price}</span>
            `;
            yourOrderSection.append(addItem);

            updateTotalPrice(addItem);
            removeItems(addItem);
        })
    })
}
renderYourOrderSection();

// Update price of items
function updateTotalPrice(addItem) {
    total += parseInt(addItem.querySelector(".price").textContent.replace("$", ""));
    document.getElementById("tot-num").textContent = `$${total}`;
}

// Remove food items from Your Order section and update total price
function removeItems(addItem) {
    const rmvBtn = addItem.querySelector(".remove-btn");
    rmvBtn.addEventListener("click", function() {
        addItem.remove();
        let removePrice = parseInt(addItem.querySelector(".price").textContent.replace("$", ""));
        total -= removePrice;
        document.getElementById("tot-num").textContent = `$${total}`;
    })
}

// Unhide Payment Modal when Complete Order button is clicked.
function openPaymentModal() {
    completeOrderBtn.addEventListener("click", function() {
        document.getElementById("payment-container").style.display = "block";
    })
};
openPaymentModal();

// Close Payment Modal and add confirmation 
const getPaymentBtnEl = document.getElementById("payment-btn");
function closePaymentModal() {
    getPaymentBtnEl.addEventListener("click", function(event) {
        // Check that input fields are not empty before closing
        const nameInput = document.getElementById("name").value;
        const cardNumInput = document.getElementById("card-number").value;
        const cardCVV = document.getElementById("card-cvv").value;

        if (!(nameInput && cardNumInput && cardCVV)) {
            getPaymentBtnEl.removeEventListener("click");
        }

        // Close Payment Modal and other sections
        event.preventDefault();
        document.getElementById("payment-container").style.display = "none";
        yourOrderSection.style.display = "none";
        totalPrice.style.display = "none";
        completeOrderBtn.style.display = "none";

        // Create confirmation message
        const confirmationMsg = document.createElement("div");
        confirmationMsg.className = "confirmation-msg";
        confirmationMsg.textContent = `Thanks, ${nameInput}! Your order is on the way!`
        menuEl.append(confirmationMsg);

        // reload page after 4 seconds
        setTimeout(function() {
            window.location.reload();
        }, 4000);
    })
}
closePaymentModal();
