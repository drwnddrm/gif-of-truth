import './styles/index.css';

const card = document.querySelector('.card');
const cardAnswer = card.querySelector('.card__answer');
const cardImage = card.querySelector('.card__image');

const form = document.querySelector('.question__form');
const formInput = form.querySelector('.question__input');
const formButton = form.querySelector('.question__button');

const loadingBar = {
  name: 'loading...',
  link: 'https://media.tenor.com/mRbYKHgYCOIAAAAM/loading-gif-loading.gif'
}

const deleteValue = (input) => {
  input.value = input.value.replaceAll(input.value, "");
}

const onLoading = (name, link) => {
  cardAnswer.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  setTimeout(() => {
    card.classList.add('card_disabled');
  }, 1500)
}

const updateCard = (answer, link) => {
  card.classList.remove('card_disabled');
  cardAnswer.textContent = answer;
  cardImage.alt = answer;
  cardImage.src = link;
}

formInput.addEventListener('input', (evt) => {
  if(evt.target.validity.valid) {
    formButton.classList.remove('button_disabled');
    formButton.disabled = false;
  }else {
    formButton.classList.add('button_disabled');
    formButton.disabled = true;
  }
})

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  deleteValue(formInput);
  card.classList.remove('card_disabled');
  fetch('https://yesno.wtf/api')
  .then(res => res.json())
  .then(data => {
    onLoading(loadingBar.name, loadingBar.link);
    setTimeout(() => {
      updateCard(data.answer, data.image)
    }, 2000);
  })
  .catch(err => console.log(`Ошибка ${err}. Запрос не выполнен`));
})