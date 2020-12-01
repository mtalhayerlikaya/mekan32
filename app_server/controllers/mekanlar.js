var express = require('express');
var router = express.Router();

/* GET home page. */
const anaSayfa = function(req, res, next) {
    res.render('mekanlar-liste', {
        'baslik': 'Mekan32 | Anasayfa',
        'footer': 'Muhammed  Talha Yerlikaya 2020',
        'sayfaBaslik': {
            'siteAd': 'Mekan 32',
            'aciklama': 'Isparta Civarındaki Mekanları Keşfedin!'
        },
        'mekanlar': [{
                'ad': 'Starbucks',
                'adres': 'Centrum Garden Avm',
                'puan': 3,
                'imkanlar': ['Dunya Kahveleri', 'Kekler', 'Pastalar'],
                'mesafe': '1km'
            },
            {
                'ad': 'HD Iskender',
                'adres': '212 AVM',
                'puan': 5,
                'imkanlar': ['Mercimek Corbasi', 'Iskender', 'Et Doner'],
                'mesafe': '1.3km'
            },
            {
                'ad': 'Kahve Dunyası',
                'adres': 'MarmaraPark Avm',
                'puan': 5,
                'imkanlar': ['Dunya Kahveleri', 'Kekler', 'Pastalar'],
                'mesafe': '1.5km'
            },
            {
                'ad': 'Kahve Evi',
                'adres': 'Forum Istanbul Avm',
                'puan': 2,
                'imkanlar': ['Dünya Kahveleri', 'Filtre Kahveler', 'Yöresel Kahveler'],
                'mesafe': '1.9km'
            },
            {
                'ad': 'Ramiz Kofte',
                'adres': 'Torium Avm',
                'puan': 4,
                'imkanlar': ['Kasap Kofte', 'Kasarlı Kofte', 'Sebzeli Kofte'],
                'mesafe': '4.5km'
            }
        ]
    });
}

const mekanBilgisi = function(req, res, next) {
    res.render('mekan-detay', {
        'baslik': 'Mekan Bilgisi',
        'footer': 'Muhammed Talha Yerlikaya 2020',
        'sayfaBaslik': 'Starbucks',
        'mekanBilgisi': {
            'ad': 'Starbucks',
            'adres': 'Centrum Garden Avm',
            'puan': 3,
            'imkanlar': ['Dunya Kahveleri', 'Kekler', 'Pastalar'],
            'koordinatlar': {
                'enlem': '37.781885',
                'boylam': '30.566034'
            },
            'saatler': [{
                'gunler': 'Pazartesi-Cuma',
                'acilis': '08:00',
                'kapanis': '22:00',
                'kapali': false
            }, {
                'gunler': 'Cumartesi',
                'acilis': '09:00',
                'kapanis': '21:00',
                'kapali': false
            }, {
                'gunler': 'Pazar',
                'kapali': true
            }],
            'yorumlar': [{
                    'yorumYapan': 'Muhammed Talha Yerlikaya',
                    'puan': 3,
                    'tarih': '27.11.2020',
                    'yorumMetni': 'Kahveler lezzetli.'
                }
            ]
        }
    });
}

const yorumEkle = function(req, res, next) {
    res.render('yorum-ekle', {
        title: 'Yorum Ekle',
        'footer': 'Muhammed Talha Yerlikaya 2020',
    });
}


module.exports = {
    anaSayfa,
    mekanBilgisi,
    yorumEkle
}

module.exports.admin = function(req, res, next) {
    res.render('admin', { title: 'Admin' });
};