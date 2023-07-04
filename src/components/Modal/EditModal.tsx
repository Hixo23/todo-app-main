import { useContext, useState } from "react"
import { ThemeContext } from "../../contexts/themeContext"

export const EditModal = ({name, id, handleEdit, error}: { name: string, id: number, error: string, handleEdit: (id: number, todoContent: string ) => void}) => {
    const [todoContent, setTodoContent] = useState("")
    const themeIsDark = useContext(ThemeContext);

    return (
        <div className="fixed flex justify-center items-center w-screen h-screen bg-black/[0.9] z-20 top-0 left-0">
            <div className={`w-96  ${ themeIsDark ? "bg-slate-800 text-white" : "bg-gray-300 text-slate-800"} flex  flex-col px-4 rounded-xl`}>
                <p className={`text-xl ${themeIsDark ? 'text-white': 'text-slate-800'} text-center mt-4`}>Edit Todo</p>
               <form className="flex flex-col justify-center pb-8 gap-5" action="">
               <div>
               <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodoContent(e.target.value)} placeholder={name} className={`${ themeIsDark ? "bg-slate-700 text-white" : "bg-gray-200 text-slate-700"} rounded-lg md:outline-none p-4 w-full py-2 mt-4`} type="text" />
                <p className="text-red-600 text-base mt-2">{error}</p>
               </div>
                <button type="button" onClick={() => handleEdit(id, todoContent)} className={`py-2 px-5 rounded-lg ${themeIsDark ? 'bg-slate-700 text-white' : "bg-gray-200 text-slate-700"}`}>Edit</button>
               </form>
            </div>
        </div>
    )
}