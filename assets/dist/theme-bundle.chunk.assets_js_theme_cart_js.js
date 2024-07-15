"use strict";
(self["webpackChunkAimpoint_Roots"] = self["webpackChunkAimpoint_Roots"] || []).push([["assets_js_theme_cart_js"],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cart)
/* harmony export */ });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");
/* harmony import */ var _common_cart_item_details__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/cart-item-details */ "./assets/js/theme/common/cart-item-details.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var Cart = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Cart, _PageManager);
  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }
  var _proto = Cart.prototype;
  _proto.onReady = function onReady() {
    this.$modal = null;
    this.$cartPageContent = $('[data-cart]');
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$cartAdditionalCheckoutBtns = $('[data-cart-additional-checkout-buttons]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components
    this.$activeCartItemId = null;
    this.$activeCartItemBtnAction = null;
    this.setApplePaySupport();
    this.bindEvents();
  };
  _proto.setApplePaySupport = function setApplePaySupport() {
    if (window.ApplePaySession) {
      this.$cartPageContent.addClass('apple-pay-supported');
    }
  };
  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;
    var itemId = $target.data('cartItemid');
    this.$activeCartItemId = itemId;
    this.$activeCartItemBtnAction = $target.data('action');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
    // Does not quality for min/max quantity
    if (newQty < minQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;
    if (preVal === void 0) {
      preVal = null;
    }
    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry;

    // Does not quality for min/max quantity
    if (!newQty) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: this.context.invalidEntryMessage.replace('[ENTRY]', invalidEntry),
        icon: 'error'
      });
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: minError,
        icon: 'error'
      });
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: maxError,
        icon: 'error'
      });
    }
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();
      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;
        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;
    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: response.data.errors.join('\n'),
          icon: 'error'
        });
      }
    });
  };
  _proto.cartEditOptions = function cartEditOptions(itemId, productId) {
    var _this4 = this;
    var context = Object.assign({
      productForChangeId: productId
    }, this.context);
    var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
    if (this.$modal === null) {
      this.$modal = $('#modal');
    }
    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    this.$modal.find('.modal-content').addClass('hide-content');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);
      var optionChangeHandler = function optionChangeHandler() {
        var $productOptionsContainer = $('[data-product-attributes-wrapper]', _this4.$modal);
        var modalBodyReservedHeight = $productOptionsContainer.outerHeight();
        if ($productOptionsContainer.length && modalBodyReservedHeight) {
          $productOptionsContainer.css('height', modalBodyReservedHeight);
        }
      };
      if (_this4.$modal.hasClass('open')) {
        optionChangeHandler();
      } else {
        _this4.$modal.one(_global_modal__WEBPACK_IMPORTED_MODULE_7__.ModalEvents.opened, optionChangeHandler);
      }
      _this4.productDetails = new _common_cart_item_details__WEBPACK_IMPORTED_MODULE_9__["default"](_this4.$modal, context);
      _this4.bindGiftWrappingForm();
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].hooks.on('product-option-change', function (event, currentTarget) {
      var $form = $(currentTarget).find('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.optionChange(productId, $form.serialize(), function (err, result) {
        var data = result.data || {};
        if (err) {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
            text: err,
            icon: 'error'
          });
          return false;
        }
        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }
        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };
  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;
    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: 'cart/content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages',
        additionalCheckoutButtons: 'cart/additional-checkout-buttons'
      }
    };
    this.$overlay.show();

    // Remove last item from cart? Reload
    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);
      _this5.$cartTotals.html(response.totals);
      _this5.$cartMessages.html(response.statusMessages);
      _this5.$cartAdditionalCheckoutBtns.html(response.additionalCheckoutButtons);
      $cartPageTitle.replaceWith(response.pageTitle);
      _this5.bindEvents();
      _this5.$overlay.hide();
      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;
      $('body').trigger('cart-quantity-update', quantity);
      $("[data-cart-itemid='" + _this5.$activeCartItemId + "']", _this5.$cartContent).filter("[data-action='" + _this5.$activeCartItemBtnAction + "']").trigger('focus');
    });
  };
  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;
    var debounceTimeout = 400;
    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdate, debounceTimeout), this);
    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);
    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartRemoveItem, debounceTimeout), this);
    var preVal;

    // cart update
    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdate($target);
    });

    // cart qty manually updates
    $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault();

      // update cart quantity
      cartUpdateQtyTextChange($target, preVal);
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
        text: string,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: _this6.context.cancelButtonText
      }).then(function (result) {
        if (result.value) {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      var productId = $(event.currentTarget).data('productId');
      event.preventDefault();
      // edit item in cart
      _this6.cartEditOptions(itemId, productId);
    });
  };
  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;
    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault();

      // Empty code
      if (!code) {
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: $codeInput.data('error'),
          icon: 'error'
        });
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
            html: response.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };
  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;
    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();
      if (!(0,_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(code)) {
        var validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(_this8.context);
        return _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
          text: validationDictionary.invalid_gift_certificate,
          icon: 'error'
        });
      }
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          _global_sweet_alert__WEBPACK_IMPORTED_MODULE_8__["default"].fire({
            html: resp.data.errors.join('\n'),
            icon: 'error'
          });
        }
      });
    });
  };
  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;
    var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);
        _this9.bindGiftWrappingForm();
      });
    });
  };
  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');
      if (!id) {
        return;
      }
      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();
      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');
    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');
      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }
    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };
  _proto.bindEvents = function bindEvents() {
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents();

    // initiate shipping estimator module
    var shippingErrorMessages = {
      country: this.context.shippingCountryErrorMessage,
      province: this.context.shippingProvinceErrorMessage
    };
    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__["default"]($('[data-shipping-estimator]'), shippingErrorMessages);
  };
  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShippingEstimator)
/* harmony export */ });
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/sweet-alert */ "./assets/js/theme/global/sweet-alert.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");






var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element, shippingErrorMessages) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.isEstimatorFormOpened = false;
    this.shippingErrorMessages = shippingErrorMessages;
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }
  var _proto = ShippingEstimator.prototype;
  _proto.initFormValidation = function initFormValidation() {
    var _this = this;
    var shippingEstimatorAlert = $('.shipping-quotes');
    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.announceInputErrorMessage
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // estimator error messages are being injected in html as a result
      // of user submit; clearing and adding role on submit provides
      // regular announcement of these error messages
      if (shippingEstimatorAlert.attr('role')) {
        shippingEstimatorAlert.removeAttr('role');
      }
      shippingEstimatorAlert.attr('role', 'alert');
      // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity
      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }
      if (_this.shippingValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };
  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.country
    }]);
  };
  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;
    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");
        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.province
    }]);
  }

  /**
   * Toggle between default shipping and ups shipping rates
   */;
  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };
  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;
    var $last;

    // Requests the states for a country with AJAX
    (0,_common_state_country__WEBPACK_IMPORTED_MODULE_0__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        _global_sweet_alert__WEBPACK_IMPORTED_MODULE_5__["default"].fire({
          text: err,
          icon: 'error'
        });
        throw new Error(err);
      }
      var $field = $(field);
      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }
      if ($last) {
        _this3.shippingValidator.remove($last);
      }
      if ($field.is('select')) {
        $last = field;
        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.Validators.cleanUpStateValidation(field);
      }

      // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us
      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };
  _proto.toggleEstimatorFormState = function toggleEstimatorFormState(toggleButton, buttonSelector, $toggleContainer) {
    var changeAttributesOnToggle = function changeAttributesOnToggle(selectorToActivate) {
      $(toggleButton).attr('aria-labelledby', selectorToActivate);
      $(buttonSelector).text($("#" + selectorToActivate).text());
    };
    if (!this.isEstimatorFormOpened) {
      changeAttributesOnToggle('estimator-close');
      $toggleContainer.removeClass('u-hidden');
    } else {
      changeAttributesOnToggle('estimator-add');
      $toggleContainer.addClass('u-hidden');
    }
    this.isEstimatorFormOpened = !this.isEstimatorFormOpened;
  };
  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var _this4 = this;
    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    (0,_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content);

        // bind the select button
        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();
      _this4.toggleEstimatorFormState(event.currentTarget, '.shipping-estimate-show__btn-name', $estimatorContainer);
    });
  };
  return ShippingEstimator;
}();


/***/ }),

/***/ "./assets/js/theme/common/cart-item-details.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/cart-item-details.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CartItemDetails)
/* harmony export */ });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _product_details_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-details-base */ "./assets/js/theme/common/product-details-base.js");
/* harmony import */ var _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ie-helpers */ "./assets/js/theme/common/utils/ie-helpers.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var CartItemDetails = /*#__PURE__*/function (_ProductDetailsBase) {
  _inheritsLoose(CartItemDetails, _ProductDetailsBase);
  function CartItemDetails($scope, context, productAttributesData) {
    var _this;
    if (productAttributesData === void 0) {
      productAttributesData = {};
    }
    _this = _ProductDetailsBase.call(this, $scope, context) || this;
    var $form = $('#CartEditProductFieldsForm', _this.$scope);
    var $productOptionsElement = $('[data-product-attributes-wrapper]', $form);
    var hasOptions = $productOptionsElement.html().trim().length;
    var hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
    $productOptionsElement.on('change', function () {
      _this.setProductVariant();
    });
    var optionChangeCallback = _product_details_base__WEBPACK_IMPORTED_MODULE_2__.optionChangeDecorator.call(_assertThisInitialized(_this), hasDefaultOptions);

    // Update product attributes. Also update the initial view in case items are oos
    // or have default variant properties that change the view
    if ((lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(productAttributesData) || hasDefaultOptions) && hasOptions) {
      var productId = _this.context.productForChangeId;
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', optionChangeCallback);
    } else {
      _this.updateProductAttributes(productAttributesData);
    }
    return _this;
  }
  var _proto = CartItemDetails.prototype;
  _proto.setProductVariant = function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($('[data-product-attribute]'), function (index, value) {
      var optionLabel = value.children[0].innerText;
      var optionTitle = optionLabel.split(':')[0].trim();
      var required = optionLabel.toLowerCase().includes('required');
      var type = value.getAttribute('data-product-attribute');
      if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }
      if (type === 'date') {
        var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
          return select.selectedIndex !== 0;
        });
        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
            return x.value;
          }).join('-');
          options.push(optionTitle + ":" + dateString);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-select') {
        var select = value.querySelector('select');
        var selectedIndex = select.selectedIndex;
        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          return;
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
      if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
        var checked = value.querySelector(':checked');
        if (checked) {
          var getSelectedOptionLabel = function getSelectedOptionLabel() {
            var productVariantslist = (0,_utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.convertIntoArray)(value.children);
            var matchLabelForCheckedInput = function matchLabelForCheckedInput(inpt) {
              return inpt.dataset.productAttributeValue === checked.value;
            };
            return productVariantslist.filter(matchLabelForCheckedInput)[0];
          };
          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            var label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.isBrowserIE ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;
            if (label) {
              options.push(optionTitle + ":" + label);
            }
          }
          if (type === 'swatch') {
            var _label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.isBrowserIE ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];
            if (_label) {
              options.push(optionTitle + ":" + _label.title);
            }
          }
          if (type === 'input-checkbox') {
            options.push(optionTitle + ":Yes");
          }
          return;
        }
        if (type === 'input-checkbox') {
          options.push(optionTitle + ":No");
        }
        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
    var productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    var view = $('.modal-header-title');
    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;
      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        var productName = view.html().match(/'(.*?)'/)[1];
        var card = $("[data-name=\"" + productName + "\"]");
        card.attr('data-product-variant', productVariant);
      }
    }
  }

  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */;
  _proto.updateProductAttributes = function updateProductAttributes(data) {
    _ProductDetailsBase.prototype.updateProductAttributes.call(this, data);
    this.$scope.find('.modal-content').removeClass('hide-content');
  };
  return CartItemDetails;
}(_product_details_base__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  }

  // Add any custom gift certificate validation logic here
  return true;
}

