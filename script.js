'use strict';
$(function () {
    const productTemplate = _.template($('#productTemplate').html());

    const $saleBlock = $('#sale');
    const $promoBlock = $('#promo');
    const $recommendedBlock = $('#recommended');

    let $elem;

    $.ajax({
        url: './products.json',
        beforeSend: () => {
            $.fancybox.showLoading();
        },
        success: (data) => {
            $saleBlock.append(`<h1>Распродажа</h1>`);
            $promoBlock.append(`<h1>Промо акция</h1>`);
            $recommendedBlock.append(`<h1>Рекомендуемые товары</h1>`);

            data.forEach((item) => {
                switch (item.type) {
                    case 'sale':
                        $elem = $saleBlock;
                        break;
                    case 'promo':
                        $elem = $promoBlock;
                        break;
                    case 'recommended':
                        $elem = $recommendedBlock;
                        break;
                    default:
                        break;
                }

                $elem.append(productTemplate({
                    name: item.name,
                    pic: `./media/products/${item.pic}`,
                    price: item.price
                }));
            })
        },
        complete: () => {
            $.fancybox.hideLoading();
        },
        error: () => {
            alert('Sorry, we cant show you products');
        }
    });
});
