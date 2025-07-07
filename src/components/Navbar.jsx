function Navbar({ page, setPage }) {
  return (
    <nav className="bg-slate-900 text-white px-3 py-1 items-center flex justify-between">
     <div >
      <img src="./src/assets/images/logo.png" className="w-25 h-12 "/>
     </div>
      <div className="space-x-4">
        <button
          onClick={() => setPage("home")}
          className={`px-3 py-1 rounded ${page === "home" ? "bg-blue-500" : "bg-gray-700"}`}
        >
          Home
        </button>
        <button
          onClick={() => setPage("tasks")}
          className={`px-3 py-1 rounded ${page === "tasks" ? "bg-blue-500" : "bg-gray-700"}`}
        >
          Your Tasks
        </button>
      </div>
    </nav>
  )
}

export default Navbar
