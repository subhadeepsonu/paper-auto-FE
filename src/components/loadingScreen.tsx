export default function LoadingScreen() {
    return <div className="h-full w-full bg-gray-100 flex justify-center items-center">
        <div className="flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8 8 0 0019.709 6L22 8.291a10 10 0 00-15.418 3.418L6 12.5"></path>
            </svg>
            <p className="text-lg mt-2">Loading...</p>
        </div>
    </div>
}