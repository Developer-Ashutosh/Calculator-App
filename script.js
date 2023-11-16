const levels = document.querySelector(".levels");
const rootElement = document.documentElement;

const toggleTheme = () => {
    // Apply the stored theme if any
    if (localStorage.getItem('preferredTheme')) {
        applyThemeLogic(localStorage.getItem('preferredTheme'));
    }

    // Save user preference when they switch themes
    levels.addEventListener('click', () => {
        const selectedTheme = rootElement.getAttribute("data-theme");
        applyThemeLogic(selectedTheme);
        localStorage.setItem('preferredTheme', selectedTheme);
    });
};

// Function to apply the theme
const applyThemeLogic = (theme) => {

    // Switching themes
    switch (theme) {
        case "1":
            rootElement.setAttribute("data-theme", "2");
            updateCaretStyles("50%", "translate(-50%, -50%)");
            break;
        case "2":
            rootElement.setAttribute("data-theme", "3");
            updateCaretStyles("68.5%", "translateY(-50%)");
            break;
        default:
            rootElement.setAttribute("data-theme", "1");
            updateCaretStyles("8.5%", "translateY(-50%)");
    }
};

// Function to update caret styles
const updateCaretStyles = (left, transform) => {
    const caret = document.querySelector(".caret");
    caret.style.left = left;
    caret.style.transform = transform;
};

// Function to evaluate data from keypad
const evaluateData = () => {
    const keypad = document.querySelector(".keypad");

    keypad.addEventListener("click", (event) => {
        const button = event.target;
        const screen = document.querySelector("#screen");

        if (button.tagName === "BUTTON") {
            switch (button.textContent) {
                case "DEL":
                    // Remove last character from screen value
                    screen.value = screen.value.slice(0, -1);
                    break;
                case "RESET":
                    // Reset screen value
                    screen.value = "";
                    break;
                case "=":
                    // Handle equals button
                    try {
                        // Evaluate expression and update screen value
                        screen.value = (screen.value !== "") ? eval(screen.value) : "";
                    } catch (error) {
                        // Handle invalid input
                        screen.value = "Invalid";
                        setTimeout(() => {
                            screen.value = "";
                        }, 800);
                    }
                    break;
                default:
                    // Append button text to screen value
                    screen.value += button.textContent;
            }
        }
    });
};

// Initial call for all functions
toggleTheme();
evaluateData();