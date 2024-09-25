import { workspace } from "vscode";
import initiateGit from "./initiateGit";
import { Options } from "./types/options";

const { cosmiconfig } = require("cosmiconfig");

export async function getConfiguration() {
  const workspace_config = workspace.getConfiguration('conventionalCommitBuilder');

  // Use config file if present
  const repo = initiateGit();

  const moduleName = "commitbuilder";

  const explorer = cosmiconfig(moduleName);

  // Search for a configuration by walking up directories.
  // See documentation for search, below.
  const configFile = await explorer.search(repo.rootUri.path)
    .then(
      (result: { config: Options; filepath: string; isEmpty: boolean }) => {
        // result.config is the parsed configuration object.
        // result.filepath is the path to the config file that was found.
        // result.isEmpty is true if there was nothing to parse in the config file.
        if (result) {
          return new Map(Object.entries(result.config));
        }
        return null;
      }
    )
    .catch((error: any) => {
      console.error(error);
      return null;
    });

  if (configFile) {
    return configFile;
  }

  // if not, use default workspace settings
  return workspace_config;
}
