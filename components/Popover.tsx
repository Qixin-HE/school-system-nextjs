import { Popover } from "antd";
import React from 'react';
import { useState } from "react";


const DeletePopOver = ({children}:any) => {
    const [deletePopoverVisible, setDeletePopoverVisible] = useState<boolean>(false);
    
        return (
          <Popover
          content={<a onClick={() => setDeletePopoverVisible(false)}>Close</a>}
          title="Title"
          trigger="click"
          visible={deletePopoverVisible}
          onVisibleChange={visible => setDeletePopoverVisible(visible)}
          >
              {children}
              </Popover>
            
          
        );
      
}

export default DeletePopOver;