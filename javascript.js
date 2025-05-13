document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '☀️';
    }

    themeToggleBtn.addEventListener('click', function() {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggleBtn.innerHTML = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggleBtn.innerHTML = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });

    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');

    function showPage(pageId) {
        pageSections.forEach(section => {
            section.classList.remove('active-section');
        });

        document.getElementById(pageId + '-section').classList.add('active-section');

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });

    const getStartedBtn = document.getElementById('get-started-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('converter');
        });
    }

    const convertBtn = document.getElementById('convert-btn');
    if (convertBtn) {
        convertBtn.addEventListener('click', convertCurrency);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const resultElement = document.getElementById('result');

    if (!amount || isNaN(amount) || amount <= 0) {
        resultElement.textContent = 'Please enter a valid amount';
        return;
    }

    // Make sure exchangeRates is defined and contains the needed currencies
    if (typeof exchangeRates === 'undefined' ||
        !exchangeRates[fromCurrency] ||
        !exchangeRates[toCurrency]) {
        resultElement.textContent = 'Exchange rates not available.';
        return;
    }

    const convertedAmount = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];

    const formattedResult = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: toCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(convertedAmount);

    resultElement.textContent = `${amount} ${fromCurrency} = ${formattedResult}`;
}

function handleContactFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    alert(`Thank you, ${name}! Your message has been sent successfully.`);

    event.target.reset();
}