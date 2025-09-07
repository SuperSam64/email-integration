var customerName='John Doe';
var customerPhoneNumber='5555555555';
var images = [
	{name:'e5bd57d8-f981-4e18-8c4f-82fc97562fee.jpeg', date:'1/1/25 1:45 PM EST'},
	{name:'07d564ff-55cb-4ced-90d8-329860bcd742.jpeg', date:'1/1/25 1:45 PM EST'},
	{name:'60c32dff-18ac-4486-bbbc-dfd892f84e4a.jpeg', date:'1/1/25 1:45 PM EST'},
	{name:'3bdb2f7d-635d-4078-b9d2-3e2dc6edeb10.jpeg', date:'1/1/25 1:45 PM EST'},
	{name:'62369a7e-bb06-4db0-a02c-695bbe161735.jpeg', date:'1/1/25 1:45 PM EST'},
	{name:'e5bd57d8-f981-4e18-8c4f-82fc97562fee.jpeg', date:'1/1/25 1:45 PM EST'},
	{name:'07d564ff-55cb-4ced-90d8-329860bcd742.jpeg', date:'1/1/25 1:45 PM EST'},
	{name:'60c32dff-18ac-4486-bbbc-dfd892f84e4a.jpeg', date:'1/1/25 1:45 PM EST'},
	{name:'3bdb2f7d-635d-4078-b9d2-3e2dc6edeb10.jpeg', date:'1/1/25 1:45 PM EST'},
	{name:'62369a7e-bb06-4db0-a02c-695bbe161735.jpeg', date:'1/1/25 1:45 PM EST'}
];
buildGallery(customerName, customerPhoneNumber, images);

/* TEMPORARY FUNCTION - TO TEST LOADING ONLY, REMOVE IN FINAL VERSION */

setTimeout(function() {
	hideLoadingScreen();
}, 4600);

/* ------------------------------------------------------------------ */ 

const loadingScreen = document.querySelector('#loading-screen');
const expandedImage = document.getElementById('expanded-image');
const modal = document.querySelector('.modal');
let originalImageRect;
var copyButtons, closeButtons, downloadButtons, galleryImages, previousButton, nextButton, imageIndex=-1;

getParams();
function getParams(){
	var urlParams=new URLSearchParams(window.location.search);
	var key=urlParams.get('key');
	var phone_number=urlParams.get('phone_number');
	getConversationId(key, phone_number);
}

function getConversationId(key, phone_number){
	var request = new XMLHttpRequest();
	request.open('GET', 'https://private-anon-6123db9648-textline.apiary-proxy.com/api/conversations.json?phone_number='+phone_number+'&access_token='+key); /* a941205863 */
	request.onreadystatechange = function () {
		if (this.readyState === 4) {
			if(JSON.parse(this.response).conversation==null){
				alert('error');
			}
			else{
				getImages(JSON.parse(this.response));
				/*console.log(JSON.parse(this.response));*/
			}
		}
	};
	request.send();
}
function getImages(input){
	var images;
	var imageGallery=document.querySelector('#image-gallery');
	for(c=0;c<input.posts.length;c++){
		if(input.posts[c].attachments!=null){
			for(i=0;i<input.posts[c].attachments.length;i++){
				console.log(input.posts[c]);
				console.log(input.posts[c].attachments[i].name);
				console.log(input.posts[c].attachments[i].url);
				var image = Object.assign(document.createElement('img'), {
					src: input.posts[c].attachments[i].url,
					height:300
				});
				console.log(image);
				imageGallery.appendChild(image);
			}
		}
	}
	console.log(images);
	return images;
}

