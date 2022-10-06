$(document).ready(initIndexPage);

function getVPSList() {
    //用ajax向服务器请求数据
    $.ajax({
        type: "POST",
        url: "/vps/list",
        data: {},
        async: true,//异步
        dataType: "json",
        success: function (data, status) {
            if (status === "success") {//post 成功 不出错
                if (data.resultcode === "100") {
                    let vpslistarray = $.parseJSON(data.message);
                    displayVPSListByVUE(vpslistarray);
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

function displayVPSListByVUE(vpslistarray) {
    let vpslistvueopts = {
        data() {
            return {
                vpslist: vpslistarray
            }
        }
    }
    let vpslistapp = Vue.createApp(vpslistvueopts);
    vpslistapp.component('vpslistcard', {
        props: ["vps"],
        data() {
            return {
                vmid: this.vps.vmid,
                oslogofilepath: "images/oslogo/Windows.svg"
            }
        },
        template:
            `
        <div class="vpslist-vpscard mdui-col-lg-4 mdui-col-md-6 mdui-col-xs-12">
            <div class="mdui-card mdui-ripple-light-blue" >
                <div class="mdui-card-header">
                    <img class="mdui-card-header-avatar" v-bind:src="oslogofilepath">
                    <div class="mdui-card-header-title">
                        <div>
                            VPS-{{vps.vmid}}
                        </div>
                    </div>
                    <div class="mdui-card-header-subtitle">
                        {{vps.vcpus}}核 
                        {{vps.maxmem/1024/1024/1024}}G 
                        {{vps.bandwitdh==""?0:vps.bandwitdh}}M 
                        {{vps.timelinitdate}} 
                        {{vps.vpsstatu}}
                    </div>
                </div>
                <div class="mdui-card-actions">
                    <div class="vpslist-statu mdui-float-left">
                        <div class="vpslist-statu-icon"
                        v-bind:class="{'vpslist-statu-run':vps.running,'vpslist-statu-stop':!vps.running}"
                        ></div>
                        <div class="vpslist-statu-text">
                            {{vps.running?'运行中':'已停止'}}
                        </div>
                    </div>
                    <div class="mdui-float-right">
                        <button class="mdui-btn mdui-ripple"
                            v-on:click="toInfoPage"
                        >详情</button>
                    </div>
                </div>
            </div>
        </div>
        `,
        methods: {
            toInfoPage: function () {
                let vmid = this.vmid;
                window.localStorage.setItem("vmid", vmid);
                window.location.href = "vpsinfo.html";
            }
        },
        created() {
            let oslogofilerootpath = "images/oslogo/";
            ostype = this.vps.displayostype;
            switch (ostype) {
                case "CentOS": {
                    this.oslogofilepath = oslogofilerootpath + "CentOS.svg";
                    break;
                }
                case "Debian": {
                    this.oslogofilepath = oslogofilerootpath + "Debian.svg";
                    break;
                }
                case "Fedora": {
                    this.oslogofilepath = oslogofilerootpath + "Fedora.webp";
                    break;
                }
                case "FydeOS": {
                    this.oslogofilepath = oslogofilerootpath + "FydeOS.png";
                    break;
                }
                case "Deepin": {
                    this.oslogofilepath = oslogofilerootpath + "Deepin.png";
                    break;
                }
                case "Ubuntu": {
                    this.oslogofilepath = oslogofilerootpath + "Ubuntu.svg";
                    break;
                }
                case "UOS": {
                    this.oslogofilepath = oslogofilerootpath + "UOS.png";
                    break;
                }
                case "Windows": {
                    this.oslogofilepath = oslogofilerootpath + "Windows.svg";
                    break;
                }
                default : {
                    this.oslogofilepath = oslogofilerootpath + "Linux.png";
                    break;
                }
            }
        }
    });
    vpslistapp.mount("#vpslist");
    mdui.mutation();
}