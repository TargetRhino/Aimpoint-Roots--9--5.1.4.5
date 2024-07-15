"use strict";
(self["webpackChunkAimpoint_Roots"] = self["webpackChunkAimpoint_Roots"] || []).push([["assets_js_theme_catalog_js-assets_js_theme_common_faceted-search_js-assets_js_theme_global_co-3f5afe"],{

/***/ "./assets/js/theme/catalog.js":
/*!************************************!*\
  !*** ./assets/js/theme/catalog.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CatalogPage)
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var CatalogPage = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(CatalogPage, _PageManager);
  function CatalogPage(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    window.addEventListener('beforeunload', function () {
      if (document.activeElement.id === 'sort') {
        window.localStorage.setItem('sortByStatus', 'selected');
      }
    });
    return _this;
  }
  var _proto = CatalogPage.prototype;
  _proto.arrangeFocusOnSortBy = function arrangeFocusOnSortBy() {
    var $sortBySelector = $('[data-sort-by="product"] #sort');
    if (window.localStorage.getItem('sortByStatus')) {
      $sortBySelector.focus();
      window.localStorage.removeItem('sortByStatus');
    }
  };
  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_2__.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;
    event.preventDefault();
    window.location = url__WEBPACK_IMPORTED_MODULE_2__.format({
      pathname: url.pathname,
      search: _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].buildQueryString(url.query)
    });
  };
  return CatalogPage;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./assets/js/theme/common/faceted-search.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/faceted-search.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/includes */ "./node_modules/lodash/includes.js");
/* harmony import */ var lodash_includes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_includes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/union */ "./node_modules/lodash/union.js");
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_union__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/without */ "./node_modules/lodash/without.js");
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_without__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/extend */ "./node_modules/lodash/extend.js");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _collapsible__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./nod */ "./assets/js/theme/common/nod.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");











var defaultOptions = {
  accordionToggleSelector: '#facetedSearch .accordion-navigation, #facetedSearch .facetedSearch-toggle',
  blockerSelector: '#facetedSearch .blocker',
  clearFacetSelector: '#facetedSearch .facetedSearch-clearLink',
  componentSelector: '#facetedSearch-navList',
  facetNavListSelector: '#facetedSearch .navList',
  priceRangeErrorSelector: '#facet-range-form .form-inlineMessage',
  priceRangeFieldsetSelector: '#facet-range-form .form-fieldset',
  priceRangeFormSelector: '#facet-range-form',
  priceRangeMaxPriceSelector: '#facet-range-form [name=max_price]',
  priceRangeMinPriceSelector: '#facet-range-form [name=min_price]',
  showMoreToggleSelector: '#facetedSearch .accordion-content .toggleLink',
  facetedSearchFilterItems: '#facetedSearch-filterItems .form-input',
  modal: (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__["default"])('#modal')[0],
  modalOpen: false
};

/**
 * Faceted search view component
 */
