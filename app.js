document.getElementById('loan-form').addEventListener('submit', (e) => {
  // Hide results
  document.getElementById('results').style.display = 'none';
  // Show loading
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 500);

  e.preventDefault();
});

function calculateResults() {
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // Show results
    document.getElementById('results').style.display = 'block';
    // Hide loading
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Check your numbers.');
  }
}

function showError(error) {
  // Hide results
  document.getElementById('results').style.display = 'none';
  // Show loading
  document.getElementById('loading').style.display = 'none';

  if (!document.querySelector('.alert')) {
    const errorMessage = document.createElement('div');

    // Get eleemnts
    const card = document.querySelector('.card');
    const heading = document.querySelector('h1');

    errorMessage.className = 'alert alert-danger';
    errorMessage.appendChild(document.createTextNode(error));

    // Insert between elements
    card.insertBefore(errorMessage, heading);

    // Clear alert
    setTimeout(() => {
      document.querySelector('.alert').remove();
    }, 3000);
    console.log(errorMessage);
  } else {
    return null;
  }
}
