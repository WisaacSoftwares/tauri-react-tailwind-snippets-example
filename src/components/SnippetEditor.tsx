import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react"
import { useSnippetStore } from "../store/snippetsStore"
import { BaseDirectory, writeTextFile } from "@tauri-apps/plugin-fs";
import { join } from "@tauri-apps/api/path";
import {PiPencilLine} from 'react-icons/pi'

const SnippetEditor = () => {
  const [text, setText] = useState<string | undefined>('');
  const { selectedSnippet } = useSnippetStore();

  useEffect(() => {
    if (!selectedSnippet) return;

    const saveText = setTimeout(async () => {
      const filePath = await join('tauri_app_snippets_files', selectedSnippet.name);
      writeTextFile(filePath, text ?? "", {
        baseDir: BaseDirectory.Document
      })
    }, 1000);

    return () => {
      clearTimeout(saveText);
    }
  }, [text]);

  return selectedSnippet ? (
    <Editor
      theme="vs-dark"
      defaultLanguage="javascript"
      options={{
        fontSize: 20
      }}
      onChange={value => setText(value)}
      value={selectedSnippet.code ?? ''}
    />
  ) : (
    <>
      {/* <h1>No Snippet selected</h1> */}
      <PiPencilLine className="text-7xl text-neutral-500" />
    </>
  )
}

export default SnippetEditor