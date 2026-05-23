"use client"

import CustomModal from "@/component/common/modal";
import RegisterForm from "@/forms/register.forms";

interface IProps {
    isOpen: boolean,
    onClose: () => void
} 

const RegistrationModal = ({isOpen, onClose}: IProps) => {
    return <CustomModal isOpen={isOpen} onClose={onClose} title="Создать аккаунт">
        <RegisterForm onClose={onClose} />
    </CustomModal>;
}
 
export default RegistrationModal;