/////////////////////////////////////////////////////////
////////////            宣言と初期化            ///////////
////////////////////////////////////////////////////////

const drawArea = $('.drawArea');
let chkbxSpeakStatus, chkbxGiftStatus, chkbxCommentStatus;
let chkbxScrollStatus = true;

if(chatNoticeMode){
    $('#chkComment').prop('checked', true);
    chkbxCommentStatus = true;
}
if(giftNoticeMode){
    $('#chkGift').prop('checked', true);
    chkbxGiftStatus = true;
}
if(speechMode){
    $('#chkSpeak').prop('checked', true);
    chkbxSpeakStatus = true;
}

$('.inputRoomId').val(channelId);

/////////////////////////////////////////////////////////
////////////            function             ////////////
////////////////////////////////////////////////////////

let giftDraw = (giftId, count, senderName) => {
    let giftName = 'unknown gift name';
    let giftPrice = 0;
    let giftUrl = 'https://';
    let giftPoint = 1;
    if(!count) count = 1;
    
    giftList.forEach(function(val){
        if(giftId == val.id){
            giftName = val.name;
            giftPrice = val.yells;
            giftUrl = val.image_url;
            giftPoint = val.points;
        }
    });
    
    drawArea.append('<div class="chat gift">'+senderName+'さんが'+giftName+'('+giftPrice+'pt)を贈りました。x'+count+'</div>');
    speechText(senderName+'さんが'+giftName+'を贈りました。', 'gift');
    statusCheck();
}

let chatDraw = (text, name, img, color) => {
    if(!color) color = "black";
    let stickerPattern = /\[\/[+-]?\d+\]/g;
    let hitText = text.match(stickerPattern);
    speechText(text, 'comment');
    
    let insertTag = '';
    if(userIcon) insertTag = '<div class="chat comment"><div id="name" style="color: '+color+';"><img src="'+img+'" class="iconSize"> '+name+'</div><div id="text">'+text+'</div></div>';
    else insertTag = '<div class="chat comment"><div id="name">'+name+'</div><div id="text">'+text+'</div></div>';
    
    drawArea.append(insertTag);
    statusCheck();
}

let noticeDraw = (text, type) => {
    if(type == 'close') {
        $('#stopBtn').css('display', 'none');
        $('#startBtn').css('display', 'inline-block');
    }
    let insertTag = '<div class="chat notice '+type+'">';
    if(type != 'debug') insertTag += '<img src="https://dqd0jw5gvbchn.cloudfront.net/tv/v8.11.0/static/images/favicons/favicon.ico" class="iconSize"> ';
    insertTag += text+'</div>';
    
    drawArea.append(insertTag);
    speechText(text, type);
    statusCheck();
}

let onAddDraw = (name) => {
    noticeDraw(name+'さんが入室しました。', 'onAdd');
}

let followDraw = (name) => {
    noticeDraw(name+'さんがフォローしました。', 'follow');
}

let statusCheck = () => {
    if(!chkbxCommentStatus) $('.comment').css('display', 'none');
    if(!chkbxGiftStatus) $('.gift').css('display', 'none');
    if(chkbxScrollStatus) window.scrollTo(0, document.body.scrollHeight);
}

let speechText = (text, type) => {
    if(!chkbxSpeakStatus) return;
    switch(type){
        case 'comment':
            if(!chkbxCommentStatus) return;
            break;
        
        case 'gift':
            if(!chkbxGiftStatus) return;
            break;
        
        case 'follow':
            if(!chkbxFollowStatus) return;
            break;
        
        case 'onAdd':
            if(!chkbxOnAddStatus) return;
            break;
    }
    
    let ssu = new SpeechSynthesisUtterance(text);
    ssu.lang = 'ja-JP';
    ssu.rate = 1.5;
    ssu.pitch = 1.3;
    speechSynthesis.speak(ssu);
}

/////////////////////////////////////////////////////////
////////////            メイン処理            ////////////
////////////////////////////////////////////////////////

$(document).ready(function () {
    
});

/////////////////////////////////////////////////////////
////////////            トリガー              ////////////
////////////////////////////////////////////////////////

$('#startBtn').on('click', () => {
    channelId = $('.inputRoomId').val();
    startConnect(channelId);
    $('#startBtn').css('display', 'none');
    $('#stopBtn').css('display', 'inline-block');
});

$('#stopBtn').on('click', () => {
    wsDisconnect();
    $('#stopBtn').css('display', 'none');
    $('#startBtn').css('display', 'inline-block');
});

$('.adArea').on('click', () => {
    $('.adArea').remove();
})

$('#chkComment').on('change', () => {
    chkbxCommentStatus = $('#chkComment').prop('checked');
    if (chkbxCommentStatus) $('.comment').css('display', 'block');
    else $('.comment').css('display', 'none');
});

$('#chkGift').on('change', () => {
    chkbxGiftStatus = $('#chkGift').prop('checked');
    if (chkbxGiftStatus) $('.gift').css('display', 'block');
    else $('.gift').css('display', 'none');
});

$('#chkSpeak').on('change', () => {
    chkbxSpeakStatus = $('#chkSpeak').prop('checked');
});

$('#chkScroll').on('change', () => {
    chkbxScrollStatus = $('#chkScroll').prop('checked');
});

