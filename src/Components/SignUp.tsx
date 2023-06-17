import React from 'react'

export default function SignUp() {
	
	const signupclick = () => {
		console.log("clicked");
		const form = document.getElementById("signupform");
		if(form !== null) {
			const formStyle = form.style;
			formStyle.display = "block";
		}

	}

	const submitform = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = document.getElementById("signupform");
		if(form !== null) {
			const formStyle = form.style;
			formStyle.display = "none";
			alert("Thank you for subscribing to our newsletter")
		}
	}

	const closeclick = () => {
		const form = document.getElementById("signupform");
		if(form !== null) {
			const formStyle = form.style;
			formStyle.display = "none";
		}	
	}

	const signupformstyle = {
		display: "none",
		height: "80%",
		maxHeight: "70%",
		width: "80%",
		position: "fixed" as "fixed", /* Stay in place */
		zIndex: "1", /* Sit on top */
		left: "4em",
		top: "6rem",
		background: "whitesmoke",
		padding: "20px 30px",

	}

	const defaultvalue = {
		marginRight: "10px",
		marginLeft: "4px",
	}

	const maincontainer = {
		display: "flex",
		flexDirection: "column" as "column",
		marginBottom: "10px"
	}


	return (
		<>
			<div onClick={signupclick}>Subscribe to Our Newsletter</div>
			<form onSubmit={submitform} style={signupformstyle} id='signupform'>
				<span onClick={closeclick}>X</span>
				<h1>Sign Up for our monthly newsletter</h1>
				<p>Signing up for a monthly newsletter is a great way to stay connected with a brand, business or organization. By subscribing to a newsletter, you will receive regular updates and news about their products, services, events and promotions. This helps you to stay informed and up to date with the latest developments, and also provides you with valuable insights and information that may benefit you in some way. Additionally, newsletters often contain exclusive content, such as special offers, discounts and giveaways, which are only available to subscribers. Overall, by signing up for a monthly newsletter, you can deepen your relationship with a brand or organization and stay in the loop about their latest news and offerings.</p>
				<div style={maincontainer}>
					<span style={defaultvalue}>First Name</span><input type='text'/>
					<span style={defaultvalue}>Last Name</span><input type='text'/>
					<span style={defaultvalue}>Email</span><input type='text'/>
				</div>
				<p><input type='checkbox'/>By submitting your email address, you are agreeing to receive monthly newsletters from us via email. Our newsletters will contain updates about our products, services, events, and promotions, as well as exclusive content that is only available to our subscribers. You can unsubscribe from our newsletter at any time by clicking on the unsubscribe link provided in each email. Please note that we will not share or sell your email address to any third party. Your email address will only be used by us to send you our newsletter.</p>
				<input type='submit'/>
			</form>
		</>
	)

}
