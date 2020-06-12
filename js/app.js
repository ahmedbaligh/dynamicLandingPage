//	Global Declrations
const dySections = Array.from(document.querySelectorAll('section'));
const dySecName = Array.from(document.querySelectorAll('section h2'));
const dyList = document.querySelector('#navbar__list');
let fragment = document.createDocumentFragment();
const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

//	Creating the dynamic navigation menu
const dyNav = dySections.forEach((elem, index) => {
	
	const navItem = document.createElement('li');
	const navItemLink = document.createElement('a');
	const secName = `${dySecName[index].textContent}`;
	const linkURL = `#section${index + 1}`;
	
	navItemLink.textContent = secName;
	navItemLink.setAttribute('href', linkURL);
	navItemLink.classList.add('menu__link');
	
	navItem.appendChild(navItemLink);
	fragment.appendChild(navItem);
	
	//	Highlighting sections on view
	window.addEventListener('scroll', () => {
		if (isInViewport(elem)){
			elem.classList.add('section-on-view');
			navItemLink.classList.add('sec-link-click');
		} else {
			elem.classList.remove('section-on-view');
			navItemLink.classList.remove('sec-link-click');
		}
	});
	
	//	Scrolling to selected section
	navItemLink.addEventListener('click', (evt) => {
	evt.preventDefault();
	elem.scrollIntoView({behavior: 'smooth', block: 'center'});
	});
	
});

document.addEventListener('DOMContentLoaded', dyNav);

//	Add the dynamic navigation menu to the DOM
dyList.appendChild(fragment);

//	Determine if an element is in Viewport
const isInViewport = (elem) => {
	const bounds = elem.getBoundingClientRect();
	return (bounds.top >= 0 && bounds.left >= 0 && bounds.right <= winWidth && bounds.bottom <= winHeight);
};

//	Hiding the navigation bar while not scrolling
const navBar = document.querySelector('.page__header');
let waitTime = null;
window.addEventListener('scroll', () => {
	if(waitTime !== null) {
		clearTimeout(waitTime);
		navBar.style.position = 'fixed';
	}
	waitTime = setTimeout(() => {
		navBar.style.position = 'static';
	}, 800);
});

//	Adding a GoUp button
document.addEventListener('DOMContentLoaded', () => {
	const pageFooter = document.querySelector('.page__footer');
	const upButton = document.createElement('button');
	const buttonLink = document.createElement('a');
	const textHolder = document.createElement('span');
	textHolder.textContent = 'Top';
	
	//	Styling the button
	upButton.classList.add('go-to-top');

	//	Adding the GoUp button to the DOM
	buttonLink.appendChild(textHolder);
	upButton.appendChild(buttonLink);
	pageFooter.appendChild(upButton);
	
	//	Going to the top of the page
	upButton.onclick = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
};
	//	Hiding the button if it's in the fold of the page
	window.onscroll = () => {
		if (document.documentElement.scrollTop > (winHeight * 0.3)) {
    		upButton.style.position = 'fixed';
  		} else {
    		upButton.style.position = 'static';
  		}
	};
});

