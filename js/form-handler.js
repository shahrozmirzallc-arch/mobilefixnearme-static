// Mobile Fix Near Me - Form Handler with Supabase Integration
// Connects booking form to Supabase database

// Supabase Configuration
const SUPABASE_URL = 'https://gbwgaumyyffzlhusadjk.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_ej1CDlPSDPfFO11aEJMtNQ_-a1LJK4y';

// Initialize Supabase client (using REST API)
class SupabaseClient {
    constructor(url, key) {
        this.url = url;
        this.key = key;
    }

    async insert(table, data) {
        try {
            const response = await fetch(`${this.url}/rest/v1/${table}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': this.key,
                    'Authorization': `Bearer ${this.key}`,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(`Supabase error: ${response.status} - ${error}`);
            }

            return { success: true };
        } catch (error) {
            console.error('Supabase insert error:', error);
            throw error;
        }
    }
}

const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Show success message with green tick animation
function showSuccessMessage() {
    const form = document.getElementById('bookingForm');
    const formContainer = form.parentElement;
    
    // Create success message HTML
    const successHTML = `
        <div id="successMessage" style="text-align: center; padding: 60px 30px; animation: fadeIn 0.5s ease-in;">
            <div style="width: 120px; height: 120px; background: #00E676; border-radius: 50%; 
                        display: flex; align-items: center; justify-content: center; 
                        margin: 0 auto 30px; box-shadow: 0 8px 30px rgba(0, 230, 118, 0.4);
                        animation: scaleIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);">
                <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="animation: drawCheck 0.8s ease-in-out 0.3s both;">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <h2 style="font-size: 2.5em; color: #00E676; margin-bottom: 20px; font-weight: 900;">✅ Sent!</h2>
            <p style="font-size: 1.3em; margin-bottom: 15px; font-weight: 600;">We will get back to you in 24 hours!</p>
            <p style="font-size: 1.1em; margin-bottom: 30px; opacity: 0.9;">Our team has received your request and will contact you shortly.</p>
            <div style="background: rgba(255,255,255,0.2); padding: 25px; border-radius: 10px; margin-top: 30px;">
                <p style="font-size: 1.2em; font-weight: 700; margin-bottom: 10px;">🚨 Have an Emergency?</p>
                <p style="font-size: 1em; margin-bottom: 15px;">Need immediate assistance? Call us now:</p>
                <a href="tel:4384623477" style="display: inline-block; background: #FFD700; color: #000; 
                   padding: 15px 40px; border-radius: 8px; text-decoration: none; font-size: 1.5em; 
                   font-weight: 900; box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4); 
                   transition: all 0.3s; margin-top: 10px;">
                    📞 438-462-3477
                </a>
                <p style="font-size: 0.95em; margin-top: 15px; opacity: 0.9;">Available 24/7 • 30-minute response time</p>
            </div>
            <button onclick="resetForm()" style="margin-top: 30px; background: white; color: #0066FF; 
                    padding: 12px 30px; border: none; border-radius: 8px; font-size: 1.1em; 
                    font-weight: 700; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                ← Back to Form
            </button>
        </div>

        <style>
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes scaleIn {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); opacity: 1; }
            }

            @keyframes drawCheck {
                0% { stroke-dasharray: 0, 100; }
                100% { stroke-dasharray: 100, 100; }
            }
        </style>
    `;

    // Hide form and show success message
    form.style.display = 'none';
    formContainer.insertAdjacentHTML('beforeend', successHTML);

    // Scroll to success message
    document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Track conversion (Facebook Pixel & Google Analytics)
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead');
    }
    if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_lead', {
            'event_category': 'Form',
            'event_label': 'Booking Form Submission'
        });
    }
}

// Reset form to show it again
function resetForm() {
    const form = document.getElementById('bookingForm');
    const successMessage = document.getElementById('successMessage');
    
    if (successMessage) {
        successMessage.remove();
    }
    
    form.style.display = 'block';
    form.reset();
    
    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Handle form submission
async function handleBookingSubmit(event) {
    event.preventDefault();

    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;

    try {
        // Disable button and show loading
        submitButton.disabled = true;
        submitButton.innerHTML = '⏳ Sending...';
        submitButton.style.opacity = '0.6';

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim() || null,
            location: document.getElementById('location').value.trim(),
            device_type: document.getElementById('bookingDevice').value,
            issue_description: document.getElementById('issue').value.trim(),
            preferred_datetime: document.getElementById('datetime').value || null,
            status: 'new'
        };

        // Validate required fields
        if (!formData.name || !formData.phone || !formData.location || !formData.device_type || !formData.issue_description) {
            throw new Error('Please fill in all required fields');
        }

        // Submit to Supabase
        await supabase.insert('contact_submissions', formData);

        // Show success message
        showSuccessMessage();

        // Optional: Send notification email or SMS (can be added later)
        console.log('Form submitted successfully:', formData);

    } catch (error) {
        console.error('Form submission error:', error);
        
        // Show error message
        alert(`⚠️ Oops! Something went wrong.\n\nPlease call us directly at 438-462-3477 for immediate assistance.\n\nError: ${error.message}`);

        // Re-enable button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        submitButton.style.opacity = '1';
    }
}

// Initialize form handler when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
        console.log('✅ Booking form initialized with Supabase integration');
    } else {
        console.error('❌ Booking form not found!');
    }
});
