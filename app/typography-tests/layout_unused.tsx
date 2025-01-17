import fs from "fs";
import path from "path";

import TestDirs from "./_components/TestDirs";

export default function LayoutTypographyTests({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get all directories in the typography-tests folder
  const testDirs = fs
    .readdirSync(path.join(process.cwd(), "app/typography-tests"), {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory() && /^\d+$/.test(dirent.name))
    .map((dirent) => dirent.name)
    .sort((a, b) => Number(a) - Number(b));

  return (
    <div>
      {children}
      <div className="fixed bottom-4 left-4 flex gap-2">
        <TestDirs testDirs={testDirs} />
      </div>
    </div>
  );
}
