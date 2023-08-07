import { extensions } from 'vscode';
import { Exports } from './types/git';

export default function initiateGit() {
    const git_extension: Exports = extensions.getExtension('vscode.git')?.exports;
    const repo = git_extension.getAPI(1).repositories[0];
    return repo;
}