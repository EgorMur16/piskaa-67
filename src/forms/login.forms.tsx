"use client"
import { Form, Input, Button } from "@heroui/react";
import { useState } from "react";

interface IProps {
  onClose: () => void
}

const LoginForm = ({ onClose }: IProps) => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submited: ", formData)

    onClose()
  }

  return (
    <Form className="w-full" onSubmit={onSubmit}>
      <Input
        isRequired
        label="Email"
        placeholder="Введите почту"
        type="email"
        classNames={{
          input: "text-sm  focus:outline-none"
        }}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validate={(value) => {
          if (!value) return 'Почта обязательна'
          return null
        }}
      />
      <Input
        isRequired
        label="Пароль"
        placeholder="Введите пароль"
        type="password"
        classNames={{
          input: "text-sm  focus:outline-none"
        }}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value) return 'Пароль обязателен'
          return null
        }}
      />
      <div className="flex w-[100%] gap-4 items-center justify-end pt-8">
        <Button onPress={onClose}>
          Отмена
        </Button>
        <Button type="submit">
          Войти
        </Button>
      </div>

    </Form>
  );
}

export default LoginForm;