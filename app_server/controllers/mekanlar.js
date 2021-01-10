var request = require('postman-request');

var apiSecenekleri = {
  sunucu : "http://localhost:3000",
  apiYolu: '/api/mekanlar'
}

var istekSecenekleri

var footer = "Muhammed Talha Yerlikaya 2020"

var mesafeyiFormatla = function (mesafe) {
  var yeniMesafe, birim;
  if (mesafe > 1000) {
    yeniMesafe = parseFloat(mesafe/1000).toFixed(1);
    birim = ' km';
  } else {
    yeniMesafe = parseFloat(mesafe).toFixed(1);
    birim = ' m';
  }
  return yeniMesafe + birim;
}

var anasayfaOlustur = function(req, res, cevap, mekanListesi) {
  var mesaj;

  if (!(mekanListesi instanceof Array)) {
    mesaj = "API HATASI: Bir şeyler ters gitti";
    mekanListesi = [];
  } else {
    if(!mekanListesi.length) {
      mesaj = "Civarda mekan bulunamadı!";
    }
  }
  res.render('mekanlar-liste',{
    baslik: "Mekan32",
    sayfaBaslik: {
      siteAd: 'Mekan32',
      aciklama: 'Isparta Civarındaki Mekanları Keşfedin!'
    },
    mekanlar: mekanListesi,
    mesaj: mesaj,
    cevap: cevap
  });
}

const anaSayfa=function(req ,res, next) {
  istekSecenekleri =
  {
    url : apiSecenekleri.sunucu + apiSecenekleri.apiYolu,
    method : "GET",
    json : {},
    qs : {
      enlem : req.query.enlem,
      boylam : req.query.boylam
    }
  };
  request(
    istekSecenekleri,
    function(hata, cevap, mekanlar) {
      var i, gelenMekanlar;
      gelenMekanlar = mekanlar;

      if (!hata && gelenMekanlar.length) {
        for (i = 0; i < gelenMekanlar.length; i++) {
          gelenMekanlar[i].mesafe = mesafeyiFormatla(gelenMekanlar[i].mesafe);
        }
      }
      anasayfaOlustur(req, res, cevap, gelenMekanlar);
    }
  );
}

var detaySayfasiOlustur = function(req, res, mekanDetaylari){
  res.render('mekan-detay',
  {
    baslik: mekanDetaylari.ad,
    sayfaBaslik: mekanDetaylari.ad,
    mekanBilgisi: mekanDetaylari
  });
}

var hataGoster = function(req, res, durum){
  var baslik, icerik;
  if (durum==404) {
    baslik = "404, Sayfa Bulunamadı!";
    icerik = "Kusura bakmayın, sayfayı bulamadık!";
  } else {
    baslik = durum + ", Bir şeyler ters gitti!";
    icerik = "Ters giden bir şey var!";
  }
  res.status(durum);
  res.render('hata',{
    baslik:baslik,
    icerik:icerik
  });
};

const mekanBilgisi=function(req ,res, next) {
  
  istekSecenekleri = {
    url : apiSecenekleri.sunucu + apiSecenekleri.apiYolu + req.params.mekanid,
    method : "GET",
    json : {}
  };

  request(
    istekSecenekleri,
    function(hata, cevap, mekanDetaylari) {
      var gelenMekan = mekanDetaylari;
      if (cevap.statusCode == 200) {
        gelenMekan.koordinatlar = {
          enlem : mekanDetaylari.koordinatlar[0],
          boylam : mekanDetaylari.koordinatlar[1]
        };
        detaySayfasiOlustur(req, res, gelenMekan);
      } else {
        hataGoster(req, res, cevap.statusCode);
      }
    }
  );
}

const yorumEkle=function(req ,res, next) {
  res.render('yorum-ekle', {title: 'Yorum Ekle'});
}
module.exports={
  anaSayfa,
  mekanBilgisi,
  yorumEkle
}