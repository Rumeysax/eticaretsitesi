// Sayfa yüklendiğinde sepet içeriğini al ve göster
window.onload = function () {
  sepetiGoster();
};

// Ürünü sepete ekle
function sepeteEkle(urunAdi, urunFiyati, urunResmi) {
  var sepetim;

  // Sepet var mı diye kontrol et
  if (localStorage.getItem('sepetim') === null) {
      sepetim = {};
  } else {
      sepetim = JSON.parse(localStorage.getItem('sepetim'));
  }

  // Eğer ürün sepette varsa miktarını arttır, yoksa yeni ürün ekle
  if (sepetim[urunAdi]) {
      sepetim[urunAdi].miktar++;
  } else {
      sepetim[urunAdi] = {
          fiyat: urunFiyati,
          miktar: 1,
          resim: urunResmi
      };
      alert("Ürün sepetinize eklendi");
  }

  // Local storage'a güncellenmiş sepeti kaydet
  localStorage.setItem('sepetim', JSON.stringify(sepetim));

  // Sepet içeriğini göster
  sepetiGoster();

  // Ürün sepete eklendiğine dair bir mesaj göster
  alert('Ürün sepetinize eklendi!');
}

// Ürünü sepetten çıkar
function sepettenCikar(urunAdi) {
  var sepetim = JSON.parse(localStorage.getItem('sepetim'));

  // Eğer ürün sepette varsa miktarını azalt, sıfırsa ürünü tamamen çıkar
  if (sepetim[urunAdi]) {
      if (sepetim[urunAdi].miktar > 1) {
          sepetim[urunAdi].miktar--;
      } else {
          delete sepetim[urunAdi];
      }

      // Local storage'a güncellenmiş sepeti kaydet
      localStorage.setItem('sepetim', JSON.stringify(sepetim));

      // Sepet içeriğini göster
      sepetiGoster();
  }
}

// Ürün adedini arttır
function adetArttir(urunAdi) {
  var sepetim = JSON.parse(localStorage.getItem('sepetim'));

  // Eğer ürün sepette varsa miktarını arttır
  if (sepetim[urunAdi]) {
      sepetim[urunAdi].miktar++;

      // Local storage'a güncellenmiş sepeti kaydet
      localStorage.setItem('sepetim', JSON.stringify(sepetim));

      // Sepet içeriğini göster
      sepetiGoster();
  }
}

// Ürün adedini azalt
function adetAzalt(urunAdi) {
  var sepetim = JSON.parse(localStorage.getItem('sepetim'));

  // Eğer ürün sepette varsa miktarını azalt
  if (sepetim[urunAdi]) {
      if (sepetim[urunAdi].miktar > 1) {
          sepetim[urunAdi].miktar--;

          // Local storage'a güncellenmiş sepeti kaydet
          localStorage.setItem('sepetim', JSON.stringify(sepetim));

          // Sepet içeriğini göster
          sepetiGoster();
      }
  }
}

// Sepeti temizle
function sepetiTemizle() {
  localStorage.removeItem('sepetim');
  sepetiGoster();
}

// Sepeti göster
function sepetiGoster() {
  var sepetListesi = document.getElementById('urunler');
  var totalPriceElement = document.getElementById('total-price');
  var total = 0;

  // Sepet içeriğini temizle
  sepetListesi.innerHTML = '';

  // Sepet local storage'da var mı diye kontrol et
  if (localStorage.getItem('sepetim') !== null) {
      var sepetim = JSON.parse(localStorage.getItem('sepetim'));

      // Her bir ürünü sepet içinde göster
      Object.keys(sepetim).forEach(function (urunAdi) {
          var li = document.createElement('li');
          var urun = sepetim[urunAdi];

          // Ürün resmini ekle
          var img = document.createElement('img');
          img.src = urun.resim;
          img.alt = urunAdi;
          img.style.width = '50px'; // Resim boyutunu ayarlayabilirsiniz
          li.appendChild(img);

          // Ürün adını ve miktarını ekle
          li.appendChild(document.createTextNode(`${urunAdi} - ${urun.fiyat} TL x ${urun.miktar}`));

          // Arttırma butonunu ekle
          var increaseButton = document.createElement('button');
          increaseButton.textContent = '+';
          increaseButton.className = 'button';
          increaseButton.onclick = function () {
              adetArttir(urunAdi);
          };
          li.appendChild(increaseButton);

          // Azaltma butonunu ekle
          var decreaseButton = document.createElement('button');
          decreaseButton.textContent = '-';
          decreaseButton.className = 'button';
          decreaseButton.onclick = function () {
              adetAzalt(urunAdi);
          };
          li.appendChild(decreaseButton);

          // Silme tuşunu ekle
          var deleteButton = document.createElement('button');
          deleteButton.textContent = 'Sil';
          deleteButton.className = 'button delete-button';
          deleteButton.onclick = function () {
              sepettenCikar(urunAdi);
          };
          li.appendChild(deleteButton);

          sepetListesi.appendChild(li);

          // Toplam fiyatı hesapla
          total += parseFloat(urun.fiyat) * urun.miktar;
      });
  } else {
      // Sepet boşsa bir mesaj göster
      sepetListesi.innerHTML = '<li>Sepetiniz boş</li>';
  }

  // Toplam fiyatı göster
  totalPriceElement.textContent = total.toFixed(2) + ' TL';
}