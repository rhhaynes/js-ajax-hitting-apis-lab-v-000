function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText);
  debugger;
  const repoList = '<ul>' + repos.map(r => `<li>${r.name} -
    <a href="#" data-repo="${r.name}" onclick="getBranches(this)">Get Branches</a> -
    <a href="#" data-repo="${r.name}" onclick="getCommits(this)">Get Commits</a></li>`).join('') + '</ul>';
  document.getElementById("repositories").innerHTML = repoList;
}

function displayBranches(){
  const branches = JSON.parse(this.responseText);
  const branchesList = '<ul>' + branches.map(branch =>
    `<li><strong>${branch.author.login}</strong> - ${branch.branch.message}</li>`
    ).join('') + '</ul>';
  document.getElementById('details').innerHTML = branchesList;
}

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  debugger;
  const commitsList = '<ul>' + commits.map(commit =>
    `<li><strong>${commit.author.login}</strong> - ${commit.commit.message}</li>`
    ).join('') + '</ul>';
  document.getElementById('details').innerHTML = commitsList;
}

function getRepositories() {
  const req  = new XMLHttpRequest();
  const user = document.getElementById('username').value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${user}/repos`);
  req.send();
}

function getBranches(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", this.branches_url);
  req.send();
}

function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", this.commits_url);
  req.send();
}