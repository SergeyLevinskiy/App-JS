import { togglePopup, POPUP_OPENED_CLASSNAME, popupNode } from "./popup.js";
import { removeClassOpen } from "../script.js";
import { addClassOpen } from "../script.js";

const expenseSpendingInputNode = document.querySelector('.expense-form__spending-input');
const expenseListInputNode = document.querySelector('.expense-form__list');
const expenseAddButton = document.querySelector('.expense-form__spending-btn-add');
const expenseHistoryNode = document.querySelector('.expense-info__history-list');
const expenseTotalValueNode = document.querySelector('.expense-info__total-value');
const expenseStateValueNode = document.querySelector('.expense-info__state-value');
const expenseSLimitValueNode = document.querySelector('.expense-info__limit-value');
const expenseResetButton = document.querySelector('.expense__btn-reset');

const popupSpendingInputNode = document.querySelector('.popup__spending-input');
const popupChangeLimitButton = document.querySelector('.popup__spending-btn-change');

const CLASS_ERROR = 'error';
const CLASS_SHAKE = 'shake';
const CURRENCY = 'руб.';
const STATUS_IN_LIMIT = 'Все хорошо';
const STATUS_OFF_LIMIT = 'Все плохо';
const STATUS_ON_LIMIT_CLASSNAME = 'expense-info__state-value--good';
const STATUS_OFF_LIMIT_CLASSNAME = 'expense-info__state-value--bad';

let limit = 10000;
let sum = 0;
let history = [];

expenseAddButton.addEventListener('click', function () {
    if (!expenseSpendingInputNode.value) {
        chackingError(expenseSpendingInputNode);
        return null;
    }
    const expenseFromUser = getExpenseFromUser()
    addExpense(expenseFromUser);
    render();
    checkingLimit();
    clearSpendingInputValue();
    addClassOpen(expenseResetButton);
})


function addExpense({ expense, list }) {
    history.push({
        expense,
        list
    });
}

function chackingError(name) {
    if (!name.value) {
        addClassError(name)
        return;
    } else {
        removeClassError(name);
    };
}

function getExpenseFromUser() {
    chackingError(expenseSpendingInputNode)
    const expense = Number(expenseSpendingInputNode.value);
    const list = expenseListInputNode.value;
    return {
        expense,
        list
    };
}

function getExpense() {
    return history;
}

function render() {
    renderSum();
    renderHistory();
}

function renderHistory() {
    const history = getExpense();
    let historyHTML = '';
    history.forEach((element, index) => {
        index += 1
        historyHTML += `
            <li class="expense-info__history-item">
                ${index}.  ${element.expense} ${CURRENCY} - ${element.list}
            </li>
        `
    });
    expenseHistoryNode.innerHTML = historyHTML;
}

function renderSum() {
    calculateExpansesSum();
    renderTotalValueNode();
}

function renderTotalValueNode() {
    expenseTotalValueNode.innerText = sum;
}

function calculateExpansesSum() {
    return sum += Number(expenseSpendingInputNode.value);
}

function checkingLimit() {
    let name = expenseStateValueNode;
    if (sum > limit) {
        let difference = sum - limit;
        name.innerHTML = `${STATUS_OFF_LIMIT} (-${difference} ${CURRENCY})`;
        name.classList.remove(STATUS_ON_LIMIT_CLASSNAME);
        name.classList.add(STATUS_OFF_LIMIT_CLASSNAME);
    } else {
        name.innerHTML = `${STATUS_IN_LIMIT}`;
        name.classList.add(STATUS_ON_LIMIT_CLASSNAME);
        name.classList.remove(STATUS_OFF_LIMIT_CLASSNAME);
    }
}

function addClassError(name) {
    name.classList.add(CLASS_ERROR);
    name.classList.add(CLASS_SHAKE);
    setTimeout(() => expenseSpendingInputNode.classList.remove(CLASS_SHAKE), 1000);
}
function removeClassError(name) {
    name.classList.remove(CLASS_ERROR);
}

function clearSpendingInputValue() {
    expenseSpendingInputNode.value = '';
}

function clearHistoryNode() {
    expenseHistoryNode.innerHTML = '';
}

function clearValue() {
    sum = 0;
    history = [];
}

expenseResetButton.addEventListener('click', function () {
    clearValue()
    clearSpendingInputValue();
    clearHistoryNode();
    renderTotalValueNode()
    checkingLimit();
    removeClassOpen(expenseResetButton);
})



function chengeLimit() {
    limit = Number(popupSpendingInputNode.value);
    expenseSLimitValueNode.innerHTML = `${limit} ${CURRENCY}`;
    popupSpendingInputNode.value = '';
}

popupChangeLimitButton.addEventListener('click', function () {
    chengeLimit();
    togglePopup();
    checkingLimit();
})





document.addEventListener('keydown', function (event) {
    if (popupNode.classList.contains(POPUP_OPENED_CLASSNAME)) {
        if (event.key === 'Enter') {
            popupChangeLimitButton.click();
        }
    }
});