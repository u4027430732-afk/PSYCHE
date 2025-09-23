console.log('buy $brain!');
const logo = document.getElementById('logo');



document.addEventListener("DOMContentLoaded", function () {
  const fadeInElements = document.querySelectorAll('.fade-in-element');

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); // Stop observing after it becomes visible
          }
      });
  }, {
      threshold: 0.1 // Adjust this value based on when you want the effect to trigger
  });

  fadeInElements.forEach(element => {
      observer.observe(element);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const fadeInElements = document.querySelectorAll('.msg-animation');

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); // Stop observing after it becomes visible
          }
      });
  }, {
      threshold: 0.1 // Adjust this value based on when you want the effect to trigger
  });

  fadeInElements.forEach(element => {
      observer.observe(element);
  });
});