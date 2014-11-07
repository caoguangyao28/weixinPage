/**
 * Created by caoguangyao on 2014/11/4 0004.
 */
var apiIp ='http://v2.api.njnetting.cn/';//全局的接口地址
function GetQueryString(name){   //获取浏览器的参数
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  decodeURIComponent(r[2]); return null;
}
function GetAppStyle(){//获取设备类型 无法区别 android平板和android手机
    var platform;
    var userAgentT = navigator.userAgent;
    if ((userAgentT.match(/(Android)/i))) {
        platform = 'Android';
    } else {
        if ((userAgentT.match(/(iPhone|iPod|ios|iPad)/i))) {
            if(userAgentT.match(/(iPhone|iPod|ios)/i)){
                platform = 'iPhone';
            }else{
              platform = 'iPad';
            }
        } else {
            if ((userAgentT.match(/(Windows phone)/i))){
                platform = 'Windows phone';
            } else {
                platform = 'pc browser';
            }
        }
    }
    return platform;
}