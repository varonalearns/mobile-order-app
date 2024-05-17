import { menuArray } from "./data.js"

const menuEl = document.getElementById("menu")

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
    <button>+</button>
    `;
    menuEl.append(foodSection);
});