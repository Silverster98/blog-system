const hardString = 'this is a hard string'

function submit() {
	console.log('begin post infor')
	const emailInput = document.getElementById('email')
	const pwInput = document.getElementById('password')

	if (emailInput.value === '' || emailInput.value === null) {
		alert('邮箱不能为空')
		return
	}

	if (pwInput.value === '' || pwInput.value === null) {
		alert('密码不能为空')
		return
	}

	const infor = {}
	infor.email = emailInput.value
	const pw = pwInput.value
	const timeStamp = (new Date()).getTime().toString()
	// console.log(timeStamp + pw + hardString)
	const hashHex = hex_sha1(timeStamp + pw + hardString)
	// const hashBase64 = b64_sha1(timeStamp + pw + hardString)
	// console.log(hashHex)
	// console.log(hashBase64)
	infor.verifyCode = window.btoa(timeStamp + hashHex)

	axios.post('/login/user', infor)
	.then((response) => {
		// console.log(response.data)
		if(response.data.answer === 'ok') {
			location.replace(response.data.url)
		} else {
			alert(response.data.answer)
			return
		}
	})
	.catch((err) => {
		alert('error')
		console.log(err)
	})

}

