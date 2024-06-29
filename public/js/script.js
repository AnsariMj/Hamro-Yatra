// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

function validateForm() {
    const emailField = document.getElementById('email');
    const email = emailField.value;
    const emailRegex = /^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        emailField.setCustomValidity("Email should not contain numbers and must be a valid format");
        emailField.reportValidity();
        return false;
    } else {
        emailField.setCustomValidity("");
        return true;
    }
}

// to toggle Bookings
document.getElementById('toggleBookingsBtn').addEventListener('click', function () {
    var bookingsSection = document.getElementById('confirmedBookingsSection');
    var toggleArrow = document.getElementById('toggleArrow');
    if (bookingsSection.style.display === 'none') {
        bookingsSection.style.display = 'block';
        this.textContent = 'Hide My Confirmed Bookings ';
        toggleArrow.className = 'fas fa-arrow-up';
        this.appendChild(toggleArrow);
    } else {
        bookingsSection.style.display = 'none';
        this.textContent = 'Show My Confirmed Bookings ';
        toggleArrow.className = 'fas fa-arrow-down';
        this.appendChild(toggleArrow);
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const deleteForms = document.querySelectorAll('form[id^="deleteForm"]');

    deleteForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const confirmDelete = confirm('Are you sure you want to delete this item? This action cannot be undone.');
            if (!confirmDelete) {
                e.preventDefault();
            }
        });
    });
});





document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.btn-book-now').forEach(button => {
        button.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent the click event from bubbling up to the card
            const card = button.closest('.card');
            const link = card.querySelector('a.list').href;
            window.location.href = link; // Redirect to the listing URL
        });
    });
});
