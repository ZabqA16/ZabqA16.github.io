var seznam = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];

document.getElementById("ulozitKartu").addEventListener("click", () => {
  pridatKartu();
});

document.getElementById("smazatKarty").addEventListener("click", () => {
  localStorage.clear();
  flashcards.innerHTML = '';
  seznam = [];
});

document.getElementById("zobrazitBox").addEventListener("click", () => {
  document.getElementById("vytvoritKartu").style.display = "block";
});

document.getElementById("zavritBox").addEventListener("click", () => {
  document.getElementById("vytvoritKartu").style.display = "none";
});

flashcardMaker = (text, smazIndex) => {
  const flashcard = document.createElement("div");
  const otazka = document.createElement('h2');
  const odpoved = document.createElement('h2');
  const smaz = document.createElement('i');

  flashcard.className = 'flashcard';

  otazka.setAttribute("style", "border-top:1px solid rgb(37, 123, 140); padding: 15px; margin-top:30px");
  otazka.textContent = text.moje_otazka;

  odpoved.setAttribute("style", "text-align:center; display:none; color: rgb(30, 73, 82)");
  odpoved.textContent = text.moje_odpoved;

  smaz.className = "fas fa-minus";
  smaz.addEventListener("click", () => {
    seznam.splice(smazIndex, 1);
    localStorage.setItem('list', JSON.stringify(seznam));
    window.location.reload();
  })

  flashcard.appendChild(otazka);
  flashcard.appendChild(odpoved);
  flashcard.appendChild(smaz);

  flashcard.addEventListener("click", () => {
    if(odpoved.style.display == "none")
      odpoved.style.display = "block";
    else
      odpoved.style.display = "none";
  })

  document.querySelector("#flashcards").appendChild(flashcard);
}

seznam.forEach(flashcardMaker);

pridatKartu = () => {
  const otazka = document.querySelector("#otazka");
  const odpoved = document.querySelector("#odpoved");

  let info = {
    'moje_otazka' : otazka.value,
    'moje_odpoved'  : odpoved.value
  }

  seznam.push(info);
  localStorage.setItem('list', JSON.stringify(seznam));
  flashcardMaker(seznam[seznam.length - 1], seznam.length - 1);
  otazka.value = "";
  odpoved.value = "";
}