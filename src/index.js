(function () {
    const main = document.querySelector('main')
    const hairTypesUrl = "http://localhost:3000/hair_types"

    function getHairTypes() {
        fetch(hairTypesUrl)
        .then(res => res.json())
        .then(hair => showHair(hair))
    }
    getHairTypes()

    function showHair(hair) {
        
    }

})()