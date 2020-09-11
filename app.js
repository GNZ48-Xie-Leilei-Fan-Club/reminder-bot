let WebSocketAsPromised = require('websocket-as-promised');
let W3CWebSocket = require('websocket').w3cwebsocket;
let schedule = require('node-schedule-tz');

const GroupChatIds = {
    FanClubOne: 220334609,
}

// Config for websocket-as-promised
const wsp = new WebSocketAsPromised('ws://localhost:5700', {
    createWebSocket: url => new W3CWebSocket(url)
});

async function sendWebsocketMessage(message) {
    const makePayload = (groupChatId) => {
        return {
            action: 'send_group_msg',
            params: {
                group_id: groupChatId,
                message,
            }
        }
    }
    try {
        await wsp.open();
        wsp.send(JSON.stringify(makePayload(GroupChatIds.FanClubOne)));
    } finally {
        await wsp.close();
    }
}

schedule.scheduleJob('Send message', '15 0,2,6,8,10,12,14,16,18,20,22 * * *', 'Asia/Shanghai', function() {
    sendWebsocketMessage('【重要通知自动播报】\n1、应援会按照之前规定流程对公开投票结果进行顺序咨询合作，已与青钰雯应援会达成合作。在桃叭投票链接选定了其他四位对象的可以申请退款，退款9月19日00：00截止，逾期未退自动视为将其投入金曲投票。\n2、总选周边奖励邮费及地址登记截止时间为9月15日，登记链接在owhat，还有想要领取自己总选🍊奖励的大埋请及时前往登记。登记时请备注自己🍊ID及应得奖励（奖励对照表在群文件）\n【桃叭生日开屏应援】\n每个id仅限购一份，单价0.1元，满3000次解锁 https://www.taoba.club/index/#/pages/idols/detail?id=8876')
});
