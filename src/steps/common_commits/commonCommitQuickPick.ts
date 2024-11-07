import { CommitMessageType } from "../../buildCommitMessage";
import createQuickPick from "../../createQuickPick";
import { getConfiguration } from "../../getConfiguration";

type CommonCommitQuickPickType = {
  label: string;
  description: string;
  message?: CommitMessageType;
};

export default async function commonCommitQuickPick(): Promise<CommitMessageType| undefined> {
  return new Promise(async (resolve, reject) => {
    const config = await getConfiguration();
	
    const options: CommonCommitQuickPickType[] = [
      {
        label: "New Commit",
        description: "Create a new commit with a custom message.",
        message: undefined,
      },
    ];

    const saved_common_commits = config
      .get("commonCommits")
      .map((commit: CommonCommitQuickPickType) => ({
        label: commit.description,
        description: JSON.stringify(commit),
        detail: "From saved common commits.",
        message: commit,
      }));

    for (let i = 0; i < saved_common_commits.length; i++) {
      const formatted_scope = saved_common_commits[i];
      options.push(formatted_scope);
    }

    try {
      const selected_commit = await createQuickPick(
        "Common Commit", // title
        "Select the common commit you want to use.", // placeholder
        options, // items
        1, // step
        false, // canSelectMany
				undefined
      );

      const selectedCommit = selected_commit[0] as CommonCommitQuickPickType;

      resolve(selectedCommit.message);
    } catch (rejectedValue) {
      reject(rejectedValue);
    }
  });
}
