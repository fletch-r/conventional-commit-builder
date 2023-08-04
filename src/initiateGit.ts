import { extensions } from 'vscode';

// TODO: Assign types as vscode assigns everything to `any`.
export default function initiateGit() {
    const git_extension = extensions.getExtension('vscode.git')?.exports;
    const repo = git_extension?.getAPI(1)?.repositories[0];

    return repo;
}