var FacetedSearch = /*#__PURE__*/function () {
  /**
   * @param {object} requestOptions - Object with options for the ajax requests
   * @param {function} callback - Function to execute after fetching templates
   * @param {object} options - Configurable options
   * @example
   *
   * let requestOptions = {
   *      templates: {
   *          productListing: 'category/product-listing',
   *          sidebar: 'category/sidebar'
   *     }
   * };
   *
   * let templatesDidLoad = function(content) {
   *     $productListingContainer.html(content.productListing);
   *     $facetedSearchContainer.html(content.sidebar);
   * };
   *
   * let facetedSearch = new FacetedSearch(requestOptions, templatesDidLoad);
   */
  function FacetedSearch(requestOptions, callback, options) {
    var _this = this;
    // Private properties
    this.requestOptions = requestOptions;
    this.callback = callback;
    this.options = lodash_extend__WEBPACK_IMPORTED_MODULE_3___default()({}, defaultOptions, options);
    this.collapsedFacets = [];
    this.collapsedFacetItems = [];

    // Init collapsibles
    (0,_collapsible__WEBPACK_IMPORTED_MODULE_8__["default"])();

    // Init price validator
    this.initPriceValidator();

    // Show limited items by default
    $(this.options.facetNavListSelector).each(function (index, navList) {
      _this.collapseFacetItems($(navList));
    });

    // Mark initially collapsed accordions
    $(this.options.accordionToggleSelector).each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');
      if (collapsible.isCollapsed) {
        _this.collapsedFacets.push(collapsible.targetId);
      }
    });

    // Collapse all facets if initially hidden
    // NOTE: Need to execute after Collapsible gets bootstrapped
    setTimeout(function () {
      if ($(_this.options.componentSelector).is(':hidden')) {
        _this.collapseAllFacets();
      }
    });

    // Observe user events
    this.onStateChange = this.onStateChange.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    this.onAccordionToggle = this.onAccordionToggle.bind(this);
    this.onClearFacet = this.onClearFacet.bind(this);
    this.onFacetClick = this.onFacetClick.bind(this);
    this.onRangeSubmit = this.onRangeSubmit.bind(this);
    this.onSortBySubmit = this.onSortBySubmit.bind(this);
    this.filterFacetItems = this.filterFacetItems.bind(this);
    this.bindEvents();
  }

  // Public methods
  var _proto = FacetedSearch.prototype;
  _proto.refreshView = function refreshView(content) {
    if (content) {
      this.callback(content);
    }

    // Init collapsibles
    (0,_collapsible__WEBPACK_IMPORTED_MODULE_8__["default"])();

    // Init price validator
    this.initPriceValidator();

    // Restore view state
    this.restoreCollapsedFacets();
    this.restoreCollapsedFacetItems();

    // Bind events
    this.bindEvents();
  };
  _proto.updateView = function updateView() {
    var _this2 = this;
    $(this.options.blockerSelector).show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__.api.getPage(_utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].getUrl(), this.requestOptions, function (err, content) {
      $(_this2.options.blockerSelector).hide();
      if (err) {
        throw new Error(err);
      }

      // Refresh view with new content
      _this2.refreshView(content);
    });
  };
  _proto.expandFacetItems = function expandFacetItems($navList) {
    var id = $navList.attr('id');

    // Remove
    this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacetItems, id);
  };
  _proto.collapseFacetItems = function collapseFacetItems($navList) {
    var id = $navList.attr('id');
    var hasMoreResults = $navList.data('hasMoreResults');
    if (hasMoreResults) {
      this.collapsedFacetItems = lodash_union__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacetItems, [id]);
    } else {
      this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacetItems, id);
    }
  };
  _proto.toggleFacetItems = function toggleFacetItems($navList) {
    var id = $navList.attr('id');

    // Toggle depending on `collapsed` flag
    if (lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(this.collapsedFacetItems, id)) {
      this.getMoreFacetResults($navList);
      return true;
    }
    this.collapseFacetItems($navList);
    return false;
  };
  _proto.getMoreFacetResults = function getMoreFacetResults($navList) {
    var _this3 = this;
    var facet = $navList.data('facet');
    var facetUrl = _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].getUrl();
    if (this.requestOptions.showMore) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__.api.getPage(facetUrl, {
        template: this.requestOptions.showMore,
        params: {
          list_all: facet
        }
      }, function (err, response) {
        if (err) {
          throw new Error(err);
        }
        _this3.options.modal.open();
        _this3.options.modalOpen = true;
        _this3.options.modal.updateContent(response);
      });
    }
    this.collapseFacetItems($navList);
    return false;
  };
  _proto.filterFacetItems = function filterFacetItems(event) {
    var $items = $('.navList-item');
    var query = $(event.currentTarget).val().toLowerCase();
    $items.each(function (index, element) {
      var text = $(element).text().toLowerCase();
      if (text.indexOf(query) !== -1) {
        $(element).show();
      } else {
        $(element).hide();
      }
    });
  };
  _proto.expandFacet = function expandFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.open();
  };
  _proto.collapseFacet = function collapseFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.close();
  };
  _proto.collapseAllFacets = function collapseAllFacets() {
    var _this4 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      _this4.collapseFacet($accordionToggle);
    });
  };
  _proto.expandAllFacets = function expandAllFacets() {
    var _this5 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      _this5.expandFacet($accordionToggle);
    });
  }

  // Private methods
  ;
  _proto.initPriceValidator = function initPriceValidator() {
    if ($(this.options.priceRangeFormSelector).length === 0) {
      return;
    }
    var validator = (0,_nod__WEBPACK_IMPORTED_MODULE_10__["default"])();
    var selectors = {
      errorSelector: this.options.priceRangeErrorSelector,
      fieldsetSelector: this.options.priceRangeFieldsetSelector,
      formSelector: this.options.priceRangeFormSelector,
      maxPriceSelector: this.options.priceRangeMaxPriceSelector,
      minPriceSelector: this.options.priceRangeMinPriceSelector
    };
    _utils_form_utils__WEBPACK_IMPORTED_MODULE_9__.Validators.setMinMaxPriceValidation(validator, selectors, this.options.validationErrorMessages);
    this.priceRangeValidator = validator;
  };
  _proto.restoreCollapsedFacetItems = function restoreCollapsedFacetItems() {
    var _this6 = this;
    var $navLists = $(this.options.facetNavListSelector);

    // Restore collapsed state for each facet
    $navLists.each(function (index, navList) {
      var $navList = $(navList);
      var id = $navList.attr('id');
      var shouldCollapse = lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(_this6.collapsedFacetItems, id);
      if (shouldCollapse) {
        _this6.collapseFacetItems($navList);
      } else {
        _this6.expandFacetItems($navList);
      }
    });
  };
  _proto.restoreCollapsedFacets = function restoreCollapsedFacets() {
    var _this7 = this;
    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');
      var id = collapsible.targetId;
      var shouldCollapse = lodash_includes__WEBPACK_IMPORTED_MODULE_0___default()(_this7.collapsedFacets, id);
      if (shouldCollapse) {
        _this7.collapseFacet($accordionToggle);
      } else {
        _this7.expandFacet($accordionToggle);
      }
    });
  };
  _proto.bindEvents = function bindEvents() {
    // Clean-up
    this.unbindEvents();

    // DOM events
    $(window).on('statechange', this.onStateChange);
    $(window).on('popstate', this.onPopState);
    $(document).on('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).on('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).on('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).on('click', this.onClearFacet);

    // Hooks
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__.hooks.on('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__.hooks.on('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__.hooks.on('sortBy-submitted', this.onSortBySubmit);
  };
  _proto.unbindEvents = function unbindEvents() {
    // DOM events
    $(window).off('statechange', this.onStateChange);
    $(window).off('popstate', this.onPopState);
    $(document).off('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).off('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).off('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).off('click', this.onClearFacet);

    // Hooks
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__.hooks.off('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__.hooks.off('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_4__.hooks.off('sortBy-submitted', this.onSortBySubmit);
  };
  _proto.onClearFacet = function onClearFacet(event) {
    var $link = $(event.currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    event.stopPropagation();

    // Update URL
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url);
  };
  _proto.onToggleClick = function onToggleClick(event) {
    var $toggle = $(event.currentTarget);
    var $navList = $($toggle.attr('href'));

    // Prevent default
    event.preventDefault();

    // Toggle visible items
    this.toggleFacetItems($navList);
  };
  _proto.onFacetClick = function onFacetClick(event, currentTarget) {
    var $link = $(currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    $link.toggleClass('is-selected');

    // Update URL
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url);
    if (this.options.modalOpen) {
      this.options.modal.close();
    }
  };
  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_5__.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;

    // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead
    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    event.preventDefault();
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_5__.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].buildQueryString(urlQueryParams)
    }));
  };
  _proto.onRangeSubmit = function onRangeSubmit(event, currentTarget) {
    event.preventDefault();
    if (!this.priceRangeValidator.areAll(_nod__WEBPACK_IMPORTED_MODULE_10__["default"].constants.VALID)) {
      return;
    }
    var url = url__WEBPACK_IMPORTED_MODULE_5__.parse(window.location.href, true);
    var queryParams = decodeURI($(currentTarget).serialize()).split('&');
    queryParams = _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].parseQueryParams(queryParams);
    for (var key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        url.query[key] = queryParams[key];
      }
    }

    // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead
    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_5__.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_6__["default"].buildQueryString(urlQueryParams)
    }));
  };
  _proto.onStateChange = function onStateChange() {
    this.updateView();
  };
  _proto.onAccordionToggle = function onAccordionToggle(event) {
    var $accordionToggle = $(event.currentTarget);
    var collapsible = $accordionToggle.data('collapsibleInstance');
    var id = collapsible.targetId;
    if (collapsible.isCollapsed) {
      this.collapsedFacets = lodash_union__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacets, [id]);
    } else {
      this.collapsedFacets = lodash_without__WEBPACK_IMPORTED_MODULE_2___default()(this.collapsedFacets, id);
    }
  };
  _proto.onPopState = function onPopState() {
    var currentUrl = window.location.href;
    var searchParams = new URLSearchParams(currentUrl);
    // If searchParams does not contain a page value then modify url query string to have page=1
    if (!searchParams.has('page')) {
      var linkUrl = $('.pagination-link').attr('href');
      var re = /page=[0-9]+/i;
      var updatedLinkUrl = linkUrl.replace(re, 'page=1');
      window.history.replaceState({}, document.title, updatedLinkUrl);
    }
    $(window).trigger('statechange');
  };
  return FacetedSearch;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FacetedSearch);

/***/ }),

/***/ "./assets/js/theme/global/compare-products.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/global/compare-products.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");

