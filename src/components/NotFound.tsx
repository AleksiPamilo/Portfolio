const NotFound: React.FC = () => {
    return (
        <main className="flex flex-col items-center gap-3 justify-center w-full h-screen">
            <h1 className="text-4xl font-semibold">404</h1>
            <p className="text-xl font-semibold">Page not found!</p>

            <button className="bg-zinc-800 py-3 px-8 rounded-md hover:bg-zinc-700" onClick={() => { window.history.back(); }}>
                Go back
            </button>
        </main>
    )
}

export default NotFound;
