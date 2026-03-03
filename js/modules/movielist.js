
const CLASS_ERROR = 'error';
const CLASS_SHAKE = 'shake';
const CLASS_CHEKED = 'cheked';
let movies = [{ id: 4, name: 'Отступники' }, { id: 3, name: 'Волк с Уолл-Стрит' }, { id: 2, name: 'Остров проклятых' }, { id: 1, name: 'Начало' },];
let movieId = 5;

const moviesInputNode = document.querySelector('.movielist__section-movieinput-input');
const moviesBtnAdd = document.querySelector('.movielist__section-movieinput-button-add');
const moviesMovieListNode = document.querySelector('.movielist__section-movielist');

function addClassError(name) {
    name.classList.add(CLASS_ERROR);
    name.classList.add(CLASS_SHAKE);
    setTimeout(() => name.classList.remove(CLASS_SHAKE), 1000);
}
function removeClassError(name) {
    name.classList.remove(CLASS_ERROR);
}

function chackingError(name) {
    if (!name.value) {
        addClassError(name)
        return;
    } else {
        removeClassError(name);
    };
}

function clearInput(name) {
    name.value = '';
}

function ucFirst(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

function addMovie({ name }) {
    name = ucFirst(name);
    movies.unshift({
        id: movieId++,
        name: name
    })
}

function getMovieFromUser() {
    chackingError(moviesInputNode);
    const name = moviesInputNode.value;
    return {
        name,
    };
}

function getMovie() {
    return movies;
}

function renderMovie() {
    const movies = getMovie();
    let moviesHTML = '';
    movies.forEach(movie => {
        moviesHTML += `
            <li class="movielist__movie" data-id='${movie.id}'>
                <input type="checkbox" name="option_${movie.id}" value="movie_${movie.id}" class="movielist__movie-checkbox" id='movie_${movie.id}'>
                <label for="movie_${movie.id}" class="movielist__movie-name">${movie.name}</label>
                <button class="movielist__movie-button-delete"></button>
            </li>
        `
    });
    moviesMovieListNode.innerHTML = moviesHTML;
}


moviesBtnAdd.addEventListener("click", function () {
    if (!moviesInputNode.value) {
        chackingError(moviesInputNode);
        return null;
    };
    const movieFromUser = getMovieFromUser();
    addMovie(movieFromUser);
    renderMovie();
    clearInput(moviesInputNode);
});

document.addEventListener("click", function (e) {
    const deleteBtn = e.target.closest('.movielist__movie-button-delete');
    if (!deleteBtn) return;
    const movieElement = deleteBtn.closest('.movielist__movie');
    const movieId = Number(movieElement.dataset.id);
    movies = movies.filter(movie => movie.id !== movieId);
    renderMovie();
});

document.addEventListener("click", function (e) {
    const checkbox = e.target.closest('.movielist__movie-checkbox');
    const checkboxName = e.target.closest('.movielist__movie-name');
    const deleteBtn = e.target.closest('.movielist__movie-button-delete');

    if (!checkbox || deleteBtn) return;

    const movieElement = checkbox.closest('.movielist__movie');

    movieElement.classList.toggle(CLASS_CHEKED);
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        moviesBtnAdd.click();
    }
});