function decrementCounter(counter, item) {
  var index = counter.indexOf(item);
  if (index > -1) {
    counter.splice(index, 1);
  }
}
function incrementCounter(counter, item) {
  counter.push(item);
}
function updateCounterNav(counter, $link, urls) {
  if (counter.length !== 0) {
    if (!$link.is('visible')) {
      $link.addClass('show');
    }
    $link.attr('href', urls.compare + "/" + counter.join('/'));
    $link.find('span.countPill').html(counter.length);
  } else {
    $link.removeClass('show');
  }
}
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_ref) {
  var noCompareMessage = _ref.noCompareMessage,
    urls = _ref.urls;
  var compareCounter = [];
  var $compareLink = $('a[data-compare-nav]');
  $('body').on('compareReset', function () {
    var $checked = $('body').find('input[name="products\[\]"]:checked');
    compareCounter = $checked.length ? $checked.map(function (index, element) {
      return element.value;
    }).get() : [];
    updateCounterNav(compareCounter, $compareLink, urls);
  });
  $('body').triggerHandler('compareReset');
  $('body').on('click', '[data-compare-id]', function (event) {
    var product = event.currentTarget.value;
    var $clickedCompareLink = $('a[data-compare-nav]');
    if (event.currentTarget.checked) {
      incrementCounter(compareCounter, product);
    } else {
      decrementCounter(compareCounter, product);
    }
    updateCounterNav(compareCounter, $clickedCompareLink, urls);
  });
  $('body').on('click', 'a[data-compare-nav]', function () {
    var $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');
    if ($clickedCheckedInput.length <= 1) {
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showAlertModal)(noCompareMessage);
      return false;
    }
  });
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXRhbG9nX2pzLWFzc2V0c19qc190aGVtZV9jb21tb25fZmFjZXRlZC1zZWFyY2hfanMtYXNzZXRzX2pzX3RoZW1lX2dsb2JhbF9jby0zZjVhZmUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUF5QztBQUNPO0FBQzFCO0FBQUEsSUFFREcsV0FBVywwQkFBQUMsWUFBQTtFQUFBQyxjQUFBLENBQUFGLFdBQUEsRUFBQUMsWUFBQTtFQUM1QixTQUFBRCxZQUFZRyxPQUFPLEVBQUU7SUFBQSxJQUFBQyxLQUFBO0lBQ2pCQSxLQUFBLEdBQUFILFlBQUEsQ0FBQUksSUFBQSxPQUFNRixPQUFPLENBQUM7SUFFZEcsTUFBTSxDQUFDQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsWUFBTTtNQUMxQyxJQUFJQyxRQUFRLENBQUNDLGFBQWEsQ0FBQ0MsRUFBRSxLQUFLLE1BQU0sRUFBRTtRQUN0Q0osTUFBTSxDQUFDSyxZQUFZLENBQUNDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDO01BQzNEO0lBQ0osQ0FBQyxDQUFDO0lBQUMsT0FBQVIsS0FBQTtFQUNQO0VBQUMsSUFBQVMsTUFBQSxHQUFBYixXQUFBLENBQUFjLFNBQUE7RUFBQUQsTUFBQSxDQUVERSxvQkFBb0IsR0FBcEIsU0FBQUEscUJBQUEsRUFBdUI7SUFDbkIsSUFBTUMsZUFBZSxHQUFHQyxDQUFDLENBQUMsZ0NBQWdDLENBQUM7SUFFM0QsSUFBSVgsTUFBTSxDQUFDSyxZQUFZLENBQUNPLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRTtNQUM3Q0YsZUFBZSxDQUFDRyxLQUFLLENBQUMsQ0FBQztNQUN2QmIsTUFBTSxDQUFDSyxZQUFZLENBQUNTLFVBQVUsQ0FBQyxjQUFjLENBQUM7SUFDbEQ7RUFDSixDQUFDO0VBQUFQLE1BQUEsQ0FFRFEsY0FBYyxHQUFkLFNBQUFBLGVBQWVDLEtBQUssRUFBRUMsYUFBYSxFQUFFO0lBQ2pD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QUFHNUwsQ0FBQyxDQUFDLHFCQUFxQixDQUFDO0lBRXBELElBQUlLLEtBQUssQ0FBQ0MsYUFBYSxDQUFDdUwsT0FBTyxFQUFFO01BQzdCcEIsZ0JBQWdCLENBQUNXLGNBQWMsRUFBRU8sT0FBTyxDQUFDO0lBQzdDLENBQUMsTUFBTTtNQUNIdEIsZ0JBQWdCLENBQUNlLGNBQWMsRUFBRU8sT0FBTyxDQUFDO0lBQzdDO0lBRUFqQixnQkFBZ0IsQ0FBQ1UsY0FBYyxFQUFFUSxtQkFBbUIsRUFBRWpCLElBQUksQ0FBQztFQUMvRCxDQUFDLENBQUM7RUFFRjNLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQ3NJLEVBQUUsQ0FBQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsWUFBTTtJQUMvQyxJQUFNd0Qsb0JBQW9CLEdBQUc5TCxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMrSyxJQUFJLENBQUMsb0NBQW9DLENBQUM7SUFFakYsSUFBSWUsb0JBQW9CLENBQUN4RSxNQUFNLElBQUksQ0FBQyxFQUFFO01BQ2xDOEMsc0RBQWMsQ0FBQ2UsZ0JBQWdCLENBQUM7TUFDaEMsT0FBTyxLQUFLO0lBQ2hCO0VBQ0osQ0FBQyxDQUFDO0FBQ04iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9BaW1wb2ludCBSb290cy8uL2Fzc2V0cy9qcy90aGVtZS9jYXRhbG9nLmpzIiwid2VicGFjazovL0FpbXBvaW50IFJvb3RzLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9mYWNldGVkLXNlYXJjaC5qcyIsIndlYnBhY2s6Ly9BaW1wb2ludCBSb290cy8uL2Fzc2V0cy9qcy90aGVtZS9nbG9iYWwvY29tcGFyZS1wcm9kdWN0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xyXG5pbXBvcnQgdXJsVXRpbHMgZnJvbSAnLi9jb21tb24vdXRpbHMvdXJsLXV0aWxzJztcclxuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2F0YWxvZ1BhZ2UgZXh0ZW5kcyBQYWdlTWFuYWdlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XHJcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50LmlkID09PSAnc29ydCcpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc29ydEJ5U3RhdHVzJywgJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBhcnJhbmdlRm9jdXNPblNvcnRCeSgpIHtcclxuICAgICAgICBjb25zdCAkc29ydEJ5U2VsZWN0b3IgPSAkKCdbZGF0YS1zb3J0LWJ5PVwicHJvZHVjdFwiXSAjc29ydCcpO1xyXG5cclxuICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb3J0QnlTdGF0dXMnKSkge1xyXG4gICAgICAgICAgICAkc29ydEJ5U2VsZWN0b3IuZm9jdXMoKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzb3J0QnlTdGF0dXMnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Tb3J0QnlTdWJtaXQoZXZlbnQsIGN1cnJlbnRUYXJnZXQpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKS5zcGxpdCgnPScpO1xyXG5cclxuICAgICAgICB1cmwucXVlcnlbcXVlcnlQYXJhbXNbMF1dID0gcXVlcnlQYXJhbXNbMV07XHJcbiAgICAgICAgZGVsZXRlIHVybC5xdWVyeS5wYWdlO1xyXG5cclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IFVybC5mb3JtYXQoeyBwYXRobmFtZTogdXJsLnBhdGhuYW1lLCBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsLnF1ZXJ5KSB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBob29rcywgYXBpIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xyXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgVXJsIGZyb20gJ3VybCc7XHJcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL3V0aWxzL3VybC11dGlscyc7XHJcbmltcG9ydCBtb2RhbEZhY3RvcnkgZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcclxuaW1wb3J0IGNvbGxhcHNpYmxlRmFjdG9yeSBmcm9tICcuL2NvbGxhcHNpYmxlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9ycyB9IGZyb20gJy4vdXRpbHMvZm9ybS11dGlscyc7XHJcbmltcG9ydCBub2QgZnJvbSAnLi9ub2QnO1xyXG5cclxuXHJcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xyXG4gICAgYWNjb3JkaW9uVG9nZ2xlU2VsZWN0b3I6ICcjZmFjZXRlZFNlYXJjaCAuYWNjb3JkaW9uLW5hdmlnYXRpb24sICNmYWNldGVkU2VhcmNoIC5mYWNldGVkU2VhcmNoLXRvZ2dsZScsXHJcbiAgICBibG9ja2VyU2VsZWN0b3I6ICcjZmFjZXRlZFNlYXJjaCAuYmxvY2tlcicsXHJcbiAgICBjbGVhckZhY2V0U2VsZWN0b3I6ICcjZmFjZXRlZFNlYXJjaCAuZmFjZXRlZFNlYXJjaC1jbGVhckxpbmsnLFxyXG4gICAgY29tcG9uZW50U2VsZWN0b3I6ICcjZmFjZXRlZFNlYXJjaC1uYXZMaXN0JyxcclxuICAgIGZhY2V0TmF2TGlzdFNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLm5hdkxpc3QnLFxyXG4gICAgcHJpY2VSYW5nZUVycm9yU2VsZWN0b3I6ICcjZmFjZXQtcmFuZ2UtZm9ybSAuZm9ybS1pbmxpbmVNZXNzYWdlJyxcclxuICAgIHByaWNlUmFuZ2VGaWVsZHNldFNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0gLmZvcm0tZmllbGRzZXQnLFxyXG4gICAgcHJpY2VSYW5nZUZvcm1TZWxlY3RvcjogJyNmYWNldC1yYW5nZS1mb3JtJyxcclxuICAgIHByaWNlUmFuZ2VNYXhQcmljZVNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0gW25hbWU9bWF4X3ByaWNlXScsXHJcbiAgICBwcmljZVJhbmdlTWluUHJpY2VTZWxlY3RvcjogJyNmYWNldC1yYW5nZS1mb3JtIFtuYW1lPW1pbl9wcmljZV0nLFxyXG4gICAgc2hvd01vcmVUb2dnbGVTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5hY2NvcmRpb24tY29udGVudCAudG9nZ2xlTGluaycsXHJcbiAgICBmYWNldGVkU2VhcmNoRmlsdGVySXRlbXM6ICcjZmFjZXRlZFNlYXJjaC1maWx0ZXJJdGVtcyAuZm9ybS1pbnB1dCcsXHJcbiAgICBtb2RhbDogbW9kYWxGYWN0b3J5KCcjbW9kYWwnKVswXSxcclxuICAgIG1vZGFsT3BlbjogZmFsc2UsXHJcbn07XHJcblxyXG4vKipcclxuICogRmFjZXRlZCBzZWFyY2ggdmlldyBjb21wb25lbnRcclxuICovXHJcbmNsYXNzIEZhY2V0ZWRTZWFyY2gge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcmVxdWVzdE9wdGlvbnMgLSBPYmplY3Qgd2l0aCBvcHRpb25zIGZvciB0aGUgYWpheCByZXF1ZXN0c1xyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBleGVjdXRlIGFmdGVyIGZldGNoaW5nIHRlbXBsYXRlc1xyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBDb25maWd1cmFibGUgb3B0aW9uc1xyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqXHJcbiAgICAgKiBsZXQgcmVxdWVzdE9wdGlvbnMgPSB7XHJcbiAgICAgKiAgICAgIHRlbXBsYXRlczoge1xyXG4gICAgICogICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxyXG4gICAgICogICAgICAgICAgc2lkZWJhcjogJ2NhdGVnb3J5L3NpZGViYXInXHJcbiAgICAgKiAgICAgfVxyXG4gICAgICogfTtcclxuICAgICAqXHJcbiAgICAgKiBsZXQgdGVtcGxhdGVzRGlkTG9hZCA9IGZ1bmN0aW9uKGNvbnRlbnQpIHtcclxuICAgICAqICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcclxuICAgICAqICAgICAkZmFjZXRlZFNlYXJjaENvbnRhaW5lci5odG1sKGNvbnRlbnQuc2lkZWJhcik7XHJcbiAgICAgKiB9O1xyXG4gICAgICpcclxuICAgICAqIGxldCBmYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIHRlbXBsYXRlc0RpZExvYWQpO1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0T3B0aW9ucywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcclxuICAgICAgICAvLyBQcml2YXRlIHByb3BlcnRpZXNcclxuICAgICAgICB0aGlzLnJlcXVlc3RPcHRpb25zID0gcmVxdWVzdE9wdGlvbnM7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IF8uZXh0ZW5kKHt9LCBkZWZhdWx0T3B0aW9ucywgb3B0aW9ucyk7XHJcbiAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldHMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gSW5pdCBjb2xsYXBzaWJsZXNcclxuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcclxuXHJcbiAgICAgICAgLy8gSW5pdCBwcmljZSB2YWxpZGF0b3JcclxuICAgICAgICB0aGlzLmluaXRQcmljZVZhbGlkYXRvcigpO1xyXG5cclxuICAgICAgICAvLyBTaG93IGxpbWl0ZWQgaXRlbXMgYnkgZGVmYXVsdFxyXG4gICAgICAgICQodGhpcy5vcHRpb25zLmZhY2V0TmF2TGlzdFNlbGVjdG9yKS5lYWNoKChpbmRleCwgbmF2TGlzdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXRJdGVtcygkKG5hdkxpc3QpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gTWFyayBpbml0aWFsbHkgY29sbGFwc2VkIGFjY29yZGlvbnNcclxuICAgICAgICAkKHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3RvcikuZWFjaCgoaW5kZXgsIGFjY29yZGlvblRvZ2dsZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xyXG4gICAgICAgICAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YSgnY29sbGFwc2libGVJbnN0YW5jZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbGxhcHNpYmxlLmlzQ29sbGFwc2VkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cy5wdXNoKGNvbGxhcHNpYmxlLnRhcmdldElkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBDb2xsYXBzZSBhbGwgZmFjZXRzIGlmIGluaXRpYWxseSBoaWRkZW5cclxuICAgICAgICAvLyBOT1RFOiBOZWVkIHRvIGV4ZWN1dGUgYWZ0ZXIgQ29sbGFwc2libGUgZ2V0cyBib290c3RyYXBwZWRcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbXBvbmVudFNlbGVjdG9yKS5pcygnOmhpZGRlbicpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlQWxsRmFjZXRzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gT2JzZXJ2ZSB1c2VyIGV2ZW50c1xyXG4gICAgICAgIHRoaXMub25TdGF0ZUNoYW5nZSA9IHRoaXMub25TdGF0ZUNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25Ub2dnbGVDbGljayA9IHRoaXMub25Ub2dnbGVDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25BY2NvcmRpb25Ub2dnbGUgPSB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5vbkNsZWFyRmFjZXQgPSB0aGlzLm9uQ2xlYXJGYWNldC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25GYWNldENsaWNrID0gdGhpcy5vbkZhY2V0Q2xpY2suYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uUmFuZ2VTdWJtaXQgPSB0aGlzLm9uUmFuZ2VTdWJtaXQuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuZmlsdGVyRmFjZXRJdGVtcyA9IHRoaXMuZmlsdGVyRmFjZXRJdGVtcy5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQdWJsaWMgbWV0aG9kc1xyXG4gICAgcmVmcmVzaFZpZXcoY29udGVudCkge1xyXG4gICAgICAgIGlmIChjb250ZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soY29udGVudCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlc1xyXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xyXG5cclxuICAgICAgICAvLyBJbml0IHByaWNlIHZhbGlkYXRvclxyXG4gICAgICAgIHRoaXMuaW5pdFByaWNlVmFsaWRhdG9yKCk7XHJcblxyXG4gICAgICAgIC8vIFJlc3RvcmUgdmlldyBzdGF0ZVxyXG4gICAgICAgIHRoaXMucmVzdG9yZUNvbGxhcHNlZEZhY2V0cygpO1xyXG4gICAgICAgIHRoaXMucmVzdG9yZUNvbGxhcHNlZEZhY2V0SXRlbXMoKTtcclxuXHJcbiAgICAgICAgLy8gQmluZCBldmVudHNcclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVWaWV3KCkge1xyXG4gICAgICAgICQodGhpcy5vcHRpb25zLmJsb2NrZXJTZWxlY3Rvcikuc2hvdygpO1xyXG5cclxuICAgICAgICBhcGkuZ2V0UGFnZSh1cmxVdGlscy5nZXRVcmwoKSwgdGhpcy5yZXF1ZXN0T3B0aW9ucywgKGVyciwgY29udGVudCkgPT4ge1xyXG4gICAgICAgICAgICAkKHRoaXMub3B0aW9ucy5ibG9ja2VyU2VsZWN0b3IpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBSZWZyZXNoIHZpZXcgd2l0aCBuZXcgY29udGVudFxyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hWaWV3KGNvbnRlbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cGFuZEZhY2V0SXRlbXMoJG5hdkxpc3QpIHtcclxuICAgICAgICBjb25zdCBpZCA9ICRuYXZMaXN0LmF0dHIoJ2lkJyk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZVxyXG4gICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IF8ud2l0aG91dCh0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMsIGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBjb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpIHtcclxuICAgICAgICBjb25zdCBpZCA9ICRuYXZMaXN0LmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgY29uc3QgaGFzTW9yZVJlc3VsdHMgPSAkbmF2TGlzdC5kYXRhKCdoYXNNb3JlUmVzdWx0cycpO1xyXG5cclxuICAgICAgICBpZiAoaGFzTW9yZVJlc3VsdHMpIHtcclxuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zID0gXy51bmlvbih0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMsIFtpZF0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IF8ud2l0aG91dCh0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMsIGlkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlRmFjZXRJdGVtcygkbmF2TGlzdCkge1xyXG4gICAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cignaWQnKTtcclxuXHJcbiAgICAgICAgLy8gVG9nZ2xlIGRlcGVuZGluZyBvbiBgY29sbGFwc2VkYCBmbGFnXHJcbiAgICAgICAgaWYgKF8uaW5jbHVkZXModGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBpZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRNb3JlRmFjZXRSZXN1bHRzKCRuYXZMaXN0KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TW9yZUZhY2V0UmVzdWx0cygkbmF2TGlzdCkge1xyXG4gICAgICAgIGNvbnN0IGZhY2V0ID0gJG5hdkxpc3QuZGF0YSgnZmFjZXQnKTtcclxuICAgICAgICBjb25zdCBmYWNldFVybCA9IHVybFV0aWxzLmdldFVybCgpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0T3B0aW9ucy5zaG93TW9yZSkge1xyXG4gICAgICAgICAgICBhcGkuZ2V0UGFnZShmYWNldFVybCwge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IHRoaXMucmVxdWVzdE9wdGlvbnMuc2hvd01vcmUsXHJcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0X2FsbDogZmFjZXQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LCAoZXJyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbC5vcGVuKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubW9kYWxPcGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmaWx0ZXJGYWNldEl0ZW1zKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgJGl0ZW1zID0gJCgnLm5hdkxpc3QtaXRlbScpO1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgICAkaXRlbXMuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGV4dCA9ICQoZWxlbWVudCkudGV4dCgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmICh0ZXh0LmluZGV4T2YocXVlcnkpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgJChlbGVtZW50KS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cGFuZEZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpIHtcclxuICAgICAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YSgnY29sbGFwc2libGVJbnN0YW5jZScpO1xyXG5cclxuICAgICAgICBjb2xsYXBzaWJsZS5vcGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29sbGFwc2VGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKSB7XHJcbiAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcclxuXHJcbiAgICAgICAgY29sbGFwc2libGUuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb2xsYXBzZUFsbEZhY2V0cygpIHtcclxuICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlcyA9ICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgJGFjY29yZGlvblRvZ2dsZXMuZWFjaCgoaW5kZXgsIGFjY29yZGlvblRvZ2dsZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cGFuZEFsbEZhY2V0cygpIHtcclxuICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlcyA9ICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgJGFjY29yZGlvblRvZ2dsZXMuZWFjaCgoaW5kZXgsIGFjY29yZGlvblRvZ2dsZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5leHBhbmRGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQcml2YXRlIG1ldGhvZHNcclxuICAgIGluaXRQcmljZVZhbGlkYXRvcigpIHtcclxuICAgICAgICBpZiAoJCh0aGlzLm9wdGlvbnMucHJpY2VSYW5nZUZvcm1TZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHZhbGlkYXRvciA9IG5vZCgpO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IHtcclxuICAgICAgICAgICAgZXJyb3JTZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VFcnJvclNlbGVjdG9yLFxyXG4gICAgICAgICAgICBmaWVsZHNldFNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZUZpZWxkc2V0U2VsZWN0b3IsXHJcbiAgICAgICAgICAgIGZvcm1TZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VGb3JtU2VsZWN0b3IsXHJcbiAgICAgICAgICAgIG1heFByaWNlU2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlTWF4UHJpY2VTZWxlY3RvcixcclxuICAgICAgICAgICAgbWluUHJpY2VTZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VNaW5QcmljZVNlbGVjdG9yLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIFZhbGlkYXRvcnMuc2V0TWluTWF4UHJpY2VWYWxpZGF0aW9uKHZhbGlkYXRvciwgc2VsZWN0b3JzLCB0aGlzLm9wdGlvbnMudmFsaWRhdGlvbkVycm9yTWVzc2FnZXMpO1xyXG5cclxuICAgICAgICB0aGlzLnByaWNlUmFuZ2VWYWxpZGF0b3IgPSB2YWxpZGF0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdG9yZUNvbGxhcHNlZEZhY2V0SXRlbXMoKSB7XHJcbiAgICAgICAgY29uc3QgJG5hdkxpc3RzID0gJCh0aGlzLm9wdGlvbnMuZmFjZXROYXZMaXN0U2VsZWN0b3IpO1xyXG5cclxuICAgICAgICAvLyBSZXN0b3JlIGNvbGxhcHNlZCBzdGF0ZSBmb3IgZWFjaCBmYWNldFxyXG4gICAgICAgICRuYXZMaXN0cy5lYWNoKChpbmRleCwgbmF2TGlzdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkbmF2TGlzdCA9ICQobmF2TGlzdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgY29uc3Qgc2hvdWxkQ29sbGFwc2UgPSBfLmluY2x1ZGVzKHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgaWQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNob3VsZENvbGxhcHNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZEZhY2V0SXRlbXMoJG5hdkxpc3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdG9yZUNvbGxhcHNlZEZhY2V0cygpIHtcclxuICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlcyA9ICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgJGFjY29yZGlvblRvZ2dsZXMuZWFjaCgoaW5kZXgsIGFjY29yZGlvblRvZ2dsZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xyXG4gICAgICAgICAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YSgnY29sbGFwc2libGVJbnN0YW5jZScpO1xyXG4gICAgICAgICAgICBjb25zdCBpZCA9IGNvbGxhcHNpYmxlLnRhcmdldElkO1xyXG4gICAgICAgICAgICBjb25zdCBzaG91bGRDb2xsYXBzZSA9IF8uaW5jbHVkZXModGhpcy5jb2xsYXBzZWRGYWNldHMsIGlkKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzaG91bGRDb2xsYXBzZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgLy8gQ2xlYW4tdXBcclxuICAgICAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xyXG5cclxuICAgICAgICAvLyBET00gZXZlbnRzXHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdzdGF0ZWNoYW5nZScsIHRoaXMub25TdGF0ZUNoYW5nZSk7XHJcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIHRoaXMub25Qb3BTdGF0ZSk7XHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgdGhpcy5vcHRpb25zLnNob3dNb3JlVG9nZ2xlU2VsZWN0b3IsIHRoaXMub25Ub2dnbGVDbGljayk7XHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ3RvZ2dsZS5jb2xsYXBzaWJsZScsIHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3RvciwgdGhpcy5vbkFjY29yZGlvblRvZ2dsZSk7XHJcbiAgICAgICAgJChkb2N1bWVudCkub24oJ2tleXVwJywgdGhpcy5vcHRpb25zLmZhY2V0ZWRTZWFyY2hGaWx0ZXJJdGVtcywgdGhpcy5maWx0ZXJGYWNldEl0ZW1zKTtcclxuICAgICAgICAkKHRoaXMub3B0aW9ucy5jbGVhckZhY2V0U2VsZWN0b3IpLm9uKCdjbGljaycsIHRoaXMub25DbGVhckZhY2V0KTtcclxuXHJcbiAgICAgICAgLy8gSG9va3NcclxuICAgICAgICBob29rcy5vbignZmFjZXRlZFNlYXJjaC1mYWNldC1jbGlja2VkJywgdGhpcy5vbkZhY2V0Q2xpY2spO1xyXG4gICAgICAgIGhvb2tzLm9uKCdmYWNldGVkU2VhcmNoLXJhbmdlLXN1Ym1pdHRlZCcsIHRoaXMub25SYW5nZVN1Ym1pdCk7XHJcbiAgICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgLy8gRE9NIGV2ZW50c1xyXG4gICAgICAgICQod2luZG93KS5vZmYoJ3N0YXRlY2hhbmdlJywgdGhpcy5vblN0YXRlQ2hhbmdlKTtcclxuICAgICAgICAkKHdpbmRvdykub2ZmKCdwb3BzdGF0ZScsIHRoaXMub25Qb3BTdGF0ZSk7XHJcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdjbGljaycsIHRoaXMub3B0aW9ucy5zaG93TW9yZVRvZ2dsZVNlbGVjdG9yLCB0aGlzLm9uVG9nZ2xlQ2xpY2spO1xyXG4gICAgICAgICQoZG9jdW1lbnQpLm9mZigndG9nZ2xlLmNvbGxhcHNpYmxlJywgdGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yLCB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlKTtcclxuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2tleXVwJywgdGhpcy5vcHRpb25zLmZhY2V0ZWRTZWFyY2hGaWx0ZXJJdGVtcywgdGhpcy5maWx0ZXJGYWNldEl0ZW1zKTtcclxuICAgICAgICAkKHRoaXMub3B0aW9ucy5jbGVhckZhY2V0U2VsZWN0b3IpLm9mZignY2xpY2snLCB0aGlzLm9uQ2xlYXJGYWNldCk7XHJcblxyXG4gICAgICAgIC8vIEhvb2tzXHJcbiAgICAgICAgaG9va3Mub2ZmKCdmYWNldGVkU2VhcmNoLWZhY2V0LWNsaWNrZWQnLCB0aGlzLm9uRmFjZXRDbGljayk7XHJcbiAgICAgICAgaG9va3Mub2ZmKCdmYWNldGVkU2VhcmNoLXJhbmdlLXN1Ym1pdHRlZCcsIHRoaXMub25SYW5nZVN1Ym1pdCk7XHJcbiAgICAgICAgaG9va3Mub2ZmKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGVhckZhY2V0KGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgJGxpbmsgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xyXG4gICAgICAgIGNvbnN0IHVybCA9ICRsaW5rLmF0dHIoJ2hyZWYnKTtcclxuXHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIFVSTFxyXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBvblRvZ2dsZUNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgJHRvZ2dsZSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XHJcbiAgICAgICAgY29uc3QgJG5hdkxpc3QgPSAkKCR0b2dnbGUuYXR0cignaHJlZicpKTtcclxuXHJcbiAgICAgICAgLy8gUHJldmVudCBkZWZhdWx0XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgLy8gVG9nZ2xlIHZpc2libGUgaXRlbXNcclxuICAgICAgICB0aGlzLnRvZ2dsZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRmFjZXRDbGljayhldmVudCwgY3VycmVudFRhcmdldCkge1xyXG4gICAgICAgIGNvbnN0ICRsaW5rID0gJChjdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBjb25zdCB1cmwgPSAkbGluay5hdHRyKCdocmVmJyk7XHJcblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICRsaW5rLnRvZ2dsZUNsYXNzKCdpcy1zZWxlY3RlZCcpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgVVJMXHJcbiAgICAgICAgdXJsVXRpbHMuZ29Ub1VybCh1cmwpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLm1vZGFsT3Blbikge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMubW9kYWwuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Tb3J0QnlTdWJtaXQoZXZlbnQsIGN1cnJlbnRUYXJnZXQpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKS5zcGxpdCgnPScpO1xyXG5cclxuICAgICAgICB1cmwucXVlcnlbcXVlcnlQYXJhbXNbMF1dID0gcXVlcnlQYXJhbXNbMV07XHJcbiAgICAgICAgZGVsZXRlIHVybC5xdWVyeS5wYWdlO1xyXG5cclxuICAgICAgICAvLyBVcmwgb2JqZWN0IGBxdWVyeWAgaXMgbm90IGEgdHJhZGl0aW9uYWwgSmF2YVNjcmlwdCBPYmplY3Qgb24gYWxsIHN5c3RlbXMsIGNsb25lIGl0IGluc3RlYWRcclxuICAgICAgICBjb25zdCB1cmxRdWVyeVBhcmFtcyA9IHt9O1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odXJsUXVlcnlQYXJhbXMsIHVybC5xdWVyeSk7XHJcblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwoVXJsLmZvcm1hdCh7IHBhdGhuYW1lOiB1cmwucGF0aG5hbWUsIHNlYXJjaDogdXJsVXRpbHMuYnVpbGRRdWVyeVN0cmluZyh1cmxRdWVyeVBhcmFtcykgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uUmFuZ2VTdWJtaXQoZXZlbnQsIGN1cnJlbnRUYXJnZXQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMucHJpY2VSYW5nZVZhbGlkYXRvci5hcmVBbGwobm9kLmNvbnN0YW50cy5WQUxJRCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcclxuICAgICAgICBsZXQgcXVlcnlQYXJhbXMgPSBkZWNvZGVVUkkoJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKSkuc3BsaXQoJyYnKTtcclxuICAgICAgICBxdWVyeVBhcmFtcyA9IHVybFV0aWxzLnBhcnNlUXVlcnlQYXJhbXMocXVlcnlQYXJhbXMpO1xyXG5cclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBxdWVyeVBhcmFtcykge1xyXG4gICAgICAgICAgICBpZiAocXVlcnlQYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgdXJsLnF1ZXJ5W2tleV0gPSBxdWVyeVBhcmFtc1trZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcmwgb2JqZWN0IGBxdWVyeWAgaXMgbm90IGEgdHJhZGl0aW9uYWwgSmF2YVNjcmlwdCBPYmplY3Qgb24gYWxsIHN5c3RlbXMsIGNsb25lIGl0IGluc3RlYWRcclxuICAgICAgICBjb25zdCB1cmxRdWVyeVBhcmFtcyA9IHt9O1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24odXJsUXVlcnlQYXJhbXMsIHVybC5xdWVyeSk7XHJcblxyXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwoVXJsLmZvcm1hdCh7IHBhdGhuYW1lOiB1cmwucGF0aG5hbWUsIHNlYXJjaDogdXJsVXRpbHMuYnVpbGRRdWVyeVN0cmluZyh1cmxRdWVyeVBhcmFtcykgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU3RhdGVDaGFuZ2UoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25BY2NvcmRpb25Ub2dnbGUoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcclxuICAgICAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YSgnY29sbGFwc2libGVJbnN0YW5jZScpO1xyXG4gICAgICAgIGNvbnN0IGlkID0gY29sbGFwc2libGUudGFyZ2V0SWQ7XHJcblxyXG4gICAgICAgIGlmIChjb2xsYXBzaWJsZS5pc0NvbGxhcHNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cyA9IF8udW5pb24odGhpcy5jb2xsYXBzZWRGYWNldHMsIFtpZF0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRzID0gXy53aXRob3V0KHRoaXMuY29sbGFwc2VkRmFjZXRzLCBpZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uUG9wU3RhdGUoKSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xyXG4gICAgICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoY3VycmVudFVybCk7XHJcbiAgICAgICAgLy8gSWYgc2VhcmNoUGFyYW1zIGRvZXMgbm90IGNvbnRhaW4gYSBwYWdlIHZhbHVlIHRoZW4gbW9kaWZ5IHVybCBxdWVyeSBzdHJpbmcgdG8gaGF2ZSBwYWdlPTFcclxuICAgICAgICBpZiAoIXNlYXJjaFBhcmFtcy5oYXMoJ3BhZ2UnKSkge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rVXJsID0gJCgnLnBhZ2luYXRpb24tbGluaycpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICAgICAgY29uc3QgcmUgPSAvcGFnZT1bMC05XSsvaTtcclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlZExpbmtVcmwgPSBsaW5rVXJsLnJlcGxhY2UocmUsICdwYWdlPTEnKTtcclxuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgdXBkYXRlZExpbmtVcmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKHdpbmRvdykudHJpZ2dlcignc3RhdGVjaGFuZ2UnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmFjZXRlZFNlYXJjaDtcclxuIiwiaW1wb3J0IHsgc2hvd0FsZXJ0TW9kYWwgfSBmcm9tICcuL21vZGFsJztcclxuXHJcbmZ1bmN0aW9uIGRlY3JlbWVudENvdW50ZXIoY291bnRlciwgaXRlbSkge1xyXG4gICAgY29uc3QgaW5kZXggPSBjb3VudGVyLmluZGV4T2YoaXRlbSk7XHJcblxyXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICBjb3VudGVyLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluY3JlbWVudENvdW50ZXIoY291bnRlciwgaXRlbSkge1xyXG4gICAgY291bnRlci5wdXNoKGl0ZW0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVDb3VudGVyTmF2KGNvdW50ZXIsICRsaW5rLCB1cmxzKSB7XHJcbiAgICBpZiAoY291bnRlci5sZW5ndGggIT09IDApIHtcclxuICAgICAgICBpZiAoISRsaW5rLmlzKCd2aXNpYmxlJykpIHtcclxuICAgICAgICAgICAgJGxpbmsuYWRkQ2xhc3MoJ3Nob3cnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJGxpbmsuYXR0cignaHJlZicsIGAke3VybHMuY29tcGFyZX0vJHtjb3VudGVyLmpvaW4oJy8nKX1gKTtcclxuICAgICAgICAkbGluay5maW5kKCdzcGFuLmNvdW50UGlsbCcpLmh0bWwoY291bnRlci5sZW5ndGgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkbGluay5yZW1vdmVDbGFzcygnc2hvdycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoeyBub0NvbXBhcmVNZXNzYWdlLCB1cmxzIH0pIHtcclxuICAgIGxldCBjb21wYXJlQ291bnRlciA9IFtdO1xyXG5cclxuICAgIGNvbnN0ICRjb21wYXJlTGluayA9ICQoJ2FbZGF0YS1jb21wYXJlLW5hdl0nKTtcclxuXHJcbiAgICAkKCdib2R5Jykub24oJ2NvbXBhcmVSZXNldCcsICgpID0+IHtcclxuICAgICAgICBjb25zdCAkY2hlY2tlZCA9ICQoJ2JvZHknKS5maW5kKCdpbnB1dFtuYW1lPVwicHJvZHVjdHNcXFtcXF1cIl06Y2hlY2tlZCcpO1xyXG5cclxuICAgICAgICBjb21wYXJlQ291bnRlciA9ICRjaGVja2VkLmxlbmd0aCA/ICRjaGVja2VkLm1hcCgoaW5kZXgsIGVsZW1lbnQpID0+IGVsZW1lbnQudmFsdWUpLmdldCgpIDogW107XHJcbiAgICAgICAgdXBkYXRlQ291bnRlck5hdihjb21wYXJlQ291bnRlciwgJGNvbXBhcmVMaW5rLCB1cmxzKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoJ2JvZHknKS50cmlnZ2VySGFuZGxlcignY29tcGFyZVJlc2V0Jyk7XHJcblxyXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1jb21wYXJlLWlkXScsIGV2ZW50ID0+IHtcclxuICAgICAgICBjb25zdCBwcm9kdWN0ID0gZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZTtcclxuICAgICAgICBjb25zdCAkY2xpY2tlZENvbXBhcmVMaW5rID0gJCgnYVtkYXRhLWNvbXBhcmUtbmF2XScpO1xyXG5cclxuICAgICAgICBpZiAoZXZlbnQuY3VycmVudFRhcmdldC5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgIGluY3JlbWVudENvdW50ZXIoY29tcGFyZUNvdW50ZXIsIHByb2R1Y3QpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRlY3JlbWVudENvdW50ZXIoY29tcGFyZUNvdW50ZXIsIHByb2R1Y3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlQ291bnRlck5hdihjb21wYXJlQ291bnRlciwgJGNsaWNrZWRDb21wYXJlTGluaywgdXJscyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCdib2R5Jykub24oJ2NsaWNrJywgJ2FbZGF0YS1jb21wYXJlLW5hdl0nLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgJGNsaWNrZWRDaGVja2VkSW5wdXQgPSAkKCdib2R5JykuZmluZCgnaW5wdXRbbmFtZT1cInByb2R1Y3RzXFxbXFxdXCJdOmNoZWNrZWQnKTtcclxuXHJcbiAgICAgICAgaWYgKCRjbGlja2VkQ2hlY2tlZElucHV0Lmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKG5vQ29tcGFyZU1lc3NhZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuIl0sIm5hbWVzIjpbIlBhZ2VNYW5hZ2VyIiwidXJsVXRpbHMiLCJVcmwiLCJDYXRhbG9nUGFnZSIsIl9QYWdlTWFuYWdlciIsIl9pbmhlcml0c0xvb3NlIiwiY29udGV4dCIsIl90aGlzIiwiY2FsbCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJpZCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJfcHJvdG8iLCJwcm90b3R5cGUiLCJhcnJhbmdlRm9jdXNPblNvcnRCeSIsIiRzb3J0QnlTZWxlY3RvciIsIiQiLCJnZXRJdGVtIiwiZm9jdXMiLCJyZW1vdmVJdGVtIiwib25Tb3J0QnlTdWJtaXQiLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCJ1cmwiLCJwYXJzZSIsImxvY2F0aW9uIiwiaHJlZiIsInF1ZXJ5UGFyYW1zIiwic2VyaWFsaXplIiwic3BsaXQiLCJxdWVyeSIsInBhZ2UiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1hdCIsInBhdGhuYW1lIiwic2VhcmNoIiwiYnVpbGRRdWVyeVN0cmluZyIsImRlZmF1bHQiLCJob29rcyIsImFwaSIsIm1vZGFsRmFjdG9yeSIsImNvbGxhcHNpYmxlRmFjdG9yeSIsIlZhbGlkYXRvcnMiLCJub2QiLCJkZWZhdWx0T3B0aW9ucyIsImFjY29yZGlvblRvZ2dsZVNlbGVjdG9yIiwiYmxvY2tlclNlbGVjdG9yIiwiY2xlYXJGYWNldFNlbGVjdG9yIiwiY29tcG9uZW50U2VsZWN0b3IiLCJmYWNldE5hdkxpc3RTZWxlY3RvciIsInByaWNlUmFuZ2VFcnJvclNlbGVjdG9yIiwicHJpY2VSYW5nZUZpZWxkc2V0U2VsZWN0b3IiLCJwcmljZVJhbmdlRm9ybVNlbGVjdG9yIiwicHJpY2VSYW5nZU1heFByaWNlU2VsZWN0b3IiLCJwcmljZVJhbmdlTWluUHJpY2VTZWxlY3RvciIsInNob3dNb3JlVG9nZ2xlU2VsZWN0b3IiLCJmYWNldGVkU2VhcmNoRmlsdGVySXRlbXMiLCJtb2RhbCIsIm1vZGFsT3BlbiIsIkZhY2V0ZWRTZWFyY2giLCJyZXF1ZXN0T3B0aW9ucyIsImNhbGxiYWNrIiwib3B0aW9ucyIsIl9leHRlbmQiLCJjb2xsYXBzZWRGYWNldHMiLCJjb2xsYXBzZWRGYWNldEl0ZW1zIiwiaW5pdFByaWNlVmFsaWRhdG9yIiwiZWFjaCIsImluZGV4IiwibmF2TGlzdCIsImNvbGxhcHNlRmFjZXRJdGVtcyIsImFjY29yZGlvblRvZ2dsZSIsIiRhY2NvcmRpb25Ub2dnbGUiLCJjb2xsYXBzaWJsZSIsImRhdGEiLCJpc0NvbGxhcHNlZCIsInB1c2giLCJ0YXJnZXRJZCIsInNldFRpbWVvdXQiLCJpcyIsImNvbGxhcHNlQWxsRmFjZXRzIiwib25TdGF0ZUNoYW5nZSIsImJpbmQiLCJvblRvZ2dsZUNsaWNrIiwib25BY2NvcmRpb25Ub2dnbGUiLCJvbkNsZWFyRmFjZXQiLCJvbkZhY2V0Q2xpY2siLCJvblJhbmdlU3VibWl0IiwiZmlsdGVyRmFjZXRJdGVtcyIsImJpbmRFdmVudHMiLCJyZWZyZXNoVmlldyIsImNvbnRlbnQiLCJyZXN0b3JlQ29sbGFwc2VkRmFjZXRzIiwicmVzdG9yZUNvbGxhcHNlZEZhY2V0SXRlbXMiLCJ1cGRhdGVWaWV3IiwiX3RoaXMyIiwic2hvdyIsImdldFBhZ2UiLCJnZXRVcmwiLCJlcnIiLCJoaWRlIiwiRXJyb3IiLCJleHBhbmRGYWNldEl0ZW1zIiwiJG5hdkxpc3QiLCJhdHRyIiwiX3dpdGhvdXQiLCJoYXNNb3JlUmVzdWx0cyIsIl91bmlvbiIsInRvZ2dsZUZhY2V0SXRlbXMiLCJfaW5jbHVkZXMiLCJnZXRNb3JlRmFjZXRSZXN1bHRzIiwiX3RoaXMzIiwiZmFjZXQiLCJmYWNldFVybCIsInNob3dNb3JlIiwidGVtcGxhdGUiLCJwYXJhbXMiLCJsaXN0X2FsbCIsInJlc3BvbnNlIiwib3BlbiIsInVwZGF0ZUNvbnRlbnQiLCIkaXRlbXMiLCJ2YWwiLCJ0b0xvd2VyQ2FzZSIsImVsZW1lbnQiLCJ0ZXh0IiwiaW5kZXhPZiIsImV4cGFuZEZhY2V0IiwiY29sbGFwc2VGYWNldCIsImNsb3NlIiwiX3RoaXM0IiwiJGFjY29yZGlvblRvZ2dsZXMiLCJleHBhbmRBbGxGYWNldHMiLCJfdGhpczUiLCJsZW5ndGgiLCJ2YWxpZGF0b3IiLCJzZWxlY3RvcnMiLCJlcnJvclNlbGVjdG9yIiwiZmllbGRzZXRTZWxlY3RvciIsImZvcm1TZWxlY3RvciIsIm1heFByaWNlU2VsZWN0b3IiLCJtaW5QcmljZVNlbGVjdG9yIiwic2V0TWluTWF4UHJpY2VWYWxpZGF0aW9uIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJwcmljZVJhbmdlVmFsaWRhdG9yIiwiX3RoaXM2IiwiJG5hdkxpc3RzIiwic2hvdWxkQ29sbGFwc2UiLCJfdGhpczciLCJ1bmJpbmRFdmVudHMiLCJvbiIsIm9uUG9wU3RhdGUiLCJvZmYiLCIkbGluayIsInN0b3BQcm9wYWdhdGlvbiIsImdvVG9VcmwiLCIkdG9nZ2xlIiwidG9nZ2xlQ2xhc3MiLCJ1cmxRdWVyeVBhcmFtcyIsIk9iamVjdCIsImFzc2lnbiIsImFyZUFsbCIsImNvbnN0YW50cyIsIlZBTElEIiwiZGVjb2RlVVJJIiwicGFyc2VRdWVyeVBhcmFtcyIsImtleSIsImhhc093blByb3BlcnR5IiwiY3VycmVudFVybCIsInNlYXJjaFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsImhhcyIsImxpbmtVcmwiLCJyZSIsInVwZGF0ZWRMaW5rVXJsIiwicmVwbGFjZSIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ0aXRsZSIsInRyaWdnZXIiLCJzaG93QWxlcnRNb2RhbCIsImRlY3JlbWVudENvdW50ZXIiLCJjb3VudGVyIiwiaXRlbSIsInNwbGljZSIsImluY3JlbWVudENvdW50ZXIiLCJ1cGRhdGVDb3VudGVyTmF2IiwidXJscyIsImFkZENsYXNzIiwiY29tcGFyZSIsImpvaW4iLCJmaW5kIiwiaHRtbCIsInJlbW92ZUNsYXNzIiwiX3JlZiIsIm5vQ29tcGFyZU1lc3NhZ2UiLCJjb21wYXJlQ291bnRlciIsIiRjb21wYXJlTGluayIsIiRjaGVja2VkIiwibWFwIiwidmFsdWUiLCJnZXQiLCJ0cmlnZ2VySGFuZGxlciIsInByb2R1Y3QiLCIkY2xpY2tlZENvbXBhcmVMaW5rIiwiY2hlY2tlZCIsIiRjbGlja2VkQ2hlY2tlZElucHV0Il0sInNvdXJjZVJvb3QiOiIifQ==
