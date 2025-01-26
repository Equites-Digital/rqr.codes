const formElements = {
    userModeField: document.querySelector("#user-mode-form-field"),
    urlField: document.querySelector("#url-form-field"),
    usernameField: document.querySelector("#user-name-form-field"),
    passwordField: document.querySelector("#password-form-field"),
    passwordConfirmationField: document.querySelector("#password-confirmation-form-field"),
    savePasswordField: document.querySelector("#save-password-form-field"),
    homeRealmField: document.querySelector("#home-realm-form-field")
}

const formElementsDefaultDisplay = {
    userMode: formElements.userModeField.style.display,
    url: formElements.urlField.style.display,
    username: formElements.usernameField.style.display,
    password: formElements.passwordField.style.display,
    passwordConfirmation: formElements.passwordConfirmationField.style.display,
    savePassword: formElements.savePasswordField.style.display,
    homeRealm: formElements.homeRealmField.style.display
}

const elements = {
    userModeInput: document.querySelector("#user-mode"),
    urlInput: document.querySelector("#url"),
    usernameInput: document.querySelector("#user-name"),
    passwordInput: document.querySelector("#password"),
    savePasswordInput: document.querySelector("#save-password"),
    homeRealmInput: document.querySelector("#home-realm"),

    qrCode: document.querySelector("#qr-code"),
    submitButton: document.querySelector("#submit"),
    loginForm: document.querySelector("#login-form")
}

elements.userModeInput.addEventListener("change", (e) => {
    switch (e.target.value) {
        case "Standard":
            displayStandardUserOptions();
            break;
        case "External":
            displayExternalUserOptions();
            break;
        case "OAuth2":
            displayOAuthUserOptions();
            break;
        case "Anonymous":
            displayAnonymousUserOptions();
            break;
    }
});

const qrcodeRenderer = new QRCode("qr-code", {
    width: 500,
    height: 500,
    correctLevel: QRCode.CorrectLevel.H
});

function hideAllFormElements() {
    for (const key in formElements) {
        formElements[key].style.display = "none";
    }
}

function displayStandardUserOptions() {
    hideAllFormElements();

    formElements.userModeField.style.display = formElementsDefaultDisplay.userMode;
    formElements.urlField.style.display = formElementsDefaultDisplay.url;
    formElements.usernameField.style.display = formElementsDefaultDisplay.username;
    formElements.passwordField.style.display = formElementsDefaultDisplay.password;
    formElements.savePasswordField.style.display = formElementsDefaultDisplay.savePassword;
}

function displayExternalUserOptions() {
    hideAllFormElements();

    formElements.userModeField.style.display = formElementsDefaultDisplay.userMode;
    formElements.urlField.style.display = formElementsDefaultDisplay.url;
    formElements.usernameField.style.display = formElementsDefaultDisplay.username;
    formElements.passwordField.style.display = formElementsDefaultDisplay.password;
    formElements.savePasswordField.style.display = formElementsDefaultDisplay.savePassword;
}

function displayOAuthUserOptions() {
    hideAllFormElements();

    formElements.userModeField.style.display = formElementsDefaultDisplay.userMode;
    formElements.urlField.style.display = formElementsDefaultDisplay.url;
    formElements.passwordField.style.display = formElementsDefaultDisplay.password;
    formElements.passwordConfirmationField.style.display = formElementsDefaultDisplay.passwordConfirmation;
    formElements.savePasswordField.style.display = formElementsDefaultDisplay.savePassword;
}

function displayAnonymousUserOptions() {
    hideAllFormElements();

    formElements.userModeField.style.display = formElementsDefaultDisplay.userMode;
    formElements.urlField.style.display = formElementsDefaultDisplay.url;
}

elements.loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const userMode = elements.userModeInput.value;

    switch (userMode) {
        case "Standard":
            generateStandardQrCode();
            break;
        case "External":
            generateExternalQrCode();
            break;
        case "OAuth2":
            generateOAuthQrCode();
            break;
        case "Anonymous":
            generateAnonymousQrCode();
            break;
    }
});

function generateStandardQrCode() {
    const userMode = elements.userModeInput.value;
    const url = elements.urlInput.value;
    const username = elements.usernameInput.value;
    const password = elements.passwordInput.value;
    const savePassword = elements.savePasswordInput.checked;
    const homeRealm = elements.homeRealmInput.value;

    if (!userMode || !url || !username || !password) {
        alert("Please fill in all fields");
        return;
    }

    const loginString = getLoginString(
        userMode,
        url,
        username,
        password,
        savePassword,
        homeRealm
    );

    renderQrCode(loginString);
}

function generateExternalQrCode() {
    const userMode = elements.userModeInput.value;
    const url = elements.urlInput.value;
    const username = elements.usernameInput.value;
    const password = elements.passwordInput.value;
    const savePassword = elements.savePasswordInput.checked;
    const homeRealm = elements.homeRealmInput.value;

    if (!userMode || !url || !username || !password) {
        alert("Please fill in all fields");
        return;
    }

    const loginString = getLoginString(
        userMode,
        url,
        username,
        password,
        savePassword,
        homeRealm
    );

    renderQrCode(loginString);
}

function generateAnonymousQrCode() {
    const userMode = elements.userModeInput.value;
    const url = elements.urlInput.value;

    if (!userMode || !url) {
        alert("Please fill in all fields");
        return;
    }

    const loginString = getLoginString(
        userMode,
        url,
        "",
        "",
        false,
        ""
    );

    renderQrCode(loginString);
}

function generateOAuthQrCode() {
    const userMode = elements.userModeInput.value;
    const url = elements.urlInput.value;
    const password = elements.passwordInput.value;
    const savePassword = elements.savePasswordInput.checked;

    if (!userMode || !url || !password) {
        alert("Please fill in all fields");
        return;
    }

    const loginString = getLoginString(
        userMode,
        url,
        "",
        password,
        savePassword,
        ""
    );

    renderQrCode(loginString);
}

function getLoginString(
    userMode,
    url,
    username,
    password,
    passwordConfirmation,
    savePassword,
    homeRealm
) {
    const result = `UserMode=${userMode}
Url=${url}
UserName=${username}
Password=${password}
SavePassword=${savePassword ? "1" : "0"}
HomeRealm=${homeRealm}`;

    if (passwordConfirmation) {
        return `${result}
PasswordConfirmation=${passwordConfirmation}`;
    } else {
        return result;
    }

}

function renderQrCode(text) {
    elements.qrCode.style.backgroundImage = "none";
    qrcodeRenderer.makeCode(text);
}

displayStandardUserOptions();