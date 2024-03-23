import { Outlet } from "react-router-dom"

const AppLayout = () => {

  return (
    <main className="flex flex-col h-screen px-4 lg:px-12">
      <header className="flex justify-between py-7">
      </header>
      <section className="flex-1">
        <Outlet />
      </section>
      <footer></footer>
    </main>
  )
}

export default AppLayout
