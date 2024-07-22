import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Loading = () => {
    // Renders
    return (
        <div className="flex justify-center items-center gap-4">
            <p className="font-bold">Loading...</p>
            <AiOutlineLoading3Quarters className="size-8 animate-spin" />
        </div>
    )
}
