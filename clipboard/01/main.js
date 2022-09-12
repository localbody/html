$(function () {
    var body = $('body'),
        articleCover = $('#article-cover'),
        shareBox = $('#share-box-cover'),
        shareBtn = $('.share-btn'),
        selectedTextBox = $('#selected-text'),
        closeShareBoxBtn = $('#close-share-box'),
        twitterShareBtn = $('#share-twitter'),
        whatsappSharBtn = $('#share-whatsapp'),
        telegramShareBtn = $('#share-telegram'),
        emailShareBtn = $('#share-email')

    function _void() {
        articleCover.removeClass('faded')
        shareBox.removeClass('active')
        body.removeClass('ovh')
        shareBtn.removeAttr('href')
        selectedTextBox.text('')
    }

    function makeLinks(text) {
        text = encodeURIComponent(text)
        url = window.location.href

        twitterShareBtn.attr(
            'href',
            'https://twitter.com/intent/tweet?text=' + text
        )
        whatsappSharBtn.attr(
            'href',
            'https://api.whatsapp.com/send?text=' + text
        )
        telegramShareBtn.attr(
            'href',
            'https://telegram.me/share/url?url=' + url + '&text=' + text
        )
        emailShareBtn.attr('href', 'mailto:?body=' + text)
    }

    function getSelectionText() {
        var text = ''
        if (window.getSelection) {
            text = window.getSelection().toString()
        } else if (document.selection && document.selection.type != 'Control') {
            text = document.selection.createRange().text
        }

        if (text.trim().length > 0) {
            articleCover.addClass('faded')
            shareBox.addClass('active')
            body.addClass('ovh')
            selectedTextBox.text(text)
            makeLinks(text)
        } else _void()
    }

    $('#article').on('mouseup', getSelectionText)
    closeShareBoxBtn.on('click', _void)
})
