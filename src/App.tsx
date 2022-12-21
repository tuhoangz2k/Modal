import React ,{useState}from 'react';
import './App.css';
import { Button, Modal } from 'antd';
import ModalComp from './Modal/Modal';
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="App" style={{display:"flex",height:"100vh",alignItems:"center",justifyContent:"center"}}>
            <Button type="primary" onClick={showModal}>
              Open Modal
            </Button>
            <ModalComp 
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            title="Asynchronously close a modal dialog when the OK button is pressed. For example, you can use this pattern when you submit a form."></ModalComp>
    </div>
  );
}

export default App;
