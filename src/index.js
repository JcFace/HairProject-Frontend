(function () {
    const main = document.querySelector('main')
    const hairTypesUrl = "http://localhost:3000/hair_types"

    function getHairTypes() {
        fetch(hairTypesUrl)
        .then(res => res.json())
        .then(types => types.forEach(type => showType(type)))
    }
    getHairTypes()

    function showType(type) {
        const div = document.createElement('div')
        const h2 = document.createElement('h2')
        const typeImage = document.createElement('img')

        typeImage.src = type.img_url

        div.id = type.id

        h2.innerText = type.name

        div.append(h2, typeImage)
        main.appendChild(div)

    }

})()