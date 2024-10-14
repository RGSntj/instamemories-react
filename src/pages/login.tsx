import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound } from "lucide-react";
import { BiEnvelope } from "react-icons/bi";

export function Login() {
  return (
    <div className="h-[100dvh] flex items-center justify-center">
      <div className="max-w-[700px] m-auto">
        <Card className="w-[450px] bg-">
          <CardHeader>
            <CardTitle className="font-medium">
              FREI: Relatos e Emoções
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form action="" className="flex flex-col gap-3">
              <Label className="flex items-center gap-1" htmlFor="email">
                <BiEnvelope className="size-4" /> Email
              </Label>
              <Input placeholder="tester@gmail.com" id="email" type="email" />

              <Label className="flex items-center gap-1" htmlFor="senha">
                <KeyRound className="size-4" /> Senha
              </Label>
              <Input placeholder="******" id="senha" type="password" />

              <Button className="uppercase bg-lime-400 hover:bg-lime-500 transition-all text-zinc-950">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
