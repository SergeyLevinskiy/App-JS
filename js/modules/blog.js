const postTitelInputNode = document.querySelector('.blog__input--title');
const postTextInputNode = document.querySelector('.blog__input--post');
const postsNode = document.querySelector('.blog__content');
const blogButtom = document.querySelector('.blog__button');
const validationMessage = document.querySelector('.validation-message');

import { removeClassOpen } from "../script.js";
import { addClassOpen } from "../script.js";

const posts = [];
const TITLE_VALIDATION_LIMIT = 20;
const TEXT_VALIDATION_LIMIT = 200;

postTitelInputNode.addEventListener("input", function () {
    validation();
})
postTextInputNode.addEventListener("input", function () {
    validation();
})


blogButtom.addEventListener('click', function () {
    const postFormUser = getPostFromUser();
    addPost(postFormUser);
    renderPosts();
    removeInputValue();
}
)

function removeInputValue() {
    postTitelInputNode.value = "";
    postTextInputNode.value = "";
}

function validation() {
    const titleLen = postTitelInputNode.value.length;
    const textLen = postTextInputNode.value.length;
    if (titleLen > TITLE_VALIDATION_LIMIT) {
        validationMessage.innerHTML = `Заголовок больше ${TITLE_VALIDATION_LIMIT} символов`;
        blogButtom.disabled = true;
        addClassOpen(validationMessage);
        return;
    }
    if (textLen > TEXT_VALIDATION_LIMIT) {
        validationMessage.innerHTML = `Заголовок больше ${TEXT_VALIDATION_LIMIT} символов`;
        blogButtom.disabled = true;
        addClassOpen(validationMessage);
        return;
    }
    if (titleLen < 1) {
        validationMessage.innerHTML = `Добавьте заголовок поста`;
        blogButtom.disabled = true;
        addClassOpen(validationMessage);
        return;
    }
    if (textLen < 1) {
        validationMessage.innerHTML = `Добавьте описание поста`;
        blogButtom.disabled = true;
        addClassOpen(validationMessage);
        return;
    }
    blogButtom.disabled = false;
    removeClassOpen(validationMessage);
}



function getPostFromUser() {
    const title = postTitelInputNode.value;
    const text = postTextInputNode.value;
    return {
        title: title,
        text: text
    };
}

function ucFirst(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

function addPost({ title, text }) {
    title = ucFirst(title);
    text = ucFirst(text);
    posts.push({
        title,
        text
    })
}
function getPosts() {
    return posts;
}
function padTwoDigits(num) {
    return num.toString().padStart(2, '0');
}

function getFormattedLocalDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = padTwoDigits(now.getMonth() + 1);
    const day = padTwoDigits(now.getDate());
    const hours = padTwoDigits(now.getHours());
    const minutes = padTwoDigits(now.getMinutes());

    return `${year}.${month}.${day} ${hours}:${minutes}`;
}
function renderPosts() {
    const posts = getPosts();
    let postsHTML = '';
    posts.forEach(post => {
        postsHTML += `
            <div class='post'>
                <div class="post__data">${getFormattedLocalDateTime()}</div>
                <h4 class="post__title">${post.title}</h4>
                <p class="post__text">${post.text}</p></ >
            </div>
        `
    });
    postsNode.innerHTML = postsHTML;
}