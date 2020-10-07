//фильтр секции Информация

const elem = document.querySelector('.information__list');
const iso = new Isotope( elem, {
  itemSelector: '.information__item',
  filter: '.pros-cons',

});

  
  const controlls = document.querySelectorAll('.filter__link');
  const activeClass = 'filter__item--active';

  controlls.forEach(function (control) {
    
    control.addEventListener('click', function (e) {
      e.preventDefault();

      const filterName = control.getAttribute("data-filter");

      controlls.forEach(function (link) {
        link.closest('.filter__item').classList.remove(activeClass);
      });

      control.closest('.filter__item').classList.add(activeClass);

      iso.arrange({
        filter: `.${filterName}`
      })
    });
  });

