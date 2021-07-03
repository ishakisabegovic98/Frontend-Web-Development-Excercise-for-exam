$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input."
);


$(".zaFormu").validate({
        rules:{
            dostavaIme:{
                required: true,
                regex:/^[A-Z][a-zA-Z ]+[A-Z][a-zA-Z]+$/
            },
            dostavaIndex:{
                required:true,
                regex:/^[0-9]{6}$/
            },
            dostavaTelefon:{
                required:true,
                regex:/^\+[0-9]{3}-[0-9]{2}-[0-9]{3}-[0-9]{4}$/
            }
}

});
function like(proizvodIde){

    // var url = "http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/Like?proizvodId="+proizvodIde;
    // fetch(url)
    // .then((r)=>{
    //     if(r.status != 200 && r.status != 304){
    //         return;
    //     }
    //     r.json().then((x)=>{
            
    //         console.log(x);
    //     })

    // }
    // )

    const element = document.getElementById(proizvodIde);

    

    const tableDataLike = document.createElement("td");
    tableDataLike.innerHTML = element.likeCounter;

    const tableDataLikeButton = document.createElement("td");
    const btn = document.createElement("button");
    btn.innerHTML = "LIKE";

    btn.onclick = function(){like(x[i].proizvodID);};
    tableDataLikeButton.appendChild(btn);

    


}
let nizProizvoda = [];

function podaci() {
    var url = "http://onlineshop.wrd.app.fit.ba/api/ispit20190914/Narudzba/GetProizvodiAll";
    
    fetch(url)
        .then((r) => {
            if (r.status != 200 && r.status != 304) {
                console.log("eror");
                return;
            }

            r.json().then((x) => {
                nizProizvoda = x;
                const table = document.getElementById("tabelaProizvodi");
                for(let i=1; i<table.rows.length; i++){
                    table.removeRow(i);
                }
                for(let i=0; i<x.length; i++){
                    
                    const tableRow = document.createElement("tr");
                    const tableDataID = document.createElement("td");
                    const tableDataNaziv = document.createElement("td");
                    const tableDataCijena = document.createElement("td");
                    const tableDataSlika = document.createElement("td");
                    const tableDataLike = document.createElement("td");
                    const tableDataLikeButton = document.createElement("td");

                    tableDataLike.setAttribute("id",x[i].proizvodID);

                    tableDataID.innerHTML = x[i].proizvodID;
                    tableDataNaziv.innerHTML = x[i].naziv;
                    tableDataCijena.innerHTML = x[i].cijenaPoKvadratu;
                    const img = document.createElement("img");
                    img.setAttribute("src", x[i].slikaUrl);
                    img.setAttribute("width", "90px");
                    tableDataSlika.appendChild(img);
                    tableDataLike.innerHTML = x[i].likeCounter;

                    const btn = document.createElement("button");
                    btn.innerHTML = "LIKE";
                    
                    btn.onclick = function(){like(x[i].proizvodID);};
                    tableDataLikeButton.appendChild(btn);
                    
                    
                    tableRow.appendChild(tableDataID);
                    tableRow.appendChild(tableDataNaziv);
                    tableRow.appendChild(tableDataCijena);
                    tableRow.appendChild(tableDataSlika);
                    tableRow.appendChild(tableDataLike);
                    tableDataLike.appendChild(tableDataLikeButton);
                    table.appendChild(tableRow);
                }
                console.log(x);
                
            });

        })
        .catch((error) => {
                console.log(error);
        });
};

function najlike(){
    
    let najveci=nizProizvoda[0];
    if(najveci===undefined) {
    alert("Nemamo pristup proizvodima"); 
    return; 
    }
    for(let i = 0; i<nizProizvoda.length; i++){
        
        if(nizProizvoda[i].likeCounter > najveci.likeCounter)
        najveci = nizProizvoda[i];
    }
    alert("NajLike proizvod je: "+ najveci.naziv +" sa cijenom od "+najveci.cijenaPoKvadratu);
}


