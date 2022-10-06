
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

function toBackend(){
    let token = $.cookie('token');
    if(token === undefined || token === null || token === ""){
        window.location.href = "/login.html";
    }else{
        window.location.href = "/backend.html";
    }
}

function getNATVPSProdList(){

    let data = {"resultcode":"100","message":"[{\"productId\":1,\"module\":\"Xeon-E5\",\"no\":\"A\",\"title\":\"snowball\",\"priceMonth\":18.0,\"priceSeason\":42.0,\"vcpuNum\":1,\"ramMb\":2048,\"bandwitdh\":5,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":2,\"module\":\"Xeon-E5\",\"no\":\"B\",\"title\":\"arrow\",\"priceMonth\":36.0,\"priceSeason\":86.0,\"vcpuNum\":2,\"ramMb\":4096,\"bandwitdh\":5,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":3,\"module\":\"Xeon-E5\",\"no\":\"C\",\"title\":\"paper\",\"priceMonth\":54.0,\"priceSeason\":128.0,\"vcpuNum\":2,\"ramMb\":6144,\"bandwitdh\":5,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":4,\"module\":\"Xeon-E5\",\"no\":\"D\",\"title\":\"clock\",\"priceMonth\":61.0,\"priceSeason\":144.0,\"vcpuNum\":3,\"ramMb\":6144,\"bandwitdh\":5,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":5,\"module\":\"Xeon-E5\",\"no\":\"E\",\"title\":\"compass\",\"priceMonth\":42.0,\"priceSeason\":99.0,\"vcpuNum\":4,\"ramMb\":4096,\"bandwitdh\":5,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":6,\"module\":\"Xeon-E5\",\"no\":\"F\",\"title\":\"hopper\",\"priceMonth\":68.0,\"priceSeason\":159.0,\"vcpuNum\":4,\"ramMb\":6144,\"bandwitdh\":5,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":7,\"module\":\"Xeon-E5\",\"no\":\"G\",\"title\":\"furnace\",\"priceMonth\":82.0,\"priceSeason\":188.0,\"vcpuNum\":4,\"ramMb\":8192,\"bandwitdh\":10,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":8,\"module\":\"Xeon-E5\",\"no\":\"H\",\"title\":\"beacon\",\"priceMonth\":104.0,\"priceSeason\":239.0,\"vcpuNum\":4,\"ramMb\":12288,\"bandwitdh\":10,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":9,\"module\":\"Xeon-E5\",\"no\":\"I\",\"title\":\"chest\",\"priceMonth\":78.0,\"priceSeason\":182.0,\"vcpuNum\":6,\"ramMb\":6144,\"bandwitdh\":10,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":10,\"module\":\"Xeon-E5\",\"no\":\"J\",\"title\":\"rabbit\",\"priceMonth\":92.0,\"priceSeason\":210.0,\"vcpuNum\":6,\"ramMb\":8192,\"bandwitdh\":10,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":11,\"module\":\"Xeon-E5\",\"no\":\"K\",\"title\":\"chicken\",\"priceMonth\":106.0,\"priceSeason\":244.0,\"vcpuNum\":6,\"ramMb\":10240,\"bandwitdh\":10,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":12,\"module\":\"Xeon-E5\",\"no\":\"L\",\"title\":\"pig\",\"priceMonth\":119.0,\"priceSeason\":272.0,\"vcpuNum\":6,\"ramMb\":12288,\"bandwitdh\":10,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":13,\"module\":\"Xeon-E5\",\"no\":\"M\",\"title\":\"sheep\",\"priceMonth\":99.0,\"priceSeason\":229.0,\"vcpuNum\":8,\"ramMb\":8192,\"bandwitdh\":10,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":14,\"module\":\"Xeon-E5\",\"no\":\"N\",\"title\":\"cow\",\"priceMonth\":124.0,\"priceSeason\":294.0,\"vcpuNum\":8,\"ramMb\":12288,\"bandwitdh\":10,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":15,\"module\":\"Xeon-E5\",\"no\":\"O\",\"title\":\"ocelot\",\"priceMonth\":146.0,\"priceSeason\":345.0,\"vcpuNum\":8,\"ramMb\":16384,\"bandwitdh\":20,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":16,\"module\":\"Xeon-E5\",\"no\":\"P\",\"title\":\"horse\",\"priceMonth\":168.0,\"priceSeason\":399.0,\"vcpuNum\":8,\"ramMb\":20480,\"bandwitdh\":20,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":17,\"module\":\"Xeon-E5\",\"no\":\"Q\",\"title\":\"polar\",\"priceMonth\":184.0,\"priceSeason\":435.0,\"vcpuNum\":8,\"ramMb\":24576,\"bandwitdh\":20,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1},{\"productId\":18,\"module\":\"Xeon-E5\",\"no\":\"R\",\"title\":\"parrot\",\"priceMonth\":249.0,\"priceSeason\":588.0,\"vcpuNum\":16,\"ramMb\":32768,\"bandwitdh\":20,\"diskGb\":40,\"natPorts\":10,\"osSupport\":\"Windows&Linux\",\"backupNum\":0,\"snapshotNum\":0,\"desc\":null,\"moneytype\":1}]"};
    console.log(data);
    let list = $.parseJSON(data.message);
    console.log(list);

    displayNATVPSListByVUE(list);

    //用ajax向服务器请求数据
    // $.ajax({
    //     type: "POST",
    //     url: "/shop/product/natvps/list",
    //     data: {},
    //     async: true,//异步
    //     dataType: "json",
    //     success: function (data, status) {
    //         if (status === "success") {//post 成功 不出错
    //             if (data.resultcode === "100") {
    //                 let list = $.parseJSON(data.message);
    //                 displayNATVPSListByVUE(list);
    //             } else if(data.resultcode === "103") {//No token
    //                 window.location.href = "/login.html";
    //             }else{//ERR
    //                 mdui.alert(data.message);
    //             }
    //         } else {
    //             mdui.alert(status + "\n" + data);
    //         }
    //     },
    //     error: function (xmlhr, msg) {
    //         mdui.alert(msg);
    //     }
    // });
}

