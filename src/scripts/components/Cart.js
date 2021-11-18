import gsap from 'gsap';
import Client from 'shopify-buy';
import {
  addClass,
  append,
  create,
  removeChildren,
  select,
  selectAll,
} from '../utils/helper';

export class Cart {
  constructor() {
    this.container = select('[data-cart]');
    if (!this.container) return;

    /**
     * Elements
     */
    this.cart = {
      items: select('[data-cart-items]'),
      btn: select('[data-cart-btn]'),
      num: select('[data-cart-num]'),
      checkoutBtn: select('[data-checkout-btn]'),
    };
    this.selectVariants = select('[data-select-variants]');
    this.productsToCartBtns = selectAll('[data-product-to-cart]');

    /**
     * State
     */
    this.state = {
      loading: false,
      isCartOpen: false,
      checkout: {},
    };

    this.client = Client.buildClient({
      domain: 'eleventy-starter.myshopify.com',
      storefrontAccessToken: 'f3ff4cacb54ac86723bda2dc724c81dd',
    });

    /**
     * Events
     */
    this.handleCartBtnClick = this.handleCartBtnClick.bind(this);
    this.displayVariantBtn = this.displayVariantBtn.bind(this);

    /**
     * Functions
     */
    this.init();
  }

  init() {
    this.initCheckout().catch((err) => console.error(err));
    this.displayVariantBtn();
    this.events();
  }

  handleCartBtnClick() {
    this.state.isCartOpen = !this.state.isCartOpen;

    if (this.state.isCartOpen) {
      gsap.to(this.container, { x: 0 });
    }

    if (!this.state.isCartOpen) {
      gsap.to(this.container, { x: '100%' });
    }
  }

  handleAddLoading(e) {
    e.target.textContent = this.state.loading ? 'Adding...' : 'Add to cart';
  }

  handleRemoveLoading(e) {
    gsap.set(e.target.parentElement.parentElement, {
      opacity: this.state.loading ? 0.5 : 1,
      pointerEvents: this.state.loading ? 'none' : 'all',
    });
  }

  handleQtyLoading(e) {
    gsap.set(e.target.parentElement, {
      opacity: this.state.loading ? 0.5 : 1,
      pointerEvents: this.state.loading ? 'none' : 'all',
    });
  }

  async getNewId() {
    const newCheckout = await this.client.checkout.create();
    localStorage.setItem('checkout_id', newCheckout.id);

    return newCheckout;
  }

  async initCheckout() {
    let newCheckout;

    const currCheckoutId = localStorage.getItem('checkout_id');

    if (currCheckoutId) {
      newCheckout = await this.client.checkout.fetch(currCheckoutId);
      if (newCheckout.completedAt) {
        newCheckout = await this.getNewId().catch((err) => console.log(err));
      }
    } else {
      newCheckout = await this.getNewId().catch((err) => console.log(err));
    }

    this.state.checkout = newCheckout;
    this.displayProductsInCart();
    this.handleCartNum();

    this.cart.checkoutBtn.href = `${this.state.checkout.webUrl}`;
  }

  async addProductToCart(variantId, e) {
    this.state.loading = true;
    this.handleAddLoading(e);

    const lineItems = [
      {
        variantId,
        quantity: 1,
      },
    ];
    const newCheckout = await this.client.checkout.addLineItems(
      this.state.checkout.id,
      lineItems
    );

    this.state.loading = false;
    this.handleAddLoading(e);

    this.state.checkout = newCheckout;
    this.displayProductsInCart();
    this.handleCartNum();
  }

  async removeProductFromCart(lineItemId, e) {
    this.state.loading = true;
    this.handleRemoveLoading(e);

    const newCheckout = await this.client.checkout.removeLineItems(
      this.state.checkout.id,
      [lineItemId]
    );

    this.state.loading = false;
    this.handleRemoveLoading(e);

    this.state.checkout = newCheckout;
    this.displayProductsInCart();
    this.handleCartNum();
  }

