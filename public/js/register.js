var inputsarr_vcode = $("input[name='vaildcode']");

$(document).ready(function () {

//隐藏loading动画div
    $("#submit_btn_loading").hide();
//按钮绑定
    $("#vcode-identify").click(vcode_identify);
//禁用验证码下一步按钮
    btn_vcode_disable();
    refulsh_btn_vcode();
//为6验证码框绑定值改变事件，实时检测是否都输入了
    inputsarr_vcode.bind('input propertychange', refulsh_btn_vcode);
    $("#submit_btn").click(registration);
    $("input[name='vaildcode']").keyup(function (event) {
        // 删除往前 添加往后
        if ($(this).index() < 6) {
            if (event.keyCode === 46 || event.keyCode === 8) {
                $(this).prev('input').focus();
            } else {
                $(this).next('input').focus();
            }
        }
    });
})

//注册操作
function registration() {
    //有效性检查
    let uname = $("#reg-username").val();
    let pwd1 = $("#reg-pwd").val();
    let pwd2 = $("#reg-pwd2").val();
    let email = $("#reg-email").val();
    if (uname.length < 6 || uname.length > 10) {
        alert("用户名长度不符合要求（6-10位）");
        return;
    }
    //用户名中文过滤
    let allowed_chars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_";
    for (let i = 0; i < uname.length; i++) {
        if (allowed_chars.indexOf(uname[i]) === -1) {
            alert("用户名不符合要求（字母数字下划线）");
            return;
        }
    }
    if (pwd1.length < 6 || pwd1.length > 16) {
        alert("密码长度不符合要求（6-16位）");
        return;
    }
    if (pwd1 !== pwd2) {
        alert("两次密码不相符");
        return;
    }
    if (email === "") {
        alert("邮箱必填");
        return;
    }
    //按钮标题loading效果
    btn_reg_inloading();
    //为弹出层设置数据
    $("#regmodal-email").text(email);
    // $("#RegModal").modal({backdrop: 'static', keyboard: false});
    postRegister();
}


//ajax提交post请求
function postRegister() {
    let uname = $("#reg-username").val();
    let pwd = $("#reg-pwd").val();
    let email = $("#reg-email").val();

    $.ajax({
        type: "POST",
        url: "Register",
        data: {
            username: uname,
            password: pwd,
            email: email
        },
        async: true,//异步
        dataType: "text",
        success: function (data, status) {
            if (status !== "success") {
                alert("请求异常");
                return;
            }
            let rtobj = $.parseJSON(data);
            if (rtobj.resultcode === "100") {
                $("#RegModal").modal({backdrop: 'static', keyboard: false});
            } else {
                alert(rtobj.message);
            }
            //按钮标题恢复正常显示
            btn_reg_recovery();
        },
        error: function (xmlhr, msg) {
            alert(msg);
            //按钮标题恢复正常显示
            btn_reg_recovery();
        }
    });
}

//验证码校验
function vcode_identify() {
    //拼接验证码
    let vcode = "";
    let email = $("#reg-email").val();
    for (let i = 0; i < inputsarr_vcode.length; i++) {
        vcode += inputsarr_vcode[i].value;
    }
    btn_vcode_disable();
    //ajax发送请求
    $.ajax({
        type: "POST",
        url: "Register/finishReg",
        data: {
            email: email,
            vcode: vcode
        },
        async: true,//异步
        dataType: "text",
        success: function (data, status) {
            if (status !== "success") {
                alert("请求异常");
                return;
            }
            let rtobj = $.parseJSON(data);
            if (rtobj.resultcode === "100") {
                alert("注册完成！");
                window.location.href = "/login.html";
            } else {
                alert(rtobj.message);
            }
            //按钮恢复正常
            btn_vcode_recovery();
        },
        error: function (xmlhr, msg) {
            alert(msg);
            //按钮标题恢复正常显示
            btn_vcode_recovery();
        }
    });
}

function refulsh_btn_vcode() {
    let cando = true;
    for (let i = 0; i < inputsarr_vcode.length; i++) {
        if (inputsarr_vcode[i].value.length !== 1) {
            cando = false;
        }
    }
    if (cando) {
        btn_vcode_recovery();
    } else {
        btn_vcode_disable();
    }
}

function btn_vcode_disable() {
    $("#vcode-identify").attr("disabled", true);
}

function btn_vcode_recovery() {
    $("#vcode-identify").removeAttr("disabled");
}

function btn_reg_inloading() {
    //修改按钮标题
    //隐藏勾
    $("#submit_btn_confirm").hide();
    //展示loading动画
    $("#submit_btn_loading").show();
    //DISABLE
    $("#submit_btn").attr("disabled", true);
}

function btn_reg_recovery() {
    //修改按钮标题
    //展示勾
    $("#submit_btn_confirm").show();
    //隐藏loading动画
    $("#submit_btn_loading").hide();
    //DISABLE
    $("#submit_btn").removeAttr("disabled");
}