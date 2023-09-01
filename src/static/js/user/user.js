function editUser() {
  if (confirm("회원정보를 수정하시겠습니까?")) {
    const form = document.forms["userForm"]
    const data = {
      userid : form.userid.value,
      name : form.name.value,
      pw : form.password.value
    }
    axios({
      method : "put",
      url : "/user",
      data : data
    })
    .then(() => {
      alert("회원정보 수정이 완료되었습니다.") 
    })
  }
}
function deleteUser() {
  if (confirm("탈퇴하시겠습니까?")) {
    const form = document.forms["userForm"]
    const data = {
      userid : form.userid.value
    }
    axios({
      method : "delete",
      url : "/user",
      data : data
    })
    .then(() => {
      alert("탈퇴되었습니다.")
      location.href = "/"
    })
  }
}