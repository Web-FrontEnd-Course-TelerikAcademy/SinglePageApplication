var Service = (function () {
    var self = this;
    self.getAjax = function() {
        alert("Test");
    };
    return {
        getAjax: self.getAjax
    };
}());