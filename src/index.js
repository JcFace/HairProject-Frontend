(function () {
    const hairTypesUrl = "http://localhost:3000/hair_types"
    const productsUrl = "http://localhost:3000/products"
    
    const main = document.querySelector('main')
    const body = document.querySelector('body')
    let h1 = document.createElement('h1')
    const br1 = document.createElement('br')
    const br2 = document.createElement('br')
    
    const submitBtn = document.createElement('button')
    const fwdBtn = document.createElement('button')
    const homeBtn = document.createElement('button')
    const addProductBtn = document.createElement('button')
    let description = document.createElement('p')
    
    
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
    homeBtn.id = 'home'
    fwdBtn.id = 'forward'
    
    
    submitBtn.innerText = 'Submit'
    addProductBtn.innerText = "Add Product"
    fwdBtn.innerText = "More Products"
    homeBtn.innerText = "Hair Types"
    
    
    
    prodForm.append(prodName, br1, prodPic, br2, prodDesc, hiddenField, submitBtn)
    
    
    prodForm.addEventListener('submit', (e) => submitForm(e))
    addProductBtn.addEventListener('click', (e) => buildForm(e))
    homeBtn.addEventListener('click', () => {
        main.innerHTML = ''
        h1.innerText = 'Select Your Hair Type'
        getHairTypes()
    })
     
    function getHairTypes() {
        main.innerHTML = ''
        main.prepend(h1)
        
        fetch(hairTypesUrl)
        .then(res => res.json())
        .then(types => types.forEach(type => showType(type)))
    }
    
    getHairTypes()
     
    function showType(type) {
        const div = document.createElement('div')
        div.id = type.id

        const h2 = document.createElement('h2')
        h2.className = 'hair-type-name'
        h2.innerText = type.name

        const typeImage = document.createElement('img')
        typeImage.src = type.img_url
        typeImage.addEventListener('click', (e) => getProducts(e))
        
        div.append(h2, typeImage)
        main.appendChild(div) 
    } 
    
    function getProducts(e, product) {
        main.innerHTML = ""
        // debugger
        // let hairType
        // if (product){
        //     hairType = product.hair_type_id
        // }
        // let hairTypeId = hairType || e.target.parentElement.id
        // let hairTypeName = 'unknown' || e.target.parentElement.textContent
        let hairTypeId = e.target.parentElement.id
        let hairTypeName = e.target.parentElement.textContent
        // console.log(e.target.parentElement.textContent)
        // fetch(`http://localhost:3000/hair_types/${e.target.parentElement.id}/?_limit=10&_page=${pageId}`)
        fetch(hairTypesUrl + `/${hairTypeId}`)
        .then(res => res.json())
        .then(hairtype => hairtype.products.forEach(product => showProducts(product)))
        
        
        addProductBtn.dataset.hairType = hairTypeId
        addProductBtn.dataset.hairTypeName = hairTypeName
       
    }
    
    
    function showProducts(product) {
        const div = document.createElement('div')
        div.id = product.id

        const description = document.createElement('p')
        description.innerHTML = `Description:<br> ${product.description}`

        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = 'Delete Product'
        deleteBtn.id = 'delete-button'

        const editDesc = document.createElement('button')
        editDesc.innerHTML = 'Edit Description'
        editDesc.id = 'edit-button'

        const h2 = document.createElement('h2')
        h2.className = 'names-of-products'
        h2.innerText = product.name

        const productImg = document.createElement('img')
        productImg.className = 'product-pics'
        productImg.src = product.img_url
           
        
        div.append(h2, productImg, description, deleteBtn, editDesc)
        main.prepend(div)
        main.prepend(addProductBtn, homeBtn)
        
        deleteBtn.addEventListener('click', () => deleteProd(product, div))
        editDesc.addEventListener('click', (e) => DescForm(e, product, div))
    }
        
        function buildForm(e) {
            main.innerHTML = ''

            h1.innerHTML = `Add a product for ${e.target.dataset.hairTypeName} hair`
           
            hiddenField.value = e.target.dataset.hairType

            main.appendChild(prodForm)
            body.prepend(h1)    
        }

    function submitForm(e) {
        main.innerHTML = ''
        e.preventDefault()
        let product = {
            name: e.target[0].value,
            image: e.target[1].value,
            description: e.target[2].value,
            hair_type_id: e.target[3].value
        }
        postProduct(e, product)
        
    }

    function postProduct(e, product) {
        fetch(productsUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(product => {
            main.innerHTML = ''
            showProducts(product) 
        })
    }

    function deleteProd(product, div) {
        fetch(productsUrl + `/${product.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(() => {
            div.remove()
        })  
    }

    function DescForm(e, product, div) {
        const editBtn = document.querySelector('#edit-button')
        const deleteBtn = document.querySelector('#delete-button')

        const submitBtn = document.createElement('input')
        submitBtn.setAttribute('type', 'submit')
        submitBtn.setAttribute('value', 'Update')

        description = document.querySelector('p').innerHTML = ''
        const div2 = document.createElement('div')
        const div3 = document.createElement('div')

        const descForm = document.createElement('form')
        
        const desc = document.createElement('input')
        desc.type = 'text'
        desc.name = 'updated-product-description'
        desc.placeholder = product.description
        desc.value = ''
   
        descForm.appendChild(desc)
        div2.append(editBtn, deleteBtn)
        div2.remove()
        div3.append(descForm, submitBtn)
        div.append(div3)

        submitBtn.addEventListener('click', (e) => updateDesc(e, div))
    }

    function updateDesc(e, div) {
        let userDesc = {
            description: e.path[1].childNodes[0][0].value
        }
        fetch(productsUrl + `/${e.target.parentElement.parentElement.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(userDesc)
        })
        .then(res => res.json())
        .then(newDesc => {
                description = newDesc
                div.innerHTML = ''
                showProducts(newDesc)
        })
    }

})()


