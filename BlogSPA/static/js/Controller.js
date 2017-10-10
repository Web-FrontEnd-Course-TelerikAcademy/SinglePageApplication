var Controller = (function () {
    var self = this;
    var model = new ViewModel();
    self.init = function () {
        model.loadPage(window.location.hash);
        window.addEventListener("hashchange", function (e) {
            model.loadPage(window.location.hash);
        }, false);
    };
    self.createPost = function () {
        model.createPost();
    };
    return {
        init: self.init,
        createPost: self.createPost
    };
}());

window.onload = function () {
    Controller.init();
};
