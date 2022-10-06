$(document).ready(initIndexPage);

var getted = false;

function createRenewalRequest(){
    mdui.alert("正在创建续费订单，请稍后.....","续费订单");

    let vmid = window.localStorage.getItem("vmid");
    let durmode = $("input[name='rdr']:checked").val();
    if(vmid === undefined || vmid === null){
        mdui.alert("Param ERROR");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/order/renewal/natvps/create",
        data: {
            vmid: vmid,
            durmode: durmode
        },
        async: true,//异步
        dataType: "json",
        success: function (data, status) {
            if (status === "success") {//post 成功 不出错
                if (data.resultcode === "100") {
                    window.location.href = "/order.html";
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

function openRenewalDialog(){
    if(getted){
        let dialog = new mdui.Dialog("#renewNatVpsDialog");
        dialog.open();
    }else{
        getRenewalOrderData();
    }
}

function getRenewalOrderData(){
    let d = {};
    let vmid = window.localStorage.getItem("vmid");
    if(vmid === undefined || vmid === ""){
        mdui.alert("Param ERROR");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/order/renewal/natvps/getprice",
        data: {
            vmid: vmid
        },
        async: true,//异步
        dataType: "json",
        success: function (data, status) {
            if (status === "success") {//post 成功 不出错
                if (data.resultcode === "100") {
                    displayRenewalData($.parseJSON(data.message));
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

function displayRenewalData(p){
    let moneytypepicpath = "images/mc/icon/diamond.png";
    let moneytypetext = "钻石";
    let picfilerootpath = "images/mc/icon/";
    switch (p.moneytype){
        case 0:{
            moneytypepicpath = picfilerootpath + "gold_nugget.png";
            moneytypetext = "金粒";
            break;
        }
        case 1:{
            moneytypepicpath = picfilerootpath + "diamond.png";
            moneytypetext = "钻石";
            break;
        }
        case 2:{
            moneytypepicpath = picfilerootpath + "emerald.png";
            moneytypetext = "绿宝石";
            break;
        }
        default:{
            moneytypepicpath = picfilerootpath + "emerald.png";
            moneytypetext = "绿宝石";
            break;
        }
    }

    let pname = $("#pname");
    let price_month = $("#price_month");
    let price_season = $("#price_season");
    let price_pic_mon = $("#price_pic_mon");
    let price_pic_sea = $("#price_pic_sea");

    pname.text(p.module + " " + p.no);
    price_month.text(p.priceMonth);
    price_season.text(p.priceSeason);
    price_pic_mon.attr("src",moneytypepicpath);
    price_pic_mon.attr("alt",moneytypetext);
    price_pic_sea.attr("src",moneytypepicpath);
    price_pic_sea.attr("alt",moneytypetext);

    getted = true;

    let dialog = new mdui.Dialog("#renewNatVpsDialog");
    dialog.open();
}

function displayRenewalDataByVUE(product){
    let renewalopts = {
        data(){
            return{
                p : product,
                moneytypepicpath : "images/mc/icon/diamond.png",
                moneytypetext : "钻石"
            }
        },
        created(){
            let picfilerootpath = "images/mc/icon/";
            switch (this.p.moneytype){
                case 0:{
                    this.moneytypepicpath = picfilerootpath + "gold_nugget.png";
                    this.moneytypetext = "金粒";
                    break;
                }
                case 1:{
                    this.moneytypepicpath = picfilerootpath + "diamond.png";
                    this.moneytypetext = "钻石";
                    break;
                }
                case 2:{
                    this.moneytypepicpath = picfilerootpath + "emerald.png";
                    this.moneytypetext = "绿宝石";
                    break;
                }
                default:{
                    this.moneytypepicpath = picfilerootpath + "emerald.png";
                    this.moneytypetext = "绿宝石";
                    break;
                }
            }
        },
        mounted(){
            mdui.mutation();
        }
    }

    let renewapp = Vue.createApp(renewalopts);

    renewapp.mount("#renewNatVpsDialog");

    let dialog= new mdui.Dialog("#renewNatVpsDialog");
    dialog.open();
}

function getVNC(){
    //用ajax向服务器请求数据
    let vmid = window.localStorage.getItem("vmid");
    if(vmid === undefined || vmid === ""){
        mdui.alert("Param ERROR");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/vps/vnc",
        data: {
            vmid: vmid
        },
        async: true,//异步
        dataType: "json",
        success: function (data, status) {
            if (status === "success") {//post 成功 不出错
                if (data.resultcode === "100") {
                    let vnc = $.parseJSON(data.message);
                    startVNC(vnc);
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

function startVNC(vnc){
    $.cookie(
        'PVEAuthCookie',
        vnc.pveauthcookie,
        {
            domain:'.dabaiyun.net',
            path:'/',
            expires:1
        }
    );
    window.open(vnc.url,"_blank");
}

function getVPSInfo() {
//用ajax向服务器请求数据
    let vmid = window.localStorage.getItem("vmid");
    if(vmid === undefined || vmid === ""){
        mdui.alert("Param ERROR");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/vps/info",
        data: {
            vmid: vmid
        },
        async: true,//异步
        dataType: "json",
        success: function (data, status) {
            if (status === "success") {//post 成功 不出错
                if (data.resultcode === "100") {
                    let vps = $.parseJSON(data.message);
                    displayVPSInfoByVUE(vps);
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

function displayVPSInfoByVUE(vps) {
    let vpsinfovueopts = {
        methods: {
            transformByteToStr:(bytes)=>{
                let str;
                if(bytes < Math.pow(1024,1)){
                    // console.log("<1k");
                    str = bytes + " B";
                    return str;
                }
                if(bytes < Math.pow(1024,2)){
                    // console.log("<1m");
                    str = (bytes/Math.pow(1024,1)).toFixed(2) + " KB";
                    return str;
                }
                if(bytes < Math.pow(1024,3)){
                    // console.log("<1g");
                    str = (bytes/Math.pow(1024,2)).toFixed(2) + " MB";
                    return str;
                }
                if(bytes < Math.pow(1024,4)){
                    // console.log("<1t");
                    str = (bytes/Math.pow(1024,3)).toFixed(2) + " GB";
                    return str;
                }
                if(bytes < Math.pow(1024,5)){
                    // console.log("<1p");
                    str = (bytes/Math.pow(1024,4)).toFixed(2) + " TB";
                    return str;
                }
            }
        },
        data(){
            return{
                vps: vps
            }
        },
        mounted(){
            setCPUPercentValue(this.vps.cpuusage*100);
            setRAMPercentValue((this.vps.nowmem/this.vps.maxmem)*100);
            autoFillNet();
            autoFillDisk();
            mdui.mutation();
        }
    }
    let vpsinfoapp = Vue.createApp(vpsinfovueopts);
    vpsinfoapp.mount("#vpsinfo");
    $("#vpsinfo").removeAttr("hidden");
}

function toCDROMPage(){
    window.location.href = "vpscdrom.html";
}

function setCPUPercentValue(value) {
    var leftContent = document.getElementById("left-content-cpu");
    var rightContent  = document.getElementById("right-content-cpu");
    var textCircle  = document.getElementById("text-circle-cpu");

    var angle = 0;

    var timerId = setInterval(function(){
        angle += 1;
        if(angle > value*3.6){
            clearInterval(timerId);
        }else{
            if(angle > 180){
                rightContent.setAttribute('style', 'transform: rotate('+(angle-180)+'deg)');
            }else{
                leftContent.setAttribute('style', 'transform: rotate('+angle+'deg)');
            }
            textCircle.innerHTML = parseInt(angle*100/360) +'%';
        }
    },15);
}

function setRAMPercentValue(value) {
    var leftContent  = document.getElementById("left-content-ram");
    var rightContent  = document.getElementById("right-content-ram");
    var textCircle   = document.getElementById("text-circle-ram");

    var angle = 0;

    var timerId = setInterval(function(){
        angle += 1;
        if(angle > value*3.6){
            clearInterval(timerId);
        }else{
            if(angle > 180){
                rightContent.setAttribute('style', 'transform: rotate('+(angle-180)+'deg)');
            }else{
                leftContent.setAttribute('style', 'transform: rotate('+angle+'deg)');
            }
            textCircle.innerHTML = parseInt(angle*100/360) +'%';
        }
    },15);
}

function autoFillNet(){
    let leftContent  = document.getElementById("autofill-left-content-net");
    let rightContent  = document.getElementById("autofill-right-content-net");
    // let textCircle   = document.getElementById("autofill-text-circle-net");

    let angle = 0;

    let timerId = setInterval(function(){
        angle += 1;
        if(angle > 360){
            clearInterval(timerId);
        }else{
            if(angle > 180){
                rightContent.setAttribute('style', 'transform: rotate('+(angle-180)+'deg)');
            }else{
                leftContent.setAttribute('style', 'transform: rotate('+angle+'deg)');
            }
            // textCircle.innerHTML = parseInt(angle*100/360) +'%';
        }
    },15);
}

function autoFillDisk(){
    let leftContent  = document.getElementById("autofill-left-content-disk");
    let rightContent  = document.getElementById("autofill-right-content-disk");
    // let textCircle   = document.getElementById("autofill-text-circle-disk");

    let angle = 0;

    let timerId = setInterval(function(){
        angle += 1;
        if(angle > 360){
            clearInterval(timerId);
        }else{
            if(angle > 180){
                rightContent.setAttribute('style', 'transform: rotate('+(angle-180)+'deg)');
            }else{
                leftContent.setAttribute('style', 'transform: rotate('+angle+'deg)');
            }
            // textCircle.innerHTML = parseInt(angle*100/360) +'%';
        }
    },15);
}