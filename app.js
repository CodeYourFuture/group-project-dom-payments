/**
 * The code to fetch the payments data has already been written
 * for you below. To complete this group project, your group
 * will need to write code to make this app do the following:
 *
 * 1. Show the current balance based on the initial balance and
 *    any completed payments. Each completed payment will add to
 *    the balance.
 * 2. Add the payments to the table. Each payment should show
 *    the date of the payment, its status (whether is pending or
 *    complete), the description, the amount, and the balance
 *    after that payment was completed.
 *
 *    Pending payments should appear with a pink background.
 *    This can be applied by adding the `pending` class to the
 *    table row (`<tr>`) for each pending payment.
 * 3. Show what the balance will be after pending payments are
 *    completed.
 * 4. Show the total income of all payments that were received
 *    this month (May, 2019), including pending payments.
 * 5. Show the amount of the most valuable payment that was
 *    received this month (May 2019).
 * 6. For each PENDING payment, add a button that says "cancel"
 *    to the end of that payment's row. When the button is
 *    clicked, the payment should be removed from the account
 *    and the render function should be called again to update
 *    the page.
 */

/**
 * This is the account details that you will use with this
 * exercise.
 *
 * Do not edit this code.
 */
var account = {
  number: 100402153,
  initialBalance: 100,
  paymentsUrl: "/data/payments.json",
  payments: []
};

/**
 * The code below has been written for you. When the "Load"
 * button is clicked, it will get the payments details, assign
 * them to the account variable, and call the render function
 * to update details in the DOM.
 *
 * You may edit this code.
 */
document.querySelector("#loadButton").addEventListener("click", function() {
  fetch(account.paymentsUrl)
    .then(response => response.json())
    .then(payments => {
      account.payments = payments;
      render(account);
    });
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
function render(account) {
  // Display the account number
  document.querySelector("#accountNumber").innerText = account.number;

  document.querySelector("#balanceAmount").innerText = calculateBalance(
    account,
    getCompletedPayments(account.payments) // Filter completed payments only
  );

  const list = document.querySelector("#paymentsList");
  list.replaceChildren(); // Empty - if rendering again, prevents appending another copy of data
  renderPaymentsTable(account.payments).forEach(el => {
    list.append(el);
  });

  document.querySelector("#pendingBalance").innerText = calculateBalance(
    account,
    account.payments // All payments
  );

  document.querySelector("#totalIncome").innerText = `£${sumPayments(
    getPaymentsInMonth(2019, 5, account.payments) // Payments in May 2019
  ).toFixed(2)}`;

  document.querySelector(
    "#mostValuablePayment"
  ).innerText = `£${findMostValuablePayment(
    getPaymentsInMonth(2019, 5, account.payments) // Payments in May 2019
  )}`;
}

/**
 * Write any additional functions that you need to complete
 * the group project in the space below.
 *
 * For example, you might want to have functions that
 * calculate balances, find completed or pending payments,
 * add up payments, and more.
 */

function getCompletedPayments(payments) {
  return payments.filter(payment => {
    return payment.completed === true;
  });
}

function getPaymentsInMonth(year, month, payments) {
  return payments.filter(payment => {
    const date = new Date(payment.date);

    return year === date.getUTCFullYear() && month === date.getMonth() + 1;
  });
}

function sumPayments(payments) {
  return payments.reduce((acc, payment) => {
    return acc + payment.amount;
  }, 0);
}

function findMostValuablePayment(payments) {
  let max = 0;
  payments.forEach(payment => {
    if (payment.amount > max) {
      max = payment.amount;
    }
  });
  return max;
}

function calculateBalance(account, payments) {
  return `£${account.initialBalance + sumPayments(payments)}`;
}

function renderPaymentsTable(payments) {
  return payments.map(payment => {
    const dateEl = document.createElement("td");
    dateEl.innerText = payment.date;

    const statusEl = document.createElement("td");
    statusEl.innerText = payment.completed ? "Completed" : "Pending";

    const descriptionEl = document.createElement("td");
    descriptionEl.innerText = payment.description;

    const amountEl = document.createElement("td");
    amountEl.innerText = payment.amount;

    const rowEl = document.createElement("tr");

    rowEl.append(dateEl, statusEl, descriptionEl, amountEl);

    if (!payment.completed) {
      rowEl.classList.add("pending");

      const buttonEl = document.createElement("button");
      buttonEl.innerText = "Cancel";
      buttonEl.onclick = () => cancelPendingPayment(payment);
      const cancelEl = document.createElement("td");
      cancelEl.append(buttonEl);

      rowEl.append(cancelEl);
    }

    return rowEl;
  });
}

function cancelPendingPayment(cancelledPayment) {
  const filteredPayments = account.payments.filter(payment => {
    return !(
      payment.date === cancelledPayment.date &&
      payment.description === cancelledPayment.description &&
      payment.amount === cancelledPayment.amount
    );
  });

  account.payments = filteredPayments;

  render(account);
}