function buildGallery(title, subtitle, imageArray){
	var galleryElement=document.getElementsByClassName('gallery')[0];
	var titleElement=document.getElementsByTagName('h1')[0];
	var subtitleElement=document.getElementsByTagName('h2')[0];
	titleElement.innerText=title==''?subtitle:title;
	subtitleElement.innerText=title==''?'':subtitle;
	for(i=0;i<imageArray.length;i++){
		var newContainer = Object.assign(document.createElement('div'), {
			className: 'imageContainer',
		});
		var newImage = Object.assign(document.createElement('img'), {
			src: 'https://s3.amazonaws.com/a2.textline.com/attachments/'+imageArray[i].name,
			className: 'gallery-image'
		});
		var newCopyButton = document.createElementNS('http://www.w3.org/2000/svg','svg');
		var newDownloadButton = document.createElementNS('http://www.w3.org/2000/svg','svg');
		var copyButtonConfig = document.createElementNS('http://www.w3.org/2000/svg', 'use');
		var downloadButtonConfig = document.createElementNS('http://www.w3.org/2000/svg', 'use');
		newCopyButton.setAttribute('viewBox', '0 0 100 100');
		copyButtonConfig.setAttribute('class', 'copy thumbnail-button');
		copyButtonConfig.setAttribute('fill', 'var(--button-color)');
		copyButtonConfig.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#copy');
		newCopyButton.appendChild(copyButtonConfig);
		newDownloadButton.setAttribute('viewBox', '0 0 100 100');
		downloadButtonConfig.setAttribute('class', 'download thumbnail-button');
		downloadButtonConfig.setAttribute('fill', 'var(--button-color)');
		downloadButtonConfig.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#download');
		newDownloadButton.appendChild(downloadButtonConfig);
		newContainer.appendChild(newImage);
		newContainer.appendChild(newCopyButton);
		newContainer.appendChild(newDownloadButton);
		galleryElement.appendChild(newContainer);
	}
	galleryImages = document.querySelectorAll('.gallery-image');
	copyButtons = document.querySelectorAll('.copy');
	downloadButtons = document.querySelectorAll('.download');
	closeButtons = document.querySelectorAll('.close');
	previousButton = document.querySelector('.previous');
	nextButton = document.querySelector('.next');
	setClickBehavior();
}

function setClickBehavior(){
	document.addEventListener('DOMContentLoaded', function(){
		galleryImages.forEach(image => {
			image.addEventListener('click', (e) => {
				for(i=0;i<galleryImages.length;i++){
					if(e.target==galleryImages[i]){
						imageIndex=i;
					}
				}
				expandImage(e.target); 
			});
		});
		copyButtons.forEach(button => {
			button.addEventListener('click', (e) => {
				copy(imageIndex,e.target); 
			});
		});
		downloadButtons.forEach(button => {
			button.addEventListener('click', (e) => {
				download(imageIndex,e.target); 
			});
		});
		closeButtons.forEach(button => {
			button.addEventListener('click', () => {
				 close();
			});
		});
		previousButton.addEventListener('click', function(event) {
		   event.stopPropogation;
		   previous();
		});
		nextButton.addEventListener('click', function(event) {
		   event.stopPropogation;
		   next(); 
		});
		modal.addEventListener('click', function(event) {
		   event.stopPropogation;
		   if(event.target===this){
			   close();
		   }
		});
		document.addEventListener('keydown', (event) => {
			switch (event.key) {
			case 'ArrowLeft':
				if(modal.classList.contains('is-visible')){
					event.stopPropogation;
					previous();break;
				}
				else{
					break;
				}
			case 'ArrowRight':
				if(modal.classList.contains('is-visible')){
					event.stopPropogation;
					next();
					break;
				}
				else{
					break;
				}
			case 'Escape':
				if(modal.classList.contains('is-visible')){
					event.stopPropogation;
					close();break;
				}
				else{
					break;
				}
			default:
				break;
			}
		});
	});
}

function hideLoadingScreen(){
	if(loadingScreen){
		loadingScreen.classList.add('fade');
		loadingScreen.addEventListener('transitionend', function handler() {
			loadingScreen.removeEventListener('transitionend', handler);
			loadingScreen.remove();
		});
	}
}

function setImageTitle(imageName, imageDate){
	var h1 = document.getElementById('imageName');
	var h2 = document.getElementById('imageDate');
	h1.innerText=imageName+' ('+(imageIndex+1)+' of '+galleryImages.length+')';
	h2.innerText=imageDate;
}

