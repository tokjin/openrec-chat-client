/////////////////////////////////////////////////////////
////////////            宣言                  ///////////
////////////////////////////////////////////////////////

let ws, socket, onairTitle, giftList;
let handshakeLoop;

/////////////////////////////////////////////////////////
////////////            function             ////////////
////////////////////////////////////////////////////////

let startConnect = () => {
    getMovieId().done((json) => {
        let onairId;
        json.forEach((val) => {
            if(val.onair_status == 1) {
                onairId = val.movie_id;
                onairTitle = val.title;
            }
        });
        if(onairId) wsConnect(onairId);
        else console.log('getMovieId success(not onair)');
    }).fail(() => { console.log('getMovieId failed'); });
}

let getMovieId = () => {
    let url = 'https://public.openrec.tv/external/api/v5/movies?channel_id='+channelId;
    return $.ajax({ url: url, type: 'GET' });
}

let updateGiftList = () => {
    getGiftList().done((res) => {
        giftList = res;
        console.log('Gift List Loaded.');
    }).fail((res) => { console.log('getGiftList failed'); });
}

let getGiftList = () => {
    let url = 'https://public.openrec.tv/external/api/v5/yell-products';
    return $.ajax({ url: url, type: 'GET' });
}

let randText = (type, len) => {
    let p = 36;
    
    if(type == 'Int') p = 10;
    if(!len) len = 10;
    
    return Math.random().toString(p).slice(0-len);
}

/////////////////////////////////////////////////////////
////////////            メイン処理            ////////////
////////////////////////////////////////////////////////

$(document).ready(function () {
    updateGiftList();
    
    $(window).on("beforeunload", (e) => { wsDisconnect() });
});

//////////////////////////////////////////////////////////////
////////////            WebSocketの処理            ////////////
//////////////////////////////////////////////////////////////

let wsConnect = (id) => {
    if(!id) return;
    let wsUri = 'wss://chat.openrec.tv/socket.io/?movieId='+id+'&EIO=3&transport=websocket';
    ws = new WebSocket(wsUri);
    
    ws.onopen = (e) => { onOpen(e) };
    ws.onclose = (e) => { onClose(e) };
    ws.onmessage = (e) => { onMessage(e) };
    ws.onerror = (e) => { onError(e) };
    
}

let wsDisconnect = () => {
    ws.close()
}

let onOpen = (e) => {
    console.log('CONNECTED');
    noticeDraw('「'+onairTitle+'」へ接続しました。('+currentVer+')', 'open');
    handshakeLoop = setInterval(handshake, 25000)
}

let onClose = (e) => {
    console.log('DISCONNECTED');
    noticeDraw('「'+onairTitle+'」を切断しました。', 'close');
    clearInterval(handshakeLoop);
}

let onMessage = (e) => {
    let rawText, json, unescapeed;
    
    try {
        if(e.data == 3) {
            console.log('[R] handshake');

        } else if(e.data == '40'){
            console.log('[R] connect start')

        } else if(e.data.slice(0,1) == '0'){
            rawText = e.data.slice(1);
            json = JSON.parse(rawText);
            console.log(json);

        } else {
            rawText = e.data.slice(14,-2);
            unescapeed = rawText.replace(/\\/g, '');

            json = JSON.parse(unescapeed);
            if(json.type == 0){
                let messageJson = new Comment(json.data);
                messageJson.push();

            } else {
                console.log(json.type, json.data);
            }
        }
    
    } catch(er){
        if(e.data) console.log(e.data);
        else console.log(e);
        console.log(er);
    }
}

let onError = (e) => {
    console.log('ERROR:' + e.data);
    ws.close();
}

let handshake = () => {
    ws.send(2);
    console.log('[S] handshake');
}

class Comment {
    constructor(json) {
      this.user_name = json.user_name;
      this.user_identify_id = json.user_identify_id;
      this.message = json.message;
      this.message_dt = json.message_dt;
      this.is_fresh = json.is_fresh;
      this.is_warned = json.is_warned;
      this.is_moderator = json.is_moderator;
      this.is_premium = json.is_premium;
      this.is_authenticated = json.is_authenticated;
      this.user_icon = json.user_icon;
      this.user_color = json.user_color;
      this.stamp = json.stamp;
      this.yell = json.yell;
      this.yell_type = json.yell_type;
    }

    push(){
        let svgUrlBase = 'https://dqd0jw5gvbchn.cloudfront.net/tv/v8.11.0/static/svg/commons';
        if(this.stamp) this.message = '<img src="'+this.stamp.image_url+'" class="stamp">';
        if(this.is_fresh) this.user_name += '<img src="'+svgUrlBase+'/begginer.svg" class="mark">';
        if(this.is_warned) this.user_name += '<img src="'+svgUrlBase+'/warned.svg" class="mark">';
        if(this.is_moderator) this.user_name += '<img src="'+svgUrlBase+'/moderator.svg" class="mark">';
        if(this.is_premium) this.user_name += '<img src="'+svgUrlBase+'/premium.svg" class="mark">';
        
        chatDraw(this.message, this.user_name, this.user_icon, this.user_color)
        // debug
        if(this.yell) {
            console.log('[YELL]', this);
            // giftDraw(giftId, count, senderName)
        }
        return;
    }
}


