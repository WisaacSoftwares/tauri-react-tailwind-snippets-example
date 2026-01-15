import {Toaster} from 'react-hot-toast'
import SnippetEditor from "./components/SnippetEditor"
import SnippetForm from "./components/SnippetForm"
import SnippetList from "./components/SnippetList"

const App = () => {
  return (
    <div className="bg-zinc-900 h-screen grid grid-cols-3 text-white">
      <div className="col-span-1 bg-zinc-800">
        <SnippetForm />
        <SnippetList />
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <SnippetEditor />
      </div>
      <Toaster 
        position='bottom-right'
        toastOptions={{
          style: {
            background: "#3f3f46",
            color: "#fff",
          }
        }} />
    </div>
  )
}

export default App