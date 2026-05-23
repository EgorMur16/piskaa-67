"use client"

import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { ReactNode } from "react";

interface IProps {
    title: string,
    children: ReactNode,
    isOpen: boolean,
    onClose: () => void
} 

const CustomModal = ({isOpen, onClose, title, children}: IProps) => {
    return ( 
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>
                    <h3 className="blackc text-xl text-foreground font font-semibold">{title}</h3>
                </ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal>
        
     );
}
 
export default CustomModal;