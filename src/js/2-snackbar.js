import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const { delay, state } = e.currentTarget.elements;

  createPromise(delay.value, state.value)
    .then(data =>
      iziToast.success({
        message: `✅ Fulfilled promise in ${data}ms`,
        position: 'topRight',
      })
    )
    .catch(data =>
      iziToast.error({
        message: `❌ Rejected promise in ${data}ms`,
        position: 'topRight',
      })
    );
  form.reset();
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
