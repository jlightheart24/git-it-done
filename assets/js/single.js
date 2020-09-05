var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEL = document.querySelector("#limit-warning")

// get info from github
var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
                if (response.headers.get("link")) {
                    displayWarning(repo);
                };
            });
        }
        else {
            alert("There was a problem with your request!")
        }
    });
};

// create display for issues
var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent ="This repo has no open issues!";
        return;
    }
    for (var i = 0; i < issues.length; i++) {
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        var titleEL = document.createElement("span");
        titleEL.textContent = issues[i].title;

        issueEl.appendChild(titleEL);

        var typeEl = document.createElement("span");

        if (issues[i].pull_reequest) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)"
        }

        issueEl.appendChild(typeEl);
        issueContainerEl.appendChild(issueEl);
    }
};

// warning if there are more than 30 issues
var displayWarning = function(repo) {
    limitWarningEL.textContent = "To see more than 30 issues visit :"

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issuse on Github.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank")

    limitWarningEL.appendChild(linkEl);
};

getRepoIssues("facebook/react");