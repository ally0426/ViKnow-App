$("document").ready(function () {

    var objectOne = [];
    var undefinedOne = [];
    var arrayChecker = [];
    var wineNameArray = [];              // wineNameArray.push(wineCodeArrayTwo[x].name)
    var wineVarietalArray = [];          // wineVarietalArray.push(wineCodeArrayTwo[x].varietal)
    var wineVintageArray = [];           // wineVintageArray.push(wineCodeArrayTwo[x].vintage)
    var wineRegionArray = [];            // wineRegionArray.push(wineCodeArrayTwo[x].region)
    var wineImageURLArray = [];          // wineImageURLArray.push(wineCodeArrayTwo[x].image);
    var wineCodeArray = [];
    var wineCodeArrayTwo = [];
    var wineNotesArray = [];             //wineNotesArray.push(wineCodeArrayTwo[x].wm_notes)
    var winePairingCodeArray = [];       // winePairingCodeArray.push(wineCodeArrayTwo[x].code); - example: baus-family-vineyards-knights-valley-merlot-2007 
    var recipeName1Array = [];           // recipeName1Array.push(wineCodeArrayTwo[x].recipes[0].name); --OR-- recipeName1Array.push("No Recipes Found");
    var recipeName2Array = [];           // recipeName2Array.push(wineCodeArrayTwo[x].recipes[1].name); --OR-- recipeName2Array.push("No Recipes Found");
    var recipeName3Array = [];           // recipeName3Array.push(wineCodeArrayTwo[x].recipes[2].name); --OR-- recipeName3Array.push("No Recipes Found");
    var recipeURL1Array = [];            // recipeURL1Array.push(wineCodeArrayTwo[x].recipes[0].source_link); --OR-- recipeImageURL1Array.push("No Recipes Found");
    var recipeURL2Array = [];            // recipeURL2Array.push(wineCodeArrayTwo[x].recipes[1].source_link); --OR-- recipeImageURL2Array.push("No Recipes Found");
    var recipeURL3Array = [];            // recipeURL3Array.push(wineCodeArrayTwo[x].recipes[2].source_link); --OR-- recipeImageURL3Array.push("No Recipes Found");
    var recipeImageURL1Array = [];       // recipeImageURL1Array.push(wineCodeArrayTwo[x].recipes[0].image); --OR-- recipeImageURL1Array.push("No Recipes Found");
    var recipeImageURL2Array = [];       // recipeImageURL2Array.push(wineCodeArrayTwo[x].recipes[1].image); --OR-- recipeImageURL2Array.push("No Recipes Found");
    var recipeImageURL3Array = [];       // recipeImageURL3Array.push(wineCodeArrayTwo[x].recipes[2].image); --OR-- recipeImageURL3Array.push("No Recipes Found");

    // Search Call and Response
       
    
    $("#search").keypress(function (e) {
        
        
        var search = $("#search").val().trim();
        var queryURL = "http://api.snooth.com/wines/?q=" + search + "&akey=5pgy0fabib7s89ky9l5fx24ha754svspwnata652tn7gdr71&n=25";
        
        if (e.which === 13 && $("#search").val().trim() != "") {
            event.preventDefault();
            wineNameArray.length=0;         
            wineVarietalArray.length=0;             
            wineVintageArray.length=0;             
            wineRegionArray.length=0;          
            wineImageURLArray.length=0;          
            wineCodeArray.length=0;    
            wineCodeArrayTwo.length=0;    
            wineNotesArray.length=0;                
            winePairingCodeArray.length=0;     
            recipeName1Array.length=0;          
            recipeName2Array.length=0;            
            recipeName3Array.length=0;           
            recipeURL1Array.length=0;              
            recipeURL2Array.length=0;              
            recipeURL3Array.length=0;               
            recipeImageURL1Array.length=0;        
            recipeImageURL2Array.length=0;        
            recipeImageURL3Array.length=0;    
            console.log(search)
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                var jsonResponse = JSON.parse(response);
                //console.log(JSON.parse(response))
                for (i = 0; i < jsonResponse.wines.length; i++) {
                    var wines = jsonResponse.wines[i];
                    var wineName = jsonResponse.wines[i].name;
                    // $(".row").append("<p> Wine Name: " + wineName + "</p>");

                    var wineVarietal = jsonResponse.wines[i].varietal;
                    // $(".row").append("<p> Varietal: " + wineVarietal + "</p>");

                    var wineVintage = jsonResponse.wines[i].vintage;
                    // $(".row").append("<p> Vintage: " + wineVintage + "</p>");

                    var wineRegion = jsonResponse.wines[i].region;
                    var wineImageURL = jsonResponse.wines[i].image;

                    var wineImage = $("<img src='" + wineImageURL + "'>");
                    wineImage.addClass("wineImage");
                    // $(".row").append(wineImage);
                    // wineNameArray.push(wineName);
                    // wineVarietalArray.push(wineVarietal);
                    // wineVintageArray.push(wineVintage);
                    // wineRegionArray.push(wineRegion);
                    // wineImageURLArray.push(wineImageURL);
                    
                    var wineCode = jsonResponse.wines[i].code;
                    wineCodeArray.push(wineCode);
                    
                    console.log("#" + i + ": " + wineName)
                    console.log
                }
                
                // AFTER the loop, console.log wineNameArray to view results
                console.log(wineNameArray);
                
                // Recipe Call and Response
                for (m = 0; m < wineCodeArray.length; m++) {
                    var pairingURL = "http://api.snooth.com/wine/?food=1&id=" + wineCodeArray[m] + "&akey=5pgy0fabib7s89ky9l5fx24ha754svspwnata652tn7gdr71";
                    $.ajax({
                        url: pairingURL,
                        method: "GET"
                    }).then(function (pairingResponse) {
                        var jsonPairingResponse = JSON.parse(pairingResponse);
                        var wineDescription = jsonPairingResponse.wines[0].wm_notes;

                            wineCodeArrayTwo.push(jsonPairingResponse.wines[0]);

                            // Just a test function the check for Objects or Undefined
                            arrayChecker.push($.type(jsonPairingResponse.wines[0].recipes[1]));
                            if (($.type(jsonPairingResponse.wines[0].recipes[2])) == "object") {
                                objectOne.push("OBJECT")
                            };

                            if (($.type(jsonPairingResponse.wines[0].recipes[2])) == "undefined") {
                                objectOne.push("UNDEFINED")
                            };

                    })
                }

                setTimeout(function () {
            
                    for (x = 0; x < wineCodeArrayTwo.length; x++) {
                        // console.log(wineCodeArrayTwo[x]);
                        console.log(wineCodeArrayTwo[x].name);
                        winePairingCodeArray.push(wineCodeArrayTwo[x].code);
                        wineImageURLArray.push(wineCodeArrayTwo[x].image);
                        wineNameArray.push(wineCodeArrayTwo[x].name)
                        wineVarietalArray.push(wineCodeArrayTwo[x].varietal)
                        wineVintageArray.push(wineCodeArrayTwo[x].vintage)
                        wineNotesArray.push(wineCodeArrayTwo[x].wm_notes)
                        wineRegionArray.push(wineCodeArrayTwo[x].region)

                        if (($.type(wineCodeArrayTwo[x].recipes[0])) == "object") {
                            recipeName1Array.push(wineCodeArrayTwo[x].recipes[0].name);
                            recipeImageURL1Array.push(wineCodeArrayTwo[x].recipes[0].image);
                            recipeURL1Array.push(wineCodeArrayTwo[x].recipes[0].source_link);
                        }

                        else if (($.type(wineCodeArrayTwo[x].recipes[0])) == "undefined") {
                            recipeName1Array.push("No Recipes Found");
                            recipeImageURL1Array.push("No Recipes Found");
                            recipeURL1Array.push("No Recipes Found")
                         }

                        if (($.type(wineCodeArrayTwo[x].recipes[1])) == "object") {
                            recipeName2Array.push(wineCodeArrayTwo[x].recipes[1].name);
                            recipeImageURL2Array.push(wineCodeArrayTwo[x].recipes[1].image);
                            recipeURL2Array.push(wineCodeArrayTwo[x].recipes[1].source_link);
                        }

                        else if (($.type(wineCodeArrayTwo[x].recipes[1])) == "undefined") {
                            recipeName2Array.push("");
                            recipeImageURL2Array.push("");
                            recipeURL2Array.push("")
                         }

                        if (($.type(wineCodeArrayTwo[x].recipes[2])) == "object") {
                            recipeName3Array.push(wineCodeArrayTwo[x].recipes[2].name);
                            recipeImageURL3Array.push(wineCodeArrayTwo[x].recipes[2].image);
                            recipeURL3Array.push(wineCodeArrayTwo[x].recipes[2].source_link);
                        }

                        else if (($.type(wineCodeArrayTwo[x].recipes[2])) == "undefined") {
                            recipeName3Array.push("");
                            recipeImageURL3Array.push("");
                            recipeURL3Array.push("")
                         }
                }

                console.log(wineNameArray);
                console.log(recipeName1Array);
                console.log(recipeImageURL1Array);
                console.log(recipeURL1Array);
                console.log(recipeName2Array);
                console.log(recipeImageURL2Array);
                console.log(recipeURL2Array);
                console.log(recipeName3Array);
                console.log(recipeImageURL3Array);
                console.log(recipeURL3Array);
                console.log(wineImageURLArray);
                console.log(wineVarietalArray);
                console.log(wineNotesArray);
                console.log(wineCodeArrayTwo);
                console.log(wineCodeArrayTwo.length)







                }, 1500);

                // .then(function(response) {  ------------------ ending bracket              
            })

            //  if(e.which === 13 && $("#search").val().trim() != "") {  --------------- ending bracket            
        }

        //  $("#search").keypress(function(e) {   -------------------------------  ending brackets       
    })

    // $("document").ready(function() {  --------------------- ending bracket
})
