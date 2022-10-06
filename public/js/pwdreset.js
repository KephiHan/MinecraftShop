var num = 120;
var interval_id;
var sendvcodebtn = $("#btn_sendvcode");
var confirmbtn = $("#btn_confirm");
var confirmbtnicon = $("#btn_icon");
var confirmbtnloading = $("#btn_loading");
var vcodebtn = $("#btn_sendvcode");
var vcodelabel = $("#label_getvcode");

confirmbtnloading.hide();

function getCpwdVcode(){
    if($("#email").val().length <= 0){
        $("#errmsg").text("请填写Email");
        return;
    }
    sendvcodebtn.attr("disabled",true);
    let email = $("#email").val();
    //用ajax向服务器请求数据
    $.ajax({
        type: "POST",
        url: "/user/getcpwdvcode",
        data: {
            email : email
        },
        async: true,//异步
        dataType: "json",
        success: function (data, status) {
            if (status === "success") {//post 成功
                if (data.resultcode === "100") {
                    sendedVcode();
                }else{//ERR
                    alert(data.message);
                    sendvcodebtn.removeAttr("disabled");
                }
            } else {
                alert(status + "\n" + data);
                sendvcodebtn.removeAttr("disabled");
            }
        },
        error: function (xmlhr, msg) {
            alert(msg);
            sendvcodebtn.removeAttr("disabled");
        }
    });
    // sendedVcode();
}

function sendedVcode(){
    $("#errmsg").text("请查阅您的邮箱");
    num = 120;
    interval_id = setInterval("flushVcodeBtn()",1000);
}

function flushVcodeBtn(){
    num--;
    if(num > 0){
        $("#label_getvcode").text("重新发送(" + num + "s)");
        sendvcodebtn.attr("disabled",true);
    }else{
        clearInterval(interval_id);
        sendvcodebtn.removeAttr("disabled");
        $("#label_getvcode").text("重新发送");
    }
}

function confirmCpwd(){
    if(!checkCpwdInfo()){
        return;
    }
    let email = $("#email").val();
    let pwd = $("#pwd").val();
    let vcode = $("#vcode").val();
    btn_confirm_inloading();
    //用ajax向服务器请求数据
    $.ajax({
        type: "POST",
        url: "/user/confirmpwdvcode",
        data: {
            email : email,
            vcode : vcode,
            newpwd : pwd
        },
        async: true,//异步
        dataType: "json",
        success: function (data, status) {
            if (status === "success") {//post 成功
                if (data.resultcode === "100") {
                    alert("密码重置已完成");
                    btn_confirm_recovery();
                }else{//ERR
                    alert(data.message);
                    btn_confirm_recovery();
                }
            } else {
                alert(status + "\n" + data);
                btn_confirm_recovery();
            }
        },
        error: function (xmlhr, msg) {
            alert(msg);
            btn_confirm_recovery();
        }
    });
}

function checkCpwdInfo(){
    let errmsg = $("#errmsg");
    if($("#email").val().length <= 0){
        errmsg.text("Email不能为空");
        return false;
    }
    let pwd1 = $("#pwd").val();
    let pwd2 = $("#pwd2").val();
    // console.log(pwd1);
    // console.log(pwd2);
    if(pwd1.length < 8){
        errmsg.text("密码长度至少8位");
        return false;
    }
    if(pwd1 !== pwd2){
        errmsg.text("密码不一致");
        return false;
    }
    if($("#vcode").val().length < 6){
        errmsg.text("请正确填写验证码");
        return false;
    }
    return true;
}

function btn_confirm_inloading(){
    confirmbtn.attr("disabled",true);
    confirmbtnloading.show();
    confirmbtnicon.hide();
}

function btn_confirm_recovery(){
    confirmbtn.removeAttr("disabled");
    confirmbtnloading.hide();
    confirmbtnicon.show();
}