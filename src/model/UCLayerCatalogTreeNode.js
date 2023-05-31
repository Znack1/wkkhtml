import { CustomArray } from "../utility/common/CustomArray.js";
import { ArrayUtility } from "../utility/common/ArrayUtility.js";
import { LayerCatalogItems } from "./LayerCatalogItem.js";
import { GuidUtility } from "../utility/common/GuidUtility.js";


export class LayerCatalogTreeNode {
    constructor() {
        this.id = null;
        this.type = null;
        this.name = null;
        this.parentId = null;
        this.parent = null;
        this.checked = false;

        this.bindingObject = null;

        this.bindingUC = null;


        this.children = new Array();
        this.disabled = false;
    }

    /**
     * 通过绑定对象更新节点信息
     */
    updateByBindingObject() {
        //专题组和专题都含有名称属性，不需要再次判断
        this.name = this.bindingObject.name;
    }

    findChildNodeById(childNodeId) {
        let findNode = null;
        if (!childNodeId || !this.children) return findNode;

        let tempChildNode = null;
        for (let tempIndex = 0; tempIndex < this.children.length; tempIndex++) {
            tempChildNode = this.children[tempIndex];
            if (tempChildNode && tempChildNode.id && tempChildNode == childNodeId) {
                findNode = tempChildNode;
                break;
            }

        }

        return findNode;
    }

    findChildIndexById(childNodeId) {
        let findIndex = -1;
        if (!childNodeId || !this.children) return findIndex;

        let tempChildNode = null;
        for (let tempIndex = 0; tempIndex < this.children.length; tempIndex++) {
            tempChildNode = this.children[tempIndex];
            if (tempChildNode && tempChildNode.id && tempChildNode.id === childNodeId) {
                findIndex = tempIndex;
                break;
            }
        }

        return findIndex;
    }

    updateByBindingObject(newBindingObject) {
            this.bindingObject = newBindingObject;
            //专题组和专题都含有名称属性，不需要再次判断
            this.name = this.bindingObject.name;
        }
        // 设置父级信息
    setParentNodeInfo(parentNode) {
            this.parent = parentNode;
            this.parentId = parentNode.id;
        }
        /**
         * 单节点更新
         * @param {*} treeNode 
         */
    update(treeNode) {
        if (!treeNode) return;

        this.name = treeNode.name;
        this.bindingObject = treeNode.bindingObject;
    }


    // 二次解析子集数据
    static fromGroup(layerGroup) {
        let catalogTreeNode = null;
        if (!layerGroup) return catalogTreeNode;

        catalogTreeNode = new LayerCatalogTreeNode();
        catalogTreeNode.bindingObject = layerGroup;
        catalogTreeNode.id = "id_" + GuidUtility.getGuid();
        catalogTreeNode.parentId = layerGroup.parentId;
        catalogTreeNode.name = layerGroup.name;
        catalogTreeNode.type = LayerCatalogTreeNodeType.group;

        let childNodes = new Array();

        let childGroups = layerGroup.children;

        if (childGroups) {
            let childGroupNodes = LayerCatalogTreeNodes.fromGroups(childGroups.objects);
            if (childGroupNodes) {
                childGroupNodes.setParentNode(catalogTreeNode);
                ArrayUtility.addTargetToOri(childNodes, childGroupNodes.objects);
            }
        }

        let layers = layerGroup.layerItems;
        if (layers) {
            let layerNodes = LayerCatalogTreeNodes.fromLayers(layers.objects);
            if (layerNodes) {
                layerNodes.setParentNode(catalogTreeNode);
                ArrayUtility.addTargetToOri(childNodes, layerNodes.objects);
            }
        }


        catalogTreeNode.children = childNodes;

        return catalogTreeNode;
    }


