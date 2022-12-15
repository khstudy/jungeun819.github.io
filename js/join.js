
if(localStorage){
    console.log('Local Storage를 사용가능합니다.', localStorage);
}
if(sessionStorage){
    console.log('Session Storage를 사용가능합니다.', sessionStorage);
}

// window.addEventListener('load', () => {
//     renderMember();
// });

// 생성자
class Member {
    constructor(userId, pwd, userName, birthday, gender, phone){
        this.userId = userId;
        this.pwd = pwd;
        this.userName = userName;
        this.birthday = birthday;
        this.gender = gender;
        this.phone = phone;
    };
};

// 유효성 검사
document.join.addEventListener('submit', (e) => {
    let userId = document.getElementById("userId");
    let pwd = document.getElementById("pwd");
    let confmPwd = document.getElementById("confmPwd");
    let userName = document.getElementById("userName");
    let birthday = document.getElementById("birthday");
    let gender = document.getElementById("gender");
    let tel1 = document.getElementById("tel1");
    let tel2 = document.getElementById("tel2");
    let tel3 = document.getElementById("tel3");

    // 아이디 검사
    if (!regExpTest(/^[\w]{4,}@[\w]+(\.[\w]+){1,3}$/, userId, "이메일 형식에 어긋납니다."))
        return false;
    
    // 비밀번호 검사
    const regExpArr = [/^.{8,15}$/, /\d/, /[a-zA-Z]/, /[!@#&]/];

        for (let i = 0; i < regExpArr.length; i++) {
            if (!regExpTest(regExpArr[i], pwd, "비밀번호는 8~15자리 숫자/문자/특수문자를 포함해야합니다.")) 
                return false;
        };
    
    // 비밀번호 재확인
    if (!isEqualPwd()) 
        return false;
    
    // 이름 검사
    if (!regExpTest(/^[가-힣]{2,}$/, userName, "한글2글자이상 입력하세요."))
        return false;

    // 전화번호 검사
    if (!regExpTest(/^0\d{1,2}$/, tel1, "번호 2자리 이상 입력")) 
        return false;
    if (!regExpTest(/^[0-9]{3,4}$/, tel2, "번호 3자리 이상 입력"))
        return false;
    if (!regExpTest(/^[0-9]{4}$/, tel3, "4자리 번호 입력"))
        return false;

    return true;
});

// 비밀번호 재확인
function isEqualPwd() {
    if (pwd.value === confmPwd.value) {
        return true;
    } 
    else {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    };
};

function regExpTest(regExp, el, msg) {
    if (regExp.test(el.value)) return true;
    alert(msg);
    el.value = "";
    el.focus();
    return false;
};

// 폼제출
const saveMember = () => {
    let phone = tel1.value + tel2.value + tel3.value;
    console.log(phone);
    // Member 객체 생성
    const member = new Member(userId.value, pwd.value, userName.value, birthday.value, gender.value, phone);
    console.log(member);

    // 배열에 추가
    const members = JSON.parse(localStorage.getItem('members')) || [];
    members.push(member);
    console.log(members);

    // localstorage에 저장
    localStorage.setItem('members', JSON.stringify(members));

    document.join.reset(); // 왜 안되는걸까..?
    renderMember(members);
};

const renderMember = (members = JSON.parse(localStorage.getItem('members'))) => {
    const tbody = document.querySelector(".memberList tbody");
    tbody.innerHTML = "";

    members?.reverse();

    if(members){
        members.forEach(({userId, userName, birthday, gender, phone}, index) => {
           tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${userId}</td>
                <td>${userName}</td>
                <td>${birthday}</td>
                <td>${gender}</td>
                <td>${phone}</td>
            </tr>`; 
        });
    }
    else {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">회원이 없습니다.</td></tr>`;
    }
}

// 실패,,,
// const listPopup = document.querySelector("#list");
// const listBtn = document.querySelector(".listBtn")

// function showMember() {
//     listPopup.classList.toggle("show-list");
// }

// listBtn.onclick = () => {
//     showMember();
// }

