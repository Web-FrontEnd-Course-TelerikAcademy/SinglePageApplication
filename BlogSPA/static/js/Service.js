var Service = (function () {
    var self = this;
    self.ajaxRequest = function(requestType, url, data) {
        return $.ajax({
            type: requestType,
            url: url,
            dataType: "json",
            data: data
        });
    };
    return {
        ajaxRequest: self.ajaxRequest
    };
}());