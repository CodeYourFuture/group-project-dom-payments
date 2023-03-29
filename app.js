// Get DOM elements
const loadBtn = document.querySelector("#loadButton");
const accountNumber = document.querySelector("#accountNumber");
const balance = document.getElementById("balanceAmount");
const paymentsList = document.getElementById("paymentsList");
const totalIncome = document.querySelector("#totalIncome");
const highestPayment = document.querySelector("#mostValuablePayment");

// Assign global variables
const account = {
  number: 100402153,
  initialBalance: 100,
  paymentsUrl: "/data/payments.json",
  payments: [],
};

function render(account) {
  // Display the account number
  const balanceConversion = account.initialBalance.toFixed(2);
  accountNumber.innerText = account.number;
  balance.textContent = `£${balanceConversion}`;
  const payments = account.payments.reduce(
    (acc, { date, description, amount, completed }) => {
      let status = "";
      let statusColor = "";
      if (completed) {
        status = "Completed";
        statusColor = "";
      } else {
        status = "Pending";
        statusColor = "pending";
      }
      const payment = `
      <tr class="${statusColor}">
        <td>${date}</td>
        <td >${status}</td>
        <td>${description}</td>
        <td>${amount}</td>
        <td><button>Cancel</button></td>
      </tr>`;
      return acc + payment;
    },
    ""
  );

  let mostValuablePayment = 0;
  const totalAmount = account.payments.reduce((acc, { date, amount }) => {
    let month = date.slice(6, 7);
    if (month == 5) {
      if (mostValuablePayment < amount) {
        mostValuablePayment = amount;
      }
      return acc + amount;
    }
    return acc;
  }, 0);
  highestPayment.textContent = `£${mostValuablePayment}`;
  paymentsList.innerHTML = payments;
  totalIncome.textContent = `£${totalAmount}`;
  console.log(account.payments);
}

// List of event listeners
loadBtn.addEventListener("click", async function () {
  try {
    const response = await fetch(account.paymentsUrl);
    const payments = await response.json();
    account.payments = payments;
    render(account);
  } catch (error) {
    console.log(error);
  }
});

/**
 * Write a render function below that updates the DOM with the
 * account details.
 *
 * EVERY update to the DOM should be contained in this
 * function so that you can call it over and over again
 * whenever there is an update to the account details.
 *
 * We have completed one of the DOM updates already by
 * entering the account number on the page.
 *
 * @param {Object} account The account details
 */

/**
 * Write any additional functions that you need to complete
 * the group project in the space below.
 *
 * For example, you might want to have functions that
 * calculate balances, find completed or pending payments,
 * add up payments, and more.
 */
