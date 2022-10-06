$(document).ready(initIndexPage);

function getOrderList() {
    //用ajax向服务器请求数据
    $.ajax({
        type: "POST",
        url: "/order/getlist",
        data: {},
        async: true,//异步
        dataType: "json",
        success: function (data, status) {
            if (status === "success") {//post 成功 不出错
                if (data.resultcode === "100") {
                    let orderlist = $.parseJSON(data.message);
                    displayOrderListByVUE(orderlist);
                } else if (data.resultcode === "103") {//No token
                    window.location.href = "/login.html";
                } else {//ERR
                    mdui.alert(data.message);
                }
            } else {
                mdui.alert(status + "\n" + data);
            }
        },
        error: function (xmlhr, msg) {
            mdui.alert(msg);
        },
        complete: function (xhr, status) {
            console.log(xhr);
            console.log(status);
        }
    });
}

function displayOrderListByVUE(orderlist) {
    let ordervueopts = {
        data() {
            return {
                list: orderlist
            }
        },
        mounted() {
            mdui.mutation();
        }
    };

    let orderapp = Vue.createApp(ordervueopts);

    orderapp.component("ordercard", {
        props: ['order'],
        data() {
            return {
                moneytypepicpath: '',
                moneytypetext: '',
                pay: false
            }
        },
        template:
            `
        <div class="mdui-col-lg-4 mdui-col-sm-6 mdui-col-xs-12">
            <div class="order-card mdui-card">
                <div class="mdui-card-header">
                    <i class="mdui-card-header-avatar mdui-icon material-icons">event</i>
                    <div class="mdui-card-header-title">
                        {{order.producename}}
                    </div>
                    <div class="mdui-card-header-subtitle">
                        订单ID: {{order.orderid}}
                    </div>
                </div>
                <div class="order-desc mdui-card-content">
                    <div class="order-desc-left">
                        附加信息
                        <br>
                        类型
                        <br>
                        时长
                        <br>
                        创建时间
                        <br>
                        支付时间
                        <br>
                        优惠码
                        <br>
                        价格
                        <br>
                        应付
                        <br>
                        订单状态
                    </div>
                    <div class="order-desc-right">
                        {{order.productparams}}
                        <br>
                        {{order.ordertype}}
                        <br>
                        {{order.duration}}天
                        <br>
                        {{order.createtime}}
                        <br>
                        {{order.paytime}}
                        <br>
                        {{order.discountcode}}
                        <br>
                        <div class="price-line">
                            <img class="price-pic" v-bind:src="moneytypepicpath" v-bind:alt="moneytypetext">
                            <span class="price-number">{{order.priceshouldpay}}</span>
                        </div>
                        <div class="price-line">
                            <img class="price-pic" v-bind:src="moneytypepicpath" v-bind:alt="moneytypetext">
                            <span class="price-number">{{order.priceactual}}</span>
                        </div>
                        {{order.statu}}
                    </div>
                </div>
                <div class="mdui-card-actions mdui-float-right">
                    <button 
                        class="mdui-btn mdui-color-red-400"
                        v-on:click="cancelOrder" v-if="pay"
                        >取消订单</button>
                    <button 
                    
                        class="mdui-btn mdui-color-theme-accent"
                        v-on:click="payOrder" v-if="pay"
                        >立即支付</button>
                </div>
            </div>
        </div>
        `,
        methods: {
            payOrder() {
                mdui.alert("支付订单 ID:" + this.order.orderid + "\n 按下ESC或者点击空白处以关闭本对话框而不执行操作" ,"支付订单",()=>{
                    //用ajax向服务器请求数据
                    $.ajax({
                        type: "POST",
                        url: "/order/pay",
                        data: {
                            orderid: this.order.orderid
                        },
                        async: true,//异步
                        dataType: "json",
                        success: function (data, status) {
                            if (status === "success") {//post 成功 不出错
                                if (data.resultcode === "100") {
                                    mdui.alert("产品开通中....请刷新页面查看进度或前往产品管理页面", "支付成功", () => {
                                        window.location.reload();
                                    });
                                    // window.location.href = "/order.html";
                                } else if (data.resultcode === "103") {//No token
                                    window.location.href = "/login.html";
                                } else {//ERR
                                    $("#paymsg").text(data.message);
                                    let paydialog = new mdui.Dialog("#PayDialog");
                                    paydialog.open();
                                }
                            } else {
                                mdui.alert(status + "\n" + data);
                            }
                        },
                        error: function (xmlhr, msg) {
                            mdui.alert(msg);
                        }
                    });
                })
            },
            cancelOrder() {
                mdui.alert("取消订单 ID:" + this.order.orderid + "\n 按下ESC或者点击空白处以关闭本对话框而不执行操作","取消订单",()=>{
                    //用ajax向服务器请求数据
                    $.ajax({
                        type: "POST",
                        url: "/order/cancel",
                        data: {
                            orderid: this.order.orderid
                        },
                        async: true,//异步
                        dataType: "json",
                        success: function (data, status) {
                            if (status === "success") {//post 成功 不出错
                                if (data.resultcode === "100") {
                                    mdui.alert("订单已取消", "取消订单", () => {
                                        window.location.reload();
                                    });
                                } else if (data.resultcode === "103") {//No token
                                    window.location.href = "/login.html";
                                } else {//ERR
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
                })
            }
        },
        created() {
            this.pay = this.order.statu === "未支付";
            let picfilerootpath = "images/mc/icon/";
            switch (this.order.moneytype) {
                case 0: {
                    this.moneytypepicpath = picfilerootpath + "gold_nugget.png";
                    this.moneytypetext = "金粒";
                    break;
                }
                case 1: {
                    this.moneytypepicpath = picfilerootpath + "diamond.png";
                    this.moneytypetext = "钻石";
                    break;
                }
                case 2: {
                    this.moneytypepicpath = picfilerootpath + "emerald.png";
                    this.moneytypetext = "绿宝石";
                    break;
                }
                default: {
                    this.moneytypepicpath = picfilerootpath + "emerald.png";
                    this.moneytypetext = "绿宝石";
                    break;
                }
            }
        }
    });

    orderapp.mount("#orderlist");
}