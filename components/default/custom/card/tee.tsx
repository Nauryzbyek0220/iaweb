import React, { useState } from 'react';
import { CarryOutOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons';
import { Select, Switch, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';

const treeData: DataNode[] = [
    {
    
      title: 'parent 2',
      key: '0-1',
     
      children: [
        {
          title: 'parent 2-0',
          key: '0-1-0',
     
        },
      ],
     
   
  },
 
];

const TeeData: React.FC = () => {
  const [showLine, setShowLine] = useState<boolean>(true);
  const [showIcon, setShowIcon] = useState<boolean>(false);
  const [showLeafIcon, setShowLeafIcon] = useState<boolean | React.ReactNode>(true);

 
  return (
      <div className='ring-offset-2 ring-2 md:w-[900px] w-auto py-10 px-9 rounded-lg'>
        
          <Tree
              showLine={true}
              defaultExpandedKeys={['0-0-0']}
              treeData={treeData}
      />
    </div>
  );
};

export default TeeData;