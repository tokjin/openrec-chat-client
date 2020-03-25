/////////////////////////////////////////////////////////
////////////            宣言                  ///////////
////////////////////////////////////////////////////////

const notificationArea = $('.notificationArea');
let mainLoop;
let renderText = [];

/////////////////////////////////////////////////////////
////////////            function             ////////////
////////////////////////////////////////////////////////

let giftDraw = (giftId, count, senderName, message) => {
    let giftName = 'unknown gift name';
    let giftPrice = 0;
    let giftUrl = 'https://';
    let giftCategory = 1;
    if(!message) message = '';
    if(!count) count = 1;
    
    giftList.forEach((val) => {
        if(giftId == val.id){
            giftName = val.name;
            giftPrice = val.yells;
            giftUrl = val.image_url;
            giftPoint = val.points;
        }
    });
    
    if(giftNoticeFeederMode) renderText.unshift({'text': senderName+'さんからエールが届きました。'+giftPrice+'yells', 'type': 'gift'});
    if(!giftNoticeMode) return;
    if(giftNoticeSound) $('#soundGift').get(0).play();
    //if(giftCategory == 3) count *= 15;
    
    [...Array(count)].map(() => { // 指定回数繰り返し
        let randId = 'gift'+randText('Int', 8);
        let randWidth = Math.random() * 1800;
        let randHeight = -(Math.random() * 500 + 50);
        let giftSpeedFix = giftSpeed + (Math.random() * 2500);
        
        let insertTag = '<img src="'+giftUrl+'" id="'+randId+'" class="gift" style="top: '+randHeight+'px; left: '+randWidth+'px;">';
        $('.giftArea').append(insertTag);

        $('#'+randId).css('display','block');
        $('#'+randId).animate({ top: 975 }, giftSpeedFix, 'swing', function () {
            $('#'+randId).animate({ top: 975 }, 3000, 'swing', function () {
                $('#'+randId).remove();
            });
        });
    })
    
}

let chatDraw = (text, name, iconUrl, color) => {
    let colorText = '';
    if(!chatNoticeMode) return;
    if(chatColorMode) colorText = 'color: '+color+' !important;';
    
    let randId = 'chat'+randText('Int', 8);
    let randHeight = Math.random() * 1000;
    if(text.length >= chatLengthMax) text = text.substr(0, chatLengthMax-2)+'...';

    if(chatInUserName) text = text + '@' + name
    let insertTag = '<div id="'+randId+'" class="chat" style="display: none; left: 1920px; top: '+randHeight+'px;'+colorText+'">'+text+'</div>';
    $('.chatArea').append(insertTag);
    
    $('#'+randId).css('display','block');
    $('#'+randId).animate({ left: -1920 }, chatSpeed, 'linear', function () {
        $('#'+randId).remove();
    });
}

let noticeDraw = (text, type) => {
    renderText.unshift({'text': text, 'type': type});
}

let onAddDraw = (name) => {
    if(onAddNoticeMode) renderText.push({'text': name+'さんが入室しました。', 'type': 'onAdd'});
}

let followDraw = (name) => {
    if(followerNoticeMode) renderText.unshift({'text': name+'さんがフォローしました。', 'type': 'follow'});
}

let requestTextillate = (d) => {
    notificationArea.css('left', '110%');
    notificationArea.text(d.text);
    notificationArea.css('display', 'block');
    let goalLeft = 280;
    
    notificationArea.animate({ left: goalLeft }, 1000, 'swing', function () {
        if(followerNoticeSound) {
            if(d.type == 'follow') $('#soundFollow').get(0).play();
        }
        notificationArea.animate({ left: goalLeft }, 3000, 'swing', function () {
            notificationArea.fadeOut(200);
        });
    });
}

let checkFunc = () => {    
    if(renderText.length){
        let feedAreaDisplay = notificationArea.css('display');
        if(feedAreaDisplay == 'none') {
            requestTextillate(renderText[0]);
            renderText.splice(0,1);
        }
    }
}

/////////////////////////////////////////////////////////
////////////            メイン処理            ////////////
////////////////////////////////////////////////////////

$(document).ready(function () {
    mainLoop = setInterval(checkFunc, 1000);
    startConnect(channelId);
});

