import React from "react";
import {Tree,Icon} from 'antd';
import menuConfig from "../../config/menuConfig";


const { TreeNode } = Tree;

/**
 * 权限管理页面
 */
export default class Permission extends React.Component {
    render() {
        return (
            <div>
                <BaseTree
                    menuConfig={menuConfig}
                />
            </div>
        );
    }
};


class BaseTree extends React.Component {

    loadData = (treeData) => {
        return treeData.map(item => {
            if (item.children) {
                return <TreeNode
                    title={item.title}
                    key={item.key}
                    icon={<Icon type={item.icon} />}>
                    {
                        this.loadData(item.children)
                    }
                </TreeNode>;
            }else {
                return <TreeNode
                    title={item.title}
                    key={item.key}
                    icon={<Icon type={item.icon} />}
                />
            }
        });
    };


    render() {
        const {menuConfig} = this.props;

        return (
            <Tree
                showIcon
                showLine
                // defaultExpandedKeys={['0-0-0']}
                switcherIcon={<Icon type="down"/>}
                // onSelect={this.onSelect}
            >
                {
                    this.loadData(menuConfig)
                }
            </Tree>
        );
    }
}