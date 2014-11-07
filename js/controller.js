/**
 * Created by caoguangyao on 2014/11/4 0004.
 */
var opts = {
    lines: 8, // loading小块的数量
    length: 5, // 小块的长度
    width: 4, // 小块的宽度
    radius: 5, // 整个圆形的半径
    corners: 1, // 小块的圆角，越大则越圆
    color: '#000', // 颜色
    speed: 1, // 变换速度
    trail: 60, // 余晖的百分比
    className: 'spinner', // 给loading添加的css样式名
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent in px
    left: '50%' // Left position relative to parent in px
};
var requestflag =0;//控制滚动加载
var loadpage = 1;
var totalpage;
var spinner = new Spinner(opts);
$(function () {
    var apiLink = 'http://v2.api.njnetting.cn/tyh3/tagitems?';
    target = document.getElementById('foo');
    loadData();
    initScroll();
});
function loadData(){
    spinner.spin(target);
    $('#foo').show();
    //将图片预加载至 内存 确保使用时 本加载图片 加载最快
    var imggg = new Image();
    imggg.src = 'images/loading.gif';
    $.ajax({
        url:'test.xml',
        type:'GET',
        success: function (xml) {
            var fatherDiv ="<div class='ads'>";
//          var xmobj = $.parseXML(xml);//服务端返回字符串 需要格式化
            var xmobj = $(xml); //直接读取的xml文件
            var chaye = xmobj.find('chaye').children('icon').text();
            totalpage = xmobj.find('total').text();
            var imgsrc = '<img class="width100 db" src="' +chaye+'"/>';
            var bannerImg = $('#bannerImg');
            bannerImg.html(imgsrc);
            bannerImg.imagesLoaded(function () {
                bannerImg.show();
                xmobj.find("item").each(function (){
                    var titlle = $(this).children("title").text();
                    var imgBig = $(this).children("img_big").text();
                    var itemId = $(this).children("item_id").text();
                    var price = (Math.round(Number($(this).children("price").attr("plow")))/100).toFixed(2);
                    var orignalPrice = (Math.round(Number($(this).children("price").attr("phi")))/100).toFixed(2);
                    var ahref = $(this).children("click").text();
                    var isBaoyou = $(this).children('is_baoyou').text();
                    fatherDiv += '<div class="ad pr">' +'<div class="ads-top pr">'+
                        '<img class="width100 db" src="images/loading.gif"/>'+
                        '<a class="db width100" href="'+ahref+'">'+
                        '<img class="db width100 pa" style="top:0;left:0;"  src="' +imgBig+
                        '"/>'+'</a>'+'</div>';
                    if(isBaoyou == '1'){
                        //jia image
                    }
                    fatherDiv+='<div class="adsBottom">' +
                        '<p class="adInfo cb" style="border-bottom: 1px dotted #d0d0d0;border-top: 1px dotted #d0d0d0;">'+titlle+'</p>'+
                        '<p class="cr pricees" style="background: #fff;">'+'<span class="price_now">￥'+price+'</span>'
                        +'<span class="cg price_before">￥'+orignalPrice+'</span>'+'</p>'+'</div></div>';
                });
                spinner.stop();
                $('#foo').hide();
                $('#main').append(fatherDiv);
            });
        }
    });
}
//注册滚动事件
function initScroll(){
    $(window).scroll(function(){ //滚动条滚动时调用
        if(requestflag == 0){
            var wheight = $(window).height();
            var dheight = $(document).height();
            var bot = 50;    //离底部还有 bot px
            if (bot + ($(window).scrollTop()) >= (dheight - wheight)) {  // 说明滚动条已达底部 再次加载数据
                console.log(totalpage);
//                if(loadpage < totalpage){
//                    loadpage ++;
//                    requestflag = 1;
//                    init(loadpage,true);
//                }else{
//                    $('#shareButtons').css('visibility','visible');
//                    $('#bottom').css('visibility','visible');
//                }
            }
//            var bodyoffset = $(window).scrollTop();
//            if(bodyoffset > 457){
//                $('#righterweima').css({position:'fixed',top:'20px'});
//                $("#goheader").show();
//            }else{
//                $('#righterweima').css({position:'absolute',top:'0'});
//                $("#goheader").hide();
//            }
        }
    });
}