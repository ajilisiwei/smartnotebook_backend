let Msg={};

let MSG_TYPE = {
    SUCCESS:0,
    PROMPT:1,
    ERROR:-1,
    FAIL:-2
};

function Success(message, data) {
    return {
        result:MSG_TYPE.SUCCESS,
        msg:message || 'Success',
        data:data || []
    }
}

function Prompt(message, data) {
    return {
        result:MSG_TYPE.PROMPT,
        msg:message || '',
        data:data || []
    }
}

function Error(message) {
    return {
        result:MSG_TYPE.ERROR,
        msg:message || 'Server Error',
        data:null || []
    }
}

function Fail(message) {
    return {
        result:MSG_TYPE.FAIL,
        msg:message || 'Server Error',
        data:null ||[]
    }
}

Msg.MSG_TYPE=MSG_TYPE;
Msg.Error=Error;
Msg.Success=Success;
Msg.Fail=Fail;
Msg.Prompt=Prompt;
module.exports = exports = Msg;