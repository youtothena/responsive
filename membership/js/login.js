function login() {
    const form = document.login_form;
    const chkEmail = checkValidEmail(form);
    const chkPw = checkValidPassword(form);

    if (chkEmail) {
        document.getElementById('alert_email').innerText = "";
        form.email.style.border = '2px solid';
        form.email.style.borderColor = '#00D000';
    } else {
        form.email.style.border = '2px solid';
        form.email.style.borderColor = '#fdea77';
        document.getElementById('alert_email').style.color = '#aaa';
    }

    if (chkPw) {
        document.getElementById('alert_password').innerText = "";
        form.password.style.border = '2px solid';
        form.password.style.borderColor = '#00D000';
    } else {
        form.password.style.border = '2px solid';
        form.password.style.borderColor = '#fdea77';
        document.getElementById('alert_password').style.color = '#aaa';
    }
    if ( chkEmail && chkPw ) {
        console.log('complete. form.submit();');
    }
}

function checkValidEmail(form) {
    if (form.email.value == "") {
        document.getElementById('alert_email').innerText = "이메일을 입력해주세요.";
        return false;
    }

    const exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

    if (exptext.test(form.email.value) === false) {
        document.getElementById('alert_email').innerText = "이메일이 유효하지 않습니다.";
        return false;
    }
    return true;
}

function checkValidPassword(form) {
    if (form.password.value == "") {
        document.getElementById('alert_password').innerText = "비밀번호를 입력해주세요.";
        return false;
    }

    const pw = form.password.value;
    const num = pw.search(/[0-9]/g);
    const eng = pw.search(/[a-z]/ig);
    const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 6) {
        document.getElementById('alert_password').innerText = "비밀번호는 최소 6자 이상입니다.";
        return false;
    } else if (pw.search(/\s/) != -1) {
        document.getElementById('alert_password').innerText = "공백 없이 비밀번호를 입력해주세요.";
        return false;
    } else if (num < 0 && eng < 0 && spe < 0) {
        document.getElementById('alert_password').innerText = "비밀번호가 유효하지 않습니다.";
        return false;
    }
    return true;
}