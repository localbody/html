const openOverlay = document.querySelectorAll(".overlay-open"),
	  closeOverlay = document.querySelectorAll(".overlay__closer"),
	  materialCardOverlay = document.querySelectorAll('.material-card__overlay');
openOverlay.forEach((item, i) => {
	item.addEventListener('click', event => {
		const target = event.target;
		if(target.closest(".overlay-open")) {
			const card = target.closest('.material-card');
			materialCardOverlay[i].style.bottom = '0%';
		}
	});
});

closeOverlay.forEach(item => {
	item.addEventListener('click', event => {
		const target = event.target;
		if(target.closest('.overlay__closer')) {
			target.closest('.material-card__overlay').style.bottom = '-100%';
		}
	});
});

const resizeOverlays = () => {
	const materialCardOverlay = document.querySelectorAll('.overlay__body'),
		  materialCard = document.querySelectorAll('.material-card'),
		  overlayCloser = document.querySelectorAll('.overlay__closer');

	materialCardOverlay.forEach((item, i) => {
		item.style.height = materialCard[i].clientHeight - overlayCloser[i].clientHeight + 'px';
	});
};
resizeOverlays();
