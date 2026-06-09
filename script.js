

document.addEventListener('DOMContentLoaded', function () {
	const navToggle = document.querySelector('[data-nav-toggle]');
	const nav = document.querySelector('[data-nav]');
	if (navToggle && nav) navToggle.addEventListener('click', () => nav.classList.toggle('open'));

	document.querySelectorAll('a[href^="#"]').forEach(link => {
		link.addEventListener('click', (e) => {
			const href = link.getAttribute('href');
			const target = document.querySelector(href);
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth' });
				if (nav) nav.classList.remove('open');
			}
		});
	});

	document.querySelectorAll('[data-project-open]').forEach(btn => {
		btn.addEventListener('click', () => {
			const id = btn.getAttribute('data-project-open');
			const modal = document.querySelector(`[data-project-modal="${id}"]`);
			if (modal) modal.classList.add('open');
		});
	});

	document.querySelectorAll('[data-project-close]').forEach(btn => {
		btn.addEventListener('click', () => {
			const modal = btn.closest('[data-project-modal]');
			if (modal) modal.classList.remove('open');
		});
	});

	document.addEventListener('click', (e) => {
		const modal = e.target.closest('[data-project-modal].open');
		if (modal && e.target === modal) modal.classList.remove('open');
	});

	const contactForm = document.querySelector('[data-contact-form]');
	if (contactForm) {
		contactForm.addEventListener('submit', (e) => {
			const email = contactForm.querySelector('[name="email"]');
			const message = contactForm.querySelector('[name="message"]');
			let ok = true;
			if (email && !/^\S+@\S+\.\S+$/.test(email.value)) ok = false;
			if (message && message.value.trim().length < 10) ok = false;
			if (!ok) {
				e.preventDefault();
				alert('Please complete the form correctly.');
			}
		});
	}

	const themeToggle = document.querySelector('[data-theme-toggle]');
	if (themeToggle) {
		const applyTheme = (t) => document.documentElement.setAttribute('data-theme', t);
		const saved = localStorage.getItem('theme');
		if (saved) applyTheme(saved);
		themeToggle.addEventListener('click', () => {
			const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
			applyTheme(current);
			localStorage.setItem('theme', current);
		});
	}

	const reveals = document.querySelectorAll('[data-reveal]');
	if (reveals.length) {
		const io = new IntersectionObserver((entries, obs) => {
			entries.forEach(en => {
				if (en.isIntersecting) {
					en.target.classList.add('revealed');
					obs.unobserve(en.target);
				}
			});
		}, { threshold: 0.1 });
		reveals.forEach(r => io.observe(r));
	}
});

