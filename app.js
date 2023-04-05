// Get DOM elements
const loadBtn = document.querySelector("#loadButton");
const accountNumber = document.querySelector("#accountNumber");
const balance = document.getElementById("balanceAmount");
const paymentsList = document.getElementById("paymentsList");
const totalIncome = document.querySelector("#totalIncome");
const highestPayment = document.querySelector("#mostValuablePayment");
const pendingBalance = document.getElementById("pendingBalance");

// Assign global variables
const account = {
  number: 100402153,
  initialBalance: 100,
  paymentsUrl: "/data/payments.json",
  payments: [],
};

// Render function to update UI
function render(account) {
  // Display the account number
  accountNumber.textContent = account.number;

  // Create a table row for each payment
  const payments = account.payments.reduce(
    (acc, { date, description, amount, completed }, index) => {
      let status = "";
      let statusColor = "";
      let btn = "";

      // Set status and color based on whether the payment is completed or not
      if (completed) {
        status = "Completed";
      } else {
        status = "Pending";
        statusColor = "pending";
        btn = "<button>Cancel</button>";
      }

      // Create a row for the payment
      const payment = `
      <tr class="${statusColor}" id="${index}">
        <td>${date}</td>
        <td >${status}</td>
        <td>${description}</td>
        <td>${amount}</td>
        <td>${btn}</td>
      </tr>`;

      // Add the row to the accumulator
      return acc + payment;
    },
    ""
  );
  calculateIncomeBeforePending();
  calculateTotalAmount();
  calculateCurrentMonthIncome();
  findMostValuablePayment();

  // Update the UI with the calculated values
  paymentsList.innerHTML = payments;
}

const calculateIncomeBeforePending = () => {
  const incomeBeforePending = account.payments.reduce(
    (acc, { amount, completed }) => (completed ? acc + amount : acc),
    0
  );
  balance.textContent = `£${incomeBeforePending + account.initialBalance}`;
};

const calculateTotalAmount = () => {
  const totalAmount = account.payments.reduce(
    (acc, { amount }) => acc + amount,
    0
  );
  pendingBalance.textContent = `£${totalAmount + account.initialBalance}`;
};

const calculateCurrentMonthIncome = () => {
  const currentMonthIncome = account.payments.reduce(
    (acc, { date, amount }) => {
      let month = Number(date.slice(6, 7));
      return month === 5 ? acc + amount : acc + 0;
    },
    0
  );
  totalIncome.textContent = `£${currentMonthIncome.toFixed(2)}`;
};

const findMostValuablePayment = () => {
  const mostValuablePayment = account.payments.reduce(
    (acc, { date, amount }) => {
      let month = Number(date.slice(6, 7));
      return month === 5 && amount > acc ? amount : acc;
    },
    0
  );
  highestPayment.textContent = `£${mostValuablePayment}`;
};

// Function to remove a payment from the array and update the UI
const removePayment = (paymentId) => {
  account.payments.forEach((_, index) => {
    if (index == paymentId) {
      delete account.payments[index];
    }
  });
  render(account);
};

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

paymentsList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    event.target.parentNode.parentNode.remove();
    removePayment(event.target.parentNode.parentNode.id);
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
