import { writeTextFile, exists, mkdir } from '@tauri-apps/plugin-fs'
import { BaseDirectory, join } from '@tauri-apps/api/path'
import { useRef } from 'react';
import { useSnippetStore } from '../store/snippetsStore';
import toast from 'react-hot-toast';

const SnippetForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addSnippetName, setSelectedSnippet, snippetNames } = useSnippetStore();

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();

      if (!inputRef.current ) return;

      const snippetName = inputRef.current.value + '.js';

      if (snippetNames.includes(snippetName)) {
        toast.error("This snippet name already exists!");
        return;
      }

      if (!await exists('tauri_app_snippets_files', {
        baseDir: BaseDirectory.Document
      })) {
        await mkdir('tauri_app_snippets_files', {
          baseDir: BaseDirectory.Document
        })
      }
      
      const filePath = await join('tauri_app_snippets_files', snippetName);

      await writeTextFile(filePath, '', {
        baseDir: BaseDirectory.Document
      });

      addSnippetName(snippetName);
      setSelectedSnippet({ name: snippetName, code: null });

      inputRef.current.value = '';

      toast.success("New snippet was created!")
    }}>
      <input type="text" ref={inputRef}
        placeholder="Write a Snippet"
        className="bg-zinc-700 w-full border-none outline-none p-4" />
      <button className="hidden">Save</button>
    </form>
  )
}

export default SnippetForm