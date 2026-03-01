import "./modules/popup.js"
import "./modules/counter.js"
import "./modules/blog.js"
import "./modules/expenses.js"


const opened_className = 'open';

export function addClassOpen(name) {
    if (name.classList.contains(opened_className)) {
    } else {
        name.classList.add(opened_className);
    };
}
export function removeClassOpen(name) {
    name.classList.remove(opened_className);
}
