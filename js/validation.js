// registration page 
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('regForm');
    const validationDivs = form.querySelectorAll('.validtaion');

    // Real-time mobile input restriction (numbers only, max 10)
    const mobileInput = document.getElementById('mobile');
    mobileInput.addEventListener('input', function (e) {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    });

    // Form submit validation
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Languages: at least one checkbox selected
        const hasLang = [...form.querySelectorAll('input[name="languages[]"]')].some(cb => cb.checked);
        if (!hasLang) {
            alert('Select at least one language.');
            e.preventDefault();
            return;
        }
    });
});