"use strict";
(self["webpackChunkAimpoint_Roots"] = self["webpackChunkAimpoint_Roots"] || []).push([["assets_js_theme_brands_js"],{

/***/ "./assets/js/theme/brands.js":
/*!***********************************!*\
  !*** ./assets/js/theme/brands.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Brands)
/* harmony export */ });
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _roots_brands__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./roots/brands */ "./assets/js/theme/roots/brands.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var Brands = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Brands, _CatalogPage);
  function Brands() {
    return _CatalogPage.apply(this, arguments) || this;
  }
  var _proto = Brands.prototype;
  _proto.onReady = function onReady() {
    (0,_roots_brands__WEBPACK_IMPORTED_MODULE_1__["default"])();
  };
  return Brands;
}(_catalog__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

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

/***/ "./assets/js/theme/roots/brands.js":
/*!*****************************************!*\
  !*** ./assets/js/theme/roots/brands.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loaded)
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);

function loaded() {
  // subcategory display
  if (jquery__WEBPACK_IMPORTED_MODULE_0___default()('.page-content-subcategories .image-wrap:not(.image-placeholder)').length > 0) {
    jquery__WEBPACK_IMPORTED_MODULE_0___default()('.page-content-subcategories ul').addClass('subcategory-grid');
  }
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9icmFuZHNfanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBb0M7QUFDSztBQUFBLElBRXBCRSxNQUFNLDBCQUFBQyxZQUFBO0VBQUFDLGNBQUEsQ0FBQUYsTUFBQSxFQUFBQyxZQUFBO0VBQUEsU0FBQUQsT0FBQTtJQUFBLE9BQUFDLFlBQUEsQ0FBQUUsS0FBQSxPQUFBQyxTQUFBO0VBQUE7RUFBQSxJQUFBQyxNQUFBLEdBQUFMLE1BQUEsQ0FBQU0sU0FBQTtFQUFBRCxNQUFBLENBQ3ZCRSxPQUFPLEdBQVAsU0FBQUEsUUFBQSxFQUFVO0lBQ05SLHlEQUFXLENBQUMsQ0FBQztFQUNqQixDQUFDO0VBQUEsT0FBQUMsTUFBQTtBQUFBLEVBSCtCRixnREFBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSE47QUFDTztBQUMxQjtBQUFBLElBRURBLFdBQVcsMEJBQUFjLFlBQUE7RUFBQVYsY0FBQSxDQUFBSixXQUFBLEVBQUFjLFlBQUE7RUFDNUIsU0FBQWQsWUFBWWUsT0FBTyxFQUFFO0lBQUEsSUFBQUMsS0FBQTtJQUNqQkEsS0FBQSxHQUFBRixZQUFBLENBQUFHLElBQUEsT0FBTUYsT0FBTyxDQUFDO0lBRWRHLE1BQU0sQ0FBQ0MsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLFlBQU07TUFDMUMsSUFBSUMsUUFBUSxDQUFDQyxhQUFhLENBQUNDLEVBQUUsS0FBSyxNQUFNLEVBQUU7UUFDdENKLE1BQU0sQ0FBQ0ssWUFBWSxDQUFDQyxPQUFPLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQztNQUMzRDtJQUNKLENBQUMsQ0FBQztJQUFDLE9BQUFSLEtBQUE7RUFDUDtFQUFDLElBQUFULE1BQUEsR0FBQVAsV0FBQSxDQUFBUSxTQUFBO0VBQUFELE1BQUEsQ0FFRGtCLG9CQUFvQixHQUFwQixTQUFBQSxxQkFBQSxFQUF1QjtJQUNuQixJQUFNQyxlQUFlLEdBQUdDLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQztJQUUzRCxJQUFJVCxNQUFNLENBQUNLLFlBQVksQ0FBQ0ssT0FBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFO01BQzdDRixlQUFlLENBQUNHLEtBQUssQ0FBQyxDQUFDO01BQ3ZCWCxNQUFNLENBQUNLLFlBQVksQ0FBQ08sVUFBVSxDQUFDLGNBQWMsQ0FBQztJQUNsRDtFQUNKLENBQUM7RUFBQXZCLE1BQUEsQ0FFRHdCLGNBQWMsR0FBZCxTQUFBQSxlQUFlQyxLQUFLLEVBQUVDLGFBQWEsRUFBRTtJQUNqQyxJQUFNQyxHQUFHLEdBQUdyQixzQ0FBUyxDQUFDSyxNQUFNLENBQUNrQixRQUFRLENBQUNDLElBQUksRUFBRSxJQUFJLENBQUM7SUFDakQsSUFBTUMsV0FBVyxHQUFHWCxDQUFDLENBQUNNLGFBQWEsQ0FBQyxDQUFDTSxTQUFTLENBQUMsQ0FBQyxDQUFDQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBRTNETixHQUFHLENBQUNPLEtBQUssQ0FBQ0gsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUdBLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDMUMsT0FBT0osR0FBRyxDQUFDTyxLQUFLLENBQUNDLElBQUk7SUFFckJWLEtBQUssQ0FBQ1csY0FBYyxDQUFDLENBQUM7SUFDdEJ6QixNQUFNLENBQUNrQixRQUFRLEdBQUd2Qix1Q0FBVSxDQUFDO01BQUVnQyxRQUFRLEVBQUVYLEdBQUcsQ0FBQ1csUUFBUTtNQUFFQyxNQUFNLEVBQUVsQywrREFBUSxDQUFDbUMsZ0JBQWdCLENBQUNiLEdBQUcsQ0FBQ08sS0FBSztJQUFFLENBQUMsQ0FBQztFQUMxRyxDQUFDO0VBQUEsT0FBQXpDLFdBQUE7QUFBQSxFQTdCb0NXLHFEQUFXOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0o3QjtBQUVSLFNBQVNxQyxNQUFNQSxDQUFBLEVBQUc7RUFDN0I7RUFDQSxJQUFJckIsNkNBQUMsQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDc0IsTUFBTSxHQUFHLENBQUMsRUFBRTtJQUNqRnRCLDZDQUFDLENBQUMsZ0NBQWdDLENBQUMsQ0FBQ3VCLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztFQUNwRTtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQWltcG9pbnQgUm9vdHMvLi9hc3NldHMvanMvdGhlbWUvYnJhbmRzLmpzIiwid2VicGFjazovL0FpbXBvaW50IFJvb3RzLy4vYXNzZXRzL2pzL3RoZW1lL2NhdGFsb2cuanMiLCJ3ZWJwYWNrOi8vQWltcG9pbnQgUm9vdHMvLi9hc3NldHMvanMvdGhlbWUvcm9vdHMvYnJhbmRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDYXRhbG9nUGFnZSBmcm9tICcuL2NhdGFsb2cnO1xyXG5pbXBvcnQgcm9vdHNMb2FkZWQgZnJvbSAnLi9yb290cy9icmFuZHMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnJhbmRzIGV4dGVuZHMgQ2F0YWxvZ1BhZ2Uge1xyXG4gICAgb25SZWFkeSgpIHtcclxuICAgICAgICByb290c0xvYWRlZCgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XHJcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL2NvbW1vbi91dGlscy91cmwtdXRpbHMnO1xyXG5pbXBvcnQgVXJsIGZyb20gJ3VybCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRhbG9nUGFnZSBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcclxuICAgICAgICBzdXBlcihjb250ZXh0KTtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuaWQgPT09ICdzb3J0Jykge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzb3J0QnlTdGF0dXMnLCAnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFycmFuZ2VGb2N1c09uU29ydEJ5KCkge1xyXG4gICAgICAgIGNvbnN0ICRzb3J0QnlTZWxlY3RvciA9ICQoJ1tkYXRhLXNvcnQtYnk9XCJwcm9kdWN0XCJdICNzb3J0Jyk7XHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3NvcnRCeVN0YXR1cycpKSB7XHJcbiAgICAgICAgICAgICRzb3J0QnlTZWxlY3Rvci5mb2N1cygpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3NvcnRCeVN0YXR1cycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvblNvcnRCeVN1Ym1pdChldmVudCwgY3VycmVudFRhcmdldCkge1xyXG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XHJcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSAkKGN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZSgpLnNwbGl0KCc9Jyk7XHJcblxyXG4gICAgICAgIHVybC5xdWVyeVtxdWVyeVBhcmFtc1swXV0gPSBxdWVyeVBhcmFtc1sxXTtcclxuICAgICAgICBkZWxldGUgdXJsLnF1ZXJ5LnBhZ2U7XHJcblxyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gVXJsLmZvcm1hdCh7IHBhdGhuYW1lOiB1cmwucGF0aG5hbWUsIHNlYXJjaDogdXJsVXRpbHMuYnVpbGRRdWVyeVN0cmluZyh1cmwucXVlcnkpIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2FkZWQoKSB7XHJcbiAgICAvLyBzdWJjYXRlZ29yeSBkaXNwbGF5XHJcbiAgICBpZiAoJCgnLnBhZ2UtY29udGVudC1zdWJjYXRlZ29yaWVzIC5pbWFnZS13cmFwOm5vdCguaW1hZ2UtcGxhY2Vob2xkZXIpJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoJy5wYWdlLWNvbnRlbnQtc3ViY2F0ZWdvcmllcyB1bCcpLmFkZENsYXNzKCdzdWJjYXRlZ29yeS1ncmlkJyk7XHJcbiAgICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIkNhdGFsb2dQYWdlIiwicm9vdHNMb2FkZWQiLCJCcmFuZHMiLCJfQ2F0YWxvZ1BhZ2UiLCJfaW5oZXJpdHNMb29zZSIsImFwcGx5IiwiYXJndW1lbnRzIiwiX3Byb3RvIiwicHJvdG90eXBlIiwib25SZWFkeSIsImRlZmF1bHQiLCJQYWdlTWFuYWdlciIsInVybFV0aWxzIiwiVXJsIiwiX1BhZ2VNYW5hZ2VyIiwiY29udGV4dCIsIl90aGlzIiwiY2FsbCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCJpZCIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJhcnJhbmdlRm9jdXNPblNvcnRCeSIsIiRzb3J0QnlTZWxlY3RvciIsIiQiLCJnZXRJdGVtIiwiZm9jdXMiLCJyZW1vdmVJdGVtIiwib25Tb3J0QnlTdWJtaXQiLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCJ1cmwiLCJwYXJzZSIsImxvY2F0aW9uIiwiaHJlZiIsInF1ZXJ5UGFyYW1zIiwic2VyaWFsaXplIiwic3BsaXQiLCJxdWVyeSIsInBhZ2UiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm1hdCIsInBhdGhuYW1lIiwic2VhcmNoIiwiYnVpbGRRdWVyeVN0cmluZyIsImxvYWRlZCIsImxlbmd0aCIsImFkZENsYXNzIl0sInNvdXJjZVJvb3QiOiIifQ==
