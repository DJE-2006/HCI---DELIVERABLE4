// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeToggleBtn.innerHTML = '☀️';
    }
    
    // Theme toggle event listener
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
    
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    
    // Function to show a specific page
    function showPage(pageId) {
        // Hide all sections
        pageSections.forEach(section => {
            section.classList.remove('active-section');
        });
        
        // Show the selected section
        document.getElementById(pageId + '-section').classList.add('active-section');
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
    }
    
    // Add click event to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Get started button
    const getStartedBtn = document.getElementById('get-started-btn');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('converter');
        });
    }
    
    // Currency Converter Functionality
    const convertBtn = document.getElementById('convert-btn');
    if (convertBtn) {
        convertBtn.addEventListener('click', convertCurrency);
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});

// Currency Conversion Function
function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const resultElement = document.getElementById('result');
    
    // Validate input
    if (!amount || isNaN(amount) || amount <= 0) {
        resultElement.textContent = 'Please enter a valid amount';
        return;
    }
    
    // In a real application, you would fetch real exchange rates from an API
    // For this demo, we'll use hardcoded exchange rates
    const exchangeRates = {
        USD: 1.00,
        EUR: 0.85,
        GBP: 0.73,
        JPY: 110.42,
        CAD: 1.25,
        AUD: 1.35,
        CHF: 0.92,
        CNY: 6.47,
        INR: 74.38,
        BRL: 5.25
    };
    
    // Calculate conversion
    const convertedAmount = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
    
    // Format the result
    const formattedResult = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: toCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(convertedAmount);
    
    // Display the result
    resultElement.textContent = `${amount} ${fromCurrency} = ${formattedResult}`;
}

// Contact Form Handler
function handleContactFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For this demo, we'll just show a success message
    alert(`Thank you, ${name}! Your message has been sent successfully.`);
    
    // Reset form
    event.target.reset();
}