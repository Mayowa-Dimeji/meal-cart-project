document.addEventListener("DOMContentLoaded", () => {
  const mealCheckboxes = document.getElementsByClassName("meal-option");
  const totalElement = document.getElementById("total-amount");
  const tipAmountElement = document.getElementById("tip-amount");
  const tipOptions = document.getElementsByClassName("tip-option");
  const customTipInput = document.getElementById("custom-tip");
  const subtotalElement = document.getElementById("subtotal-amount");

  totalElement.textContent = "£0.00";
  tipAmountElement.textContent = "0%";

  //   add event listener to checboxes
  let subtotalAmount = 0;
  let selectedTipPercentage = null;

  for (let checkbox of mealCheckboxes) {
    checkbox.addEventListener("change", () => {
      //   subtotalElement = document.getElementById("total-amount");
      if (checkbox.checked) {
        console.log(`Checkbox ${checkbox.dataset.price} is checked`);
        subtotalAmount += parseFloat(checkbox.dataset.price);
        subtotalElement.textContent = `£${subtotalAmount.toFixed(2)}`;
        updateTotal(subtotalAmount, selectedTipPercentage, totalElement);
      } else {
        console.log(`Checkbox ${checkbox.dataset.price} is unchecked`);
        subtotalAmount -= parseFloat(checkbox.dataset.price);
        subtotalElement.textContent = `£${subtotalAmount.toFixed(2)}`;
        updateTotal(subtotalAmount, selectedTipPercentage, totalElement);
      }
    });
  }

  //   get tip input, add event listener for tip options

  //   listen for tip option clicks
  for (let option of tipOptions) {
    option.addEventListener("click", () => {
      for (let opt of tipOptions) {
        opt.classList.remove("selected");
      }
      option.classList.add("selected");
      selectedTipPercentage = parseFloat(option.dataset.tip);
      tipAmountElement.textContent = `${selectedTipPercentage}%`;
      updateTotal(subtotalAmount, selectedTipPercentage, totalElement);
    });
  }

  //   listen for custom input deselect tip options and update tip percentage
  customTipInput.addEventListener("input", () => {
    // Deselect all tip options

    for (let opt of tipOptions) {
      opt.classList.remove("selected");
    }
    const customTip = parseFloat(customTipInput.value);
    if (!isNaN(customTip)) {
      selectedTipPercentage = customTip;
      tipAmountElement.textContent = `${customTip}%`;
      updateTotal(subtotalAmount, selectedTipPercentage, totalElement);
    } else {
      tipAmountElement.textContent = "0%";
      selectedTipPercentage = 0;
      updateTotal(subtotalAmount, selectedTipPercentage, totalElement);
    }
  });
});

function updateTotal(subtotal, selectedTipPercentage, totalElement) {
  let tipAmount = 0;
  let total = 0;
  if (subtotal > 0 && selectedTipPercentage !== null) {
    tipAmount = (subtotal * selectedTipPercentage) / 100;
    total = subtotal + tipAmount;
    // return subtotal + tipAmount;
    totalElement.textContent = `£${total.toFixed(2)}`;
  } else if (selectedTipPercentage == null && subtotal >= 0) {
    total = subtotal;
    totalElement.textContent = `£${total.toFixed(2)}`;
  } else {
    totalElement.textContent = "£0.00";
  }
}
