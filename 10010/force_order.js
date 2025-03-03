(function() {
    const modifiedResponse = {
        code: 0,
        msg: {
            msg: "",
            is_change_yes_no: 0,
            status: 0
        },
        data: {
            msg: "",
            is_change_yes_no: 0,
            status: 0
        }
    };

    $done({ body: JSON.stringify(modifiedResponse) });
})();