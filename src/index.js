(function () {
    const hairTypesUrl = "http://localhost:3000/hair_types"

    const main = document.querySelector('main')
    const body = document.querySelector('body')
    let h1 = document.createElement('h1')
    const br1 = document.createElement('br')
    const br2 = document.createElement('br')

    const submitBtn = document.createElement('button')
    const fwdBtn = document.createElement('button')
    const backBtn = document.createElement('button')
    const addProductBtn = document.createElement('button')

    
    const prodForm = document.createElement('form')
    const prodName = document.createElement('input')
    const prodPic = document.createElement('input')
    const prodDesc = document.createElement('input')
    const hiddenField = document.createElement('input')

    hiddenField.setAttribute('type', 'hidden')

    h1.innerText = 'Select Your Hair Type'

    prodName.type = 'text'
    prodName.name = 'product-name'
    prodName.placeholder = 'Product Name'
    prodName.value = ''

    prodPic.type = 'text'
    prodPic.name = 'product-pic'
    prodPic.placeholder = "Product's Image URL"
    prodPic.value = ''

    prodDesc.type = 'text'
    prodDesc.name = 'product-description'
    prodDesc.placeholder = 'Product Description'
    prodDesc.value = ''

    addProductBtn.id = 'add-product-button'
    backBtn.id = 'back'
    fwdBtn.id = 'forward'
    
    
    submitBtn.innerText = 'Submit'
    addProductBtn.innerText = "Add Product"
    fwdBtn.innerText = "More Products"
    backBtn.innerText = "Back"



    prodForm.append(prodName, br1, prodPic, br2, prodDesc, hiddenField, submitBtn)
    
    // let pageId = 1
    
    addProductBtn.addEventListener('click', (e) => buildForm(e))
    prodForm.addEventListener('submit', (e) => submitForm(e))

    

    function getHairTypes() {
        main.prepend(h1)

        fetch(hairTypesUrl)
        .then(res => res.json())
        .then(types => types.forEach(type => showType(type)))
    }

    getHairTypes()



    function showType(type) {
        const div = document.createElement('div')
        const h2 = document.createElement('h2')
        const typeImage = document.createElement('img')

        // console.log(type)

        typeImage.src = type.img_url
        typeImage.addEventListener('click', (e) => getProducts(e))

        div.id = type.id

        h2.innerText = type.name

        div.append(h2, typeImage)
        main.appendChild(div)

    }



    function getProducts(e) {
        // body.innerHTML = ""
        main.innerHTML = ""
        let hairTypeId = e.target.parentElement.id
        let hairTypeName = e.target.parentElement.textContent
        console.log(e.target.parentElement.textContent)
        // fetch(`http://localhost:3000/hair_types/${e.target.parentElement.id}/?_limit=10&_page=${pageId}`)
        fetch(hairTypesUrl + `/${e.target.parentElement.id}`)
        .then(res => res.json())
        .then(hairtype => hairtype.products.forEach(product => showProducts(product)))


        addProductBtn.dataset.hairType = hairTypeId
        addProductBtn.dataset.hairTypeName = hairTypeName
        body.append(addProductBtn, fwdBtn, backBtn)
        // addProductBtn.id = e.target.parentElement.id
        // .then(hairtype => console.log(hairtype.products))
    }

    // getProducts()



    function showProducts(product) {
        const div = document.createElement('div')
        const h2 = document.createElement('h2')
        const productImg = document.createElement('img')
        const description = document.createElement('p')


        div.id = product.id
        h2.innerText = product.name
        productImg.src = product.img_url
        description.innerHTML = `Description:<br> ${product.description}`

        div.append(h2, productImg, description)
        main.appendChild(div)
        // console.log(product)


        // fwdBtn.addEventListener('click', () => {
        //     pageId++
        //     pageForward()
        // })

    }

    function buildForm(e) {
        main.innerHTML = ''
        h1.innerHTML = `Add a product for ${e.target.dataset.hairTypeName} hair`
        // console.log(e.target.dataset.hairType)
        hiddenField.value = e.target.dataset.hairType
        main.appendChild(prodForm)
        console.log(e.target.parentNode)
        // console.log(prodForm)
        body.prepend(h1)
    }

    function submitForm(e) {
        e.preventDefault()
        // let product = {
        //     name: e.target[0].value,
        //     image: e.target[1].value,
        //     desription: e.target[2].value,
        //     hair_type_id: e.target[3].value
        // }
        // postProduct(e, product)
        console.log(e.target[3].value)
    }

    // function postProduct(e, product) {
    //     fetch("http://localhost:3000/products", {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json"
    //         },
    //         body: JSON.stringify(product)
    //     })
    //     .then(res => res.json())
    //     .then(console.log(e.target[3]))
    //     // .then(product => showProducts(product))

        
    // }

    // function pageForward() {
    //     main.innerHTML = ''
    // }

})()