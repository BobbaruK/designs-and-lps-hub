import { Root } from "mdast";
import remarkParse from "remark-parse";
import { unified } from "unified";

type ChangelogEntry = {
  version: string;
  date: string;
  sections: {
    [sectionTitle: string]: string[];
  };
};

async function getMarkdown(githubLink: string): Promise<string> {
  try {
    const res = await fetch(githubLink, { cache: "no-store" });
    if (!res.ok) throw new Error(`GitHub fetch failed with ${res.status}`);

    return await res.text();
  } catch (localErr) {
    if (localErr instanceof Error) {
      throw new Error(
        `Failed to load changelog.md from both GitHub and local: ${localErr.message}`,
      );
    } else {
      throw new Error(
        "Failed to load changelog.md from both GitHub and local: Unknown error",
      );
    }
  }
}

export async function parseMD(githubLink: string): Promise<ChangelogEntry[]> {
  const markdown = await getMarkdown(githubLink);
  const tree = unified().use(remarkParse).parse(markdown) as Root;

  const result: ChangelogEntry[] = [];
  let currentEntry: ChangelogEntry | null = null;
  let currentSection: string | null = null;

  for (const node of tree.children) {
    if (node.type === "heading" && node.depth === 2) {
      const heading = node.children[0];
      if (heading.type === "text") {
        const match = heading.value.match(/\[(.*?)\] - (.*)/);
        if (match) {
          if (currentEntry) result.push(currentEntry);
          currentEntry = {
            version: match[1],
            date: match[2],
            sections: {},
          };
          currentSection = null;
        }
      }
    } else if (node.type === "heading" && node.depth === 3 && currentEntry) {
      const heading = node.children[0];
      if (heading.type === "text") {
        currentSection = heading.value;
        currentEntry.sections[currentSection] = [];
      }
    } else if (node.type === "list" && currentEntry && currentSection) {
      for (const item of node.children) {
        if (item.type === "listItem") {
          const paragraph = item.children[0];
          if (
            paragraph.type === "paragraph" &&
            paragraph.children[0]?.type === "text"
          ) {
            currentEntry.sections[currentSection].push(
              paragraph.children[0].value,
            );
          }
        }
      }
    }
  }

  if (currentEntry) result.push(currentEntry);
  return result;
}
