import React from 'react'
import { Modal } from 'antd';
import styled from 'styled-components'
type Props = {
    isModalOpen:boolean
    handleOk:any
    handleCancel:any
    title:string
    isCancel?:boolean
}

const ModalStyled=styled(Modal)`

`

const ModalComp:React.FC<Props> = ({handleOk,isModalOpen,handleCancel,title,isCancel=true}) => {
  return (
    <ModalStyled title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>{title}</p>

      </ModalStyled>
  )
}

export default ModalComp