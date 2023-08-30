async function login () {
  const form = document.forms["loginForm"]
  const data = {
    userid : form.userid.value,
    pw : form.password.value
  }
  const response = await axios({
    method : "post",
    url : "/login/user",
    data : data
  })
  if (response.status === 200) {
    location.href = `/user/1`
  } else {
    alert (`아이디 혹은 비밀번호를 확인해주세요`)
  }
}

