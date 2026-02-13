document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const messageBox = document.getElementById("formMessage");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // UX: disable button & show loading state
        submitBtn.disabled = true;
        submitBtn.value = "Sending...";
        messageBox.textContent = "";
        messageBox.className = "form-message";

        const params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        };
        let messagelength = document.getElementById("message").value.length;
        if (messagelength > 20) {
            emailjs.send("service_70tinnc", "template_79l6t1b", params)
                .then(() => {
                    // ✅ Success UX
                    messageBox.textContent = "✅ Your message has been sent successfully!";
                    messageBox.classList.add("success");

                    form.reset();
                })
                .catch((error) => {
                    console.error(error);

                    // ❌ Error UX
                    messageBox.textContent = "❌ Failed to send message. Please try again.";
                    messageBox.classList.add("error");
                })
                .finally(() => {
                    // Restore button state
                    submitBtn.disabled = false;
                    submitBtn.value = "Send Message";
                });
        }
        else {
            messageBox.textContent = "❌ Failed to send message. Not enough message length.";
            messageBox.classList.add("error");
              form.reset();
        }
        });


});
