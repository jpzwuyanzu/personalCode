import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Modal } from 'antd';
import Draggable from 'react-draggable';
import ChatRoom from './ChatRoom'


interface IProps {
  open: boolean
  closeChatRoom: () => void
}

const ChatRoomHistoryIndex: any = ({ open, closeChatRoom }:IProps) => {
  // const [open, setOpen] = useState(false);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  // const draggleRef = useRef<HTMLDivElement>(null);
  const nodeRef =useRef<HTMLDivElement>(null);


  const handleOk = (_e: React.MouseEvent<HTMLElement>) => {
    closeChatRoom()
  };

  const handleCancel = (_e: React.MouseEvent<HTMLElement>) => {
    // setOpen(false);
    closeChatRoom()
  };

  const onStart = (_event: any, uiData: any) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = nodeRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      {/* <Button onClick={showModal}>Open Draggable Modal</Button> */}
      {
        open ? <Modal
        width="80%"
          title={
            <div
              style={{
                width: '100%',
                cursor: 'move',
              }}
              onMouseOver={() => {
                if (disabled) {
                  setDisabled(false);
                }
              }}
              onMouseOut={() => {
                setDisabled(true);
              }}
              // fix eslintjsx-a11y/mouse-events-have-key-events
              // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
              onFocus={() => {}}
              onBlur={() => {}}
              // end
            >
              <span>聊天记录</span>
              &nbsp;&nbsp;&nbsp;<span style={{ color: 'rgba(0, 0, 0, 0.4509803922)' }}>代理昵称：{searchParams.get('agentName')}</span>
              &nbsp;&nbsp;&nbsp;<span style={{ color: 'rgba(0, 0, 0, 0.4509803922)' }}>代理ID：{searchParams.get('agentId')}</span>
            </div>
          }
          footer={ null }
          maskClosable={ false }
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          modalRender={(modal) => (
            <Draggable
            nodeRef={nodeRef}
              disabled={disabled}
              bounds={bounds}
              onStart={(event:any, uiData:any) => onStart(event, uiData)}
            >
              <div ref={nodeRef}>{modal}</div>
            </Draggable>
          )}
        >
          {/* <p><span>代理昵称：232323</span><span>代理ID：9090909090909</span></p> */}
          <ChatRoom/>
        </Modal> : null
      }
      
    </>
  );
};

export default ChatRoomHistoryIndex;