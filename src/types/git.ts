export type ChangesType = {
    uri: {
        path: string
    }
};

export type Repositories = {
    state: {
        indexChanges: any[];
        workingTreeChanges: ChangesType[];
        HEAD: {
            name: string;
        };
    };
    add: (file_paths: (string | undefined)[]) => void;
    commit: (message: string) => Promise<void>;
    inputBox: {
        value: string;
    };
    rootUri: {
        path: string;
    }
};

export type GetAPI = {
    repositories: Repositories[];
};

export type Exports = {
    a: any;
    b: any;
    enabled: boolean;
    model: () => void;
    constructor: any;
    getAPI: (x: number) => GetAPI
    getGitPath: () => void;
    getRepositories: () => void;
};