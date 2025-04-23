import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CirclePlus } from "lucide-react";
import { usersServices } from "@/api/Users";
import { UserData } from "@/data/UserData";
import { toast } from "sonner"; 

export function DialogCreateUser({
  onUserCreated,
}: {
  onUserCreated: (user: UserData) => void;
}) {
  const [role, setRole] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleCreateUser = () => {
    const userData: UserData = {
      role,
      name,
      email,
      phone,
      password,
      status: "PENDING",
    };

    usersServices
      .createUser(userData)
      .then((createdUser) => {
        toast.success("Usuário criado com sucesso!",{
          description: `Usuário ${createdUser.name} criado com sucesso!`,
          duration: 3000,
        });
        setIsOpen(false);
        setRole("");
        setName("");
        setEmail("");
        setPhone("");
        setPassword("");

        onUserCreated(createdUser);
      })
      .catch((error) => {
        toast.error("Erro ao criar usuário.",{
          description: error.message || "Erro ao criar usuário.",
          duration: 3000,});
        console.error("Erro ao criar usuário:", error);
      });
  };

  const handleCancel = () => {
    setIsOpen(false);
    setRole("");
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <CirclePlus />
          Create User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Choose the role before creating a user.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={(value) => setRole(value)}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CLIENT">Client</SelectItem>
                <SelectItem value="AGENT">Agent</SelectItem>
                <SelectItem value="ADMIN" disabled>Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {role && (
            <form>
              <div className="grid gap-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    className="col-span-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {(role === "CLIENT" || role === "AGENT") && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        E-mail
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        className="col-span-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        className="col-span-3"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    className="col-span-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </form>
          )}
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleCreateUser}
            disabled={!role || !name || !password}
          >
            Create
          </Button>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
