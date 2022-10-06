function initIndexPage() {
    //加载顶部导航栏
    $("#header").load("common/header.html", function (responseText, textStatus, XMLHttpRequest) {
        mdui.mutation();
    });
    //加载左侧菜单栏
    $("#leftmenu").load("common/leftmenu.html", function (responseText, textStatus, XMLHttpRequest) {
        mdui.mutation();
    });

    var localStorge = window.localStorage;
    var nightmode = localStorge.getItem("nightmode");
    if (nightmode != null) {
        if (nightmode === "1") {
            mdui.$('body').addClass('mdui-theme-layout-dark');
        } else {
            mdui.$('body').removeClass('mdui-theme-layout-dark');
        }
    } else {
        mdui.$('body').removeClass('mdui-theme-layout-dark');
    }
}

function toggleNightMode() {
    var localStorge = window.localStorage;
    var nightmode = localStorge.getItem("nightmode");
    var newmode = "0";
    if (nightmode != null) {
        if (nightmode === "0") {
            mdui.$('body').addClass('mdui-theme-layout-dark');
            newmode = "1";
        } else {
            mdui.$('body').removeClass('mdui-theme-layout-dark');
            newmode = "0";
        }
    } else {
        mdui.$('body').addClass('mdui-theme-layout-dark');
        newmode = "1";
    }
    localStorge.setItem("nightmode", newmode);
}

function logout() {
    $.removeCookie("token", {path: "/"});
    window.location.href = "login.html";
}

function toBackendIndex() {
    window.location.href = "backend.html";
}

function toVPSlist() {
    window.location.href = "vpslist.html";
}

function toShop(){
    window.location.href = "/index.html";
}

function toOrderPage(){
    window.location.href = "/order.html";
}
