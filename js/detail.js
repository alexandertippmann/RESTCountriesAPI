//jshint esversion:6

const urlParams = new URLSearchParams(window.location.search);
const country = urlParams.get('country');
const mode = urlParams.get('mode');

//set initial theme to theme of previous site
if (mode == "light") {
  $("#mode").attr("href", "css/light.css");
} else {
  $("#mode").attr("href", "css/dark.css");
}


//switch theme
$("#dark-mode-btn").click(function(event) {
  let link = $("#mode");

  if (link.attr("href") === "css/light.css") {
    link.attr("href", "css/dark.css");
    $("switching-color").removeClass("btn-outline-dark");
    $("switching-color").addClass("btn-outline-light");

  } else {
    link.attr("href", "css/light.css");
    $("switching-color").removeClass("btn-outline-light");
    $("switching-color").addClass("btn-outline-dark");

  }

});

//set title to country name
$("title").text(country);

//go back button
$("#back-button").click(function() {
  history.back();
});

//data display template
var template = ejs.compile(
  `
  <div class="col-lg-6">
    <div class="flag-wrapper">
      <img src=<%=country.flag%> alt="Flag">
    </div>

  </div>
  <div class="col-lg-6">
    <div class="data-wrapper">

      <h2><%=country.name%></h2>
      <div class="row table-row">

        <div class="col-lg-6">
          <p><strong>Native Name: </strong>   <%=country.nativeName%>   </p>
          <p><strong>Population: </strong>    <%=country.population.toLocaleString()%>   </p>
          <p><strong>Region:  </strong>       <%=country.region%>   </p>
          <p><strong>Sub Region: </strong>    <%=country.subregion%>   </p>
          <p><strong>Capital: </strong>       <%=country.capital%>   </p>
        </div>
        <div class="col-lg-6">
          <p><strong>Top Level Domain: </strong> <%=country.topLevelDomain%>   </p>
          <p><strong>Currencies: </strong>
          <% country.currencies.forEach(function(currency,idx,array){ %>
            <% if(idx < array.length-1){ %>
              <%=currency.name%>,
            <%}else{%>
              <%=currency.name%>
              <%}%>
          <%});%>
          </p>
          <p><strong>Languages: </strong>
           <% country.languages.forEach(function(language,idx,array){ %>

                        <% if(idx < array.length-1){ %>
                          <%=language.name%>,
                        <%}else{%>
                          <%=language.name%>
                          <%}%>
                      <%});%>
            </p>
        </div>

      </div>
      <p class="bordering"><strong>Bordering Countries: </strong>
      <% country.borders.forEach(function(border){ %>
      <button class="btn btn-outline-dark switching-color border-buttons">  <%=border%></button>
      <%});%>
      </p>
    </div>
  </div>
  `
);


//initial country data request
$.get("https://restcountries.eu/rest/v2/name/" + country, function(data, status) {



  $('#Content').html(template({
    country: data[0]
  }));


}, "json");

//clicking Border countries
$(document).on("click", ".border-buttons", function(event) {
  $.get("https://restcountries.eu/rest/v2/alpha/" + this.innerText, function(data, status) {
    console.log(status);



    $('#Content').html(template({
      country: data
    }));


  }, "json");
  $("title").text(country);
});