/***/ }),

/***/ "./assets/js/theme/common/state-country.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/common/state-country.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/transform */ "./node_modules/lodash/transform.js");
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_transform__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");







/**
 * If there are no options from bcapp, a text field will be sent. This will create a select element to hold options after the remote request.
 * @returns {jQuery|HTMLElement}
 */
function makeStateRequired(stateElement, context) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_2___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-select',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');
  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }
  if ($newElement.prev().find('small').length === 0) {
    // String is injected from localizer
    $newElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $newElement.prev().find('small').show();
  }
  return $newElement;
}

/**
 * If a country with states is the default, a select will be sent,
 * In this case we need to be able to switch to an input field and hide the required field
 */
function makeStateOptional(stateElement) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_2___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });
  var replacementAttributes = {
    type: 'text',
    id: attrs.id,
    'data-label': attrs['data-label'],
    "class": 'form-input',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<input />', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  if ($newElement.length !== 0) {
    (0,_utils_form_utils__WEBPACK_IMPORTED_MODULE_4__.insertStateHiddenField)($newElement);
    $newElement.prev().find('small').hide();
  }
  return $newElement;
}

/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */
function addOptions(statesArray, $selectElement, options) {
  var container = [];
  container.push("<option value=\"\">" + statesArray.prefix + "</option>");
  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()($selectElement)) {
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(statesArray.states, function (stateObj) {
      if (options.useIdForStates) {
        container.push("<option value=\"" + stateObj.id + "\">" + stateObj.name + "</option>");
      } else {
        container.push("<option value=\"" + stateObj.name + "\">" + (stateObj.label ? stateObj.label : stateObj.name) + "</option>");
      }
    });
    $selectElement.html(container.join(' '));
  }
}

/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(stateElement, context, options, callback) {
  if (context === void 0) {
    context = {};
  }
  /**
   * Backwards compatible for three parameters instead of four
   *
   * Available options:
   *
   * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
   */
  if (typeof options === 'function') {
    /* eslint-disable no-param-reassign */
    callback = options;
    options = {};
    /* eslint-enable no-param-reassign */
  }
  $('select[data-field-type="Country"]').on('change', function (event) {
    var countryName = $(event.currentTarget).val();
    if (countryName === '') {
      return;
    }
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__["default"].api.country.getByName(countryName, function (err, response) {
      if (err) {
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_5__.showAlertModal)(context.state_error);
        return callback(err);
      }
      var $currentInput = $('[data-field-type="State"]');
      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_1___default()(response.data.states)) {
        // The element may have been replaced with a select, reselect it
        var $selectElement = makeStateRequired($currentInput, context);
        addOptions(response.data, $selectElement, options);
        callback(null, $selectElement);
      } else {
        var newElement = makeStateOptional($currentInput, context);
        callback(null, newElement);
      }
    });
  });
}

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createTranslationDictionary: () => (/* binding */ createTranslationDictionary)
/* harmony export */ });
var TRANSLATIONS = 'translations';
var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};
var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};

