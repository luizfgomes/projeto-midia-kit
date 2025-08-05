const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if(window.scrollY > 58) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const linksInternos = document.querySelectorAll('a[href^="#"]');

function scrollToSection(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    const section =document.querySelector(href);

    section.scrollIntoView({
        behavior:'smooth',
        block: 'start'
    })
}

linksInternos.forEach(link => {
    link.addEventListener('click', scrollToSection);
})

const counters = document.querySelectorAll('.counter');

const animateCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const speed = 1000;

    const updateCount = () => {
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target)
        }
    });
}, {threshold: 0.9});

counters.forEach(counter => {
    observer.observe(counter);
});