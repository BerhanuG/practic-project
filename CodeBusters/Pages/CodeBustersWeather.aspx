<%@ Page language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<WebPartPages:AllowFraming ID="AllowFraming" runat="server"/>

<html>
<head>
    <title>Weather</title>
    <link type="text/css" href="../Content/weather-icons-wind.min.css" rel="stylesheet"/>
    <link type="text/css" href="../Content/weather-icons.min.css" rel="stylesheet"/>
     <link rel="Stylesheet" type="text/css" href="../Content/CodeBustersAppPart.css"/>

    <!-- Add your JavaScript to the following file -->


</head>
<body>
    
<div class="city ">
    
  <div class="container">
      <div><span class="date"> </span> <a href="#" id="copyright">The Code Busters</a></div>

    <div class="city-title ">
      <span id="location"> </span>
    </div>
    <hr />
    <div class="city-weather-temperature loader">
      <span class="celsius fahrenheit-btn "></span>
      <span class="fahrenheit celsius-btn"></span>
    </div>

    <div class="city-weather-description">
      <span id="icon"></span><br />
      <span id="description"></span>
    </div>
      <div id="status">
          <span id="humidity"></span>
        <span id="wind"></span>
      </div>


    <div class="bottom">
      <div class="nav-info clearfix">
        <div class="add-info">
          <ul id="details">
            <li>
             <span id="day1C"> </span>
              <span id="day1F"> </span>
            </li>
            <li>
              <span id="day2C"> </span>
              <span id="day2F"> </span>
            </li>
            <li>
              <span id="day3C"> </span>
              <span id="day3F"> </span>
            </li>
            <li>
              <span id="day4C"> </span>
              <span id="day4F"> </span>
            </li>
              <li>
              <span id="day5C"> </span>
              <span id="day5F"> </span>
            </li>
            
          </ul>
            
        </div>
        
      </div>

    </div>

  </div>
</div>

            <script src="../Scripts/jquery-3.3.1.js"></script>
    <script src="../Scripts/CodeBustersAppPart.js"></script>
</body>
</html>