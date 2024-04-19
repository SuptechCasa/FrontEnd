window.addEventListener('load',()=>{
    $.get('http://localhost:8080/SupTechBackEnd/etudiants',(data)=>{
        etudiants=JSON.parse(data)
        etudiants.forEach(etudiant=>{
        id=$('<td>').text(etudiant.id)
        nom=$('<td>').text(etudiant.nom)
        age=$('<td>').text(etudiant.age)
        action=$('<td>')
        ligne=$('<tr>')
        ligne.append(id,nom,age)
        $('#listeEtudiants').append(ligne)
       })
    })
})

function ajouterEtudiant(){
formData={}
formData["id"]=$("#id").val()
formData["nom"]=$("#nom").val()
formData["age"]=$("#age").val()
jsonData=JSON.stringify(formData)
$.post("http://localhost:8080/SupTechBackEnd/etudiants", jsonData,
    function (data, textStatus, jqXHR) {
        if (data!=null){
            id=$('<td>').text(formData["id"])
            nom=$('<td>').text(formData["nom"])
            age=$('<td>').text(formData["age"])
            ligne=$('<tr>')
            ligne.append(id,nom,age)
            $('#listeEtudiants').append(ligne)
        }
    },
    "json"
);
        
}