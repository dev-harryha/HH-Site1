define(['auth0', 'vb/helpers/navigate'], function (auth0, Navigate) {
  'use strict';

  // The Auth0 client, initialized in configureClient()
  let auth0Client = null;

  var Auth0Utils = {};
  var subdomainUri = window.location.origin + "/support/";

  Auth0Utils.configureClient = async function (auth0Config) {

    auth0Client = await auth0.createAuth0Client({
      domain: auth0Config.domain,
      client_id: auth0Config.clientId,
      // useRefreshTokens: true,
      // cacheLocation: 'localstorage',
      audience: auth0Config.audience,
      scope: 'openid',
      redirect_uri: subdomainUri
    });

    return auth0Client;

  };

  Auth0Utils.login = async function (locale, targetUrl, currentPage) {
    try {

      if (!targetUrl) {
        targetUrl = window.location.href;
      }

      console.log("Logging in", targetUrl);

      if (!locale) {
        locale = "en-US";
      }
 
      const options = {
        redirect_uri: subdomainUri,
        culture: locale
      };

      if (targetUrl) {
        options.appState = { targetUrl };
      }

      if (currentPage && options.appState) {
        options.appState = { ...options.appState, currentPage };
       // options.appState.currentPage = currentPage;
      }

      await auth0Client.loginWithRedirect(options);

    } catch (err) {
      console.log("Log in failed", err);
    }
  };

  Auth0Utils.init = async function (auth0Config) {

    await Auth0Utils.configureClient(auth0Config);

   const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
      console.log("> User is authenticated");
      window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
      Auth0Utils.updateAuthState();
      return;
    }

    console.log("> User not authenticated");

    const query = window.location.search;
    const shouldParseResult = query.includes("code=") && query.includes("state=");

    if (shouldParseResult) {
      console.log("> Parsing redirect");
      
      try {
        const result = await auth0Client.handleRedirectCallback();
        if (result.appState && result.appState.targetUrl && result.appState.currentPage && result.appState.currentPage !== "home-start") {

          const parameters = {
            "url": result.appState.targetUrl,
          };

          Navigate.toUrl(parameters);

        }

        console.log("Logged in!");
      } catch (err) {
        console.log("Error parsing redirect:", err);
      }
      window.history.replaceState({}, document.title, "/support/");
      //window.history.replaceState({}, document.title, window.location.origin + "/support/");
      //window.history.replaceState({}, document.title, result.appState && result.appState.targetUrl ? result.appState.targetUrl : window.location.origin + "/support/");
    }

    Auth0Utils.updateAuthState();

  };

  Auth0Utils.getUserInfo = async function () {
    //logged in. you can get the user profile like this:
    const user = await auth0Client.getUser();

    return user;
  };

  Auth0Utils.logout = async function (auth0Config, targetUrl) {
    try {
      console.log("Logging out");
      auth0Client.logout({
        returnTo: targetUrl,
        client_id: auth0Config.clientId
      });
    } catch (err) {
      console.log("Log out failed", err);
    }
  };

  Auth0Utils.updateAuthState = async function () {

    let isAuthenticated = await auth0Client.isAuthenticated();

    if(!isAuthenticated){
      
      try {

        const accessToken = await auth0Client.getTokenSilently({ redirect_uri: subdomainUri });

        if(accessToken){
          isAuthenticated = true;
        }
      } catch (e) {
        //console.error({e});
         console.log("Auth Desrciption: " + e.error_description);
         console.log("Stack: " + e.stack);
      }
    }

    let id_token;
    if (isAuthenticated) {
      const claims = await auth0Client.getIdTokenClaims();
      id_token = claims.__raw;
    }

    if (Auth0Utils.eventHelper) {

      Auth0Utils.eventHelper.fireCustomEvent('updateAuthState', {
        detail: {
          connected: isAuthenticated,
          id_token: id_token
        }
      });

      return true;
    }

    //return isAuthenticated;

  };

  Auth0Utils.setEventHelper = function (eventHelper) {
    Auth0Utils.eventHelper = eventHelper;
  };

  return Auth0Utils;

});