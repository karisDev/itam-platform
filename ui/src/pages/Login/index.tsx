import LogoSvg from "@/assets/logo.svg";
import CreateTeam from "@/dialogs/CreateTeam";
import AuthStore from "@/stores/AuthStore";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginView = () => {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, name, nickname, password, repeatPassword } = Object.fromEntries(
      formData.entries()
    ) as {
      email: string;
      name: string;
      nickname: string;
      password: string;
      repeatPassword: string;
    };

    console.log(email, name, nickname, password, repeatPassword);
    if (password !== repeatPassword) {
      return;
    }

    const result = await AuthStore.register(email, name, nickname, password);

    if (result) {
      navigate("/profile");
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };
    const result = await AuthStore.login(email, password);

    if (result) {
      navigate("/profile");
    }
  };

  return (
    <main className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center">
        <LogoSvg width={93} height={34} />
        <h3 className="mt-8 text-xl">Вход</h3>
        {register ? (
          <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-2">
            <Input name="email" label="Почта" type="email" required className="w-80" />
            <Input name="nickname" label="Никнейм" required className="w-80" />
            <Input name="name" label="ФИО" required className="w-80" />
            <Input name="password" label="Пароль" type="password" required className="w-80" />
            <Input
              name="repeatPassword"
              label="Повторите пароль"
              type="password"
              required
              className="w-80"
            />
            <Button className="mt-3">Зарегистрироваться</Button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-2">
            <Input name="email" label="Почта" type="email" required className="w-80" />
            <Input name="password" label="Пароль" type="password" required className="w-80" />
            <Button className="mt-3">Авторизоваться</Button>
          </form>
        )}
        <p className="text-center text-text-secondary mt-4">
          {register ? "Уже в клубе?" : "Еще не в клубе?"}{" "}
          <button onClick={() => setRegister((r) => !r)} className="text-text-link">
            {register ? "← Войти" : "Присоединяйся →"}
          </button>
        </p>
      </div>
    </main>
  );
};

export default LoginView;