    static fromLayerItem(layer) {
        let catalogTreeNode = null;
        if (!layer) return catalogTreeNode;

        catalogTreeNode = new LayerCatalogTreeNode();
        catalogTreeNode.bindingObject = layer;
        catalogTreeNode.children = null;
        catalogTreeNode.id = "id_" + GuidUtility.getGuid(); // layer.id;
        catalogTreeNode.name = layer.name;
        catalogTreeNode.type = LayerCatalogTreeNodeType.layer;
        catalogTreeNode.checked = layer.defaultVisible;

        return catalogTreeNode;
    }
    static createRootNode() {
        let rootNode = new LayerCatalogTreeNode();
        rootNode.id = -1;
        rootNode.name = "资源目录";
        rootNode.label = "资源目录";
        rootNode.type = LayerCatalogTreeNodeType.root;

        return rootNode;
    }

}


export class LayerCatalogTreeNodes extends CustomArray {
    constructor() {
        super();
    }


    /**
     * 获取
     */
    getCheckedLeafNodeIds() {
        let ids = new Array();

        let tempNode = null;
        let tempChildNodeArray = null;
        let tempChildNodes = null;
        let tempChildIds = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempNode = this.objects[tempIndex];
            if (tempNode.type === LayerCatalogTreeNodeType.layer &&
                tempNode.bindingObject &&
                tempNode.bindingObject.defaultVisible) {
                ids.push(tempNode.id);
            }

            tempChildNodeArray = tempNode.children;
            if (tempChildNodeArray) {
                tempChildNodes = new LayerCatalogTreeNodes();
                tempChildNodes.pushMulti(tempChildNodeArray);

                tempChildIds = tempChildNodes.getCheckedLeafNodeIds();
                if (tempChildIds) {
                    ArrayUtility.addTargetToOri(ids, tempChildIds);
                }
            }
        }

