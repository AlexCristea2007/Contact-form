const inputs = document.querySelectorAll("[class$='field'] input, #message");
const typeBtns = document.querySelectorAll(".type-btn");
const consentBtn = document.querySelector("#consent");
const submitBtn = document.querySelector(".submit-btn");

let condInputs = Array(4).fill(false);
let selectedTypeBtn = false;
let checkedConsent = false;

inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    let value = input.value;
    let regExp;

    switch (index) {
      case 0: {
        regExp = /^[A-Za-z\s\-]{2,50}$/;
        validateInput(value, regExp, index);
        break;
      }
      case 1: {
        regExp = /^[A-Za-z\s\-]{2,50}$/;
        validateInput(value, regExp, index);
        break;
      }
      case 2: {
        regExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        validateInput(value, regExp, index);
        break;
      }
      case 3: {
        regExp = /^(?!\s*$).+/;
        validateInput(value, regExp, index);
        break;
      }
    }

    const succesAlert = document.querySelector(".success-alert");
    succesAlert.style.display = "none";
  });
});

function validateInput(value, regExp, index) {
  condInputs[index] = regExp.test(value);
}

typeBtns.forEach((typeBtn) => {
  typeBtn.addEventListener("click", () => {
    typeBtns.forEach((btn) => btn.classList.remove("active"));
    typeBtn.classList.add("active");

    selectedTypeBtn = true;

    const succesAlert = document.querySelector(".success-alert");
    succesAlert.style.display = "none";
  });
});

consentBtn.addEventListener("click", () => {
  consentBtn.classList.toggle("checked");
  checkedConsent = consentBtn.classList.contains("checked");

  const succesAlert = document.querySelector(".success-alert");
  succesAlert.style.display = "none";
});

submitBtn.addEventListener("click", () => {
  if (
    condInputs.every((e) => e === true) &&
    selectedTypeBtn &&
    checkedConsent
  ) {
    processInput();
    processTypeBtns();
    processConsent();
    const succesAlert = document.querySelector(".success-alert");
    succesAlert.style.display = "flex";

    condInputs = Array(4).fill(false);
    selectedTypeBtn = false;
    inputs.forEach((input) => {
      input.value = "";
    });
    typeBtns.forEach((btn) => btn.classList.remove("active"));

    const duration = 500;
    const start = window.scrollY;
    const startTime = performance.now();

    function scrollStep(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newPosition = start * (1 - progress);

      window.scrollTo(0, newPosition);

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      }
    }

    requestAnimationFrame(scrollStep);
  } else {
    processInput();
    processTypeBtns();
    processConsent();
  }
});

function processInput() {
  condInputs.forEach((condInput, index) => {
    const inputElement = inputs[index];
    const errorMessage = inputElement
      .closest("[class$='field']")
      .querySelector(".error-message");

    if (condInput === false) {
      switch (index) {
        case 0:
        case 1:
          errorMessage.textContent =
            inputElement.value === ""
              ? "This field is required"
              : "Please enter a valid name";
          break;
        case 2:
          errorMessage.textContent =
            inputElement.value === ""
              ? "This field is required"
              : "Please enter a valid email";
          break;
        case 3:
          errorMessage.textContent = "This field is required";
          break;
      }
      inputElement.classList.add("error");
      errorMessage.style.display = "block";
    } else {
      inputElement.classList.remove("error");
      errorMessage.textContent = "";
      errorMessage.style.display = "none";
    }
  });
}
function processTypeBtns() {
  const typeWrapper = document
    .querySelector(".fields-wrapper .type-field")
    ?.closest(".fields-wrapper");
  const errorMessage = typeWrapper.querySelector(".error-message");
  if (!selectedTypeBtn) {
    errorMessage.textContent = "Please select a query type";
    errorMessage.style.display = "block";
  } else {
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
  }
}
function processConsent() {
  const field = document.querySelector(".consent-field");
  const errorMessage = field.querySelector(".error-message");
  if (!consentBtn.classList.contains("checked")) {
    errorMessage.textContent =
      "To submit this form, please consent to begin contacted";
    errorMessage.style.display = "block";
  } else {
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
  }
}
