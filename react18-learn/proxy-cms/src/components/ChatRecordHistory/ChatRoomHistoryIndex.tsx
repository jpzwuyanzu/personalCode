import React, { useRef, useState } from 'react';
import { Modal } from 'antd';
import Draggable from 'react-draggable';
import ChatRoom from './ChatRoom'


interface IProps {
  open: boolean
  closeChatRoom: () => void
}

const ChatRoomHistoryIndex: any = ({ open, closeChatRoom }:IProps) => {
  // const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });
  // const draggleRef = useRef<HTMLDivElement>(null);
  const nodeRef =useRef<HTMLDivElement>(null);


  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    closeChatRoom()
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
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
              聊天记录
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
          <ChatRoom/>
        </Modal> : null
      }
      
    </>
  );
};

export default ChatRoomHistoryIndex;