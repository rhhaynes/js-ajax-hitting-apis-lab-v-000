function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText);
  debugger;
  const repoList = '<ul>' + repos.map(r => `<li>${r.name}<br/>
    <a href="${r.html_url}">${r.html_url}</a><br/>
    <a href="#" data-repo="${r.name}" onclick="getBranches(this, ${r.full_name})">Get Branches</a> |
    <a href="#" data-repo="${r.name}" onclick="getCommits(this, ${r.full_name})">Get Commits</a></li>`).join('') + '</ul>';
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

function getBranches(el, user) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${user}/${name}/branches`);
  req.send();
}

function getCommits(el, user) {
  debugger;
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${user}/${name}/commits`);
  req.send();
}