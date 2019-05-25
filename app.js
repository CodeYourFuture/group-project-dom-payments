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
 * 5. Show the amount of the most valuable payment that was   youssef
 *    received this month (May 2019).
 * 6. For each PENDING payment, add a button that says "cancel"  youssef
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
document.querySelector("#loadButton").addEventListener("click", () => {
  fetch(account.paymentsUrl)
    .then(response => response.json())
    .then(payments => {
      var currentBalance = calculateBalance(payments, account.initialBalance);
      var totalBalance = calculateTotalBalance(
        payments,
        account.initialBalance
      );
      render(account, currentBalance, totalBalance);
    });
});
function render(account, currentBalance, totalBalance) {
  document.querySelector("#accountNumber").innerHTML = account.number;
  document.getElementById("balanceAmount").innerText = currentBalance;
  document.getElementById("pendingBalance").innerText = totalBalance;
}
function calculateBalance(listPayments, balance) {
  return listPayments
    .filter(payment => payment.completed)
    .map(payment => payment.amount)
    .reduce((total, amount) => total + amount, balance);
}

function calculateTotalBalance(listPayments, balance) {
  return listPayments
    .map(payment => payment.amount)
    .reduce((total, amount) => total + amount, balance);
}

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
YoussefCompleteProjectSoln
function render(account) {
  // Display the account number
  document.querySelector("#accountNumber").innerText = account.number;
  // Display the current palance
  document.querySelector(
    "#balanceAmount"
  ).innerText = calculateInitialBalancePlusSumOfPayments(account.payments);
  // Display the list of payments
  document.querySelector("#paymentsList").innerText = "";
  makeNewDataRow(account.payments);
  //Dispay balance after pending payments are completed.
  document.querySelector(
    "#pendingBalance"
  ).innerText = balanceAfterAddingPendingPayments(account.payments);

  // Display total income in may
  document.querySelector(
    "#totalIncome"
  ).innerText = totalIncomeAtTheSelectedMonth(account.payments);
  // Display most valiable ammount in the selected month
  document.querySelector(
    "#mostValuablePayment"
  ).innerText = displayMostValuableAmount(account.payments);

  cancelButton.addEventListener("click", deleteRowWhichContainCancel);
}


/**
 * Write any additional functions that you need to complete
 * the group project in the space below.
 *
 * For example, you might want to have functions that
 * calculate balances, find completed or pending payments,
 * add up payments, and more.
 */

// 1. Show the current balance based on the initial balance and
// any completed payments. Each completed payment will add to
//     the balance.

function calculateInitialBalancePlusSumOfPayments(payments) {
  // calculate the initiabalance + completed payments
  return payments
    .filter(function(entry) {
      return entry.completed === true;
    })
    .map(process => process.amount)
    .reduce((acc, val) => acc + val, account.initialBalance)
    .toFixed(2);
}

// 2. Add the payments to the table. Each payment should show
//    the date of the payment, its status (whether is pending or
//    complete), the description, the amount, and the balance
//    after that payment was completed.
//
//    Pending payments should appear with a pink background.
//    This can be applied by adding the `pending` class to the
//    table row (`<tr>`) for each pending payment.
var cancelButton = document.createElement("button");
cancelButton.innerHTML = "Cancel";

function makeNewDataRow(paymentData) {
  paymentData.forEach(entry => {
    // creation of the new table row
    var tableBody = document.querySelector("#paymentsList");
    var newRow = document.createElement("tr");
    //cell 1
    var newData = document.createElement("td");
    // cell 2
    var newData2 = document.createElement("td");
    // cell 3
    var newData3 = document.createElement("td");
    // cell 4
    var newData4 = document.createElement("td");
    // cell 5
    var newData5 = document.createElement("td");

    tableBody.appendChild(newRow);
    newRow.appendChild(newData);
    newRow.appendChild(newData2);
    newRow.appendChild(newData3);
    newRow.appendChild(newData4);
    newRow.appendChild(newData5);
    //  display the date
    newData.innerText = entry.date;
    // display the description
    newData3.innerText = entry.description;
    // display the amount
    newData4.innerText = entry.amount;
    // check for the true and false completed
    if (entry.completed === true) {
      return (newData2.innerText = "Completed");
    }
    if (entry.completed === false) {
      return (
        (newData2.innerText = "Pending"),
        (newRow.style.backgroundColor = "pink"),
        newData5.appendChild(cancelButton),
        (newRow.className = "deleteRow")
      );
    }
  });
}
//3. Show what the balance will be after pending payments are completed.

function balanceAfterAddingPendingPayments(payments) {
  // calculate the   completed payments + pending payments
  return payments
    .map(process => process.amount)
    .reduce((acc, val) => acc + val)
    .toFixed(2);
}

// 4- Show the total income of all payments that were received
//    this month (May, 2019), including pending payments.
var monthToFilter = "2019-05";
var totalPaymentsinLastMonth;
function totalIncomeAtTheSelectedMonth(paymentData) {
  // calculate the   completed payments + pending payments in selected month
  return paymentData
    .filter(payment => payment.date.includes(monthToFilter))
    .map(process => process.amount)
    .reduce((acc, val) => acc + val)
    .toFixed(2);
}

// 5. Show the amount of the most valuable payment that was
//   received this month (May 2019).
function displayMostValuableAmount(paymentData) {
  // calculate the   completed payments + pending payments
  return paymentData
    .filter(
      payment =>
        payment.date.includes(monthToFilter) && payment.completed === true
    )
    .map(process => process.amount)
    .sort((a, b) => a - b)
    .pop();
}

// 6. For each PENDING payment, add a button that says "cancel"
//    to the end of that payment's row. When the button is
//    clicked, the payment should be removed from the account
//    and the render function should be called again to update the page.

cancelButton.addEventListener("click", deleteRowWhichContainCancel);
function deleteRowWhichContainCancel() {
  // querySelector for deleteRow
  var deleteRow = document.querySelector(".deleteRow");
  return (
    deleteRow.remove(),
    (document.querySelector(
      // update then palance after removing the pending amount
      "#pendingBalance"
    ).innerText =
      calculateInitialBalancePlusSumOfPayments(account.payments) -
      account.initialBalance)
  );
}
