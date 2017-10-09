var ViewModel = function () {
    var self = this;
    self.loadPage = function (currentHash) {
        clearWebPages();
        currentHash = currentHash.substr(1);
        document.getElementById(currentHash.length > 0 ? currentHash : "#").style.display = "block";
        return true;
    };

    function clearWebPages() {
        var pages = document.getElementsByClassName("mainframe");
        for (var i = 0; i < pages.length; i += 1) {
            pages[i].style.display = "none";
        }
        return true;
    };
};