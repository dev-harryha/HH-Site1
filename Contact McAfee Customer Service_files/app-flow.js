define([
  'ojs/ojcore', 'knockout', 'jquery', 'bootstrap', 'Auth0Utils',
  "jquery-cookie-min",
  'resources/js/csp', 'ojs/ojarraydataprovider', "s-code",
  "csp-site-catalyst"
], function (oj, ko, $, bootstrap, Auth0Utils, jquery, csp, ojs) {
  'use strict';
  // 'resources/js/lib/s_code', --Commented to avoid reduntant calls  jquery
  var AppModule = function AppModule(context) {

    window.bootstrap = bootstrap;
    window.trackgtagLinks = csp.trackgtagLinks;

    // Function to get heading to set for Analytics 

    var analyticsHeading = getAnalyticsHeading();

    function getAnalyticsHeading() {
      var analyticsHeader = null;
      var currentURL = window.location.href;
      if (currentURL.indexOf("dev1") > -1) {
        analyticsHeader = 'mcafee-consumer-support-dev';
      }

      else if (currentURL.indexOf("dev2") > -1 || (currentURL.indexOf("service-qa") > -1)) {
        analyticsHeader = 'mcafee-consumer-support-dev';
      }

      else if (currentURL.indexOf("ejjq-test-apps1") > -1 || currentURL.indexOf("service-test") > -1 || currentURL.indexOf("service-dev") > -1) {
        analyticsHeader = 'mcafee-consumer-support-uat';
      }

      else if ((currentURL.indexOf("dev3") > -1) || (currentURL.indexOf("service-training") > -1) ||
        (currentURL.indexOf("ejjqdev3-apps6") > -1) || (currentURL.indexOf("ejjq-apps6") > -1) ||  
        (currentURL.indexOf("mcafee-uat.mcafee.com/support") > -1) ) {
        analyticsHeader = 'mcafee-consumer-support-uat';
      }
      else if (currentURL.indexOf("service.mcafee.com") > -1 || currentURL.indexOf("mcafee.com/support") > -1) {
        analyticsHeader = 'mcafee-consumer-support-prod';
      }
      return analyticsHeader;
    }

    initSiteCatalyst(analyticsHeading); //Analytics call
    //csp.setAppLocale();
    //csp.loadNoHoldScript();

    if (context) {
      Auth0Utils.setEventHelper(context.getEventHelper());
    }

  };
  self.languaguesDP = ko.observableArray([]);
  $(document).ready(function () {
    var retrieve_value = $('input');
    retrieve_value.removeAttr('autocomplete', 'filleksdhfksdfd_data');
  });

  /*   var aiseraSupportedLocales = "";
    var displayAisera = ""; */
  var displayGethelpwithBlade = "";
  /*   $('body').addClass('AiseraDisplay'); */




  /*OCSP-2313 search button backgroud color change Starts*/
  $(document).on("focus", "#avSearchbox", function (e) {
    var textLength = document.getElementById('avSearchbox|input').value
      .length;
    if (textLength != 0) {
      // $('#searchBtn button.oj-button-button').attr('style',
      //   'background-color: #c01818 !important');
      $('.searchTextBox .oj-inputtext-clear-icon-btn').attr('style',
        'visibility:visible');
    }
  });
  /*OCSP-2313 Ends*/

  /*Change for Search Button background color starts*/

  $(document).on("keyup", "#avSearchbox", function (e) {
    var textLength = document.getElementById('avSearchbox|input').value
      .length;
    if (textLength != 0) {
      // $('#searchBtn button.oj-button-button').attr('style',
      //   'background-color: #c01818 !important');
      $('.searchTextBox .oj-inputtext-clear-icon-btn').attr('style',
        'visibility:visible');
    } else {
      // $('#searchBtn button.oj-button-button').attr('style',
      //   'background-color: #939598 !important');
      $('.searchTextBox .oj-inputtext-clear-icon-btn').attr('style',
        'visibility:hidden');
    }
  });

  $(document).on("click", ".oj-inputtext-clear-icon", function (e) {
    // $('#searchBtn button.oj-button-button').attr('style',
    //   'background-color: #939598 !important');
    $('.searchTextBox .oj-inputtext-clear-icon-btn').attr('style',
      'visibility:visible');
    if (document.getElementById('avSearchbox|input').value.length ==
      0) {
      $('.searchTextBox .oj-inputtext-clear-icon-btn').attr('style',
        'visibility:hidden');
    }
  });

  /*Change for Search Button background color ends*/

  /* To make Language links non draggable in Region drop down Starts*/
  $(document).on("focus", ".localeLink", function (e) {
    $('.drop li a.localeLink').on('dragstart', function () {
      return false;
    });
  });
  /* To make Language links non draggable in Region drop down Ends*/

  /*OCSP- 4234
    /*Hide search results on Screen resizing Starts*/
  /*   $(window).resize(function() {
      $('.homeSearchOption').attr('style', 'display: none');
    }); */
  /*Hide search results on Screen resizing Ends */


  /*Setting visibility of Arrow up icon in footer after certain height BEGIN*/
  //Redundant code so commented by chandrakala ocsp-4990
  /* $(window).scroll(function() {
     var scrollPercent = Math.round(100 * $(window).scrollTop() / ($(
       document).height() - $(window).height()));
     if (scrollPercent > 50) {
       $('.back-to-top').fadeIn();
         
        document.getElementsByClassName("back-to-top")[0].style.display = "block";
     
     } else {
       $('.back-to-top').fadeOut();
     }
   });*/
  /*Setting visibility of Arrow up icon in footer after certain height END*/

  /* Initiate Omniture */
  AppModule.prototype.initCatalyst = function () {
    console.log("CSP Debug: catalyst innitiate");
    sCode.initSiteCatalyst('mcafee-consumer-support-uat');
  };

  /* To make load icon disable after the application loading is done */
  AppModule.prototype.loadingDone = function () {
    document.getElementById("preloadImg").style.display = "none";
  };

  /*    To return the cookie */
  AppModule.prototype.getCurrentCookie = function () {
    return $.cookie("csp_user_locale");

  };

  /*    To get the default language from browser setting */
  AppModule.prototype.checkBrowserLanguage = function () {
    var language = navigator.languages && navigator.languages[0] ||
      // Chrome / Firefox
      navigator.language || // All browsers
      navigator.userLanguage; // IE <= 10
    console.log(language);
    return language;

  };

  /*    To set the locale id to cookie */
  AppModule.prototype.setLocaleCookie = function (localeID) {
    //Setting expiration date for 1 year for cookie
    var date = new Date();
    date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));

    $.cookie("csp_user_locale", localeID, {
      expires: date,
      secure: true
    });
    $('#currentLocale').val(localeID.toLowerCase());

  };


  /*    To set the cookie */
  AppModule.prototype.setFndAuthCookie = function () {
    //Setting expiration date for 1 hour cookie
    var date = new Date();
    date.setTime(date.getTime() + (60 * 55 * 1000));

    $.cookie("isTokenGenerated", true, {
      expires: date
    });


  };

  /*To set the cookie */

  AppModule.prototype.setLoggedInCookie = function (checkifloggedin) {
    //Setting expiration date for 1 hour cookie
    var date = new Date();
    date.setTime(date.getTime() + (60 * 55 * 1000));

    $.cookie("headerFlag", checkifloggedin, {
      expires: date
    });


  };

  function setCookie(name, value, path, maxAge, domain) {
    document.cookie = name + "=" + value + ";" + ((path) ? ";path=" + path :
      "") + ((domain) ? ";domain=" + domain : "") + ((maxAge) ?
        ";max-age=" + maxAge : "");
  }

  /* To pass the selected locale to vbcs key so as to refresh whole application and render the page in selected locale */
  AppModule.prototype.setTranslationBundleLocale = function (locale, event) {
    if (locale) {
      oj.Config.setLocale(locale);
      locale = getConfiguredTBLocale(locale);
      window.localStorage.setItem(
        'vbcs.languageSwitcherAppication.locale', locale);
    }
  };

  function getConfiguredTBLocale(localeId) {
    //if (localeId.startsWith("en-")) {
    if (localeId.indexOf("en-") == 0) { // For IE - OCSP-3141
      return "enus";
    } else if (localeId == 'zh-CN') {
      return "zhcn";
    } else if (localeId == 'ko-KR') {
      return "kokr";
    } else if (localeId == 'pt-BR') {
      return "ptbr";
    } else if (localeId == 'da-DK') {
      return "dadk";
    } else if (localeId == 'nl-NL') {
      return "nlnl";
    } else if (localeId == 'ja-JP') {
      return "jajp";
    } else if (localeId == 'nb-NO') {
      return "nbno";
    } else if (localeId == 'pl-PL') {
      return "plpl";
    } else if (localeId == 'pt-PT') {
      return "ptpt";
    } else if (localeId.indexOf("it-") == 0) { // For IE - OCSP-3142
      return "itit";
    } else if (localeId == 'sv-SE') {
      return "svse";
    } else if (localeId == 'tr-TR') {
      return "trtr";
    } else if (localeId == 'zh-TW') {
      return "zhtw";
    } else if (localeId.indexOf("de-") == 0) { // For IE - OCSP-3142
      return "dede";
    } else if (localeId == 'fi-FI') {
      return "fifi";
    } else if (localeId.indexOf("fr-") == 0) { // For IE - OCSP-3142
      return "frfr";
    } else if (localeId == 'ru-RU') {
      return "ruru";
    } else if (localeId.indexOf("es-") == 0) { // For IE - OCSP-3142
      return "eses";
    }
  }
  /* To return the locale */
  AppModule.prototype.getLocale = function (event) {
    return oj.Config.getLocale();
  };

  /* To return the locale */
  AppModule.prototype.getCountryCode = function (locale, event) {
    var localeArr = locale.split("-");
    return localeArr[1];
  };

  /* To return the current url  */
  AppModule.prototype.getCurrentURL = function (applicationPath,
    sessionLocaleCd) {

    var tempUrl = $(location).attr('href');
    var langCode = tempUrl.substring(tempUrl.indexOf("locale="), tempUrl
      .indexOf(
        "locale=") + 9).substr(7, 9);
    if (langCode != "/") { // in case where locale passed in url
      tempUrl = (langCode == "en") ? $(location).attr('href') : $(
        location)
        .attr('href').replace("total-promise", "home");
          if(tempUrl.indexOf("&shell=contact-support&contact-support=cs-srnewconfirmpage")>0)
        {
           var localeFromURL=tempUrl.substring(tempUrl.lastIndexOf("&locale="),tempUrl.length).substr(8,tempUrl.length);
           if(localeFromURL.length>4 && localeFromURL.indexOf("#")==5)
          {
              var URLToBe = tempUrl.substring(0, tempUrl.lastIndexOf("&locale="))+ "&locale="+localeFromURL.substring(0,5);
              tempUrl=URLToBe;
          }
        
        }
    } else { // in case where locale is not passed in url, check using sessionLocaleCd
      if (sessionLocaleCd && sessionLocaleCd.substr(0, 2) != "en") {
        tempUrl = $(location).attr('href').replace("total-promise",
          "home");
      }
    }

    // updated condition to avoid adding extra Url locale pramater on all the pages
    if (tempUrl.indexOf("contact-support") != -1) {
      var href = tempUrl;
      if (tempUrl.lastIndexOf("&contact-support=") != '-1') {
        href = tempUrl.substring(0, tempUrl.lastIndexOf(
          "&contact-support="));
      }

      if (AppModule.prototype.checkBrowserLocale("locale") == null) {
        tempUrl = href;
      } else {
        // updated condition to avoid adding extra Url locale pramater on all the pages if locale exists
        if (tempUrl.indexOf("locale") === -1) {
          tempUrl = href + "&locale=" + AppModule.prototype
            .checkBrowserLocale(
              "locale");
        }
      }

    }

    //to redirect from KC page to homepage on locale change
    if (tempUrl.indexOf("shell=search") != -1) {

      tempUrl = tempUrl.substring(0, tempUrl.lastIndexOf("?")) +
        "?locale=" + AppModule.prototype.checkBrowserLocale("locale");
    }

    // updated condition to avoid adding extra Url locale pramater on all the pages
    /*     if (tempUrl.indexOf("shell=search") != -1) {
          var href1 = tempUrl;
          if (tempUrl.lastIndexOf("?") != '-1') {
            href1 = tempUrl.substring(0, tempUrl.lastIndexOf(
              "?") + 1) + "&shell=home";
          }
          tempUrl = href1 + "&locale=" + AppModule.prototype.checkBrowserLocale(
            "locale");
        } */

    return tempUrl;
  };


  /* Check to see if there are any english specific pages to be opened and redirect to homepage incase of non english 
      locales when tempLocale&sessionLocaleCd are equal*/
  AppModule.prototype.checkToRedirectEnglishLocalPages = function (
    sessionLocaleCd) {

    var status = false;
    var tempUrl = $(location).attr('href');
    if ((tempUrl.indexOf("total-promise") != -1) && (sessionLocaleCd
      .substr(
        0, 2) != "en")) {
      status = true;
    }
    return status;
  };


  /*   To get the csp url  */
  AppModule.prototype.getCSPUrl = function (appPath) {
    var cspUrl = window.location.protocol + "//" + $(location).attr(
      'hostname') + appPath.toString();
    localStorage.setItem("appPath", appPath);
    return appPath;
  };

  /*Bind focus out for validation*/
  AppModule.prototype.validateFormFields = function (translations, isOnload) {

    /* Function written to remove pre-filled email from the input */
    var retrieve_val = $('input');
    retrieve_val.removeAttr('autocomplete', 'new-password_random');

    if ($('.contactFormFields').length) {

      //clearRequiredFieldMsg();  -- Commenting to fix OCSP-4236

      // AppModule.prototype.clearCustomMessages(translations);
      // AppModule.prototype.initateRequiredFields(translations);
      //Bind focus out for phone number field
      $('.phoneNumber').off('focusout').on('focusout', function () {
        var componentId = $(this).attr('id');
        var componentValue = $(this).val();

        //If user input value, then validate with regex
        //if (componentValue != "") {  -- Commenting as it was displaying 2 error msgs
        var msgs = [];
        if (document.getElementById(componentId).rawValue !== null && document.getElementById(componentId).rawValue != "") {
          if (document.getElementById(componentId).rawValue.trim() !="") {

            var phoneRegEx = /^\(?(\d{3})\)?-?\s?(\d)[^A-Za-z]+(\d{1})$/;
            var match = phoneRegEx.test(componentValue);
            if (!match) {
              //Get the error message to show from resource bundle
              var phInvalidMsg = AppModule.prototype.getMessageFromBundle(translations,'CONTACT_US_PHONENUMBER_INVALID_FORMAT');

              msgs.push({
                summary: phInvalidMsg,
                detail: phInvalidMsg,
                type: "Error"
              });
              $(this)[0].setProperty("messagesCustom", msgs);
              $(this)[0].showMessages();
            }
          } else {
            var phInvalidMsg1 = AppModule.prototype.getMessageFromBundle(translations,'CONTACT_US_PHONENUMBER_INVALID_FORMAT');

            msgs.push({
              summary: phInvalidMsg1,
              detail: phInvalidMsg1,
              type: "Error"
            });
            $(this)[0].setProperty("messagesCustom",msgs);
          }
        } else if (document.getElementById(componentId).rawValue == "") {
        } else {
          msgs.length = 0;
          $(this).val('');
          $(this)[0].reset();
        }
      });

      // CSP-5944 : Order number general validation for alpjnumeric for now.
      $('.orderNumber').off('focusout').on('focusout', function () {

        var componentId = $(this).attr('id');
        var componentValue = $(this).val();

        //If user input value, then validate with order regex
        if (document.getElementById(componentId).rawValue !== null && document.getElementById(componentId).rawValue !="") {
          var orderRegex = /^[A-Za-z0-9]{1,20}$/;
          var match = orderRegex.test(document.getElementById(componentId).rawValue);
          var invalidMsg = AppModule.prototype.getMessageFromBundle(translations,'INVALID_ORDER_NUMBER');
          if (!match) {
            var msgs = [];
            msgs.push({
              summary: invalidMsg,
              detail: invalidMsg,
              type: "Error"
            });
            $('.orderNumber')[0].setProperty("messagesCustom",msgs);
            $('.orderNumber')[0].showMessages();
          }
        }
      });


      // City Validation
      //       $('.cityField').off('focusout').on('focusout', function() {
      //        var componentId = $(this).attr('id');
      //           var componentValue = $(this).val();

      //           //If user input value, then validate with regex
      //           //if (componentValue != "") {  -- Commenting as it was displaying 2 error msgs
      //           var msgs = [];
      //           if (document.getElementById(componentId).rawValue.trim() !==
      //             null &&
      //             document.getElementById(componentId).rawValue.trim() !=
      //             "") {
      //             if (document.getElementById(componentId).rawValue.trim() !=
      //               "") {

      // // Included as part of OCSP-4789 where city field should accept only alphabets
      //               // var regexStr = /^[a-zA-Z]+$/; OCSP-5203
      //               var regexStr = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;

      //               var match = regexStr.test(componentValue);
      //               if (!match) {
      //                 //Get the error message to show from resource bundle
      //                 var amInvalidMsg = AppModule.prototype
      //                   .getMessageFromBundle(
      //                     translations,
      //                     'INVALID_CITY'
      //                   );

      //                 msgs.push({
      //                   summary: amInvalidMsg,
      //                   detail: amInvalidMsg,
      //                   type: "Error"
      //                 });
      //                 $('.cityField')[0].setProperty(
      //                   "messagesCustom",
      //                   msgs);
      //                 $('.cityField')[0].showMessages();
      //               }
      //             } else {
      //               var amInvalidMsg1 = AppModule.prototype
      //                 .getMessageFromBundle(
      //                   translations,
      //                   'INVALID_CITY'
      //                 );

      //               msgs.push({
      //                 summary: amInvalidMsg1,
      //                 detail: amInvalidMsg1,
      //                 type: "Error"
      //               });
      //               $('.cityField')[0].setProperty(
      //                 "messagesCustom",
      //                 msgs);
      //             }
      //           } else {
      //             // msgs.length = 0;
      //             // $('.cityField').val('');
      //             // $('.cityField')[0].reset();
      //             //ocsp-5205
      //             $('.cityField')[0].showMessages(); error.push('error');
      //           }
      //  // End of OCSP-4789 issue validation script where city field should accept only alphabets
      //       });

      // Amount Validation
      $('.amountField').off('focusout').on('focusout', function () {
        var componentId = $(this).attr('id');
        var componentValue = $(this).find(':first-child').val();
        //If user input value, then validate with zipcode regex
        if (componentValue != "") {


          var match = RegExp(amountRegex).test(componentValue);
          if (!match) {
            setTimeout(function () {
              //Get the error message to show from resource bundle through hidden field on the page                        
              var amountInvalidMsg = $('.amountInvalidMsg')
                .html();
            }, 1);
          }
        }
      });

      //     Regex Validation for Amount in RR Form   
      $('.reimbursementAmountField').off('focusout').on('focusout',
        function () {
          var componentId = $(this).attr('id');
          var componentValue = $(this).val();

          //If user input value, then validate with regex
          //if (componentValue != "") {  -- Commenting as it was displaying 2 error msgs
          var msgs = [];
          if (document.getElementById(componentId).rawValue.trim() !==
            null &&
            document.getElementById(componentId).rawValue.trim() !=
            "") {
            if (document.getElementById(componentId).rawValue.trim() !=
              "") {

              var amountRegEx =
                /^[\d]{0,16}?([\.]\d{1,2})?$/;

              var match = amountRegEx.test(componentValue);
              if (!match) {
                //Get the error message to show from resource bundle
                var amInvalidMsg = AppModule.prototype
                  .getMessageFromBundle(
                    translations,
                    'INVALID_AMOUNT'
                  );

                msgs.push({
                  summary: amInvalidMsg,
                  detail: amInvalidMsg,
                  type: "Error"
                });
                $('.reimbursementAmountField')[0].setProperty(
                  "messagesCustom",
                  msgs);
                $('.reimbursementAmountField')[0].showMessages();
              }
            } else {
              var amInvalidMsg1 = AppModule.prototype
                .getMessageFromBundle(
                  translations,
                  'INVALID_AMOUNT'
                );

              msgs.push({
                summary: amInvalidMsg1,
                detail: amInvalidMsg1,
                type: "Error"
              });
              $('.reimbursementAmountField')[0].setProperty(
                "messagesCustom",
                msgs);
            }
          } else {
            msgs.length = 0;
            $('.reimbursementAmountField').val('');
            $('.reimbursementAmountField')[0].reset();
          }
        });

      //     Regex Validation for Amount for USD in RR Form   
      $('.amountPaidField').off('focusout').on('focusout', function () {
        var componentId = $(this).attr('id');
        var componentValue = $(this).val();

        //If user input value, then validate with regex
        //if (componentValue != "") {  -- Commenting as it was displaying 2 error msgs
        var msgs = [];
        if (document.getElementById(componentId).rawValue.trim() !==
          null &&
          document.getElementById(componentId).rawValue.trim() !=
          "") {
          if (document.getElementById(componentId).rawValue.trim() !=
            "") {

            var amountRegEx =
              /^\s*-?(\d+(\.\d{1,2})?|\.\d{1,2})\s*$/;

            var match = amountRegEx.test(componentValue);
            if (!match) {
              //Get the error message to show from resource bundle
              var amInvalidMsg = AppModule.prototype
                .getMessageFromBundle(
                  translations,
                  'INVALID_AMOUNT'
                );

              msgs.push({
                summary: amInvalidMsg,
                detail: amInvalidMsg,
                type: "Error"
              });
              $('.amountPaidField')[0].setProperty("messagesCustom",
                msgs);
              $('.amountPaidField')[0].showMessages();
            }
          } else {
            var amInvalidMsg1 = AppModule.prototype
              .getMessageFromBundle(
                translations,
                'INVALID_AMOUNT'
              );

            msgs.push({
              summary: amInvalidMsg1,
              detail: amInvalidMsg1,
              type: "Error"
            });
            $('.amountPaidField')[0].setProperty("messagesCustom",
              msgs);
          }
        } else {
          msgs.length = 0;
          $('.amountPaidFieldd').val('');
          $('.amountPaidField')[0].reset();
        }
      });

      // CSP-5943 : ZIP code validation for US and Canada.
      $('.zipcodeusca').off('focusout').on('focusout', function () {
        var componentId = $(this).attr('id');
        var componentValue = $(this).find(':first-child').val();
        //If user input value, then validate with zipcode regex
        if (componentValue != "") {


          var zipcodeRegex = $('.zipcodeRegex').html();
          var match = RegExp(zipcodeRegex).test(componentValue);
          if (!match) {
            setTimeout(function () {
              //Get the error message to show from resource bundle through hidden field on the page                        
              var zipcodeInvalidMsg = $('.zipcodeInvalidMsg')
                .html();
            }, 1);
          }
        }
      });

      // CSP-5943 : Sort code validation for UK
      $('.sortcode').off('focusout').on('focusout', function () {
        var componentId = $(this).attr('id');
        var componentValue = $(this).find(':first-child').val();
        //If user input value, then validate with zipcode regex
        if (componentValue != "") {


          var sortCodeRegex = $('.sortCodeRegex').html();
          var match = RegExp(sortCodeRegex).test(componentValue);
          if (!match) {
            setTimeout(function () {
              //Get the error message to show from resource bundle through hidden field on the page                        
              var sortCodeInvalidMsg = $(
                '.sortCodeInvalidMsg').html();

            }, 1);
          }
        }
      });

      // CSP-5943 : Sort code validation for UK
      $('.dop').off('focusout').on('focusout', function () {
        var componentId = $(this).attr('id');
        var componentValue = $(this).find(':first-child').val();
        //If user input value, then validate with zipcode regex
        if (componentValue != "") {


          var dopRegex = $('.dopRegex').html();
          var match = RegExp(dopRegex).test(componentValue);
          if (!match) {
            setTimeout(function () {
              //Get the error message to show from resource bundle through hidden field on the page                        
              var dopInvalidMsg = $('.dopInvalidMsg').html();

            }, 1);
          }
        }
      });

      // CSP-5943 : SR Number validation.
      $('.srNumber').off('focusout').on('focusout', function () {
        var componentId = $(this).attr('id');
        var componentValue = $(this).val();
        var msgs = [];
        if (document.getElementById(componentId).rawValue !==
          null &&
          document.getElementById(componentId).rawValue !=
          "") {


          //var srNumLengthRegex = /^[0-9]{10}$/;
          //var srNumLengthRegex = /^[a-zA-Z0-9-]{12}$/;
          var srNumLengthRegex = /^1-[0-9]{7,28}$/;
          var match = srNumLengthRegex.test(document.getElementById(
            componentId).rawValue);
          if (!match) {
            //Get the error message to show from resource bundle
            var srNumLengthInvalidMsg = AppModule.prototype
              .getMessageFromBundle(
                translations, 'POP_SRNUMBER_ERROR_MSG'
              );

            msgs.push({
              summary: srNumLengthInvalidMsg,
              detail: srNumLengthInvalidMsg,
              type: "Error"
            });
            $('.srNumber')[0].setProperty("messagesCustom", msgs);
            $('.srNumber')[0].showMessages();
          }
        } else {
          msgs.length = 0;
        }
      });

      //Email field validation
      $('.emailField').off('focusout').on('focusout', function () {
        var componentId = $(this).attr('id');
        var componentValue = $(this).val();
        var msgs = [];
        if (document.getElementById(
          "oj-input-text--161088032-2-emailid") && document
            .getElementById(
              "oj-input-text--161088032-2-emailid").value) {
          document.getElementById(
            "oj-input-text--161088032-2-emailid").value = document
              .getElementById(
                "oj-input-text--161088032-2-emailid").value.trim();
        }
        // if (componentValue != "") {
        if (document.getElementById(componentId).rawValue !==
          null &&
          document.getElementById(componentId).rawValue !=
          "") {
          if (document.getElementById(componentId).rawValue.trim() !=
            "") {


            var checkEmailMatch = true;
            //OCSP-5514(Allowing any number of hyphens and dots in between:Puja)
            var regexStr =
              // /^(?=\s*[^@]{1,64}@)(([^\.@\s"(),:;<>@\[\]]([^.@\s"(),:;<>@\[\]]|(\.)[^\.@\s"(),:;<>@\[\]]){0,})|(\"[^"@]*\"))@([^-@;,\s.'!#$%&*"+\/=?^_`{|}~][^@;,\s.'!#$%&*"+\/=?^_`{|}~]{0,}((?:\.[^@;,\s.'!#$%&*"+\/=?^_`{|}~]{2,}))?)\.([^@;,\s.'!#$%&*"+\/=?^_`{|}~]{1,}((?:\.[^@;,\s.'!#$%&*"+\/=?^_`{|}~]{1,}))?[^-@;,\s.'!#$%&*"+\/=?^_`{|}~])$/;
              /^(?=\s*[^@]{1,64}@)(([^\.@\s"(),:;<>@\[\]]([^.@\s"(),:;<>@\[\]]|(\.)[^\.@\s"(),:;<>@\[\]]){0,})|(\"[^"@]*\"))@([^-@;,\s.'!#$%&*"+\/=?^_`{|}~][^@;,\s.'!#$%&*"+\/=?^_`{|}~]{0,}((?:\.[^@;,\s.'!#$%&*"+\/=?^_`{|}~]{2,}))?)\.([^@;,\s.'!#$%&*"+\/=?^_`{|}~]{1,}((?:\.[^@;,\s'!#$%&*"+\/=?^_`{|}~]{1,}))?[^-@;,\s.'!#$%&*"+\/=?^_`{|}~])$/;
            var isMatch = regexStr.test(document.getElementById(
              componentId).rawValue.trim());

            if (!isMatch) {
              checkEmailMatch = false;
              var emailInvalidMsg = AppModule.prototype
                .getMessageFromBundle(
                  translations, 'CONTACT_US_EMAIL_FORMAT_INVALID');

              msgs.push({
                summary: emailInvalidMsg,
                detail: emailInvalidMsg,
                type: "Error"
              });
              $(this)[0].setProperty("messagesCustom", msgs);
              $(this)[0].showMessages();
            } else {
              var msgs1 = [];
              $(this)[0].setProperty("messagesCustom",
                msgs1);
            }
          } else {
            var emailInvalidMsg1 = AppModule.prototype
              .getMessageFromBundle(
                translations, 'CONTACT_US_EMAIL_FORMAT_INVALID');

            msgs.push({
              summary: emailInvalidMsg1,
              detail: emailInvalidMsg1,
              type: "Error"
            });
            $(this)[0].setProperty("messagesCustom", msgs);
          }

          //Validate if verify email is same as contact email after tab out of verify email
          if ($(this).hasClass('verifyEmail') && checkEmailMatch) {
            // var contactEmailValue = $('.contactEmail')[0].value;  -- OCSP-5531
            var contactEmailValue = document.getElementsByClassName("contactEmail")[0].rawValue;
            if (contactEmailValue && contactEmailValue.trim()
              .toLowerCase() !=
              componentValue.trim().toLowerCase()) {
              var emailNoMatchMsg = AppModule.prototype
                .getMessageFromBundle(
                  translations, 'CONTACT_US_EMAIL_NO_MATCH');
              //$('.emailNoMatchMsg')[0].value
              var msgs2 = [];
              msgs2.push({
                summary: emailNoMatchMsg,
                detail: emailNoMatchMsg,
                type: "Error"
              });
              $('.verifyEmail')[0].setProperty("messagesCustom",
                msgs2);
              $('.verifyEmail')[0].showMessages();

            } else {
              var msgs1 = [];
              $('.verifyEmail')[0].setProperty("messagesCustom",
                msgs1);
            }
          }

          //Validate if verify email is same as contact email after tab out of contact email
          if ($(this).hasClass('contactEmail') && checkEmailMatch) {
            // var verifyEmailValue = $('.verifyEmail')[0].value;  -- OCSP-5531
            var verifyEmailValue = document.getElementsByClassName("verifyEmail")[0].rawValue;
            if (verifyEmailValue && verifyEmailValue.trim()
              .toLowerCase() !=
              componentValue.trim().toLowerCase()) {
              var emailNoMatchMsg1 = AppModule.prototype
                .getMessageFromBundle(
                  translations, 'CONTACT_US_EMAIL_NO_MATCH');
              var msgs1 = [];
              msgs1.push({
                summary: emailNoMatchMsg1,
                detail: emailNoMatchMsg1,
                type: "Error"
              });
              $('.verifyEmail')[0].setProperty("messagesCustom",
                msgs1);
              $('.verifyEmail')[0].showMessages();
            } else {
              var msgs1 = [];
              $('.verifyEmail')[0].setProperty("messagesCustom",
                msgs1);
            }
          }
        } else if (document.getElementById(componentId).rawValue === "") {
        } else {
          msgs.length = 0;
          $(this).val('');
          $(this)[0].reset();

        }
      });

      $('.verifyEmail input').off('copy paste').on('copy paste',
        function (
          e) {
          e.preventDefault();
        });
    }
  };



  function clearRequiredFieldMsg() {
    if ($('.contactFormFields').length) {
      //Bind focus out for phone number field
      $('.requiredField').off('keyup').on('keyup', function () {
        var componentId = $(this).attr('id');
        var componentValue = $(this)[0].rawValue;
        if ($.trim(componentValue) == "") {
          $('#' + componentId)[0].reset();
          $('#' + componentId).val(componentValue);
          var msgs = [];
          $('#' + componentId)[0].setProperty("messagesCustom",
            msgs);

        } else {
          var msgs1 = [];
          $('#' + componentId)[0].setProperty("messagesCustom",
            msgs1);
        }
      });
    }
  };
  //   validation for required fields*/
  AppModule.prototype.clearCustomMessages = function (translations) {
    $(".requiredField").each(function (index) {
      var componentId = $(this).attr('id');
      if ($.trim(document.getElementById(componentId).value) == "") {
        var msgs1 = [];
        $(this)[0].setProperty("messagesCustom",
          msgs1);
      }
    });
  };

  /*validation for required fields*/
  AppModule.prototype.initateRequiredFields = function (translations) {
    $(".requiredField").each(function (index) {
      var requiredMsg = AppModule.prototype.getMessageFromBundle(
        translations, 'REQUIRED_FIELD_MSG');
      $(this)[0].setProperty(
        "translations.required.messageDetail",
        requiredMsg);
    });
  };




  AppModule.prototype.compareEmails = function (arg2, arg3) {
    var emailregexStr = "([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})";
    return [{

      validate: function (value) {
        if (document.getElementById("csemail")) {
          if (document.getElementById("csemail").rawValue != null) {
            let email = document.getElementById("csemail").rawValue.trim();

            let compareTo = email;
            if (value) {
              if (!value.match(emailregexStr)) {
                throw new Error(arg3);
              }
              else if (value.length > 80) {
                throw new Error(arg3);

              }
              else if (value !== compareTo) {
                throw new Error(arg2);

              }


            }
          }
          else {
            if (!value.match(emailregexStr)) {
              throw new Error(arg3);
            }
            else if (value.length > 80) {
              throw new Error(arg3);

            }
            else {
              throw new Error(arg2);
            }
          }
        }


      }



    }];
  };


  AppModule.prototype.getMessageFromBundle = function (translations, key) {
    return translations.format('csp', key);
  };

  AppModule.prototype.getCSPLocaleIdentifiers = function (countryCode,
    locales) {
    var languageCode = "";

    for (var i = 0; i < locales.length; i++) {
      if (locales[i].countryCode === countryCode) {
        languageCode = locales[i].localIdentifier;
        return languageCode;

      }
    }
  };

  AppModule.prototype.getLocaleFromContinentCode = function (
    continentCode) {
    if (continentCode == "NA" || continentCode == "SA")
      return "en-US";
    if (continentCode == "AF" || continentCode == "EU" ||
      continentCode ==
      "AN")
      return "en-GB";

    if (continentCode == "AS" || continentCode == "OC")
      return "en-AU";

  };

  /**
   * Added to load auto suggest array on page load
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.getAutoSuggestPageLoad = function (autoSuggestResp,
    translations) {
    csp.autoSuggestPageLoad(autoSuggestResp, translations);
  };

  /**
   * Added to load top articles array on page load
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.getTopArticlesPageLoad = function (topArticlesResp, translations) {
    csp.topArticlesPageLoad(topArticlesResp, translations);
  };


  AppModule.prototype.checkBrowserLocale = function (paramName) {
    $.urlParam = function (name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(
        window.location.href);
      if (results == null) {
        return null;
      }

      return decodeURI(results[1]) || 0;
    };
    return $.urlParam(paramName);
  };

  AppModule.prototype.getBrowserName = function (browserResp) {
    var ua = navigator.userAgent.toLowerCase();
    var isMac = navigator.platform.toLowerCase().indexOf('mac') >= 0;

    var BrowserArr = [];
    for (var i = 0; i < browserResp.length; i++) {
      BrowserArr.push(browserResp[i].LookupCode);
    }

    /* IE10+ & EDGE */
    //All Standards and Compatibility Mode
    var browserName;
    var uag = window.navigator.userAgent,
      onlyIEorEdge = /msie\s|trident\/|edge\//i.test(uag) && !!(
        document.uniqueID ||
        window.MSInputMethodContext),
      checkVersion = (onlyIEorEdge && +(
        /(edge\/|rv:|msie\s)([\d.]+)/i.exec(
          uag)[2])) || NaN;

    // Added to fix OCSP-3865    
    if (window.navigator.userAgent.indexOf("Edg/") > -1 || window.navigator.userAgent.indexOf("Edge") > -1||window.navigator.userAgent.match(/edg/i)) {
      if (BrowserArr.includes('EDGE')) {
        browserName = "EDGE";
      }
    }

    //Added edge of chromium and Opera to match with payload
    else if (window.navigator.userAgent.indexOf("Edge on Chromium") > -1) {
      if (BrowserArr.includes('Edge on Chromium')) {
        browserName = "Edge on Chromium";
      }
    }
    else if (window.navigator.userAgent.indexOf("Opera") > -1 || window.navigator.userAgent.indexOf("OPR") > -1) {
      if (BrowserArr.includes('OPERA')) {
        browserName = "OPERA";
      }
    }
    //Removed Firefox as it is not present in the OEC API response and will navigate to Other 
    else if (window.navigator.userAgent.indexOf("Firefox") > -1) {
      if (BrowserArr.includes('FIREFOX')) {
        browserName = "FIREFOX";
      }
    }

    else if (!isNaN(checkVersion)) {
      if (checkVersion >= 12) {
        if (BrowserArr.includes("EDGE")) {
          browserName = "EDGE";
        }
      } else {
        if (BrowserArr.includes("IE_" + checkVersion)) {
          browserName = "IE_" + checkVersion;
        }
      }
    }  //separate return was written at bottom 


    else if (ua.indexOf('safari') != -1) {
      if (ua.indexOf('chrome') > -1) {
        if (BrowserArr.includes('CHROME')) {
          browserName = "CHROME";
        }
      } else {
        if (BrowserArr.includes('SAFARI')) {
          browserName = "SAFARI";
        }
      }
    }  //separate return

    else if (isMac) {
      if (ua.indexOf('safari') != -1) {
        if (ua.indexOf('chrome') > -1) {
          if (BrowserArr.includes('SAFARI')) {
            browserName = "SAFARI";
          }
        }
      }
      if (ua.indexOf('firefox') != -1) {
        if (BrowserArr.includes('FIREFOX')) {
          browserName = "FIREFOX";
        }
      }
    }
    return browserName;
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.redirectArticleViewPage = function (locale) {

    var fromAutoSuggest = true;
    var articleId = document.getElementById("topArticleId").value;
    window.location.href = "./" +
      "?page=shell&shell=article-view&articleId=" + articleId +
      "&fromAutoSuggest=" + fromAutoSuggest + "&locale=" + locale +
      " ";

    document.getElementById("topArticleId").value = "";
    document.getElementById("autoSuggestSearchTerm").value = "";

  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.getSearchTermString = function (arg1) {
    var value = document.getElementById('avSearchbox|input').value;
    return value.normalize('NFKC');
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.getAutoSuggestTermString = function (arg1) {
    var value = document.getElementById('autoSuggestSearchTerm').value;
    return value;
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.loadSearchTermResults = function (kbsearchString,
    communitySearchString) {

    //window.location.href = "./" + "?page=shell&shell=search";
    var term = document.getElementById('avSearchbox|input').value;
    window.location.href = "./" + "?page=shell&shell=search" +
      "&term=" +
      term + "&platform=blank";
  };


  /*    To return the cookie */
  AppModule.prototype.getCookieValue = function (cookieName) {
    return $.cookie(cookieName);
  };

  // set the platform to blank for the search mode

  AppModule.prototype.setPlatform = function (arg1) {

    return " ";
  };


  AppModule.prototype.navigateToMcafeeHomSite = function (sessionLocaleCd) {
    window.open(
      "https://home.mcafee.com/secure/protected/login.aspx?culture=" +
      sessionLocaleCd, "_blank");
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.getAutoSuggest = function (autoSuggestString) {
    if (autoSuggestString.length == 0) {
      return 1;
    } else {
      return 0;
    }
  };

  AppModule.prototype.getTopArticles = function (topArticles) {
    if (typeof topArticles == "undefined" || topArticles.responseCol
      .length ==
      0) { // OCSP-3236: For top articles translation
      return 1;
    } else {
      return 0;
    }
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  /*check for user session time out from the time he logged in*/
  AppModule.prototype.checkForUserSessionTimeOut = function (
    userSessionLoginStartTime) {
    // alert("Login time :"+userSessionLoginStartTime);
    // alert("Current time :"+new Date());

    var loginStartTime = '';
    var currentTime = new Date();
    var msec = '';
    var mins = '';
    var hrs = '';
    var days = '';
    var yrs = '';
    var status = "false";

    if (userSessionLoginStartTime != "0") {
      //  alert("In if loop");
      loginStartTime = new Date(userSessionLoginStartTime);
      msec = currentTime - loginStartTime;
      mins = Math.floor(msec / 60000);
      //alert("Num. of mins: "+mins);
      hrs = Math.floor(mins / 60);
      days = Math.floor(hrs / 24);
      yrs = Math.floor(days / 365);

      if (mins >= 15) { // Logout if the session timeout is > 3
        status = ">2";
      } else { // Keep logged in and re-assign  the userSessionLoginStartTime 
        status =
          "<2"; // to current time if the session time is not exceeeding the timeout limit 
      }
    } else if (userSessionLoginStartTime == "0") {
      // alert("In else loop");
      status = "=0";
    }

    return status;
  };
  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.getCurrentDate = function () {
    var currDate = new Date();
    return currDate;
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.callPreLoader = function () {
    $("#preloadImg").css({
      "background": "none",
      "display": "table"
    });
    $("#load-text").text("Please Wait...");
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.callPreLoaderSearch = function () {

    $("#preloadImgSearch").css({
      "background": "none",
      "display": "table"
    });
    $("#load-text").text("Please Wait...");
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.closePreLoader = function () {
    $("#preloadImg").css({
      "background": "none",
      "display": "none"
    });
    $("#preloadImgSearch").css({
      "background": "none",
      "display": "none"
    });
  };


  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.extractYear = function (custJoinYear) {
    custJoinYear = custJoinYear.substr(-4);
    return custJoinYear;
  };



  //To disable signin link on successfull authentication in recent SR Login
  AppModule.prototype.disableSignInLink = function () {
    if (window.innerWidth < 1024) {
      document.getElementById("loginbtn-mobile").style.display = "none";
      document.getElementById("logoutbtn-mobile").style.display = "block";
    }
    else {
      document.getElementById("loginbtn").style.display = "none";
      document.getElementById("logoutbtn").style.display = "block";
    }
  };


  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.getEnvType = function (arg1) {
    var currentEnv = null;
    var currentURL = window.location.href;
    if (currentURL.indexOf("dev1") > -1 || currentURL.indexOf("service-dev") > -1 || (currentURL.indexOf("dev2") > -1) ||
      (currentURL.indexOf("service-qa") > -1)) {
      currentEnv = 'dev1';
    }

    else if (currentURL.indexOf("ejjq-test-apps1") > -1 || currentURL.indexOf("service-test") > -1) { //Removing "test" check for Prod content issue
      currentEnv = 'test';
    }

    else if ((currentURL.indexOf("dev3") > -1) || (currentURL.indexOf("service-training") > -1) ||
      (currentURL.indexOf("mcafee-uat.mcafee.com/support") > -1)) {
      currentEnv = 'dev3';
    }
    else if ((currentURL.indexOf("ejjq-apps6") > -1) || (currentURL.indexOf("service.mcafee.com") > -1) ||
      (currentURL.indexOf("mcafee.com/support") > -1)) {
      currentEnv = 'prod';
    }
    return currentEnv;
  };


  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.setPlatformUrls = function (currentLocale,
    platformUrls) {
    platformUrls.pcUrl =
      "?page=shell&shell=search&platform=pc&term=*&locale=" +
      currentLocale;
    platformUrls.macUrl =
      "?page=shell&shell=search&platform=mac&term=*&locale=" +
      currentLocale;
    platformUrls.mobileUrl =
      "?page=shell&shell=search&platform=mobile&term=*&locale=" +
      currentLocale;
    platformUrls.accInfoUrl =
      "?page=shell&shell=search&platform=Account or Billing&term=*&locale=" +
      currentLocale;
    platformUrls.idtpUrl =
      "?page=shell&shell=search&platform=Identity Theft Protection&term=*&locale=" +
      currentLocale;
    return platformUrls;

  };

  AppModule.prototype.populateLocalesDp = function (results) {
    //     self.languaguesDP = new ojs(Object.values(results), {
    //       keyAttributes: 'localeCode'
    //     });
    self.languaguesDP = new oj.ArrayDataProvider(Object.values(results), {
      keyAttributes: 'localeCode'
    });

  };

  AppModule.prototype.populateLocalesDp1 = function (status) {
    self.data = [];
    self.languaguesDP = new oj.ArrayDataProvider(self.data, {
      keyAttributes: 'localeCode'
    });
  };


  AppModule.prototype.getSelectedLocaleDetails = function (localeId) {
    var loacleItem;
    var match = ko.utils.arrayFirst(self.languaguesDP.data, function (
      item) {
      if (item.localeCode === localeId) {
        loacleItem = item;
      }
    });
    //to hide contactsupport floatinf blade    
    $('.anchor-links').hide();
    $('.scroll-nav-header-container').hide();
    return loacleItem;
  };


  /**
   *
   * @param {String} arg1
   * @return {String}
   * 
   */

  function splitMulti(str, tokens) {
    var tempChar = tokens[
      0]; // We can use the first token as a temporary join character
    for (var i = 1; i < tokens.length; i++) {
      str = str.split(tokens[i]).join(tempChar);
    }
    str = str.split(tempChar);
    return str;
  }

  AppModule.prototype.getAdminPercentageConfig = function (adminConfig,
    currentLocale) {

    // var uniqueSessionHistory = $.cookie("QSI_HistorySession");
    // var uniqueSessionNumbersUrls = uniqueSessionHistory.split("|");
    // var uniqueSessionNumbers = "";
    // for (var i = 0; i < uniqueSessionNumbersUrls.length; i++) {
    //   uniqueSessionNumbers += uniqueSessionNumbersUrls[i].split("~")[1] +
    //     ",";
    // }
    var uniqueSessionHistory = $.cookie("abTestingCookie");
    var uniqueSessionNumbers = uniqueSessionHistory + ",";
    var sessionNumber = localStorage.getItem('sessionNumber');


    var localesCountConfig = adminConfig.currentPageCount;
    var localesCountConfigSplit = splitMulti(localesCountConfig, [':',
      ','
    ]);
    var currentLocaleIndex = localesCountConfigSplit.indexOf(
      currentLocale);
    var currentLocaleCount = parseInt(localesCountConfigSplit[
      currentLocaleIndex +
      1]);



    var getHelpWithBladePercentageConfig = adminConfig.ghwPercentConfig;
    var ghwPercentageSplit = splitMulti(getHelpWithBladePercentageConfig,
      [
        ':',
        ','
      ]);
    var currentLocaleGHWIndex = ghwPercentageSplit.indexOf(
      currentLocale);
    var currentLocaleGHWPercentage = parseInt(ghwPercentageSplit[
      currentLocaleGHWIndex + 1]);


    var updateLocalesCount = '';
    var cslocalesCountConfig = adminConfig.csCurrentPageCount;
    var cslocalesCountConfigSplit = splitMulti(cslocalesCountConfig, [':',
      ','
    ]);
    var cscurrentLocaleIndex = cslocalesCountConfigSplit.indexOf(
      currentLocale);
    var cscurrentLocaleCount = parseInt(cslocalesCountConfigSplit[
      cscurrentLocaleIndex +
      1]);



    var csPercentageConfig = adminConfig.contactSupportLocalePer;
    var csPercentageSplit = splitMulti(csPercentageConfig,
      [
        ':',
        ','
      ]);
    var currentLocaleCSIndex = csPercentageSplit.indexOf(
      currentLocale);
    var currentLocaleCSPercentage = parseInt(csPercentageSplit[
      currentLocaleCSIndex + 1]);


    var csupdateLocalesCount = '';

     var malocalesCountConfig = adminConfig.mcAfeeAssistCurrentPageCount;
    var malocalesCountConfigSplit = splitMulti(malocalesCountConfig, [':',
      ','
    ]);
    var macurrentLocaleIndex = malocalesCountConfigSplit.indexOf(
      currentLocale);
    var macurrentLocaleCount = parseInt(malocalesCountConfigSplit[
      macurrentLocaleIndex +
      1]);



    var maPercentageConfig = adminConfig.mcAfeeAssistLocalePer;
    var maPercentageSplit = splitMulti(maPercentageConfig,
      [
        ':',
        ','
      ]);
    var currentLocaleMAIndex = maPercentageSplit.indexOf(
      currentLocale);
    var currentLocaleMAPercentage = parseInt(maPercentageSplit[
      currentLocaleMAIndex + 1]);


    var maupdateLocalesCount = '';

    if ((sessionNumber == null) || (sessionNumber == 'undefined')) {
      currentLocaleCount++;
      cscurrentLocaleCount++;
      macurrentLocaleCount++;

      if (currentLocaleCount <= 100) {
        localesCountConfigSplit[currentLocaleIndex + 1] =
          currentLocaleCount;
        for (var count = 0; count < localesCountConfigSplit
          .length; count++) {
          updateLocalesCount = updateLocalesCount +
            localesCountConfigSplit[count] + ':' +
            localesCountConfigSplit[
            count + 1] + ',';
          count++;
        }
        updateLocalesCount = updateLocalesCount.slice(0, -1);
        adminConfig.currentPageCount = updateLocalesCount;
      }

      if (currentLocaleCount > 100) {
        localesCountConfigSplit[currentLocaleIndex + 1] =
          1;
        for (var count2 = 0; count2 < localesCountConfigSplit
          .length; count2++) {
          updateLocalesCount = updateLocalesCount +
            localesCountConfigSplit[count2] + ':' +
            localesCountConfigSplit[
            count2 + 1] + ',';
          count2++;
        }
        updateLocalesCount = updateLocalesCount.slice(0, -1);
        adminConfig.currentPageCount = updateLocalesCount;
      }


      if (currentLocaleCount <= currentLocaleGHWPercentage)
        adminConfig.displayGethelpwithBlade = "true";
      else {
        adminConfig.displayGethelpwithBlade = "false";
      }



      if (cscurrentLocaleCount <= 100) {
        cslocalesCountConfigSplit[cscurrentLocaleIndex + 1] =
          cscurrentLocaleCount;
        for (var cscount = 0; cscount < cslocalesCountConfigSplit
          .length; cscount++) {
          csupdateLocalesCount = csupdateLocalesCount +
            cslocalesCountConfigSplit[cscount] + ':' +
            cslocalesCountConfigSplit[
            cscount + 1] + ',';
          cscount++;
        }
        csupdateLocalesCount = csupdateLocalesCount.slice(0, -1);
        adminConfig.csCurrentPageCount = csupdateLocalesCount;
      }

      if (cscurrentLocaleCount > 100) {
        cslocalesCountConfigSplit[cscurrentLocaleIndex + 1] =
          1;
        for (var cscount2 = 0; cscount2 < cslocalesCountConfigSplit
          .length; cscount2++) {
          csupdateLocalesCount = csupdateLocalesCount +
            cslocalesCountConfigSplit[cscount2] + ':' +
            cslocalesCountConfigSplit[
            cscount2 + 1] + ',';
          cscount2++;
        }
        csupdateLocalesCount = csupdateLocalesCount.slice(0, -1);
        adminConfig.csCurrentPageCount = csupdateLocalesCount;
      }


      if (cscurrentLocaleCount <= currentLocaleCSPercentage)
        adminConfig.showNewCSFlow = "false";
      else {
        adminConfig.showNewCSFlow = "true";
      }

      	if (macurrentLocaleCount <= 100) {
        malocalesCountConfigSplit[macurrentLocaleIndex + 1] =
          macurrentLocaleCount;
        for (var macount = 0; macount < malocalesCountConfigSplit
          .length; macount++) {
          maupdateLocalesCount = maupdateLocalesCount +
            malocalesCountConfigSplit[macount] + ':' +
            malocalesCountConfigSplit[
            macount + 1] + ',';
          macount++;
        }
        maupdateLocalesCount = maupdateLocalesCount.slice(0, -1);
        adminConfig.mcAfeeAssistCurrentPageCount = maupdateLocalesCount;
      }

      if (macurrentLocaleCount > 100) {
        malocalesCountConfigSplit[macurrentLocaleIndex + 1] =
          1;
        for (var macount2 = 0; macount2 < malocalesCountConfigSplit
          .length; macount2++) {
          maupdateLocalesCount = maupdateLocalesCount +
            malocalesCountConfigSplit[macount2] + ':' +
            malocalesCountConfigSplit[
            macount2 + 1] + ',';
          macount2++;
        }
        maupdateLocalesCount = maupdateLocalesCount.slice(0, -1);
        adminConfig.mcAfeeAssistCurrentPageCount = maupdateLocalesCount;
      }
	  
	    if (macurrentLocaleCount <= currentLocaleMAPercentage)
        adminConfig.showAssistBanner = "false";
      else {
        adminConfig.showAssistBanner = "true";
      }

      localStorage.setItem("sessionNumber", uniqueSessionNumbers);

      return JSON.stringify(adminConfig).trim();
    }

    if (sessionNumber != null) {
      var concatSessionNumber = sessionNumber.concat(
        uniqueSessionNumbers);
      var arr = concatSessionNumber.split(',');
      if (hasDuplicates(arr)) {

        if (currentLocaleCount <= currentLocaleGHWPercentage)
          adminConfig.displayGethelpwithBlade = "true";
        else {
          adminConfig.displayGethelpwithBlade = "false";
        }

        //return JSON.stringify(adminConfig).trim();
      } else {
        currentLocaleCount++;
        if (currentLocaleCount >= 100) {
          localesCountConfigSplit[currentLocaleGHWIndex + 1] = 1;
          for (var count1 = 0; count1 < localesCountConfigSplit
            .length; count1++) {

            updateLocalesCount = updateLocalesCount +
              localesCountConfigSplit[count1] + ':' +
              localesCountConfigSplit[
              count1 + 1] + ',';
            count1++;
          }
          updateLocalesCount = updateLocalesCount.slice(0, -1);
          adminConfig.currentPageCount = updateLocalesCount;
        }

        if (currentLocaleCount <= currentLocaleGHWPercentage)
          adminConfig.displayGethelpwithBlade = "true";
        else {
          adminConfig.displayGethelpwithBlade = "false";
        }
      }

      var csconcatSessionNumber = sessionNumber.concat(
        uniqueSessionNumbers);
      var csarr = csconcatSessionNumber.split(',');
      if (hasDuplicates(csarr)) {

        if (cscurrentLocaleCount <= currentLocaleCSPercentage)
          adminConfig.showNewCSFlow = "false";
        else {
          adminConfig.showNewCSFlow = "true";
        }

        //return JSON.stringify(adminConfig).trim();
      } else {
        cscurrentLocaleCount++;
        if (cscurrentLocaleCount >= 100) {
          cslocalesCountConfigSplit[currentLocaleCSIndex + 1] = 1;
          for (var cscount1 = 0; cscount1 < cslocalesCountConfigSplit
            .length; cscount1++) {

            csupdateLocalesCount = csupdateLocalesCount +
              cslocalesCountConfigSplit[cscount1] + ':' +
              cslocalesCountConfigSplit[
              cscount1 + 1] + ',';
            cscount1++;
          }
          csupdateLocalesCount = csupdateLocalesCount.slice(0, -1);
          adminConfig.csCurrentPageCount = csupdateLocalesCount;
        }

        if (cscurrentLocaleCount <= currentLocaleCSPercentage)
          adminConfig.showNewCSFlow = "false";
        else {
          adminConfig.showNewCSFlow = "true";
        }
      }
        	        var maconcatSessionNumber = sessionNumber.concat(
        uniqueSessionNumbers);
      var maarr = maconcatSessionNumber.split(',');
      if (hasDuplicates(maarr)) {

        if (macurrentLocaleCount <= currentLocaleMAPercentage)
          adminConfig.showAssistBanner = "false";
        else {
          adminConfig.showAssistBanner = "true";
        }

        //return JSON.stringify(adminConfig).trim();
      } else {
        macurrentLocaleCount++;
        if (macurrentLocaleCount >= 100) {
          malocalesCountConfigSplit[currentLocaleCSIndex + 1] = 1;
          for (var macount1 = 0; macount1 < malocalesCountConfigSplit
            .length; macount1++) {

            maupdateLocalesCount = maupdateLocalesCount +
              malocalesCountConfigSplit[macount1] + ':' +
              malocalesCountConfigSplit[
              macount1 + 1] + ',';
            macount1++;
          }
          maupdateLocalesCount = maupdateLocalesCount.slice(0, -1);
          adminConfig.maCurrentPageCount = maupdateLocalesCount;
        }

        if (macurrentLocaleCount <= currentLocaleMAPercentage)
          adminConfig.showAssistBanner = "false";
        else {
          adminConfig.showAssistBanner = "true";
        }
	  
      
        localStorage.setItem("sessionNumber", uniqueSessionNumbers);

        // return JSON.stringify(adminConfig).trim();
      }
    }
    return JSON.stringify(adminConfig).trim();
  };


  /*Function checks whether the array contains duplicate values or not*/

  function hasDuplicates(array) {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < array.length; ++i) {
      var value = array[i];
      if (value in valuesSoFar) {
        return true;
      }
      valuesSoFar[value] = true;
    }
    return false;
  }
  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.convertToString = function (adminConfig) {

    return JSON.stringify(adminConfig).trim();
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.getAiseraDisplay = function (aiseraConfig) {

    aiseraCount = aiseraConfig.currentPageCount;
    aiseraPercentage = aiseraConfig.aiseraDisplayPercentage;

  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   * Method to get the parameters like articleId, locale from URL.
   */
  AppModule.prototype.getUrlParam = function (paramName) {

    $.urlParam = function (name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(
        window.location.href);
      if (results == null) {
        return null;
      }

      return decodeURI(results[1]) || 0;
    };
    return $.urlParam(paramName);

  };



  /**
   *
   * @param {String} arg1
   * @return {String}
   * Method to change the meta seo keywords dynamically for article-view page
   */
  AppModule.prototype.changeMetaKeywords = function (arg1) {
    // var $meta = $('meta[name=keywords]').attr('content', arg1);

  };


  /**
   *
   * @param {String} arg1
   * @return {String}
   * Method to change the meta description dynamically for article-view page
   */
  AppModule.prototype.changeMetaDescription = function (arg1) {
    //dynamically add the descr meta tag

    //  $('head').append( '<meta name="description" content="mcafee">' );
    //  var $meta = $('meta[name=description]').attr('content', arg1);

  };

  AppModule.prototype.getReferrerDetails = function (referrer) {
    var currentReferrer = document.referrer;
    referrer = currentReferrer;
    s.referrer = referrer;
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.getLocaleFromStorage = function () {
    return window.localStorage.getItem(
      'vbcs.languageSwitcherAppication.csplocale');
  };


  /* Aisera Analytics Code*/
  $(document).ready(function () {
    function isJSON(str) {
      try {
        return (JSON.parse(str) && !!str);
      } catch (e) {
        return false;
      }
    }
    window.addEventListener("message", function (event) {
      if (typeof event != "undefined") {
        var message = isJSON(event.data);
        if (message == true) {
          message = JSON.parse(event.data);
          if (message.type === "aisera.webchat.opened") {
            setSiteCatalystEvent2('va_aisera_opened');
            console.log("Webchat opened");
          } else if (message.type === "aisera.webchat.closed") {
            setSiteCatalystEvent2('va_aisera_closed');
            console.log("Webchat closed");
          }
        }
      }
    })
  });


  /*   if ($('body').hasClass("AiseraDisplay")) {
      if ($(".aiseraChatIcon").length > 0) {
        $(".aiseraChatIcon")[0].style.zIndex = "100 !important";
      }
    } else {
      if ($(".aiseraChatIcon").length > 0) {
        $(".aiseraChatIcon")[0].style.zIndex = "20000 !important";
      }
    } */

  /*   function to call aisera chat icon analytics*/
  /*   $(document).on("click", ".aiseraChatIcon", function(e) {
      launchva();
      setSiteCatalystEvent2('va_nohold_icon');
    }); */

  /**
   *
   * @param {String} arg1
   * @return {String}
   */


  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.assignGetHelpWithBlade = function (adminConfig) {
    var adminConfigObject = JSON.parse(adminConfig);
    return adminConfigObject.displayGethelpwithBlade;
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  //   Seo Meta Localization- Puja
  AppModule.prototype.seoLocalize = function (arg1) {
    var descriptionContent = AppModule.prototype
      .getMessageFromBundle(
        arg1,
        'META_DESCRIPTION'
      );


    var keyWordContent = AppModule.prototype
      .getMessageFromBundle(
        arg1,
        'META_KEYWORD'
      );
    $('meta[name=keywords]').attr('content', keyWordContent);

    $('meta[name=description]').attr('content', descriptionContent);


  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.IEAlertMessage = function (arg1) {

    var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
    var msie = ua.indexOf('MSIE '); // IE 10 or older
    var trident = ua.indexOf('Trident/'); //IE 11

    if (msie > 0 || trident > 0) {
      alert("Sorry, Microsoft Internet Explorer 11 is not supported. Please upgrade to the latest version of Chrome, Firefox, Microsoft Edge, Safari or Opera to view the McAfee Customer Service website.");
    }

  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.checkForSRNumberURL = function (arg1) {
    var currentURL = window.location.href;
    if (currentURL.indexOf("SR=") > -1) {
      var srValue = currentURL.substring(currentURL.indexOf("SR=") + 3, currentURL.length);
      return srValue;
    }
    return arg1;
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */

  AppModule.prototype.emailValidator = function (arg1) {
    // return [{
    //   type: 'regExp',
    //   options: {
    //     pattern: "([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})",
    //     messageDetail: arg1
    //   }
    // },

    // {
    //   type: 'length',
    //   options: {
    //     max: "80",
    //     messageDetail: arg1
    //   }
    // }
    // ];
    // var emailregexStr = "([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})";
    // var emailregexStr = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,5})$";
    var emailregexStr = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,5})$";
    return [{

      validate: function (value) {
        if (value) {
          if (!value.match(emailregexStr)) {
            throw new Error(arg1);
          }
          else if (value.length > 80) {
            throw new Error(arg1);

          }


        }
      }
    }];
  };


  AppModule.prototype.assignNewCSFlow = function (adminConfig) {
    var adminConfigObject = JSON.parse(adminConfig);
    return adminConfigObject.showNewCSFlow;
  };

  AppModule.prototype.assignAssistBanner = function (adminConfig) {
    var adminConfigObject = JSON.parse(adminConfig);
    return adminConfigObject.showAssistBanner;
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.replaceRemoteControlURL = function (arg1) {
    var currentURL = window.location.href;
    var replacedURL = "";
    if (currentURL.indexOf("remote-control-pincodeLogMeInRescueResponse") > -1) {
      replacedURL = currentURL.replace('remote-control-pincodeLogMeInRescueResponse', 'remote-control-pincode&LogMeInRescueResponse');
      window.location.href = replacedURL;
    }
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.showIDTP = function (currentLocale, IDTPLocales) {
    var showIDTP = IDTPLocales.indexOf(currentLocale) != -1;
    return showIDTP;
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.tokenvalidation = function (arg1) {
    if (arg1 != null && arg1 != undefined && arg1 != '') {
      var decodetoken = atob(arg1.split(".")[1]);
      var utcSeconds = decodetoken.slice(22, 32);
      var d = new Date(0); // The 0 there is the key, which sets the date to the epoch    
      d.setUTCSeconds(utcSeconds);
      var currdt = new Date();
      if (d > currdt) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  };


  AppModule.prototype.showTopSolution = function (currentLocale, TOPSolution) {
    var showTopSol;

    if (TOPSolution != "") {
      showTopSol = TOPSolution.indexOf(currentLocale) != -1;
    }

    return showTopSol;
  };

  AppModule.prototype.isFormValid = function (form) {

    var tracker = document.getElementById(form);

    console.log(tracker)

    if (tracker.valid === "valid") {
      return true;
    } else {
      tracker.showMessages();
      tracker.focusOn("@firstInvalidShown");
      return false;
    }
  };



  //phone field validation
  AppModule.prototype.phoneValidation = function (arg1) {
    var regex = /^\(?([0-9]{3})\)?-?[ ]?([0-9])[^A-Za-z!@#$%^&*=+`~]+([0-9]{1})$/;

    return [{
      validate: function (value) {
        var match = regex.test(value);
        console.log("this sis value", value);
        if (value) {

          if (!match) {
            throw new Error(arg1);
          }
        }
      }

    }];


  };


  AppModule.prototype.initAuth0 = function (auth0Config) {
    Auth0Utils.init(auth0Config);
  };

  AppModule.prototype.loginAuth0 = function (locale, targetUrl, currentPage) {
    Auth0Utils.login(locale, targetUrl, currentPage);
  };

  AppModule.prototype.logoutAuth0 = function (auth0Config, targetUrl) {
    Auth0Utils.logout(auth0Config, targetUrl);
  };

  AppModule.prototype.getUserInfoAuth0 = async function () {
    const user = Auth0Utils.getUserInfo();
    return user;
  };

  // ignore characters typed that are not numbers
  AppModule.prototype.eatNonNumbers = (event) => {
    let charCode = event.which ? event.which : event.keyCode;
    let char = String.fromCharCode(charCode);
    // Only allow ".0123456789" (and non-display characters)
    let replacedValue = char.replace(/[^0-9\.]/g, "");
    if (char !== replacedValue) {
      event.preventDefault();
    }
  };

  AppModule.prototype.setFormDetails = function (firstName, lastName, phNum, emailId, veryEmailId) {

    // for contact support & partnet sr form fields
    if (document.getElementById('csfirstName')) {
      document.getElementById('csfirstName').value = firstName;
    }

    if (document.getElementById('cslastName')) {
      document.getElementById('cslastName').value = lastName;
    }
    if (document.getElementById('csphnum')) {
      document.getElementById('csphnum').value = phNum;
    }
    if (document.getElementById('csemail')) {
      document.getElementById('csemail').value = emailId;
    }
    if (document.getElementById('csverifyemail')) {
      document.getElementById('csverifyemail').value = veryEmailId;
    }


    // for idtp form fields
    if (document.getElementById('oj-input-text--1491447382-1')) {
      document.getElementById('oj-input-text--1491447382-1').value = firstName;
    }

    if (document.getElementById('oj-input-text--1491447382-2')) {
      document.getElementById('oj-input-text--1491447382-2').value = lastName;
    }

    //incase of japanese

    if (document.getElementById('oj-input-text--1491447382-6')) {
      document.getElementById('oj-input-text--1491447382-6').value = lastName;
    }

    if ((window.location.href).indexOf("shell=partnersr") == -1) {
      if (document.getElementById('oj-input-text--1491447382-7')) {
        document.getElementById('oj-input-text--1491447382-7').value = firstName;
      }
    }
    //incase of japanese

    if (document.getElementById('oj-input-text--1491447382-3')) {
      document.getElementById('oj-input-text--1491447382-3').value = phNum;
    }
    if ((window.location.href).indexOf("shell=partnersr") == -1) {
      if (document.getElementById('oj-input-text--1491447382-4')) {
        document.getElementById('oj-input-text--1491447382-4').value = emailId;
      }
    }
    if (document.getElementById('oj-input-text--1491447382-5')) {
      document.getElementById('oj-input-text--1491447382-5').value = veryEmailId;
    }


    // for auto renewal form fields
    if (document.getElementById('firstName')) {
      document.getElementById('firstName').value = firstName;
    }

    if (document.getElementById('lastName')) {
      document.getElementById('lastName').value = lastName;
    }
    if (document.getElementById('oj-input-text--65029666-1')) {
      document.getElementById('oj-input-text--65029666-1').value = phNum;
    }
    if (document.getElementById('oj-input-text--65029666-2')) {
      document.getElementById('oj-input-text--65029666-2').value = emailId;
    }
    if (document.getElementById('oj-input-text--65029666-5')) {
      document.getElementById('oj-input-text--65029666-5').value = veryEmailId;
    }


    // for reimbursement request form
    if (document.getElementById('email')) {
      document.getElementById('email').value = emailId;
    }
  };

  AppModule.prototype.updateeVar6 = function (checkLoggedInuser, accountId) {
    checkLoggedIn(checkLoggedInuser, accountId);
  };

       //Function to read akamai response headers
     
       AppModule.prototype.get_Akamai_headers = function () {
    
   
        var response_headers = "";
        if(window.fetch)
         fetch(location, {method:'HEAD'})
        .then(function(r) {
           r.headers.forEach(
              function(Value, Header) { response_headers = response_headers + Header + ":" + Value + "\n"; }
           );
        })
        .then(function() {

          // print akamai respone headers 
          console.log("**********************");
          console.log("Site headers :-- ");
          console.log(response_headers);
          console.log("**********************");
        });
          else
          document.write("This does not work in your browser - no support for fetch API");
  
  };

    AppModule.prototype.checkschedulepage = function () {
    var isSchedulePage = true;
    var currentURL = window.location.href;
    if (currentURL.indexOf("schedule-appointment") > -1) {
      isSchedulePage = false;
      $('.SFFeedback').css('display','none');        
      $('.chat-opener').css('display','none'); 
      $('.QSIPopOver .SI_3x5sy7kdf987KHH_PopOverContainer').css('display','none');
      $('.QSIPopOverShadowBox').css('display','none');
    }
    
    return isSchedulePage;
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.getSFtopArticles = function (topArticles) {
    if (typeof topArticles == "undefined" || topArticles.length == 0) {
      return 1;
    } else {
      return 0;
    }
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.getSFtopArticlesOnPageLoad = function (topArticlesArr, translations) {
    csp.topArticlesPageLoad(topArticlesArr, translations);
  };

  /**
   *
   * @param {String} arg1
   * @return {String}
   */
  AppModule.prototype.checkSFCategories = function (sfCategories) {    
    if (typeof sfCategories == "undefined" || sfCategories.length == 0) {
      return 1;
    } else {
      return 0;
    }
  };

  AppModule.prototype.checkForABTestingCookie = function () {
    if(!$.cookie("abTestingCookie")){
      document.cookie = "abTestingCookie=" + crypto.randomUUID() + "; secure"+ "; samesite=lax";
    }
  };

  /**
   *
   * @return {String}
   */
  AppModule.prototype.checkterminatesubscriptionpage = function () {
    var isTerminateSubscription = false;
    var currentURL = window.location.href;
    if (currentURL.indexOf("terminate-subscription") > -1) {
      isTerminateSubscription = true;     
    }    
    return isTerminateSubscription;
  };
  
  // AppModule.prototype.logErrors = function (inputparameter) {
  //   var val= JSON.parse(inputparameter);
  //   return {"requestheader": JSON.stringify(val.request), "responseheader": JSON.stringify(val.response)};
  // };

  return AppModule;

});