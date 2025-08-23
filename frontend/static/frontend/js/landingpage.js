window.addEventListener('DOMContentLoaded', (event) => {
    const box = document.getElementsByTagName("box")[0]
    const imageHolder = document.getElementsByClassName("responsive_image")[0]
    const iconHolder = document.getElementsByClassName("icon_holder")[0]
    
    setTimeout(() => {
        box.style.animation = 'start ease-in-out 1s 1'
        box.style.animationFillMode = 'forwards'
    },
        2600);

    setTimeout(() => {
        imageHolder.style.animation = 'center ease-in-out 1s 1'
        imageHolder.style.animationFillMode = 'forwards'
    }, 2750);

    setTimeout(() => {
        iconHolder.style.animation = 'end ease-in-out 1s 1'
        iconHolder.style.animationFillMode = 'forwards'
    }, 2950);

});


// Modal Functions
function openEmailModal() {
    document.getElementById('emailModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeEmailModal() {
    document.getElementById('emailModal').style.display = 'none';
    document.body.style.overflow = 'hidden'; // Restore original overflow (keep hidden for landing page)
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('emailModal');
    if (event.target === modal) {
        closeEmailModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeEmailModal();
    }
});
// Get modal elements
const modal = document.getElementById('emailModal');
const emailIcon = document.getElementById('emailIcon');

// Function to open email modal
function openEmailModal() {
    modal.style.display = 'block';
}

// Function to close email modal
function closeEmailModal() {
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const submitBtn = this.querySelector('.submit-btn');

    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Send the form data
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': formData.get('csrfmiddlewaretoken')
        }
    })
    .then(response => response.json())
    .then(data => {
        // Close the modal first
        closeEmailModal();

        // Show custom alert based on response
        if (data.success) {
            showCustomAlert('✅ Success!', 'Your message has been sent successfully. I\'ll get back to you soon!', 'success');
        } else {
            showCustomAlert('❌ Error', data.message || 'There was an error sending your message. Please try again.', 'error');
        }

        // Reset form
        this.reset();
    })
    .catch(error => {
        console.error('Error:', error);

        // Close the modal
        closeEmailModal();

        // Show error alert
        showCustomAlert('❌ Error', 'There was an error sending your message. Please try again.', 'error');
    })
    .finally(() => {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    });
});

// Custom alert function
function showCustomAlert(title, message, type = 'info') {
    // Remove existing alert if any
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }

    // Create alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert ${type}`;

    alertDiv.innerHTML = `
        <div class="alert-content">
            <div class="alert-header">
                <h3>${title}</h3>
                <button class="alert-close" onclick="closeCustomAlert()">&times;</button>
            </div>
            <div class="alert-body">
                <p>${message}</p>
            </div>
        </div>
    `;

    // Add to document
    document.body.appendChild(alertDiv);

    // Show alert with animation
    setTimeout(() => {
        alertDiv.classList.add('show');
    }, 10);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        closeCustomAlert();
    }, 5000);
}

// Function to close custom alert
function closeCustomAlert() {
    const alert = document.querySelector('.custom-alert');
    if (alert) {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.remove();
        }, 300);
    }
}
// Other landing page JavaScript
console.log('Landing page JavaScript loaded');
