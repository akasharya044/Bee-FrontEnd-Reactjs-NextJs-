import React, { useState, ChangeEvent, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { ApiService } from '../../services/api.service';

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  type: string;
}
interface ProductTreeViewProps {
  onNodeSelect: (
    nodeId: string,
    nodeName: string,
    nodeType: string,
    hasChildren: boolean
  ) => void;
}

const ProductTreeView: React.FC<ProductTreeViewProps> = ({ onNodeSelect }) => {
  const [expanded, setExpanded] = useState<string[]>([]);
  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  const handleNodeClick = (event: React.MouseEvent, node: TreeNode) => {
    event.stopPropagation();
    const hasChildren =
      Array.isArray(node.children) && node.children.length > 0;
    onNodeSelect(node.id, node.name, node.type, hasChildren);
    // Rest of your logic...

    // Your existing logic for expanding/collapsing nodes
    if (!expanded.includes(node.id)) {
      setExpanded((prevExpanded) => [...prevExpanded, node.id]);
      fetchSubNodesAndUpdateState(node.id, node.type);
    } else {
      setExpanded((prevExpanded) =>
        prevExpanded.filter((id) => id !== node.id)
      );
    }
  };

  const handleNodeToggle = async (
    _: ChangeEvent<{}>,
    nodeId: string,
    type: string | undefined
  ) => {
    const isNodeExpanded = expanded.includes(nodeId);

    setExpanded((prevExpanded) =>
      isNodeExpanded
        ? prevExpanded.filter((id) => id !== nodeId)
        : [...prevExpanded, nodeId]
    );

    if (!isNodeExpanded) {
      await fetchSubNodesAndUpdateState(nodeId, type);
    }
  };

  const fetchSubNodesAndUpdateState = async (
    nodeId: string,
    type: string | undefined
  ) => {
    if (type === undefined) {
      console.error('Type is undefined for node:', nodeId);
      return;
    }

    try {
      const subNodes = await fetchSubNodes(nodeId, type);
      console.log('SubNodes2:', subNodes);
      setTreeData((prevTreeData: TreeNode[]) => {
        const parentNodeIndex = prevTreeData.findIndex(
          (node) => node.id === nodeId
        );

        if (
          parentNodeIndex !== -1 ||
          (parentNodeIndex === -1 && subNodes.length > 1)
        ) {
          const updatedTreeData: TreeNode[] = [...prevTreeData];
          updatedTreeData[parentNodeIndex] = {
            ...updatedTreeData[parentNodeIndex],
            children: subNodes,
          };
          console.log('updated tree', updatedTreeData);
          return updatedTreeData;
        } else {
          return prevTreeData;
        }
      });
    } catch (error) {
      console.error('Error fetching and updating sub-nodes:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiservice = new ApiService();
        const response = await apiservice.fetchtreelist(
          'http://20.207.68.38/hiveconnect/configuration/productCategory/tree?id=00000000-0000-0000-0000-000000000000&type=t'
        );
        const initialTreeData = response?.data?.list.map((item: any) => ({
          id: item.id,
          name: item.name,
          type: item.type,
        }));
        console.log('Initial data', initialTreeData);

        if (Array.isArray(initialTreeData)) {
          setTreeData(initialTreeData);   
          const posmIndex = initialTreeData.findIndex(node => node.name === 'POSM');
          if (posmIndex !== -1) {
            setExpanded([initialTreeData[posmIndex].id]); 
            const posmId = initialTreeData[posmIndex].id;
          await fetchSubNodesAndUpdateState(posmId, 't');
          }
          const posmItem = initialTreeData.find(item => item.name === 'POSM' && item.type === 't');
          if (posmItem) {
            // Pass the POSM item to the parent component using onNodeSelect
            onNodeSelect(posmItem.id, posmItem.name, posmItem.type, true); // Assuming POSM has children
          }
        } else {
          console.error('Initial data is not an array:', initialTreeData);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchData();
  }, []);

  const fetchSubNodes = async (
    id: string,
    type: string | undefined
  ): Promise<TreeNode[]> => {
    try {
      const apiservice = new ApiService();
      const response = await apiservice.fetchtreelist(
        `http://20.207.68.38/hiveconnect/configuration/productCategory/tree?id=${id}&type=${type}`
      );
      const subNodes: TreeNode[] = await Promise.all(
        (response?.data.list || []).map(async (item: any) => {
          const children = await fetchSubNodes(item.id, item.type);
          return {
            id: item.id,
            name: item.name,
            type: item.type,
            children: children,
          };
        })
      );
      console.log('SubNodes:', subNodes);
      return subNodes;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const renderTreeItems = (nodes: TreeNode[] | undefined) => {
    return (
      nodes &&
      nodes.map((node) => (
        <TreeItem
          key={node.id}
          nodeId={node.id}
          label={node.name}
          onClick={(event) => handleNodeClick(event, node)}
        >
          {renderTreeItems(node.children)}
        </TreeItem>
      ))
    );
  };

  return (
    <TreeView
      key={treeData.length}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      // onClick={(event) => handleNodeClick(event, node)}
    >
      {renderTreeItems(treeData)}
    </TreeView>
  );
};

export default ProductTreeView;