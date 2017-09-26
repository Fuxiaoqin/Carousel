!function() {
    function e() {
        var e = document.documentElement.clientWidth,
            t = document.querySelector("html"),
            f = e / 25;
        window.fontSize = f;
        t.style.fontSize = f + "px";
    }
    e(), window.addEventListener("resize", e);
}();

const UA = window.navigator.userAgent;
var locationType = window.location.search.indexOf('sess_token');
var json={
    act_id:$_GET('id'),
    // user_id:54,//测试用
    sess_token:$_GET('sess_token'),
    model_idfa:$_GET('medel_idfa')
};

(function(){
    if($_GET('shareType') == 1){
            var shareHtml=[];
            shareHtml+=['<div class="d_foot">',
                            '<span class="colse"></span>',
                            '<div class="d_foot_bg"></div>',
                            '<div class="d_foot_main">',
                              '<div class="left"></div>',
                              '<div class="text">XXX,专业瘦</div>',
                              '<a href="javascript:;">下载APP</a>',
                            '</div>',
                            '<div class="share-img"></div>',
                        '</div>'].join('');
            $('body').append(shareHtml);
            $('.d_foot').show();
            hxsDownload('.d_foot a', '.share-img', '.dynamic-info-main-box');
            hxsDownload('.share-down .fn .confirm');
            $('.d_foot .colse').click(function(){
                $('.dynamic-info-main-box').css('padding-bottom','0');
                $(this).parents('div').hide();
            })
        }else{
            $('.d_foot').hide();    
        }
        if(UserAgent.indexOf('iPhone') !=-1 || UserAgent.indexOf('iPad') !=-1){
            $('.d_foot a').attr('href',href);
        }else if(UserAgent.indexOf('Android') !=-1){
            $('.d_foot a').attr('href',href);
        }
        $('.d_foot .colse').click(function(){
            $('.dynamic-info-main-box').css('padding-bottom','0');
            $(this).parents('div').hide();
        })
})();
// href='http://app.hxsapp.com/html/channel_statistics.html?channel_id=';
//判断是否非app进入页面 如果不是跳转下载页面
function checkInApp(){
    if($_GET('shareType') == 1){
        toastTip('.common_tip','需要下载登录',2500);
        window.location.href = href;
        return false;
    }
    return true;
}
function init(){
	if(UserAgent.indexOf('iPhone') !=-1 || UserAgent.indexOf('iPad') !=-1){
        $('.copyright').html('※活动最终解释权归XXXAPP所有 本活动与苹果公司无关');
	}
}
init();
//获取PV数
function getParticipant(port,json,sel){
    $.getJSON(_ACTHOST+port+'?callback=?',json,function(data){

        var sum=data.code==200?data.data.sum:0;
        $(sel).html(sum);
    })
    if($_GET('shareType')){
        buriedPoint('站外活动H5', '站外活动H5');
    }else{
        buriedPoint('H5活动页面', 'H5活动页面');
    }
}

//分享方法  
function shareFun(data){
    //H5通知客户端显示分享按钮
    var shareLink = data.link+ '&shareType=1';
    var share_url = {share_url: window.location.href};
    var shareTitle = data.title;
    var shareImages = data.images;
    var shareDescr = data.descr;
    var shareType = data.share_type;
    var Version = getHsxAppVersion();
    //根据不同XXXapp版本发送对应的客户端跳转协议
    if( (compareAppVersion(Version,"2.6.0") ) && Version){
        window.location.href = 'https://hxsapp_visible_act_share_btn#'+ shareTitle + '#' + shareLink + '#' + shareImages + '#' + shareDescr + '#' + shareType;
    }else if( (compareAppVersion(Version,"2.2.0") || Version == "2.2.0" ) && ( !(compareAppVersion(Version,"2.6.0") || Version == "2.6.0" ) ) && Version){
        window.location.href = 'https://hxsapp_visible_share_btn#'+ shareTitle + '#' + shareLink + '#' + shareImages + '#' + shareDescr + '#' + shareType;
    }else if( (compareAppVersion(Version,"2.1.0") || Version == "2.1.0" ) && Version){
        window.location.href = 'hxsapp://visible_share_btn|'+ shareTitle + '|' +shareLink + '|' + shareImages + '|' + shareDescr + '|' + shareType;
    } 
    wxSecShare(shareTitle,shareDescr,shareLink,shareImages);
    //qq分享
    $('#qqShareContent').attr('content',decodeURIComponent(shareTitle));
    $('#qqShareDes').attr('content','XXXAPP  专享福利');
    $('#qqShareImg').attr('content',shareImages); 
    //分享方法
}

function prevent () {
　　$("body").on("touchmove",function(event){
        event.preventDefault;
    }, false)
}

//获取屏幕高度
function getclientH(obj){
    var clientH=document.documentElement.clientHeight;
    $(obj).css('height',clientH+'px');
}

//判断页面是否加载完毕
function preLoading(id, fn){
    document.onreadystatechange = function(){
        if(document.readyState == 'complete' || document.readyState == 'loaded'){
            finish(fn);
        }
    }
    function finish(fn){
      setTimeout(function(){
        document.getElementById(id).style.display = 'none'; 
        if(fn){
          fn();
        }
      },1000);
    }
  $('#' + id).on('touchstart',function(){
    return false;
  });
}