# github_api.py
import requests

def fetch_repos(username):
    url = f"https://api.github.com/users/keyronguillen/repos"
    params = {
        "page": page,
        "per_page": 5,
        "sort": sort,
        "direction": "desc" if sort in ["stars", "updated"] else "asc"
    }

    if sort == "stars":
        params["sort"] = "created"  # GitHub API doesn't allow sort by stars directly
        # will sort manually below

    response = requests.get(url, params=params)
    
    if response.status_code != 200:
        return None

    data = response.json()

    if sort == "stars":
        data.sort(key=lambda repo: repo["stargazers_count"], reverse=True)

    repo_list = [
        {
            "name": repo["name"],
            "stars": repo["stargazers_count"],
            "updated": repo["updated_at"],
            "url": repo["html_url"]
        }
        for repo in data
    ]
    return repo_list