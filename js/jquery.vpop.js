/**
 * @filename jquery.vpop.js
 * @dese     jquery plugin replace system notice
 *           - include functions:
 *               $.alert();
 *               $.confirm();
 * @author   longzhou (buji)
 * @blog     http://vicbeta.com
 * @email    pancnlz@gmail.com
 * @create   2013-10-28
 * @update   2013-10-28
 * @version  1.0.0
 */
(function($) {
    var App = {};

    /**
     * @desc 工具集
     */
    App.Util = {
        /**
         * @desc Mask覆盖层
         */
        appendMask: function() {
            var $mask;
            $mask = [
                '<div class="v_pop_mask" id="v_pop_mask"></div>'
            ].join('');

            $mask = $($mask);
            $mask.css({
                'opacity': .3
            });

            if ($('#v_pop_mask').length <= 0) {
                $('body').append($mask);
            }
        },
        /**
         * @desc 显示弹框
         * @type {string} type 弹框类型
         * @params {object} params 弹框参数
         */
        show: function(type, params) {
            var $pop_wrap, $box, getDom;

            $pop_wrap = $('#v_pop_wrap');

            if ($pop_wrap.length <= 0) {
                $pop_wrap = $([
                    '<div class="v_pop_wrap" id="v_pop_wrap">',
                        '<h5 class="v_pop_tit"></h5>',
                        '<a href="javascript:;" class="v_pop_close">×</a>',
                        '<div class="v_pop_box"></div>',
                    '</div>'
                ].join(''));

                $('body').append($pop_wrap);
            }

            $pop_wrap.find('.v_pop_tit').eq(0).html(params.title);

            getDom = {
                alert: function() {
                    $box = $('.v_alert_box').eq(0);

                    if ($box.length <= 0) {
                        $box = $([
                            '<div class="v_alert_box v_pop_innerbox">',
                                '<p class="v_pop_content"></p>',
                                '<a href="javascript:;" class="v_pop_btn v_pop_okbtn">确定</a>',
                            '</div>'
                        ].join(''));
                    }

                    $box.find('.v_pop_content').eq(0).html(params.content);
                    $box.show();

                    return $box;
                },
                confirm: function() {
                    $box = $('.v_confirm_box').eq(0);
                    if ($box.length <= 0) {
                        $box = $([
                            '<div class="v_confirm_box v_pop_innerbox">',
                                '<p class="v_pop_content"></p>',
                                '<a href="javascript:;" class="v_pop_btn v_pop_okbtn">确定</a>',
                                '<a href="javascript:;" class="v_pop_btn v_pop_cancelbtn">取消</a>',
                            '</div>'
                        ].join(''));
                    }

                    $box.find('.v_pop_content').eq(0).html(params.content);
                    $box.show();

                    return $box;
                }
            };

            $pop_wrap.find('.v_pop_box').eq(0).find('.v_pop_innerbox')
                .hide()
                .end()
                .append(getDom[type]());

            $pop_wrap.css({
                'display': 'block',
                'opacity': 0
            });

            $pop_wrap.css({
                'margin-left': -$pop_wrap.width() / 2 - 1,
                'margin-top': -$pop_wrap.height() / 2 - 1
            });

            // show
            $('#v_pop_mask').show();
            $pop_wrap.css({
                'opacity': 1
            });
        },
        /**
         * @desc 关闭弹框
         * @param {book} ret 返回值
         * @param {function} callback 回调函数
         */
        close: function(ret, callback) {
            var $pop_wrap;

            $pop_wrap = $('#v_pop_wrap');

            // hide
            $('#v_pop_mask').hide();
            $pop_wrap.hide();

            if (callback !== undefined && typeof callback === 'function') {
                callback(ret);
            }
        }
    };

    /**
     * @desc alert
     * @param {string} str - display string
     * @param {object} options - 定制参数
     */
    $.alert = function(str, options) {
        var render, settings, bindEvent;

        settings = $.extend({
            title: '提示',
            content: str
        }, options);

        bindEvent = function() {
            var $v_pop_wrap, $v_pop_close, $v_pop_okbtn, $mask, t;

            $mask = $('#v_pop_mask');
            $v_pop_wrap = $('#v_pop_wrap');
            $v_pop_close = $v_pop_wrap.find('.v_pop_close').eq(0);
            $v_pop_okbtn = $v_pop_wrap.find('.v_alert_box').eq(0).find('.v_pop_okbtn').eq(0);

            $v_pop_close.off('click').on('click', function() {
                App.Util.close();
            });
            $v_pop_okbtn.off('click').on('click', function() {
                App.Util.close();
            });
            $mask.off('click').on('click', function() {
                clearTimeout(t);
                $v_pop_wrap.addClass('v_pop_shake');
                t = setTimeout(function() {
                    $v_pop_wrap.removeClass('v_pop_shake');
                }, 500);
            });
        };

        render = function() {
            App.Util.appendMask();

            App.Util.show('alert', settings);

            bindEvent();
        }();
    };

    /**
     * @desc confirm
     * @param {string} str - display string
     * @param {function} callback - 回调函数，参数为返回值
     * @param {object} options - 定制参数
     */
    $.confirm = function(str, callback, options) {
        var render, settings, bindEvent;

        settings = $.extend({
            title: '提示',
            content: str
        }, options);

        bindEvent = function() {
            var $v_pop_wrap, $v_pop_close, $v_confirm_box, $v_pop_okbtn, $mask, t;

            $mask = $('#v_pop_mask');
            $v_pop_wrap = $('#v_pop_wrap');
            $v_pop_close = $v_pop_wrap.find('.v_pop_close').eq(0);
            $v_confirm_box = $v_pop_wrap.find('.v_confirm_box').eq(0);
            $v_pop_okbtn = $v_confirm_box.find('.v_pop_okbtn').eq(0);
            $v_pop_cancelbtn = $v_confirm_box.find('.v_pop_cancelbtn').eq(0);

            $v_pop_close.off('click').on('click', function() {
                App.Util.close(false, callback);
            });
            $v_pop_okbtn.off('click').on('click', function() {
                App.Util.close(true, callback);
            });
            $v_pop_cancelbtn.off('click').on('click', function() {
                App.Util.close(false, callback);
            });
            $mask.off('click').on('click', function() {
                clearTimeout(t);
                $v_pop_wrap.addClass('v_pop_shake');
                t = setTimeout(function() {
                    $v_pop_wrap.removeClass('v_pop_shake');
                }, 500);
            });
        };

        render = function() {
            App.Util.appendMask();

            App.Util.show('confirm', settings);

            bindEvent();
        }();
    };
}(jQuery));
