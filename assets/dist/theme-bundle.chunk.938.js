"use strict";(self.webpackChunkAimpoint_Roots=self.webpackChunkAimpoint_Roots||[]).push([[938],{82938:(e,t,a)=>{a.r(t),a.d(t,{default:()=>_});var n=a(7309),r=a.n(n),i=a(40860),o=a.n(i),d=a(91238),l=a(41582),s=a(27122),c=a(70887),u=a(36007),f=a(96609),m=a(71779),p=a(57655),v=a.n(p),h=a(33270),y=a(9096),b=a(71305),g=a(33270);function x(e,t){return x=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},x(e,t)}var _=function(e){var t,a;function n(t){var a;return(a=e.call(this,t)||this).validationDictionary=(0,m.i)(t),a.$state=g('[data-field-type="State"]'),a.$body=g("body"),a}a=e,(t=n).prototype=Object.create(a.prototype),t.prototype.constructor=t,x(t,a);var i=n.prototype;return i.onReady=function(){var e=(0,f.J6)("form[data-edit-account-form]"),t=(0,f.J6)("form[data-address-form]"),a=(0,f.J6)("form[data-inbox-form]"),n=(0,f.J6)("[data-account-return-form]"),r=(0,f.J6)("form[data-payment-method-form]"),i=(0,f.J6)("[data-account-reorder-form]"),o=g("[data-print-invoice]");(0,b.A)(this.context),this.passwordRequirements=this.context.passwordRequirements,s.default.load(this.context),e.length&&(this.registerEditAccountValidation(e),this.$state.is("input")&&(0,f.VJ)(this.$state)),o.length&&o.on("click",(function(){var e=window.screen.availWidth/2-450,t=window.screen.availHeight/2-320,a=o.data("printInvoice");window.open(a,"orderInvoice","width=900,height=650,left="+e+",top="+t+",scrollbars=1")})),t.length&&(this.initAddressFormValidation(t),this.$state.is("input")&&(0,f.VJ)(this.$state)),a.length&&this.registerInboxValidation(a),n.length&&this.initAccountReturnFormValidation(n),r.length&&this.initPaymentMethodFormValidation(r),i.length&&this.initReorderForm(i),this.bindDeleteAddress(),this.bindDeletePaymentMethod()},i.bindDeleteAddress=function(){g("[data-delete-address]").on("submit",(function(e){var t=g(e.currentTarget).data("deleteAddress");window.confirm(t)||e.preventDefault()}))},i.bindDeletePaymentMethod=function(){g("[data-delete-payment-method]").on("submit",(function(e){var t=g(e.currentTarget).data("deletePaymentMethod");window.confirm(t)||e.preventDefault()}))},i.initReorderForm=function(e){var t=this;e.on("submit",(function(a){var n=g(".account-listItem .form-checkbox:checked"),r=!1;e.find('[name^="reorderitem"]').remove(),n.each((function(t,a){var n=g(a).val(),i=g("<input>",{type:"hidden",name:"reorderitem["+n+"]",value:"1"});r=!0,e.append(i)})),r||(a.preventDefault(),y.A.fire({text:t.context.selectItem,icon:"error"}))}))},i.initAddressFormValidation=function(e){var t,a=this,n=(0,c.A)(e,this.context),r=g('form[data-address-form] [data-field-type="State"]'),i=(0,l.A)({submit:'form[data-address-form] input[type="submit"]',tap:f.dN});i.add(n),r&&(0,u.A)(r,this.context,(function(e,n){if(e)throw new Error(e);var o=g(n);"undefined"!==i.getStatus(r)&&i.remove(r),t&&i.remove(t),o.is("select")?(t=n,f.k0.setStateCountryValidation(i,n,a.validationDictionary.field_not_blank)):f.k0.cleanUpStateValidation(n)})),e.on("submit",(function(e){i.performCheck(),i.areAll("valid")||e.preventDefault()}))},i.initAccountReturnFormValidation=function(e){var t=e.data("accountReturnFormError");e.on("submit",(function(a){var n=!1;return g('[name^="return_qty"]',e).each((function(e,t){if(0!==parseInt(g(t).val(),10))return n=!0,!0})),!!n||(y.A.fire({text:t,icon:"error"}),a.preventDefault())}))},i.initPaymentMethodFormValidation=function(e){var t=this;e.find("#first_name.form-field").attr("data-validation",'{ "type": "singleline", "label": "'+this.context.firstNameLabel+'", "required": true, "maxlength": 0 }'),e.find("#last_name.form-field").attr("data-validation",'{ "type": "singleline", "label": "'+this.context.lastNameLabel+'", "required": true, "maxlength": 0 }'),e.find("#company.form-field").attr("data-validation",'{ "type": "singleline", "label": "'+this.context.companyLabel+'", "required": false, "maxlength": 0 }'),e.find("#phone.form-field").attr("data-validation",'{ "type": "singleline", "label": "'+this.context.phoneLabel+'", "required": false, "maxlength": 0 }'),e.find("#address1.form-field").attr("data-validation",'{ "type": "singleline", "label": "'+this.context.address1Label+'", "required": true, "maxlength": 0 }'),e.find("#address2.form-field").attr("data-validation",'{ "type": "singleline", "label": "'+this.context.address2Label+'", "required": false, "maxlength": 0 }'),e.find("#city.form-field").attr("data-validation",'{ "type": "singleline", "label": "'+this.context.cityLabel+'", "required": true, "maxlength": 0 }'),e.find("#country.form-field").attr("data-validation",'{ "type": "singleselect", "label": "'+this.context.countryLabel+'", "required": true, prefix: "'+this.context.chooseCountryLabel+'" }'),e.find("#state.form-field").attr("data-validation",'{ "type": "singleline", "label": "'+this.context.stateLabel+'", "required": true, "maxlength": 0 }'),e.find("#postal_code.form-field").attr("data-validation",'{ "type": "singleline", "label": "'+this.context.postalCodeLabel+'", "required": true, "maxlength": 0 }');var a,n,i,d,s,m=(0,c.A)(e,this.context),p="form[data-payment-method-form]",b=(0,l.A)({submit:p+' input[type="submit"]',tap:f.dN}),x=g(p+' [data-field-type="State"]');(0,u.A)(x,this.context,(function(e,n){if(e)throw new Error(e);var r=g(n);"undefined"!==b.getStatus(x)&&b.remove(x),a&&b.remove(a),r.is("select")?(a=n,f.k0.setStateCountryValidation(b,n,t.validationDictionary.field_not_blank)):f.k0.cleanUpStateValidation(n)})),g(p+' input[name="credit_card_number"]').on("keyup",(function(e){var t;t=e.target.value,(n=v().card.type(v().card.parse(t),!0))?g(p+' img[alt="'+n+'"]').siblings().css("opacity",".2"):g(p+" img").css("opacity","1")})),i=b,d=p+' input[name="credit_card_number"]',s=this.context.creditCardNumber,d&&i.add({selector:d,validate:function(e,t){e(t.length&&v().card.isValid(v().card.parse(t)))},errorMessage:s}),function(e,t,a){t&&e.add({selector:t,validate:function(e,t){var a=t.split("/"),n=t.length&&/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(t);e(n=n&&!v().expiration.isPast(v().expiration.month.parse(a[0]),v().expiration.year.parse(a[1],!0)))},errorMessage:a})}(b,p+' input[name="expiration"]',this.context.expiration),function(e,t,a){t&&e.add({selector:t,validate:function(e,t){e(!!t.length)},errorMessage:a})}(b,p+' input[name="name_on_card"]',this.context.nameOnCard),function(e,t,a,n){t&&e.add({selector:t,validate:function(e,t){var a="function"==typeof n?n():n;e(t.length&&v().cvc.isValid(t,a))},errorMessage:a})}(b,p+' input[name="cvv"]',this.context.cvv,(function(){return n})),function(e){e&&h(e).on("keyup",(function(e){var t=e.target;t.value=v().card.format(v().card.parse(t.value))}))}(p+' input[name="credit_card_number"]'),function(e){e&&h(e).on("keyup",(function(e){var t=e.target,a=e.which,n=t;8===a&&/.*(\/)$/.test(t.value)?n.value=t.value.slice(0,-1):t.value.length>4?n.value=t.value.slice(0,5):8!==a&&(n.value=t.value.replace(/^([1-9]\/|[2-9])$/g,"0$1/").replace(/^(0[1-9]|1[0-2])$/g,"$1/").replace(/^([0-1])([3-9])$/g,"0$1/$2").replace(/^(0[1-9]|1[0-2])([0-9]{2})$/g,"$1/$2").replace(/^([0]+)\/|[0]+$/g,"0").replace(/[^\d\/]|^[\/]*$/g,"").replace(/\/\//g,"/"))}))}(p+' input[name="expiration"]'),b.add(m),e.on("submit",(function(a){if(a.preventDefault(),b.performCheck(),b.areAll("valid")){var n=o()(e.serializeArray(),(function(e,t){var a=e;return a[t.name]=t.value,a}),{}),i=r()(t.context.countries,(function(e){return e.value===n.country})),d=i&&r()(i.states,(function(e){return e.value===n.state}));n.country_code=i?i.code:n.country,n.state_or_province_code=d?d.code:n.state,n.default_instrument=!!n.default_instrument,l=t.context,s=n,c=function(){window.location.href=t.context.paymentMethodsUrl},u=function(){y.A.fire({text:t.context.generic_error,icon:"error"})},p=l.paymentsUrl,g=l.shopperId,x=l.storeHash,_=l.vaultToken,w=s.provider_id,A=s.currency_code,k=s.credit_card_number,D=s.expiration,N=s.name_on_card,M=s.cvv,S=s.default_instrument,V=s.address1,$=s.address2,q=s.city,C=s.postal_code,O=s.state_or_province_code,j=s.country_code,P=s.company,J=s.first_name,R=s.last_name,F=s.email,L=s.phone,T=D.split("/"),h.ajax({url:p+"/stores/"+x+"/customers/"+g+"/stored_instruments",dataType:"json",method:"POST",cache:!1,headers:{Authorization:_,Accept:"application/vnd.bc.v1+json","Content-Type":"application/vnd.bc.v1+json"},data:JSON.stringify({instrument:{type:"card",cardholder_name:N,number:v().card.parse(k),expiry_month:v().expiration.month.parse(T[0]),expiry_year:v().expiration.year.parse(T[1],!0),verification_value:M},billing_address:(f={address1:V,address2:$,city:q,postal_code:C,state_or_province_code:O,country_code:j,company:P,first_name:J,last_name:R,email:F,phone:L},m=f,h.each(m,(function(e,t){null!==t&&""!==t||delete m[e]})),m),provider_id:w,default_instrument:S,currency_code:A})}).done(c).fail(u)}var l,s,c,u,f,m,p,g,x,_,w,A,k,D,N,M,S,V,$,q,C,O,j,P,J,R,F,L,T}))},i.registerEditAccountValidation=function(e){var t=(0,c.A)(e,this.context),a="form[data-edit-account-form]",n=(0,l.A)({submit:'${formEditSelector} input[type="submit"]',tap:f.dN}),r=a+' [data-field-type="EmailAddress"]',i=g(r),o=a+' [data-field-type="Password"]',d=g(o),s=a+' [data-field-type="ConfirmPassword"]',u=g(s),m=a+' [data-field-type="CurrentPassword"]',p=g(m);if(n.add(t),i&&(n.remove(r),f.k0.setEmailValidation(n,r,this.validationDictionary.valid_email)),d&&u){var v=this.validationDictionary,h=v.password,y=v.password_match;n.remove(o),n.remove(s),f.k0.setPasswordValidation(n,o,s,this.passwordRequirements,(0,f.pt)(h,h,y,this.passwordRequirements.error),!0)}p&&n.add({selector:m,validate:function(e,t){var a=!0;""===t&&""!==d.val()&&(a=!1),e(a)},errorMessage:this.context.currentPassword}),n.add([{selector:a+" input[name='account_firstname']",validate:function(e,t){e(t.length)},errorMessage:this.context.firstName},{selector:a+" input[name='account_lastname']",validate:function(e,t){e(t.length)},errorMessage:this.context.lastName}]),e.on("submit",(function(e){n.performCheck(),n.areAll("valid")||e.preventDefault()}))},i.registerInboxValidation=function(e){var t=(0,l.A)({submit:'form[data-inbox-form] input[type="submit"]',tap:f.dN});t.add([{selector:'form[data-inbox-form] select[name="message_order_id"]',validate:function(e,t){e(0!==Number(t))},errorMessage:this.context.enterOrderNum},{selector:'form[data-inbox-form] input[name="message_subject"]',validate:function(e,t){e(t.length)},errorMessage:this.context.enterSubject},{selector:'form[data-inbox-form] textarea[name="message_content"]',validate:function(e,t){e(t.length)},errorMessage:this.context.enterMessage}]),e.on("submit",(function(e){t.performCheck(),t.areAll("valid")||e.preventDefault()}))},n}(d.A)},70887:(e,t,a)=>{a.d(t,{A:()=>i});var n=a(71779),r=a(33270);function i(e,t){var a=[],i=(0,n.i)(t).field_not_blank;return e.find("[data-validation]").each((function(e,t){var n=r(t).first().data("validation").label+i;a=a.concat(function(e,t){var a,n,i,o=e.data("validation"),d=[],l="#"+e.attr("id");if("datechooser"===o.type){var s=function(e,t,a){if(t.min_date&&t.max_date){var n="Your chosen date must fall between "+t.min_date+" and "+t.max_date+".",r=e.attr("id"),i=t.min_date.split("-"),o=t.max_date.split("-"),d=new Date(i[0],i[1]-1,i[2]),l=new Date(o[0],o[1]-1,o[2]);return{selector:"#"+r+' select[data-label="year"]',triggeredBy:"#"+r+' select:not([data-label="year"])',validate:function(t,a){var n=Number(e.find('select[data-label="day"]').val()),r=Number(e.find('select[data-label="month"]').val())-1,i=Number(a),o=new Date(i,r,n);t(o>=d&&o<=l)},errorMessage:n}}if(t.required&&(!t.min_date||!t.max_date)){var s=e.attr("id");return{selector:"#"+s+' select[data-label="year"]',triggeredBy:"#"+s+' select:not([data-label="year"])',validate:function(t,a){var n=e.find('select[data-label="day"]').val(),r=e.find('select[data-label="month"]').val();t(n&&r&&a)},errorMessage:a}}}(e,o,t);s&&d.push(s)}else!o.required||"checkboxselect"!==o.type&&"radioselect"!==o.type?e.find("input, select, textarea").each((function(e,a){var n=r(a),i=n.get(0).tagName,s=n.attr("name"),c=l+" "+i+'[name="'+s+'"]';"numberonly"===o.type&&d.push(function(e,t){var a="The value for "+e.label+" must be between "+e.min+" and "+e.max+".",n=Number(e.min),r=Number(e.max);return{selector:t+' input[name="'+e.name+'"]',validate:function(e,t){var a=Number(t);e(a>=n&&a<=r)},errorMessage:a}}(o,l)),o.required&&d.push(function(e,t,a){return{selector:t,validate:function(e,t){e(t.length>0)},errorMessage:a}}(0,c,t))})):d.push((a=t,{selector:"#"+(n=e.attr("id"))+" input:first-of-type",triggeredBy:i="#"+n+" input",validate:function(e){var t=!1;r(i).each((function(e,a){if(a.checked)return t=!0,!1})),e(t)},errorMessage:a}));return d}(r(t),n))})),a}},36007:(e,t,a)=>{a.d(t,{A:()=>m});var n=a(76135),r=a.n(n),i=a(62193),o=a.n(i),d=a(69752),l=a.n(d),s=a(4621),c=a(96609),u=a(33977),f=a(33270);function m(e,t,a,n){void 0===t&&(t={}),"function"==typeof a&&(n=a,a={}),f('select[data-field-type="Country"]').on("change",(function(e){var i=f(e.currentTarget).val();""!==i&&s.Ay.api.country.getByName(i,(function(e,i){if(e)return(0,u.ji)(t.state_error),n(e);var d=f('[data-field-type="State"]');if(o()(i.data.states)){var s=function(e){var t=l()(e.prop("attributes"),(function(e,t){var a=e;return a[t.name]=t.value,a})),a={type:"text",id:t.id,"data-label":t["data-label"],class:"form-input",name:t.name,"data-field-type":t["data-field-type"]};e.replaceWith(f("<input />",a));var n=f('[data-field-type="State"]');return 0!==n.length&&((0,c.VJ)(n),n.prev().find("small").hide()),n}(d);n(null,s)}else{var m=function(e,t){var a=l()(e.prop("attributes"),(function(e,t){var a=e;return a[t.name]=t.value,a})),n={id:a.id,"data-label":a["data-label"],class:"form-select",name:a.name,"data-field-type":a["data-field-type"]};e.replaceWith(f("<select></select>",n));var r=f('[data-field-type="State"]'),i=f('[name*="FormFieldIsText"]');return 0!==i.length&&i.remove(),0===r.prev().find("small").length?r.prev().append("<small>"+t.required+"</small>"):r.prev().find("small").show(),r}(d,t);!function(e,t,a){var n=[];n.push('<option value="">'+e.prefix+"</option>"),o()(t)||(r()(e.states,(function(e){a.useIdForStates?n.push('<option value="'+e.id+'">'+e.name+"</option>"):n.push('<option value="'+e.name+'">'+(e.label?e.label:e.name)+"</option>")})),t.html(n.join(" ")))}(i.data,m,a),n(null,m)}}))}))}},71779:(e,t,a)=>{a.d(t,{i:()=>i});var n="translations",r=function(e){return!!Object.keys(e[n]).length},i=function(e){var t=function(){for(var e=0;e<arguments.length;e++){var t=JSON.parse(e<0||arguments.length<=e?void 0:arguments[e]);if(r(t))return t}}(e.validationDictionaryJSON,e.validationFallbackDictionaryJSON,e.validationDefaultDictionaryJSON),a=Object.values(t[n]);return Object.keys(t[n]).map((function(e){return e.split(".").pop()})).reduce((function(e,t,n){return e[t]=a[n],e}),{})}},71305:(e,t,a)=>{a.d(t,{A:()=>o});var n=a(33977),r=a(33270);function i(e,t,a){0!==e.length?(t.is("visible")||t.addClass("show"),t.attr("href",a.compare+"/"+e.join("/")),t.find("span.countPill").html(e.length)):t.removeClass("show")}function o(e){var t=e.noCompareMessage,a=e.urls,o=[],d=r("a[data-compare-nav]");r("body").on("compareReset",(function(){var e=r("body").find('input[name="products[]"]:checked');i(o=e.length?e.map((function(e,t){return t.value})).get():[],d,a)})),r("body").triggerHandler("compareReset"),r("body").on("click","[data-compare-id]",(function(e){var t,n=e.currentTarget.value,d=r("a[data-compare-nav]");e.currentTarget.checked?(t=n,o.push(t)):function(e,t){var a=e.indexOf(t);a>-1&&e.splice(a,1)}(o,n),i(o,d,a)})),r("body").on("click","a[data-compare-nav]",(function(){if(r("body").find('input[name="products[]"]:checked').length<=1)return(0,n.ji)(t),!1}))}}}]);
//# sourceMappingURL=theme-bundle.chunk.938.js.map
