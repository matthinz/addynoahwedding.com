(function() {

    var $window = $(window),
        $nav = null,
        $lastSection = null;

    $(function() {

        handleNav();
        handleRSVP();
        ensureLastSectionTallEnough();

        var timer;
        $window.bind('resize', function() {
            if (timer) {
                window.clearTimeout(timer);
            }
            timer = window.setTimeout(function() {
                timer = 0;
                ensureLastSectionTallEnough();
            }, 10);
        });

    });

    function ensureLastSectionTallEnough() {

        if ($lastSection === null) {
            $lastSection = $('.content > section:last-child');
        }

        if ($nav === null) {
            $nav = $('header > nav');
        }
            
        var lastSectionHeight = $window.height() - $nav.height();
        $lastSection.css('min-height', ($window.height() - $nav.height()) + 'px');

    }

    function handleNav() {
        $(document).on('click', 'a[href^=#]', function(evt) {
            evt.preventDefault();
            var m = /#(.+)/.exec(this.href);
            var $el = $('#' + m[1]);
            scrollTo($el);
        });
    }

    function handleRSVP() {

        $(document).on('click', '#rsvp-button', function(evt) {
            evt.preventDefault();

            loadRSVPForm();
            $(document.body).addClass('show-rsvp');
            window.setTimeout(function() {
                $("#rsvp").each(function() {
                    scrollTo(this);
                })
            }, 0)

        });

    }

    function loadRSVPForm() {

        if ($(document.body).is('.wufoo-loaded')) {
            return;
        }

        var z7x4m1;(function(d, t) {
        var s = d.createElement(t), options = window.RSVP_OPTIONS;
        s.src = ('https:' == d.location.protocol ? 'https://' : 'http://') + 'wufoo.com/scripts/embed/form.js';
        s.onload = s.onreadystatechange = function() {
        var rs = this.readyState; if (rs) if (rs != 'complete') if (rs != 'loaded') return;
        try { wooFooLoaded(); z7x4m1 = new WufooForm();z7x4m1.initialize(options);z7x4m1.display(); } catch (e) {}};
        var scr = d.getElementsByTagName(t)[0], par = scr.parentNode; par.insertBefore(s, scr);
        })(document, 'script');
    }

    function scrollTo(el) {
        var $el = $(el),
            offset = $el.offset(),
            padding = parseInt($(document.body).css('padding-top'), 10),
            y;

        if ($el.is(':first-child')) {
            y = 0;
        } else {
            y = offset.top - (padding / 2);
        }

        $('html,body').animate({
            scrollTop: y
        }, 300);
    }

    function wooFooLoaded() {
        $(document.body).addClass('wufoo-loaded');
    }

})();