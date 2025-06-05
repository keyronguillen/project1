# tests/test_github_api.py
import unittest
from github_api import fetch_repos

class TestGitHubAPI(unittest.TestCase):
    def test_valid_user(self):
        repos = fetch_repos("octocat")
        self.assertIsInstance(repos, list)
        self.assertGreater(len(repos), 0)

    def test_invalid_user(self):
        repos = fetch_repos("nonexistentuser1234567890")
        self.assertIsNone(repos)

if __name__ == "__main__":
    unittest.main()
