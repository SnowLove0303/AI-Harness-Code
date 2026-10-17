import { relative, resolve } from "node:path";
export function resolveSchema(schemas, file, root = process.cwd()) {
    const normalized = relative(resolve(root), resolve(file)).replace(/\\/g, "/");
    return schemas.find((schema) => schema.path === normalized || schema.path === file.replace(/\\/g, "/"));
}
//# sourceMappingURL=resolver.js.map