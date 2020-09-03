import './index.scss'
import $ from 'jquery'

export default class Notifications {
    static add(message, type = 'default', header = false, close = true, remove = true) {
        if ($('#notifications').length == 0) {
            $('body').append('<div id="notifications"></div>')
        }

        let index = $('#notifications').children('.notifications__notice').length
        let blockHeader = !header ? '' : '<div class="notice__title">' + header + '</div>'
        let blockClose = close ? '<i class="notice__close icon">close</i>' : ''

        $('#notifications').append(
            `<div class="notifications__notice notice_` + type + `" data-index="` + index + `">
                ` + blockHeader + `
                ` + blockClose + `
                <div class="notice__message">` + message + `</div>
            </div>`
        )

        if (remove) {
            $('#notifications').children('.notifications__notice[data-index="' + index + '"]').fadeIn(500, e => {
                setTimeout(this.remove, 5000, index)
            })
        } else {
            $('#notifications').children('.notifications__notice[data-index="' + index + '"]').fadeIn(500)
        }
    }

    static remove(index) {
        $('#notifications').children('.notifications__notice[data-index="' + index + '"]').fadeOut(500, function () {
            $(this).remove()
        })
    }
}