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
        },
        /**
         * @desc 防抖执行
         * @param {function} func 调用函数
         * @param {int} wait 间隔ms
         */
        debounce: function(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this,
                    args = arguments;

                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };

                var callNow = immediate && !timeout;

                clearTimeout(timeout);
                timeout = setTimeout(later, wait);

                if (callNow) func.apply(context, args);
            };
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

    /**
     * @desc confirm pop
     * @param {string} str - display string
     * @param {function} callback - 回调函数，参数为返回值
     * @param {object} options - 定制参数
     */
    $.fn.confirm = function(str, callback, options) {
        var $this, settings,
            render, getDom, resizeEvent, close, bindEvent;

        $this = $(this);
        settings = $.extend({
            content: str
        }, options);

        resizeEvent = function($dom) {
            $(window).on('resize', App.Util.debounce(function() {
                if ($dom.filter(':visible').length > 0) {
                    showTip();
                }
            }, 100));
        };

        getDom = function() {
            var $dom;

            $dom = $('#v_pop_ftip');

            if ($dom.length <= 0) {
                $dom = $([
                    '<div id="v_pop_ftip" class="v_pop_ftip">',
                        '<p class="v_pop_ftip_content"></p>',
                        '<a href="javascript:;" class="v_pop_min_btn v_pop_min_okbtn">确定</a>',
                        '<a href="javascript:;" class="v_pop_min_btn v_pop_min_cancelbtn">取消</a>',
                    '</div>'
                ].join(''));

                resizeEvent($dom);
            }
            $dom.find('.v_pop_ftip_content').html(str);
            $dom.removeClass('v_pop_ftip_minwidth')
                .removeClass('v_pop_ftip_maxwidth')
                .css('opacity', 0);
            $dom.show();

            return $dom;
        };

        bindEvent = function() {
            var $v_pop_ftip, $v_pop_close, $v_pop_okbtn;

            $v_pop_ftip = $('#v_pop_ftip');
            $v_pop_okbtn = $v_pop_ftip.find('.v_pop_min_okbtn').eq(0);
            $v_pop_cancelbtn = $v_pop_ftip.find('.v_pop_min_cancelbtn').eq(0);

            $v_pop_okbtn.off('click').on('click', function() {
                close(true, callback);
            });
            $v_pop_cancelbtn.off('click').on('click', function() {
                close(false, callback);
            });
        };

        /**
         * @desc 关闭弹框
         * @param {book} ret 返回值
         * @param {function} callback 回调函数
         */
        close = function(ret, callback) {
            $('#v_pop_ftip').hide();

            if (callback !== undefined && typeof callback === 'function') {
                callback(ret);
            }
        };

        showTip = function() {
            var $dom, thisOffset, domWidth;

            $dom = $('#v_pop_ftip');
            thisOffset = $this.offset();
            domWidth = $dom.width();

            if (domWidth < 120) {
                $dom.addClass('v_pop_ftip_minwidth');
            }

            if (domWidth > 240) {
                $dom.addClass('v_pop_ftip_maxwidth');
            }

            $dom.css({
                top: thisOffset.top - (
                    $dom.height() + 
                    parseInt($dom.css('padding-bottom'), 10) + 
                    parseInt($dom.css('padding-top'), 10) + 
                    parseInt($dom.css('border-bottom-width'), 10) + 
                    parseInt($dom.css('border-top-width'), 10)
                ),
                left: thisOffset.left + (
                    parseInt($this.css('padding-left'), 10) + 
                    $this.width() / 2 + 
                    parseInt($this.css('border-top-width'), 10)
                    ) - (
                    $dom.width() / 2 + 
                    parseInt($dom.css('padding-left'), 10) + 
                    parseInt($dom.css('border-top-width'), 10)
                ),
                opacity: 1
            });
        };

        render = function() {
            var $dom;

            $dom = getDom();
            $('body').append($dom);

            showTip();
            bindEvent();
        };

        return this.each(function() {
            render();
        });
    };
}(jQuery));
