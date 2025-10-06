var images=[];
const loadingScreen = document.querySelector('#loading-screen');
const expandedImage = document.getElementById('expanded-image');
const modal = document.querySelector('.modal');
var originalImageRect, allImages, phone_number, userInitials, uuid, userInitials,
	copyButtons, closeButtons, downloadButtons, galleryImages, previousButton, nextButton,
	inputPadding,initialInputHeight, initialInputWrapHeight, inputFontSize,	pageHeaderHeight,
	commentsHeaderHeight, commentsHeaderPadding, pageBottomMargin, imageIndex=-1;
var key = getKey();
setTheme();
getParams();

function getKey(){
	if(localStorage.getItem('key') == null){
		var newKey = prompt('Key:');
		localStorage.setItem('key', newKey);
		return newKey;
	}
	else{
		return localStorage.getItem('key');
	}
}

function getParams(){
	var urlParams=new URLSearchParams(window.location.search);
	/*var key=urlParams.get('key');*/
	phone_number = urlParams.get('phone_number');
	userInitials = urlParams.get('CCA');
	getConversationId(key, phone_number);
}

function setTheme(option = 'initial'){
	var currentTheme = localStorage.getItem('currentTheme');
	if(currentTheme == null){var theme = 'dark'}
	else if (option == 'toggle'){var theme = (currentTheme == 'dark') ? 'light' : 'dark'}
	else {var theme = currentTheme}
	document.getElementById('theme').setAttribute('href', 'themes/' + theme + '.css');
	localStorage.setItem('currentTheme', theme);
}

function getConversationId(key, phone_number){
	var request = new XMLHttpRequest();
	request.open('GET', 'private-a1d8aa-textline.apiary-proxy.com/api/conversations.json?phone_number='+phone_number+'&access_token='+key); /* a941205863 */
	request.onreadystatechange = function () {
		if (this.readyState === 4) {
			if(JSON.parse(this.response).conversation==null){
				document.querySelector('.comments-panel').remove();
				document.querySelector('.no-results').style.paddingLeft = '0';
				document.querySelector('.no-results').style.paddingRight = '0';
				hideLoadingScreen();
			}
			else{
				getImages(JSON.parse(this.response));
			}
		}
	};
	request.send();
}

function getImages(input){
	loadComments(key, phone_number);
	allImages=input;
	var imageGallery=document.querySelector('.gallery');
	for(c=0;c<input.posts.length;c++){
		if(input.posts[c].attachments!=null){
			for(i=0;i<input.posts[c].attachments.length;i++){
				var image={
					name:input.posts[c].creator.name,
					phone_number:input.posts[c].creator.phone_number,
					filename:input.posts[c].attachments[i].name,
					url:input.posts[c].attachments[i].url,
					date:input.posts[c].created_at
				}
				images.push(image);
			}
		}
	}
	buildGallery(images);
	return;
}

