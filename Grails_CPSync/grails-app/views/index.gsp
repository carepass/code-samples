<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Carepass Sync Demo</title>
    <g:javascript src="jquery-1.6.4.js"></g:javascript>
    <script type="text/javascript" charset="utf-8">
      $(function () {
    	  
        var setting =
          {
                'host':     "www.carepass.com/carepass/oauth"
              , 'clientId': "<YOUR_CLIENT_ID>"
              , 'scope': "IDENTITY,LIFESTYLE,FITNESS,FAMILY,INSURANCE,APPOINTMENT"
              , 'redirectUrl': "http://localhost:8092/MyCPSyncApp/auth"
          };

        var authHost  = "https://"     + setting.host;
        var endUserAuthorizationEndpoint = authHost + "/authorize";
        
        var authUrl = endUserAuthorizationEndpoint + 
            "?response_type=code" +
            "&client_id="    + setting.clientId +
            "&scope="     + setting.scope +
            "&redirect_uri=" + setting.redirectUrl;

          $("a.connect").attr("href", authUrl);
      });
    </script>
  </head>

  <body> 
    <a class="connect" href="">Connect to CarePass</a> 
  </body>
</html>
