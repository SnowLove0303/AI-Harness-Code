import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
const parser = unified().use(remarkParse).use(remarkFrontmatter);
const plain = (node) => node.value ?? (node.children?.map(plain).join("") ?? "");
export function parseMarkdown(text) {
    const tree = parser.parse(text);
    const headings = [];
    const links = [];
    const codeBlocks = [];
    const walk = (node) => { if (node.type === "heading")
        headings.push({ text: plain(node).trim(), level: node.depth, line: node.position?.start.line ?? 1 }); if (node.type === "link" && node.url)
        links.push(node.url); if (node.type === "code")
        codeBlocks.push(node.value ?? ""); node.children?.forEach(walk); };
    walk(tree);
    const comments = [...text.matchAll(/<!--[\s\S]*?-->/g)].map((m) => m[0]);
    const lines = text.split(/\r?\n/);
    const sections = headings.map((heading, i) => {
        const start = heading.line;
        const next = headings.slice(i + 1).find((candidate) => candidate.level <= heading.level);
        const end = next ? next.line - 1 : lines.length;
        const content = lines.slice(start, end).join("\n");
        return { ...heading, content, comments: [...content.matchAll(/<!--[\s\S]*?-->/g)].map((m) => m[0]) };
    });
    const frontmatter = text.match(/^---\r?\n[\s\S]*?\r?\n---/)?.[0];
    return { headings, sections, links, codeBlocks, comments, ...(frontmatter ? { frontmatter } : {}), text };
}
//# sourceMappingURL=parser.js.map