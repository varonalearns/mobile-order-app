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
function renderYourOrderSection() {
    let total = 0;
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
                <span>$${menuArray[btn.id].price}</span>
            `;
            yourOrderSection.append(addItem);

            // Update total price
            total += menuArray[btn.id].price;
            document.getElementById("tot-num").textContent = `$${total}`;
        })
    })
}
renderYourOrderSection();

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
        // Close Payment Modal and other sections
        event.preventDefault();
        document.getElementById("payment-container").style.display = "none";
        yourOrderSection.style.display = "none";
        totalPrice.style.display = "none";
        completeOrderBtn.style.display = "none";

        // Create confirmation message
        const customerName = document.getElementById("name").value;
        const confirmationMsg = document.createElement("div");
        confirmationMsg.className = "confirmation-msg";
        confirmationMsg.textContent = `Thanks, ${customerName}! Your order is on the way!`
        menuEl.append(confirmationMsg);

        // reload page after 5 seconds
        setTimeout(function() {
            window.location.reload();
        }, 5000);
    })
}
closePaymentModal();
