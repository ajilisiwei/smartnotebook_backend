let MSG_TYPE = {
    SUCCESS:0,
    ERROR:-1,
    FAIL:-2
};

function Msg(result,message, data) {
    return {
        result:result,
        msg:message,
        data:data
    }
}

Msg.MSG_TYPE=MSG_TYPE;
module.exports = exports = Msg;