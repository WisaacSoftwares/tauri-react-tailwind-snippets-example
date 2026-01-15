import { useEffect } from "react"
import { BaseDirectory, readDir } from "@tauri-apps/plugin-fs"
import { useSnippetStore } from "../store/snippetsStore"
import SnippetItem from "./SnippetItem";

const SnippetList = () => {
  const { snippetNames, setSnippetNames } = useSnippetStore();

  useEffect(() => {
    async function loadFiles() {
      const result = await readDir('tauri_app_snippets_files', {
        baseDir: BaseDirectory.Document
      });
      const fileNames = result.map(file => file.name);
      setSnippetNames(fileNames);
    }
    loadFiles();
  }, [])

  return (
    <div>
      {snippetNames.map(snippetName => (
        <div>
          <SnippetItem snippetName={snippetName} />
        </div>
      ))}
    </div>
  )
}

export default SnippetList