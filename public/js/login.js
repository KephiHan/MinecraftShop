$("#btn_login").click(doLogin);
$("#login_btn_loading").hide();



function doLogin(){
    btn_login_inloading();
    let uname = $("#uname").val();
    let pwd = $("#pwd").val();

    if(uname === "" || pwd === ""){
        alert("用户名或密码不能为空");
        btn_login_recovery();
        return;
    }

    //ajax发送请求
    $.ajax({
        type: "POST",
        url: "Login",
        data: {
            username: uname,
            password: pwd
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
                $.cookie(
                    'token',
                    rtobj.message,
                    {
                        domain:'.dabaiyun.net',
                        path:'/',
                        expires:1
                    }
                );
                window.location.href = "/backend.html";
            } else {
                alert(rtobj.message);
            }
            //按钮恢复正常
            btn_login_recovery();
        },
        error: function (xmlhr, msg) {
            alert(msg);
            //按钮标题恢复正常显示
            btn_login_recovery();
        }
    });
}

function btn_login_inloading(){
    $("#btn_login").attr("disabled",true);
    $("#login_btn_loading").show();
    $("#login_btn_icon").hide();
}

function btn_login_recovery(){
    $("#btn_login").removeAttr("disabled");
    $("#login_btn_loading").hide();
    $("#login_btn_icon").show();
}