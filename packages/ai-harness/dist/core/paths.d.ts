export declare const HARNESS_DIR = ".aiharness";
export declare const LEGACY_HARNESS_DIR = ".xxx";
export declare function exists(path: string): Promise<boolean>;
export declare function isDirectory(path: string): Promise<boolean>;
/**
 * Keeps existing Harness repositories working while new projects use the
 * product-facing directory name. An initialized project never moves files as
 * a side effect of a read or update command.
 */
export declare function resolveHarnessDirectory(root: string): Promise<string>;
export declare function findProjectRoot(from: string): Promise<string>;
//# sourceMappingURL=paths.d.ts.map