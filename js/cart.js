var $cartList = $('#cart-list');
var $productWrap = $('#category-inner');

function buildCatalog() {
    $.ajax({
        url: 'http://localhost:3000/product',
        dataType: 'json',
        success: function(product) {
            product.forEach(function (item) {
                var $productModelCardWrap = $("<div/>",{
                    id: item.id_product,
                    class: "product_mybag"
                });
                var $product = $("<a/>",{
                    href:"single-page.html",
                    class:"product",
                });
                var $productImg = $("<img>",{
                    src: item.img,
                    class:'product-modelcard-img',
                });

                var $productBlockText = $("<div/>",{
                    class:"product-modelcard-blocktext"
                });
                var $productName = $("<p/>",{
                    class:"product-modelcard-name",
                    text:item.product_name,
                });
                var $productprise = $("<p/>",{
                    class:"product-modelcard-prise",
                    text:item.price,
                });
                var $buttonAddWrap = $("<div/>",{
                    id:"button_" + item.id_product,
                    class:"button-addcard-wrap product__button-addcard-wrap",
                });
                var $buttonAddCard = $("<a/>",{
                    href: "#",
                    class:"button-add-card button-add-card__border",
                    text: "Add to Card",
                }).data(item);
                var $buttonImg = $("<img/>",{
                    src:"img/product/basket1.svg",
                    alt:"basket",
                });
                var $buttonLitel = $("<a/>",{
                    href: "#",
                    class:"button-add-card button-add-card__litel",
                });
                var $buttonImgLitel = $("<img/>",{
                    src:"img/product/forma_5.svg",
                    alt:"basket",
                });
                var $buttonLitel1 = $("<a/>",{
                    href: "#",
                    class:"button-add-card button-add-card__litel1",
                });
                var $buttonImgLitel1 = $("<img/>",{
                    src:"img/product/forma_6.svg",
                    alt:"basket",
                });

                $buttonLitel1.append($buttonImgLitel1);
                $buttonLitel.append($buttonImgLitel);
                $buttonAddCard.append($buttonImg);
                $buttonAddWrap.append($buttonAddCard,$buttonLitel,$buttonLitel1);
                $productModelCardWrap.append($product,$buttonAddWrap);
                $product.append($productImg, $productBlockText);
                $productBlockText.append($productName, $productprise);
                $productWrap.append($productModelCardWrap);

            });
        }
    });
}

function buildCart() {
    $('#cart-list').empty();
    $.ajax({
        url: 'http://localhost:3000/basket',
        dataType: 'json',
        success: function(product) {
            var sum = 0;
            product.forEach(function(item) {
                var $basketCard = $("<div/>",{
                    class:"basket-card shopping-cart-position",
                    id:"basket-card_"+ item.id,
                });

                var $basketCardImg = $('<div/>', {
                    class: "shopping-cart-position-img",
                });

                var $aImg = $("<a/>");
                var $imgCart = $("<img src='" + item.img + "'>");
                var $shoppingCard = $("<div class='shopping-card-position-img-text'></div>");
                var $aText = $("<a/>");
                var $h3 = $("<h3>Mango People T-shirt</h3>");
                var $divStar = $("<div class='shopping-star'></div>");
                var $spanPrQu = $("<span>",{
                    text: item.quantity + "X" + "(" + item.price + ")",});

                var $remowButton = $('<a/>', {
                    class: 'remowe_button',
                    id: 'cart-' + item.id,
                }).data(item);

                var $iconButt = $("<i class='fas fa-trash-alt remowe_shopping-cart-position'></i>");
                sum += +item.price * +item.quantity;

                $remowButton.append($iconButt);
                $aText.append($h3);
                $shoppingCard.append($aText,$divStar,$spanPrQu);
                $aImg.append($imgCart);
                $basketCardImg.append($aImg);
                $basketCard.append($basketCardImg,$shoppingCard,$remowButton);
                $basketList.append($basketCard);
            });

            $(".total-text").text( + sum );
        }
    });
}

(function($) {
    buildCatalog();
    buildCart();

    $cartList.on('click', '.product-mybag-delet', function() {
        var good = $(this).data();
        $.ajax({
            url: 'http://localhost:3000/basket/' + good.id,
            type: 'DELETE',
            success: function() {
                buildCart();
            }
        })
    });

    $productWrap.on('click', '.cart-button-add', function() {
        var product = $(this).data();
        if($('#cart-list' + product.id).length) {
            // товар в корзине есть - нужно увеличить количество
            var goodInCart = $('#cart-' + product.id).data();
            $.ajax({
                url: 'http://localhost:3000/basket/' + product.id,
                type: 'PATCH',
                dataType: 'json',
                data: { quantity: +goodInCart.quantity + 1 },
                success: function() {
                    buildCart();
                }
            });
        } else {
            // товара в корзине нет - нужно добавить
            product.quantity = 1;
            $.ajax({
                url: 'http://localhost:3000/basket',
                type: 'POST',
                dataType: 'json',
                data: product,
                success: function() {
                    buildCart();
                }
            });
        }
    });
})(jQuery);