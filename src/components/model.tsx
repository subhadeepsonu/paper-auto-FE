import { IoClose } from "react-icons/io5"
export default function FormPopUp(props: {
    open: boolean,
    setOpen: any,
    title: string,
    form: any
}) {
    if (!props.open) return null
    else {
        return <div onClick={() => {
            props.setOpen(false)
        }} className="h-screen w-full z-50 bg-black/20 flex justify-center items-center fixed top-0 left-0">
            <div onClick={(e) => {
                e.stopPropagation()
            }} className="h-fit w-80 bg-white rounded-sm   ">
                <div className="h-full w-full  flex justify-center items-center relative">
                    <div className="absolute top-2 left-2 hover:cursor-pointer rounded-full border-2 w-8 h-8 border-black flex justify-center items-center" onClick={() => {
                        props.setOpen(false)
                    }}>
                        <IoClose className="font-semibold " />
                    </div>
                    <p className="text-lg font-medium h-10 flex justify-center items-center">{props.title}</p>
                </div>
                <div className="p-6">
                    {props.form}
                </div>

            </div>
        </div>
    }
}