let order = [
  { itemName: "Hot cakes", quantity: 1, unitPricePence: 232 },
  { itemName: "Apple Pie", quantity: 2, unitPricePence: 139 },
  { itemName: "Egg McMuffin", quantity: 1, unitPricePence: 280 },
  { itemName: "Sausage McMuffin", quantity: 1, unitPricePence: 300 },
  { itemName: "Hot Coffee", quantity: 2, unitPricePence: 100 },
  { itemName: "Hash Brown", quantity: 4, unitPricePence: 40 },
];

// calculating total price
// converting to pounds

function printReceipt (orderData) {
  console.log("QTY".padEnd(6) + "ITEM".padEnd(20) + "TOTAL".padStart(6));
  for (let {itemName, quantity, unitPricePence} of orderData) {
    const totalPriceInPounds = (quantity * unitPricePence) / 100;
    console.log(
      String(quantity).padEnd(6) +
      itemName.padEnd(20) +
      totalPriceInPounds.toFixed(2).padStart(6)
    );
  }
}

printReceipt(order);