import { QuickPickItem } from "vscode";
import createQuickPick, { QuickPickItemsType } from "../../createQuickPick";

export default async function changesQuickPick(changed_files: QuickPickItemsType[]): Promise<QuickPickItem[]> {
    return await createQuickPick(
        'Changes to Stage', // title
        'Please select one or more changes to stage before continuing.', // placeholder
        changed_files, // items
        0, // step
        true, // canSelectMany
    );
}