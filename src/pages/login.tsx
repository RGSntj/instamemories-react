import { useState } from "react";

import { BiEnvelope } from "react-icons/bi";
import { KeyRound } from "lucide-react";

import { api } from "@/service/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  async function login() {
    try {
      const response = await api.post("/login", {
        email: email,
        senha: senha,
      });

      localStorage.setItem("token", response.data.token);

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      toast.success("Login realizado com sucesso !", {
        position: "top-right",
      });

      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        const { erro } = error.response?.data as { erro: string };

        toast.error(erro.replace(" !", "."), {
          position: "top-right",
        });
      }
    }
  }

  return (
    <div className="h-[100dvh] flex items-center justify-center">
      <div className="max-w-[700px] m-auto">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="font-medium">
              FREI: Relatos e Emoções
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col gap-3">
              <Label className="flex items-center gap-1" htmlFor="email">
                <BiEnvelope className="size-4" /> Email
              </Label>
              <Input
                placeholder="tester@gmail.com"
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <Label className="flex items-center gap-1" htmlFor="senha">
                <KeyRound className="size-4" /> Senha
              </Label>
              <Input
                placeholder="******"
                id="senha"
                type="password"
                onChange={(e) => setSenha(e.target.value)}
                value={senha}
              />

              <Button
                className="uppercase bg-lime-400 hover:bg-lime-500 transition-all text-zinc-950"
                onClick={login}
                type="button"
              >
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
