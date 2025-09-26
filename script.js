document.addEventListener('DOMContentLoaded', () => {
    // Page Elements
    const productsPage = document.getElementById('products-page');
    const adminPage = document.getElementById('admin-page');
    const ordersReportPage = document.getElementById('orders-report-page');
    const checkoutPage = document.getElementById('checkout-page');
    const confirmationPage = document.getElementById('confirmation-page');
    const productList = document.getElementById('product-list');
    const cartButton = document.getElementById('cart-button');
    const cartCount = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const closeCartModalButton = document.getElementById('close-cart-modal-button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Admin Nav
    const adminNavLinks = document.getElementById('admin-nav-links');
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');
    const adminProductsLink = document.getElementById('admin-products-link');
    const ordersReportLink = document.getElementById('orders-report-link');

    const backToShopLink = document.getElementById('back-to-shop-link');
    const addProductForm = document.getElementById('add-product-form');
    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');
    const closeLoginModalButton = document.getElementById('close-login-modal-button');
    const loginError = document.getElementById('login-error');
    const adminProductList = document.getElementById('admin-product-list');
    const formTitle = document.getElementById('form-title');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const imagePreview = document.getElementById('image-preview');
    const productImageInput = document.getElementById('product-image');
    const checkoutForm = document.getElementById('checkout-form');
    const orderNumberEl = document.getElementById('order-number');
    const backToHomeBtn = document.getElementById('back-to-home-btn');
    const infoModal = document.getElementById('info-modal');
    const infoModalTitle = document.getElementById('info-modal-title');
    const infoModalMessage = document.getElementById('info-modal-message');
    const infoModalButtons = document.getElementById('info-modal-buttons');
    const ordersListContainer = document.getElementById('orders-list');

    // Edit Order Modal
    const editOrderModal = document.getElementById('edit-order-modal');
    const editOrderForm = document.getElementById('edit-order-form');
    const cancelEditOrderBtn = document.getElementById('cancel-edit-order-btn');

    // Shop Info Elements
    const shopSettingsForm = document.getElementById('shop-settings-form');
    const shopNameDisplay = document.getElementById('shop-name-display');
    const shopContactInfoContainer = document.getElementById('shop-contact-info');
    const marqueeText = document.getElementById('marquee-text');
    const shopLogoInput = document.getElementById('shop-logo-input');
    const logoPreview = document.getElementById('logo-preview');
    const shopLogoDisplay = document.getElementById('shop-logo-display');
    const heroBanner = document.getElementById('hero-banner');
    const bannerTitle = document.getElementById('banner-title');
    const bannerSubtitle = document.getElementById('banner-subtitle');
    const bannerPreview = document.getElementById('banner-preview');
    const shopBannerInput = document.getElementById('shop-banner-input');

    // App State
    let products = [];
    let cart = [];
    let orders = [];
    let loggedIn = false;
    let shopInfo = {};
    let newLogoData = null;
    let newBannerData = null;

    // --- DATA FUNCTIONS ---
    const saveState = () => {
        try {
            localStorage.setItem('products', JSON.stringify(products));
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('orders', JSON.stringify(orders));
            localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
            localStorage.setItem('shopInfo', JSON.stringify(shopInfo));
        } catch (error) {
            if (error.name === 'QuotaExceededError') {
                console.error("LocalStorage quota exceeded.", error);
                showMessage(
                    'ข้อผิดพลาดในการบันทึก',
                     'ไม่สามารถบันทึกข้อมูลได้เนื่องจากรูปภาพมีขนาดใหญ่เกินไป การเปลี่ยนแปลงล่าสุดจะไม่ถูกบันทึกไว้เมื่อปิดหน้าต่างนี้'
                );
            } else {
                console.error("An unexpected error occurred while saving state:", error);
            }
        }
    };

    const loadState = () => {
        const storedProducts = localStorage.getItem('products');
        const storedCart = localStorage.getItem('cart');
        const storedOrders = localStorage.getItem('orders');
        const storedLoggedIn = localStorage.getItem('loggedIn');
        const storedShopInfo = localStorage.getItem('shopInfo');

        if (storedProducts && JSON.parse(storedProducts).length > 0) {
            products = JSON.parse(storedProducts);
        } else {
            products = [
                { id: 1, name: 'ยางรัดผมลายเดซี่สีชมพู', price: 89, stock: 50, image: 'https://i.imgur.com/rT323zC.jpeg' },
                { id: 2, name: 'ยางรัดผมลายสก๊อตสีม่วง', price: 79, stock: 30, image: 'https://i.imgur.com/aORVn6G.jpeg' },
                { id: 3, name: 'ยางรัดผมลายสก๊อตสีเบจ', price: 79, stock: 0, image: 'https://i.imgur.com/pYmN5aC.jpeg' },
                { id: 4, name: 'ยางรัดผมลายสก๊อตสีน้ำตาล', price: 79, stock: 100, image: 'https://i.imgur.com/p8tF9eS.jpeg' }
            ];
        }

        if (storedCart) cart = JSON.parse(storedCart);
        if (storedOrders) orders = JSON.parse(storedOrders);
        if (storedLoggedIn) loggedIn = JSON.parse(storedLoggedIn);

        if (storedShopInfo) {
            shopInfo = JSON.parse(storedShopInfo);
        } else {
            shopInfo = {
                name: 'Scrunchie Love',
                lineId: 'shop_line_id',
                phone: '081-234-5678',
                marquee: '✨ ยางรัดผมสุดน่ารัก คุณภาพดี ราคาเป็นกันเอง! เลือกซื้อเลย ✨',
                logo: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0Y1OUUwMCI+PHBhdGggZD0iTTE5IDhjMCAuMy0uMS41LS4yLjdsLTEuMSA0LjVjLS4xLjQtLjUuNy0xIC43aC0yLjdjLS41IDAtLjgtLjQtLjctLjlsMS4xLTQuMWMwLS4xLS4xLS4yLS4yLS4yLTEuMi0uNS0yLjktMS44LTMuNC0yLjYtLjEuMS0uMS4zLS4yLjRsLTIgNy4yYy0uMS40LS41LjctMSAuN0g1LjVjLS42IDAtMS0uMy0uOC0uOWwMS40LTMuN2MuNy0xLjcgMS45LTMuOCA0LjEtNS4zUzE1IDAgMTYgMGMxLjQgMCAyLjIuNiAyLjggMS4yLjYuNi45IDEuNS45IDIuMiAwIC40LS4xLjgtLjMgMS4xLS4zLjktMS4yIDEuOC0yLj₄yLjMuMSAwIC4yLjEuMi40TDE5IDE4YzAgLjMtLjEuNS0uMi43bC0xLjEgNC41Yy0uMS40LS41LjctMSAuN2gtMi43Yy0uNSAwLS44LS40LS43LS45bDEuMS00LjFjMC0uMS0uMS0uMi0uMi0uMi0xLjItLjUtMi45LTEuOC0zLjQtMi42LS4xLjEtLjEuMy0uMi40bC0yIDcuMmMtLjEuNC0uNS43LTEgLjdoLTQuNWMtLjYgMC0xLS4zLS44LS45bDEuNC0zLjdjLjctMS4yIDEuOS0zLjggNC4xLTUuM3MyLjgtMi4zIDQuMy0yLjNjMS43IDAgMi45LjggMy43IDEuOS43IDEuMSAxLjIgMi42IDEuMiA0LjEgMCAuNy0uMiAxLjQtLjUgMi0uNiAxLjItMS43IDIuNS0zLjIgMy4xLjEgMCAuMi4xLjIuNEwxOSA4em0tNyAyYzEuMSAwIDIuMS0uNCAyLjgtMS4yLjctLjggMS4xLTEuOSAxLjEtMy4xIDAtLjYtLjItMS4yLS41LTEuNy0uNC0uNS0uOS0uNy0xLjYtLjctLjggMC0xLjUuMy0yLjEuOS0uNy42LTEgMS40LTEgMi4zIDAgMS4yLjYgMi4jIDEuOCAzeiIvPjwvc3ZnPg==',
                bannerImage: 'https://images.unsplash.com/photo-1599949999908-74121a83b42f?q=80&w=1974&auto=format&fit=crop',
                bannerTitle: 'คอลเลคชั่นใหม่!',
                bannerSubtitle: 'ยางรัดผมที่ใช่สำหรับทุกสไตล์'
            };
        }
    };

    const resetAdminForm = () => {
        addProductForm.reset();
        imagePreview.classList.add('hidden');
        imagePreview.src = '#';
        document.getElementById('edit-product-id').value = '';
        formTitle.textContent = 'เพิ่มสินค้าใหม่';
        addProductForm.querySelector('button[type="submit"]').textContent = 'เพิ่มสินค้า';
        cancelEditBtn.classList.add('hidden');
    };

    // --- RENDER FUNCTIONS ---
    const renderShopInfo = () => {
        shopNameDisplay.textContent = shopInfo.name;
        document.title = `${shopInfo.name} - ร้านยางรัดผม`;
        shopLogoDisplay.src = shopInfo.logo;

        shopContactInfoContainer.innerHTML = `
            <a href="https://line.me/ti/p/~${shopInfo.lineId}" target="_blank" class="flex items-center hover:text-white transition">
                <svg class="w-5 h-5 mr-1.5" viewBox="0 0 24 24" fill="currentColor"><path d="M16.8,8.2H7.2c-2.9,0-5.2,2.3-5.2,5.2v0c0,2.9,2.3,5.2,5.2,5.2h8.3c0.9,0,1.3-0.3,1.3-0.3c0.9,0,1.3-0.3,1.3-0.3l0.3-0.2c0.4-0.4,0.4-1,0-1.4c0,0-0.1-0.1-0.1-0.1c-0.3-0.3-0.8-0.3-1.1,0l-0.3,0.2c0,0-0.3,0.2-0.8,0.2h-8c-2,0-3.7-1.6-3.7-3.7v0c0-2,1.6-3.7,3.7-3.7h9.5c2,0,3.7,1.6,3.7,3.7v0c0,0.5-0.4,0.8-0.8,0.8h-6.5c-0.5,0-0.8-0.4-0.8-0.8v0c0-0.5,0.4-0.8,0.8-0.8h7.3c0.5,0,0.8-0.4,0.8-0.8v0c0-0.5-0.4-0.8-0.8-0.8H12c-0.5,0-0.8-0.4-0.8-0.8v0c0-0.5,0.4-0.8,0.8-0.8h4.8C17.3,8.9,17.2,8.2,16.8,8.2z M10.9,12.2c-0.5,0-0.8-0.4-0.8-0.8v0c0-0.5,0.4-0.8,0.8-0.8h2.3c0.5,0,0.8,0.4,0.8,0.8v0c0,0.5-0.4,0.8-0.8,0.8H10.9z M7.7,12.2c-0.5,0-0.8-0.4-0.8-0.8v0c0-0.5,0.4-0.8,0.8-0.8h1.2c0.5,0,0.8,0.4,0.8,0.8v0c0,0.5-0.4,0.8-0.8,0.8H7.7z"/></svg>
                <span>${shopInfo.lineId}</span>
            </a>
            <a href="tel:${shopInfo.phone}" class="flex items-center hover:text-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                <span>${shopInfo.phone}</span>
            </a>
        `;
        marqueeText.textContent = shopInfo.marquee;
    };

    const renderBanner = () => {
        heroBanner.style.backgroundImage = `url('${shopInfo.bannerImage}')`;
        bannerTitle.textContent = shopInfo.bannerTitle;
        bannerSubtitle.textContent = shopInfo.bannerSubtitle;
    };

    const renderProducts = () => {
        productList.innerHTML = '';
        products.forEach(product => {
            const cartItem = cart.find(item => item.id === product.id);
            const isChecked = !!cartItem;
            const quantity = cartItem ? cartItem.quantity : 1;
            const outOfStock = product.stock <= 0;

            const productCard = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl group ${outOfStock ? 'opacity-60 cursor-not-allowed' : ''}">
                    <div class="relative">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-56 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/400x400/f871b5/ffffff?text=Image+Not+Found';">
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                        ${outOfStock ? '<div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"><span class="text-white font-bold text-lg px-4 text-center">สินค้าหมด</span></div>' : ''}
                    </div>
                    <div class="p-4 relative min-h-[140px]">
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800 truncate">${product.name}</h3>
                            <p class="text-sm text-gray-500">คงเหลือ: ${product.stock} ชิ้น</p>
                            <p class="text-xl font-bold text-pink-600 my-2">฿${product.price.toLocaleString()}</p>
                        </div>
                        
                        <div class="absolute bottom-4 left-4 right-4 transition-all duration-300 opacity-0 group-hover:opacity-100">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <input type="checkbox" id="check-${product.id}" data-id="${product.id}" class="h-5 w-5 rounded border-gray-300 text-pink-800 focus:ring-pink-500 product-checkbox form-checkbox" ${isChecked ? 'checked' : ''} ${outOfStock ? 'disabled' : ''}>
                                    <label for="check-${product.id}" class="ml-2 text-sm text-gray-600">เลือก</label>
                                </div>
                                <div class="flex items-center">
                                    <label for="qty-${product.id}" class="sr-only">จำนวน</label>
                                    <input type="number" id="qty-${product.id}" data-id="${product.id}" value="${quantity}" min="1" max="${product.stock > 0 ? product.stock : 1}" class="w-16 text-center border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 product-quantity" ${!isChecked || outOfStock ? 'disabled' : ''}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productList.insertAdjacentHTML('beforeend', productCard);
        });
    };

    const renderAdminProducts = () => {
        adminProductList.innerHTML = '';
        if(products.length === 0){
            adminProductList.innerHTML = '<p class="text-gray-500 text-center py-4">ยังไม่มีสินค้าในร้านค้า</p>';
            return;
        }
        products.slice().reverse().forEach(product => {
            const productItem = `
                <div class="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div class="flex items-center flex-1 min-w-0">
                        <img src="${product.image}" alt="${product.name}" class="w-16 h-16 object-cover rounded-md mr-4 flex-shrink-0" onerror="this.onerror=null;this.src='https://placehold.co/64x64/f871b5/ffffff?text=N/A';">
                        <div class="min-w-0">
                            <p class="font-semibold text-gray-800 truncate">${product.name}</p>
                            <div class="flex items-center space-x-4 text-sm text-gray-600">
                                <p>฿${product.price.toLocaleString()}</p>
                                <p>สต็อก: ${product.stock}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex space-x-2 flex-shrink-0 ml-4">
                        <button data-id="${product.id}" class="edit-btn p-2 text-gray-500 hover:text-blue-600 transition rounded-full hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>
                        </button>
                        <button data-id="${product.id}" class="delete-btn p-2 text-gray-500 hover:text-red-600 transition rounded-full hover:bg-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                </div>
            `;
            adminProductList.insertAdjacentHTML('beforeend', productItem);
        });
    };

    const renderCart = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center">ตะกร้าของคุณว่างเปล่า</p>';
            checkoutBtn.disabled = true;
            checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            cart.forEach(item => {
                const product = products.find(p => p.id === item.id);
                if (product) {
                    total += product.price * item.quantity;
                    const cartItemHTML = `
                        <div class="flex justify-between items-center py-2">
                            <div class="flex items-center">
                                <img src="${product.image}" class="w-16 h-16 object-cover rounded-md mr-4" onerror="this.onerror=null;this.src='https://placehold.co/64x64/f871b5/ffffff?text=N/A';">
                                <div>
                                    <p class="font-semibold">${product.name}</p>
                                    <p class="text-sm text-gray-500">฿${product.price.toLocaleString()} x ${item.quantity}</p>
                                </div>
                            </div>
                            <p class="font-semibold">฿${(product.price * item.quantity).toLocaleString()}</p>
                        </div>
                    `;
                    cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
                }
            });
            checkoutBtn.disabled = false;
            checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
        cartTotalEl.textContent = `฿${total.toLocaleString()}`;
    };

    const renderOrdersReport = () => {
        ordersListContainer.innerHTML = '';
        if (orders.length === 0) {
            ordersListContainer.innerHTML = '<p class="text-gray-500 text-center py-8">ยังไม่มีรายการสั่งซื้อ</p>';
            return;
        }

        orders.slice().reverse().forEach(order => {
            let itemsHtml = '';
            let total = 0;
            order.items.forEach(item => {
                const product = products.find(p => p.id === item.id);
                if(product){
                    total += product.price * item.quantity;
                    itemsHtml += `
                        <div class="flex justify-between items-center py-2">
                            <div class="flex items-center">
                                <img src="${product.image}" class="w-12 h-12 object-cover rounded-md mr-3" onerror="this.onerror=null;this.src='https://placehold.co/48x48/f871b5/ffffff?text=N/A';">
                                <div>
                                    <p class="font-medium text-sm">${product.name}</p>
                                    <p class="text-xs text-gray-500">฿${product.price.toLocaleString()}</p>
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                <button data-order-id="${order.orderNumber}" data-product-id="${item.id}" class="decrease-qty-btn rounded-full w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300">-</button>
                                <span class="font-semibold w-8 text-center">${item.quantity}</span>
                                <button data-order-id="${order.orderNumber}" data-product-id="${item.id}" class="increase-qty-btn rounded-full w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300">+</button>
                            </div>
                        </div>
                    `;
                }
            });

            const orderCard = `
                <div class="bg-white rounded-lg shadow-md">
                    <div class="p-4 bg-gray-50 border-b rounded-t-lg flex justify-between items-center">
                        <div>
                            <p class="font-bold text-pink-700">${order.orderNumber}</p>
                            <p class="text-xs text-gray-500">${new Date(order.timestamp).toLocaleString('th-TH')}</p>
                        </div>
                        <div class="flex items-center space-x-2">
                            <button data-order-id="${order.orderNumber}" class="edit-order-btn p-2 text-gray-500 hover:text-blue-600 transition rounded-full hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002 2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </button>
                            <button data-order-id="${order.orderNumber}" class="delete-order-btn p-2 text-gray-500 hover:text-red-600 transition rounded-full hover:bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </div>
                    <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 class="font-semibold text-sm mb-2 text-gray-700">ข้อมูลผู้รับ</h4>
                            <p class="text-sm"><strong>ชื่อ:</strong> ${order.customer.name}</p>
                            <p class="text-sm"><strong>ที่อยู่:</strong> ${order.customer.address}</p>
                            <p class="text-sm"><strong>โทร:</strong> ${order.customer.phone}</p>
                        </div>
                        <div>
                            <h4 class="font-semibold text-sm mb-2 text-gray-700">รายการสินค้า</h4>
                            <div class="space-y-2">${itemsHtml}</div>
                            <div class="border-t mt-3 pt-2 flex justify-between font-bold">
                                <span>ยอดรวม:</span>
                                <span class="text-pink-600">฿${total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            ordersListContainer.insertAdjacentHTML('beforeend', orderCard);
        });
    };

    const updateCartIcon = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    };

    const updateCart = (productId, quantity, isChecked) => {
        productId = parseInt(productId);
        const cartItemIndex = cart.findIndex(item => item.id === productId);

        if (isChecked) {
            if (cartItemIndex > -1) {
                cart[cartItemIndex].quantity = quantity;
            } else {
                cart.push({ id: productId, quantity });
            }
        } else {
            if (cartItemIndex > -1) {
                cart.splice(cartItemIndex, 1);
            }
        }
        saveState();
        updateCartIcon();
    };

    const populateShopSettingsForm = () => {
        document.getElementById('shop-name-input').value = shopInfo.name;
        document.getElementById('line-id-input').value = shopInfo.lineId;
        document.getElementById('shop-phone-input').value = shopInfo.phone;
        document.getElementById('marquee-text-input').value = shopInfo.marquee;
        logoPreview.src = shopInfo.logo;

        document.getElementById('banner-title-input').value = shopInfo.bannerTitle;
        document.getElementById('banner-subtitle-input').value = shopInfo.bannerSubtitle;
        bannerPreview.src = shopInfo.bannerImage;

        newLogoData = null; // Reset temp data
        newBannerData = null;
    };

    const showPage = (pageId) => {
        [productsPage, adminPage, checkoutPage, confirmationPage, ordersReportPage].forEach(page => {
            page.classList.add('hidden');
        });
        document.getElementById(pageId).classList.remove('hidden');

        if(pageId === 'admin-page'){
            renderAdminProducts();
            populateShopSettingsForm();
        } else if (pageId === 'orders-report-page') {
            renderOrdersReport();
        }
        window.scrollTo(0,0);
    };

    // --- MODAL FUNCTIONS ---
    const openModal = (modal) => {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.remove('opacity-0'), 10);
        setTimeout(() => modal.querySelector('.modal-content').classList.remove('scale-95'), 10);
    };

    const closeModal = (modal) => {
        modal.querySelector('.modal-content').classList.add('scale-95');
        modal.classList.add('opacity-0');
        setTimeout(() => modal.classList.add('hidden'), 300);
    };

    const showMessage = (title, message) => {
        infoModalTitle.textContent = title;
        infoModalMessage.textContent = message;
        infoModalButtons.innerHTML = `<button id="info-modal-ok" class="w-full bg-pink-600 text-white font-bold py-2 px-4 rounded-md hover:bg-pink-700 transition">ตกลง</button>`;
        openModal(infoModal);
        document.getElementById('info-modal-ok').onclick = () => closeModal(infoModal);
    };

    const showConfirmation = (title, message, onConfirm) => {
        infoModalTitle.textContent = title;
        infoModalMessage.textContent = message;
        infoModalButtons.innerHTML = `
            <button id="info-modal-cancel" class="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-300 transition">ยกเลิก</button>
            <button id="info-modal-confirm" class="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition">ยืนยัน</button>
        `;
        openModal(infoModal);
        document.getElementById('info-modal-cancel').onclick = () => closeModal(infoModal);
        document.getElementById('info-modal-confirm').onclick = () => {
            closeModal(infoModal);
            onConfirm();
        };
    };

    const updateAuthUI = () => {
        if (loggedIn) {
            loginLink.classList.add('hidden');
            adminNavLinks.classList.remove('hidden');
            adminNavLinks.classList.add('flex');
        } else {
            loginLink.classList.remove('hidden');
            adminNavLinks.classList.add('hidden');
            adminNavLinks.classList.remove('flex');
        }
    };

    // --- EVENT LISTENERS ---
    cartButton.addEventListener('click', () => {
        renderCart();
        openModal(cartModal);
    });

    [closeCartModalButton, cartModal].forEach(el => {
        el.addEventListener('click', e => {
            if(e.target === el) closeModal(cartModal);
        });
    });

    checkoutBtn.addEventListener('click', () => {
        closeModal(cartModal);
        showPage('checkout-page');
    });

    productList.addEventListener('change', e => {
        if (e.target.matches('.product-checkbox')) {
            const id = e.target.dataset.id;
            const qtyInput = document.getElementById(`qty-${id}`);
            const quantity = parseInt(qtyInput.value);
            qtyInput.disabled = !e.target.checked;
            updateCart(id, quantity, e.target.checked);
        }
    });

    productList.addEventListener('input', e => {
        if (e.target.matches('.product-quantity')) {
            const id = e.target.dataset.id;
            const product = products.find(p => p.id == id);
            if (!product) return;

            let quantity = parseInt(e.target.value) || 1;

            if (quantity <= 0) {
                quantity = 1;
                e.target.value = 1;
            }

            if (quantity > product.stock) {
                quantity = product.stock;
                e.target.value = quantity;
            }

            const checkbox = document.getElementById(`check-${id}`);
            if(checkbox.checked){
                updateCart(id, quantity, true);
            }
        }
    });

    loginLink.addEventListener('click', e => {
        e.preventDefault();
        openModal(loginModal);
    });

    adminProductsLink.addEventListener('click', e => {
        e.preventDefault();
        if (loggedIn) showPage('admin-page');
    });

    ordersReportLink.addEventListener('click', e => {
        e.preventDefault();
        if (loggedIn) showPage('orders-report-page');
    });

    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        loggedIn = false;
        saveState();
        updateAuthUI();
        showPage('products-page');
    });

    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value.toLowerCase();
        const password = document.getElementById('password').value;
        const validEmail = 'zhongwen25301987@gmail.com';

        if (email === validEmail && password === 'Naver@2533') {
            loggedIn = true;
            saveState();
            updateAuthUI();
            closeModal(loginModal);
            showPage('admin-page');
            loginForm.reset();
            loginError.classList.add('hidden');
        } else {
            loginError.classList.remove('hidden');
        }
    });

    [closeLoginModalButton, loginModal].forEach(el => {
        el.addEventListener('click', e => {
            if(e.target === el) closeModal(loginModal);
        });
    });

    infoModal.addEventListener('click', e => {
        if(e.target === infoModal) closeModal(infoModal);
    });

    backToShopLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('products-page');
    });

    const handleImageFile = (file, previewElement, maxWidth, callback) => {
        if (!file) return;

        if (!file.type.startsWith('image/')){
            showMessage('ไฟล์ไม่ถูกต้อง', 'กรุณาเลือกไฟล์รูปภาพ (JPG, PNG, GIF)');
            return;
        }

        const reader = new FileReader();

        reader.onload = event => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                try {
                    let width = img.width;
                    let height = img.height;
                    const aspectRatio = width / height;

                    if (width > maxWidth) {
                        width = maxWidth;
                        height = width / aspectRatio;
                    }

                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.75); 

                    if (compressedDataUrl.length > 4900000) {
                        showMessage('ไฟล์ใหญ่เกินไป', 'รูปภาพมีขนาดใหญ่เกินไปแม้จะทำการบีบอัดแล้ว กรุณาลองรูปภาพอื่น');
                        return;
                    }

                    callback(compressedDataUrl);
                    previewElement.src = compressedDataUrl;
                } catch (e) {
                    console.error("Error processing image: ", e);
                    showMessage('เกิดข้อผิดพลาด', 'ไม่สามารถประมวลผลรูปภาพได้ กรุณาลองใหม่อีกครั้ง');
                }
            };
            img.onerror = () => {
                showMessage('ไฟล์เสียหาย', 'ไม่สามารถอ่านไฟล์รูปภาพได้ อาจเป็นเพราะไฟล์เสียหาย');
            };
        };

        reader.onerror = () => {
            showMessage('เกิดข้อผิดพลาด', 'ไม่สามารถอ่านไฟล์ได้');
        };

        reader.readAsDataURL(file);
    };

    shopLogoInput.addEventListener('change', e => {
        handleImageFile(e.target.files[0], logoPreview, 128, (data) => {
            newLogoData = data;
        });
    });

    shopBannerInput.addEventListener('change', e => {
        handleImageFile(e.target.files[0], bannerPreview, 1280, (data) => {
            newBannerData = data;
        });
    });

    shopSettingsForm.addEventListener('submit', e => {
        e.preventDefault();
        shopInfo.name = document.getElementById('shop-name-input').value.trim();
        shopInfo.lineId = document.getElementById('line-id-input').value.trim();
        shopInfo.phone = document.getElementById('shop-phone-input').value.trim();
        shopInfo.marquee = document.getElementById('marquee-text-input').value.trim();
        shopInfo.bannerTitle = document.getElementById('banner-title-input').value.trim();
        shopInfo.bannerSubtitle = document.getElementById('banner-subtitle-input').value.trim();

        if (newLogoData) shopInfo.logo = newLogoData;
        if (newBannerData) shopInfo.bannerImage = newBannerData;

        saveState();
        renderShopInfo();
        renderBanner();
        showMessage('สำเร็จ', 'บันทึกข้อมูลร้านค้าและ Banner เรียบร้อยแล้ว');
    });

    addProductForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = parseFloat(document.getElementById('product-price').value);
        const stock = parseInt(document.getElementById('product-stock').value);
        const file = productImageInput.files[0];
        const editingId = parseInt(document.getElementById('edit-product-id').value);

        const processData = (imageData) => {
            if (editingId) {
                const productIndex = products.findIndex(p => p.id === editingId);
                if (productIndex > -1) {
                    products[productIndex].name = name;
                    products[productIndex].price = price;
                    products[productIndex].stock = stock;
                    if (imageData) {
                        products[productIndex].image = imageData;
                    }
                    showMessage('สำเร็จ', 'อัปเดตข้อมูลสินค้าเรียบร้อยแล้ว!');
                }
            } else {
                if (!imageData) {
                    showMessage('เกิดข้อผิดพลาด', 'กรุณาเลือกรูปภาพสำหรับสินค้าใหม่');
                    return;
                }
                const newProduct = {
                    id: Date.now(),
                    name,
                    price,
                    stock,
                    image: imageData
                };
                products.push(newProduct);
                showMessage('สำเร็จ', 'เพิ่มสินค้าใหม่เรียบร้อยแล้ว!');
            }
            saveState();
            renderProducts();
            renderAdminProducts();
            resetAdminForm();
        };

        if (file) {
            handleImageFile(file, imagePreview, 800, processData);
            imagePreview.classList.remove('hidden');
        } else {
            if (editingId) processData(null); 
            else showMessage('เกิดข้อผิดพลาด', 'กรุณาเลือกรูปภาพสำหรับสินค้าใหม่');
        }
    });

    adminProductList.addEventListener('click', e => {
        const editBtn = e.target.closest('.edit-btn');
        const deleteBtn = e.target.closest('.delete-btn');

        if(editBtn) {
            const productId = parseInt(editBtn.dataset.id);
            const productToEdit = products.find(p => p.id === productId);
            if (productToEdit) {
                formTitle.textContent = 'แก้ไขข้อมูลสินค้า';
                addProductForm.querySelector('button[type="submit"]').textContent = 'บันทึกการเปลี่ยนแปลง';
                cancelEditBtn.classList.remove('hidden');
                document.getElementById('edit-product-id').value = productToEdit.id;
                document.getElementById('product-name').value = productToEdit.name;
                document.getElementById('product-price').value = productToEdit.price;
                document.getElementById('product-stock').value = productToEdit.stock;
                imagePreview.src = productToEdit.image;
                imagePreview.classList.remove('hidden');
                adminPage.scrollIntoView({ behavior: 'smooth' });
            }
        }

        if(deleteBtn) {
            const productId = parseInt(deleteBtn.dataset.id);
            const handleDelete = () => {
                products = products.filter(p => p.id !== productId);
                saveState();
                renderProducts();
                renderAdminProducts();
                resetAdminForm();
                showMessage('สำเร็จ', 'ลบสินค้าเรียบร้อยแล้ว');
            };
            showConfirmation('ยืนยันการลบ', 'คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?', handleDelete);
        }
    });

    cancelEditBtn.addEventListener('click', resetAdminForm);

    productImageInput.addEventListener('change', e => {
        handleImageFile(e.target.files[0], imagePreview, 800, (data) => {});
        imagePreview.classList.remove('hidden');
    });

    checkoutForm.addEventListener('submit', e => {
        e.preventDefault();

        const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

        const newOrder = {
            orderNumber: orderNumber,
            timestamp: new Date().toISOString(),
            customer: {
                name: document.getElementById('customer-name').value,
                address: document.getElementById('customer-address').value,
                phone: document.getElementById('customer-phone').value,
            },
            items: [...cart] // Create a copy of the cart
        };
        orders.push(newOrder);

        const total = cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            return sum + (product ? product.price * item.quantity : 0);
        }, 0);