async function signup() {
  const form = document.forms["signupForm"]
  const data = {
    userid : form.userid.value,
    name : form.name.value,
    pw : form.password.value
  }
  await axios({
    method : "post",
    url : "/create/user",
    data : data
  })
  .then((response) => {
    alert("회원가입을 환영합니다.")
    location.href = `/user/${response.data.user[0].id}`
  })
}


async function checkUserId() {
  const form = document.forms["signupForm"]
  const data = {
    userid : form.userid.value
  }
  const result = await axios({
    method : "post",
    url : "/check/userid",
    data : data
  })
  const checkUserIdResult = document.querySelector("#checkUserIdResult")
  if (!result.data.value) {
    checkUserIdResult.innerHTML = "사용가능한 아이디입니다.<br>"
  } else {
    checkUserIdResult.innerHTML = "사용불가능한 아이디입니다.<br>"
  }
}
