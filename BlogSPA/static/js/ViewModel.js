var ViewModel = function () {
    var self = this;
    self.postsData;
    self.commentsData;
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
            case "blog/createPost": {
                document.getElementById("postTitle").innerText = "";
                document.getElementById("postInfo").innerText = "";
            } break;
        };
        document.getElementById(currentHash.length > 0 ? currentHash : "#").style.display = "block";
        return true;
    };

    // Create post
    self.createPost = function () {
        var title = $('[name="postTitle"]').val().trim(),
            description = $('[name="postDescription"]').val().trim(),
            username = $('[name="postUsername"]').val().trim();

        if (title.length == 0 || description.length == 0) {
            return;
        }
        Service.ajaxRequest("POST", "/blog/createPost", {
            title: title,
            description: description,
            username: username
        }).done(function (res) {
            window.location.hash = "#blog";
        });
    };

    // Create comment
    self.addComment = function () {
        var commentDescription = $('[name="commentDescription"]').val().trim(),
        commentUsername = $('[name="commentUsername"]').val().trim();

        if (commentDescription.length == 0) {
            return;
        }
        Service.ajaxRequest("POST", "/blog/createComment", {
            commentUser: commentUsername,
            commentDescription: commentDescription,
            postId: window.location.hash.split("=")[1]
        }).done(function (res) {
            $('[name="commentDescription"]').val("");
            loadPost(window.location.hash.split("?")[1]);
        });
    };

    function loadAllPosts() {
        var dfd = $.Deferred(),
            html = "";
        Service.ajaxRequest("GET", "/blog/get-posts")
            .done(function (res) {
                self.postsData = res.data;
                document.getElementById("posts").innerHTML = "";
                for (var i = 0; i < res.data.length; i += 1) {
                    html += '<div class="card mb-4">' +
                        '<div class="card-body">' +
                        '  <h2 class="card-title">' + res.data[i]["postTitle"] + '</h2>' +
                        '  <em><p>Posted by <strong>' + res.data[i]["postUser"] + '</strong> on ' + res.data[i]["postCreateDate"].replace("T", ", ").substring(0, res.data[i]["postCreateDate"].lastIndexOf(":") + 1) + '</p></em>' +
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

    function loadAllComments() {
        var dfd = $.Deferred();
        Service.ajaxRequest("GET", "/blog/get-comments")
            .done(function (res) {
                self.commentsData = res.data;
                dfd.resolve(res);
            });
        return dfd;
    }

    function loadPost(inputQuery) {
        document.getElementById("postTitle").innerText = "";
        document.getElementById("postInfo").innerHTML = "";
        document.getElementById("postDescription").innerText = "";
        $.when(loadAllPosts(), loadAllComments())
            .done(function (resPosts, resComments) {
                var currentHtml = "";
                var requestedId = inputQuery.split("=")[1];
                var requestedObject = self.postsData.filter(function (obj) {
                    return obj["_id"] == requestedId;
                });
                var requestedObjectComments = self.commentsData.filter(function (obj) {
                    return obj["postId"] == requestedId;
                });

                if (requestedObject.length > 0) {
                    document.getElementById("postTitle").innerText = requestedObject[0]["postTitle"];
                    document.getElementById("postInfo").innerHTML = '<p>Posted by <strong>' + requestedObject[0]["postUser"] + '</strong> on ' + requestedObject[0]["postCreateDate"].replace("T", ", ").substring(0, requestedObject[0]["postCreateDate"].lastIndexOf(":") + 1) + '</p>';
                    document.getElementById("postDescription").innerText = requestedObject[0]["postDescription"];
                    document.getElementById("postComments").innerHTML = "";
                    for (var i = 0; i < requestedObjectComments.length; i += 1) {
                        currentHtml += '<div class="media mb-4">' +
                            '<img class="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="">' +
                            '<div class="media-body">' +
                            '  <h5 class="mt-0">' + requestedObjectComments[i]["commentUser"] + '</h5> on ' + requestedObjectComments[i]["commentCreateDate"].replace("T", ", ").substring(0, requestedObjectComments[i]["commentCreateDate"].lastIndexOf(":") + 1) +
                            '  ' + requestedObjectComments[i]["commentDescription"] +
                            '</div>' +
                            '</div>';
                    }
                    document.getElementById("postComments").innerHTML = currentHtml;
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