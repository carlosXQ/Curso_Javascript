class Product{
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI{
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Nombre del Producto</strong>: ${product.name}
                    <strong>Precio del Producto</strong>: ${product.price}
                    <strong>Año del Producto</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="Eliminar">Eliminar</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm() {
        document.getElementById('product-form').reset();
    }

    deleteProduct(element){
        if(element.name === 'Eliminar') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto Eliminado Exitosamente', 'danger');
        }
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        //Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}



//DOM Events
document.getElementById('product-form')
    .addEventListener('submit', function(e){
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;

        const product = new Product(name, price, year);

        const ui = new UI();

        
        const campos = [name, price, year];
        const mensajes = ['', 'Por favor, coloque el precio', 'Por favor, coloque un año para el producto'];

        let isValid = true;

        campos.forEach((campo, index) => {
            const campoInput = document.getElementById(['name', 'price', 'year'][index]);
            if (campo.trim() === '') {
                campoInput.classList.add('is-invalid');
                const feedbackElement = campoInput.nextElementSibling;
                if (feedbackElement.textContent !== mensajes[index]) {
                    feedbackElement.textContent = mensajes[index];
                }
                feedbackElement.classList.add('invalid-feedback');
                feedbackElement.classList.remove('valid-feedback');
                isValid = false;
            } else {
                campoInput.classList.remove('is-invalid');
                const feedbackElement = campoInput.nextElementSibling;
                feedbackElement.textContent = '';
                feedbackElement.classList.remove('invalid-feedback');
                feedbackElement.classList.remove('valid-feedback');
            }
        });

        
        if (isValid) {
            
            ui.addProduct(product);
            ui.resetForm();
            ui.showMessage('Producto Añadido Exitosamente', 'success');
        }

        e.preventDefault();
    });

document.getElementById('product-list').addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteProduct(e.target);
});