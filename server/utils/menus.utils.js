function transformToMenuStructure(rawMenus) {
  const menuMap = new Map();

  // First pass: convert and map all items
  rawMenus.forEach((item) => {
    const idStr = item._id.toString();
    menuMap.set(idStr, {
      _id: idStr,
      name: item.name,
      icon: item.icon,
      status: item.status,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      subMenu: [],
    });
  });

  const rootMenus = [];

  // Second pass: build tree
  rawMenus.forEach((item) => {
    const currentId = item._id.toString();
    const parentId = item.parentId?.toString();
    const menu = menuMap.get(currentId);

    if (parentId && menuMap.has(parentId)) {
      menuMap.get(parentId).subMenu.push(menu);
    } else {
      rootMenus.push(menu);
    }
  });

  return rootMenus;
}

module.exports.transformToMenuStructure = transformToMenuStructure;
