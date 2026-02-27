// ========== 花冠专卖店永盛烟酒 - 展示页逻辑 ==========

// 全局状态
let currentCategory = 'all';
let currentFilter = '';
let searchKeyword = '';
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  renderProducts();
  initCart();
  initEventListeners();
  initQRCode();
});

// 初始化事件
function initEventListeners() {
  // 搜索
  document.getElementById('searchInput').addEventListener('input', (e) => {
    searchKeyword = e.target.value.toLowerCase();
    renderProducts();
  });

  // 分类切换
  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      renderProducts();
    });
  });

  // 快捷筛选
  document.querySelectorAll('.quick-filter').forEach(filter => {
    filter.addEventListener('click', () => {
      filter.classList.toggle('active');
      currentFilter = filter.classList.contains('active') ? filter.dataset.filter : '';
      renderProducts();
    });
  });

  // 购物车图标点击
  document.getElementById('cartIcon').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('cartPanel').addEventListener('click', (e) => e.stopPropagation());

  // 清空购物车
  document.getElementById('clearCartBtn').addEventListener('click', clearCart);

  // 联系店家
  document.getElementById('contactShopBtn').addEventListener('click', contactShop);
  document.getElementById('contactBtn').addEventListener('click', contactShop);

  // 地图
  document.getElementById('mapBtn').addEventListener('click', openMap);

  // 分享
  document.getElementById('shareBtn').addEventListener('click', shareToWechat);

  // 二维码
  document.getElementById('qrBtn').addEventListener('click', openQR);
  document.getElementById('qrOverlay').addEventListener('click', closeQR);
  document.getElementById('qrClose').addEventListener('click', closeQR);

  // 收藏
  document.getElementById('collectBtn').addEventListener('click', () => {
    showToast('收藏成功！');
  });
}

// 渲染商品列表
function renderProducts() {
  let filtered = [...products];

  // 分类筛选
  if (currentCategory !== 'all') {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  // 标签筛选
  if (currentFilter) {
    filtered = filtered.filter(p => p.tags.includes(currentFilter));
  }

  // 搜索筛选
  if (searchKeyword) {
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchKeyword) ||
      p.category.toLowerCase().includes(searchKeyword)
    );
  }

  const container = document.getElementById('productList');
  
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="no-result">
        <i data-lucide="search-x"></i>
        <p>未找到相关商品</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(product => {
    const specs = Object.keys(product.price);
    const firstSpec = specs[0];
    const price = product.price[firstSpec];

    return `
      <div class="product-card" data-id="${product.id}">
        ${product.tags.length > 0 ? `<span class="product-tag ${product.tags[0]}">${product.tags[0] === 'hot' ? '热销' : '新品'}</span>` : ''}
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="spec-options">
            ${specs.map((spec, idx) => `
              <button class="spec-btn ${idx === 0 ? 'active' : ''}" data-spec="${spec}">${spec}</button>
            `).join('')}
          </div>
          <div class="price-row">
            <span class="product-price">¥<span class="price-value">${price}</span></span>
            <span class="product-unit">${firstSpec}</span>
          </div>
          <button class="add-btn" onclick="addToCart(${product.id})">
            <i data-lucide="plus" style="width:16px;height:16px;vertical-align:middle;margin-right:4px;"></i>加入购物车
          </button>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();

  // 规格选择事件
  document.querySelectorAll('.product-card').forEach(card => {
    const productId = parseInt(card.dataset.id);
    const product = products.find(p => p.id === productId);
    
    card.querySelectorAll('.spec-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.querySelectorAll('.spec-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const spec = btn.dataset.spec;
        const price = product.price[spec];
        card.querySelector('.price-value').textContent = price;
        card.querySelector('.product-unit').textContent = spec;
      });
    });
  });
}

// 加入购物车
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  const activeSpec = card.querySelector('.spec-btn.active');
  const spec = activeSpec ? activeSpec.dataset.spec : Object.keys(product.price)[0];
  const price = product.price[spec];

  const existingItem = cart.find(item => item.id === productId && item.spec === spec);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: price,
      spec: spec,
      image: product.image,
      qty: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast('已加入购物车');
}

// 从购物车删除
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
  updateCartUI();
}

// 更新数量
function updateQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  renderCart();
  updateCartUI();
}

// 清空购物车
function clearCart() {
  if (confirm('确定清空购物车吗？')) {
    cart = [];
    saveCart();
    renderCart();
    updateCartUI();
    closeCart();
  }
}

// 保存到本地存储
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// 渲染购物车
function renderCart() {
  const container = document.getElementById('cartItems');
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <i data-lucide="shopping-cart"></i>
        <p>购物车是空的</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-spec">${item.spec}</div>
        <div class="cart-item-price">¥${item.price}</div>
      </div>
      <div class="cart-item-actions">
        <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
      </div>
      <button class="delete-btn" onclick="removeFromCart(${index})">
        <i data-lucide="trash-2" style="width:18px;height:18px;"></i>
      </button>
    </div>
  `).join('');

  lucide.createIcons();

  // 更新总价
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById('cartPanelTotal').textContent = `¥${total}`;
}

// 更新购物车UI
function updateCartUI() {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  document.getElementById('cartTotal').textContent = `¥${total}`;
  document.getElementById('cartCount').textContent = `(${count}件)`;
  document.getElementById('cartBadge').textContent = count;
}

// 初始化购物车
function initCart() {
  updateCartUI();
  renderCart();
}

// 打开购物车
function openCart() {
  if (cart.length === 0) {
    showToast('购物车是空的');
    return;
  }
  document.getElementById('cartOverlay').classList.add('show');
  document.getElementById('cartPanel').classList.add('show');
  document.body.style.overflow = 'hidden';
}

// 关闭购物车
function closeCart() {
  document.getElementById('cartOverlay').classList.remove('show');
  document.getElementById('cartPanel').classList.remove('show');
  document.body.style.overflow = '';
}

// 联系店家
function contactShop() {
  const phone = shopInfo.phone;
  if (phone && phone !== '请添加电话') {
    window.location.href = `tel:${phone}`;
  } else {
    showToast('请添加联系电话');
  }
}

// 打开地图
function openMap() {
  const address = shopInfo.address;
  if (address && address !== '请添加地址') {
    const url = `https://apis.map.qq.com/uri/v1/marker?marker=coord:0,0&title:花冠专卖店永盛烟酒&content:${encodeURIComponent(address)}&referer=myapp`;
    window.location.href = url;
  } else {
    showToast('请添加店铺地址');
  }
}

// 微信分享
function shareToWechat() {
  if (navigator.share) {
    navigator.share({
      title: '花冠专卖店永盛烟酒',
      text: '精选烟酒礼盒，正品保证',
      url: window.location.href
    }).catch(() => {});
  } else {
    const tip = document.getElementById('shareTip');
    tip.classList.add('show');
    setTimeout(() => tip.classList.remove('show'), 2000);
  }
}

// 初始化二维码
function initQRCode() {
  const url = window.location.href;
  new QRCode(document.getElementById('qrcode'), {
    text: url,
    width: 150,
    height: 150,
    colorDark: '#1A1A1A',
    colorLight: '#ffffff'
  });
}

// 打开二维码
function openQR() {
  document.getElementById('qrOverlay').classList.add('show');
}

// 关闭二维码
function closeQR() {
  document.getElementById('qrOverlay').classList.remove('show');
}

// 显示Toast
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1500);
}

// 暴露全局函数
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;
