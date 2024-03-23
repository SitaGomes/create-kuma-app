import { Outlet } from "react-router-dom"
import { Divider } from "../../../components"
import { useBreakpoint } from "../../../hooks"
import { BREAKPOINTS } from "../../../constants"

const AppLayout = () => {
  const breakPoint = useBreakpoint()
  const isLaptop = breakPoint === BREAKPOINTS.LAPTOP

  return (
    <main className="flex flex-col h-screen px-4 lg:px-12">
      <header className="flex justify-between py-7">
      </header>
      <Divider className={`${isLaptop ? "mb-16" : "mb-8"}`} />
      <section className="flex-1">
        <Outlet />
      </section>
      <footer></footer>
    </main>
  )
}

export default AppLayout
