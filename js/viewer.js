/////////////////////////////////////////////////////////
////////////            宣言と初期化            ///////////
////////////////////////////////////////////////////////

const drawArea = $('.drawArea');
let chkbxSpeakStatus, chkbxGiftStatus;
let chkbxScrollStatus = true;
let chkbxCommentStatus = true;
let displayCommentCount = 0;

if(giftNoticeMode){
    $('#chkGift').prop('checked', true);
    chkbxGiftStatus = true;
}

if(speechMode){
    $('#chkSpeak').prop('checked', true);
    chkbxSpeakStatus = true;
}

if(clipboard){
    $('#speak-text').text('読み上げ（クリップボード）');
}

$('.inputRoomId').val(channelId);
$('#versionArea').text(currentVer);

/////////////////////////////////////////////////////////
////////////            function             ////////////
////////////////////////////////////////////////////////

let giftDraw = (giftId, count, senderName, message) => {
    let giftName = 'unknown gift name';
    let giftPrice = 0;
    let giftUrl = 'https://';
    let giftPoint = 1;
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
    
    
    drawArea.append('<div class="chat gift">[エール] '+senderName+' '+message+'('+giftPrice+'yells)</div>');
    speechText(senderName+'さんからエールが届きました。'+message, 'gift');
    statusCheck();
}

let chatDraw = (text, name, iconUrl, color, stamp) => {
    displayCommentCount++;
    if(displayCommentCount >= viewerMaxLine) {
        displayCommentCount = 1;
        drawArea.empty();
        drawArea.append('<div class="chat notice">チャット欄をリセットしました。</div>');
    }
    if(!color) color = "black";
    speechText(text, 'comment');
    
    if(stamp) text = '<img src="'+stamp.image_url+'" class="stamp">';
    
    let insertTag = '';
    if(userIcon) insertTag = '<div class="chat comment"><div id="name" style="color: '+color+';"><img src="'+iconUrl+'" class="iconSize"> '+name+'</div><div id="text">'+text+'</div></div>';
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

let viwerCount = (json) => {
    console.log('viwerCount',json)
    $('#viewCountArea').css('display', 'block');
    $('#liveViewCount').text(json.live_viewers);
    $('#viewCount').text(json.viewers);
}

let onAddDraw = (name) => {
    noticeDraw(name+'さんが入室しました。', 'onAdd');
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
    
    if(clipboard){
        let tempInput = document.createElement('input');
        tempInput.setAttribute('id', 'copyinput');
        document.body.appendChild(tempInput);
        tempInput.value = text;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        return;
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
    if(autoStart) $('#startBtn').click();
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
    $('#viewCountArea').css('display', 'none');
});

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