  async changeQuantity(lineItemId, quantity, e) {
    this.state.loading = true;
    this.handleQtyLoading(e);

    const lineItemsToUpdate = [{ id: lineItemId, quantity }];

    const newCheckout = await this.client.checkout.updateLineItems(
      this.state.checkout.id,
      lineItemsToUpdate
    );

    this.state.loading = false;
    this.handleQtyLoading(e);

    this.state.checkout = newCheckout;
    this.displayProductsInCart();
  }

  displayProductsInCart() {
    removeChildren(this.cart.items);

    if (this.state.checkout.lineItems.length === 0) {
      const wrapper = create('div');
      wrapper.innerHTML = '<p>Your cart is empty</p>';
      append(this.cart.items, wrapper);
      gsap.set(this.cart.checkoutBtn, {
        autoAlpha: 0.5,
        pointerEvents: 'none',
      });
    } else {
      gsap.set(this.cart.checkoutBtn, {
        autoAlpha: 1,
        pointerEvents: 'all',
      });
    }

    this.state.checkout.lineItems.forEach((item) => {
      const wrapper = create('div');
      addClass(wrapper, 'flex');
      addClass(wrapper, 'justify-between');

      wrapper.innerHTML = `
      <div class="flex">
        <figure class="w-20">
          <img src="${item.variant.image.src}" alt="${item.title}" />
        </figure>
        <p>${item.title} (${item.variant.title})</p>
        <button data-remove-btn="${item.id}"> x </button>
      </div>

      <div class="flex items-center">
        <button data-qty-minus="${item.id}"> - </button>
        <p data-qty="${item.id}">${item.quantity}</p>
        <button data-qty-plus="${item.id}"> + </button>
      </div>

      <p>€ ${item.variant.price * item.quantity}</p>
      `;

      append(this.cart.items, wrapper);
    });

    const price = create('div');
    const info = create('p');
    addClass(price, 'flex');
    addClass(price, 'justify-between');
    price.innerHTML = `<p>Total</p> <p>€ ${this.state.checkout.totalPrice}</p>`;
    // info.textContent = `Shipping and taxes calculated at checkout.`;
    append(this.cart.items, price);
    append(this.cart.items, info);
  }

  handleCartNum() {
    const calcTotalItems = this.state.checkout.lineItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    this.cart.num.textContent = calcTotalItems;
  }

  displayVariantBtn() {
    if (!this.selectVariants) return;

    const activeOption = this.selectVariants.options.selectedIndex;

    this.productsToCartBtns.forEach((btn, i) => {
      if (activeOption !== i) {
        gsap.set(btn, { autoAlpha: 0 });
      } else {
        gsap.set(btn, { autoAlpha: 1 });
      }
    });
  }

  events() {
    this.cart.btn.addEventListener('click', this.handleCartBtnClick);

    this.productsToCartBtns.forEach((productsToCartBtn) => {
      productsToCartBtn.addEventListener('click', (e) => {
        this.addProductToCart(
          productsToCartBtn.getAttribute('data-product-variant'),
          e
        ).catch((err) => console.error(err));
      });
    });

    this.container.addEventListener('click', (e) => {
      if (e.target.getAttribute('data-remove-btn')) {
        this.removeProductFromCart(e.target.dataset.removeBtn, e).catch((err) =>
          console.error(err)
        );
      }

      if (e.target.getAttribute('data-qty-minus')) {
        const qty = e.target.nextElementSibling;
        qty.textContent = Number(qty.textContent) - 1;

        this.changeQuantity(qty.dataset.qty, Number(qty.textContent), e).catch(
          (err) => console.error(err)
        );
      }

      if (e.target.getAttribute('data-qty-plus')) {
        const qty = e.target.previousElementSibling;
        qty.textContent = Number(qty.textContent) + 1;

        this.changeQuantity(qty.dataset.qty, Number(qty.textContent), e).catch(
          (err) => console.error(err)
        );
      }
    });

    if (this.selectVariants)
      this.selectVariants.addEventListener('change', this.displayVariantBtn);
  }
}
