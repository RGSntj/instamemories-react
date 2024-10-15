import { useEffect } from "react";

import { Book } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

import { IoMdMenu } from "react-icons/io";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

import { useNavigate } from "react-router-dom";
import { api } from "./service/api";
import { AxiosError } from "axios";
import { IUsuario } from "./types/IUsuario";
import { IMemorias } from "./types/IMemorias";

export function App() {
  const [usuario, setUsuario] = useState<IUsuario | null>(null);

  const [memorias, setMemorias] = useState<IMemorias[]>([]);

  const [conteudo, setConteudo] = useState("");

  const [cardAberto, setCardAberto] = useState(false);

  const [modalRecordacaoAberto, setModalRecordacaoAberto] = useState(false);

  function abrirCard() {
    setCardAberto(!cardAberto);
  }

  function abrirModalRecordacao() {
    setModalRecordacaoAberto(true);
  }

  const navigate = useNavigate();

  useEffect(() => {
    async function verificarUsuarioLogado() {
      try {
        const token = localStorage.getItem("token");

        if (!token) return navigate("/login");

        const response = await api.get("/perfil", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsuario(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);

          if (error.response?.status === 401) navigate("/login");
        }
      }
    }

    verificarUsuarioLogado();
  }, []);

  useEffect(() => {
    async function buscarMemorias() {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/diarios", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMemorias(response.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);

          if (error.response?.status === 401) navigate("/login");
        }
      }
    }

    buscarMemorias();
  }, []);

  return (
    <div className="flex flex-col gap-2 h-screen max-w-[850px] m-auto p-2">
      <header className="flex items-center justify-between py-[2%]">
        <a href="/" className="text-black text-xl">
          FREI<span className="text-zinc-500">MEMÓRIAS</span>
        </a>

        <div className="flex items-center gap-3">
          <Dialog
            onOpenChange={setModalRecordacaoAberto}
            open={modalRecordacaoAberto}
          >
            <DialogTrigger>
              <Button
                variant="ghost"
                className="flex items-center gap-1 uppercase font-normal rounded-sm"
              >
                Nova recordação
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-medium uppercase flex items-center gap-1">
                  <Book className="size-5" /> Novo diário
                </DialogTitle>
                <DialogDescription>
                  <h2>
                    Descreva uma emoção, lembrança ou história que você jamais
                    quer esquecer.
                  </h2>
                </DialogDescription>

                <div className="mt-2">
                  <Textarea
                    maxLength={400}
                    placeholder="Qual lembrança você guardaria para sempre?"
                    onChange={(e) => setConteudo(e.target.value)}
                    value={conteudo}
                    className="min-h-56 resize-none"
                  />

                  <span
                    className={`${
                      conteudo.length === 400 ? "text-red-500" : "text-zinc-500"
                    } text-sm`}
                  >
                    {conteudo.length}/400
                  </span>
                </div>

                <DialogFooter>
                  <Button className="uppercase bg-yellow-300 hover:bg-yellow-400 text-black font-normal">
                    Registrar
                  </Button>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <IoMdMenu className="size-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="font-medium">
                Minhas Informações
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Meu perfil</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 ">
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <h1 className="uppercase font-montserrat text-sm font-semibold">
        memórias de {usuario?.usuario}
      </h1>

      {memorias.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {memorias.map((m) => (
            <Card
              className={`${
                cardAberto ? "h-auto" : "max-h-[150px]"
              } h-full cursor-pointer overflow-hidden`}
              onClick={abrirCard}
            >
              <CardHeader className="py-3">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Image de perfil"
                    />
                    <AvatarFallback>{m.autor[0].toUpperCase()}</AvatarFallback>
                  </Avatar>

                  <p className="text-sm text-zinc-500">@{m.autor}</p>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm font-roboto text-zinc-700">
                  {m.conteudo}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center mt-4 flex-1">
          <p className="text-center font-roboto text-gray-700">
            Você ainda não possui nenhuma memória registrada. <br /> Que tal{" "}
            <a
              className="underline text-yellow-500 cursor-pointer"
              onClick={abrirModalRecordacao}
            >
              criar a sua primeira agora?
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
