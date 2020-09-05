var issueContainerEl = document.querySelector("#issues-container");

// get info from github
var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
            });
        }
        else {
            alert("There was a problem with your request!")
        }
    });
};

// create display for issues
var displayIssues = function(issues) {
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

getRepoIssues("facebook/react");