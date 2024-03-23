import { useNavigate } from "react-router-dom"
import { Button } from "../../components"
import { BROWSER_ROUTE } from "../../constants"

const LandingPage = () => {
  const navigate = useNavigate()

  const goToLogin = () => navigate(BROWSER_ROUTE.LOGIN)
  const goToRegister = () => navigate(BROWSER_ROUTE.SIGN_UP)

  return (
    <div className="self-center flex flex-col gap-4">
      <p className="text-lg md:text-3xl lg:self-start">Bring together your</p>
      <img
        className="w-96 lg:self-start"
        src="/logo.png"
        alt="Kommunity logo"
      />
      <p className="lg:text-start">
        Queremos revolucionar a experiência universitária com uma plataforma
        centralizada para todas as necessidades do estudante,{" "}
        <b>fortalecendo a comunidade.</b>
      </p>
      <div className="flex lg:self-start gap-4">
        <Button onClick={goToLogin}>Entrar</Button>
        <Button onClick={goToRegister} inverted>
          Cadastrar
        </Button>
      </div>
    </div>
  )
}

export default LandingPage
