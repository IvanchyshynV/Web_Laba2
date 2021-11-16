function swapElements(el0, el1) {
  let tmp = el0.cloneNode(false);
  el0.parentNode.replaceChild(tmp, el0);
  el1.parentNode.replaceChild(el0, el1);
  tmp.parentNode.replaceChild(el1, tmp);
}

function area() {
  let a = +document.form1.t1.value;
  let b = +document.form1.t2.value;
  let h = +document.form1.t3.value;

  if (![a, b, h].some((i) => Number.isNaN(i) || i <= 0)) {
    let area = 0.5 * h * (a + b);
    document.getElementById("output").innerHTML = "Площа = " + area;
  }
}

function findDivisors() {
  let res;
  let n = +document.getElementById("divisors").value;

  if (Number.isInteger(n) && n > 0) {
    res = [];
    for (let i = 0; i <= n; i++) {
      if (n % i === 0) {
        res.push(i);
      }
    }
    res = res.join(" ");
    alert("Дільники: " + res);
    document.cookie = "divisors=" + res;
  }
}

window.onload = function () {
  if (localStorage.getItem("textn")) {
    let textn = localStorage.getItem("textn");
    document.getElementById("block4").innerHTML = textn;
  }
  for (let i = 1; i <= localStorage.getItem("count"); i++) {
    if (localStorage.getItem("img" + i)) {
      let dataImage = localStorage.getItem("img" + i);
      let el = document.getElementById("block4");
      el.outerHTML += `<img id="img${i}" style="width:15rem; height:15rem"><button style="margin-bottom: 1rem" id="b${i}" onclick="remove_img('${i}')">видалити зображення</button>`;
      document.getElementById("img" + i).src = "data:image/png;base64," + dataImage;
    }
  }
  setTimeout(() => {
    if (!document.cookie) {
      let el = document.getElementsByClassName("cform1")[0];
      el.outerHTML +=
        '<form class="form2"> задайте число <input type="text" id="divisors" size="1" /><br /> <button type="button" onclick="findDivisors()">Знайти дільники</button></form>';
    } else {
      ans = confirm("Кукі: " + document.cookie + "\nЗберегти дані?");
      ans ? saveCookies() : deleteCookies();
    }
  }, 20);
};

function saveCookies() {
  alert("В наявності браузера є кукі. Потрібно перезавантажити сторінку.");
}

function deleteCookies() {
  document.cookie = "divisors=; Max-Age=0";
  alert("Кукі видалені.");
  location.reload();
}

function changeCase() {
  let text = document.getElementById("block4").innerHTML.replace(/  +/g, " ").replace(/\n+/g, "");
  let textn = text
    .slice()
    .trim()
    .split(" ")
    .map((i) => i[0].toUpperCase() + i.slice(1))
    .join(" ");

  if (!localStorage.getItem("textn")) {
    localStorage.setItem("textn", textn);
    localStorage.setItem("text", text);
    document.getElementById("block4").innerHTML = textn;
  } else {
    localStorage.removeItem("textn", textn);
    document.getElementById("block4").innerHTML = localStorage.getItem("text");
    localStorage.removeItem("text", text);
  }
}

function addForm() {
  if (document.getElementsByClassName("cform3").length === 0) {
    let el = document.getElementsByClassName("cform2")[0];
    el.outerHTML +=
      '<form class="cform3"><label for="img">оберіть зображення:</label><input type="file" accept="image/*" onchange="addImage(this);"></form>';
  }
}

let count = 1;
function addImage(obj) {
  if (obj.files[0]) {
    let el = document.getElementById("block4");
    el.outerHTML += `<img id="img${count}"><button style="margin-bottom: 1rem" id="b${count}" onclick="remove_img('${count}')">видалити зображення</button>`;
    let reader = new FileReader();
    reader.readAsDataURL(obj.files[0]);
    reader.onload = function (e) {
      let image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        let imgdata = getBase64Image(image);
        document.getElementById(`img${count}`).src = image.src;
        document.getElementById(`img${count}`).setAttribute("style", "width:15rem; height:15rem");
        localStorage.setItem("img" + count, imgdata);
        localStorage.removeItem("count");
        localStorage.setItem("count", count);
        count++;
      };
    };
  }
}

function getBase64Image(img) {
  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  let dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function remove_img(id) {
  localStorage.removeItem("img" + id);
  document.getElementById("img" + id).remove();
  document.getElementById("b" + id).remove();
}
