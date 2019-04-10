<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
     <link href="../Content/weather-icons-wind.min.css" rel="stylesheet" />
    <link href="../Content/weather-icons.min.css" rel="stylesheet" />
    <link rel="Stylesheet" type="text/css" href="../Content/CodeBustersAppPart.css" />

    <!-- Add your JavaScript to the following file -->
        <script type="text/javascript" src="../Scripts/jquery-3.3.1.js"></script>
    <script type="text/javascript" src="../Scripts/CodeBustersAppPart.js"></script>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    The Code Busters Weather App
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

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

</asp:Content>
