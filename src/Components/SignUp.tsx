import React from 'react'

export default function SignUp() {

	const signupclick = () => {
		console.log("clicked");

	}

	const signupformstyle = {
		display: "none"
	}

	return (
		<>
			<div onClick={signupclick}>SignUp</div>
			<form style={signupformstyle}></form>
		</>
	)

}
