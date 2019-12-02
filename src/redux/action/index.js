/**
 * action 类型
 * @type {{}}
 */
export const type = {
    SWITCH_MEMU: 'SWITCH_MEMU',
    SWIRCH_MEMU_BREADCRUMB:'SWIRCH_MEMU_BREADCRUMB',
};

//菜单点击切换，修改面包屑名称
export function switchMenu(menuName) {
    return{
        type: type.SWITCH_MEMU,
        menuName
    }
}
//真正的面包屑,菜单点击切换，修改面包屑
export function switchMenuBreadcrumb(menuArray) {
    return{
        type:type.SWIRCH_MEMU_BREADCRUMB,
        menuArray
    }
}