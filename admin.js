// ========== 花冠专卖店永盛烟酒 - 后台管理逻辑 ==========

// 全局变量
let adminProducts = [];
let currentEditId = null;
let deleteTargetId = null;

// 默认商品数据（用于重置）
const defaultProducts = [
  // 香烟
  { id: 1, name: "中华（软盒）", price: { "1盒": 65, "1条": 650 }, category: "香烟", tags: ["热销"], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=中华" },
  { id: 2, name: "玉溪（软盒）", price: { "1盒": 23, "1条": 230 }, category: "香烟", tags: [], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=玉溪" },
  { id: 3, name: "芙蓉王（硬盒）", price: { "1盒": 25, "1条": 250 }, category: "香烟", tags: [], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=芙蓉王" },
  { id: 4, name: "黄鹤楼（软盒）", price: { "1盒": 19, "1条": 190 }, category: "香烟", tags: [], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=黄鹤楼" },
  { id: 5, name: "利群（软盒）", price: { "1盒": 15, "1条": 150 }, category: "香烟", tags: ["热销"], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=利群" },
  { id: 6, name: "云烟（软盒）", price: { "1盒": 22, "1条": 220 }, category: "香烟", tags: [], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=云烟" },
  { id: 7, name: "南京（硬盒）", price: { "1盒": 12, "1条": 120 }, category: "香烟", tags: [], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=南京" },
  { id: 8, name: "苏烟（软盒）", price: { "1盒": 48, "1条": 480 }, category: "香烟", tags: ["新品"], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=苏烟" },
  // 白酒
  { id: 11, name: "茅台（飞天）53°", price: { "1瓶": 1499 }, category: "白酒", tags: ["热销"], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=茅台" },
  { id: 12, name: "五粮液（普五）", price: { "1瓶": 899, "1提": 1798, "1箱": 5394 }, category: "白酒", tags: ["热销"], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=五粮液" },
  { id: 13, name: "剑南春（水晶剑）", price: { "1瓶": 458, "1提": 916, "1箱": 2748 }, category: "白酒", tags: [], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=剑南春" },
  { id: 14, name: "洋河（梦之蓝）", price: { "1瓶": 368, "1提": 736, "1箱": 2208 }, category: "白酒", tags: ["新品"], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=洋河" },
  { id: 15, name: "泸州老窖（特曲）", price: { "1瓶": 288, "1提": 576, "1箱": 1728 }, category: "白酒", tags: [], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=泸州老窖" },
  { id: 16, name: "郎酒（青花郎）", price: { "1瓶": 368, "1提": 736, "1箱": 2208 }, category: "白酒", tags: [], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=郎酒" },
  { id: 17, name: "汾酒（青花20）", price: { "1瓶": 168, "1提": 336, "1箱": 1008 }, category: "白酒", tags: [], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=汾酒" },
  { id: 18, name: "古井贡（年份原浆）", price: { "1瓶": 198, "1提": 396, "1箱": 1188 }, category: "白酒", tags: [], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=古井贡" },
  { id: 19, name: "舍得（智慧版）", price: { "1瓶": 458, "1提": 916, "1箱": 2748 }, category: "白酒", tags: ["新品"], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=舍得" },
  { id: 20, name: "水井坊（井台）", price: { "1瓶": 528, "1提": 1056, "1箱": 3168 }, category: "白酒", tags: [], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=水井坊" },
  // 礼盒
  { id: 21, name: "中秋礼盒", price: { "1盒": 288 }, category: "礼盒", tags: ["热销"], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=中秋礼盒" },
  { id: 22, name: "春节套装", price: { "1套": 688 }, category: "礼盒", tags: ["新品"], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=春节套装" },
  { id: 23, name: "烟酒组合礼盒", price: { "1盒": 398 }, category: "礼盒", tags: ["热销"], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=烟酒组合" },
  { id: 24, name: "送礼佳品礼盒", price: { "1盒": 568 }, category: "礼盒", tags: [], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=送礼佳品" },
  { id: 25, name: "福字礼盒", price: { "1盒": 388 }, category: "礼盒", tags: [], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=福字礼盒" },
  { id: 26, name: "豪华礼盒", price: { "1盒": 888 }, category: "礼盒", tags: ["新品"], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=豪华礼盒" },
  { id: 27, name: "实惠礼盒", price: { "1盒": 168 }, category: "礼盒", tags: ["热销"], image: "https://via.placeholder.com/200x200/F5F5F5/666666?text=实惠礼盒" }
];

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  loadProducts();
  loadShopSettings();
  initTabs();
  initForm();
  renderProductList();
});

// 加载商品数据
function loadProducts() {
  const saved = localStorage.getItem('adminProducts');
  if (saved) {
    adminProducts = JSON.parse(saved);
  } else {
    adminProducts = JSON.parse(JSON.stringify(defaultProducts));
    saveProducts();
  }
}

// 保存商品数据
function saveProducts() {
  localStorage.setItem('adminProducts', JSON.stringify(adminProducts));
}

// 初始化标签切换
function initTabs() {
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
      document.getElementById(`${tab.dataset.tab}Section`).classList.add('active');

      if (tab.dataset.tab === 'products') {
        renderProductList();
      }
    });
  });
}

// 初始化表单
function initForm() {
  // 分类切换时更新规格选项
  document.getElementById('productCategory').addEventListener('change', updateSpecInputs);
  updateSpecInputs();

  // 添加规格按钮
  document.getElementById('addSpecBtn').addEventListener('click', addSpecInput);

  // 图片链接预览
  document.getElementById('productImage').addEventListener('input', (e) => {
    const url = e.target.value;
    const preview = document.getElementById('imagePreview');
    if (url) {
      preview.innerHTML = `<img src="${url}" alt="预览" onerror="this.parentElement.innerHTML='<span class=\\'image-preview-placeholder\\'>图片加载失败</span>'">`;
    } else {
      preview.innerHTML = '<span class="image-preview-placeholder">点击下方按钮添加图片</span>';
    }
  });

  // 表单提交
  document.getElementById('addProductForm').addEventListener('submit', handleFormSubmit);
}

// 更新规格输入框
function updateSpecInputs() {
  const category = document.getElementById('productCategory').value;
  const container = document.getElementById('specInputs');
  
  let specs = [];
  if (category === '香烟') {
    specs = ['1盒', '1条'];
  } else if (category === '白酒') {
    specs = ['1瓶', '1提', '1箱'];
  } else {
    specs = ['1盒'];
  }

  container.innerHTML = specs.map(spec => `
    <div class="spec-input-group">
      <input type="text" class="form-input spec-name" value="${spec}" placeholder="规格（如：1盒）" readonly>
      <input type="number" class="form-input spec-price" placeholder="价格" required>
    </div>
  `).join('');
}

// 添加规格输入框
function addSpecInput() {
  const container = document.getElementById('specInputs');
  const div = document.createElement('div');
  div.className = 'spec-input-group';
  div.innerHTML = `
    <input type="text" class="form-input spec-name" placeholder="规格（如：2盒）">
    <input type="number" class="form-input spec-price" placeholder="价格">
    <button type="button" class="remove-spec" onclick="this.parentElement.remove()">
      <i data-lucide="x"></i>
    </button>
  `;
  container.appendChild(div);
  lucide.createIcons();
}

// 使用默认图片
function useDefaultImage() {
  const category = document.getElementById('productCategory').value;
  let text = '';
  switch(category) {
    case '香烟': text = '香烟'; break;
    case '白酒': text = '白酒'; break;
    case '礼盒': text = '礼盒'; break;
    default: text = '商品';
  }
  const url = `https://via.placeholder.com/200x200/F5F5F5/666666?text=${encodeURIComponent(text)}`;
  document.getElementById('productImage').value = url;
  document.getElementById('imagePreview').innerHTML = `<img src="${url}" alt="预览">`;
}

// 打开搜索商品图片模态框
function openSearchModal() {
  const productName = document.getElementById('productName').value.trim();
  if (productName) {
    document.getElementById('searchProductName').value = productName;
  }
  document.getElementById('searchModal').style.display = 'block';
}

// 关闭模态框
function closeSearchModal() {
  document.getElementById('searchModal').style.display = 'none';
  document.getElementById('searchResults').style.display = 'none';
  document.getElementById('searchTip').style.display = 'block';
}

// 搜索商品图片
async function searchProductImages() {
  const productName = document.getElementById('searchProductName').value.trim();
  
  if (!productName) {
    showToast('请输入商品名称');
    return;
  }

  document.getElementById('searchLoading').style.display = 'block';
  document.getElementById('searchTip').style.display = 'none';
  document.getElementById('searchResults').style.display = 'none';

  try {
    // 使用 Unsplash API 搜索图片（无需 API Key）
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(productName)}&per_page=12&client_id=rJ_d-nKqYoXgkFr2Zs2KLSAHSGDiLK4PXOTh2MLgVc4`
    );
    
    if (!response.ok) {
      throw new Error('搜索失败，请稍后重试');
    }

    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      showToast('未找到相关图片，请尝试其他名称');
      document.getElementById('searchLoading').style.display = 'none';
      return;
    }

    // 显示搜索结果
    const resultsContainer = document.querySelector('#searchResults > div');
    resultsContainer.innerHTML = data.results.map((photo, index) => `
      <div style="cursor: pointer; border: 2px solid #ddd; border-radius: 6px; overflow: hidden; transition: transform 0.2s;" 
           onclick="selectImageForRemoveBg('${photo.urls.regular}', ${index})">
        <img src="${photo.urls.thumb}" style="width: 100%; height: 150px; object-fit: cover;">
        <div style="padding: 8px; text-align: center; font-size: 12px; color: #666;">点击使用</div>
      </div>
    `).join('');

    document.getElementById('searchLoading').style.display = 'none';
    document.getElementById('searchResults').style.display = 'block';

  } catch (error) {
    console.error('搜索错误:', error);
    showToast('搜索出错: ' + error.message);
    document.getElementById('searchLoading').style.display = 'none';
  }
}

// 选择图片并移除背景
async function selectImageForRemoveBg(imageUrl, index) {
  const apiKey = document.getElementById('removeBgApiKey').value.trim();
  
  if (!apiKey) {
    showToast('⚠️ 需要 remove.bg API Key，请先设置');
    return;
  }

  document.getElementById('searchLoading').style.display = 'block';
  document.getElementById('searchResults').style.display = 'none';

  try {
    // 调用 remove.bg API 移除背景
    const form = new FormData();
    form.append('image_url', imageUrl);
    form.append('type', 'auto');
    form.append('format', 'autodetect');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey
      },
      body: form
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('API Key 无效或已过期');
      } else if (response.status === 402) {
        throw new Error('API 配额已用尽，请升级账户');
      }
      throw new Error('背景移除失败');
    }

    const blob = await response.blob();
    
    // 创建 Canvas 添加白色背景
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(img.width, 400);
      canvas.height = Math.max(img.height, 400);
      
      const ctx = canvas.getContext('2d');
      
      // 绘制白色背景
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 居中绘制图片
      const x = (canvas.width - img.width) / 2;
      const y = (canvas.height - img.height) / 2;
      ctx.drawImage(img, x, y);
      
      // 转换为 data URL
      const resultImage = canvas.toDataURL('image/png');
      
      // 设置图片
      document.getElementById('productImage').value = resultImage;
      document.getElementById('imagePreview').innerHTML = `<img src="${resultImage}" alt="预览" style="width:100%; height:100%; object-fit:contain;">`;
      
      closeSearchModal();
      showToast('✅ 图片处理完成');
      document.getElementById('searchLoading').style.display = 'none';
    };
    
    img.src = URL.createObjectURL(blob);

  } catch (error) {
    console.error('背景移除错误:', error);
    showToast('❌ ' + error.message);
    document.getElementById('searchLoading').style.display = 'none';
    document.getElementById('searchResults').style.display = 'block';
  }
}

// 处理表单提交
function handleFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('productName').value.trim();
  const category = document.getElementById('productCategory').value;
  const imageInput = document.getElementById('productImage').value;
  const image = imageInput || `https://via.placeholder.com/200x200/F5F5F5/666666?text=${encodeURIComponent(name)}`;

  // 收集规格和价格
  const price = {};
  document.querySelectorAll('.spec-input-group').forEach(group => {
    const specName = group.querySelector('.spec-name').value.trim();
    const specPrice = parseFloat(group.querySelector('.spec-price').value);
    if (specName && specPrice) {
      price[specName] = specPrice;
    }
  });

  if (Object.keys(price).length === 0) {
    showToast('请至少填写一个规格和价格');
    return;
  }

  // 收集标签
  const tags = [];
  if (document.getElementById('tagHot').checked) tags.push('热销');
  if (document.getElementById('tagNew').checked) tags.push('新品');

  // 创建商品对象
  const product = {
    id: currentEditId || Date.now(),
    name,
    price,
    category,
    tags,
    image
  };

  if (currentEditId) {
    // 编辑模式
    const index = adminProducts.findIndex(p => p.id === currentEditId);
    if (index !== -1) {
      adminProducts[index] = product;
    }
    showToast('商品已更新');
  } else {
    // 添加模式
    adminProducts.unshift(product);
    showToast('商品已添加');
  }

  saveProducts();
  resetForm();
  renderProductList();
}

// 重置表单
function resetForm() {
  document.getElementById('addProductForm').reset();
  document.getElementById('imagePreview').innerHTML = '<span class="image-preview-placeholder">点击下方按钮添加图片</span>';
  updateSpecInputs();
  currentEditId = null;
}

// 渲染商品列表
function renderProductList() {
  const container = document.getElementById('productAdminList');
  
  if (adminProducts.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i data-lucide="package-open"></i>
        <p>暂无商品，请添加商品</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = adminProducts.map(product => {
    const firstSpec = Object.keys(product.price)[0];
    const firstPrice = product.price[firstSpec];

    return `
      <div class="product-admin-card">
        <img src="${product.image}" alt="${product.name}" class="product-admin-image">
        <div class="product-admin-info">
          <div class="product-admin-name">${product.name}</div>
          <span class="product-admin-category">${product.category}</span>
          <div class="product-admin-tags">
            ${product.tags.map(tag => `<span class="product-admin-tag ${tag}">${tag === 'hot' ? '热销' : '新品'}</span>`).join('')}
          </div>
          <div class="product-admin-price">¥${firstPrice} ${firstSpec}</div>
        </div>
        <div class="product-admin-actions">
          <button class="product-admin-btn edit" onclick="editProduct(${product.id})">
            <i data-lucide="edit-2"></i> 编辑
          </button>
          <button class="product-admin-btn delete" onclick="confirmDelete(${product.id})">
            <i data-lucide="trash-2"></i> 删除
          </button>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

// 编辑商品
function editProduct(id) {
  const product = adminProducts.find(p => p.id === id);
  if (!product) return;

  currentEditId = id;
  
  document.getElementById('productName').value = product.name;
  document.getElementById('productCategory').value = product.category;
  document.getElementById('productImage').value = product.image;
  
  // 预览图片
  document.getElementById('imagePreview').innerHTML = `<img src="${product.image}" alt="预览">`;

  // 规格
  setTimeout(() => {
    const container = document.getElementById('specInputs');
    container.innerHTML = Object.entries(product.price).map(([spec, price]) => `
      <div class="spec-input-group">
        <input type="text" class="form-input spec-name" value="${spec}" placeholder="规格">
        <input type="number" class="form-input spec-price" value="${price}" placeholder="价格">
      </div>
    `).join('');
  }, 100);

  // 标签
  document.getElementById('tagHot').checked = product.tags.includes('热销');
  document.getElementById('tagNew').checked = product.tags.includes('新品');

  // 切换到添加标签
  document.querySelector('.admin-tab[data-tab="add"]').click();
  showToast('编辑商品中...');
}

// 确认删除
function confirmDelete(id) {
  deleteTargetId = id;
  document.getElementById('deleteConfirm').classList.add('show');
}

// 关闭删除确认
function closeDeleteConfirm() {
  document.getElementById('deleteConfirm').classList.remove('show');
  deleteTargetId = null;
}

// 执行删除
document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
  if (deleteTargetId) {
    adminProducts = adminProducts.filter(p => p.id !== deleteTargetId);
    saveProducts();
    renderProductList();
    closeDeleteConfirm();
    showToast('商品已删除');
  }
});

// 加载店铺设置
function loadShopSettings() {
  const settings = JSON.parse(localStorage.getItem('shopSettings')) || {};
  document.getElementById('shopName').value = settings.name || '花冠专卖店永盛烟酒';
  document.getElementById('shopPhone').value = settings.phone || '';
  document.getElementById('shopAddress').value = settings.address || '';
}

// 保存店铺设置
function saveShopSettings() {
  const settings = {
    name: document.getElementById('shopName').value,
    phone: document.getElementById('shopPhone').value,
    address: document.getElementById('shopAddress').value
  };
  localStorage.setItem('shopSettings', JSON.stringify(settings));
  
  // 同步到 products.js 的 shopInfo
  shopInfo.name = settings.name;
  shopInfo.phone = settings.phone;
  shopInfo.address = settings.address;
  
  showToast('店铺设置已保存');
}

// 重置商品数据
function resetProducts() {
  if (confirm('确定要重置所有商品吗？这将恢复默认商品列表。')) {
    adminProducts = JSON.parse(JSON.stringify(defaultProducts));
    saveProducts();
    renderProductList();
    showToast('已重置为默认商品');
  }
}

// 导出商品数据
function exportData() {
  const data = JSON.stringify(adminProducts, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'products.json';
  a.click();
  URL.revokeObjectURL(url);
  showToast('商品数据已导出');
}

// 显示Toast
function showToast(message) {
  const toast = document.getElementById('adminToast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1500);
}
