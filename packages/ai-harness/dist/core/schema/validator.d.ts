import type { DocumentModel } from "../markdown/document-model.js";
import type { Capability, DocumentSchema } from "./types.js";
import type { ValidationIssue } from "../../types.js";
export declare function validateModel(model: DocumentModel, schema: DocumentSchema, root: string, capabilities?: Capability[]): Promise<ValidationIssue[]>;
//# sourceMappingURL=validator.d.ts.map