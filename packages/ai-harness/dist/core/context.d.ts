import { z } from "zod";
declare const domains: z.ZodEnum<{
    architecture: "architecture";
    backend: "backend";
    frontend: "frontend";
    product: "product";
    reliability: "reliability";
    security: "security";
}>;
export type ContextDomain = z.infer<typeof domains>;
export declare function getProjectContext(domain: string, from?: string): Promise<{
    domain: ContextDomain;
    root: string;
    documents: {
        path: string;
        content: string;
    }[];
}>;
export {};
//# sourceMappingURL=context.d.ts.map