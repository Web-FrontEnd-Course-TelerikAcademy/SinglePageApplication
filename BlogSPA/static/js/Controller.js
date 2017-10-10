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
    self.addComment = function () {
        model.addComment();
    };
    return {
        init: self.init,
        createPost: self.createPost,
        addComment: self.addComment
    };
}());

window.onload = function () {
    Controller.init();
};
