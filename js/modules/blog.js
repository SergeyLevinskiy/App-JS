const postTitelInputNode = document.querySelector('.blog__input--title');
const postTextInputNode = document.querySelector('.blog__input--post');
const postsNode = document.querySelector('.blog__content');
const blogButtom = document.querySelector('.blog__button');
const validationMessage = document.querySelector('.validation-message');

import { removeClassOpen } from "../script.js";
import { addClassOpen } from "../script.js";

let posts = [];
let postId = 1;
const TITLE_VALIDATION_LIMIT = 20;
const TEXT_VALIDATION_LIMIT = 200;
const MAX_VISIBLE_POSTS = 3;

postTitelInputNode.addEventListener("input", function () {
    validation();
})
postTextInputNode.addEventListener("input", function () {
    validation();
})


blogButtom.addEventListener('click', function () {
    if (!postTitelInputNode.value) {
        validation();
        return;
    };
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
    posts.unshift({
        id: postId++,
        title: title,
        text: text
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
    posts.slice(0, MAX_VISIBLE_POSTS).forEach(post => {
        postsHTML += `
            <div class='post' data-id='${post.id}'>
                <div class='post__content'>
                    <div class="post__data">${getFormattedLocalDateTime()}</div>
                    <h4 class="post__title">${post.title}</h4>
                    <p class="post__text">${post.text}</p>
                </div>
                <div class="post__delete-btn">
                    <img src="img/expenses/korzina.png" alt="Delete" class="post__img-delet"> 
                </div>
            </div>
        `
    });
    postsNode.innerHTML = postsHTML;
}


document.addEventListener("click", function (e) {
    const deleteBtn = e.target.closest('.post__delete-btn');
    if (!deleteBtn) return;
    const postElement = deleteBtn.closest('.post');
    const postId = Number(postElement.dataset.id);
    posts = posts.filter(post => post.id !== postId);
    renderPosts();
});