function displayNATVPSListByVUE(list){
    let natvpsprodvueopts = {
        data(){
            return{
                list: list
            }
        },
        mounted(){
            mdui.mutation();
        }
    }

    let natvpsprodapp = Vue.createApp(natvpsprodvueopts);

    natvpsprodapp.component("natvpscard",{
        props:['prod'],
        data(){
            return{
                picfilepath : "",
                moneypicfilepath : "",
                moneytypetext : ''
            }
        },
        template:
        `
            <div class="mdui-col-md-4 mdui-col-sm-6 mdui-col-xs-12">
                <div class="product-card mdui-card">
                    <div class="mdui-card-header">
                        <div class="product-title">
                            <i class="mdui-icon material-icons">assignment</i><span> {{prod.module}} {{prod.no}}</span>
                        </div>
                    </div>
                    <div class="mdui-card-media">
                        <div class="product-pic">
                            <img alt="" v-bind:src="picfilepath">
                        </div>
                    </div>
                    <div class="product-card-primary mdui-card-primary">
                        <div class="mdui-card-primary-title">
                            <strong class="mdui-text-capitalize">{{prod.title}}</strong>
                        </div>
                        <div class="price-line">
                            <img class="price-pic" v-bind:src="moneypicfilepath" v-bind:alt="moneytypetext">{{prod.priceMonth}} /mo
                            |
                            <img class="price-pic" v-bind:src="moneypicfilepath" v-bind:alt="moneytypetext">{{prod.priceSeason}} /se
                        </div>
                    </div>
                    <div class="mdui-card-content">
                        <div class="product-card-left mdui-float-left">
                            CPU
                            <br>
                            RAM
                            <br>
                            NET
                            <br>
                            SSD
                            <br>
                            PORT
                            <br>
                            System
                        </div>
                        <div class="product-card-right mdui-float-right">
                            {{prod.vcpuNum}}cores
                            <br>
                            {{prod.ramMb/1024}}GB
                            <br>
                            {{prod.bandwitdh}}Mbps
                            <br>
                            {{prod.diskGb}}GB
                            <br>
                            {{prod.natPorts}}
                            <br>
                            {{prod.osSupport}}
                        </div>
                        <div class="product-card-desc">
                            {{prod.desc}}
                        </div>
                    </div>
                    <div class="product-card-btn">
                        <button v-on:click="newOrder" class="product-card-btn-buy mdui-btn mdui-ripple mdui-color-pink-a200 mdui-btn-block">
                            <img class="product-card-btn-buy-pic" src="images/mc/icon/name_tag.png" alt="buy"><label class="product-card-btn-buy-text">BuyNow</label>
                        </button>
                    </div>
                </div>
            </div>
        `,
        methods:{
            newOrder(){
                let productId = this.prod.productId;
                window.localStorge.setItem("productId",productId);
                window.localStorge.setItem("productType","natvps");
                $("#prod_name").text("VPS " + this.prod.module + " " + this.prod.no);
                $("#price_pic_mon").attr("src",this.moneypicfilepath);
                $("#price_pic_mon").attr("alt",this.moneytypetext);
                $("#price_pic_sea").attr("src",this.moneypicfilepath);
                $("#price_pic_sea").attr("alt",this.moneytypetext);
                $("#order_price_month").text(this.prod.priceMonth);
                $("#order_price_season").text(this.prod.priceSeason);
                let dialog = new mdui.Dialog('#buyNatVpsDialog');
                dialog.open();
            }
        },
        created(){
            let picfilerootpath = "images/mc/pic/";
            let moneytypepicrootpath = "images/mc/icon/";
            this.picfilepath = picfilerootpath + this.prod.title + ".webp";
            switch (this.prod.moneytype){
                case 0:{
                    this.moneypicfilepath = moneytypepicrootpath + "gold_nugget.png";
                    this.moneytypetext = "金粒";
                    break;
                }
                case 1:{
                    this.moneypicfilepath = moneytypepicrootpath + "diamond.png";
                    this.moneytypetext = "钻石";
                    break;
                }
                case 2:{
                    this.moneypicfilepath = moneytypepicrootpath + "emerald.png";
                    this.moneytypetext = "绿宝石";
                    break;
                }
                default:{
                    this.moneypicfilepath = moneytypepicrootpath + "diamond.png";
                    this.moneytypetext = "钻石";
                    break;
                }
            }
        }
    });

    natvpsprodapp.mount("#product-list-natvps");
}

function createNewOrder(){
    let token = $.cookie('token');
    if(token === undefined || token === null || token === ""){
        window.location.href = "/login.html";
        return;
    }
    mdui.alert("正在创建，请稍后.....","创建订单");
    let pid = window.localStorge.getItem("productId");
    let v = $("input[name='durationradio']:checked").val();
    let ptype = window.localStorge.getItem("productType");
    let ostype = $("option[name='ostype']:selected").val();
    //用ajax向服务器请求数据
    $.ajax({
        type: "POST",
        url: "/order/create",
        data: {
            pid : pid,
            ptype: ptype,
            druationmode : v,
            ostype : ostype
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
        },
        complete: function (xhr,status){
            console.log(xhr);
            console.log(status);
            if(xhr.status === 405 || xhr.status === 403){
                window.location.href = "login.html";
            }
        }
    });
}





