const taxRate = 0.18;
const shippingPrice = 15.0;

window.addEventListener('load', () => {
    localStorage.setItem('taxRate', taxRate);
    localStorage.setItem('shippingPrice', shippingPrice);
    // Browser kapansada veriyi tutar

    calculateCardTotal();

    // sessionStorage.setItem('taxRate', taxRate);
    // sessionStorage.setItem('shippingPrice', shippingPrice);  // veriyi sessionStoragede tutar, browser kapanınca gider
});

// capturing

let productsDiv = document.querySelector('.products');
productsDiv.addEventListener('click', (e) => {
    let quantityP = e.target.parentElement.parentElement.querySelector('#product-quantity');  // heryerden ulaşabileceğimiz bir element berlirledik
    // console.log(quantityP);
    // console.log(e.target);

    // minus buttons
    if (e.target.classList.contains('fa-minus') || e.target == quantityP.parentElement.firstElementChild) {
        if (quantityP.textContent > 1) {
            quantityP.textContent--;
            // calculate card and product total
            calculateProductTotal(quantityP);
        } else {
            if (confirm('Product will removed')) {
                quantityP.parentElement.parentElement.parentElement.remove();
                // calculate card total
                calculateCardTotal();
            }
        };
    }

    // //plus buttons
    else if (e.target.className == 'fas fa-plus' || e.target == quantityP.parentElement.lastElementChild) {
        quantityP.textContent++;
        // calculate card and product total
        calculateProductTotal(quantityP);
    }

    // //remove buttons
    else if (e.target.className == 'remove-product') {
        if (confirm('Product will be removed')) {
            quantityP.parentElement.parentElement.parentElement.remove();
            calculateCardTotal();
        }
        // quantityP.parentElement.parentElement.parentElement.remove();
        // calculate card total
        calculateCardTotal();
    } else {
        console.log(e.target);
    }


    // ternary
    // e.target.classList.contains('fa-minus') || e.target == quantityP.parentElement.firstElementChild ? quantityP.textContent--/* console.log('minus clicked') */ :
    //     e.target.className == 'fas fa-plus' || e.target == quantityP.parentElement.lastElementChild ? quantityP.textContent++ /* console.log('plus clicked') */ :
    //         e.target.className == 'remove-product' ? quantityP.parentElement.parentElement.parentElement.remove() /* console.log('remove clicked') */ : null /* console.log(e.target); */

    // classList kullanırsak sadece fa - minus yazabiliriz ama className kullanırsak class ın isminin tamamını yazmalıyız.
});

const calculateProductTotal = (quantityP) => {
    // console.log(quantityP.textContent);
    let productPrice = quantityP.parentElement.parentElement.querySelector('strong');
    let productTotalPrice = quantityP.parentElement.parentElement.querySelector('.product-line-price');
    productTotalPrice.textContent = (quantityP.textContent * productPrice.textContent).toFixed(2);
    calculateCardTotal();
}

const calculateCardTotal = () => {
    let productTotalPriceDiv = document.querySelectorAll('.product-line-price');
    let subTotal = 0;
    productTotalPriceDiv.forEach(eachProductTotalPrice => {
        subTotal += parseFloat(eachProductTotalPrice.textContent);
    })
    let taxPrice = subTotal * localStorage.getItem('taxRate');
    let shipping = (subTotal > 0 ? parseFloat(localStorage.getItem('shippingPrice')) : 0);
    let cardTotal = subTotal + taxPrice + shipping;

    document.querySelector('#cart-subtotal p:nth-child(2)').textContent = subTotal.toFixed(2);
    document.querySelector('#cart-tax p:nth-child(2)').textContent = taxPrice.toFixed(2);
    document.querySelector('#cart-shipping p:nth-child(2)').textContent = shipping.toFixed(2);
    document.querySelector('#cart-total').lastElementChild.textContent = cardTotal.toFixed(2);
}