function buildGallery(imageArray){
	var galleryElement=document.getElementsByClassName('gallery')[0];
	var titleElement=document.getElementsByClassName('name')[0];
	var subtitleElement=document.getElementsByClassName('date')[0];
	var noResults=document.querySelector('.no-results');
	titleElement.innerText='No matches found';
	subtitleElement.innerText='There are no messages with images from this phone number.';
	for(i=0;i<imageArray.length;i++){
		noResults.style="display:none";
		if(titleElement.innerText=='No matches found'||titleElement.textContent=='No matches found'){
			titleElement.textContent=imageArray[i].name;
			if(imageArray[i].name != imageArray[i].phone_number){
				subtitleElement.textContent=imageArray[i].phone_number;
			}
			else{
				subtitleElement.style.display='none';
			}
		}
		var newContainer = Object.assign(document.createElement('div'), {
			className: 'imageContainer',
		});
		var newImage = Object.assign(document.createElement('img'), {
			src: imageArray[i].url,
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
	hideLoadingScreen();
}

function setClickBehavior(){
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
}

function hideLoadingScreen(){
	document.querySelector('#theme-button').addEventListener('click', (e) => {
		setTheme('toggle');
	});
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
	setImageTitle(images[imageIndex].filename,formatDate(images[imageIndex].date));
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

function download(index, element){
	
	if(index==-1){
		for(i=0;i<downloadButtons.length;i++){
			if(element==downloadButtons[i]){
				selectedImage = i;
			}
		}
	}
	else{
		var selectedImage = index;
	}
	/*var downloadImage = images[selectedImage];
	var blob = downloadImage.blob;
	var url = window.URL.createObjectURL(blob);
	var link = document.createElement('a');
	link.href = url;
	link.download = downloadImage.filename;
	document.body.appendChild(link);
	link.click();
	link.remove();
	window.URL.revokeObjectURL(url);*/
	console.log(images[selectedImage]);
	console.log(images[selectedImage].blob);
	console.log(allImages);
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

document.addEventListener('DOMContentLoaded', function() {
	var rootElement = document.documentElement;
	var topSection = document.querySelector('.top-section');
	var commentsPanelTitle = document.querySelector('.comments-panel-title');
	var commentsContainer = document.querySelector('.comments-content-section');
	var commentsPanelContent = document.querySelector('.comments-panel-content');
	var inputWrap = document.querySelector('#input-wrap');
	var commentInput = document.querySelector('#comment-input');
	var inputWrapPadding = measureElement(inputWrap, 'padding', 'px', inputWrapPadding);
	commentInput.disabled = true;
	commentInput.addEventListener('input', function(event) {
		var previousScrollHeight = this.style.height;
		this.style.height = 'auto';
		this.style.height = (this.scrollHeight) + 'px';
		initialInputHeight = initialInputHeight?initialInputHeight:this.scrollHeight;
		inputFontSize = measureElement(commentInput, 'font-size', 'px', inputFontSize);
		inputPadding = (initialInputHeight - inputFontSize);
		inputWrap.style.height = (this.scrollHeight + inputPadding + measureElement(inputWrap, 'padding', 'px')) + 'px';
		initialInputWrapHeight = measureElement(inputWrap, 'height', 'px', initialInputWrapHeight);
		pageHeaderHeight = measureElement(topSection, 'height', 'px', pageHeaderHeight);
		commentsHeaderHeight = measureElement(commentsPanelTitle, 'height', 'px', commentsHeaderHeight);
		commentsHeaderPadding = measureElement(commentsPanelTitle, 'padding', 'px', commentsHeaderPadding);
		pageBottomMargin = measureElement(rootElement, '--default-margins', 'px', pageBottomMargin);
		var totalHeightOffset = pageHeaderHeight + commentsHeaderHeight + (commentsHeaderPadding * 2) + pageBottomMargin;
		commentsPanelContent.style.height = 'calc(100vh - ' + (totalHeightOffset + (2 * (inputWrapPadding)) + 
			(initialInputWrapHeight - initialInputHeight) + this.scrollHeight) + 'px)';
	});
	commentInput.addEventListener('keydown', function(event) {
		if(event.key === 'Enter' && !event.shiftKey && !event.altKey && !event.altKey){
			event.preventDefault();
			if(commentInput.value.trim() != ''){
				var submittedComment = commentInput.value;
				commentInput.value = '';
				commentInput.dispatchEvent(new Event('input'));
				commentInput.disabled = true;
				addComment(submittedComment);
								
				
				
			}
		}
	});
	commentInput.dispatchEvent(new Event('input'));
});

function measureElement(element, style, units, variable){
	if(!variable){
		return Number(((window.getComputedStyle(element)).getPropertyValue(style)).replace(units,''));
	}
	else{
		return variable;
	}
}

function loadComments(key, phone_number, latest = false){
	var request = new XMLHttpRequest();
	var lastComment = {};
	request.open('GET', 'private-a1d8aa-textline.apiary-proxy.com/api/conversations.json?phone_number='+phone_number+'&access_token='+key); /* a941205863 */
	request.onreadystatechange = function () {
		if (this.readyState === 4) {
			uuid = JSON.parse(this.response).conversation.uuid;
			if(JSON.parse(this.response).conversation==null){
				return;
			}
			else{
				var conversation = JSON.parse(this.response);
				var commentCount = 0;
				var latestComment = {};		
				var commentInput = document.querySelector('#comment-input');
				for(c=0;c<conversation.posts.length;c++){
					var post = conversation.posts[c];
					var body = (post.body == null || !post.body) ? '' : post.body;
					var initials = body.trim().split(' ')[0];
					var content = body.replace(initials,' ').trim();
					if(post.is_whisper && initials.includes('[') && initials.includes(']') && 
						body != '' && initials.replace('[','').replace(']','').length < 4){
						commentCount += 1;
						if(latest){
							latestComment = {name: formatName(initials), date: formatDate(post.created_at), comment: formatComment(content)}
						}
						else{
							buildComments(formatName(initials), formatDate(post.created_at), formatComment(content));
							commentInput.disabled = false;
						}
					}
				}
				if(commentCount == 0){
					var noComments = document.querySelector('.no-comments');
					noComments.style.display = 'block';
					commentInput.disabled = false;
				}
				if(latest){
					/* determines when the new message has registered */
					checkForNew = setTimeout(() => {
						console.log('checking for new messages');
						if (document.querySelectorAll('.comment-container').length == commentCount) {
							/* proceed below with posting the new message */
							buildComments(latestComment.name, latestComment.date, latestComment.comment, true);
							console.log(commentInput);
						}
						else{
							loadComments(key, phone_number, true);
						}
					}, 200);
				}
			}
		}
	}
	request.send();
}

function formatName(name){
	try{
		return CCAs.find(CCA => CCA.initials == name.replace('[','').replace(']','')).name;
	}
	catch (err) {
		return name.replace('[','').replace(']','');
	}
}

function formatDate(date){
	var fullDate = new Date(date * 1000);
	return fullDate.toLocaleTimeString('en-US', {day:'numeric', month:'numeric', year: 'numeric',
		hour: 'numeric', minute: 'numeric', hour12: true}).replace(', ','  (') + ')';
}

function formatComment(comment){
	var commentArray = comment.split(' ');
	var formattedComment = [];
	for(i = 0; i < commentArray.length; i ++){
		if(formatLinks(commentArray[i])){
			if(commentArray[i].includes('http://') || commentArray[i].includes('https://')){
				formattedComment.push('<a href="' + commentArray[i] + '">' + commentArray[i] + '</a>');
			}
			else{
				formattedComment.push('<a href="https://' + commentArray[i] + '" target="_blank">' + commentArray[i] + '</a>');

			}
		}
		else {
			formattedComment.push(commentArray[i]);			
		}
	}
	return formattedComment.join(' ');
}

function formatLinks(text){
	var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
	return urlRegex.test(text);
}

function loadingIndicator(){
	var commentContentsPanel = document.querySelector('.comments-panel-content');
	var commentContainer = Object.assign(document.createElement('div'), {
		className:'comment-container',
		innerHTML:
		`<div class="typing-indicator-container">
			<div class="typing-indicator">
				<svg viewBox="0 0 300 100" preserveAspectRatio="xMidYMid meet">
					<use href="#typing-animation" />
				</svg>
			</div>
		</div>
		<div class="comment-card hidden">
		</div>`
	});
	commentContentsPanel.appendChild(commentContainer);
	commentContainer.scrollIntoView({behavior: 'smooth', block: 'end'});
}

function buildComments(name, date, comment, latest = false){
	if(latest){
		var lastComment = document.querySelectorAll('.comment-container')[document.querySelectorAll('.comment-container').length - 1];
		var typingIndicatorContainer = document.querySelector('.typing-indicator-container');
		var commentContainer = Object.assign(document.createElement('div'), {
			className: 'comment-card hidden',
			innerHTML:
			`<div class="comment-card-content">
				<div class="comment-details">
					<span class="comment-name">
						` + name + `
					</span>
					<span class="comment-time">
						` + date + `
					</span>
				</div>
				<div class="comment-body">
					` + comment +`
				</div>
			</div>`
		});
		lastComment.appendChild(commentContainer);
		setTimeout(() => {
			var commentInput = document.querySelector('#comment-input');
			typingIndicatorContainer.remove();
			commentContainer.classList.remove('hidden');
			commentInput.disabled = false;
		}, 100);
		setTimeout(() => {
			commentContainer.scrollIntoView({behavior: 'smooth', block: 'end'});
		}, 400);
	}
	else{
		var commentsPanelContent = document.querySelector('.comments-panel-content');
		var commentContainer = Object.assign(document.createElement('div'), {
			className: 'comment-container',
			innerHTML:
			`<div class='comment-card'>
				<div class="comment-card-content">
					<div class="comment-details">
						<span class="comment-name">
							` + name + `
						</span>
						<span class="comment-time">
							` + date + `
						</span>
					</div>
					<div class="comment-body">
						` + comment +`
					</div>
				</div>
			</div>`
		});
		commentsPanelContent.appendChild(commentContainer);
	}
}

function addComment(comment){
	loadingIndicator();
	var formattedComment = '[' + userInitials + '] ' + comment;
	var request = new XMLHttpRequest();
	request.open('POST', 'private-a1d8aa-textline.apiary-proxy.com/api/conversation/' + uuid + '.json?access_token=' + key);
	request.setRequestHeader('Content-Type', 'application/json');
	request.onreadystatechange = function () {
		if (this.readyState === 4) {
			console.log('Status:', this.status);
			console.log('Headers:', this.getAllResponseHeaders());
			console.log('Body:', this.responseText);
			loadComments(key, phone_number, true);
		}
	};
	var body = {
		'whisper': {
			'body': formattedComment
		}
	};
	request.send(JSON.stringify(body));
}
