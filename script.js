const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.global-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// スクロールに合わせて、カードや見出しを順にふわっと表示する
const revealTargets = document.querySelectorAll(
  '.section-heading, .three-cards article, .cat-col, .process-col, .case-card, .strength-list article, .fee-card, .faq-group, .tech-groups > div'
);
if ('IntersectionObserver' in window && revealTargets.length) {
  document.documentElement.classList.add('js');
  revealTargets.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.matches(el.tagName));
    el.style.transitionDelay = (siblings.indexOf(el) % 3) * 0.12 + 's';
    el.classList.add('reveal');
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  revealTargets.forEach((el) => observer.observe(el));
}

// スマホの固定「無料で相談する」ボタン：ヒーローを過ぎたら出し、問い合わせ欄が見えたら隠す
const stickyCta = document.querySelector('.sticky-cta');
const heroSection = document.querySelector('.hero');
const contactSection = document.getElementById('contact');
if (stickyCta && heroSection && contactSection && 'IntersectionObserver' in window) {
  let pastHero = false;
  let atContact = false;
  const update = () => stickyCta.classList.toggle('is-shown', pastHero && !atContact);
  new IntersectionObserver(([entry]) => { pastHero = !entry.isIntersecting; update(); }).observe(heroSection);
  new IntersectionObserver(([entry]) => { atContact = entry.isIntersecting; update(); }).observe(contactSection);
}
