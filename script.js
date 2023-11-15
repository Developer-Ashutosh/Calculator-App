// Function to switch themes
const toggleTheme = () => {
    const levels = document.querySelector(".levels");

    levels.addEventListener("click", () => {
        const rootElement = document.documentElement;
        const currentTheme = rootElement.getAttribute("data-theme");
        const caret = document.querySelector(".caret");

        // Switching themes
        switch (currentTheme) {
            case "1":
                rootElement.setAttribute("data-theme", "2");
                updateCaretStyles(caret, "50%", "translate(-50%, -50%)");
                break;
            case "2":
                rootElement.setAttribute("data-theme", "3");
                updateCaretStyles(caret, "68.5%", "translateY(-50%)");
                break;
            default:
                rootElement.setAttribute("data-theme", "1");
                updateCaretStyles(caret, "8.5%", "translateY(-50%)");
        }
    });
};

// Function to update caret styles
const updateCaretStyles = (caret, left, transform) => {
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
