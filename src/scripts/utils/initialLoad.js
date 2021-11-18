export function initialLoad() {
  localStorage.setItem('initialLoad', true);

  setTimeout(() => {
    localStorage.removeItem('initialLoad');
  }, 3000);
}
