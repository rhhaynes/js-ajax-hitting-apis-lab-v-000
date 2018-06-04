function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText);
  const repoList = '<ul>'+repos.map(r => `<li>${r.name} - <a href="#" data-repo="${r.name}" onclick="getCommits(this)">Get Commits</a></li>`).join('')+'</ul>';
  document.getElementById("repositories").innerHTML = repoList;
}

function getRepositories() {
  const req  = new XMLHttpRequest();
  const user = document.getElementById('username').value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${user}/repos`);
  req.send();
}

function getCommits(el) {
  const name = el.dataset.repo;
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}