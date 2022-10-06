$(document).ready(initIndexPage);

function getCDROMList(){
    //用ajax向服务器请求数据
    $.ajax({
        type: "POST",
        url: "/vps/cdrom",
        data: {},
        async: true,//异步
        dataType: "json",
        success: function (data, status) {
            if (status === "success") {//post 成功 不出错
                if (data.resultcode === "100") {
                    let cdromarr = $.parseJSON(data.message);
                    displayCDROMByVue(cdromarr)
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

function displayCDROMByVue(cdromarray){
    let cdromvueopts = {
        data(){
            return{
                cdroms: cdromarray,
                vmid: window.sessionStorage.getItem("vmid")
            }
        },
        mounted(){
            mdui.mutation();
        }
    }

    let cdromapp = Vue.createApp(cdromvueopts);

    cdromapp.component('isofileradio',{
        props:['isofile'],
        data(){
            return {
                isoid : this.isofile.isoid,
                oslogofilepath : "images/oslogo/Windows.svg"
            }
        },
        template:
            `
        <label class="mdui-list-item mdui-ripple">
            <img class="mdui-list-item-icon mdui-icon" 
                 v-bind:src="oslogofilepath">
            <div class="mdui-list-item-content">[{{isofile.displayostype}}] {{isofile.displayname}}</div>
            <div class="mdui-radio">
                <input type="radio" name="iso" v-bind:value="this.isoid"/>
                <i class="mdui-radio-icon"></i>
            </div>
        </label>
        `,
        created(){
            oslogofilerootpath = "images/oslogo/";
            ostype = this.isofile.displayostype;
            switch (ostype){
                case "CentOS":{
                    this.oslogofilepath = oslogofilerootpath + "CentOS.svg";
                    break;
                }
                case "Debian":{
                    this.oslogofilepath = oslogofilerootpath + "Debian.svg";
                    break;
                }
                case "Fedora":{
                    this.oslogofilepath = oslogofilerootpath + "Fedora.webp";
                    break;
                }
                case "FydeOS":{
                    this.oslogofilepath = oslogofilerootpath + "FydeOS.png";
                    break;
                }
                case "Deepin":{
                    this.oslogofilepath = oslogofilerootpath + "Deepin.png";
                    break;
                }
                case "Ubuntu":{
                    this.oslogofilepath = oslogofilerootpath + "Ubuntu.svg";
                    break;
                }
                case "UOS":{
                    this.oslogofilepath = oslogofilerootpath + "UOS.png";
                    break;
                }
                case "Windows":{
                    this.oslogofilepath = oslogofilerootpath + "Windows.svg";
                    break;
                }
                default :{
                    this.oslogofilepath = oslogofilerootpath + "Linux.png";
                    break;
                }
            }
        }
    });
    cdromapp.mount("#cdromlist");
}

function setCDROM(){
    let radios = $("input[name='iso']:checked");
    if(radios.length === 0){
        mdui.alert("请选择一个镜像","错误");
        return;
    }
    let isoid = radios[0].value;
    let vmid = window.localStorage.getItem("vmid");
    //用ajax向服务器请求数据
    if(vmid === undefined || vmid === ""){
        mdui.alert("Param ERROR");
        return;
    }
    $.ajax({
        type: "POST",
        url: "/vps/setcdrom",
        data: {
            vmid: vmid,
            isoid: isoid
        },
        async: true,//异步
        dataType: "json",
        success: function (data, status) {
            if (status === "success") {//post 成功 不出错
                if (data.resultcode === "100") {
                    mdui.alert("更换成功","更换虚拟光盘镜像");
                    window.location.href = "/vpsinfo.html";
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