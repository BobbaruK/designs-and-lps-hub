import fs from "fs";
import { Root } from "mdast";
import path from "path";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { promisify } from "util";

const readFileAsync = promisify(fs.readFile);

type ChangelogEntry = {
  version: string;
  date: string;
  sections: {
    [sectionTitle: string]: string[];
  };
};

// 🔧 modifică aici URL-ul tău
const GITHUB_RAW_URL =
  "https://raw.githubusercontent.com/USERNAME/REPO/BRANCH/docs/changelog.md";

async function getMarkdown(fileName: string): Promise<string> {
  try {
    const res = await fetch(GITHUB_RAW_URL);
    if (!res.ok) throw new Error(`GitHub fetch failed with ${res.status}`);

    console.log("Loaded changelog from GitHub");

    return await res.text();
  } catch (err) {
    if (err instanceof Error) {
      console.warn(
        `GitHub fetch failed (${err.message}), trying local fallback...`,
      );
    } else {
      console.warn(`GitHub fetch failed, trying local fallback...`);
    }

    const filePath = path.join(process.cwd(), "docs", fileName);

    try {
      return await readFileAsync(filePath, "utf-8");
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
}

export async function parseMD(fileName: string): Promise<ChangelogEntry[]> {
  const markdown = await getMarkdown(fileName);
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
