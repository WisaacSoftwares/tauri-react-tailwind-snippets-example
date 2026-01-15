import { BaseDirectory, readTextFile, remove } from "@tauri-apps/plugin-fs";
import { useSnippetStore } from "../store/snippetsStore";
import { cn } from "../utils/classes";
import { join } from "@tauri-apps/api/path";
import toast from "react-hot-toast";
import { MdClose, MdDelete } from "react-icons/md";

interface Props {
  snippetName: string;
}

function SnippetItem({ snippetName }: Props) {
  const { setSelectedSnippet, selectedSnippet, removeSnippetName } = useSnippetStore();

  const handleDelete = async () => {
    const accept = await window.confirm('Are you sure you want to delete this snippet?');

    if (!accept) return;

    const filePath = await join('tauri_app_snippets_files', snippetName);
    await remove(filePath, {
      baseDir: BaseDirectory.Document
    });
    removeSnippetName(snippetName);

    toast.success("Snippet deleted");
  }

  return (
    <div className={cn("flex justify-between py-2 px-4", snippetName === selectedSnippet?.name ? "bg-yellow-900" : "hover:bg-slate-700/50 hover:cursor-pointer")}
      key={snippetName}
      onClick={async () => {
        const filePath = await join('tauri_app_snippets_files', snippetName);
        const code = await readTextFile(filePath, {
          baseDir: BaseDirectory.Document
        });
        setSelectedSnippet({ name: snippetName, code: code });
      }}>
      <h1>{snippetName}</h1>

      <div className="flex gap-2">
        <button className={cn("flex justify-center items-center px-2 rounded-sm cursor-pointer", snippetName !== selectedSnippet?.name ? "text-neutral-600 hover:text-red-300" : "text-neutral-500 hover:text-red-200")} onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}>
          <MdDelete />
        </button>
        <button className={cn("flex justify-center items-center px-2 rounded-sm cursor-pointer text-neutral-500 hover:text-white", snippetName !== selectedSnippet?.name ? "hidden" : "")} onClick={(e) => {
          e.stopPropagation();
          setSelectedSnippet(null);
        }}>
          <MdClose />
        </button>
      </div>
    </div>
  )
}

export default SnippetItem