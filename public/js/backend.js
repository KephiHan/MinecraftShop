$(document).ready(initIndexPage);
$(document).ready(getUserInfo);

function getUserInfo() {
    //用ajax向服务器请求数据
    $.ajax({
        type: "POST",
        url: "/user/info",
        data: {},
        async: true,//异步
        dataType: "json",
        success: function (data, status) {
            if (status === "success") {//post 成功 不出错
                if (data.resultcode === "100") {
                    let userobj = $.parseJSON(data.message);
                    displayUserInfoByVUE(userobj);
                } else if(data.resultcode === "103") {//No token
                    window.location.href = "/login.html";
                }else{//ERR
                    mdui.alert(data.message);
                }
            } else {
                mdui.alert(status + "\n" + data);
            }
        },
        error: function (xmlhr, msg) {
            mdui.alert(msg);
        }
    });
}

function displayUserInfoByVUE(user) {
    let userinfovueopts = {
        data() {
            return {
                user: user,
                loading: true
            }
        }
    }
    let userinfoapp = Vue.createApp(userinfovueopts);
    userinfoapp.component('userinfocard', {
        props: ['user'],
        template:
            `
        <div class="mdui-card mdui-ripple mdui-shadow-0 mdui-col-lg-4 mdui-col-md-6 mdui-col-xs-12">
                    <div class="mdui-card-header">
                        <i class="mdui-card-header-avatar mdui-icon material-icons">assignment_ind</i>
                        <div class="mdui-card-header-title">UserID</div>
                        <div class="mdui-card-header-subtitle">{{user.userid}}</div>
                    </div>
                </div>
                <div class="mdui-card mdui-ripple mdui-shadow-0 mdui-col-lg-4 mdui-col-md-6 mdui-col-xs-12">
                    <div class="mdui-card-header">
                        <i class="mdui-card-header-avatar mdui-icon material-icons">account_box</i>
                        <div class="mdui-card-header-title">用户名</div>
                        <div class="mdui-card-header-subtitle">{{user.username}}</div>
                    </div>
                </div>
                <div class="mdui-card mdui-ripple mdui-shadow-0 mdui-col-lg-4 mdui-col-md-6 mdui-col-xs-12">
                    <div class="mdui-card-header">
                        <i class="mdui-card-header-avatar mdui-icon material-icons">star</i>
                        <div class="mdui-card-header-title">注册时间</div>
                        <div class="mdui-card-header-subtitle">{{user.registertime}}</div>
                    </div>
                </div>
                <div class="mdui-card mdui-ripple mdui-shadow-0 mdui-col-lg-4 mdui-col-md-6 mdui-col-xs-12">
                    <div class="mdui-card-header">
                        <i class="mdui-card-header-avatar mdui-icon material-icons">touch_app</i>
                        <div class="mdui-card-header-title">上次登录</div>
                        <div class="mdui-card-header-subtitle">{{user.lastlogintime}}</div>
                    </div>
                </div>
                <div class="mdui-card mdui-ripple mdui-shadow-0 mdui-col-lg-4 mdui-col-md-6 mdui-col-xs-12">
                    <div class="mdui-card-header">
                        <button id="btn_topup" onclick="toTopUpPage()"
                                class="mdui-btn mdui-btn-dense mdui-float-right mdui-color-theme-accent mdui-ripple">充值
                        </button>
                        <i class="mdui-card-header-avatar mdui-icon material-icons">attach_money</i>
                        <div class="mdui-card-header-title">账户余额</div>
                        <div class="mdui-card-header-subtitle">
                            <div class="price-line">
                                <img class="price-pic" src="../images/mc/icon/gold_nugget.png" alt="金粒">
                                {{user.balanceGoldnugget}}
                                <img class="price-pic" src="../images/mc/icon/diamond.png" alt="钻石">
                                {{user.balanceDiamond}}
                                <img class="price-pic" src="../images/mc/icon/emerald.png" alt="绿宝石">
                                {{user.balanceEmerald}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mdui-card mdui-ripple mdui-shadow-0 mdui-col-lg-4 mdui-col-md-6 mdui-col-xs-12">
                    <div class="mdui-card-header">
                        <button id="btn_changebind_email" style="display: none"
                                class="mdui-btn mdui-btn-dense mdui-float-right mdui-color-theme-accent mdui-ripple">修改绑定
                        </button>
                        <i class="mdui-card-header-avatar mdui-icon material-icons">email</i>
                        <div class="mdui-card-header-title">绑定邮箱</div>
                        <div class="mdui-card-header-subtitle">{{user.email}}</div>
                    </div>
                </div>
                <div class="mdui-card mdui-ripple mdui-shadow-0 mdui-col-lg-4 mdui-col-md-6 mdui-col-xs-12">
                    <div class="mdui-card-header">
                        <button id="btn_changebind_qq" style="display: none"
                                class="mdui-btn mdui-btn-dense mdui-float-right mdui-color-theme-accent mdui-ripple">修改绑定
                        </button>
                        <i class="mdui-card-header-avatar mdui-icon material-icons">send</i>
                        <div class="mdui-card-header-title">绑定QQ</div>
                        <div class="mdui-card-header-subtitle">{{user.qq}}</div>
                    </div>
                </div>
                <div class="mdui-card mdui-ripple mdui-shadow-0 mdui-col-lg-4 mdui-col-md-6 mdui-col-xs-12">
                    <div class="mdui-card-header">
                        <button id="btn_changebind_phone" style="display: none"
                                class="mdui-btn mdui-btn-dense mdui-float-right mdui-color-theme-accent mdui-ripple">修改绑定
                        </button>
                        <i class="mdui-card-header-avatar mdui-icon material-icons">local_phone</i>
                        <div class="mdui-card-header-title">绑定手机</div>
                        <div class="mdui-card-header-subtitle">{{user.phone}}</div>
                    </div>
                </div>
                <div class="mdui-card mdui-ripple mdui-shadow-0 mdui-col-lg-4 mdui-col-md-6 mdui-col-xs-12">
                    <div class="mdui-card-header">
                        <button id="btn_changepwd" onclick="toChangePWDpage()"
                                class="mdui-btn mdui-btn-dense mdui-float-right mdui-color-theme-accent mdui-ripple">修改密码
                        </button>
                        <i class="mdui-card-header-avatar mdui-icon material-icons">fingerprint</i>
                        <div class="mdui-card-header-title">修改密码</div>
                    </div>
                </div>
        `,
        created() {
            this.loading = false;
        },
        mounted() {
            $("#loading").hide();
        }
    });
    userinfoapp.mount("#userinfo");
    mdui.mutation();
}

function toTopUpPage(){
    window.location.href = "/topup.html";
}

function toChangePWDpage(){
    window.location.href = "/pwdreset.html";
}