function expandImage(originalImage, animation = 'open') {
	setImageTitle(images[imageIndex].name,images[imageIndex].date);
	previousButton.style.opacity='1';
	nextButton.style.opacity='1';
	previousButton.style.pointerEvents='auto';
	nextButton.style.pointerEvents='auto';
	previousButton.style.visibility='visible';
	nextButton.style.visibility='visible';
	if(imageIndex==0){
		previousButton.style.opacity='0';
		previousButton.style.visibility='hidden';
		previousButton.style.pointerEvents='none';
	}
	if(imageIndex==galleryImages.length-1){
		nextButton.style.opacity='0';
		nextButton.style.visibility='hidden';
		nextButton.style.pointerEvents='none';
	}
	originalImageRect = originalImage.getBoundingClientRect();
	expandedImage.src = originalImage.src;
	if(animation == 'left'){
		expandedImage.style.opacity='0';
		var scaleY = window.innerHeight / window.innerHeight;
		var scaleX =   window.innerWidth / window.innerWidth;
		var translateX = (window.innerWidth/-8);
		var translateY = 0;
	}
	else if(animation == 'right'){
		expandedImage.style.opacity='0';
		var scaleY = window.innerHeight / window.innerHeight;
		var scaleX =   window.innerWidth / window.innerWidth;
		var translateX = (window.innerWidth/8);
		var translateY = 0;
	}
	else{
		var scaleX = originalImageRect.width / window.innerWidth;
		var scaleY = originalImageRect.height / window.innerHeight;
		var translateX = originalImageRect.left - (window.innerWidth - originalImageRect.width) / 2;
		var translateY = originalImageRect.top - (window.innerHeight - originalImageRect.height) / 2;
	}
	expandedImage.style.transition = 'none';
	expandedImage.style.transform = `translate(${translateX}px, ${translateY}px) scaleX(${scaleX}) scaleY(${scaleY})`;
	requestAnimationFrame(() => {
		requestAnimationFrame(() => {
			modal.classList.add('is-visible');
			expandedImage.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
			expandedImage.style.transform = 'translate(0, 0) scale(1)';
			expandedImage.style.opacity='1';
		});
	});
}

function copy(index,element){
	alert('Sorry, this function is still in development\nTo copy this image, right-click it and select "Copy image"');
	/*if(index==-1){
		for(i=0;i<copyButtons.length;i++){
			if(element==copyButtons[i]){
				selectedImage = i;
			}
		}		
	}
	else{
		var selectedImage = index;
	}*/
}

function download(index,element){
	alert('Sorry, this function is still in development\nTo save this image, right-click it and select "Save image as..."');
	/*if(index==-1){
		for(i=0;i<downloadButtons.length;i++){
			if(element==downloadButtons[i]){
				selectedImage = i;
			}
		}
	}
	else{
		var selectedImage = index;
	}
	var tempdiv = document.createElement('div');
	tempdiv.innerHTML='<a style="position:absolute;left:200px" href="https://s3.amazonaws.com/a2.textline.com/attachments/62369a7e-bb06-4db0-a02c-695bbe161735.jpeg" download>download</a>';
	document.body.appendChild(tempdiv);
	tempdiv.click();*/
}

function close() {
	previousButton.style.opacity='0';
	nextButton.style.opacity='0';
	modal.classList.remove('is-visible');
	const scaleX = galleryImages[imageIndex].width/expandedImage.width;
	const scaleY = galleryImages[imageIndex].height/expandedImage.height;
	const translateX = originalImageRect.left - (window.innerWidth - originalImageRect.width) / 2;
	const translateY = originalImageRect.top - (window.innerHeight - originalImageRect.height) / 2;
	expandedImage.style.transform = `translate(${translateX}px, ${translateY}px) scaleX(${scaleX}) scaleY(${scaleY})`;
	imageIndex=-1;
	expandedImage.addEventListener('transitionend', () => {
		expandedImage.style.transition = 'none';
		expandedImage.style.transform = '';
	}, { once: true });
}

function previous(){
	if(imageIndex>0){
		imageIndex-=1;
		expandImage(galleryImages[imageIndex],'left');
	}
}

function next(){
	if(imageIndex<galleryImages.length-1){
		imageIndex+=1;
		expandImage(galleryImages[imageIndex],'right');
	}
}
