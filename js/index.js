var getTickets = {
    //获取活动相关信息//跳转分享页面
    getActData:function(){
        $.getJSON(_ACTHOST + '/draw/Film/actInfo?callback=?',json,function(data){
            if(data.data&&data.data.state == -1){
                $('.page_1_foot').css('display','block');
            }
            shareFun(data.data);
        })
    },
    getParticipant:function(){
        getParticipant('/draw/Film/pv',json,'.peopleCount');
    },
    //开始抽奖按钮绑定动画
    startRoll:function(){
        $('.crank_up').on('click',function(){
            if(!checkInApp()){return;}
            $.getJSON(_ACTHOST + '/draw/Film/trigger?callback=?',json,function(data){
                // if(data.code == 401){
                //     window.location.href = 'https://hxsapp_showloginpage';
                //     return;
                // }
                // if(data.code == 200||data.code == 607){
                    // getTickets.canRoll(data.code);
                    getTickets.canRoll(607);//测试用
                // }
                // else{
                //     toastTip('.toast_tip',data.msg,2500)
                // }
            }); 
        })
    },
    //可以旋转
    canRoll:function(state){
        prevent();
        $('#go_roll').off('click');
        $('.crank_up').css('display','none');
        $('.crank_down').css('display','block');
        $('.crank_down').on('click',function() {
            toastTip('.toast_tip','您今日机会已用完,明日再来!',2000)
        }) 
        var imgArr = Array.prototype.slice.call($('.slideBox ul li'), 1);
        var H = -$('.slideBox ul li').eq(1).height();
        // // debugger
        var count = 0;
        var timer = setInterval(function () {
            count++;
            if(state == 200){
                if(count > 14){
                    clearI (timer);
                    $('.slideBox a').css('display','block');
                    return;
                }
            }
            else{
                if(count > 15){
                    clearI (timer)
                    return;
                }
            }
            $('.slideBox ul').css({
                'transition': 'top .6s linear',
                'top': H + 'px'
            });
            setTimeout(function(){
                $('.slideBox ul').html('');
                $.each(imgArr,function(i,item){
                    $('.slideBox ul').append(item);
                })
                $('.slideBox ul').css({
                    'transition':'top 0s ease',
                    'top':'0'
                });
                imgArr = imgArr.concat( imgArr.splice(0,1) );
            },650)
        },700)
        function clearI (timer) {
            clearInterval(timer);
            timer = null;
            $('body').off('touchmove');
            getTickets.startRoll();
        }
    },
}
  
window.onload = function(){
    init();
    if(UA.indexOf('OPPO R9') != -1){
        $('.title_box').css('height','32rem')
        $('.lottery_box').css('height','15rem')
        $('.lottery_reward').css('height','15rem')
        $('.crank_up').css({'top':'-.5rem',right:'.3rem'});
        $('.crank_down').css({top:'6.5rem',right:'.3rem'});
        $('.rule').css({height:'15rem'});
        $('.slideBox').css({top:'3.2rem',height:'6.5rem'});
    }
    if(UA.indexOf('MI 4LTE') != -1 || UA.indexOf('Mi-4') != -1){
        $('.title_box').css('height','32rem')
        $('.slideBox').css({
            top:'3rem',
            height:'6.5rem'
        });
    }
    getTickets.getActData();
    getTickets.getParticipant();
    getTickets.startRoll();
}

