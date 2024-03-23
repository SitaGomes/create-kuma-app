import { Outlet } from "react-router-dom"

import { motion } from "framer-motion"

const AuthLayout = () => {

  return (
    <div className="h-screen flex flex-col box-border">
      <main className="flex-1 flex">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex px-4 lg:px-10 w-full lg:w-[700px]">
          <Outlet />
        </motion.section>
      </main>
      <motion.footer
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}>
        
      </motion.footer>
    </div>
  )
}

export default AuthLayout
