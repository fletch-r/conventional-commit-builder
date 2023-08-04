import { FILE_NAME_REGEX } from "../../constants";
import { QuickPickItemsType } from "../../createQuickPick";
import changesQuickPick from "./changesQuickPick";

export type ChangesType = {
    uri: {
        path: string
    }
};

export default async function stageFiles(changes: ChangesType[]) {
    let changed_files: QuickPickItemsType[] = [];

    changes.forEach((obj: ChangesType) => {
        const file_path = obj.uri.path;
        const file_name_regex = file_path.match(FILE_NAME_REGEX);
        if (file_name_regex) {
            const file_name = file_name_regex[0];
            changed_files.push({ label: file_name, description: file_path });
        }
    });

    const chosen_files = await changesQuickPick(changed_files);

    const file_paths = chosen_files.map((obj) => obj.description);

    return file_paths;
}