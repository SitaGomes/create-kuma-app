import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="h-screen flex flex-col box-border">
      <main className="flex-1 flex">
        <section className="flex px-4 lg:px-10 w-full lg:w-[700px]">
          <Outlet />
        </section>
      </main>
      <footer></footer>
    </div>
  );
};

export default AuthLayout;
