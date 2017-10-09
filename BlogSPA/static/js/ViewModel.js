var ViewModel = function () {
    var self = this;
    self.postsData;
    self.loadPage = function (currentHash) {
        var currentQuery = currentHash ? currentHash.split("?")[1] : "";
        clearWebPages();
        currentHash = currentHash ? currentHash.split("?")[0] : "";
        currentHash = currentHash.substr(1);
        document.getElementById("homeNav").style.display = 
            currentHash.indexOf("blog") > -1 || currentHash.indexOf("post") > -1 ? 
                "none" : "block";
        document.getElementById("blogNav").style.display = 
            currentHash.indexOf("blog") > -1 || currentHash.indexOf("post") > -1 ? 
                "block" : "none";
        switch (currentHash) {
            case "blog": {
                document.getElementById("postTitle").innerText = "Latest Posts";
                document.getElementById("postInfo").innerText = "";
                loadAllPosts();
            } break;
            case "blog/post":
                loadPost(currentQuery);
                break;
        };
        document.getElementById(currentHash.length > 0 ? currentHash : "#").style.display = "block";
        return true;
    };

    function loadAllPosts() {
        var dfd = $.Deferred(),
            html = "";
        Service.ajaxRequest("GET", "/blog/get-posts")
            .done(function(res) {
                self.postsData = res.data;
                document.getElementById("posts").innerHTML = "";
                for (var i = 0; i < res.data.length; i += 1) {
                    html += '<div class="card mb-4">' +
                    '<div class="card-body">' +
                    '  <h2 class="card-title">' + res.data[i]["postTitle"] + '</h2>' +
                    '  <em><p>Posted by <strong>' + res.data[i]["postUser"] + '</strong> on ' + res.data[i]["postCreateDate"] + '</p></em>' +
                    '  <p class="card-text">' + res.data[i]["postDescription"] + '</p> ' +
                    '  <a href="/#blog/post?id=' + res.data[i]["_id"] + '" class="btn btn-default pull-right">Read More</a>' +
                    '</div>' +
                    '</div>';
                }
                document.getElementById("posts").innerHTML = html;
                dfd.resolve(res);
            });
        return dfd;
    };

    function loadPost(inputQuery) {
        document.getElementById("postTitle").innerText = "";
        document.getElementById("postInfo").innerHTML = "";
        document.getElementById("postDescription").innerText = "";
        loadAllPosts()
            .done(function(res) {
                var requestedId = inputQuery.split("=")[1];
                var requestedObject = self.postsData.filter(function (obj) {
                    return obj["_id"] == requestedId;
                });

                if (requestedObject.length > 0) {
                    document.getElementById("postTitle").innerText = requestedObject[0]["postTitle"];
                    document.getElementById("postInfo").innerHTML = '<p>Posted by <strong>' + requestedObject[0]["postUser"] + '</strong> on ' + requestedObject[0]["postCreateDate"] + '</p>';
                    document.getElementById("postDescription").innerText = requestedObject[0]["postDescription"];
                }
            });
    };

    function clearWebPages() {
        var pages = document.getElementsByClassName("mainframe");
        for (var i = 0; i < pages.length; i += 1) {
            pages[i].style.display = "none";
        }
        return true;
    };
};