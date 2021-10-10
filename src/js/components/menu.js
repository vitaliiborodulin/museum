// const menuBtn = $('.header__burger');
// const menu = $('.header__menu')

// menuBtn.on('click', function() {
//     $(this).toggleClass('open');
//     menu.slideToggle(300, function() {
//         if ($(this).css('display') === "none") {
//             $(this).removeAttr('style');
//         }
//     });
// });

var menuToggle = 'button.header__menu-toggle';
var navToMenu = 'div.header__menu';

if ($(navToMenu).length) {
    $(menuToggle).click(function() {
        $('html').addClass('menu-active');
    });

    $('body').append('<div class="menu-overlay"></div><div class="menu"><div class="menu__inner">' + $(navToMenu).html() + '</div></div>');

    var menu = $('div.menu__inner')
        .before('<div class="menu__close"></div>')
        .prepend('<div class="menu__topbar"><div class="menu__back"></div><div class="menu__title"></div></div>');
    $('div.menu-overlay, div.menu__close').click(function() {
        $('html').removeClass('menu-active');
    });

    var topbar = $('div.menu__topbar', menu);
    var back = $('div.menu__back', menu);
    var title = $('div.menu__title', menu);

    menu
        .find('li').removeAttr('class id').end()
        .find('ul')
        .removeAttr('class id')
        .addClass('menu__item')
        .first().addClass('menu__topmenu active').attr('id', 'm-0')
        .find('a:not(:last-child)').each(function(i) {
            i++;
            var link = $(this);
            var submenu = link.next('ul').removeClass('sub-menu').addClass('menu__submenu').attr('id', 'm-' + i);
            var parent = submenu.closest('li').closest('ul').attr('id');
            submenu.data('parent', parent);
            link.after('<div class="menu__show-submenu" data-id="m-' + i + '"></div>');
        });
    menu.find('ul').appendTo(menu);
    menu.find('ul.menu__item:not(.menu__topmenu):not(.menu__submenu)').each(function() {
        menu.find('ul.menu__topmenu').append($(this).html());
        $(this).remove();
    });
    menu.find('nav').remove();
    menu
        .on('click', 'div.menu__show-submenu', function() {
            topbar.addClass('active');
            var arrow = $(this);
            arrow.closest('ul').removeClass('active').addClass('hidden');
            var id = arrow.data('id');
            $('#' + id).addClass('active');
            var parent = $('#' + id).data('parent');
            back.data('show', parent).data('hide', id);
            title.text(arrow.siblings('a').text());
        })
        .on('click', 'div.menu__back', function() {
            var back = $(this);
            var show = back.data('show');
            var hide = back.data('hide');
            if (show === 'm-0') {
                menu.find('ul.menu__topmenu').addClass('active');
                topbar.removeClass('active');
            }
            back.data('show', $('#' + show).data('parent')).data('hide', show);
            title.text(menu.find('[data-id="' + show + '"]').siblings('a').text());
            $('#' + show).addClass('active').removeClass('hidden');
            $('#' + hide).removeClass('active');
        });
}