/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */
var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
    validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
    validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXJ0X2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QztBQUU4QjtBQUNTO0FBQ2pDO0FBQ1c7QUFDQztBQUNuQjtBQUNpQjtBQUFBLElBRXBDUyxJQUFJLDBCQUFBQyxZQUFBO0VBQUFDLGNBQUEsQ0FBQUYsSUFBQSxFQUFBQyxZQUFBO0VBQUEsU0FBQUQsS0FBQTtJQUFBLE9BQUFDLFlBQUEsQ0FBQUUsS0FBQSxPQUFBQyxTQUFBO0VBQUE7RUFBQSxJQUFBQyxNQUFBLEdBQUFMLElBQUEsQ0FBQU0sU0FBQTtFQUFBRCxNQUFBLENBQ3JCRSxPQUFPLEdBQVAsU0FBQUEsUUFBQSxFQUFVO0lBQ04sSUFBSSxDQUFDQyxNQUFNLEdBQUcsSUFBSTtJQUNsQixJQUFJLENBQUNDLGdCQUFnQixHQUFHQyxDQUFDLENBQUMsYUFBYSxDQUFDO0lBQ3hDLElBQUksQ0FBQ0MsWUFBWSxHQUFHRCxDQUFDLENBQUMscUJBQXFCLENBQUM7SUFDNUMsSUFBSSxDQUFDRSxhQUFhLEdBQUdGLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQztJQUM1QyxJQUFJLENBQUNHLFdBQVcsR0FBR0gsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO0lBQzFDLElBQUksQ0FBQ0ksMkJBQTJCLEdBQUdKLENBQUMsQ0FBQyx5Q0FBeUMsQ0FBQztJQUMvRSxJQUFJLENBQUNLLFFBQVEsR0FBR0wsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQzNDTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDYixJQUFJLENBQUNDLGlCQUFpQixHQUFHLElBQUk7SUFDN0IsSUFBSSxDQUFDQyx3QkFBd0IsR0FBRyxJQUFJO0lBRXBDLElBQUksQ0FBQ0Msa0JBQWtCLENBQUMsQ0FBQztJQUN6QixJQUFJLENBQUNDLFVBQVUsQ0FBQyxDQUFDO0VBQ3JCLENBQUM7RUFBQWYsTUFBQSxDQUVEYyxrQkFBa0IsR0FBbEIsU0FB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LENBQUM7SUFDM0IsT0FBT2MsR0FBRztFQUNkLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNWLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9BaW1wb2ludCBSb290cy8uL2Fzc2V0cy9qcy90aGVtZS9jYXJ0LmpzIiwid2VicGFjazovL0FpbXBvaW50IFJvb3RzLy4vYXNzZXRzL2pzL3RoZW1lL2NhcnQvc2hpcHBpbmctZXN0aW1hdG9yLmpzIiwid2VicGFjazovL0FpbXBvaW50IFJvb3RzLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscy5qcyIsIndlYnBhY2s6Ly9BaW1wb2ludCBSb290cy8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vQWltcG9pbnQgUm9vdHMvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3N0YXRlLWNvdW50cnkuanMiLCJ3ZWJwYWNrOi8vQWltcG9pbnQgUm9vdHMvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xyXG5pbXBvcnQgeyBiaW5kLCBkZWJvdW5jZSB9IGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCBjaGVja0lzR2lmdENlcnRWYWxpZCBmcm9tICcuL2NvbW1vbi9naWZ0LWNlcnRpZmljYXRlLXZhbGlkYXRvcic7XHJcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XHJcbmltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XHJcbmltcG9ydCBTaGlwcGluZ0VzdGltYXRvciBmcm9tICcuL2NhcnQvc2hpcHBpbmctZXN0aW1hdG9yJztcclxuaW1wb3J0IHsgZGVmYXVsdE1vZGFsLCBNb2RhbEV2ZW50cyB9IGZyb20gJy4vZ2xvYmFsL21vZGFsJztcclxuaW1wb3J0IHN3YWwgZnJvbSAnLi9nbG9iYWwvc3dlZXQtYWxlcnQnO1xyXG5pbXBvcnQgQ2FydEl0ZW1EZXRhaWxzIGZyb20gJy4vY29tbW9uL2NhcnQtaXRlbS1kZXRhaWxzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnQgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XHJcbiAgICBvblJlYWR5KCkge1xyXG4gICAgICAgIHRoaXMuJG1vZGFsID0gbnVsbDtcclxuICAgICAgICB0aGlzLiRjYXJ0UGFnZUNvbnRlbnQgPSAkKCdbZGF0YS1jYXJ0XScpO1xyXG4gICAgICAgIHRoaXMuJGNhcnRDb250ZW50ID0gJCgnW2RhdGEtY2FydC1jb250ZW50XScpO1xyXG4gICAgICAgIHRoaXMuJGNhcnRNZXNzYWdlcyA9ICQoJ1tkYXRhLWNhcnQtc3RhdHVzXScpO1xyXG4gICAgICAgIHRoaXMuJGNhcnRUb3RhbHMgPSAkKCdbZGF0YS1jYXJ0LXRvdGFsc10nKTtcclxuICAgICAgICB0aGlzLiRjYXJ0QWRkaXRpb25hbENoZWNrb3V0QnRucyA9ICQoJ1tkYXRhLWNhcnQtYWRkaXRpb25hbC1jaGVja291dC1idXR0b25zXScpO1xyXG4gICAgICAgIHRoaXMuJG92ZXJsYXkgPSAkKCdbZGF0YS1jYXJ0XSAubG9hZGluZ092ZXJsYXknKVxyXG4gICAgICAgICAgICAuaGlkZSgpOyAvLyBUT0RPOiB0ZW1wb3JhcnkgdW50aWwgcm9wZXIgcHVsbHMgaW4gaGlzIGNhcnQgY29tcG9uZW50c1xyXG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtSWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9uID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRBcHBsZVBheVN1cHBvcnQoKTtcclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBcHBsZVBheVN1cHBvcnQoKSB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5BcHBsZVBheVNlc3Npb24pIHtcclxuICAgICAgICAgICAgdGhpcy4kY2FydFBhZ2VDb250ZW50LmFkZENsYXNzKCdhcHBsZS1wYXktc3VwcG9ydGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNhcnRVcGRhdGUoJHRhcmdldCkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1JZCA9ICR0YXJnZXQuZGF0YSgnY2FydEl0ZW1pZCcpO1xyXG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtSWQgPSBpdGVtSWQ7XHJcbiAgICAgICAgdGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24gPSAkdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuICAgICAgICBjb25zdCAkZWwgPSAkKGAjcXR5LSR7aXRlbUlkfWApO1xyXG4gICAgICAgIGNvbnN0IG9sZFF0eSA9IHBhcnNlSW50KCRlbC52YWwoKSwgMTApO1xyXG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XHJcbiAgICAgICAgY29uc3QgbWluUXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWluJyksIDEwKTtcclxuICAgICAgICBjb25zdCBtaW5FcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1pbkVycm9yJyk7XHJcbiAgICAgICAgY29uc3QgbWF4RXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNYXhFcnJvcicpO1xyXG4gICAgICAgIGNvbnN0IG5ld1F0eSA9ICR0YXJnZXQuZGF0YSgnYWN0aW9uJykgPT09ICdpbmMnID8gb2xkUXR5ICsgMSA6IG9sZFF0eSAtIDE7XHJcbiAgICAgICAgLy8gRG9lcyBub3QgcXVhbGl0eSBmb3IgbWluL21heCBxdWFudGl0eVxyXG4gICAgICAgIGlmIChuZXdRdHkgPCBtaW5RdHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBtaW5FcnJvcixcclxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBtYXhFcnJvcixcclxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XHJcblxyXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1VcGRhdGUoaXRlbUlkLCBuZXdRdHksIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJG92ZXJsYXkuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBxdWFudGl0eSBpcyBjaGFuZ2VkIFwiMVwiIGZyb20gXCIwXCIsIHdlIGhhdmUgdG8gcmVtb3ZlIHRoZSByb3cuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAobmV3UXR5ID09PSAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHJlbW92ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XHJcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlKCR0YXJnZXQsIHByZVZhbCA9IG51bGwpIHtcclxuICAgICAgICBjb25zdCBpdGVtSWQgPSAkdGFyZ2V0LmRhdGEoJ2NhcnRJdGVtaWQnKTtcclxuICAgICAgICBjb25zdCAkZWwgPSAkKGAjcXR5LSR7aXRlbUlkfWApO1xyXG4gICAgICAgIGNvbnN0IG1heFF0eSA9IHBhcnNlSW50KCRlbC5kYXRhKCdxdWFudGl0eU1heCcpLCAxMCk7XHJcbiAgICAgICAgY29uc3QgbWluUXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWluJyksIDEwKTtcclxuICAgICAgICBjb25zdCBvbGRRdHkgPSBwcmVWYWwgIT09IG51bGwgPyBwcmVWYWwgOiBtaW5RdHk7XHJcbiAgICAgICAgY29uc3QgbWluRXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNaW5FcnJvcicpO1xyXG4gICAgICAgIGNvbnN0IG1heEVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWF4RXJyb3InKTtcclxuICAgICAgICBjb25zdCBuZXdRdHkgPSBwYXJzZUludChOdW1iZXIoJGVsLnZhbCgpKSwgMTApO1xyXG4gICAgICAgIGxldCBpbnZhbGlkRW50cnk7XHJcblxyXG4gICAgICAgIC8vIERvZXMgbm90IHF1YWxpdHkgZm9yIG1pbi9tYXggcXVhbnRpdHlcclxuICAgICAgICBpZiAoIW5ld1F0eSkge1xyXG4gICAgICAgICAgICBpbnZhbGlkRW50cnkgPSAkZWwudmFsKCk7XHJcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiB0aGlzLmNvbnRleHQuaW52YWxpZEVudHJ5TWVzc2FnZS5yZXBsYWNlKCdbRU5UUlldJywgaW52YWxpZEVudHJ5KSxcclxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobmV3UXR5IDwgbWluUXR5KSB7XHJcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcclxuICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICB0ZXh0OiBtaW5FcnJvcixcclxuICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobWF4UXR5ID4gMCAmJiBuZXdRdHkgPiBtYXhRdHkpIHtcclxuICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgIHRleHQ6IG1heEVycm9yLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcclxuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtVXBkYXRlKGl0ZW1JZCwgbmV3UXR5LCAoZXJyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2NlZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcXVhbnRpdHkgaXMgY2hhbmdlZCBcIjFcIiBmcm9tIFwiMFwiLCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgcm93LlxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKG5ld1F0eSA9PT0gMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudChyZW1vdmUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJGVsLnZhbChvbGRRdHkpO1xyXG4gICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnZXJyb3InLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpIHtcclxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcclxuICAgICAgICB1dGlscy5hcGkuY2FydC5pdGVtUmVtb3ZlKGl0ZW1JZCwgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHJlc3BvbnNlLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNhcnRFZGl0T3B0aW9ucyhpdGVtSWQsIHByb2R1Y3RJZCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB7IHByb2R1Y3RGb3JDaGFuZ2VJZDogcHJvZHVjdElkLCAuLi50aGlzLmNvbnRleHQgfTtcclxuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy4kbW9kYWwgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy4kbW9kYWwgPSAkKCcjbW9kYWwnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvY29uZmlndXJlLXByb2R1Y3QnLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG1vZGFsLm9wZW4oKTtcclxuICAgICAgICB0aGlzLiRtb2RhbC5maW5kKCcubW9kYWwtY29udGVudCcpLmFkZENsYXNzKCdoaWRlLWNvbnRlbnQnKTtcclxuXHJcbiAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLmNvbmZpZ3VyZUluQ2FydChpdGVtSWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkNoYW5nZUhhbmRsZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCAkcHJvZHVjdE9wdGlvbnNDb250YWluZXIgPSAkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZXMtd3JhcHBlcl0nLCB0aGlzLiRtb2RhbCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb2RhbEJvZHlSZXNlcnZlZEhlaWdodCA9ICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lci5vdXRlckhlaWdodCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgkcHJvZHVjdE9wdGlvbnNDb250YWluZXIubGVuZ3RoICYmIG1vZGFsQm9keVJlc2VydmVkSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyLmNzcygnaGVpZ2h0JywgbW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuJG1vZGFsLmhhc0NsYXNzKCdvcGVuJykpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbkNoYW5nZUhhbmRsZXIoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJG1vZGFsLm9uZShNb2RhbEV2ZW50cy5vcGVuZWQsIG9wdGlvbkNoYW5nZUhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnByb2R1Y3REZXRhaWxzID0gbmV3IENhcnRJdGVtRGV0YWlscyh0aGlzLiRtb2RhbCwgY29udGV4dCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHV0aWxzLmhvb2tzLm9uKCdwcm9kdWN0LW9wdGlvbi1jaGFuZ2UnLCAoZXZlbnQsIGN1cnJlbnRUYXJnZXQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgJGZvcm0gPSAkKGN1cnJlbnRUYXJnZXQpLmZpbmQoJ2Zvcm0nKTtcclxuICAgICAgICAgICAgY29uc3QgJHN1Ym1pdCA9ICQoJ2lucHV0LmJ1dHRvbicsICRmb3JtKTtcclxuICAgICAgICAgICAgY29uc3QgJG1lc3NhZ2VCb3ggPSAkKCcuYWxlcnRNZXNzYWdlQm94Jyk7XHJcblxyXG4gICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHByb2R1Y3RJZCwgJGZvcm0uc2VyaWFsaXplKCksIChlcnIsIHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IHJlc3VsdC5kYXRhIHx8IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBlcnIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnB1cmNoYXNpbmdfbWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ3AuYWxlcnRCb3gtbWVzc2FnZScsICRtZXNzYWdlQm94KS50ZXh0KGRhdGEucHVyY2hhc2luZ19tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJG1lc3NhZ2VCb3guc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICRtZXNzYWdlQm94LmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEucHVyY2hhc2FibGUgfHwgIWRhdGEuaW5zdG9jaykge1xyXG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVmcmVzaENvbnRlbnQocmVtb3ZlKSB7XHJcbiAgICAgICAgY29uc3QgJGNhcnRJdGVtc1Jvd3MgPSAkKCdbZGF0YS1pdGVtLXJvd10nLCB0aGlzLiRjYXJ0Q29udGVudCk7XHJcbiAgICAgICAgY29uc3QgJGNhcnRQYWdlVGl0bGUgPSAkKCdbZGF0YS1jYXJ0LXBhZ2UtdGl0bGVdJyk7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdGVtcGxhdGU6IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICdjYXJ0L2NvbnRlbnQnLFxyXG4gICAgICAgICAgICAgICAgdG90YWxzOiAnY2FydC90b3RhbHMnLFxyXG4gICAgICAgICAgICAgICAgcGFnZVRpdGxlOiAnY2FydC9wYWdlLXRpdGxlJyxcclxuICAgICAgICAgICAgICAgIHN0YXR1c01lc3NhZ2VzOiAnY2FydC9zdGF0dXMtbWVzc2FnZXMnLFxyXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbENoZWNrb3V0QnV0dG9uczogJ2NhcnQvYWRkaXRpb25hbC1jaGVja291dC1idXR0b25zJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLiRvdmVybGF5LnNob3coKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGxhc3QgaXRlbSBmcm9tIGNhcnQ/IFJlbG9hZFxyXG4gICAgICAgIGlmIChyZW1vdmUgJiYgJGNhcnRJdGVtc1Jvd3MubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRDb250ZW50KG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuJGNhcnRDb250ZW50Lmh0bWwocmVzcG9uc2UuY29udGVudCk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNhcnRUb3RhbHMuaHRtbChyZXNwb25zZS50b3RhbHMpO1xyXG4gICAgICAgICAgICB0aGlzLiRjYXJ0TWVzc2FnZXMuaHRtbChyZXNwb25zZS5zdGF0dXNNZXNzYWdlcyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGNhcnRBZGRpdGlvbmFsQ2hlY2tvdXRCdG5zLmh0bWwocmVzcG9uc2UuYWRkaXRpb25hbENoZWNrb3V0QnV0dG9ucyk7XHJcblxyXG4gICAgICAgICAgICAkY2FydFBhZ2VUaXRsZS5yZXBsYWNlV2l0aChyZXNwb25zZS5wYWdlVGl0bGUpO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBxdWFudGl0eSA9ICQoJ1tkYXRhLWNhcnQtcXVhbnRpdHldJywgdGhpcy4kY2FydENvbnRlbnQpLmRhdGEoJ2NhcnRRdWFudGl0eScpIHx8IDA7XHJcblxyXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlcignY2FydC1xdWFudGl0eS11cGRhdGUnLCBxdWFudGl0eSk7XHJcblxyXG4gICAgICAgICAgICAkKGBbZGF0YS1jYXJ0LWl0ZW1pZD0nJHt0aGlzLiRhY3RpdmVDYXJ0SXRlbUlkfSddYCwgdGhpcy4kY2FydENvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKGBbZGF0YS1hY3Rpb249JyR7dGhpcy4kYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb259J11gKVxyXG4gICAgICAgICAgICAgICAgLnRyaWdnZXIoJ2ZvY3VzJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZENhcnRFdmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgZGVib3VuY2VUaW1lb3V0ID0gNDAwO1xyXG4gICAgICAgIGNvbnN0IGNhcnRVcGRhdGUgPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XHJcbiAgICAgICAgY29uc3QgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UgPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UsIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xyXG4gICAgICAgIGNvbnN0IGNhcnRSZW1vdmVJdGVtID0gYmluZChkZWJvdW5jZSh0aGlzLmNhcnRSZW1vdmVJdGVtLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcclxuICAgICAgICBsZXQgcHJlVmFsO1xyXG5cclxuICAgICAgICAvLyBjYXJ0IHVwZGF0ZVxyXG4gICAgICAgICQoJ1tkYXRhLWNhcnQtdXBkYXRlXScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBjYXJ0IHF1YW50aXR5XHJcbiAgICAgICAgICAgIGNhcnRVcGRhdGUoJHRhcmdldCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGNhcnQgcXR5IG1hbnVhbGx5IHVwZGF0ZXNcclxuICAgICAgICAkKCcuY2FydC1pdGVtLXF0eS1pbnB1dCcsIHRoaXMuJGNhcnRDb250ZW50KS5vbignZm9jdXMnLCBmdW5jdGlvbiBvblF0eUZvY3VzKCkge1xyXG4gICAgICAgICAgICBwcmVWYWwgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH0pLmNoYW5nZShldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlIGNhcnQgcXVhbnRpdHlcclxuICAgICAgICAgICAgY2FydFVwZGF0ZVF0eVRleHRDaGFuZ2UoJHRhcmdldCwgcHJlVmFsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnLmNhcnQtcmVtb3ZlJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjYXJ0SXRlbWlkJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnY29uZmlybURlbGV0ZScpO1xyXG4gICAgICAgICAgICBzd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgdGV4dDogc3RyaW5nLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IHRoaXMuY29udGV4dC5jYW5jZWxCdXR0b25UZXh0LFxyXG4gICAgICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgaXRlbSBmcm9tIGNhcnRcclxuICAgICAgICAgICAgICAgICAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJCgnW2RhdGEtaXRlbS1lZGl0XScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUVkaXQnKTtcclxuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdwcm9kdWN0SWQnKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgLy8gZWRpdCBpdGVtIGluIGNhcnRcclxuICAgICAgICAgICAgdGhpcy5jYXJ0RWRpdE9wdGlvbnMoaXRlbUlkLCBwcm9kdWN0SWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRQcm9tb0NvZGVFdmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgJGNvdXBvbkNvbnRhaW5lciA9ICQoJy5jb3Vwb24tY29kZScpO1xyXG4gICAgICAgIGNvbnN0ICRjb3Vwb25Gb3JtID0gJCgnLmNvdXBvbi1mb3JtJyk7XHJcbiAgICAgICAgY29uc3QgJGNvZGVJbnB1dCA9ICQoJ1tuYW1lPVwiY291cG9uY29kZVwiXScsICRjb3Vwb25Gb3JtKTtcclxuXHJcbiAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAkY291cG9uQ29udGFpbmVyLnNob3coKTtcclxuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLnNob3coKTtcclxuICAgICAgICAgICAgJGNvZGVJbnB1dC50cmlnZ2VyKCdmb2N1cycpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuY291cG9uLWNvZGUtY2FuY2VsJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgJGNvdXBvbkNvbnRhaW5lci5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1jYW5jZWwnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1hZGQnKS5zaG93KCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRjb3Vwb25Gb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAkY29kZUlucHV0LnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEVtcHR5IGNvZGVcclxuICAgICAgICAgICAgaWYgKCFjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAkY29kZUlucHV0LmRhdGEoJ2Vycm9yJyksXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5hcHBseUNvZGUoY29kZSwgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzd2FsLmZpcmUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBodG1sOiByZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpIHtcclxuICAgICAgICBjb25zdCAkY2VydENvbnRhaW5lciA9ICQoJy5naWZ0LWNlcnRpZmljYXRlLWNvZGUnKTtcclxuICAgICAgICBjb25zdCAkY2VydEZvcm0gPSAkKCcuY2FydC1naWZ0LWNlcnRpZmljYXRlLWZvcm0nKTtcclxuICAgICAgICBjb25zdCAkY2VydElucHV0ID0gJCgnW25hbWU9XCJjZXJ0Y29kZVwiXScsICRjZXJ0Rm9ybSk7XHJcblxyXG4gICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS50b2dnbGUoKTtcclxuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XHJcbiAgICAgICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWNhbmNlbCcpLnRvZ2dsZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICRjZXJ0Q29udGFpbmVyLnRvZ2dsZSgpO1xyXG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1hZGQnKS50b2dnbGUoKTtcclxuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykudG9nZ2xlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRjZXJ0Rm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjb2RlID0gJGNlcnRJbnB1dC52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNoZWNrSXNHaWZ0Q2VydFZhbGlkKGNvZGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uRGljdGlvbmFyeSA9IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSh0aGlzLmNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogdmFsaWRhdGlvbkRpY3Rpb25hcnkuaW52YWxpZF9naWZ0X2NlcnRpZmljYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuYXBwbHlHaWZ0Q2VydGlmaWNhdGUoY29kZSwgKGVyciwgcmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dhbC5maXJlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaHRtbDogcmVzcC5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2Vycm9yJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpIHtcclxuICAgICAgICBjb25zdCBtb2RhbCA9IGRlZmF1bHRNb2RhbCgpO1xyXG5cclxuICAgICAgICAkKCdbZGF0YS1pdGVtLWdpZnR3cmFwXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdpdGVtR2lmdHdyYXAnKTtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvZ2lmdC13cmFwcGluZy1mb3JtJyxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBtb2RhbC5vcGVuKCk7XHJcblxyXG4gICAgICAgICAgICB1dGlscy5hcGkuY2FydC5nZXRJdGVtR2lmdFdyYXBwaW5nT3B0aW9ucyhpdGVtSWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlLmNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0Zvcm0oKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEdpZnRXcmFwcGluZ0Zvcm0oKSB7XHJcbiAgICAgICAgJCgnLmdpZnRXcmFwcGluZy1zZWxlY3QnKS5vbignY2hhbmdlJywgZXZlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkc2VsZWN0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICAgICAgY29uc3QgaWQgPSAkc2VsZWN0LnZhbCgpO1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9ICRzZWxlY3QuZGF0YSgnaW5kZXgnKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgYWxsb3dNZXNzYWdlID0gJHNlbGVjdC5maW5kKGBvcHRpb25bdmFsdWU9JHtpZH1dYCkuZGF0YSgnYWxsb3dNZXNzYWdlJyk7XHJcblxyXG4gICAgICAgICAgICAkKGAuZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKGAjZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9LSR7aWR9YCkuc2hvdygpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFsbG93TWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0JykudHJpZ2dlcignY2hhbmdlJyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVZpZXdzKCkge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9ICQoJ2lucHV0OnJhZGlvW25hbWUgPVwiZ2lmdHdyYXB0eXBlXCJdOmNoZWNrZWQnKS52YWwoKTtcclxuICAgICAgICAgICAgY29uc3QgJHNpbmdsZUZvcm0gPSAkKCcuZ2lmdFdyYXBwaW5nLXNpbmdsZScpO1xyXG4gICAgICAgICAgICBjb25zdCAkbXVsdGlGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1tdWx0aXBsZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbHVlID09PSAnc2FtZScpIHtcclxuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLnNob3coKTtcclxuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uaGlkZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJG11bHRpRm9ybS5zaG93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJ1tuYW1lPVwiZ2lmdHdyYXB0eXBlXCJdJykub24oJ2NsaWNrJywgdG9nZ2xlVmlld3MpO1xyXG5cclxuICAgICAgICB0b2dnbGVWaWV3cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgdGhpcy5iaW5kQ2FydEV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuYmluZFByb21vQ29kZUV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpO1xyXG4gICAgICAgIHRoaXMuYmluZEdpZnRDZXJ0aWZpY2F0ZUV2ZW50cygpO1xyXG5cclxuICAgICAgICAvLyBpbml0aWF0ZSBzaGlwcGluZyBlc3RpbWF0b3IgbW9kdWxlXHJcbiAgICAgICAgY29uc3Qgc2hpcHBpbmdFcnJvck1lc3NhZ2VzID0ge1xyXG4gICAgICAgICAgICBjb3VudHJ5OiB0aGlzLmNvbnRleHQuc2hpcHBpbmdDb3VudHJ5RXJyb3JNZXNzYWdlLFxyXG4gICAgICAgICAgICBwcm92aW5jZTogdGhpcy5jb250ZXh0LnNoaXBwaW5nUHJvdmluY2VFcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gbmV3IFNoaXBwaW5nRXN0aW1hdG9yKCQoJ1tkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nKSwgc2hpcHBpbmdFcnJvck1lc3NhZ2VzKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgc3RhdGVDb3VudHJ5IGZyb20gJy4uL2NvbW1vbi9zdGF0ZS1jb3VudHJ5JztcclxuaW1wb3J0IG5vZCBmcm9tICcuLi9jb21tb24vbm9kJztcclxuaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcclxuaW1wb3J0IHsgVmFsaWRhdG9ycywgYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcclxuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tICcuLi9jb21tb24vY29sbGFwc2libGUnO1xyXG5pbXBvcnQgc3dhbCBmcm9tICcuLi9nbG9iYWwvc3dlZXQtYWxlcnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcHBpbmdFc3RpbWF0b3Ige1xyXG4gICAgY29uc3RydWN0b3IoJGVsZW1lbnQsIHNoaXBwaW5nRXJyb3JNZXNzYWdlcykge1xyXG4gICAgICAgIHRoaXMuJGVsZW1lbnQgPSAkZWxlbWVudDtcclxuXHJcbiAgICAgICAgdGhpcy4kc3RhdGUgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nLCB0aGlzLiRlbGVtZW50KTtcclxuICAgICAgICB0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hpcHBpbmdFcnJvck1lc3NhZ2VzID0gc2hpcHBpbmdFcnJvck1lc3NhZ2VzO1xyXG4gICAgICAgIHRoaXMuaW5pdEZvcm1WYWxpZGF0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5iaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5iaW5kRXN0aW1hdG9yRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEZvcm1WYWxpZGF0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQgPSAkKCcuc2hpcHBpbmctcXVvdGVzJyk7XHJcblxyXG4gICAgICAgIHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IgPSAnZm9ybVtkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nO1xyXG4gICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IgPSBub2Qoe1xyXG4gICAgICAgICAgICBzdWJtaXQ6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IC5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXRgLFxyXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXQnLCB0aGlzLiRlbGVtZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIC8vIGVzdGltYXRvciBlcnJvciBtZXNzYWdlcyBhcmUgYmVpbmcgaW5qZWN0ZWQgaW4gaHRtbCBhcyBhIHJlc3VsdFxyXG4gICAgICAgICAgICAvLyBvZiB1c2VyIHN1Ym1pdDsgY2xlYXJpbmcgYW5kIGFkZGluZyByb2xlIG9uIHN1Ym1pdCBwcm92aWRlc1xyXG4gICAgICAgICAgICAvLyByZWd1bGFyIGFubm91bmNlbWVudCBvZiB0aGVzZSBlcnJvciBtZXNzYWdlc1xyXG4gICAgICAgICAgICBpZiAoc2hpcHBpbmdFc3RpbWF0b3JBbGVydC5hdHRyKCdyb2xlJykpIHtcclxuICAgICAgICAgICAgICAgIHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQucmVtb3ZlQXR0cigncm9sZScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzaGlwcGluZ0VzdGltYXRvckFsZXJ0LmF0dHIoJ3JvbGUnLCAnYWxlcnQnKTtcclxuICAgICAgICAgICAgLy8gV2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiBjb3VudHJpZXMsIHRoZSBzdGF0ZS9yZWdpb24gaXMgZHluYW1pY1xyXG4gICAgICAgICAgICAvLyBPbmx5IHBlcmZvcm0gYSBjaGVjayBmb3IgYWxsIGZpZWxkcyB3aGVuIGNvdW50cnkgaGFzIGEgdmFsdWVcclxuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGFyZUFsbCgndmFsaWQnKSB3aWxsIGNoZWNrIGNvdW50cnkgZm9yIHZhbGlkaXR5XHJcbiAgICAgICAgICAgIGlmICgkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWApLnZhbCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5iaW5kVmFsaWRhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYmluZFN0YXRlVmFsaWRhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYmluZFVQU1JhdGVzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZFZhbGlkYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1jb3VudHJ5XCJdYCxcclxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnlJZCA9IE51bWJlcih2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvdW50cnlJZCAhPT0gMCAmJiAhTnVtYmVyLmlzTmFOKGNvdW50cnlJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcy5jb3VudHJ5LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRTdGF0ZVZhbGlkYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5hZGQoW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdYCksXHJcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJGVsZSA9ICQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXWApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoJGVsZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlVmFsID0gJGVsZS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGVsZVZhbCAmJiBlbGVWYWwubGVuZ3RoICYmIGVsZVZhbCAhPT0gJ1N0YXRlL3Byb3ZpbmNlJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcy5wcm92aW5jZSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRvZ2dsZSBiZXR3ZWVuIGRlZmF1bHQgc2hpcHBpbmcgYW5kIHVwcyBzaGlwcGluZyByYXRlc1xyXG4gICAgICovXHJcbiAgICBiaW5kVVBTUmF0ZXMoKSB7XHJcbiAgICAgICAgY29uc3QgVVBTUmF0ZVRvZ2dsZSA9ICcuZXN0aW1hdG9yLWZvcm0tdG9nZ2xlVVBTUmF0ZSc7XHJcblxyXG4gICAgICAgICQoJ2JvZHknKS5vbignY2xpY2snLCBVUFNSYXRlVG9nZ2xlLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm1VcHMgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLXVwcycpO1xyXG4gICAgICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybURlZmF1bHQgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLWRlZmF1bHQnKTtcclxuXHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybVVwcy50b2dnbGVDbGFzcygndS1oaWRkZW5WaXN1YWxseScpO1xyXG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybURlZmF1bHQudG9nZ2xlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kU3RhdGVDb3VudHJ5Q2hhbmdlKCkge1xyXG4gICAgICAgIGxldCAkbGFzdDtcclxuXHJcbiAgICAgICAgLy8gUmVxdWVzdHMgdGhlIHN0YXRlcyBmb3IgYSBjb3VudHJ5IHdpdGggQUpBWFxyXG4gICAgICAgIHN0YXRlQ291bnRyeSh0aGlzLiRzdGF0ZSwgdGhpcy5jb250ZXh0LCB7IHVzZUlkRm9yU3RhdGVzOiB0cnVlIH0sIChlcnIsIGZpZWxkKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHN3YWwuZmlyZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogZXJyLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdlcnJvcicsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5nZXRTdGF0dXModGhpcy4kc3RhdGUpICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5yZW1vdmUodGhpcy4kc3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJGxhc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucmVtb3ZlKCRsYXN0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCRmaWVsZC5pcygnc2VsZWN0JykpIHtcclxuICAgICAgICAgICAgICAgICRsYXN0ID0gZmllbGQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRTdGF0ZVZhbGlkYXRpb24oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRmaWVsZC5hdHRyKCdwbGFjZWhvbGRlcicsICdTdGF0ZS9wcm92aW5jZScpO1xyXG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gV2hlbiB5b3UgY2hhbmdlIGEgY291bnRyeSwgeW91IHN3YXAgdGhlIHN0YXRlL3Byb3ZpbmNlIGJldHdlZW4gYW4gaW5wdXQgYW5kIGEgc2VsZWN0IGRyb3Bkb3duXHJcbiAgICAgICAgICAgIC8vIE5vdCBhbGwgY291bnRyaWVzIHJlcXVpcmUgdGhlIHByb3ZpbmNlIHRvIGJlIGZpbGxlZFxyXG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIHJlbW92ZSB0aGlzIGNsYXNzIHdoZW4gd2Ugc3dhcCBzaW5jZSBub2QgdmFsaWRhdGlvbiBkb2Vzbid0IGNsZWFudXAgZm9yIHVzXHJcbiAgICAgICAgICAgICQodGhpcy5zaGlwcGluZ0VzdGltYXRvcikuZmluZCgnLmZvcm0tZmllbGQtLXN1Y2Nlc3MnKS5yZW1vdmVDbGFzcygnZm9ybS1maWVsZC0tc3VjY2VzcycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSh0b2dnbGVCdXR0b24sIGJ1dHRvblNlbGVjdG9yLCAkdG9nZ2xlQ29udGFpbmVyKSB7XHJcbiAgICAgICAgY29uc3QgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlID0gKHNlbGVjdG9yVG9BY3RpdmF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAkKHRvZ2dsZUJ1dHRvbikuYXR0cignYXJpYS1sYWJlbGxlZGJ5Jywgc2VsZWN0b3JUb0FjdGl2YXRlKTtcclxuICAgICAgICAgICAgJChidXR0b25TZWxlY3RvcikudGV4dCgkKGAjJHtzZWxlY3RvclRvQWN0aXZhdGV9YCkudGV4dCgpKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkKSB7XHJcbiAgICAgICAgICAgIGNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSgnZXN0aW1hdG9yLWNsb3NlJyk7XHJcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2hhbmdlQXR0cmlidXRlc09uVG9nZ2xlKCdlc3RpbWF0b3ItYWRkJyk7XHJcbiAgICAgICAgICAgICR0b2dnbGVDb250YWluZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkID0gIXRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFc3RpbWF0b3JFdmVudHMoKSB7XHJcbiAgICAgICAgY29uc3QgJGVzdGltYXRvckNvbnRhaW5lciA9ICQoJy5zaGlwcGluZy1lc3RpbWF0b3InKTtcclxuICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybSA9ICQoJy5lc3RpbWF0b3ItZm9ybScpO1xyXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xyXG4gICAgICAgICRlc3RpbWF0b3JGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcclxuICAgICAgICAgICAgICAgIGNvdW50cnlfaWQ6ICQoJ1tuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcclxuICAgICAgICAgICAgICAgIHN0YXRlX2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgY2l0eTogJCgnW25hbWU9XCJzaGlwcGluZy1jaXR5XCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgemlwX2NvZGU6ICQoJ1tuYW1lPVwic2hpcHBpbmctemlwXCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldFNoaXBwaW5nUXVvdGVzKHBhcmFtcywgJ2NhcnQvc2hpcHBpbmctcXVvdGVzJywgKGVyciwgcmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICQoJy5zaGlwcGluZy1xdW90ZXMnKS5odG1sKHJlc3BvbnNlLmNvbnRlbnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGJpbmQgdGhlIHNlbGVjdCBidXR0b25cclxuICAgICAgICAgICAgICAgICQoJy5zZWxlY3Qtc2hpcHBpbmctcXVvdGUnKS5vbignY2xpY2snLCBjbGlja0V2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBxdW90ZUlkID0gJCgnLnNoaXBwaW5nLXF1b3RlOmNoZWNrZWQnKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hcGkuY2FydC5zdWJtaXRTaGlwcGluZ1F1b3RlKHF1b3RlSWQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKCcuc2hpcHBpbmctZXN0aW1hdGUtc2hvdycpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdGhpcy50b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUoZXZlbnQuY3VycmVudFRhcmdldCwgJy5zaGlwcGluZy1lc3RpbWF0ZS1zaG93X19idG4tbmFtZScsICRlc3RpbWF0b3JDb250YWluZXIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB1dGlscyBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XHJcbmltcG9ydCBQcm9kdWN0RGV0YWlsc0Jhc2UsIHsgb3B0aW9uQ2hhbmdlRGVjb3JhdG9yIH0gZnJvbSAnLi9wcm9kdWN0LWRldGFpbHMtYmFzZSc7XHJcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBpc0Jyb3dzZXJJRSwgY29udmVydEludG9BcnJheSB9IGZyb20gJy4vdXRpbHMvaWUtaGVscGVycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0SXRlbURldGFpbHMgZXh0ZW5kcyBQcm9kdWN0RGV0YWlsc0Jhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCBjb250ZXh0LCBwcm9kdWN0QXR0cmlidXRlc0RhdGEgPSB7fSkge1xyXG4gICAgICAgIHN1cGVyKCRzY29wZSwgY29udGV4dCk7XHJcblxyXG4gICAgICAgIGNvbnN0ICRmb3JtID0gJCgnI0NhcnRFZGl0UHJvZHVjdEZpZWxkc0Zvcm0nLCB0aGlzLiRzY29wZSk7XHJcbiAgICAgICAgY29uc3QgJHByb2R1Y3RPcHRpb25zRWxlbWVudCA9ICQoJ1tkYXRhLXByb2R1Y3QtYXR0cmlidXRlcy13cmFwcGVyXScsICRmb3JtKTtcclxuICAgICAgICBjb25zdCBoYXNPcHRpb25zID0gJHByb2R1Y3RPcHRpb25zRWxlbWVudC5odG1sKCkudHJpbSgpLmxlbmd0aDtcclxuICAgICAgICBjb25zdCBoYXNEZWZhdWx0T3B0aW9ucyA9ICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQuZmluZCgnW2RhdGEtZGVmYXVsdF0nKS5sZW5ndGg7XHJcblxyXG4gICAgICAgICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQub24oJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRQcm9kdWN0VmFyaWFudCgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBvcHRpb25DaGFuZ2VDYWxsYmFjayA9IG9wdGlvbkNoYW5nZURlY29yYXRvci5jYWxsKHRoaXMsIGhhc0RlZmF1bHRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHByb2R1Y3QgYXR0cmlidXRlcy4gQWxzbyB1cGRhdGUgdGhlIGluaXRpYWwgdmlldyBpbiBjYXNlIGl0ZW1zIGFyZSBvb3NcclxuICAgICAgICAvLyBvciBoYXZlIGRlZmF1bHQgdmFyaWFudCBwcm9wZXJ0aWVzIHRoYXQgY2hhbmdlIHRoZSB2aWV3XHJcbiAgICAgICAgaWYgKChpc0VtcHR5KHByb2R1Y3RBdHRyaWJ1dGVzRGF0YSkgfHwgaGFzRGVmYXVsdE9wdGlvbnMpICYmIGhhc09wdGlvbnMpIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gdGhpcy5jb250ZXh0LnByb2R1Y3RGb3JDaGFuZ2VJZDtcclxuXHJcbiAgICAgICAgICAgIHV0aWxzLmFwaS5wcm9kdWN0QXR0cmlidXRlcy5vcHRpb25DaGFuZ2UocHJvZHVjdElkLCAkZm9ybS5zZXJpYWxpemUoKSwgJ3Byb2R1Y3RzL2J1bGstZGlzY291bnQtcmF0ZXMnLCBvcHRpb25DaGFuZ2VDYWxsYmFjayk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhwcm9kdWN0QXR0cmlidXRlc0RhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRQcm9kdWN0VmFyaWFudCgpIHtcclxuICAgICAgICBjb25zdCB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzID0gW107XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICAkLmVhY2goJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVdJyksIChpbmRleCwgdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9uTGFiZWwgPSB2YWx1ZS5jaGlsZHJlblswXS5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvblRpdGxlID0gb3B0aW9uTGFiZWwuc3BsaXQoJzonKVswXS50cmltKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVkID0gb3B0aW9uTGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygncmVxdWlyZWQnKTtcclxuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHZhbHVlLmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCh0eXBlID09PSAnaW5wdXQtZmlsZScgfHwgdHlwZSA9PT0gJ2lucHV0LXRleHQnIHx8IHR5cGUgPT09ICdpbnB1dC1udW1iZXInKSAmJiB2YWx1ZS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID09PSAnJyAmJiByZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICd0ZXh0YXJlYScgJiYgdmFsdWUucXVlcnlTZWxlY3RvcigndGV4dGFyZWEnKS52YWx1ZSA9PT0gJycgJiYgcmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnZGF0ZScpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2F0aXNmaWVkID0gQXJyYXkuZnJvbSh2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSkuZXZlcnkoKHNlbGVjdCkgPT4gc2VsZWN0LnNlbGVjdGVkSW5kZXggIT09IDApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1NhdGlzZmllZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBBcnJheS5mcm9tKHZhbHVlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpKS5tYXAoKHgpID0+IHgudmFsdWUpLmpvaW4oJy0nKTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnB1c2goYCR7b3B0aW9uVGl0bGV9OiR7ZGF0ZVN0cmluZ31gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXNlbGVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IHNlbGVjdC5zZWxlY3RlZEluZGV4O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEluZGV4ICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke3NlbGVjdC5vcHRpb25zW3NlbGVjdGVkSW5kZXhdLmlubmVyVGV4dH1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXJlY3RhbmdsZScgfHwgdHlwZSA9PT0gJ3NldC1yYWRpbycgfHwgdHlwZSA9PT0gJ3N3YXRjaCcgfHwgdHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94JyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tlZCA9IHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJzpjaGVja2VkJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RWYXJpYW50c2xpc3QgPSBjb252ZXJ0SW50b0FycmF5KHZhbHVlLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF0Y2hMYWJlbEZvckNoZWNrZWRJbnB1dCA9IGlucHQgPT4gaW5wdC5kYXRhc2V0LnByb2R1Y3RBdHRyaWJ1dGVWYWx1ZSA9PT0gY2hlY2tlZC52YWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb2R1Y3RWYXJpYW50c2xpc3QuZmlsdGVyKG1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZXQtcmVjdGFuZ2xlJyB8fCB0eXBlID09PSAnc2V0LXJhZGlvJyB8fCB0eXBlID09PSAncHJvZHVjdC1saXN0Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IGlzQnJvd3NlcklFID8gZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCgpLmlubmVyVGV4dC50cmltKCkgOiBjaGVja2VkLmxhYmVsc1swXS5pbm5lclRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2xhYmVsfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ3N3YXRjaCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBpc0Jyb3dzZXJJRSA/IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwoKS5jaGlsZHJlblswXSA6IGNoZWNrZWQubGFiZWxzWzBdLmNoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtsYWJlbC50aXRsZX1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfTpZZXNgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2lucHV0LWNoZWNrYm94Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06Tm9gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGxldCBwcm9kdWN0VmFyaWFudCA9IHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMubGVuZ3RoID09PSAwID8gb3B0aW9ucy5zb3J0KCkuam9pbignLCAnKSA6ICd1bnNhdGlzZmllZCc7XHJcbiAgICAgICAgY29uc3QgdmlldyA9ICQoJy5tb2RhbC1oZWFkZXItdGl0bGUnKTtcclxuXHJcbiAgICAgICAgaWYgKHByb2R1Y3RWYXJpYW50KSB7XHJcbiAgICAgICAgICAgIHByb2R1Y3RWYXJpYW50ID0gcHJvZHVjdFZhcmlhbnQgPT09ICd1bnNhdGlzZmllZCcgPyAnJyA6IHByb2R1Y3RWYXJpYW50O1xyXG4gICAgICAgICAgICBpZiAodmlldy5hdHRyKCdkYXRhLWV2ZW50LXR5cGUnKSkge1xyXG4gICAgICAgICAgICAgICAgdmlldy5hdHRyKCdkYXRhLXByb2R1Y3QtdmFyaWFudCcsIHByb2R1Y3RWYXJpYW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3ROYW1lID0gdmlldy5odG1sKCkubWF0Y2goLycoLio/KScvKVsxXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhcmQgPSAkKGBbZGF0YS1uYW1lPVwiJHtwcm9kdWN0TmFtZX1cIl1gKTtcclxuICAgICAgICAgICAgICAgIGNhcmQuYXR0cignZGF0YS1wcm9kdWN0LXZhcmlhbnQnLCBwcm9kdWN0VmFyaWFudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlIG9yIG1hcmsgYXMgdW5hdmFpbGFibGUgb3V0IG9mIHN0b2NrIGF0dHJpYnV0ZXMgaWYgZW5hYmxlZFxyXG4gICAgICogQHBhcmFtICB7T2JqZWN0fSBkYXRhIFByb2R1Y3QgYXR0cmlidXRlIGRhdGFcclxuICAgICAqL1xyXG4gICAgdXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoZGF0YSkge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzKGRhdGEpO1xyXG5cclxuICAgICAgICB0aGlzLiRzY29wZS5maW5kKCcubW9kYWwtY29udGVudCcpLnJlbW92ZUNsYXNzKCdoaWRlLWNvbnRlbnQnKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY2VydCkge1xyXG4gICAgaWYgKHR5cGVvZiBjZXJ0ICE9PSAnc3RyaW5nJyB8fCBjZXJ0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGQgYW55IGN1c3RvbSBnaWZ0IGNlcnRpZmljYXRlIHZhbGlkYXRpb24gbG9naWMgaGVyZVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuIiwiaW1wb3J0IHV0aWxzIGZyb20gJ0BiaWdjb21tZXJjZS9zdGVuY2lsLXV0aWxzJztcclxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCB9IGZyb20gJy4vdXRpbHMvZm9ybS11dGlscyc7XHJcbmltcG9ydCB7IHNob3dBbGVydE1vZGFsIH0gZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcclxuXHJcbi8qKlxyXG4gKiBJZiB0aGVyZSBhcmUgbm8gb3B0aW9ucyBmcm9tIGJjYXBwLCBhIHRleHQgZmllbGQgd2lsbCBiZSBzZW50LiBUaGlzIHdpbGwgY3JlYXRlIGEgc2VsZWN0IGVsZW1lbnQgdG8gaG9sZCBvcHRpb25zIGFmdGVyIHRoZSByZW1vdGUgcmVxdWVzdC5cclxuICogQHJldHVybnMge2pRdWVyeXxIVE1MRWxlbWVudH1cclxuICovXHJcbmZ1bmN0aW9uIG1ha2VTdGF0ZVJlcXVpcmVkKHN0YXRlRWxlbWVudCwgY29udGV4dCkge1xyXG4gICAgY29uc3QgYXR0cnMgPSBfLnRyYW5zZm9ybShzdGF0ZUVsZW1lbnQucHJvcCgnYXR0cmlidXRlcycpLCAocmVzdWx0LCBpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gcmVzdWx0O1xyXG4gICAgICAgIHJldFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzID0ge1xyXG4gICAgICAgIGlkOiBhdHRycy5pZCxcclxuICAgICAgICAnZGF0YS1sYWJlbCc6IGF0dHJzWydkYXRhLWxhYmVsJ10sXHJcbiAgICAgICAgY2xhc3M6ICdmb3JtLXNlbGVjdCcsXHJcbiAgICAgICAgbmFtZTogYXR0cnMubmFtZSxcclxuICAgICAgICAnZGF0YS1maWVsZC10eXBlJzogYXR0cnNbJ2RhdGEtZmllbGQtdHlwZSddLFxyXG4gICAgfTtcclxuXHJcbiAgICBzdGF0ZUVsZW1lbnQucmVwbGFjZVdpdGgoJCgnPHNlbGVjdD48L3NlbGVjdD4nLCByZXBsYWNlbWVudEF0dHJpYnV0ZXMpKTtcclxuXHJcbiAgICBjb25zdCAkbmV3RWxlbWVudCA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xyXG4gICAgY29uc3QgJGhpZGRlbklucHV0ID0gJCgnW25hbWUqPVwiRm9ybUZpZWxkSXNUZXh0XCJdJyk7XHJcblxyXG4gICAgaWYgKCRoaWRkZW5JbnB1dC5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAkaGlkZGVuSW5wdXQucmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIC8vIFN0cmluZyBpcyBpbmplY3RlZCBmcm9tIGxvY2FsaXplclxyXG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5hcHBlbmQoYDxzbWFsbD4ke2NvbnRleHQucmVxdWlyZWR9PC9zbWFsbD5gKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJG5ld0VsZW1lbnQucHJldigpLmZpbmQoJ3NtYWxsJykuc2hvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAkbmV3RWxlbWVudDtcclxufVxyXG5cclxuLyoqXHJcbiAqIElmIGEgY291bnRyeSB3aXRoIHN0YXRlcyBpcyB0aGUgZGVmYXVsdCwgYSBzZWxlY3Qgd2lsbCBiZSBzZW50LFxyXG4gKiBJbiB0aGlzIGNhc2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIHN3aXRjaCB0byBhbiBpbnB1dCBmaWVsZCBhbmQgaGlkZSB0aGUgcmVxdWlyZWQgZmllbGRcclxuICovXHJcbmZ1bmN0aW9uIG1ha2VTdGF0ZU9wdGlvbmFsKHN0YXRlRWxlbWVudCkge1xyXG4gICAgY29uc3QgYXR0cnMgPSBfLnRyYW5zZm9ybShzdGF0ZUVsZW1lbnQucHJvcCgnYXR0cmlidXRlcycpLCAocmVzdWx0LCBpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gcmVzdWx0O1xyXG4gICAgICAgIHJldFtpdGVtLm5hbWVdID0gaXRlbS52YWx1ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHJlcGxhY2VtZW50QXR0cmlidXRlcyA9IHtcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgaWQ6IGF0dHJzLmlkLFxyXG4gICAgICAgICdkYXRhLWxhYmVsJzogYXR0cnNbJ2RhdGEtbGFiZWwnXSxcclxuICAgICAgICBjbGFzczogJ2Zvcm0taW5wdXQnLFxyXG4gICAgICAgIG5hbWU6IGF0dHJzLm5hbWUsXHJcbiAgICAgICAgJ2RhdGEtZmllbGQtdHlwZSc6IGF0dHJzWydkYXRhLWZpZWxkLXR5cGUnXSxcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGVFbGVtZW50LnJlcGxhY2VXaXRoKCQoJzxpbnB1dCAvPicsIHJlcGxhY2VtZW50QXR0cmlidXRlcykpO1xyXG5cclxuICAgIGNvbnN0ICRuZXdFbGVtZW50ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XHJcblxyXG4gICAgaWYgKCRuZXdFbGVtZW50Lmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIGluc2VydFN0YXRlSGlkZGVuRmllbGQoJG5ld0VsZW1lbnQpO1xyXG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gJG5ld0VsZW1lbnQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBZGRzIHRoZSBhcnJheSBvZiBvcHRpb25zIGZyb20gdGhlIHJlbW90ZSByZXF1ZXN0IHRvIHRoZSBuZXdseSBjcmVhdGVkIHNlbGVjdCBib3guXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZXNBcnJheVxyXG4gKiBAcGFyYW0ge2pRdWVyeX0gJHNlbGVjdEVsZW1lbnRcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICovXHJcbmZ1bmN0aW9uIGFkZE9wdGlvbnMoc3RhdGVzQXJyYXksICRzZWxlY3RFbGVtZW50LCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBbXTtcclxuXHJcbiAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIlwiPiR7c3RhdGVzQXJyYXkucHJlZml4fTwvb3B0aW9uPmApO1xyXG5cclxuICAgIGlmICghXy5pc0VtcHR5KCRzZWxlY3RFbGVtZW50KSkge1xyXG4gICAgICAgIF8uZWFjaChzdGF0ZXNBcnJheS5zdGF0ZXMsIChzdGF0ZU9iaikgPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy51c2VJZEZvclN0YXRlcykge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnB1c2goYDxvcHRpb24gdmFsdWU9XCIke3N0YXRlT2JqLmlkfVwiPiR7c3RhdGVPYmoubmFtZX08L29wdGlvbj5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5wdXNoKGA8b3B0aW9uIHZhbHVlPVwiJHtzdGF0ZU9iai5uYW1lfVwiPiR7c3RhdGVPYmoubGFiZWwgPyBzdGF0ZU9iai5sYWJlbCA6IHN0YXRlT2JqLm5hbWV9PC9vcHRpb24+YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHNlbGVjdEVsZW1lbnQuaHRtbChjb250YWluZXIuam9pbignICcpKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7alF1ZXJ5fSBzdGF0ZUVsZW1lbnRcclxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZUVsZW1lbnQsIGNvbnRleHQgPSB7fSwgb3B0aW9ucywgY2FsbGJhY2spIHtcclxuICAgIC8qKlxyXG4gICAgICogQmFja3dhcmRzIGNvbXBhdGlibGUgZm9yIHRocmVlIHBhcmFtZXRlcnMgaW5zdGVhZCBvZiBmb3VyXHJcbiAgICAgKlxyXG4gICAgICogQXZhaWxhYmxlIG9wdGlvbnM6XHJcbiAgICAgKlxyXG4gICAgICogdXNlSWRGb3JTdGF0ZXMge0Jvb2x9IC0gR2VuZXJhdGVzIHN0YXRlcyBkcm9wZG93biB1c2luZyBpZCBmb3IgdmFsdWVzIGluc3RlYWQgb2Ygc3RyaW5nc1xyXG4gICAgICovXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xyXG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcclxuICAgICAgICBvcHRpb25zID0ge307XHJcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xyXG4gICAgfVxyXG5cclxuICAgICQoJ3NlbGVjdFtkYXRhLWZpZWxkLXR5cGU9XCJDb3VudHJ5XCJdJykub24oJ2NoYW5nZScsIGV2ZW50ID0+IHtcclxuICAgICAgICBjb25zdCBjb3VudHJ5TmFtZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCk7XHJcblxyXG4gICAgICAgIGlmIChjb3VudHJ5TmFtZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXRpbHMuYXBpLmNvdW50cnkuZ2V0QnlOYW1lKGNvdW50cnlOYW1lLCAoZXJyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChjb250ZXh0LnN0YXRlX2Vycm9yKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCAkY3VycmVudElucHV0ID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIV8uaXNFbXB0eShyZXNwb25zZS5kYXRhLnN0YXRlcykpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRoZSBlbGVtZW50IG1heSBoYXZlIGJlZW4gcmVwbGFjZWQgd2l0aCBhIHNlbGVjdCwgcmVzZWxlY3QgaXRcclxuICAgICAgICAgICAgICAgIGNvbnN0ICRzZWxlY3RFbGVtZW50ID0gbWFrZVN0YXRlUmVxdWlyZWQoJGN1cnJlbnRJbnB1dCwgY29udGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgYWRkT3B0aW9ucyhyZXNwb25zZS5kYXRhLCAkc2VsZWN0RWxlbWVudCwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAkc2VsZWN0RWxlbWVudCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gbWFrZVN0YXRlT3B0aW9uYWwoJGN1cnJlbnRJbnB1dCwgY29udGV4dCk7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgbmV3RWxlbWVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xyXG5jb25zdCBpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5ID0gKGRpY3Rpb25hcnkpID0+ICEhT2JqZWN0LmtleXMoZGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5sZW5ndGg7XHJcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGRpY3Rpb25hcnkgPSBKU09OLnBhcnNlKGRpY3Rpb25hcnlKc29uTGlzdFtpXSk7XHJcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcclxuICogQHBhcmFtIGNvbnRleHQgcHJvdmlkZXMgYWNjZXNzIHRvIDMgdmFsaWRhdGlvbiBKU09OcyBmcm9tIGVuLmpzb246XHJcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcclxuICogQHJldHVybnMge09iamVjdH1cclxuICovXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xyXG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xyXG4gICAgY29uc3QgYWN0aXZlRGljdGlvbmFyeSA9IGNob29zZUFjdGl2ZURpY3Rpb25hcnkodmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTik7XHJcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xyXG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcclxuXHJcbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcclxuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XHJcbiAgICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KTtcclxufTtcclxuIl0sIm5hbWVzIjpbIlBhZ2VNYW5hZ2VyIiwiY2hlY2tJc0dpZnRDZXJ0VmFsaWQiLCJjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkiLCJ1dGlscyIsIlNoaXBwaW5nRXN0aW1hdG9yIiwiZGVmYXVsdE1vZGFsIiwiTW9kYWxFdmVudHMiLCJzd2FsIiwiQ2FydEl0ZW1EZXRhaWxzIiwiQ2FydCIsIl9QYWdlTWFuYWdlciIsIl9pbmhlcml0c0xvb3NlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJvblJlYWR5IiwiJG1vZGFsIiwiJGNhcnRQYWdlQ29udGVudCIsIiQiLCIkY2FydENvbnRlbnQiLCIkY2FydE1lc3NhZ2VzIiwiJGNhcnRUb3RhbHMiLCIkY2FydEFkZGl0aW9uYWxDaGVja291dEJ0bnMiLCIkb3ZlcmxheSIsImhpZGUiLCIkYWN0aXZlQ2FydEl0ZW1JZCIsIiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbiIsInNldEFwcGxlUGF5U3VwcG9ydCIsImJpbmRFdmVudHMiLCJ3aW5kb3ciLCJBcHBsZVBheVNlc3Npb24iLCJhZGRDbGFzcyIsImNhcnRVcGRhdGUiLCIkdGFyZ2V0IiwiX3RoaXMiLCJpdGVtSWQiLCJkYXRhIiwiJGVsIiwib2xkUXR5IiwicGFyc2VJbnQiLCJ2YWwiLCJtYXhRdHkiLCJtaW5RdHkiLCJtaW5FcnJvciIsIm1heEVycm9yIiwibmV3UXR5IiwiZmlyZSIsInRleHQiLCJpY29uIiwic2hvdyIsImFwaSIsImNhcnQiLCJpdGVtVXBkYXRlIiwiZXJyIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJyZW1vdmUiLCJyZWZyZXNoQ29udGVudCIsImVycm9ycyIsImpvaW4iLCJjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSIsInByZVZhbCIsIl90aGlzMiIsIk51bWJlciIsImludmFsaWRFbnRyeSIsImNvbnRleHQiLCJpbnZhbGlkRW50cnlNZXNzYWdlIiwicmVwbGFjZSIsImNhcnRSZW1vdmVJdGVtIiwiX3RoaXMzIiwiaXRlbVJlbW92ZSIsImNhcnRFZGl0T3B0aW9ucyIsInByb2R1Y3RJZCIsIl90aGlzNCIsIk9iamVjdCIsImFzc2lnbiIsInByb2R1Y3RGb3JDaGFuZ2VJZCIsIm1vZGFsIiwib3B0aW9ucyIsInRlbXBsYXRlIiwib3BlbiIsImZpbmQiLCJwcm9kdWN0QXR0cmlidXRlcyIsImNvbmZpZ3VyZUluQ2FydCIsInVwZGF0ZUNvbnRlbnQiLCJjb250ZW50Iiwib3B0aW9uQ2hhbmdlSGFuZGxlciIsIiRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lciIsIm1vZGFsQm9keVJlc2VydmVkSGVpZ2h0Iiwib3V0ZXJIZWlnaHQiLCJsZW5ndGgiLCJjc3MiLCJoYXNDbGFzcyIsIm9uZSIsIm9wZW5lZCIsInByb2R1Y3REZXRhaWxzIiwiYmluZEdpZnRXcmFwcGluZ0Zvcm0iLCJob29rcyIsIm9uIiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiJGZvcm0iLCIkc3VibWl0IiwiJG1lc3NhZ2VCb3giLCJvcHRpb25DaGFuZ2UiLCJzZXJpYWxpemUiLCJyZXN1bHQiLCJwdXJjaGFzaW5nX21lc3NhZ2UiLCJwcm9wIiwicHVyY2hhc2FibGUiLCJpbnN0b2NrIiwiX3RoaXM1IiwiJGNhcnRJdGVtc1Jvd3MiLCIkY2FydFBhZ2VUaXRsZSIsInRvdGFscyIsInBhZ2VUaXRsZSIsInN0YXR1c01lc3NhZ2VzIiwiYWRkaXRpb25hbENoZWNrb3V0QnV0dG9ucyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZ2V0Q29udGVudCIsImh0bWwiLCJyZXBsYWNlV2l0aCIsInF1YW50aXR5IiwidHJpZ2dlciIsImZpbHRlciIsImJpbmRDYXJ0RXZlbnRzIiwiX3RoaXM2IiwiZGVib3VuY2VUaW1lb3V0IiwiX2JpbmQiLCJfZGVib3VuY2UiLCJwcmV2ZW50RGVmYXVsdCIsIm9uUXR5Rm9jdXMiLCJ2YWx1ZSIsImNoYW5nZSIsInN0cmluZyIsInNob3dDYW5jZWxCdXR0b24iLCJjYW5jZWxCdXR0b25UZXh0IiwidGhlbiIsImJpbmRQcm9tb0NvZGVFdmVudHMiLCJfdGhpczciLCIkY291cG9uQ29udGFpbmVyIiwiJGNvdXBvbkZvcm0iLCIkY29kZUlucHV0IiwiY29kZSIsImFwcGx5Q29kZSIsImJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMiLCJfdGhpczgiLCIkY2VydENvbnRhaW5lciIsIiRjZXJ0Rm9ybSIsIiRjZXJ0SW5wdXQiLCJ0b2dnbGUiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsImludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSIsImFwcGx5R2lmdENlcnRpZmljYXRlIiwicmVzcCIsImJpbmRHaWZ0V3JhcHBpbmdFdmVudHMiLCJfdGhpczkiLCJnZXRJdGVtR2lmdFdyYXBwaW5nT3B0aW9ucyIsIiRzZWxlY3QiLCJpZCIsImluZGV4IiwiYWxsb3dNZXNzYWdlIiwidG9nZ2xlVmlld3MiLCIkc2luZ2xlRm9ybSIsIiRtdWx0aUZvcm0iLCJzaGlwcGluZ0Vycm9yTWVzc2FnZXMiLCJjb3VudHJ5Iiwic2hpcHBpbmdDb3VudHJ5RXJyb3JNZXNzYWdlIiwicHJvdmluY2UiLCJzaGlwcGluZ1Byb3ZpbmNlRXJyb3JNZXNzYWdlIiwic2hpcHBpbmdFc3RpbWF0b3IiLCJkZWZhdWx0Iiwic3RhdGVDb3VudHJ5Iiwibm9kIiwiVmFsaWRhdG9ycyIsImFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCIkZWxlbWVudCIsIiRzdGF0ZSIsImlzRXN0aW1hdG9yRm9ybU9wZW5lZCIsImluaXRGb3JtVmFsaWRhdGlvbiIsImJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UiLCJiaW5kRXN0aW1hdG9yRXZlbnRzIiwic2hpcHBpbmdFc3RpbWF0b3JBbGVydCIsInNoaXBwaW5nVmFsaWRhdG9yIiwic3VibWl0IiwidGFwIiwiYXR0ciIsInJlbW92ZUF0dHIiLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJiaW5kVmFsaWRhdGlvbiIsImJpbmRTdGF0ZVZhbGlkYXRpb24iLCJiaW5kVVBTUmF0ZXMiLCJhZGQiLCJzZWxlY3RvciIsInZhbGlkYXRlIiwiY2IiLCJjb3VudHJ5SWQiLCJpc05hTiIsImVycm9yTWVzc2FnZSIsIiRlbGUiLCJlbGVWYWwiLCJVUFNSYXRlVG9nZ2xlIiwiJGVzdGltYXRvckZvcm1VcHMiLCIkZXN0aW1hdG9yRm9ybURlZmF1bHQiLCJ0b2dnbGVDbGFzcyIsIiRsYXN0IiwidXNlSWRGb3JTdGF0ZXMiLCJmaWVsZCIsIkVycm9yIiwiJGZpZWxkIiwiZ2V0U3RhdHVzIiwiaXMiLCJjbGVhblVwU3RhdGVWYWxpZGF0aW9uIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUiLCJ0b2dnbGVCdXR0b24iLCJidXR0b25TZWxlY3RvciIsIiR0b2dnbGVDb250YWluZXIiLCJjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUiLCJzZWxlY3RvclRvQWN0aXZhdGUiLCIkZXN0aW1hdG9yQ29udGFpbmVyIiwiJGVzdGltYXRvckZvcm0iLCJwYXJhbXMiLCJjb3VudHJ5X2lkIiwic3RhdGVfaWQiLCJjaXR5IiwiemlwX2NvZGUiLCJnZXRTaGlwcGluZ1F1b3RlcyIsImNsaWNrRXZlbnQiLCJxdW90ZUlkIiwic3VibWl0U2hpcHBpbmdRdW90ZSIsIlByb2R1Y3REZXRhaWxzQmFzZSIsIm9wdGlvbkNoYW5nZURlY29yYXRvciIsImlzQnJvd3NlcklFIiwiY29udmVydEludG9BcnJheSIsIl9Qcm9kdWN0RGV0YWlsc0Jhc2UiLCIkc2NvcGUiLCJwcm9kdWN0QXR0cmlidXRlc0RhdGEiLCJjYWxsIiwiJHByb2R1Y3RPcHRpb25zRWxlbWVudCIsImhhc09wdGlvbnMiLCJ0cmltIiwiaGFzRGVmYXVsdE9wdGlvbnMiLCJzZXRQcm9kdWN0VmFyaWFudCIsIm9wdGlvbkNoYW5nZUNhbGxiYWNrIiwiX2Fzc2VydFRoaXNJbml0aWFsaXplZCIsIl9pc0VtcHR5IiwidXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMiLCJ1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzIiwiZWFjaCIsIm9wdGlvbkxhYmVsIiwiY2hpbGRyZW4iLCJpbm5lclRleHQiLCJvcHRpb25UaXRsZSIsInNwbGl0IiwicmVxdWlyZWQiLCJ0b0xvd2VyQ2FzZSIsImluY2x1ZGVzIiwidHlwZSIsImdldEF0dHJpYnV0ZSIsInF1ZXJ5U2VsZWN0b3IiLCJwdXNoIiwiaXNTYXRpc2ZpZWQiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiZXZlcnkiLCJzZWxlY3QiLCJzZWxlY3RlZEluZGV4IiwiZGF0ZVN0cmluZyIsIm1hcCIsIngiLCJjaGVja2VkIiwiZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCIsInByb2R1Y3RWYXJpYW50c2xpc3QiLCJtYXRjaExhYmVsRm9yQ2hlY2tlZElucHV0IiwiaW5wdCIsImRhdGFzZXQiLCJwcm9kdWN0QXR0cmlidXRlVmFsdWUiLCJsYWJlbCIsImxhYmVscyIsInRpdGxlIiwicHJvZHVjdFZhcmlhbnQiLCJzb3J0IiwidmlldyIsInByb2R1Y3ROYW1lIiwibWF0Y2giLCJjYXJkIiwiY2VydCIsImluc2VydFN0YXRlSGlkZGVuRmllbGQiLCJzaG93QWxlcnRNb2RhbCIsIm1ha2VTdGF0ZVJlcXVpcmVkIiwic3RhdGVFbGVtZW50IiwiYXR0cnMiLCJfdHJhbnNmb3JtIiwiaXRlbSIsInJldCIsIm5hbWUiLCJyZXBsYWNlbWVudEF0dHJpYnV0ZXMiLCIkbmV3RWxlbWVudCIsIiRoaWRkZW5JbnB1dCIsInByZXYiLCJhcHBlbmQiLCJtYWtlU3RhdGVPcHRpb25hbCIsImFkZE9wdGlvbnMiLCJzdGF0ZXNBcnJheSIsIiRzZWxlY3RFbGVtZW50IiwiY29udGFpbmVyIiwicHJlZml4IiwiX2VhY2giLCJzdGF0ZXMiLCJzdGF0ZU9iaiIsImNhbGxiYWNrIiwiY291bnRyeU5hbWUiLCJnZXRCeU5hbWUiLCJzdGF0ZV9lcnJvciIsIiRjdXJyZW50SW5wdXQiLCJuZXdFbGVtZW50IiwiVFJBTlNMQVRJT05TIiwiaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSIsImRpY3Rpb25hcnkiLCJrZXlzIiwiY2hvb3NlQWN0aXZlRGljdGlvbmFyeSIsImkiLCJKU09OIiwicGFyc2UiLCJ1bmRlZmluZWQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsImtleSIsInBvcCIsInJlZHVjZSIsImFjYyJdLCJzb3VyY2VSb290IjoiIn0=