        return ids;
    }

    /**
     * 全部设置为未选中false
     */
    setNodesNoChecked() {
        let tempNode = null;
        let tempChildNodeArray = null;
        let tempChildNodes = null;
        let tempChildIds = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempNode = this.objects[tempIndex];
            if (tempNode.type === LayerCatalogTreeNodeType.layer &&
                tempNode.bindingObject &&
                tempNode.bindingObject.defaultVisible) {
                tempNode.bindingObject.defaultVisible = false;
            }

            tempChildNodeArray = tempNode.children;
            if (tempChildNodeArray) {
                tempChildNodes = new LayerCatalogTreeNodes();
                tempChildNodes.pushMulti(tempChildNodeArray);
                tempChildNodes.setNodesNoChecked();

            }
        }
    }



    setParentNode(parent) {
        if (!parent) return;

        let tempNode = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempNode = this.objects[tempIndex];
            if (tempNode) {
                tempNode.parent = parent;
                tempNode.parentId = parent.id;
            }
        }
    }

    findByBindingObjectId(bindingObjectId) {
        let findItem = null;

        if (!bindingObjectId) return;

        let tempItem = null;
        let tempBindingObject = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (tempItem) {
                tempBindingObject = tempItem.bindingObject;
                if (tempBindingObject &&
                    tempBindingObject.id &&
                    tempBindingObject.id === bindingObjectId) {
                    findItem = tempItem;
                    break;
                }

                if (tempItem.children && tempItem.children.length > 0) {
                    let childNodes = new LayerCatalogTreeNodes();
                    childNodes.pushMulti(tempItem.children);

                    findItem = childNodes.findByBindingObjectId(bindingObjectId);
                    if (findItem != null) {
                        break;
                    }
                }
            }
        }

        return findItem;
    }

    findByTreeNodeId(nodeId) {
        let findItem = null;

        if (!nodeId) return;

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (tempItem && tempItem.id && tempItem.id === nodeId) {
                findItem = tempItem;
                break;
            }

            if (tempItem.children && tempItem.children.length > 0) {
                let childNodes = new LayerCatalogTreeNodes();
                childNodes.pushMulti(tempItem.children);

                findItem = childNodes.findByTreeNodeId(nodeId);
                if (findItem != null) {
                    break;
                }
            }
        }

        return findItem;
    }

    /**
     * 获取绑定对象数组
     * @param {*} checked 选中状态，可选参数
     * @param {*} treeNodeType 树节点类型 可选参数
     */
    getBindingObjects(checked, treeNodeType) {

        let bindingObjects = new Array();

        let tempItem = null;
        let tempBindingObject = null;
        let tempChildBindingObjects = null;
        let findItemStatus = false;
        for (let tempIndex = 0; tempIndex < this.objects.length; tempIndex++) {
            tempItem = this.objects[tempIndex];
            if (tempItem) {
                findItemStatus = true;

                if (checked && tempItem.checked !== checked) {
                    findItemStatus = false;
                }

                if (findItemStatus) {
                    if (treeNodeType && tempItem.type !== treeNodeType) {
                        findItemStatus = false;
                    }
                }

                if (findItemStatus) {
                    tempBindingObject = tempItem.bindingObject;
                    if (tempBindingObject) {
                        bindingObjects.push(tempBindingObject);
                    }
                }

                if (tempItem.children && tempItem.children.length > 0) {
                    let childNodes = new LayerCatalogTreeNodes();
                    childNodes.pushMulti(tempItem.children);

                    tempChildBindingObjects = childNodes.getBindingObjects(checked, treeNodeType);
                    ArrayUtility.addTargetToOri(bindingObjects, tempChildBindingObjects);
                }
            }
        }

        return bindingObjects;
    }

    static getFirstItemByLayer(treeNodes) {
        let layerCatalogTreeNode = null;
        for (let treeNodeIndex = 0; treeNodeIndex < treeNodes.length; treeNodeIndex++) {
            let treeNode = treeNodes[treeNodeIndex];
            if (treeNode.type == LayerCatalogTreeNodeType.layer) {
                layerCatalogTreeNode = treeNode;
                return layerCatalogTreeNode;
            } else {
                if (treeNode.children) {
                    layerCatalogTreeNode = LayerCatalogTreeNodes.getFirstItemByLayer(treeNode.children);
                    if (layerCatalogTreeNode) {
                        return layerCatalogTreeNode;
                    }
                }
            }
        }
        return layerCatalogTreeNode;
    }

    static fromGroups(groups) {
        let treeNodes = new LayerCatalogTreeNodes();
        if (!groups) return treeNodes;

        let tempGroup = null;
        let tempNode = null;
        for (let tempIndex = 0; tempIndex < groups.length; tempIndex++) {
            tempGroup = groups[tempIndex];
            tempNode = LayerCatalogTreeNode.fromGroup(tempGroup);
            if (tempNode) {
                treeNodes.push(tempNode);
            }
        }

        return treeNodes;
    }

    static fromLayers(layers) {
        let treeNodes = new LayerCatalogTreeNodes();
        if (!layers) return treeNodes;

        let tempLayer = null;
        let tempNode = null;
        for (let tempIndex = 0; tempIndex < layers.length; tempIndex++) {
            tempLayer = layers[tempIndex];
            tempNode = LayerCatalogTreeNode.fromLayerItem(tempLayer);
            if (tempNode) {
                treeNodes.push(tempNode);
            }
        }

        return treeNodes;
    }

    static findById(nodeItemArray, id) {
        let findItem = null;
        if (!nodeItemArray || !id) return findItem;

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < nodeItemArray.length; tempIndex++) {
            tempItem = nodeItemArray[tempIndex];
            if (tempItem && tempItem.id === id) {
                findItem = tempItem;
                break;
            }
        }

        return findItem;
    }

    static getBindingLayers(leafNodeArray) {
        let layerItems = new LayerCatalogItems();

        if (!leafNodeArray) return layerItems;

        let tempItem = null;
        for (let tempIndex = 0; tempIndex < leafNodeArray.length; tempIndex++) {
            tempItem = leafNodeArray[tempIndex];
            if (tempItem && tempItem.type && tempItem.type === LayerCatalogTreeNodeType.layer && tempItem.bindingObject) {
                layerItems.push(tempItem.bindingObject);
            }
        }

        return layerItems;
    }

}


export const LayerCatalogTreeNodeType = {
    root: "root",

    group: "group",

    layer: "layer"
}