let getParam = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    let results = regex.exec(url);
    if(!results) return null;
    if(!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const currentVer = 'v1.0.9';

// OPENRECのチャンネルID(https://www.openrec.tv/user/*****)
let channelId = getParam('channelId') || '';

// 流れるコメントに@名前を含める(含める場合はtrue)
const chatInUserName = getParam('chatInUserName') || false;

// 流れるコメントの色をユーザが設定した色にするか   
const chatColorMode = getParam('chatColorMode') || false;

// コメントが流れる速度（少ないほど早い） 
const chatSpeed = parseInt(getParam('chatSpeed')) || 7000;

 // 流れるコメントの最大表示文字数
const chatLengthMax = parseInt(getParam('chatLengthMax')) || 30;

 // 流れるスタンプの大きさ
const stampSize = parseInt(getParam('stampSize')) || 128;

 // 流れるコメントの大きさ
const chatSize = parseInt(getParam('chatSize')) || 60;

// ギフトを上から落とすかどうか
const giftNoticeMode = getParam('giftNoticeMode') || false;

// ギフトが来た時に画面下に通知をだすかどうか
const giftNoticeFeederMode = getParam('giftNoticeFeederMode') || false;

// ギフトが落ちる速度（少ないほど早い）
const giftSpeed = parseInt(getParam('giftSpeed')) || 5000;

// ギフトが来た時にサウンドを再生していいか
const giftNoticeSound = getParam('giftNoticeSound') || false;

// デモモード
const demoMode = getParam('demoMode') || false;

//////////////////////////////////////////////////////
/*  ここから下はコメントビュワー(viewer.html)の設定です   */
//////////////////////////////////////////////////////

// ビュワーでユーザーのアイコンを表示するかどうか
const userIcon = getParam('userIcon') || true;

// ビュワーを起動時に自動で接続を開始するかどうか
const autoStart = getParam('AutoStart') || false;

// ビュワーを起動時に読み上げをONにするかどうか
const speechMode = getParam('speechMode') || false;

// ビュワーの読み上げ機能を棒読みちゃんに対応（新着コメントをクリップボードにコピー）
const clipboard = getParam('clipboard') || false;

// ビュワーでコメントがこれ以上溜まり過ぎた時に重くならないように自動で削除
const viewerMaxLine = parseInt(getParam('viewerMaxLine')) || 1000;
