var Controller = (function () {
    var self = this;
    var model = new ViewModel();
    self.init = function() {
        model.loadPage(window.location.hash);
        window.addEventListener("hashchange", function (e) {
            model.loadPage(window.location.hash);
        }, false);
    };
    return {
        init: self.init
    };
}());

window.onload = function () {
    Controller.init();
};
