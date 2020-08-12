const { Octokit } = require("@octokit/rest");

module.exports.createGitHubRepo = async (repoName, repoDescription) => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN)
    return {
      warning: "No GitHub Token provided. Will not create the online repo.",
    };
  try {
    const octokit = new Octokit({ auth: GITHUB_TOKEN });
    const { data } = await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description: repoDescription,
      is_template: true,
    });
    const { ssh_url, clone_url } = data;
    return { sshUrl: ssh_url, cloneUrl: clone_url };
  } catch (error) {
    const { errors } = error;

    if (
      errors &&
      errors.length === 1 &&
      errors[0].message === "name already exists on this account"
    )
      return { error: "Repo already exists" };

    return { error };
  }
};
