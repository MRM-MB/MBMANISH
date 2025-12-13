        // JavaScript to update the year dynamically
        document.getElementById('year').textContent = new Date().getFullYear();

        // Function to calculate age
        function calculateAge(birthDate) {
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();

            // Adjust age if the birthday hasn't occurred yet this year
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            return age;
        }

        // Birthdate
        const birthDate = new Date(2005, 3, 27); // Months are 0-indexed in JavaScript (April is 3)
        const age = calculateAge(birthDate);

        // Update the HTML with the calculated age
        const ageElement = document.getElementById('age');
        if (ageElement) {
            ageElement.textContent = age;
        }

        // Resume Modal Logic
        document.addEventListener('DOMContentLoaded', function() {
            const resumeBtn = document.getElementById('resume-download-btn');
            const modal = document.getElementById('resume-modal');
            const cancelBtn = document.getElementById('cancel-download');
            const confirmBtn = document.getElementById('confirm-download');

            if (resumeBtn && modal) {
                resumeBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    modal.classList.add('active');
                });

                cancelBtn.addEventListener('click', function() {
                    modal.classList.remove('active');
                });

                confirmBtn.addEventListener('click', function() {
                    modal.classList.remove('active');
                    // The download will proceed as it's an anchor tag
                });

                // Close modal when clicking outside
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        modal.classList.remove('active');
                    }
                });
            }
        });