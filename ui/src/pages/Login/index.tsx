import { AuthEndpoint } from "api/endpoints/AuthEndpoint";

const LoginView = () => {
  return (
    <main className="flex items-center justify-center h-full">
      <div className=""></div>
      <button onClick={() => AuthEndpoint.login("user@example.com", "string").then(console.log)}>
        Hello
      </button>
    </main>
  );
};

export default LoginView;
