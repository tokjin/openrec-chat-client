const baseUrl = 'https://tokjin.github.io/openrec-chat-client/generator.html';

class urlParam {
    constructor() {
        this.channelId = '';
        this.chatInUserName = false;
        this.chatColorMode = false;
        this.chatSpeed = 7000;
        this.chatLengthMax = 30;
        this.giftNoticeMode = true;
        this.giftNoticeFeederMode = true;
        this.giftSpeed = 5000;
        this.giftNoticeSound = false;
        this.demoMode = false;
    }
    reload() {
        let paramText = '?channelId='+this.channelId;
        if(this.chatInUserName) paramText += '&chatInUserName='+this.chatInUserName;
        if(this.chatColorMode) paramText += '&chatColorMode='+this.chatColorMode;
        if(this.chatSpeed) paramText += '&chatSpeed='+this.chatSpeed;
        if(this.chatLengthMax) paramText += '&chatLengthMax='+this.chatLengthMax;
        if(this.giftNoticeMode) paramText += '&giftNoticeMode='+this.giftNoticeMode;
        if(this.giftNoticeFeederMode) paramText += '&giftNoticeFeederMode='+this.giftNoticeFeederMode;
        if(this.giftSpeed) paramText += '&giftSpeed='+this.giftSpeed;
        if(this.giftNoticeSound) paramText += '&giftNoticeSound='+this.giftNoticeSound;
        
        $('#previewFrame').attr('src', baseUrl+paramText+'&demoMode=true&rnd='+Math.random());
        
        if(this.demoMode)paramText += '&demoMode='+this.demoMode;    
        $('#outputUrl').val(baseUrl+paramText);
        
        if(!this.channelId) $('#outputUrl').val('チャンネルIDは必須です');
    }
}

let outputUrl = new urlParam();

let copyText = () => {
    if(!outputUrl.channelId) return;
    $('#outputUrl').select();
    document.execCommand('Copy');
    $('#copied-text').css('display', 'block');
    $('#copied-text').animate({opacity: 1}, 500, 'linear', () => {
        $('#copied-text').fadeOut(2000);
    });
}

$('#inp-channelId').on('change', () => {
    outputUrl.channelId = $('#inp-channelId').val();
    outputUrl.reload();
});

$('#chk-chatInUserName').on('change', () => {
    outputUrl.chatInUserName = $('#chk-chatInUserName').prop('checked');
    outputUrl.reload();
});

$('#chk-chatColorMode').on('change', () => {
    outputUrl.chatColorMode = $('#chk-chatColorMode').prop('checked');
    outputUrl.reload();
});

$('#inp-chatSpeed').on('change', () => {
    outputUrl.chatSpeed = $('#inp-chatSpeed').val();
    outputUrl.reload();
});

$('#inp-chatLengthMax').on('change', () => {
    outputUrl.chatLengthMax = $('#inp-chatLengthMax').val();
    outputUrl.reload();
});

$('#chk-giftNoticeMode').on('change', () => {
    outputUrl.giftNoticeMode = $('#chk-giftNoticeMode').prop('checked');
    outputUrl.reload();
});

$('#chk-giftNoticeFeederMode').on('change', () => {
    outputUrl.giftNoticeFeederMode = $('#chk-giftNoticeFeederMode').prop('checked');
    outputUrl.reload();
});

$('#inp-giftSpeed').on('change', () => {
    outputUrl.giftSpeed = parseInt($('#inp-giftSpeed').val());
    outputUrl.reload();
});

$('#chk-giftNoticeSound').on('change', () => {
    outputUrl.giftNoticeSound = $('#chk-giftNoticeSound').prop('checked');
    outputUrl.reload();
});

$('#chk-demoMode').on('change', () => {
    outputUrl.demoMode = $('#chk-demoMode').prop('checked');
    outputUrl.reload();
});

