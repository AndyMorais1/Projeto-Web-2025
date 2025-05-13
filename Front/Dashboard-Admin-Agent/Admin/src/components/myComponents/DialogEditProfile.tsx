import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { toast } from 'sonner';

export function DialogEditProfile() {
  const [isOpen, setIsOpen] = useState(false);

  // Formulário com react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log('Dados do formulário:', data);
    // Lógica para atualizar o perfil do usuário
    setIsOpen(false); // Fechar o modal após salvar
  };

  return (
    <div className='p-2.5'>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>Edit Profile</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
