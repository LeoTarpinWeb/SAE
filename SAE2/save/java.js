const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const masc = document.querySelector('.masc');

signUpButton.addEventListener('click', () => {
	signUpButton.disabled = true;
	signInButton.disabled = true;
	container.classList.add("right-panel-active");
	masc.classList.toggle("left");
	signInButton.classList.toggle("left");	
	setTimeout(() => {
		masc.style.left=('15vw');
		masc.style.right=('');
		signInButton.classList.toggle("left");
		masc.classList.toggle("left");
		signUpButton.disabled = false;
		signInButton.disabled = false;
		
	}, 600);
});

signInButton.addEventListener('click', () => {
	signUpButton.disabled = true;
	signInButton.disabled = true;
	container.classList.remove("right-panel-active");
	masc.classList.toggle("right");
	signUpButton.classList.toggle("right");
	setTimeout(() => {
		masc.style.left=('');
		masc.style.right=('15vw');
		masc.classList.toggle("right");
		signUpButton.classList.toggle("right");
		signUpButton.disabled = false;
		signInButton.disabled = false;
		
	}, 600);
});