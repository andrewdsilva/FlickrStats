// ==UserScript==
// @name         Flickr Profile Statistics
// @author       Nathan Lopez
// @match        https://www.flickr.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

// Show data
function showData(data) {
    var totalView = 0;
    var totalFav  = 0;
    var totalComm = 0;

    for (var i = 0; i < data.photos.photo.length; i++) {
        totalView += parseInt(data.photos.photo[i].count_views);
        totalFav  += parseInt(data.photos.photo[i].count_faves);
        totalComm += parseInt(data.photos.photo[i].count_comments);
    }

    // console.log(totalView);

    $('p.followers').append('<em>•</em><a href="">' + totalView + ' views</a>');
    $('p.followers').append('<em>•</em><a href="">' + totalFav + ' favorites</a>');
    $('p.followers').append('<em>•</em><a href="">' + totalComm + ' comments</a>');

    $('p.followers').css('max-width', '600px');
};

// Call API
function getStat() {
    var checkConfig = setInterval(function() {
        // Checking that request config is loaded
        if (!YUI_config.flickr.requestConfig) {
            return;
        } else {
            clearInterval(checkConfig);
        }

        // Checking the header is present and page
        if ($('p.followers').length === 0 || !$('.view').hasClass('photostream-page-view')) {
            return;
        }

        var date = new Date();
        var id   = YUI_config.flickr.requestConfig.auth.user.nsid;

        if ($('.send-flickr-mail').length > 0) {
            id = $('.send-flickr-mail').attr('href').match(/=(.*)/)[1];
        }

        $.ajax(
            {
                method      : 'GET',
                url         : 'https://api.flickr.com/services/rest',
                crossDomain : true,
                xhrFields   : { withCredentials : true },
                type        : 'post',
                async       : false,
                data        : {
                    'from_date'         : date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
                    'viewerNSID'        : YUI_config.flickr.requestConfig.auth.user.nsid,
                    'method'            : 'flickr.people.getPhotos',
                    'csrf'              : YUI_config.flickr.requestConfig.auth.csrf,
                    'api_key'           : YUI_config.flickr.api.site_key,
                    'format'            : 'json',
                    'hermes'            : '1',
                    'hermesClient'      : '1',
                    'reqId'             : YUI_config.flickr.request.id,
                    'nojsoncallback'    : '1',
                    'privacy_filter'    : '1',
                    'per_page'          : '10000',
                    'page'              : '1',
                    'extras'            : 'can_addmeta,can_comment,can_download,can_share,contact,count_comments,count_faves,count_views,date_taken,date_upload,description,icon_urls_deep,isfavorite,ispro,license,media,needs_interstitial,owner_name,owner_datecreate,path_alias,realname,rotation,safety_level,secret_k,secret_h,url_c,url_f,url_h,url_k,url_l,url_m,url_n,url_o,url_q,url_s,url_sq,url_t,url_z,visibility,visibility_source,o_dims,is_marketplace_printable,is_marketplace_licensable,publiceditability',
                    'get_user_info'     : '1',
                    'jump_to'           : '',
                    'user_id'           : id
                },
                success : showData
            }
        );
    }, 500);
};

// Call when page is load
$( document ).ready(function() {
    getStat();
});

// Reload stat when click on menu
$(document).on('click', 'a', function() {
    setTimeout(function() {
        getStat();
    }, 1000);
});