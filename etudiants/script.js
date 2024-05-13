window.addEventListener('load',()=>{
    $.get('http://localhost:8080/SupTechBackEnd/etudiants',(data)=>{
        etudiants=JSON.parse(data)
        etudiants.forEach(etudiant=>{
        id=$('<td>').text(etudiant.id)
        nom=$('<td>').text(etudiant.nom)
        age=$('<td>').text(etudiant.age)
        deleteTD=$('<td>')
        deleteIMG=$('<img>')
        deleteIMG.attr('src','images/delete.png')
        deleteIMG.attr('class','deleteImage')
        deleteIMG.attr('onclick','openModal(event)')
        deleteTD.append(deleteIMG)
        action=$('<td>')
        ligne=$('<tr>')
        ligne.append(id,nom,age,deleteTD)
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
            tdIMG=$('<td>').html("<img class='deleteImage' src='images/delete.png'>")
            ligne=$('<tr>')
            ligne.append(id,nom,age,tdIMG)
            $('#listeEtudiants').append(ligne)
        }
    },
    "json"
);
        
}
function openModal(e){
    $("#confirmModal").modal("show")
    $("#oui").on("click",()=>{
    deleteEtudiant(e)
    })
}

function deleteEtudiant(e) {
    const id = e.target.parentElement.parentElement.children[0].innerText;
    const nom = e.target.parentElement.parentElement.children[1].innerText;
    const age = e.target.parentElement.parentElement.children[2].innerText;

    const formData = {
        id: parseInt(id),
        nom: nom,
        age: parseInt(age)
    };
    console.log(JSON.stringify(formData))
    $.ajax({
        url: 'http://localhost:8080/SupTechBackEnd/etudiants',
        type: 'DELETE',
        contentType: 'application/json', // Définir le type de contenu pour JSON
        data: JSON.stringify(formData), // Convertir l'objet formData en JSON
        success: function(response) {
            e.target.parentElement.parentElement.remove()
        },
        error: function(xhr, status, error) {
            // Handle error
            console.error('DELETE request failed:', error);
        }
    });
}
