// Supabase Configuration
const SUPABASE_URL = 'https://gbwgaumyyffzlhusadjk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdid2dhdW15eWZmemxodXNhZGprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NjQzMDcsImV4cCI6MjA1MjU0MDMwN30.hLB3t_EB-pD7Vt1jJwJNvxjrfOjqnXxP9cwFrxUXUAo';

// Initialize Supabase client (using REST API)
async function submitToSupabase(formData) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return { success: true };
    } catch (error) {
        console.error('Supabase submission error:', error);
        return { success: false, error: error.message };
    }
}

// Handle Booking Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim() || null;
            const location = document.getElementById('location').value.trim();
            const deviceType = document.getElementById('bookingDevice').value;
            const issue = document.getElementById('issue').value.trim();
            const datetime = document.getElementById('datetime').value || null;

            // Disable submit button
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = '📤 Submitting...';

            // Prepare data for Supabase
            const formData = {
                name: name,
                phone: phone,
                email: email,
                location: location,
                device_type: deviceType,
                issue_description: issue,
                preferred_datetime: datetime,
                status: 'new'
            };

            // Submit to Supabase
            const result = await submitToSupabase(formData);

            // Send email notification via Supabase Edge Function
            try {
                await fetch(`${SUPABASE_URL}/functions/v1/send-contact-email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email || 'Not provided',
                        phone: phone,
                        message: `Location: ${location}\nDevice: ${deviceType}\nIssue: ${issue}\nPreferred Time: ${datetime || 'Not specified'}`
                    })
                });
            } catch (emailError) {
                console.error('Email notification failed:', emailError);
            }

            if (result.success) {
                // Success message
                alert(`✅ BOOKING REQUEST RECEIVED!\n\nThank you ${name}!\n\n✅ FREE diagnostics included\n✅ Lifetime warranty guaranteed\n✅ 30-minute response time\n\nWe'll call you at ${phone} within 15 minutes to confirm your appointment in ${location}.\n\n📞 For immediate service, call 343-703-6000`);
                
                // Reset form
                this.reset();
                
                // Track Facebook Pixel event (if available)
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'Lead', {
                        content_name: 'Booking Form',
                        content_category: 'Contact',
                        value: 0.00,
                        currency: 'CAD'
                    });
                }

                // Track Google Analytics event (if available)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'generate_lead', {
                        'event_category': 'Form',
                        'event_label': 'Booking Form Submission',
                        'value': 1
                    });
                }
            } else {
                // Error message with fallback
                alert(`❌ OOPS! There was a technical issue submitting your booking.\n\n📞 Please call us directly at 343-703-6000\n\nWe're available 24/7 and will be happy to assist you!`);
                
                console.error('Submission failed:', result.error);
            }

            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
    }
});

// Optional: Test function to verify Supabase connection
async function testSupabaseConnection() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_submissions?limit=1`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
            }
        });

        if (response.ok) {
            console.log('✅ Supabase connection successful!');
            return true;
        } else {
            console.error('❌ Supabase connection failed:', response.status);
            return false;
        }
    } catch (error) {
        console.error('❌ Supabase connection error:', error);
        return false;
    }
}

// Run connection test on page load (optional - comment out in production)
// testSupabaseConnection();
