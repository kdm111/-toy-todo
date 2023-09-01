async function login () {
  const form = document.forms["loginForm"]
  const data = {
    userid : form.userid.value,
    pw : form.password.value
  }
  try {
    const response = await axios({
      method : "post",
      url : "/login/user",
      data : data
    })
    // location.href = `/user/${response.data.id}`
    location.href = `/todo/main/`
  } catch {
    alert (`아이디 혹은 비밀번호를 확인해주세요`)
  }
}

