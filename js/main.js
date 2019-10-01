//jshint esversion:6
let countryData;

//dropdown menu search
$(".dropdown-item").click(function(event){
  const matchingCountriesArray = [];
  countryData.forEach(function(country){
    if(country.region == event.currentTarget.text){
      matchingCountriesArray.push(country);
    }
  });
  $('#Content').html(template({countries:matchingCountriesArray}));
});

// Search functionality
$("form.searchField").submit(function(event){
  const searchText = $("input.search-field").val();
  const resultCountryArray = [];
  countryData.forEach(function(countryObject){
    if (countryObject.name.substring(0,searchText.length).toUpperCase().includes(searchText.toUpperCase())){
      resultCountryArray.push(countryObject);
    }
  });
  if(resultCountryArray.length==0){
    countryData.forEach(function(countryObject){
      if (countryObject.name.toUpperCase().includes(searchText.toUpperCase())|| countryObject.alpha3Code.toUpperCase().includes(searchText.toUpperCase())){
        resultCountryArray.push(countryObject);
      }
    });
  }
    $('#Content').html(template({countries:resultCountryArray}));
  return false;
});

//card Link
$(document).on("click",".card", function(event){
  let link = $("#mode");
  let mode = "";
   if(link.attr("href")==="css/light.css"){
     mode = "light";
   }else{
     mode = "dark";
   }
  const clickedCountryData= event.currentTarget.innerText;
  const clickedCountryName = clickedCountryData.split("\n")[0];
  const queryString = "?country="+clickedCountryName+"&mode="+mode;
  window.location.href="detail.html"+queryString;

});

//switch theme
$("#dark-mode-btn").click(function(event){
let link = $("#mode");

 if(link.attr("href")==="css/light.css"){
   link.attr("href", "css/dark.css");
 }else{
   link.attr("href", "css/light.css");
 }

});

//template to display data
var template = ejs.compile(
  `
  <% countries.forEach(function(country){ %>
  <div class="col-lg-3">
    <div class="card ">
      <img class="card-img-top" src=<%=country.flag%> alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title"><%= country.name%></h5>
        <p class="card-text"><strong>Population: </strong><%=country.population.toLocaleString()%> </p>
        <p class="card-text"><strong>Region: </strong>    <%=country.region    %> </p>
        <p class="card-text"><strong>Capital: </strong>   <%=country.capital   %> </p>

      </div>
    </div>
  </div>
<%  }); %>

  `
);

//initial data request
$.get("https://restcountries.eu/rest/v2/all",function(data,status){

  countryData = data;


  $('#Content').html(template({countries:data}));


},"json");
