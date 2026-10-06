const registrationForm = document.getElementById("registrationForm");
const studentName = document.getElementById("studentName");
const studentNumber = document.getElementById("studentNumber");
const email = document.getElementById("email");
const workshop = document.getElementById("workshop");
const studentTypeRegular = document.getElementById("studentTypeRegular");
const studentTypeScholar = document.getElementById("studentTypeScholar");
const terms = document.getElementById("terms");

const nameError = document.getElementById("nameError");
const studentNumberError = document.getElementById("studentNumberError");
const emailError = document.getElementById("emailError");
const workshopError = document.getElementById("workshopError");
const termsError = document.getElementById("termsError");

const registrationFee = document.getElementById("registrationFee");
const discount = document.getElementById("discount");
const finalFee = document.getElementById("finalFee");

const registerBtn = document.getElementById("registerBtn");
const clearBtn = document.getElementById("clearBtn");
const registrationResult = document.getElementById("registrationResult");

const summaryName = document.getElementById("summaryName");
const summaryStudentNumber = document.getElementById("summaryStudentNumber");
const summaryEmail = document.getElementById("summaryEmail");
const summaryWorkshop = document.getElementById("summaryWorkshop");
const summaryStudentType = document.getElementById("summaryStudentType");
const summaryFee = document.getElementById("summaryFee");
const summaryDiscount = document.getElementById("summaryDiscount");
const summaryFinalFee = document.getElementById("summaryFinalFee");

function validateStudentInfo(name, studentNumber, email) {
    const validName =
        typeof name === "string" &&
        name.trim().length >= 3 &&
        !/\d/.test(name.trim()) &&
        name.trim() !== "";

    const validStudentNumber =
        typeof studentNumber === "string" &&
        /^\d{2}-\d{4}-\d{3}$/.test(studentNumber.trim());

    const validEmail =
        typeof email === "string" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    return validName && validStudentNumber && validEmail;
}

function calculateFinalFee(workshop, studentType) {
    const fees = {
        "Web Development": 500,
        "UI/UX Design": 400,
        "Cybersecurity": 600
    };

    const baseFee = fees[workshop] || 0;

    if (studentType === "Scholar") {
        return baseFee * 0.8;
    }

    return baseFee;
}

function getSelectedStudentType() {
    if (studentTypeScholar.checked) {
        return "Scholar";
    }

    if (studentTypeRegular.checked) {
        return "Regular Student";
    }

    return "";
}

function getBaseFee(selectedWorkshop) {
    const fees = {
        "Web Development": 500,
        "UI/UX Design": 400,
        "Cybersecurity": 600
    };

    return fees[selectedWorkshop] || 0;
}

function updateFeeDisplay() {
    const selectedWorkshop = workshop.value;
    const selectedStudentType = getSelectedStudentType();
    const baseFee = getBaseFee(selectedWorkshop);

    let discountAmount = 0;
    let calculatedFinalFee = baseFee;

    if (selectedStudentType === "Scholar") {
        discountAmount = baseFee * 0.20;
        calculatedFinalFee = calculateFinalFee(
            selectedWorkshop,
            selectedStudentType
        );
    } else if (selectedStudentType === "Regular Student") {
        calculatedFinalFee = calculateFinalFee(
            selectedWorkshop,
            selectedStudentType
        );
    }

    if (!selectedWorkshop) {
        registrationFee.textContent = "₱0";
        discount.textContent = "₱0";
        finalFee.textContent = "₱0";
        return;
    }

    registrationFee.textContent = `₱${baseFee}`;
    discount.textContent = `₱${discountAmount}`;
    finalFee.textContent = `₱${calculatedFinalFee}`;
}

function clearErrors() {
    nameError.textContent = "";
    studentNumberError.textContent = "";
    emailError.textContent = "";
    workshopError.textContent = "";
    termsError.textContent = "";
}

function validateForm() {
    clearErrors();

    let isValid = true;

    const nameValue = studentName.value.trim();
    const studentNumberValue = studentNumber.value.trim();
    const emailValue = email.value.trim();

    const studentInfoValid = validateStudentInfo(
        nameValue,
        studentNumberValue,
        emailValue
    );

    const validName =
        nameValue.length >= 3 &&
        !/\d/.test(nameValue) &&
        nameValue !== "";

    const validStudentNumber =
        /^\d{2}-\d{4}-\d{3}$/.test(studentNumberValue);

    const validEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    if (!validName || !studentInfoValid) {
        nameError.textContent = "Enter a valid student name.";
        isValid = false;
    }

    if (!validStudentNumber || !studentInfoValid) {
        studentNumberError.textContent = "Enter a valid student number.";
        isValid = false;
    }

    if (!validEmail || !studentInfoValid) {
        emailError.textContent = "Enter a valid email address.";
        isValid = false;
    }

    if (!workshop.value) {
        workshopError.textContent = "Please select a workshop.";
        isValid = false;
    }

    if (!terms.checked) {
        termsError.textContent =
            "You must accept the Terms and Conditions.";
        isValid = false;
    }

    return isValid;
}

function showRegistrationSummary() {
    const selectedStudentType = getSelectedStudentType();
    const baseFee = getBaseFee(workshop.value);
    const finalAmount = calculateFinalFee(
        workshop.value,
        selectedStudentType
    );
    const discountAmount = baseFee - finalAmount;

    summaryName.textContent = studentName.value.trim();
    summaryStudentNumber.textContent = studentNumber.value.trim();
    summaryEmail.textContent = email.value.trim();
    summaryWorkshop.textContent = workshop.value;
    summaryStudentType.textContent = selectedStudentType;
    summaryFee.textContent = `₱${baseFee}`;
    summaryDiscount.textContent = `₱${discountAmount}`;
    summaryFinalFee.textContent = `₱${finalAmount}`;

    registrationResult.hidden = false;
}

function resetForm() {
    studentName.value = "";
    studentNumber.value = "";
    email.value = "";

    workshop.selectedIndex = 0;

    studentTypeRegular.checked = false;
    studentTypeScholar.checked = false;

    terms.checked = false;

    clearErrors();

    registrationFee.textContent = "₱0";
    discount.textContent = "₱0";
    finalFee.textContent = "₱0";

    registrationResult.hidden = true;

    summaryName.textContent = "";
    summaryStudentNumber.textContent = "";
    summaryEmail.textContent = "";
    summaryWorkshop.textContent = "";
    summaryStudentType.textContent = "";
    summaryFee.textContent = "";
    summaryDiscount.textContent = "";
    summaryFinalFee.textContent = "";
}

registrationResult.hidden = true;
registrationFee.textContent = "₱0";
discount.textContent = "₱0";
finalFee.textContent = "₱0";

workshop.addEventListener("change", updateFeeDisplay);

studentTypeRegular.addEventListener("change", updateFeeDisplay);
studentTypeScholar.addEventListener("change", updateFeeDisplay);

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    registrationResult.hidden = true;

    if (!validateForm()) {
        return;
    }

    updateFeeDisplay();
    showRegistrationSummary();
});

clearBtn.addEventListener("click", function (event) {
    event.preventDefault();
    resetForm();
});
```