const formcreate=document.getElementById("MyForm");
const username=document.getElementById("fullName");
const nameErroe=document.getElementById("nameError");
const phone=document.getElementById("phone");
const phoneErroe=document.getElementById("phoneError");


formcreate.addEventListener("submit",function(e){
    if(username.value.trim()===""){
        e.preventDefault();
        nameErroe.style.display="block";
    }
    else{
        nameErroe.style.display="none";
    }

    const value=phone.value.trim();
    if(value.length!==11 || isNaN(value)){
        e.preventDefault();
        phoneErroe.style.display="block";
    }
    else{
        phoneErroe.style.display="none";
    }
    
});
